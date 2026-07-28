import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  canAccessModuleAsync,
  getUserAccess,
  moduleKey,
} from "@/lib/entitlements";
import { sanitizeModulePath } from "@/lib/modules";
import { limitSignedMint } from "@/lib/rate-limit";
import { mintModuleToken } from "@/lib/signed-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Mint a short-lived signed URL for entitled module HTML.
 * Body: { path, ttlSec? }
 *
 * Signature covers moduleKey(path)|userId|exp. Content route verifies the same.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rl = limitSignedMint(session.user.id);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfterMs: rl.resetMs },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const rawPath = String(body.path || req.nextUrl.searchParams.get("path") || "");
  const ttlSec = Math.min(600, Math.max(30, Number(body.ttlSec) || 120));
  const safe = sanitizeModulePath(rawPath);
  if (!safe) {
    return NextResponse.json({ error: "Invalid module path" }, { status: 400 });
  }

  const { entitlement } = await getUserAccess(session.user.id);
  const decision = await canAccessModuleAsync(entitlement, safe);
  if (!decision.allowed) {
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  const key = moduleKey(safe);
  const token = mintModuleToken(key, session.user.id, ttlSec);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const qs = new URLSearchParams({
    path: safe,
    uid: token.userId,
    exp: String(token.exp),
    sig: token.sig,
  }).toString();

  return NextResponse.json({
    url: `${origin}/api/modules/content?${qs}`,
    /** Path-style URL for /play iframe (Agent 4) */
    pathUrl: `${origin}/api/modules/${safe.split("/").map(encodeURIComponent).join("/")}?${new URLSearchParams(
      {
        uid: token.userId,
        exp: String(token.exp),
        sig: token.sig,
      }
    ).toString()}`,
    path: safe,
    key,
    exp: token.exp,
    ttlSec,
  });
}
