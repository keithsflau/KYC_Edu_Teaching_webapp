#!/usr/bin/env python3
"""Batch builder for Form 3 LGER bridge apps."""
import os, importlib.util
SCRIPT = os.path.dirname(__file__)
spec = importlib.util.spec_from_file_location("gen", os.path.join(SCRIPT, "generate-f2-lger.py"))
gen = importlib.util.module_from_spec(spec); spec.loader.exec_module(gen)
def mk_learn(facts):
    steps = []
    for f in facts:
        s = {"titleEn": f[0], "titleZh": f[1], "bodyEn": f[2], "bodyZh": f[3]}
        if len(f) > 4:
            s.update({"qEn": f[4], "qZh": f[5], "opts": list(f[6]), "a": f[7], "why": f[8] if len(f) > 8 else ""})
        steps.append(s)
    while len(steps) < 6:
        steps.append({"titleEn": "Lab ready", "titleZh": "準備實驗", "bodyEn": "Apply concepts in the interactive lab.", "bodyZh": "在互動實驗中應用概念。",
            "qEn": "Ready?", "qZh": "準備好？", "opts": ["Yes 是", "No 否", "Maybe"], "a": "Yes 是", "why": "Go! 開始！"})
    return steps[:6]

def mk_guided(qs):
    return [{"qEn": q[0], "qZh": q[1], "opts": list(q[2]), "a": q[3], "hint": q[4]} for q in qs]
def mk_summary(items): return [{"en": i[0], "zh": i[1]} for i in items]
def mk_review(qs): return [{"qEn": q[0], "qZh": q[1], "opts": list(q[2]), "a": q[3]} for q in qs]

BASE = os.path.normpath(os.path.join(SCRIPT, "..", "Secondary_School", "Junior Science", "Form 3"))
COMMON = "../../../../common/junior-science-lger.js"
generate_app = gen.generate_app

