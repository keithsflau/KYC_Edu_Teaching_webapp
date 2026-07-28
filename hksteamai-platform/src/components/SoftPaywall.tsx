import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getPaywallCopy } from "@/lib/catalog";
import { CheckoutButton } from "./CheckoutButton";

type Props = {
  locale: Locale;
  signedIn: boolean;
};

export function SoftPaywall({ locale, signedIn }: Props) {
  return (
    <div className="paywall" role="dialog" aria-labelledby="paywall-title">
      <div className="paywall-panel">
        <h2 id="paywall-title">{getPaywallCopy(locale, "lockedTitle")}</h2>
        <p>{getPaywallCopy(locale, "lockedBody")}</p>
        <div className="paywall-actions">
          {signedIn ? (
            <CheckoutButton
              locale={locale}
              plan="pro_monthly"
              signedIn={signedIn}
              label={getPaywallCopy(locale, "ctaTrial")}
              className="btn btn-primary"
            />
          ) : (
            <Link href="/register" className="btn btn-primary">
              {getPaywallCopy(locale, "ctaTrial")}
            </Link>
          )}
          <Link href="/pricing" className="btn btn-ghost">
            {getPaywallCopy(locale, "ctaSubscribe")}
          </Link>
          <Link href="/library" className="btn btn-ghost">
            {getPaywallCopy(locale, "ctaKeepBrowsing")}
          </Link>
        </div>
      </div>
    </div>
  );
}
