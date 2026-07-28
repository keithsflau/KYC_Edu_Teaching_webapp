import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <h1>{t(locale, "brand")}</h1>
            <p className="lead">
              {t(locale, "tagline")}
              <br />
              {t(locale, "heroLead")}
            </p>
            <div className="hero-ctas">
              <Link href="/library" className="btn btn-primary">
                {t(locale, "ctaBrowse")}
              </Link>
              <Link href="/register" className="btn btn-accent">
                {t(locale, "ctaTrial")}
              </Link>
              <Link href="/login" className="btn btn-ghost">
                {t(locale, "navLogin")}
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                {t(locale, "navPricing")}
              </Link>
            </div>
          </div>
          <aside className="hero-panel" aria-hidden>
            <strong>
              {locale === "zh-HK" ? "全球家庭 · STEM 互動課" : "Families · Interactive STEM"}
            </strong>
            <span>
              {locale === "zh-HK"
                ? "香港課件對照多地區年級 · 免費示範即玩"
                : "HK modules mapped to global grades · free demos ready"}
            </span>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2>{t(locale, "featuresTitle")}</h2>
          <p className="section-lead">{t(locale, "productWhat")}</p>
          <div className="feature-grid">
            <article className="feature">
              <h3>{t(locale, "feature1Title")}</h3>
              <p>{t(locale, "feature1Body")}</p>
            </article>
            <article className="feature">
              <h3>{t(locale, "feature2Title")}</h3>
              <p>{t(locale, "feature2Body")}</p>
            </article>
            <article className="feature">
              <h3>{t(locale, "feature3Title")}</h3>
              <p>{t(locale, "feature3Body")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2>{t(locale, "pricingTitle")}</h2>
          <p className="section-lead">{t(locale, "homePricingLead")}</p>
          <div className="feature-grid">
            <article className="feature">
              <h3>{t(locale, "freePlan")}</h3>
              <p>{t(locale, "freeDesc")}</p>
            </article>
            <article className="feature">
              <h3>{t(locale, "basicPlan")} · 98 HKD{locale === "zh-HK" ? "／月" : "/mo"}</h3>
              <p>{t(locale, "basicDesc")}</p>
            </article>
            <article className="feature">
              <h3>{t(locale, "proPlan")} · 148 HKD{locale === "zh-HK" ? "／月" : "/mo"}</h3>
              <p>{t(locale, "proDesc")}</p>
            </article>
          </div>
          <p style={{ marginTop: "1.25rem" }}>
            <Link href="/pricing" className="btn btn-primary">
              {t(locale, "navPricing")}
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2>{t(locale, "contactTitle")}</h2>
          <p className="section-lead">
            {t(locale, "contactLead")}{" "}
            <a href="mailto:support@hksteamai.com">support@hksteamai.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
