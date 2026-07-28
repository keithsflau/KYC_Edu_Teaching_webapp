// Shared lab-page template: TFZ LearnFromZero storyboard -> gated Lab sim -> Guided/Exam drills.
// Used by build-lab.js. Keeps subscribe-gate + parent-report integration identical across fleet.
"use strict";

function head(cfg) {
  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cfg.level} · ${cfg.nameEn} | ${cfg.nameZh}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link rel="stylesheet" href="../../../../common/subscribe-gate.css" />
  <script>
    window.HKC_SUBSCRIBE = {
      appId: "${cfg.appId}",
      appNameZh: "${cfg.nameZh}",
      appNameEn: "${cfg.nameEn}",
      level: "${cfg.level}",
      subject: "${cfg.subject}",
      freeDrillLimit: 8,
      wrongBookLimit: 10,
      contactEmail: "support@hksteamai.com",
      comingSoonHref: "../pricing/index.html#payment-links"
    };
  </script>
  <script src="../../../../common/subscribe-gate.js"></script>
  <script src="../../../../common/parent-report.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "IBM Plex Sans", system-ui, sans-serif; background: radial-gradient(ellipse 80% 50% at 10% -10%, ${cfg.accent}22, transparent 55%), #f8fafc; color: #0f172a; min-height: 100vh; }
    input[type="range"] { accent-color: ${cfg.accent}; }
    button, a { -webkit-tap-highlight-color: transparent; }
    canvas.sim { width: 100%; border-radius: 12px; display: block; }
  </style>
</head>
<body class="text-slate-800">
  <!-- SUBSCRIBE_GATE: Marketing owns tiers. Free core must work offline. -->
  <div id="root"></div>
  <script>
    window.SUBSCRIBE_CONFIG = {
      enabled: true,
      bannerText: "解鎖完整練習與家長進度 · 全年少於一次補習堂費",
      premiumFeatures: ["progress_sync", "parent_dashboard", "unlimited_mocks"]
    };
  </script>
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    const APP_ID = "${cfg.appConst}";
    const ACCENT = "${cfg.accent}";
`;
}

const HKC_WRAPPER = `
    const HKC = (function () {
      function progressView() {
        const p = (window.HkcSubscribe && HkcSubscribe.getProgress()) || { drillsCorrect: 0, modulesCompleted: [], wrongBook: [], drillsAttempted: 0 };
        return {
          bestScore: p.drillsCorrect || 0,
          sessions: (p.modulesCompleted || []).length,
          totalCorrect: p.drillsCorrect || 0,
          totalAttempted: p.drillsAttempted || 0,
          wrongBook: (p.wrongBook || []).map((w, i) => ({ id: String(i) + "-" + (w.at || ""), prompt: w.label || "", hint: w.topic || "", answer: null, at: w.at })),
          modeCleared: {}
        };
      }
      return {
        FREE_DAILY_CAP: 8,
        MARKETING_PATH: "../pricing/index.html#payment-links",
        isPaid: () => !!(window.HkcSubscribe && HkcSubscribe.features().canDrillUnlimited && !HkcSubscribe.isClassroom()),
        getEntitlement: () => (window.HkcSubscribe ? HkcSubscribe.getEntitlement() : { tier: "free" }),
        remainingFree: () => { if (!window.HkcSubscribe) return 8; const r = HkcSubscribe.remainingFree(); return r === Infinity ? Infinity : r; },
        freeCapReached: () => !(window.HkcSubscribe && HkcSubscribe.canContinueDrills()),
        recordDrillUse: () => {},
        loadProgress: progressView,
        saveProgress: () => progressView(),
        addWrong: (appId, item) => { if (window.HkcSubscribe) HkcSubscribe.recordDrill({ correct: false, label: (item.prompt || item.q || String(item.id) || "").toString().slice(0, 48), topic: (item.hint || "").toString().slice(0, 80), module: "practice" }); },
        recordOk: (appId, item) => { if (window.HkcSubscribe) HkcSubscribe.recordDrill({ correct: true, label: (item && (item.prompt || item.q || item.id) || "drill").toString().slice(0, 48), topic: "", module: "practice" }); },
        removeWrong: () => {},
        recordSession: (appId, score, total) => { if (window.HkcSubscribe) HkcSubscribe.recordModule({ id: "session-" + Date.now(), label: "Session", score, total }); },
        startTrialLocal: () => { if (window.HkcSubscribe) HkcSubscribe.setLocalEntitlement("trial", 14); }
      };
    })();
