import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { ModuleTags } from "@/lib/curriculum";
import { moduleDisplayTitle } from "@/lib/curriculum";
import { moduleKey } from "@/lib/entitlements";
import { getPaywallCopy } from "@/lib/catalog";

type Props = {
  locale: Locale;
  module: ModuleTags;
  allowed: boolean;
  gradeLabel?: string;
  /** Year was not read from a grade folder; label must stay a suggestion. */
  gradeSuggested?: boolean;
};

export function ModuleCard({
  locale,
  module,
  allowed,
  gradeLabel,
  gradeSuggested,
}: Props) {
  const key = moduleKey(module.path);
  const href = `/play/${key.split("/").map(encodeURIComponent).join("/")}`;
  const title = moduleDisplayTitle(module, locale);

  return (
    <article className={`module-card ${allowed ? "" : "locked"}`}>
      <div className="module-card-top">
        {module.freeDemo ? (
          <span className="badge free">{getPaywallCopy(locale, "freeBadge")}</span>
        ) : allowed ? null : (
          <span className="badge lock">{getPaywallCopy(locale, "lockedBadge") || t(locale, "locked")}</span>
        )}
        {gradeLabel ? (
          <span className={`grade-pill${gradeSuggested ? " suggested" : ""}`}>
            {gradeLabel}
          </span>
        ) : null}
      </div>
      <h3 className="module-title">{title}</h3>
      <p className="module-meta">
        {module.subject}
        {module.section && module.section !== "other" ? ` · ${module.section}` : ""}
      </p>
      {allowed ? (
        <Link href={href} className="btn btn-sm btn-primary">
          {t(locale, "openModule")}
        </Link>
      ) : (
        <div className="lock-actions">
          <Link href={href} className="btn btn-sm btn-ghost">
            {getPaywallCopy(locale, "lockedBadge")}
          </Link>
          <Link href="/pricing" className="btn btn-sm btn-accent">
            {getPaywallCopy(locale, "ctaTrial")}
          </Link>
        </div>
      )}
    </article>
  );
}
