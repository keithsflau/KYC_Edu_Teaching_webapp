/**
 * HKDSE E1 Dynamic Earth — detailed lesson content
 * Aligns with CDC Geography C&A Guide (S4–S6) Elective Part E1
 */
window.LESSON_CONTENT = {
  earth_system: {
    meta: { num: "01", tag: "E1 Topic 1 · ~6 課時", hours: 6 },
    objectives: [
      "描述地球四大圈層（大氣圈、水圈、岩石圈、生物圈）的組成與相互作用",
      "繪畫或標示地球內部結構（地殼、地幔、外核、內核）並說明各層物理性質",
      "解釋地幔對流與軟流圈如何驅動板塊運動",
      "以系統思維分析岩石風化、沉積、火山等過程如何連接各圈層",
    ],
    guiding: [
      "我們應如何將地球視為一個系統？",
      "地球的整體結構是怎樣的？",
    ],
    sections: [
      {
        title: "地球作為一個系統",
        body: `<p>地球並非靜止的岩石球體，而是由<strong>大氣圈、水圈、岩石圈</strong>及<strong>生物圈</strong>組成的動態系統。各圈層物質與能量不斷交換：</p>
        <ul>
          <li><strong>大氣圈</strong>：氣體層，約 78% N₂、21% O₂；調節溫度、天氣、紫外線</li>
          <li><strong>水圈</strong>：海洋、河流、冰川、地下水；佔地球表面約 71%</li>
          <li><strong>岩石圈</strong>：地殼及最上部地幔；板塊在此移動</li>
          <li><strong>生物圈</strong>：所有生物及其活動；影響碳循環、土壤形成</li>
        </ul>
        <p>DSE 常要求以<strong>箭頭圖</strong>顯示圈層間的物質轉移，例如：岩石風化 → 離子進入水圈 → 沉積為沉積岩。</p>`,
      },
      {
        title: "地球內部結構（由外至內）",
        body: `<table class="data-table">
          <tr><th>層次</th><th>深度（約）</th><th>組成／狀態</th><th>與地貌的關係</th></tr>
          <tr><td>地殼 Crust</td><td>5–70 km</td><td>矽酸鹽岩石；分大陸殼（花崗岩質、較厚）與海洋殼（玄武岩質、較薄）</td><td>人類活動、地震淺源震源</td></tr>
          <tr><td>地幔 Mantle</td><td>至 2,900 km</td><td>矽酸鹽礦物；上地幔含<strong>軟流圈</strong>（部分熔融、可塑性）</td><td>對流驅動板塊；岩漿來源</td></tr>
          <tr><td>外核 Outer core</td><td>2,900–5,100 km</td><td>液態鐵鎳</td><td>地球磁場（發電機效應）</td></tr>
          <tr><td>內核 Inner core</td><td>至 6,371 km</td><td>固態鐵鎳；極高溫高壓</td><td>間接影響磁場穩定</td></tr>
        </table>
        <p class="note">⚠️ 考試陷阱：地殼<strong>不是</strong>最厚處在海洋；海洋殼僅約 5–10 km，大陸殼可達 30–50 km。</p>`,
      },
      {
        title: "地幔對流與板塊驅動",
        body: `<p>上地幔的<strong>軟流圈</strong>（asthenosphere）因高溫而具塑性，熱物質上升、冷物質下沉，形成<strong>對流胞</strong>（convection cells）。這是板塊構造的主要驅動機制之一（另包括板塊拉力、重力滑移等）。</p>
        <p>對流速度極慢（每年數厘米），但長期累積可造成大陸漂移、海嶺擴張與海溝俯衝。</p>`,
      },
      {
        title: "與香港的關聯",
        body: `<p>香港位於<strong>歐亞板塊</strong>東南緣，地殼以侏羅紀至白堊紀<strong>花崗岩</strong>為主，反映古代岩漿侵入活動。雖然本地不處於活躍板塊邊界，但理解地球內部能量如何釋放，有助解釋區內地震、火山歷史及岩石類型分布。</p>`,
      },
    ],
    layers: [
      { id: "crust", name: "地殼", depth: "0–70 km", state: "固態矽酸鹽", fact: "大陸殼平均密度約 2.7 g/cm³；海洋殼約 3.0 g/cm³" },
      { id: "mantle", name: "地幔", depth: "70–2,900 km", state: "塑性固態（軟流圈）", fact: "佔地球體積約 84%；對流驅動板塊" },
      { id: "outer", name: "外核", depth: "2,900–5,100 km", state: "液態鐵鎳", fact: "流動帶電金屬產生地球磁場" },
      { id: "inner", name: "內核", depth: "5,100–6,371 km", state: "固態鐵鎳", fact: "溫度約 5,000°C 以上" },
    ],
    glossary: [
      { term: "軟流圈", def: "上地幔中具塑性的層位，板塊於其上滑動" },
      { term: "岩石圈", def: "地殼 + 最上部固態地幔；板塊即岩石圈板塊" },
      { term: "對流", def: "熱流體上升、冷流體下沉的循環運動" },
      { term: "莫霍面", def: "地殼與地幔的分界面" },
    ],
    examTips: [
      "答題時先界定「地球系統」包含哪些圈層，再分點描述相互作用",
      "內部結構題須標明深度、物態、主要成分三要素",
      "勿混淆「岩石圈」與「地殼」— 岩石圈包括上部地幔",
      "常見 4 分題：說明地幔對流如何驅動板塊運動（上升流推開、下降流拉動俯衝）",
    ],
    quizzes: [
      { q: "驅動板塊運動的主要機制是？", opts: ["地幔對流（軟流圈）", "地球自轉離心力", "月球引力", "太陽輻射直接推動板塊"], ans: 0, explain: "地幔對流使軟流圈物質循環，帶動岩石圈板塊移動。離心力與潮汐力影響極小，非主因。" },
      { q: "地球內核的物態是？", opts: ["液態鐵鎳", "固態鐵鎳", "熔融矽酸鹽", "氣態"], ans: 1, explain: "極高壓使內核在超高溫下仍保持固態。外核才是液態。" },
      { q: "海洋地殼與大陸地殼相比，一般？", opts: ["較厚、密度較低", "較薄、密度較高", "較厚、密度較高", "較薄、密度較低"], ans: 1, explain: "海洋殼（玄武岩質）約 5–10 km；大陸殼（花崗岩質）較厚但密度較低。" },
      { q: "地球磁場主要由哪一層產生？", opts: ["地殼", "地幔", "外核", "內核"], ans: 2, explain: "液態外核的對流產生發電機效應，形成磁場。" },
      { q: "軟流圈位於？", opts: ["地殼內", "上地幔", "外核", "內核"], ans: 1, explain: "軟流圈在上地幔，具塑性，板塊於其上移動。" },
      { q: "以下哪項屬於水圈與岩石圈的相互作用？", opts: ["河流侵蝕搬運岩屑", "大氣臭氧層吸收 UV", "生物光合作用", "地核對流"], ans: 0, explain: "侵蝕屬外營力，連接水圈（流水）與岩石圈（岩層）。" },
      { q: "地幔約佔地球體積的？", opts: ["約 50%", "約 68%", "約 84%", "約 95%"], ans: 2, explain: "地幔是體積最大的層，約 84%。" },
      { q: "莫霍面是什麼的分界面？", opts: ["地殼與地幔", "地幔與外核", "外核與內核", "大氣與地殼"], ans: 0, explain: "莫霍面（Mohorovičić discontinuity）分隔地殼與地幔。" },
    ],
    sortExercise: {
      title: "四大圈層分類練習",
      prompt: "點選現象／過程，再按「放入」按鈕歸入正確圈層。",
      categories: [
        { id: "atmo", label: "大氣圈" },
        { id: "hydro", label: "水圈" },
        { id: "litho", label: "岩石圈" },
        { id: "bio", label: "生物圈" },
      ],
      items: [
        { text: "臭氧層吸收紫外線", category: "atmo" },
        { text: "海水蒸發與降水循環", category: "hydro" },
        { text: "板塊俯衝與地震", category: "litho" },
        { text: "植物根系風化岩石", category: "bio" },
        { text: "溫室氣體與全球增溫", category: "atmo" },
        { text: "河流侵蝕與搬運沉積物", category: "hydro" },
        { text: "火山噴發與熔岩冷卻", category: "litho" },
        { text: "蚯蚓鬆動土壤、增加孔隙", category: "bio" },
      ],
    },
    layerMatch: {
      title: "地球內部層次配對",
      prompt: "為每項描述選擇正確的地球內部層次（可對照左側 3D 剖面）。",
      choices: [
        { id: "crust", label: "地殼" },
        { id: "mantle", label: "地幔" },
        { id: "outer", label: "外核" },
        { id: "inner", label: "內核" },
      ],
      items: [
        { label: "0–70 km，矽酸鹽固態岩石", answer: "crust" },
        { label: "含軟流圈，對流驅動板塊", answer: "mantle" },
        { label: "液態鐵鎳，地球磁場來源", answer: "outer" },
        { label: "極高溫高壓下固態鐵鎳", answer: "inner" },
        { label: "莫霍面分隔其與地幔", answer: "crust" },
        { label: "佔地球體積約 84%", answer: "mantle" },
      ],
    },
  },

  plate_tectonics: {
    meta: { num: "02", tag: "E1 + 必修 C1 · ~6 課時", hours: 6 },
    objectives: [
      "描述主要板塊及其邊界類型（張裂、消亡、保守）",
      "解釋各類邊界的板塊運動方式與形成的地貌",
      "說明大陸漂移說的證據及發展為板塊構造論的過程",
      "分析香港在板塊構造格局中的位置與地質穩定性",
    ],
    guiding: ["主要板塊及板塊邊界在哪裡？", "板塊運動如何形成地貌？"],
    sections: [
      {
        title: "板塊構造論概要",
        body: `<p>1960 年代整合<strong>大陸漂移說</strong>、<strong>海底擴張</strong>及<strong>俯衝帶</strong>觀念，形成現代板塊構造論。地球岩石圈分裂為若干大板塊，以每年約 2–10 cm 的速度移動。</p>
        <p><strong>魏格納證據</strong>：大陸海岸線吻合、化石分布（中龍）、古氣候證據（石炭紀冰川）、岩層與山脈連續性。</p>`,
      },
      {
        title: "三種板塊邊界",
        body: `<table class="data-table">
          <tr><th>類型</th><th>運動</th><th>典型地貌</th><th>地震／火山</th></tr>
          <tr><td><span class="pill pill--green">張裂</span></td><td>互相分離</td><td>中大西洋海嶺、東非大裂谷、紅海</td><td>淺源地震；裂谷火山</td></tr>
          <tr><td><span class="pill pill--orange">消亡</span></td><td>碰撞／俯衝</td><td>喜馬拉雅山、馬里亞納海溝、安第斯山</td><td>深源地震；火山弧</td></tr>
          <tr><td><span class="pill pill--blue">保守</span></td><td>水平擦過</td><td>聖安德烈亞斯斷層</td><td>淺源強震；少火山</td></tr>
        </table>`,
      },
      {
        title: "消亡邊界細分",
        body: `<ul>
          <li><strong>大洋—大洋</strong>：一方俯衝，形成海溝 + 島弧火山（如日本）</li>
          <li><strong>大洋—大陸</strong>：大洋殼俯衝於大陸下，海岸造山 + 火山（如安第斯）</li>
          <li><strong>大陸—大陸</strong>：雙方密度低難俯衝，造山運動（如喜馬拉雅）</li>
        </ul>
        <p>大洋殼因密度較大，通常俯衝於大陸殼或較年輕大洋殼之下。</p>`,
      },
      {
        title: "香港與環太平洋",
        body: `<p>香港位於<strong>歐亞板塊</strong>內，距菲律賓板塊邊界約 800 km，本地<strong>構造穩定</strong>，地震風險低。但鄰近環太平洋火環，理解板塊邊界有助評估區域災害風險。</p>`,
      },
    ],
    glossary: [
      { term: "環太平洋火環", def: "環繞太平洋的板塊邊界帶，集中全球約 80% 地震與多數活火山" },
      { term: "俯衝", def: "密度較大的大洋板塊插入地幔之下" },
      { term: "海嶺", def: "張裂邊界海底火山噴發形成的新洋殼" },
      { term: "熱點", def: "板塊內部固定岩漿柱，如夏威夷" },
    ],
    examTips: [
      "配對題：記牢「張裂→海嶺」「消亡→海溝／造山」「保守→斷層」",
      "解釋俯衝時須提及大洋殼密度較大",
      "比較邊界須用表格：運動方向、地貌、災害",
      "香港題：強調位於板塊內部而非邊界",
    ],
    quizzes: [
      { q: "消亡邊界典型地貌組合是？", opts: ["海嶺與裂谷", "海溝與火山弧", "轉換斷層", "冰蝕谷"], ans: 1, explain: "俯衝形成海溝，上方地幔熔融形成火山弧。" },
      { q: "中大西洋海嶺屬於哪類邊界？", opts: ["張裂", "消亡", "保守", "熱點"], ans: 0, explain: "海嶺是張裂邊界，新洋殼在此產生。" },
      { q: "喜馬拉雅山形成於？", opts: ["大洋—大洋俯衝", "大陸—大陸碰撞", "張裂", "保守斷層"], ans: 1, explain: "印度板塊與歐亞板塊大陸碰撞，無法深俯衝而造山。" },
      { q: "聖安德烈亞斯斷層屬於？", opts: ["張裂", "消亡", "保守", "海嶺"], ans: 2, explain: "太平洋板塊與北美板塊水平擦過。" },
      { q: "香港位於哪個板塊？", opts: ["太平洋板塊", "歐亞板塊", "菲律賓板塊", "印度板塊"], ans: 1, explain: "香港地質穩定，位於歐亞板塊東南緣。" },
      { q: "大洋殼俯衝的主因是？", opts: ["顏色較深", "密度較大", "年齡較輕", "溫度較低"], ans: 1, explain: "玄武岩質大洋殼密度大於花崗岩質大陸殼。" },
      { q: "海底擴張的直接證據是？", opts: ["化石相似", "磁條帶對稱分布", "冰川擦痕", "河口三角洲"], ans: 1, explain: "海嶺兩側磁異常條帶對稱，記錄磁場倒轉與擴張。" },
      { q: "東非大裂谷是？", opts: ["張裂邊界", "消亡邊界", "保守邊界", "熱點僅有"], ans: 0, explain: "非洲板塊內部張裂，未來可能形成新海洋。" },
    ],
    matchItems: [
      { boundary: "張裂邊界", answer: "divergent", options: ["中大西洋海嶺、東非大裂谷", "馬里亞納海溝", "聖安德烈亞斯斷層"] },
      { boundary: "消亡邊界", answer: "convergent", options: ["紅海", "喜馬拉雅山、太平洋火環", "死海斷層"] },
      { boundary: "保守邊界", answer: "conservative", options: ["冰島裂谷", "日本海溝", "加州聖安德烈亞斯斷層"] },
    ],
  },

  rock_cycle: {
    meta: { num: "03", tag: "E1 · ~4 課時", hours: 4 },
    objectives: [
      "區分火成岩、沉積岩、變質岩的形成過程與特徵",
      "繪畫岩石循環圖並標示三大作用（火山、沉積、變質）",
      "舉出香港常見岩石例子並說明其地質意義",
      "解釋岩石循環與板塊構造、外營力的關係",
    ],
    guiding: ["岩石是如何形成的？", "三大岩類如何互相轉化？"],
    sections: [
      {
        title: "岩石循環是什麼？",
        body: `<p>岩石循環描述<strong>三大岩類</strong>如何透過地球內外營力不斷轉化。沒有任何岩石永遠不變——花崗岩可被風化變成沉積物，沉積岩可深埋變質，變質岩可熔融回到岩漿。</p>
        <p class="note">DSE 答題要點：循環圖須標示<strong>岩漿</strong>、<strong>三大岩類</strong>及<strong>風化／熔融／變質</strong>箭頭。</p>`,
      },
      {
        title: "三大岩類",
        body: `<table class="data-table">
          <tr><th>岩類</th><th>形成</th><th>特徵</th><th>香港例子</th></tr>
          <tr><td>火成岩</td><td>岩漿冷卻結晶</td><td>結晶顆粒粗細取決於冷卻速度</td><td>花崗岩（侵入）、玄武岩（噴出）</td></tr>
          <tr><td>沉積岩</td><td>沉積物壓實膠結</td><td>層理、可能含化石</td><td>赤柱、北角碎屑岩</td></tr>
          <tr><td>變質岩</td><td>高溫高壓重結晶</td><td>片理、礦物重組</td><td>大理岩（變質石灰岩）</td></tr>
        </table>`,
      },
      {
        title: "三大作用（內營力）",
        body: `<ul>
          <li><strong>火山作用</strong>：岩漿侵入或噴出 → 火成岩；包括冷卻結晶、重熔</li>
          <li><strong>沉積作用</strong>：風化侵蝕物搬運沉積 → 沉積岩；須經壓實、膠結</li>
          <li><strong>變質作用</strong>：深埋或構造擠壓 → 變質岩（<strong>不熔融</strong>）</li>
        </ul>
        <p><strong>外營力</strong>（風化、侵蝕、搬運）把任何岩類變成沉積物，是沉積岩的主要來源。</p>`,
      },
      {
        title: "侵入岩 vs 噴出岩",
        body: `<table class="data-table">
          <tr><th></th><th>侵入岩</th><th>噴出岩</th></tr>
          <tr><td>冷卻位置</td><td>地殼深處</td><td>地表或近地表</td></tr>
          <tr><td>冷卻速度</td><td>慢</td><td>快</td></tr>
          <tr><td>結晶</td><td>粗粒（如花崗岩）</td><td>細粒或玻璃質（如玄武岩）</td></tr>
          <tr><td>香港</td><td>花崗岩佔約 50% 面積</td><td>西貢玄武岩、凝灰岩</td></tr>
        </table>`,
      },
      {
        title: "常見考試陷阱",
        body: `<ul>
          <li>沉積岩<strong>不能</strong>直接變成火成岩，須先熔融成岩漿</li>
          <li>變質作用 ≠ 熔融：變質岩仍在固態</li>
          <li>大理岩是<strong>變質岩</strong>，不是沉積岩</li>
          <li>風化箭頭可連接任何岩類 → 沉積岩</li>
        </ul>`,
      },
    ],
    glossary: [
      { term: "岩漿", def: "地下熔融岩石物質；噴出地表稱熔岩" },
      { term: "層理", def: "沉積岩因沉積環境變化形成的層狀構造" },
      { term: "片理", def: "變質岩礦物定向排列形成的葉理構造" },
      { term: "膠結", def: "沉積物中礦物質將顆粒黏結成岩" },
    ],
    examTips: [
      "循環圖題：必標岩漿、三大岩類、風化/侵蝕/熔融箭頭",
      "香港岩石題：花崗岩=侵入火成岩，佔約一半面積",
      "區分變質與熔融：變質不達熔點",
    ],
    quizzes: [
      { q: "香港最常見岩石是？", opts: ["花崗岩", "石灰岩", "大理岩", "頁岩"], ans: 0, explain: "花崗岩屬侵入火成岩，約佔全港面積 50%。" },
      { q: "沉積岩的典型特徵是？", opts: ["片理", "層理", "粗粒結晶", "氣孔"], ans: 1, explain: "層理反映沉積時環境變化；氣孔多見於噴出火成岩。" },
      { q: "大理岩由何變質而成？", opts: ["花崗岩", "石灰岩", "砂岩", "頁岩"], ans: 1, explain: "石灰岩（沉積岩）經變質形成大理岩。" },
      { q: "玄武岩屬於？", opts: ["侵入火成岩", "噴出火成岩", "沉積岩", "變質岩"], ans: 1, explain: "玄武岩為熔岩快速冷卻形成的噴出火成岩。" },
      { q: "變質作用發生時岩石？", opts: ["完全熔融", "重結晶但未熔融", "僅風化碎裂", "溶解於水"], ans: 1, explain: "變質在高溫高壓下重結晶，未達熔點。" },
      { q: "風化作用在循環中的角色是？", opts: ["形成岩漿", "破壞岩石供沉積", "膠結沉積物", "俯衝入地幔"], ans: 1, explain: "風化產生碎屑，經搬運沉積。" },
      { q: "下列哪項正確描述岩石循環？", opts: ["沉積岩可直接冷卻成火成岩", "任何岩類可經風化進入沉積循環", "變質岩由岩漿直接冷卻形成", "火成岩不能變成變質岩"], ans: 1, explain: "風化是沉積岩的主要來源，適用於各岩類。" },
      { q: "花崗岩粗粒結晶主因是？", opts: ["地表快速冷卻", "地下緩慢冷卻", "沉積壓實", "接觸變質"], ans: 1, explain: "侵入岩於地下慢冷，結晶時間長。" },
    ],
    rockDetails: {
      igneous: { title: "火成岩", processes: ["岩漿上升", "冷卻結晶", "侵入或噴出"], hk: "花崗岩（大嶼山、新界）、火山岩（西貢粮船湾）" },
      sedimentary: { title: "沉積岩", processes: ["風化", "搬運", "沉積", "壓實膠結"], hk: "赤柱、北角碎屑沉積岩；元朗部分沉積層" },
      metamorphic: { title: "變質岩", processes: ["構造擠壓", "深埋", "重結晶"], hk: "局部接觸變質帶；大理岩為教材常例" },
    },
    sortExercise: {
      title: "三大岩類分類",
      prompt: "將下列岩石或描述放入正確岩類（點選後按「放入」）。",
      categories: [
        { id: "igneous", label: "火成岩" },
        { id: "sedimentary", label: "沉積岩" },
        { id: "metamorphic", label: "變質岩" },
      ],
      items: [
        { text: "花崗岩 — 粗粒結晶", category: "igneous" },
        { text: "玄武岩 — 細粒、可有氣孔", category: "igneous" },
        { text: "砂岩 — 層理、碎屑顆粒", category: "sedimentary" },
        { text: "石灰岩 — 可含化石", category: "sedimentary" },
        { text: "大理岩 — 石灰岩變質", category: "metamorphic" },
        { text: "片麻岩 — 片理構造", category: "metamorphic" },
        { text: "頁岩 — 層理明顯", category: "sedimentary" },
        { text: "凝灰岩 — 火山碎屑", category: "igneous" },
      ],
    },
    layerMatch: {
      title: "循環過程配對",
      prompt: "為每項過程選擇最合理的轉化結果（DSE 循環圖必備）。",
      choices: [
        { id: "igneous", label: "火成岩" },
        { id: "sedimentary", label: "沉積岩" },
        { id: "metamorphic", label: "變質岩" },
        { id: "magma", label: "岩漿" },
      ],
      items: [
        { label: "岩漿冷卻結晶", answer: "igneous" },
        { label: "石灰岩受熱壓變質", answer: "metamorphic" },
        { label: "砂岩風化後重新沉積仍屬", answer: "sedimentary" },
        { label: "變質岩在深處熔融", answer: "magma" },
        { label: "熔岩快速冷卻形成", answer: "igneous" },
        { label: "沉積岩深埋、重結晶但未熔融 →", answer: "metamorphic" },
      ],
    },
  },

  hk_geology: {
    meta: { num: "04", tag: "E1 Topic 2 · ~6 課時", hours: 6 },
    objectives: [
      "描述香港主要岩石類型、地質年代及空間分布",
      "解釋褶曲、斷層等構造特徵",
      "運用地形圖與地質資料解讀香港地貌",
      "關聯板塊活動與香港地質歷史",
    ],
    guiding: ["香港的一般地貌與地質是怎樣的？", "主要岩石類型如何分布？"],
    sections: [
      {
        title: "香港岩石分布概覽",
        body: `<p>香港約 <strong>1,108 km²</strong>，最高點<strong>大帽山 957 m</strong>。岩石以三大類為主：</p>
        <ul>
          <li><strong>花崗岩</strong>（~50%）：新界北部、大嶼山、南丫島等</li>
          <li><strong>火山岩</strong>（~15%）：西貢火山岩區，白堊紀末超級火山遺跡</li>
          <li><strong>沉積岩</strong>（~35%）：赤柱、北角、元朗部分</li>
        </ul>`,
      },
      {
        title: "地質構造",
        body: `<p><strong>褶曲 Folds</strong>：岩層受擠壓彎曲；背斜（老岩層在中）、向斜（新岩層在中）。<br>
        <strong>斷層 Faults</strong>：岩層破裂並位移；香港著名<strong>赤門斷層</strong>分隔新界與九龍不同岩性。<br>
        <strong>節理 Joints</strong>：無明顯位移的破裂，影響風化與斜坡穩定。</p>`,
      },
      {
        title: "地貌格局",
        body: `<p>新界及西貢多高地；維港兩岸為低地及填海區。海岸線曲折，多海灣與岬角。花崗岩區常見球狀風化、蜂窩狀地貌。</p>`,
      },
      {
        title: "地質歷史簡述",
        body: `<p>由泥盆紀至白堊紀的沉積、侏羅紀—白堊紀岩漿活動、白堊紀末西貢大火山噴發，至第四紀風化侵蝕塑造現貌。DSE 重點在<strong>空間分布</strong>與<strong>岩石—地貌關係</strong>。</p>`,
      },
    ],
    glossary: [
      { term: "赤門斷層", def: "分隔新界花崗岩與九龍—香港島不同地質單元的重要斷層" },
      { term: "粮船湾", def: "西貢火山岩區，含破火山口及凝灰岩" },
      { term: "球狀風化", def: "花崗岩沿節理風化形成圓球狀核心露頭" },
      { term: "hypsometric tinting", def: "按海拔著色顯示地形（本模組 DEM 色階）" },
    ],
    examTips: [
      "分布題：須分區描述（新界/九龍/離島）",
      "地質圖例：熟讀花崗岩、沉積岩、火山岩符號",
      "構造題：區分褶曲與斷層的成因與外觀",
    ],
    quizzes: [
      { q: "香港最高山峰是？", opts: ["大帽山", "鳳凰山", "大東山", "馬鞍山"], ans: 0, explain: "大帽山 957 m，位於荃灣。" },
      { q: "西貢粮船湾以何著稱？", opts: ["石灰岩洞穴", "白堊紀火山岩", "冰川槽谷", "珊瑚礁"], ans: 1, explain: "粮船湾屬白堊紀末火山岩區。" },
      { q: "赤門斷層屬於？", opts: ["褶曲", "斷層", "節理", "海蝕崖"], ans: 1, explain: "赤門斷層為岩層破裂位移的斷層。" },
      { q: "香港面積最大的岩石類型是？", opts: ["沉積岩", "火山岩", "花崗岩", "變質岩"], ans: 2, explain: "花崗岩約佔 50%。" },
      { q: "背斜中央通常出露？", opts: ["最年輕岩層", "最年老岩層", "熔岩", "冰川沉積"], ans: 1, explain: "侵蝕後背斜核部常出露老岩層。" },
    ],
    mapSites: [
      { id: "granite", name: "花崗岩區", areas: "大嶼山、新界北部", pct: 50 },
      { id: "volcanic", name: "火山岩區", areas: "西貢、粮船湾", pct: 15 },
      { id: "sediment", name: "沉積岩區", areas: "赤柱、北角、元朗", pct: 35 },
    ],
  },

  landform_processes: {
    meta: { num: "05", tag: "E1 Topic 3 · ~4 課時", hours: 4 },
    objectives: [
      "區分內營力與外營力及其塑造地貌的方式",
      "解釋褶皺、斷層、火山作用如何改變香港地形",
      "分析風化、侵蝕、搬運、沉積在外營力中的角色",
      "評估城市化（填海、削坡）對地貌的人為影響",
    ],
    guiding: ["內營力與外營力如何塑造香港？"],
    sections: [
      {
        title: "內營力 Internal forces",
        body: `<ul>
          <li><strong>造山運動</strong>：板塊碰撞抬升（如喜馬拉雅；香港古代岩漿活動）</li>
          <li><strong>褶皺與斷層</strong>：擠壓形成褶曲；超過彈性極限產生斷層</li>
          <li><strong>火山作用</strong>：西貢古代火山噴發堆積熔岩與凝灰岩</li>
          <li><strong>地震</strong>：斷層錯動釋放能量（香港本地風險低）</li>
        </ul>`,
      },
      {
        title: "外營力 External forces",
        body: `<ul>
          <li><strong>風化</strong>：物理（凍融、鹽晶）與化學（酸雨溶蝕花崗岩）</li>
          <li><strong>侵蝕</strong>：流水、海浪、重力侵蝕</li>
          <li><strong>搬運與沉積</strong>：形成沖積扇、三角洲、沙灘</li>
          <li><strong>塊體運動</strong>：山泥傾瀉、落石（香港雨季重點）</li>
        </ul>`,
      },
      {
        title: "人為營力",
        body: `<p><strong>填海</strong>：維港兩岸、將軍澳、赤鱲角；改變海岸線。<br>
        <strong>削坡</strong>：發展斜坡住宅；不當工程引致滑坡。<br>
        <strong>採石</strong>：昔日岩洞（如鯉魚門）改變局部地形。</p>`,
      },
    ],
    glossary: [
      { term: "差異侵蝕", def: "軟硬岩層抗蝕力不同形成起伏地形" },
      { term: "海蝕地貌", def: "海浪侵蝕形成海蝕崖、海蝕平台" },
      { term: "沖積扇", def: "山麓河谷出口堆積的扇形沉積" },
    ],
    examTips: [
      "比較題：內營力抬升 vs 外營力削低 — 須舉香港例子",
      "人為影響題：填海、削坡各舉一例",
    ],
    quizzes: [
      { q: "球狀風化主要與哪類岩石有關？", opts: ["頁岩", "花崗岩", "石灰岩", "玄武岩"], ans: 1, explain: "花崗岩節理發達，易形成球狀風化。" },
      { q: "以下屬外營力的是？", opts: ["斷層錯動", "河流侵蝕", "岩漿侵入", "板塊俯衝"], ans: 1, explain: "河流侵蝕屬外營力削低地形。" },
      { q: "將軍澳新市鎮主要人為地貌改變是？", opts: ["火山噴發", "填海造地", "冰川刨蝕", "風成沙丘"], ans: 1, explain: "將軍澳大量填海發展。" },
      { q: "褶皺形成的主因是？", opts: ["河流沖刷", "岩層受水平擠壓", "風化崩解", "珊瑚生長"], ans: 1, explain: "構造擠壓使岩層彎曲。" },
    ],
    scenarios: [
      { name: "荃灣—大帽山", internal: 70, external: 60, urban: 40, note: "花崗岩高地經風化侵蝕；山麓城市發展" },
      { name: "維港兩岸", internal: 20, external: 30, urban: 90, note: "大幅填海；天然海岸線改變" },
      { name: "西貢火山岩區", internal: 85, external: 55, urban: 25, note: "古代火山（內營力）+ 現代侵蝕海岸" },
    ],
    sortExercise: {
      title: "營力分類",
      prompt: "將下列地貌作用分類為內營力、外營力或人為營力",
      categories: [
        { id: "internal", label: "內營力" },
        { id: "external", label: "外營力" },
        { id: "human", label: "人為營力" },
      ],
      items: [
        { text: "西貢火山噴發", category: "internal" },
        { text: "岩層褶皺", category: "internal" },
        { text: "斷層錯動", category: "internal" },
        { text: "球狀風化", category: "external" },
        { text: "海浪侵蝕", category: "external" },
        { text: "河流搬運泥沙", category: "external" },
        { text: "山泥傾瀉", category: "external" },
        { text: "維港填海", category: "human" },
        { text: "削坡建屋", category: "human" },
        { text: "採石場開採", category: "human" },
      ],
    },
    examEssays: [
      {
        title: "比較內營力與外營力",
        marks: 8,
        question: "比較內營力與外營力塑造香港地貌的方式，並各舉一個本地例子。（8分）",
        markScheme: `<p>須有<strong>對比</strong>：內營力（抬升、火山、褶皺）vs 外營力（風化、侵蝕、沉積）。例子如西貢火山岩柱（內）與東平洲海蝕地貌（外）。</p>`,
      },
      {
        title: "評估人為營力",
        marks: 6,
        question: "評估填海對香港地貌與環境的影響。（6分）",
        markScheme: `<p>雙面：土地供應、基建（利）vs 收窄維港、生態、水質（弊）+ 緩解（EIA）。</p>`,
      },
    ],
  },

  tectonic_hazards: {
    meta: { num: "06", tag: "必修 C1 · ~6 課時", hours: 6 },
    objectives: [
      "解釋地震、火山、海嘯的成因與全球分布",
      "區分震源、震央、里氏規模與烈度",
      "說明熱點火山為何可遠離板塊邊界",
      "評估監測、預警與減災策略",
    ],
    guiding: ["板塊運動如何引致地震、火山及海嘯？", "為何有些震帶遠離板塊邊界？"],
    sections: [
      {
        title: "地震 Earthquakes",
        body: `<p>岩層沿斷層<strong>突然錯動</strong>釋放彈性應變能，產生地震波。</p>
        <ul>
          <li><strong>震源</strong>：地下破裂起始點（焦點）</li>
          <li><strong>震央</strong>：震源正上方地表點</li>
          <li><strong>里氏規模</strong>：能量量度（對數，每增 1 級能量約 ×32）</li>
          <li><strong>烈度</strong>：某地實際破壞程度（受震源深度、距離、建築影響）</li>
        </ul>
        <p>深源地震多與<strong>俯衝帶</strong>有關；淺源地震破壞最大。</p>`,
      },
      {
        title: "火山 Volcanoes",
        body: `<p>多沿<strong>消亡邊界</strong>（俯衝熔融）及<strong>張裂邊界</strong>分布。類型：</p>
        <ul>
          <li><strong>盾狀火山</strong>：玄武岩質，緩坡（夏威夷）</li>
          <li><strong>複式火山</strong>：安山岩質，劇烈爆發（富士山、皮納圖博）</li>
        </ul>`,
      },
      {
        title: "海嘯 Tsunami",
        body: `<p>海底地震、火山崩塌或滑坡使海水垂直位移，產生長波長淺水波。近岸時波高劇增。<strong>2011 年東日本大海嘯</strong>為經典案例。</p>`,
      },
      {
        title: "熱點 Hot spots",
        body: `<p>地幔深處<strong>固定岩漿柱</strong>灼穿移動板塊。火山隨板塊漂移形成<strong>鏈狀</strong>（夏威夷—皇帝海山鏈）。解釋板塊內部火山。</p>`,
      },
    ],
    glossary: [
      { term: "環太平洋地震帶", def: "環繞太平洋的板塊邊界地震集中區" },
      { term: "P 波／S 波", def: "體波；P 波較快，S 波僅通過固體" },
      { term: "火山灰", def: "噴發碎屑，影響航空與氣候" },
    ],
    examTips: [
      "震源≠震央：一個在地下，一個在地表",
      "夏威夷題：必答熱點，非板塊邊界",
      "減災題：監測、建築標準、海嘯預警、公眾教育",
    ],
    quizzes: [
      { q: "夏威夷火山遠離板塊邊界因？", opts: ["張裂邊界", "熱點", "海嘯", "冰川"], ans: 1, explain: "太平洋板塊經過固定熱點上方。" },
      { q: "深源地震多見於？", opts: ["海嶺", "俯衝帶", "轉換斷層", "克拉通內部"], ans: 1, explain: "俯衝板塊深入地幔，震源可達 700 km。" },
      { q: "里氏 7 級比 6 級能量約？", opts: ["多 2 倍", "多 10 倍", "多 32 倍", "相同"], ans: 2, explain: "每增 1 級能量約增 32 倍（對數尺度）。" },
      { q: "海嘯主要由何觸發？", opts: ["潮汐", "海底地震垂直位移", "颱風", "河流洪水"], ans: 1, explain: "海底突然升降推動海水。" },
      { q: "香港本地地震風險？", opts: ["極高", "較低", "與日本相同", "每日必有"], ans: 1, explain: "遠離主要板塊邊界，風險低。" },
      { q: "複式火山通常？", opts: ["僅噴溢玄武岩", "爆炸性噴發與安山岩", "無地震", "僅位於海嶺"], ans: 1, explain: "安山岩質黏度高，易堵塞氣體導致劇烈爆發。" },
    ],
    hazardCases: [
      { name: "2011 東日本", type: "地震+海嘯", mag: "M9.0", lesson: "海嘯牆、核電站選址、預警系統" },
      { name: "1991 皮納圖博", type: "火山", mag: "VEI 6", lesson: "火山灰影響全球氣溫與航空" },
      { name: "2008 四川汶川", type: "地震", mag: "M8.0", lesson: "逆衝斷層；建築抗震標準" },
    ],
  },

  geo_management: {
    meta: { num: "07", tag: "E1 Topic 4 · ~6 課時", hours: 6 },
    objectives: [
      "分析香港填海工程對物料來源、海洋生態及海岸線的影響",
      "解釋山泥傾瀉的自然與人為成因，並引用本地歷史個案",
      "描述政府斜坡管理系統（註冊、巡查、鞏固、法規）",
      "從多角度評估持份者對填海與斜坡議題的立場",
      "引用 DSE 指定個案：赤鱲角填海、深灣山泥傾瀉，並延伸至寶珊道、秀茂坪等",
      "建議可持續的地質資源與災害管理策略",
    ],
    guiding: [
      "人們如何管理香港的地質資源與地質災害？",
      "填海物料從何而來？對環境有何影響？",
      "1972 年深灣事件如何改變香港的斜坡政策？",
    ],
    sections: [
      {
        title: "地質資源：填海物料",
        body: `<p>香港土地短缺，<strong>填海</strong>是重要土地來源。大型工程需數千萬至數億立方米填料。</p>
        <table class="data-table">
          <tr><th>來源</th><th>說明</th><th>優點</th><th>問題</th></tr>
          <tr><td>海域挖泥</td><td>從海床抽取沉積物</td><td>就近供應、成本較低</td><td>擾動海床、濁度、影響海洋生物</td></tr>
          <tr><td>公眾填土區</td><td>接收合規建築廢料、碎石</td><td>廢物循環</td><td>須嚴格檢測污染物</td></tr>
          <tr><td>石礦場</td><td>屯門藍地等（多已關閉）</td><td>高質素碎石</td><td>視覺污染、生態破壞</td></tr>
          <tr><td>進口砂石</td><td>外地輸入</td><td>減少本地開採</td><td>成本、碳足跡</td></tr>
        </table>
        <p class="note">DSE 答題框架：<strong>來源 → 影響（生態／水質／景觀）→ 緩解（EIA、監測、選址）→ 持份者</strong></p>`,
      },
      {
        title: "個案深度：赤鱲角填海（機場核心計劃）",
        body: `<p><strong>背景</strong>：1991 年公布機場核心計劃，在大嶼山以北填海興建赤鱲角國際機場，並建連接路軌。</p>
        <ul>
          <li><strong>填料規模</strong>：約 2.5 億 m³（為本港最大填海工程之一）</li>
          <li><strong>主要工序</strong>：海域挖泥、淤泥處理、裝載、填築、碾壓</li>
          <li><strong>生態關注</strong>：中華白海豚棲息地、魚類產卵場、水質濁度</li>
          <li><strong>緩解措施</strong>：環境影響評估（EIA）、挖泥區遷離敏感水域、浊度實時監測、魚類增殖放流、噪音管制</li>
          <li><strong>社會效益</strong>：國際航空樞紐、就業、連接離島與市區</li>
        </ul>
        <p><strong>持份者</strong>：政府（基建）、航空公司（運力）、環保團體（海豚）、漁民（漁場）、大嶼山居民（發展與噪音）。</p>`,
      },
      {
        title: "個案深度：深灣道山泥傾瀉（1972.6.18）",
        body: `<p><strong>背景</strong>：連日暴雨（日雨量可逾 400 mm）後，港島半山深灣道山坡大規模崩塌。</p>
        <ul>
          <li><strong>成因</strong>：陡峭地形 + 超量雨水入滲 + 當時斜坡工程標準不足 + 部分不當開發</li>
          <li><strong>影響</strong>：重大人命傷亡、樓宇損毀、交通癱瘓、社會震驚</li>
          <li><strong>制度回應</strong>：
            <ul>
              <li>1977 年成立土力工程處（岩土工程管理基礎）</li>
              <li>《建築物（斜坡）規例》— 新建斜坡須合規設計</li>
              <li>全港斜坡調查與<strong>註冊制度</strong></li>
              <li>定期巡查、維修計劃、公眾教育（Slope Safety）</li>
            </ul>
          </li>
        </ul>
        <p class="note">考試要點：此事件是「<strong>人災</strong>」催化政策改革的經典例子 — 須寫「事件→問題→措施」。</p>`,
      },
      {
        title: "其他重要山泥傾瀉個案",
        body: `<table class="data-table">
          <tr><th>年份</th><th>地點</th><th>要點</th></tr>
          <tr><td>1972</td><td>深灣道</td><td>促成斜坡監管體系</td></tr>
          <tr><td>1976</td><td>秀茂坪</td><td>削坡建屋、排水不良</td></tr>
          <tr><td>1994</td><td>寶珊道</td><td>暴雨觸發；加強排水標準</td></tr>
          <tr><td>2008</td><td>馬鞍山／多區</td><td>極端暴雨；提醒氣候風險</td></tr>
        </table>
        <p><strong>自然成因</strong>：暴雨、陡峭地形、風化岩層、地質構造弱面。<br>
        <strong>人為成因</strong>：削坡、填土超載、排水系統失靈、違例發展、移除植被。</p>`,
      },
      {
        title: "斜坡管理系統（現行）",
        body: `<p>全港約 <strong>60,000</strong> 個註冊斜坡，由屋宇署、土木工程拓展署等管理。</p>
        <ul>
          <li><strong>岩土勘探</strong>：鑽探、實驗室測試、穩定性分析</li>
          <li><strong>工程鞏固</strong>：排水溝、暗渠、擋土牆、岩釘、噴漿護坡</li>
          <li><strong>監察</strong>：每年雨季前巡查；紅黃警示與居民疏散</li>
          <li><strong>規劃</strong>：限制在極高風險斜坡興建；發展必須附岩土報告</li>
          <li><strong>公眾參與</strong>：「Slope Safety」網站查斜坡編號、報告危險</li>
        </ul>`,
      },
      {
        title: "法規與政策工具",
        body: `<ul>
          <li><strong>《建築物（斜坡）規例》</strong> — 斜坡設計與建造標準</li>
          <li><strong>《環境影響評估條例》</strong> — 大型填海須 EIA 及公眾諮詢</li>
          <li><strong>城市規劃</strong> — 土地用途與海岸線管理</li>
          <li><strong>暴雨警告</strong> — 與斜坡安全警告聯動</li>
        </ul>`,
      },
      {
        title: "持份者多角度分析",
        body: `<table class="data-table">
          <tr><th>持份者</th><th>填海議題</th><th>斜坡／山泥傾瀉</th></tr>
          <tr><td>政府</td><td>土地供應、國際競爭力、基建</td><td>公共安全、法規、工程撥款</td></tr>
          <tr><td>發展商</td><td>土地成本、項目工期</td><td>斜坡工程增加成本</td></tr>
          <tr><td>環保團體</td><td>海豚、水質、海岸生態</td><td>保護自然斜坡植被</td></tr>
          <tr><td>居民</td><td>噪音、景觀、樓價</td><td>安全、保險、疏散不便</td></tr>
          <tr><td>漁民／漁業</td><td>漁場消失、捕撈減少</td><td>—</td></tr>
          <tr><td>工程師</td><td>技術標準、監測</td><td>岩土設計、安全係數</td></tr>
        </table>`,
      },
    ],
    glossary: [
      { term: "EIA", def: "環境影響評估；法定程序，評估工程對環境的影響並提出緩解" },
      { term: "註冊斜坡", def: "政府紀錄在冊、須定期檢查維修的斜坡" },
      { term: "岩土工程", def: "研究土石力學，評估斜坡穩定性與設計鞏固工程" },
      { term: "公眾填土區", def: "接收合規拆建物料作填海／填地的指定場所" },
      { term: "浊度", def: "水中懸浮粒子濃度；挖泥時影響海洋生物" },
      { term: "安全系數", def: "斜坡抗滑力與滑動力之比；須大於法規要求" },
      { term: "節理", def: "岩層破裂面；影響風化與滑坡潛勢" },
      { term: "人災", def: "人類活動加劇或觸發的自然災害（如削坡致滑坡）" },
    ],
    examTips: [
      "赤鱲角個案結構：背景→填料來源→環境影響（海豚、水質）→緩解→持份者→結論",
      "深灣個案結構：暴雨成因→影響→政策改革（土力處、斜坡規例、註冊制度）",
      "比較題：自然 vs 人為滑坡成因 — 須各舉香港例子",
      "評估題：填海利弊 — 不可單邊；須平衡發展與保育",
      "數據題：記得 60,000 註冊斜坡、2.5 億 m³ 機場填料（約數即可）",
      "圖像題：識別削坡、擋土牆、排水渠、填海界線",
    ],
    quizzes: [
      { q: "以下哪項不是預防山泥傾瀉措施？", opts: ["定期檢查註冊斜坡", "限制高危斜坡發展", "清除所有植被減輕重量", "改善排水系統"], ans: 2, explain: "植被根系固土；清除會增加侵蝕與滑坡風險。" },
      { q: "赤鱲角填海主要填料來源包括？", opts: ["僅進口砂石", "海域挖泥與合規公眾填料", "火山灰", "冰川沉積"], ans: 1, explain: "本港大型填海以海域挖泥及公眾填土區為主。" },
      { q: "深灣 1972 事件的主要歷史意義？", opts: ["促成機場建設", "推動斜坡監管與法規改革", "廢除所有填海", "引進地震預警"], ans: 1, explain: "直接促成土力工程處及斜坡規例。" },
      { q: "全港註冊斜坡約？", opts: ["600", "6,000", "60,000", "600,000"], ans: 2, explain: "約六萬個斜坡納入管理。" },
      { q: "大型填海工程通常須？", opts: ["無需審批", "環境影響評估", "聯合國批准", "居民投票"], ans: 1, explain: "屬指定工程項目，須 EIA。" },
      { q: "秀茂坪 1976 滑坡凸顯？", opts: ["板塊邊界", "削坡建屋與排水問題", "海嘯", "火山"], ans: 1, explain: "人為改變斜坡加劇風險。" },
      { q: "填海對中華白海豚的主要威脅？", opts: ["空氣污染", "棲息地減少與挖泥噪音", "地震", "酸雨"], ans: 1, explain: "海域工程影響海豚活動與漁場。" },
      { q: "《建築物（斜坡）規例》主要規管？", opts: ["機場跑道", "斜坡設計與建造", "港鐵票價", "學校課程"], ans: 1, explain: "確保新建斜坡符合安全標準。" },
      { q: "人為觸發滑坡的例子？", opts: ["板塊俯衝", "削坡超載", "海嶺擴張", "熱點火山"], ans: 1, explain: "削坡、填土、排水不良屬人為因素。" },
      { q: "暴雨警告與斜坡安全的關係？", opts: ["無關", "暴雨期間加強巡查與疏散", "取消所有工程", "只影響離島"], ans: 1, explain: "雨季是滑坡高風險期。" },
      { q: "公眾填土區的主要功能？", opts: ["游泳", "接收合規填料", "種植水稻", "採礦"], ans: 1, explain: "循環建築廢料作填海填料。" },
      { q: "寶珊道 1994 事件後加強？", opts: ["填海面積", "排水與岩土標準", "火山監測", "颱風命名"], ans: 1, explain: "促使檢討排水設計。" },
    ],
    stakeholderExercise: {
      stakeholders: [
        { name: "政府" },
        { name: "環保團體" },
        { name: "發展商" },
        { name: "居民" },
      ],
      statements: [
        { text: "填海可提供土地支持經濟，但須嚴格環評", stakeholder: 0 },
        { text: "挖泥濁度威脅中華白海豚，應縮小工程規模", stakeholder: 1 },
        { text: "斜坡鞏固工程增加樓盤成本，但可減少法律風險", stakeholder: 2 },
        { text: "擔心暴雨期間半山斜坡安全，要求政府巡查", stakeholder: 3 },
        { text: "反對在敏感漁場附近進行大規模挖泥", stakeholder: 1 },
        { text: "支持機場擴建以巩固航空樞紐地位", stakeholder: 0 },
      ],
    },
    sortExercise: {
      title: "成因分類：自然 vs 人為",
      prompt: "將下列山泥傾瀉成因因子分類（點選後按「放入」按鈕）",
      categories: [
        { id: "natural", label: "自然因素" },
        { id: "human", label: "人為因素" },
      ],
      items: [
        { text: "連日暴雨", category: "natural" },
        { text: "陡峭山坡地形", category: "natural" },
        { text: "風化花崗岩", category: "natural" },
        { text: "削坡建屋", category: "human" },
        { text: "排水渠堵塞", category: "human" },
        { text: "填土超載", category: "human" },
        { text: "節理面弱面", category: "natural" },
        { text: "違例發展", category: "human" },
      ],
    },
    examEssays: [
      {
        title: "資料回應：赤鱲角填海",
        marks: 8,
        question: "根據你對香港國際機場填海工程的認識，說明 (a) 填海物料的主要來源（3分）；(b) 兩項環境影響及緩解措施（5分）。",
        data: "<p><em>提示：答案須提及海域挖泥、公眾填料；影響可寫海豚、水質浊度；緩解寫 EIA、監測、放流等。</em></p>",
        markScheme: `<ol>
          <li><strong>(a) 3分</strong>：海域挖泥（1）+ 公眾填土區建築廢料／碎石（1）+ 簡述工序或規模（1）</li>
          <li><strong>(b) 5分</strong>：每項影響+緩解各約 2–3 分。例：海豚棲息干擾→挖泥區選址、噪音管制；水質浊度→實時監測、控制排放</li>
        </ol>`,
      },
      {
        title: "論述：深灣事件與政策",
        marks: 10,
        question: "解釋 1972 年深灣道山泥傾瀉事件如何影響香港的地質災害管理政策。（10分）",
        markScheme: `<ul>
          <li><strong>事件描述（2–3分）</strong>：暴雨、半山滑坡、傷亡</li>
          <li><strong>暴露問題（2–3分）</strong>：標準不足、監管缺失、人為開發</li>
          <li><strong>政策改革（4–5分）</strong>：土力工程處、斜坡規例、註冊制度、巡查維修、公眾教育 — 至少述說三項</li>
        </ul>`,
      },
      {
        title: "評估：填海利弊",
        marks: 6,
        question: "評估填海作為香港土地供應方式的利弊。（6分）",
        markScheme: `<p>須有<strong>雙面論證</strong>：利（土地、基建、經濟）／弊（生態、漁業、景觀、碳足跡）+ 簡短結論或緩解建議。</p>`,
      },
    ],
    cases: {
      airport: {
        title: "赤鱲角填海 · 香港國際機場",
        timeline: [
          "1989 東涌及機場選址研究",
          "1991 機場核心計劃公布",
          "1992–97 大規模海域挖泥與填築",
          "1997 香港回歸；工程持續",
          "1998 新機場啟用",
          "持續監測白海豚與水質",
        ],
        impacts: ["海床擾動約數億立方米", "中華白海豚棲息地縮減", "水質浊度上升", "大嶼山北岸海岸線完全改變", "航空業及就業效益"],
        mitigation: ["法定 EIA 及環境監察", "挖泥區遷離敏感水域", "浊度實時監測", "魚類增殖放流", "噪音與交通配套管制"],
        stakeholders: "政府、機場管理局、環保團體、漁民、大嶼山居民",
      },
      shamwan: {
        title: "深灣山泥傾瀉 · 1972.6.18",
        timeline: [
          "6月16–18日連場暴雨",
          "6月18日深灣道山坡崩塌",
          "大量泥石沖擊下游建築",
          "社會廣泛關注斜坡安全",
          "1977 土力工程處成立",
          "斜坡規例與註冊制度逐步建立",
        ],
        impacts: ["重大人命傷亡", "樓宇損毀", "交通癱瘓", "公眾對政府監管信心動搖"],
        mitigation: ["全面斜坡普查", "註冊與定期檢查", "岩土工程評估", "工程鞏固撥款", "Slope Safety 公眾教育"],
        stakeholders: "政府、受災居民、工程界、媒體、保險業",
      },
      slope: {
        title: "斜坡管理系統 · 現行框架",
        timeline: [
          "1977 土力工程處成立",
          "1980s 斜坡目錄建立",
          "1990s 系統化巡查與維修",
          "2000s 數碼化斜坡資料庫",
          "持續雨季安全警告",
        ],
        impacts: ["顯著降低人為滑坡死亡", "發展成本增加", "部分高危區發展受限"],
        mitigation: ["岩釘、擋土牆、排水", "紅黃警示與疏散", "限制高危斜坡建屋", "市民舉報渠道"],
        stakeholders: "土木工程拓展署、屋宇署、業主、居民、保險公司",
      },
      resource: {
        title: "地質資源 · 填料與石礦",
        timeline: [
          "1950s–80s 本港石礦場供應碎石（屯門藍地等）",
          "大型填海轉向海域挖泥及公眾填土區",
          "多個石礦場關閉，改復育或發展",
          "部分填料改由外地輸入",
          "須平衡供應、成本與環境影響",
        ],
        impacts: ["礦場開採破壞山體與植被", "噪音與塵埃影響鄰近社區", "關閉後改變填料供應鏈", "進口砂石增加碳足跡"],
        mitigation: ["復育計劃與綠化", "公眾填土區循環建築廢料", "海域挖泥須環評及監測", "規劃遠離敏感受體的採礦區"],
        stakeholders: "政府、承建商、環保團體、鄰近居民、填海工程方",
      },
    },
  },
};
