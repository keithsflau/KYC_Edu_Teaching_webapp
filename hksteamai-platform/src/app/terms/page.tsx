import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Terms" };

export default async function TermsPage() {
  const locale = await getLocale();
  const zh = locale === "zh-HK";

  return (
    <div className="shell" style={{ paddingTop: "2rem", maxWidth: "42rem" }}>
      <h1>{t(locale, "termsTitle")}</h1>
      <p className="section-lead">
        {zh
          ? "最後更新：2026-07-22 · 營運者：HK Steam AI（hksteamai.com）"
          : "Last updated: 2026-07-22 · Operator: HK Steam AI (hksteamai.com)"}
      </p>
      <h2>{zh ? "服務內容" : "The service"}</h2>
      <p>
        {zh
          ? "HK Steam AI 提供網上互動 STEM／STEAM 模組及家長訂閱（Free／Basic／Pro）。權限以網站當時顯示為準。"
          : "HK Steam AI provides interactive STEM/STEAM modules and parent subscriptions (Free / Basic / Pro). Access follows what the site shows at the time."}
      </p>
      <h2>{zh ? "訂閱與付款" : "Billing"}</h2>
      <p>
        {zh
          ? "付費計劃以港幣經 Stripe 收費。訂閱會按週期續訂直至取消。試用結束未訂閱則回復免費示範。"
          : "Paid plans are billed in HKD via Stripe and renew until cancelled. After a trial without a subscription, access returns to free demos."}
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
