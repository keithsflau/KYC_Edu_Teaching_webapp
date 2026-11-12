import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const root = path.resolve(import.meta.dirname, "..");
const hubs = [
  "index.html",
  "Form 4/index.html",
  "Form 5/index.html",
  "Form 6/index.html",
  "apps/index.html"
];

function decodeHref(href) {
  try {
    return decodeURIComponent(href);
  } catch {
    return href;
  }
}

function localRefs(html) {
  const refs = [];
  const re = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = re.exec(html))) refs.push(match[1]);
  return refs;
}

function isExternal(href) {
  return /^(https?:|mailto:|javascript:|data:|#)/i.test(href);
}

function resolveRef(fromFile, href) {
  const clean = decodeHref(href.split("#")[0].split("?")[0]);
  if (!clean) return null;
  return path.resolve(path.dirname(fromFile), clean);
}

function mojibake(text) {
  if (text.includes("\uFFFD") || text.includes("锟斤拷") || text.includes("å¤") || text.includes("æ˜")) return true;
  if (/Ã[\u0080-\u00BF]/.test(text) || /Â[\u0080-\u00BF]/.test(text)) return true;
  return false;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractScripts(html) {
  const scripts = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1] || "";
    const body = match[2] || "";
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/type\s*=\s*["']text\/babel["']/i.test(attrs)) continue;
    if (!body.trim()) continue;
    const module = /type\s*=\s*["']module["']/i.test(attrs);
    scripts.push({ body, module });
  }
  return scripts;
}

const failures = [];
const checkedJs = new Set();
const entries = new Set(hubs.map((hub) => path.join(root, hub)));

for (const hub of hubs) {
  const file = path.join(root, hub);
  if (!fs.existsSync(file)) {
    failures.push("MISSING HUB " + hub);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  for (const href of localRefs(html)) {
    if (isExternal(href)) continue;
    const target = resolveRef(file, href);
    if (!target) {
      failures.push("EMPTY LINK " + hub + " -> " + href);
      continue;
    }
    if (!fs.existsSync(target)) failures.push("BROKEN " + hub + " -> " + href);
    else if (target.endsWith(".html")) entries.add(target);
  }
}

function checkJs(file, label) {
  const key = file + "|" + label;
  if (checkedJs.has(key)) return;
  checkedJs.add(key);
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    failures.push("SYNTAX " + label + " " + (result.stderr || result.stdout || "").trim().slice(0, 240));
  }
}

const tmp = path.join(root, "kit", "_syntax_tmp.js");
let ran = 0;

for (const file of entries) {
  ran += 1;
  const rel = path.relative(root, file);
  if (!fs.existsSync(file)) {
    failures.push("MISSING ENTRY " + rel);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (mojibake(html)) failures.push("MOJIBAKE " + rel);
  let linkedJsText = "";
  for (const href of localRefs(html)) {
    if (isExternal(href)) continue;
    const target = resolveRef(file, href);
    if (!target) {
      failures.push("EMPTY LINK " + rel + " -> " + href);
      continue;
    }
    if (!fs.existsSync(target)) failures.push("BROKEN " + rel + " -> " + href);
    else if (target.endsWith(".js")) {
      const js = fs.readFileSync(target, "utf8");
      linkedJsText += "\n" + js;
      if (mojibake(js)) failures.push("MOJIBAKE " + path.relative(root, target));
      checkJs(target, path.relative(root, target));
    }
  }
  const text = (visibleText(html) + " " + linkedJsText).replace(/\s+/g, " ").trim();
  if (text.length < 80 || /Hub Stub/.test(html)) failures.push("BLANK " + rel);
  for (const [index, script] of extractScripts(html).entries()) {
    const out = script.module ? tmp.replace(/\.js$/, ".mjs") : tmp;
    fs.writeFileSync(out, script.body, "utf8");
    checkJs(out, rel + "#inline" + index);
  }
}

for (const extra of [tmp, tmp.replace(/\.js$/, ".mjs")]) {
  if (fs.existsSync(extra)) fs.unlinkSync(extra);
}

console.log("ENTRIES " + ran);
console.log("JS_CHECKS " + checkedJs.size);
if (!failures.length) console.log("FAILURES 0");
else {
  console.log("FAILURES " + failures.length);
  failures.forEach((line) => console.log(line));
  process.exitCode = 1;
}
