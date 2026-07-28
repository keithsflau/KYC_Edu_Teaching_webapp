#!/usr/bin/env python3
"""Generate LGER-wrapped Form 2 Junior Science apps from config."""
import json
import os
import textwrap

BASE = os.path.join(os.path.dirname(__file__), "..", "Secondary_School", "Junior Science", "Form 2")
COMMON = "../../../../common/junior-science-lger.js"

EXPERIMENTS = {
"photosynthesis": '''
function ExperimentLab({ isZh, accent }) {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(50);
  const t = window.JSLGER.t;
  const rate = Math.round((light * co2) / 100);
  const glucose = Math.min(100, rate);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節光強和二氧化碳濃度，觀察葡萄糖產量。", "Adjust light and CO₂ to see glucose production.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("光強", "Light intensity")}: {light}%</label>
      <input type="range" min="0" max="100" value={light} onChange={e => setLight(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("二氧化碳", "CO₂")}: {co2}%</label>
      <input type="range" min="0" max="100" value={co2} onChange={e => setCo2(+e.target.value)} className="w-full" />
      <div className="h-8 rounded-full bg-slate-200 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: glucose + "%", background: accent }} />
      </div>
      <p className="font-bold" style={{ color: accent }}>{t("葡萄糖產量", "Glucose produced")}: {glucose}%</p>
      <p className="text-xs text-slate-500">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>
    </div>
  );
}''',
"respiration": '''
function ExperimentLab({ isZh, accent }) {
  const [glucose, setGlucose] = useState(1);
  const [o2, setO2] = useState(6);
  const t = window.JSLGER.t;
  const atp = Math.min(38, glucose * 6);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節葡萄糖和氧氣，計算 ATP 能量。", "Adjust glucose and oxygen to calculate ATP energy.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("葡萄糖分子", "Glucose molecules")}: {glucose}</label>
      <input type="range" min="1" max="5" value={glucose} onChange={e => setGlucose(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("氧氣分子", "O₂ molecules")}: {o2}</label>
      <input type="range" min="0" max="30" value={o2} onChange={e => setO2(+e.target.value)} className="w-full" />
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-3 rounded-xl bg-amber-50 border">C₆H₁₂O₆ ×{glucose}</div>
        <div className="p-3 rounded-xl bg-sky-50 border">O₂ ×{o2}</div>
        <div className="p-3 rounded-xl bg-emerald-50 border font-bold" style={{ color: accent }}>ATP ~{atp}</div>
      </div>
      <p className="text-xs text-slate-500">{o2 < glucose * 6 ? t("氧氣不足 → 可能無氧呼吸", "Low O₂ → possible anaerobic respiration", isZh) : t("有氧呼吸進行中", "Aerobic respiration active", isZh)}</p>
    </div>
  );
}''',
"gas_exchange": '''
function ExperimentLab({ isZh, accent }) {
  const [o2Air, setO2Air] = useState(21);
  const [o2Blood, setO2Blood] = useState(40);
  const [area, setArea] = useState(70);
  const [thickness, setThickness] = useState(50);
  const t = window.JSLGER.t;
  const gradient = Math.max(0, o2Air - o2Blood);
  const rate = Math.round((gradient * area) / Math.max(10, thickness));
  const co2In = Math.round(rate * 0.75);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節肺泡氧分壓、血液氧含量、表面面積和膜厚度，觀察氣體交換速率。", "Adjust alveolar O₂, blood O₂, surface area and membrane thickness to see gas exchange rate.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("肺泡 O₂ (%)", "Alveolar O₂ (%)")}: {o2Air}</label>
      <input type="range" min="10" max="21" value={o2Air} onChange={e => setO2Air(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
      <label className="block text-sm font-semibold">{t("血液 O₂ (%)", "Blood O₂ (%)")}: {o2Blood}</label>
      <input type="range" min="5" max="95" value={o2Blood} onChange={e => setO2Blood(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
      <label className="block text-sm font-semibold">{t("肺泡表面面積", "Alveolar surface area")}: {area}%</label>
      <input type="range" min="10" max="100" value={area} onChange={e => setArea(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
      <label className="block text-sm font-semibold">{t("膜厚度（反向）", "Membrane thickness (inverse)")}: {thickness}%</label>
      <input type="range" min="10" max="100" value={thickness} onChange={e => setThickness(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
          <p className="text-xs text-slate-500">O₂ → blood</p>
          <p className="text-3xl font-black" style={{ color: accent }}>{rate}</p>
        </div>
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <p className="text-xs text-slate-500">CO₂ → alveoli</p>
          <p className="text-3xl font-black text-rose-600">{co2In}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center">{t("濃度差越大、面積越大、膜越薄 → 交換越快（擴散）", "Larger gradient, more area, thinner membrane → faster diffusion", isZh)}</p>
    </div>
  );
}''',
"lung_health": '''
function ExperimentLab({ isZh, accent }) {
  const [smoke, setSmoke] = useState(0);
  const t = window.JSLGER.t;
  const capacity = Math.max(20, 100 - smoke * 0.8);
  const colour = smoke > 60 ? "#ef4444" : smoke > 30 ? "#f59e0b" : "#22c55e";
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("增加吸煙年數，觀察肺活量變化。", "Increase smoking years to see lung capacity change.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("吸煙年數", "Years smoking")}: {smoke}</label>
      <input type="range" min="0" max="100" value={smoke} onChange={e => setSmoke(+e.target.value)} className="w-full" />
      <div className="flex justify-center">
        <div className="w-40 h-48 rounded-b-full border-4 flex items-end justify-center pb-4" style={{ borderColor: colour, background: colour + "22" }}>
          <span className="text-3xl font-black" style={{ color: colour }}>{Math.round(capacity)}%</span>
        </div>
      </div>
      <p className="font-bold text-center" style={{ color: accent }}>{t("肺活量", "Lung capacity")}: {Math.round(capacity)}%</p>
    </div>
  );
}''',
"circuit": '''
function ExperimentLab({ isZh, accent }) {
  const [sw1, setSw1] = useState(false);
  const [sw2, setSw2] = useState(false);
  const t = window.JSLGER.t;
  const lit = sw1 && sw2;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("串聯電路：兩個開關都閉合燈才亮。", "Series circuit: both switches must close for the bulb to light.", isZh)}</p>
      <div className="flex gap-4 items-center justify-center py-6">
        <button type="button" onClick={() => setSw1(!sw1)} className={"px-4 py-3 rounded-xl font-bold min-h-[48px] " + (sw1 ? "bg-emerald-500 text-white" : "bg-slate-200")}>{t("開關 1", "Switch 1")}</button>
        <i className={"fa-solid fa-lightbulb text-6xl " + (lit ? "text-yellow-400" : "text-slate-300")} />
        <button type="button" onClick={() => setSw2(!sw2)} className={"px-4 py-3 rounded-xl font-bold min-h-[48px] " + (sw2 ? "bg-emerald-500 text-white" : "bg-slate-200")}>{t("開關 2", "Switch 2")}</button>
      </div>
      <p className="font-bold text-center" style={{ color: accent }}>{lit ? t("燈亮！", "Bulb ON!", isZh) : t("燈滅", "Bulb OFF", isZh)}</p>
    </div>
  );
}''',
"electromagnet": '''
function ExperimentLab({ isZh, accent }) {
  const [turns, setTurns] = useState(50);
  const [current, setCurrent] = useState(2);
  const t = window.JSLGER.t;
  const strength = Math.round(turns * current / 10);
  const clips = Math.min(10, Math.floor(strength / 15));
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節線圈匝數和電流，觀察電磁鐵吸力。", "Adjust coil turns and current to see electromagnet strength.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("匝數", "Coil turns")}: {turns}</label>
      <input type="range" min="10" max="200" value={turns} onChange={e => setTurns(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("電流 (A)", "Current (A)")}: {current}</label>
      <input type="range" min="0" max="5" step="0.5" value={current} onChange={e => setCurrent(+e.target.value)} className="w-full" />
      <p className="font-bold" style={{ color: accent }}>{t("吸力強度", "Strength")}: {strength} · {t("回形針", "Paperclips")}: {"📎".repeat(clips)}</p>
    </div>
  );
}''',
"domestic_bill": '''
function ExperimentLab({ isZh, accent }) {
  const [power, setPower] = useState(1000);
  const [hours, setHours] = useState(5);
  const [days, setDays] = useState(30);
  const t = window.JSLGER.t;
  const kwh = (power * hours * days / 1000).toFixed(1);
  const cost = (kwh * 1.2).toFixed(2);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("計算家用電器電費。", "Calculate household electricity bill.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("功率 (W)", "Power (W)")}: {power}</label>
      <input type="range" min="100" max="3000" step="100" value={power} onChange={e => setPower(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("每日使用 (h)", "Hours/day")}: {hours}</label>
      <input type="range" min="1" max="24" value={hours} onChange={e => setHours(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("天數", "Days")}: {days}</label>
      <input type="range" min="1" max="31" value={days} onChange={e => setDays(+e.target.value)} className="w-full" />
      <div className="p-4 rounded-xl bg-slate-50 border text-center">
        <p className="text-2xl font-black" style={{ color: accent }}>{kwh} kWh</p>
        <p className="text-lg font-bold mt-1">HK${cost}</p>
      </div>
    </div>
  );
}''',
"ph_scale": '''
function ExperimentLab({ isZh, accent }) {
  const [ph, setPh] = useState(7);
  const t = window.JSLGER.t;
  const hue = ph < 7 ? 0 : ph > 7 ? 240 : 120;
  const sat = Math.abs(ph - 7) * 15 + 30;
  const bg = "hsl(" + hue + "," + sat + "%,60%)";
  const label = ph < 7 ? t("酸性", "Acidic", isZh) : ph > 7 ? t("鹼性", "Alkaline", isZh) : t("中性", "Neutral", isZh);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("拖動滑桿改變 pH 值和顏色。", "Drag slider to change pH and colour.", isZh)}</p>
      <input type="range" min="0" max="14" step="0.5" value={ph} onChange={e => setPh(+e.target.value)} className="w-full" />
      <div className="h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black" style={{ background: bg }}>pH {ph}</div>
      <p className="font-bold text-center" style={{ color: accent }}>{label}</p>
    </div>
  );
}''',
"titration": '''
function ExperimentLab({ isZh, accent }) {
  const [acid, setAcid] = useState(25);
  const t = window.JSLGER.t;
  const alkali = 25;
  const diff = acid - alkali;
  const colour = diff > 2 ? "#ef4444" : diff < -2 ? "#3b82f6" : "#22c55e";
  const state = diff > 2 ? t("酸性（過量酸）", "Acidic (excess acid)", isZh) : diff < -2 ? t("鹼性（過量鹼）", "Alkaline (excess alkali)", isZh) : t("中性（當量點）", "Neutral (equivalence)", isZh);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("加入酸至 25 mL 鹼中，找當量點。", "Add acid to 25 mL alkali to find equivalence point.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("酸體積 (mL)", "Acid volume (mL)")}: {acid}</label>
      <input type="range" min="0" max="50" value={acid} onChange={e => setAcid(+e.target.value)} className="w-full" />
      <div className="h-20 rounded-2xl flex items-center justify-center text-white font-bold" style={{ background: colour }}>{state}</div>
    </div>
  );
}''',
"indicators": '''
function ExperimentLab({ isZh, accent }) {
  const subs = [
    { name: t("檸檬汁", "Lemon juice", isZh), ph: 2 },
    { name: t("清水", "Water", isZh), ph: 7 },
    { name: t("肥皂水", "Soap water", isZh), ph: 10 }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  const ph = subs[sel].ph;
  const col = ph < 7 ? "#ef4444" : ph > 7 ? "#8b5cf6" : "#22c55e";
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇物質，觀察指示劑顏色。", "Select substance to see indicator colour.", isZh)}</p>
      <div className="grid gap-2">
        {subs.map((s, i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={"px-4 py-3 rounded-xl text-left min-h-[48px] border " + (sel === i ? "font-bold border-2" : "bg-slate-50")} style={sel === i ? { borderColor: accent } : {}}>{s.name}</button>
        ))}
      </div>
      <div className="h-16 rounded-xl" style={{ background: col }} />
      <p className="font-bold" style={{ color: accent }}>pH ≈ {ph}</p>
    </div>
  );
}''',
"acid_rain": '''
function ExperimentLab({ isZh, accent }) {
  const [ph, setPh] = useState(5);
  const t = window.JSLGER.t;
  const damage = Math.max(0, (5.6 - ph) * 20);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("降低雨水 pH，觀察建築和植物損害。", "Lower rain pH to see damage to buildings and plants.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("雨水 pH", "Rain pH")}: {ph}</label>
      <input type="range" min="2" max="7" step="0.1" value={ph} onChange={e => setPh(+e.target.value)} className="w-full" />
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-slate-100 text-center"><i className="fa-solid fa-building text-3xl" style={{ opacity: 1 - damage/100 }} /><p className="text-xs mt-1">{t("建築腐蝕", "Building corrosion")}: {Math.round(damage)}%</p></div>
        <div className="p-4 rounded-xl bg-green-50 text-center"><i className="fa-solid fa-tree text-3xl" style={{ opacity: 1 - damage/100 }} /><p className="text-xs mt-1">{t("森林損害", "Forest damage")}: {Math.round(damage)}%</p></div>
      </div>
    </div>
  );
}''',
"reactivity": '''
function ExperimentLab({ isZh, accent }) {
  const metals = ["K", "Na", "Mg", "Zn", "Fe", "Cu"];
  const [sel, setSel] = useState(2);
  const t = window.JSLGER.t;
  const react = sel < 4;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇金屬，觀察與稀酸反應。", "Select metal to see reaction with dilute acid.", isZh)}</p>
      <div className="flex flex-wrap gap-2">
        {metals.map((m, i) => (
          <button key={m} type="button" onClick={() => setSel(i)} className={"px-3 py-2 rounded-lg font-bold min-h-[44px] " + (sel === i ? "text-white" : "bg-slate-100")} style={sel === i ? { background: accent } : {}}>{m}</button>
        ))}
      </div>
      <div className="p-6 rounded-xl bg-slate-50 text-center">
        <p className="text-4xl">{react ? "💥 H₂ ↑" : "—"}</p>
        <p className="mt-2 font-bold" style={{ color: accent }}>{react ? t("產生氫氣", "Hydrogen produced", isZh) : t("無反應", "No reaction", isZh)}</p>
      </div>
    </div>
  );
}''',
"eye_anatomy": '''
function ExperimentLab({ isZh, accent }) {
  const parts = [
    { id: "cornea", zh: "角膜", en: "Cornea" },
    { id: "lens", zh: "晶狀體", en: "Lens" },
    { id: "retina", zh: "視網膜", en: "Retina" }
  ];
  const [found, setFound] = useState([]);
  const t = window.JSLGER.t;
  function click(id) { if (!found.includes(id)) setFound([...found, id]); }
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("點擊眼睛各部分。", "Click each part of the eye.", isZh)}</p>
      <div className="flex justify-center gap-4">
        {parts.map(p => (
          <button key={p.id} type="button" onClick={() => click(p.id)} className={"w-24 h-24 rounded-full border-4 flex items-center justify-center text-xs font-bold min-h-[48px] " + (found.includes(p.id) ? "bg-emerald-100 border-emerald-400" : "bg-sky-50 border-sky-300")}>{t(p.zh, p.en, isZh)}</button>
        ))}
      </div>
      <p className="font-bold text-center" style={{ color: accent }}>{found.length}/3 {t("已找到", "found", isZh)}</p>
    </div>
  );
}''',
"optics": '''
function ExperimentLab({ isZh, accent }) {
  const [focal, setFocal] = useState(10);
  const t = window.JSLGER.t;
  const image = focal < 8 ? t("放大虛像", "Magnified virtual", isZh) : focal > 12 ? t("縮小實像", "Diminished real", isZh) : t("清晰實像", "Clear real image", isZh);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節焦距，觀察成像變化。", "Adjust focal length to see image changes.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("焦距 (cm)", "Focal length (cm)")}: {focal}</label>
      <input type="range" min="5" max="20" value={focal} onChange={e => setFocal(+e.target.value)} className="w-full" />
      <div className="h-32 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xl font-bold">{image}</div>
    </div>
  );
}''',
"ear_sound": '''
function ExperimentLab({ isZh, accent }) {
  const [freq, setFreq] = useState(440);
  const t = window.JSLGER.t;
  const label = freq < 200 ? t("低頻", "Low pitch", isZh) : freq > 800 ? t("高頻", "High pitch", isZh) : t("中頻", "Mid pitch", isZh);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節頻率，觀察音調變化。", "Adjust frequency to see pitch change.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("頻率 (Hz)", "Frequency (Hz)")}: {freq}</label>
      <input type="range" min="100" max="2000" step="10" value={freq} onChange={e => setFreq(+e.target.value)} className="w-full" />
      <div className="h-20 rounded-xl flex items-center justify-center gap-1" style={{ background: accent + "22" }}>
        {[...Array(12)].map((_, i) => <div key={i} className="w-2 rounded-full" style={{ height: 10 + Math.sin(i + freq/100) * 20, background: accent }} />)}
      </div>
      <p className="font-bold text-center" style={{ color: accent }}>{label}</p>
    </div>
  );
}''',
"skin_touch": '''
function ExperimentLab({ isZh, accent }) {
  const zones = [
    { id: "finger", zh: "指尖", en: "Fingertip", sens: 95 },
    { id: "back", zh: "背部", en: "Back", sens: 30 },
    { id: "arm", zh: "前臂", en: "Forearm", sens: 55 }
  ];
  const [sel, setSel] = useState(null);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("點擊身體部位，比較觸覺敏感度。", "Click body zones to compare touch sensitivity.", isZh)}</p>
      <div className="grid gap-2">
        {zones.map(z => (
          <button key={z.id} type="button" onClick={() => setSel(z.id)} className={"px-4 py-3 rounded-xl text-left min-h-[48px] border flex justify-between " + (sel === z.id ? "font-bold" : "bg-slate-50")} style={sel === z.id ? { borderColor: accent } : {}}>
            <span>{t(z.zh, z.en, isZh)}</span><span style={{ color: accent }}>{z.sens}%</span>
          </button>
        ))}
      </div>
      {sel && <p className="font-bold text-center" style={{ color: accent }}>{t("感受器密度", "Receptor density")}: {zones.find(z => z.id === sel).sens}%</p>}
    </div>
  );
}''',
"force_meter": '''
function ExperimentLab({ isZh, accent }) {
  const [mass, setMass] = useState(1);
  const t = window.JSLGER.t;
  const force = (mass * 10).toFixed(1);
  const ext = mass * 15;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("增加砝碼質量，讀取彈簧秤示數。", "Add mass and read the spring balance.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("質量 (kg)", "Mass (kg)")}: {mass}</label>
      <input type="range" min="0" max="5" step="0.5" value={mass} onChange={e => setMass(+e.target.value)} className="w-full" />
      <div className="flex justify-center"><div className="w-4 rounded-full bg-slate-400" style={{ height: 80 + ext }} /></div>
      <p className="text-2xl font-black text-center" style={{ color: accent }}>{force} N</p>
    </div>
  );
}''',
"friction": '''
function ExperimentLab({ isZh, accent }) {
  const surfaces = [
    { zh: "冰面", en: "Ice", f: 0.1 },
    { zh: "木地板", en: "Wood", f: 0.4 },
    { zh: "砂紙", en: "Sandpaper", f: 0.9 }
  ];
  const [sel, setSel] = useState(1);
  const [mass, setMass] = useState(2);
  const t = window.JSLGER.t;
  const friction = (surfaces[sel].f * mass * 10).toFixed(1);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇表面和質量，計算摩擦力。", "Choose surface and mass to calculate friction.", isZh)}</p>
      <div className="flex gap-2 flex-wrap">
        {surfaces.map((s, i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={"px-3 py-2 rounded-lg min-h-[44px] " + (sel === i ? "text-white font-bold" : "bg-slate-100")} style={sel === i ? { background: accent } : {}}>{t(s.zh, s.en, isZh)}</button>
        ))}
      </div>
      <label className="block text-sm font-semibold">{t("質量 (kg)", "Mass (kg)")}: {mass}</label>
      <input type="range" min="1" max="10" value={mass} onChange={e => setMass(+e.target.value)} className="w-full" />
      <p className="text-2xl font-black text-center" style={{ color: accent }}>{t("摩擦力", "Friction")}: {friction} N</p>
    </div>
  );
}''',
"resultant_force": '''
function ExperimentLab({ isZh, accent }) {
  const [f1, setF1] = useState(5);
  const [f2, setF2] = useState(3);
  const t = window.JSLGER.t;
  const result = f1 - f2;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("兩力反向：合力 = 大 − 小。", "Opposite forces: resultant = larger − smaller.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("向右力 (N)", "Force right (N)")}: {f1}</label>
      <input type="range" min="0" max="10" value={f1} onChange={e => setF1(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("向左力 (N)", "Force left (N)")}: {f2}</label>
      <input type="range" min="0" max="10" value={f2} onChange={e => setF2(+e.target.value)} className="w-full" />
      <p className="text-2xl font-black text-center" style={{ color: accent }}>{t("合力", "Resultant")}: {Math.abs(result)} N {result > 0 ? "→" : result < 0 ? "←" : "="}</p>
    </div>
  );
}''',
"gravity_mass": '''
function ExperimentLab({ isZh, accent }) {
  const planets = [
    { zh: "地球", en: "Earth", g: 10 },
    { zh: "月球", en: "Moon", g: 1.6 },
    { zh: "火星", en: "Mars", g: 3.7 }
  ];
  const [sel, setSel] = useState(0);
  const [mass, setMass] = useState(60);
  const t = window.JSLGER.t;
  const weight = (mass * planets[sel].g / 10).toFixed(1);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("質量不變，在不同星球重量不同。", "Mass stays same; weight changes on different planets.", isZh)}</p>
      <div className="flex gap-2">
        {planets.map((p, i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (sel === i ? "text-white font-bold" : "bg-slate-100")} style={sel === i ? { background: accent } : {}}>{t(p.zh, p.en, isZh)}</button>
        ))}
      </div>
      <label className="block text-sm font-semibold">{t("質量 (kg)", "Mass (kg)")}: {mass}</label>
      <input type="range" min="40" max="100" value={mass} onChange={e => setMass(+e.target.value)} className="w-full" />
      <p className="text-2xl font-black text-center" style={{ color: accent }}>{t("重量", "Weight")}: {weight} kgf</p>
    </div>
  );
}''',
"motion_graph": '''
function ExperimentLab({ isZh, accent }) {
  const modes = [
    { zh: "勻速", en: "Constant speed", v: 5 },
    { zh: "加速", en: "Accelerating", v: 8 },
    { zh: "靜止", en: "Stationary", v: 0 }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇運動類型，觀察速度-時間圖。", "Select motion type to see velocity-time graph.", isZh)}</p>
      <div className="flex gap-2">
        {modes.map((m, i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (sel === i ? "text-white font-bold" : "bg-slate-100")} style={sel === i ? { background: accent } : {}}>{t(m.zh, m.en, isZh)}</button>
        ))}
      </div>
      <div className="h-32 rounded-xl bg-slate-50 border flex items-end px-4 gap-1">
        {[...Array(10)].map((_, i) => <div key={i} className="flex-1 rounded-t" style={{ height: (modes[sel].v === 0 ? 5 : modes[sel].v * (sel === 1 ? (i+1)*3 : 8)) + "px", background: accent }} />)}
      </div>
    </div>
  );
}''',
"psychology_colors": '''
function ExperimentLab({ isZh, accent }) {
  const colors = [
    { hex: "#ef4444", zh: "紅色 — 興奮", en: "Red — excitement" },
    { hex: "#3b82f6", zh: "藍色 — 冷靜", en: "Blue — calm" },
    { hex: "#22c55e", zh: "綠色 — 自然", en: "Green — nature" },
    { hex: "#eab308", zh: "黃色 — 快樂", en: "Yellow — happy" }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇顏色，了解心理聯想。", "Pick colours to explore psychological associations.", isZh)}</p>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((c, i) => (
          <button key={i} type="button" onClick={() => setSel(i)} className={"h-20 rounded-xl min-h-[48px] " + (sel === i ? "ring-4 ring-offset-2" : "")} style={{ background: c.hex, ringColor: accent }} />
        ))}
      </div>
      <p className="font-bold text-center text-lg" style={{ color: accent }}>{t(colors[sel].zh, colors[sel].en, isZh)}</p>
    </div>
  );
}''',
"atomic": '''
function ExperimentLab({ isZh, accent }) {
  const [p, setP] = useState(6);
  const [n, setN] = useState(6);
  const [e, setE] = useState(6);
  const t = window.JSLGER.t;
  const neutral = p === e;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節質子、中子、電子數量。", "Adjust protons, neutrons and electrons.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("質子", "Protons")}: {p}</label>
      <input type="range" min="1" max="20" value={p} onChange={e => setP(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("中子", "Neutrons")}: {n}</label>
      <input type="range" min="0" max="20" value={n} onChange={e => setN(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("電子", "Electrons")}: {e}</label>
      <input type="range" min="1" max="20" value={e} onChange={ev => setE(+ev.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{ color: accent }}>{t("原子序", "Atomic number")}: {p} · {neutral ? t("電中性", "Neutral", isZh) : t("帶電", "Charged", isZh)}</p>
    </div>
  );
}''',
"dna": '''
function ExperimentLab({ isZh, accent }) {
  const pairs = { A: "T", T: "A", G: "C", C: "G" };
  const [base, setBase] = useState("A");
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇鹼基，找互補配對。", "Select a base to find its complementary pair.", isZh)}</p>
      <div className="flex gap-2 justify-center">
        {["A", "T", "G", "C"].map(b => (
          <button key={b} type="button" onClick={() => setBase(b)} className={"w-14 h-14 rounded-xl text-xl font-black min-h-[48px] " + (base === b ? "text-white" : "bg-slate-100")} style={base === b ? { background: accent } : {}}>{b}</button>
        ))}
      </div>
      <p className="text-4xl font-black text-center" style={{ color: accent }}>{base} — {pairs[base]}</p>
    </div>
  );
}''',
"ohm_law": '''
function ExperimentLab({ isZh, accent }) {
  const [v, setV] = useState(6);
  const [r, setR] = useState(3);
  const t = window.JSLGER.t;
  const i = (v / r).toFixed(2);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節電壓和電阻，計算電流 I = V/R。", "Adjust voltage and resistance: I = V/R.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("電壓 V (V)", "Voltage V (V)")}: {v}</label>
      <input type="range" min="1" max="12" value={v} onChange={e => setV(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("電阻 R (Ω)", "Resistance R (Ω)")}: {r}</label>
      <input type="range" min="1" max="10" value={r} onChange={e => setR(+e.target.value)} className="w-full" />
      <p className="text-3xl font-black text-center" style={{ color: accent }}>I = {i} A</p>
    </div>
  );
}''',
"safety_house": '''
function ExperimentLab({ isZh, accent }) {
  const hazards = [
    { id: "wet", zh: "濕手觸摸插頭", en: "Wet hands on plug", bad: true },
    { id: "overload", zh: "萬能蘇過載", en: "Overloaded adaptor", bad: true },
    { id: "cover", zh: "蓋好電線保護蓋", en: "Cable cover in place", bad: false }
  ];
  const [found, setFound] = useState([]);
  const t = window.JSLGER.t;
  function toggle(id) {
    setFound(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }
  const badFound = hazards.filter(h => h.bad && found.includes(h.id)).length;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("點選家居用電風險（紅色）和安全做法（綠色）。", "Tap home electrical risks (red) and safe practices (green).", isZh)}</p>
      <div className="grid gap-2">
        {hazards.map(h => (
          <button key={h.id} type="button" onClick={() => toggle(h.id)}
            className={"px-4 py-3 rounded-xl text-left min-h-[48px] border-2 " + (found.includes(h.id) ? (h.bad ? "bg-rose-50 border-rose-400" : "bg-emerald-50 border-emerald-400") : "bg-slate-50 border-slate-200")}>
            {t(h.zh, h.en, isZh)}
          </button>
        ))}
      </div>
      <p className="font-bold text-center" style={{ color: accent }}>{t("已標示風險", "Risks marked")}: {badFound}/2</p>
    </div>
  );
}''',
"biocycle": '''
function ExperimentLab({ isZh, accent }) {
  const steps = [
    { zh: "光合作用", en: "Photosynthesis" },
    { zh: "呼吸作用", en: "Respiration" },
    { zh: "分解作用", en: "Decomposition" }
  ];
  const [step, setStep] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("點擊循環各步驟。", "Click through carbon cycle steps.", isZh)}</p>
      <div className="flex justify-center gap-4">
        {steps.map((s, i) => (
          <button key={i} type="button" onClick={() => setStep(i)} className={"px-4 py-3 rounded-xl min-h-[48px] " + (step === i ? "text-white font-bold" : "bg-slate-100")} style={step === i ? { background: accent } : {}}>{t(s.zh, s.en, isZh)}</button>
        ))}
      </div>
      <p className="text-center text-5xl">{["🌿", "💨", "🍂"][step]}</p>
      <p className="font-bold text-center" style={{ color: accent }}>{t(steps[step].zh, steps[step].en, isZh)}</p>
    </div>
  );
}''',
"newton_cradle": '''
function ExperimentLab({ isZh, accent }) {
  const [balls, setBalls] = useState(5);
  const [lift, setLift] = useState(1);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節球數和拉起數量，演示動量守恆。", "Adjust balls and lift count to demo momentum conservation.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("球數", "Balls")}: {balls}</label>
      <input type="range" min="3" max="7" value={balls} onChange={e => setBalls(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("拉起球數", "Balls lifted")}: {lift}</label>
      <input type="range" min="1" max="3" value={lift} onChange={e => setLift(+e.target.value)} className="w-full" />
      <div className="flex justify-center items-end gap-1 h-20">
        {[...Array(balls)].map((_, i) => <div key={i} className="w-8 rounded-full" style={{ height: i < lift ? 48 : 32, background: accent, marginBottom: i < lift ? 20 : 0 }} />)}
      </div>
      <p className="font-bold text-center" style={{ color: accent }}>{lift} → {lift} {t("球彈出", "balls out", isZh)}</p>
    </div>
  );
}'''
}

