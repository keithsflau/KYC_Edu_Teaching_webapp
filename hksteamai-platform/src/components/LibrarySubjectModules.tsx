import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { CurriculumSystem, ModuleTags } from "@/lib/curriculum";
import {
  gradeGroupLabel,
  gradeLabelFor,
  groupModulesByGrade,
  isPathGuessedGrade,
  subjectLabel,
  subjectLabelEn,
} from "@/lib/curriculum";
import type { Entitlement } from "@/lib/entitlements";
import { canAccessModule } from "@/lib/entitlements";
import { ModuleCard } from "@/components/ModuleCard";

type Props = {
  locale: Locale;
  subject: string;
  modules: ModuleTags[];
  system: CurriculumSystem;
  section: "primary" | "secondary";
  systemQuery: string;
  entitlement: Entitlement;
  selectedGrade?: string;
};

export function LibrarySubjectModules({
  locale,
  subject,
  modules,
  system,
  section,
  systemQuery,
  entitlement,
  selectedGrade,
}: Props) {
  const groups = groupModulesByGrade(modules, system);
  const visible = selectedGrade
    ? groups.filter((g) => g.grade === selectedGrade)
    : groups;

  function hrefFor(grade?: string) {
    const q = new URLSearchParams();
    q.set("section", section);
    q.set("subject", subject);
    if (grade) q.set("grade", grade);
    if (systemQuery && systemQuery !== "hk") q.set("system", systemQuery);
    return `/library?${q.toString()}`;
  }

  const backQ = new URLSearchParams();
  backQ.set("section", section);
  if (systemQuery && systemQuery !== "hk") backQ.set("system", systemQuery);
  const backHref = `/library?${backQ.toString()}`;

  function groupIsAllGuessed(gradeMods: ModuleTags[]) {
    return gradeMods.length > 0 && gradeMods.every((m) => isPathGuessedGrade(m));
  }

  function groupHeading(grade: string, gradeMods: ModuleTags[]) {
    const base = gradeGroupLabel(grade, system, locale);
    return groupIsAllGuessed(gradeMods)
      ? `${t(locale, "librarySuggestedGrade")} · ${base}`
      : base;
  }

  const shownCount = visible.reduce((n, g) => n + g.modules.length, 0);

  const levelLabel =
    section === "primary"
      ? t(locale, "libraryPrimaryTab")
      : t(locale, "librarySecondaryTab");
  const selectedGroup = selectedGrade
    ? groups.find((g) => g.grade === selectedGrade)
    : undefined;
  const activeGradeLabel = selectedGroup
    ? groupHeading(selectedGroup.grade, selectedGroup.modules)
    : selectedGrade
      ? gradeGroupLabel(selectedGrade, system, locale)
      : t(locale, "allGrades");

  return (
    <div className="library-subject-detail">
      <Link href={backHref} className="library-back-link">
        ← {t(locale, "libraryBackSubjects")}
      </Link>

      <header className="library-subject-detail-head">
        <p className="library-browse-path">
          {levelLabel}
          {" → "}
          {subjectLabel(subject, locale)}
          {" → "}
          {activeGradeLabel}
        </p>
        <h2>{subjectLabel(subject, locale)}</h2>
        <p>
          {subjectLabelEn(subject)} ·{" "}
          {t(locale, "libraryModuleCount", { count: shownCount })}
        </p>
        <p className="library-grade-note">{t(locale, "libraryGradeHonesty")}</p>
      </header>

      <nav className="library-grade-nav" aria-label={t(locale, "gradeLabel")}>
        <Link
          href={hrefFor()}
          className={`library-grade-chip${selectedGrade ? "" : " active"}`}
        >
          {t(locale, "allGrades")}
        </Link>
        {groups.map(({ grade, modules: gradeMods }) => (
          <Link
            key={grade}
            href={hrefFor(grade)}
            className={`library-grade-chip${
              selectedGrade === grade ? " active" : ""
            }`}
          >
            {groupHeading(grade, gradeMods)}
          </Link>
        ))}
      </nav>

      {visible.length === 0 ? (
        <p className="form-hint warn">{t(locale, "libraryGradeEmpty")}</p>
      ) : null}

      {visible.map(({ grade, modules: gradeMods }) => {
        const guessedCount = gradeMods.filter((m) => isPathGuessedGrade(m)).length;
        const allGuessed = groupIsAllGuessed(gradeMods);
        const heading = groupHeading(grade, gradeMods);

        return (
          <section
            key={grade}
            className="library-grade-section"
            id={`grade-${grade.replace(/\s+/g, "-")}`}
          >
            <h3 className="library-grade-heading">{heading}</h3>
            {guessedCount > 0 ? (
              <p className="library-grade-note">
                {allGuessed
                  ? t(locale, "librarySuggestedGradeNote")
                  : t(locale, "librarySuggestedGradeMixed")}
              </p>
            ) : null}
            <div className="module-grid">
              {gradeMods.map((m) => {
                const decision = canAccessModule(entitlement, m.path);
                const guessed = isPathGuessedGrade(m);
                const base = gradeLabelFor(m, system, locale);
                return (
                  <ModuleCard
                    key={m.moduleId || m.path}
                    locale={locale}
                    module={m}
                    allowed={decision.allowed}
                    gradeSuggested={guessed}
                    gradeLabel={
                      guessed
                        ? `${t(locale, "librarySuggestedGrade")} · ${base}`
                        : base
                    }
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
