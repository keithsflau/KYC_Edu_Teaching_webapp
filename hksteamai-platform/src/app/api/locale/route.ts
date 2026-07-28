import { NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/lib/locale";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const locale = body.locale === "zh-HK" ? "zh-HK" : "en";
  const res = NextResponse.json({ ok: true, locale });
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
