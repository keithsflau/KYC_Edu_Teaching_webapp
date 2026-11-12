const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ud = path.join(os.tmpdir(), "hist-cdp-shared");
const port = 9333;

const pages = [
  ["lesson", "http://127.0.0.1:5051/wars/ww1/tannenberg/", "ww1/tannenberg"],
  ["lesson", "http://127.0.0.1:5051/wars/ww1/marne/", "ww1/marne"],
  ["lesson", "http://127.0.0.1:5051/wars/ww1/gallipoli/", "ww1/gallipoli"],
  ["lesson", "http://127.0.0.1:5051/wars/ww1/verdun/", "ww1/verdun"],
  ["lesson", "http://127.0.0.1:5051/wars/ww2-europe/dunkirk/", "ww2-europe/dunkirk"],
  ["lesson", "http://127.0.0.1:5051/wars/ww2-europe/stalingrad/", "ww2-europe/stalingrad"],
  ["lesson", "http://127.0.0.1:5051/wars/ww2-europe/el-alamein/", "ww2-europe/el-alamein"],
  ["lesson", "http://127.0.0.1:5051/wars/ww2-pacific/philippines/", "ww2-pacific/philippines"],
  ["lesson", "http://127.0.0.1:5051/wars/ww2-pacific/hiroshima/", "ww2-pacific/hiroshima"],
  ["lesson", "http://127.0.0.1:5051/wars/korea/invasion/", "korea/invasion"],
  ["lesson", "http://127.0.0.1:5051/wars/mideast/yom-kippur/", "mideast/yom-kippur"],
  ["lesson", "http://127.0.0.1:5051/wars/mideast/war-1948/", "mideast/war-1948"],
  ["lesson", "http://127.0.0.1:5051/wars/mideast/gaza-intifada/", "mideast/gaza-intifada"],
  ["lesson", "http://127.0.0.1:5051/wars/balkans/srebrenica/", "balkans/srebrenica"],
  ["lesson", "http://127.0.0.1:5051/wars/balkans/vukovar/", "balkans/vukovar"],
  ["lesson", "http://127.0.0.1:5051/wars/balkans/sarajevo/", "balkans/sarajevo"],
  ["lesson", "http://127.0.0.1:5050/", "ru-ua-war"]
];
function getJson(p) {
  return new Promise((resolve, reject) => {
    const q = http.get({ host: "127.0.0.1", port, path: p, timeout: 2000 }, (res) => {
      let d = "";
      res.on("data", (c) => { d += c; });
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    });
    q.on("error", reject);
    q.on("timeout", () => { q.destroy(); reject(new Error("timeout")); });
  });
}

function killTree(pid) {
  return new Promise((resolve) => {
    const k = spawn("taskkill", ["/PID", String(pid), "/T", "/F"], { windowsHide: true });
    k.on("close", () => resolve());
    setTimeout(resolve, 4000);
  });
}

async function runOne(kind, url, n) {
  const dir = ud + "-" + n;
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  const child = spawn(edge, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--disable-extensions",
    "--remote-debugging-port=" + port,
    "--remote-allow-origins=*",
    "--user-data-dir=" + dir,
    url
  ], { windowsHide: true });
  const exceptions = [];
  try {
    let ver = null;
    for (let i = 0; i < 50 && !ver; i++) {
      try { ver = await getJson("/json/version"); } catch { await new Promise((r) => setTimeout(r, 200)); }
    }
    if (!ver) throw new Error("no debugger");
    let page = null;
    for (let i = 0; i < 40 && !page; i++) {
      const list = await getJson("/json/list");
      page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (!page) await new Promise((r) => setTimeout(r, 200));
    }
    if (!page) throw new Error("no page");
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener("open", res);
      ws.addEventListener("error", () => rej(new Error("ws")));
    });
    let id = 0;
    const pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === "Runtime.exceptionThrown") {
        const d = msg.params.exceptionDetails;
        exceptions.push((d.exception && d.exception.description) || d.text || "exception");
      }
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    });
    const send = (method, params) => new Promise((res) => {
      const my = ++id;
      pending.set(my, res);
      ws.send(JSON.stringify({ id: my, method, params: params || {} }));
    });
    await send("Runtime.enable");
    const expr = "(() => { const b=document.getElementById('boot'); const m=document.getElementById('boot-msg'); const e=document.getElementById('err'); const t=document.body?document.body.innerText:''; return JSON.stringify({boot:b?b.className:'', msg:m?(m.textContent||'').slice(0,80):'', err:e?(e.textContent||'').slice(0,180):'', sfx:t.includes('聲效'), task:t.includes('史料題'), links:document.querySelectorAll('a').length, text:t.slice(0,80)}); })()";
    const limit = kind === "catalog" ? 12000 : 150000;
    const start = Date.now();
    let last = null;
    while (Date.now() - start < limit) {
      const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
      const val = r.result && r.result.result && r.result.result.value;
      if (val) last = JSON.parse(val);
      const bad = exceptions.length || (last && /失敗/.test(last.err));
      if (bad) break;
      if (kind === "catalog" && last && last.links > 0) break;
      if (kind === "lesson" && last && last.sfx && last.task && String(last.boot).includes("gone")) break;
      await new Promise((r2) => setTimeout(r2, 700));
    }
    try { ws.close(); } catch {}
    await killTree(child.pid);
    await new Promise((r) => setTimeout(r, 600));
    const played = !!(last && last.sfx && last.task && String(last.boot).includes("gone") && !(last.err && /失敗/.test(last.err)) && !exceptions.length);
    const catOk = last && last.links > 0 && !exceptions.length;
    return { ok: kind === "catalog" ? catOk : played, gone: played, last, exceptions: exceptions.slice(0, 2) };
  } catch (e) {
    await killTree(child.pid);
    return { ok: false, crash: String(e), exceptions };
  }
}

(async () => {
  const fails = [];
  let n = 0;
  for (const [kind, url, name] of pages) {
    const r = await runOne(kind, url, n);
    n++;
    const msg = r.last ? (r.last.msg || r.last.err || "") : (r.crash || "");
    console.log((r.ok ? "OK play" : "FAIL"), name, msg.replace(/\s+/g, " ").slice(0, 120));
    if (!r.ok && r.last && r.last.err) console.log("  ERR", r.last.err.replace(/\s+/g, " ").slice(0, 240));
    if (r.exceptions && r.exceptions.length) console.log("  EX", String(r.exceptions[0]).replace(/\s+/g, " ").slice(0, 220));
    if (!r.ok) fails.push(name + " " + (r.crash || msg));
  }
  console.log("EXECUTED", n, "FAILS", fails.length);
  fails.forEach((f) => console.log("FAILPATH", f));
})();
