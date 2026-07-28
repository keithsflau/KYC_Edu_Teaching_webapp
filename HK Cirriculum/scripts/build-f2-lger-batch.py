#!/usr/bin/env python3
"""Self-contained batch builder for Form 2 LGER apps."""
import os, json

BASE = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "Secondary_School", "Junior Science", "Form 2"))
COMMON = "../../../../common/junior-science-lger.js"
SKIP = {"04_Air_Composition", "09_Safety_House", "22_Reaction_Time", "30_Space_Mission"}

def mk_learn(facts):
    steps = []
    for i, f in enumerate(facts):
        s = {"titleEn": f[0], "titleZh": f[1], "bodyEn": f[2], "bodyZh": f[3]}
        if len(f) > 4:
            s.update({"qEn": f[4], "qZh": f[5], "opts": list(f[6]), "a": f[7], "why": f[8] if len(f) > 8 else ""})
        steps.append(s)
    while len(steps) < 6:
        steps.append({"titleEn": "Lab ready", "titleZh": "準備實驗",
            "bodyEn": "Complete the interactive lab to apply what you learned.",
            "bodyZh": "完成互動實驗，應用所學。",
            "qEn": "Ready to experiment?", "qZh": "準備好實驗了嗎？",
            "opts": ["Yes 是", "No 否", "Maybe 也許"], "a": "Yes 是", "why": "Let's go! 開始！"})
    return steps[:6]

def mk_guided(qs):
    return [{"qEn": q[0], "qZh": q[1], "opts": list(q[2]), "a": q[3], "hint": q[4]} for q in qs]

def mk_summary(items):
    return [{"en": i[0], "zh": i[1]} for i in items]

def mk_review(qs):
    return [{"qEn": q[0], "qZh": q[1], "opts": list(q[2]), "a": q[3]} for q in qs]

# Import experiments from sibling module
import importlib.util
spec = importlib.util.spec_from_file_location("gen", os.path.join(os.path.dirname(__file__), "generate-f2-lger.py"))
gen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)
EXPERIMENTS = gen.EXPERIMENTS
generate_app = gen.generate_app

