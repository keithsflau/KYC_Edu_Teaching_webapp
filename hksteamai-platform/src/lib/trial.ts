import { prisma } from "./db";

/**
 * Grant a one-time local 7-day Pro trial (no card).
 * Soft-downgrade is automatic via effectiveEntitlement() once trialEndsAt passes.
 * Call from register / POST /api/trial/start — not from Stripe webhooks.
 */
export async function grantLocalProTrial(userId: string): Promise<{
  ok: boolean;
  reason: string;
  trialEndsAt: Date | null;
}> {
  const trialDays = Number(process.env.TRIAL_DAYS || 7);
  const existing = await prisma.subscription.findUnique({ where: { userId } });

  // Already paid or on Stripe trial — do not overwrite
  if (
    existing &&
    (existing.status === "active" ||
      existing.status === "past_due" ||
      existing.status === "trialing") &&
    existing.stripeSubscriptionId
  ) {
    return {
      ok: false,
      reason: "stripe_subscription_active",
      trialEndsAt: existing.trialEndsAt,
    };
  }

  // Local trial already used (any prior trialEndsAt)
  if (existing?.trialEndsAt) {
    const stillActive =
      existing.status === "trialing" &&
      existing.trialEndsAt.getTime() > Date.now();
    if (stillActive) {
      return {
        ok: true,
        reason: "already_trialing",
        trialEndsAt: existing.trialEndsAt,
      };
    }
    return {
      ok: false,
      reason: "trial_already_used",
      trialEndsAt: existing.trialEndsAt,
    };
  }

  const trialEndsAt = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000);

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      entitlement: "all",
      status: "trialing",
      trialEndsAt,
      plan: null,
    },
    create: {
      userId,
      entitlement: "all",
      status: "trialing",
      trialEndsAt,
    },
  });

  return { ok: true, reason: "granted", trialEndsAt };
}
