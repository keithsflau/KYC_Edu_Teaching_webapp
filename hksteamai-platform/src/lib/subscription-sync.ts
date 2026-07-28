import type Stripe from "stripe";
import { prisma } from "./db";
import {
  entitlementForPlan,
  planFromPriceId,
  type PlanKey,
} from "./stripe";

export type LocalSubStatus =
  | "none"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid";

function mapStripeStatus(status: Stripe.Subscription.Status): LocalSubStatus {
  switch (status) {
    case "trialing":
      return "trialing";
    case "active":
      return "active";
    case "past_due":
      return "past_due";
    case "canceled":
      return "canceled";
    case "unpaid":
      return "unpaid";
    case "incomplete":
    case "incomplete_expired":
    case "paused":
    default:
      return "canceled";
  }
}

function priceIdFromSubscription(sub: Stripe.Subscription): string | null {
  const item = sub.items?.data?.[0];
  const price = item?.price;
  if (!price) return null;
  return typeof price === "string" ? price : price.id;
}

function resolveEntitlement(
  plan: PlanKey | null,
  metadata: Stripe.Metadata | null | undefined
): "free" | "primary" | "secondary" | "all" {
  const fromMeta = metadata?.entitlement;
  if (
    fromMeta === "primary" ||
    fromMeta === "secondary" ||
    fromMeta === "all" ||
    fromMeta === "free"
  ) {
    return fromMeta;
  }
  const libraryChoice =
    metadata?.libraryChoice === "secondary" ? "secondary" : "primary";
  if (!plan) return "free";
  return entitlementForPlan(plan, libraryChoice);
}

function periodEnd(sub: Stripe.Subscription): Date | null {
  const end = (sub as Stripe.Subscription & { current_period_end?: number })
    .current_period_end;
  if (typeof end === "number") return new Date(end * 1000);
  const itemEnd = sub.items?.data?.[0]
    ? (sub.items.data[0] as { current_period_end?: number }).current_period_end
    : undefined;
  if (typeof itemEnd === "number") return new Date(itemEnd * 1000);
  return null;
}

/**
 * Mirror a Stripe Subscription into local Subscription (entitlement source of truth for paid).
 * Soft-downgrade: canceled / unpaid / expired → entitlement free (demos still work).
 */
export async function syncSubscriptionFromStripe(
  stripeSub: Stripe.Subscription,
  opts?: { userId?: string; customerId?: string }
) {
  const userId =
    opts?.userId ||
    stripeSub.metadata?.userId ||
    (
      await prisma.subscription.findFirst({
        where: {
          OR: [
            { stripeSubscriptionId: stripeSub.id },
            ...(opts?.customerId || stripeSub.customer
              ? [
                  {
                    stripeCustomerId:
                      opts?.customerId ||
                      (typeof stripeSub.customer === "string"
                        ? stripeSub.customer
                        : stripeSub.customer.id),
                  },
                ]
              : []),
          ],
        },
      })
    )?.userId;

  if (!userId) {
    console.warn("[stripe-sync] No userId for subscription", stripeSub.id);
    return null;
  }

  const priceId = priceIdFromSubscription(stripeSub);
  const plan = priceId ? planFromPriceId(priceId) : null;
  const localStatus = mapStripeStatus(stripeSub.status);
  const paidOk = localStatus === "active" || localStatus === "past_due";
  const trialing = localStatus === "trialing";

  let entitlement = resolveEntitlement(plan, stripeSub.metadata);
  if (!paidOk && !trialing) {
    entitlement = "free";
  } else if (trialing) {
    // Pro trial (and any Stripe trial) unlocks full library
    entitlement = "all";
  }

  const trialEndsAt = stripeSub.trial_end
    ? new Date(stripeSub.trial_end * 1000)
    : null;

  const customerId =
    opts?.customerId ||
    (typeof stripeSub.customer === "string"
      ? stripeSub.customer
      : stripeSub.customer?.id) ||
    undefined;

  return prisma.subscription.upsert({
    where: { userId },
    update: {
      entitlement,
      status: localStatus,
      plan: plan ?? undefined,
      stripeCustomerId: customerId,
      stripeSubscriptionId: stripeSub.id,
      stripePriceId: priceId,
      trialEndsAt,
      currentPeriodEnd: periodEnd(stripeSub),
      cancelAtPeriodEnd: Boolean(stripeSub.cancel_at_period_end),
    },
    create: {
      userId,
      entitlement,
      status: localStatus,
      plan: plan ?? null,
      stripeCustomerId: customerId ?? null,
      stripeSubscriptionId: stripeSub.id,
      stripePriceId: priceId,
      trialEndsAt,
      currentPeriodEnd: periodEnd(stripeSub),
      cancelAtPeriodEnd: Boolean(stripeSub.cancel_at_period_end),
    },
  });
}

/** Soft-downgrade after cancel / failed payment with no recovery */
export async function softDowngradeToFree(userId: string) {
  return prisma.subscription.update({
    where: { userId },
    data: {
      entitlement: "free",
      status: "canceled",
      plan: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      cancelAtPeriodEnd: false,
    },
  });
}

export async function attachCheckoutSession(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  if (!userId) return null;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      stripeCustomerId: customerId ?? undefined,
      stripeSubscriptionId: subscriptionId ?? undefined,
      plan: (session.metadata?.plan as PlanKey) || undefined,
      entitlement:
        (session.metadata?.entitlement as
          | "primary"
          | "secondary"
          | "all"
          | "free") || undefined,
    },
    create: {
      userId,
      stripeCustomerId: customerId ?? null,
      stripeSubscriptionId: subscriptionId ?? null,
      plan: (session.metadata?.plan as string) || null,
      entitlement: (session.metadata?.entitlement as string) || "free",
      status: "trialing",
    },
  });

  return { userId, customerId, subscriptionId };
}
