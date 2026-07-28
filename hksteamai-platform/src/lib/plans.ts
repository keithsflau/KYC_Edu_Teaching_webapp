import type { Entitlement } from "./entitlements";

/** Child profile caps: Free 0 editable (view demos), Basic 1, Pro/trial 3 */
export function maxChildren(entitlement: Entitlement, status?: string | null): number {
  if (entitlement === "all" || status === "trialing") return 3;
  if (entitlement === "primary" || entitlement === "secondary") return 1;
  return 0;
}

export function planLabel(plan: string | null | undefined, locale: "en" | "zh-HK"): string {
  const map: Record<string, { en: string; "zh-HK": string }> = {
    basic_monthly: { en: "Basic (monthly)", "zh-HK": "基本（月費）" },
    basic_yearly: { en: "Basic (yearly)", "zh-HK": "基本（年費）" },
    pro_monthly: { en: "Pro (monthly)", "zh-HK": "專業（月費）" },
    pro_yearly: { en: "Pro (yearly)", "zh-HK": "專業（年費）" },
  };
  if (!plan) return locale === "zh-HK" ? "無付費計劃" : "No paid plan";
  return map[plan]?.[locale] ?? plan;
}

export function statusLabel(status: string | null | undefined, locale: "en" | "zh-HK"): string {
  const map: Record<string, { en: string; "zh-HK": string }> = {
    none: { en: "Free", "zh-HK": "免費" },
    trialing: { en: "Pro trial", "zh-HK": "Pro 試用中" },
    active: { en: "Active", "zh-HK": "生效中" },
    past_due: { en: "Past due", "zh-HK": "逾期" },
    canceled: { en: "Canceled", "zh-HK": "已取消" },
    unpaid: { en: "Unpaid", "zh-HK": "未付款" },
  };
  if (!status) return map.none[locale];
  return map[status]?.[locale] ?? status;
}
