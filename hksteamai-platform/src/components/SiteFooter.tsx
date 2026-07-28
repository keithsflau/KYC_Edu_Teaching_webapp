import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p className="footer-brand">{t(locale, "brand")}</p>
        <p className="footer-note">
          {t(locale, "footerNote")} ·{" "}
          <a href="mailto:support@hksteamai.com">support@hksteamai.com</a> ·{" "}
          <Link href="/privacy">{t(locale, "navPrivacy")}</Link> ·{" "}
          <Link href="/terms">{t(locale, "navTerms")}</Link>
        </p>
      </div>
    </footer>
  );
}
