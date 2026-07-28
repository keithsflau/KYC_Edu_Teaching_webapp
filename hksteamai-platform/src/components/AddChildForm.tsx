"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type Props = {
  locale: Locale;
  max: number;
  current: number;
};

export function AddChildForm({ locale, max, current }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gradeHint, setGradeHint] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const atLimit = current >= max;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (atLimit) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gradeHint }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data.error || t(locale, "childLimitReached"));
        return;
      }
      setName("");
      setGradeHint("");
      router.refresh();
    } catch {
      setMsg(t(locale, "childLimitReached"));
    } finally {
      setBusy(false);
    }
  }

  if (max <= 0) {
    return (
      <p className="form-hint">
        {locale === "zh-HK"
          ? "訂閱後即可新增子女檔案（基本 1 · 專業 3）。"
          : "Subscribe to add child profiles (Basic 1 · Pro 3)."}
      </p>
    );
  }

  return (
    <form className="child-form" onSubmit={onSubmit}>
      <p className="form-hint">{t(locale, "childLimit", { max })}</p>
      {atLimit ? (
        <p className="form-hint warn">{t(locale, "childLimitReached")}</p>
      ) : (
        <>
          <div className="child-form-row">
            <input
              type="text"
              required
              placeholder={t(locale, "name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder={t(locale, "gradeLabel")}
              value={gradeHint}
              onChange={(e) => setGradeHint(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
              {t(locale, "addChild")}
            </button>
          </div>
        </>
      )}
      {msg ? <p className="form-hint warn">{msg}</p> : null}
    </form>
  );
}
