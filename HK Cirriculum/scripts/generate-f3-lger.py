#!/usr/bin/env python3
"""Generate LGER-wrapped Form 3 Junior Science apps from config."""
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
COMMON = _g2.COMMON
EXPERIMENTS = _g2.EXPERIMENTS

BASE = os.path.join(_DIR, "..", "Secondary_School", "Junior Science", "Form 3")

# F3-specific thin experiment templates
EXPERIMENTS["healthy_lifestyle"] = '''
function ExperimentLab({ isZh, accent }) {
  const [exercise, setExercise] = useState(true);
  const [sleep, setSleep] = useState(true);
  const [diet, setDiet] = useState(true);
  const [smoke, setSmoke] = useState(false);
  const [drugs, setDrugs] = useState(false);
  const t = window.JSLGER.t;
  const physical = Math.round((exercise ? 40 : 10) + (sleep ? 30 : 5) + (diet ? 30 : 10) - (smoke ? 35 : 0) - (drugs ? 40 : 0));
  const mental = Math.round((sleep ? 50 : 15) + (exercise ? 25 : 10) - (drugs ? 45 : 0) - (smoke ? 15 : 0));
  const social = Math.round((exercise ? 30 : 10) + (diet ? 20 : 10) + (!smoke && !drugs ? 50 : 15));
  const clamp = v => Math.max(0, Math.min(100, v));
  const habits = [
    [t("適量運動","Regular exercise",isZh), exercise, setExercise],
    [t("充足睡眠","Enough sleep",isZh), sleep, setSleep],
    [t("均衡膳食","Balanced diet",isZh), diet, setDiet],
    [t("吸煙","Smoking",isZh), smoke, setSmoke, true],
    [t("濫藥/酗酒","Drugs/alcohol abuse",isZh), drugs, setDrugs, true],
  ];
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("切換生活習慣，觀察 WHO 三維健康評分。", "Toggle habits to see WHO health scores on 3 axes.", isZh)}</p>
      <div className="grid gap-2">{habits.map(([label, on, set, bad]) => (
        <button key={label} type="button" onClick={() => set(!on)} className={"flex justify-between items-center px-4 py-3 rounded-xl border min-h-[48px] " + (bad ? (on ? "border-rose-300 bg-rose-50" : "border-slate-200") : (on ? "border-emerald-300 bg-emerald-50" : "border-slate-200"))}>
          <span className="font-semibold text-sm">{label}</span>
          <span className="text-xs font-bold">{on ? (bad ? t("是 ✗","Yes ✗",isZh) : t("是 ✓","Yes ✓",isZh)) : t("否","No",isZh)}</span>
        </button>
      ))}</div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {[["生理","Physical",clamp(physical)],["心理","Mental",clamp(mental)],["社交","Social",clamp(social)]].map(([zh,en,v]) => (
          <div key={en} className="p-3 rounded-xl bg-white border">
            <p className="text-slate-500">{t(zh,en,isZh)}</p>
            <p className="text-2xl font-black" style={{color:accent}}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}'''
