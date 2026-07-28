#!/usr/bin/env python3
"""Rebuild Form 3 Junior Science BATCH B (apps 11–20) — hand-crafted LGER labs."""
import json
import os

_DIR = os.path.dirname(__file__)
BASE = os.path.join(_DIR, "..", "Secondary_School", "Junior Science", "Form 3")
COMMON_JS = "../../../../common/junior-science-lger.js"
BABEL = "../../../../common/babel-react-classic.js"

NCS_HEAD = """
  <!-- NCS i18n fleet kit -->
  <link rel="stylesheet" href="../../../../common/ncs-i18n.css" />
  <script src="../../../../common/ncs-i18n.js" defer data-ncs-kit="fleet"></script>
  <style data-ncs-kit="fleet-bridge">
    body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet,
    body.ncs-fleet-mounted .ncs-lang-btn:not(.ncs-lang-switcher *) {
      display: none !important;
    }
  </style>
  <script data-ncs-kit="fleet-init">
  (function () {
    function hideLegacyToggles() {
      document.body.classList.add("ncs-fleet-mounted");
      document.querySelectorAll("header button[type=\\"button\\"]").forEach(function (btn) {
        var label = (btn.textContent || "").trim();
        if (label === "EN" || label === "\\u4E2D") btn.classList.add("ncs-hide-when-ncs-fleet");
      });
      document.querySelectorAll(".fixed.top-4.right-4.z-50").forEach(function (el) {
        el.classList.add("ncs-hide-when-ncs-fleet");
      });
    }
    function boot() {
      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;
      window.NcsI18n.init({ chromePath: "../../../../_shared/ncs-chrome.json", target: document.body }).then(hideLegacyToggles);
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  })();
  </script>"""