APPS = [
{"folder":"01_Photosynthesis","appId":"s2_photosynthesis","titleEn":"Photosynthesis Lab","titleZh":"光合作用實驗室","unit":"Form 2 · Living Things & Air","accent":"#16a34a","experiment":"photosynthesis",
 "learn":mk_learn([
  ("What is photosynthesis?","什麼是光合作用？","Plants make glucose using light, water and CO₂ in chloroplasts.","植物在葉綠體內利用光、水和二氧化碳製造葡萄糖。","Main product?","主要產物？",["Glucose 葡萄糖","Oxygen only 只有氧","Nitrogen 氮"],"Glucose 葡萄糖","Also releases O₂."),
  ("Word equation","文字方程式","Carbon dioxide + water → glucose + oxygen (in light).","二氧化碳 + 水 → 葡萄糖 + 氧氣（需光）。","Needs light?","需要光嗎？",["Yes 是","No 否","Only at night 只在夜"],"Yes 是","Chlorophyll captures light."),
  ("Chlorophyll","葉綠素","Green pigment absorbs light energy for the reaction.","綠色色素吸收光能推動反應。","Where?","在哪裡？",["Chloroplasts 葉綠體","Nucleus 細胞核","Cell wall 細胞壁"],"Chloroplasts 葉綠體","In leaf cells."),
  ("Factors","影響因素","Rate depends on light intensity, CO₂ and temperature.","速率受光強、二氧化碳和溫度影響。","More light generally…","光強增加通常…",["Increases rate 提高速率","Stops reaction 停止反應","No effect 無影響"],"Increases rate 提高速率","Up to a limit."),
  ("Gas exchange","氣體交換","Plants take in CO₂ and release O₂ during photosynthesis.","植物光合作用時吸收二氧化碳並釋放氧氣。","Daytime net gas…","白天淨氣體…",["O₂ out 釋氧","CO₂ out 釋碳","No change 不變"],"O₂ out 釋氧","Photosynthesis dominant."),
  ("Lab link","實驗連結","Use sliders to see how light and CO₂ affect glucose output.","用滑桿觀察光和二氧化碳如何影響葡萄糖產量。","Equation includes…","方程式包含…",["CO₂ and H₂O","Only O₂","Only N₂"],"CO₂ and H₂O","Reactants on left."),
 ]),
 "guided":mk_guided([
  ("Photosynthesis needs…","光合作用需要…",["Light, CO₂, water 光、二氧化碳、水","Only darkness 只有黑暗","Only soil 只有泥土"],"Light, CO₂, water 光、二氧化碳、水","Think inputs."),
  ("Chlorophyll is in…","葉綠素位於…",["Chloroplasts 葉綠體","Ribosomes 核糖體","Vacuole 液泡"],"Chloroplasts 葉綠體","Green parts of leaf."),
  ("Product besides O₂?","除氧氣外的產物？",["Glucose 葡萄糖","Salt 鹽","Iron 鐵"],"Glucose 葡萄糖","Food for plant."),
  ("More CO₂ (limited)…","更多二氧化碳（其他不變）…",["Faster photosynthesis 光合作用加快","Slower 變慢","Stops 停止"],"Faster photosynthesis 光合作用加快","More reactant."),
 ]),
 "summary":mk_summary([("Plants make glucose using light energy.","植物利用光能製造葡萄糖。"),("CO₂ + H₂O → glucose + O₂ in chloroplasts.","葉綠體內 CO₂ + H₂O → 葡萄糖 + O₂。"),("Chlorophyll absorbs light.","葉綠素吸收光能。"),("Light and CO₂ affect the rate.","光和二氧化碳影響速率。")]),
 "review":mk_review([
  ("Photosynthesis occurs in…","光合作用發生在…",["Chloroplasts 葉綠體","Mitochondria 粒線體","Nucleus 細胞核"],"Chloroplasts 葉綠體"),
  ("Gas absorbed?","吸收的氣體？",["CO₂","O₂","N₂"],"CO₂"),
  ("Gas released?","釋放的氣體？",["O₂","CO₂","H₂"],"O₂"),
  ("Green pigment?","綠色色素？",["Chlorophyll 葉綠素","Haemoglobin 血紅素","Melanin 黑色素"],"Chlorophyll 葉綠素"),
  ("Energy source?","能量來源？",["Light 光","Heat only 只有熱","Sound 聲"],"Light 光"),
 ])},
{"folder":"02_Respiration","appId":"s2_respiration","titleEn":"Respiration Runner","titleZh":"呼吸作用","unit":"Form 2 · Living Things & Air","accent":"#dc2626","experiment":"respiration",
 "learn":mk_learn([
  ("Cellular respiration","細胞呼吸","Glucose is broken down to release energy (ATP) in mitochondria.","葡萄糖在粒線體分解以釋放能量（ATP）。","Main purpose?","主要目的？",["Release energy 釋放能量","Make glucose 製造葡萄糖","Absorb light 吸收光"],"Release energy 釋放能量","Opposite of photosynthesis."),
  ("Aerobic equation","有氧方程式","Glucose + oxygen → CO₂ + water (+ energy).","葡萄糖 + 氧 → 二氧化碳 + 水（+ 能量）。","O₂ needed?","需要氧氣嗎？",["Yes for aerobic 有氧需要","Never 從不","Only plants 只有植物"],"Yes for aerobic 有氧需要","Most efficient."),
  ("ATP","ATP","ATP is the energy currency used by cells for work.","ATP 是細胞工作用的能量貨幣。","Stored in…","儲存於…",["Cells use it immediately 細胞即用","Rocks 岩石","Air 空氣"],"Cells use it immediately 細胞即用","Short-term store."),
  ("Comparison","與光合作用比較","Photosynthesis stores energy; respiration releases it.","光合作用儲能；呼吸作用釋能。","Both involve…","兩者都涉及…",["Glucose 葡萄糖","Only metals 只有金屬","Only light 只有光"],"Glucose 葡萄糖","Carbon cycle link."),
  ("Anaerobic","無氧呼吸","Without enough O₂, incomplete breakdown produces less ATP.","氧氣不足時，不完全分解產生較少 ATP。","Example product in muscles…","肌肉中產物例子…",["Lactic acid 乳酸","O₂","Glucose only"],"Lactic acid 乳酸","Causes fatigue."),
  ("Lab","實驗","Adjust glucose and oxygen to model ATP yield.","調節葡萄糖和氧氣模擬 ATP 產量。","Mitochondria role?","粒線體作用？",["Respiration 呼吸","Photosynthesis 光合","Digestion 消化"],"Respiration 呼吸","Powerhouse."),
 ]),
 "guided":mk_guided([
  ("Respiration releases…","呼吸作用釋放…",["Energy (ATP) 能量","Only O₂","Only water"],"Energy (ATP) 能量","Why cells need food."),
  ("Aerobic needs…","有氧呼吸需要…",["O₂","Only CO₂","Light"],"O₂","From lungs."),
  ("CO₂ is a…","二氧化碳是…",["Waste product 廢物","Fuel 燃料","Enzyme 酶"],"Waste product 廢物","Exhaled."),
  ("Where in cell?","在細胞哪裡？",["Mitochondria 粒線體","Chloroplast 葉綠體","Wall 壁"],"Mitochondria 粒線體","Organelle."),
 ]),
 "summary":mk_summary([("Respiration releases energy from glucose.","呼吸作用從葡萄糖釋放能量。"),("Aerobic: glucose + O₂ → CO₂ + H₂O + ATP.","有氧：葡萄糖 + O₂ → CO₂ + H₂O + ATP。"),("Occurs in mitochondria.","發生在粒線體。"),("Opposite process to photosynthesis.","與光合作用相反。")]),
 "review":mk_review([
  ("Energy currency?","能量貨幣？",["ATP","DNA","pH"],"ATP"),
  ("Gas used in aerobic?","有氧呼吸用？",["O₂","N₂","He"],"O₂"),
  ("Gas produced?","產生氣體？",["CO₂","O₂ only","None"],"CO₂"),
  ("Organelle?","細胞器？",["Mitochondria 粒線體","Nucleus 核","Ribosome 核糖體"],"Mitochondria 粒線體"),
  ("Without O₂ →","無氧時→",["Less ATP 較少ATP","More ATP","No change"],"Less ATP 較少ATP"),
 ])},
{"folder":"05_Lung_Health","appId":"s2_lung_health","titleEn":"Lung Health","titleZh":"肺部健康","unit":"Form 2 · Living Things & Air","accent":"#e11d48","experiment":"lung_health",
 "learn":mk_learn([
  ("Healthy lungs","健康肺部","Alveoli provide large surface area for gas exchange.","肺泡提供大面積進行氣體交換。","Gas exchange site?","氣體交換部位？",["Alveoli 肺泡","Trachea only 只有氣管","Stomach 胃"],"Alveoli 肺泡","Millions of tiny sacs."),
  ("Smoking damage","吸煙損害","Tar and chemicals damage alveoli and reduce elasticity.","焦油和化學物損害肺泡並降低彈性。","Main harmful substance…","主要有害物…",["Tar 焦油","O₂","N₂"],"Tar 焦油","Sticky deposit."),
  ("COPD link","慢性肺病","Long-term smoking can cause emphysema and bronchitis.","長期吸煙可致肺氣腫和支氣管炎。","Emphysema affects…","肺氣腫影響…",["Alveoli walls 肺泡壁","Bones 骨","Skin 皮"],"Alveoli walls 肺泡壁","Less surface area."),
  ("Prevention","預防","Avoid smoking and second-hand smoke protects lung capacity.","避免吸煙和二手煙保護肺活量。","Second-hand smoke…","二手煙…",["Also harmful 同樣有害","Harmless 無害","Helps lungs 有益"],"Also harmful 同樣有害","Passive smoking."),
  ("Exercise","運動","Regular exercise improves breathing efficiency.","規律運動改善呼吸效率。","During exercise you need…","運動時需要…",["More O₂ 更多氧","Less air 更少空氣","No change"],"More O₂ 更多氧","Higher breathing rate."),
  ("Lab","實驗","Model how smoking years reduce lung capacity.","模擬吸煙年數如何降低肺活量。","Healthy habit?","健康習慣？",["No smoking 不吸煙","More tar 更多焦油","Hold breath 憋氣"],"No smoking 不吸煙","Protect alveoli."),
 ]),
 "guided":mk_guided([
  ("Gas exchange in…","氣體交換於…",["Alveoli 肺泡","Oesophagus 食道","Heart only"],"Alveoli 肺泡","Thin walls."),
  ("Smoking reduces…","吸煙降低…",["Lung capacity 肺活量","Bone mass only","Hair growth"],"Lung capacity 肺活量","Damaged alveoli."),
  ("Tar is…","焦油是…",["Harmful deposit 有害沉積","Nutrient 營養","Vitamin 維生素"],"Harmful deposit 有害沉積","From smoke."),
  ("Best prevention?","最佳預防？",["Don't smoke 不吸煙","Smoke more 多吸","Ignore"],"Don't smoke 不吸煙","Public health."),
 ]),
 "summary":mk_summary([("Alveoli enable gas exchange.","肺泡進行氣體交換。"),("Smoking damages lungs and reduces capacity.","吸煙損害肺部並降低肺活量。"),("Tar is a major harmful component.","焦油是主要有害成分。"),("Avoid tobacco for healthy breathing.","避免煙草以保持健康呼吸。")]),
 "review":mk_review([
  ("Exchange surface?","交換表面？",["Alveoli 肺泡","Teeth 牙","Liver 肝"],"Alveoli 肺泡"),
  ("Smoking effect?","吸煙影響？",["↓ capacity ↓肺活量","↑ capacity","No effect"],"↓ capacity ↓肺活量"),
  ("Harmful in smoke?","煙中有害物？",["Tar 焦油","Pure O₂","Water only"],"Tar 焦油"),
  ("Exercise helps…","運動有助…",["Breathing 呼吸","Smoking 吸煙","Tar build-up"],"Breathing 呼吸"),
  ("Second-hand smoke?","二手煙？",["Harmful 有害","Safe 安全","Medicine 藥"],"Harmful 有害"),
 ])},
{"folder":"07_Circuit_Constructor","appId":"s2_circuit","titleEn":"Circuit Constructor","titleZh":"電路建造","unit":"Form 2 · Electricity","accent":"#f59e0b","experiment":"circuit",
 "learn":mk_learn([
  ("Complete circuit","完整電路","Current flows only in a closed loop from cell → components → back.","電流只在從電池→元件→回路的閉合迴路中流動。","Open switch means…","開路開關意味…",["No current 無電流","More current 更大電流","Explosion 爆炸"],"No current 無電流","Gap stops flow."),
  ("Series circuit","串聯電路","One path — if one part breaks, whole circuit stops.","單一路徑——一處斷開全路停止。","Two switches in series…","兩開關串聯…",["Both must close 都須閉合","Either one 任一個","Neither 都不"],"Both must close 都須閉合","Same current path."),
  ("Symbols","符號","Use standard symbols: cell, bulb, switch, wire.","使用標準符號：電池、燈泡、開關、導線。","Bulb symbol?","燈泡符號？",["Circle with cross 圓加叉","Triangle 三角","Square 方"],"Circle with cross 圓加叉","Circuit diagrams."),
  ("Current","電流","Measured in amperes (A); flows from + to − through conductors.","以安培(A)量度；經導體由正到負流動。","Unit?","單位？",["Ampere (A) 安培","Volt (V) 伏","Ohm (Ω) 歐"],"Ampere (A) 安培","I in I=V/R."),
  ("Safety","安全","Never connect wires directly across cell terminals (short circuit).","切勿將導線直接接在電池兩極（短路）。","Short circuit…","短路…",["Dangerous — high current 危險—大電流","Makes bulb brighter only","No effect"],"Dangerous — high current 危險—大電流","Wire heats up."),
  ("Lab","實驗","Close both switches to light the bulb in series.","閉合兩開關以點亮串聯燈泡。","Series = … path","串聯 = … 路徑",["One 一條","Many parallel 多條並聯","No path 無"],"One 一條","Single loop."),
 ]),
 "guided":mk_guided([
  ("Current needs…","電流需要…",["Closed loop 閉合迴路","Open gap 開路","Only bulb"],"Closed loop 閉合迴路","Complete circuit."),
  ("Series switches both ON…","串聯兩開關都開…",["Bulb lights 燈亮","Always off 總滅","Explodes"],"Bulb lights 燈亮","All connected."),
  ("Short circuit is…","短路是…",["Dangerous 危險","Required 必需","Harmless 無害"],"Dangerous 危險","Very high I."),
  ("Current unit?","電流單位？",["A 安培","V 伏","Ω 歐"],"A 安培","Amperes."),
 ]),
 "summary":mk_summary([("Current flows in closed circuits only.","電流只在閉合電路中流動。"),("Series = one path for current.","串聯 = 電流單一路徑。"),("Never create a short circuit.","切勿造成短路。"),("Use standard circuit symbols.","使用標準電路符號。")]),
 "review":mk_review([
  ("Open circuit →","開路→",["No current 無電流","Max current","Double voltage"],"No current 無電流"),
  ("Series path count?","串聯路徑數？",["1","2","Unlimited"],"1"),
  ("Dangerous connection?","危險接法？",["Short circuit 短路","One bulb 一燈","Switch open 開關開"],"Short circuit 短路"),
  ("Current symbol?","電流符號？",["I","V","R"],"I"),
  ("Both switches series ON?","串聯兩開關閉合？",["Bulb on 燈亮","Bulb off","Battery breaks"],"Bulb on 燈亮"),
 ])},
{"folder":"10_Electromagnet","appId":"s2_electromagnet","titleEn":"Electromagnet","titleZh":"電磁鐵","unit":"Form 2 · Electricity","accent":"#d97706","experiment":"electromagnet",
 "learn":mk_learn([
  ("Electromagnet","電磁鐵","A coil of wire around iron core becomes magnet when current flows.","電流通過時，纏在鐵芯上的線圈成為磁鐵。","Needs…","需要…",["Electric current 電流","Only wood 只有木","Permanent magnet only"],"Electric current 電流","Temporary magnet."),
  ("Strength factors","強度因素","More coil turns and higher current increase magnetic strength.","更多匝數和更大電流增強磁力。","More turns…","更多匝數…",["Stronger field 更強磁場","Weaker 更弱","No change"],"Stronger field 更強磁場","More field lines."),
  ("Uses","用途","Used in scrap yards, relays, doorbells and MRI machines.","用於廢料場、繼電器、門鈴和磁力共振。","Temporary advantage?","暫時性優點？",["Can switch off 可關閉","Always on 常開","No wire needed"],"Can switch off 可關閉","Control with current."),
  ("Core material","鐵芯","Soft iron core strengthens field and loses magnetism when current stops.","軟鐵芯增強磁場，斷電後失去磁性。","Best core?","最佳鐵芯？",["Soft iron 軟鐵","Plastic 塑膠","Rubber 橡膠"],"Soft iron 軟鐵","Easily magnetised."),
  ("Safety","安全","Large currents can heat the coil — don't leave on too long.","大電流可使線圈發熱——不宜長開。","Heat from…","熱來自…",["Resistance in wire 導線電阻","Cold only 只有冷","Magnetism alone"],"Resistance in wire 導線電阻","I²R heating."),
  ("Lab","實驗","Adjust turns and current to pick up paperclips.","調節匝數和電流吸起回形針。","Switch off current…","斷電後…",["Magnetism lost 磁性消失","Stronger forever","Explodes"],"Magnetism lost 磁性消失","Temporary."),
 ]),
 "guided":mk_guided([
  ("Electromagnet needs…","電磁鐵需要…",["Current in coil 線圈電流","Only permanent magnet","No core"],"Current in coil 線圈電流","Electromagnetism."),
  ("More turns →","更多匝數→",["Stronger 更強","Weaker 更弱","Same"],"Stronger 更強","Field adds up."),
  ("Soft iron core…","軟鐵芯…",["Increases strength 增強","Blocks field 阻擋","Melts wire"],"Increases strength 增強","Magnetic material."),
  ("When current off…","斷電後…",["Magnetism off 磁性消失","Permanent 永久","Doubles strength"],"Magnetism off 磁性消失","Temporary."),
 ]),
 "summary":mk_summary([("Coil + iron + current = electromagnet.","線圈 + 鐵芯 + 電流 = 電磁鐵。"),("More turns and current → stronger.","更多匝數和電流 → 更強。"),("Temporary — off when current stops.","暫時性——斷電即消磁。"),("Used in relays, cranes, doorbells.","用於繼電器、起重機、門鈴。")]),
 "review":mk_review([
  ("Needs what to work?","工作需要？",["Electric current 電流","Only wood","Sunlight"],"Electric current 電流"),
  ("Stronger with…","更強當…",["More turns 更多匝","Fewer turns","Open circuit"],"More turns 更多匝"),
  ("Core material?","鐵芯材料？",["Soft iron 軟鐵","Glass 玻璃","Paper 紙"],"Soft iron 軟鐵"),
  ("Type of magnet?","磁鐵類型？",["Temporary 暫時","Permanent only 只有永久","None"],"Temporary 暫時"),
  ("Application?","應用？",["Scrap crane 廢料起重","Photosynthesis","pH test"],"Scrap crane 廢料起重"),
 ])},
{"folder":"11_Domestic_Bill","appId":"s2_domestic_bill","titleEn":"Domestic Bill","titleZh":"家用電費","unit":"Form 2 · Electricity","accent":"#ea580c","experiment":"domestic_bill",
 "learn":mk_learn([
  ("Electrical energy","電能","Energy (kWh) = power (kW) × time (hours).","電能(kWh) = 功率(kW) × 時間(小時)。","Unit on bill?","帳單單位？",["kWh 千瓦時","N 牛頓","Pa 帕"],"kWh 千瓦時","Kilowatt-hour."),
  ("Power rating","功率","Appliances show power in watts (W) on the label.","電器標籤顯示功率（瓦）。","1000 W =","1000 W =",["1 kW 千瓦","1 kWh","1 A"],"1 kW 千瓦","÷1000."),
  ("Cost","費用","Bill = energy (kWh) × price per kWh.","電費 = 電能(kWh) × 每度電價。","To save money…","省錢應…",["Use less time/power 減少時間/功率","Leave all on 全開","Short circuit"],"Use less time/power 減少時間/功率","Efficiency matters."),
  ("Efficiency","效率","LED bulbs use less power for same light vs filament bulbs.","LED 燈同等亮度比白熾燈省電。","LED vs filament…","LED 對白熾燈…",["LED uses less power LED較省電","Filament always better","Same always"],"LED uses less power LED較省電","Less wasted heat."),
  ("Standby","待機","Devices on standby still consume small power.","待機裝置仍消耗少量電力。","Best practice?","最佳做法？",["Switch off at wall 關牆掣","Always standby","Open circuit"],"Switch off at wall 關牆掣","Phantom load."),
  ("Lab","實驗","Calculate monthly kWh and HK$ cost.","計算每月千瓦時和港幣費用。","kWh formula?","kWh 公式？",["P(kW)×t(h)","P×R","V/I"],"P(kW)×t(h)","Energy."),
 ]),
 "guided":mk_guided([
  ("Bill unit?","帳單單位？",["kWh","W only","V"],"kWh","Energy not power."),
  ("1000 W equals…","1000 W 等於…",["1 kW","1 kWh","10 A"],"1 kW","Power conversion."),
  ("Higher power appliance…","高功率電器…",["Costs more if used same time 同時間更貴","Always free","No energy"],"Costs more if used same time 同時間更貴","E=P×t."),
  ("Save energy by…","省電方法…",["Shorter use / efficient devices 減時/高效","Leave on 24h","Short circuit"],"Shorter use / efficient devices 減時/高效","Habits."),
 ]),
 "summary":mk_summary([("Energy = power × time (kWh).","電能 = 功率 × 時間(kWh)。"),("Appliance power in watts.","電器功率以瓦計。"),("Bill = kWh × unit price.","電費 = kWh × 單價。"),("LED and switching off save money.","LED 和關機省錢。")]),
 "review":mk_review([
  ("Energy unit?","電能單位？",["kWh","W","A"],"kWh"),
  ("1 kW =","1 kW =",["1000 W","100 W","1 W"],"1000 W"),
  ("Cost depends on…","費用取決於…",["kWh used 用電量","Colour only","Length of wire"],"kWh used 用電量"),
  ("LED is…","LED 是…",["More efficient 更高效","Always worse","Same as heater"],"More efficient 更高效"),
  ("Standby power…","待機電力…",["Still uses some 仍耗電","Zero always","Creates O₂"],"Still uses some 仍耗電"),
 ])},
]

# Append remaining apps in second batch via exec of string - add more to APPS list
exec(open(os.path.join(os.path.dirname(__file__), "f2-lger-apps-b.py"), encoding="utf-8").read())

def main():
    count = 0
    for cfg in APPS:
        if cfg["folder"] in SKIP:
            continue
        out = os.path.join(BASE, cfg["folder"], "index.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            f.write(generate_app(cfg))
        count += 1
        print("OK", cfg["folder"])
    print("TOTAL", count)

if __name__ == "__main__":
    main()
