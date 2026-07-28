import fs from "fs";
import path from "path";

/** Region keys used by the curriculum region switcher */
export type CurriculumSystem = "hk" | "uk" | "us" | "ib" | "sg" | "au" | "intl";

export type ModuleTags = {
  moduleId: string;
  path: string;
  title: string;
  titleZh?: string | null;
  subject: string;
  section?: "primary" | "secondary" | "other";
  /** Flat multi-system grade tags (UI-ready) */
  hk: string;
  uk: string;
  us: string;
  ib: string;
  sg: string;
  au?: string;
  /** Broad bands for International / Other parents */
  intl?: string;
  topics: string[];
  freeDemo?: boolean;
  demoId?: string;
  band?: string | null;
  why?: string;
};

export type CurriculumMap = {
  version: number;
  generatedAt: string;
  approximate: boolean;
  disclaimer: { en: string; "zh-HK": string };
  coverageNote?: { en: string; "zh-HK": string };
  systems: Record<
    CurriculumSystem,
    { id: string; label: string; labelZh: string; grades: string[] }
  >;
  stats?: {
    totalModules: number;
    freeDemos: number;
    byHkLevel: Record<string, number>;
  };
  modules: ModuleTags[];
};

const MAP_PATH = path.join(process.cwd(), "data", "curriculum-map.json");

let cache: CurriculumMap | null = null;

export function loadCurriculumMap(): CurriculumMap {
  if (cache) return cache;
  if (!fs.existsSync(MAP_PATH)) {
    return {
      version: 0,
      generatedAt: "",
      approximate: true,
      disclaimer: {
        en: "Grade labels are approximate equivalences for discovery, not official accreditation.",
        "zh-HK": "年級標籤僅供對照搜尋，並非官方認證。",
      },
      systems: {} as CurriculumMap["systems"],
      modules: [],
    };
  }
  cache = JSON.parse(fs.readFileSync(MAP_PATH, "utf8")) as CurriculumMap;
  return cache;
}

/** Clear in-memory cache (e.g. after regenerating the map in tests). */
export function clearCurriculumMapCache(): void {
  cache = null;
}

/**
 * Filter modules by region switcher selection.
 * `system` = active region key; `grade` / `subject` = "all" or specific value.
 */
export function filterBySystem(
  system: CurriculumSystem,
  grade?: string,
  subject?: string
): ModuleTags[] {
  const map = loadCurriculumMap();
  return map.modules.filter((m) => {
    const g = m[system];
    if (!g) return false;
    if (grade && grade !== "all" && g !== grade && !String(g).startsWith(grade)) {
      return false;
    }
    if (subject && subject !== "all" && m.subject !== subject) return false;
    return true;
  });
}

/** True when curriculum-map.json is missing or empty (UI should show fallback copy). */
export function isCurriculumFallback(): boolean {
  const map = loadCurriculumMap();
  return map.version === 0 || map.modules.length === 0;
}

/** Grades available for a system (for building the switcher dropdown). */
export function gradesForSystem(system: CurriculumSystem): string[] {
  const map = loadCurriculumMap();
  return map.systems[system]?.grades ?? [];
}

export function getDisclaimer(locale: "en" | "zh-HK" = "en"): string {
  const map = loadCurriculumMap();
  return map.disclaimer[locale] || map.disclaimer.en;
}

/** Grade tag for the active region switcher key. */
export function gradeForSystem(
  module: ModuleTags,
  system: CurriculumSystem
): string | undefined {
  return module[system] || undefined;
}

/** Bilingual title when free-demo polish supplied titleZh. */
export function moduleDisplayTitle(
  module: ModuleTags,
  locale: "en" | "zh-HK" = "en"
): string {
  if (locale === "zh-HK" && module.titleZh) return module.titleZh;
  return module.title;
}

/** Label shown on cards for the selected region (e.g. "KS2", "Grade 5"). */
export function gradeLabelFor(
  module: ModuleTags,
  system: CurriculumSystem,
  locale: "en" | "zh-HK" = "en"
): string {
  const g = gradeForSystem(module, system);
  if (!g) return "";
  if (system === "us") {
    return locale === "zh-HK" ? `美國 ${g === "K" ? "幼稚園" : `${g} 年級`}` : `Grade ${g}`;
  }
  if (system === "uk") {
    return locale === "zh-HK" ? `英國 ${g}` : g;
  }
  if (system === "hk") {
    return locale === "zh-HK"
      ? g.startsWith("P")
        ? `小${g.slice(1)}`
        : `中${g.slice(1)}`
      : g;
  }
  if (system === "sg") {
    return locale === "zh-HK" ? `新加坡 ${g}` : `SG ${g}`;
  }
  if (system === "ib") {
    return g;
  }
  if (system === "au") {
    return locale === "zh-HK" ? `澳洲 ${g}` : g;
  }
  if (system === "intl") {
    const zh: Record<string, string> = {
      "Early Primary": "初小",
      "Mid Primary": "中小",
      "Upper Primary": "高小",
      "Lower Secondary": "初中",
      "Upper Secondary": "高中",
    };
    return locale === "zh-HK" ? zh[g] || g : g;
  }
  return g;
}

export const CURRICULUM_SYSTEMS: CurriculumSystem[] = [
  "hk",
  "uk",
  "us",
  "ib",
  "sg",
  "au",
  "intl",
];

/** Library browse band — matches folder structure Primary_School / Secondary_School. */
export type LibrarySection = "primary" | "secondary";

