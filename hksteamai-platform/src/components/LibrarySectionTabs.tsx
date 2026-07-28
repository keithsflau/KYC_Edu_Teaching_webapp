"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { LibrarySection } from "@/lib/curriculum";

type Props = {
  locale: Locale;
  section: LibrarySection;
};

export function LibrarySectionTabs({ locale, section }: Props) {
  const params = useSearchParams();

  function hrefFor(next: LibrarySection) {
    const q = new URLSearchParams(params.toString());
    q.set("section", next);
    q.delete("subject");
    q.delete("grade");
    const s = q.toString();
    return s ? `/library?${s}` : "/library";
  }

  return (
    <div className="library-section-nav">
      <Link href="/library" className="library-back-link">
        ← {t(locale, "libraryBackLevel")}
      </Link>
      <nav className="library-tabs" aria-label="School level">
        <Link
          href={hrefFor("secondary")}
          className={`library-tab ${section === "secondary" ? "active" : ""}`}
        >
          {t(locale, "librarySecondaryTab")}
          <span className="library-tab-en">
            {locale === "zh-HK" ? "Secondary" : "中學"}
          </span>
        </Link>
        <Link
          href={hrefFor("primary")}
          className={`library-tab ${section === "primary" ? "active" : ""}`}
        >
          {t(locale, "libraryPrimaryTab")}
          <span className="library-tab-en">
            {locale === "zh-HK" ? "Primary" : "小學"}
          </span>
        </Link>
      </nav>
    </div>
  );
}
