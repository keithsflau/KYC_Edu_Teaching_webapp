/**
 * Enrich Chemistry F4–6 flagships from Sample/lab patterns + launch-pack canonical copy.
 * Fixes UTF-8 corruption (???), restores Kc (was Hess stub), adds challenge panels.
 * Usage: node "HK Cirriculum/_tools/enrich-chem-flagships.js"
 */
const fs = require("fs");
const path = require("path");

const CURR = path.join(__dirname, "..");
const FOOTER =
  '<footer style="text-align:center;padding:1rem;font-size:0.8rem;opacity:0.7;">@HKSTEAMAI All Copy-Right Reserved.</footer>';

function ncsShell(meta, appJs) {
  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.titleEn} | ${meta.titleZh}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="../../../../common/babel-react-classic.js"></script>
  <link rel="stylesheet" href="../../../../common/subscribe-gate.css" />
  <link rel="stylesheet" href="../../../../_shared/ncs-i18n.css" />
  <script src="../../../../_shared/ncs-i18n.js"></script>
  <script>
    window.HKC_SUBSCRIBE = {
      appId: "${meta.appId}",
      appNameZh: "${meta.titleZh}",
      appNameEn: "${meta.titleEn}",
      level: "${meta.level}",
      subject: "Chemistry",
      freeDrillLimit: 12,
      wrongBookLimit: 10,
      contactEmail: "support@hksteamai.com",
      comingSoonHref: "../../../../pricing/index.html#payment-links"
    };
    window.__HKC_FREE_CAP = () => !(window.HkcSubscribe && HkcSubscribe.canContinueDrills());
  </script>
  <script src="../../../../common/subscribe-gate.js"></script>
  <script src="../../../../common/parent-report.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500&family=Fredoka:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    :root { --accent: ${meta.accent}; }
    body {
      font-family: "IBM Plex Sans", "Fredoka", system-ui, sans-serif;
      background:
        radial-gradient(ellipse 70% 45% at 8% -5%, ${meta.accent}28, transparent 55%),
        radial-gradient(ellipse 50% 40% at 100% 0%, #64748b14, transparent 50%),
        #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
    }
    input[type="range"] { accent-color: ${meta.accent}; width: 100%; }
    .mono { font-family: "JetBrains Mono", ui-monospace, monospace; }
    canvas { touch-action: none; display: block; width: 100%; height: auto; }
    button, a { -webkit-tap-highlight-color: transparent; }
  </style>
  <style data-ncs-kit="fleet-bridge">
    body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet,
    body.ncs-fleet-mounted .ncs-lang-btn:not(.ncs-lang-switcher *) {
      display: none !important;
    }
  </style>
  <script data-ncs-kit="fleet-init">
  (function () {
    function hideLegacyToggles() {
      document.body.classList.add("ncs-fleet-mounted");
      document.querySelectorAll("header button[type=\\"button\\"]").forEach(function (btn) {
        var label = (btn.textContent || "").trim();
        if (label === "EN" || label === "\\u4E2D") {
          btn.classList.add("ncs-hide-when-ncs-fleet");
        }
      });
      document.querySelectorAll(".fixed.top-4.right-4.z-50").forEach(function (el) {
        el.classList.add("ncs-hide-when-ncs-fleet");
      });
    }
    function boot() {
      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;
      window.NcsI18n.init({
        chromePath: "../../../../_shared/ncs-chrome.json",
        target: document.body
      }).then(hideLegacyToggles);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  })();
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react-classic">
    const { useState, useEffect, useRef, useMemo } = React;
    const { useLang, LangSwitcher, appTabs } = window.NcsI18n;
    const ACCENT = "${meta.accent}";
    const APP_ID = "${meta.appId}";

${appJs}

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
  ${FOOTER}
</body>
</html>`;
}

const sharedUi = `
    function LearnFromZero({ onComplete }) {
      const [step, setStep] = useState(0);
      const [sub, setSub] = useState(0);
      const s = LEARN_STEPS[step];
      return (
        <section className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md text-white" style={{ background: ACCENT }}>Teach from zero · 第 {step + 1}/{LEARN_STEPS.length} 步</span>
            <div className="flex gap-1.5 flex-wrap ml-auto">
              {LEARN_STEPS.map((_, i) => (
                <span key={i} className={"w-2.5 h-2.5 rounded-full " + (i <= step ? "shadow-sm" : "bg-slate-200")} style={i <= step ? { background: ACCENT } : {}} />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{s.titleZh}</h2>
          <p className="text-sm text-slate-500 font-bold mb-2">{s.titleEn}</p>
          <p className="text-base leading-relaxed text-slate-700 font-medium">{s.bodyZh}</p>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{s.bodyEn}</p>
          <div>{s.render({ sub, setSub })}</div>
          <div className="flex flex-wrap gap-2 pt-4">
            {step > 0 && <button type="button" className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 min-h-[52px] font-bold" onClick={() => { setStep(step - 1); setSub(0); }}>← 上一步</button>}
            {step < LEARN_STEPS.length - 1 ? (
              <button type="button" className="px-5 py-3 rounded-xl font-bold text-white min-h-[52px] ml-auto" style={{ background: ACCENT }} onClick={() => { setStep(step + 1); setSub(0); }}>下一步 →</button>
            ) : (
              <button type="button" className="px-5 py-3 rounded-xl font-bold text-white min-h-[52px] ml-auto" style={{ background: ACCENT }} onClick={onComplete}>完成 Learn · 開始 Guided →</button>
            )}
          </div>
        </section>
      );
    }

    function UpgradeCTA({ reason, onClose, onTrial }) {
      return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl p-5 bg-white border border-slate-200">
            <h3 className="text-lg font-bold" style={{color: ACCENT}}>解鎖完整練習與家長進度</h3>
            <p className="text-sm mt-2 text-slate-600">{reason || "Upgrade required"}</p>
            <button type="button" onClick={onTrial} className="mt-4 w-full min-h-[48px] rounded-xl font-semibold text-white" style={{background: ACCENT}}>開始 14 日試用（本機）</button>
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
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { onNeedUpgrade("今日免費練習已用完。"); return; }
        const ok = opt === item.a;
        setFb(ok ? { ok: true, msg: "Correct · 正確" } : { ok: false, msg: "Not quite · 再想。Use Hint." });
        if (ok && first) setScore(s => s + 1);
        else if (!ok) setFirst(false);
      }
      function next() {
        setFb(null); setHint(false); setFirst(true);
        if (qi + 1 >= bank.length) onDone(score, bank.length);
        else setQi(qi + 1);
      }
      return (
        <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5">
          <div className="flex justify-between text-sm mb-3 text-slate-500">
            <span>{label} · Q {qi + 1}/{bank.length}</span>
            <span>Score {score}</span>
          </div>
          <h2 className="text-lg font-bold mb-1">{item?.q}</h2>
          {item?.qZh && <p className="text-sm mb-3 opacity-80" style={{color: ACCENT}}>{item.qZh}</p>}
          <div className="grid gap-2">
            {(item?.opts || []).map(o => (
              <button key={o} type="button" disabled={fb && fb.ok} onClick={() => pick(o)}
                className="text-left px-4 py-3 rounded-xl min-h-[48px] disabled:opacity-50 bg-slate-50 hover:bg-slate-100 border border-slate-200">{o}</button>
            ))}
          </div>
          <button type="button" className="text-sm mt-3 font-semibold min-h-[44px]" style={{color: ACCENT}} onClick={() => setHint(true)}>Hint · 提示</button>
          {hint && <p className="text-sm mt-1 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">{item?.hint}</p>}
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

    function AppShell({ hubLabel, hubEn, titleZh, titleEn, subtitle, children }) {
      const { isZh, t } = useLang();
      const [mode, setMode] = useState("learn");
      const [pay, setPay] = useState(false);
      const [payReason, setPayReason] = useState("");
      const [doneMsg, setDoneMsg] = useState(null);
      const tabs = appTabs(["learn", "guided", "exam"], isZh);
      return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <a href="../index.html" className="text-sm hover:underline font-semibold" style={{color: ACCENT}}>{t(hubLabel, hubEn)}</a>
            <LangSwitcher />
          </div>
          <header className="mt-4 mb-4">
            <p className="text-xs uppercase tracking-widest font-bold" style={{color: ACCENT}}>{subtitle}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">{t(titleZh, titleEn)}</h1>
            <p className="text-slate-500 mt-1">{t("Learn · Guided · Exam", "Learn · Guided · Exam")}</p>
          </header>
          <nav className="flex flex-wrap gap-2 mb-4">
            {tabs.map(tab => (
              <button key={tab.id} type="button" onClick={() => { setMode(tab.id); setDoneMsg(null); }}
                className={"px-3.5 py-2 rounded-lg text-sm font-semibold min-h-[44px] " + (mode === tab.id ? "text-white" : "bg-white border border-slate-200 text-slate-700")}
                style={mode === tab.id ? {background: ACCENT} : {}}>{tab.label}</button>
            ))}
          </nav>
          {children(mode, doneMsg, setDoneMsg, setMode, setPayReason, setPay)}
          {pay && <UpgradeCTA reason={payReason} onClose={() => setPay(false)} onTrial={() => setPay(false)} />}
        </div>
      );
    }
`;

const kcApp = `
    const LEARN_STEPS = [
      { id: "A1", titleZh: "動態平衡是什麼？", titleEn: "What is dynamic equilibrium?",
        bodyZh: "可逆反應中，正向同逆向速率相等，宏觀濃度保持不變（微觀仍在反應）。",
        bodyEn: "Forward rate = reverse rate; macroscopic concentrations stay constant.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-teal-50 rounded-xl text-center">
            {sub === 0 ? <button type="button" className="px-4 py-2 bg-teal-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>顯示平衡</button>
              : <div className="text-teal-900 font-bold">r_fwd = r_rev · 濃度不變</div>}
          </div>
        ) },
      { id: "A2", titleZh: "平衡常數 Kc 表達式", titleEn: "Kc expression",
        bodyZh: "對 aA + bB ⇌ cC + dD：Kc = [C]^c[D]^d / ([A]^a[B]^b)。純液體/固體唔計入。",
        bodyEn: "For aA + bB ⇌ cC + dD: Kc = products/reactants with coefficients as powers.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-violet-50 rounded-xl text-center mono text-sm">
            <p>Kc = [HI]² / ([H₂][I₂])</p>
            <button type="button" className="mt-2 px-4 py-2 bg-violet-200 rounded-lg font-bold" onClick={() => setSub(1)}>例：H₂ + I₂ ⇌ 2HI</button>
            {sub > 0 && <div className="mt-2 font-bold text-violet-900">只計氣體/水溶液濃度</div>}
          </div>
        ) },
      { id: "A3", titleZh: "反應商 Q", titleEn: "Reaction quotient Q",
        bodyZh: "Q 用「當前」濃度代入 Kc 表達式；K 只隨溫度變。",
        bodyEn: "Q uses current concentrations; K changes only with T.",
        render: ({ sub, setSub }) => (
          <button type="button" className="px-4 py-2 bg-amber-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>計算 Q</button>
        ) },
      { id: "A4", titleZh: "比較 Q 與 K", titleEn: "Compare Q and K",
        bodyZh: "Q < K → 淨正向；Q > K → 淨逆向；Q = K → 已達平衡。",
        bodyEn: "Q < K net forward; Q > K net reverse; Q = K at equilibrium.",
        render: ({ sub, setSub }) => (
          <div className="flex gap-2 justify-center flex-wrap">
            <button type="button" className="px-3 py-2 bg-emerald-100 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>Q &lt; K</button>
            <button type="button" className="px-3 py-2 bg-rose-100 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(2)}>Q &gt; K</button>
            {sub === 1 && <p className="w-full text-center font-bold text-emerald-800">→ 產物增加</p>}
            {sub === 2 && <p className="w-full text-center font-bold text-rose-800">→ 反應物增加</p>}
          </div>
        ) },
      { id: "A5", titleZh: "ICE 表", titleEn: "ICE table setup",
        bodyZh: "Initial → Change → Equilibrium：用 x 表示消耗/生成量。",
        bodyEn: "Initial, Change, Equilibrium — solve for x at equilibrium.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-blue-50 rounded-xl text-center text-sm">
            <table className="mx-auto border-collapse"><tbody>
              <tr><td className="border px-2 py-1">I</td><td className="border px-2 py-1">1.0</td><td className="border px-2 py-1">1.0</td><td className="border px-2 py-1">0</td></tr>
              <tr><td className="border px-2 py-1">C</td><td className="border px-2 py-1">−x</td><td className="border px-2 py-1">−x</td><td className="border px-2 py-1">+2x</td></tr>
              <tr><td className="border px-2 py-1">E</td><td className="border px-2 py-1">1−x</td><td className="border px-2 py-1">1−x</td><td className="border px-2 py-1">2x</td></tr>
            </tbody></table>
            <button type="button" className="mt-2 px-4 py-2 bg-blue-200 rounded-lg font-bold" onClick={() => setSub(1)}>H₂ + I₂ ⇌ 2HI</button>
          </div>
        ) },
      { id: "A6", titleZh: "互動實驗室：Kc 平衡", titleEn: "Equilibrium Kc Lab",
        bodyZh: "調整 H₂、I₂、HI 濃度，即時見 Q vs K 同淨反應方向。",
        bodyEn: "Change concentrations — watch Q vs K and net direction.",
        render: () => <KcLab /> },
      { id: "A7", titleZh: "迷思修正", titleEn: "Misconception",
        bodyZh: "❌ 加入反應物會改變 K · ✅ 只改變 Q，平衡移動直至 Q = K。",
        bodyEn: "Adding reactant changes Q, not K; system shifts until Q = K.",
        render: () => (
          <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-4 text-sm">
            <p className="font-bold">K 只隨溫度變</p>
            <p className="mt-1">濃度/壓力改變 → Q 變 → 平衡移動</p>
          </div>
        ) },
      { id: "A8", titleZh: "DSE 檢核", titleEn: "Exam checkpoint",
        bodyZh: "某時刻 Q = 0.25，K = 50，淨反應方向？",
        bodyEn: "Q = 0.25, K = 50 — net direction?",
        render: ({ sub, setSub }) => (
          <div className="text-center space-y-2">
            <button type="button" className="px-4 py-2 bg-indigo-200 rounded-lg font-bold mx-1 min-h-[44px]" onClick={() => alert("錯！Q < K")}>逆向</button>
            <button type="button" className="px-4 py-2 bg-indigo-200 rounded-lg font-bold mx-1 min-h-[44px]" onClick={() => setSub(1)}>正向</button>
            {sub > 0 && <div className="font-bold text-indigo-900">正確！Q &lt; K → net forward</div>}
          </div>
        ) }
    ];

    const GUIDED = [
      { id: "g1", q: "At equilibrium…", qZh: "達平衡時…", a: "forward rate equals reverse rate",
        opts: ["all concentrations are zero", "forward rate equals reverse rate", "Q is always zero", "K changes every second"], hint: "Dynamic, not static." },
      { id: "g2", q: "If Q < K, the net reaction…", qZh: "Q < K 時淨反應…", a: "proceeds forward (more products)",
        opts: ["proceeds forward (more products)", "proceeds reverse only", "stops completely", "changes K instantly"], hint: "Compare Q and K." },
      { id: "g3", q: "Pure solids in Kc expressions…", qZh: "Kc 表達式中純固體…", a: "are omitted (activity ≈ 1)",
        opts: ["have [ ] = 0 always", "are omitted (activity ≈ 1)", "must be squared", "double K"], hint: "Only aqueous/gas." }
    ];

    const EXAM = [
      { id: "e1", q: "For H₂ + I₂ ⇌ 2HI, Kc uses…", qZh: "H₂+I₂⇌2HI 的 Kc…", a: "[HI]²/([H₂][I₂])",
        opts: ["[H₂][I₂]/[HI]", "[HI]²/([H₂][I₂])", "[HI]/[H₂]", "Kc = Q always"], hint: "Products over reactants." },
      { id: "e2", q: "Q > K means…", qZh: "Q > K 表示…", a: "net reverse reaction",
        opts: ["already at equilibrium", "net reverse reaction", "net forward only", "K becomes infinite"], hint: "Too many products." },
      { id: "e3", q: "Raising T for endothermic forward…", qZh: "吸熱正向升溫…", a: "increases K",
        opts: ["decreases K always", "increases K", "K unchanged always", "Q equals zero"], hint: "Van't Hoff link." }
    ];

    function KcLab() {
      const canvasRef = useRef(null);
      const K = 50;
      const [h2, setH2] = useState(1.0);
      const [i2, setI2] = useState(1.0);
      const [hi, setHi] = useState(0.2);
      const [msg, setMsg] = useState("");
      const [challenge, setChallenge] = useState(null);
      const Q = useMemo(() => (hi * hi) / Math.max(h2 * i2, 1e-6), [h2, i2, hi]);
      const shift = Q < K * 0.92 ? "Q < K → net forward → more HI" : Q > K * 1.08 ? "Q > K → net reverse → more H₂, I₂" : "Q ≈ K · at equilibrium";

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, W, H);
        const maxC = 2;
        const bar = (x, val, colour, label) => {
          const h = (val / maxC) * (H - 120);
          ctx.fillStyle = colour;
          ctx.fillRect(x, H - 60 - h, 50, h);
          ctx.strokeStyle = "#64748b";
          ctx.strokeRect(x, H - 60 - h, 50, h);
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "11px IBM Plex Sans";
          ctx.fillText(label, x, H - 40);
          ctx.font = "10px JetBrains Mono";
          ctx.fillText(val.toFixed(2), x, H - 24);
        };
        bar(80, h2, "#3b82f6", "H₂");
        bar(200, i2, "#f59e0b", "I₂");
        bar(320, hi, "#22c55e", "HI");
        ctx.fillStyle = "#94a3b8";
        ctx.font "12px IBM Plex Sans";
        ctx.fillText("H₂ + I₂ ⇌ 2HI", W / 2 - 50, 36);
        ctx.fillStyle = Q < K ? "#34d399" : Q > K ? "#f87171" : "#a78bfa";
        ctx.font = "bold 14px IBM Plex Sans";
        ctx.fillText(shift, 40, H - 8);
      }, [h2, i2, hi, Q, shift]);

      const startCh = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("今日免費練習已用完。"); return; }
        setChallenge({ text: "Make Q < K (add H₂ or I₂, lower HI).", check: () => Q < K * 0.92 });
        setMsg("Adjust sliders, then Check.");
      };
      const checkCh = () => {
        if (!challenge) return;
        if (challenge.check()) { setMsg("✓ Q < K → forward shift toward HI."); setChallenge(null); }
        else setMsg("Try lowering HI or raising H₂/I₂.");
      };

      return (
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border"><canvas ref={canvasRef} width={640} height={320} aria-label="Concentration bar chart" /></div>
          <div className="lg:col-span-2 space-y-3">
            <section className="bg-white rounded-2xl border p-4">
              <label className="text-xs font-semibold">[H₂] = {h2.toFixed(2)} mol dm⁻³</label>
              <input type="range" min="0.1" max="2" step="0.05" value={h2} onChange={e => setH2(+e.target.value)} />
              <label className="text-xs font-semibold mt-2 block">[I₂] = {i2.toFixed(2)} mol dm⁻³</label>
              <input type="range" min="0.1" max="2" step="0.05" value={i2} onChange={e => setI2(+e.target.value)} />
              <label className="text-xs font-semibold mt-2 block">[HI] = {hi.toFixed(2)} mol dm⁻³</label>
              <input type="range" min="0" max="2" step="0.05" value={hi} onChange={e => setHi(+e.target.value)} />
            </section>
            <section className="bg-slate-900 text-teal-50 rounded-2xl p-4 mono text-sm">
              <div>Q = {Q.toFixed(3)} · K = {K}</div>
              <div className="mt-2 font-bold">{shift}</div>
            </section>
            <section className="bg-white rounded-2xl border p-4 text-sm">
              <p className="mb-2">{challenge ? challenge.text : "挑戰：令 Q &lt; K"}</p>
              <div className="flex gap-2">
                <button type="button" className="px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={startCh}>New challenge</button>
                {challenge && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold min-h-[44px]" onClick={checkCh}>Check</button>}
              </div>
              {msg && <p className="text-xs mt-2 text-slate-600">{msg}</p>}
            </section>
          </div>
        </div>
      );
    }

    function App() {
      return (
        <AppShell hubLabel="← F5 化學主頁" hubEn="← F5 Chemistry Hub" titleZh="平衡常數 Kc 實驗室" titleEn="Equilibrium Kc Lab"
          subtitle="F5 Chemistry · Chemical Equilibrium Kc">
          {(mode, doneMsg, setDoneMsg, setMode, setPayReason, setPay) => (
            <>
              {mode === "learn" && <LearnFromZero onComplete={() => setMode("guided")} />}
              {mode === "guided" && !doneMsg && (
                <Drill bank={GUIDED} label="Guided" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
                  onDone={(s, n) => setDoneMsg({ s, n, next: "exam" })} />
              )}
              {mode === "exam" && !doneMsg && (
                <Drill bank={EXAM} label="Exam" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
                  onDone={(s, n) => setDoneMsg({ s, n, next: "learn" })} />
              )}
              {doneMsg && (mode === "guided" || mode === "exam") && (
                <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center">
                  <h2 className="text-2xl font-bold">Complete</h2>
                  <p className="mt-2">{doneMsg.s} / {doneMsg.n}</p>
                  <button type="button" className="mt-4 px-4 py-2 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}}
                    onClick={() => { setDoneMsg(null); setMode(doneMsg.next); }}>Continue →</button>
                </section>
              )}
            </>
          )}
        </AppShell>
      );
    }
