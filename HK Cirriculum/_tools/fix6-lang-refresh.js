/**
 * Fix 6 — wire NCS language refresh on flagship Physics/Chem/Bio/ICT apps.
 * Vanilla: Argument Tower pattern (APP_STRINGS + applyUI + NcsVanillaBridge).
 * React: LGER pattern (useLang + LangSwitcher + t()).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const BRIDGE_SRC = {
  5: "../../../../../common/ncs-vanilla-bridge.js",
  6: "../../../../../../common/ncs-vanilla-bridge.js",
};

function read(f) {
  return fs.readFileSync(f, "utf8");
}
function write(f, html) {
  fs.writeFileSync(f, html, "utf8");
  console.log("FIXED:", path.relative(ROOT, f).replace(/\\/g, "/"));
}

function ensureBridgeScript(html, depth) {
  const src = BRIDGE_SRC[depth];
  if (!src || html.includes("ncs-vanilla-bridge.js")) return html;
  return html.replace(
    /(<script src="[^"]*ncs-i18n\.js" defer data-ncs-kit="fleet"><\/script>)/,
    `$1\n  <script src="${src}"></script>`
  );
}

function wireReactApp(filePath, opts) {
  let html = read(filePath);
  if (html.includes("useLang, LangSwitcher")) {
    console.log("SKIP (already wired):", path.relative(ROOT, filePath));
    return;
  }

  html = html.replace(
    /const \{ useState, useEffect(?:, useRef(?:, useMemo)?)? \} = React;/,
    "const { useState, useEffect, useRef, useMemo } = React;\n    const { useLang, LangSwitcher, appTabs } = window.NcsI18n;"
  );

  if (opts.patchDrill) {
    html = html.replace(
      /function Drill\(\{ bank, label, onNeedUpgrade, onDone \}\) \{/,
      "function Drill({ bank, label, onNeedUpgrade, onDone, isZh, t }) {"
    );
    html = html.replace(
      /<h2 className="text-lg font-bold mb-1">\{item\.q\}<\/h2>\s*\n\s*\{item\.qZh \? <p className="text-sm mb-4 opacity-80" style=\{\{color: ACCENT\}\}>\{item\.qZh\}<\/p> : <div className="mb-4" \/> \}/g,
      `<h2 className="text-lg font-bold mb-1">{t(item.qZh, item.q)}</h2>`
    );
    html = html.replace(
      /<button type="button" className="text-sm mt-3 font-semibold min-h-\[44px\]" style=\{\{color: ACCENT\}\} onClick=\{\(\) => setHint\(true\)\}>Hint · 提示<\/button>/g,
      `<button type="button" className="text-sm mt-3 font-semibold min-h-[44px]" style={{color: ACCENT}} onClick={() => setHint(true)}>{t("提示", "Hint")}</button>`
    );
  }

  const appBlock = opts.customApp || defaultReactAppPatch(opts);
  html = html.replace(/function App\(\) \{[\s\S]*?\n    \}\n    ReactDOM\.createRoot/, appBlock + "\n    ReactDOM.createRoot");

  write(filePath, html);
}

function defaultReactAppPatch(opts) {
  const hub = opts.hub || "../index.html";
  const unitZh = opts.unitZh;
  const unitEn = opts.unitEn;
  const titleZh = opts.titleZh;
  const titleEn = opts.titleEn;
  const tabIds = JSON.stringify(opts.tabs || ["learn", "guided", "exam", "review"]);
  const learnBlock = opts.learnMode === "extra"
    ? `{mode === "learn" && (
            <section className={"bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 space-y-3"}>
              <h2 className="font-bold text-lg">{t("重點概念", "Key ideas")}</h2>
              <ul className={"text-sm space-y-2 list-disc list-inside " + (false ? "text-slate-300" : "text-slate-600")}>
                ${opts.learnBullets.map(b => `<li>${b.en}</li>`).join("")}
              </ul>
              <LearnExtra />
              <button type="button" className="mt-2 px-4 py-2.5 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}} onClick={() => setMode("guided")}>
                {t("開始引導練習 →", "Start guided practice →")}
              </button>
            </section>
          )}`
    : opts.learnBlock || "";

  return `function App() {
      const { isZh, t } = useLang();
      const [mode, setMode] = useState("learn");
      const [progress, setProgress] = useState(() => HKC.loadProgress(APP_ID));
      const [pay, setPay] = useState(false);
      const [payReason, setPayReason] = useState("");
      const [doneMsg, setDoneMsg] = useState(null);

      function refresh() { setProgress(HKC.loadProgress(APP_ID)); }
      useEffect(() => { refresh(); }, [mode]);

      const tabs = appTabs(${tabIds}, isZh);

      return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <a href="${hub}" className="text-sm hover:underline font-semibold" style={{color: ACCENT}}>{t("← 返回目錄", "← Back to hub")}</a>
            <LangSwitcher />
          </div>
          <header className="mt-4 mb-4">
            <p className="text-xs uppercase tracking-widest font-bold" style={{color: ACCENT}}>{t("${unitZh}", "${unitEn}")}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">{t("${titleZh}", "${titleEn}")}</h1>
            <p className="text-slate-500 mt-1">{t("學習 → 引導 → 測驗 → 複習", "Learn → Guided → Exam → Review")}</p>
          </header>

          <div className={"text-sm border border-dashed rounded-lg px-3 py-2 mb-3 flex flex-wrap justify-between gap-2 items-center border-slate-300 bg-white/80"}>
            <span>{HKC.isPaid() ? (HKC.getEntitlement().tier + " · " + t("無限", "unlimited")) : (t("免費", "Free") + " · " + HKC.remainingFree() + "/" + HKC.FREE_DAILY_CAP + " " + t("今日", "today"))} · {t("最佳", "Best")} {progress.bestScore}</span>
            {!HKC.isPaid() && (
              <button type="button" className="px-3 py-1.5 rounded-md text-xs font-semibold text-white min-h-[36px]" style={{background: ACCENT}} onClick={() => setPay(true)}>{t("升級", "Upgrade")}</button>
            )}
          </div>

          <nav className="flex flex-wrap gap-2 mb-4">
            {tabs.map(tab => (
              <button key={tab.id} type="button" onClick={() => { setMode(tab.id); setDoneMsg(null); }}
                className={"px-3.5 py-2 rounded-lg text-sm font-semibold min-h-[44px] " + (mode === tab.id ? "text-white" : "bg-white border border-slate-200 text-slate-700")}
                style={mode === tab.id ? {background: ACCENT} : {}}>
                {tab.label}
              </button>
            ))}
          </nav>

          ${learnBlock}

          {mode === "guided" && !doneMsg && (
            <Drill bank={GUIDED} label={t("引導", "Guided")} isZh={isZh} t={t} onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
              onDone={(s, n) => { setDoneMsg({ s, n, next: "exam" }); refresh(); }} />
          )}
          {mode === "exam" && !doneMsg && (
            <Drill bank={EXAM} label={t("測驗", "Exam")} isZh={isZh} t={t} onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
              onDone={(s, n) => { setDoneMsg({ s, n, next: "review" }); refresh(); }} />
          )}
          {doneMsg && (mode === "guided" || mode === "exam") && (
            <section className={"bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center"}>
              <h2 className="text-2xl font-bold">{t("完成", "Complete")}</h2>
              <p className="mt-2">{doneMsg.s} / {doneMsg.n}</p>
              <button type="button" className="mt-4 px-4 py-2 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}}
                onClick={() => { setDoneMsg(null); setMode(doneMsg.next); }}>{t("繼續 →", "Continue →")}</button>
            </section>
          )}
          {mode === "review" && (
            <section className={"bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 space-y-3"}>
              <h2 className="font-bold text-lg">{t("錯題簿", "Wrong-answer book")}</h2>
              {(progress.wrongBook || []).length === 0 && <p className={"text-sm text-slate-500"}>{t("暫無錯題", "No wrong answers yet")}</p>}
              {(progress.wrongBook || []).map(w => (
                <div key={w.id} className={"rounded-xl p-3 text-sm border border-slate-200"}>
                  <p className="font-semibold">{w.prompt}</p>
                  <p className="mt-1 opacity-80" style={{color: ACCENT}}>{w.hint}</p>
                  {HKC.isPaid() && <p className="mt-1 text-emerald-500">{t("已解鎖答案", "Answer unlocked")}</p>}
                  <button type="button" className={"text-xs underline mt-2 text-slate-500"} onClick={() => { HKC.removeWrong(APP_ID, w.id); refresh(); }}>{t("標記已掌握", "Mark resolved")}</button>
                </div>
              ))}
            </section>
          )}
          {pay && <UpgradeCTA reason={payReason} onClose={() => setPay(false)} onTrial={() => { HKC.startTrialLocal(); setPay(false); refresh(); }} />}
        </div>
      );
    }`;
}

function wireVanilla(filePath, depth, strings, applyUiBody) {
  let html = read(filePath);
  if (html.includes("NcsVanillaBridge.wireVanillaI18n")) {
    console.log("SKIP (already wired):", path.relative(ROOT, filePath));
    return;
  }
  html = ensureBridgeScript(html, depth);
  const block = `
  <script>
  (function () {
    var APP_STRINGS = ${JSON.stringify(strings, null, 4)};
    function applyUI() {
      var b = window.NcsVanillaBridge;
      var u = function (k) { return b.ui(k, APP_STRINGS); };
      var el;
      ${applyUiBody}
      document.title = u("pageTitle");
    }
    function bootI18n() {
      window.NcsVanillaBridge.wireVanillaI18n(APP_STRINGS, applyUI);
    }
    window.NcsVanillaBridge.whenNcsReady(bootI18n);
  })();
  </script>`;
  html = html.replace(/<\/body>/, block + "\n</body>");
  write(filePath, html);
}

// --- Physics Topics (vanilla) ---
wireVanilla(
  path.join(ROOT, "Secondary_School/Physics/Topics/02_Force_and_Motion/Bernoulli_Simulation/index.html"),
  5,
  {
    zh: {
      pageTitle: "伯努利原理：文丘里效應",
      title: "伯努利原理：",
      titleAccent: "文丘里效應",
      subtitle: "中二物理互動模擬",
      controls: "實驗控制",
      inletD: "入口直徑 ($D_1$)",
      throatD: "喉部直徑 ($D_2$)",
      throatHint: "必須小於入口",
      flowRate: "流量 ($Q$)",
      realtime: "即時數據",
      sec1: "第 1 段（寬）",
      sec2: "第 2 段（喉）",
      velocity: "流速 ($v$)",
      pressureHead: "壓力水頭 ($h$)",
      formulas: "重點公式",
      continuityNote: "連續性方程：面積 × 流速為常數。",
      bernoulliNote: "伯努利方程：流速增加，壓強下降。",
      simView: "模擬視圖",
      slowFluid: "慢流體",
      fastFluid: "快流體",
      manometer: "壓力計（壓強）",
      teacherObs: "教師觀察",
      teacherP1: "注意粒子速度與垂直管中水柱高度的關係。",
      teacherL1: "在寬段，水流較慢，但壓強較高（水柱較高）。",
      teacherL2: "在窄喉，水流加快（守恆質量流），但壓強下降（水柱較低）。",
      teacherP2: "這展示能量守恆：流體把壓強能換成動能。",
    },
    en: {
      pageTitle: "Bernoulli's Principle: Venturi Effect",
      title: "Bernoulli's Principle: ",
      titleAccent: "Venturi Effect",
      subtitle: "Interactive simulation for Secondary 2 Physics",
      controls: "Experiment Controls",
      inletD: "Inlet Diameter ($D_1$)",
      throatD: "Throat Diameter ($D_2$)",
      throatHint: "Must be smaller than Inlet",
      flowRate: "Flow Rate ($Q$)",
      realtime: "Real-time Data",
      sec1: "Section 1 (Wide)",
      sec2: "Section 2 (Throat)",
      velocity: "Velocity ($v$)",
      pressureHead: "Pressure Head ($h$)",
      formulas: "Key Formulas",
      continuityNote: "Continuity Equation: Area × Velocity is constant.",
      bernoulliNote: "Bernoulli's Equation: As speed increases, pressure decreases.",
      simView: "Simulation View",
      slowFluid: "Slow Fluid",
      fastFluid: "Fast Fluid",
      manometer: "Manometer (Pressure)",
      teacherObs: "Teacher's Observation",
      teacherP1: "Notice the relationship between the speed of the particles and the height of the water in the vertical tubes.",
      teacherL1: "In the wide section, the water moves slowly, but the pressure is high (tall water column).",
      teacherL2: "In the narrow throat, the water speeds up (to conserve mass flow), but the pressure drops (short water column).",
      teacherP2: "This demonstrates the Conservation of Energy: The fluid trades pressure energy for kinetic (motion) energy.",
    },
  },
  `
      el = document.querySelector("header h1");
      if (el) el.innerHTML = u("title") + '<span class="text-blue-600">' + u("titleAccent") + "</span>";
      el = document.querySelector("header p");
      if (el) el.textContent = u("subtitle");
      el = document.querySelector(".space-y-6 h2");
      if (el) el.lastChild.textContent = " " + u("controls");
      [["label", "inletD", 0], ["label", "throatD", 1], ["label", "flowRate", 2]].forEach(function (pair, i) {
        var labels = document.querySelectorAll(".space-y-6 label.text-sm.font-medium");
        if (labels[i]) labels[i].textContent = u(pair[1]);
      });
      el = document.querySelector("p.text-xs.text-slate-400.mt-1");
      if (el) el.textContent = u("throatHint");
      el = document.querySelector(".bg-slate-900 h2");
      if (el) el.textContent = u("realtime");
      var secs = document.querySelectorAll(".bg-slate-900 h3");
      if (secs[0]) secs[0].textContent = u("sec1");
      if (secs[1]) secs[1].textContent = u("sec2");
      document.querySelectorAll(".bg-slate-900 .text-xs.text-slate-400").forEach(function (sp, i) {
        if (i % 2 === 0) sp.textContent = u("velocity").replace("$v$", i === 0 ? "$v_1$" : "$v_2$");
        else sp.textContent = u("pressureHead").replace("$h$", i === 1 ? "$h_1$" : "$h_2$");
      });
      el = document.querySelector(".bg-blue-50 h3");
      if (el) el.textContent = u("formulas");
      var bluePs = document.querySelectorAll(".bg-blue-50 .text-xs.text-blue-600");
      if (bluePs[0]) bluePs[0].textContent = u("continuityNote");
      if (bluePs[1]) bluePs[1].textContent = u("bernoulliNote");
      el = document.querySelector("#simCanvas") && document.querySelector("#simCanvas").parentElement.querySelector(".absolute.top-4");
      if (el) el.textContent = u("simView");
      var legend = document.querySelectorAll(".bg-slate-50 span");
      if (legend[0]) legend[0].textContent = u("slowFluid");
      if (legend[1]) legend[1].textContent = u("fastFluid");
      if (legend[2]) legend[2].textContent = u("manometer");
      el = document.querySelector(".bg-amber-50 h3");
      if (el) el.lastChild.textContent = " " + u("teacherObs");
      var amber = document.querySelector(".bg-amber-50");
      if (amber) {
        var p = amber.querySelector("p.text-amber-900");
        if (p) p.textContent = u("teacherP1");
        var lis = amber.querySelectorAll("li");
        if (lis[0]) lis[0].innerHTML = u("teacherL1").replace("high", "<strong>high</strong>").replace("較高", "<strong>較高</strong>");
        if (lis[1]) lis[1].innerHTML = u("teacherL2").replace("drops", "<strong>drops</strong>").replace("下降", "<strong>下降</strong>");
        var p2 = amber.querySelector("p.text-sm");
        if (p2) p2.innerHTML = "<em>" + u("teacherP2").replace("Conservation of Energy", "<strong>Conservation of Energy</strong>").replace("能量守恆", "<strong>能量守恆</strong>") + "</em>";
      }
  `
);

console.log("\n--- React flagship patches (manual follow-up if script incomplete) ---");
