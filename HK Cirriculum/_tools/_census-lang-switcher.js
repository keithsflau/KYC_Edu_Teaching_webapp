const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const skip = ["node_modules", "dist", "_archive", "_legacy", ".git"];

function walk(d, acc = []) {
  if (!fs.existsSync(d)) return acc;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (skip.includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

const files = walk(ROOT);
const stats = {
  total: files.length,
  hasNcs: 0,
  hasFleetInit: 0,
  hasOnChange: 0,
  hasAppStrings: 0,
  hasDataI18n: 0,
  hasMathI18n: 0,
  hasBridge: 0,
  hasJSLGER: 0,
  broken: [],
  verify: [],
  fixed: [],
};

function classify(f) {
  const html = fs.readFileSync(f, "utf8");
  const rel = path.relative(ROOT, f).replace(/\\/g, "/");

  const hasNcs = /ncs-i18n\.js|window\.NcsI18n|data-ncs-kit/i.test(html);
  const hasFleetInit = /data-ncs-kit=["']fleet-init["']/i.test(html);
  const hasOnChange = /NcsI18n\.onChange|initHub\(|NcsI18n\.initApp|NcsI18n\.initReact/i.test(html);
  const hasAppStrings = /APP_STRINGS|registerStrings|ingestAppStrings/i.test(html);
  const hasDataI18n = /data-i18n/i.test(html);
  const hasMathI18n = /common\/i18n\.js|window\.MathI18n/i.test(html);
  const hasBridge = /math-i18n-ncs-bridge/i.test(html);
  const hasReact = /react\.production|type="text\/babel"/i.test(html);
  const hasIsZhState = /isZh|setZh|useState.*zh/i.test(html);
  const hasJSLGER = /junior-science-lger|JSLGER\.Shell/i.test(html);
  const hasInitHub = /initHub\(/i.test(html);

  if (hasNcs) stats.hasNcs++;
  if (hasFleetInit) stats.hasFleetInit++;
  if (hasOnChange) stats.hasOnChange++;
  if (hasAppStrings) stats.hasAppStrings++;
  if (hasDataI18n) stats.hasDataI18n++;
  if (hasMathI18n) stats.hasMathI18n++;
  if (hasBridge) stats.hasBridge++;
  if (hasJSLGER) stats.hasJSLGER++;

  let cause = null;
  let status = "VERIFY";

  if (!hasNcs && !hasMathI18n) {
    cause = "NO_I18N_KIT";
    status = "BROKEN";
  } else if (hasJSLGER) {
    cause = "JSLGER_LOCAL_ISZH";
    status = "BROKEN";
  } else if (hasMathI18n && !hasBridge && !hasOnChange) {
    cause = "MATHI18N_NO_BRIDGE";
    status = "BROKEN";
  } else if (hasNcs && hasReact && hasIsZhState && !hasOnChange) {
    cause = "REACT_NO_ONCHANGE";
    status = "BROKEN";
  } else if (hasNcs && hasDataI18n && hasInitHub) {
    cause = "HUB_INITHUB";
    status = "VERIFY";
  } else if (hasNcs && hasFleetInit && !hasOnChange) {
    cause = "NCS_MOUNT_ONLY";
    status = "BROKEN";
  } else if (hasNcs && !hasOnChange && !hasDataI18n && !hasAppStrings) {
    cause = "NCS_MOUNT_ONLY";
    status = "BROKEN";
  } else if (hasNcs && hasOnChange) {
    cause = "HAS_ONCHANGE";
    status = "VERIFY";
  } else if (hasMathI18n && hasBridge) {
    cause = "MATHI18N_BRIDGE";
    status = "VERIFY";
  }

  const entry = { rel, status, cause, hasNcs, hasOnChange, hasReact, hasJSLGER, hasMathI18n, hasBridge, hasDataI18n };
  if (status === "BROKEN") stats.broken.push(entry);
  else stats.verify.push(entry);
}

files.forEach(classify);

const byCause = {};
stats.broken.forEach((b) => {
  byCause[b.cause] = (byCause[b.cause] || 0) + 1;
});

const out = {
  counts: {
    total: stats.total,
    hasNcs: stats.hasNcs,
    hasFleetInit: stats.hasFleetInit,
    hasOnChange: stats.hasOnChange,
    hasJSLGER: stats.hasJSLGER,
    hasMathI18n: stats.hasMathI18n,
    hasBridge: stats.hasBridge,
    broken: stats.broken.length,
    verify: stats.verify.length,
  },
  byCause,
  broken: stats.broken,
};

const outPath = path.join(__dirname, "_census-lang-switcher.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.counts, null, 2));
console.log("byCause:", JSON.stringify(byCause, null, 2));
console.log("Wrote", outPath);