EXPERIMENTS = {
"healthy_lifestyle": '''
function ExperimentLab({ isZh, accent }) {
  const [sleep, setSleep] = useState(8);
  const [exercise, setExercise] = useState(45);
  const [screen, setScreen] = useState(3);
  const t = window.JSLGER.t;
  const score = Math.min(100, Math.round(sleep * 7 + exercise * 0.6 - screen * 8 + 20));
  const band = score >= 75 ? "good" : score >= 50 ? "ok" : "low";
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節睡眠、運動和螢幕時間，觀察健康指數。", "Adjust sleep, exercise and screen time to see a health score.", isZh)}</p>
      <label className="block text-sm font-bold">{t("睡眠 (小時/晚)", "Sleep (h/night)")}: {sleep}
        <input type="range" min="4" max="12" value={sleep} onChange={e => setSleep(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <label className="block text-sm font-bold">{t("運動 (分鐘/日)", "Exercise (min/day)")}: {exercise}
        <input type="range" min="0" max="120" value={exercise} onChange={e => setExercise(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <label className="block text-sm font-bold">{t("螢幕時間 (小時/日)", "Screen time (h/day)")}: {screen}
        <input type="range" min="0" max="10" value={screen} onChange={e => setScreen(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <div className={"p-5 rounded-2xl text-center text-white " + (band === "good" ? "bg-emerald-500" : band === "ok" ? "bg-amber-500" : "bg-rose-500")}>
        <p className="text-4xl font-black">{score}%</p>
        <p className="text-sm mt-1">{band === "good" ? t("WHO 三維健康良好", "Strong WHO wellness", isZh) : band === "ok" ? t("尚可 — 改善習慣", "Fair — improve habits", isZh) : t("偏低 — 增加睡眠/運動", "Low — more sleep/exercise", isZh)}</p>
      </div>
    </div>
  );
}''',
"food_substances": '''
function ExperimentLab({ isZh, accent }) {
  const foods = [
    { id: "rice", zh: "飯", en: "Rice", type: "carb", kJ: 17 },
    { id: "oil", zh: "油", en: "Oil", type: "lipid", kJ: 38 },
    { id: "egg", zh: "蛋", en: "Egg", type: "protein", kJ: 17 },
    { id: "orange", zh: "橙", en: "Orange", type: "vitamin", kJ: 4 }
  ];
  const [portions, setPortions] = useState({ rice: 2, oil: 1, egg: 1, orange: 1 });
  const t = window.JSLGER.t;
  const total = foods.reduce((s, f) => s + (portions[f.id] || 0) * f.kJ, 0);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節各類食物份量，計算能量。", "Adjust food portions to calculate energy.", isZh)}</p>
      {foods.map(f => (
        <label key={f.id} className="block text-sm font-bold">{t(f.zh, f.en, isZh)} · {portions[f.id]} {t("份", "portions", isZh)}
          <input type="range" min="0" max="5" value={portions[f.id]} onChange={e => setPortions(p => ({ ...p, [f.id]: +e.target.value }))} className="w-full mt-1" style={{ accentColor: accent }} />
        </label>
      ))}
      <div className="p-4 rounded-xl bg-slate-50 border text-center">
        <p className="text-2xl font-black" style={{ color: accent }}>{total} kJ</p>
        <p className="text-xs text-slate-500">{t("脂質每克能量最高", "Lipids have highest kJ/g", isZh)}</p>
      </div>
    </div>
  );
}''',
"digestion": '''
function ExperimentLab({ isZh, accent }) {
  const steps = [
    { zh: "口腔：機械+唾液澱粉酶", en: "Mouth: mechanical + salivary amylase", icon: "👄" },
    { zh: "胃：蛋白酶 + 酸", en: "Stomach: protease + acid", icon: "🫁" },
    { zh: "小腸：酶完成化學消化", en: "Small intestine: enzymes finish digestion", icon: "🧪" },
    { zh: "絨毛吸收營養", en: "Villi absorb nutrients", icon: "💧" }
  ];
  const [step, setStep] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("沿消化道逐步追蹤食物。", "Track food along the digestive tract.", isZh)}</p>
      <div className="flex gap-1">{steps.map((_, i) => (
        <div key={i} className="h-2 flex-1 rounded-full" style={{ background: i <= step ? accent : "#e2e8f0" }} />
      ))}</div>
      <p className="text-5xl text-center">{steps[step].icon}</p>
      <p className="font-bold text-center" style={{ color: accent }}>{t(steps[step].zh, steps[step].en, isZh)}</p>
      <button type="button" onClick={() => setStep((step + 1) % steps.length)} className="w-full py-3 rounded-xl text-white font-bold min-h-[48px]" style={{ background: accent }}>{t("下一步", "Next step", isZh)}</button>
    </div>
  );
}''',
"balanced_diet": '''
function ExperimentLab({ isZh, accent }) {
  const [grain, setGrain] = useState(4);
  const [veg, setVeg] = useState(2);
  const [protein, setProtein] = useState(2);
  const [fat, setFat] = useState(1);
  const t = window.JSLGER.t;
  const ok = grain >= 3 && grain <= 6 && veg >= 2 && protein >= 1 && fat <= 2;
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">{t("用份量滑桿組合一餐，對照食物金字塔。", "Build a meal with sliders; match the food pyramid.", isZh)}</p>
      {[ [t("穀物 (碗)","Grains (bowls)",isZh), grain, setGrain, 8],
         [t("蔬菜 (份)","Vegetables",isZh), veg, setVeg, 5],
         [t("蛋白質 (份)","Protein",isZh), protein, setProtein, 4],
         [t("油/糖 (份)","Fat/sugar",isZh), fat, setFat, 4] ].map(([lbl, val, set, max], i) => (
        <label key={i} className="block text-sm font-bold">{lbl}: {val}
          <input type="range" min="0" max={max} value={val} onChange={e => set(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
        </label>
      ))}
      <p className={"text-center font-black text-lg " + (ok ? "text-emerald-600" : "text-amber-600")}>{ok ? t("均衡膳食 ✓","Balanced meal ✓",isZh) : t("調整比例","Adjust proportions",isZh)}</p>
    </div>
  );
}''',
"disease_prevention": '''
function ExperimentLab({ isZh, accent }) {
  const [hygiene, setHygiene] = useState(60);
  const [vaccine, setVaccine] = useState(70);
  const [distancing, setDistancing] = useState(50);
  const t = window.JSLGER.t;
  const risk = Math.max(5, Math.round(100 - hygiene * 0.35 - vaccine * 0.4 - distancing * 0.25));
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節預防措施，觀察傳染病風險。", "Adjust prevention measures; see infection risk.", isZh)}</p>
      <label className="block text-sm font-bold">{t("個人衛生 %","Hygiene %")}: {hygiene}
        <input type="range" min="0" max="100" value={hygiene} onChange={e => setHygiene(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <label className="block text-sm font-bold">{t("疫苗覆蓋 %","Vaccination %")}: {vaccine}
        <input type="range" min="0" max="100" value={vaccine} onChange={e => setVaccine(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <label className="block text-sm font-bold">{t("社交距離 %","Distancing %")}: {distancing}
        <input type="range" min="0" max="100" value={distancing} onChange={e => setDistancing(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <div className="p-4 rounded-2xl text-center" style={{ background: risk < 30 ? "#d1fae5" : risk < 60 ? "#fef3c7" : "#fee2e2" }}>
        <p className="text-3xl font-black" style={{ color: accent }}>{risk}%</p>
        <p className="text-sm">{t("社區感染風險","Community infection risk",isZh)}</p>
      </div>
    </div>
  );
}''',
"biotechnology": '''
function ExperimentLab({ isZh, accent }) {
  const [gm, setGm] = useState(25);
  const [insulin, setInsulin] = useState(true);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("探索生物科技應用：GM 食物與胰島素生產。", "Explore biotech: GM food and insulin production.", isZh)}</p>
      <label className="block text-sm font-bold">{t("GM 作物比例 %","GM crop share %")}: {gm}
        <input type="range" min="0" max="100" value={gm} onChange={e => setGm(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <button type="button" onClick={() => setInsulin(!insulin)} className={"w-full py-3 rounded-xl font-bold min-h-[48px] " + (insulin ? "text-white" : "bg-slate-100")} style={insulin ? { background: accent } : {}}>
        {insulin ? t("✓ 基因改造細菌產人類胰島素","✓ GM bacteria → human insulin",isZh) : t("開啟胰島素生產模擬","Enable insulin production sim",isZh)}
      </button>
      <div className="h-10 rounded-full overflow-hidden flex border">
        <div style={{ width: gm + "%", background: accent }} />
        <div style={{ width: (100 - gm) + "%", background: "#e2e8f0" }} />
      </div>
      {insulin && <p className="text-sm text-center font-semibold" style={{ color: accent }}>🧬 {t("醫療應用：治療糖尿病","Medical use: treat diabetes",isZh)}</p>}
    </div>
  );
}''',
"atomic": '''
function ExperimentLab({ isZh, accent }) {
  const [p, setP] = useState(6);
  const [n, setN] = useState(6);
  const t = window.JSLGER.t;
  const e = p;
  const mass = p + n;
  const symbol = p === 1 ? "H" : p === 6 ? "C" : p === 8 ? "O" : p === 11 ? "Na" : "X";
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節質子與中子，觀察原子符號與質量數。", "Adjust protons and neutrons; see symbol and mass number.", isZh)}</p>
      <label className="block text-sm font-bold">{t("質子數 Z","Protons Z")}: {p}
        <input type="range" min="1" max="18" value={p} onChange={e => setP(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <label className="block text-sm font-bold">{t("中子數","Neutrons")}: {n}
        <input type="range" min="0" max="22" value={n} onChange={e => setN(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <div className="p-6 rounded-2xl bg-white border-2 text-center" style={{ borderColor: accent }}>
        <p className="text-4xl font-black">{symbol}</p>
        <p className="text-sm text-slate-500">{t("電子","Electrons",isZh)}: {e} · {t("質量數","Mass no.",isZh)}: {mass}</p>
      </div>
    </div>
  );
}''',
"periodic_table": '''
function ExperimentLab({ isZh, accent }) {
  const groups = [
    { g: "I", zh: "鹼金屬 — 活性高", en: "Alkali metals — very reactive" },
    { g: "II", zh: "鹼土金屬", en: "Alkaline earth metals" },
    { g: "VII", zh: "鹵素 — 非金屬", en: "Halogens — non-metals" },
    { g: "0", zh: "稀有氣體 — 惰性", en: "Noble gases — inert" }
  ];
  const [sel, setSel] = useState(0);
  const t = window.JSLGER.t;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("選擇族別，複習週期表規律。", "Pick a group; review periodic trends.", isZh)}</p>
      <div className="grid grid-cols-4 gap-2">{groups.map((x, i) => (
        <button key={x.g} type="button" onClick={() => setSel(i)} className={"py-2 rounded-lg min-h-[44px] text-sm font-bold " + (sel === i ? "text-white" : "bg-slate-100")} style={sel === i ? { background: accent } : {}}>{x.g}</button>
      ))}</div>
      <p className="font-bold text-center text-lg" style={{ color: accent }}>{t(groups[sel].zh, groups[sel].en, isZh)}</p>
      <p className="text-xs text-center text-slate-500">{t("門捷列夫按性質排列元素","Mendeleev arranged by properties",isZh)}</p>
    </div>
  );
}''',
"compounds": '''
function ExperimentLab({ isZh, accent }) {
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(0);
  const t = window.JSLGER.t;
  const running = current > 0;
  const h2 = running ? Math.min(50, Math.round(time * 2.5)) : 0;
  const o2 = running ? Math.min(25, Math.round(time * 1.2)) : 0;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("通電分解水：2H₂O → 2H₂ + O₂", "Electrolyse water: 2H₂O → 2H₂ + O₂", isZh)}</p>
      <label className="block text-sm font-bold">{t("電流","Current")}: {current} A
        <input type="range" min="0" max="5" value={current} onChange={e => { setCurrent(+e.target.value); if (+e.target.value === 0) setTime(0); else setTime(t => t + 1); }} className="w-full mt-1" style={{ accentColor: accent }} />
      </label>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-4 rounded-xl bg-sky-50 border"><p className="text-xs">H₂ (A)</p><p className="text-2xl font-black text-sky-600">{h2}</p><p className="text-xs">{t("餘燼木條復燃","Glowing splint relights",isZh)}</p></div>
        <div className="p-4 rounded-xl bg-rose-50 border"><p className="text-xs">O₂ (B)</p><p className="text-2xl font-black text-rose-600">{o2}</p><p className="text-xs">{t("帶火星木條劇烈燃燒","Splint burns brightly",isZh)}</p></div>
      </div>
      <p className="text-xs text-center text-slate-500">{t("水是化合物，可分解為元素","Water is a compound; splits into elements",isZh)}</p>
    </div>
  );
}''',
"metals": '''
function ExperimentLab({ isZh, accent }) {
  const list = [
    { sym: "Cu", zh: "銅", en: "Copper", cond: 95, hard: 45 },
    { sym: "Fe", zh: "鐵", en: "Iron", cond: 80, hard: 70 },
    { sym: "Al", zh: "鋁", en: "Aluminium", cond: 90, hard: 35 }
  ];
  const [m, setM] = useState(0);
  const [rust, setRust] = useState(30);
  const t = window.JSLGER.t;
  const metal = list[m];
  const strength = Math.max(10, metal.hard - (metal.sym === "Fe" ? rust * 0.5 : 0));
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("比較金屬性質；鐵會生鏽。", "Compare metal properties; iron rusts.", isZh)}</p>
      <div className="flex gap-2">{list.map((x, i) => (
        <button key={x.sym} type="button" onClick={() => setM(i)} className={"flex-1 py-2 rounded-lg font-bold min-h-[44px] " + (m === i ? "text-white" : "bg-slate-100")} style={m === i ? { background: accent } : {}}>{x.sym}</button>
      ))}</div>
      {metal.sym === "Fe" && (
        <label className="block text-sm font-bold">{t("生鏽程度 %","Rusting %")}: {rust}
          <input type="range" min="0" max="100" value={rust} onChange={e => setRust(+e.target.value)} className="w-full mt-1" style={{ accentColor: accent }} />
        </label>
      )}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="p-3 rounded-xl bg-slate-50 border">{t("導電性","Conductivity",isZh)}: {metal.cond}%</div>
        <div className="p-3 rounded-xl bg-slate-50 border">{t("有效強度","Effective strength",isZh)}: {Math.round(strength)}%</div>
      </div>
    </div>
  );
}''',
}


