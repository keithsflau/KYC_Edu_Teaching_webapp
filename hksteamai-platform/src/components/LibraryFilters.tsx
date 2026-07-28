"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { CurriculumSystem } from "@/lib/curriculum";

type SystemInfo = { label: string; labelZh: string; grades: string[] };

type Props = {
  locale: Locale;
  systems: Partial<Record<CurriculumSystem, SystemInfo>>;
  system: CurriculumSystem;
};

export function LibraryFilters({ locale, systems, system }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function update(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (!v || v === "all") next.delete(k);
      else next.set(k, v);
    }
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  }

  return (
    <div className="filters library-region-filter">
      <label>
        <span>{t(locale, "regionLabel")}</span>
        <select
          value={system}
          onChange={(e) => update({ system: e.target.value })}
        >
          {(Object.keys(systems) as CurriculumSystem[]).map((key) => {
            const info = systems[key];
            if (!info) return null;
            return (
              <option key={key} value={key}>
                {locale === "zh-HK" ? info.labelZh : info.label}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