def js_str(s):
    return json.dumps(s, ensure_ascii=False)

def gen_learn(steps):
    lines = ["const LEARN = ["]
    for s in steps:
        lines.append("  { titleEn: " + js_str(s["titleEn"]) + ", titleZh: " + js_str(s["titleZh"]) + ",")
        lines.append("    bodyEn: " + js_str(s["bodyEn"]) + ",")
        lines.append("    bodyZh: " + js_str(s["bodyZh"]) + ",")
        if "qEn" in s:
            lines.append("    qEn: " + js_str(s["qEn"]) + ", qZh: " + js_str(s["qZh"]) + ",")
            lines.append("    opts: " + json.dumps(s["opts"], ensure_ascii=False) + ", a: " + js_str(s["a"]) + ",")
            lines.append("    why: " + js_str(s.get("why", "")) + " },")
        else:
            lines.append("  },")
    lines.append("];")
    return "\n".join(lines)

def gen_guided(items):
    lines = ["const GUIDED = ["]
    for g in items:
        lines.append("  { qEn: " + js_str(g["qEn"]) + ", qZh: " + js_str(g["qZh"]) + ",")
        lines.append("    opts: " + json.dumps(g["opts"], ensure_ascii=False) + ", a: " + js_str(g["a"]) + ",")
        lines.append("    hint: " + js_str(g.get("hint", "")) + " },")
    lines.append("];")
    return "\n".join(lines)

