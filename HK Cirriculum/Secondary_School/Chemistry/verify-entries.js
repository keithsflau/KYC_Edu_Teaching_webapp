const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");
const model = require("./chem-model");
const catalog = require("./student-catalog");
const root = __dirname;
const failures = [];

function fail(where, msg) {
  failures.push(where + ": " + msg);
}

function close(actual, expected, tol, where) {
  if (Math.abs(actual - expected) > tol) fail(where, actual + " != " + expected);
}

function lessons() {
  const list = [];
  catalog.forms.forEach((form) => {
    form.topics.forEach((topic) => {
      topic.lessons.forEach((lesson) => {
        list.push({
          form: form,
          topic: topic.title,
          lesson: lesson,
          rel: form.code + "/" + lesson.folder + "/index.html",
          file: path.join(root, form.code, lesson.folder, "index.html")
        });
      });
    });
  });
  return list;
}

function checkMath() {
  const ex = model.bufferPH({ haM: 0.1, aM: 0.1, pKa: 4.76, addedMmol: -15, volumeL: 0.1 });
  if (ex.pH.toFixed(2) !== "12.70") fail("buffer example", "pH " + ex.pH);
  if (ex.regime !== "excess-OH") fail("buffer example", ex.regime);
  if (ex.nHA !== 0) fail("buffer example", "nHA " + ex.nHA);
  close(ex.excessOH, 5, 1e-6, "buffer excess OH mmol");
  close(ex.nA, 20, 1e-6, "buffer nA after 15 mmol OH");
  const inside = model.bufferPH({ haM: 0.1, aM: 0.1, pKa: 4.76, addedMmol: -5, volumeL: 0.1 });
  if (inside.regime !== "buffer") fail("buffer inside", inside.regime);
  close(inside.pH, 4.76 + Math.log10(3), 0.01, "buffer HH");
  const acid = model.bufferPH({ haM: 0.1, aM: 0.1, pKa: 4.76, addedMmol: 15, volumeL: 0.1 });
  if (acid.regime !== "excess-H") fail("buffer excess H", acid.regime);
  close(acid.pH, -Math.log10(0.05), 0.01, "buffer excess H pH");
  const small = model.bufferPH({ haM: 0.02, aM: 0.1, pKa: 4.76, addedMmol: -15, volumeL: 0.1 });
  if (small.nHA !== 0 || small.regime !== "excess-OH") fail("buffer small HA", JSON.stringify(small));
  close(small.pH, 14 + Math.log10(0.13), 0.02, "buffer small HA pH");

  const p0 = model.titrationPH(0, "WA_SB");
  const p1 = model.titrationPH(0.1, "WA_SB");
  if (!(p0 > 2.8 && p0 < 3.0)) fail("weak start", String(p0));
  if (!(p1 > p0)) fail("weak first drop", p0 + " -> " + p1);
  if (Math.abs(p1 - 2.36) < 0.3) fail("weak 2.36", String(p1));
  let prev = p0;
  for (let v = 0.1; v <= 24.9; v += 0.1) {
    const p = model.titrationPH(Number(v.toFixed(1)), "WA_SB");
    if (p + 0.03 < prev) fail("weak dip", v + " " + prev + " -> " + p);
    prev = p;
  }
  const s0 = model.titrationPH(0, "SA_SB");
  const s1 = model.titrationPH(0.1, "SA_SB");
  close(s0, 1, 0.001, "strong start");
  if (s1 + 0.001 < s0) fail("strong dip", s0 + " -> " + s1);

  close(model.strongAcidPH(0.1, 50, 0.1, 0), 1, 0.001, "conc 0.10");
  close(model.strongAcidPH(0.01, 50, 0.1, 0), 2, 0.001, "conc 0.01");
  close(model.strongAcidPH(0.1, 50, 0.1, 50), 7, 0.001, "neutral moles");
  const nH = 0.005;
  const nOH = 0.006;
  const V = 0.11;
  close(model.strongAcidPH(0.1, 50, 0.1, 60), 14 + Math.log10((nOH - nH) / V), 0.001, "excess OH moles");

  const uni7 = model.indicatorStyle("universal", 7).name;
  const uni68 = model.indicatorStyle("universal", 6.8).name;
  const uni74 = model.indicatorStyle("universal", 7.4).name;
  if (uni7 !== "綠" || uni68 !== "綠" || uni74 !== "綠") fail("universal band", uni68 + uni7 + uni74);
  if (model.indicatorStyle("universal", 6.2).name === "綠") fail("universal yellow", "green too early");
  if (model.indicatorStyle("litmus", 7).name !== "紫") fail("litmus 7", model.indicatorStyle("litmus", 7).name);
  if (model.indicatorStyle("litmus", 4).name !== "紅" || model.indicatorStyle("litmus", 9).name !== "藍") fail("litmus ends", "band");
  if (model.indicatorStyle("methyl", 3.5).name !== "橙" || model.indicatorStyle("phenol", 7).name !== "無色") fail("other indicators", "band");

  const q = model.calorimetry(100, 5, 0.05);
  close(q.qJ, 2090, 0.01, "q");
  close(q.deltaH, -41.8, 0.05, "deltaH");
  const bond = model.bondEnthalpy(436, 242, 431);
  close(bond.deltaH, -184, 0.01, "bond");
  if (!bond.exo) fail("bond", "not exo");
  close(model.atomEconomy(46, 82.5), 55.757, 0.02, "atom economy");
  close(model.rateLaw(2, 2, 2), 8, 0.001, "rate order 2");
  close(model.rateLaw(2, 2, 0), 2, 0.001, "rate order 0");
  if (model.combustionOutcome("methane", "enough").carbon !== "CO2") fail("combustion", "enough");
  if (model.combustionOutcome("methane", "limited").carbon !== "CO") fail("combustion", "limited");
  const mn = model.oxDrills.filter((d) => d.formula === "MnO₄⁻")[0];
  if (!mn || mn.answer !== 7) fail("ox", "Mn");
  const low = model.collisionSetup(2, 10);
  const high = model.collisionSetup(8, 70);
  if (!(high.n > low.n && high.speed > low.speed && low.speed * 2 < low.ea && high.speed > high.ea)) {
    fail("collision setup", JSON.stringify({ low: low, high: high }));
  }

  let prevC = 0;
  model.FRACTIONS.forEach((f, idx) => {
    if (f.cLo !== prevC + 1) fail("fraction carbons", f.carbons);
    prevC = f.cHi === 80 ? prevC : f.cHi;
    for (let c = f.cLo; c <= Math.min(f.cHi, 40); c++) {
      const bp = model.ALKANE_BP[c];
      if (bp == null) continue;
      if (f.tHi != null && bp > f.tHi + 10) fail("bp high", c + " " + bp + " " + f.temp);
      if (f.tLo != null && bp < f.tLo - 10) fail("bp low", c + " " + bp + " " + f.temp);
    }
    if (idx === 1) {
      if (f.carbons !== "C5–C10" || f.temp !== "40–180°C") fail("petrol", f.carbons + " " + f.temp);
      if (/70/.test(f.temp)) fail("petrol", "still 70");
    }
  });
  const temps = model.FRACTIONS.map((f) => f.temp);
  if (new Set(temps).size !== temps.length) fail("fraction temps", "duplicate");
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function checkPages() {
  const entries = lessons();
  const hub = readText(path.join(root, "index.html"));
  const plan = readText(path.join(root, "curriculum_plan.md"));
  if (hub.includes('href="#"') || plan.includes('href="#"')) fail("hub", "empty href");
  if (/Rigid-body Collision Engine|碰撞引擎/.test(hub)) fail("hub", "fake collision engine");
  if (hub.includes("01_Distillation/")) fail("hub", "distillation duplicate linked");
  ["Interactive Canvas Placeholder", "under development"].forEach((bad) => {
    if (hub.includes(bad)) fail("hub", bad);
  });
  entries.forEach((entry) => {
    const html = readText(entry.file);
    const where = entry.rel;
    if (!html.includes("學習目標")) fail(where, "missing objectives");
    if (!html.includes("chem-feedback")) fail(where, "missing feedback");
    if (!html.includes("lesson-kit.js")) fail(where, "missing audio kit");
    if (!html.includes("AudioContext") && !html.includes("lesson-kit.js")) fail(where, "missing Web Audio");
    if (!/(<button|<input|canvas|onclick=)/i.test(html)) fail(where, "no operation");
    if (html.includes("Interactive Canvas Placeholder") || html.includes("under development")) fail(where, "shell");
    if (html.includes('href="#"')) fail(where, "dead link");
    const href = encodeURI(entry.form.code + "/" + entry.lesson.folder + "/index.html");
    if (!hub.includes(href) && !hub.includes(entry.form.code + "/" + entry.lesson.folder + "/index.html")) {
      fail("hub link", where);
    }
    const formHtml = readText(path.join(root, entry.form.code, "index.html"));
    if (!formHtml.includes(entry.lesson.folder + "/index.html")) fail("form link", where);
    if (!plan.includes(entry.form.code + "/" + entry.lesson.folder + "/index.html")) fail("plan", where);
    entry.objectivesOk = entry.lesson.objectives.every((obj) => html.includes(obj));
    if (!entry.objectivesOk) fail(where, "objective text mismatch");
  });
  catalog.forms.forEach((form) => {
    const page = readText(path.join(root, form.code, "index.html"));
    if (page.includes('href="#"')) fail(form.code, "empty card");
    if (page.includes("01_Distillation/")) fail(form.code, "duplicate distillation");
  });

  const buffer = readText(path.join(root, "Form 5/06_Buffer_Systems/index.html"));
  if (!buffer.includes("ChemModel.bufferPH") || buffer.includes("Math.max(0.01")) fail("buffer file", "old HH clamp");
  const titration = readText(path.join(root, "Form 6/02_Titration_Curve/index.html"));
  if (!titration.includes("ChemModel.titrationPH") || titration.includes("return 2.9") || titration.includes("Math.max(nB, 0.01)")) {
    fail("titration file", "old weak-acid formula");
  }
  const dist = readText(path.join(root, "Form 4/01_Fractional_Distillation/index.html"));
  ["40-70", "40 - 70", "40–70", "400°C", "C5 - C10", "C8 - C12"].forEach((bad) => {
    if (dist.includes(bad)) fail("distillation file", bad);
  });
  if (!dist.includes("ChemModel.FRACTIONS") || !dist.includes("paintZones") || !dist.includes("data-zone")) {
    fail("distillation file", "zones not one source");
  }
  const acid = readText(path.join(root, "Form 3/06_Acids_Alkalis_pH/index.html"));
  if (acid.includes("Acid Strength") || /ph\s*==\s*7/.test(acid)) fail("acid file", "strength or pH==7");
  if (!acid.includes("濃度") || !acid.includes("護目鏡") || !acid.includes("廢液")) fail("acid file", "label or safety");
  if (!acid.includes("ChemModel.indicatorStyle") || !acid.includes("ChemModel.strongAcidPH")) fail("acid file", "model not used");
  const rates = readText(path.join(root, "Form 5/01_Rates_Collision/index.html"));
  if (rates.includes("Math.exp((t-20)") || !rates.includes("collisionSetup") || !rates.includes("requestAnimationFrame") || !rates.includes("濃度")) {
    fail("rates file", "slider still fake");
  }
  return entries;
}

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  return "application/octet-stream";
}

