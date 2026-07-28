import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  canAccessModuleAsync,
  getUserAccess,
} from "@/lib/entitlements";
import { sanitizeModulePath } from "@/lib/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Check access for a single module path (UI lock state). */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("path") || "";
  const safe = sanitizeModulePath(raw);
  if (!safe) {
    return NextResponse.json({ error: "Invalid module path" }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id ?? null;
  const { entitlement, trialEndsAt, subscription } = await getUserAccess(userId);
  const decision = await canAccessModuleAsync(entitlement, safe);

  const playable =
    decision.allowed && (decision.isFreeDemo || !!userId);

  return NextResponse.json({
    path: safe,
    allowed: playable,
    reason: playable ? decision.reason : decision.allowed ? "auth_required" : decision.reason,
    isFreeDemo: decision.isFreeDemo,
    entitlement,
    authenticated: !!userId,
    trialEndsAt: trialEndsAt?.toISOString() ?? null,
    status: subscription?.status ?? "none",
    contentUrl: playable
      ? `/api/modules/content?path=${encodeURIComponent(safe)}`
      : null,
    pathUrl: playable
      ? `/api/modules/${safe.split("/").map(encodeURIComponent).join("/")}`
      : null,
  });
}