`;

const kcAppFixed = kcApp.replace('ctx.font "12px', 'ctx.font = "12px');

const leChatelierApp = `
    const LEARN_STEPS = [
      { id: "A1", titleZh: "動態平衡是什麼？", titleEn: "What is dynamic equilibrium?",
        bodyZh: "正向同逆向反應速率相等，宏觀濃度保持不變（但微觀仍在反應）。",
        bodyEn: "Forward rate = reverse rate; macroscopic concentrations stay constant.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-cyan-50 rounded-xl text-center">
            {sub === 0 ? <button type="button" className="px-4 py-2 bg-cyan-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>顯示平衡</button>
              : <div className="text-cyan-900 font-bold">r_fwd = r_rev · 濃度不變</div>}
          </div>
        ) },
      { id: "A2", titleZh: "勒夏特列原理", titleEn: "Le Chatelier's principle",
        bodyZh: "改變條件時，系統會向抵消該改變嘅方向移動。",
        bodyEn: "System shifts to counteract the imposed change.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-amber-50 rounded-xl text-center space-y-2">
            <button type="button" className="px-4 py-2 bg-amber-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>加入更多反應物</button>
            {sub > 0 && <div className="text-amber-900 font-bold">→ 平衡向產物移動</div>}
          </div>
        ) },
      { id: "A3", titleZh: "濃度改變", titleEn: "Concentration stress",
        bodyZh: "增加反應物 → 正向；增加產物 → 逆向。",
        bodyEn: "Add reactant → forward; add product → reverse.",
        render: ({ sub, setSub }) => (
          <div className="flex gap-2 justify-center flex-wrap">
            <button type="button" className="px-3 py-2 bg-emerald-100 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>+ 反應物</button>
            <button type="button" className="px-3 py-2 bg-rose-100 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(2)}>+ 產物</button>
            {sub === 1 && <p className="w-full text-emerald-800 font-bold text-center">Shift → products</p>}
            {sub === 2 && <p className="w-full text-rose-800 font-bold text-center">Shift → reactants</p>}
          </div>
        ) },
      { id: "A4", titleZh: "壓力（氣體）", titleEn: "Pressure (gases)",
        bodyZh: "增壓 → 向氣體摩爾數較少嘅一邊移動。N₂+3H₂⇌2NH₃：增壓利於 NH₃。",
        bodyEn: "Higher P favours fewer gas moles — more NH₃ for Haber.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <button type="button" className="px-4 py-2 bg-blue-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>↑ 壓力</button>
            {sub > 0 && <div className="mt-2 text-blue-900 font-bold">4 mol → 2 mol · 更多 NH₃</div>}
          </div>
        ) },
      { id: "A5", titleZh: "溫度", titleEn: "Temperature",
        bodyZh: "放熱正向：升溫 → K 減小 → 平衡左移。",
        bodyEn: "Exothermic forward: raising T lowers K and favours reverse.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-orange-50 rounded-xl text-center">
            <button type="button" className="px-4 py-2 bg-orange-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>↑ 溫度（放熱正向）</button>
            {sub > 0 && <div className="mt-2 text-orange-900 font-bold">平衡左移 · 產率下降</div>}
          </div>
        ) },
      { id: "A6", titleZh: "互動實驗室：勒夏特列平衡室", titleEn: "Le Chatelier Chamber Lab",
        bodyZh: "拖動 T、P，加入 NH₃，觀察 Q vs K 同平衡移動。",
        bodyEn: "Stress T, P, amounts — watch Q vs K and the shift.",
        render: () => <ChamberLab /> },
      { id: "A7", titleZh: "催化劑迷思", titleEn: "Catalyst misconception",
        bodyZh: "❌ 催化劑改變 K · ✅ 催化劑只加快達到平衡，唔改變平衡位置。",
        bodyEn: "Catalyst speeds approach; K and position unchanged.",
        render: () => (
          <div className="rounded-xl border-2 border-violet-200 bg-violet-50 p-4 text-sm space-y-2">
            <p className="font-bold">記住：催化劑 ≠ 移動平衡</p>
            <p>只縮短達到平衡時間。</p>
          </div>
        ) },
      { id: "A8", titleZh: "DSE 檢核", titleEn: "Exam checkpoint",
        bodyZh: "Q > K 時，淨反應方向係？",
        bodyEn: "When Q > K, net reaction goes…?",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-indigo-50 rounded-xl text-center space-y-2">
            <button type="button" className="px-4 py-2 bg-indigo-200 rounded-lg font-bold mx-1 min-h-[44px]" onClick={() => alert("錯！")}>正向</button>
            <button type="button" className="px-4 py-2 bg-indigo-200 rounded-lg font-bold mx-1 min-h-[44px]" onClick={() => setSub(1)}>逆向</button>
            {sub > 0 && <div className="text-indigo-900 font-bold">正確！Q > K → net reverse</div>}
          </div>
        ) }
    ];

    const GUIDED = [
      { id: "g1", q: "At equilibrium, concentrations…", qZh: "平衡時濃度…", a: "are constant (not necessarily equal)",
        opts: ["all become zero", "are constant (not necessarily equal)", "only reactants exist", "change wildly forever"], hint: "Steady." },
      { id: "g2", q: "Adding a reactant typically shifts…", qZh: "加入反應物通常移向…", a: "toward products",
        opts: ["toward reactants only", "toward products", "nowhere ever", "to absolute zero"], hint: "Counteract." },
      { id: "g3", q: "Catalyst effect on K…", qZh: "催化劑對 K…", a: "none (K unchanged)",
        opts: ["K doubles always", "none (K unchanged)", "K becomes zero", "K becomes infinite"], hint: "Speed only." }
    ];

    const EXAM = [
      { id: "e1", q: "Haber: high P favours NH₃ because…", qZh: "哈柏高壓因…", a: "fewer gas moles on product side",
        opts: ["more moles on product side", "fewer gas moles on product side", "catalyst changes K", "N₂ disappears"], hint: "Industrial." },
      { id: "e2", q: "Raising T for exothermic forward…", qZh: "放熱正向升溫…", a: "decreases K / favours reverse",
        opts: ["increases K always", "decreases K / favours reverse", "stops all rates", "removes catalyst need"], hint: "ΔH link." },
      { id: "e3", q: "Q > K means…", qZh: "Q>K 表示…", a: "net reverse to restore equilibrium",
        opts: ["already at equilibrium", "net reverse to restore equilibrium", "net forward only", "K changes instantly to Q"], hint: "Reaction quotient." }
    ];

    function ChamberLab() {
      const canvasRef = useRef(null);
      const [N2, setN2] = useState(20);
      const [H2, setH2] = useState(60);
      const [NH3, setNH3] = useState(20);
      const [T, setT] = useState(500);
      const [P, setP] = useState(200);
      const [cat, setCat] = useState(false);
      const [msg, setMsg] = useState("");
      const K = useMemo(() => Math.exp(12 - T / 80) * Math.pow(P / 100, 0.3), [T, P]);
      const Q = useMemo(() => {
        const tot = N2 + H2 + NH3 || 1;
        const xN = N2 / tot, xH = H2 / tot, xA = NH3 / tot;
        return (Math.pow(xA, 2)) / (xN * Math.pow(xH, 3) + 1e-9);
      }, [N2, H2, NH3]);
      const shift = Q < K * 0.85 ? "forward → NH₃" : Q > K * 1.15 ? "backward → N₂+H₂" : "≈ equilibrium";

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        let raf, parts = [];
        const rebuild = () => {
          parts = [];
          const add = (n, colour, r) => {
            for (let i = 0; i < n; i++) parts.push({
              x: 40 + Math.random() * (W - 80), y: 40 + Math.random() * (H - 100),
              vx: (Math.random() - 0.5) * (cat ? 2.2 : 1.2), vy: (Math.random() - 0.5) * (cat ? 2.2 : 1.2),
              colour, r
            });
          };
          add(Math.round(N2 / 4), "#3b82f6", 5);
          add(Math.round(H2 / 4), "#f59e0b", 5);
          add(Math.round(NH3 / 4), "#22c55e", 7);
        };
        rebuild();
        const draw = () => {
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, W, H);
          ctx.strokeStyle = "#64748b";
          ctx.strokeRect(20, 20, W - 40, H - 60);
          const scale = 0.7 + (P / 400) * 0.5;
          parts.forEach((p) => {
            p.x += p.vx * scale; p.y += p.vy * scale;
            if (p.x < 30 || p.x > W - 30) p.vx *= -1;
            if (p.y < 30 || p.y > H - 50) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.colour; ctx.fill();
          });
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "11px IBM Plex Sans";
          ctx.fillText("N₂ blue · H₂ amber · NH₃ green", 30, H - 28);
          if (Math.random() < (cat ? 0.08 : 0.03)) {
            if (shift.startsWith("forward") && N2 > 4 && H2 > 8) {
              setN2(n => n - 1); setH2(h => h - 3); setNH3(a => a + 2);
            } else if (shift.startsWith("backward") && NH3 > 4) {
              setNH3(a => a - 2); setN2(n => n + 1); setH2(h => h + 3);
            }
          }
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
      }, [N2, H2, NH3, P, cat, shift]);

      return (
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border"><canvas ref={canvasRef} width={640} height={360} aria-label="Gas particle chamber" /></div>
          <div className="lg:col-span-2 space-y-3">
            <section className="bg-white rounded-2xl border p-4">
              <label className="text-xs font-semibold">T = {T} °C</label>
              <input type="range" min="200" max="800" step="10" value={T} onChange={e => setT(+e.target.value)} />
              <label className="text-xs font-semibold mt-2 block">P = {P} atm</label>
              <input type="range" min="50" max="400" step="10" value={P} onChange={e => setP(+e.target.value)} />
              <button type="button" className="w-full mt-2 border rounded-lg py-2 text-sm min-h-[44px]" onClick={() => setNH3(a => a + 10)}>+10 NH₃ stress</button>
              <label className="mt-2 flex items-center gap-2 text-sm min-h-[44px]"><input type="checkbox" checked={cat} onChange={e => setCat(e.target.checked)} /> Catalyst</label>
            </section>
            <section className="bg-slate-900 text-cyan-50 rounded-2xl p-4 mono text-sm">
              <div>Q ≈ {Q.toExponential(2)} · K ≈ {K.toExponential(2)}</div>
              <div className="mt-2 font-bold">Shift: {shift}</div>
              <div className="mt-1 text-xs">N₂ {N2} · H₂ {H2} · NH₃ {NH3}</div>
            </section>
            <section className="bg-white rounded-2xl border p-4 text-sm text-slate-600">
              升溫（放熱正向）→ 左移 · 升壓 → 更多 NH₃ · 催化劑唔改 K
              <button type="button" className="block mt-2 text-xs underline min-h-[44px]" onClick={() => setMsg("移除 NH₃ → 正向補充")}>Tip</button>
              {msg && <p className="text-xs mt-1">{msg}</p>}
            </section>
          </div>
        </div>
      );
    }

    function App() {
      return (
        <AppShell hubLabel="← F6 化學主頁" hubEn="← F6 Chemistry Hub" titleZh="勒夏特列平衡室" titleEn="Le Chatelier Chamber"
          subtitle="F6 Chemistry · Le Chatelier">
          {(mode, doneMsg, setDoneMsg, setMode, setPayReason, setPay) => (
            <>
              {mode === "learn" && <LearnFromZero onComplete={() => setMode("guided")} />}
              {mode === "guided" && !doneMsg && (
                <Drill bank={GUIDED} label="Guided" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
                  onDone={(s, n) => setDoneMsg({ s, n, next: "exam" })} />
              )}
              {mode === "exam" && !doneMsg && (
                <Drill bank={EXAM} label="Exam" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
                  onDone={(s, n) => setDoneMsg({ s, n, next: "learn" })} />
              )}
              {doneMsg && (mode === "guided" || mode === "exam") && (
                <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center">
                  <h2 className="text-2xl font-bold">Complete</h2>
                  <p className="mt-2">{doneMsg.s} / {doneMsg.n}</p>
                  <button type="button" className="mt-4 px-4 py-2 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}}
                    onClick={() => { setDoneMsg(null); setMode(doneMsg.next); }}>Continue →</button>
                </section>
              )}
            </>
          )}
        </AppShell>
      );
    }
