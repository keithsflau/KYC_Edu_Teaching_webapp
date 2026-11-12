/**
 * Fix wireLgerI18n placement — move outside boot(), chain in .then().
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "Secondary_School", "Junior Science");
const FORMS = ["Form 1", "Form 2"];

const BAD = /function boot\(\) \{\s*function wireLgerI18n\(\) \{[\s\S]*?window\.NcsI18n\.onChange\(wireLgerI18n\);\s*if \(!window\.NcsI18n \|\| window\.NcsI18n\.isInitialized\(\)\) return;\s*window\.NcsI18n\.init\(\{[\s\S]*?\}\)\.then\(hideLegacyToggles\);\s*wireLgerI18n\(\);\s*\}/;

const GOOD = `function wireLgerI18n() {
      if (window.JSLGER && window.JSLGER.registerShellStrings) window.JSLGER.registerShellStrings();
    }
    if (window.NcsI18n && window.NcsI18n.onChange) window.NcsI18n.onChange(wireLgerI18n);
    function boot() {
      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;
      window.NcsI18n.init({
        chromePath: "../../../../_shared/ncs-chrome.json",
        target: document.body
      }).then(function () {
        hideLegacyToggles();
        wireLgerI18n();
      });
    }`;

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

let n = 0;
for (const form of FORMS) {
  for (const file of walk(path.join(ROOT, form))) {
    let html = fs.readFileSync(file, "utf8");
    if (!/wireLgerI18n/.test(html)) continue;
    if (!BAD.test(html)) continue;
    html = html.replace(BAD, GOOD);
    fs.writeFileSync(file, html);
    n++;
    console.log("CLEANED:", path.relative(ROOT, file).replace(/\\/g, "/"));
  }
}
console.log("Total cleaned:", n);
