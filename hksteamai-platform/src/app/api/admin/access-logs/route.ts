import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const take = Math.min(500, Number(req.nextUrl.searchParams.get("limit")) || 100);
  const allowedOnly = req.nextUrl.searchParams.get("allowed") === "1";
  const deniedOnly = req.nextUrl.searchParams.get("denied") === "1";

  const logs = await prisma.accessLog.findMany({
    take,
    where: allowedOnly
      ? { allowed: true }
      : deniedOnly
        ? { allowed: false }
        : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, email: true } },
    },
  });

  return NextResponse.json({ count: logs.length, logs });
}
