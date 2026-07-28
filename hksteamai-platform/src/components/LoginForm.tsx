"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import Link from "next/link";

export function LoginForm({
  locale,
  googleEnabled = false,
}: {
  locale: Locale;
  googleEnabled?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/library";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      setError(t(locale, "authInvalidCredentials"));
      return;
    }
    router.push(next);
    router.refresh();
  }

  function onGoogle() {
    setBusy(true);
    void signIn("google", { callbackUrl: next });
  }

  return (
    <div className="auth-form-wrap">
      {googleEnabled ? (
        <>
          <button
            type="button"
            className="btn btn-google"
            disabled={busy}
            onClick={onGoogle}
          >
            {t(locale, "continueWithGoogle")}
          </button>
          <p className="auth-divider">{t(locale, "orEmailPassword")}</p>
        </>
      ) : null}
      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          <span>{t(locale, "email")}</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>{t(locale, "password")}</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error ? <p className="form-hint warn">{error}</p> : null}
        <p className="form-hint">{t(locale, "demoParentHint")}</p>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "…" : t(locale, "signInTitle")}
        </button>
        <p className="auth-switch">
          {t(locale, "needAccount")}{" "}
          <Link href={`/register?next=${encodeURIComponent(next)}`}>
            {t(locale, "navRegister")}
          </Link>
        </p>
        <p className="auth-switch">
          <Link href="/library">{t(locale, "browseWithoutAccount")}</Link>
        </p>
      </form>
    </div>
  );
}