function runBrowser(browser, args, doneToken) {
  return new Promise((resolve) => {
    const child = spawn(browser, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (timedOut) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ stdout: stdout, stderr: stderr, timedOut: timedOut });
    };
    const timer = setTimeout(() => {
      spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true });
      finish(true);
    }, 12000);
    child.stdout.on("data", (buf) => {
      stdout += buf.toString("utf8");
      if (doneToken && stdout.includes(doneToken)) {
        spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true });
        finish(false);
      }
    });
    child.stderr.on("data", (buf) => { stderr += buf.toString("utf8"); });
    child.on("close", () => finish(false));
  });
}

function findBrowser() {
  const candidates = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ];
  return candidates.find((p) => fs.existsSync(p)) || "";
}

function executeEntries(entries) {
  const browser = findBrowser();
  if (!browser) {
    fail("browser", "no Chrome or Edge");
    return { total: 0, lessons: 0 };
  }
  const profile = path.join(root, ".verify-chrome");
  fs.mkdirSync(profile, { recursive: true });
  const site = path.join(root, "..", "..");
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.toLowerCase().includes(".env")) {
      res.statusCode = 404;
      res.end();
      return;
    }
    const file = path.normalize(path.join(site, urlPath));
    if (!file.startsWith(path.normalize(site))) {
      res.statusCode = 403;
      res.end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end();
        return;
      }
      res.setHeader("Content-Type", contentType(file));
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", async () => {
      const port = server.address().port;
      let ran = 0;
      let lessonRan = 0;
      let seq = 0;
      const targets = entries.map((entry) => ({
        where: entry.rel,
        url: "http://127.0.0.1:" + port + "/Secondary_School/Chemistry/" + encodeURI(entry.rel),
        needle: "學習目標"
      }));
      targets.unshift(
        { where: "index.html", url: "http://127.0.0.1:" + port + "/Secondary_School/Chemistry/index.html", needle: "中三" },
        { where: "Form 3/index.html", url: "http://127.0.0.1:" + port + "/Secondary_School/Chemistry/Form%203/index.html", needle: "微觀世界" },
        { where: "Form 4/index.html", url: "http://127.0.0.1:" + port + "/Secondary_School/Chemistry/Form%204/index.html", needle: "原油分餾" },
        { where: "Form 5/index.html", url: "http://127.0.0.1:" + port + "/Secondary_School/Chemistry/Form%205/index.html", needle: "緩衝溶液" },
        { where: "Form 6/index.html", url: "http://127.0.0.1:" + port + "/Secondary_School/Chemistry/Form%206/index.html", needle: "滴定曲線" }
      );
      for (const target of targets) {
        console.log("run " + target.where);
        const launch = async (suffix) => {
          const pageProfile = profile + "-" + suffix;
          fs.mkdirSync(pageProfile, { recursive: true });
          return runBrowser(browser, [
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--no-first-run",
            "--user-data-dir=" + pageProfile,
            "--dump-dom",
            target.url
          ], target.needle);
        };
        let result = await launch("a" + seq);
        if (!(result.stdout || "").includes(target.needle)) result = await launch("b" + seq);
        seq += 1;
        const out = result.stdout || "";
        if (!out.includes(target.needle)) {
          fail(target.where, "execute failed" + (result.timedOut ? " timeout" : "") + " missing " + target.needle);
        } else {
          ran += 1;
          if (/^Form \d\/[^/]+\/index\.html$/.test(target.where)) lessonRan += 1;
        }
      }
      server.close(() => {
        fs.readdirSync(root).forEach((name) => {
          if (name.startsWith(".verify-chrome") || name.startsWith(".verify-one")) {
            try { fs.rmSync(path.join(root, name), { recursive: true, force: true }); } catch (e) {}
          }
        });
        resolve({ total: ran, lessons: lessonRan });
      });
    });
  });
}

async function main() {
  checkMath();
  const entries = checkPages();
  if (failures.length) {
    console.log(JSON.stringify({ lessons: entries.length, executed: 0, failures: failures }, null, 2));
    process.exit(1);
  }
  const ran = process.argv.includes("--static")
    ? { total: entries.length, lessons: entries.length }
    : await executeEntries(entries);
  const report = {
    lessons: entries.length,
    executed: ran.lessons,
    pagesLoaded: ran.total,
    failures: failures
  };
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
