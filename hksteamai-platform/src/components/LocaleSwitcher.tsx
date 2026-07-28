"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const next = otherLocale(locale);

  return (
    <button
      type="button"
      className="lang-switch"
      disabled={pending}
      onClick={() => {
        start(async () => {
          await fetch("/api/locale", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ locale: next }),
          });
          router.refresh();
        });
      }}
      aria-label={next === "zh-HK" ? "Switch to 繁體中文" : "Switch to English"}
    >
      {locale === "en" ? "繁中" : "EN"}
    </button>
  );
}
