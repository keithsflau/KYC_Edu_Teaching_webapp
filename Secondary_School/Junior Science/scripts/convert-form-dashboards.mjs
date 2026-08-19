/**
 * Convert Junior Science Form dashboards: React+Babel → static JSON dashboard.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scienceRoot = path.resolve(__dirname, "..");
const dashboardJs = path.resolve(
  scienceRoot,
  "..",
  "Mathematics",
  "shared",
  "math-dashboard.js"
);

const FORM_CONFIGS = {
  "Form 1": {
    badge: "Secondary 1",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
    badgeBorder: "border-blue-200",
    badgeDot: "bg-blue-500",
    titleLead: "Junior Science",
    titleAccent: "Master Class",
    titleGradient: "from-blue-600 to-violet-600",
    subtitle:
      "Explore 30 interactive simulations and digital labs designed for the HKDSE Curriculum.",
  },
  "Form 2": {
    badge: "Secondary 2",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-600",
    badgeBorder: "border-emerald-200",
    badgeDot: "bg-emerald-500",
    titleLead: "Junior Science",
    titleAccent: "Pro Labs",
    titleGradient: "from-emerald-600 to-teal-600",
    subtitle:
      "Advanced interactive systems for the S2 Curriculum. Master Biology, Chemistry, and Physics with 30 dedicated applications.",
  },
};

function extractCurriculum(html) {
  const m = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("No babel script found");
  const block = m[1];
  const start =
    block.indexOf("const curriculum = ") >= 0
      ? block.indexOf("const curriculum = ")
      : block.indexOf("const cur = ");
  if (start < 0) throw new Error("No curriculum array");
  let depth = 0;
  let inStr = null;
  let escape = false;
  const open = block.indexOf("[", start);
  for (let i = open; i < block.length; i++) {
    const c = block[i];
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === "\\") {
        escape = true;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "[") depth++;
    if (c === "]") {
      depth--;
      if (depth === 0) {
        return Function(
          '"use strict"; return ' + block.slice(open, i + 1)
        )();
      }
    }
  }
  throw new Error("Unbalanced curriculum array");
}

function stripReactScripts(html) {
  return html
    .replace(
      /<!-- React & ReactDOM -->[\s\S]*?@babel\/standalone\/babel\.min\.js"><\/script>\s*/i,
      ""
    )
    .replace(/<script[^>]*react@18[^>]*><\/script>\s*/gi, "")
    .replace(/<script[^>]*react-dom@18[^>]*><\/script>\s*/gi, "")
    .replace(/<script[^>]*@babel\/standalone[^>]*><\/script>\s*/gi, "");
}

for (const formDir of Object.keys(FORM_CONFIGS)) {
  const indexPath = path.join(scienceRoot, formDir, "index.html");
  const html = fs.readFileSync(indexPath, "utf8");
  if (!html.includes('type="text/babel"')) {
    console.log("Already static:", formDir);
    continue;
  }
  const curriculum = extractCurriculum(html);
  const cfg = FORM_CONFIGS[formDir];
  let out = stripReactScripts(html);
  const relDashboard = path
    .relative(path.dirname(indexPath), dashboardJs)
    .replace(/\\/g, "/");

  const dashboardBlock = `    <a href="../index.html" class="fixed top-4 left-4 z-50 text-sm text-slate-600 hover:text-blue-600 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">← Portal</a>
    <div id="math-dashboard-root"></div>
    <script id="math-dashboard-config" type="application/json">${JSON.stringify(cfg)}</script>
    <script id="math-curriculum" type="application/json">${JSON.stringify(curriculum)}</script>
    <script src="${relDashboard}"></script>`;

  out = out.replace(
    /<div id="root"><\/div>\s*<script type="text\/babel">[\s\S]*?<\/script>/,
    dashboardBlock
  );
  fs.writeFileSync(indexPath, out, "utf8");
  console.log(
    "Converted:",
    formDir,
    `(${curriculum.length} units, ${curriculum.reduce((n, u) => n + u.apps.length, 0)} apps)`
  );
}
