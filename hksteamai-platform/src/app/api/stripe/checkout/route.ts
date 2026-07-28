import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  entitlementForPlan,
  getPriceId,
  PLAN_META,
  type PlanKey,
  stripe,
} from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const plan = body.plan as PlanKey;
  const libraryChoice = (body.libraryChoice as "primary" | "secondary") || "primary";

  if (!plan || !(plan in PLAN_META)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const meta = PLAN_META[plan];
  let priceId: string;
  try {
    priceId = getPriceId(plan);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Price not configured" },
      { status: 500 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  let sub = await prisma.subscription.findUnique({ where: { userId: user.id } });
  let customerId = sub?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name || undefined,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    sub = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: { stripeCustomerId: customerId },
      create: {
        userId: user.id,
        stripeCustomerId: customerId,
        entitlement: "free",
        status: "none",
      },
    });
  }

  // Already on a paid Stripe subscription → use Customer Portal to change plan
  if (
    sub?.stripeSubscriptionId &&
    (sub.status === "active" || sub.status === "trialing" || sub.status === "past_due")
  ) {
    return NextResponse.json(
      {
        error: "Already subscribed — use Customer Portal to change plan",
        code: "use_portal",
      },
      { status: 409 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const entitlement = entitlementForPlan(plan, libraryChoice);

  // Pro: 7-day Stripe trial, or remaining local-trial days; skip if trial already consumed.
  let trialDays: number | undefined;
  if (meta.trialDays > 0) {
    const now = Date.now();
    if (sub?.trialEndsAt && sub.trialEndsAt.getTime() > now) {
      trialDays = Math.max(
        1,
        Math.ceil((sub.trialEndsAt.getTime() - now) / (24 * 60 * 60 * 1000))
      );
    } else if (!sub?.trialEndsAt) {
      trialDays = meta.trialDays;
    }
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/account?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=cancel`,
    metadata: {
      userId: user.id,
      plan,
      libraryChoice,
      entitlement,
    },
    subscription_data: {
      ...(trialDays ? { trial_period_days: trialDays } : {}),
      metadata: {
        userId: user.id,
        plan,
        libraryChoice,
        entitlement,
      },
    },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: checkout.url });
}
