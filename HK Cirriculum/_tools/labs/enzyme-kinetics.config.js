module.exports = {
  out: "c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/Secondary_School/Biology/Form 5/01_Enzyme_Kinetics/index.html",
  level: "F5", appId: "f5-bio-enzyme", appConst: "f5_bio_enzyme",
  nameEn: "Enzyme Kinetics — Catalase", nameZh: "酶動力學 — 過氧化氫酶",
  subject: "Biology", subjectLine: "F5 Biology · Enzymes & Metabolism",
  accent: "#7c3aed", labTitle: "Catalase Reaction Chamber · 過氧化氫酶反應室", simName: "EnzymeSim",
  tfz: `[
      { id: "A1", title: "Enzymes are biological catalysts", titleZh: "酶是生物催化劑",
        body: "Cells run thousands of reactions. Without enzymes they would be impossibly slow. Catalase, found in liver and potato, breaks down toxic hydrogen peroxide (H₂O₂) into water + oxygen — up to millions of molecules per second per enzyme.",
        bodyZh: "細胞內有數千個反應,沒有酶就慢得無法維持生命。肝臟與馬鈴薯中的過氧化氫酶把有毒的 H₂O₂ 分解為水與氧氣,每個酶每秒可處理數百萬分子。",
        q: "A catalyst speeds up a reaction by…", qZh: "催化劑加快反應的方式是…",
        opts: ["Lowering activation energy 降低活化能", "Being used up 被消耗", "Heating the mixture 加熱"], a: "Lowering activation energy 降低活化能",
        why: "Catalysts provide an easier path; they are NOT consumed." },
      { id: "A2", title: "The active site fits the substrate", titleZh: "活性部位與底物契合",
        body: "Each enzyme has an ACTIVE SITE whose shape matches its substrate — like a lock and key. H₂O₂ fits catalase's active site; other molecules cannot use it. This is enzyme SPECIFICITY.",
        bodyZh: "每種酶有活性部位,形狀與底物配合,如鎖與鑰匙。H₂O₂ 恰好嵌入過氧化氫酶的活性部位,這就是專一性。",
        q: "Enzyme specificity comes from…", qZh: "酶的專一性來自…",
        opts: ["Active site shape matching the substrate 活性部位形狀配合底物", "Enzyme colour 顏色", "Random luck 隨機"], a: "Active site shape matching the substrate 活性部位形狀配合底物",
        why: "Lock-and-key: only the matching substrate binds and reacts." },
      { id: "A3", title: "Temperature: faster… until it breaks", titleZh: "溫度:先快後壞",
        body: "Heating gives molecules more KE → more collisions → faster reaction. BUT past the optimum (~37–40 °C for body enzymes), the enzyme's bonds vibrate apart, the active site loses shape = DENATURATION. Rate crashes. Denaturation is usually irreversible.",
        bodyZh: "加熱令分子動能上升、碰撞增多、反應加快。但超過最適溫度(約 37–40 °C),酶內鍵斷裂、活性部位變形 = 變性,速率暴跌且通常不可逆。",
        q: "Above the optimum temperature, rate falls because…", qZh: "超過最適溫度後速率下降,因為…",
        opts: ["The active site changes shape (denaturation) 活性部位變形(變性)", "Substrate is used up 底物用盡", "Enzymes freeze 酶凍結"], a: "The active site changes shape (denaturation) 活性部位變形(變性)",
        why: "High T breaks the enzyme's 3D folding — the key no longer fits the lock." },
      { id: "A4", title: "pH changes the charge and shape", titleZh: "pH 改變電荷與形狀",
        body: "Every enzyme has an optimum pH (≈7 for catalase; ≈2 for pepsin in the stomach). Too acid or alkaline distorts the active site by breaking ionic bonds — rate falls both ways from the peak.",
        bodyZh: "每種酶有最適 pH(過氧化氫酶約 7;胃蛋白酶約 2)。過酸或過鹼破壞離子鍵、扭曲活性部位,速率雙向下降。",
        q: "Catalase works fastest near…", qZh: "過氧化氫酶在何處最快?",
        opts: ["pH 7 (neutral 中性)", "pH 1 (strong acid 強酸)", "pH 13 (strong alkali 強鹼)"], a: "pH 7 (neutral 中性)",
        why: "Neutral optimum for catalase; extremes distort the active site." },
      { id: "A5", title: "Substrate concentration: the plateau", titleZh: "底物濃度:平台期",
        body: "More substrate → more collisions with active sites → faster rate. But once EVERY active site is working full-time (saturated), adding more substrate changes nothing: the rate plateaus at Vmax. The enzyme concentration is now the limiting factor.",
        bodyZh: "底物越多,撞中活性部位越頻,速率越快。但所有活性部位全滿(飽和)後,再加底物也無用:速率達 Vmax 平台,此時酶濃度成為限制因素。",
        q: "At very high substrate concentration, rate plateaus because…", qZh: "底物濃度極高時速率見頂,因為…",
        opts: ["All active sites are saturated 活性部位全部飽和", "Enzymes denature 酶變性", "Oxygen runs out 缺氧"], a: "All active sites are saturated 活性部位全部飽和",
        why: "Vmax is set by enzyme amount, not substrate. v = Vmax·[S]/(Km + [S])." },
      { id: "A6", title: "Measuring rate: counting bubbles", titleZh: "量度速率:數氣泡",
        body: "2H₂O₂ → 2H₂O + O₂. Each oxygen bubble is direct evidence of reaction progress. Rate = bubbles (or O₂ volume) per second. In the lab, foam height and bubble count are your data — exactly like the school practical.",
        bodyZh: "2H₂O₂ → 2H₂O + O₂。每個氧氣泡都是反應進度的證據。速率 = 每秒氣泡數(或氧氣體積),與學校實驗一致。",
        q: "The bubbles in the catalase experiment are…", qZh: "過氧化氫酶實驗中的氣泡是…",
        opts: ["Oxygen 氧氣", "Hydrogen 氫氣", "Carbon dioxide 二氧化碳"], a: "Oxygen 氧氣",
        why: "H₂O₂ splits into water and O₂ gas." },
      { id: "A7", title: "Denatured ≠ consumed", titleZh: "變性 ≠ 消耗",
        body: "A denatured enzyme still EXISTS — its shape is ruined, so it cannot work. In contrast, a catalyst is never CONSUMED by the reaction; the same enzyme molecules keep working until they denature or are recycled by the cell.",
        bodyZh: "變性的酶仍然存在,只是形狀被破壞無法工作。催化劑不會被反應消耗;酶分子一直工作,直到變性或被細胞回收。",
        q: "After the reaction, the enzyme is…", qZh: "反應後,酶…",
        opts: ["Unchanged and reusable 不變,可重用", "Used up 被用完", "Converted to oxygen 變成氧氣"], a: "Unchanged and reusable 不變,可重用",
        why: "Catalysts emerge unchanged — that is the definition of catalysis." },
      { id: "A8", title: "Checkpoint: design the experiment", titleZh: "檢查點:設計實驗",
        body: "In the lab: (1) hold pH & substrate fixed, sweep temperature — find the optimum and watch denaturation; (2) fix T at optimum, sweep substrate — find the Vmax plateau. Two curves, full marks.",
        bodyZh: "實驗:(1) 固定 pH 與底物,掃溫度,找最適點並觀察變性;(2) 固定最適溫度,掃底物濃度,找 Vmax 平台。",
        q: "To test the effect of temperature on rate, you must keep constant…", qZh: "測試溫度對速率的影響時,必須保持不變的是…",
        opts: ["pH, substrate & enzyme concentrations pH、底物與酶濃度", "Only the colour 只有顏色", "Nothing 無需控制"], a: "pH, substrate & enzyme concentrations pH、底物與酶濃度",
        why: "Fair test: one independent variable, everything else controlled." }
    ]`,
  sim: `
    function EnzymeSim() {
      const [temp, setTemp] = useState(37);
      const [pH, setPH] = useState(7);
      const [sub, setSub] = useState(50);
      const [running, setRunning] = useState(true);
      const [stats, setStats] = useState({ rate: 0, total: 0 });
      const cv = useRef(null), gv = useRef(null);
      const S = useRef({ bubbles: [], subs: [], foam: 0, total: 0, hist: [], t: 0 });

      const fT = (T) => T > 62 ? 0 : T > 44 ? Math.max(0, 1 - (T - 44) / 18) : Math.min(1, 0.35 + (T / 40) * 0.65) * (T < 10 ? 0.35 + T / 15 : 1);
      const fPH = (p) => Math.max(0, 1 - Math.abs(p - 7) / 4.2);
      const fS = (s) => s / (22 + s);
      const vmax = 14;
      const rate = vmax * fS(sub) * fT(temp) * fPH(pH);
      const denatured = temp > 44;

      useEffect(() => {
        S.current.subs = [];
        for (let i = 0; i < Math.round(sub * 0.9); i++) S.current.subs.push({ x: 60 + Math.random() * 240, y: 90 + Math.random() * 200, vx: (Math.random() - 0.5) * 24, vy: (Math.random() - 0.5) * 24 });
      }, [sub]);

      useEffect(() => {
        let raf, last = performance.now();
        function frame(now) {
          const dt = Math.min(0.05, (now - last) / 1000); last = now;
          if (running) step(dt);
          draw(cv.current, gv.current);
          raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
      }, [running, temp, pH, sub]);

      function step(dt) {
        const st = S.current;
        st.t += dt;
        for (const s of st.subs) {
          s.x += s.vx * dt * (0.5 + temp / 50); s.y += s.vy * dt * (0.5 + temp / 50);
          if (s.x < 56 || s.x > 304) s.vx *= -1;
          if (s.y < 86 || s.y > 296) s.vy *= -1;
        }
        if (Math.random() < rate * dt && st.subs.length > 2) {
          st.subs.splice(Math.floor(Math.random() * st.subs.length), 1);
          st.bubbles.push({ x: 90 + Math.random() * 180, y: 300, r: 2 + Math.random() * 3, wob: Math.random() * 7 });
          st.total++; st.foam = Math.min(46, st.foam + 0.7);
        }
        for (let i = st.bubbles.length - 1; i >= 0; i--) {
          const b = st.bubbles[i];
          b.y -= (60 + b.r * 8) * dt; b.wob += dt * 6;
          if (b.y < 92) st.bubbles.splice(i, 1);
        }
        st.foam = Math.max(0, st.foam - dt * 1.2);
        if (!st.hist.length || st.t - st.hist[st.hist.length - 1].t > 0.5) st.hist.push({ t: st.t, n: st.total });
        if (st.hist.length > 120) st.hist.shift();
      }

      useEffect(() => {
        const iv = setInterval(() => {
          const h = S.current.hist;
          const recent = h.length > 10 ? (h[h.length - 1].n - h[h.length - 11].n) / (h[h.length - 1].t - h[h.length - 11].t) : 0;
          setStats({ rate: recent, total: S.current.total });
        }, 500);
        return () => clearInterval(iv);
      }, []);

      function draw(c, g) {
        if (c) {
          const ctx = c.getContext("2d");
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, c.width, c.height);
          ctx.fillStyle = "#e0f2fe"; ctx.fillRect(50, 80, 260, 230);
          const foamH = S.current.foam;
          if (foamH > 2) { ctx.fillStyle = "rgba(255,255,255,.92)"; ctx.fillRect(50, 80, 260, foamH); }
          ctx.strokeStyle = "#334155"; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(50, 60); ctx.lineTo(50, 320); ctx.lineTo(310, 320); ctx.lineTo(310, 60); ctx.stroke();
          ctx.fillStyle = denatured ? "#94a3b8" : "#16a34a";
          ctx.beginPath(); ctx.ellipse(180, 300, 70, 16, 0, 0, 7); ctx.fill();
          ctx.fillStyle = "#fff"; ctx.font = "bold 11px IBM Plex Sans";
          ctx.fillText(denatured ? "DENATURED catalase 已變性" : "catalase disc 過氧化氫酶", 118, 304);
          ctx.fillStyle = "#7c3aed";
          for (const s of S.current.subs) { ctx.fillRect(s.x - 2.5, s.y - 2.5, 5, 5); }
          ctx.strokeStyle = "rgba(56,189,248,.9)"; ctx.lineWidth = 1.5;
          for (const b of S.current.bubbles) {
            ctx.beginPath(); ctx.arc(b.x + Math.sin(b.wob) * 4, b.y, b.r, 0, 7); ctx.stroke();
          }
          ctx.fillStyle = "#334155"; ctx.font = "12px IBM Plex Sans";
          ctx.fillText("H₂O₂ solution 過氧化氫溶液", 66, 74);
          ctx.fillText("O₂ bubbles 氧氣泡 ↑", 236, 74);
        }
        if (g) {
          const ctx = g.getContext("2d");
          ctx.clearRect(0, 0, g.width, g.height);
          ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, g.width, g.height);
          ctx.strokeStyle = "#475569"; ctx.strokeRect(40, 20, 290, 130);
          ctx.fillStyle = "#94a3b8"; ctx.font = "11px IBM Plex Sans";
          ctx.fillText("rate vs temperature 速率對溫度 (model)", 46, 34);
          ctx.strokeStyle = "#a78bfa"; ctx.lineWidth = 2; ctx.beginPath();
          for (let T = 0; T <= 70; T += 1) {
            const rr = vmax * fS(sub) * fT(T) * fPH(pH);
            const px = 40 + (T / 70) * 290, py = 150 - (rr / vmax) * 130;
            T === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.stroke();
          const rNow = vmax * fS(sub) * fT(temp) * fPH(pH);
          ctx.fillStyle = "#fbbf24"; ctx.beginPath();
          ctx.arc(40 + (temp / 70) * 290, 150 - (rNow / vmax) * 130, 5, 0, 7); ctx.fill();
          ctx.fillStyle = "#94a3b8"; ctx.fillText("0", 36, 164); ctx.fillText("T/°C →", 300, 164); ctx.fillText("70", 322, 164);
          ctx.strokeStyle = "#475569"; ctx.strokeRect(40, 190, 290, 130);
          ctx.fillStyle = "#94a3b8"; ctx.fillText("rate vs substrate [S] 速率對底物濃度", 46, 204);
          ctx.strokeStyle = "#34d399"; ctx.lineWidth = 2; ctx.beginPath();
          for (let s2 = 0; s2 <= 100; s2 += 2) {
            const rr = vmax * fS(s2) * fT(temp) * fPH(pH);
            const px = 40 + (s2 / 100) * 290, py = 320 - (rr / vmax) * 130;
            s2 === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.fillStyle = "#fbbf24"; ctx.beginPath();
          ctx.arc(40 + (sub / 100) * 290, 320 - (rNow / vmax) * 130, 5, 0, 7); ctx.fill();
          ctx.fillStyle = "#94a3b8"; ctx.fillText("[S]% →", 292, 334);
        }
      }

      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <button type="button" onClick={() => setRunning(r => !r)} className="px-3 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-white min-h-[44px]">{running ? "⏸ Pause" : "▶ Play"}</button>
            <button type="button" onClick={() => { S.current.total = 0; S.current.bubbles = []; S.current.foam = 0; S.current.hist = []; S.current.t = 0; }} className="px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 min-h-[44px]">↺ Reset run</button>
            {denatured && <span className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 text-sm font-bold">⚠ Enzyme denaturing 酶正在變性!</span>}
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <canvas ref={cv} className="sim" width="360" height="360" />
            <canvas ref={gv} className="sim" width="348" height="360" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Temperature 溫度 · {temp} °C
              <input type="range" min="0" max="70" step="1" value={temp} onChange={e => setTemp(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">pH · {pH.toFixed(1)}
              <input type="range" min="0" max="14" step="0.5" value={pH} onChange={e => setPH(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Substrate [H₂O₂] 底物濃度 · {sub}%
              <input type="range" min="0" max="100" step="1" value={sub} onChange={e => setSub(+e.target.value)} className="w-full mt-2" /></label>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-violet-100 text-violet-800 font-bold">Model rate 模型速率 ≈ {rate.toFixed(1)} bubbles/s</span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">Measured 實測 ≈ {stats.rate.toFixed(1)} bubbles/s</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold">Total O₂ bubbles 總氣泡 = {stats.total}</span>
          </div>
        </div>
      );
    }`,
  guided: `[
      { id: "g1", level: 1, q: "Catalase breaks down hydrogen peroxide into…", qZh: "過氧化氫酶把過氧化氫分解為…",
        opts: ["Water + oxygen 水 + 氧氣", "Hydrogen + oxygen 氫 + 氧", "Water + carbon dioxide 水 + 二氧化碳", "Hydrogen peroxide 不變"], a: "Water + oxygen 水 + 氧氣",
        hint: "2H₂O₂ → 2H₂O + O₂ — the bubbles you see are O₂. 氣泡是氧氣。" },
      { id: "g2", level: 1, q: "The part of the enzyme that binds the substrate is the…", qZh: "酶與底物結合的部位是…",
        opts: ["Active site 活性部位", "Nucleus 細胞核", "Membrane 膜", "Ribosome 核糖體"], a: "Active site 活性部位",
        hint: "Lock-and-key: the active site's shape matches the substrate. 鎖匙模型。" },
      { id: "g3", level: 1, q: "At 0–10 °C, enzyme reactions are slow mainly because…", qZh: "0–10 °C 時酶反應緩慢,主要因為…",
        opts: ["Low KE → few successful collisions 動能低,有效碰撞少", "Enzymes are denatured 酶變性", "Substrate freezes solid 底物結冰", "Active sites multiply 活性部位增多"], a: "Low KE → few successful collisions 動能低,有效碰撞少",
        hint: "Cold SLOWS but does NOT denature. Denaturation is a HIGH temperature effect. 低溫只是減慢。" },
      { id: "g4", level: 2, q: "Boiling catalase (100 °C) then cooling it to 37 °C gives what rate?", qZh: "把過氧化氫酶煮沸(100 °C)再冷卻回 37 °C,速率如何?",
        opts: ["Near zero — denaturation is irreversible 接近零,變性不可逆", "Back to maximum 回復最高", "Half speed 一半", "Faster than before 更快"], a: "Near zero — denaturation is irreversible 接近零,變性不可逆",
        hint: "The active site's shape is permanently destroyed. 活性部位永久變形。" },
      { id: "g5", level: 2, q: "Doubling substrate concentration at LOW [S] roughly does what to rate?", qZh: "在低底物濃度下把底物加倍,速率約…",
        opts: ["Doubles 加倍", "Halves 減半", "Stays flat 不變", "Stops 停止"], a: "Doubles 加倍",
        hint: "At low [S], free active sites are plentiful: rate ≈ proportional to [S]. 低濃度時近乎正比。" },
      { id: "g6", level: 2, q: "At VERY high [S], adding more substrate does not raise the rate because…", qZh: "在極高 [S] 時再加底物速率不升,因為…",
        opts: ["All active sites are already saturated 活性部位已全飽和", "The enzyme denatures 酶變性", "Oxygen dissolves 氧氣溶解", "pH changes pH 改變"], a: "All active sites are already saturated 活性部位已全飽和",
        hint: "Vmax is limited by enzyme concentration. 上限由酶量決定。" }
    ]`,
  exam: `[
      { id: "e1", level: 3, q: "Pepsin (stomach enzyme) has optimum pH ≈ 2. Catalase's is ≈ 7. Placing catalase at pH 2 will…", qZh: "胃蛋白酶最適 pH ≈ 2,過氧化氫酶約 7。把過氧化氫酶放進 pH 2 會…",
        opts: ["Greatly slow it — wrong pH distorts the active site 大幅減慢,錯 pH 扭曲活性部位", "Speed it up 加快", "No effect 無影響", "Split it into two enzymes 分成兩個酶"], a: "Greatly slow it — wrong pH distorts the active site 大幅減慢,錯 pH 扭曲活性部位",
        hint: "Each enzyme has its own optimum; extremes break ionic bonds holding the 3D shape. 偏離最適 pH 破壞結構。" },
      { id: "e2", level: 3, q: "In the simulation, raising temperature from 25 °C to 37 °C increases rate mainly due to…", qZh: "模擬中由 25 °C 升至 37 °C 速率上升,主因是…",
        opts: ["More kinetic energy → more enzyme-substrate collisions 動能增,碰撞增", "New enzymes are made 產生新酶", "Substrate multiplies 底物變多", "Active sites duplicate 活性部位複製"], a: "More kinetic energy → more enzyme-substrate collisions 動能增,碰撞增",
        hint: "Below the optimum, temperature acts through collision frequency/energy. 未過最適點前靠碰撞。" },
      { id: "e3", level: 3, q: "A graph of rate against [S] rises then plateaus. The plateau's height depends on…", qZh: "速率對 [S] 圖先升後平。平台高度取決於…",
        opts: ["Enzyme concentration 酶濃度", "Substrate concentration 底物濃度", "Bubble size 氣泡大小", "Beaker volume 燒杯體積"], a: "Enzyme concentration 酶濃度",
        hint: "Vmax = k × [enzyme]. More enzyme → higher plateau. 平台即 Vmax。" },
      { id: "e4", level: 4, q: "Which change is IRREVERSIBLE for an enzyme?", qZh: "對酶而言,哪個改變不可逆?",
        opts: ["Denaturation by boiling 煮沸變性", "Cooling to 4 °C 冷至 4 °C", "Using up all substrate 底物用盡", "Adding more enzyme 加酶"], a: "Denaturation by boiling 煮沸變性",
        hint: "Extreme heat permanently unfolds the protein. Cooling merely pauses activity. 高溫變性不可復原。" },
      { id: "e5", level: 4, q: "To investigate ONLY the effect of pH on catalase, the fair-test controls are…", qZh: "要只研究 pH 對過氧化氫酶的影響,對照條件應固定…",
        opts: ["Temperature, [S], [enzyme], time 溫度、底物、酶濃度、時間", "Only temperature 只固定溫度", "Nothing — just vary everything 全部可變", "The colour of solution 溶液顏色"], a: "Temperature, [S], [enzyme], time 溫度、底物、酶濃度、時間",
        hint: "One independent variable; all others controlled. 單一變數原則。" },
      { id: "e6", level: 4, q: "Why does the measured bubble rate fluctuate around the smooth model curve?", qZh: "為甚麼實測氣泡速率會圍繞平滑模型曲線波動?",
        opts: ["Collisions are random events — rates are statistical 碰撞是隨機事件,速率是統計量", "The enzyme is broken 酶壞了", "The slider is faulty 滑桿故障", "Oxygen escapes the water 氧氣逸出"], a: "Collisions are random events — rates are statistical 碰撞是隨機事件,速率是統計量",
        hint: "Molecular motion is random; averages are smooth, instants are noisy. 微觀隨機,宏觀平滑。" }
    ]`
};
