/**
 * Wire NcsI18n.onChange + JSLGER.registerShellStrings into Form 1/2 LGER apps.
 * Skips apps that already have wireLgerI18n or APP_STRINGS onChange hook.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "Secondary_School", "Junior Science");
const FORMS = ["Form 1", "Form 2"];

const WIRE_SNIPPET = `
    function wireLgerI18n() {
      if (window.JSLGER && window.JSLGER.registerShellStrings) window.JSLGER.registerShellStrings();
    }
    if (window.NcsI18n && window.NcsI18n.onChange) window.NcsI18n.onChange(wireLgerI18n);`;

function walk(d, acc = []) {
  if (!fs.existsSync(d)) return acc;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === "dist") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

const fixed = [];
const skipped = [];

for (const form of FORMS) {
  const files = walk(path.join(ROOT, form));
  for (const file of files) {
    let html = fs.readFileSync(file, "utf8");
    if (!/junior-science-lger|JSLGER\.Shell/i.test(html)) continue;
    if (!/data-ncs-kit=["']fleet-init["']/i.test(html)) continue;
    if (/wireLgerI18n/i.test(html)) {
      skipped.push(path.relative(ROOT, file).replace(/\\/g, "/"));
      continue;
    }
    if (!/function boot\(\)/.test(html)) continue;

    html = html.replace(
      /(\}\)\.then\(hideLegacyToggles\);)/,
      `$1\n      wireLgerI18n();`
    );
    html = html.replace(
      /(function boot\(\) \{)/,
      `$1${WIRE_SNIPPET}`
    );
    fs.writeFileSync(file, html);
    fixed.push(path.relative(ROOT, file).replace(/\\/g, "/"));
  }
}

console.log("Fixed:", fixed.length);
fixed.forEach((f) => console.log("  FIXED:", f));
console.log("Skipped (already wired):", skipped.length);
