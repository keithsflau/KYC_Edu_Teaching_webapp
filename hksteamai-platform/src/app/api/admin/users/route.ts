import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const take = Math.min(200, Number(req.nextUrl.searchParams.get("limit")) || 50);
  const users = await prisma.user.findMany({
    take,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      locale: true,
      createdAt: true,
      subscription: {
        select: {
          entitlement: true,
          status: true,
          plan: true,
          trialEndsAt: true,
          currentPeriodEnd: true,
          stripeCustomerId: true,
          cancelAtPeriodEnd: true,
        },
      },
      _count: { select: { children: true, accessLogs: true } },
    },
  });

  return NextResponse.json({ count: users.length, users });
}