def gen_summary(items):
    lines = ["const SUMMARY = ["]
    for s in items:
        lines.append("  { en: " + js_str(s["en"]) + ", zh: " + js_str(s["zh"]) + " },")
    lines.append("];")
    return "\n".join(lines)

def gen_review(items):
    lines = ["const REVIEW = ["]
    for r in items:
        lines.append("  { qEn: " + js_str(r["qEn"]) + ", qZh: " + js_str(r["qZh"]) + ",")
        lines.append("    opts: " + json.dumps(r["opts"], ensure_ascii=False) + ", a: " + js_str(r["a"]) + " },")
    lines.append("];")
    return "\n".join(lines)

def generate_app(cfg):
    exp = EXPERIMENTS[cfg["experiment"]]
    html = f'''<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{cfg["titleEn"]} · {cfg["titleZh"]} | S2 Junior Science</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <script src="{COMMON}"></script>
  <style>body {{ font-family: "Outfit", sans-serif; background: #f0f9ff; }}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const {{ useState, useEffect, useRef }} = React;
    const ACCENT = "{cfg["accent"]}";
    const {{ Shell }} = window.JSLGER;

{gen_learn(cfg["learn"])}
{gen_guided(cfg["guided"])}
{gen_summary(cfg["summary"])}
{gen_review(cfg["review"])}

{exp}

    function App() {{
      return (
        <Shell
          meta={{{{ appId: "{cfg["appId"]}", titleEn: "{cfg["titleEn"]}", titleZh: "{cfg["titleZh"]}", unit: "{cfg["unit"]}" }}}}
          accent={{ACCENT}}
          learnSteps={{LEARN}}
          guidedBank={{GUIDED}}
          reviewSummary={{SUMMARY}}
          reviewQuiz={{REVIEW}}
          experiment={{p => <ExperimentLab {{...p}} />}}
        />
      );
    }}
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
'''
    return html

