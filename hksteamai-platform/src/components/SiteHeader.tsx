import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SignOutButton } from "./SignOutButton";

type Props = {
  locale: Locale;
  email?: string | null;
  role?: string | null;
};

export function SiteHeader({ locale, email, role }: Props) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">{t(locale, "brand")}</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/library">{t(locale, "navLibrary")}</Link>
          <Link href="/pricing">{t(locale, "navPricing")}</Link>
          {email ? <Link href="/account">{t(locale, "navAccount")}</Link> : null}
          {role === "admin" ? (
            <Link href="/admin">{t(locale, "navAdmin")}</Link>
          ) : null}
        </nav>
        <div className="header-actions">
          <LocaleSwitcher locale={locale} />
          {email ? (
            <SignOutButton locale={locale} />
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                {t(locale, "navLogin")}
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                {t(locale, "navRegister")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
