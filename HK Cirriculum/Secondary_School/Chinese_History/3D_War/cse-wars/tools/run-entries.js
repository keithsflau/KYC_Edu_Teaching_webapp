const { execFile } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const battles = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name === "index.html" && dir.split(path.sep).includes("wars") && path.basename(dir) !== "wars") {
      const rel = path.relative(path.join(__dirname, ".."), p).replace(/\\/g, "/").replace(/index\.html$/, "");
      battles.push(rel);
    }
  }
}
walk(path.join(__dirname, "..", "wars"));

const pages = [
  { name: "科目入口", url: "http://localhost:5101/Secondary_School/Chinese_History/index.html" },
  { name: "戰爭總目錄", url: "http://localhost:5052/" },
  { name: "近代入口", url: "http://localhost:5052/wars/jindai/" },
  ...battles.map((rel) => ({ name: rel, url: "http://localhost:5052/" + rel })),
];

function get(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        res.resume();
        resolve(res.statusCode);
      })
      .on("error", (e) => resolve(String(e.message)));
  });
}

function dump(url) {
  return new Promise((resolve) => {
    execFile(
      chrome,
      ["--headless=new", "--disable-gpu", "--no-first-run", "--virtual-time-budget=12000", "--timeout=20000", "--dump-dom", url],
      { timeout: 45000, maxBuffer: 30 * 1024 * 1024, windowsHide: true },
      (err, stdout, stderr) => {
        const html = String(stdout || "");
        const marker = html.indexOf("初始化失敗");
        resolve({
          err: err ? String(err.message).slice(0, 180) : "",
          len: html.length,
          failed: marker >= 0,
          detail: marker >= 0 ? html.slice(marker, marker + 240).replace(/\s+/g, " ") : "",
          booted: /id="boot"[^>]*class="[^"]*gone/.test(html),
          judge: html.includes("勝敗判斷"),
          depth: html.includes("初中"),
          stderr: String(stderr || "").slice(0, 120),
        });
      }
    );
  });
}

(async () => {
  const lines = [];
  let fail = 0;
  for (const page of pages) {
    const status = await get(page.url);
    const dom = await dump(page.url);
    const ok = status === 200 && !dom.failed && dom.len > 400;
    if (!ok) fail++;
    lines.push(`${ok ? "OK" : "FAIL"}\t${status}\tlen=${dom.len}\tboot=${dom.booted}\t${page.name}\t${dom.detail || dom.err}`);
    console.log(lines[lines.length - 1]);
  }
  console.log("TOTAL", pages.length, "FAIL", fail);
  fs.writeFileSync(path.join(__dirname, "_entry-results.txt"), lines.join("\n"));
})();
