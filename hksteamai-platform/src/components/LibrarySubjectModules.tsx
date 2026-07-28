import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { CurriculumSystem, ModuleTags } from "@/lib/curriculum";
import {
  gradeGroupLabel,
  groupModulesByGrade,
  subjectLabel,
  subjectLabelEn,
} from "@/lib/curriculum";
import type { Entitlement } from "@/lib/entitlements";
import { canAccessModule } from "@/lib/entitlements";
import { ModuleCard } from "@/components/ModuleCard";
import { gradeLabelFor } from "@/lib/curriculum";

type Props = {
  locale: Locale;
  subject: string;
  modules: ModuleTags[];
  system: CurriculumSystem;
  section: "primary" | "secondary";
  systemQuery: string;
  entitlement: Entitlement;
};

export function LibrarySubjectModules({
  locale,
  subject,
  modules,
  system,
  section,
  systemQuery,
  entitlement,
}: Props) {
  const groups = groupModulesByGrade(modules, system);

  const backQ = new URLSearchParams();
  backQ.set("section", section);
  if (systemQuery && systemQuery !== "hk") backQ.set("system", systemQuery);
  const backHref = `/library?${backQ.toString()}`;

  return (
    <div className="library-subject-detail">
      <Link href={backHref} className="library-back-link">
        ← {t(locale, "libraryBackSubjects")}
      </Link>

      <header className="library-subject-detail-head">
        <h2>{subjectLabel(subject, locale)}</h2>
        <p>
          {subjectLabelEn(subject)} ·{" "}
          {t(locale, "libraryModuleCount", { count: modules.length })}
        </p>
      </header>

      {groups.map(({ grade, modules: gradeMods }) => (
        <section key={grade} className="library-grade-section">
          <h3 className="library-grade-heading">
            {gradeGroupLabel(grade, system, locale)}
          </h3>
          <div className="module-grid">
            {gradeMods.map((m) => {
              const decision = canAccessModule(entitlement, m.path);
              return (
                <ModuleCard
                  key={m.moduleId || m.path}
                  locale={locale}
                  module={m}
                  allowed={decision.allowed}
                  gradeLabel={gradeLabelFor(m, system, locale)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
