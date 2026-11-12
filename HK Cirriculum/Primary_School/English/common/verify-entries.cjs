const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browser = fs.existsSync(chrome) ? chrome : edge;
const tmp = path.join(root, "_verify_tmp");
fs.mkdirSync(tmp, { recursive: true });

function walk(dir, out) {
  fs.readdirSync(dir).forEach((name) => {
    if (name === "node_modules" || name === "_verify_tmp") return;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.toLowerCase() === "index.html") out.push(full);
  });
}

const pages = [];
walk(root, pages);
const failures = [];
let checks = 0;

function record(file, kind, error) {
  failures.push({ file: path.relative(root, file), kind, error: String(error).slice(0, 800) });
}

pages.forEach((file, index) => {
  const html = fs.readFileSync(file, "utf8");
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  let scriptIndex = 0;
  while ((match = re.exec(html))) {
    if (/\bsrc\s*=/i.test(match[1])) continue;
    const dest = path.join(tmp, "s" + index + "_" + scriptIndex + ".js");
    fs.writeFileSync(dest, match[2]);
    const result = spawnSync(process.execPath, ["--check", dest], { encoding: "utf8" });
    checks += 1;
    scriptIndex += 1;
    if (result.status !== 0) record(file, "node --check", result.stderr || result.stdout);
  }
  const attr = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  while ((match = attr.exec(html))) {
    const url = match[1];
    if (/^(https?:|data:|mailto:|#|javascript:)/i.test(url)) continue;
    const clean = decodeURIComponent(url.split("#")[0].split("?")[0]);
    if (!clean) continue;
    checks += 1;
    const resolved = path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(resolved)) record(file, "missing path", url);
  }
});

["gb-audio.js", "checks.js", "page.js"].forEach((name) => {
  const file = path.join(root, "common", name);
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  checks += 1;
  if (result.status !== 0) record(file, "node --check", result.stderr || result.stdout);
});

const audio = require(path.join(root, "common", "gb-audio.js"));
const lessonChecks = require(path.join(root, "common", "checks.js"));
checks += 2;
try {
  audio.selfTestSync();
  lessonChecks.selfTestSync();
} catch (error) {
  record(path.join(root, "common"), "logic", error.stack || error.message);
}

function fileUrl(file) {
  const normalized = file.replace(/\\/g, "/");
  return "file:///" + encodeURI(normalized).replace(/#/g, "%23") + "?autotest=1";
}

pages.forEach((file, index) => {
  const profile = path.join(os.tmpdir(), "hk-english-check-" + index);
  const result = spawnSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--allow-file-access-from-files",
    "--autoplay-policy=no-user-gesture-required",
    "--virtual-time-budget=15000",
    "--dump-dom",
    "--user-data-dir=" + profile,
    fileUrl(file)
  ], { encoding: "utf8", timeout: 45000, maxBuffer: 8 * 1024 * 1024 });
  checks += 1;
  const dom = result.stdout || "";
  fs.writeFileSync(path.join(tmp, "dom-" + index + ".html"), dom);
  const passed = /id="autotest-result"[^>]*>\s*PASS\s*</.test(dom);
  if (!passed) {
    record(file, "browser", "status " + result.status + " " + (dom.match(/id="autotest-result"[\s\S]{0,180}/) || [result.stderr || "no autotest result"])[0]);
  }
});

const summary = {
  browser,
  pages: pages.map((file) => path.relative(root, file)),
  pageCount: pages.length,
  checks,
  pass: failures.length === 0,
  failures
};
fs.writeFileSync(path.join(tmp, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
