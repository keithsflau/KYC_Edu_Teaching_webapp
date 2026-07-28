import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { clearFreeDemoCache } from "@/lib/entitlements";

/** MVP admin gate: ADMIN_SECRET via cookie or x-admin-secret header (same as /admin UI). */
async function requireAdmin(req: NextRequest) {
  if (await isAdminAuthorized(req)) {
    return { id: "admin-secret", role: "admin" as const };
  }
  return null;
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const tab = req.nextUrl.searchParams.get("tab") || "users";

  if (tab === "logs") {
    const logs = await prisma.accessLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { user: { select: { email: true } } },
    });
    return NextResponse.json({ logs });
  }

  if (tab === "flags") {
    const flags = await prisma.featureFlag.findMany();
    return NextResponse.json({ flags });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      subscription: true,
      children: true,
      _count: { select: { accessLogs: true } },
    },
  });

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      entitlement: u.subscription?.entitlement,
      status: u.subscription?.status,
      plan: u.subscription?.plan,
      trialEndsAt: u.subscription?.trialEndsAt,
      children: u.children.length,
      accessLogs: u._count.accessLogs,
      createdAt: u.createdAt,
    })),
  });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  if (body.flagKey) {
    const flag = await prisma.featureFlag.upsert({
      where: { key: String(body.flagKey) },
      update: { value: String(body.value ?? "") },
      create: { key: String(body.flagKey), value: String(body.value ?? "") },
    });
    if (String(body.flagKey) === "free_catalog_override") clearFreeDemoCache();
    return NextResponse.json({ flag });
  }

  if (body.userId && body.entitlement) {
    await prisma.subscription.upsert({
      where: { userId: body.userId },
      update: {
        entitlement: String(body.entitlement),
        status: String(body.status || "active"),
      },
      create: {
        userId: body.userId,
        entitlement: String(body.entitlement),
        status: String(body.status || "active"),
      },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
}
