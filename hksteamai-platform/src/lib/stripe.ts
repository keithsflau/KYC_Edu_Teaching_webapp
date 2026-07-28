import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-06-24.dahlia",
  typescript: true,
});

export type PlanKey = "basic_monthly" | "basic_yearly" | "pro_monthly" | "pro_yearly";

export const PLAN_META: Record<
  PlanKey,
  {
    name: string;
    nameZh: string;
    amountHkd: number;
    interval: "month" | "year";
    tier: "basic" | "pro";
    entitlement: "primary" | "all";
    /** Basic chooses primary OR secondary at checkout via metadata; default primary */
    envPriceId: string;
    trialDays: number;
  }
> = {
  basic_monthly: {
    name: "Basic Monthly",
    nameZh: "基本月費",
    amountHkd: 98,
    interval: "month",
    tier: "basic",
    entitlement: "primary",
    envPriceId: "STRIPE_PRICE_BASIC_MONTHLY",
    trialDays: 0,
  },
  basic_yearly: {
    name: "Basic Yearly",
    nameZh: "基本年費",
    amountHkd: 980,
    interval: "year",
    tier: "basic",
    entitlement: "primary",
    envPriceId: "STRIPE_PRICE_BASIC_YEARLY",
    trialDays: 0,
  },
  pro_monthly: {
    name: "Pro Monthly",
    nameZh: "專業月費",
    amountHkd: 148,
    interval: "month",
    tier: "pro",
    entitlement: "all",
    envPriceId: "STRIPE_PRICE_PRO_MONTHLY",
    trialDays: 7,
  },
  pro_yearly: {
    name: "Pro Yearly",
    nameZh: "專業年費",
    amountHkd: 1280,
    interval: "year",
    tier: "pro",
    entitlement: "all",
    envPriceId: "STRIPE_PRICE_PRO_YEARLY",
    trialDays: 7,
  },
};

export function getPriceId(plan: PlanKey): string {
  const key = PLAN_META[plan].envPriceId;
  const id = process.env[key];
  if (!id || id.includes("placeholder")) {
    throw new Error(`Missing Stripe price ID: set ${key} in .env (run npm run stripe:products)`);
  }
  return id;
}

export function planFromPriceId(priceId: string): PlanKey | null {
  for (const [plan, meta] of Object.entries(PLAN_META) as [PlanKey, (typeof PLAN_META)[PlanKey]][]) {
    if (process.env[meta.envPriceId] === priceId) return plan;
  }
  return null;
}

export function entitlementForPlan(
  plan: PlanKey,
  libraryChoice?: "primary" | "secondary"
): "primary" | "secondary" | "all" {
  const meta = PLAN_META[plan];
  if (meta.tier === "pro") return "all";
  return libraryChoice === "secondary" ? "secondary" : "primary";
}
