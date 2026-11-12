import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { CurriculumSystem, LibrarySection } from "@/lib/curriculum";

type Props = {
  locale: Locale;
  system: CurriculumSystem;
};

export function LibraryLevelPicker({ locale, system }: Props) {
  function href(section: LibrarySection) {
    const q = new URLSearchParams();
    q.set("section", section);
    if (system !== "hk") q.set("system", system);
    return `/library?${q.toString()}`;
  }

  return (
    <div className="library-level-picker">
      <Link href={href("primary")} className="library-level-card">
        <h2>{t(locale, "libraryPrimaryTab")}</h2>
        <p className="library-level-card-sub">
          {locale === "zh-HK" ? "Primary" : "小學"}
        </p>
        <p className="library-level-card-lead">
          {t(locale, "libraryLevelPrimaryLead")}
        </p>
      </Link>
      <Link href={href("secondary")} className="library-level-card">
        <h2>{t(locale, "librarySecondaryTab")}</h2>
        <p className="library-level-card-sub">
          {locale === "zh-HK" ? "Secondary" : "中學"}
        </p>
        <p className="library-level-card-lead">
          {t(locale, "libraryLevelSecondaryLead")}
        </p>
      </Link>
    </div>
  );
}
