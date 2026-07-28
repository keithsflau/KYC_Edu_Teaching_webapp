"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const sp = useSearchParams();
  const locale = sp.get("lang") === "zh-HK" ? "zh-HK" : "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError(locale === "zh-HK" ? "電郵或密碼錯誤" : "Invalid email or password");
      return;
    }
    window.location.href = "/library";
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md px-4 py-16 space-y-4">
      <h1 className="text-2xl font-semibold text-teal-950">
        {locale === "zh-HK" ? "登入" : "Sign in"}
      </h1>
      {error && <p className="text-sm text-red-700">{error}</p>}
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-teal-800 text-white py-2 rounded">
        {locale === "zh-HK" ? "登入" : "Sign in"}
      </button>
      <p className="text-sm text-stone-600">
        {locale === "zh-HK" ? "未有帳戶？" : "No account?"}{" "}
        <Link href="/register" className="underline">
          {locale === "zh-HK" ? "開始試用" : "Start trial"}
        </Link>
      </p>
      <p className="text-xs text-stone-400">Demo: parent@example.com / demo1234</p>
    </form>
  );
}
