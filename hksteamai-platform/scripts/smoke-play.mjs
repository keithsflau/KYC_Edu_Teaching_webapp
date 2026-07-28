/**
 * HTTP smoke: /play + /api/modules return HTML (not Invalid path JSON).
 * Run with dev server: npm run dev && npm run test:smoke:play
 * Exit 0 = pass; non-zero = failures.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = process.env.PLAY_SMOKE_BASE || "http://localhost:3000";

let failed = 0;
let passed = 0;

function ok(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`PASS  ${name}${detail ? ` — ${detail}` : ""}`);
  } else {
    failed++;
    console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

/** One representative per subject band for /play routing (not all free). */
const SUBJECT_SAMPLES = [
  { subject: "Mathematics", path: "Secondary_School/Mathematics/Form 1/01_Directed_Numbers", free: true },
  { subject: "Junior Science", path: "Secondary_School/Junior Science/Form 1/01_Lab_Safety", free: true },
  { subject: "Chemistry", path: "Secondary_School/Chemistry/Form 3/03_Periodic_Table", free: true },
  {
    subject: "Physics",
    path: "Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System",
    free: true,
  },
  { subject: "Biology", path: "Secondary_School/Biology/apps/photosynthesis", free: false },
  { subject: "Chinese_History", path: "Secondary_School/Chinese_History/3D_War/cse-wars", free: false },
  { subject: "ICT", path: "Secondary_School/ICT/HKDSE_Interactive_Lab/01_Spreadsheet_Logic", free: false },
];

async function fetchKind(url) {
  const r = await fetch(url, { redirect: "manual" });
  const ct = r.headers.get("content-type") || "";
  const body = ct.includes("json") ? await r.text() : "";
  return {
    status: r.status,
    isHtml: ct.includes("text/html"),
    isJson: ct.includes("application/json"),
    body,
    permissions: r.headers.get("permissions-policy") || "",
  };
}

function apiUrl(modulePath) {
  return `${BASE}/api/modules/${modulePath.split("/").map(encodeURIComponent).join("/")}`;
}

function playUrl(modulePath) {
  return `${BASE}/play/${modulePath.split("/").map(encodeURIComponent).join("/")}`;
}

async function main() {
  try {
    const ping = await fetch(BASE, { redirect: "manual" });
    ok("dev server reachable", ping.status < 500, `${BASE} → ${ping.status}`);
  } catch (e) {
    ok("dev server reachable", false, String(e.message || e));
    console.error("\nStart dev server: npm run dev");
    process.exit(1);
  }

  const free = readJson("data/free-demo-catalog.json");
  ok("free demo catalog has 15 modules", free.modules?.length === 15, String(free.modules?.length));

  for (const m of free.modules) {
    const key = m.path.replace(/\\/g, "/").replace(/^HK Cirriculum\//i, "").replace(/\/index\.html$/i, "");
    const api = await fetchKind(apiUrl(key));
    const expectHtml = api.status === 200 && api.isHtml;
    ok(`api free demo HTML: ${key.split("/").slice(-2).join("/")}`, expectHtml, `${api.status} ${api.isJson ? api.body.slice(0, 60) : "HTML"}`);
    if (api.isJson && api.body.includes("Invalid path")) {
      failed++;
      console.error(`FAIL  Invalid path regression: ${key}`);
    }
  }

  for (const s of SUBJECT_SAMPLES) {
    const play = await fetchKind(playUrl(s.path));
    ok(`/play ${s.subject} shell`, play.status === 200 && play.isHtml, `${play.status}`);

    const api = await fetchKind(apiUrl(s.path));
    if (s.free) {
      ok(`/api ${s.subject} (free)`, api.status === 200 && api.isHtml, `${api.status}`);
    } else {
      const lockedOk = api.status === 403 && api.isJson && api.body.includes("Locked");
      ok(`/api ${s.subject} (paid guest)`, lockedOk, `${api.status} ${api.body.slice(0, 50)}`);
      const invalid = api.body.includes("Invalid path");
      ok(`/api ${s.subject} not Invalid path`, !invalid, invalid ? api.body : "ok");
    }
  }

  const solarPath =
    "Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System";
  const legacy = await fetchKind(apiUrl(`HK Cirriculum/${solarPath}`));
  ok("legacy HK Cirriculum/ prefix", legacy.status === 200 && legacy.isHtml, `${legacy.status}`);

  const solar = await fetchKind(apiUrl(solarPath));
  ok(
    "MediaPipe Solar System Permissions-Policy",
    solar.permissions.includes("camera"),
    solar.permissions || "(missing)"
  );

  const playHtml = await (await fetch(playUrl(solarPath))).text();
  const iframeOk = new RegExp(
    `iframe[^>]+src="/api/modules/${solarPath.replace(/\//g, "\\/")}"`
  ).test(playHtml);
  ok("play iframe canonical path (no HK Cirriculum/)", iframeOk);

  console.log("\n---");
  console.log(`Result: ${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

main();
