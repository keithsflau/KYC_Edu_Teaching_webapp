/**
 * 用 Chrome 開發者協定逐一打開戰役頁，等地形初始化，讀取錯誤文字。
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profile = path.join(__dirname, "_chrome-profile");
fs.mkdirSync(profile, { recursive: true });

const battles = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name === "index.html" && fs.existsSync(path.join(dir, "data.js"))) battles.push(dir);
  }
}
walk(path.join(__dirname, "..", "wars"));
const only = new Set([
  "hundred-regiments", "taierzhuang", "crossing", "huaihai", "pingjin",
  "weihaiwei", "yellow-sea", "tumu", "mobei", "yamen",
]);
for (let i = battles.length - 1; i >= 0; i--) {
  if (!only.has(path.basename(battles[i]))) battles.splice(i, 1);
}

function requestJson(method, url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(new Error(d.slice(0, 240))); }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function inspect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", () => reject(new Error("ws")));
  });
  let id = 0;
  function send(method, params) {
    const msgId = ++id;
    ws.send(JSON.stringify({ id: msgId, method, params }));
    return new Promise((resolve) => {
      const onMsg = (ev) => {
        const data = JSON.parse(ev.data);
        if (data.id === msgId) {
          ws.removeEventListener("message", onMsg);
          resolve(data.result);
        }
      };
      ws.addEventListener("message", onMsg);
    });
  }
  await send("Runtime.enable");
  const result = await send("Runtime.evaluate", {
    expression: `({err:(document.getElementById('err')&&document.getElementById('err').textContent)||'', boot:document.getElementById('boot')?document.getElementById('boot').className:'', title:document.title, sound:!!document.getElementById('sound-btn'), judge:!!document.getElementById('judge-btn')})`,
    returnByValue: true,
  });
  ws.close();
  return result && result.result && result.result.value;
}

(async () => {
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--remote-debugging-port=9222",
    `--user-data-dir=${profile}`,
  ], { stdio: "ignore" });
  await sleep(1200);
  const lines = [];
  let fail = 0;
  for (const dir of battles) {
    const rel = path.relative(path.join(__dirname, ".."), dir).replace(/\\/g, "/");
    const url = "http://localhost:5052/" + rel + "/";
    let info = null;
    let note = "";
    try {
      const tab = await requestJson("PUT", "http://127.0.0.1:9222/json/new?" + encodeURIComponent(url));
      await sleep(18000);
      info = await inspect(tab.webSocketDebuggerUrl);
      await requestJson("GET", "http://127.0.0.1:9222/json/close/" + tab.id).catch(() => {});
    } catch (e) {
      note = e.message;
    }
    const err = info && info.err ? info.err.split("\n")[0] : "";
    const ok = info && !info.err && info.sound && info.judge;
    if (!ok) fail++;
    const line = `${ok ? "OK" : "FAIL"}\t${rel}\tboot=${info && info.boot}\tsound=${info && info.sound}\t${err || note}`;
    console.log(line);
    lines.push(line);
  }
  console.log("BATTLES", battles.length, "FAIL", fail);
  fs.writeFileSync(path.join(__dirname, "_battle-cdp.txt"), lines.join("\n"));
  chrome.kill();
  process.exit(fail ? 1 : 0);
})();
