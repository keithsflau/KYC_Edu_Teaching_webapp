module.exports = {
  forms: [
    {
      id: "3",
      code: "Form 3",
      title: "中三",
      en: "Form 3",
      topics: [
        {
          title: "微觀世界",
          lessons: [
            lesson("01_States_of_Matter", "物質狀態", "States of matter", "調溫度，看粒子排列。", ["用溫度改變粒子的排列與運動。", "分辨固體、液體和氣體。", "說出粒子之間空隙和運動的分別。"]),
            lesson("02_Atomic_Structure", "原子結構", "Atomic structure", "調質子、中子、電子。", ["用質子數和中子數得出原子序與質量數。", "把電子排進殼層。", "核對畫面顯示的粒子數目。"]),
            lesson("03_Periodic_Table", "週期表", "Periodic table", "按族和週期找元素。", ["用符號、名稱或原子序找出元素。", "讀出元素所在的週期和族。", "比較同一族元素的性質趨勢。"]),
            lesson("04_Chemical_Bonding", "化學鍵", "Chemical bonding", "組合離子鍵或共價鍵。", ["用電子轉移表示離子鍵。", "用共用電子表示共價鍵。", "核對穩定電子排列。"])
          ]
        },
        {
          title: "金屬與酸鹼",
          lessons: [
            lesson("05_Reactivity_Series", "金屬活性", "Reactivity series", "比較金屬反應。", ["比較不同金屬的活潑程度。", "用觀察排出活性序。", "解釋較活潑金屬較易失去電子。"]),
            lesson("06_Acids_Alkalis_pH", "酸鹼與濃度", "Acids, concentration and pH", "用濃度和指示劑色帶。", ["用濃度而不是「酸的強度」改變起始 pH。", "指示劑按色帶變色，不是只在 pH 剛好等於 7。", "記得護目鏡和指定廢液缸。"])
          ]
        }
      ]
    },
    {
      id: "4",
      code: "Form 4",
      title: "中四",
      en: "Form 4",
      topics: [
        {
          title: "化石燃料與碳化合物",
          lessons: [
            lesson("01_Fractional_Distillation", "原油分餾", "Fractional distillation", "同一套碳數與沸程。", ["用同一套碳數和沸程辨認餾分。", "塔頂溫度低、塔底溫度高。", "碳鏈愈長，沸點愈高。"]),
            lesson("02_Homologous", "同系列", "Homologous series", "沿同系列看通式和沸點。", ["用通式找出同系列下一個成員。", "看碳數增加時沸點如何改變。", "指出同系列的官能基相同。"]),
            lesson("03_Isomers", "異構物", "Isomers", "轉動並辨認同分異構物。", ["指出相同分子式、不同結構。", "旋轉模型比較支鏈位置。", "解釋結構不同會影響性質。"]),
            lesson("04_Cracking", "裂解", "Cracking", "把長鏈變成短鏈。", ["把長鏈烷烴裂成較短的鏈和烯烴。", "比較熱裂解和催化裂解的條件。", "說明短鏈產物的用途。"]),
            lesson("06_Combustion", "燃燒產物", "Combustion products", "比較氧充足與不足。", ["分辨完全燃燒與不完全燃燒的產物。", "核對甲烷、乙烯完全燃燒的摩爾比。", "模型只比較產物，沒有點火步驟。"])
          ]
        },
        {
          title: "微觀世界 II",
          lessons: [
            lesson("07_VSEPR", "分子形狀", "VSEPR shapes", "由電子對預測形狀。", ["數出中心原子的電子對。", "預測分子形狀。", "解釋孤電子對如何改變鍵角。"]),
            lesson("08_Polarity", "極性", "Polarity", "看極性與溶解。", ["判斷鍵和分子是否有極性。", "用「相似相溶」解釋溶解。", "調粒子模型看吸引。"]),
            lesson("09_Giant_Structures", "巨型結構", "Giant structures", "比較金剛石、石墨和二氧化矽。", ["在結構中移動並數配位數。", "比較熔點和導電的原因。", "把結構和性質連起來。"])
          ]
        },
        {
          title: "金屬與氧化還原",
          lessons: [
            lesson("05_Reactivity_Series", "金屬活性", "Reactivity series", "比較金屬活性。", ["排出金屬活性序。", "預測置換反應能否發生。", "用電子得失解釋活性。"]),
            lesson("06_Rusting_Protection", "防銹", "Rusting protection", "比較防銹方法。", ["說出生鏽需要水和氧。", "比較屏障、犧牲保護和電鍍。", "判斷哪種方法正在保護鐵。"]),
            lesson("11_Oxidation_Numbers", "氧化數", "Oxidation numbers", "計算指定原子的氧化數。", ["用電荷總和計算氧化數。", "認出過氧化物和 OF₂ 的例外。", "答錯時按規則再試。"])
          ]
        },
        {
          title: "能量",
          lessons: [
            lesson("18_Calorimetry", "量熱計算", "Calorimetry", "用 q = mcΔT。", ["用 q = mcΔT 計算水吸收的熱。", "升溫時 ΔH 取負號。", "這是計算模型，沒有加熱步驟。"]),
            lesson("20_Bond_Energy", "鍵能", "Bond energy", "斷鍵減成鍵。", ["ΔH 約等於斷鍵能量減成鍵能量。", "計算 H₂ + Cl₂ → 2HCl。", "判斷反應是放熱還是吸熱。"])
          ]
        }
      ]
    },
    {
      id: "5",
      code: "Form 5",
      title: "中五",
      en: "Form 5",
      topics: [
        {
          title: "反應速率",
          lessons: [
            lesson("01_Rates_Collision", "碰撞與速率", "Collision and rate", "粒子數、速率和有效碰撞。", ["濃度增加時，同一體積的粒子變多，碰撞次數上升。", "溫度升高時，粒子更快，更多碰撞超過閾值。", "讀出粒子數、碰撞次數和有效碰撞比例。"]),
            lesson("02_Rate_Equation", "速率方程", "Rate equation", "速率 = k[A]ⁿ。", ["分辨 0、1、2 級。", "濃度加倍時速率變成 2ⁿ 倍。", "從圖讀出速率如何隨濃度改變。"])
          ]
        },
        {
          title: "化學平衡",
          lessons: [
            lesson("09_Chemical_Equilibrium_Kc", "平衡常數", "Equilibrium Kc", "比較 Q 和 Kc。", ["寫出 Kc 表達式。", "改變濃度後比較 Q 和 Kc。", "說明平衡會向哪一邊移動。"]),
            lesson("06_Buffer_Systems", "緩衝溶液", "Buffer solutions", "超過緩衝容量就改算剩餘 OH⁻。", ["在緩衝範圍內用 Henderson–Hasselbalch。", "強鹼多過 HA 時，改算剩餘 OH⁻。", "100 mL、HA 10 mmol、加 15 mmol OH⁻ 時 pH 約 12.7。"])
          ]
        },
        {
          title: "氧化還原與電化學",
          lessons: [
            lesson("02_Redox_Electrolysis", "氧化還原", "Redox and electrolysis", "看電子得失。", ["標明氧化和還原。", "平衡電子數目。", "連到電解或電池的觀察。"]),
            lesson("03_Cell_Builder", "化學電池", "Cell builder", "選電極，看 E°cell。", ["選兩支電極並計算 E°cell。", "指出電子流向。", "判斷哪一極是負極。"]),
            lesson("04_Electrolysis_Sandbox", "電解", "Electrolysis", "看優先放電。", ["按離子和電極選擇放電產物。", "用法拉第關係看產物的量。", "解釋濃度如何影響放電。"])
          ]
        },
        {
          title: "能量",
          lessons: [
            lesson("05_Hess_Cycle", "赫斯定律", "Hess's law", "沿不同路徑加總 ΔH。", ["用赫斯定律把路徑相加。", "核對總 ΔH 與路徑無關。", "完成能量循環。"])
          ]
        }
      ]
    },
    {
      id: "6",
      code: "Form 6",
      title: "中六",
      en: "Form 6",
      topics: [
        {
          title: "平衡與工業",
          lessons: [
            lesson("01_Le_Chatelier", "勒沙特列原理", "Le Chatelier", "改溫度或壓力，看平衡移動。", ["改變溫度、壓力或濃度。", "預測平衡移動方向。", "比較 Q 和 K。"]),
            lesson("04_Haber_Yield", "哈柏法", "Haber process", "比較產率和速率。", ["調溫度、壓力和催化劑。", "說明產率和速率的取捨。", "選一組工業上折衷的條件。"]),
            lesson("14_Green_Chem", "綠色化學", "Green chemistry", "比較原子經濟。", ["用相對分子質量計算原子經濟。", "解釋加成反應為何是 100%。", "有副產物時原子經濟下降。這裡沒有製備步驟。"])
          ]
        },
        {
          title: "分析化學",
          lessons: [
            lesson("02_Titration_Curve", "滴定曲線", "Titration curve", "弱酸剛加鹼時 pH 不下跌。", ["比較強酸和弱酸的滴定曲線。", "剛加入少量鹼時，弱酸的 pH 不應下跌。", "用酚酞的變色範圍判斷終點。"])
          ]
        },
        {
          title: "有機化學",
          lessons: [
            lesson("03_Organic_FG_Lab", "官能基檢驗", "Functional groups", "選檢驗並看觀察。", ["按官能基選擇合適檢驗。", "讀出預期觀察。", "把觀察連回官能基。"]),
            lesson("08_Polymer_Addition", "聚合物", "Polymers", "比較加成聚合和縮合聚合。", ["由單體組成聚合物鏈。", "分辨加成聚合和縮合聚合。", "指出重複單位。"])
          ]
        }
      ]
    }
  ]
};

function lesson(folder, title, en, blurb, objectives) {
  return { folder: folder, title: title, en: en, blurb: blurb, objectives: objectives };
}
