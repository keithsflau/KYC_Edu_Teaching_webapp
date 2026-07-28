module.exports = {
  out: "c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/Secondary_School/Physics/Form 5/01_EMF_Internal_R/index.html",
  level: "F5", appId: "f5-phy-emf", appConst: "f5_phy_emf",
  nameEn: "EMF & Internal Resistance", nameZh: "電動勢與內阻",
  subject: "Physics", subjectLine: "F5 Physics · Electricity — EMF & Internal Resistance",
  accent: "#ca8a04", labTitle: "EMF vs Terminal Voltage Sandbox · 電動勢與端電壓沙盤", simName: "EmfSim",
  tfz: `[
      { id: "A1", title: "EMF: the energy source", titleZh: "電動勢:能量之源",
        body: "A cell's EMF (E) is the energy it gives to EACH COULOMB of charge. A 6 V cell hands 6 J to every coulomb that passes through it. EMF is measured in volts but it is NOT the voltage you always measure outside.",
        bodyZh: "電動勢 E 是電池給予每庫侖電荷的能量。6 V 電池給每庫侖 6 J。EMF 以伏特計,但它不等於你經常量到的外電壓。",
        q: "EMF is energy per…", qZh: "電動勢是每甚麼的能量?",
        opts: ["Coulomb of charge 庫侖電荷", "Second 秒", "Ohm 歐姆"], a: "Coulomb of charge 庫侖電荷",
        why: "E = energy/Q — joules per coulomb = volts." },
      { id: "A2", title: "The cell is not perfect: internal resistance", titleZh: "電池並非完美:內阻",
        body: "Real cells have resistance INSIDE them — the chemicals and plates oppose the flow. We model it as a small resistor r in series with an ideal EMF source. You cannot remove it; it comes with the cell.",
        bodyZh: "真實電池內部有電阻 r(化學物與極板阻礙電流)。模型:理想 EMF 串聯小電阻 r,不能拆掉。",
        q: "Internal resistance is modelled as a resistor…", qZh: "內阻在模型中是一個…",
        opts: ["In series inside the cell 串聯在電池內", "In parallel 並聯", "Outside the circuit 電路外"], a: "In series inside the cell 串聯在電池內",
        why: "The same current passes through the cell, so r is in series with E." },
      { id: "A3", title: "Terminal voltage: V = E − Ir", titleZh: "端電壓:V = E − Ir",
        body: "When current I flows, some voltage is 'lost' across the internal resistance (Ir). What remains for the outside circuit is the TERMINAL voltage: V = E − Ir. More current → more lost volts → lower V.",
        bodyZh: "有電流時,內阻吃掉 Ir 伏特。外電路得到的端電壓 V = E − Ir。電流越大,損耗越大,V 越低。",
        q: "If current increases, terminal voltage…", qZh: "電流增加時,端電壓…",
        opts: ["Decreases 下降", "Increases 上升", "Stays at E 保持為 E"], a: "Decreases 下降",
        why: "V = E − Ir: bigger I means bigger Ir loss." },
      { id: "A4", title: "Where the 'lost volts' go", titleZh: "「損耗電壓」去了哪裡?",
        body: "The Ir drop heats the CELL itself. That is why a battery gets warm when you demand large currents — energy is wasted inside before it reaches your circuit.",
        bodyZh: "Ir 損耗令電池本身發熱。大電流時電池發燙,因為能量在到達電路前已在內部浪費。",
        q: "The lost volts (Ir) become…", qZh: "損耗的 Ir 變成…",
        opts: ["Heat inside the cell 電池內的熱", "Light 光", "Extra current 額外電流"], a: "Heat inside the cell 電池內的熱",
        why: "P = I²r dissipates inside the cell." },
      { id: "A5", title: "Measuring E: open the switch", titleZh: "量度 E:斷開電路",
        body: "With the switch OPEN, I = 0, so Ir = 0 and V = E. A voltmeter across an open cell reads the true EMF. This is the only honest way to measure E directly.",
        bodyZh: "開關斷開時 I = 0,Ir = 0,V = E。跨接電池的電壓表此時讀到真正的 EMF,這是唯一直接量 E 的方法。",
        q: "A voltmeter reads true EMF when…", qZh: "電壓表何時讀到真正 EMF?",
        opts: ["No current flows (I = 0) 無電流時", "Current is maximum 電流最大時", "R is zero R 為零時"], a: "No current flows (I = 0) 無電流時",
        why: "V = E − Ir; with I = 0 the lost volts vanish." },
      { id: "A6", title: "Finding r: the V–I graph", titleZh: "求 r:V–I 圖",
        body: "Vary R, record V and I. Since V = E − Ir is a STRAIGHT LINE: y-intercept = E, gradient = −r. One graph gives you both constants of the cell. This is the classic DSE experiment.",
        bodyZh: "改變 R,記錄 V 與 I。V = E − Ir 是直線:y 截距 = E,斜率 = −r。一圖得兩常數,是 DSE 經典實驗。",
        q: "In a V against I graph for a cell, the gradient equals…", qZh: "電池 V 對 I 圖的斜率等於…",
        opts: ["−r (negative internal resistance) 負內阻", "+E", "−R"], a: "−r (negative internal resistance) 負內阻",
        why: "V = E − Ir has slope −r. Steeper slope = older/drier cell with bigger r." },
      { id: "A7", title: "Useful vs wasted power", titleZh: "有用與浪費功率",
        body: "Power delivered to the load is I²R; power wasted inside is I²r. Efficiency = R/(R + r). Maximum power transfers to the load when R = r — but efficiency is then only 50%.",
        bodyZh: "負載功率 I²R,內部浪費 I²r。效率 = R/(R + r)。當 R = r 時負載功率最大,但效率只有 50%。",
        q: "For maximum efficiency, the load R should be…", qZh: "要效率最高,負載 R 應該…",
        opts: ["Much larger than r 遠大於 r", "Equal to r 等於 r", "Zero 零"], a: "Much larger than r 遠大於 r",
        why: "Efficiency = R/(R+r) → 100% as R/r → ∞. (Max POWER is at R = r, different question.)" },
      { id: "A8", title: "Checkpoint: the short circuit", titleZh: "檢查點:短路危機",
        body: "Set R → 0 in the lab. Current shoots to I = E/r — limited ONLY by internal resistance. Thin wires + big current = fire risk. This is why short circuits are dangerous and why car batteries (tiny r) can deliver hundreds of amps.",
        bodyZh: "實驗中把 R 調到近零:電流飆升至 E/r,只受內阻限制。短路危險正在於此;汽車電池 r 極小,可輸出數百安培。",
        q: "Short-circuit current is limited by…", qZh: "短路電流受甚麼限制?",
        opts: ["Internal resistance r 內阻", "EMF alone 只有 EMF", "Wire length 導線長度"], a: "Internal resistance r 內阻",
        why: "I_max = E/r. Small r means huge current." }
    ]`,
  sim: `
    function EmfSim() {
      const [E, setE] = useState(6);
      const [r, setRInt] = useState(2);
      const [R, setR] = useState(10);
      const [closed, setClosed] = useState(true);
      const [sweepPts, setSweepPts] = useState([]);
      const cv = useRef(null), gv = useRef(null);
      const S = useRef({ dots: [], sweep: null });

      const I = closed ? E / (R + r) : 0;
      const V = closed ? E - I * r : E;
      const Pload = I * I * R, Plost = I * I * r;

      function startSweep() {
        setSweepPts([]);
        S.current.sweep = { R: 50 };
      }

      useEffect(() => {
        let raf, last = performance.now();
        function frame(now) {
          const dt = Math.min(0.05, (now - last) / 1000); last = now;
          const sw = S.current.sweep;
          if (sw) {
            sw.R -= dt * 18;
            if (sw.R <= 1) { S.current.sweep = null; }
            else {
              const iR = Math.max(1, Math.round(sw.R));
              const iI = E / (iR + r);
              setSweepPts(p => (p.length && p[p.length - 1].R === iR) ? p : [...p, { R: iR, I: iI, V: E - iI * r }]);
            }
          }
          drawAll();
          raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
      });

      function drawAll() {
        const c = cv.current, g = gv.current;
        if (c) drawCircuit(c.getContext("2d"));
        if (g) drawGraph(g.getContext("2d"));
      }
      function drawCircuit(ctx) {
        ctx.clearRect(0, 0, 360, 360);
        ctx.fillStyle = "#fffbeb"; ctx.fillRect(0, 0, 360, 360);
        ctx.strokeStyle = "#334155"; ctx.lineWidth = 3;
        ctx.strokeRect(40, 60, 280, 240);
        ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(52, 150); ctx.lineTo(76, 150); ctx.moveTo(58, 168); ctx.lineTo(70, 168); ctx.stroke();
        ctx.font = "bold 12px IBM Plex Sans"; ctx.fillStyle = "#0f172a";
        ctx.fillText("E=" + E.toFixed(1) + "V", 22, 140);
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = "#ca8a04"; ctx.strokeRect(28, 120, 64, 66);
        ctx.setLineDash([]);
        ctx.fillStyle = "#ca8a04"; ctx.font = "11px IBM Plex Sans";
        ctx.fillText("cell + r=" + r.toFixed(1) + "Ω", 24, 112);
        ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(64, 186);
        for (let k = 0; k < 6; k++) ctx.lineTo(64 + (k + 0.5) * 6, 186 + (k % 2 ? 6 : -6));
        ctx.lineTo(100, 186); ctx.stroke();
        ctx.strokeStyle = "#0f172a";
        ctx.beginPath(); ctx.moveTo(180, 60);
        for (let k = 0; k < 6; k++) ctx.lineTo(180 + (k + 0.5) * 10, 60 + (k % 2 ? 8 : -8));
        ctx.lineTo(240, 60); ctx.stroke();
        ctx.fillStyle = "#0f172a"; ctx.font = "bold 13px IBM Plex Sans";
        ctx.fillText("R = " + R + " Ω (load 負載)", 168, 40);
        ctx.fillStyle = "#64748b"; ctx.font = "12px IBM Plex Sans";
        ctx.fillText("P = " + Pload.toFixed(1) + " W useful", 176, 92);
        ctx.strokeStyle = "#0284c8"; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(320, 180, 16, 0, 7); ctx.stroke();
        ctx.fillStyle = "#0284c8"; ctx.font = "bold 14px IBM Plex Sans"; ctx.fillText("A", 315, 185);
        ctx.strokeStyle = "#16a34a";
        ctx.beginPath(); ctx.arc(210, 300, 16, 0, 7); ctx.stroke();
        ctx.fillStyle = "#16a34a"; ctx.fillText("V", 205, 305);
        ctx.setLineDash([3, 3]); ctx.strokeStyle = "#16a34a";
        ctx.beginPath(); ctx.moveTo(194, 292); ctx.lineTo(180, 60); ctx.moveTo(226, 292); ctx.lineTo(240, 60); ctx.stroke();
        ctx.setLineDash([]);
        if (closed) {
          if (!S.current.dots.length) for (let k = 0; k < 14; k++) S.current.dots.push(Math.random());
          const L = 2 * (280 + 240);
          ctx.fillStyle = "#0284c8";
          S.current.dots = S.current.dots.map(d => (d + (I * 60 * 0.016) / L) % 1);
          S.current.dots.forEach(d => {
            const per = [[40, 60, 320, 60], [320, 60, 320, 300], [320, 300, 40, 300], [40, 300, 40, 60]];
            let s = d * L;
            for (const [x1, y1, x2, y2] of per) {
              const seg = Math.hypot(x2 - x1, y2 - y1);
              if (s <= seg) { ctx.beginPath(); ctx.arc(x1 + (x2 - x1) * s / seg, y1 + (y2 - y1) * s / seg, 3.5, 0, 7); ctx.fill(); break; }
              s -= seg;
            }
          });
        } else {
          ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(180, 300); ctx.lineTo(206, 284); ctx.stroke();
          ctx.fillStyle = "#dc2626"; ctx.font = "12px IBM Plex Sans"; ctx.fillText("switch OPEN", 220, 330);
        }
        ctx.fillStyle = "#b45309"; ctx.font = "12px IBM Plex Sans";
        ctx.fillText("lost volts Ir = " + (I * r).toFixed(2) + " V → heat in cell 電池發熱 " + Plost.toFixed(1) + " W", 30, 348);
      }
      function drawGraph(ctx) {
        ctx.clearRect(0, 0, 348, 360);
        ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, 348, 360);
        const ox = 40, oy = 30, gw = 280, gh = 280;
        ctx.strokeStyle = "#475569"; ctx.lineWidth = 1; ctx.strokeRect(ox, oy, gw, gh);
        const Imax = E / r, Vmax = Math.max(E, 1);
        ctx.fillStyle = "#94a3b8"; ctx.font = "11px IBM Plex Sans";
        ctx.fillText("V (V)", 6, oy + 6); ctx.fillText("I (A) →", ox + gw - 40, oy + gh + 22);
        ctx.fillText("V–I characteristic 端電壓對電流", ox + 8, oy + 14);
        ctx.strokeStyle = "#fbbf24"; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(ox, oy + gh - (Vmax / Vmax) * 0 + (gh - (E / Vmax) * gh));
        ctx.lineTo(ox + gw, oy + gh - ((E - (E / r) * r) / Vmax) * gh);
        ctx.stroke();
        ctx.fillStyle = "#fbbf24"; ctx.font = "bold 11px IBM Plex Sans";
        ctx.fillText("E = " + E.toFixed(1) + " V (intercept 截距)", ox + 4, oy + gh - (E / Vmax) * gh - 6);
        ctx.fillText("slope 斜率 = −r = −" + r.toFixed(1) + " Ω", ox + gw - 150, oy + 30);
        ctx.fillStyle = "#22d3ee";
        sweepPts.forEach(p => {
          ctx.beginPath(); ctx.arc(ox + (p.I / Imax) * gw, oy + gh - (p.V / Vmax) * gh, 3, 0, 7); ctx.fill();
        });
        if (closed) {
          ctx.fillStyle = "#f472b6"; ctx.beginPath();
          ctx.arc(ox + (I / Imax) * gw, oy + gh - (V / Vmax) * gh, 6, 0, 7); ctx.fill();
          ctx.font = "11px IBM Plex Sans";
          ctx.fillText("operating point 工作點", Math.min(ox + (I / Imax) * gw + 8, 200), oy + gh - (V / Vmax) * gh - 8);
        }
      }
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <button type="button" onClick={() => setClosed(c => !c)} className={"px-3 py-2 rounded-xl text-sm font-semibold min-h-[44px] border " + (closed ? "bg-emerald-600 text-white border-emerald-600" : "bg-rose-600 text-white border-rose-600")}>
              {closed ? "Switch: CLOSED 閉合" : "Switch: OPEN 斷開 (measures true E)"}</button>
            <button type="button" onClick={startSweep} className="px-3 py-2 rounded-xl text-sm font-semibold text-white min-h-[44px]" style={{background: ACCENT}}>▶ Run R-sweep 掃描負載 (50→1 Ω)</button>
            <button type="button" onClick={() => setSweepPts([])} className="px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 min-h-[44px]">Clear data 清除數據</button>
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <canvas ref={cv} className="sim" width="360" height="360" />
            <canvas ref={gv} className="sim" width="348" height="360" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">EMF E · {E.toFixed(1)} V
              <input type="range" min="1.5" max="12" step="0.5" value={E} onChange={e => setE(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Internal r 內阻 · {r.toFixed(1)} Ω
              <input type="range" min="0.5" max="5" step="0.5" value={r} onChange={e => setRInt(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Load R 負載 · {R} Ω
              <input type="range" min="1" max="50" step="1" value={R} onChange={e => setR(+e.target.value)} className="w-full mt-2" /></label>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 font-bold">I = {I.toFixed(2)} A</span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Terminal V = {V.toFixed(2)} V</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold">Lost Ir = {(I * r).toFixed(2)} V</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold">Efficiency 效率 = {closed ? (100 * R / (R + r)).toFixed(0) : "—"}%</span>
          </div>
        </div>
      );
    }`,
  guided: `[
      { id: "g1", level: 1, q: "A cell has EMF 6 V and internal resistance 0.5 Ω. With switch OPEN, the voltmeter reads…", qZh: "電池 EMF 6 V、內阻 0.5 Ω,開關斷開時電壓表讀數為…",
        opts: ["6 V", "0 V", "3 V", "5.5 V"], a: "6 V",
        hint: "Open circuit → I = 0 → no lost volts → V = E. 斷路時 Ir = 0。" },
      { id: "g2", level: 1, q: "Terminal voltage equals…", qZh: "端電壓等於…",
        opts: ["E − Ir", "E + Ir", "Ir only", "E only"], a: "E − Ir",
        hint: "The cell loses Ir inside before delivering V outside. 內阻先吃掉 Ir。" },
      { id: "g3", level: 1, q: "When you demand MORE current from a battery, its terminal voltage…", qZh: "從電池抽取更大電流時,端電壓…",
        opts: ["Falls 下降", "Rises 上升", "Stays at E 不變"], a: "Falls 下降",
        hint: "V = E − Ir. Bigger I → bigger lost volts. 電流大,損耗大。" },
      { id: "g4", level: 2, q: "E = 12 V, r = 1 Ω, load R = 5 Ω. Circuit current?", qZh: "E = 12 V、r = 1 Ω、負載 R = 5 Ω,電流?",
        opts: ["2 A", "2.4 A", "12 A", "1.7 A"], a: "2 A",
        hint: "I = E/(R + r) = 12/6. 內阻與負載串聯。" },
      { id: "g5", level: 2, q: "Same cell (E = 12 V, r = 1 Ω) with R = 5 Ω. Terminal voltage?", qZh: "同上電池接 R = 5 Ω,端電壓?",
        opts: ["10 V", "12 V", "2 V", "11 V"], a: "10 V",
        hint: "V = E − Ir = 12 − 2×1, or V = IR = 2×5. 兩個方法都對。" },
      { id: "g6", level: 2, q: "In a V–I graph for a cell, the y-intercept and gradient give…", qZh: "電池 V–I 圖中,y 截距與斜率分別是…",
        opts: ["E and −r", "r and −E", "I and R", "E and R"], a: "E and −r",
        hint: "V = E − Ir: compare y = c + mx. 對照直線方程。" }
    ]`,
  exam: `[
      { id: "e1", level: 3, q: "A battery of EMF 12 V delivers 3 A to a 3 Ω load. Terminal voltage and internal resistance?", qZh: "EMF 12 V 的電池向 3 Ω 負載輸出 3 A,端電壓與內阻各為多少?",
        opts: ["9 V, 1 Ω", "12 V, 0 Ω", "10.5 V, 0.5 Ω", "9 V, 3 Ω"], a: "9 V, 1 Ω",
        hint: "V = IR = 3×3 = 9 V, then r = (E − V)/I = (12−9)/3. 先由負載求 V,再求 r。" },
      { id: "e2", level: 3, q: "A V–I experiment gives intercept 9.0 V and gradient −2.0 V/A. Short-circuit current?", qZh: "V–I 實驗得截距 9.0 V、斜率 −2.0 V/A,短路電流?",
        opts: ["4.5 A", "9 A", "2 A", "18 A"], a: "4.5 A",
        hint: "I_max = E/r = 9/2. 短路時全部 E 跨在 r 上。" },
      { id: "e3", level: 3, q: "Why does a phone battery's voltage sag when the phone works hard?", qZh: "手機高負載時電池電壓下跌,為甚麼?",
        opts: ["Large I increases the Ir drop inside 大電流令內部 Ir 損耗增大", "EMF decreases with use EMF 會減少", "R of phone increases 手機電阻變大", "Charge escapes 電荷流失"], a: "Large I increases the Ir drop inside 大電流令內部 Ir 損耗增大",
        hint: "E stays constant; V = E − Ir sags as I rises. EMF 不變,端電壓變。" },
      { id: "e4", level: 4, q: "Load R dissipates maximum power when…", qZh: "負載 R 何時獲得最大功率?",
        opts: ["R = r", "R = 0", "R → ∞", "R = 2r"], a: "R = r",
        hint: "P = E²R/(R+r)² — differentiate or test R = r. 最大功率傳輸定理。(效率卻只有 50%!)" },
      { id: "e5", level: 4, q: "Two identical cells (E = 1.5 V, r = 0.5 Ω each) in SERIES powering a 2 Ω load. Current?", qZh: "兩枚相同電池(各 E = 1.5 V、r = 0.5 Ω)串聯接 2 Ω 負載,電流?",
        opts: ["1 A", "0.75 A", "1.5 A", "3 A"], a: "1 A",
        hint: "EMFs add: 3 V; internal r adds: 1 Ω; I = 3/(2+1). 串聯 E 與 r 皆相加。" },
      { id: "e6", level: 4, q: "An old battery still reads 1.5 V on a voltmeter but cannot light a bulb. Why?", qZh: "舊電池用電壓表量仍有 1.5 V,卻點不亮燈泡。為甚麼?",
        opts: ["Its internal resistance has grown huge 內阻變得極大", "Its EMF is fake EMF 是假的", "The bulb is broken 燈泡壞了", "Voltmeters lie 電壓表不準"], a: "Its internal resistance has grown huge 內阻變得極大",
        hint: "Voltmeter draws ~0 A so reads E; under load I = E/(R+r) collapses when r is huge. 空載量到 E,帶載即崩。" }
    ]`
};
