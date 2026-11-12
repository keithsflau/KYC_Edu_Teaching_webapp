const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

function getJson(port, p) {
  return new Promise((resolve, reject) => {
    const q = http.get({ host: "127.0.0.1", port, path: p || "/json/version", timeout: 2000 }, (res) => {
      let d = "";
      res.on("data", (c) => { d += c; });
      res.on("end", () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    });
    q.on("error", reject);
    q.on("timeout", () => { q.destroy(); reject(new Error("timeout")); });
  });
}

async function waitJson(port) {
  for (let i = 0; i < 50; i++) {
    try { return await getJson(port); } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  throw new Error("debug port not ready");
}

function killTree(pid) {
  try { spawn("taskkill", ["/PID", String(pid), "/T", "/F"], { windowsHide: true }); } catch {}
}

async function runPage(url) {
  const port = 9333;
  const ud = path.join(os.tmpdir(), "hist-cdp-one");
  fs.rmSync(ud, { recursive: true, force: true });
  const child = spawn(edge, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--disable-extensions",
    "--remote-debugging-port=" + port,
    "--remote-allow-origins=*",
    "--user-data-dir=" + ud,
    url
  ], { windowsHide: true });
  let stderr = "";
  child.stderr.on("data", (d) => { stderr += d; });
  try {
    await waitJson(port);
    let page = null;
    for (let i = 0; i < 40 && !page; i++) {
      const list = await getJson(port, "/json/list");
      page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (!page) await new Promise((r) => setTimeout(r, 200));
    }
    if (!page) throw new Error("no page target");
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener("open", res);
      ws.addEventListener("error", () => rej(new Error("ws")));
    });
    let id = 0;
    const pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
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
    const start = Date.now();
    let last = null;
    while (Date.now() - start < 35000) {
      const r = await send("Runtime.evaluate", {
        expression: "(() => { const b=document.getElementById('boot'); const e=document.getElementById('err'); const t=document.body?document.body.innerText:''; return JSON.stringify({boot:b?b.className:null, err:e?(e.textContent||'').slice(0,200):'', sfx:t.includes('聲效'), task:t.includes('史料題'), ready:document.readyState}); })()",
        returnByValue: true
      });
      const val = r.result && r.result.result && r.result.result.value;
      if (!val) { last = r; break; }
      last = JSON.parse(val);
      if (last.boot && String(last.boot).includes("gone") && last.sfx && last.task) {
        ws.close();
        killTree(child.pid);
        return { ok: true, last };
      }
      if (last.err && /失敗|Error|error/.test(last.err)) {
        ws.close();
        killTree(child.pid);
        return { ok: false, last };
      }
      await new Promise((r2) => setTimeout(r2, 800));
    }
    ws.close();
    killTree(child.pid);
    return { ok: false, timeout: true, last, stderr: stderr.slice(-240) };
  } catch (e) {
    killTree(child.pid);
    return { ok: false, crash: String(e), stderr: stderr.slice(-240) };
  }
}

const url = process.argv[2] || "http://127.0.0.1:5051/wars/ww1/sarajevo/";
runPage(url).then((r) => {
  console.log(JSON.stringify(r, null, 2));
  process.exit(r.ok ? 0 : 1);
});
