module.exports = {
  out: "c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/Secondary_School/Biology/Form 4/01_Cell_Transport/index.html",
  level: "F4", appId: "f4-bio-transport", appConst: "f4_bio_transport",
  nameEn: "Membrane Transport Lab", nameZh: "細胞膜運輸實驗室",
  subject: "Biology", subjectLine: "F4 Biology · Cells & Membranes",
  accent: "#0284c8", labTitle: "Semi-permeable Membrane Sandbox · 半透膜沙盤", simName: "TransportSim",
  tfz: `[
      { id: "A1", title: "The membrane is a selective border", titleZh: "細胞膜是選擇性邊界",
        body: "Every cell is wrapped in a selectively (partially) permeable membrane. Small molecules like water and oxygen pass freely; big molecules like sucrose are blocked. The cell controls what enters and leaves.",
        bodyZh: "每個細胞被選擇性(部分)透膜包圍。水、氧氣等小分子自由通過;蔗糖等大分子被擋。細胞藉此控制物質進出。",
        q: "'Selectively permeable' means the membrane…", qZh: "「選擇性透膜」指膜…",
        opts: ["Lets some substances through but not others 讓部分物質通過,其餘被擋", "Lets everything through 全部通過", "Blocks everything 全部擋住"], a: "Lets some substances through but not others 讓部分物質通過,其餘被擋",
        why: "Pore size + transport proteins decide who crosses." },
      { id: "A2", title: "Diffusion: down the gradient", titleZh: "擴散:順梯度",
        body: "Particles jiggle randomly (Brownian motion). Where concentration is high there are more of them, so MORE particles randomly wander OUT than IN. Net movement: high → low concentration, no energy needed. This is DIFFUSION.",
        bodyZh: "粒子不停隨機運動(布朗運動)。濃度高處粒子多,隨機走出去的比走進來的多,淨移動由高濃度到低濃度,不需能量,這就是擴散。",
        q: "Diffusion moves particles from…", qZh: "擴散令粒子由…",
        opts: ["High to low concentration 高濃度到低濃度", "Low to high 低到高", "Nowhere — static 不動"], a: "High to low concentration 高濃度到低濃度",
        why: "Random motion + concentration difference = net downhill flow. No ATP required." },
      { id: "A3", title: "Osmosis: water's special name", titleZh: "滲透:水的專用名詞",
        body: "OSMOSIS is the diffusion of WATER across a selectively permeable membrane, from a region of higher water potential (dilute) to lower water potential (concentrated). Solute can't cross, so water moves instead.",
        bodyZh: "滲透是水分子通過選擇性透膜的擴散:由水勢較高(稀)向水勢較低(濃)移動。溶質過不了,只好水來遷就。",
        q: "In osmosis, the thing that actually moves is…", qZh: "滲透中真正移動的是…",
        opts: ["Water molecules 水分子", "Solute molecules 溶質分子", "The membrane 膜"], a: "Water molecules 水分子",
        why: "The membrane blocks solute; water does the moving." },
      { id: "A4", title: "Water potential: which way?", titleZh: "水勢:往哪邊走?",
        body: "More solute → LOWER (more negative) water potential. Water always flows toward the side with LOWER water potential = higher solute concentration. Dilute side loses water; concentrated side gains it.",
        bodyZh: "溶質越多,水勢越低(越負)。水總是流向水勢較低的一邊,即溶質較濃的一邊。稀的一方失水,濃的一方得水。",
        q: "Left side has MORE solute. Water flows…", qZh: "左邊溶質較多,水流向…",
        opts: ["Toward the left 向左", "Toward the right 向右", "No net flow 無淨流動"], a: "Toward the left 向左",
        why: "Higher solute concentration = lower water potential = water flows in." },
      { id: "A5", title: "Cells in solutions: swell, shrink, or happy", titleZh: "細胞在溶液中:脹、縮、剛好",
        body: "Red blood cell in PURE WATER: water rushes in → cell swells and may BURST (haemolysis). In CONCENTRATED salt solution: water leaves → cell SHRINKS (crenation). In ISOTONIC solution: no net movement, cell stays normal. Plant cells use turgor pressure to stay firm instead of bursting.",
        bodyZh: "紅血球放純水:水湧入,細胞脹破(溶血);放濃鹽水:水流出,細胞皺縮;等滲溶液:無淨移動,保持正常。植物細胞靠膨壓保持堅挺而不爆裂。",
        q: "A red blood cell placed in distilled water will…", qZh: "紅血球放進蒸餾水會…",
        opts: ["Swell and possibly burst 脹大甚至爆裂", "Shrink 皺縮", "Stay the same 不變"], a: "Swell and possibly burst 脹大甚至爆裂",
        why: "Water potential outside is higher → water floods in. Animal cells have no wall to resist." },
      { id: "A6", title: "Active transport: pumping uphill", titleZh: "主動運輸:逆水行舟",
        body: "Sometimes a cell must move substances AGAINST the gradient (low → high) — e.g., root cells absorbing mineral ions from very dilute soil. Carrier proteins use energy from ATP to pump particles uphill. Requires respiration → needs oxygen and glucose.",
        bodyZh: "有時細胞要逆梯度運輸(低→高),如根細胞從稀薄土壤吸收礦物離子。載體蛋白消耗 ATP 把粒子泵上坡。需要呼吸作用供能。",
        q: "Active transport requires…", qZh: "主動運輸需要…",
        opts: ["ATP energy + carrier proteins ATP 能量與載體蛋白", "Only random motion 只靠隨機運動", "Low temperature 低溫"], a: "ATP energy + carrier proteins ATP 能量與載體蛋白",
        why: "Uphill movement can't happen by chance — the cell spends energy." },
      { id: "A7", title: "Three ways compared", titleZh: "三種方式比較",
        body: "DIFFUSION: down gradient, no ATP, e.g. O₂ into blood. OSMOSIS: water only, down water-potential gradient, no ATP. ACTIVE TRANSPORT: against gradient, ATP required, e.g. mineral uptake in roots, glucose uptake in the gut.",
        bodyZh: "擴散:順梯度、不用 ATP,如氧入血;滲透:只限水、順水勢、不用 ATP;主動運輸:逆梯度、要 ATP,如根吸收礦物、腸吸收葡萄糖。",
        q: "Which process moves substances AGAINST the concentration gradient?", qZh: "哪個過程逆濃度梯度運輸物質?",
        opts: ["Active transport 主動運輸", "Diffusion 擴散", "Osmosis 滲透"], a: "Active transport 主動運輸",
        why: "Only active transport spends ATP to go uphill." },
      { id: "A8", title: "Checkpoint: run the three modes", titleZh: "檢查點:實測三模式",
        body: "In the lab: (1) OSMOSIS mode — unequal solute, watch water levels change; (2) DIFFUSION mode — open channels let solute even out; (3) ACTIVE mode — watch the pump spend ATP moving solute UPHILL. Predict BEFORE you press play.",
        bodyZh: "實驗:(1) 滲透模式:兩邊溶質不等,看水位變化;(2) 擴散模式:開放通道讓溶質均勻;(3) 主動模式:看泵消耗 ATP 把溶質逆梯度運送。按播放前先行預測。",
        q: "In osmosis mode with solute only on the RIGHT, the left water level will…", qZh: "滲透模式中溶質只在右邊,左邊水位會…",
        opts: ["Fall — water leaves toward the right 下降,水流向右", "Rise 上升", "Stay flat 不變"], a: "Fall — water leaves toward the right 下降,水流向右",
        why: "Right side has lower water potential → water moves right → left level drops." }
    ]`,
  sim: `
    function TransportSim() {
      const [mode, setMode] = useState("osmosis");
      const [sL, setSL] = useState(10);
      const [sR, setSR] = useState(3);
      const [running, setRunning] = useState(true);
      const [info, setInfo] = useState({ net: 0, atp: 30, nL: 0, nR: 0 });
      const cv = useRef(null);
      const S = useRef({ water: [], sol: [], net: 0, atp: 30, pumpT: 0, lastKey: "" });
      const MEM_X = 360, PORES = [110, 160, 210, 260, 310, 350];
      const TOP = 90, BOT = 380, LFT = 40, RGT = 680;

      function rebuild() {
        const st = S.current;
        const key = mode + ":" + sL + ":" + sR;
        if (st.lastKey === key) return;
        st.lastKey = key;
        st.water = [];
        for (let i = 0; i < 120; i++) {
          const left = i < 60;
          st.water.push({ x: left ? LFT + 10 + Math.random() * (MEM_X - LFT - 20) : MEM_X + 10 + Math.random() * (RGT - MEM_X - 20), y: TOP + 10 + Math.random() * (BOT - TOP - 20), vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40 });
        }
        st.sol = [];
        for (let i = 0; i < sL; i++) st.sol.push({ side: "L", x: LFT + 14 + Math.random() * (MEM_X - LFT - 28), y: TOP + 14 + Math.random() * (BOT - TOP - 28), vx: (Math.random() - 0.5) * 22, vy: (Math.random() - 0.5) * 22 });
        for (let i = 0; i < sR; i++) st.sol.push({ side: "R", x: MEM_X + 14 + Math.random() * (RGT - MEM_X - 28), y: TOP + 14 + Math.random() * (BOT - TOP - 28), vx: (Math.random() - 0.5) * 22, vy: (Math.random() - 0.5) * 22 });
      }

      useEffect(() => { rebuild(); }, [mode, sL, sR]);

      useEffect(() => {
        let raf, last = performance.now();
        function frame(now) {
          const dt = Math.min(0.05, (now - last) / 1000); last = now;
          if (running) step(dt);
          draw();
          raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
      }, [running, mode]);

      useEffect(() => {
        const iv = setInterval(() => {
          const st = S.current;
          setInfo({ net: st.net, atp: st.atp, nL: st.sol.filter(s => s.side === "L").length, nR: st.sol.filter(s => s.side === "R").length });
        }, 400);
        return () => clearInterval(iv);
      }, []);

      function inPore(y) { return PORES.some(py => Math.abs(y - py) < 9); }

      function step(dt) {
        const st = S.current;
        for (const w of st.water) {
          w.vx += (Math.random() - 0.5) * 160 * dt; w.vy += (Math.random() - 0.5) * 160 * dt;
          w.vx = Math.max(-60, Math.min(60, w.vx)); w.vy = Math.max(-60, Math.min(60, w.vy));
          w.x += w.vx * dt; w.y += w.vy * dt;
          if (w.x < LFT + 4) { w.x = LFT + 4; w.vx = Math.abs(w.vx); }
          if (w.x > RGT - 4) { w.x = RGT - 4; w.vx = -Math.abs(w.vx); }
          if (w.y < TOP + 4) { w.y = TOP + 4; w.vy = Math.abs(w.vy); }
          if (w.y > BOT - 4) { w.y = BOT - 4; w.vy = -Math.abs(w.vy); }
          if (Math.abs(w.x - MEM_X) < 5) {
            if (inPore(w.y)) {
              if (w.vx > 0 && w.x > MEM_X - 6 && w.x < MEM_X) { st.net++; w.x = MEM_X + 6; }
              else if (w.vx < 0 && w.x < MEM_X + 6 && w.x > MEM_X) { st.net--; w.x = MEM_X - 6; }
            } else {
              if (w.x < MEM_X) { w.x = MEM_X - 5; w.vx = -Math.abs(w.vx); }
              else { w.x = MEM_X + 5; w.vx = Math.abs(w.vx); }
            }
          }
        }
        for (const s of st.sol) {
          s.x += s.vx * dt; s.y += s.vy * dt;
          if (s.y < TOP + 6 || s.y > BOT - 6) s.vy *= -1;
          if (s.side === "L") {
            if (s.x < LFT + 7) s.vx = Math.abs(s.vx);
            if (s.x > MEM_X - 8) { if (mode === "diffusion" && inPore(s.y)) { s.side = "R"; } else s.vx = -Math.abs(s.vx); }
          } else {
            if (s.x > RGT - 7) s.vx = -Math.abs(s.vx);
            if (s.x < MEM_X + 8) { if (mode === "diffusion" && inPore(s.y)) { s.side = "L"; } else s.vx = Math.abs(s.vx); }
          }
        }
        if (mode === "active") {
          st.pumpT += dt;
          if (st.pumpT > 0.6 && st.atp > 0) {
            st.pumpT = 0;
            const nL2 = st.sol.filter(s => s.side === "L").length, nR2 = st.sol.length - nL2;
            if (nL2 < nR2 + 4 && st.sol.some(s => s.side === "L")) {
              const s = st.sol.find(x => x.side === "L");
              s.side = "R"; s.x = MEM_X + 12; st.atp--;
            } else if (nL2 >= nR2 && st.sol.some(s => s.side === "R")) {
              const s = st.sol.find(x => x.side === "R");
              s.side = "L"; s.x = MEM_X - 12; st.atp--;
            }
          }
        }
      }

      function draw() {
        const c = cv.current; if (!c) return;
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, c.width, c.height);
        const off = Math.max(-34, Math.min(34, S.current.net * 0.55));
        ctx.fillStyle = "#e0f2fe";
        ctx.fillRect(LFT, TOP - off, MEM_X - LFT, BOT - TOP + off);
        ctx.fillRect(MEM_X, TOP + off, RGT - MEM_X, BOT - TOP - off);
        ctx.strokeStyle = "#334155"; ctx.lineWidth = 4;
        ctx.strokeRect(LFT, 50, RGT - LFT, BOT - 50);
        ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 6;
        for (let y = 70; y < BOT; y += 2) {
          const yEnd = y + 2;
          if (!PORES.some(py => y >= py - 9 && y <= py + 9)) { ctx.beginPath(); ctx.moveTo(MEM_X, y); ctx.lineTo(MEM_X, yEnd); ctx.stroke(); }
        }
        ctx.fillStyle = "#64748b"; ctx.font = "11px IBM Plex Sans";
        ctx.fillText("semi-permeable membrane 半透膜", MEM_X - 84, 62);
        PORES.forEach(py => { ctx.fillStyle = "#fff"; ctx.fillRect(MEM_X - 4, py - 9, 8, 18); });
        ctx.fillStyle = "rgba(2,132,199,.85)";
        for (const w of S.current.water) { ctx.beginPath(); ctx.arc(w.x, w.y, 2.6, 0, 7); ctx.fill(); }
        for (const s of S.current.sol) {
          ctx.fillStyle = mode === "diffusion" ? "#16a34a" : "#65a30d";
          ctx.beginPath(); ctx.arc(s.x, s.y, 6, 0, 7); ctx.fill();
          ctx.fillStyle = "#fff"; ctx.font = "7px IBM Plex Sans"; ctx.fillText("S", s.x - 2.5, s.y + 2.5);
        }
        ctx.fillStyle = "#334155"; ctx.font = "12px IBM Plex Sans";
        ctx.fillText("LEFT 左: solute " + info.nL + " · water potential " + (info.nL > info.nR ? "LOWER 較低" : "higher 較高"), LFT + 8, 62);
        ctx.fillText("RIGHT 右: solute " + info.nR, RGT - 130, 62);
        if (mode === "active") {
          ctx.fillStyle = "#d97706"; ctx.font = "bold 13px IBM Plex Sans";
          ctx.fillText("⚡ ATP left 剩餘: " + info.atp, MEM_X - 40, BOT + 24);
        }
      }

      const MODES = [
        { id: "osmosis", label: "Osmosis 滲透 (solute blocked)" },
        { id: "diffusion", label: "Diffusion 擴散 (channels open)" },
        { id: "active", label: "Active transport 主動運輸 (pump + ATP)" }
      ];
      const dir = info.net > 2 ? "→ net water RIGHT 淨水流向右" : info.net < -2 ? "← net water LEFT 淨水流向左" : "≈ equilibrium 接近平衡";
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            {MODES.map(m => (
              <button key={m.id} type="button" onClick={() => setMode(m.id)}
                className={"px-3 py-2 rounded-xl text-sm font-semibold min-h-[44px] border " + (mode === m.id ? "text-white" : "bg-white text-slate-700 border-slate-200")}
                style={mode === m.id ? {background: ACCENT, borderColor: ACCENT} : {}}>{m.label}</button>
            ))}
            <button type="button" onClick={() => setRunning(r => !r)} className="px-3 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-white min-h-[44px]">{running ? "⏸ Pause" : "▶ Play"}</button>
            <button type="button" onClick={() => { S.current.net = 0; S.current.atp = 30; S.current.lastKey = ""; rebuild(); }} className="px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 min-h-[44px]">↺ Reset</button>
          </div>
          <canvas ref={cv} className="sim" width="720" height="410" />
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Solute LEFT 左邊溶質 · {sL} units
              <input type="range" min="0" max="16" step="1" value={sL} onChange={e => setSL(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Solute RIGHT 右邊溶質 · {sR} units
              <input type="range" min="0" max="16" step="1" value={sR} onChange={e => setSR(+e.target.value)} className="w-full mt-2" /></label>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 font-bold">{dir}</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold">net crossings 淨越膜 = {info.net}</span>
            {mode === "active" && <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 font-semibold">ATP used 已耗 = {30 - info.atp}/30</span>}
          </div>
          <p className="text-xs text-slate-500">Water always flows toward the side with MORE solute (lower water potential). 水總流向溶質較多(水勢較低)的一邊。Active mode pumps solute against the gradient using ATP. 主動模式消耗 ATP 逆梯度泵送溶質。</p>
        </div>
      );
    }`,
  /*MORE2*/
};
