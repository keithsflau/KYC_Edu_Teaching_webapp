import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type {
  CurriculumSystem,
  LibrarySection,
  ModuleTags,
} from "@/lib/curriculum";
import {
  countModulesByGrade,
  gradeBucket,
  gradeGroupLabel,
  isPathGuessedGrade,
  sortGradeKeys,
  subjectLabel,
  subjectLabelEn,
  subjectsInSection,
} from "@/lib/curriculum";

type Props = {
  locale: Locale;
  section: LibrarySection;
  modules: ModuleTags[];
  system: CurriculumSystem;
  systemQuery: string;
};

const SCIENCE_SUBJECTS = ["physics", "chemistry", "biology"];

export function LibrarySubjectGrid({
  locale,
  section,
  modules,
  system,
  systemQuery,
}: Props) {
  const subjects = subjectsInSection(section, modules);
  const bySubject = new Map<string, ModuleTags[]>();
  for (const m of modules) {
    if (!bySubject.has(m.subject)) bySubject.set(m.subject, []);
    bySubject.get(m.subject)!.push(m);
  }

  const scienceFeatured =
    section === "secondary"
      ? SCIENCE_SUBJECTS
          .map((s) => ({ subject: s, mods: bySubject.get(s) || [] }))
          .filter((x) => x.mods.length > 0)
      : [];

  function subjectHref(subject: string, grade?: string) {
    const q = new URLSearchParams();
    q.set("section", section);
    q.set("subject", subject);
    if (grade) q.set("grade", grade);
    if (systemQuery && systemQuery !== "hk") q.set("system", systemQuery);
    return `/library?${q.toString()}`;
  }

  function gradeLinkLabel(mods: ModuleTags[], grade: string) {
    const base = gradeGroupLabel(grade, system, locale);
    const inGrade = mods.filter((m) => gradeBucket(m, system) === grade);
    const allGuessed =
      inGrade.length > 0 && inGrade.every((m) => isPathGuessedGrade(m));
    return allGuessed
      ? `${t(locale, "librarySuggestedGrade")} · ${base}`
      : base;
  }

  return (
    <div className="library-subject-index">
      {scienceFeatured.length > 0 ? (
        <section className="library-featured-science">
          <div className="library-featured-science-inner">
            <div className="library-featured-science-head">
              <h2>{t(locale, "libraryScienceFeatured")}</h2>
              <p>{t(locale, "libraryScienceFeaturedLead")}</p>
            </div>
            <div className="library-featured-science-grid">
              {scienceFeatured.map(({ subject, mods }) => (
                <Link
                  key={subject}
                  href={subjectHref(subject)}
                  className="library-featured-science-card"
                >
                  <div>
                    <strong>{subjectLabel(subject, locale)}</strong>
                    <span>{subjectLabelEn(subject)}</span>
                  </div>
                  <span className="library-featured-count">{mods.length}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <h2 className="library-section-heading">
        {section === "primary"
          ? locale === "zh-HK"
            ? "小學科目"
            : "Primary subjects"
          : locale === "zh-HK"
            ? "中學科目"
            : "Secondary subjects"}
      </h2>
      <p className="library-grade-note">{t(locale, "libraryGradeHonesty")}</p>

      <div className="library-subject-grid">
        {subjects.map((subject) => {
          const mods = bySubject.get(subject) || [];
          const gradeCounts = countModulesByGrade(mods, system);
          const grades = sortGradeKeys(Object.keys(gradeCounts));

          return (
            <article key={subject} className="library-subject-card">
              <div className="library-subject-card-head">
                <div>
                  <h3>{subjectLabel(subject, locale)}</h3>
                  <p>{subjectLabelEn(subject)}</p>
                </div>
                <span className="library-subject-count">
                  {t(locale, "libraryModuleCount", { count: mods.length })}
                </span>
              </div>
              <ul className="library-grade-breakdown">
                {grades.map((g) => (
                  <li key={g}>
                    <Link href={subjectHref(subject, g)}>
                      <span className="library-grade-name">
                        {gradeLinkLabel(mods, g)}
                      </span>
                      <span>{gradeCounts[g]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={subjectHref(subject)} className="btn btn-ghost btn-sm library-enter-subject">
                {t(locale, "libraryEnterSubject")}
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
