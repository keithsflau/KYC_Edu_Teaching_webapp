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
generate_app = _g2.generate_app
EXPERIMENTS = _g2.EXPERIMENTS

BASE = os.path.join(_DIR, "..", "Secondary_School", "Junior Science", "Form 3")

# F3-specific thin experiment templates
EXPERIMENTS["healthy_lifestyle"] = '''
function ExperimentLab({ isZh, accent }) {
  const [sleep, setSleep] = useState(8);
  const [exercise, setExercise] = useState(60);
  const t = window.JSLGER.t;
  const score = Math.min(100, sleep * 8 + exercise * 0.8);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節睡眠和運動，觀察健康指數。", "Adjust sleep and exercise for a health score.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("睡眠 (小時)", "Sleep (hours)")}: {sleep}</label>
      <input type="range" min="4" max="12" value={sleep} onChange={e => setSleep(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("運動 (分鐘/日)", "Exercise (min/day)")}: {exercise}</label>
      <input type="range" min="0" max="120" value={exercise} onChange={e => setExercise(+e.target.value)} className="w-full" />
      <p className="text-3xl font-black text-center" style={{ color: accent }}>{Math.round(score)}%</p>
    </div>
  );
}'''
EXPERIMENTS["food_substances"] = '''
function ExperimentLab({ isZh, accent }) {
  const types = ["carb", "lipid", "protein"];
  const labels = { carb: ["碳水化合物","Carbohydrates"], lipid: ["脂質","Lipids"], protein: ["蛋白質","Proteins"] };
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  const key = types[sel];
  const energy = { carb: 17, lipid: 38, protein: 17 };
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">{types.map((k,i) => (
        <button key={k} type="button" onClick={() => setSel(i)} className={"px-3 py-2 rounded-lg min-h-[44px] " + (sel===i?"text-white font-bold":"bg-slate-100")} style={sel===i?{background:accent}:{}}>{t(labels[k][0],labels[k][1],isZh)}</button>
      ))}</div>
      <p className="font-bold text-center text-xl" style={{color:accent}}>{energy[key]} kJ/g</p>
    </div>
  );
}'''
EXPERIMENTS["digestion"] = '''
function ExperimentLab({ isZh, accent }) {
  const [step, setStep] = useState(0);
  const t = window.JSLGER.t;
  const steps = [[t("大塊食物","Large food",isZh),"🍞"],[t("機械消化","Mechanical digestion",isZh),"🔪"],[t("化學消化","Chemical digestion",isZh),"🧪"],[t("吸收","Absorption",isZh),"💧"]];
  return (
    <div className="space-y-4 text-center">
      <p className="text-5xl">{steps[step][1]}</p>
      <p className="font-bold" style={{color:accent}}>{steps[step][0]}</p>
      <button type="button" onClick={() => setStep((step+1)%4)} className="px-4 py-2 rounded-xl text-white min-h-[48px]" style={{background:accent}}>{t("下一步","Next",isZh)}</button>
    </div>
  );
}'''
EXPERIMENTS["balanced_diet"] = '''
function ExperimentLab({ isZh, accent }) {
  const [grain, setGrain] = useState(4);
  const [veg, setVeg] = useState(2);
  const t = window.JSLGER.t;
  const balanced = grain >= 3 && grain <= 6 && veg >= 1;
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("穀物 (碗)", "Grains (bowls)")}: {grain}</label>
      <input type="range" min="0" max="8" value={grain} onChange={e => setGrain(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("蔬菜 (份)", "Vegetables (portions)")}: {veg}</label>
      <input type="range" min="0" max="5" value={veg} onChange={e => setVeg(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{balanced ? t("均衡 ✓","Balanced ✓",isZh) : t("調整份量","Adjust portions",isZh)}</p>
    </div>
  );
}'''
EXPERIMENTS["disease_prevention"] = '''
function ExperimentLab({ isZh, accent }) {
  const [hygiene, setHygiene] = useState(50);
  const [vaccine, setVaccine] = useState(50);
  const t = window.JSLGER.t;
  const risk = Math.max(0, 100 - hygiene * 0.5 - vaccine * 0.5);
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold">{t("個人衛生 %","Hygiene %")}: {hygiene}</label>
      <input type="range" min="0" max="100" value={hygiene} onChange={e => setHygiene(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("疫苗接種 %","Vaccination %")}: {vaccine}</label>
      <input type="range" min="0" max="100" value={vaccine} onChange={e => setVaccine(+e.target.value)} className="w-full" />
      <p className="font-bold text-center" style={{color:accent}}>{t("感染風險","Infection risk")}: {Math.round(risk)}%</p>
    </div>
  );
}'''
EXPERIMENTS["biotechnology"] = '''
function ExperimentLab({ isZh, accent }) {
  const [gm, setGm] = useState(30);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節基因改造作物比例，討論生物科技應用。", "Adjust GM crop ratio; discuss biotech uses.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("GM 作物 %","GM crops %")}: {gm}</label>
      <input type="range" min="0" max="100" value={gm} onChange={e => setGm(+e.target.value)} className="w-full" />
      <div className="h-8 rounded-full overflow-hidden flex"><div style={{width:gm+"%",background:accent}} /><div style={{width:(100-gm)+"%",background:"#e2e8f0"}} /></div>
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

SKIP = {"01_Climate_Action", "02_Genetics_Intro"}

CONFIG_PATH = os.path.join(_DIR, "f3-lger-configs.json")


def main():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        apps = [ensure_content(dict(c)) for c in json.load(f)]
    count = 0
    for cfg in apps:
        folder = cfg["folder"]
        if folder in SKIP:
            print(f"Skipped hand-crafted: {folder}")
            continue
        out_dir = os.path.join(BASE, folder)
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(generate_app(cfg))
        count += 1
        print(f"Generated: {folder}")
    print(f"\nTotal F3 generated: {count}")


if __name__ == "__main__":
    main()