EXPERIMENTS["food_substances"] = '''
function ExperimentLab({ isZh, accent }) {
  const foods = [
    { id: "rice", zh: "白飯", en: "Rice", cat: "primary", sub: "carb", icon: "🍚" },
    { id: "oil", zh: "食油", en: "Cooking oil", cat: "primary", sub: "lipid", icon: "🫒" },
    { id: "egg", zh: "雞蛋", en: "Egg", cat: "primary", sub: "protein", icon: "🥚" },
    { id: "orange", zh: "橙", en: "Orange", cat: "protective", sub: "vitamin", icon: "🍊" },
    { id: "spinach", zh: "菠菜", en: "Spinach", cat: "protective", sub: "mineral", icon: "🥬" },
    { id: "water", zh: "水", en: "Water", cat: "protective", sub: "water", icon: "💧" },
  ];
  const [plate, setPlate] = useState([]);
  const t = window.JSLGER.t;
  const toggle = f => setPlate(p => p.includes(f.id) ? p.filter(x => x !== f.id) : [...p, f.id]);
  const onPlate = foods.filter(f => plate.includes(f.id));
  const primary = onPlate.filter(f => f.cat === "primary").length;
  const protective = onPlate.filter(f => f.cat === "protective").length;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("點選食物放到餐碟，分類基本/保護性食物物質。", "Tap foods onto the plate — classify primary vs protective.", isZh)}</p>
      <div className="flex flex-wrap gap-2">{foods.map(f => (
        <button key={f.id} type="button" onClick={() => toggle(f)} className={"px-3 py-2 rounded-xl border min-h-[44px] " + (plate.includes(f.id) ? "text-white font-bold" : "bg-slate-50")} style={plate.includes(f.id) ? {background: accent} : {}}>{f.icon} {t(f.zh, f.en, isZh)}</button>
      ))}</div>
      <div className="p-4 rounded-2xl border-2 border-dashed text-center min-h-[80px]" style={{borderColor: accent}}>
        {onPlate.length ? onPlate.map(f => f.icon).join(" ") : t("（空餐碟）","(empty plate)",isZh)}
      </div>
      <div className="grid grid-cols-2 gap-2 text-center text-sm">
        <div className="p-3 rounded-xl bg-emerald-50"><p>{t("基本","Primary",isZh)}</p><p className="font-black text-xl" style={{color:accent}}>{primary}</p></div>
        <div className="p-3 rounded-xl bg-sky-50"><p>{t("保護性","Protective",isZh)}</p><p className="font-black text-xl text-sky-600">{protective}</p></div>
      </div>
    </div>
  );
}'''
EXPERIMENTS["digestion"] = '''
function ExperimentLab({ isZh, accent }) {
  const [step, setStep] = useState(0);
  const t = window.JSLGER.t;
  const steps = [
    { zh: "口腔：咀嚼 + 唾液酶", en: "Mouth: chewing + saliva enzymes", organ: "👄", enzyme: t("澱粉酶","Amylase",isZh) },
    { zh: "食道：蠕動推進", en: "Oesophagus: peristalsis", organ: "⬇️", enzyme: "—" },
    { zh: "胃：攪動 + 胃液", en: "Stomach: churning + gastric juice", organ: "🫁", enzyme: t("蛋白酶","Protease",isZh) },
    { zh: "小腸：吸收營養", en: "Small intestine: absorption", organ: "🌀", enzyme: t("完成消化","Digestion complete",isZh) },
  ];
  const s = steps[step];
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("沿消化道逐步播放機械/化學消化。", "Animate digestion mouth → stomach → intestine.", isZh)}</p>
      <div className="flex justify-between text-2xl">{["👄","⬇️","🫁","🌀"].map((icon,i) => (
        <span key={i} className={"px-2 py-1 rounded-lg " + (i===step ? "ring-2" : "opacity-40")} style={i===step?{ringColor:accent}:{}}>{icon}</span>
      ))}</div>
      <p className="text-4xl text-center">{s.organ}</p>
      <p className="font-bold text-center" style={{color:accent}}>{t(s.zh, s.en, isZh)}</p>
      <p className="text-sm text-center text-slate-500">{t("消化酶","Enzyme",isZh)}: {s.enzyme}</p>
      <button type="button" onClick={() => setStep((step+1)%4)} className="w-full px-4 py-3 rounded-xl text-white min-h-[48px] font-bold" style={{background:accent}}>{t("下一步","Next",isZh)}</button>
    </div>
  );
}'''
EXPERIMENTS["balanced_diet"] = '''
function ExperimentLab({ isZh, accent }) {
  const [grain, setGrain] = useState(4);
  const [veg, setVeg] = useState(2);
  const [protein, setProtein] = useState(4);
  const [fat, setFat] = useState(1);
  const t = window.JSLGER.t;
  const ok = grain >= 3 && grain <= 6 && veg >= 1 && protein >= 3 && protein <= 6 && fat <= 2;
  const deficient = grain < 3 || veg < 1 || protein < 3;
  const msg = ok ? t("均衡膳食 ✓","Balanced diet ✓",isZh) : deficient ? t("營養不足 — 增加穀物/蔬菜/蛋白","Undernutrition — add grains/veg/protein",isZh) : t("過量脂肪/糖 — 減少頂層","Too much fat/sugar — reduce top tier",isZh);
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">{t("調節香港食物金字塔各層份量。", "Adjust HK food pyramid portions.", isZh)}</p>
      {[ [t("穀物 (碗)","Grains (bowls)",isZh), grain, setGrain, 8], [t("蔬菜 (碗)","Vegetables (bowls)",isZh), veg, setVeg, 5], [t("魚肉蛋豆 (份)","Protein (portions)",isZh), protein, setProtein, 8], [t("油糖 (份)","Fat/sugar (portions)",isZh), fat, setFat, 5] ].map(([label,v,set,max],i) => (
        <div key={i}><label className="block text-sm font-semibold">{label}: {v}</label>
        <input type="range" min="0" max={max} value={v} onChange={e => set(+e.target.value)} className="w-full" style={{accentColor:accent}} /></div>
      ))}
      <p className="font-bold text-center py-2 rounded-xl" style={{color:accent, background: ok ? accent+"15" : "#fef2f2"}}>{msg}</p>
    </div>
  );
}'''
EXPERIMENTS["disease_prevention"] = '''
function ExperimentLab({ isZh, accent }) {
  const routes = [
    { id: "droplet", zh: "飛沫傳播", en: "Droplet", base: 70 },
    { id: "contact", zh: "接觸傳播", en: "Contact", base: 55 },
    { id: "food", zh: "受污染食物", en: "Contaminated food", base: 45 },
    { id: "vector", zh: "媒介（蚊）", en: "Vector (mosquito)", base: 40 },
  ];
  const [route, setRoute] = useState("droplet");
  const [hygiene, setHygiene] = useState(50);
  const [vaccine, setVaccine] = useState(50);
  const [vent, setVent] = useState(50);
  const t = window.JSLGER.t;
  const r = routes.find(x => x.id === route);
  const risk = Math.max(5, Math.round(r.base - hygiene * 0.25 - vaccine * 0.25 - vent * 0.15));
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇傳播途徑，調節預防措施，觀察感染機率。", "Pick a transmission route and prevention measures.", isZh)}</p>
      <div className="flex flex-wrap gap-2">{routes.map(rt => (
        <button key={rt.id} type="button" onClick={() => setRoute(rt.id)} className={"px-3 py-2 rounded-lg text-sm min-h-[44px] " + (route===rt.id?"text-white font-bold":"bg-slate-100")} style={route===rt.id?{background:accent}:{}}>{t(rt.zh, rt.en, isZh)}</button>
      ))}</div>
      {[ [t("勤洗手 %","Hand washing %",isZh), hygiene, setHygiene], [t("疫苗 %","Vaccination %",isZh), vaccine, setVaccine], [t("通風 %","Ventilation %",isZh), vent, setVent] ].map(([label,v,set],i) => (
        <div key={i}><label className="block text-sm font-semibold">{label}: {v}</label>
        <input type="range" min="0" max="100" value={v} onChange={e => set(+e.target.value)} className="w-full" style={{accentColor:accent}} /></div>
      ))}
      <p className="font-bold text-center text-2xl" style={{color: risk > 40 ? "#e11d48" : accent}}>{t("感染機率","Infection probability")}: {risk}%</p>
    </div>
  );
}'''
EXPERIMENTS["biotechnology"] = '''
function ExperimentLab({ isZh, accent }) {
  const branches = [
    { id: "gm", zh: "基因改造食物", en: "GM food", detailZh: "抗除草劑大豆、快速生長三文魚", detailEn: "Herbicide-resistant soya; fast-growing salmon" },
    { id: "ferment", zh: "發酵工業", en: "Fermentation", detailZh: "利用微生物製造乳酪、啤酒", detailEn: "Microbes make yoghurt, beer" },
    { id: "medicine", zh: "醫學應用", en: "Medicine", detailZh: "改造大腸桿菌生產人類胰島素", detailEn: "GM E. coli produces human insulin" },
  ];
  const [branch, setBranch] = useState("gm");
  const [benefit, setBenefit] = useState(60);
  const [risk, setRisk] = useState(30);
  const t = window.JSLGER.t;
  const b = branches.find(x => x.id === branch);
  const score = Math.round(benefit - risk * 0.5);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇生物科技分支，平衡效益與風險。", "Choose a biotech branch; balance benefits vs risks.", isZh)}</p>
      <div className="flex flex-wrap gap-2">{branches.map(br => (
        <button key={br.id} type="button" onClick={() => setBranch(br.id)} className={"px-3 py-2 rounded-lg text-sm min-h-[44px] " + (branch===br.id?"text-white font-bold":"bg-slate-100")} style={branch===br.id?{background:accent}:{}}>{t(br.zh, br.en, isZh)}</button>
      ))}</div>
      <p className="text-sm text-center text-slate-600">{t(b.detailZh, b.detailEn, isZh)}</p>
      <label className="block text-sm font-semibold">{t("效益","Benefits")}: {benefit}</label>
      <input type="range" min="0" max="100" value={benefit} onChange={e => setBenefit(+e.target.value)} className="w-full" style={{accentColor:accent}} />
      <label className="block text-sm font-semibold">{t("風險/倫理顧慮","Risks/ethics")}: {risk}</label>
      <input type="range" min="0" max="100" value={risk} onChange={e => setRisk(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{t("淨評估","Net assessment")}: {score > 30 ? t("值得討論採用","Worth adopting with care",isZh) : t("需更多研究","Needs more research",isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["periodic_table"] = '''
