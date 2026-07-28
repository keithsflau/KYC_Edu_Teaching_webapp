const fs = require("fs");
const path = require("path");

const CURR = path.join(__dirname, "..");
const roots = [
  "Primary_School/Mathematics",
  "Primary_School/General_Studies",
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["dist", "node_modules", "_archive", "_legacy"].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === "index.html") acc.push(p);
  }
  return acc;
}

function hasMathI18n(html) {
  return /common\/i18n\.js/i.test(html) || /window\.MathI18n/i.test(html);
}

function hasNcs(html) {
  return (
    /ncs-i18n\.js/i.test(html) ||
    /window\.NcsI18n/i.test(html) ||
    /data-ncs-kit/i.test(html)
  );
}

function hasFleetInit(html) {
  return /data-ncs-kit=["']fleet-init["']/i.test(html);
}

function i18nBridgeStatus(relPath) {
  const full = path.join(CURR, relPath);
  if (!fs.existsSync(full)) return { exists: false };
  const html = fs.readFileSync(full, "utf8");
  return {
    exists: true,
    hasBridge: /math-i18n-ncs-bridge/.test(html),
    hasNcsSync: /NcsI18n\.onChange/.test(html),
    hasHiddenSelector: /math-i18n-lang-hidden/.test(html),
  };
}

const stats = {
  mathI18nTotal: 0,
  withNcs: 0,
  missingNcs: 0,
  fleetInit: 0,
  bySubject: {},
  missingList: [],
};

for (const root of roots) {
  const files = walk(path.join(CURR, root));
  const subj = root.split("/").pop();
  stats.bySubject[subj] = { total: files.length, mathI18n: 0, withNcs: 0, missing: 0 };

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const mi = hasMathI18n(html);
    const nc = hasNcs(html);
    if (!mi) continue;
    stats.mathI18nTotal++;
    stats.bySubject[subj].mathI18n++;
    if (nc) {
      stats.withNcs++;
      stats.bySubject[subj].withNcs++;
    } else {
      stats.missingNcs++;
      stats.bySubject[subj].missing++;
      stats.missingList.push(path.relative(CURR, file).replace(/\\/g, "/"));
    }
    if (hasFleetInit(html)) stats.fleetInit++;
  }
}

stats.i18nJs = {
  mathematics: i18nBridgeStatus("Primary_School/Mathematics/common/i18n.js"),
  generalStudies: i18nBridgeStatus("Primary_School/General_Studies/common/i18n.js"),
};

console.log(JSON.stringify(stats, null, 2));
