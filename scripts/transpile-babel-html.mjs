/**
 * Pre-transpile inline JSX (type="text/babel") → plain JS for GitHub Pages.
 * Babel in-browser needs eval; pre-transpile avoids blank pages.
 *
 * Usage: node scripts/transpile-babel-html.mjs [dirs...]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Babel from "@babel/standalone";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const DEFAULT_DIRS = [
  "Primary_School",
  "Secondary_School/Mathematics",
  "Secondary_School/Junior Science",
  "Secondary_School/ICT",
  "Secondary_School/Biology",
];

const BABEL_RE =
  /<script(\s[^>]*)?\s+type=["']text\/babel["'](\s[^>]*)?>([\s\S]*?)<\/script>/gi;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "scripts") continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

function stripBabelLoader(html) {
  return html
    .replace(/<!-- React & ReactDOM -->[\s\S]*?@babel\/standalone\/babel\.min\.js"><\/script>\s*/gi, "")
    .replace(/<script[^>]*@babel\/standalone[^>]*><\/script>\s*/gi, "");
}

function transpileHtml(html) {
  if (!/type=["']text\/babel["']/i.test(html)) return null;

  let changed = false;
  const out = html.replace(BABEL_RE, (_match, _a, _b, code) => {
    const trimmed = code.trim();
    if (!trimmed) return _match;
    try {
      const isModule = /^\s*(import|export)\s/m.test(trimmed);
      const result = Babel.transform(trimmed, {
        presets: [["react", { runtime: "classic" }]],
        sourceType: isModule ? "module" : "script",
      });
      changed = true;
      return `<script${isModule ? ' type="module"' : ""}>\n${result.code}\n</script>`;
    } catch (err) {
      throw new Error(`Babel error: ${err.message}`);
    }
  });

  if (!changed) return null;
  return stripBabelLoader(out);
}

const targets = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_DIRS;
let ok = 0;
let skip = 0;
const errors = [];

for (const rel of targets) {
  const root = path.resolve(repoRoot, rel);
  if (!fs.existsSync(root)) {
    console.warn("Skip missing:", rel);
    continue;
  }
  for (const file of walk(root)) {
    const html = fs.readFileSync(file, "utf8");
    if (!/type=["']text\/babel["']/i.test(html)) {
      skip++;
      continue;
    }
    try {
      const next = transpileHtml(html);
      if (next) {
        fs.writeFileSync(file, next, "utf8");
        ok++;
        if (ok % 50 === 0) console.log("...", ok, "files");
      } else skip++;
    } catch (e) {
      errors.push({ file: path.relative(repoRoot, file), error: e.message });
    }
  }
}

console.log(`Done: ${ok} transpiled, ${skip} skipped`);
if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  for (const e of errors.slice(0, 20)) {
    console.error(" ", e.file, "-", e.error);
  }
  process.exit(1);
}
