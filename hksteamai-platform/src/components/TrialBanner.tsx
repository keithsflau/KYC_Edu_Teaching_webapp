import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getPaywallCopy } from "@/lib/catalog";

type Props = {
  locale: Locale;
  daysLeft: number | null;
  expired: boolean;
};

export function TrialBanner({ locale, daysLeft, expired }: Props) {
  if (!expired && (daysLeft === null || daysLeft < 0)) return null;

  return (
    <div className={`trial-banner ${expired ? "expired" : ""}`} role="status">
      <p>
        {expired
          ? getPaywallCopy(locale, "trialExpired")
          : getPaywallCopy(locale, "trialBanner", { days: daysLeft ?? 0 })}
      </p>
      <Link href="/pricing" className="btn btn-sm btn-accent">
        {getPaywallCopy(locale, "ctaSubscribe")}
      </Link>
    </div>
  );
}
