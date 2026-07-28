/**
 * CHEM-LAB-F5 + CHEM-LAB-F6 — Interactive Experiment Apps
 * Archives existing LGER index.html → _legacy_lger.html, ships live sims.
 * Run: node "HK Cirriculum/_tools/gen-chem-lab-f5f6.js"
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "Secondary_School", "Chemistry");

function shell(meta, bodyJs) {
  const accent = meta.accent;
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
  <link rel="stylesheet" href="../../../../common/subscribe-gate.css" />
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
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
  <style>
    :root { --accent: ${accent}; }
    body {
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      background:
        radial-gradient(ellipse 70% 45% at 8% -5%, ${accent}28, transparent 55%),
        radial-gradient(ellipse 50% 40% at 100% 0%, #64748b14, transparent 50%),
        #f1f5f9;
      color: #0f172a;
      min-height: 100vh;
    }
    input[type="range"] { accent-color: ${accent}; width: 100%; }
    .mono { font-family: "JetBrains Mono", ui-monospace, monospace; }
    canvas { touch-action: none; display: block; width: 100%; height: auto; }
    button, a { -webkit-tap-highlight-color: transparent; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef, useCallback, useMemo } = React;
    const ACCENT = "${accent}";
    const BACK = "../index.html";
    const LEVEL = "${meta.level}";
    const APP_ID = "${meta.appId}";

    function LabChrome({ titleEn, titleZh, blurb, children, explore, legacy }) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <header className="mb-5">
            <a href={BACK} className="text-sm hover:underline" style={{ color: ACCENT }}>← {LEVEL} Chemistry</a>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white px-2 py-0.5 rounded" style={{ background: ACCENT }}>Interactive Lab</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border text-slate-700">HKDSE · Learn = live sim</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">{titleEn} · {titleZh}</h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">{blurb}</p>
          </header>
          {children}
          <p className="text-[10px] text-slate-400 mt-4">Explores: {explore} · Legacy MCQ: <a className="underline" href="_legacy_lger.html">_legacy_lger.html</a>{legacy ? "" : ""}</p>
        </div>
      );
    }

${bodyJs}

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
`;
}

/* ========== APP BODIES ========== */

