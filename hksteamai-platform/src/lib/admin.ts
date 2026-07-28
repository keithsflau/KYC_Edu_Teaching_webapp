import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE = "hksteamai_admin";

export function getAdminSecret(): string | null {
  const s = process.env.ADMIN_SECRET?.trim();
  return s || null;
}

/** Header `x-admin-secret` or cookie set after /admin login */
export async function isAdminAuthorized(
  req?: NextRequest
): Promise<boolean> {
  const secret = getAdminSecret();
  if (!secret) return false;

  if (req) {
    const header = req.headers.get("x-admin-secret");
    if (header && header === secret) return true;
    const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
    if (cookie && cookie === secret) return true;
  }

  try {
    const jar = await cookies();
    const cookie = jar.get(ADMIN_COOKIE)?.value;
    if (cookie && cookie === secret) return true;
  } catch {
    // cookies() unavailable outside request context
  }
  return false;
}
