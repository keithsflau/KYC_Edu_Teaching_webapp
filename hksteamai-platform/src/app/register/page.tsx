import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata = { title: "Register" };

export default async function RegisterPage() {
  const locale = await getLocale();
  return (
    <div className="auth-shell">
      <h1>{t(locale, "registerTitle")}</h1>
      <p className="lead">{t(locale, "registerLead")}</p>
      <Suspense fallback={<p>…</p>}>
        <RegisterForm locale={locale} />
      </Suspense>
    </div>
  );
}
