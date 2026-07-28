/**
 * P0 fix: corrupt TFZ/Kc stub, broken common paths, bad script src.
 * Usage: node "HK Cirriculum/_tools/p0-fix.js"
 */
const fs = require("fs");
const path = require("path");

const REPO = path.join(__dirname, "..", "..");
const CURR = path.join(REPO, "HK Cirriculum");
const COMMON = path.join(CURR, "common");

function walkIndex(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["dist", "node_modules", "_archive_race_stubs", "venv"].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkIndex(p, acc);
    else if (ent.name === "index.html") acc.push(p);
  }
  return acc;
}

function relCommonFrom(fileDir) {
  return path.relative(fileDir, COMMON).split(path.sep).join("/");
}

function fixCommonPaths(content, fileDir) {
  const rel = relCommonFrom(fileDir);
  let next = content;
  let n = 0;
  const patterns = [
    /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/HK Cirriculum\/common\//g,
    /\.\.\/\.\.\/\.\.\/\.\.\/HK Cirriculum\/common\//g,
    /HK Cirriculum\/common\//g,
    /HK%20Cirriculum\/common\//g,
  ];
  for (const re of patterns) {
    if (re.test(next)) {
      next = next.replace(re, rel + "/");
      n++;
    }
  }
  return { content: next, changed: next !== content, fixes: n };
}

function stripBrokenScripts(content, fileDir) {
  let next = content;
  let removed = 0;
  const re = /<script[^>]+src=["']([^"']+)["'][^>]*>\s*<\/script>/gi;
  next = next.replace(re, (full, src) => {
    if (/^https?:\/\//i.test(src)) return full;
    const abs = path.normalize(path.join(fileDir, src));
    if (fs.existsSync(abs)) return full;
    if (/parent\.html|REMOVED\.js|_legacy_thin_learn\.html/i.test(src)) {
      removed++;
      return `<!-- P0 removed missing script: ${src} -->`;
    }
    return full;
  });
  return { content: next, changed: next !== content, removed };
}

function restoreKc() {
  const kc = path.join(CURR, "Secondary_School", "Chemistry", "Form 5", "09_Chemical_Equilibrium_Kc", "index.html");
  const hess = path.join(CURR, "Secondary_School", "Chemistry", "Form 5", "05_Hess_Cycle", "index.html");
  if (!fs.existsSync(hess)) return { ok: false, why: "no-hess-template" };
  let html = fs.readFileSync(hess, "utf8");
  const subs = [
    [/Hess Cycle Lab/g, "Equilibrium Kc Lab"],
    [/Hess Cycle/g, "Chemical Equilibrium Kc"],
    [/Hess's Law/g, "Equilibrium constant Kc"],
    [/f5-chem-hess-lab/g, "f5-chem-kc-lab"],
    [/#e11d48/g, "#0d9488"],
    [/05_Hess_Cycle/g, "09_Chemical_Equilibrium_Kc"],
    [/Path ΣΔH = target/g, "Q vs K · ICE table · equilibrium shift"],
    [/05_Hess_Cycle\/index\.html/g, "09_Chemical_Equilibrium_Kc/index.html"],
  ];
  for (const [re, rep] of subs) html = html.replace(re, rep);
  // Kc-themed LEARN step blurbs (keep id A1..A8)
  const kcSteps = [
    ["What is dynamic equilibrium?", "動態平衡是什麼？"],
    ["Kc expression", "平衡常數 Kc 表達式"],
    ["Reaction quotient Q", "反應商 Q"],
    ["Compare Q and K", "比較 Q 與 K"],
    ["ICE table setup", "ICE 表"],
    ["Shift prediction", "平衡移動預測"],
    ["Le Chatelier link", "勒夏特列原理"],
    ["Exam checkpoint", "DSE 檢核"],
  ];
  kcSteps.forEach(([en, zh], i) => {
    const aid = "A" + (i + 1);
    html = html.replace(
      new RegExp(`(id:\\s*["']${aid}["'][\\s\\S]*?titleEn:\\s*")[^"]*(")`, "m"),
      `$1${en}$2`
    );
    html = html.replace(
      new RegExp(`(id:\\s*["']${aid}["'][\\s\\S]*?titleZh:\\s*")[^"]*(")`, "m"),
      `$1${zh}$2`
    );
  });
  fs.mkdirSync(path.dirname(kc), { recursive: true });
  fs.writeFileSync(kc, html, "utf8");
  return { ok: true, bytes: html.length };
}

const report = {
  pathFixed: 0,
  scriptsStripped: 0,
  kc: null,
  corruptBefore: 0,
  corruptAfter: 0,
};

function isRetiredStub(src) {
  return /legacy thin-Learn page has been fully superseded/i.test(src);
}

const files = walkIndex(CURR);
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  if (isRetiredStub(src)) report.corruptBefore++;
}

report.kc = restoreKc();

for (const f of files) {
  let src = fs.readFileSync(f, "utf8");
  let changed = false;
  const p = fixCommonPaths(src, path.dirname(f));
  if (p.changed) {
    src = p.content;
    report.pathFixed++;
    changed = true;
  }
  const s = stripBrokenScripts(src, path.dirname(f));
  if (s.changed) {
    src = s.content;
    report.scriptsStripped += s.removed;
    changed = true;
  }
  if (changed) fs.writeFileSync(f, src, "utf8");
}

// Re-scan corrupt
for (const f of walkIndex(CURR)) {
  const src = fs.readFileSync(f, "utf8");
  if (isRetiredStub(src)) report.corruptAfter++;
}

const chemPlan = path.join(CURR, "Secondary_School", "Chemistry", "curriculum_plan.md");
let chemMissing = 0;
if (fs.existsSync(chemPlan)) {
  const plan = fs.readFileSync(chemPlan, "utf8");
  const apps = [...plan.matchAll(/_\s*(F[3456]\/\d{2}_[a-zA-Z0-9_]+)_/g)].map((m) => m[1]);
  for (const app of apps) {
    const parts = app.split("/");
    const form = parts[0].replace("F", "Form ");
    const p = path.join(CURR, "Secondary_School", "Chemistry", form, parts[1], "index.html");
    if (!fs.existsSync(p)) chemMissing++;
  }
}
report.chemistryMissingOnDisk = chemMissing;

console.log(JSON.stringify(report, null, 2));