def js(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)


def block(name, items, fmt):
    lines = [f"const {name} = ["]
    for item in items:
        lines.append("  " + fmt(item) + ",")
    lines.append("];")
    return "\n".join(lines)


def fmt_learn(s):
    parts = [
        f'titleEn: {json.dumps(s["titleEn"], ensure_ascii=False)}',
        f'titleZh: {json.dumps(s["titleZh"], ensure_ascii=False)}',
        f'bodyEn: {json.dumps(s["bodyEn"], ensure_ascii=False)}',
        f'bodyZh: {json.dumps(s["bodyZh"], ensure_ascii=False)}',
    ]
    if "qEn" in s:
        parts += [
            f'qEn: {json.dumps(s["qEn"], ensure_ascii=False)}',
            f'qZh: {json.dumps(s["qZh"], ensure_ascii=False)}',
            f'opts: {js(s["opts"])}',
            f'a: {s["a"]}',
            f'whyEn: {json.dumps(s.get("whyEn",""), ensure_ascii=False)}',
            f'whyZh: {json.dumps(s.get("whyZh",""), ensure_ascii=False)}',
        ]
    return "{ " + ", ".join(parts) + " }"


def fmt_guided(g):
    return (
        "{ qEn: " + json.dumps(g["qEn"], ensure_ascii=False)
        + ", qZh: " + json.dumps(g["qZh"], ensure_ascii=False)
        + ", opts: " + js(g["opts"])
        + ", a: " + str(g["a"])
        + ", hintEn: " + json.dumps(g.get("hintEn", ""), ensure_ascii=False)
        + ", hintZh: " + json.dumps(g.get("hintZh", ""), ensure_ascii=False)
        + " }"
    )


