/**
 * Strip HTML fleet NCS injection from Primary GS MathI18n lesson apps.
 * Bridge in General_Studies/common/i18n.js loads NcsI18n instead.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "Primary_School", "General_Studies");
const MARKER = "data-ncs-kit";
const COMMENT = "<!-- NCS i18n fleet kit (auto-injected) -->";
const APPLY = process.argv.includes("--apply");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["dist", "node_modules", "_archive", "_legacy"].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === "index.html") acc.push(p);
  }
  return acc;
}

function hasMathI18n(html) {
  return /common\/i18n\.js/i.test(html);
}

function hasFleetInit(html) {
  return new RegExp(MARKER + '=["\']fleet-init["\']', "i").test(html);
}

function stripFleet(html) {
  let next = html;
  const fleetBlock = new RegExp(
    "\\s*" +
      COMMENT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
      "[\\s\\S]*?" +
      "<script[^>]*" +
      MARKER +
      '=["\']fleet-init["\'][^>]*>[\\s\\S]*?<\\/script>',
    "gi"
  );
  next = next.replace(fleetBlock, "");
  next = next.replace(/\s*<link[^>]*ncs-i18n\.css[^>]*>/gi, "");
  next = next.replace(/\s*<script[^>]*ncs-i18n\.js[^>]*><\/script>/gi, "");
  next = next.replace(/\s*<script[^>]*ncs-i18n\.js[^>]*\/>/gi, "");
  next = next.replace(
    new RegExp("\\s*<script[^>]*" + MARKER + '=["\']fleet["\'][^>]*><\\/script>', "gi"),
    ""
  );
  next = next.replace(
    new RegExp(
      "\\s*<style[^>]*" + MARKER + '=["\']fleet-bridge["\'][^>]*>[\\s\\S]*?<\\/style>',
      "gi"
    ),
    ""
  );
  next = next.replace(
    new RegExp(
      "\\s*<script[^>]*" + MARKER + '=["\']fleet-init["\'][^>]*>[\\s\\S]*?<\\/script>',
      "gi"
    ),
    ""
  );
  return next;
}

const files = walk(ROOT);
const stats = { total: files.length, mathI18n: 0, fleetBefore: 0, stripped: 0, stillFleet: 0 };

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const mi = hasMathI18n(html);
  const fi = hasFleetInit(html);
  if (mi) stats.mathI18n++;
  if (fi) stats.fleetBefore++;
  if (mi && fi) {
    const next = stripFleet(html);
    if (next !== html) {
      stats.stripped++;
      if (APPLY) fs.writeFileSync(file, next);
    }
  }
}

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  if (hasMathI18n(html) && hasFleetInit(html)) stats.stillFleet++;
}

console.log(JSON.stringify({ apply: APPLY, ...stats }, null, 2));
