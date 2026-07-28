import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserAccess } from "@/lib/entitlements";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Current session + entitlement mirror for Agent 4 UI. */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({
      authenticated: false,
      entitlement: "free",
      user: null,
      subscription: null,
    });
  }

  const { entitlement, subscription, trialEndsAt } = await getUserAccess(
    session.user.id
  );

  const children = await prisma.childProfile.findMany({
    where: { userId: session.user.id },
    select: { id: true, name: true, gradeHint: true },
  });

  return NextResponse.json({
    authenticated: true,
    entitlement,
    trialEndsAt: trialEndsAt?.toISOString() ?? null,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      locale: session.user.locale,
    },
    subscription: subscription
      ? {
          status: subscription.status,
          plan: subscription.plan,
          entitlement: subscription.entitlement,
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
          currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
          trialEndsAt: subscription.trialEndsAt?.toISOString() ?? null,
        }
      : null,
    children,
  });
}
