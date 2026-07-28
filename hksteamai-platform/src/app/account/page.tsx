import { redirect } from "next/navigation";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserAccess } from "@/lib/entitlements";
import { maxChildren, planLabel, statusLabel } from "@/lib/plans";
import { PortalButton } from "@/components/PortalButton";
import { AddChildForm } from "@/components/AddChildForm";
import Link from "next/link";

export const metadata = { title: "Account" };

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?next=/account");
  }

  const sp = await searchParams;
  const access = await getUserAccess(session.user.id);
  const children = await prisma.childProfile.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });
  const max = maxChildren(access.entitlement, access.subscription?.status);
  const sub = access.subscription;

  const entitlementLabel =
    access.entitlement === "all"
      ? locale === "zh-HK"
        ? "完整庫（小學 + 中學）"
        : "Full library (primary + secondary)"
      : access.entitlement === "primary"
        ? locale === "zh-HK"
          ? "小學課程帶"
          : "Primary band"
        : access.entitlement === "secondary"
          ? locale === "zh-HK"
            ? "中學課程帶"
            : "Secondary band"
          : locale === "zh-HK"
            ? "免費示範"
            : "Free demos only";

  return (
    <div className="shell">
      <header className="page-head">
        <h1>{t(locale, "accountTitle")}</h1>
        <p>
          {t(locale, "signedInAs")} {session.user.email}
        </p>
        {sp.checkout === "success" ? (
          <div className="checkout-success-banner">
            <p className="form-hint">
              {locale === "zh-HK"
                ? "結帳成功（或已完成跳轉）。訂閱狀態會由 webhook 更新。"
                : "Checkout success. Subscription status updates via webhook."}
            </p>
            <Link href="/library" className="btn btn-primary btn-sm">
              {t(locale, "goToLibrary")}
            </Link>
          </div>
        ) : null}
      </header>

      <div className="account-grid">
        <section className="panel">
          <h2>{t(locale, "subStatus")}</h2>
          <dl className="kv">
            <dt>{t(locale, "subStatus")}</dt>
            <dd>{statusLabel(sub?.status, locale)}</dd>
            <dt>{t(locale, "entitlement")}</dt>
            <dd>{entitlementLabel}</dd>
            <dt>{locale === "zh-HK" ? "計劃" : "Plan"}</dt>
            <dd>{planLabel(sub?.plan, locale)}</dd>
            {sub?.trialEndsAt ? (
              <>
                <dt>{locale === "zh-HK" ? "試用結束" : "Trial ends"}</dt>
                <dd>{sub.trialEndsAt.toISOString().slice(0, 10)}</dd>
              </>
            ) : null}
            {sub?.currentPeriodEnd ? (
              <>
                <dt>{locale === "zh-HK" ? "本期結束" : "Period end"}</dt>
                <dd>{sub.currentPeriodEnd.toISOString().slice(0, 10)}</dd>
              </>
            ) : null}
          </dl>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn btn-primary btn-sm">
              {t(locale, "ctaSubscribe")}
            </Link>
            <PortalButton locale={locale} />
          </div>
        </section>

        <section className="panel">
          <h2>{t(locale, "children")}</h2>
          {children.length === 0 ? (
            <p className="form-hint">{t(locale, "noChildren")}</p>
          ) : (
            <ul className="child-list">
              {children.map((c) => (
                <li key={c.id}>
                  <strong>{c.name}</strong>
                  <span>{c.gradeHint || "—"}</span>
                </li>
              ))}
            </ul>
          )}
          <AddChildForm locale={locale} max={max} current={children.length} />
        </section>
      </div>
    </div>
  );
}
