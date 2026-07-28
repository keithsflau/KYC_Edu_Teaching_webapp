#!/usr/bin/env python3
"""Generate LGER-wrapped Form 1 Junior Science apps."""
import importlib.util
import json
import os

_DIR = os.path.dirname(__file__)
_spec = importlib.util.spec_from_file_location("g2", os.path.join(_DIR, "generate-f2-lger.py"))
_g2 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_g2)
ensure_content = _g2.ensure_content
gen_learn = _g2.gen_learn
gen_guided = _g2.gen_guided
gen_summary = _g2.gen_summary
gen_review = _g2.gen_review

BASE = os.path.join(_DIR, "..", "Secondary_School", "Junior Science", "Form 1")

F1_EXPERIMENTS = {
"lab_safety": '''
function ExperimentLab({ isZh, accent }) {
  const items = [
    { id: "goggles", zh: "佩戴護目鏡", en: "Wear goggles", safe: true },
    { id: "eat", zh: "在實驗室飲食", en: "Eating in lab", safe: false },
    { id: "gloves", zh: "處理化學品戴手套", en: "Gloves for chemicals", safe: true }
  ];
  const [picked, setPicked] = useState([]);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-3">
      {items.map(it => (
        <button key={it.id} type="button" onClick={() => setPicked(p => p.includes(it.id) ? p : [...p, it.id])}
          className={"w-full px-4 py-3 rounded-xl text-left min-h-[48px] border-2 " + (picked.includes(it.id) ? (it.safe ? "bg-emerald-50 border-emerald-400" : "bg-rose-50 border-rose-400") : "bg-slate-50")}>
          {t(it.zh, it.en, isZh)}
        </button>
      ))}
      <p className="font-bold text-center" style={{ color: accent }}>{picked.length}/3 {t("已檢查", "checked", isZh)}</p>
    </div>
  );
}''',
"apparatus": '''
function ExperimentLab({ isZh, accent }) {
  const tools = [
    { zh: "燒杯", en: "Beaker", use: "Mixing liquids 混合液體" },
    { zh: "本生燈", en: "Bunsen burner", use: "Heating 加熱" },
    { zh: "試管", en: "Test tube", use: "Small reactions 小量反應" }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">{tools.map((x,i) => (
        <button key={i} type="button" onClick={() => setSel(i)} className={"px-3 py-2 rounded-lg min-h-[44px] " + (sel===i?"text-white font-bold":"bg-slate-100")} style={sel===i?{background:accent}:{}}>{t(x.zh,x.en,isZh)}</button>
      ))}</div>
      <p className="p-4 rounded-xl bg-slate-50 border font-semibold text-center">{tools[sel].use}</p>
    </div>
  );
}''',
"bunsen": '''
function ExperimentLab({ isZh, accent }) {
  const [air, setAir] = useState(50);
  const t = window.JSLGER.t;
  const flame = air < 30 ? t("明火", "Luminous", isZh) : air > 70 ? t("藍色無煙火", "Blue roaring", isZh) : t("黃色火焰", "Yellow flame", isZh);
  const col = air < 30 ? "#f97316" : air > 70 ? "#3b82f6" : "#eab308";
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("空氣孔開度", "Air hole opening")}: {air}%</label>
      <input type="range" min="0" max="100" value={air} onChange={e=>setAir(+e.target.value)} className="w-full" />
      <div className="h-24 rounded-2xl flex items-center justify-center text-white text-xl font-bold" style={{background:col}}>{flame}</div>
    </div>
  );
}''',
"measurement": '''
function ExperimentLab({ isZh, accent }) {
  const [mm, setMm] = useState(23.4);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("游標卡尺讀數 (mm)", "Vernier reading (mm)")}: {mm.toFixed(1)}</label>
      <input type="range" min="20" max="30" step="0.1" value={mm} onChange={e=>setMm(+e.target.value)} className="w-full" />
      <p className="text-3xl font-black text-center" style={{color:accent}}>{mm.toFixed(1)} mm</p>
    </div>
  );
}''',
"water_cycle": '''
function ExperimentLab({ isZh, accent }) {
  const stages = ["evap","cond","precip"];
  const labels = { evap: ["蒸發","Evaporation"], cond: ["凝結","Condensation"], precip: ["降水","Precipitation"] };
  const [s, setS] = useState(0);
  const t = window.JSLGER.t;
  const key = stages[s];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{stages.map((k,i) => (
        <button key={k} type="button" onClick={()=>setS(i)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (s===i?"text-white font-bold":"bg-slate-100")} style={s===i?{background:accent}:{}}>{t(labels[k][0],labels[k][1],isZh)}</button>
      ))}</div>
      <p className="text-5xl text-center">{["☀️💧","☁️","🌧️"][s]}</p>
    </div>
  );
}''',
"states_matter": '''
function ExperimentLab({ isZh, accent }) {
  const [temp, setTemp] = useState(25);
  const t = window.JSLGER.t;
  const state = temp < 0 ? t("固態","Solid",isZh) : temp < 100 ? t("液態","Liquid",isZh) : t("氣態","Gas",isZh);
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("溫度 (°C)","Temperature (°C)")}: {temp}</label>
      <input type="range" min="-20" max="120" value={temp} onChange={e=>setTemp(+e.target.value)} className="w-full" />
      <p className="text-2xl font-bold text-center" style={{color:accent}}>{state}</p>
    </div>
  );
}''',
"filtration": '''
function ExperimentLab({ isZh, accent }) {
  const [step, setStep] = useState(0);
  const t = window.JSLGER.t;
  const steps = [[t("混濁懸液","Cloudy mixture",isZh),"🫗"],[t("過濾中","Filtering",isZh),"⏬"],[t("清澈濾液","Clear filtrate",isZh),"💧"]];
  return (
    <div className="space-y-4 text-center">
      <p className="text-5xl">{steps[step][1]}</p>
      <p className="font-bold" style={{color:accent}}>{steps[step][0]}</p>
      <button type="button" onClick={()=>setStep((step+1)%3)} className="px-4 py-2 rounded-xl text-white min-h-[48px]" style={{background:accent}}>{t("下一步","Next",isZh)}</button>
    </div>
  );
}''',
"distillation": '''
function ExperimentLab({ isZh, accent }) {
  const [heat, setHeat] = useState(40);
  const t = window.JSLGER.t;
  const boil = heat > 70;
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("加熱功率","Heating power")}: {heat}%</label>
      <input type="range" min="0" max="100" value={heat} onChange={e=>setHeat(+e.target.value)} className="w-full" />
      <p className="text-center text-4xl">{boil ? "💨→🧪" : "🧪"}</p>
      <p className="font-bold text-center" style={{color:accent}}>{boil ? t("蒸餾進行中","Distilling…",isZh) : t("未達沸點","Below boiling point",isZh)}</p>
    </div>
  );
}''',
"solubility": '''
function ExperimentLab({ isZh, accent }) {
  const [temp, setTemp] = useState(20);
  const t = window.JSLGER.t;
  const sol = Math.min(100, 30 + temp * 1.5);
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("溫度 (°C)","Temp (°C)")}: {temp}</label>
      <input type="range" min="0" max="80" value={temp} onChange={e=>setTemp(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{t("溶解度","Solubility")}: {sol.toFixed(0)} g/100g H₂O</p>
    </div>
  );
}''',
"water_purification": '''
function ExperimentLab({ isZh, accent }) {
  const stages = [t("取水","Intake",isZh),t("沉澱","Sedimentation",isZh),t("過濾","Filtration",isZh),t("氯化消毒","Chlorination",isZh)];
  const [s, setS] = useState(0);
  return (
    <div className="space-y-4">
      <div className="flex gap-1">{stages.map((st,i) => <div key={i} className={"h-2 flex-1 rounded " + (i<=s?"":"bg-slate-200")} style={i<=s?{background:accent}:{}} />)}</div>
      <p className="font-bold text-center text-lg" style={{color:accent}}>{stages[s]}</p>
      <button type="button" onClick={()=>setS((s+1)%stages.length)} className="w-full py-3 rounded-xl text-white font-bold min-h-[48px]" style={{background:accent}}>→</button>
    </div>
  );
}''',
"living_nonliving": '''
function ExperimentLab({ isZh, accent }) {
  const items = [
    { n: t("樹","Tree",isZh), live: true }, { n: t("石頭","Rock",isZh), live: false },
    { n: t("狗","Dog",isZh), live: true }, { n: t("汽車","Car",isZh), live: false }
  ];
  const [ans, setAns] = useState({});
  const t = window.JSLGER.t;
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((it,i) => (
        <div key={i} className="p-3 rounded-xl border bg-slate-50">
          <p className="font-bold mb-2">{it.n}</p>
          <div className="flex gap-1">
            <button type="button" onClick={()=>setAns({...ans,[i]:true})} className={"flex-1 py-2 rounded text-xs " + (ans[i]===true?"bg-emerald-500 text-white":"bg-white border")}>{t("生物","Living",isZh)}</button>
            <button type="button" onClick={()=>setAns({...ans,[i]:false})} className={"flex-1 py-2 rounded text-xs " + (ans[i]===false?"bg-slate-600 text-white":"bg-white border")}>{t("非生物","Non-living",isZh)}</button>
          </div>
        </div>
      ))}
    </div>
  );
}''',
"classification": '''
function ExperimentLab({ isZh, accent }) {
  const [path, setPath] = useState([]);
  const t = window.JSLGER.t;
  const q = path.length === 0 ? t("有脊椎？","Has backbone?",isZh) : t("有羽毛？","Has feathers?",isZh);
  function yes() { setPath([...path,"y"]); }
  function no() { setPath([...path,"n"]); }
  const result = path.join("") === "y" ? t("脊椎動物","Vertebrate",isZh) : path.length ? t("繼續檢索…","Keep keying…",isZh) : "";
  return (
    <div className="space-y-4">
      <p className="font-bold">{q}</p>
      <div className="flex gap-2">
        <button type="button" onClick={yes} className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-bold min-h-[48px]">{t("是","Yes",isZh)}</button>
        <button type="button" onClick={no} className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold min-h-[48px]">{t("否","No",isZh)}</button>
      </div>
      <p className="text-center font-bold" style={{color:accent}}>{result}</p>
    </div>
  );
}''',
"vertebrates": '''
function ExperimentLab({ isZh, accent }) {
  const groups = [
    { zh: "哺乳類", en: "Mammals", ex: "🐕" }, { zh: "鳥類", en: "Birds", ex: "🐦" },
    { zh: "魚類", en: "Fish", ex: "🐟" }, { zh: "兩棲類", en: "Amphibians", ex: "🐸" }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">{groups.map((g,i) => (
        <button key={i} type="button" onClick={()=>setSel(i)} className={"px-3 py-2 rounded-lg min-h-[44px] " + (sel===i?"text-white font-bold":"bg-slate-100")} style={sel===i?{background:accent}:{}}>{t(g.zh,g.en,isZh)}</button>
      ))}</div>
      <p className="text-6xl text-center">{groups[sel].ex}</p>
    </div>
  );
}''',
"microscope": '''
function ExperimentLab({ isZh, accent }) {
  const [focus, setFocus] = useState(50);
  const t = window.JSLGER.t;
  const clear = focus > 40 && focus < 70;
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("微調焦","Fine focus")}: {focus}</label>
      <input type="range" min="0" max="100" value={focus} onChange={e=>setFocus(+e.target.value)} className="w-full" />
      <div className={"h-32 rounded-full border-4 mx-auto w-32 flex items-center justify-center " + (clear?"bg-emerald-100 border-emerald-400 blur-none":"bg-slate-200 border-slate-300")} style={clear?{}:{filter:"blur(4px)"}}>🔬</div>
      <p className="font-bold text-center" style={{color:accent}}>{clear ? t("影像清晰","Image clear",isZh) : t("調整焦距","Adjust focus",isZh)}</p>
    </div>
  );
}''',
"cell_builder": '''
function ExperimentLab({ isZh, accent }) {
  const parts = [t("細胞核","Nucleus",isZh), t("細胞膜","Cell membrane",isZh), t("細胞質","Cytoplasm",isZh)];
  const [placed, setPlaced] = useState([]);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-3">
      <div className="h-40 rounded-2xl border-4 border-dashed flex items-center justify-center relative" style={{borderColor:accent}}>
        {placed.map((p,i) => <span key={i} className="absolute text-xs font-bold bg-white px-2 py-1 rounded" style={{top:10+i*30,left:20}}>{p}</span>)}
      </div>
      <div className="flex gap-2 flex-wrap">{parts.filter(p=>!placed.includes(p)).map(p => (
        <button key={p} type="button" onClick={()=>setPlaced([...placed,p])} className="px-3 py-2 rounded-lg bg-slate-100 min-h-[44px]">{p}</button>
      ))}</div>
      <p className="font-bold text-center" style={{color:accent}}>{placed.length}/3</p>
    </div>
  );
}''',
"energy_forms": '''
function ExperimentLab({ isZh, accent }) {
  const chain = [t("化學能","Chemical",isZh), t("動能","Kinetic",isZh), t("熱能","Thermal",isZh), t("光能","Light",isZh)];
  const [on, setOn] = useState(0);
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap py-4">
      {chain.map((c,i) => (
        <React.Fragment key={i}>
          <button type="button" onClick={()=>setOn(i)} className={"px-3 py-2 rounded-xl min-h-[44px] " + (on===i?"text-white font-bold":"bg-slate-100")} style={on===i?{background:accent}:{}}>{c}</button>
          {i < chain.length-1 && <span>→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}''',
"heat_transfer": '''
function ExperimentLab({ isZh, accent }) {
  const [temp, setTemp] = useState(20);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("熱源溫度","Heat source temp")}: {temp}°C</label>
      <input type="range" min="20" max="200" value={temp} onChange={e=>setTemp(+e.target.value)} className="w-full" />
      <div className="h-8 rounded-full transition-all" style={{width:Math.min(100,(temp-20)/1.8)+"%",background:accent}} />
    </div>
  );
}''',
"particle_theory": '''
function ExperimentLab({ isZh, accent }) {
  const [mode, setMode] = useState("solid");
  const t = window.JSLGER.t;
  const labels = { solid: [t("固態 — 粒子振動","Solid — vibrating",isZh)], liquid: [t("液態 — 粒子流動","Liquid — flowing",isZh)], gas: [t("氣態 — 粒子快速運動","Gas — fast motion",isZh)] };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{["solid","liquid","gas"].map(m => (
        <button key={m} type="button" onClick={()=>setMode(m)} className={"flex-1 py-2 rounded-lg capitalize min-h-[44px] " + (mode===m?"text-white font-bold":"bg-slate-100")} style={mode===m?{background:accent}:{}}>{m}</button>
      ))}</div>
      <div className="h-24 rounded-xl bg-slate-100 flex items-center justify-center gap-2">
        {[...Array(mode==="gas"?12:mode==="liquid"?8:6)].map((_,i) => <div key={i} className="w-3 h-3 rounded-full" style={{background:accent,animation:mode!=="solid"?"pulse 1s infinite":"none"}} />)}
      </div>
      <p className="font-bold text-center" style={{color:accent}}>{labels[mode][0]}</p>
    </div>
  );
}''',
"density": '''
function ExperimentLab({ isZh, accent }) {
  const objs = [{n:"Wood",zh:"木",d:0.6},{n:"Water",zh:"水",d:1},{n:"Iron",zh:"鐵",d:7.8}];
  const [sel,setSel]=useState(0);
  const t=window.JSLGER.t;
  const floats=objs[sel].d<1;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{objs.map((o,i)=><button key={i} type="button" onClick={()=>setSel(i)} className={"px-3 py-2 rounded-lg min-h-[44px] "+(sel===i?"text-white font-bold":"bg-slate-100")} style={sel===i?{background:accent}:{}}>{t(o.zh,o.n,isZh)}</button>)}</div>
      <div className="h-32 rounded-xl border-4 border-blue-300 bg-blue-100 relative"><div className={"absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-lg flex items-center justify-center font-bold "+(floats?"top-2":"bottom-2")} style={{background:accent,color:"#fff"}}>{objs[sel].d} g/cm³</div></div>
      <p className="font-bold text-center" style={{color:accent}}>{floats?t("漂浮","Floats",isZh):t("下沉","Sinks",isZh)}</p>
    </div>
  );
}''',
"gas_pressure": '''
function ExperimentLab({ isZh, accent }) {
  const [vol, setVol] = useState(50);
  const t = window.JSLGER.t;
  const pressure = Math.round(1000 / vol);
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("體積","Volume")}: {vol} mL</label>
      <input type="range" min="10" max="100" value={vol} onChange={e=>setVol(+e.target.value)} className="w-full" />
      <p className="text-2xl font-black text-center" style={{color:accent}}>{t("壓強","Pressure")}: {pressure} kPa</p>
    </div>
  );
}''',
"thermal_expansion": '''
function ExperimentLab({ isZh, accent }) {
  const [temp, setTemp] = useState(20);
  const t = window.JSLGER.t;
  const gap = Math.max(0, (temp - 20) * 0.5);
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold">{t("溫度","Temperature")}: {temp}°C</label>
      <input type="range" min="0" max="60" value={temp} onChange={e=>setTemp(+e.target.value)} className="w-full" />
      <div className="flex justify-center gap-2 items-end h-16">
        <div className="h-12 bg-slate-600 rounded" style={{width:40+gap}} />
        <div className="text-sm font-bold" style={{color:accent}}>{gap.toFixed(1)} mm</div>
        <div className="h-12 bg-slate-600 rounded" style={{width:40}} />
      </div>
      <p className="text-center text-sm">{t("鐵路軌道間隙","Railway gap",isZh)}</p>
    </div>
  );
}''',
"biodiversity": '''
function ExperimentLab({ isZh, accent }) {
  const species = [t("黑臉琵鷺","Black-faced spoonbill",isZh), t("中華白海豚","Chinese white dolphin",isZh), t("盧氏小樹蛙","Romer's tree frog",isZh)];
  const [sel, setSel] = useState(0);
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">{species.map((s,i)=><button key={i} type="button" onClick={()=>setSel(i)} className={"px-3 py-2 rounded-lg text-sm min-h-[44px] "+(sel===i?"text-white font-bold":"bg-slate-100")} style={sel===i?{background:accent}:{}}>{s}</button>)}</div>
      <p className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center font-semibold">{t("香港特有/瀕危物種","HK endemic/endangered",isZh)}</p>
    </div>
  );
}''',
"renewable_energy": '''
function ExperimentLab({ isZh, accent }) {
  const sources = [
    { zh: "太陽能", en: "Solar", icon: "☀️", renew: true },
    { zh: "風能", en: "Wind", icon: "💨", renew: true },
    { zh: "煤炭", en: "Coal", icon: "🪨", renew: false }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-3">
      {sources.map((s,i) => (
        <button key={i} type="button" onClick={()=>setSel(i)} className={"w-full px-4 py-3 rounded-xl flex items-center gap-3 min-h-[48px] border-2 " + (sel===i?"font-bold":"")} style={sel===i?{borderColor:accent}:{}}>
          <span className="text-2xl">{s.icon}</span><span>{t(s.zh,s.en,isZh)}</span>
          <span className="ml-auto text-sm">{s.renew ? t("可再生","Renewable",isZh) : t("不可再生","Non-renewable",isZh)}</span>
        </button>
      ))}
    </div>
  );
}'''
}

def generate_f1_app(cfg):
    exp = F1_EXPERIMENTS[cfg["experiment"]]
    cfg = ensure_content(cfg)
    accent = cfg["accent"]
    COMMON = "../../../../common/junior-science-lger.js"
    html = f'''<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{cfg["titleEn"]} · {cfg["titleZh"]} | S1 Junior Science</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <script src="{COMMON}"></script>
  <style>body {{ font-family: "Outfit", sans-serif; background: #f8fafc; }}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const {{ useState, useEffect, useRef }} = React;
    const ACCENT = "{accent}";
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

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "f1-lger-configs.json")

def main():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        apps = [ensure_content(dict(c)) for c in json.load(f)]
    count = 0
    for cfg in apps:
        out_dir = os.path.join(BASE, cfg["folder"])
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(generate_f1_app(cfg))
        count += 1
        print(f"Generated: {cfg['folder']}")
    print(f"\nTotal F1 generated: {count}")

if __name__ == "__main__":
    main()