`;

const titrationApp = `
    const LEARN_STEPS = [
      { id: "A1", titleZh: "咩係滴定？", titleEn: "What is titration?",
        bodyZh: "用已知濃度嘅標準溶液，量度未知溶液嘅濃度。",
        bodyEn: "Use a standard solution of known concentration to find an unknown.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <button type="button" className="px-4 py-2 bg-green-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>開始滴定</button>
            {sub > 0 && <div className="mt-2 font-bold text-green-900">逐滴加入 · 記錄體積</div>}
          </div>
        ) },
      { id: "A2", titleZh: "當量點", titleEn: "Equivalence point",
        bodyZh: "酸嘅摩爾數 = 鹼嘅摩爾數。nₐCₐVₐ = n_b C_b V_b。",
        bodyEn: "Moles acid = moles base at equivalence.",
        render: ({ sub, setSub }) => (
          <div className="p-4 bg-teal-50 rounded-xl text-center mono text-sm">
            <p>CₐVₐ = C_bV_b</p>
            <button type="button" className="mt-2 px-4 py-2 bg-teal-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>25 mL 0.1 M 酸 + ? mL 0.1 M 鹼</button>
            {sub > 0 && <div className="mt-2 font-bold">V_b = 25 mL</div>}
          </div>
        ) },
      { id: "A3", titleZh: "強酸強鹼曲線", titleEn: "Strong acid–strong base",
        bodyZh: "當量點 pH = 7；當量點附近有陡峭 pH 跳變。",
        bodyEn: "Equivalence at pH 7 with a steep vertical region.",
        render: ({ sub, setSub }) => (
          <button type="button" className="px-4 py-2 bg-emerald-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>顯示陡峭區</button>
        ) },
      { id: "A4", titleZh: "弱酸強鹼", titleEn: "Weak acid–strong base",
        bodyZh: "當量點 pH > 7；當量點前有緩衝區（較平緩）。",
        bodyEn: "Equivalence pH > 7; buffer region before endpoint.",
        render: ({ sub, setSub }) => (
          <div className="space-y-2 text-center">
            <button type="button" className="px-4 py-2 bg-amber-200 rounded-lg font-bold min-h-[44px]" onClick={() => setSub(1)}>弱酸曲線</button>
            {sub > 0 && <p className="text-amber-900 font-bold">當量點 ≈ 8.7（醋酸例）</p>}
          </div>
        ) },
      { id: "A5", titleZh: "指示劑", titleEn: "Indicators",
        bodyZh: "酚酞：pH &lt; 8.2 無色，≥ 8.2 粉紅。選擇變色範圍涵蓋當量點 pH。",
        bodyEn: "Phenolphthalein: colourless below 8.2, pink above.",
        render: ({ sub, setSub }) => (
          <div className="flex gap-2 justify-center flex-wrap">
            <button type="button" className="px-4 py-2 bg-slate-200 rounded-lg min-h-[44px]" onClick={() => setSub(1)}>pH 3</button>
            <button type="button" className="px-4 py-2 bg-pink-300 rounded-lg min-h-[44px]" onClick={() => setSub(2)}>pH 10</button>
            {sub === 1 && <span className="w-full text-center font-bold">無色</span>}
            {sub === 2 && <span className="w-full text-center font-bold text-pink-700">粉紅</span>}
          </div>
        ) },
      { id: "A6", titleZh: "互動實驗室：滴定曲線", titleEn: "Titration Curve Lab",
        bodyZh: "加入 NaOH，觀察 live pH 曲線同指示劑顏色。",
        bodyEn: "Add NaOH — live pH curve and indicator colour.",
        render: () => <TitrationLab /> },
      { id: "A7", titleZh: "迷思修正", titleEn: "Misconception",
        bodyZh: "❌ 「當量點 pH 一定係 7」· ✅ 弱酸滴定當量點 pH &gt; 7。",
        bodyEn: "Weak acid titration: equivalence pH is not always 7.",
        render: () => <div className="p-4 bg-rose-50 rounded-xl text-sm font-medium">強酸強鹼 → 7；弱酸強鹼 → 鹼性</div> },
      { id: "A8", titleZh: "DSE 檢核", titleEn: "Exam checkpoint",
        bodyZh: "25 mL 0.1 M HCl 用 0.1 M NaOH 滴定，當量點體積？",
        bodyEn: "Volume of 0.1 M NaOH to neutralise 25 mL 0.1 M HCl?",
        render: ({ sub, setSub }) => (
          <div className="text-center space-y-2">
            <button type="button" className="px-4 py-2 bg-indigo-200 rounded-lg font-bold mx-1 min-h-[44px]" onClick={() => alert("錯")}>50 mL</button>
            <button type="button" className="px-4 py-2 bg-indigo-200 rounded-lg font-bold mx-1 min-h-[44px]" onClick={() => setSub(1)}>25 mL</button>
            {sub > 0 && <div className="font-bold text-indigo-900">正確！CₐVₐ = C_bV_b</div>}
          </div>
        ) }
    ];

    const GUIDED = [
      { id: "g1", q: "At equivalence, moles of acid equal…", qZh: "當量點酸摩爾數等於…", a: "moles of base added",
        opts: ["moles of water only", "moles of base added", "zero always", "catalyst moles"], hint: "nₐ = n_b." },
      { id: "g2", q: "Strong acid + strong base equivalence pH…", qZh: "強酸強鹼當量點 pH…", a: "≈ 7",
        opts: ["≈ 7", "always 14", "always 1", "undefined"], hint: "Neutral salt." },
      { id: "g3", q: "Phenolphthalein turns pink above…", qZh: "酚酞高於…變粉紅", a: "pH 8.2",
        opts: ["pH 3", "pH 7", "pH 8.2", "pH 14 only"], hint: "Indicator range." }
    ];

    const EXAM = [
      { id: "e1", q: "25 mL 0.1 M HCl needs how much 0.1 M NaOH?", qZh: "25 mL 0.1 M HCl 需幾多 mL 0.1 M NaOH？", a: "25 mL",
        opts: ["12.5 mL", "25 mL", "50 mL", "100 mL"], hint: "CₐVₐ=C_bV_b." },
      { id: "e2", q: "Weak acid–strong base: equivalence pH is…", qZh: "弱酸強鹼當量點 pH…", a: "greater than 7",
        opts: ["less than 7", "greater than 7", "exactly 0", "always 14"], hint: "Conjugate base." },
      { id: "e3", q: "Steep part of curve indicates…", qZh: "曲線陡峭段表示…", a: "rapid pH change near equivalence",
        opts: ["no reaction", "rapid pH change near equivalence", "catalyst added", "K changes"], hint: "Endpoint." }
    ];

    function TitrationLab() {
      const canvasRef = useRef(null);
      const [vol, setVol] = useState(0);
      const [mode, setMode] = useState("SA_SB");
      const [msg, setMsg] = useState("");
      const [challenge, setChallenge] = useState(null);
      const Va = 25, Ca = 0.1, Cb = 0.1;
      const Ve = (Ca * Va) / Cb;
      const pH = useMemo(() => {
        const nA = Ca * Va, nB = Cb * vol;
        if (mode === "SA_SB") {
          if (vol < Ve - 0.05) return -Math.log10(Math.max((nA - nB) / (Va + vol), 1e-12));
          if (Math.abs(vol - Ve) <= 0.05) return 7;
          return 14 + Math.log10(Math.max((nB - nA) / (Va + vol), 1e-12));
        }
        if (vol === 0) return 2.9;
        if (vol < Ve - 0.05) return 4.76 + Math.log10(Math.max(nB, 0.01) / Math.max(nA - nB, 0.01));
        if (Math.abs(vol - Ve) <= 0.05) return 8.7;
        return 14 + Math.log10(Math.max((nB - nA) / (Va + vol), 1e-12));
      }, [vol, mode]);
      const curve = useMemo(() => {
        const pts = [];
        for (let v = 0; v <= 50; v += 0.5) {
          const nA = Ca * Va, nB = Cb * v;
          let ph;
          if (mode === "SA_SB") {
            if (v < Ve) ph = -Math.log10(Math.max((nA - nB) / (Va + v), 1e-12));
            else if (Math.abs(v - Ve) < 0.3) ph = 7;
            else ph = 14 + Math.log10(Math.max((nB - nA) / (Va + v), 1e-12));
          } else {
            if (v === 0) ph = 2.9;
            else if (v < Ve) ph = 4.76 + Math.log10(Math.max(nB, 0.01) / Math.max(nA - nB, 0.01));
            else if (Math.abs(v - Ve) < 0.3) ph = 8.7;
            else ph = 14 + Math.log10(Math.max((nB - nA) / (Va + v), 1e-12));
          }
          pts.push({ v, ph: Math.max(0, Math.min(14, ph)) });
        }
        return pts;
      }, [mode]);
      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        const pad = 50;
        const xOf = v => pad + ((W - pad * 2) * v) / 50;
        const yOf = ph => pad + ((H - pad * 2) * (14 - ph)) / 14;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = "#475569";
        ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, H - pad); ctx.lineTo(W - pad, H - pad); ctx.stroke();
        ctx.fillStyle = "#94a3b8"; ctx.font = "11px IBM Plex Sans";
        ctx.fillText("V NaOH / mL", W / 2 - 30, H - 18);
        ctx.strokeStyle = "#34d399"; ctx.lineWidth = 2; ctx.beginPath();
        curve.forEach((p, i) => { const x = xOf(p.v), y = yOf(p.ph); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
        ctx.stroke();
        ctx.fillStyle = "#f472b6"; ctx.beginPath(); ctx.arc(xOf(vol), yOf(pH), 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pH >= 8.2 ? "#f9a8d4" : "#fce7f3";
        ctx.fillRect(W - 120, 60, 70, 100);
        ctx.strokeStyle = "#e2e8f0"; ctx.strokeRect(W - 120, 60, 70, 100);
        ctx.fillStyle = "#e2e8f0"; ctx.font = "10px IBM Plex Sans";
        ctx.fillText("pH " + pH.toFixed(2), W - 115, 50);
      }, [curve, vol, pH]);
      const startCh = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("今日免費練習已用完。"); return; }
        setChallenge({ text: "強酸強鹼：將體積調至 24–26 mL（當量點）。", check: () => mode === "SA_SB" && vol >= 24 && vol <= 26 });
        setMsg("慢慢加入鹼至陡峭區。");
      };
      const checkCh = () => {
        if (!challenge) return;
        if (challenge.check()) { setMsg("✓ 當量點：n酸 = n鹼；pH 急變。"); setChallenge(null); }
        else setMsg("將 NaOH 體積調近 25 mL。");
      };
      return (
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border"><canvas ref={canvasRef} width={640} height={360} aria-label="Titration pH curve" /></div>
          <div className="lg:col-span-2 space-y-3">
            <section className="bg-white rounded-2xl border p-4">
              <div className="flex gap-2 mb-3">
                {[{ id: "SA_SB", label: "強酸強鹼" }, { id: "WA_SB", label: "弱酸強鹼" }].map(m => (
                  <button key={m.id} type="button" className={"px-2 py-2 rounded-lg text-xs font-semibold flex-1 min-h-[44px] " + (mode === m.id ? "text-white" : "bg-slate-100")}
                    style={mode === m.id ? { background: ACCENT } : {}} onClick={() => { setMode(m.id); setVol(0); }}>{m.label}</button>
                ))}
              </div>
              <label className="text-xs font-semibold">NaOH = {vol.toFixed(1)} mL (Ve≈{Ve})</label>
              <input type="range" min="0" max="50" step="0.1" value={vol} onChange={e => setVol(+e.target.value)} />
              <button type="button" className="mt-2 w-full border rounded-lg py-2 text-sm min-h-[44px]" onClick={() => setVol(v => Math.min(50, +(v + 0.1).toFixed(1)))}>+0.1 mL（近當量點）</button>
            </section>
            <section className="bg-slate-900 text-emerald-50 rounded-2xl p-4 mono text-sm">
              pH = <strong>{pH.toFixed(2)}</strong> · 酚酞 {pH >= 8.2 ? "粉紅" : "無色"}
            </section>
            <section className="bg-white rounded-2xl border p-4 text-sm">
              <p className="mb-2">{challenge ? challenge.text : "挑戰：找出當量點跳變"}</p>
              <div className="flex gap-2">
                <button type="button" className="px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={startCh}>New challenge</button>
                {challenge && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold min-h-[44px]" onClick={checkCh}>Check</button>}
              </div>
              {msg && <p className="text-xs mt-2">{msg}</p>}
            </section>
          </div>
        </div>
      );
    }

    function App() {
      return (
        <AppShell hubLabel="← F6 化學主頁" hubEn="← F6 Chemistry Hub" titleZh="滴定曲線實驗" titleEn="Titration Curve Lab"
          subtitle="F6 Chemistry · Titration">
          {(mode, doneMsg, setDoneMsg, setMode, setPayReason, setPay) => (
            <>
              {mode === "learn" && <LearnFromZero onComplete={() => setMode("guided")} />}
              {mode === "guided" && !doneMsg && (
                <Drill bank={GUIDED} label="Guided" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
                  onDone={(s, n) => setDoneMsg({ s, n, next: "exam" })} />
              )}
              {mode === "exam" && !doneMsg && (
                <Drill bank={EXAM} label="Exam" onNeedUpgrade={r => { setPayReason(r); setPay(true); }}
                  onDone={(s, n) => setDoneMsg({ s, n, next: "learn" })} />
              )}
              {doneMsg && (mode === "guided" || mode === "exam") && (
                <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center">
                  <h2 className="text-2xl font-bold">Complete</h2>
                  <p className="mt-2">{doneMsg.s} / {doneMsg.n}</p>
                  <button type="button" className="mt-4 px-4 py-2 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}}
                    onClick={() => { setDoneMsg(null); setMode(doneMsg.next); }}>Continue →</button>
                </section>
              )}
            </>
          )}
        </AppShell>
      );
    }