# Add F3-specific experiments to gen.EXPERIMENTS
gen.EXPERIMENTS["ecosystem"] = '''
function ExperimentLab({ isZh, accent }) {
  const [pred, setPred] = useState(50);
  const [prey, setPrey] = useState(50);
  const t = window.JSLGER.t;
  const balance = Math.abs(pred - prey);
  const stable = balance < 15;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節捕食者與獵物數量，觀察生態平衡。", "Adjust predator and prey populations for balance.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("捕食者", "Predators")}: {pred}</label>
      <input type="range" min="10" max="90" value={pred} onChange={e => setPred(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("獵物", "Prey")}: {prey}</label>
      <input type="range" min="10" max="90" value={prey} onChange={e => setPrey(+e.target.value)} className="w-full" />
      <p className="font-bold text-center text-lg" style={{ color: accent }}>{stable ? t("平衡 ✓", "Balanced ✓", isZh) : t("失衡", "Imbalanced", isZh)}</p>
    </div>
  );
}'''
gen.EXPERIMENTS["circuit_design"] = '''
function ExperimentLab({ isZh, accent }) {
  const [bulbs, setBulbs] = useState(1);
  const [voltage, setVoltage] = useState(6);
  const t = window.JSLGER.t;
  const brightness = Math.max(10, 100 / bulbs);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("串聯燈泡數增加，每盞燈變暗。", "More bulbs in series → each dimmer.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("串聯燈泡數", "Bulbs in series")}: {bulbs}</label>
      <input type="range" min="1" max="4" value={bulbs} onChange={e => setBulbs(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("電壓 (V)", "Voltage (V)")}: {voltage}</label>
      <input type="range" min="3" max="12" value={voltage} onChange={e => setVoltage(+e.target.value)} className="w-full" />
      <div className="flex justify-center gap-2">{[...Array(bulbs)].map((_,i) => <i key={i} className="fa-solid fa-lightbulb text-4xl text-yellow-400" style={{ opacity: brightness/100 }} />)}</div>
      <p className="font-bold text-center" style={{ color: accent }}>{t("亮度", "Brightness")}: {Math.round(brightness)}%</p>
    </div>
  );
}'''
gen.EXPERIMENTS["human_impact"] = '''
function ExperimentLab({ isZh, accent }) {
  const [deforest, setDeforest] = useState(30);
  const [pollution, setPollution] = useState(40);
  const t = window.JSLGER.t;
  const health = Math.max(0, 100 - deforest * 0.5 - pollution * 0.4);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("調節砍伐和污染，觀察生態健康指數。", "Adjust deforestation and pollution to see ecosystem health.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("砍伐率 %", "Deforestation %")}: {deforest}</label>
      <input type="range" min="0" max="100" value={deforest} onChange={e => setDeforest(+e.target.value)} className="w-full" />
      <label className="block text-sm font-semibold">{t("污染 %", "Pollution %")}: {pollution}</label>
      <input type="range" min="0" max="100" value={pollution} onChange={e => setPollution(+e.target.value)} className="w-full" />
      <p className="text-3xl font-black text-center" style={{ color: accent }}>{Math.round(health)}%</p>
    </div>
  );
}'''
gen.EXPERIMENTS["data_chart"] = '''
function ExperimentLab({ isZh, accent }) {
  const [samples, setSamples] = useState(5);
  const t = window.JSLGER.t;
  const vals = [...Array(samples)].map((_, i) => 20 + Math.round(Math.sin(i * 1.2) * 15 + i * 8));
  const avg = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">{t("改變樣本數，觀察平均值變化。", "Change sample count to see average shift.", isZh)}</p>
      <label className="block text-sm font-semibold">{t("樣本數", "Samples")}: {samples}</label>
      <input type="range" min="3" max="10" value={samples} onChange={e => setSamples(+e.target.value)} className="w-full" />
      <div className="h-24 flex items-end gap-1">{vals.map((v,i) => <div key={i} className="flex-1 rounded-t" style={{ height: v + "px", background: accent }} />)}</div>
      <p className="font-bold text-center" style={{ color: accent }}>{t("平均", "Mean")}: {avg}</p>
    </div>
  );
}'''
gen.EXPERIMENTS["newton_cradle"] = '''
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

APPS = [
{"folder":"03_Acid_Rain_Advanced","appId":"s3_acid_rain","titleEn":"Acid Rain Advanced","titleZh":"酸雨進階","unit":"Form 3 · Environment Bridge","accent":"#6366f1","experiment":"acid_rain",
 "learn":mk_learn([("pH and ecosystems","pH 與生態系","Acid rain lowers lake pH, harming fish and amphibians.","酸雨降低湖水 pH，損害魚類和兩棲動物。","Fish die when pH…","魚類死亡當 pH…",["Too low 過低","=14","Only in ocean"],"Too low 過低","Sensitive species."),
 ("SO₂ sources","SO₂ 來源","Power stations and vehicles emit sulfur oxides forming sulfuric acid in clouds.","發電站和車輛排放硫氧化物，在雲中形成硫酸。","Main source…","主要來源…",["Fossil fuels 化石燃料","Photosynthesis","Rain only"],"Fossil fuels 化石燃料","Combustion."),
 ("NOₓ sources","NOₓ 來源","Lightning and engines produce nitrogen oxides forming nitric acid.","閃電和引擎產生氮氧化物形成硝酸。","Cars reduce NOₓ with…","汽車用…減少NOₓ",["Catalytic converter 催化轉換器","Magnet","pH paper"],"Catalytic converter 催化轉換器","Exhaust treatment."),
 ("Limestone damage","石灰石損害","CaCO₃ + acid → soluble products; historic buildings at risk.","CaCO₃ + 酸 → 可溶物；古建築受威脅。","HK heritage…","香港古蹟…",["Need protection 需保護","Unaffected","Grow stronger"],"Need protection 需保護","Urban pollution."),
 ("International action","國際行動","Cross-border pollution needs regional agreements and emission caps.","跨境污染需區域協議和排放上限。","Solution includes…","解決方案包括…",["Cut emissions 減排","More coal","Ignore"],"Cut emissions 減排","Policy."),
 ("Lab","實驗","Model pH damage to buildings and forests.","模擬 pH 對建築和森林的損害。","Acid rain pH…","酸雨 pH…",["<5.6","=7",">14"],"<5.6","Definition.")]),
 "guided":mk_guided([("Acid rain harms…","酸雨損害…",["Lakes & buildings 湖泊和建築","Only metals in lab","Nothing"],"Lakes & buildings 湖泊和建築","Ecosystem."),
 ("SO₂ from…","SO₂ 來自…",["Fossil fuel burn 燃燒化石燃料","Only plants","Space"],"Fossil fuel burn 燃燒化石燃料","Industry."),
 ("Lower pH…","pH 越低…",["More damage 損害越大","Less damage","No effect"],"More damage 損害越大","Acidity."),
 ("Fix needs…","治理需要…",["Emission cuts 減排","More SO₂","Ignore"],"Emission cuts 減排","Policy.")]),
 "summary":mk_summary([("Acid rain pH < 5.6 damages ecosystems.","酸雨 pH < 5.6 損害生態。"),("SO₂ and NOₓ from fossil fuels.","SO₂ 和 NOₓ 來自化石燃料。"),("Limestone buildings corrode.","石灰石建築腐蝕。"),("Regional emission controls needed.","需區域排放管制。")]),
 "review":mk_review([("Acid rain pH?","酸雨 pH？",["<5.6",">7","=0"],"<5.6"),("SO₂ source?","SO₂ 來源？",["Coal/oil burn","O₂","Rain"],"Coal/oil burn"),("Building stone hurt?","建築石材？",["Limestone 石灰石","Gold","Plastic"],"Limestone 石灰石"),("Car device?","汽車裝置？",["Catalytic converter","Magnet","Lens"],"Catalytic converter"),("Lower pH…","pH 越低…",["More harm","Less harm","None"],"More harm")])},
{"folder":"04_Circuit_Design","appId":"s3_circuit","titleEn":"Circuit Design","titleZh":"電路設計","unit":"Form 3 · Physics Bridge","accent":"#f97316","experiment":"circuit_design",
 "learn":mk_learn([("Series vs parallel","串聯與並聯","Series shares current; parallel shares voltage across branches.","串聯共用電流；並聯各支路共用電壓。","House wiring is mostly…","家居電路多為…",["Parallel 並聯","Series only","Open"],"Parallel 並聯","Independent appliances."),
 ("Series bulbs","串聯燈泡","More bulbs in series → higher total R → dimmer each.","串聯燈泡愈多 → 總電阻愈大 → 每盞愈暗。","3 bulbs vs 1 same V…","同 V 下 3 盞對 1 盞…",["Each dimmer 每盞較暗","Brighter each","Same"],"Each dimmer 每盞較暗","R adds."),
 ("Parallel bulbs","並聯燈泡","Each bulb gets full voltage → same brightness if identical.","每盞燈獲全電壓 → 相同燈泡同亮度。","One breaks in parallel…","並聯一盞壞…",["Others still on 其他仍亮","All off","Explodes"],"Others still on 其他仍亮","Independent."),
 ("Power","功率","P = IV; higher power devices need thicker cables/fuses.","P = IV；高功率設備需較粗電線/保險絲。","1 kW heater vs 10 W LED…","1 kW 暖爐對 10 W LED…",["Heater needs more current 暖爐需更大電流","Same","LED more"],"Heater needs more current 暖爐需更大電流","P=IV."),
 ("HK mains","香港市電","HK mains ~220 V AC; never experiment on mains directly.","香港市電約 220 V 交流；切勿直接實驗市電。","Safe lab uses…","安全實驗用…",["Low voltage cells 低壓電池","Mains directly","Wet hands"],"Low voltage cells 低壓電池","Safety."),
 ("Lab","實驗","Add series bulbs and observe brightness drop.","增加串聯燈泡觀察亮度下降。","Series R…","串聯電阻…",["Increases 增加","Decreases","Zero"],"Increases 增加","Adds up.")]),
 "guided":mk_guided([("Home circuits…","家居電路…",["Parallel 並聯","Series only","None"],"Parallel 並聯","Appliances."),
 ("More series bulbs…","更多串聯燈…",["Dimmer each 每盞更暗","Brighter","Same"],"Dimmer each 每盞更暗","More R."),
 ("P =","P =",["IV","I/R","V only"],"IV","Power."),
 ("Mains lab rule…","市電實驗規則…",["Never direct 絕不直接","Always use mains","Wet OK"],"Never direct 絕不直接","Safety.")]),
 "summary":mk_summary([("Series: current same, R adds.","串聯：電流相同，電阻相加。"),("Parallel: voltage same per branch.","並聯：各支路電壓相同。"),("More series bulbs → dimmer.","串聯燈愈多愈暗。"),("P = IV for power rating.","P = IV 為功率。")]),
 "review":mk_review([("Home wiring?","家居接線？",["Parallel","Series only","None"],"Parallel"),("Series more bulbs?","串聯更多燈？",["Dimmer","Brighter","Same"],"Dimmer"),("P formula?","P 公式？",["IV","I/R","mgh"],"IV"),("HK mains ~","香港市電 ~",["220 V","6 V","1 V"],"220 V"),("Safe lab?","安全實驗？",["Low V cells","Mains direct","Water"],"Low V cells")])},
{"folder":"05_Ecosystem_Balance","appId":"s3_ecosystem","titleEn":"Ecosystem Balance","titleZh":"生態平衡","unit":"Form 3 · Life Science Bridge","accent":"#16a34a","experiment":"ecosystem",
 "learn":mk_learn([("Food web","食物網","Energy flows producer → consumer → decomposer in ecosystems.","能量在生態系中由生產者→消費者→分解者流動。","Producers are…","生產者是…",["Plants/algae 植物/藻","Only lions","Rocks"],"Plants/algae 植物/藻","Photosynthesis."),
 ("Predator-prey","捕食者-獵物","Populations cycle; too many predators → prey crash → predator crash.","數量週期波動；捕食者過多→獵物崩潰→捕食者崩潰。","Balance means…","平衡指…",["Stable populations 穩定族群","No predators","Only prey"],"Stable populations 穩定族群","Dynamic equilibrium."),
 ("Biodiversity","生物多樣性","More species → more resilient ecosystem to change.","物種愈多 → 生態系愈能抵抗變化。","Loss of one species…","失去一物種…",["Can disrupt web 可破壞食物網","No effect always","Adds energy"],"Can disrupt web 可破壞食物網","Interdependence."),
 ("Human impact","人類影響","Habitat loss, pollution and overfishing reduce biodiversity.","棲地喪失、污染和過度捕撈降低生物多樣性。","Marine parks in HK…","香港海洋公園保護…",["Biodiversity 生物多樣性","Only buildings","Space"],"Biodiversity 生物多樣性","Conservation."),
 ("Energy loss","能量流失","Only ~10% energy passes to next trophic level.","僅約 10% 能量傳至下一營養級。","Long food chain…","長食物鏈…",["Less energy at top 頂端能量少","More at top","Infinite"],"Less energy at top 頂端能量少","10% rule."),
 ("Lab","實驗","Balance predator and prey sliders.","平衡捕食者與獵物滑桿。","Producers capture…","生產者捕捉…",["Sun energy 太陽能","Heat from prey","Sound"],"Sun energy 太陽能","Photosynthesis.")]),
 "guided":mk_guided([("Producers…","生產者…",["Make food via PSN 光合作用製食","Only eat meat","Are rocks"],"Make food via PSN 光合作用製食","Base of web."),
 ("Too many predators…","捕食者過多…",["Prey drops 獵物減少","Prey doubles","Nothing"],"Prey drops 獵物減少","Cycle."),
 ("Biodiversity helps…","生物多樣性有助…",["Resilience 恢復力","Pollution","Habitat loss"],"Resilience 恢復力","Stability."),
 ("~10% rule means…","約10%法則…",["Energy lost between levels 級間能量流失","100% transfer","No loss"],"Energy lost between levels 級間能量流失","Trophic.")]),
 "summary":mk_summary([("Food webs show energy flow.","食物網顯示能量流動。"),("Predator-prey populations cycle.","捕食者-獵物數量週期變化。"),("Biodiversity increases resilience.","生物多樣性增強恢復力。"),("~10% energy between trophic levels.","營養級間約 10% 能量。")]),
 "review":mk_review([("Producers?","生產者？",["Plants","Lions","Fungi only"],"Plants"),("Balance is…","平衡是…",["Dynamic 動態","Fixed forever","No prey"],"Dynamic 動態"),("Biodiversity…","生物多樣性…",["Increases resilience","Always lowers","No link"],"Increases resilience"),("Energy transfer ~","能量傳遞 ~",["10%","100%","0%"],"10%"),("Human threat?","人類威脅？",["Habitat loss","More trees always","None"],"Habitat loss")])},
{"folder":"06_Human_Impact","appId":"s3_human_impact","titleEn":"Human Impact","titleZh":"人類影響","unit":"Form 3 · Environment Bridge","accent":"#0d9488","experiment":"human_impact",
 "learn":mk_learn([("Anthropogenic change","人為改變","Human activities alter climate, habitats and pollution levels.","人類活動改變氣候、棲地和污染水平。","Examples include…","例子包括…",["Deforestation & fossil fuels 砍伐和化石燃料","Only tides","Moon phases"],"Deforestation & fossil fuels 砍伐和化石燃料","Major drivers."),
 ("Deforestation","砍伐森林","Removes CO₂ sinks and destroys habitats.","移除二氧化碳匯和破壞棲地。","Effect on CO₂…","對 CO₂…",["Atmospheric CO₂ rises 大氣CO₂上升","CO₂ drops","No change"],"Atmospheric CO₂ rises 大氣CO₂上升","Fewer trees."),
 ("Plastic pollution","塑膠污染","Microplastics enter food chains and harm marine life.","微塑膠進入食物鏈並損害海洋生物。","HK action…","香港行動…",["Reduce single-use 減少一次性","More plastic","Burn in open"],"Reduce single-use 減少一次性","Waste policy."),
 ("Sustainable development","可持續發展","Meet present needs without compromising future generations.","滿足當代需求而不損害後代。","Includes…","包括…",["Renewables & conservation 再生能源和保育","More coal only","Ignore future"],"Renewables & conservation 再生能源和保育","SDG link."),
 ("Citizen science","公民科學","Students can monitor air quality, beach litter and biodiversity.","學生可監測空氣質素、海灘垃圾和生物多樣性。","Data helps…","數據有助…",["Policy & awareness 政策和意識","Nothing","Hide problems"],"Policy & awareness 政策和意識","Evidence."),
 ("Lab","實驗","Adjust deforestation and pollution sliders.","調節砍伐和污染滑桿。","Health index drops when…","健康指數下降當…",["Both rise 兩者上升","Both zero","Ignore"],"Both rise 兩者上升","Combined impact.")]),
 "guided":mk_guided([("Deforestation…","砍伐森林…",["Less CO₂ uptake 減少固碳","More trees","No CO₂ change"],"Less CO₂ uptake 減少固碳","Sinks."),
 ("Plastic harms…","塑膠損害…",["Marine life 海洋生物","Only rocks","Space"],"Marine life 海洋生物","Food chain."),
 ("Sustainability means…","可持續指…",["Future generations 後代","Today only","More waste"],"Future generations 後代","SD."),
 ("Citizen science provides…","公民科學提供…",["Data 數據","No value","Secrecy"],"Data 數據","Monitoring.")]),
 "summary":mk_summary([("Humans alter climate and habitats.","人類改變氣候和棲地。"),("Deforestation raises atmospheric CO₂.","砍伐增加大氣 CO₂。"),("Plastic pollutes marine ecosystems.","塑膠污染海洋生態。"),("Sustainability protects future needs.","可持續發展保護後代需求。")]),
 "review":mk_review([("Deforestation effect?","砍伐影響？",["↑ CO₂","↓ CO₂","None"],"↑ CO₂"),("Plastic harms?","塑膠損害？",["Marine life","Rocks only","Moon"],"Marine life"),("Sustainability?","可持續？",["Future + present","Today only","Waste more"],"Future + present"),("Citizen science?","公民科學？",["Collects data","Hides data","Illegal"],"Collects data"),("Combined pollution+deforest?","污染+砍伐？",["Health drops","Health rises","No change"],"Health drops")])},
{"folder":"07_Data_Analysis","appId":"s3_data","titleEn":"Data Analysis","titleZh":"數據分析","unit":"Form 3 · STEAM Bridge","accent":"#0891b2","experiment":"data_chart",
 "learn":mk_learn([("Scientific data","科學數據","Experiments produce measurements that must be recorded clearly.","實驗產生需清楚記錄的測量數據。","Good table has…","好表格有…",["Headings & units 標題和單位","No labels","Only colours"],"Headings & units 標題和單位","Clarity."),
 ("Mean","平均值","Mean = sum of values ÷ number of values; reduces random error.","平均 = 數值總和 ÷ 個數；減少隨機誤差。","Why repeat trials?","為何重複實驗？",["More reliable mean 更可靠平均","Skip work","Change unit"],"More reliable mean 更可靠平均","Reliability."),
 ("Graphs","圖表","Choose graph type: bar (categories), line (continuous change).","選擇圖表類型：棒形（類別）、線形（連續變化）。","Speed-time is…","速度-時間是…",["Line graph 線圖","Pie only","Photo"],"Line graph 線圖","Continuous."),
 ("Anomalies","異常值","Outliers may be discarded if caused by clear experimental error.","若由明顯實驗誤差造成，可剔除離群值。","Must document…","必須記錄…",["Why removed 剔除原因","Nothing","Hide data"],"Why removed 剔除原因","Integrity."),
 ("Digital tools","數碼工具","Spreadsheets and sensors automate collection and plotting.","試算表和感應器自動收集和繪圖。","Sensor advantage…","感應器優點…",["Precise & fast 精確快速","Always wrong","No data"],"Precise & fast 精確快速","STEAM."),
 ("Lab","實驗","Change sample size and observe mean shift.","改變樣本數觀察平均值變化。","Mean formula…","平均公式…",["Sum/n 總和/個數","Sum×n","n only"],"Sum/n 總和/個數","Statistics.")]),
 "guided":mk_guided([("Mean =","平均 =",["Sum ÷ n","Sum × n","n only"],"Sum ÷ n","Formula."),
 ("Repeat trials…","重複實驗…",["Improve reliability 提高可靠性","Waste time only","Change law"],"Improve reliability 提高可靠性","Error."),
 ("Line graph for…","線圖用於…",["Continuous change 連續變化","Only names","Colours"],"Continuous change 連續變化","Trend."),
 ("Anomaly should…","異常值應…",["Be explained if removed 剔除需解釋","Always hide","Always keep blindly"],"Be explained if removed 剔除需解釋","Ethics.")]),
 "summary":mk_summary([("Record data with units.","以單位記錄數據。"),("Mean reduces random error.","平均值減少隨機誤差。"),("Choose appropriate graph types.","選擇合適圖表類型。"),("Document anomalies honestly.","誠實記錄異常值。")]),
 "review":mk_review([("Mean formula?","平均公式？",["Σx/n","Σx×n","n"],"Σx/n"),("Repeat why?","重複為何？",["Reliability","Skip","Fun"],"Reliability"),("v-t graph type?","v-t 圖類型？",["Line","Pie","Bar only"],"Line"),("Anomaly?","異常值？",["Explain if removed","Hide","Fake"],"Explain if removed"),("Sensors?","感應器？",["Precise data","No use","Block science"],"Precise data")])},
{"folder":"08_Force_Advanced","appId":"s3_force","titleEn":"Force & Motion Advanced","titleZh":"力與運動進階","unit":"Form 3 · Physics Bridge","accent":"#dc2626","experiment":"resultant_force",
 "learn":mk_learn([("Newton's 2nd law","牛頓第二定律","F = ma: resultant force causes acceleration proportional to mass.","F = ma：合力產生與質量成比例的加速度。","Double mass same F…","同 F 質量加倍…",["Half acceleration 加速度減半","Double a","No change"],"Half acceleration 加速度減半","Inverse."),
 ("Friction in motion","運動中的摩擦","Friction opposes motion; can cause heating and wear.","摩擦阻碍運動；可產生熱和磨損。","Without friction cars…","無摩擦汽車…",["Cannot grip road 無法抓地","Faster always","Fly"],"Cannot grip road 無法抓地","Tyres need grip."),
 ("Terminal velocity","終端速度","Falling object reaches terminal velocity when air resistance = weight.","落體當空氣阻力 = 重量時達終端速度。","At terminal v…","終端速度時…",["Acceleration = 0 加速度=0","Still accelerating","Stops mid-air"],"Acceleration = 0 加速度=0","Balanced forces."),
 ("Momentum intro","動量入門","Momentum p = mv; harder to stop heavy fast objects.","動量 p = mv；重而快較難停止。","Truck vs bike same v…","同速貨車對單車…",["Truck more momentum 貨車動量更大","Same always","Bike more"],"Truck more momentum 貨車動量更大","m matters."),
 ("Safety","安全","Seatbelts increase stopping time reducing force on passenger (F=ma).","安全帶延長停止時間減少乘客受力(F=ma)。","Crumple zones…","潰縮區…",["Absorb energy 吸收能量","Rigid better always","No effect"],"Absorb energy 吸收能量","Car design."),
 ("Lab","實驗","Explore opposing forces and resultant.","探索反向力和合力。","F=ma means…","F=ma 表示…",["a = F/m","a = m/F","F = 0 always"],"a = F/m","Newton 2.")]),
 "guided":mk_guided([("F = ma → a =","F = ma → a =",["F/m","Fm","m/F"],"F/m","Rearrange."),
 ("Terminal velocity when…","終端速度當…",["Forces balanced 力平衡","No gravity","No mass"],"Forces balanced 力平衡","Net F=0."),
 ("Momentum p =","動量 p =",["mv","m/v","v only"],"mv","Definition."),
 ("Seatbelt…","安全帶…",["Increases stopping time 延長停止時間","Removes mass","Adds speed"],"Increases stopping time 延長停止時間","Safety.")]),
 "summary":mk_summary([("F = ma links force and acceleration.","F = ma 連結力與加速度。"),("Terminal velocity: balanced forces.","終端速度：力平衡。"),("Momentum p = mv.","動量 p = mv。"),("Safety features reduce injury force.","安全裝置減少受傷力。")]),
 "review":mk_review([("Newton 2?","牛頓第二？",["F=ma","F=0","a=mF"],"F=ma"),("Terminal v accel?","終端速度加速度？",["0","g","Infinite"],"0"),("p =","p =",["mv","m+v","F/a"],"mv"),("Double m same F → a","m加倍同F → a",["Halves","Doubles","Same"],"Halves"),("Seatbelt…","安全帶…",["Longer stop time","Shorter stop","No effect"],"Longer stop time")])},
{"folder":"09_Chemistry_Bridge","appId":"s3_chem","titleEn":"Chemistry Bridge","titleZh":"化學銜接","unit":"Form 3 · Chemistry Bridge","accent":"#7c3aed","experiment":"ph_scale",
 "learn":mk_learn([("Particle theory review","粒子理論複習","Solids fixed; liquids close; gases far apart and random motion.","固體固定；液體相近；氣體疏遠且隨機運動。","Gas particles…","氣體粒子…",["Far apart & random 疏遠隨機","Fixed lattice","No motion"],"Far apart & random 疏遠隨機","Kinetic model."),
 ("Solutions","溶液","Solute dissolves in solvent; solubility often increases with temperature.","溶質溶於溶劑；溶解度常隨溫度升高。","Saturated solution…","飽和溶液…",["No more dissolves 不能再溶","Empty","Only gas"],"No more dissolves 不能再溶","Equilibrium."),
 ("Acids & bases recap","酸鹼複習","Acids pH<7; alkalis pH>7; neutralization forms salt + water.","酸 pH<7；鹼 pH>7；中和生成鹽+水。","Neutral pH…","中性 pH…",["7","0","14 only acid"],"7","Water."),
 ("Chemical change","化學變化","New substances form; often hard to reverse (burning, rusting).","形成新物質；常難逆轉（燃燒、生鏽）。","Rusting is…","生鏽是…",["Oxidation 氧化","Physical change only","Dissolving sugar"],"Oxidation 氧化","Chemical."),
 ("HKDSE preview","HKDSE 預覽","IS combines physics, chemistry, biology contexts in real-world problems.","整合科學結合物化生在真實問題中。","STEAM means…","STEAM 指…",["Science+Tech+Eng+Arts+Math","Only art","Only sport"],"Science+Tech+Eng+Arts+Math","Interdisciplinary."),
 ("Lab","實驗","Use pH slider to review acid-alkali scale.","用 pH 滑桿複習酸鹼量尺。","Strong acid pH…","強酸 pH…",["Near 0","7","14"],"Near 0","Scale.")]),
 "guided":mk_guided([("Gas particles…","氣體粒子…",["Random & far 隨機疏遠","Fixed","In lattice"],"Random & far 隨機疏遠","Model."),
 ("Saturated…","飽和…",["No more solute dissolves 不能再溶","Empty","All gas"],"No more solute dissolves 不能再溶","Limit."),
 ("Neutralization →","中和→",["Salt + water","Only O₂","Metal"],"Salt + water","Products."),
 ("Rusting is…","生鏽是…",["Chemical change 化學變化","Physical only","Reversible easily"],"Chemical change 化學變化","New substance.")]),
 "summary":mk_summary([("Particle model explains states.","粒子模型解釋物態。"),("Solutions: solute + solvent.","溶液：溶質+溶劑。"),("Acids/bases neutralize to salt + water.","酸鹼中和成鹽+水。"),("IS bridges to HKDSE contexts.","整合科學銜接 HKDSE。")]),
 "review":mk_review([("Gas motion?","氣體運動？",["Random","Fixed","None"],"Random"),("Saturated?","飽和？",["Max dissolved","Empty","Only gas"],"Max dissolved"),("Neutral pH?","中性 pH？",["7","0","14"],"7"),("Rusting?","生鏽？",["Chemical","Physical","Dissolving"],"Chemical"),("STEAM includes?","STEAM 包括？",["Science & Math","Only art","Only PE"],"Science & Math")])},
{"folder":"10_Energy_Systems","appId":"s3_energy","titleEn":"Energy Systems","titleZh":"能源系統","unit":"Form 3 · STEAM Bridge","accent":"#ca8a04","experiment":"domestic_bill",
 "learn":mk_learn([("Energy sources","能源","HK uses natural gas, nuclear (imported elec), renewables growing.","香港用天然氣、核電（進口電）、再生能源增長中。","Renewable examples…","再生能源例子…",["Solar & wind 太陽能和風","Coal only","Plastic"],"Solar & wind 太陽能和風","Clean."),
 ("Efficiency","效率","Efficiency = useful output ÷ total input; always < 100%.","效率 = 有用輸出 ÷ 總輸入；恆 < 100%。","LED vs filament…","LED 對白熾燈…",["LED more efficient LED更高效","Filament always better","Same"],"LED more efficient LED更高效","Less heat waste."),
 ("Sankey diagrams","桑基圖","Show energy flows and wasted heat in devices.","顯示裝置中能量流動和浪費的熱。","Thicker arrow means…","較粗箭頭表示…",["More energy 更多能量","Less energy","Time"],"More energy 更多能量","Flow size."),
 ("HK CLP/HKE","香港電力","HK has CLP and HKE grids; tariffs encourage off-peak use.","香港有中電和港燈電網；電價鼓勵離峰用電。","Save bill by…","省電費…",["Off-peak & efficiency 離峰和效率","Always peak","Short circuit"],"Off-peak & efficiency 離峰和效率","Tariff."),
 ("Carbon reduction","減碳","Switching to renewables and efficiency cuts CO₂ emissions.","轉向再生能源和效率可減 CO₂ 排放。","Solar panel…","太陽能板…",["Converts light to electricity 光轉電","Burns coal","Makes CO₂"],"Converts light to electricity 光轉電","PV."),
 ("Lab","實驗","Calculate appliance kWh and cost.","計算電器千瓦時和費用。","kWh =","kWh =",["kW × hours","kW ÷ hours","W only"],"kW × hours","Energy.")]),
 "guided":mk_guided([("Renewable…","再生能源…",["Solar/wind 太陽能/風","Coal only","Tar"],"Solar/wind 太陽能/風","Clean."),
 ("Efficiency <","效率 <",["100%","200%","0% only"],"100%","Waste heat."),
 ("Sankey shows…","桑基圖顯示…",["Energy flow 能量流","Mass only","pH"],"Energy flow 能量流","Diagram."),
 ("Save electricity…","省電…",["Efficient devices 高效設備","Leave on","Short circuit"],"Efficient devices 高效設備","Habits.")]),
 "summary":mk_summary([("HK mix: gas, nuclear import, renewables.","香港組合：氣、核進口、再生。"),("Efficiency always < 100%.","效率恆 < 100%。"),("Sankey diagrams show energy flow.","桑基圖顯示能量流。"),("Renewables reduce carbon footprint.","再生能源減碳足跡。")]),
 "review":mk_review([("Renewable?","再生能源？",["Wind","Coal","Oil"],"Wind"),("Efficiency max?","效率上限？",["<100%","200%","500%"],"<100%"),("Sankey?","桑基圖？",["Energy flow","Mass","Speed"],"Energy flow"),("kWh?","kWh？",["kW×h","kW/h","W"],"kW×h"),("Solar panel?","太陽能板？",["Light→electricity","Burns fuel","Makes tar"],"Light→electricity")])},
]

def main():
    for cfg in APPS:
        out = os.path.join(BASE, cfg["folder"], "index.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            f.write(generate_app(cfg))
        print("OK F3", cfg["folder"])

if __name__ == "__main__":
    main()
