import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { auth } from "@/lib/auth";
import { PricingPlans } from "@/components/PricingPlans";

export const metadata = { title: "Pricing" };

export default async function PricingPage() {
  const locale = await getLocale();
  const session = await auth();

  return (
    <div className="shell">
      <header className="page-head">
        <h1>{t(locale, "pricingTitle")}</h1>
        <p>{t(locale, "pricingLead")}</p>
      </header>
      <PricingPlans locale={locale} signedIn={Boolean(session?.user)} />
    </div>
  );
}