def ensure_content(cfg):
    """Build LGER quiz content from compact metadata if not provided."""
    if "learn" in cfg:
        return cfg
    te, tz = cfg["titleEn"], cfg["titleZh"]
    unit = cfg.get("unitEn", cfg["unit"].split("·")[-1].strip())
    uz = cfg.get("unitZh", unit)
    kp = cfg.get("keyPoints", [
        {"en": f"Core ideas of {te}.", "zh": f"{tz}的核心概念。"},
        {"en": f"Observe and explain {unit} phenomena.", "zh": f"觀察並解釋{uz}現象。"},
        {"en": "Use scientific vocabulary accurately.", "zh": "準確使用科學詞彙。"},
        {"en": "Link classroom learning to daily life.", "zh": "連結課堂學習與日常生活。"},
    ])
    qz = cfg.get("quizzes", [
        {"qEn": f"What is the main focus of {te}?", "qZh": f"{tz}的主要學習重點是？",
         "opts": [cfg.get("correctOpt", unit), "Unrelated topic 無關主題", "Random guess 隨意猜測"],
         "a": cfg.get("correctOpt", unit), "why": "Matches this unit. 符合本單元。"},
        {"qEn": "Science uses evidence to…", "qZh": "科學運用證據來…",
         "opts": ["Support explanations 支持解釋", "Replace experiments 取代實驗", "Avoid questions 迴避問題"],
         "a": "Support explanations 支持解釋", "why": "Evidence-based reasoning. 以證據推理。"},
        {"qEn": "In the lab you should…", "qZh": "在實驗室你應該…",
         "opts": ["Follow safety rules 遵守安全規則", "Ignore instructions 忽略指示", "Rush results 趕快完成"],
         "a": "Follow safety rules 遵守安全規則", "why": "Safety first. 安全至上。"},
    ])
    cfg["learn"] = []
    for i, q in enumerate(qz[:6]):
        cfg["learn"].append({
            "titleEn": f"{te} — Step {i+1}", "titleZh": f"{tz} — 步驟 {i+1}",
            "bodyEn": kp[i % len(kp)]["en"] if i < len(kp) else f"Explore {unit} in depth.",
            "bodyZh": kp[i % len(kp)]["zh"] if i < len(kp) else f"深入探索{uz}。",
            "qEn": q["qEn"], "qZh": q["qZh"],
            "opts": q["opts"], "a": q["a"], "why": q.get("why", ""),
        })
    while len(cfg["learn"]) < 6:
        cfg["learn"].append({
            "titleEn": f"Ready for the {te} lab", "titleZh": f"準備進入{tz}實驗",
            "bodyEn": "Complete Learn, then use the interactive lab.",
            "bodyZh": "完成學習後，使用互動實驗室。",
            "qEn": "The Experiment tab unlocks after…", "qZh": "實驗分頁在…之後解鎖",
            "opts": ["Learn section 學習部分", "Closing browser 關閉瀏覽器", "Nothing 無需"], "a": "Learn section 學習部分",
            "why": "LGER flow: Learn → Guided → Experiment → Review.",
        })
    cfg["guided"] = [{"qEn": q["qEn"], "qZh": q["qZh"], "opts": q["opts"], "a": q["a"],
                      "hint": q.get("why", "")} for q in qz[:4]]
    cfg["summary"] = kp[:4]
    cfg["review"] = [{"qEn": q["qEn"], "qZh": q["qZh"], "opts": q["opts"], "a": q["a"]} for q in qz[:5]]
    return cfg

# Load configs
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "f2-lger-configs.json")
with open(CONFIG_PATH, encoding="utf-8") as f:
    APPS = [ensure_content(dict(c)) for c in json.load(f)]

SKIP = {"04_Air_Composition", "22_Reaction_Time", "30_Space_Mission"}

def main():
    count = 0
    for cfg in APPS:
        folder = cfg["folder"]
        if folder in SKIP:
            continue
        out_dir = os.path.join(BASE, folder)
        out_path = os.path.join(out_dir, "index.html")
        os.makedirs(out_dir, exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(generate_app(cfg))
        count += 1
        print(f"Generated: {folder}")
    print(f"\nTotal generated: {count}")

if __name__ == "__main__":
    main()
