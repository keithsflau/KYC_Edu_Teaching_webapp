"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function RegisterForm() {
  const sp = useSearchParams();
  const locale = sp.get("lang") === "zh-HK" ? "zh-HK" : "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, locale }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed");
      setBusy(false);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    window.location.href = "/library";
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md px-4 py-16 space-y-4">
      <h1 className="text-2xl font-semibold text-teal-950">
        {locale === "zh-HK" ? "開始 7 日 Pro 試用" : "Start 7-day Pro trial"}
      </h1>
      <p className="text-sm text-stone-600">
        {locale === "zh-HK"
          ? "註冊即開通完整課程庫試用，到期後自動降為免費示範。"
          : "Registration unlocks the full library for 7 days, then soft-downgrades to Free demos."}
      </p>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <input
        className="w-full border rounded px-3 py-2"
        placeholder={locale === "zh-HK" ? "姓名（選填）" : "Name (optional)"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full border rounded px-3 py-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border rounded px-3 py-2"
        type="password"
        placeholder={locale === "zh-HK" ? "密碼（最少 8 位）" : "Password (min 8)"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-teal-800 text-white py-2 rounded disabled:opacity-50"
      >
        {busy ? "…" : locale === "zh-HK" ? "建立帳戶" : "Create account"}
      </button>
      <p className="text-sm text-stone-600">
        <Link href="/login" className="underline">
          {locale === "zh-HK" ? "已有帳戶？登入" : "Already have an account? Sign in"}
        </Link>
      </p>
    </form>
  );
}
