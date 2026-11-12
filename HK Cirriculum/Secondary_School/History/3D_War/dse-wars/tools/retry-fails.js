const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const base = "http://127.0.0.1:8877/";
const fails = [
  "3D_War/dse-wars/wars/balkans/srebrenica/index.html",
  "3D_War/dse-wars/wars/interwar/abyssinia/index.html",
  "3D_War/dse-wars/wars/korea/armistice/index.html",
  "3D_War/dse-wars/wars/korea/chosin/index.html",
  "3D_War/dse-wars/wars/korea/inchon/index.html",
  "3D_War/dse-wars/wars/korea/invasion/index.html",
  "3D_War/dse-wars/wars/mideast/six-day/index.html",
  "3D_War/dse-wars/wars/mideast/suez/index.html",
  "3D_War/dse-wars/wars/mideast/yom-kippur/index.html",
  "3D_War/dse-wars/wars/ww1/gallipoli/index.html",
  "3D_War/dse-wars/wars/ww1/marne/index.html",
  "3D_War/dse-wars/wars/ww1/sarajevo/index.html",
  "3D_War/dse-wars/wars/ww1/somme/index.html",
  "3D_War/dse-wars/wars/ww1/tannenberg/index.html",
  "3D_War/dse-wars/wars/ww1/verdun/index.html",
  "3D_War/dse-wars/wars/ww2-europe/berlin/index.html",
  "3D_War/dse-wars/wars/ww2-europe/dunkirk/index.html",
  "3D_War/dse-wars/wars/ww2-europe/el-alamein/index.html",
  "3D_War/dse-wars/wars/ww2-europe/normandy/index.html",
  "3D_War/dse-wars/wars/ww2-europe/poland/index.html",
  "3D_War/dse-wars/wars/ww2-europe/stalingrad/index.html",
  "3D_War/dse-wars/wars/ww2-pacific/guadalcanal/index.html",
  "3D_War/dse-wars/wars/ww2-pacific/hiroshima/index.html",
  "3D_War/dse-wars/wars/ww2-pacific/hong-kong/index.html",
  "3D_War/dse-wars/wars/ww2-pacific/iwo-jima/index.html",
  "3D_War/dse-wars/wars/ww2-pacific/midway/index.html",
  "3D_War/dse-wars/wars/ww2-pacific/philippines/index.html",
  "3D_War/ru-ua-war/index.html"
];

function one(rel, i) {
  return new Promise((resolve) => {
    const ud = path.join(os.tmpdir(), "hist-edge-r2-" + i);
    fs.rmSync(ud, { recursive: true, force: true });
    const child = spawn(edge, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--disable-extensions",
      "--user-data-dir=" + ud,
      "--virtual-time-budget=22000",
      "--dump-dom",
      base + rel
    ], { windowsHide: true });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => { out += d; });
    child.stderr.on("data", (d) => { err += d; });
    const timer = setTimeout(() => {
      child.kill();
      resolve({ rel, killed: true, out, err });
    }, 55000);
    child.on("close", () => {
      clearTimeout(timer);
      resolve({ rel, killed: false, out, err });
    });
  });
}

(async () => {
  const bad = [];
  for (let i = 0; i < fails.length; i++) {
    const r = await one(fails[i], i);
    const gone = /id="boot"[^>]*class="[^"]*gone/.test(r.out);
    const initErr = /初始化失敗/.test(r.out);
    const sfx = r.out.includes("聲效");
    const task = r.out.includes("史料題");
    const ok = gone && sfx && task && !initErr;
    console.log((ok ? "OK" : "FAIL"), r.rel, "killed=" + r.killed, "len=" + r.out.length, "gone=" + gone, "sfx=" + sfx, "task=" + task, "err=" + initErr);
    if (!ok) {
      bad.push(r.rel);
      const m = r.out.match(/id="err"[^>]*>[^<]{0,180}/);
      if (m) console.log("  ", m[0]);
      if (r.err) console.log("  stderr", r.err.slice(-180).replace(/\s+/g, " "));
    }
  }
  console.log("RETRY_FAILS", bad.length);
  bad.forEach((b) => console.log("FAIL", b));
})();
