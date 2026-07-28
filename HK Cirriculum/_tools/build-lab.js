// Usage: node build-lab.js <config-file.js> [<config-file2.js> ...]
// Each config exports { out, level, appId, appConst, nameEn, nameZh, subject, subjectLine,
//   accent, labTitle, simName, tfz, sim, guided, exam } and is written to `out`.
"use strict";
const fs = require("fs");
const path = require("path");
const { buildLab } = require("./lab-template.js");

const files = process.argv.slice(2);
if (!files.length) {
  console.error("No config files given.");
  process.exit(1);
}
for (const f of files) {
  const cfg = require(path.resolve(f));
  const html = buildLab(cfg);
  fs.mkdirSync(path.dirname(cfg.out), { recursive: true });
  fs.writeFileSync(cfg.out, html, "utf8");
  console.log("WROTE", cfg.out, html.length, "bytes");
}
