"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const root = path.resolve(__dirname, "..", "..", "..");
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const base = "http://127.0.0.1:8877/";

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "lib" || name === "node_modules" || name === "tools") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name === "index.html") out.push(p);
  }
}

function get(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      res.resume();
      res.on("end", () => resolve(res.statusCode));
    }).on("error", (e) => resolve("ERR " + e.message));
  });
}

function runEdge(url, tag) {
  return new Promise((resolve) => {
    const ud = path.join(process.env.TEMP || ".", "hist-edge-" + tag);
    const child = spawn(edge, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--user-data-dir=" + ud,
      "--virtual-time-budget=18000",
      "--dump-dom",
      url
    ], { windowsHide: true });
    let out = "";
    child.stdout.on("data", (d) => { out += d.toString("utf8"); if (out.length > 400000) out = out.slice(-200000); });
    child.stderr.on("data", () => {});
    const timer = setTimeout(() => { child.kill(); resolve({ killed: true, out }); }, 25000);
    child.on("close", () => { clearTimeout(timer); resolve({ killed: false, out }); });
  });
}

(async () => {
  const files = [];
  walk(root, files);
  const fails = [];
  for (const file of files) {
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const url = base + rel.replace(/index\.html$/, "");
    const code = await get(url);
    const html = fs.readFileSync(file, "utf8");
    const needsApp = html.includes("shared/app.js") || html.includes("ru-ua-war/app.js") || /src="app\.js"/.test(html);
    if (code !== 200) {
      fails.push(rel + " HTTP " + code);
      console.log("FAIL", rel, code);
      continue;
    }
    if (!needsApp) {
      console.log("OK catalog", rel);
      continue;
    }
    const tag = rel.replace(/[^\w]+/g, "_").slice(0, 40);
    const result = await runEdge(url, tag);
    const text = result.out || "";
    const err = /初始化失敗[\s\S]{0,240}/.exec(text);
    const gone = /id="boot"[^>]*gone|class="[^"]*gone/.test(text);
    const sfx = text.includes("聲效");
    const task = text.includes("史料題");
    if (err) {
      fails.push(rel + " " + err[0].replace(/\s+/g, " ").slice(0, 180));
      console.log("FAIL", rel, err[0].replace(/\s+/g, " ").slice(0, 160));
    } else if (!gone) {
      fails.push(rel + " boot-not-gone killed=" + result.killed + " len=" + text.length);
      console.log("FAIL", rel, "boot-not-gone", result.killed, text.length);
    } else if (!sfx || !task) {
      fails.push(rel + " missing ui sfx=" + sfx + " task=" + task);
      console.log("FAIL", rel, "ui", sfx, task);
    } else {
      console.log("OK play", rel);
    }
  }
  console.log("FAILS", fails.length);
  fails.forEach((f) => console.log(" -", f));
})();