const SUBJECT_LABELS: Record<string, { en: string; "zh-HK": string }> = {
  mathematics: { en: "Mathematics", "zh-HK": "數學" },
  chinese: { en: "Chinese", "zh-HK": "中文" },
  english: { en: "English", "zh-HK": "英文" },
  "general-studies": { en: "General Studies", "zh-HK": "常識" },
  physics: { en: "Physics", "zh-HK": "物理" },
  chemistry: { en: "Chemistry", "zh-HK": "化學" },
  biology: { en: "Biology", "zh-HK": "生物" },
  science: { en: "Junior Science", "zh-HK": "初中科學" },
  ict: { en: "ICT", "zh-HK": "資訊科技" },
  geography: { en: "Geography", "zh-HK": "地理" },
  history: { en: "History", "zh-HK": "歷史" },
  "chinese-history": { en: "Chinese History", "zh-HK": "中國歷史" },
  economics: { en: "Economics", "zh-HK": "經濟" },
  music: { en: "Music", "zh-HK": "音樂" },
  general: { en: "General", "zh-HK": "其他" },
  "science-health": { en: "Science (Health)", "zh-HK": "科學（健康）" },
  "science-environment": { en: "Science (Environment)", "zh-HK": "科學（環境）" },
};

const PRIMARY_SUBJECT_ORDER = [
  "mathematics",
  "chinese",
  "english",
  "general-studies",
  "science-health",
  "science-environment",
  "general",
];

const SECONDARY_SUBJECT_ORDER = [
  "physics",
  "chemistry",
  "biology",
  "mathematics",
  "science",
  "chinese",
  "geography",
  "history",
  "ict",
  "chinese-history",
  "economics",
  "music",
  "general",
];

/** Bilingual subject label from curriculum-map subject slug. */
export function subjectLabel(
  subject: string,
  locale: "en" | "zh-HK" = "en"
): string {
  const row = SUBJECT_LABELS[subject];
  if (!row) return subject;
  return locale === "zh-HK" ? row["zh-HK"] : row.en;
}

/** English subtitle for bilingual subject headings. */
export function subjectLabelEn(subject: string): string {
  return SUBJECT_LABELS[subject]?.en ?? subject;
}

export function subjectOrderForSection(section: LibrarySection): string[] {
  return section === "primary" ? PRIMARY_SUBJECT_ORDER : SECONDARY_SUBJECT_ORDER;
}

export function modulesForSection(section: LibrarySection): ModuleTags[] {
  const map = loadCurriculumMap();
  return map.modules.filter((m) => m.section === section);
}

export function subjectsInSection(
  section: LibrarySection,
  modules?: ModuleTags[]
): string[] {
  const mods = modules ?? modulesForSection(section);
  const set = new Set(mods.map((m) => m.subject).filter(Boolean));
  const order = subjectOrderForSection(section);
  const sorted = order.filter((s) => set.has(s));
  const rest = [...set].filter((s) => !order.includes(s)).sort();
  return [...sorted, ...rest];
}

/** Grade bucket key for grouping (falls back to "general"). */
export function gradeBucket(
  module: ModuleTags,
  system: CurriculumSystem
): string {
  return gradeForSystem(module, system) || "general";
}

export function countModulesByGrade(
  modules: ModuleTags[],
  system: CurriculumSystem
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const m of modules) {
    const g = gradeBucket(m, system);
    counts[g] = (counts[g] || 0) + 1;
  }
  return counts;
}

function gradeSortKey(grade: string): number {
  if (grade === "general") return 900;
  if (grade.startsWith("P")) return parseInt(grade.slice(1), 10);
  if (grade.startsWith("F")) return 100 + parseInt(grade.slice(1), 10);
  if (grade.startsWith("KS")) return 200 + parseInt(grade.slice(2), 10);
  if (grade.startsWith("Y")) return 300 + parseInt(grade.slice(1), 10);
  if (grade.startsWith("S")) return 400 + parseInt(grade.slice(1), 10);
  const n = parseInt(grade, 10);
  if (!Number.isNaN(n)) return 500 + n;
  return 800;
}

export function sortGradeKeys(grades: string[]): string[] {
  return [...grades].sort((a, b) => gradeSortKey(a) - gradeSortKey(b));
}

export function groupModulesByGrade(
  modules: ModuleTags[],
  system: CurriculumSystem
): { grade: string; modules: ModuleTags[] }[] {
  const map = new Map<string, ModuleTags[]>();
  for (const m of modules) {
    const g = gradeBucket(m, system);
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(m);
  }
  return sortGradeKeys([...map.keys()]).map((grade) => ({
    grade,
    modules: map.get(grade)!,
  }));
}

/** Label for a grade bucket in library group headings. */
export function gradeGroupLabel(
  grade: string,
  system: CurriculumSystem,
  locale: "en" | "zh-HK" = "en"
): string {
  if (grade === "general") {
    return locale === "zh-HK" ? "一般" : "General";
  }
  const stub: ModuleTags = {
    moduleId: "",
    path: "",
    title: "",
    subject: "",
    hk: grade.startsWith("P") || grade.startsWith("F") ? grade : "",
    uk: grade.startsWith("KS") ? grade : "",
    us: /^\d+$|^K$/.test(grade) ? grade : "",
    ib: "",
    sg: "",
    topics: [],
  };
  if (system === "hk") stub.hk = grade;
  else if (system === "uk") stub.uk = grade;
  else if (system === "us") stub.us = grade;
  else if (system === "sg") stub.sg = grade;
  else if (system === "ib") stub.ib = grade;
  else if (system === "au") stub.au = grade;
  else if (system === "intl") stub.intl = grade;
  return gradeLabelFor(stub, system, locale) || grade;
}

/** Optional subject filter on top of region/grade. */
export function filterModules(
  system: CurriculumSystem,
  grade?: string,
  subject?: string
): ModuleTags[] {
  return filterBySystem(system, grade, subject);
}
