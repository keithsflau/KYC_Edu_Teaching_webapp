import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { grantLocalProTrial } from "@/lib/trial";

/**
 * Start one-time local Pro trial (no card).
 * Prefer calling grantLocalProTrial() from register; this endpoint is for UI CTAs.
 */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await grantLocalProTrial(session.user.id);
  const status = result.ok ? 200 : result.reason === "trial_already_used" ? 409 : 400;

  return NextResponse.json(
    {
      ok: result.ok,
      reason: result.reason,
      trialEndsAt: result.trialEndsAt?.toISOString() ?? null,
      entitlement: result.ok ? "all" : undefined,
    },
    { status }
  );
}
