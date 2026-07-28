import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserAccess } from "@/lib/entitlements";
import { maxChildren } from "@/lib/plans";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const gradeHint = String(body.gradeHint || "").trim() || null;
  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const access = await getUserAccess(session.user.id);
  const max = maxChildren(access.entitlement, access.subscription?.status);
  const count = await prisma.childProfile.count({
    where: { userId: session.user.id },
  });
  if (count >= max) {
    return NextResponse.json(
      { error: "Child limit reached for your plan (Basic 1 · Pro 3)" },
      { status: 403 }
    );
  }

  const child = await prisma.childProfile.create({
    data: { userId: session.user.id, name, gradeHint },
  });
  return NextResponse.json({ ok: true, child });
}
