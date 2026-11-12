#!/usr/bin/env python3
"""Agent 08/10 — Enrich Biology labs + ICT topic modules from Sample patterns."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

LEARN_FROM_ZERO = r'''
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
'''

BIO_ENRICHMENTS = {
    "Form 4/10_Cardiac_Cycle/index.html": {
        "sample": "cardiac-cycle (Sample Biology apps)",
        "tfz": """const TFZ_STEPS = [
      { id: "A1", title: "Double circulation", titleZh: "雙循環",
        body: "Your heart is TWO pumps in one. The RIGHT side sends deoxygenated blood to the LUNGS (pulmonary circuit). The LEFT side sends oxygenated blood to the BODY (systemic circuit). Blood passes through the heart twice per complete circuit.",
        bodyZh: "心臟是兩個泵合一。右側將缺氧血泵至肺部（肺循環）；左側將含氧血泵至全身（體循環）。血液每完成一個循環經過心臟兩次。",
        q: "Blood from the body enters the heart via…", qZh: "來自身體的血液經…進入心臟",
        opts: ["Vena cava 腔靜脈", "Pulmonary vein 肺靜脈", "Aorta 主動脈", "Coronary artery 冠狀動脈"], a: "Vena cava 腔靜脈",
        why: "Systemic veins return deoxygenated blood to the right atrium." },
      { id: "A2", title: "Chambers & valves", titleZh: "心腔與瓣膜",
        body: "Atria (upper) RECEIVE blood; ventricles (lower) PUMP blood out. Atrioventricular (AV) valves sit between atria and ventricles. Semilunar (SL) valves guard exits to arteries. Valves are ONE-WAY — they prevent backflow.",
        bodyZh: "心房（上）接收血液；心室（下）泵出血液。房室瓣位於心房與心室之間；半月瓣守衛動脈出口。瓣膜單向，防止倒流。",
        q: "Which valves open during ventricular systole?", qZh: "心室收縮時哪組瓣膜開啟？",
        opts: ["Semilunar valves 半月瓣", "AV valves only 只有房室瓣", "All valves 全部", "No valves 無"], a: "Semilunar valves 半月瓣",
        why: "AV valves close so blood is forced into arteries, opening SL valves." },
      { id: "A3", title: "Diastole — filling phase", titleZh: "舒張期——充盈階段",
        body: "During DIASTOLE the heart muscle RELAXES. Pressure falls; blood flows passively from atria into ventricles. Both AV and SL valves are open (SL only if pressure allows). This is ~50% of the cardiac cycle at rest.",
        bodyZh: "舒張期心肌放鬆，壓力下降，血液被動由心房流入心室。房室瓣開啟。約佔心動周期一半。",
        q: "During diastole, ventricles are…", qZh: "舒張期心室…",
        opts: ["Filling with blood 充盈血液", "Contracting hard 強力收縮", "Closed off completely 完全關閉", "Empty only 只有排空"], a: "Filling with blood 充盈血液",
        why: "Relaxation = filling. Systole = pumping." },
      { id: "A4", title: "Atrial then ventricular systole", titleZh: "先心房後心室收縮",
        body: "ATRIAL SYSTOLE: atria contract briefly to 'top up' ventricles before the main pump. VENTRICULAR SYSTOLE: ventricles contract powerfully — AV valves snap shut (lub), SL valves open, blood shoots to lungs/body (dub).",
        bodyZh: "心房收縮：短暫推剩餘血入心室。心室收縮：房室瓣關（lub）、半月瓣開，血液泵至肺/全身（dub）。",
        q: "Atria contract BEFORE ventricles to…", qZh: "心房先於心室收縮是為了…",
        opts: ["Maximise ventricular fill 尽量充盈心室", "Close semilunar valves 關閉半月瓣", "Stop blood flow 阻止血流", "Reduce heart rate 降心率"], a: "Maximise ventricular fill 尽量充盈心室",
        why: "Extra fill = stronger stroke volume." },
      { id: "A5", title: "Left ventricle muscle", titleZh: "左心室肌壁",
        body: "The LEFT ventricle wall is MUCH THICKER than the right because it must pump blood to the entire body at high pressure. The right ventricle only pumps to the nearby lungs at lower pressure.",
        bodyZh: "左心室壁遠厚於右心室，因需將血泵至全身高壓；右心室只需泵至邻近的肺部。",
        q: "Left ventricle wall is thicker because…", qZh: "左心室壁較厚因為…",
        opts: ["Systemic circulation needs higher pressure 体循环需更高壓", "It receives more blood 接收更多血", "It has more valves 有更多瓣", "It beats faster 跳更快"], a: "Systemic circulation needs higher pressure 体循环需更高壓",
        why: "Pressure ∝ distance and resistance of the circuit." },
      { id: "A6", title: "Ready for the lab", titleZh: "準備進入實驗室",
        body: "In the Cardiac Cycle Simulator (from Sample), press START and watch phases cycle: Diastole → Atrial systole → Ventricular systole. Adjust BPM and predict valve states BEFORE the label appears — exam training!",
        bodyZh: "在心動周期模擬器（源自 Sample）按 START，觀察舒張→心房收縮→心室收縮。調整 BPM，在標籤出現前預測瓣膜狀態——備試訓練！",
        q: "The Lab tab unlocks after…", qZh: "實驗分頁在…之後解鎖",
        opts: ["Completing Learn From Zero 完成由零開始學", "Closing browser 關閉瀏覽器", "Nothing 無需"], a: "Completing Learn From Zero 完成由零開始學",
        why: "Learn → Lab → Guided → Exam flow." }
    ];""",
        "lab": """function CardiacSim() {
      const [phase, setPhase] = useState(0);
      const [active, setActive] = useState(false);
      const [bpm, setBpm] = useState(72);
      const phases = [
        { name: "Diastole", zh: "舒張期", desc: "Heart relaxes. Blood flows into atria then ventricles.", av: "OPEN", sl: "CLOSED", color: "#3b82f6" },
        { name: "Atrial systole", zh: "心房收縮", desc: "Atria contract. Remaining blood pushed into ventricles.", av: "OPEN", sl: "CLOSED", color: "#8b5cf6" },
        { name: "Ventricular systole", zh: "心室收縮", desc: "Ventricles contract. Blood pumped to lungs and body.", av: "CLOSED", sl: "OPEN", color: "#dc2626" }
      ];
      useEffect(() => {
        if (!active) return;
        const beatDuration = 60000 / bpm;
        const ratios = [4, 1, 3];
        const unit = beatDuration / 8;
        const duration = unit * ratios[phase];
        const t = setTimeout(() => setPhase(p => (p + 1) % 3), duration);
        return () => clearTimeout(t);
      }, [phase, active, bpm]);
      const info = phases[phase];
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button type="button" onClick={() => setActive(!active)} className="px-4 py-2.5 rounded-xl font-bold text-white min-h-[48px]" style={{background: active ? "#64748b" : ACCENT}}>
              {active ? "Pause · 暫停" : "Start heartbeat · 開始心跳"}
            </button>
            <label className="text-sm font-semibold flex items-center gap-2">BPM {bpm}
              <input type="range" min="40" max="120" value={bpm} onChange={e => setBpm(+e.target.value)} className="w-32" />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {phases.map((p, idx) => (
              <div key={p.name} className={"p-3 rounded-xl border-2 text-center transition-all " + (phase === idx ? "border-rose-400 bg-rose-50 shadow-md scale-[1.02]" : "border-slate-200 bg-slate-50 opacity-70")}>
                <p className="text-xs font-bold uppercase" style={{color: p.color}}>{p.name}</p>
                <p className="text-xs text-slate-500">{p.zh}</p>
              </div>
            ))}
          </div>
          <p className="text-sm p-4 rounded-xl bg-rose-50 border border-rose-100">{info.desc}<br /><span className="text-slate-500">{info.zh}</span></p>
          <div className="grid grid-cols-2 gap-3">
            <div className={"p-4 rounded-xl border-2 text-center " + (info.av === "OPEN" ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-slate-100")}>
              <p className="text-xs font-bold text-slate-500">AV Valves · 房室瓣</p>
              <p className="text-2xl font-black mt-1">{info.av}</p>
            </div>
            <div className={"p-4 rounded-xl border-2 text-center " + (info.sl === "OPEN" ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-slate-100")}>
              <p className="text-xs font-bold text-slate-500">Semilunar · 半月瓣</p>
              <p className="text-2xl font-black mt-1">{info.sl}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center">Pattern from Sample cardiac-cycle · 源自 Sample 心動周期模擬</p>
        </div>
      );
    }""",
        "hub": "../index.html",
        "subtitle": "心臟與雙循環 · Learn (A1–A6) → Lab → Guided → Exam → Review",
        "lab_title": "Cardiac Cycle Simulator · 心動周期模擬器",
    },
    "Form 4/12_Osmosis_Sandbox/index.html": {
        "sample": "fluid-mosaic-model + food-test lab UI (Sample Biology)",
        "tfz": """const TFZ_STEPS = [
      { id: "A1", title: "Water potential (ψ)", titleZh: "水勢 (ψ)",
        body: "Water moves from regions of HIGHER water potential to LOWER water potential. Pure water has the highest ψ. Adding SOLUTE lowers ψ because fewer water molecules are 'free' to move.",
        bodyZh: "水從水勢較高處移向較低處。純水水勢最高；加溶質會降低水勢，因自由水分子減少。",
        q: "Adding salt to water generally…", qZh: "向水中加鹽通常…",
        opts: ["Lowers water potential 降低水勢", "Raises water potential 提高水勢", "Has no effect 無影響", "Stops diffusion 停止擴散"], a: "Lowers water potential 降低水勢",
        why: "Solute binds water — less free water = lower ψ." },
      { id: "A2", title: "Osmosis definition", titleZh: "滲透定義",
        body: "OSMOSIS is the net movement of WATER molecules through a partially permeable membrane from higher ψ to lower ψ. It is passive — no ATP needed. Only WATER moves, not the solute.",
        bodyZh: "滲透是水分子穿過半透膜、從高水勢到低水勢的淨移動。屬被動，不需 ATP。只有水移動，溶質不過膜。",
        q: "Osmosis involves movement of…", qZh: "滲透涉及…的移動",
        opts: ["Water only 只有水", "Solute only 只有溶質", "Both equally 兩者均等", "Ions against gradient 逆梯度離子"], a: "Water only 只有水",
        why: "Membrane blocks most solutes; water passes." },
      { id: "A3", title: "Turgid, plasmolysed, lysed", titleZh: "充盈、質壁分離、溶血",
        body: "Plant cell in pure water → water enters → TURGID (firm). Plant in salty solution → water leaves → PLASMOLYSIS (membrane pulls away). Animal cell (no wall) in pure water → swells and LYSES (bursts).",
        bodyZh: "植物在純水中→水進入→充盈。在鹽水中→水離開→質壁分離。動物細胞在純水中→膨脹溶血。",
        q: "A red blood cell in distilled water will…", qZh: "紅血球在蒸餾水中會…",
        opts: ["Swell and burst (lyse) 膨脹破裂", "Shrink only 只收縮", "Stay unchanged 不變", "Become plasmolysed 質壁分離"], a: "Swell and burst (lyse) 膨脹破裂",
        why: "No cell wall → cannot resist osmotic inflow." },
      { id: "A4", title: "Isotonic equilibrium", titleZh: "等滲平衡",
        body: "When external ψ equals cell ψ, there is NO NET osmosis — the cell neither gains nor loses mass. This is an ISOTONIC solution. Medical saline (~0.9% NaCl) matches blood cells.",
        bodyZh: "當外部水勢等於細胞水勢，無淨滲透——細胞質量不變。此為等滲溶液。生理鹽水（~0.9% NaCl）匹配血細胞。",
        q: "An isotonic solution means…", qZh: "等滲溶液指…",
        opts: ["No net water movement 無淨水移動", "Water always enters 水一定進入", "Water always leaves 水一定離開", "Only active transport 只有主動運輸"], a: "No net water movement 無淨水移動",
        why: "Equal ψ on both sides → balanced." },
      { id: "A5", title: "Root hairs & soil", titleZh: "根毛與土壤",
        body: "Root hair cells absorb water from moist soil by OSMOSIS because soil water ψ > root cell ψ. Mineral ions enter by active transport, which can lower cell ψ and help draw more water.",
        bodyZh: "根毛從濕潤土壤以滲透吸水，因土壤水勢 > 根細胞水勢。礦物離子以主動運輸進入，可降低細胞水勢助吸水。",
        q: "Root hairs absorb water mainly by…", qZh: "根毛主要藉…吸水",
        opts: ["Osmosis 滲透", "Active transport of water 水的主動運輸", "Wind 風", "Photosynthesis 光合作用"], a: "Osmosis 滲透",
        why: "Passive water flow down ψ gradient." },
      { id: "A6", title: "Ready for the sandbox", titleZh: "準備進入沙盒",
        body: "Use the Osmosis Sandbox: slide external solute concentration and predict whether water enters, leaves, or balances. Watch the cell shape change — Sample-style instant feedback!",
        bodyZh: "使用滲透沙盒：調節外部溶質濃度，預測水進、出或平衡，觀察細胞形狀變化——Sample 式即時回饋！",
        q: "In the lab, increasing external solute makes the cell…", qZh: "實驗中增加外部溶質使細胞…",
        opts: ["Lose water / shrink 失水收縮", "Always burst 一定破裂", "Ignore osmosis 忽略滲透", "Gain mass always 一定增重"], a: "Lose water / shrink 失水收縮",
        why: "Hypertonic outside → water exits cell." }
    ];""",
        "lab": """function OsmosisSim() {
      const [ext, setExt] = useState(0.15);
      const [cellType, setCellType] = useState("plant");
      const internal = 0.1;
      const diff = ext - internal;
      let state, stateZh, color, waterDir;
      if (Math.abs(diff) < 0.02) { state = "Isotonic — no net movement"; stateZh = "等滲——無淨移動"; color = "#64748b"; waterDir = "↔"; }
      else if (diff > 0) { state = cellType === "plant" ? "Plasmolysed — water leaves" : "Shrunk / crenated"; stateZh = cellType === "plant" ? "質壁分離——水離開" : "收縮皺縮"; color = "#dc2626"; waterDir = "← out"; }
      else { state = cellType === "plant" ? "Turgid — water enters" : "Swollen — may lyse!"; stateZh = cellType === "plant" ? "充盈——水進入" : "膨脹——可能溶血！"; color = "#059669"; waterDir = "→ in"; }
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {["plant", "animal"].map(t => (
              <button key={t} type="button" onClick={() => setCellType(t)} className={"px-3 py-2 rounded-xl font-bold min-h-[44px] capitalize " + (cellType === t ? "text-white" : "bg-slate-100")} style={cellType === t ? {background: ACCENT} : {}}>{t === "plant" ? "Plant cell 植物" : "Animal cell 動物"}</button>
            ))}
          </div>
          <label className="text-sm font-semibold block">External solute (relative) · 外部溶質 {ext.toFixed(2)}</label>
          <input type="range" min="0" max="0.5" step="0.01" value={ext} onChange={e => setExt(+e.target.value)} className="w-full" />
          <div className="flex justify-center py-6">
            <div className="relative">
              {cellType === "plant" && <div className="w-40 h-48 border-4 border-emerald-700 rounded-lg flex items-center justify-center" style={{background: "#ecfdf5"}}>
                <div className="rounded-full border-2 border-teal-400 transition-all duration-500" style={{width: diff > 0.02 ? "60%" : "85%", height: diff > 0.02 ? "60%" : "85%", background: "rgba(13,148,136,0.2)"}} />
              </div>}
              {cellType === "animal" && <div className="w-36 h-36 rounded-full border-2 border-rose-400 flex items-center justify-center transition-all duration-500" style={{background: "rgba(244,63,94,0.15)", transform: diff < -0.02 ? "scale(1.15)" : diff > 0.02 ? "scale(0.85)" : "scale(1)"}}>
                <span className="text-2xl">🩸</span>
              </div>}
              <p className="text-center text-2xl font-bold mt-2" style={{color}}>{waterDir}</p>
            </div>
          </div>
          <p className="text-sm p-4 rounded-xl border font-semibold" style={{background: color + "18", borderColor: color + "44", color}}>{state}<br /><span className="font-normal opacity-80">{stateZh}</span></p>
          <p className="text-xs text-slate-500 text-center">Sample pattern: slider → live cell response · 滑桿即時細胞反應</p>
        </div>
      );
    }""",
        "hub": "../index.html",
        "subtitle": "滲透沙盒 · Learn (A1–A6) → Lab → Guided → Exam → Review",
        "lab_title": "Osmosis Cell Sandbox · 滲透細胞沙盒",
    },
    "Form 5/10_Energy_Flow/index.html": {
        "sample": "energy-flow (Sample Biology — 10% law particle animation)",
        "tfz": """const TFZ_STEPS = [
      { id: "A1", title: "Sunlight — the input", titleZh: "陽光——能量輸入",
        body: "Almost all ecosystem energy starts as SUNLIGHT. Producers (plants, algae) capture light via photosynthesis and store it as chemical energy in glucose. This is gross primary production (GPP).",
        bodyZh: "幾乎所有生態系統能量始於陽光。生產者（植物、藻類）以光合作用固定光能，儲於葡萄糖。即總初級生產量 (GPP)。",
        q: "The ultimate energy source for most ecosystems is…", qZh: "大多數生態系統的終極能量來源是…",
        opts: ["Sunlight 陽光", "Decomposers 分解者", "Heat from core 地核熱", "Consumers 消費者"], a: "Sunlight 陽光",
        why: "Producers convert light → chemical energy." },
      { id: "A2", title: "The 10% rule", titleZh: "10% 法則",
        body: "On average only ~10% of energy at one trophic level passes to the NEXT. The rest is lost as HEAT (respiration), movement, faeces, or parts not eaten. This limits food chain length to ~4–5 levels.",
        bodyZh: "平均只有約 10% 能量傳至下一營養級。其餘以熱（呼吸）、活動、糞便或未食部分流失。限制食物鏈約 4–5 級。",
        q: "Roughly what % passes to the next trophic level?", qZh: "約多少 % 傳至下一營養級？",
        opts: ["~10% 約 10%", "~90%", "~50%", "100%"], a: "~10% 約 10%",
        why: "Energy loss at each transfer — 2nd law of thermodynamics." },
      { id: "A3", title: "Trophic levels", titleZh: "營養級",
        body: "Level 1 = PRODUCERS. Level 2 = primary consumers (herbivores). Level 3 = secondary consumers. Level 4+ = tertiary/top predators. Decomposers recycle NUTRIENTS (not energy) from all levels.",
        bodyZh: "第一級=生產者；第二級=初級消費者（草食）；第三級=次級消費者；第四級+=頂級捕食者。分解者回收營養（非能量）。",
        q: "Producers occupy trophic level…", qZh: "生產者位於營養級…",
        opts: ["1 第一級", "2", "4 only", "0"], a: "1 第一級",
        why: "First capture of energy into living biomass." },
      { id: "A4", title: "Pyramid of energy", titleZh: "能量金字塔",
        body: "A pyramid of ENERGY is always upright (wide base, narrow top) because energy DECREASES at each level. Pyramids of numbers or biomass can be inverted (e.g. many parasites on one host), but energy never increases upward.",
        bodyZh: "能量金字塔總是正向（底寬頂窄），因每級能量遞減。數量或生物量金字塔可倒轉，但能量不會向上增加。",
        q: "Energy pyramids are always upright because…", qZh: "能量金字塔總是正向因為…",
        opts: ["Energy lost at each transfer 每級能量流失", "Producers are heaviest 生產者最重", "Predators are fewest 捕食者最少", "Sunlight increases upward 向上陽光增"], a: "Energy lost at each transfer 每級能量流失",
        why: "Less usable energy available above." },
      { id: "A5", title: "Energy vs nutrients", titleZh: "能量 vs 營養",
        body: "ENERGY flows one way: sun → producers → consumers → heat. NUTRIENTS (C, N, P) CYCLE: decomposers return minerals to soil → producers reabsorb. Energy cannot be recycled; nutrients can.",
        bodyZh: "能量單向流：太陽→生產者→消費者→熱。營養（C、N、P）循環：分解者還原至土壤→生產者再吸收。能量不可循環；營養可以。",
        q: "Why can't energy be recycled in ecosystems?", qZh: "為何能量不能在生態系統循環？",
        opts: ["Dissipated as heat 以熱散失", "Locked in rocks 鎖在岩石", "Destroyed by producers 被生產者破壞", "Only in water 只在水"], a: "Dissipated as heat 以熱散失",
        why: "Heat cannot be re-captured by photosynthesis efficiently." },
      { id: "A6", title: "Ready for the pyramid lab", titleZh: "準備進入金字塔實驗",
        body: "The Energy Pyramid Builder (Sample energy-flow pattern): enter 10,000 J sunlight and watch ~10% transfer per level. Toggle levels and predict energy at each trophic step!",
        bodyZh: "能量金字塔建構器（Sample energy-flow 模式）：輸入 10000 J 陽光，觀察每級約 10% 傳遞。切換營養級，預測每步能量！",
        q: "10,000 J at producers ≈ how much at primary consumers?", qZh: "生產者 10000 J ≈ 初級消費者多少？",
        opts: ["~1,000 J 約 1000 J", "~10,000 J", "~100 J", "~5,000 J"], a: "~1,000 J 約 1000 J",
        why: "Apply 10% rule once: 10000 × 0.1 = 1000." }
    ];""",
        "lab": """function EnergyPyramidSim() {
      const [input, setInput] = useState(10000);
      const [level, setLevel] = useState(1);
      const levels = ["Producers 生產者", "Primary consumers 初級消費者", "Secondary 次級", "Tertiary 三級"];
      const energies = [input, input * 0.1, input * 0.01, input * 0.001];
      const [particles, setParticles] = useState([]);
      useEffect(() => {
        if (level < 4) {
          const lost = energies[level - 1] - energies[level];
          setParticles(Array.from({length: 8}, (_, i) => ({ id: Date.now() + i, pct: (i + 1) * 12 })));
          const t = setTimeout(() => setParticles([]), 1200);
          return () => clearTimeout(t);
        }
      }, [level, input]);
      return (
        <div className="space-y-4">
          <label className="text-sm font-semibold">Sunlight input (J) · 陽光輸入 {input.toLocaleString()}</label>
          <input type="range" min="1000" max="50000" step="1000" value={input} onChange={e => setInput(+e.target.value)} className="w-full" />
          <div className="flex flex-col items-center gap-1 py-4">
            {levels.map((lbl, idx) => {
              const w = 100 - idx * 18;
              const e = energies[idx];
              const active = level === idx + 1;
              return (
                <button key={lbl} type="button" onClick={() => setLevel(idx + 1)} className={"rounded-lg border-2 py-3 font-bold text-sm transition-all min-h-[48px] " + (active ? "border-amber-500 bg-amber-50 shadow-md" : "border-slate-200 bg-slate-50 opacity-80")} style={{width: w + "%"}}>
                  L{idx + 1} {lbl}: {e >= 1 ? e.toLocaleString(undefined, {maximumFractionDigits: 0}) : e.toFixed(2)} J
                </button>
              );
            })}
          </div>
          {level < 4 && (
            <p className="text-sm p-3 rounded-xl bg-amber-50 border border-amber-200">
              ~90% lost as heat · 約 90% 以熱流失 → only ~10% to next level
              {particles.length > 0 && <span className="block mt-1 text-rose-600 animate-pulse">🔥 Energy dissipating…</span>}
            </p>
          )}
          <p className="text-xs text-slate-500 text-center">Sample energy-flow: 10% transfer pyramid · 10% 傳遞金字塔</p>
        </div>
      );
    }""",
        "hub": "../index.html",
        "subtitle": "生態系統能量流動 · Learn (A1–A6) → Lab → Guided → Exam → Review",
        "lab_title": "Energy Pyramid Builder · 能量金字塔建構",
    },
}

ICT_QUIZ_BLOCK = r'''
const HKDSE_QUIZ = [
  { q: "PLACEHOLDER_Q1", qZh: "PLACEHOLDER_QZ1", opts: ["A", "B", "C", "D"], a: "A", hint: "HINT1" },
  { q: "PLACEHOLDER_Q2", qZh: "PLACEHOLDER_QZ2", opts: ["A", "B", "C", "D"], a: "B", hint: "HINT2" },
  { q: "PLACEHOLDER_Q3", qZh: "PLACEHOLDER_QZ3", opts: ["A", "B", "C", "D"], a: "C", hint: "HINT3" },
];

function QuizPanel({ accent }) {
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const item = HKDSE_QUIZ[qi];
  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    const ok = opt === item.a;
    if (window.HkcSampleUI) HkcSampleUI.toast({ type: ok ? "success" : "error", zh: ok ? "正確！" : "再想想", en: ok ? "Correct!" : "Try again", isZh: false, duration: 2000 });
    if (ok) setScore(s => s + 1);
  }
  function next() {
    if (qi + 1 >= HKDSE_QUIZ.length) return;
    setQi(qi + 1); setPicked(null);
  }
  const done = qi === HKDSE_QUIZ.length - 1 && picked;
  return React.createElement("div", { className: "bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4" },
    React.createElement("h3", { className: "text-white font-bold flex items-center gap-2" },
      React.createElement(Icon, { name: "GraduationCap" }), " HKDSE Challenge · 挑戰測驗"),
    React.createElement("p", { className: "text-slate-400 text-sm" }, "Q ", qi + 1, "/", HKDSE_QUIZ.length, " · Score ", score),
    React.createElement("p", { className: "text-white font-semibold" }, item.q),
    React.createElement("p", { className: "text-slate-500 text-sm" }, item.qZh),
    React.createElement("div", { className: "grid gap-2" }, item.opts.map(o =>
      React.createElement("button", { key: o, type: "button", onClick: () => choose(o),
        className: "text-left px-4 py-3 rounded-xl min-h-[48px] font-mono text-sm " + (picked === o ? (o === item.a ? "bg-emerald-900/50 border-2 border-emerald-500 text-emerald-200" : "bg-rose-900/50 border-2 border-rose-500") : "bg-slate-900 border border-slate-600 hover:bg-slate-700 text-slate-200") }, o))),
    picked && picked !== item.a && React.createElement("p", { className: "text-amber-300 text-sm" }, "Hint: ", item.hint),
    picked && React.createElement("button", { type: "button", onClick: next, className: "px-4 py-2 rounded-lg font-bold text-white min-h-[44px]", style: { background: accent || "#8b5cf6" } }, done ? "Quiz complete · 完成" : "Next →")
  );
}
'''

ICT_ENRICHMENTS = {
    "Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_Floating_Point/index.html": {
        "kit_script": '<script src="../../../../../../common/sample-ui-kit.js"></script>',
        "quiz": """const HKDSE_QUIZ = [
  { q: "In Excess-4 notation with 3 exponent bits, stored value 100 means real exponent…", qZh: "Excess-4 三比特指數，存儲值 100 表示真實指數…", opts: ["0 (4−4)", "4", "−4", "100"], a: "0 (4−4)", hint: "Real exp = stored − Excess (4)." },
  { q: "Sign bit 1 in floating point means the number is…", qZh: "浮點符號位 1 表示數值為…", opts: ["Negative 負數", "Positive 正數", "Zero only 僅零", "Infinity 無限"], a: "Negative 負數", hint: "S=1 → multiply by (−1)." },
  { q: "Mantissa 1.1010₂ with exponent 0 gives decimal…", qZh: "尾數 1.1010₂ 指數 0 的十進值為…", opts: ["1.625", "1.101", "6.5", "0.625"], a: "1.625", hint: "1 + 1/2 + 0/4 + 1/8 + 0/16 = 1.625." },
];
""",
    },
    "Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_Logic_Gates/index.html": {
        "kit_script": '<script src="../../../../../../common/sample-ui-kit.js"></script>',
        "quiz": """const HKDSE_QUIZ = [
  { q: "A AND gate output is 1 only when…", qZh: "AND 閘輸出 1 僅當…", opts: ["All inputs are 1 全部輸入為 1", "Any input is 1 任一輸入為 1", "Inputs differ 輸入不同", "Never 從不"], a: "All inputs are 1 全部輸入為 1", hint: "AND = intersection of 1s." },
  { q: "NOT A when A=1 gives…", qZh: "NOT A 當 A=1 得…", opts: ["0", "1", "A", "Undefined 未定"], a: "0", hint: "NOT inverts the bit." },
  { q: "(A OR B) AND NOT C with A=1,B=0,C=0 equals…", qZh: "(A OR B) AND NOT C，A=1,B=0,C=0 等於…", opts: ["1", "0", "C", "Undefined"], a: "1", hint: "(1 OR 0)=1; NOT 0=1; 1 AND 1=1." },
];
""",
    },
    "Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_Data_Transfer/index.html": {
        "kit_script": '<script src="../../../../../../common/sample-ui-kit.js"></script>',
        "quiz": """const HKDSE_QUIZ = [
  { q: "Transfer time = file size ÷ bandwidth. A 8 MB file at 2 Mbps takes…", qZh: "傳輸時間=檔案大小÷頻寬。8 MB 以 2 Mbps 需…", opts: ["~32 seconds 約 32 秒", "4 seconds", "16 seconds", "1 second"], a: "~32 seconds 約 32 秒", hint: "8 MB = 64 Mb; 64/2 = 32 s." },
  { q: "1 byte equals how many bits?", qZh: "1 byte 等於多少 bits？", opts: ["8", "4", "1024", "16"], a: "8", hint: "Standard byte definition." },
  { q: "Using 1024-based units, 1 GB equals…", qZh: "以 1024 為基，1 GB 等於…", opts: ["1024 MB", "1000 MB", "8 MB", "1024 KB"], a: "1024 MB", hint: "Binary prefixes: ×1024 per step." },
];
""",
    },
}


def enrich_biology(rel_path: str, cfg: dict) -> bool:
    path = ROOT / rel_path.replace("/", "\\").replace("Form 4", "Secondary_School\\Biology\\Form 4").replace("Form 5", "Secondary_School\\Biology\\Form 5")
    if not path.exists():
        # try direct
        path = ROOT / "Secondary_School" / "Biology" / rel_path
    if not path.exists():
        print(f"MISSING {path}")
        return False
    text = path.read_text(encoding="utf-8")
    if "TFZ_STEPS" in text:
        print(f"SKIP (already enriched): {path.name}")
        return False

    # Insert TFZ + LearnFromZero + Lab after HKC block
    anchor = "    })();\n\n        const GUIDED"
    if anchor not in text:
        anchor = "    })();\n\n    const GUIDED"
    if anchor not in text:
        print(f"NO ANCHOR: {path}")
        return False

    insertion = f"    }});\n\n{cfg['tfz']}\n{LEARN_FROM_ZERO}\n{cfg['lab']}\n\n        const GUIDED"
    text = text.replace(anchor, insertion, 1)

    # Add canvas style if missing
    if "canvas.sim" not in text:
        text = text.replace(
            "button, a { -webkit-tap-highlight-color: transparent; }",
            "button, a { -webkit-tap-highlight-color: transparent; }\n    canvas.sim { width: 100%; border-radius: 12px; display: block; }",
            1,
        )

    # Replace App tabs and learn section
    old_app_header = '<div className="max-w-3xl mx-auto p-4 sm:p-8">'
    new_app_header = '<div className="max-w-5xl mx-auto p-4 sm:p-8">'
    text = text.replace(old_app_header, new_app_header, 1)

    # Replace subtitle
    text = re.sub(
        r"<p className=\"text-slate-500 mt-1\">[^<]+</p>",
        f'<p className="text-slate-500 mt-1">{cfg["subtitle"]}</p>',
        text,
        count=1,
    )

    # Patch App function - add tfzDone state and lab tab
    text = text.replace(
        'const [doneMsg, setDoneMsg] = useState(null);\n\n      function refresh()',
        'const [doneMsg, setDoneMsg] = useState(null);\n      const [tfzDone, setTfzDone] = useState(() => { try { return !!localStorage.getItem("hkc_tfz_" + APP_ID); } catch (e) { return false; } });\n\n      function refresh()',
        1,
    )
    text = text.replace(
        """      const tabs = [
        { id: "learn", label: "Learn · 學習" },
        { id: "guided", label: "Guided · 引導" },
        { id: "exam", label: "Exam · 測驗" },
        { id: "review", label: "Review · 錯題" }
      ];""",
        """      function completeTfz() {
        try { localStorage.setItem("hkc_tfz_" + APP_ID, "1"); } catch (e) {}
        setTfzDone(true); setMode("lab");
      }

      const tabs = [
        { id: "learn", label: "Learn · 學習" },
        { id: "lab", label: tfzDone ? "Lab · 實驗" : "Lab 🔒" },
        { id: "guided", label: "Guided · 引導" },
        { id: "exam", label: "Exam · 測驗" },
        { id: "review", label: "Review · 錯題" }
      ];""",
        1,
    )

    # Replace learn section
    learn_old = """          {mode === "learn" && (
            <section className={"bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 space-y-3"}>
              <h2 className="font-bold text-lg">Key ideas</h2>
              <ul className={"text-sm space-y-2 list-disc list-inside " + (false ? "text-slate-300" : "text-slate-600")}>
                <li>Double circulation: pulmonary + systemic pathways.</li><li>Valves prevent backflow; atria then ventricles contract in sequence.</li><li>Arteries vs veins: wall thickness / pressure / valves in veins.</li>
              </ul>
              <LearnExtra />
              <button type="button" className="mt-2 px-4 py-2.5 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}} onClick={() => setMode("guided")}>
                Start guided practice →
              </button>
            </section>
          )}"""

    learn_osmosis = """          {mode === "learn" && (
            <section className={"bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 space-y-3"}>
              <h2 className="font-bold text-lg">Key ideas</h2>
              <ul className={"text-sm space-y-2 list-disc list-inside " + (false ? "text-slate-300" : "text-slate-600")}>
                <li>Osmosis = water through partially permeable membrane.</li><li>Water moves from higher to lower water potential.</li><li>Plant turgid / plasmolysed; animal cells may lyse.</li>
              </ul>
              <LearnExtra />
              <button type="button" className="mt-2 px-4 py-2.5 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}} onClick={() => setMode("guided")}>
                Start guided practice →
              </button>
            </section>
          )}"""

    learn_energy = """          {mode === "learn" && (
            <section className={"bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 space-y-3"}>
              <h2 className="font-bold text-lg">Key ideas</h2>
              <ul className={"text-sm space-y-2 list-disc list-inside " + (false ? "text-slate-300" : "text-slate-600")}>
                <li>Sunlight → producers → consumers; ~10% per level.</li><li>Energy lost as heat; nutrients cycle via decomposers.</li><li>Energy pyramid always upright.</li>
              </ul>
              <LearnExtra />
              <button type="button" className="mt-2 px-4 py-2.5 rounded-xl font-semibold min-h-[48px] text-white" style={{background: ACCENT}} onClick={() => setMode("guided")}>
                Start guided practice →
              </button>
            </section>
          )}"""

    learn_new = """          {mode === "learn" && <LearnFromZero steps={TFZ_STEPS} onComplete={completeTfz} />}

          {mode === "lab" && !tfzDone && (
            <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 text-center">
              <h2 className="text-xl font-bold">Finish Learn From Zero first · 先完成 A1–A6</h2>
              <p className="text-sm text-slate-500 mt-2">We teach the model before you play. 先學模型，後做實驗。</p>
              <button type="button" className="mt-4 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[48px]" style={{background: ACCENT}} onClick={() => setMode("learn")}>Go to Learn →</button>
            </section>
          )}
          {mode === "lab" && tfzDone && (
            <section className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5">
              <h2 className="font-bold text-lg mb-3">LAB_TITLE</h2>
              LAB_COMPONENT
            </section>
          )}"""

    lab_component = "CardiacSim" if "Cardiac" in cfg["lab_title"] else ("OsmosisSim" if "Osmosis" in cfg["lab_title"] else "EnergyPyramidSim")
    learn_new = learn_new.replace("LAB_TITLE", cfg["lab_title"]).replace("LAB_COMPONENT", f"<{lab_component} />")

    for old in [learn_old, learn_osmosis, learn_energy]:
        if old in text:
            text = text.replace(old, learn_new, 1)
            break
    else:
        # generic key ideas block
        text = re.sub(
            r'\{mode === "learn" && \(\s*<section className=\{"bg-white[^}]+\}\s*\)\s*\}',
            learn_new.replace("{", "{{").replace("}", "}}"),
            text,
            count=1,
            flags=re.DOTALL,
        )

    path.write_text(text, encoding="utf-8")
    print(f"ENRICHED Biology: {path.relative_to(ROOT)} ({cfg['sample']})")
    return True


def enrich_ict(rel_path: str, cfg: dict) -> bool:
    path = ROOT / rel_path.replace("/", "\\")
    if not path.exists():
        print(f"MISSING {path}")
        return False
    text = path.read_text(encoding="utf-8")
    if "HKDSE_QUIZ" in text:
        print(f"SKIP (already enriched): {path.name}")
        return False

    if cfg["kit_script"] not in text:
        text = text.replace("</head>", f"  {cfg['kit_script']}\n</head>", 1)

    quiz_panel = ICT_QUIZ_BLOCK.replace("const HKDSE_QUIZ = [", cfg["quiz"].strip())
    # Insert before App =
    app_match = re.search(r"\nconst App = \(\) =>", text)
    if not app_match:
        print(f"NO APP in {path}")
        return False
    text = text[: app_match.start()] + "\n" + quiz_panel + text[app_match.start() :]

    # Add tab state and quiz to App - find return and wrap
    if "const [tab, setTab]" not in text:
        text = text.replace(
            "const App = () => {",
            'const App = () => {\n  const [tab, setTab] = useState("sim");',
            1,
        )

    # Inject tab buttons after first header in return - simplistic: append quiz at end of main div
    if "<QuizPanel" not in text:
        # Find ReactDOM.render
        render_idx = text.find("ReactDOM.createRoot")
        if render_idx == -1:
            render_idx = text.find("ReactDOM.render")
        # Insert tab UI before closing of outer space-y-6 div - add after first header block
        tab_ui = """,
  /*#__PURE__*/React.createElement("div", { className: "flex gap-2 mb-2" },
    ["sim", "quiz"].map(t => /*#__PURE__*/React.createElement("button", {
      key: t, onClick: () => setTab(t),
      className: "px-4 py-2 rounded-lg font-bold min-h-[44px] " + (tab === t ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300")
    }, t === "sim" ? "Simulator · 模擬" : "HKDSE Quiz · 測驗"))),
  tab === "quiz" && /*#__PURE__*/React.createElement(QuizPanel, { accent: "#8b5cf6" }),
  tab === "sim" && /*#__PURE__*/React.createElement(React.Fragment, null"""
        # This is fragile for compiled JSX - use simpler approach: append quiz section at end of App return
        # Find `return /*#__PURE__*/React.createElement("div"` and add tabs after opening
        marker = 'return /*#__PURE__*/React.createElement("div", {'
        idx = text.find(marker)
        if idx == -1:
            print(f"NO RETURN in {path}")
            return False
        # Find matching closing - instead append quiz before final closing paren of return
        # Simpler: insert quiz panel call before ReactDOM
        insert_before = "ReactDOM.createRoot(document.getElementById(\"root\")).render"
        if insert_before not in text:
            insert_before = "ReactDOM.render"
        # Add render wrapper with tabs in App - patch App return to include quiz at bottom
        old_end = ");\n};\n\n" + insert_before
        if old_end not in text:
            # try without newline
            pass
        # Append quiz as sibling in space-y-6 - find last `);` before render
        render_pos = text.find(insert_before)
        chunk = text[:render_pos]
        # Insert before the final `});` of App - find last `});` before render
        last_close = chunk.rfind("});")
        if last_close > 0:
            # insert quiz panel element before closing of outer div
            quiz_el = """, /*#__PURE__*/React.createElement("div", { className: "flex gap-2" },
    /*#__PURE__*/React.createElement("button", { type: "button", onClick: () => setTab("sim"), className: "px-4 py-2 rounded-lg font-bold " + (tab === "sim" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300") }, "Simulator"),
    /*#__PURE__*/React.createElement("button", { type: "button", onClick: () => setTab("quiz"), className: "px-4 py-2 rounded-lg font-bold " + (tab === "quiz" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300") }, "HKDSE Quiz")),
  tab === "quiz" ? /*#__PURE__*/React.createElement(QuizPanel, { accent: "#8b5cf6" }) : null"""
            # insert after first child of space-y-6 - after header block
            header_end = chunk.find("HKDSE ICT Ch")
            if header_end > 0:
                # find next `)),` after header section
                pass

    # Manual simpler patch: add quiz at end of return value
    if "QuizPanel" not in text:
        # Find `className: "space-y-6"` block end - insert before last `);` of App
        pattern = r'(className: "space-y-6"\s*\}[^;]+)(\);\s*\};\s*\n\s*' + re.escape(insert_before.split("(")[0]) + r')'
        def replacer(m):
            return m.group(1) + """, /*#__PURE__*/React.createElement("div", { className: "flex gap-2 pt-4 border-t border-slate-700" },
    /*#__PURE__*/React.createElement("button", { onClick: () => setTab("sim"), className: "px-4 py-2 rounded-lg font-bold min-h-[44px] " + (tab === "sim" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300") }, "Simulator · 模擬"),
    /*#__PURE__*/React.createElement("button", { onClick: () => setTab("quiz"), className: "px-4 py-2 rounded-lg font-bold min-h-[44px] " + (tab === "quiz" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300") }, "HKDSE Quiz · 挑戰")),
  tab === "quiz" && /*#__PURE__*/React.createElement(QuizPanel, { accent: "#a855f7" })""" + m.group(2)
        new_text, n = re.subn(pattern, replacer, text, count=1, flags=re.DOTALL)
        if n:
            text = new_text
        else:
            # fallback: append before render
            text = text.replace(
                insert_before,
                quiz_panel + "\n\n" + insert_before,
                1,
            )

    path.write_text(text, encoding="utf-8")
    print(f"ENRICHED ICT: {path.relative_to(ROOT)}")
    return True


def main():
    bio_ok = 0
    for rel, cfg in BIO_ENRICHMENTS.items():
        if enrich_biology(rel, cfg):
            bio_ok += 1
    ict_ok = 0
    for rel, cfg in ICT_ENRICHMENTS.items():
        if enrich_ict(rel, cfg):
            ict_ok += 1
    print(f"\nDone: {bio_ok} Biology, {ict_ok} ICT modules enriched.")


if __name__ == "__main__":
    main()
