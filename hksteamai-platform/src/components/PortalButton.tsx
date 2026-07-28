"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function PortalButton({ locale }: { locale: Locale }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onClick() {
    setMsg(null);
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data.error || t(locale, "portalError"));
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMsg(t(locale, "portalError"));
    } catch {
      setMsg(t(locale, "portalError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="checkout-wrap">
      <button type="button" className="btn btn-ghost" disabled={busy} onClick={onClick}>
        {busy ? "…" : t(locale, "manageBilling")}
      </button>
      {msg ? <p className="form-hint warn">{msg}</p> : null}
    </div>
  );
}
