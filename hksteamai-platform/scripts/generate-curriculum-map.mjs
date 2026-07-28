/**
 * Heuristic curriculum mapper: Primary_School / Secondary_School → multi-system tags.
 *
 * Run from hksteamai-platform:
 *   node scripts/generate-curriculum-map.mjs
 *   npm run curriculum:generate
 *
 * Mapping is approximate equivalence for discovery — NOT official accreditation.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLATFORM = path.resolve(__dirname, "..");
const REPO = path.resolve(PLATFORM, "..");
const OUT = path.join(PLATFORM, "data", "curriculum-map.json");
const FREE = path.join(PLATFORM, "data", "free-demo-catalog.json");

const DISCLAIMER = {
  en: "Grade / Key Stage / IB / Singapore labels are approximate equivalences for discovery only. They are not official accreditation, syllabus endorsement, or a claim that content matches another jurisdiction’s exam board.",
  "zh-HK":
    "年級／Key Stage／IB／新加坡等標籤僅供對照搜尋，屬粗略對應，並非官方認證、課程認可，亦不代表內容等同其他地區考試局大綱。",
};

/** System metadata for region switcher UI */
const SYSTEMS = {
  hk: {
    id: "hk",
    label: "Hong Kong",
    labelZh: "香港",
    grades: ["P1", "P2", "P3", "P4", "P5", "P6", "F1", "F2", "F3", "F4", "F5", "F6"],
  },
  uk: {
    id: "uk",
    label: "England & Wales (Key Stages)",
    labelZh: "英國（Key Stage）",
    grades: ["KS1", "KS2", "KS3", "KS4"],
  },
  us: {
    id: "us",
    label: "United States (Grades)",
    labelZh: "美國（年級）",
    grades: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  ib: {
    id: "ib",
    label: "IB Continuum",
    labelZh: "IB",
    grades: ["PYP", "MYP", "DP"],
  },
  sg: {
    id: "sg",
    label: "Singapore",
    labelZh: "新加坡",
    grades: ["P1", "P2", "P3", "P4", "P5", "P6", "S1", "S2", "S3", "S4"],
  },
  au: {
    id: "au",
    label: "Australia (optional)",
    labelZh: "澳洲（可選）",
    grades: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12"],
  },
  /** Fallback for parents whose system is not listed — broad age bands only */
  intl: {
    id: "intl",
    label: "International / Other",
    labelZh: "國際／其他",
    grades: [
      "Early Primary",
      "Mid Primary",
      "Upper Primary",
      "Lower Secondary",
      "Upper Secondary",
    ],
  },
};

/**
 * HK level → multi-system approximate bands.
 * F4–F6 map to KS4 (not GCSE as a separate grade key — GCSE is an exam label).
 */
const HK_TO_SYSTEMS = {
  P1: {
    hk: "P1",
    uk: "KS1",
    us: "1",
    ib: "PYP",
    sg: "P1",
    au: "Y1",
    intl: "Early Primary",
  },
  P2: {
    hk: "P2",
    uk: "KS1",
    us: "2",
    ib: "PYP",
    sg: "P2",
    au: "Y2",
    intl: "Early Primary",
  },
  P3: {
    hk: "P3",
    uk: "KS2",
    us: "3",
    ib: "PYP",
    sg: "P3",
    au: "Y3",
    intl: "Mid Primary",
  },
  P4: {
    hk: "P4",
    uk: "KS2",
    us: "4",
    ib: "PYP",
    sg: "P4",
    au: "Y4",
    intl: "Mid Primary",
  },
  P5: {
    hk: "P5",
    uk: "KS2",
    us: "5",
    ib: "PYP",
    sg: "P5",
    au: "Y5",
    intl: "Upper Primary",
  },
  P6: {
    hk: "P6",
    uk: "KS2",
    us: "6",
    ib: "PYP",
    sg: "P6",
    au: "Y6",
    intl: "Upper Primary",
  },
  F1: {
    hk: "F1",
    uk: "KS3",
    us: "7",
    ib: "MYP",
    sg: "S1",
    au: "Y7",
    intl: "Lower Secondary",
  },
  F2: {
    hk: "F2",
    uk: "KS3",
    us: "8",
    ib: "MYP",
    sg: "S2",
    au: "Y8",
    intl: "Lower Secondary",
  },
  F3: {
    hk: "F3",
    uk: "KS3",
    us: "9",
    ib: "MYP",
    sg: "S3",
    au: "Y9",
    intl: "Lower Secondary",
  },
  F4: {
    hk: "F4",
    uk: "KS4",
    us: "10",
    ib: "DP",
    sg: "S4",
    au: "Y10",
    intl: "Upper Secondary",
  },
  F5: {
    hk: "F5",
    uk: "KS4",
    us: "11",
    ib: "DP",
    sg: "S4",
    au: "Y11",
    intl: "Upper Secondary",
  },
  F6: {
    hk: "F6",
    uk: "KS4",
    us: "12",
    ib: "DP",
    sg: "S4",
    au: "Y12",
    intl: "Upper Secondary",
  },
};

/** Manual overrides for free demos / path edge cases (path without index.html) */
const PATH_OVERRIDES = {
  "Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System": {
    hk: "F4",
    topicsExtra: ["astronomy", "space", "3d"],
  },
  "Secondary_School/Mathematics/M1": { hk: "F5" },
  "Secondary_School/Mathematics/M2": { hk: "F6" },
};

function mapHkLevel(hk) {
  return HK_TO_SYSTEMS[hk] ? { ...HK_TO_SYSTEMS[hk] } : { hk };
}

function inferSubject(rel) {
  const p = rel.replace(/\\/g, "/").toLowerCase();
  if (p.includes("/mathematics/") || /\/math[^a-z]/.test(p) || p.includes("/m1/") || p.includes("/m2/"))
    return "mathematics";
  if (p.includes("general_studies")) return "general-studies";
  if (p.includes("junior science") || p.includes("junior_science")) return "science";
  if (p.includes("/biology")) return "biology";
  if (p.includes("/chemistry")) return "chemistry";
  if (p.includes("/physics")) return "physics";
  if (p.includes("/english")) return "english";
  if (p.includes("primarychinese") || p.includes("/chinese_history")) return p.includes("history")
    ? "chinese-history"
    : "chinese";
  if (p.includes("/chinese")) return "chinese";
  if (p.includes("/ict") || p.includes("/python")) return "ict";
  if (p.includes("/geography")) return "geography";
  if (p.includes("/history")) return "history";
  if (p.includes("/economy") || p.includes("/economics")) return "economics";
  if (p.includes("/music")) return "music";
  return "general";
}

function normalizeCurriculumPath(rel) {
  return rel.replace(/\\/g, "/").replace(/^HK Cirriculum\//, "");
}

function inferHkLevel(rel) {
  const norm = normalizeCurriculumPath(rel);
  if (PATH_OVERRIDES[norm]?.hk) return PATH_OVERRIDES[norm].hk;

  const pMatch = norm.match(/\/P([1-6])(?:\/|$)/i);
  if (pMatch) return `P${pMatch[1]}`;

  const formMatch = norm.match(/Form\s*([1-6])/i);
  if (formMatch) return `F${formMatch[1]}`;

  const fSlash = norm.match(/\/F([1-6])(?:\/|$)/i);
  if (fSlash) return `F${fSlash[1]}`;

  // Extended math modules (HKDSE M1/M2)
  if (/\/Mathematics\/M1(?:\/|$)/i.test(norm)) return "F5";
  if (/\/Mathematics\/M2(?:\/|$)/i.test(norm)) return "F6";

  // Secondary subject hubs without Form — discovery band only
  if (norm.startsWith("Secondary_School/")) {
    if (/\/(Biology|Chemistry|Physics)\//i.test(norm)) return "F5";
    if (/\/ICT\//i.test(norm)) return "F4";
    if (/\/(Geography|History|Chinese_History|Economy|Economics)\//i.test(norm)) return "F4";
    if (/\/Music\//i.test(norm)) return "F3";
    if (/\/Junior Science\//i.test(norm)) return "F1";
    return "F3";
  }

  // Primary hubs without P-folder (e.g. English Oral Tutor)
  if (norm.startsWith("Primary_School/")) {
    if (/\/English\//i.test(norm)) return "P3";
    if (/PrimaryChinese/i.test(norm)) return "P3";
    return "P3";
  }

  return null;
}

function titleFromFolder(folder) {
  return folder
    .replace(/^\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function makeModuleId(folderPath) {
  const base = slugify(folderPath.replace(/^Primary_School\//, "pri-").replace(/^Secondary_School\//, "sec-"));
  const hash = crypto.createHash("sha1").update(folderPath).digest("hex").slice(0, 6);
  return `${base}-${hash}`;
}

function topicsFromPath(folderPath, subject, hk) {
  const parts = folderPath.replace(/\\/g, "/").split("/").filter(Boolean);
  const folderName = parts[parts.length - 1] || "";
  const topicWords = titleFromFolder(folderName)
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !/^\d+$/.test(w));
  const topics = new Set([subject, hk, ...topicWords.slice(0, 6)].filter(Boolean));
  const extra = PATH_OVERRIDES[folderPath]?.topicsExtra;
  if (extra) extra.forEach((t) => topics.add(t));
  return [...topics];
}

function walkIndexHtml(root, baseRel = "") {
  const out = [];
  if (!fs.existsSync(root)) return out;
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name.startsWith(".") || e.name === "node_modules" || e.name === "dist" || e.name === "shared")
      continue;
    if (e.name === "scripts" && baseRel.split("/").length <= 2) continue;
    const abs = path.join(root, e.name);
    const rel = path.join(baseRel, e.name).replace(/\\/g, "/");
    if (e.isDirectory()) {
      out.push(...walkIndexHtml(abs, rel));
    } else if (e.name.toLowerCase() === "index.html") {
      out.push(rel);
    }
  }
  return out;
}

function loadFreeCatalog() {
  if (!fs.existsSync(FREE)) return { byPath: new Map(), modules: [] };
  const freeJson = JSON.parse(fs.readFileSync(FREE, "utf8"));
  const byPath = new Map();
  for (const m of freeJson.modules || []) {
    const folderPath = m.path.replace(/\\/g, "/").replace(/\/index\.html$/i, "");
    byPath.set(folderPath, m);
  }
  return { byPath, modules: freeJson.modules || [] };
}

/**
 * Polish free-demo rows: stable demo moduleId, bilingual title, richer topics, band tags.
 */
function polishFreeDemo(entry, freeMeta) {
  if (!freeMeta) return entry;
  entry.moduleId = freeMeta.id || entry.moduleId;
  entry.freeDemo = true;
  entry.demoId = freeMeta.id;
  entry.band = freeMeta.band || null;
  if (freeMeta.title) {
    entry.title = freeMeta.title.en || entry.title;
    entry.titleZh = freeMeta.title["zh-HK"] || entry.titleZh || null;
  }
  if (freeMeta.why) entry.why = freeMeta.why;
  if (freeMeta.subject) entry.subject = freeMeta.subject;
  const bandTopics = {
    "early-primary": ["early-primary", "ages-5-7"],
    "mid-primary": ["mid-primary", "ages-8-10"],
    "upper-primary": ["upper-primary", "ages-10-12"],
    "lower-secondary": ["lower-secondary", "ages-12-14"],
    "mid-secondary": ["mid-secondary", "ages-14-15"],
    "upper-secondary": ["upper-secondary", "ages-15-17"],
  };
  const extras = bandTopics[freeMeta.band] || [];
  entry.topics = [...new Set([...entry.topics, ...extras, "free-demo"])];
  return entry;
}

function isRedirectStub(htmlPath) {
  try {
    const head = fs.readFileSync(htmlPath, "utf8").slice(0, 800);
    return /http-equiv\s*=\s*["']refresh["']/i.test(head) && /\burl\s*=/i.test(head);
  } catch {
    return false;
  }
}

function main() {
  const { byPath: freeByPath } = loadFreeCatalog();
  // Canonical apps live under HK Cirriculum/ only — store paths without that prefix for /play/...
  const contentRoots = [
    {
      root: path.join(REPO, "HK Cirriculum", "Primary_School"),
      baseRel: "Primary_School",
    },
    {
      root: path.join(REPO, "HK Cirriculum", "Secondary_School"),
      baseRel: "Secondary_School",
    },
  ];
  const modules = [];
  const seenIds = new Set();
  const seenPaths = new Set();

  for (const { root, baseRel } of contentRoots) {
    const files = walkIndexHtml(root, baseRel);
    for (const file of files) {
      const folderPath = file.replace(/\/index\.html$/i, "");
      if (seenPaths.has(folderPath)) continue;
      const absHtml = path.join(REPO, "HK Cirriculum", file);
      if (isRedirectStub(absHtml)) continue;
      seenPaths.add(folderPath);
      const folderName = path.basename(folderPath);
      const hk = inferHkLevel(folderPath);
      if (!hk) continue;
      const bands = mapHkLevel(hk);
      const subject = inferSubject(folderPath);
      let moduleId = makeModuleId(folderPath);
      if (seenIds.has(moduleId)) moduleId = `${moduleId}-x`;
      seenIds.add(moduleId);

      const modulePath = normalizeCurriculumPath(folderPath);
      let entry = {
        moduleId,
        path: modulePath,
        title: titleFromFolder(folderName),
        titleZh: null,
        subject,
        section: /Primary_School/.test(folderPath) ? "primary" : "secondary",
        hk: bands.hk,
        uk: bands.uk,
        us: bands.us,
        ib: bands.ib,
        sg: bands.sg,
        au: bands.au,
        intl: bands.intl,
        topics: topicsFromPath(folderPath, subject, hk),
        freeDemo: freeByPath.has(folderPath),
      };

      if (freeByPath.has(folderPath)) {
        entry = polishFreeDemo(entry, freeByPath.get(folderPath));
      }

      modules.push(entry);
    }
  }

  // Ensure every free-catalog path appears (even if walk missed a file)
  for (const [folderPath, freeMeta] of freeByPath) {
    const modulePath = normalizeCurriculumPath(folderPath);
    if (modules.some((m) => m.path === modulePath)) continue;
    const hk = inferHkLevel(folderPath) || (freeMeta.band?.includes("secondary") ? "F1" : "P3");
    const bands = mapHkLevel(hk);
    let entry = {
      moduleId: freeMeta.id,
      path: modulePath,
      title: freeMeta.title?.en || titleFromFolder(path.basename(folderPath)),
      titleZh: freeMeta.title?.["zh-HK"] || null,
      subject: freeMeta.subject || inferSubject(folderPath),
      section: folderPath.startsWith("Primary") ? "primary" : "secondary",
      hk: bands.hk,
      uk: bands.uk,
      us: bands.us,
      ib: bands.ib,
      sg: bands.sg,
      au: bands.au,
      intl: bands.intl,
      topics: topicsFromPath(folderPath, freeMeta.subject || inferSubject(folderPath), hk),
      freeDemo: true,
    };
    entry = polishFreeDemo(entry, freeMeta);
    modules.push(entry);
    console.warn(`Injected missing free-demo path: ${folderPath}`);
  }

  modules.sort((a, b) => a.path.localeCompare(b.path));

  const freeCount = modules.filter((m) => m.freeDemo).length;
  const byHk = {};
  for (const m of modules) {
    byHk[m.hk] = (byHk[m.hk] || 0) + 1;
  }

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    approximate: true,
    disclaimer: DISCLAIMER,
    coverageNote: {
      en: `${modules.length} modules tagged heuristically from folder structure (HK P1–P6 / Form 1–6). Use for browse/filter only — refine popular paths manually as needed.`,
      "zh-HK": `已從資料夾結構啟發式標註 ${modules.length} 個模組（香港小一至小六／中一至中六）。只供瀏覽篩選；熱門路徑宜人手微調。`,
    },
    systems: SYSTEMS,
    stats: {
      totalModules: modules.length,
      freeDemos: freeCount,
      byHkLevel: byHk,
    },
    modules,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${modules.length} modules → ${OUT}`);
  console.log(`Free demos flagged: ${freeCount}`);
  console.log("By HK level:", byHk);
}

main();
