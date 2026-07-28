import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized, ADMIN_COOKIE, getAdminSecret } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Exchange ADMIN_SECRET for httpOnly cookie (MVP admin gate). */
export async function POST(req: NextRequest) {
  const secret = getAdminSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "ADMIN_SECRET not configured" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const provided =
    String(body.secret || "") || req.headers.get("x-admin-secret") || "";

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export async function GET(req: NextRequest) {
  const ok = await isAdminAuthorized(req);
  return NextResponse.json({ authorized: ok });
}
