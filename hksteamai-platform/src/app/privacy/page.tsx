import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Privacy" };

export default async function PrivacyPage() {
  const locale = await getLocale();
  const zh = locale === "zh-HK";

  return (
    <div className="shell" style={{ paddingTop: "2rem", maxWidth: "42rem" }}>
      <h1>{t(locale, "privacyTitle")}</h1>
      <p className="section-lead">
        {zh
          ? "最後更新：2026-07-22 · 營運者：HK Steam AI（hksteamai.com）"
          : "Last updated: 2026-07-22 · Operator: HK Steam AI (hksteamai.com)"}
      </p>
      <h2>{zh ? "我們收集咩" : "What we collect"}</h2>
      <p>
        {zh
          ? "為提供家長帳戶、試用與訂閱，我們可能收集電郵、顯示名稱、子女檔案資料、使用紀錄，以及由 Stripe 處理嘅付款相關資料（我們唔會儲存完整卡號）。"
          : "To provide parent accounts, trials, and subscriptions we may collect email, display name, child profile details you provide, usage logs, and payment-related data processed by Stripe (we do not store full card numbers)."}
      </p>
      <h2>{zh ? "點樣用" : "How we use it"}</h2>
      <p>
        {zh
          ? "用於認證、課程權限、客戶支援、防止濫用及法例要求。我們唔會出售個人資料。"
          : "We use data for authentication, library access, support, abuse prevention, and legal compliance. We do not sell personal data."}
      </p>
      <h2>{zh ? "聯絡" : "Contact"}</h2>
      <p>
        <a href="mailto:support@hksteamai.com">support@hksteamai.com</a>
      </p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/" className="btn btn-ghost">
          {t(locale, "navHome")}
        </Link>
      </p>
    </div>
  );
}
