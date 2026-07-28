/** Client-safe plan metadata (no Stripe secret). */
export type PlanKey = "basic_monthly" | "basic_yearly" | "pro_monthly" | "pro_yearly";

export const PLAN_META: Record<
  PlanKey,
  { name: string; nameZh: string; amountHkd: number; interval: "month" | "year" }
> = {
  basic_monthly: { name: "Basic Monthly", nameZh: "基本月費", amountHkd: 98, interval: "month" },
  basic_yearly: { name: "Basic Yearly", nameZh: "基本年費", amountHkd: 980, interval: "year" },
  pro_monthly: { name: "Pro Monthly", nameZh: "專業月費", amountHkd: 148, interval: "month" },
  pro_yearly: { name: "Pro Yearly", nameZh: "專業年費", amountHkd: 1280, interval: "year" },
};