`;

const targets = [
  {
    rel: "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc",
    meta: { titleEn: "Equilibrium Kc Lab", titleZh: "平衡常數 Kc 實驗室", appId: "f5-chem-kc-lab", level: "F5", accent: "#0d9488" },
    js: sharedUi + kcAppFixed,
  },
  {
    rel: "Secondary_School/Chemistry/Form 6/01_Le_Chatelier",
    meta: { titleEn: "Le Chatelier Chamber", titleZh: "勒夏特列平衡室", appId: "f6-chem-lechatelier-lab", level: "F6", accent: "#0891b2" },
    js: sharedUi + leChatelierApp,
  },
  {
    rel: "Secondary_School/Chemistry/Form 6/02_Titration_Curve",
    meta: { titleEn: "Titration Curve Lab", titleZh: "滴定曲線實驗", appId: "f6-chem-titration-lab", level: "F6", accent: "#16a34a" },
    js: sharedUi + titrationApp,
  },
];

// Patch Electrolysis + Rates: add results readout panel label (Sample food-test pattern)
function patchInPlace(rel, patches) {
  const fp = path.join(CURR, rel, "index.html");
  if (!fs.existsSync(fp)) return { rel, ok: false, why: "missing" };
  let html = fs.readFileSync(fp, "utf8");
  let n = 0;
  for (const [from, to] of patches) {
    if (html.includes(from)) { html = html.replace(from, to); n++; }
  }
  if (n) fs.writeFileSync(fp, html, "utf8");
  return { rel, ok: true, patches: n, bytes: html.length };
}

const report = { written: [], patched: [] };

for (const t of targets) {
  const out = path.join(CURR, t.rel, "index.html");
  const html = ncsShell(t.meta, t.js);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, "utf8");
  report.written.push({ rel: t.rel, bytes: html.length, corrupt: (html.match(/\?\?\?+/g) || []).length });
}

report.patched.push(
  patchInPlace("Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox", [
    ['<h2 className="font-bold text-sm text-indigo-300 mb-2">Outcome</h2>', '<h2 className="font-bold text-sm text-indigo-300 mb-2">Outcome · 結果</h2>'],
    ['Power ON', 'Power ON · 通電'],
    ['Power OFF', 'Power OFF · 斷電'],
  ])
);

report.patched.push(
  patchInPlace("Secondary_School/Chemistry/Form 5/01_Rates_Collision", [
    ['Relative collision success (model):', 'Relative collision success (model) · 碰撞成功率：'],
  ])
);

report.patched.push(
  patchInPlace("Secondary_School/Chemistry/Form 6/04_Haber_Yield", [
    ['Trade-off: high P raises yield', 'Trade-off · 取捨：高壓提高產率'],
  ])
);

console.log(JSON.stringify(report, null, 2));
