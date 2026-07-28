import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { auth } from "@/lib/auth";
import {
  canAccessModuleAsync,
  getUserAccess,
  logAccess,
  moduleKey,
} from "@/lib/entitlements";
import { clientIp, watermarkHtml } from "@/lib/modules";
import { limitModuleFetch } from "@/lib/rate-limit";
import { verifyModuleToken } from "@/lib/signed-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".map": "application/json",
};

const ALLOWED_PREFIXES = [
  "Primary_School/",
  "Secondary_School/",
  "bible_study/",
  "typing test/",
];

function sanitizeRel(parts: string[]): string | null {
  const rel = parts.map(decodeURIComponent).join("/");
  if (!rel || rel.includes("\0") || rel.includes("..")) return null;
  if (path.isAbsolute(rel) || /^[a-zA-Z]:/.test(rel)) return null;
  const normalized = moduleKey(rel.replace(/\\/g, "/"));
  const ok = ALLOWED_PREFIXES.some((p) => normalized.startsWith(p));
  return ok ? normalized : null;
}

/**
 * Canonical module proxy for /play/[...path] iframes.
 * Entitlement → rate limit → optional signed token → watermark HTML.
 * Serves HTML and sibling assets (js/css/img) so relative paths work.
 */
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path: parts } = await ctx.params;
  const rel = sanitizeRel(parts);
  if (!rel) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const key = moduleKey(rel);
  const ip = clientIp(req.headers);
  const session = await auth();
  const sessionUserId = session?.user?.id ?? null;

  // Optional signed token (query) for short-lived access without session cookie
  const sigUid = req.nextUrl.searchParams.get("uid") || "";
  const sigExp = req.nextUrl.searchParams.get("exp") || "";
  const sig = req.nextUrl.searchParams.get("sig") || "";
  let signedUserId: string | null = null;
  if (sig && sigUid && sigExp) {
    const v = verifyModuleToken({
      path: key,
      userId: sigUid,
      exp: sigExp,
      sig,
    });
    if (!v.ok) {
      await logAccess({
        userId: sessionUserId,
        modulePath: key,
        allowed: false,
        reason: v.reason,
        ip,
      });
      return NextResponse.json(
        { error: "Invalid or expired signed URL" },
        { status: 403 }
      );
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
        headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) },
      }
    );
  }

  const access = await getUserAccess(userId);
  const decision = await canAccessModuleAsync(access.entitlement, key);

  if (decision.allowed && !decision.isFreeDemo && !userId) {
    await logAccess({
      userId: null,
      modulePath: key,
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
      modulePath: key,
      allowed: false,
      reason: decision.reason,
      ip,
    });
    return NextResponse.json(
      {
        error: "Locked",
        reason: decision.reason,
        entitlement: decision.entitlement,
      },
      { status: 403 }
    );
  }

  const { getModulesRoot } = await import("@/lib/entitlements");
  const root = path.resolve(getModulesRoot());
  let filePath = path.resolve(root, ...rel.split("/"));
  if (!path.extname(filePath)) {
    const asIndex = path.join(filePath, "index.html");
    if (fs.existsSync(asIndex)) filePath = asIndex;
  }

  const resolved = path.resolve(filePath);
  const relToRoot = path.relative(root, resolved);
  if (!relToRoot || relToRoot.startsWith("..") || path.isAbsolute(relToRoot)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    await logAccess({
      userId,
      modulePath: key,
      allowed: false,
      reason: "not_found",
      ip,
    });
    return NextResponse.json(
      { error: "Module file not found", path: rel },
      { status: 404 }
    );
  }

  const ext = path.extname(resolved).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  // Only log HTML entry hits to avoid flooding on assets
  if (ext === ".html") {
    await logAccess({
      userId,
      modulePath: key,
      allowed: true,
      reason: decision.reason,
      ip,
    });
  }

  if (ext === ".html") {
    const html = fs.readFileSync(resolved, "utf8");
    const body = watermarkHtml(html, {
      userId: userId || (decision.isFreeDemo ? "demo" : null),
      modulePath: key,
    });
    return new NextResponse(body, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-HKSteamAI-Entitlement": decision.entitlement,
        "X-HKSteamAI-Access": decision.reason,
        "Permissions-Policy": "camera=*, microphone=*, fullscreen=*",
      },
    });
  }

  const body = fs.readFileSync(resolved);
  return new NextResponse(body, {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "private, max-age=60",
      "X-Content-Type-Options": "nosniff",
      "X-RateLimit-Remaining": String(rl.remaining),
    },
  });
}