def fmt_review(r):
    return (
        "{ qEn: " + json.dumps(r["qEn"], ensure_ascii=False)
        + ", qZh: " + json.dumps(r["qZh"], ensure_ascii=False)
        + ", opts: " + js(r["opts"])
        + ", a: " + str(r["a"])
        + " }"
    )


def generate_app(cfg):
    exp = EXPERIMENTS[cfg["experiment"]]
    bg = cfg.get("bg", "#f0f9ff")
    return f"""<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{cfg["titleEn"]} · {cfg["titleZh"]} | S3 Junior Science</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="{BABEL}"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <script src="{COMMON_JS}"></script>
  <style>body {{ font-family: "Outfit", sans-serif; background: {bg}; }}</style>
{NCS_HEAD}
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react-classic">
    const {{ useState }} = React;
    const ACCENT = "{cfg["accent"]}";
    const {{ Shell }} = window.JSLGER;

{block("LEARN", cfg["learn"], fmt_learn)}
{block("GUIDED", cfg["guided"], fmt_guided)}
const SUMMARY = {js(cfg["summary"])};
{block("REVIEW", cfg["review"], fmt_review)}

{exp}

    function App() {{
      return (
        <Shell
          meta={{{{ appId: "{cfg["appId"]}", titleEn: "{cfg["titleEn"]}", titleZh: "{cfg["titleZh"]}", unit: "{cfg["unit"]}" }}}}
          accent={{ACCENT}}
          backHref="../index.html"
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
"""


def main():
    cfg_path = os.path.join(_DIR, "f3-batch-b-configs.json")
    with open(cfg_path, encoding="utf-8") as f:
        apps = json.load(f)
    for cfg in apps:
        out = os.path.join(BASE, cfg["folder"], "index.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            f.write(generate_app(cfg))
        print("OK", cfg["folder"])


if __name__ == "__main__":
    main()