`;

const LEARN_FROM_ZERO = `
    function LearnFromZero({ steps, onComplete }) {
      const [i, setI] = useState(0);
      const [picked, setPicked] = useState(null);
      const step = steps[i];
      const last = i === steps.length - 1;
      function pick(opt) { if (picked) return; setPicked(opt); }
      function next() {
        if (last) { onComplete(); return; }
        setI(i + 1); setPicked(null);
      }
      return (
        <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black uppercase tracking-widest" style={{color: ACCENT}}>Learn From Zero · 由零開始學</p>
            <p className="text-xs text-slate-500">{step.id} / A{steps.length}</p>
          </div>
          <div className="flex gap-1.5 mb-4">
            {steps.map((s, k) => (
              <div key={s.id} className="h-1.5 flex-1 rounded-full" style={{background: k <= i ? ACCENT : "#e2e8f0"}} />
            ))}
          </div>
          <h2 className="text-xl font-bold">{step.title}</h2>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">{step.titleZh}</p>
          <p className="text-sm mt-3 text-slate-700 leading-relaxed">{step.body}</p>
          <p className="text-sm mt-2 text-slate-500 leading-relaxed">{step.bodyZh}</p>
          <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
            <p className="text-sm font-bold">{step.q}</p>
            <p className="text-xs text-slate-500 mb-2">{step.qZh}</p>
            <div className="grid gap-2">
              {step.opts.map(o => {
                let cls = "text-left px-3 py-2.5 rounded-xl text-sm border min-h-[44px] ";
                if (!picked) cls += "bg-white border-slate-200 hover:bg-slate-50";
                else if (o === step.a) cls += "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                else if (o === picked) cls += "bg-rose-50 border-rose-300 text-rose-800";
                else cls += "bg-white border-slate-200 opacity-60";
                return <button key={o} type="button" className={cls} onClick={() => pick(o)}>{o}</button>;
              })}
            </div>
            {picked && (
              <div className="mt-3 text-sm p-3 rounded-lg bg-white/70 border border-slate-200">
                <p className="font-semibold">{picked === step.a ? "✓ Correct · 正確" : "✗ Not quite — see why · 再想想"}</p>
                <p className="mt-1 text-slate-600">{step.why}</p>
                {picked === step.a && (
                  <button type="button" onClick={next} className="mt-3 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[44px]" style={{background: ACCENT}}>
                    {last ? "Unlock the Lab → 解鎖實驗室" : "Next step →"}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      );
    }
`;

const SHELL = `
    function UpgradeCTA({ reason, onClose, onTrial }) {
      return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl p-5 bg-white border border-slate-200">
            <h3 className="text-lg font-bold" style={{color: ACCENT}}>解鎖完整練習與家長進度</h3>
            <p className="text-sm mt-2 text-slate-600">{reason || window.SUBSCRIBE_CONFIG.bannerText}</p>
            <ul className="mt-3 text-sm space-y-1 list-disc list-inside text-slate-600">
              <li>Unlimited daily drills</li>
              <li>Full wrong-answer book</li>
              <li>Progress sync (coming)</li>
            </ul>
            <button type="button" onClick={onTrial} className="mt-4 w-full min-h-[48px] rounded-xl font-semibold text-white" style={{background: ACCENT}}>開始 14 日試用（本機）</button>
            <a href={HKC.MARKETING_PATH} className="mt-2 block w-full min-h-[44px] text-center leading-[44px] rounded-xl border border-slate-300 text-sm">了解家長計劃</a>
            <button type="button" onClick={onClose} className="mt-2 w-full text-sm underline text-slate-500">繼續免費</button>
          </div>
        </div>
      );
    }

    function Drill({ bank, label, onNeedUpgrade, onDone }) {
      const [qi, setQi] = useState(0);
      const [fb, setFb] = useState(null);
      const [score, setScore] = useState(0);
      const [hint, setHint] = useState(false);
      const [first, setFirst] = useState(true);
      const item = bank[qi];

      function pick(opt) {
        if (HKC.freeCapReached()) {
          if (window.HkcSubscribe) HkcSubscribe.showPaywall("hit_free_cap");
          onNeedUpgrade("今日免費練習已用完。");
          return;
        }
        HKC.recordDrillUse(APP_ID);
        const ok = opt === item.a;
        setFb(ok
          ? { ok: true, msg: "Correct · 正確" }
          : { ok: false, msg: "Not quite · 再想。Use Hint for the method (answer not shown)." });
        if (ok) {
          if (typeof HKC.recordOk === "function") HKC.recordOk(APP_ID, item);
          if (first) setScore(s => s + 1);
        } else {
          HKC.addWrong(APP_ID, { id: item.id, prompt: item.q, hint: item.hint, answer: item.a });
          setFirst(false);
        }
      }

      function next() {
        setFb(null); setHint(false); setFirst(true);
        if (qi + 1 >= bank.length) {
          HKC.recordSession(APP_ID, score, bank.length);
          onDone(score, bank.length);
        } else setQi(qi + 1);
      }

      return (
        <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5">
          <div className="flex justify-between text-sm mb-3 text-slate-500">
            <span>{label} · Q {qi + 1}/{bank.length} · Lv {item.level}</span>
            <span>Score {score}</span>
          </div>
          <h2 className="text-lg font-bold mb-1">{item.q}</h2>
          {item.qZh ? <p className="text-sm mb-4 opacity-80" style={{color: ACCENT}}>{item.qZh}</p> : <div className="mb-4" />}
          <div className="grid gap-2">
            {item.opts.map(o => (
              <button key={o} type="button" disabled={fb && fb.ok} onClick={() => pick(o)}
                className="text-left px-4 py-3 rounded-xl min-h-[48px] disabled:opacity-50 bg-slate-50 hover:bg-slate-100 border border-slate-200">{o}</button>
            ))}
          </div>
          <button type="button" className="text-sm mt-3 font-semibold min-h-[44px]" style={{color: ACCENT}} onClick={() => setHint(true)}>Hint · 提示</button>
          {hint && <p className="text-sm mt-1 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">{item.hint}</p>}
          {fb && (
            <div className={"mt-4 p-3 rounded-xl text-sm " + (fb.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800")}>
              {fb.msg}
              {fb.ok && <button type="button" className="block mt-2 underline font-semibold" onClick={next}>Next →</button>}
              {!fb.ok && <button type="button" className="block mt-2 underline font-semibold" onClick={() => setFb(null)}>Retry</button>}
            </div>
          )}
        </section>
      );
    }
`;

function appShell(cfg) {
  return `
    function App() {
      const [mode, setMode] = useState("learn");
      const [progress, setProgress] = useState(() => HKC.loadProgress(APP_ID));
      const [pay, setPay] = useState(false);
      const [payReason, setPayReason] = useState("");
      const [doneMsg, setDoneMsg] = useState(null);
      const [tfzDone, setTfzDone] = useState(() => { try { return !!localStorage.getItem("hkc_tfz_" + APP_ID); } catch (e) { return false; } });

      function refresh() { setProgress(HKC.loadProgress(APP_ID)); }
      useEffect(() => { refresh(); }, [mode]);
      function completeTfz() {
        try { localStorage.setItem("hkc_tfz_" + APP_ID, "1"); } catch (e) {}
        setTfzDone(true); setMode("lab");
      }

      const tabs = [
        { id: "learn", label: "Learn · 學習" },
        { id: "lab", label: tfzDone ? "Lab · 實驗" : "Lab 🔒" },
        { id: "guided", label: "Guided · 引導" },
        { id: "exam", label: "Exam · 測驗" },
        { id: "review", label: "Review · 錯題" }
      ];

      return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <a href="../../index.html" className="text-sm hover:underline font-semibold" style={{color: ACCENT}}>← Hub</a>
          <header className="mt-4 mb-4">
            <p className="text-xs uppercase tracking-widest font-bold" style={{color: ACCENT}}>${cfg.subjectLine}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">${cfg.nameEn}</h1>
            <p className="text-slate-500 mt-1">${cfg.nameZh} · Learn (A1–A8) → Lab → Guided → Exam → Review</p>
          </header>

          <div className="text-sm border border-dashed rounded-lg px-3 py-2 mb-3 flex flex-wrap justify-between gap-2 items-center border-slate-300 bg-white/80">
            <span>{HKC.isPaid() ? (HKC.getEntitlement().tier + " · unlimited") : ("Free · " + HKC.remainingFree() + "/" + HKC.FREE_DAILY_CAP + " today")} · Best {progress.bestScore}</span>
            {!HKC.isPaid() && (
              <button type="button" className="px-3 py-1.5 rounded-md text-xs font-semibold text-white min-h-[36px]" style={{background: ACCENT}} onClick={() => setPay(true)}>Upgrade</button>
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

          {mode === "learn" && <LearnFromZero steps={TFZ_STEPS} onComplete={completeTfz} />}

          {mode === "lab" && !tfzDone && (
            <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center">
              <h2 className="text-xl font-bold">Finish Learn From Zero first · 先完成 A1–A8</h2>
              <p className="text-sm text-slate-500 mt-2">We teach the model before you play — that is how real understanding sticks. 先學模型,後做實驗。</p>
              <button type="button" className="mt-4 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[48px]" style={{background: ACCENT}} onClick={() => setMode("learn")}>Go to Learn →</button>
            </section>
          )}
          {mode === "lab" && tfzDone && (
            <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5">
              <h2 className="font-bold text-lg mb-3">${cfg.labTitle}</h2>
              <${cfg.simName} />
            </section>
          )}

          {mode === "guided" && !doneMsg && (
            <Drill bank={GUIDED} label="Guided" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
              onDone={(s, n) => { setDoneMsg({ s, n, next: "exam" }); refresh(); }} />
          )}
          {mode === "exam" && !doneMsg && (
            <Drill bank={EXAM} label="Exam" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
              onDone={(s, n) => { setDoneMsg({ s, n, next: "review" }); refresh(); }} />
          )}
          {doneMsg && (mode === "guided" || mode === "exam") && (
            <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center">
              <h2 className="text-2xl font-bold">Complete</h2>
              <p className="mt-2">{doneMsg.s} / {doneMsg.n}</p>
              <button type="button" className="mt-4 px-4 py-2 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}}
                onClick={() => { setDoneMsg(null); setMode(doneMsg.next); }}>Continue →</button>
            </section>
          )}
          {mode === "review" && (
            <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 space-y-3">
              <h2 className="font-bold text-lg">Wrong-answer book · 錯題簿</h2>
              {(progress.wrongBook || []).length === 0 && <p className="text-sm text-slate-500">No wrong answers yet · 暫無錯題</p>}
              {(progress.wrongBook || []).map(w => (
                <div key={w.id} className="rounded-xl p-3 text-sm border border-slate-200">
                  <p className="font-semibold">{w.prompt}</p>
                  <p className="mt-1 opacity-80" style={{color: ACCENT}}>{w.hint}</p>
                  {HKC.isPaid() && <p className="mt-1 text-emerald-500">Answer unlocked</p>}
                  <button type="button" className="text-xs underline mt-2 text-slate-500" onClick={() => { HKC.removeWrong(APP_ID, w.id); refresh(); }}>Mark resolved</button>
                </div>
              ))}
            </section>
          )}
          {pay && <UpgradeCTA reason={payReason} onClose={() => setPay(false)} onTrial={() => { HKC.startTrialLocal(); setPay(false); refresh(); }} />}
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
`;
}

function buildLab(cfg) {
  return head(cfg) + HKC_WRAPPER + "\n    const TFZ_STEPS = " + cfg.tfz + "\n" + LEARN_FROM_ZERO +
    "\n" + cfg.sim + "\n\n    const GUIDED = " + cfg.guided + "\n    const EXAM = " + cfg.exam + "\n" +
    SHELL + appShell(cfg);
}

module.exports = { buildLab };
