import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { LoginForm } from "@/components/LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  const locale = await getLocale();
  const googleEnabled = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
  );
  return (
    <div className="auth-shell">
      <h1>{t(locale, "signInTitle")}</h1>
      <p className="lead">{t(locale, "tagline")}</p>
      <Suspense fallback={<p>…</p>}>
        <LoginForm locale={locale} googleEnabled={googleEnabled} />
      </Suspense>
    </div>
  );
}
