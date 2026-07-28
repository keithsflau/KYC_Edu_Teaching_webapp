module.exports = {
  out: "c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/Secondary_School/Physics/Form 5/02_Wave_Interference/index.html",
  level: "F5", appId: "f5-phy-wave", appConst: "f5_phy_wave",
  nameEn: "Wave Interference Tank", nameZh: "波的干涉水槽",
  subject: "Physics", subjectLine: "F5 Physics · Waves — Superposition",
  accent: "#0891b2", labTitle: "Two-Source Ripple Tank · 雙波源干涉水槽", simName: "WaveSim",
  tfz: `[
      { id: "A1", title: "What a wave carries", titleZh: "波傳遞甚麼",
        body: "A wave is a disturbance that transfers ENERGY without transferring matter. Water molecules bob up and down; the ripple travels outward. The wave moves, the water stays.",
        bodyZh: "波是傳遞能量而不傳遞物質的擾動。水分子上下振動,漣漪向外傳播:波在走,水不走。",
        q: "A water wave transfers…", qZh: "水波傳遞…",
        opts: ["Energy only 只有能量", "Water outward 水向外", "Both water and energy 水和能量"], a: "Energy only 只有能量",
        why: "The medium oscillates in place; only the disturbance travels." },
      { id: "A2", title: "λ, f and v = fλ", titleZh: "波長、頻率與波速",
        body: "Wavelength λ is the distance between neighbouring crests. Frequency f is how many crests pass per second. Wave speed links them: v = f λ. In the tank, deeper water → faster waves.",
        bodyZh: "波長 λ 是相鄰波峰距離;頻率 f 是每秒經過的波峰數。波速 v = f λ。",
        q: "If f = 2 Hz and λ = 3 cm, the wave speed is…", qZh: "f = 2 Hz、λ = 3 cm,波速為…",
        opts: ["6 cm/s", "1.5 cm/s", "5 cm/s"], a: "6 cm/s",
        why: "v = fλ = 2 × 3 = 6 cm/s." },
      { id: "A3", title: "Superposition: waves add up", titleZh: "疊加原理:波相加",
        body: "When two waves meet, the displacement at every point is the SUM of the two individual displacements. Crest + crest = bigger crest. Crest + trough = cancellation. After crossing, both waves continue unchanged.",
        bodyZh: "兩波相遇時,每點位移是兩波位移之和。峰+峰=更大峰;峰+谷=抵消。穿過後各自繼續前進。",
        q: "Crest meets crest. The result is…", qZh: "波峰遇上波峰,結果是…",
        opts: ["A bigger crest 更大的波峰", "Cancellation 抵消", "Reflection 反射"], a: "A bigger crest 更大的波峰",
        why: "Displacements add — this is constructive interference." },
      { id: "A4", title: "Constructive: path difference = mλ", titleZh: "相長:程差 = mλ",
        body: "From two in-phase sources, a point is a reinforcement (antinode) when the distances to the sources differ by a WHOLE number of wavelengths: Δr = 0, λ, 2λ… Waves arrive in step.",
        bodyZh: "兩個同相波源,若某點到兩波源的距離差為整數個波長(Δr = 0, λ, 2λ…),該點相長(腹點)。",
        q: "A point is 4λ from S₁ and 7λ from S₂. Interference there is…", qZh: "某點距 S₁ 為 4λ、距 S₂ 為 7λ,該處干涉為…",
        opts: ["Constructive 相長 (Δr = 3λ)", "Destructive 相消", "Neither 皆否"], a: "Constructive 相長 (Δr = 3λ)",
        why: "Δr = 7λ − 4λ = 3λ = whole wavelengths → in step → constructive." },
      { id: "A5", title: "Destructive: path difference = (m+½)λ", titleZh: "相消:程差 = (m+½)λ",
        body: "When the path difference is an ODD number of half wavelengths — λ/2, 3λ/2… — crest from one source always meets trough from the other. The water stays flat: a node.",
        bodyZh: "程差為半波長奇數倍(λ/2, 3λ/2…)時,一波峰必遇另一波谷,水面保持平靜:節點。",
        q: "Δr = 2.5λ gives…", qZh: "程差 2.5λ 時…",
        opts: ["Destructive interference 相消", "Constructive 相長", "Double amplitude 雙倍振幅"], a: "Destructive interference 相消",
        why: "2.5λ = 5 half-wavelengths (odd) → out of step → cancellation." },
      { id: "A6", title: "Coherence is required", titleZh: "必須相干",
        body: "Stable interference needs COHERENT sources: same frequency and a constant phase relationship. Random-phase sources blur the pattern. Our two dippers are driven together — perfectly coherent.",
        bodyZh: "穩定干涉需要相干波源:同頻率且相位差恒定。本模擬兩振子同步驅動,完全相干。",
        q: "Coherent sources must have the same…", qZh: "相干波源必須有相同的…",
        opts: ["Frequency 頻率", "Amplitude 振幅", "Position 位置"], a: "Frequency 頻率",
        why: "Different frequencies → drifting phase → no stable fringes." },
      { id: "A7", title: "The fringe pattern", titleZh: "干涉圖樣",
        body: "Constructive points form ANTINODAL lines radiating between the sources; destructive points form NODAL lines between them. Closer sources (smaller d) or longer λ → fewer, wider-spaced fringes.",
        bodyZh: "相長點連成腹線,相消點連成節線。波源距離 d 越小或波長越長,條紋越少越疏。",
        q: "Increasing the wavelength makes the fringes…", qZh: "波長增加時,條紋…",
        opts: ["More widely spaced 更疏", "Closer together 更密", "Unchanged 不變"], a: "More widely spaced 更疏",
        why: "Fringe spacing scales with λ/d — same reason double-slit fringes widen with red light." },
      { id: "A8", title: "Checkpoint: hunt a node", titleZh: "檢查點:尋找節點",
        body: "In the lab, move the probe until it reads Δr ≈ 1.5λ — you found a nodal point where the water never moves. Then slide to Δr ≈ 2λ for an antinode. You are reading the pattern like a physicist.",
        bodyZh: "實驗中移動探針至 Δr ≈ 1.5λ:找到水面不動的節點;再移到 Δr ≈ 2λ 找腹點。",
        q: "At a nodal point, the water surface…", qZh: "節點處的水面…",
        opts: ["Stays nearly flat 幾乎不動", "Oscillates double 雙倍振盪", "Flows away 流走"], a: "Stays nearly flat 幾乎不動",
        why: "Two equal waves always cancel there — zero net displacement." }
    ]`,
  sim: `
    function WaveSim() {
      const [lam, setLam] = useState(16);
      const [sep, setSep] = useState(120);
      const [freq, setFreq] = useState(1);
      const [running, setRunning] = useState(true);
      const [probe, setProbe] = useState(null);
      const cv = useRef(null);
      const S = useRef({ t: 0 });
      const GW = 180, GH = 100;

      useEffect(() => {
        let raf, last = performance.now();
        const off = document.createElement("canvas");
        off.width = GW; off.height = GH;
        const octx = off.getContext("2d");
        const img = octx.createImageData(GW, GH);
        function frame(now) {
          const dt = Math.min(0.05, (now - last) / 1000); last = now;
          if (running) S.current.t += dt * freq;
          render(cv.current, off, octx, img);
          raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
      }, [running, lam, sep, freq]);

      function render(c, off, octx, img) {
        if (!c) return;
        const t = S.current.t;
        const s1x = GW / 2 - (sep / 8), s2x = GW / 2 + (sep / 8), sy = 34;
        const k = (2 * Math.PI) / (lam / 4);
        const w = 2 * Math.PI * 1.6;
        const d = img.data;
        let p = 0;
        for (let y = 0; y < GH; y++) {
          for (let x = 0; x < GW; x++) {
            const r1 = Math.hypot(x - s1x, y - sy), r2 = Math.hypot(x - s2x, y - sy);
            const A = Math.sin(k * r1 - w * t) / (1 + r1 * 0.06) + Math.sin(k * r2 - w * t) / (1 + r2 * 0.06);
            const v = Math.max(-1, Math.min(1, A));
            const bright = v * v;
            if (v >= 0) { d[p] = 20 + 200 * bright; d[p + 1] = 120 + 130 * bright; d[p + 2] = 180 + 75 * bright; }
            else { d[p] = 10 + 40 * bright; d[p + 1] = 30 + 70 * bright; d[p + 2] = 60 + 120 * bright; }
            d[p + 3] = 255;
            p += 4;
          }
        }
        octx.putImageData(img, 0, 0);
        const ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(off, 0, 0, c.width, c.height);
        ctx.fillStyle = "#fbbf24";
        [s1x, s2x].forEach(sx => {
          ctx.beginPath(); ctx.arc(sx * 4, sy * 4, 7, 0, 7); ctx.fill();
          ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 2; ctx.stroke();
        });
        ctx.font = "bold 13px IBM Plex Sans"; ctx.fillStyle = "#f8fafc";
        ctx.fillText("S₁", s1x * 4 - 24, sy * 4 + 5); ctx.fillText("S₂", s2x * 4 + 14, sy * 4 + 5);
        if (probe) {
          ctx.strokeStyle = "#f472b6"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(probe.x, probe.y, 9, 0, 7); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(s1x * 4, sy * 4); ctx.lineTo(probe.x, probe.y); ctx.moveTo(s2x * 4, sy * 4); ctx.lineTo(probe.x, probe.y);
          ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.fillStyle = "rgba(2,6,23,.75)"; ctx.fillRect(0, c.height - 26, 360, 26);
        ctx.fillStyle = "#e2e8f0"; ctx.font = "12px IBM Plex Sans";
        ctx.fillText("λ = " + lam + " mm · d = " + sep + " mm · v = fλ = " + (freq * lam).toFixed(0) + " mm/s (model units)", 10, c.height - 8);
      }

      function onMove(e) {
        const rect = cv.current.getBoundingClientRect();
        const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        const x = (cx / rect.width) * 720, y = (cy / rect.height) * 400;
        const s1x = (720 / 2 - sep * 2), s2x = (720 / 2 + sep * 2), sy = 136;
        const r1 = Math.hypot(x - s1x, y - sy), r2 = Math.hypot(x - s2x, y - sy);
        const drPx = Math.abs(r1 - r2);
        const drLam = drPx / (lam * 4);
        const m = drLam % 1;
        const kind = Math.min(m, 1 - m) < 0.12 ? "CONSTRUCTIVE 相長 (antinode 腹點)" : (Math.abs(m - 0.5) < 0.12 ? "DESTRUCTIVE 相消 (node 節點)" : "in-between 過渡區");
        setProbe({ x, y, drLam, kind });
      }

      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <button type="button" onClick={() => setRunning(r => !r)} className="px-3 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-white min-h-[44px]">{running ? "⏸ Pause" : "▶ Play"}</button>
            <button type="button" onClick={() => { S.current.t = 0; }} className="px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 min-h-[44px]">↺ Reset phase</button>
            <span className="text-xs text-slate-500">Move pointer over tank to probe 移動指針探測程差</span>
          </div>
          <canvas ref={cv} className="sim" width="720" height="400" style={{background: "#082f49", touchAction: "none"}}
            onMouseMove={onMove} onTouchMove={onMove} onClick={onMove} />
          <div className="grid sm:grid-cols-3 gap-3">
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Wavelength λ 波長 · {lam} mm
              <input type="range" min="8" max="30" step="1" value={lam} onChange={e => setLam(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Source separation d 波源距離 · {sep} mm
              <input type="range" min="40" max="220" step="5" value={sep} onChange={e => setSep(+e.target.value)} className="w-full mt-2" /></label>
            <label className="text-sm font-semibold bg-white border border-slate-200 rounded-xl p-3">Frequency f 頻率 · {freq.toFixed(1)} Hz
              <input type="range" min="0.5" max="2" step="0.1" value={freq} onChange={e => setFreq(+e.target.value)} className="w-full mt-2" /></label>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {probe
              ? <React.Fragment>
                  <span className="px-3 py-1.5 rounded-full bg-pink-100 text-pink-800 font-bold">Δr = {probe.drLam.toFixed(2)} λ</span>
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold">{probe.kind}</span>
                </React.Fragment>
              : <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 font-semibold">Probe the tank 探測水槽以讀取程差 Δr</span>}
          </div>
        </div>
      );
    }`,
  guided: `[
      { id: "g1", level: 1, q: "Two crests arrive at a point together. The displacement there is…", qZh: "兩波峰同時到達某點,該點位移…",
        opts: ["The sum — bigger crest 相加,更大波峰", "Zero 零", "The difference 相減", "Random 隨機"], a: "The sum — bigger crest 相加,更大波峰",
        hint: "Superposition: displacements add. 疊加原理。" },
      { id: "g2", level: 1, q: "For stable interference, the two sources must be coherent. This means same…", qZh: "穩定干涉要求兩波源相干,即相同的…",
        opts: ["Frequency & constant phase relation 頻率及恒定相位關係", "Amplitude 振幅", "Colour 顏色", "Temperature 溫度"], a: "Frequency & constant phase relation 頻率及恒定相位關係",
        hint: "Coherent = same f, fixed phase difference. 同頻、相位差恒定。" },
      { id: "g3", level: 1, q: "v = fλ. A wave with f = 5 Hz and λ = 0.4 m travels at…", qZh: "f = 5 Hz、λ = 0.4 m 的波,波速為…",
        opts: ["2 m/s", "12.5 m/s", "0.08 m/s", "5.4 m/s"], a: "2 m/s",
        hint: "v = 5 × 0.4. 直接代入 v = fλ。" },
      { id: "g4", level: 2, q: "Point P is 6λ from S₁ and 9.5λ from S₂ (in-phase sources). At P we find…", qZh: "P 點距 S₁ 為 6λ、距 S₂ 為 9.5λ(同相波源),P 點為…",
        opts: ["A node 節點 (destructive 相消)", "An antinode 腹點", "Maximum speed 最高速率"], a: "A node 節點 (destructive 相消)",
        hint: "Δr = 3.5λ = 7 half-wavelengths (odd) → destructive. 半波長奇數倍相消。" },
      { id: "g5", level: 2, q: "In the tank, moving the sources FURTHER apart makes the fringes…", qZh: "水槽中把波源拉遠,條紋…",
        opts: ["Closer together 變密", "Further apart 變疏", "Disappear 消失"], a: "Closer together 變密",
        hint: "Fringe spacing ∝ λ/d. Bigger d → finer fringes. 間距與 d 成反比。" },
      { id: "g6", level: 2, q: "Along the central line (equal distance to both sources), the water is always…", qZh: "中垂線上(到兩波源等距),水面總是…",
        opts: ["An antinode — Δr = 0 腹點", "A node 節點", "Flat 不動"], a: "An antinode — Δr = 0 腹點",
        hint: "Δr = 0 = mλ with m = 0 → constructive. 零程差即相長。" }
    ]`,
  exam: `[
      { id: "e1", level: 3, q: "Sources S₁, S₂ in phase, 60 mm apart, λ = 10 mm. Point with Δr = 25 mm is…", qZh: "同相波源相距 60 mm,λ = 10 mm。程差 25 mm 的點為…",
        opts: ["Nodal 節點", "Antinodal 腹點", "Central maximum 中央亮紋"], a: "Nodal 節點",
        hint: "25 mm = 2.5λ → odd half-wavelengths → destructive. 換算成波長倍數。" },
      { id: "e2", level: 3, q: "The same ripple-tank pattern explains double-slit light fringes because both rely on…", qZh: "水波干涉圖樣可解釋光的雙縫條紋,因為兩者都基於…",
        opts: ["Superposition from two coherent sources 兩相干波源的疊加", "Refraction 折射", "Photoelectric effect 光電效應", "Polarisation 偏振"], a: "Superposition from two coherent sources 兩相干波源的疊加",
        hint: "Same principle, different medium: path difference decides fringes. 同一疊加原理。" },
      { id: "e3", level: 3, q: "If the two dippers are driven at DIFFERENT frequencies, the pattern…", qZh: "若兩振子以不同頻率驅動,圖樣…",
        opts: ["Blurs and drifts — no stable fringes 模糊漂移,無穩定條紋", "Gets sharper 更清晰", "Stays identical 不變", "Stops instantly 立即停止"], a: "Blurs and drifts — no stable fringes 模糊漂移,無穩定條紋",
        hint: "Coherence fails: phase difference changes with time. 相位差隨時間改變。" },
      { id: "e4", level: 4, q: "Red light (long λ) and blue light (short λ) through the same double slit: which fringes are wider spaced?", qZh: "紅光(長 λ)與藍光(短 λ)通過同一雙縫,哪個條紋較疏?",
        opts: ["Red 紅光", "Blue 藍光", "Same 相同"], a: "Red 紅光",
        hint: "Fringe spacing ∝ λ/d. Longer λ → wider fringes. 間距與波長成正比。" },
      { id: "e5", level: 4, q: "At an antinode, the amplitude is A₁ + A₂. The INTENSITY there (I ∝ A²) compared with one source alone is…", qZh: "腹點振幅為 A₁ + A₂。該處強度(I ∝ A²)與單一波源相比為…",
        opts: ["4× (for equal amplitudes) 4 倍", "2× 2 倍", "√2×", "Same 相同"], a: "4× (for equal amplitudes) 4 倍",
        hint: "Amplitude doubles → intensity squares: (2A)² = 4A². 振幅加倍,強度四倍。" },
      { id: "e6", level: 4, q: "A student claims: 'At a node, energy is destroyed.' Correct statement?", qZh: "有學生說:「節點處能量被消滅。」正確說法是…",
        opts: ["Energy is redistributed — nodes are calm because antinodes carry more 能量重新分佈", "True — cancellation destroys energy 真的,能量被消滅", "Energy converts to mass 變成質量", "It depends on λ 視乎波長"], a: "Energy is redistributed — nodes are calm because antinodes carry more 能量重新分佈",
        hint: "Conservation of energy: calm nodes ↔ extra-lively antinodes. 能量守恆,只是重新分佈。" }
    ]`
};
