import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const puppeteerPath = path.join(root, "node_modules", "puppeteer", "lib", "es5-iife", "puppeteer.js");

async function loadPuppeteer() {
  const candidates = [
    path.join(root, "node_modules", "puppeteer", "package.json"),
  ];
  if (fs.existsSync(candidates[0])) {
    return import(pathToFileURL(path.join(root, "node_modules", "puppeteer", "lib", "esm", "puppeteer", "puppeteer.js")).href).catch(async () => {
      const pkg = JSON.parse(fs.readFileSync(candidates[0], "utf8"));
      return import(pathToFileURL(path.join(root, "node_modules", "puppeteer", pkg.exports?.["."] || "index.js")).href).catch(() => import("puppeteer"));
    });
  }
  return import("puppeteer");
}

function collectFromHtml(file, html) {
  const urls = [];
  const hrefRe = /href\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;
  let m;
  while ((m = hrefRe.exec(html))) {
    const raw = m[1] || m[2];
    if (!raw || raw.startsWith("#") || raw.includes("${") || /^(https?:|mailto:|javascript:|data:)/i.test(raw)) continue;
    const clean = decodeURI(raw.split("#")[0].split("?")[0]);
    if (!clean) continue;
    urls.push(path.resolve(path.dirname(file), clean));
  }
  const json = html.match(/<script id="math-curriculum" type="application\/json">([\s\S]*?)<\/script>/);
  if (json) {
    const data = JSON.parse(json[1]);
    for (const unit of data) {
      for (const app of unit.apps || []) {
        if (app.path) urls.push(path.resolve(path.dirname(file), app.path));
      }
    }
  }
  return urls;
}

function walkCatalogs() {
  const queue = [path.join(root, "index.html")];
  const seen = new Set();
  const pages = [];
  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file) || !fs.existsSync(file) || !file.endsWith(".html")) continue;
    seen.add(file);
    pages.push(file);
    const html = fs.readFileSync(file, "utf8");
    for (const next of collectFromHtml(file, html)) {
      if (next.endsWith(".html") && next.startsWith(root)) queue.push(next);
    }
  }
  return pages;
}

const BASE = process.env.CHECK_BASE || "http://127.0.0.1:4173";

function toUrl(file) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  return `${BASE}/${rel.split("/").map(encodeURIComponent).join("/")}`;
}

const puppeteer = await loadPuppeteer();
const pages = walkCatalogs();
console.log("pages", pages.length);

const browser = await puppeteer.default.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];

for (const file of pages) {
  const url = toUrl(file);
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("requestfailed", (req) => {
    const u = req.url();
    if (u.includes("cdn.") || u.includes("googleapis") || u.includes("gstatic") || u.includes("unpkg") || u.includes("jsdelivr") || u.includes("fontawesome") || u.includes("tailwindcss")) return;
    errors.push(`requestfailed: ${u} ${req.failure()?.errorText || ""}`);
  });
  try {
    const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await new Promise((r) => setTimeout(r, 700));
    const status = res?.status() || 0;
    const body = await page.evaluate(() => ({
      text: (document.body?.innerText || "").trim().slice(0, 200),
      loader: !!document.querySelector("#loader:not(.hidden)"),
    }));
    if (status >= 400) errors.push(`http ${status}`);
    if (body.loader) errors.push("loader stuck");
    if (errors.length) {
      results.push({ file: path.relative(root, file), status, errors, snippet: body.text });
      console.log("BUG", path.relative(root, file), errors.join(" | "));
    } else {
      console.log("ok", path.relative(root, file));
    }
  } catch (err) {
    results.push({ file: path.relative(root, file), errors: [String(err)] });
    console.log("FAIL", path.relative(root, file), err.message);
  }
  await page.close();
}

await browser.close();
fs.writeFileSync(path.join(root, "scripts", "check-pages-report.json"), JSON.stringify(results, null, 2));
console.log("bugs", results.length);
