#!/usr/bin/env python3
"""Fix P0: stub GUIDED/EXAM drills + Biology Vite shell refs."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DRILLS: dict[str, tuple[str, str]] = {}

def _guided(items: list[str]) -> str:
    return "    const GUIDED = [\n" + ",\n".join(items) + "\n    ];"

def _exam(items: list[str]) -> str:
    return "    const EXAM = [\n" + ",\n".join(items) + "\n    ];"

def q(
    id_: str,
    level: int,
    en: str,
    zh: str,
    opts: list[str],
    ans: str,
    hint: str,
) -> str:
    opts_js = ", ".join(f'"{o}"' for o in opts)
    return (
        f'      {{ id: "{id_}", level: {level}, q: "{en}", qZh: "{zh}",\n'
        f"        opts: [{opts_js}], a: \"{ans}\",\n"
        f'        hint: "{hint}" }}'
    )

# --- Biology F4 Cardiac Cycle ---
DRILLS["Secondary_School/Biology/Form 4/10_Cardiac_Cycle"] = (
    _guided([
        q("g1", 1, "Which side of the heart pumps blood to the lungs?", "心臟哪一側將血液泵至肺部？",
          ["Right ventricle 右心室", "Left ventricle 左心室", "Right atrium 右心房", "Aorta 主動脈"],
          "Right ventricle 右心室", "Pulmonary circulation starts from the right ventricle. 肺循環由右心室開始。"),
        q("g2", 1, "During ventricular systole, the atrioventricular (AV) valves are…", "心室收縮時，房室瓣…",
          ["Closed 關閉", "Open 開啟", "Removed 移除", "Always open 一直開啟"],
          "Closed 關閉", "AV valves close to stop backflow into atria. 防止血液倒流回心房。"),
        q("g3", 1, "The semilunar valves open during…", "半月瓣在…時開啟",
          ["Ventricular systole 心室收縮", "Atrial systole 心房收縮", "Diastole only 僅舒張期", "Never 從不"],
          "Ventricular systole 心室收縮", "Blood is forced into arteries when ventricles contract. 心室收縮將血泵入動脈。"),
        q("g4", 2, "Oxygenated blood returns to the heart via…", "含氧血經…返回心臟",
          ["Pulmonary vein 肺靜脈", "Pulmonary artery 肺動脈", "Vena cava 腔靜脈", "Coronary artery 冠狀動脈"],
          "Pulmonary vein 肺靜脈", "Veins carry blood TO the heart; pulmonary vein is oxygenated. 靜脈回心；肺靜脈含氧。"),
        q("g5", 2, "In the Learn panel, atria contract before ventricles to…", "學習區中，心房先於心室收縮是為了…",
          ["Fill ventricles before pumping 先充盈心室再泵血", "Stop blood flow 阻止血流", "Close semilunar valves 關閉半月瓣", "Reduce heart rate 降低心率"],
          "Fill ventricles before pumping 先充盈心室再泵血", "Atrial systole tops up ventricular volume. 心房收縮補充心室血量。"),
        q("g6", 2, "Double circulation means…", "雙循環指…",
          ["Blood passes through the heart twice per circuit 血液每循環一周經過心臟兩次", "Two hearts in series 兩個心臟串聯", "Only one loop 只有一個循環", "No lungs involved 不涉及肺"],
          "Blood passes through the heart twice per circuit 血液每循環一周經過心臟兩次", "Pulmonary + systemic circuits. 肺循環與體循環。"),
    ]),
    _exam([
        q("e1", 3, "Which vessel carries deoxygenated blood away from the heart?", "哪條血管將缺氧血帶離心臟？",
          ["Pulmonary artery 肺動脈", "Pulmonary vein 肺靜脈", "Aorta 主動脈", "Hepatic vein 肝靜脈"],
          "Pulmonary artery 肺動脈", "Artery from right ventricle to lungs. 右心室至肺的動脈。"),
        q("e2", 3, "During diastole, blood flows into the ventricles mainly because…", "舒張期血液進入心室主要因為…",
          ["Atria and ventricles relax; pressure falls 心房心室舒張，壓力下降", "Semilunar valves open 半月瓣開啟", "Ventricles contract 心室收縮", "AV valves close 房室瓣關閉"],
          "Atria and ventricles relax; pressure falls 心房心室舒張，壓力下降", "Low pressure draws blood in. 壓力低使血液流入。"),
        q("e3", 3, "The left ventricle has thicker muscle than the right because…", "左心室肌壁較右心室厚，因為…",
          ["It pumps blood to the whole body at high pressure 需將血泵至全身高壓", "It receives more blood 接收更多血液", "It has more valves 有更多瓣膜", "It is larger in volume only 只是容積較大"],
          "It pumps blood to the whole body at high pressure 需將血泵至全身高壓", "Systemic circulation needs greater force. 體循環需要更大壓力。"),
        q("e4", 4, "If semilunar valves failed to close, you would expect…", "若半月瓣無法關閉，預期會…",
          ["Backflow into ventricles during diastole 舒張期血液倒流回心室", "No blood to lungs 無血至肺", "Faster heart rate only 只是心率加快", "AV valves stay open 房室瓣一直開"],
          "Backflow into ventricles during diastole 舒張期血液倒流回心室", "Semilunar valves prevent arterial backflow. 半月瓣防止動脈血倒流。"),
        q("e5", 4, "Coronary arteries supply…", "冠狀動脈供應…",
          ["Heart muscle (cardiac muscle) 心肌", "Lung tissue 肺組織", "Brain only 只有腦", "Kidneys 腎臟"],
          "Heart muscle (cardiac muscle) 心肌", "Heart needs its own blood supply. 心臟自身需要血液供應。"),
        q("e6", 4, "In one complete cardiac cycle, the correct order is…", "一個完整心動周期正確順序是…",
          ["Diastole → atrial systole → ventricular systole 舒張→心房收縮→心室收縮", "Ventricular systole → diastole → atrial systole", "Atrial systole → diastole only", "Semilunar open → AV open"],
          "Diastole → atrial systole → ventricular systole 舒張→心房收縮→心室收縮", "Fill, atrial push, ventricular pump. 充盈、心房推、心室泵。"),
    ]),
)

# --- Biology F4 Osmosis ---
DRILLS["Secondary_School/Biology/Form 4/12_Osmosis_Sandbox"] = (
    _guided([
        q("g1", 1, "Osmosis is the net movement of…", "滲透作用是…的淨移動",
          ["Water across a partially permeable membrane 水穿過半透膜", "Solute only 只有溶質", "Ions against gradient 離子逆梯度", "Air molecules 空氣分子"],
          "Water across a partially permeable membrane 水穿過半透膜", "Osmosis = water only, down water potential gradient. 滲透只涉及水，沿水勢梯度。"),
        q("g2", 1, "In the sandbox, high external solute means…", "沙盒中外部溶質高意味…",
          ["Lower water potential outside 外部水勢較低", "Higher water potential outside 外部水勢較高", "No osmosis 無滲透", "Water enters cell always 水一定入細胞"],
          "Lower water potential outside 外部水勢較低", "Solute lowers water potential. 溶質降低水勢。"),
        q("g3", 1, "Water moves from…", "水從…移動",
          ["Higher to lower water potential 高水勢至低水勢", "Lower to higher water potential 低至高水勢", "Only with ATP 只有需 ATP", "Solute to solvent 溶質至溶劑"],
          "Higher to lower water potential 高水勢至低水勢", "Passive movement of water. 水被動移動。"),
        q("g4", 2, "A plant cell in very salty soil may become plasmolysed because…", "植物細胞在鹹土中可能質壁分離，因為…",
          ["Water leaves by osmosis 水因滲透離開", "Salt enters by diffusion 鹽因擴散進入", "Cell wall dissolves 細胞壁溶解", "Active transport of water 水的主動運輸"],
          "Water leaves by osmosis 水因滲透離開", "External ψ lower than cell ψ. 外部水勢低於細胞。"),
        q("g5", 2, "Near equilibrium in the model (external solute ≈ internal)…", "模型中接近平衡（內外溶質相近）時…",
          ["Little net water movement 淨水移動很少", "Cell always bursts 細胞一定破裂", "Only active transport 只有主動運輸", "Water moves only out 水只流出"],
          "Little net water movement 淨水移動很少", "Similar ψ → balanced osmosis. 水勢相近則平衡。"),
        q("g6", 2, "Which increases turgor pressure in a plant cell?", "哪項增加植物細胞膨壓？",
          ["Water entering the vacuole by osmosis 水滲透入液泡", "Water leaving the cell 水離開細胞", "Plasmolysis 質壁分離", "High external salt 外部高鹽"],
          "Water entering the vacuole by osmosis 水滲透入液泡", "Turgid cell = water in, vacuole swells. 充盈細胞水分進入。"),
    ]),
    _exam([
        q("e1", 3, "Red blood cells in distilled water swell and burst because…", "紅血球在蒸餾水中膨脹破裂，因為…",
          ["Water enters by osmosis; no cell wall 水滲透進入；無細胞壁", "Salt leaves the cell 鹽離開細胞", "Active transport of water 水的主動運輸", "Membrane dissolves 膜溶解"],
          "Water enters by osmosis; no cell wall 水滲透進入；無細胞壁", "Hypotonic solution → lysis. 低滲溶液→溶血。"),
        q("e2", 3, "Adding solute to a solution generally…", "向溶液加溶質通常…",
          ["Lowers water potential 降低水勢", "Raises water potential 提高水勢", "Stops osmosis forever 永久停止滲透", "Only affects ions 只影響離子"],
          "Lowers water potential 降低水勢", "More solute = less free water. 溶質多=自由水少。"),
        q("e3", 3, "Root hairs absorb water from moist soil by…", "根毛從濕潤土壤吸收水靠…",
          ["Osmosis 滲透作用", "Active transport of water 水的主動運輸", "Diffusion of soil particles 土壤粒子擴散", "Transpiration pull only 只靠蒸騰拉力"],
          "Osmosis 滲透作用", "Soil water ψ > root cell ψ. 土壤水勢較高。"),
        q("e4", 4, "A cell is placed in solution X and neither gains nor loses mass. Solution X is…", "細胞置於溶液 X 後質量不變。溶液 X 是…",
          ["Isotonic to the cell 與細胞等滲", "Always distilled water 一定是蒸餾水", "Hypertonic only 一定是高滲", "Hypotonic only 一定是低滲"],
          "Isotonic to the cell 與細胞等滲", "No net osmosis at equal ψ. 水勢相等無淨滲透。"),
        q("e5", 4, "Why can't starch pass through the cell membrane during osmosis experiments?", "為何澱粉不能穿過細胞膜？",
          ["Too large; membrane partially permeable 太大；膜為半透性", "Starch is water 澱粉是水", "Starch moves by osmosis 澱粉靠滲透移動", "Temperature too low 溫度太低"],
          "Too large; membrane partially permeable 太大；膜為半透性", "Size and polarity matter. 分子大小與性質重要。"),
        q("e6", 4, "Increasing temperature slightly may speed osmosis because…", "略升溫可能加快滲透，因為…",
          ["Water molecules move faster 水分子運動加快", "Water potential always rises 水勢一定上升", "Membrane disappears 膜消失", "Solute becomes water 溶質變水"],
          "Water molecules move faster 水分子運動加快", "Kinetic energy affects diffusion rate. 動能影響擴散速率。"),
    ]),
)

# --- Biology F5 Genetics ---
DRILLS["Secondary_School/Biology/Form 5/04_Genetics_Punnett"] = (
    _guided([
        q("g1", 1, "In a monohybrid cross Aa × Aa, the expected phenotypic ratio (complete dominance) is…", "單因子雜交 Aa×Aa，完全顯性表型比為…",
          ["3 dominant : 1 recessive 3 顯性 : 1 隱性", "1 : 1 : 1 : 1", "All heterozygous 全雜合", "9 : 3 : 3 : 1"],
          "3 dominant : 1 recessive 3 顯性 : 1 隱性", "Punnett: 1 AA, 2 Aa, 1 aa → 3:1 if A dominant. 龐氏方格推得。"),
        q("g2", 1, "Genotype AA × aa gives offspring that are…", "基因型 AA×aa 後代為…",
          ["All Aa (heterozygous) 全為 Aa", "All AA", "Half aa", "3:1 ratio"],
          "All Aa (heterozygous) 全為 Aa", "One allele from each parent. 各親本提供一個等位基因。"),
        q("g3", 1, "A recessive phenotype appears only when genotype is…", "隱性表型只在基因型為…時出現",
          ["Homozygous recessive (aa) 隱性純合 aa", "Heterozygous Aa 雜合 Aa", "Homozygous dominant AA", "Any with one A"],
          "Homozygous recessive (aa) 隱性純合 aa", "Recessive allele masked by dominant. 隱性被顯性掩蓋。"),
        q("g4", 2, "Cross Aa × aa gives phenotypic ratio…", "雜交 Aa×aa 表型比為…",
          ["1 : 1 (dominant : recessive) 1:1", "3 : 1", "All dominant 全顯性", "9 : 3 : 3 : 1"],
          "1 : 1 (dominant : recessive) 1:1", "Half Aa, half aa. 一半雜合一半隱性純合。"),
        q("g5", 2, "An allele is…", "等位基因是…",
          ["A version of a gene at a locus 基因座上的基因變體", "A whole chromosome 整條染色體", "A protein product only 只是蛋白質", "Always dominant 一定是顯性"],
          "A version of a gene at a locus 基因座上的基因變體", "e.g. A and a for one gene. 同一基因的不同形式。"),
        q("g6", 2, "Punnett squares predict…", "龐氏方格預測…",
          ["Probable offspring genotypes/phenotypes 可能後代基因型/表型", "Exact order of birth 確切出生順序", "Mutation rates 突變率", "DNA replication speed 複製速度"],
          "Probable offspring genotypes/phenotypes 可能後代基因型/表型", "Probability from gamete combinations. 配子組合概率。"),
    ]),
    _exam([
        q("e1", 3, "Two heterozygous parents (Bb × Bb). Probability of homozygous recessive offspring?", "兩雜合親本 Bb×Bb，隱性純合後代概率？",
          ["1/4", "1/2", "3/4", "0"],
          "1/4", "Punnett: 1 BB, 2 Bb, 1 bb. 四種組合之一。"),
        q("e2", 3, "Carrier of a recessive disorder is typically…", "隱性遺傳病帶因者通常為…",
          ["Heterozygous (Aa) 雜合 Aa", "Homozygous recessive aa", "Homozygous dominant only", "No genotype"],
          "Heterozygous (Aa) 雜合 Aa", "Shows dominant phenotype but carries a. 表型正常但帶 a。"),
        q("e3", 3, "Which cross can NEVER produce a homozygous recessive child if both parents show dominant phenotype?", "兩親本均顯性表型，哪種雜交絕不能產生隱性純合子？",
          ["AA × AA", "Aa × Aa", "Aa × aa", "Aa × AA"],
          "AA × AA", "No a allele to pass on. 無 a 可遺傳。"),
        q("e4", 4, "In codominance (e.g. AB blood), heterozygote shows…", "共顯性（如 AB 血型）雜合子表現…",
          ["Both alleles expressed 兩等位基因均表達", "Only dominant 只顯性", "Only recessive 只隱性", "Blended intermediate always 總是中間"],
          "Both alleles expressed 兩等位基因均表達", "Neither masks the other. 互不掩蓋。"),
        q("e5", 4, "Sex-linked recessive traits (e.g. haemophilia) more often affect males because…", "性聯隱性（如血友病）較多影響男性，因為…",
          ["Males have one X; one recessive allele shows 男性一條 X；一個隱性即表現", "Y chromosome carries the disease Y 帶病", "Females have no X 女性無 X", "Males are heterozygous always"],
          "Males have one X; one recessive allele shows 男性一條 X；一個隱性即表現", "XY: no second X to mask. 無第二 X 掩蓋。"),
        q("e6", 4, "A test cross identifies unknown genotype by crossing with…", "測交以…確定未知基因型",
          ["Homozygous recessive 隱性純合子", "Homozygous dominant 顯性純合", "Another unknown 另一未知", "Haploid only 只單倍體"],
          "Homozygous recessive 隱性純合子", "Recessive partner reveals hidden alleles. 隱性親本顯露隱藏等位基因。"),
    ]),
)

# --- Biology F5 Energy Flow ---
DRILLS["Secondary_School/Biology/Form 5/10_Energy_Flow"] = (
    _guided([
        q("g1", 1, "The ultimate source of energy for most ecosystems is…", "大多數生態系統能量的終極來源是…",
          ["Sunlight 陽光", "Decomposers 分解者", "Rocks 岩石", "Consumers only 只有消費者"],
          "Sunlight 陽光", "Producers capture light → chemical energy. 生產者固定光能。"),
        q("g2", 1, "Roughly what % of energy passes to the next trophic level?", "約多少能量傳至下一營養級？",
          ["~10% 約 10%", "~90%", "~50%", "100%"],
          "~10% 約 10%", "Most lost as heat, movement, waste. 大部分以熱、活動、廢物形式流失。"),
        q("g3", 1, "Producers in the Learn model are at trophic level…", "學習模型中生產者位於營養級…",
          ["1 第一級", "2", "4 only", "0"],
          "1 第一級", "Plants/algae = first level. 植物/藻類為第一級。"),
        q("g4", 2, "Why are food chains usually short (3–5 levels)?", "為何食物鏈通常很短（3–5 級）？",
          ["Insufficient energy left at higher levels 高級能量不足", "Predators are rare only 捕食者少", "Producers die young 生產者早死", "Decomposers block energy 分解者阻擋"],
          "Insufficient energy left at higher levels 高級能量不足", "Energy loss limits chain length. 能量流失限制鏈長。"),
        q("g5", 2, "Energy lost between trophic levels is mainly…", "營養級間流失的能量主要為…",
          ["Heat from respiration and not eaten parts 呼吸熱及未食部分", "Stored forever in bones 永久存於骨", "Converted to sunlight 變回陽光", "Only in decomposers 只在分解者"],
          "Heat from respiration and not eaten parts 呼吸熱及未食部分", "2nd law + incomplete transfer. 呼吸散熱、未完全傳遞。"),
        q("g6", 2, "A pyramid of energy is always upright because…", "能量金字塔總是正向，因為…",
          ["Energy decreases at each level 每級能量遞減", "Biomass always increases 生物量總增加", "Numbers always rise 數量總上升", "Producers are smallest 生產者最小"],
          "Energy decreases at each level 每級能量遞減", "Less energy available above. 上级可用能量較少。"),
    ]),
    _exam([
        q("e1", 3, "10,000 J of sunlight fixed by plants. About how much reaches primary consumers?", "植物固定 10000 J 陽光，約多少至初級消費者？",
          ["~1,000 J 約 1000 J", "~10,000 J", "~100 J", "~5,000 J"],
          "~1,000 J 約 1000 J", "Apply ~10% rule per transfer. 每級約 10%。"),
        q("e2", 3, "Which process returns nutrients (not energy) to the soil?", "哪過程將營養（非能量）還原至土壤？",
          ["Decomposition 分解作用", "Photosynthesis 光合作用", "Predation only 只有捕食", "Transpiration 蒸騰"],
          "Decomposition 分解作用", "Decomposers mineralise organic matter. 分解者礦化有機物。"),
        q("e3", 3, "Why can't energy be recycled in an ecosystem?", "為何能量不能在生態系統中循環？",
          ["It is dissipated as heat 以熱形式散失", "Producers destroy it 生產者破壞", "Consumers store all 消費者全儲存", "Laws of chemistry forbid 化學定律禁止"],
          "It is dissipated as heat 以熱形式散失", "Energy flows one way; nutrients cycle. 能量單向流；物質循環。"),
        q("e4", 4, "If pesticides bioaccumulate at top predators, energy at that level is…", "若殺蟲劑在頂級捕食者生物累積，該級能量…",
          ["Still limited by transfer efficiency 仍受傳遞效率限制", "Unlimited 無限", "Equal to producers 與生產者相等", "Zero always 必為零"],
          "Still limited by transfer efficiency 仍受傳遞效率限制", "Toxins ≠ extra energy. 毒素不增加能量。"),
        q("e5", 4, "Gross primary production minus respiration equals…", "總初級生產量減呼吸等於…",
          ["Net primary production 淨初級生產量", "Biomass of consumers 消費者生物量", "Decomposer energy only", "Solar input 太陽輸入"],
          "Net primary production 淨初級生產量", "NPP = energy available to herbivores. 可供植食動物利用。"),
        q("e6", 4, "Humans eating both plants and meat sit at…", "人類既吃植物又吃肉位於…",
          ["Multiple trophic levels effectively 實際上多個營養級", "Only level 1 只在第一級", "Decomposer level 分解者級", "No trophic level 無營養級"],
          "Multiple trophic levels effectively 實際上多個營養級", "Omnivores span more than one link. 雜食跨多鏈。"),
    ]),
)

# --- Biology F5 Food Web ---
DRILLS["Secondary_School/Biology/Form 5/13_Ecology_Food_Web"] = (
    _guided([
        q("g1", 1, "In the Learn web, algae is a…", "學習網中藻類是…",
          ["Producer 生產者", "Primary consumer 初級消費者", "Decomposer 分解者", "Top predator 頂級捕食者"],
          "Producer 生產者", "Makes food by photosynthesis. 光合作用製造食物。"),
        q("g2", 1, "Shrimp eating algae is a…", "蝦吃藻類是…",
          ["Primary consumer 初級消費者", "Producer", "Decomposer", "Tertiary consumer"],
          "Primary consumer 初級消費者", "First animal level eats producers. 第一級動物吃生產者。"),
        q("g3", 1, "Bacteria in the model mainly act as…", "模型中細菌主要作為…",
          ["Decomposers 分解者", "Producers only", "Top predators", "Primary consumers"],
          "Decomposers 分解者", "Break down dead organic matter. 分解有機碎屑。"),
        q("g4", 2, "A food web differs from a food chain because…", "食物網與食物鏈不同在於…",
          ["Multiple feeding links interconnect 多種取食關係交織", "No energy transfer 無能量傳遞", "Only one species 只有一種生物", "No decomposers 無分解者"],
          "Multiple feeding links interconnect 多種取食關係交織", "Real ecosystems have complex diets. 真實生態系統飲食複雜。"),
        q("g5", 2, "Removing algae from the web would first harm…", "移除藻類首先損害…",
          ["Shrimp and other algae-eaters 蝦及其他食藻者", "Heron only 只有蒼鷺", "Bacteria only 只有細菌", "No organisms 無生物"],
          "Shrimp and other algae-eaters 蝦及其他食藻者", "Direct loss of food source. 直接失去食物來源。"),
        q("g6", 2, "Top predator (heron) is at trophic level…", "頂級捕食者（蒼鷺）在營養級…",
          ["Highest in this chain 此鏈最高", "1", "Same as algae 與藻類相同", "Below bacteria 低於細菌"],
          "Highest in this chain 此鏈最高", "Few or no predators above. 上方幾乎無捕食者。"),
    ]),
    _exam([
        q("e1", 3, "If fish eat shrimp and heron eats fish, fish are…", "若魚吃蝦、蒼鷺吃魚，魚是…",
          ["Secondary consumers 次級消費者", "Producers", "Decomposers", "Primary consumers"],
          "Secondary consumers 次級消費者", "Eat primary consumers. 吃初級消費者。"),
        q("e2", 3, "Keystone species removal may…", "移除關鍵物種可能…",
          ["Collapse community structure 使群落結構崩潰", "Increase all populations 使所有種群增加", "Stop photosynthesis globally 全球停止光合作用", "Eliminate decomposers only"],
          "Collapse community structure 使群落結構崩潰", "Disproportionate effect on web. 對食物網影響過大。"),
        q("e3", 3, "Energy in a food web flows…", "食物網中能量流動…",
          ["One way: producers → consumers → heat 單向：生產者→消費者→熱", "In circles 循環", "From consumers to Sun 從消費者至太陽", "Only between decomposers"],
          "One way: producers → consumers → heat 單向：生產者→消費者→熱", "Energy not recycled. 能量不循環。"),
        q("e4", 4, "Bioaccumulation of DDT in heron illustrates…", "蒼鷺體內 DDT 生物累積說明…",
          ["Toxins concentrate up trophic levels 毒素沿營養級濃縮", "Energy increases upward 能量向上增加", "Decomposers produce DDT", "Producers absorb no toxins"],
          "Toxins concentrate up trophic levels 毒素沿營養級濃縮", "Fat-soluble chemicals magnify at top. 脂溶性物質在頂級放大。"),
        q("e5", 4, "Which is abiotic in a pond ecosystem?", "池塘生態系統中哪項是非生物？",
          ["Dissolved oxygen 溶解氧", "Algae 藻類", "Fish 魚", "Bacteria 細菌"],
          "Dissolved oxygen 溶解氧", "Physical/chemical factor. 物理化學因子。"),
        q("e6", 4, "Stability of a food web often increases with…", "食物網穩定性常隨…增加",
          ["More diverse interconnections 更多樣的交織連結", "Single long chain only 只有單一長鏈", "One producer only 只有一種生產者", "Removing decomposers 移除分解者"],
          "More diverse interconnections 更多樣的交織連結", "Alternative food paths buffer change. 替代食物路徑緩衝變化。"),
    ]),
)

# --- Biology F6 Nephron ---
DRILLS["Secondary_School/Biology/Form 6/11_Nephron_Osmoregulation"] = (
    _guided([
        q("g1", 1, "Ultrafiltration occurs in the…", "超濾作用發生於…",
          ["Glomerulus / Bowman's capsule 腎小球/鮑氏囊", "Loop of Henle only 只有亨利氏環", "Ureter 輸尿管", "Bladder 膀胱"],
          "Glomerulus / Bowman's capsule 腎小球/鮑氏囊", "High pressure filters small solutes/water. 高壓濾出小分子與水。"),
        q("g2", 1, "ADH high in the model means…", "模型中 ADH 高意味…",
          ["More water reabsorption; concentrated urine 更多水重吸收；尿液濃縮", "Dilute urine only 只有稀尿", "Stop filtration 停止濾過", "No loop function 亨利氏環無功能"],
          "More water reabsorption; concentrated urine 更多水重吸收；尿液濃縮", "ADH increases collecting duct permeability. ADH 增加集合管透水性。"),
        q("g3", 1, "Glucose in filtrate is normally…", "濾液中的葡萄糖通常…",
          ["Fully reabsorbed in proximal tubule 在近曲小管完全重吸收", "Excreted in urine 隨尿排出", "Filtered only, never reabsorbed 只濾過不重吸收", "Converted to urea 變成尿素"],
          "Fully reabsorbed in proximal tubule 在近曲小管完全重吸收", "Carrier-mediated reabsorption. 載體介導重吸收。"),
        q("g4", 2, "Low ADH (model) suits…", "低 ADH（模型）適合…",
          ["Diluting urine when body has excess water 體內水分過多時稀釋尿液", "Dehydration only 只有脫水", "High salt diet only", "Stopping kidney function"],
          "Diluting urine when body has excess water 體內水分過多時稀釋尿液", "Less water reabsorbed → more urine volume. 少重吸收→尿量多。"),
        q("g5", 2, "Loop of Henle creates…", "亨利氏環造成…",
          ["Medullary osmotic gradient for water reabsorption 髓質滲透梯度以利重吸收水", "Blood filtration 血液濾過", "ADH secretion ADH 分泌", "Urine storage 儲尿"],
          "Medullary osmotic gradient for water reabsorption 髓質滲透梯度以利重吸收水", "Counter-current multiplier. 逆流倍增。"),
        q("g6", 2, "Osmoregulation is…", "滲透調節是…",
          ["Control of blood water/salt balance 控制血液水分/鹽分平衡", "Only filtering blood 只濾血", "Digestion of protein 蛋白質消化", "Gas exchange 氣體交換"],
          "Control of blood water/salt balance 控制血液水分/鹽分平衡", "Kidneys + ADH + thirst. 腎+ADH+口渴中樞。"),
    ]),
    _exam([
        q("e1", 3, "After heavy exercise dehydration, ADH secretion…", "劇烈運動脫水後，ADH 分泌…",
          ["Increases 增加", "Decreases 減少", "Stops 停止", "Unrelated 無關"],
          "Increases 增加", "Conserve water → concentrated urine. 保水→濃尿。"),
        q("e2", 3, "Which is NOT normally found in urine?", "哪項通常不在尿液中？",
          ["Large plasma proteins 大血漿蛋白", "Urea 尿素", "Water 水", "Ions 離子"],
          "Large plasma proteins 大血漿蛋白", "Too big to filter through glomerulus. 太大無法濾過。"),
        q("e3", 3, "Diabetes mellitus may cause glucose in urine because…", "糖尿病可使尿含糖，因為…",
          ["Reabsorption carriers saturated; excess remains in filtrate 重吸收載體飽和；過剩留於濾液", "More glucose filtered only 只濾過更多", "ADH stops working ADH 失效", "No ultrafiltration 無超濾"],
          "Reabsorption carriers saturated; excess remains in filtrate 重吸收載體飽和；過剩留於濾液", "Threshold exceeded. 超過腎閾。"),
        q("e4", 4, "Alcohol inhibits ADH. Short-term effect on urine?", "酒精抑制 ADH。短期對尿液影響？",
          ["More dilute urine, more volume 尿液更稀、量更多", "Concentrated urine 濃尿", "No urine 無尿", "Proteinuria 蛋白尿"],
          "More dilute urine, more volume 尿液更稀、量更多", "Less water reabsorbed. 重吸收水減少。"),
        q("e5", 4, "Selective reabsorption mainly happens in…", "選擇性重吸收主要發生於…",
          ["Proximal convoluted tubule 近曲小管", "Glomerulus only 只有腎小球", "Urethra 尿道", "Renal artery only"],
          "Proximal convoluted tubule 近曲小管", "Most glucose, amino acids, salts reclaimed. 回收大部分有用物質。"),
        q("e6", 4, "Kidney failure patient may need dialysis because…", "腎衰竭患者可能需要透析，因為…",
          ["Kidneys cannot adequately remove wastes/regulate fluids 腎無法充分除廢物/調液體", "Too much ADH only 只是 ADH 過多", "Urine too dilute only", "No filtration possible ever 永遠無法濾過"],
          "Kidneys cannot adequately remove wastes/regulate fluids 腎無法充分除廢物/調液體", "Artificial membrane replaces function. 人工膜替代功能。"),
    ]),
)

# --- Chemistry F4 Reactivity ---
DRILLS["Secondary_School/Chemistry/Form 4/05_Reactivity_Series"] = (
    _guided([
        q("g1", 1, "In the reactivity series, potassium (K) is…", "在金屬活動序中，鉀 (K)…",
          ["More reactive than sodium 比鈉更活潑", "Less reactive than copper 比銅不活潑", "Same as gold 與金相同", "Below hydrogen only 只在氫以下"],
          "More reactive than sodium 比鈉更活潑", "K > Na > … near top. 鉀鈉在頂端。"),
        q("g2", 1, "A metal above hydrogen reacts with dilute acid to produce…", "活潑性高於氫的金屬與稀酸反應產生…",
          ["Hydrogen gas + salt 氫氣 + 鹽", "Oxygen only 只有氧氣", "Water only 只有水", "No reaction 無反應"],
          "Hydrogen gas + salt 氫氣 + 鹽", "Metal displaces H⁺ from acid. 金屬置換酸中氫。"),
        q("g3", 1, "Copper (Cu) with cold water…", "銅 (Cu) 與冷水…",
          ["Does not react 不反應", "Forms Cu(OH)₂ rapidly 迅速生成氫氧化銅", "Explodes 爆炸", "Produces H₂ always 一定產氫"],
          "Does not react 不反應", "Cu is below hydrogen. 銅在氫以下。"),
        q("g4", 2, "Magnesium reacts faster than zinc with same acid because…", "鎂與同種酸反應比鋅快，因為…",
          ["Mg is higher in the series 鎂在活動序較高", "Mg is denser 鎂密度大", "Zn has higher melting point 鋅熔點高", "Acid prefers Zn 酸偏好鋅"],
          "Mg is higher in the series 鎂在活動序較高", "More reactive → faster bubble rate. 更活潑→氣泡更快。"),
        q("g5", 2, "Iron displaces copper from copper(II) sulfate because…", "鐵可從硫酸銅置換銅，因為…",
          ["Fe is more reactive than Cu 鐵比銅活潑", "Fe is less reactive 鐵較不活潑", "Colors change only 只是變色", "Sulfate forces reaction 硫酸根強迫反應"],
          "Fe is more reactive than Cu 鐵比銅活潑", "More reactive metal displaces less reactive ion. 較活潑金屬置換較不活潑離子。"),
        q("g6", 2, "The series order in Learn: K > Na > Mg > … means…", "學習區順序 K>Na>Mg>… 表示…",
          ["Easier electron loss higher up 愈上方愈易失電子", "Heavier metals always on top 重金屬總在上", "Gold is most reactive 金最活潑", "Order is random 順序隨機"],
          "Easier electron loss higher up 愈上方愈易失電子", "Reactivity ∝ tendency to form positive ions. 活潑性與形成陽離子傾向有關。"),
    ]),
    _exam([
        q("e1", 3, "Which metal CANNOT displace hydrogen from dilute HCl?", "哪種金屬不能從稀鹽酸置換氫？",
          ["Silver (Ag) 銀", "Magnesium 鎂", "Zinc 鋅", "Iron 鐵"],
          "Silver (Ag) 銀", "Ag below H in series. 銀在氫以下。"),
        q("e2", 3, "Zinc granules + CuSO₄(aq) — expected observation?", "鋅粒 + 硫酸銅溶液 — 預期現象？",
          ["Brown copper deposits; blue fades 析出紅棕色銅；藍色褪去", "No change 無變化", "Zinc dissolves to gold color", "Only gas evolved 只有氣體"],
          "Brown copper deposits; blue fades 析出紅棕色銅；藍色褪去", "Zn + Cu²⁺ → Zn²⁺ + Cu. 置換反應。"),
        q("e3", 3, "Aluminium appears less reactive initially in acid because…", "鋁在酸中起初似乎較不活潑，因為…",
          ["Oxide coating must break first 氧化層須先破裂", "Al is below hydrogen 鋁在氫下", "Acid cannot react with Al 酸不能與鋁反應", "Al is noble 鋁是貴金屬"],
          "Oxide coating must break first 氧化層須先破裂", "Protective Al₂O₃ layer. 保護性氧化膜。"),
        q("e4", 4, "Carbon can reduce copper oxide but not aluminium oxide because…", "碳可還原氧化銅但不可還原氧化鋁，因為…",
          ["Al is more reactive than Cu 鋁比銅活潑", "Cu is more reactive 銅更活潑", "Carbon only reacts with solids", "Oxides are identical 氧化物相同"],
          "Al is more reactive than Cu 鋁比銅活潑", "Only oxides of less reactive metals reduced. 只還原較不活潑金屬的氧化物。"),
        q("e5", 4, "Storage of sodium metal requires…", "儲存鈉金屬需要…",
          ["Oil to exclude air/water 用油隔絕空氣/水", "Open air only 只放空氣中", "Water bath 水浴", "No container 無容器"],
          "Oil to exclude air/water 用油隔絕空氣/水", "Na reacts violently with water/O₂. 鈉與水/氧劇烈反應。"),
        q("e6", 4, "Hydrogen position in series helps predict…", "氫在活動序中的位置有助預測…",
          ["Which metals react with acids/steam 哪些金屬與酸/水蒸氣反應", "Colour of flame only 只是焰色", "Atomic mass only 只是原子量", "Boiling point 沸點"],
          "Which metals react with acids/steam 哪些金屬與酸/水蒸氣反應", "Above H → H₂ from acids (generally). 氫以上通常可從酸得氫。"),
    ]),
)

# --- Chemistry F4 Rusting ---
DRILLS["Secondary_School/Chemistry/Form 4/06_Rusting_Protection"] = (
    _guided([
        q("g1", 1, "Rusting of iron requires…", "鐵生鏽需要…",
          ["Both oxygen and water 氧氣和水", "Oxygen only 只要氧氣", "Water only 只要水", "Salt only 只要鹽"],
          "Both oxygen and water 氧氣和水", "Learn model: both needed for rust. 學習模型：兩者缺一不可。"),
        q("g2", 1, "Dry air (no water) on iron…", "乾燥空氣（無水）中的鐵…",
          ["Little rust 很少生鏽", "Rapid rust 快速生鏽", "Melts 熔化", "Becomes copper 變銅"],
          "Little rust 很少生鏽", "Water needed for electrochemical rust. 水為電化學生鏽所需。"),
        q("g3", 1, "Galvanising coats iron with…", "鍍鋅是在鐵上包覆…",
          ["Zinc 鋅", "Copper 銅", "Gold 金", "Plastic 塑膠"],
          "Zinc 鋅", "Zn sacrificial protection. 鋅作犧牲性保護。"),
        q("g4", 2, "Sacrificial protection uses a metal that is…", "犧牲性保護使用…的金屬",
          ["More reactive than iron 比鐵更活潑", "Less reactive than iron 比鐵更不活潑", "Identical to iron 與鐵相同", "Non-metal 非金屬"],
          "More reactive than iron 比鐵更活潑", "Zn/Mg corrode instead of Fe. 鋅鎂先腐蝕。"),
        q("g5", 2, "Painting iron prevents rust by…", "油漆鐵器防鏽靠…",
          ["Blocking oxygen and water 阻擋氧氣和水", "Making iron more reactive 使鐵更活潑", "Adding copper ions 加銅離子", "Heating to red heat 加熱至紅熱"],
          "Blocking oxygen and water 阻擋氧氣和水", "Barrier method. 屏障法。"),
        q("g6", 2, "Oil on bicycle chain prevents rust by…", "單車鏈塗油防鏽靠…",
          ["Excluding water and air 隔絕水與空氣", "Catalysing rust 催化生鏽", "Increasing oxygen 增加氧氣", "Dissolving iron 溶解鐵"],
          "Excluding water and air 隔絕水與空氣", "Barrier on surface. 表面屏障。"),
    ]),
    _exam([
        q("e1", 3, "Rusted iron mass generally…", "生鏽後鐵的質量通常…",
          ["Increases (oxygen incorporated) 增加（結合氧）", "Decreases to zero 減至零", "Unchanged always 永遠不變", "Halves 減半"],
          "Increases (oxygen incorporated) 增加（結合氧）", "Hydrated iron(III) oxide forms. 形成水合氧化鐵。"),
        q("e2", 3, "Stainless steel resists rust partly because of…", "不鏽鋼抗鏽部分因為…",
          ["Chromium oxide passive layer 氧化鉻鈍化層", "Pure iron only 純鐵", "No oxygen contact ever 永不接觸氧", "Zinc coating always 總是鍍鋅"],
          "Chromium oxide passive layer 氧化鉻鈍化層", "Cr forms protective oxide. 鉻形成保護氧化層。"),
        q("e3", 3, "Ship hull sacrificial blocks are often…", "船殼犧牲陽極常為…",
          ["Magnesium or zinc 鎂或鋅", "Copper 銅", "Silver 銀", "Gold 金"],
          "Magnesium or zinc 鎂或鋅", "More reactive than iron. 比鐵活潑。"),
        q("e4", 4, "Salt spray speeds rusting because…", "鹽霧加速生鏽，因為…",
          ["Ions increase conductivity of surface water 離子提高表面水導電性", "Salt removes oxygen 鹽除氧", "Iron becomes gold 鐵變金", "Water is removed 水被移除"],
          "Ions increase conductivity of surface water 離子提高表面水導電性", "Electrochemical cells form more easily. 更易形成電化學電池。"),
        q("e5", 4, "If zinc coating on galvanised steel is scratched…", "鍍鋅鋼鍍層刮損時…",
          ["Zn still protects Fe sacrificially nearby 鋅仍就近犧牲性保護鐵", "Iron rusts instantly everywhere 鐵立即到處生鏽", "Zinc accelerates Fe rust 鋅加速鐵生鏽", "No effect 無影響"],
          "Zn still protects Fe sacrificially nearby 鋅仍就近犧牲性保護鐵", "Zn corrodes preferentially. 鋅優先腐蝕。"),
        q("e6", 4, "Anaerobic conditions (no O₂) under water on iron…", "水下無氧條件中的鐵…",
          ["Typical aerobic rust slows; other corrosion possible 典型有氧生鏽減慢；可能有其他腐蝕", "Rust faster than air 比空氣中生鏽更快", "Becomes aluminium 變鋁", "No chemical change ever 永不變化"],
          "Typical aerobic rust slows; other corrosion possible 典型有氧生鏽減慢；可能有其他腐蝕", "O₂ needed for familiar orange rust. 熟悉橙鏽需氧。"),
    ]),
)

# --- Chemistry F5 Rates ---
DRILLS["Secondary_School/Chemistry/Form 5/01_Rates_Collision"] = (
    _guided([
        q("g1", 1, "Collision theory: reaction occurs when particles…", "碰撞理論：反應發生於粒子…",
          ["Collide with sufficient energy and correct orientation 以足夠能量與正確取向碰撞", "Touch any surface 接觸任何表面", "Are at rest 靜止", "Are largest 最大"],
          "Collide with sufficient energy and correct orientation 以足夠能量與正確取向碰撞", "Effective collisions only. 只有有效碰撞。"),
        q("g2", 1, "Raising temperature increases rate mainly by…", "升溫主要透過…提高速率",
          ["More frequent energetic collisions 更頻繁的高能碰撞", "Lowering activation energy always 總是降低活化能", "Increasing mass only 只增加質量", "Stopping collisions 停止碰撞"],
          "More frequent energetic collisions 更頻繁的高能碰撞", "Particles faster; more ≥ Ea. 粒子更快；更多達活化能。"),
        q("g3", 1, "In the Learn slider, higher °C gives…", "學習滑桿較高 °C 使…",
          ["Higher relative collision success (model) 模型中碰撞成功率較高", "Zero collisions 零碰撞", "Only pressure change 只有壓力變", "Slower rate always 一定更慢"],
          "Higher relative collision success (model) 模型中碰撞成功率較高", "Matches temperature effect on rate. 符合溫度對速率影響。"),
        q("g4", 2, "Increasing concentration of a reactant increases rate because…", "增加反應物濃度提高速率，因為…",
          ["More particles per unit volume → more collisions 單位體積粒子多→碰撞多", "Particles become larger 粒子變大", "Activation energy disappears 活化能消失", "Catalyst added automatically 自動加催化劑"],
          "More particles per unit volume → more collisions 單位體積粒子多→碰撞多", "Frequency of collision rises. 碰撞頻率上升。"),
        q("g5", 2, "A catalyst speeds a reaction by…", "催化劑透過…加快反應",
          ["Providing alternative pathway with lower Ea 提供較低活化能的途徑", "Increasing ΔH 增加反應熱", "Being used up completely 完全被消耗", "Slowing product formation 減慢產物生成"],
          "Providing alternative pathway with lower Ea 提供較低活化能的途徑", "More collisions succeed; catalyst regenerated. 更多有效碰撞；催化劑再生。"),
        q("g6", 2, "Powdering a solid increases rate by increasing…", "固體磨粉提高速率靠增加…",
          ["Surface area 表面積", "Activation energy 活化能", "Catalyst mass 催化劑質量", "Volume of gas only 只有氣體體積"],
          "Surface area 表面積", "More exposed particles collide. 更多暴露粒子可碰撞。"),
    ]),
    _exam([
        q("e1", 3, "Doubling gas pressure (fixed T) for a gaseous reaction…", "氣體反應在固定 T 下壓力加倍…",
          ["Increases collision frequency → faster rate 碰撞頻率增→速率加快", "Halves rate 速率減半", "No effect on rate 對速率無影響", "Stops reaction 停止反應"],
          "Increases collision frequency → faster rate 碰撞頻率增→速率加快", "More molecules per dm³. 每 dm³ 分子更多。"),
        q("e2", 3, "On an energy profile, Ea is…", "能量圖中 Ea 是…",
          ["Activation energy 活化能", "Enthalpy change only 只是焓變", "Kinetic energy of products 產物動能", "Catalyst mass 催化劑質量"],
          "Activation energy 活化能", "Minimum energy for reaction. 反應所需最低能量。"),
        q("e3", 3, "Measuring volume of CO₂ vs time tests rate of…", "量度 CO₂ 體積隨時間變化可測…的速率",
          ["Carbonate + acid reaction 碳酸鹽與酸反應", "Combustion of iron only 只有鐵燃燒", "Electrolysis of water only 只有電解水", "Rusting only 只有生鏽"],
          "Carbonate + acid reaction 碳酸鹽與酸反應", "Gas evolution tracks progress. 放氣反映進度。"),
        q("e4", 4, "At very low T, almost no reaction because…", "極低溫下幾乎無反應，因為…",
          ["Few collisions exceed Ea 很少碰撞超過活化能", "Particles stop existing 粒子不存在", "Concentration becomes infinite 濃度無限", "Catalyst always poisoned 催化劑一定中毒"],
          "Few collisions exceed Ea 很少碰撞超過活化能", "Boltzmann distribution shifts. 分布改變。"),
        q("e5", 4, "Increasing surface area does NOT change…", "增加表面積不改變…",
          ["Activation energy 活化能", "Collision frequency at surface 表面碰撞頻率", "Initial rate with excess acid 酸過量時初速率", "Solid dissolution speed 固體溶解速度"],
          "Activation energy 活化能", "Ea is pathway property. 活化能屬反應途徑性質。"),
        q("e6", 4, "A reversible reaction at equilibrium: adding catalyst…", "可逆反應達平衡：加催化劑…",
          ["Speeds attainment; position unchanged 加快達平衡；位置不變", "Shifts equilibrium right 平衡右移", "Stops forward reaction 停止正向", "Changes ΔH 改變反應熱"],
          "Speeds attainment; position unchanged 加快達平衡；位置不變", "Catalyst affects kinetics not K. 催化劑影響動力學非 K。"),
    ]),
)

# --- Chemistry F5 Redox Electrolysis ---
DRILLS["Secondary_School/Chemistry/Form 5/02_Redox_Electrolysis"] = (
    _guided([
        q("g1", 1, "At the anode during electrolysis…", "電解時陽極…",
          ["Oxidation occurs 發生氧化", "Reduction occurs 發生還原", "Only cations react 只有陽離子反應", "Mass always increases 質量一定增加"],
          "Oxidation occurs 發生氧化", "Anode = oxidation (mnemonic: vowel). 陽極氧化。"),
        q("g2", 1, "At the cathode…", "陰極…",
          ["Reduction (gain of electrons) 還原（得電子）", "Oxidation only 只有氧化", "Anions discharged first always 陰離子一定先放電", "Electrode dissolves always 電極一定溶解"],
          "Reduction (gain of electrons) 還原（得電子）", "Cathode = reduction. 陰極還原。"),
        q("g3", 1, "During electrolysis of molten lead(II) bromide, bromine forms at…", "熔融溴化鉛電解時，溴在…生成",
          ["Anode 陽極", "Cathode 陰極", "Both electrodes 兩極", "Neither 都不"],
          "Anode 陽極", "Br⁻ → Br₂ + e⁻ (oxidation). 溴離子氧化。"),
        q("g4", 2, "Oxidation is defined as…", "氧化定義為…",
          ["Loss of electrons 失電子", "Gain of electrons 得電子", "Gain of hydrogen only 只得氫", "Loss of oxygen only 只失氧"],
          "Loss of electrons 失電子", "OIL RIG: oxidation is loss. 失電子為氧化。"),
        q("g5", 2, "In aqueous NaCl electrolysis (inert electrodes), cathode product is often…", "惰性電極電解 NaCl 水溶液，陰極產物常為…",
          ["Hydrogen gas 氫氣", "Sodium metal 鈉金屬", "Chlorine at cathode 陰極氯氣", "Oxygen at cathode only"],
          "Hydrogen gas 氫氣", "H⁺ from water reduced preferentially over Na⁺. 水中 H⁺ 優先於 Na⁺ 還原。"),
        q("g6", 2, "Electrolysis requires…", "電解需要…",
          ["Direct current supply 直流電源", "No electrodes 無電極", "Only solids 只有固體", "Automatic redox without energy 無需能量的自動氧化還原"],
          "Direct current supply 直流電源", "External energy drives non-spontaneous change. 外電能驅動非自發反應。"),
    ]),
    _exam([
        q("e1", 3, "Copper purified by electrolysis: impure Cu is…", "電解精煉銅：粗銅為…",
          ["Anode 陽極", "Cathode 陰極", "Electrolyte 電解質", "Salt bridge 鹽橋"],
          "Anode 陽極", "Cu dissolves (oxidation) from anode; pure Cu deposits on cathode. 陽極氧化溶解；陰極沉積純銅。"),
        q("e2", 3, "During electroplating a steel spoon with nickel, the spoon is…", "鎳電鍍鋼匙時，鋼匙為…",
          ["Cathode 陰極", "Anode 陽極", "Electrolyte 電解質", "Open circuit 開路"],
          "Cathode 陰極", "Ni²⁺ reduced onto object at cathode. Ni²⁺ 在陰極還原沉積。"),
        q("e3", 3, "Which ion moves to cathode in electrolysis?", "電解時哪種離子移向陰極？",
          ["Cation 陽離子", "Anion 陰離子", "Neutron 中子", "Electron in solution 溶液中電子"],
          "Cation 陽離子", "Opposite charges attract. 異電相吸。"),
        q("e4", 4, "Concentrated HCl electrolysis with inert electrodes — anode gas?", "濃鹽酸電解（惰性電極）— 陽極氣體？",
          ["Chlorine 氯氣", "Hydrogen 氫氣", "Oxygen only 只有氧氣", "Nitrogen 氮氣"],
          "Chlorine 氯氣", "Cl⁻ oxidised to Cl₂. 氯離子氧化成氯氣。"),
        q("e5", 4, "Faraday's laws relate…", "法拉第定律關聯…",
          ["Quantity of substance deposited and charge passed 沉積物質量與通過電量", "Rate and temperature only 只有速率與溫度", "Colour and pH 顏色與 pH", "Catalyst and Ea only"],
          "Quantity of substance deposited and charge passed 沉積物質量與通過電量", "m ∝ Q (mass ∝ current × time). 質量與電量成正比。"),
        q("e6", 4, "Why is solid NaCl not electrolysed directly at room conditions?", "為何室溫下不直接電解固體 NaCl？",
          ["Ions not mobile in rigid lattice 離子在晶格中不能移動", "NaCl is covalent 氯化鈉是共價", "No redox possible 不可能氧化還原", "Water required always 一定需要水"],
          "Ions not mobile in rigid lattice 離子在晶格中不能移動", "Need molten or aqueous for conductivity. 需熔融或水溶液導電。"),
    ]),
)

GUIDED_RE = re.compile(r"const\s+GUIDED\s*=\s*\[[\s\S]*?\];", re.MULTILINE)
EXAM_RE = re.compile(r"const\s+EXAM\s*=\s*\[[\s\S]*?\];", re.MULTILINE)

VITE_APPS = [
    "Secondary_School/Biology/apps/allopatric-speciation",
    "Secondary_School/Biology/apps/energy-flow",
    "Secondary_School/Biology/apps/immune-response",
]

VITE_SVG_SRC = ROOT / "Secondary_School/Biology/apps/transpiration-lab/public/vite.svg"


def patch_drills(rel: str) -> bool:
    if rel not in DRILLS:
        return False
    path = ROOT / rel.replace("/", "\\") / "index.html"
    html = path.read_text(encoding="utf-8")
    guided, exam = DRILLS[rel]
    new_html = GUIDED_RE.sub(guided, html, count=1)
    new_html = EXAM_RE.sub(exam, new_html, count=1)
    if new_html == html:
        print(f"WARN: no change for drills {rel}")
        return False
    path.write_text(new_html, encoding="utf-8")
    print(f"OK drills: {rel}")
    return True


def sync_vite_app(rel: str) -> None:
    app = ROOT / rel.replace("/", "\\")
    dist = app / "dist"
    if not dist.is_dir():
        print(f"SKIP vite (no dist): {rel}")
        return

    # vite.svg at root (and dist for consistency)
    if VITE_SVG_SRC.is_file():
        shutil.copy2(VITE_SVG_SRC, app / "vite.svg")
        shutil.copy2(VITE_SVG_SRC, dist / "vite.svg")

    # Sync built assets to ./assets for file-server playability
    dist_assets = dist / "assets"
    if dist_assets.is_dir():
        assets = app / "assets"
        if assets.exists():
            shutil.rmtree(assets)
        shutil.copytree(dist_assets, assets)

    # Refresh root index from dist but fix paths + footer scripts
    dist_index = dist / "index.html"
    if dist_index.is_file():
        html = dist_index.read_text(encoding="utf-8")
        html = html.replace('href="/vite.svg"', 'href="./vite.svg"')
        html = html.replace("href='/vite.svg'", "href='./vite.svg'")
        if "learn-from-zero.js" not in html:
            footer = (
                '\n      <!-- Footer -->\n'
                '      <script src="../../../../common/learn-from-zero.js"></script>\n'
                '  <script src="../../../../common/interactive-lab-kit.js"></script>\n'
                '<footer style="text-align:center;padding:1rem;font-size:0.8rem;opacity:0.7;">'
                "@HKSTEAMAI All Copy-Right Reserved.</footer>\n"
            )
            html = html.replace("</body>", footer + "</body>")
        (app / "index.html").write_text(html, encoding="utf-8")

    print(f"OK vite: {rel}")


def main() -> None:
    n = 0
    for rel in DRILLS:
        if patch_drills(rel):
            n += 1
    print(f"Patched {n} drill apps")
    for rel in VITE_APPS:
        sync_vite_app(rel)


if __name__ == "__main__":
    main()
