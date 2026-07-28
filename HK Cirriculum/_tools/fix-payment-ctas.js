/**
 * Fix dead #coming-soon payment CTAs across curriculum apps.
 * Usage: node "HK Cirriculum/_tools/fix-payment-ctas.js"
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SKIP = /(node_modules|_legacy|dist|\.git)/;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.test(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name === "index.html") out.push(p);
  }
  return out;
}

const REPLACEMENTS = [
  ["comingSoonHref: \"#coming-soon\"", "comingSoonHref: \"../../../../pricing/index.html#payment-links\""],
  ["MARKETING_PATH: \"#coming-soon\"", "MARKETING_PATH: \"../../../../pricing/index.html#payment-links\""],
  ["MARKETING_PATH: '#coming-soon'", "MARKETING_PATH: '../../../../pricing/index.html#payment-links'"],
];

let changed = 0;
for (const file of walk(ROOT)) {
  let txt = fs.readFileSync(file, "utf8");
  let next = txt;
  for (const [from, to] of REPLACEMENTS) {
    next = next.split(from).join(to);
  }
  if (next !== txt) {
    fs.writeFileSync(file, next);
    changed += 1;
    console.log("fixed:", path.relative(ROOT, file));
  }
}
console.log("Done. Files changed:", changed);
