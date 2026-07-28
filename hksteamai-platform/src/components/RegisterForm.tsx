"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

function mapRegisterError(locale: Locale, code: string): string {
  if (code === "Email already registered") {
    return t(locale, "emailAlreadyRegistered");
  }
  if (code.includes("min 8")) {
    return t(locale, "passwordTooShort");
  }
  return code || t(locale, "registerFailed");
}

export function RegisterForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/library";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(mapRegisterError(locale, String(data.error || "")));
        setBusy(false);
        return;
      }
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (login?.error) {
        router.push("/login");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError(t(locale, "registerFailed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label>
        <span>{t(locale, "name")}</span>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
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
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="field-hint">{t(locale, "passwordMinHint")}</span>
      </label>
      {error ? <p className="form-hint warn">{error}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "…" : t(locale, "navRegister")}
      </button>
      <p className="auth-switch">
        {t(locale, "alreadyHaveAccount")}{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`}>
          {t(locale, "navLogin")}
        </Link>
      </p>
      <p className="auth-switch">
        <Link href="/library">{t(locale, "browseWithoutAccount")}</Link>
      </p>
    </form>
  );
}
