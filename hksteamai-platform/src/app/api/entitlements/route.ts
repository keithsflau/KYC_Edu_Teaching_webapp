import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserAccess } from "@/lib/entitlements";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ entitlement: "free", authenticated: false });
  }

  const access = await getUserAccess(session.user.id);
  const children = await prisma.childProfile.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });
  const devices = await prisma.device.findMany({
    where: { userId: session.user.id },
  });

  const maxChildren =
    access.entitlement === "all" ? 3 : access.entitlement === "free" ? 0 : 1;
  const maxDevices =
    access.entitlement === "all" ? 3 : access.entitlement === "free" ? 1 : 2;

  return NextResponse.json({
    authenticated: true,
    entitlement: access.entitlement,
    trialEndsAt: access.trialEndsAt,
    subscription: access.subscription
      ? {
          status: access.subscription.status,
          plan: access.subscription.plan,
          currentPeriodEnd: access.subscription.currentPeriodEnd,
          cancelAtPeriodEnd: access.subscription.cancelAtPeriodEnd,
        }
      : null,
    children,
    devices,
    limits: { maxChildren, maxDevices },
  });
}