const electrolysisBody = `
    const ELECTROLYTES = {
      "molten_PbBr2": {
        label: "Molten PbBr₂",
        cath: "Pb(l) deposited",
        an: "Br₂(g) liberated",
        ions: ["Pb²⁺", "Br⁻"],
        colour: "#94a3b8"
      },
      "aq_CuSO4_inert": {
        label: "Aq CuSO₄ (inert electrodes)",
        cath: "Cu(s) plated",
        an: "O₂(g) + H⁺ (from H₂O)",
        ions: ["Cu²⁺", "SO₄²⁻", "H⁺", "OH⁻"],
        colour: "#38bdf8"
      },
      "aq_CuSO4_Cu": {
        label: "Aq CuSO₄ (Cu electrodes)",
        cath: "Cu(s) plated",
        an: "Cu(s) dissolves (anode)",
        ions: ["Cu²⁺", "SO₄²⁻"],
        colour: "#0ea5e9"
      },
      "aq_NaCl": {
        label: "Conc. aq NaCl",
        cath: "H₂(g) (preferential)",
        an: "Cl₂(g)",
        ions: ["Na⁺", "Cl⁻", "H⁺", "OH⁻"],
        colour: "#a78bfa"
      },
      "dil_H2SO4": {
        label: "Dil. H₂SO₄",
        cath: "H₂(g)",
        an: "O₂(g)",
        ions: ["H⁺", "SO₄²⁻", "OH⁻"],
        colour: "#f472b6"
      }
    };

    function App() {
      const canvasRef = useRef(null);
      const [key, setKey] = useState("aq_CuSO4_inert");
      const [V, setV] = useState(3.0);
      const [on, setOn] = useState(true);
      const [t, setT] = useState(0);
      const [I, setI] = useState(1.5);
      const [explore, setExplore] = useState(0);
      const [challenge, setChallenge] = useState(null);
      const [msg, setMsg] = useState("");
      const el = ELECTROLYTES[key];
      const massCu = useMemo(() => {
        // Faraday pedagogical: m = (I t M)/(n F); Cu²⁺ n=2, M=63.5, F=96500
        if (!key.startsWith("aq_Cu")) return null;
        return (I * t * 63.5) / (2 * 96500);
      }, [I, t, key]);

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        let raf, bubbles = [], ions = [], tick = 0;
        const spawn = () => {
          if (!on || V < 1.2) return;
          for (let i = 0; i < 2; i++) {
            ions.push({ x: W * 0.25 + Math.random() * W * 0.5, y: 80 + Math.random() * 200, q: Math.random() > 0.5 ? 1 : -1, sp: 0.4 + Math.random() * 0.6 });
          }
          if (tick % 8 === 0) {
            bubbles.push({ x: W * 0.22 + (Math.random() - 0.5) * 20, y: H - 90, r: 2 + Math.random() * 3, side: "c" });
            bubbles.push({ x: W * 0.78 + (Math.random() - 0.5) * 20, y: H - 90, r: 2 + Math.random() * 3, side: "a" });
          }
        };
        const draw = () => {
          tick++;
          ctx.clearRect(0, 0, W, H);
          // beaker
          ctx.fillStyle = el.colour + "55";
          ctx.fillRect(40, 60, W - 80, H - 100);
          ctx.strokeStyle = "#334155";
          ctx.lineWidth = 3;
          ctx.strokeRect(40, 60, W - 80, H - 100);
          // electrodes
          ctx.fillStyle = "#475569";
          ctx.fillRect(W * 0.18, 70, 28, H - 130);
          ctx.fillRect(W * 0.78 - 14, 70, 28, H - 130);
          ctx.fillStyle = "#0f172a";
          ctx.font = "12px IBM Plex Sans";
          ctx.fillText("− Cathode", W * 0.14, 52);
          ctx.fillText("+ Anode", W * 0.72, 52);
          if (on && V >= 1.2) {
            spawn();
            setT((prev) => prev + 0.05);
          }
          ions.forEach((p) => {
            p.x += p.q > 0 ? -p.sp * (V / 3) : p.sp * (V / 3);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = p.q > 0 ? "#f59e0b" : "#22d3ee";
            ctx.fill();
            ctx.fillStyle = "#0f172a";
            ctx.font = "9px JetBrains Mono";
            ctx.fillText(p.q > 0 ? "+" : "−", p.x - 3, p.y + 3);
          });
          ions = ions.filter((p) => p.x > 70 && p.x < W - 70);
          bubbles.forEach((b) => {
            b.y -= 1.2 + V * 0.3;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fill();
            ctx.strokeStyle = "#94a3b8";
            ctx.stroke();
          });
          bubbles = bubbles.filter((b) => b.y > 70);
          // labels
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 13px IBM Plex Sans";
          ctx.fillText("Cathode: " + el.cath, 50, H - 18);
          ctx.fillText("Anode: " + el.an, W / 2, H - 18);
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
      }, [key, V, on, el]);

      const bump = () => setExplore((e) => e + 1);
      const startCh = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("Free limit — subscribe for more."); return; }
        if (window.HkcSubscribe) HkcSubscribe.recordDrillAttempt();
        const kinds = [
          { id: "nacl", text: "Select conc. aq NaCl. Confirm H₂ at cathode (not Na).", check: () => key === "aq_NaCl" },
          { id: "cu", text: "Use Cu electrodes + aq CuSO₄ — anode dissolves (mass transfer).", check: () => key === "aq_CuSO4_Cu" },
          { id: "v", text: "Raise voltage ≥ 4 V and keep power ON so ions migrate visibly.", check: () => on && V >= 4 }
        ];
        setChallenge(kinds[Math.floor(Math.random() * kinds.length)]);
        setMsg("Set up the cell, then Check.");
      };
      const checkCh = () => {
        if (!challenge) return;
        if (challenge.check()) { setMsg("✓ Products match preferential discharge."); setChallenge(null); }
        else setMsg("Not yet — rethink preferential discharge.");
      };

      return (
        <LabChrome titleEn="Electrolysis Sandbox" titleZh="電解沙盒" blurb="Choose electrolyte · dial voltage · watch ion migration and electrode products (HKDSE preferential discharge)." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-slate-900 rounded-2xl overflow-hidden border border-indigo-200/30">
              <canvas ref={canvasRef} width={640} height={400} aria-label="Electrolysis cell" />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4 shadow-sm">
                <h2 className="font-bold text-sm mb-2" style={{ color: ACCENT }}>Electrolyte · 電解質</h2>
                <select className="w-full border rounded-lg p-2 text-sm min-h-[44px]" value={key}
                  onChange={(e) => { setKey(e.target.value); setT(0); bump(); }}>
                  {Object.entries(ELECTROLYTES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <label className="block text-xs font-semibold text-slate-600 mt-3 mb-1">Voltage · 電壓 {V.toFixed(1)} V</label>
                <input type="range" min="0" max="6" step="0.1" value={V} onChange={(e) => { setV(+e.target.value); bump(); }} />
                <label className="block text-xs font-semibold text-slate-600 mt-3 mb-1">Current I (plating) {I.toFixed(1)} A</label>
                <input type="range" min="0.2" max="3" step="0.1" value={I} onChange={(e) => { setI(+e.target.value); bump(); }} />
                <button type="button" className="mt-3 w-full px-3 py-2 rounded-lg text-white text-sm font-semibold min-h-[44px]" style={{ background: on ? "#16a34a" : "#64748b" }}
                  onClick={() => { setOn((o) => !o); bump(); }}>{on ? "Power ON" : "Power OFF"}</button>
                <p className="text-[11px] text-slate-500 mt-2">Ions: {el.ions.join(" · ")}</p>
              </section>
              <section className="bg-slate-900 text-indigo-50 rounded-2xl p-4">
                <h2 className="font-bold text-sm text-indigo-300 mb-2">Outcome</h2>
                <p className="text-sm"><strong>−</strong> {el.cath}</p>
                <p className="text-sm mt-1"><strong>+</strong> {el.an}</p>
                {massCu != null && (
                  <p className="mono text-xs mt-2 text-indigo-200">Cu mass ≈ {massCu.toFixed(4)} g · m = ItM/(nF) · t≈{t.toFixed(0)} s</p>
                )}
              </section>
              <section className="bg-white rounded-2xl border p-4">
                <p className="text-sm text-slate-600 mb-2">{challenge ? challenge.text : "Challenge: predict products, then verify."}</p>
                <div className="flex gap-2 flex-wrap">
                  <button type="button" className="px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={startCh}>New challenge</button>
                  {challenge && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold min-h-[44px]" onClick={checkCh}>Check</button>}
                </div>
                {msg && <p className="text-xs mt-2 text-slate-600">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const cellBuilderBody = `
    const HALF = [
      { id: "Mg", E: -2.38, colour: "#94a3b8" },
      { id: "Zn", E: -0.76, colour: "#a1a1aa" },
      { id: "Fe", E: -0.44, colour: "#78716c" },
      { id: "Cu", E: 0.34, colour: "#f59e0b" },
      { id: "Ag", E: 0.80, colour: "#e2e8f0" }
    ];

    function App() {
      const canvasRef = useRef(null);
      const [left, setLeft] = useState("Zn");
      const [right, setRight] = useState("Cu");
      const [explore, setExplore] = useState(0);
      const [challenge, setChallenge] = useState(null);
      const [msg, setMsg] = useState("");
      const L = HALF.find((h) => h.id === left);
      const R = HALF.find((h) => h.id === right);
      const Ecell = +(R.E - L.E).toFixed(2);
      const spontaneous = Ecell > 0;
      const anode = L.E < R.E ? L : R;
      const cathode = L.E < R.E ? R : L;

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        let raf, e = [], t = 0;
        const draw = () => {
          t++;
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = "#e0f2fe";
          ctx.fillRect(40, 80, 200, 240);
          ctx.fillStyle = "#fef3c7";
          ctx.fillRect(W - 240, 80, 200, 240);
          ctx.strokeStyle = "#334155";
          ctx.lineWidth = 2;
          ctx.strokeRect(40, 80, 200, 240);
          ctx.strokeRect(W - 240, 80, 200, 240);
          // electrodes
          ctx.fillStyle = L.colour;
          ctx.fillRect(120, 100, 30, 180);
          ctx.fillStyle = R.colour;
          ctx.fillRect(W - 170, 100, 30, 180);
          // salt bridge
          ctx.strokeStyle = "#64748b";
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.moveTo(240, 120);
          ctx.bezierCurveTo(W / 2, 40, W / 2, 40, W - 240, 120);
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.font = "12px IBM Plex Sans";
          ctx.fillText("Salt bridge", W / 2 - 30, 36);
          ctx.fillText(left + "²⁺ / " + left, 70, 340);
          ctx.fillText(right + "²⁺ / " + right, W - 210, 340);
          // wire + voltmeter
          ctx.strokeStyle = spontaneous ? "#16a34a" : "#dc2626";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(135, 100);
          ctx.lineTo(135, 50);
          ctx.lineTo(W - 155, 50);
          ctx.lineTo(W - 155, 100);
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.fillRect(W / 2 - 40, 28, 80, 28);
          ctx.strokeStyle = "#0f172a";
          ctx.strokeRect(W / 2 - 40, 28, 80, 28);
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 14px JetBrains Mono";
          ctx.fillText((spontaneous ? "+" : "") + Ecell + " V", W / 2 - 32, 48);
          // electron flow animation toward cathode (higher E)
          if (spontaneous && t % 4 === 0) {
            e.push({ x: anode === L ? 135 : W - 155, y: 100, targetX: cathode === R ? W - 155 : 135 });
          }
          e.forEach((p) => {
            p.y = Math.max(50, p.y - 2);
            if (p.y <= 50) p.x += (p.targetX - p.x) * 0.08;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#3b82f6";
            ctx.fill();
          });
          e = e.filter((p) => Math.abs(p.x - p.targetX) > 8 || p.y > 55);
          ctx.fillStyle = "#0f172a";
          ctx.font = "bold 13px IBM Plex Sans";
          ctx.fillText("Anode (ox): " + anode.id + " → " + anode.id + "²⁺ + 2e⁻", 40, H - 28);
          ctx.fillText("Cathode (red): " + cathode.id + "²⁺ + 2e⁻ → " + cathode.id, 40, H - 10);
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
      }, [left, right, L, R, Ecell, spontaneous, anode, cathode]);

      const bump = () => setExplore((n) => n + 1);
      const startCh = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("Free limit."); return; }
        if (window.HkcSubscribe) HkcSubscribe.recordDrillAttempt();
        setChallenge({ text: "Build a cell with E°cell ≥ 1.0 V (more reactive metal on left).", check: () => Ecell >= 1.0 });
        setMsg("Adjust electrodes, then Check.");
      };
      const checkCh = () => {
        if (!challenge) return;
        if (challenge.check()) { setMsg("✓ E°cell = E°(red) − E°(ox). Electrons flow to cathode."); setChallenge(null); }
        else setMsg("Need larger difference — try Mg|Cu or Zn|Ag.");
      };

      return (
        <LabChrome titleEn="Electrochemical Cell Builder" titleZh="化學電池組裝" blurb="Pick two half-cells · live E°cell · watch electron flow from anode (ox) to cathode (red)." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-2xl border overflow-hidden shadow-sm">
              <canvas ref={canvasRef} width={640} height={400} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <h2 className="font-bold text-sm mb-2" style={{ color: ACCENT }}>Half-cells</h2>
                <label className="text-xs font-semibold">Left electrode</label>
                <select className="w-full border rounded-lg p-2 mb-2 min-h-[44px]" value={left} onChange={(e) => { setLeft(e.target.value); bump(); }}>
                  {HALF.map((h) => <option key={h.id} value={h.id}>{h.id} · E°={h.E} V</option>)}
                </select>
                <label className="text-xs font-semibold">Right electrode</label>
                <select className="w-full border rounded-lg p-2 min-h-[44px]" value={right} onChange={(e) => { setRight(e.target.value); bump(); }}>
                  {HALF.map((h) => <option key={h.id} value={h.id}>{h.id} · E°={h.E} V</option>)}
                </select>
              </section>
              <section className="bg-slate-900 text-amber-50 rounded-2xl p-4 mono text-sm">
                <div>E°cell = {R.E} − ({L.E}) = <strong>{Ecell} V</strong></div>
                <div className="mt-2">{spontaneous ? "Spontaneous (galvanic)" : "Non-spontaneous as drawn — swap or use external power"}</div>
              </section>
              <section className="bg-white rounded-2xl border p-4">
                <p className="text-sm mb-2">{challenge ? challenge.text : "Challenge: maximise E°cell."}</p>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={startCh}>New challenge</button>
                  {challenge && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold min-h-[44px]" onClick={checkCh}>Check</button>}
                </div>
                {msg && <p className="text-xs mt-2">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const hessBody = `
    const CYCLES = [
      {
        id: "formation",
        title: "Formation route",
        target: "C(graphite) + O₂ → CO₂",
        deltaH: -394,
        steps: [
          { id: "s1", label: "C + ½O₂ → CO", dh: -111, on: false },
          { id: "s2", label: "CO + ½O₂ → CO₂", dh: -283, on: false }
        ]
      },
      {
        id: "combust",
        title: "Combustion cycle",
        target: "2C + H₂ → C₂H₂ (acetylene)",
        deltaH: 227,
        steps: [
          { id: "s1", label: "2C + 2O₂ → 2CO₂", dh: -788, on: false },
          { id: "s2", label: "H₂ + ½O₂ → H₂O", dh: -286, on: false },
          { id: "s3", label: "C₂H₂ + 2½O₂ → 2CO₂ + H₂O (rev)", dh: 1301, on: false }
        ]
      }
    ];

    function App() {
      const canvasRef = useRef(null);
      const [ci, setCi] = useState(0);
      const [steps, setSteps] = useState(CYCLES[0].steps.map((s) => ({ ...s })));
      const [explore, setExplore] = useState(0);
      const [msg, setMsg] = useState("");
      const cycle = CYCLES[ci];
      const sum = steps.filter((s) => s.on).reduce((a, s) => a + s.dh, 0);
      const complete = steps.every((s) => s.on) && Math.abs(sum - cycle.deltaH) < 2;

      useEffect(() => {
        setSteps(CYCLES[ci].steps.map((s) => ({ ...s })));
      }, [ci]);

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, W, H);
        // energy axis
        ctx.strokeStyle = "#94a3b8";
        ctx.beginPath();
        ctx.moveTo(60, 40);
        ctx.lineTo(60, H - 40);
        ctx.lineTo(W - 40, H - 40);
        ctx.stroke();
        ctx.fillStyle = "#64748b";
        ctx.font = "11px IBM Plex Sans";
        ctx.fillText("Enthalpy", 8, 50);
        const active = steps.filter((s) => s.on);
        let y = H - 80;
        let x = 100;
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 13px IBM Plex Sans";
        ctx.fillText("Reactants", x, y + 4);
        active.forEach((s, i) => {
          const nextY = y + (s.dh > 0 ? -Math.min(120, Math.abs(s.dh) / 8) : Math.min(120, Math.abs(s.dh) / 8));
          const nextX = x + 140;
          ctx.strokeStyle = s.dh < 0 ? "#16a34a" : "#dc2626";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x + 40, y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.font = "11px JetBrains Mono";
          ctx.fillText((s.dh > 0 ? "+" : "") + s.dh + " kJ", (x + nextX) / 2, (y + nextY) / 2 - 6);
          x = nextX;
          y = nextY;
        });
        if (complete) {
          ctx.fillStyle = ACCENT;
          ctx.font = "bold 16px IBM Plex Sans";
          ctx.fillText("ΣΔH = " + sum + " kJ ≈ target " + cycle.deltaH, 100, 36);
        } else {
          ctx.fillStyle = "#64748b";
          ctx.font = "13px IBM Plex Sans";
          ctx.fillText("Toggle steps · Hess: ΣΔH_path = ΔH_target", 100, 36);
        }
        ctx.fillStyle = "#0f172a";
        ctx.fillText("Σ selected = " + sum + " kJ", W - 200, H - 20);
      }, [steps, complete, sum, cycle]);

      const toggle = (id) => {
        setSteps((arr) => arr.map((s) => (s.id === id ? { ...s, on: !s.on } : s)));
        setExplore((e) => e + 1);
      };

      return (
        <LabChrome titleEn="Hess Cycle Lab" titleZh="蓋斯定律實驗" blurb="Toggle enthalpy steps · path sum must equal target ΔH (state function)." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-2xl border overflow-hidden">
              <canvas ref={canvasRef} width={640} height={360} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <h2 className="font-bold text-sm mb-2" style={{ color: ACCENT }}>Cycle</h2>
                <div className="flex gap-2 flex-wrap mb-3">
                  {CYCLES.map((c, i) => (
                    <button key={c.id} type="button" className={"px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] " + (ci === i ? "text-white" : "bg-slate-100")}
                      style={ci === i ? { background: ACCENT } : {}} onClick={() => { setCi(i); setExplore((e) => e + 1); }}>{c.title}</button>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mb-2">Target: {cycle.target} · ΔH = {cycle.deltaH} kJ</p>
                {steps.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm mb-2 cursor-pointer min-h-[40px]">
                    <input type="checkbox" checked={s.on} onChange={() => toggle(s.id)} />
                    <span>{s.label} <span className="mono text-xs">({s.dh > 0 ? "+" : ""}{s.dh})</span></span>
                  </label>
                ))}
              </section>
              <section className={"rounded-2xl p-4 text-sm font-semibold " + (complete ? "bg-emerald-100 text-emerald-900" : "bg-rose-50 text-rose-900")}>
                {complete ? "✓ Hess satisfied — path independent." : "Enable all valid steps so ΣΔH matches target."}
                {msg && <p className="font-normal text-xs mt-1">{msg}</p>}
                <button type="button" className="mt-2 px-3 py-2 bg-white border rounded-lg text-xs min-h-[40px]"
                  onClick={() => setMsg(complete ? "Exam tip: reverse = −ΔH; multiply coefficients." : "Check signs when reversing combustion.")}>Hint</button>
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const bufferBody = `
    function App() {
      const canvasRef = useRef(null);
      const [HA, setHA] = useState(0.1);
      const [A, setA] = useState(0.1);
      const [pKa, setPKa] = useState(4.76);
      const [added, setAdded] = useState(0); // mmol strong acid(+) / base(−) to 100 mL
      const [explore, setExplore] = useState(0);
      const [challenge, setChallenge] = useState(null);
      const [msg, setMsg] = useState("");

      const pH = useMemo(() => {
        // Henderson–Hasselbalch with challenge moles
        const V = 0.1; // L
        let nHA = HA * V * 1000; // mmol
        let nA = A * V * 1000;
        if (added > 0) { // strong acid
          nA = Math.max(0.01, nA - added);
          nHA = nHA + Math.min(added, A * V * 1000 - 0.01);
        } else if (added < 0) {
          const b = -added;
          nHA = Math.max(0.01, nHA - b);
          nA = nA + Math.min(b, HA * V * 1000 - 0.01);
        }
        return pKa + Math.log10(nA / nHA);
      }, [HA, A, pKa, added]);

      const pH0 = useMemo(() => pKa + Math.log10(A / HA), [HA, A, pKa]);

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        // beaker fill by pH colour
        const t = Math.max(0, Math.min(1, (pH - 2) / 10));
        const r = Math.floor(255 * (1 - t));
        const b = Math.floor(255 * t);
        ctx.fillStyle = "rgb(" + r + ",80," + b + ")";
        ctx.fillRect(80, 60, 200, 280);
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 3;
        ctx.strokeRect(80, 60, 200, 280);
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 28px JetBrains Mono";
        ctx.fillText("pH " + pH.toFixed(2), 110, 200);
        // pH scale meter
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(360, 40, 40, 300);
        for (let i = 0; i <= 14; i++) {
          const y = 40 + (300 * i) / 14;
          ctx.fillStyle = i % 2 === 0 ? "#64748b" : "#94a3b8";
          ctx.fillRect(400, y, 8, 2);
          ctx.font = "10px IBM Plex Sans";
          ctx.fillText(String(14 - i), 415, y + 3);
        }
        const yNeedle = 40 + 300 * (1 - pH / 14);
        ctx.fillStyle = ACCENT;
        ctx.beginPath();
        ctx.moveTo(350, yNeedle);
        ctx.lineTo(360, yNeedle - 6);
        ctx.lineTo(360, yNeedle + 6);
        ctx.fill();
        ctx.fillStyle = "#0f172a";
        ctx.font = "12px IBM Plex Sans";
        ctx.fillText("HA " + HA.toFixed(2) + " M", 80, 370);
        ctx.fillText("A⁻ " + A.toFixed(2) + " M", 200, 370);
        ctx.fillText("ΔpH from unchallenged: " + (pH - pH0).toFixed(2), 360, 370);
      }, [pH, HA, A, pH0]);

      const bump = () => setExplore((e) => e + 1);
      const startCh = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("Free limit."); return; }
        if (window.HkcSubscribe) HkcSubscribe.recordDrillAttempt();
        setChallenge({ text: "Add ≥ +5 mmol strong acid; |ΔpH| should stay < 0.8 (buffer resists).", check: () => added >= 5 && Math.abs(pH - pH0) < 0.8 });
        setMsg("Challenge the buffer, then Check.");
      };
      const checkCh = () => {
        if (!challenge) return;
        if (challenge.check()) { setMsg("✓ Buffer consumes H⁺ via A⁻ → HA."); setChallenge(null); }
        else setMsg("Add acid first; compare to unbuffered water (would crash pH).");
      };

      return (
        <LabChrome titleEn="Buffer Systems Lab" titleZh="緩衝溶液實驗" blurb="Henderson–Hasselbalch live · add acid/base · watch pH resist change." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-2xl border overflow-hidden">
              <canvas ref={canvasRef} width={640} height={400} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <label className="text-xs font-semibold">[HA] = {HA.toFixed(2)} M</label>
                <input type="range" min="0.02" max="0.5" step="0.01" value={HA} onChange={(e) => { setHA(+e.target.value); bump(); }} />
                <label className="text-xs font-semibold mt-2 block">[A⁻] = {A.toFixed(2)} M</label>
                <input type="range" min="0.02" max="0.5" step="0.01" value={A} onChange={(e) => { setA(+e.target.value); bump(); }} />
                <label className="text-xs font-semibold mt-2 block">pKa = {pKa.toFixed(2)}</label>
                <input type="range" min="3" max="10" step="0.01" value={pKa} onChange={(e) => { setPKa(+e.target.value); bump(); }} />
                <label className="text-xs font-semibold mt-2 block">Challenge: {added > 0 ? "+" + added + " mmol H⁺" : added < 0 ? (−added) + " mmol OH⁻" : "none"}</label>
                <input type="range" min="-15" max="15" step="1" value={added} onChange={(e) => { setAdded(+e.target.value); bump(); }} />
                <p className="text-[11px] text-slate-500 mt-2">pH = pKa + log([A⁻]/[HA])</p>
              </section>
              <section className="bg-slate-900 text-teal-50 rounded-2xl p-4 mono">
                pH = <strong>{pH.toFixed(2)}</strong> · unchallenged {pH0.toFixed(2)}
              </section>
              <section className="bg-white rounded-2xl border p-4">
                <p className="text-sm mb-2">{challenge ? challenge.text : "Challenge the buffer."}</p>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={startCh}>New challenge</button>
                  {challenge && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold min-h-[44px]" onClick={checkCh}>Check</button>}
                </div>
                {msg && <p className="text-xs mt-2">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const leChatBody = `
    function App() {
      const canvasRef = useRef(null);
      const [N2, setN2] = useState(20);
      const [H2, setH2] = useState(60);
      const [NH3, setNH3] = useState(20);
      const [T, setT] = useState(500); // °C pedagogical
      const [P, setP] = useState(200); // atm
      const [cat, setCat] = useState(false);
      const [explore, setExplore] = useState(0);
      const [msg, setMsg] = useState("");
      // Exothermic forward: higher T → lower K (fewer NH3 at eq)
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
          const add = (n, kind, colour) => {
            for (let i = 0; i < n; i++) parts.push({
              x: 40 + Math.random() * (W - 80),
              y: 40 + Math.random() * (H - 100),
              vx: (Math.random() - 0.5) * (cat ? 2.2 : 1.2),
              vy: (Math.random() - 0.5) * (cat ? 2.2 : 1.2),
              kind, colour, r: kind === "NH3" ? 7 : 5
            });
          };
          add(Math.round(N2 / 4), "N2", "#3b82f6");
          add(Math.round(H2 / 4), "H2", "#f59e0b");
          add(Math.round(NH3 / 4), "NH3", "#22c55e");
        };
        rebuild();
        const draw = () => {
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, W, H);
          ctx.strokeStyle = "#64748b";
          ctx.strokeRect(20, 20, W - 40, H - 60);
          // pressure: chamber width visual
          const scale = 0.7 + (P / 400) * 0.5;
          parts.forEach((p) => {
            p.x += p.vx * scale;
            p.y += p.vy * scale;
            if (p.x < 30 || p.x > W - 30) p.vx *= -1;
            if (p.y < 30 || p.y > H - 50) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.colour;
            ctx.fill();
          });
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "12px IBM Plex Sans";
          ctx.fillText("N₂ blue · H₂ amber · NH₃ green · P compresses chamber motion", 30, H - 20);
          // sync counts slowly toward K vs Q
          if (Math.random() < (cat ? 0.08 : 0.03)) {
            if (shift.startsWith("forward") && N2 > 4 && H2 > 8) {
              setN2((n) => n - 1); setH2((h) => h - 3); setNH3((a) => a + 2);
            } else if (shift.startsWith("backward") && NH3 > 4) {
              setNH3((a) => a - 2); setN2((n) => n + 1); setH2((h) => h + 3);
            }
          }
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
      }, [N2, H2, NH3, P, cat, shift]);

      const bump = () => setExplore((e) => e + 1);

      return (
        <LabChrome titleEn="Le Chatelier Chamber" titleZh="勒夏特列平衡室" blurb="N₂ + 3H₂ ⇌ 2NH₃ · stress T / P / amounts · watch Q vs K and shift." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-cyan-200/40">
              <canvas ref={canvasRef} width={640} height={400} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <label className="text-xs font-semibold">T = {T} °C (exo forward → ↑T lowers K)</label>
                <input type="range" min="200" max="800" step="10" value={T} onChange={(e) => { setT(+e.target.value); bump(); }} />
                <label className="text-xs font-semibold mt-2 block">P = {P} atm (↑P favours fewer gas moles)</label>
                <input type="range" min="50" max="400" step="10" value={P} onChange={(e) => { setP(+e.target.value); bump(); }} />
                <label className="text-xs font-semibold mt-2 block">Add NH₃ stress</label>
                <button type="button" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm min-h-[44px]" onClick={() => { setNH3((a) => a + 10); bump(); }}>+10 NH₃</button>
                <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={cat} onChange={(e) => { setCat(e.target.checked); bump(); }} /> Catalyst (faster approach, same K)
                </label>
              </section>
              <section className="bg-slate-900 text-cyan-50 rounded-2xl p-4 mono text-sm">
                <div>Q ≈ {Q.toExponential(2)} · K ≈ {K.toExponential(2)}</div>
                <div className="mt-2 font-bold text-cyan-300">Shift: {shift}</div>
                <div className="mt-2 text-xs">Counts N₂ {N2} · H₂ {H2} · NH₃ {NH3}</div>
              </section>
              <section className="bg-white rounded-2xl border p-4 text-sm text-slate-600">
                Raise T → equilibrium left (exo). Raise P → more NH₃. Catalyst ≠ change position.
                <button type="button" className="block mt-2 text-xs underline" onClick={() => setMsg("Remove NH₃ → forward to replace it.")}>Tip</button>
                {msg && <p className="text-xs mt-1">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const titrationBody = `
    function App() {
      const canvasRef = useRef(null);
      const [vol, setVol] = useState(0); // mL NaOH added
      const [mode, setMode] = useState("SA_SB"); // SA_SB | WA_SB
      const [explore, setExplore] = useState(0);
      const [challenge, setChallenge] = useState(null);
      const [msg, setMsg] = useState("");
      const Va = 25, Ca = 0.1, Cb = 0.1;
      const Ve = (Ca * Va) / Cb; // 25 mL

      const pH = useMemo(() => {
        const nA = Ca * Va; // mmol
        const nB = Cb * vol;
        if (mode === "SA_SB") {
          if (vol < Ve - 0.05) {
            const H = (nA - nB) / (Va + vol);
            return -Math.log10(Math.max(H, 1e-12));
          }
          if (Math.abs(vol - Ve) <= 0.05) return 7;
          const OH = (nB - nA) / (Va + vol);
          return 14 + Math.log10(Math.max(OH, 1e-12));
        }
        // weak acid pedagogical curve
        const Ka = 1.8e-5;
        if (vol === 0) return 0.5 * (Math.log10(Ka) ? -Math.log10(Math.sqrt(Ka * Ca)) : 2.9);
        if (vol < Ve - 0.05) {
          const nHA = nA - nB, nAion = nB;
          return -Math.log10(Ka) + Math.log10(Math.max(nAion, 0.01) / Math.max(nHA, 0.01));
        }
        if (Math.abs(vol - Ve) <= 0.05) return 8.7;
        const OH = (nB - nA) / (Va + vol);
        return 14 + Math.log10(Math.max(OH, 1e-12));
      }, [vol, mode]);

      const curve = useMemo(() => {
        const pts = [];
        for (let v = 0; v <= 50; v += 0.5) {
          // reuse formula inline
          const nA = Ca * Va, nB = Cb * v;
          let ph;
          if (mode === "SA_SB") {
            if (v < Ve) ph = -Math.log10(Math.max((nA - nB) / (Va + v), 1e-12));
            else if (Math.abs(v - Ve) < 0.3) ph = 7;
            else ph = 14 + Math.log10(Math.max((nB - nA) / (Va + v), 1e-12));
          } else {
            const Ka = 1.8e-5;
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
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, W, H);
        const pad = 50;
        const xOf = (v) => pad + ((W - pad * 2) * v) / 50;
        const yOf = (ph) => pad + ((H - pad * 2) * (14 - ph)) / 14;
        ctx.strokeStyle = "#475569";
        ctx.beginPath();
        ctx.moveTo(pad, pad);
        ctx.lineTo(pad, H - pad);
        ctx.lineTo(W - pad, H - pad);
        ctx.stroke();
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px IBM Plex Sans";
        ctx.fillText("V NaOH / mL", W / 2 - 30, H - 18);
        ctx.save();
        ctx.translate(16, H / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("pH", 0, 0);
        ctx.restore();
        ctx.strokeStyle = "#34d399";
        ctx.lineWidth = 2;
        ctx.beginPath();
        curve.forEach((p, i) => {
          const x = xOf(p.v), y = yOf(p.ph);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
        // marker
        ctx.fillStyle = "#f472b6";
        ctx.beginPath();
        ctx.arc(xOf(vol), yOf(pH), 7, 0, Math.PI * 2);
        ctx.fill();
        // flask colour
        const ind = pH < 8.2 ? "#fce7f3" : "#f9a8d4";
        ctx.fillStyle = ind;
        ctx.fillRect(W - 120, 60, 70, 100);
        ctx.strokeStyle = "#e2e8f0";
        ctx.strokeRect(W - 120, 60, 70, 100);
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "10px IBM Plex Sans";
        ctx.fillText("Phenol.", W - 110, 175);
        ctx.fillText("pH " + pH.toFixed(2), W - 115, 50);
      }, [curve, vol, pH]);

      const bump = () => setExplore((e) => e + 1);
      const startCh = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("Free limit."); return; }
        if (window.HkcSubscribe) HkcSubscribe.recordDrillAttempt();
        setChallenge({ text: "Reach the steep equivalence region (24–26 mL) for SA/SB.", check: () => mode === "SA_SB" && vol >= 24 && vol <= 26 });
        setMsg("Add titrant carefully near end-point.");
      };
      const checkCh = () => {
        if (!challenge) return;
        if (challenge.check()) { setMsg("✓ Equivalence: moles acid = moles alkali; pH jump."); setChallenge(null); }
        else setMsg("Move volume near 25 mL on strong–strong curve.");
      };

      return (
        <LabChrome titleEn="Titration Curve Lab" titleZh="滴定曲線實驗" blurb="Add NaOH · live pH curve · compare strong vs weak analyte · indicator colour." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border">
              <canvas ref={canvasRef} width={640} height={400} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <div className="flex gap-2 mb-3">
                  {[
                    { id: "SA_SB", label: "Strong acid–strong base" },
                    { id: "WA_SB", label: "Weak acid–strong base" }
                  ].map((m) => (
                    <button key={m.id} type="button" className={"px-2 py-2 rounded-lg text-xs font-semibold min-h-[44px] flex-1 " + (mode === m.id ? "text-white" : "bg-slate-100")}
                      style={mode === m.id ? { background: ACCENT } : {}} onClick={() => { setMode(m.id); setVol(0); bump(); }}>{m.label}</button>
                  ))}
                </div>
                <label className="text-xs font-semibold">Volume NaOH = {vol.toFixed(1)} mL (Ve≈{Ve})</label>
                <input type="range" min="0" max="50" step="0.1" value={vol} onChange={(e) => { setVol(+e.target.value); bump(); }} />
                <button type="button" className="mt-2 w-full border rounded-lg py-2 text-sm min-h-[44px]" onClick={() => { setVol((v) => Math.min(50, +(v + 0.1).toFixed(1))); bump(); }}>+0.1 mL (near end-point)</button>
              </section>
              <section className="bg-slate-900 text-emerald-50 rounded-2xl p-4 mono text-sm">
                pH = <strong>{pH.toFixed(2)}</strong> · phenolphthalein {pH >= 8.2 ? "PINK" : "colourless"}
              </section>
              <section className="bg-white rounded-2xl border p-4">
                <p className="text-sm mb-2">{challenge ? challenge.text : "Find the equivalence jump."}</p>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={startCh}>New challenge</button>
                  {challenge && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold min-h-[44px]" onClick={checkCh}>Check</button>}
                </div>
                {msg && <p className="text-xs mt-2">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const haberBody = `
    function App() {
      const canvasRef = useRef(null);
      const [T, setT] = useState(450);
      const [P, setP] = useState(200);
      const [cat, setCat] = useState(true);
      const [explore, setExplore] = useState(0);
      const [msg, setMsg] = useState("");
      // Compromise: yield ↑ with P and ↓ with T; rate ↑ with T and cat
      const yieldPct = useMemo(() => {
        const y = 90 * (1 - Math.exp(-P / 180)) * Math.exp(-(T - 200) / 420);
        return Math.max(5, Math.min(95, y));
      }, [T, P]);
      const rate = useMemo(() => (cat ? 1.8 : 0.4) * Math.exp((T - 300) / 200) * (P / 150), [T, P, cat]);
      const score = useMemo(() => yieldPct * 0.55 + Math.min(rate, 8) * 5, [yieldPct, rate]);

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        // reactor
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(40, 80, 280, 220);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 80, 280, 220);
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "bold 14px IBM Plex Sans";
        ctx.fillText("Haber reactor", 120, 70);
        ctx.fillText("Fe cat: " + (cat ? "ON" : "OFF"), 60, 110);
        ctx.fillText(T + " °C · " + P + " atm", 60, 135);
        // yield bar
        ctx.fillStyle = "#334155";
        ctx.fillRect(60, 180, 240, 28);
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(60, 180, 240 * (yieldPct / 100), 28);
        ctx.fillStyle = "#fff";
        ctx.fillText("Yield " + yieldPct.toFixed(0) + "%", 140, 200);
        // rate bar
        ctx.fillStyle = "#334155";
        ctx.fillRect(60, 230, 240, 28);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(60, 230, Math.min(240, rate * 28), 28);
        ctx.fillStyle = "#fff";
        ctx.fillText("Rate (a.u.) " + rate.toFixed(1), 130, 250);
        // compromise note
        ctx.fillStyle = "#fbbf24";
        ctx.font = "12px IBM Plex Sans";
        ctx.fillText("Industry compromise ≈ 400–450 °C, 150–300 atm, Fe catalyst", 40, 340);
        // gauge
        ctx.strokeStyle = "#64748b";
        ctx.beginPath();
        ctx.arc(480, 200, 80, Math.PI * 0.75, Math.PI * 2.25);
        ctx.stroke();
        const ang = Math.PI * 0.75 + (Math.min(score, 100) / 100) * Math.PI * 1.5;
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(480, 200);
        ctx.lineTo(480 + Math.cos(ang) * 70, 200 + Math.sin(ang) * 70);
        ctx.stroke();
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 12px IBM Plex Sans";
        ctx.fillText("Plant score", 448, 300);
      }, [T, P, cat, yieldPct, rate, score]);

      const bump = () => setExplore((e) => e + 1);

      return (
        <LabChrome titleEn="Haber Yield Plant" titleZh="哈柏法產率廠" blurb="Trade-off: high P raises yield; high T raises rate but lowers equilibrium yield — find the compromise." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-2xl border overflow-hidden">
              <canvas ref={canvasRef} width={640} height={380} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <label className="text-xs font-semibold">Temperature {T} °C</label>
                <input type="range" min="200" max="700" step="10" value={T} onChange={(e) => { setT(+e.target.value); bump(); }} />
                <label className="text-xs font-semibold mt-2 block">Pressure {P} atm</label>
                <input type="range" min="50" max="400" step="10" value={P} onChange={(e) => { setP(+e.target.value); bump(); }} />
                <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={cat} onChange={(e) => { setCat(e.target.checked); bump(); }} /> Iron catalyst
                </label>
                <button type="button" className="mt-3 w-full px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }}
                  onClick={() => { setT(450); setP(200); setCat(true); setMsg("Typical industrial compromise loaded."); bump(); }}>Load industry preset</button>
              </section>
              <section className="bg-slate-900 text-violet-50 rounded-2xl p-4 text-sm">
                Yield <strong>{yieldPct.toFixed(0)}%</strong> · Rate <strong>{rate.toFixed(1)}</strong>
                <p className="text-xs text-violet-200 mt-2">Exothermic: lower T favours NH₃ at eq, but too low → slow kinetics.</p>
                {msg && <p className="text-xs mt-2">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const organicBody = `
    const TESTS = [
      { id: "br2", label: "Br₂ / CCl₄", alkene: "decolourises", alkane: "no change", alcohol: "no change", acid: "no change" },
      { id: "kmno4", label: "Acidified KMnO₄", alkene: "decolourises (oxidation)", alkane: "no change", alcohol: "may oxidise 1°/2°", acid: "no change" },
      { id: "na", label: "Na metal", alkene: "no H₂", alkane: "no H₂", alcohol: "H₂ evolved", acid: "H₂ evolved" },
      { id: "na2co3", label: "Na₂CO₃", alkene: "no CO₂", alkane: "no CO₂", alcohol: "no CO₂", acid: "CO₂ effervescence" },
      { id: " tollens", label: "Tollens' (aldehyde)", alkene: "—", alkane: "—", alcohol: "— (not 1° oxidised here)", acid: "—" }
    ];
    const SAMPLES = [
      { id: "alkene", label: "Alkene (C=C)", colour: "#86efac" },
      { id: "alkane", label: "Alkane", colour: "#cbd5e1" },
      { id: "alcohol", label: "Alcohol (ROH)", colour: "#93c5fd" },
      { id: "acid", label: "Carboxylic acid", colour: "#fca5a5" }
    ];

    function App() {
      const canvasRef = useRef(null);
      const [sample, setSample] = useState("alkene");
      const [test, setTest] = useState("br2");
      const [ran, setRan] = useState(false);
      const [explore, setExplore] = useState(0);
      const [msg, setMsg] = useState("");
      const [quiz, setQuiz] = useState(null);
      const trow = TESTS.find((t) => t.id === test);
      const result = trow[sample];
      const samp = SAMPLES.find((s) => s.id === sample);

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, W, H);
        // test tube
        ctx.fillStyle = ran ? (result.includes("decolour") ? "#e2e8f0" : result.includes("CO₂") || result.includes("H₂") ? samp.colour : samp.colour) : samp.colour;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 40, 60);
        ctx.lineTo(W / 2 - 40, 280);
        ctx.quadraticCurveTo(W / 2, 320, W / 2 + 40, 280);
        ctx.lineTo(W / 2 + 40, 60);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 3;
        ctx.stroke();
        if (ran && (result.includes("CO₂") || result.includes("H₂"))) {
          for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.arc(W / 2 - 20 + Math.random() * 40, 100 + Math.random() * 120, 3, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.fill();
          }
        }
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 16px IBM Plex Sans";
        ctx.fillText(samp.label, 40, 50);
        ctx.font = "14px IBM Plex Sans";
        ctx.fillText("Reagent: " + trow.label, 40, 360);
        ctx.fillText(ran ? ("Observation: " + result) : "Press Run test", 40, 385);
      }, [sample, test, ran, result, samp, trow]);

      const bump = () => setExplore((e) => e + 1);
      const run = () => { setRan(true); bump(); };
      const startQuiz = () => {
        if (window.__HKC_FREE_CAP && window.__HKC_FREE_CAP()) { setMsg("Free limit."); return; }
        if (window.HkcSubscribe) HkcSubscribe.recordDrillAttempt();
        setQuiz({ text: "Which sample gives CO₂ with Na₂CO₃?", answer: "acid" });
        setMsg("Select sample + Na₂CO₃, Run, then Check.");
        setRan(false);
      };
      const checkQuiz = () => {
        if (!quiz) return;
        if (sample === "acid" && test === "na2co3" && ran) { setMsg("✓ Acids liberate CO₂; alcohols do not with carbonate."); setQuiz(null); }
        else setMsg("Need carboxylic acid + Na₂CO₃ + Run.");
      };

      return (
        <LabChrome titleEn="Organic Functional Group Lab" titleZh="有機官能基檢驗" blurb="Pick unknown class · choose reagent · observe decolourisation / gas — classic HKDSE FG tests." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white rounded-2xl border overflow-hidden">
              <canvas ref={canvasRef} width={640} height={400} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <h2 className="font-bold text-sm mb-2" style={{ color: ACCENT }}>Sample</h2>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLES.map((s) => (
                    <button key={s.id} type="button" className={"px-2 py-2 rounded-lg text-xs font-semibold min-h-[44px] " + (sample === s.id ? "text-white" : "bg-slate-100")}
                      style={sample === s.id ? { background: ACCENT } : {}} onClick={() => { setSample(s.id); setRan(false); bump(); }}>{s.label}</button>
                  ))}
                </div>
                <h2 className="font-bold text-sm mt-3 mb-2">Test</h2>
                <select className="w-full border rounded-lg p-2 min-h-[44px]" value={test} onChange={(e) => { setTest(e.target.value); setRan(false); bump(); }}>
                  {TESTS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
                <button type="button" className="mt-3 w-full px-3 py-2 text-white rounded-lg text-sm font-semibold min-h-[44px]" style={{ background: ACCENT }} onClick={run}>Run test</button>
              </section>
              <section className="bg-white rounded-2xl border p-4">
                <p className="text-sm mb-2">{quiz ? quiz.text : "Quiz: identify FG by test pattern."}</p>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-2 border rounded-lg text-sm min-h-[44px]" onClick={startQuiz}>New quiz</button>
                  {quiz && <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm min-h-[44px]" onClick={checkQuiz}>Check</button>}
                </div>
                {msg && <p className="text-xs mt-2">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const polymerBody = `
    const MONOMERS = [
      { id: "ethene", label: "Ethene", type: "addition", unit: "–CH₂–CH₂–" },
      { id: "propene", label: "Propene", type: "addition", unit: "–CH₂–CH(CH₃)–" },
      { id: "chloroethene", label: "Chloroethene (PVC)", type: "addition", unit: "–CH₂–CHCl–" },
      { id: "diol_diacid", label: "HO–R–OH + HOOC–R'–COOH", type: "condensation", unit: "polyester (–COO–) + H₂O" }
    ];

    function App() {
      const canvasRef = useRef(null);
      const [mid, setMid] = useState("ethene");
      const [n, setN] = useState(8);
      const [playing, setPlaying] = useState(true);
      const [explore, setExplore] = useState(0);
      const [msg, setMsg] = useState("");
      const mon = MONOMERS.find((m) => m.id === mid);
      const progress = useRef(0);

      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        let raf;
        const draw = () => {
          if (playing) progress.current = Math.min(n, progress.current + 0.04);
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, W, H);
          const shown = Math.floor(progress.current);
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "bold 14px IBM Plex Sans";
          ctx.fillText(mon.type === "addition" ? "Addition polymerisation" : "Condensation polymerisation", 30, 40);
          ctx.font = "12px IBM Plex Sans";
          ctx.fillText(mon.label + " → " + mon.unit, 30, 62);
          // chain
          for (let i = 0; i < shown; i++) {
            const x = 40 + (i % 10) * 56;
            const y = 120 + Math.floor(i / 10) * 70;
            ctx.fillStyle = mon.type === "addition" ? "#38bdf8" : "#f472b6";
            ctx.fillRect(x, y, 48, 36);
            ctx.strokeStyle = "#e2e8f0";
            ctx.strokeRect(x, y, 48, 36);
            if (i < shown - 1 && (i % 10) < 9) {
              ctx.beginPath();
              ctx.moveTo(x + 48, y + 18);
              ctx.lineTo(x + 56, y + 18);
              ctx.stroke();
            }
            ctx.fillStyle = "#0f172a";
            ctx.font = "9px JetBrains Mono";
            ctx.fillText("mer", x + 12, y + 22);
          }
          if (mon.type === "condensation" && shown > 0) {
            ctx.fillStyle = "#94a3b8";
            ctx.fillText("H₂O lost × " + Math.max(0, shown - 1), 30, H - 30);
          } else {
            ctx.fillStyle = "#94a3b8";
            ctx.fillText("No small molecule lost (addition)", 30, H - 30);
          }
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
      }, [mid, n, playing, mon]);

      useEffect(() => { progress.current = 0; }, [mid, n]);

      const bump = () => setExplore((e) => e + 1);

      return (
        <LabChrome titleEn="Polymerisation Studio" titleZh="聚合反應工作室" blurb="Watch chain grow · contrast addition (C=C) vs condensation (H₂O lost)." explore={explore}>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border">
              <canvas ref={canvasRef} width={640} height={360} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <section className="bg-white rounded-2xl border p-4">
                <h2 className="font-bold text-sm mb-2" style={{ color: ACCENT }}>Monomer</h2>
                {MONOMERS.map((m) => (
                  <button key={m.id} type="button" className={"block w-full text-left px-3 py-2 rounded-lg text-sm mb-1 min-h-[40px] " + (mid === m.id ? "text-white" : "bg-slate-100")}
                    style={mid === m.id ? { background: ACCENT } : {}} onClick={() => { setMid(m.id); bump(); }}>{m.label} · {m.type}</button>
                ))}
                <label className="text-xs font-semibold mt-2 block">Chain length n ≈ {n}</label>
                <input type="range" min="4" max="24" value={n} onChange={(e) => { setN(+e.target.value); bump(); }} />
                <button type="button" className="mt-2 w-full border rounded-lg py-2 text-sm min-h-[44px]" onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play"}</button>
              </section>
              <section className="bg-slate-900 text-pink-50 rounded-2xl p-4 text-sm">
                Repeating unit: <span className="mono">{mon.unit}</span>
                <button type="button" className="block mt-2 text-xs underline" onClick={() => setMsg(mon.type === "addition" ? "Open C=C; draw brackets with n." : "Each link loses H₂O (or HCl).")}>Exam tip</button>
                {msg && <p className="text-xs mt-1">{msg}</p>}
              </section>
            </div>
          </div>
        </LabChrome>
      );
    }
`;

const APPS = [
  {
    rel: path.join("Form 5", "04_Electrolysis_Sandbox"),
    meta: { appId: "f5-chem-electrolysis-lab", titleEn: "Electrolysis Sandbox", titleZh: "電解沙盒", level: "F5", accent: "#4f46e5" },
    body: electrolysisBody
  },
  {
    rel: path.join("Form 5", "03_Cell_Builder"),
    meta: { appId: "f5-chem-cell-builder-lab", titleEn: "Electrochemical Cell Builder", titleZh: "化學電池組裝", level: "F5", accent: "#d97706" },
    body: cellBuilderBody
  },
  {
    rel: path.join("Form 5", "05_Hess_Cycle"),
    meta: { appId: "f5-chem-hess-lab", titleEn: "Hess Cycle Lab", titleZh: "蓋斯定律實驗", level: "F5", accent: "#e11d48" },
    body: hessBody
  },
  {
    rel: path.join("Form 5", "06_Buffer_Systems"),
    meta: { appId: "f5-chem-buffer-lab", titleEn: "Buffer Systems Lab", titleZh: "緩衝溶液實驗", level: "F5", accent: "#0d9488" },
    body: bufferBody
  },
  {
    rel: path.join("Form 6", "01_Le_Chatelier"),
    meta: { appId: "f6-chem-lechatelier-lab", titleEn: "Le Chatelier Chamber", titleZh: "勒夏特列平衡室", level: "F6", accent: "#0891b2" },
    body: leChatBody
  },
  {
    rel: path.join("Form 6", "02_Titration_Curve"),
    meta: { appId: "f6-chem-titration-lab", titleEn: "Titration Curve Lab", titleZh: "滴定曲線實驗", level: "F6", accent: "#16a34a" },
    body: titrationBody
  },
  {
    rel: path.join("Form 6", "04_Haber_Yield"),
    meta: { appId: "f6-chem-haber-lab", titleEn: "Haber Yield Plant", titleZh: "哈柏法產率廠", level: "F6", accent: "#7c3aed" },
    body: haberBody
  },
  {
    rel: path.join("Form 6", "03_Organic_FG_Lab"),
    meta: { appId: "f6-chem-organic-fg-lab", titleEn: "Organic Functional Group Lab", titleZh: "有機官能基檢驗", level: "F6", accent: "#ea580c" },
    body: organicBody
  },
  {
    rel: path.join("Form 6", "08_Polymer_Addition"),
    meta: { appId: "f6-chem-polymer-lab", titleEn: "Polymerisation Studio", titleZh: "聚合反應工作室", level: "F6", accent: "#db2777" },
    body: polymerBody
  }
];

function archiveAndWrite(app) {
  const dir = path.join(ROOT, app.rel);
  fs.mkdirSync(dir, { recursive: true });
  const idx = path.join(dir, "index.html");
  const legacy = path.join(dir, "_legacy_lger.html");
  if (fs.existsSync(idx) && !fs.existsSync(legacy)) {
    fs.copyFileSync(idx, legacy);
    console.log("archived", app.rel);
  } else if (fs.existsSync(idx) && fs.existsSync(legacy)) {
    console.log("legacy exists", app.rel);
  }
  const html = shell(app.meta, app.body);
  fs.writeFileSync(idx, html, "utf8");
  console.log("wrote", app.rel, html.length);
}

function patchFormHub(formRel, cards) {
  const hub = path.join(ROOT, formRel, "index.html");
  const badge = formRel.includes("5")
    ? `<span class="badge">Interactive Lab</span>`
    : `<span class="badge" style="display:inline-block;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;background:#0d9488;color:#fff;padding:.15rem .45rem;border-radius:4px;margin-bottom:.35rem;">Interactive Lab</span>`;
  const styleExtra = formRel.includes("6")
    ? `
    .badge { display:inline-block; font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; background:#0d9488; color:#fff; padding:.15rem .45rem; border-radius:4px; margin-bottom:.35rem; }
`
    : "";
  let html = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${formRel} Chemistry</title>
  <style>
    body { margin:0; font-family:"Segoe UI","Noto Sans HK",sans-serif; background:#f8fafc; color:#0f172a; }
    header { padding:2rem 1.25rem 1rem; max-width:1100px; margin:0 auto; }
    a.back { color:#2563eb; text-decoration:none; }
    h1 { margin:.6rem 0; }
    main { max-width:1100px; margin:0 auto; padding:0 1.25rem 3rem; display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); }
    .card { display:block; background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:1.1rem; text-decoration:none; color:inherit; }
    .card:hover { box-shadow:0 8px 24px rgba(0,0,0,.08); }
    .meta { color:#64748b; font-size:.82rem; }
    .badge { display:inline-block; font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; background:#7c3aed; color:#fff; padding:.15rem .45rem; border-radius:4px; margin-bottom:.35rem; }
${styleExtra}  </style>
</head>
<body>
  <header>
    <a class="back" href="../index.html">← Chemistry hub</a>
    <h1>${formRel.replace("Form ", "F")} · Chemistry</h1>
    <p>HKDSE Interactive Labs first · LGER archived as _legacy_lger.html</p>
  </header>
  <main>
${cards.join("\\n")}
</main>
</body>
</html>
`;
  // fix accidental escape
  html = html.replace(/\\n/g, "\n");
  fs.writeFileSync(hub, html, "utf8");
  console.log("hub", formRel);
}

function card(href, title, meta, lab) {
  return `        <a class="card" href="${href}">
          ${lab ? '<span class="badge">Interactive Lab</span>' : ""}
          <h3>${title}</h3>
          <p class="meta">${meta}</p>
        </a>`;
}

APPS.forEach(archiveAndWrite);

patchFormHub("Form 5", [
  card("01_Rates_Collision/index.html", "Rate &amp; Collision Theory", "Particle chamber · T / conc / Ea · <code>01_Rates_Collision</code>", true),
  card("03_Cell_Builder/index.html", "Electrochemical Cell Builder", "E°cell live · electron flow · <code>03_Cell_Builder</code>", true),
  card("04_Electrolysis_Sandbox/index.html", "Electrolysis Sandbox", "Preferential discharge · Faraday · <code>04_Electrolysis_Sandbox</code>", true),
  card("05_Hess_Cycle/index.html", "Hess Cycle Lab", "Path ΣΔH = target · <code>05_Hess_Cycle</code>", true),
  card("06_Buffer_Systems/index.html", "Buffer Systems Lab", "Henderson–Hasselbalch · challenge · <code>06_Buffer_Systems</code>", true),
  card("09_Chemical_Equilibrium_Kc/index.html", "Equilibrium Kc", "Drill · III Equilibrium · <code>09_Chemical_Equilibrium_Kc</code>", false),
  card("10_Buffer_Solutions/index.html", "Buffer Solutions (Drill)", "LGER drill · <code>10_Buffer_Solutions</code>", false),
  card("11_Entropy_Spontaneity/index.html", "Entropy &amp; Spontaneity", "LGER · <code>11_Entropy_Spontaneity</code>", false),
  card("02_Redox_Electrolysis/index.html", "Redox &amp; Electrolysis (Drill)", "LGER · see Cell + Electrolysis labs · <code>02_Redox_Electrolysis</code>", false),
  card("07_Solubility_Product/index.html", "Solubility Product", "LGER · <code>07_Solubility_Product</code>", false)
]);

patchFormHub("Form 6", [
  card("01_Le_Chatelier/index.html", "Le Chatelier Chamber", "Q vs K · T/P stress · <code>01_Le_Chatelier</code>", true),
  card("02_Titration_Curve/index.html", "Titration Curve Lab", "Live pH curve · indicator · <code>02_Titration_Curve</code>", true),
  card("03_Organic_FG_Lab/index.html", "Organic FG Lab", "Classic tests · observations · <code>03_Organic_FG_Lab</code>", true),
  card("04_Haber_Yield/index.html", "Haber Yield Plant", "Yield vs rate compromise · <code>04_Haber_Yield</code>", true),
  card("08_Polymer_Addition/index.html", "Polymerisation Studio", "Addition vs condensation · <code>08_Polymer_Addition</code>", true),
  card("11_Benzene_Aromatic/index.html", "Benzene &amp; Aromatic", "LGER · <code>11_Benzene_Aromatic</code>", false),
  card("12_Polymer_Chemistry/index.html", "Polymer Chemistry (Drill)", "LGER · <code>12_Polymer_Chemistry</code>", false),
  card("13_Analytical_Chemistry/index.html", "Analytical Chemistry Basics", "LGER · <code>13_Analytical_Chemistry</code>", false),
  card("05_Paper_Timing_Strategy/index.html", "Paper Timing Strategy", "Exam skills drill · <code>05_Paper_Timing_Strategy</code>", false),
  card("06_Command_Words_Drill/index.html", "Command Words Drill", "Exam skills · <code>06_Command_Words_Drill</code>", false),
  card("07_Data_Response_ECF/index.html", "Data Response ECF", "Exam skills · <code>07_Data_Response_ECF</code>", false)
]);

console.log("DONE", APPS.length, "labs");
