/**
 * Convert React/Babel form dashboards → static JSON + math-dashboard.js
 * Usage: node scripts/convert-form-dashboards.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mathRoot = path.resolve(__dirname, "..");

const FORM_CONFIGS = {
  "Form 1": {
    badge: "Secondary 1",
    titleLead: "Junior Math",
    titleAccent: "Master Class",
    subtitle:
      "Interactive Mathematics for the Modern Student. Master Logic, Geometry, and Data.",
  },
  "Form 2": {
    badge: "Secondary 2",
    titleLead: "Junior Math",
    titleAccent: "Master Class",
    subtitle:
      "Interactive Mathematics for the Modern Student. Master Algebra, Geometry, and Data.",
  },
  "Form 3": {
    badge: "Secondary 3",
    titleLead: "Junior Math",
    titleAccent: "Master Class",
    subtitle:
      "Interactive Mathematics for the Modern Student. Master Quadratics, Geometry, and Finance.",
  },
  "Form 4": {
    badge: "Secondary 4",
    titleLead: "DSE Math",
    titleAccent: "Compulsory Part",
    subtitle:
      "HKDSE Mathematics Compulsory Part — interactive modules for exam preparation.",
  },
  "Form 5": {
    badge: "Secondary 5",
    titleLead: "Senior Math",
    titleAccent: "Extension",
    subtitle:
      "Sequences, trigonometry, coordinate geometry, and introductory calculus topics.",
  },
  "Form 6": {
    badge: "Secondary 6",
    titleLead: "Senior Math",
    titleAccent: "DSE Mastery",
    subtitle:
      "Statistical analysis, advanced geometry, and DSE revision modules.",
  },
  M1: {
    badge: "Module 1",
    titleLead: "M1",
    titleAccent: "Calculus & Statistics",
    subtitle:
      "HKDSE Mathematics Extended Part Module 1 — calculus and statistics interactives.",
  },
  M2: {
    badge: "Module 2",
    titleLead: "M2",
    titleAccent: "Algebra & Calculus",
    subtitle:
      "HKDSE Mathematics Extended Part Module 2 — algebra and calculus interactives.",
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
        const arrSrc = block.slice(open, i + 1);
        // Curriculum is plain data — safe to evaluate
        return Function('"use strict"; return ' + arrSrc)();
      }
    }
  }
  throw new Error("Unbalanced curriculum array");
}

function stripReactScripts(html) {
  return html
    .replace(/<!-- React & ReactDOM -->[\s\S]*?@babel\/standalone\/babel\.min\.js"><\/script>\s*/i, "")
    .replace(/<script[^>]*react@18[^>]*><\/script>\s*/gi, "")
    .replace(/<script[^>]*react-dom@18[^>]*><\/script>\s*/gi, "")
    .replace(/<script[^>]*@babel\/standalone[^>]*><\/script>\s*/gi, "");
}

function convertFile(formDir) {
  const indexPath = path.join(mathRoot, formDir, "index.html");
  const html = fs.readFileSync(indexPath, "utf8");
  if (!html.includes('type="text/babel"')) {
    console.log("Already static:", formDir);
    return;
  }

  const curriculum = extractCurriculum(html);
  const cfg = FORM_CONFIGS[formDir];
  let out = stripReactScripts(html);

  const dashboardBlock = `    <a href="../index.html" class="fixed top-4 left-4 z-50 text-sm text-slate-600 hover:text-blue-600 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">← Portal</a>
    <div id="math-dashboard-root"></div>
    <script id="math-dashboard-config" type="application/json">${JSON.stringify(cfg)}</script>
    <script id="math-curriculum" type="application/json">${JSON.stringify(curriculum)}</script>
    <script src="../shared/math-dashboard.js"></script>`;

  out = out.replace(/<div id="root"><\/div>\s*<script type="text\/babel">[\s\S]*?<\/script>/, dashboardBlock);

  fs.writeFileSync(indexPath, out, "utf8");
  console.log("Converted:", formDir, `(${curriculum.length} units, ${curriculum.reduce((n, u) => n + u.apps.length, 0)} apps)`);
}

for (const formDir of Object.keys(FORM_CONFIGS)) {
  const indexPath = path.join(mathRoot, formDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.warn("Skip:", formDir);
    continue;
  }
  convertFile(formDir);
}
