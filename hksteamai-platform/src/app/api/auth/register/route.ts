import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "");
  const name = String(body.name || "").trim() || null;
  const locale = body.locale === "zh-HK" ? "zh-HK" : "en";

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Email and password (min 8 chars) required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const trialDays = Number(process.env.TRIAL_DAYS || 7);
  const trialEndsAt = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "parent",
        locale,
        subscription: {
          create: {
            entitlement: "all",
            status: "trialing",
            trialEndsAt,
          },
        },
      },
    });
    return NextResponse.json({ ok: true, userId: user.id });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : "Could not create account (is the database migrated?)",
      },
      { status: 500 }
    );
  }
}
