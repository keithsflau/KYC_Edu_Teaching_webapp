const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ud = path.join(os.tmpdir(), "hist-edge-probe");
fs.rmSync(ud, { recursive: true, force: true });
const url = process.argv[2] || "http://127.0.0.1:8877/3D_War/dse-wars/wars/ww1/sarajevo/";
const child = spawn(edge, [
  "--headless",
  "--disable-gpu",
  "--no-first-run",
  "--disable-extensions",
  "--user-data-dir=" + ud,
  "--virtual-time-budget=12000",
  "--timeout=20000",
  "--dump-dom",
  url
], { windowsHide: true });
let n = 0;
child.stdout.on("data", (d) => {
  n += d.length;
  if (n < 400) process.stdout.write("CHUNK " + d.length + "\n");
});
child.stderr.on("data", (d) => {
  const s = String(d).replace(/\s+/g, " ").slice(0, 220);
  if (s.trim()) process.stdout.write("E " + s + "\n");
});
const timer = setTimeout(() => {
  child.kill();
  process.stdout.write("KILL n=" + n + "\n");
}, 35000);
child.on("close", (code) => {
  clearTimeout(timer);
  process.stdout.write("CLOSE code=" + code + " n=" + n + "\n");
});
