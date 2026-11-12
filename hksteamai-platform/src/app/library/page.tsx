/**
 * Library IA: section (primary | secondary) → subject → grade/form → modules.
 * URL: /library?section=secondary&subject=physics&system=hk
 */
import { Suspense } from "react";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import {
  CURRICULUM_SYSTEMS,
  getDisclaimer,
  isCurriculumFallback,
  loadCurriculumMap,
  modulesForSection,
  type CurriculumSystem,
  type LibrarySection,
} from "@/lib/curriculum";
import { auth } from "@/lib/auth";
import { getUserAccess } from "@/lib/entitlements";
import { LibraryFilters } from "@/components/LibraryFilters";
import { LibraryLevelPicker } from "@/components/LibraryLevelPicker";
import { LibrarySectionTabs } from "@/components/LibrarySectionTabs";
import { LibrarySubjectGrid } from "@/components/LibrarySubjectGrid";
import { LibrarySubjectModules } from "@/components/LibrarySubjectModules";

export const metadata = { title: "Library" };
export const dynamic = "force-dynamic";

type Search = Promise<{
  section?: string;
  subject?: string;
  system?: string;
  grade?: string;
}>;

function parseSection(raw?: string): LibrarySection | null {
  if (raw === "primary" || raw === "secondary") return raw;
  return null;
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const locale = await getLocale();
  const sp = await searchParams;
  const map = loadCurriculumMap();
  const section = parseSection(sp.section);
  const subject = sp.subject || "all";
  const grade =
    sp.grade && sp.grade !== "all" ? sp.grade : undefined;
  const system = (
    CURRICULUM_SYSTEMS.includes(sp.system as CurriculumSystem)
      ? sp.system
      : "hk"
  ) as CurriculumSystem;

  const sectionModules = section ? modulesForSection(section) : [];
  const subjectModules =
    subject !== "all"
      ? sectionModules.filter((m) => m.subject === subject)
      : [];

  const session = await auth();
  let entitlement: Awaited<ReturnType<typeof getUserAccess>>["entitlement"] =
    "free";
  try {
    entitlement = (await getUserAccess(session?.user?.id)).entitlement;
  } catch {
    entitlement = "free";
  }

  const systemsForFilters = Object.fromEntries(
    CURRICULUM_SYSTEMS.filter((k) => map.systems[k]).map((k) => [
      k,
      {
        label: map.systems[k].label,
        labelZh: map.systems[k].labelZh,
        grades: map.systems[k].grades,
      },
    ])
  );

  return (
    <div className="shell">
      <header className="page-head">
        <h1>{t(locale, "libraryTitle")}</h1>
        <p>{t(locale, "libraryLead")}</p>
        <p className="disclaimer">{getDisclaimer(locale)}</p>
        {isCurriculumFallback() ? (
          <p className="form-hint warn" style={{ marginTop: "0.75rem" }}>
            {t(locale, "libraryEmpty")}
          </p>
        ) : null}
      </header>

      {!section ? (
        <LibraryLevelPicker locale={locale} system={system} />
      ) : (
        <Suspense fallback={null}>
          <LibrarySectionTabs locale={locale} section={section} />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <LibraryFilters
          locale={locale}
          systems={systemsForFilters}
          system={system}
        />
      </Suspense>

      {!section ? null : subject !== "all" && subjectModules.length > 0 ? (
        <LibrarySubjectModules
          locale={locale}
          subject={subject}
          modules={subjectModules}
          system={system}
          section={section}
          systemQuery={system}
          entitlement={entitlement}
          selectedGrade={grade}
        />
      ) : subject !== "all" && subjectModules.length === 0 ? (
        <p className="form-hint warn">{t(locale, "libraryEmpty")}</p>
      ) : (
        <LibrarySubjectGrid
          locale={locale}
          section={section}
          modules={sectionModules}
          system={system}
          systemQuery={system}
        />
      )}
    </div>
  );
}
