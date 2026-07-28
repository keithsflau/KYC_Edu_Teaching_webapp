"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { PlanKey } from "@/lib/stripe";

type Props = {
  locale: Locale;
  plan: PlanKey;
  libraryChoice?: "primary" | "secondary";
  label?: string;
  className?: string;
  signedIn: boolean;
};

export function CheckoutButton({
  locale,
  plan,
  libraryChoice = "primary",
  label,
  className,
  signedIn,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onClick() {
    setMsg(null);
    if (!signedIn) {
      router.push(`/login?next=${encodeURIComponent("/pricing")}`);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, libraryChoice }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setMsg(t(locale, "checkoutNeedLogin"));
        router.push("/login?next=/pricing");
        return;
      }
      if (!res.ok) {
        const err = String(data.error || "");
        if (err.includes("Price not configured") || err.includes("Missing Stripe")) {
          setMsg(t(locale, "checkoutStub"));
        } else {
          setMsg(err || t(locale, "checkoutError"));
        }
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMsg(t(locale, "checkoutStub"));
    } catch {
      setMsg(t(locale, "checkoutError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="checkout-wrap">
      <button
        type="button"
        className={className || "btn btn-primary"}
        disabled={busy}
        onClick={onClick}
      >
        {busy ? "…" : label || t(locale, "ctaSubscribe")}
      </button>
      {msg ? <p className="form-hint warn">{msg}</p> : null}
    </div>
  );
}