function ExperimentLab({ isZh, accent }) {
  const groups = ["I","II","VII","0"];
  const [g, setG] = useState(0);
  const t = window.JSLGER.t;
  const props = { I: ["活性高","Reactive"], II: ["金屬","Metals"], VII: ["非金屬","Non-metals"], 0: ["惰性","Inert"] };
  const key = groups[g];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{groups.map((k,i) => (
        <button key={k} type="button" onClick={() => setG(i)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (g===i?"text-white font-bold":"bg-slate-100")} style={g===i?{background:accent}:{}}>Gp {k}</button>
      ))}</div>
      <p className="font-bold text-center" style={{color:accent}}>{t(props[key][0],props[key][1],isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["compounds"] = '''
function ExperimentLab({ isZh, accent }) {
  const [water, setWater] = useState(50);
  const t = window.JSLGER.t;
  const h = Math.round(water * 0.11);
  const o = water - h;
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("水分子數","Water molecules")}: {water}</label>
      <input type="range" min="10" max="100" value={water} onChange={e => setWater(+e.target.value)} className="w-full" />
      <p className="text-center font-bold" style={{color:accent}}>H: {h} · O: {o}</p>
    </div>
  );
}'''
EXPERIMENTS["metals"] = '''
function ExperimentLab({ isZh, accent }) {
  const metals = ["Cu","Fe","Al"];
  const labels = { Cu: ["銅","Copper"], Fe: ["鐵","Iron"], Al: ["鋁","Aluminium"] };
  const [m, setM] = useState(0);
  const t = window.JSLGER.t;
  const key = metals[m];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{metals.map((k,i) => (
        <button key={k} type="button" onClick={() => setM(i)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (m===i?"text-white font-bold":"bg-slate-100")} style={m===i?{background:accent}:{}}>{k}</button>
      ))}</div>
      <p className="font-bold text-center" style={{color:accent}}>{t(labels[key][0],labels[key][1],isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["alloys"] = '''
function ExperimentLab({ isZh, accent }) {
  const [carbon, setCarbon] = useState(1);
  const t = window.JSLGER.t;
  const strength = Math.min(100, 40 + carbon * 12);
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("鋼中碳 %","Carbon in steel %")}: {carbon}</label>
      <input type="range" min="0" max="5" step="0.5" value={carbon} onChange={e => setCarbon(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{t("強度","Strength")}: {strength}%</p>
    </div>
  );
}'''
EXPERIMENTS["light_sources"] = '''
function ExperimentLab({ isZh, accent }) {
  const [lamp, setLamp] = useState(true);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4 text-center">
      <button type="button" onClick={() => setLamp(!lamp)} className="px-6 py-3 rounded-xl text-white min-h-[48px]" style={{background:accent}}>{lamp ? t("關燈","Turn off lamp",isZh) : t("開燈","Turn on lamp",isZh)}</button>
      <p className="text-5xl">{lamp ? "💡" : "🌑"}</p>
      <p className="font-bold" style={{color:accent}}>{lamp ? t("自發光","Luminous",isZh) : t("非自發光","Non-luminous",isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["reflection"] = '''
function ExperimentLab({ isZh, accent }) {
  const [angle, setAngle] = useState(30);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("入射角 (°)","Angle of incidence (°)")}: {angle}</label>
      <input type="range" min="0" max="80" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{t("反射角","Reflection angle")}: {angle}°</p>
    </div>
  );
}'''
EXPERIMENTS["refraction"] = '''
function ExperimentLab({ isZh, accent }) {
  const [angle, setAngle] = useState(40);
  const t = window.JSLGER.t;
  const refracted = Math.round(angle * 0.67);
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("入射角 (°)","Incident angle (°)")}: {angle}</label>
      <input type="range" min="10" max="70" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{t("折射角 ~","Refraction angle ~")}: {refracted}°</p>
    </div>
  );
}'''
EXPERIMENTS["total_internal"] = '''
function ExperimentLab({ isZh, accent }) {
  const [angle, setAngle] = useState(35);
  const t = window.JSLGER.t;
  const tir = angle > 42;
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("入射角 (°)","Incident angle (°)")}: {angle}</label>
      <input type="range" min="20" max="60" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{tir ? t("全內反射","Total internal reflection",isZh) : t("折射+反射","Refraction + reflection",isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["lenses"] = '''
function ExperimentLab({ isZh, accent }) {
  const [type, setType] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setType(0)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (type===0?"text-white font-bold":"bg-slate-100")} style={type===0?{background:accent}:{}}>{t("凸透鏡","Convex",isZh)}</button>
        <button type="button" onClick={() => setType(1)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (type===1?"text-white font-bold":"bg-slate-100")} style={type===1?{background:accent}:{}}>{t("凹透鏡","Concave",isZh)}</button>
      </div>
      <p className="font-bold text-center" style={{color:accent}}>{type===0 ? t("會聚","Converge",isZh) : t("發散","Diverge",isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["em_waves"] = '''
function ExperimentLab({ isZh, accent }) {
  const bands = ["radio","visible","uv"];
  const labels = { radio: ["電台波","Radio"], visible: ["可見光","Visible"], uv: ["紫外線","UV"] };
  const [b, setB] = useState(1);
  const t = window.JSLGER.t;
  const key = bands[b];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{bands.map((k,i) => (
        <button key={k} type="button" onClick={() => setB(i)} className={"flex-1 py-2 rounded-lg min-h-[44px] " + (b===i?"text-white font-bold":"bg-slate-100")} style={b===i?{background:accent}:{}}>{t(labels[k][0],labels[k][1],isZh)}</button>
      ))}</div>
      <p className="text-4xl text-center">{["📻","🌈","☀️"][b]}</p>
    </div>
  );
}'''
EXPERIMENTS["light_tech"] = '''
function ExperimentLab({ isZh, accent }) {
  const [sensor, setSensor] = useState(50);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("光感應器靈敏度 %","Light sensor sensitivity %")}: {sensor}</label>
      <input type="range" min="0" max="100" value={sensor} onChange={e => setSensor(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>🚗 {sensor > 60 ? t("偵測清晰","Clear detection",isZh) : t("訊號弱","Weak signal",isZh)}</p>
    </div>
  );
}'''

NCS_HEAD = '''
  <link rel="stylesheet" href="../../../../common/ncs-i18n.css" />
  <script src="../../../../common/ncs-i18n.js" defer data-ncs-kit="fleet"></script>
  <style data-ncs-kit="fleet-bridge">
    body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet,
    body.ncs-fleet-mounted .ncs-lang-btn:not(.ncs-lang-switcher *) { display: none !important; }
  </style>
  <script data-ncs-kit="fleet-init">
  (function () {
    function hideLegacyToggles() {
      document.body.classList.add("ncs-fleet-mounted");
      document.querySelectorAll("header button[type=\\"button\\"]").forEach(function (btn) {
        var label = (btn.textContent || "").trim();
        if (label === "EN" || label === "\\u4E2D") btn.classList.add("ncs-hide-when-ncs-fleet");
      });
    }
    function boot() {
      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;
      window.NcsI18n.init({ chromePath: "../../../../_shared/ncs-chrome.json", target: document.body }).then(hideLegacyToggles);
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  })();
  </script>'''

CONFIG_PATH = os.path.join(_DIR, "f3-lger-configs.json")
MAX_BYTES = 100_000


def cap_opts(cfg):
    """Cap MCQ options at 4 per CEO mandate."""
    for key in ("learn", "guided", "review"):
        if key not in cfg:
            continue
        for item in cfg[key]:
            if "opts" in item and len(item["opts"]) > 4:
                item["opts"] = item["opts"][:4]
    return cfg


def generate_f3_app(cfg):
    cfg = cap_opts(cfg)
    exp = EXPERIMENTS[cfg["experiment"]]
    html = f'''<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{cfg["titleEn"]} · {cfg["titleZh"]} | Form 3 Junior Science</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="../../../../common/babel-react-classic.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <script src="{COMMON}"></script>
  <style>body {{ font-family: "Outfit", sans-serif; background: #f0fdf4; }}</style>{NCS_HEAD}
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react-classic">
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


def main():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        apps = [ensure_content(dict(c)) for c in json.load(f)]
    count = 0
    for cfg in apps:
        folder = cfg["folder"]
        out_dir = os.path.join(BASE, folder)
        os.makedirs(out_dir, exist_ok=True)
        html = generate_f3_app(cfg)
        if len(html.encode("utf-8")) > MAX_BYTES:
            raise SystemExit(f"FAIL: {folder} exceeds {MAX_BYTES} bytes")
        with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(html)
        count += 1
        print(f"Generated: {folder} ({len(html)//1024} KB)")
    print(f"\nTotal F3 generated: {count}")


if __name__ == "__main__":
    main()
