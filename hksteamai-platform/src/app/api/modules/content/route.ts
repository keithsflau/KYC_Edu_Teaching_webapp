import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  canAccessModuleAsync,
  getUserAccess,
  logAccess,
  moduleKey,
} from "@/lib/entitlements";
import {
  clientIp,
  readModuleHtml,
  sanitizeModulePath,
  watermarkHtml,
} from "@/lib/modules";
import { limitModuleFetch } from "@/lib/rate-limit";
import { verifyModuleToken } from "@/lib/signed-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Query-style HTML proxy (signed URLs / access helpers).
 *
 * Canonical play iframe uses path-style `/api/modules/[...path]` so relative
 * module assets resolve. Both routes share entitlement + rate limit + watermark.
 *
 * Query: path=… (required); uid, exp, sig optional signed token.
 * Auth: session OR valid signed token for paid; free demos need no auth.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const rawPath = url.searchParams.get("path") || "";
  const safe = sanitizeModulePath(rawPath);
  if (!safe) {
    return NextResponse.json({ error: "Invalid module path" }, { status: 400 });
  }

  const ip = clientIp(req.headers);
  const session = await auth();
  const sessionUserId = session?.user?.id ?? null;

  const sigUid = url.searchParams.get("uid") || "";
  const sigExp = url.searchParams.get("exp") || "";
  const sig = url.searchParams.get("sig") || "";
  let signedUserId: string | null = null;

  if (sig && sigUid && sigExp) {
    const v = verifyModuleToken({
      path: moduleKey(safe),
      userId: sigUid,
      exp: sigExp,
      sig,
    });
    if (!v.ok) {
      await logAccess({
        userId: sessionUserId,
        modulePath: safe,
        allowed: false,
        reason: v.reason,
        ip,
      });
      return NextResponse.json({ error: "Invalid or expired signed URL" }, { status: 403 });
    }
    signedUserId = sigUid;
  }

  const userId = sessionUserId || signedUserId;
  const identity = userId || `ip:${ip}`;
  const rl = limitModuleFetch(identity);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfterMs: rl.resetMs },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.resetMs / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const { entitlement } = await getUserAccess(userId);
  const decision = await canAccessModuleAsync(entitlement, safe);

  // Paid modules require authenticated identity (session or signed token)
  if (decision.allowed && !decision.isFreeDemo && !userId) {
    await logAccess({
      userId: null,
      modulePath: safe,
      allowed: false,
      reason: "auth_required",
      ip,
    });
    return NextResponse.json(
      { error: "Sign in required", reason: "auth_required" },
      { status: 401 }
    );
  }

  if (!decision.allowed) {
    await logAccess({
      userId,
      modulePath: safe,
      allowed: false,
      reason: decision.reason,
      ip,
    });
    return NextResponse.json(
      {
        error: "Forbidden",
        reason: decision.reason,
        entitlement: decision.entitlement,
      },
      { status: 403 }
    );
  }

  const html = readModuleHtml(safe);
  if (html == null) {
    await logAccess({
      userId,
      modulePath: safe,
      allowed: false,
      reason: "not_found",
      ip,
    });
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  const body = watermarkHtml(html, {
    userId: userId || (decision.isFreeDemo ? "demo" : null),
    modulePath: safe,
  });

  await logAccess({
    userId,
    modulePath: safe,
    allowed: true,
    reason: decision.reason,
    ip,
  });

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-HKSteamAI-Entitlement": decision.entitlement,
      "X-HKSteamAI-Access": decision.reason,
      "Permissions-Policy": "camera=*, microphone=*, fullscreen=*",
    },
  });
}
