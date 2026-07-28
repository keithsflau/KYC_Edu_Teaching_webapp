/**
 * MathI18n → NCS bridge fleet pass.
 *
 * Ensures every app loading common/i18n.js (MathI18n) has fleet NCS kit in index.html.
 * Language sync + legacy toggle hiding live in:
 *   - Primary_School/Mathematics/common/i18n.js
 *   - Primary_School/General_Studies/common/i18n.js
 *   - common/math-i18n-ncs-bridge.js
 *
 * Usage:
 *   node "HK Cirriculum/_tools/inject-math-i18n-bridge.js"           # dry-run
 *   node "HK Cirriculum/_tools/inject-math-i18n-bridge.js" --apply   # write HTML
 *   node "HK Cirriculum/_tools/inject-math-i18n-bridge.js" --json
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const CURR = path.join(__dirname, "..");
const roots = [
  path.join(CURR, "Primary_School/Mathematics"),
  path.join(CURR, "Primary_School/General_Studies"),
];
const SKIP_DIRS = new Set(["dist", "node_modules", "_archive", "_legacy"]);
const APPLY = process.argv.includes("--apply");
const JSON_OUT = process.argv.includes("--json");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
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
    /data-ncs-kit/i.test(html) ||
    /window\.NcsI18n/i.test(html)
  );
}

function i18nBridgeStatus(relPath) {
  const full = path.join(CURR, relPath);
  if (!fs.existsSync(full)) return { exists: false, bridged: false };
  const html = fs.readFileSync(full, "utf8");
  return {
    exists: true,
    bridged:
      /math-i18n-ncs-bridge/.test(html) &&
      /NcsI18n\.onChange/.test(html) &&
      /math-i18n-lang-hidden/.test(html),
  };
}

function main() {
  const files = roots.flatMap((r) => walk(r));
  const mathApps = [];
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    if (!hasMathI18n(html)) continue;
    const rel = path.relative(CURR, file).replace(/\\/g, "/").replace(/\/index\.html$/, "");
    mathApps.push({
      rel,
      hasNcs: hasNcs(html),
    });
  }

  const missingNcs = mathApps.filter((a) => !a.hasNcs);
  let injectResult = null;

  if (missingNcs.length && APPLY) {
    const proc = spawnSync(
      process.execPath,
      [
        path.join(__dirname, "inject-ncs-i18n.js"),
        "--filter",
        "Primary_School/Mathematics",
        "--filter",
        "Primary_School/General_Studies",
        "--apply",
        "--json",
      ],
      { encoding: "utf8", cwd: path.join(CURR, "..") }
    );
    injectResult = proc.stdout ? JSON.parse(proc.stdout) : { error: proc.stderr };
  } else if (missingNcs.length) {
    injectResult = { mode: "dry-run", wouldInject: missingNcs.length };
  }

  const i18nJs = {
    mathematics: i18nBridgeStatus("Primary_School/Mathematics/common/i18n.js"),
    generalStudies: i18nBridgeStatus("Primary_School/General_Studies/common/i18n.js"),
  };

  const summary = {
    mode: APPLY ? "apply" : "dry-run",
    mathI18nApps: mathApps.length,
    withNcsBefore: mathApps.length - missingNcs.length,
    missingNcs: missingNcs.length,
    missingNcsPaths: missingNcs.map((a) => a.rel),
    i18nJs,
    bridgeKit: fs.existsSync(path.join(CURR, "common/math-i18n-ncs-bridge.js")),
    injectResult,
    bySubject: {
      Mathematics: mathApps.filter((a) => a.rel.includes("Mathematics")).length,
      General_Studies: mathApps.filter((a) => a.rel.includes("General_Studies")).length,
    },
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`MathI18n NCS bridge — ${summary.mode}`);
    console.log(`MathI18n apps: ${summary.mathI18nApps}`);
    console.log(`  Mathematics: ${summary.bySubject.Mathematics}`);
    console.log(`  General Studies: ${summary.bySubject.General_Studies}`);
    console.log(`With NCS in HTML: ${summary.withNcsBefore}`);
    console.log(`Missing NCS in HTML: ${summary.missingNcs}`);
    console.log("i18n.js bridge:", i18nJs);
    if (missingNcs.length && !APPLY) {
      console.log("\nRe-run with --apply to fleet-inject missing apps.");
    }
  }

  return summary;
}

main();
