import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function panel(label, lines) {
  const body = lines
    .map(
      (line, index) =>
        `<text x="20" y="${52 + index * 28}" font-size="16" fill="#0f172a">${escapeXml(line)}</text>`
    )
    .join("");
  const height = Math.max(180, 40 + lines.length * 28);
  return `<svg viewBox="0 0 360 ${height}" role="img" aria-label="${escapeXml(label)}"><rect width="360" height="${height}" rx="12" fill="#f8fafc"/><text x="20" y="28" font-size="13" fill="#047857">${escapeXml(label)}</text>${body}</svg>`;
}

function flow(label, steps) {
  const height = 28 + steps.length * 40;
  const body = steps
    .map((step, index) => {
      const y = 40 + index * 40;
      const arrow =
        index < steps.length - 1
          ? `<line x1="28" y1="${y + 22}" x2="28" y2="${y + 36}" stroke="#059669" stroke-width="2"/>`
          : "";
      return `<circle cx="28" cy="${y + 8}" r="8" fill="#047857"/><text x="46" y="${y + 13}" font-size="15" fill="#0f172a">${escapeXml(step)}</text>${arrow}`;
    })
    .join("");
  return `<svg viewBox="0 0 360 ${height}" role="img" aria-label="${escapeXml(label)}"><rect width="360" height="${height}" rx="12" fill="#f8fafc"/><text x="16" y="22" font-size="13" fill="#047857">${escapeXml(label)}</text>${body}</svg>`;
}

function swatch(fill, label) {
  return `<svg viewBox="0 0 360 150" role="img" aria-label="${escapeXml(label)}"><rect width="360" height="150" rx="12" fill="#f8fafc"/><rect x="120" y="28" width="120" height="78" rx="14" fill="${fill}" stroke="#334155"/><text x="180" y="132" text-anchor="middle" font-size="14" fill="#0f172a">${escapeXml(label)}</text></svg>`;
}

const bilayer = `<svg viewBox="0 0 360 180" role="img" aria-label="磷脂雙層"><rect width="360" height="180" fill="#f8fafc"/><rect x="24" y="36" width="312" height="26" rx="8" fill="#38bdf8"/><rect x="24" y="112" width="312" height="26" rx="8" fill="#38bdf8"/><text x="180" y="54" text-anchor="middle" font-size="13" fill="#0f172a">親水頭 hydrophilic heads · 朝向水</text><text x="180" y="130" text-anchor="middle" font-size="13" fill="#0f172a">親水頭 · 膜的另一側</text><text x="180" y="92" text-anchor="middle" font-size="13" fill="#334155">疏水尾 hydrophobic tails · 藏在雙層內部</text></svg>`;

const foodTable = {
  "starch|iodine": ["#1e1b4b", "藍黑色", "正確。澱粉遇碘液呈藍黑色，因為碘進入澱粉的螺旋結構。這就是本任務要的正結果。", true],
  "glucose|benedict": ["#b91c1c", "磚紅色", "加熱後呈磚紅色，是還原糖（葡萄糖）的正結果。任務要的是澱粉：改用澱粉溶液加碘液。", false],
  "sucrose|benedict": ["#2563eb", "仍是藍色", "蔗糖是非還原糖。沒有先水解的話，加熱後本立德試劑仍呈藍色。", false],
  "starch|benedict": ["#2563eb", "仍是藍色", "澱粉不是還原糖，本立德試劑加熱後仍呈藍色。測澱粉要用碘液。", false],
  "protein|biuret": ["#7e22ce", "紫色", "雙縮脲試劑遇蛋白質（肽鍵）呈紫色。這不是澱粉測試。", false],
  "lipid|ethanol": ["#e5e7eb", "乳濁液", "脂質溶於乙醇，加水後形成乳濁液。這是脂質正結果，不是澱粉。", false],
  "glucose|iodine": ["#b45309", "棕黃色", "沒有澱粉時碘液保持棕黃色。葡萄糖不會變成藍黑色。", false],
  "protein|iodine": ["#b45309", "棕黃色", "蛋白質不是澱粉，碘液不會呈藍黑色。", false],
  "lipid|iodine": ["#b45309", "棕黃色", "脂質不是澱粉，碘液不會呈藍黑色。", false],
  "sucrose|iodine": ["#b45309", "棕黃色", "蔗糖不是澱粉，碘液保持棕黃色。", false]
};

const reagentNote = {
  iodine: "碘液只在遇到澱粉時呈藍黑色，否則保持棕黃色。",
  benedict: "本立德試劑要加熱，用來測還原糖。葡萄糖呈磚紅色；蔗糖和澱粉不是還原糖，溶液保持藍色。",
  biuret: "雙縮脲試劑測蛋白質的肽鍵，正結果呈紫色。糖和脂質不會出現這個正結果。",
  ethanol: "乙醇乳化試驗測脂質：脂質先溶於乙醇，加水後變乳濁。糖和蛋白質不會形成這個乳濁液。"
};

const foods = [
  ["starch", "澱粉溶液 starch"],
  ["glucose", "葡萄糖溶液 glucose"],
  ["sucrose", "蔗糖溶液 sucrose"],
  ["protein", "蛋白質溶液 protein"],
  ["lipid", "植物油 lipid"]
];
const reagents = [
  ["iodine", "碘液 iodine solution"],
  ["benedict", "本立德試劑 Benedict’s（概念上要加熱）"],
  ["biuret", "雙縮脲試劑 Biuret"],
  ["ethanol", "乙醇，其後加水 ethanol emulsion"]
];

const foodCases = [];
for (const [food] of foods) {
  for (const [reagent] of reagents) {
    const key = food + "|" + reagent;
    const special = foodTable[key];
    if (special) {
      foodCases.push({
        when: { food, reagent },
        ok: special[3],
        svg: swatch(special[0], special[1]),
        caption: special[1],
        feedback: special[2]
      });
    } else {
      foodCases.push({
        when: { food, reagent },
        ok: false,
        svg: swatch("#f8fafc", "不是正結果"),
        caption: "沒有該試劑的正結果",
        feedback: reagentNote[reagent] + " 請繼續找出澱粉加碘液的藍黑色。"
      });
    }
  }
}

const lessons = [
  {
    slug: "food-test",
    form: "中四",
    unit: "細胞與生命分子",
    title: "食物測試",
    titleEn: "Food tests",
    objectives: [
      "用碘液辨認澱粉，用加熱後的本立德試劑辨認還原糖。",
      "用雙縮脲試劑辨認蛋白質，用乙醇乳化試驗辨認脂質。",
      "知道蔗糖是非還原糖，澱粉也不會使本立德試劑變磚紅。"
    ],
    note: "只記錄真正觀察到的顏色。不要為了預期答案改結果。這裡不提供試劑配製份量。",
    lead: "選一種食物和一種試劑，按「測試」。任務：做出澱粉的正結果。",
    kind: "match",
    action: "測試",
    introSvg: panel("四種學校食物測試", ["碘液 → 澱粉 → 藍黑", "本立德（加熱）→ 還原糖 → 磚紅", "雙縮脲 → 蛋白質 → 紫色", "乙醇加水 → 脂質 → 乳濁"]),
    introCap: "正結果的顏色不同，不能互換。",
    fields: [
      { id: "food", label: "樣本", options: foods.map(([id, label]) => ({ id, label })) },
      { id: "reagent", label: "試劑", options: reagents.map(([id, label]) => ({ id, label })) }
    ],
    cases: foodCases,
    fallback: "請選齊樣本和試劑。"
  },
  {
    slug: "fluid-mosaic",
    form: "中四",
    unit: "細胞與生命分子",
    title: "流體鑲嵌模型",
    titleEn: "Fluid mosaic model",
    objectives: [
      "描述細胞膜以磷脂雙層為基本結構，親水頭朝外、疏水尾朝內。",
      "說明蛋白質嵌在膜中，並且可以橫向移動。",
      "指出糖蛋白和糖脂主要在膜的外側，參與識別。"
    ],
    note: "膜的選擇透性和「磷脂連成一片、蛋白像拼嵌」要同時成立。",
    lead: "按正確次序點出流體鑲嵌模型的三個要點。",
    kind: "sequence",
    success: "模型次序完成：雙層、可移動的蛋白、外側糖鏈。",
    introSvg: bilayer,
    introCap: "親水頭接觸膜兩側的水，疏水尾藏在中間。",
    steps: [
      { label: "磷脂排成雙層，親水頭朝向水，疏水尾向內", detail: "磷脂雙層是膜的基本結構。", svg: bilayer },
      { label: "蛋白質嵌進雙層，並可在膜平面橫向移動", detail: "蛋白不是固定的一層外殼。膜是流體，所以蛋白可以橫向移動。", svg: panel("鑲嵌蛋白", ["通道蛋白、載體蛋白穿過或嵌入雙層", "外周蛋白可附在表面", "橫向移動 = fluid"]) },
      { label: "糖蛋白和糖脂的糖鏈主要伸向膜外側", detail: "糖鏈參與細胞識別，通常在細胞外一側，不是均匀分佈在膜的兩面。", svg: panel("外側糖鏈", ["糖蛋白 glycoprotein", "糖脂 glycolipid", "糖鏈朝細胞外"]) }
    ],
    decoys: [
      { label: "蛋白質連成連續雙層，磷脂只是點綴", why: "不對。連續的雙層是磷脂。蛋白質是鑲嵌或附着在這層磷脂上。" }
    ]
  },
  {
    slug: "respiration",
    form: "中四",
    unit: "細胞與生命分子",
    title: "細胞呼吸",
    titleEn: "Cellular respiration",
    objectives: [
      "指出糖解在細胞質進行，有氧時克雷伯氏循環在線粒體基質進行。",
      "指出電子傳遞鏈在線粒體內膜，氧是最終電子受體。",
      "說明大部分 ATP 在氧化磷酸化產生，不必背一個固定的 ATP 總數。"
    ],
    note: "真核細胞才有線粒體。不要把糖解說成在基質裡發生。",
    lead: "按有氧呼吸的正確先後次序點選。",
    kind: "sequence",
    success: "有氧呼吸的位置和次序正確。",
    introSvg: flow("有氧呼吸位置", ["細胞質", "線粒體基質", "線粒體內膜"]),
    introCap: "先看反應在哪一個部位發生。",
    steps: [
      { label: "細胞質：糖解，葡萄糖變成丙酮酸，淨得少量 ATP", detail: "糖解不需要氧，地點是細胞質。葡萄糖分解成丙酮酸，並產生 NADH。", svg: panel("糖解 glycolysis", ["地點：細胞質 cytoplasm", "葡萄糖 → 丙酮酸", "淨得 2 ATP"]) },
      { label: "基質：丙酮酸進入線粒體，克雷伯氏循環放出二氧化碳", detail: "有氧時丙酮酸進入基質，經鏈接反應和克雷伯氏循環產生二氧化碳、NADH、FADH₂ 和少量 ATP。", svg: panel("克雷伯氏循環 Krebs cycle", ["地點：線粒體基質 matrix", "放出 CO₂", "產生 NADH 和 FADH₂"]) },
      { label: "內膜：電子傳給氧，化學滲透產生大部分 ATP", detail: "電子傳遞鏈在內膜。氧是最終電子受體，形成水。大部分 ATP 在這裡由化學滲透產生。", svg: panel("氧化磷酸化", ["地點：內膜 cristae", "最終電子受體：氧", "大部分 ATP 在此產生"]) }
    ],
    decoys: [
      { label: "糖解作用在線粒體基質進行", why: "不對。糖解在細胞質。基質進行的是有氧條件下的鏈接反應和克雷伯氏循環。" }
    ]
  },
  {
    slug: "meiosis",
    form: "中五",
    unit: "遺傳與進化",
    title: "減數分裂",
    titleEn: "Meiosis",
    objectives: [
      "說明減數分裂產生單倍體配子，染色体數目減半。",
      "分辨後期 I 分開同源染色體，後期 II 才分開姊妹染色單體。",
      "指出互換發生在前期 I，使配子遺傳組成更多樣。"
    ],
    lead: "按減數分裂的正確次序點選。",
    kind: "sequence",
    success: "減數分裂的兩次分裂已經分清。",
    introSvg: flow("減數分裂", ["同源染色體配對", "同源染色體分離", "姊妹染色單體分離", "四個單倍體細胞"]),
    introCap: "DNA 在減數分裂開始前的間期已經複製。",
    steps: [
      { label: "前期 I：同源染色體配對，非姊妹染色單體可互換", detail: "互換發生在前期 I，是配子遺傳差異的一個來源。", svg: panel("前期 I", ["同源染色體配對", "互換 crossing over", "每條染色體仍有兩條染色單體"]) },
      { label: "後期 I：同源染色體分離，染色體數目減半", detail: "減數第一次分裂把同源染色體拉開。姊妹染色單體仍然連在一起。", svg: panel("後期 I", ["分開的是同源染色體", "細胞變成單倍體", "染色單體尚未分開"]) },
      { label: "後期 II：姊妹染色單體分離", detail: "減數第二次分裂類似有絲分裂，分開的是姊妹染色單體。", svg: panel("後期 II", ["着絲點分裂", "姊妹染色單體分開", "沒有再複製 DNA"]) },
      { label: "結果：四個單倍體細胞，遺傳組成可以不同", detail: "一個二倍體細胞經過減數分裂，形成四個單倍體細胞。", svg: panel("結果", ["四個細胞", "每個都是單倍體 n", "受精後恢復二倍體"]) }
    ],
    decoys: [
      { label: "減數第一次分裂把姊妹染色單體拉開", why: "不對。後期 I 分開同源染色體。姊妹染色單體在後期 II 才分離。" }
    ]
  },
  {
    slug: "allopatric",
    form: "中五",
    unit: "遺傳與進化",
    title: "異域種化",
    titleEn: "Allopatric speciation",
    objectives: [
      "說明異域種化先有地理屏障，令種群之間不能基因交流。",
      "說明兩邊累積不同的遺傳差異後，可以形成生殖隔離。",
      "把地理隔離和同一地點的食物差異分開。"
    ],
    note: "這是演化模型。屏障和生殖隔離都要用證據描述，不要把未觀察到的結果寫成已經發生。",
    lead: "選一種情境和後來的交配結果。任務：找出異域種化已經成立的組合。",
    kind: "match",
    action: "判斷",
    introSvg: panel("異域種化", ["一個種群被地理屏障分開", "兩邊各自累積突變和選擇", "再相遇時不能成功交配"]),
    introCap: "關鍵是基因交流先被地理屏障中斷。",
    fields: [
      {
        id: "scene",
        label: "情境",
        options: [
          { id: "geo", label: "山脈把一個種群分成兩邊，個體不能往來" },
          { id: "food", label: "同一山谷裡，有些個體只是偏好不同食物" }
        ]
      },
      {
        id: "mate",
        label: "後來",
        options: [
          { id: "no", label: "兩邊再相遇時不能產生可育後代" },
          { id: "yes", label: "兩邊仍然可以自由交配並留下可育後代" }
        ]
      }
    ],
    cases: [
      { when: { scene: "geo", mate: "no" }, ok: true, caption: "地理隔離之後出現生殖隔離", feedback: "正確。異域種化是地理屏障中斷基因交流，兩邊累積差異，最後形成生殖隔離。" },
      { when: { scene: "geo", mate: "yes" }, ok: false, caption: "有屏障，但尚未種化", feedback: "有地理分隔，可是仍能交配並交流基因，種化還沒有完成。" },
      { when: { scene: "food", mate: "no" }, ok: false, caption: "這不是異域種化", feedback: "沒有地理屏障。同一地區出現生殖隔離，不能叫做異域種化。" },
      { when: { scene: "food", mate: "yes" }, ok: false, caption: "尚未分隔成兩個種", feedback: "同一地點、仍可自由交配，只是食物偏好不同，不足以稱為異域種化。" }
    ]
  },
  {
    slug: "selection",
    form: "中五",
    unit: "遺傳與進化",
    title: "抗生素與自然選擇",
    titleEn: "Antibiotics and selection",
    objectives: [
      "說明耐藥變異是隨機突變，可以在接觸抗生素之前已經存在。",
      "說明抗生素選擇存活的個體，而不是製造突變。",
      "描述敏感細菌死亡後，耐藥個體的比例上升。"
    ],
    note: "這是種群模型，不是培養細菌的步驟。不要分享或自行服用剩餘抗生素。",
    lead: "按自然選擇的正確次序點選。不要選「藥物製造突變」。",
    kind: "sequence",
    success: "選擇的次序正確：先有變異，然後藥物篩選，抗性比例上升。",
    introSvg: flow("自然選擇", ["已有耐藥變異", "敏感細菌死亡", "耐藥比例上升"]),
    introCap: "抗生素是選擇壓力，不是突變的來源。",
    steps: [
      { label: "繁殖時隨機突變，少數細菌在用藥前已能抵抗該抗生素", detail: "突變不是為了應付藥物而出現。用藥前種群裡可以已經有耐藥個體。", svg: panel("用藥之前", ["大部分細菌敏感", "少數已有耐藥突變", "突變是隨機的"]) },
      { label: "抗生素殺死敏感細菌，耐藥細菌較易存活", detail: "藥物改變存活機會。它沒有把敏感細菌改寫成耐藥細菌。", svg: panel("選擇", ["敏感細菌死亡", "耐藥細菌存活", "藥物不是突變劑的意思"]) },
      { label: "存活者繁殖，種群中耐藥基因的比例上升", detail: "下一代有更多耐藥個體，因為存活者把抗性傳下去。", svg: panel("用藥之後", ["種群變小後再增長", "耐藥個體比例較高", "這是選擇，不是獲得性遺傳"]) }
    ],
    decoys: [
      { label: "抗生素令細菌突變出抗性", why: "不對。抗生素選擇已經存在的耐藥變異。它不會為了生存而指令細菌產生所需突變。" }
    ]
  },
  {
    slug: "recombinant",
    form: "中六",
    unit: "遺傳與進化",
    title: "重組 DNA 的原理",
    titleEn: "Recombinant DNA, as a concept",
    objectives: [
      "說明相同的限制酶可切出互補的黏性末端。",
      "說明 DNA 連接酶把目標基因和載體接成重組 DNA。",
      "知道標誌基因用來辨認哪些細胞取得載體，而本課不練習轉化或培養。"
    ],
    note: "只學原理。這裡沒有熱激、培養基配方或篩選菌落的操作。",
    lead: "按重組 DNA 的概念次序點選。",
    kind: "sequence",
    success: "原理次序完成。你沒有被要求培養任何細胞。",
    introSvg: flow("概念次序", ["限制酶切開", "連接酶接合", "載體帶着基因"]),
    introCap: "黏性末端要互補，所以常用同一種限制酶。",
    steps: [
      { label: "限制酶在特定序列切開目標 DNA 和載體，露出互補黏性末端", detail: "相同的限制酶切出可以配對的末端。這是識別和切割的概念，不是一份實驗配方。", svg: panel("限制酶", ["辨認特定碱基序列", "切出黏性末端", "目標基因和載體要用相容的末端"]) },
      { label: "DNA 連接酶封合骨架，形成重組 DNA", detail: "連接酶把糖—磷酸骨架接上。重組 DNA 同時含有載體和目標基因。", svg: panel("連接", ["目標基因插入載體", "DNA 連接酶封口", "產物叫做重組 DNA"]) },
      { label: "載體可以把基因送進宿主；標誌基因只用於辨認", detail: "標誌基因的概念是辨認哪些細胞取得了載體。本課到此為止，不進行轉化或培養。", svg: panel("辨認，而不是培養", ["載體帶着目標基因", "標誌基因用來辨認", "不提供轉化或培養步驟"]) }
    ],
    decoys: [
      { label: "把細胞塗到培養基上，用溫度步驟完成轉化", why: "這不是本課的內容。重組 DNA 的學習停留在限制酶、連接酶和載體的原理，不練習培養或熱激。" }
    ]
  },
  {
    slug: "gel",
    form: "中六",
    unit: "遺傳與進化",
    title: "凝膠電泳的原理",
    titleEn: "Gel electrophoresis, as a concept",
    objectives: [
      "說明 DNA 帶負電，會向正極移動。",
      "說明同一時間內，較短的片段在凝膠中走得較遠。",
      "用條帶位置比較片段大小，而不是學習抽取或製備樣品。"
    ],
    note: "只判斷電荷方向和片段大小。沒有抽取 DNA 或製膠的步驟。",
    lead: "選對電極方向，以及哪種片段走得較遠。",
    kind: "match",
    action: "判斷",
    introSvg: panel("電泳槽", ["樣品井在一端", "DNA 帶負電", "短片段走得較遠"]),
    introCap: "磷酸基團使 DNA 帶負電。",
    fields: [
      {
        id: "pole",
        label: "電極",
        options: [
          { id: "far", label: "正極在遠離樣品井的一端" },
          { id: "near", label: "正極就在樣品井這一端" }
        ]
      },
      {
        id: "band",
        label: "條帶",
        options: [
          { id: "short", label: "較短片段離開樣品井較遠" },
          { id: "long", label: "較長片段離開樣品井較遠" }
        ]
      }
    ],
    cases: [
      { when: { pole: "far", band: "short" }, ok: true, caption: "負電的 DNA 走向正極，短片段更遠", feedback: "正確。DNA 向正極移動。凝膠阻礙長片段，所以同一時間內短片段走得較遠。" },
      { when: { pole: "far", band: "long" }, ok: false, caption: "方向對，片段大小不對", feedback: "正極放在遠端是對的，但走得較遠的是較短片段，不是較長片段。" },
      { when: { pole: "near", band: "short" }, ok: false, caption: "片段大小對，電極反了", feedback: "短片段確實走得較遠，但 DNA 帶負電，正極要放在它前進的那一端，不是樣品井旁邊。" },
      { when: { pole: "near", band: "long" }, ok: false, caption: "方向和大小都反了", feedback: "DNA 帶負電，應離開樣品井走向正極；走得較遠的是短片段。" }
    ]
  },
  {
    slug: "transpiration",
    form: "中五",
    unit: "生物與環境",
    title: "蒸騰",
    titleEn: "Transpiration",
    objectives: [
      "預測低濕度和風會提高蒸騰速率。",
      "說明水沿水勢梯度離開葉片，風會吹走葉外的濕空氣。",
      "知道木質部的上升主要靠蒸騰拉力，葉片裡沒有水泵。"
    ],
    lead: "選濕度和風。任務：找出蒸騰最快的條件。",
    kind: "match",
    action: "觀察",
    introSvg: panel("蒸騰", ["氣孔是水蒸氣離開的主要通道", "低濕度、有風 → 較快", "拉力來自內聚力和張力"]),
    introCap: "保衛細胞脹滿時氣孔張開。這裡只比較葉外條件。",
    fields: [
      {
        id: "humidity",
        label: "葉外濕度",
        options: [
          { id: "low", label: "低濕度" },
          { id: "high", label: "高濕度" }
        ]
      },
      {
        id: "wind",
        label: "空氣",
        options: [
          { id: "wind", label: "有風" },
          { id: "still", label: "無風" }
        ]
      }
    ],
    cases: [
      { when: { humidity: "low", wind: "wind" }, ok: true, caption: "蒸騰最快", feedback: "正確。葉內和乾燥空氣的水勢差大，風又吹薄葉外的濕空氣層，水蒸氣散失最快。上升的水柱靠內聚力和張力，不是葉片裡的泵。" },
      { when: { humidity: "low", wind: "still" }, ok: false, caption: "較快，但不是最快", feedback: "低濕度會加快蒸騰，不過無風時葉外仍留着一層濕空氣。最快的是低濕度加有風。" },
      { when: { humidity: "high", wind: "wind" }, ok: false, caption: "風有幫助，但濕度高", feedback: "風能更新葉外空氣，可是高濕度減小水勢差。最快仍是低濕度加有風。" },
      { when: { humidity: "high", wind: "still" }, ok: false, caption: "蒸騰最慢", feedback: "高濕度加無風，水勢差小，濕空氣又留在葉外，蒸騰最慢。" }
    ]
  },
  {
    slug: "translocation",
    form: "中五",
    unit: "生物與環境",
    title: "韌皮部轉運",
    titleEn: "Translocation in the phloem",
    objectives: [
      "描述源把蔗糖裝載入篩管，水隨之滲入，膨壓上升。",
      "描述糖液沿壓力差整體流向庫。",
      "說明韌皮部的方向是由源到庫，不必和木質部一樣由根到葉。"
    ],
    lead: "按壓力流動假說的次序點選。",
    kind: "sequence",
    success: "源、膨壓、整體流動、庫，次序正確。",
    introSvg: flow("壓力流動", ["源裝載蔗糖", "水滲入，壓力上升", "糖液流向庫", "庫卸下蔗糖"]),
    introCap: "木質部主要向上運水和礦物質。韌皮部運有機物，方向看源和庫。",
    steps: [
      { label: "葉肉等源頭把蔗糖裝載入篩管", detail: "源是製造或輸出蔗糖的部位，例如進行光合作用的葉。裝載使篩管裡的蔗糖濃度上升。", svg: panel("源 source", ["例子：成熟葉片", "蔗糖進入篩管", "濃度高於周圍"]) },
      { label: "水由木質部滲入篩管，膨壓上升", detail: "篩管水勢下降，水滲入，流體靜壓升高。", svg: panel("高壓", ["蔗糖濃", "水滲入", "膨壓上升"]) },
      { label: "糖液由高壓的源，整體流向低壓的庫", detail: "這是整體流動，不是蔗糖單獨擴散過整段韌皮部。", svg: panel("整體流動 mass flow", ["由高膨壓到低膨壓", "篩管內的溶液一起移動"]) },
      { label: "果實或根等庫卸下蔗糖，水離開，壓力較低", detail: "庫使用或貯存蔗糖。蔗糖離開篩管後，水勢回升，水離開，壓力保持較低。", svg: panel("庫 sink", ["例子：根、果實、生長中的芽", "卸下蔗糖", "壓力低於源"]) }
    ],
    decoys: [
      { label: "韌皮部永遠由根向上流到葉", why: "不對。木質部的水主要由根到葉。韌皮部由源到庫，果實或根部生長時可以是向下或向其他方向。" }
    ]
  },
  {
    slug: "flowering",
    form: "中五",
    unit: "生物與環境",
    title: "開花植物的生殖",
    titleEn: "Reproduction in flowering plants",
    objectives: [
      "分辨傳粉和受精。",
      "描述花粉管把兩個雄配子送進胚珠。",
      "說明雙受精：一個雄配子與卵結合，另一個與兩個極核形成胚乳。"
    ],
    note: "用準確的花部名稱。傳粉還沒有形成合子。",
    lead: "按有性生殖的正確次序點選。",
    kind: "sequence",
    success: "傳粉、花粉管、雙受精、果實和種子的次序正確。",
    introSvg: flow("開花植物", ["傳粉", "花粉管", "雙受精", "胚珠變種子"]),
    introCap: "花粉落在柱頭只是傳粉。",
    steps: [
      { label: "花粉由花藥落到同一朵或另一朵花的柱頭", detail: "這是傳粉。自花傳粉和異花傳粉都還沒有受精。", svg: panel("傳粉 pollination", ["花藥 anther → 柱頭 stigma", "花粉尚未與卵融合"]) },
      { label: "花粉管沿花柱生長，把兩個雄配子送向胚珠", detail: "花粉管穿過花柱進入胚珠。雄配子沿花粉管移動。", svg: panel("花粉管", ["由柱頭長向胚珠", "兩個雄配子", "管核與花粉管生長有關"]) },
      { label: "一個雄配子與卵形成合子，另一個與兩個極核形成胚乳", detail: "雙受精是被子植物的特徵。合子是二倍體，胚乳通常是三倍體。", svg: panel("雙受精", ["雄配子 + 卵 → 合子 2n", "雄配子 + 兩個極核 → 胚乳 3n"]) },
      { label: "胚珠發育成種子，子房發育成果實", detail: "種子來自胚珠，果實來自子房。不要把兩者對調。", svg: panel("受精之後", ["胚珠 → 種子", "子房 → 果實", "合子發育成胚"]) }
    ],
    decoys: [
      { label: "花粉落到柱頭的一刻就是受精", why: "不對。那是傳粉。受精要等花粉管把雄配子送進胚珠，並與卵融合。" }
    ]
  },
  {
    slug: "movement",
    form: "中五",
    unit: "人體生理",
    title: "關節與拮抗肌",
    titleEn: "Joints and antagonistic muscles",
    objectives: [
      "說明骨骼肌只能收縮拉動骨骼，不能推開骨骼。",
      "配對屈曲前臂時收縮的肱二頭肌，以及伸直時收縮的肱三頭肌。",
      "分辨肌腱連接肌肉與骨，韌帶連接骨與骨。"
    ],
    note: "模型用來理解槓桿，不是運動損傷的診斷。",
    lead: "選一個動作和正在收縮的肌肉。任務：正確配對屈曲前臂。",
    kind: "match",
    action: "配對",
    introSvg: panel("肘關節", ["屈曲：肱二頭肌收縮", "伸直：肱三頭肌收縮", "肌腱連肌與骨，韌帶連骨與骨"]),
    introCap: "拮抗肌成對工作，一方收縮時另一方放鬆。",
    fields: [
      {
        id: "action",
        label: "動作",
        options: [
          { id: "flex", label: "屈曲前臂" },
          { id: "extend", label: "伸直前臂" }
        ]
      },
      {
        id: "muscle",
        label: "正在收縮的肌肉",
        options: [
          { id: "bi", label: "肱二頭肌 biceps" },
          { id: "tri", label: "肱三頭肌 triceps" }
        ]
      }
    ],
    cases: [
      { when: { action: "flex", muscle: "bi" }, ok: true, caption: "屈曲：肱二頭肌是主動肌", feedback: "正確。屈曲前臂時肱二頭肌收縮，肱三頭肌放鬆。肌肉拉動前臂骨，肘關節是支點。肌腱把肌肉連到骨上。" },
      { when: { action: "flex", muscle: "tri" }, ok: false, caption: "屈曲時肱三頭肌不是主動肌", feedback: "屈曲前臂時收縮的是肱二頭肌。肱三頭肌在伸直時才是主動肌。" },
      { when: { action: "extend", muscle: "tri" }, ok: false, caption: "這對伸直是對的，但任務問屈曲", feedback: "伸直前臂時確實是肱三頭肌收縮。本任務要你配對屈曲：選屈曲前臂和肱二頭肌。" },
      { when: { action: "extend", muscle: "bi" }, ok: false, caption: "伸直時不是肱二頭肌發力", feedback: "伸直時肱三頭肌收縮，肱二頭肌放鬆。肌肉不能推開前臂。" }
    ]
  },
  {
    slug: "sliding-filament",
    form: "中五",
    unit: "人體生理",
    title: "肌絲滑動",
    titleEn: "Sliding filament",
    objectives: [
      "說明肌節縮短時，肌動蛋白絲和肌球蛋白絲本身的長度不變。",
      "按鈣離子、橫橋和 ATP 描述一次橫橋循環。",
      "指出 I 帶和 H 區在收縮時變短，A 帶長度不變。"
    ],
    lead: "按一次橫橋循環的次序點選。",
    kind: "sequence",
    success: "滑動學說的次序完成：肌絲沒有縮短。",
    introSvg: panel("肌節 sarcomere", ["A 帶：肌球蛋白，長度不變", "I 帶和 H 區：收縮時變短", "肌動蛋白滑入肌球蛋白之間"]),
    introCap: "收縮的是肌節，不是肌絲本身。",
    steps: [
      { label: "動作電位傳到肌細胞，肌質網釋放鈣離子", detail: "鈣離子從肌質網進到肌漿。", svg: panel("鈣離子", ["肌質網 sarcoplasmic reticulum", "Ca2+ 釋出"]) },
      { label: "鈣離子結合肌鈣蛋白，原肌球蛋白移開，露出結合位", detail: "沒有鈣時，原肌球蛋白遮着肌動蛋白上的結合位。", svg: panel("結合位露出", ["Ca2+ 結合 troponin", "tropomyosin 移開", "肌動蛋白上的結合位露出"]) },
      { label: "肌球蛋白頭形成橫橋並擺動，把肌動蛋白拉向肌節中央", detail: "動力衝程使肌動蛋白滑動。兩種肌絲的長度不變，肌節變短。", svg: panel("動力衝程", ["橫橋 cross-bridge", "肌動蛋白滑入", "A 帶長度不變"]) },
      { label: "ATP 結合肌球蛋白頭，橫橋分離，以便下一次循環", detail: "ATP 的作用包括讓橫橋鬆開。沒有 ATP，橫橋不能正常分離。", svg: panel("ATP", ["ATP 使橫橋分離", "水解後肌球蛋白頭再次準備", "肌絲長度仍然不變"]) }
    ],
    decoys: [
      { label: "肌球蛋白絲本身縮短，所以肌肉變短", why: "不對。滑動學說裡兩種肌絲長度不變。變短的是肌節，因為肌動蛋白絲滑到肌球蛋白絲之間。" }
    ]
  },
  {
    slug: "oxygen-curve",
    form: "中五",
    unit: "人體生理",
    title: "氧離曲線",
    titleEn: "Oxygen dissociation curve",
    objectives: [
      "說明血紅蛋白的氧離曲線呈 S 形，因為亞基之間有協同性。",
      "說明二氧化碳上升使曲線右移，同一氧分壓下飽和度下降。",
      "把右移理解為組織較易得到氧，而不是血紅蛋白抓得更緊。"
    ],
    lead: "先拉動組織二氧化碳，看曲線移動，再選擇正確描述。",
    kind: "curve",
    slider: { id: "co2", label: "組織二氧化碳", min: 0, max: 100, start: 8 },
    shiftFrom: 28,
    shiftTo: 58,
    highAt: 60,
    lowCaption: "二氧化碳仍低：曲線偏左，血紅蛋白較易保持結合。",
    highCaption: "二氧化碳已高：曲線右移。同一氧分壓下飽和度較低，氧較易放出。",
    curveLabel: "血紅蛋白氧離曲線",
    question: "把二氧化碳拉高之後，曲線怎樣改變？",
    needHigh: "右移這個方向是對的概念，但滑桿還沒拉高。先把二氧化碳拉過高位，看曲線是否右移，再選一次。",
    choices: [
      { label: "曲線右移，同一氧分壓下飽和度下降，組織較易得到氧", ok: true, why: "正確。這是波爾效應。活躍組織的二氧化碳較高、pH 較低，血紅蛋白對氧的親和力下降，所以把氧放給組織。" },
      { label: "曲線左移，血紅蛋白把氧抓得更緊", ok: false, why: "左移代表親和力上升，例如胎兒血紅蛋白相對成人血紅蛋白。高二氧化碳不是這個方向。" },
      { label: "曲線變成直線，因為協同性消失", ok: false, why: "S 形來自血紅蛋白四個亞基的協同性。二氧化碳改變曲線的位置，不會把它變成肌紅蛋白那樣的雙曲線。" }
    ]
  },
  {
    slug: "action-potential",
    form: "中五",
    unit: "人體生理",
    title: "動作電位",
    titleEn: "Action potential",
    objectives: [
      "描述靜息膜電位約為 −70 mV，細胞內相對為負。",
      "說明去極化是鈉離子經電壓閘通道進入，再極化是鉀離子離開。",
      "區分快速的離子通道和較慢的鈉鉀泵。"
    ],
    lead: "按一個動作電位的次序點選。",
    kind: "sequence",
    success: "鈉入、鉀出的次序正確。泵沒有被誤當成尖峰的原因。",
    introSvg: panel("膜電位", ["靜息約 −70 mV", "去極化：Na+ 進入", "再極化：K+ 離開"]),
    introCap: "閾值之後才會產生完整的動作電位。",
    steps: [
      { label: "靜息：膜內約 −70 mV，鈉鉀泵長期維持鈉和鉀的濃度梯度", detail: "泵每次把 3 個鈉運出、2 個鉀運入，需要 ATP。靜息時膜對鉀的透性較高。", svg: panel("靜息 resting potential", ["膜內約 −70 mV", "Na+ 外多，K+ 內多", "泵維持梯度，不是尖峰本身"]) },
      { label: "達到閾值：電壓閘鈉通道開放，鈉離子湧入，膜電位變正", detail: "去極化是鈉離子進入，不是泵把鈉泵進來。", svg: panel("去極化", ["電壓閘鈉通道開放", "Na+ 流入", "膜電位升向約 +30 mV"]) },
      { label: "接近尖峰：鈉通道關閉，電壓閘鉀通道開放，鉀離子流出", detail: "鉀離子離開細胞，膜電位回到負值，這是再極化。", svg: panel("再極化", ["鈉通道關閉", "K+ 流出", "膜電位下降"]) },
      { label: "鉀通道稍慢關閉，出現短暫過極化，然後回到靜息", detail: "過多的鉀流出使膜電位比靜息更負，之後回到約 −70 mV。", svg: panel("回到靜息", ["短暫低於 −70 mV", "泵繼續維持濃度梯度", "這段時間內較難再次興奮"]) }
    ],
    decoys: [
      { label: "尖峰是鈉鉀泵把鈉泵入細胞造成的", why: "不對。尖峰是鈉離子經通道湧入。泵把鈉運出細胞，而且速度不足以造成動作電位的尖峰。" }
    ]
  },
  {
    slug: "synapse",
    form: "中五",
    unit: "人體生理",
    title: "膽鹼突觸",
    titleEn: "Cholinergic synapse",
    objectives: [
      "說明動作電位到達突觸前膜後，鈣離子進入，囊泡釋放乙酰膽鹼。",
      "說明乙酰膽鹼與突觸後膜受體結合，引起去極化。",
      "說明乙酰膽鹼酯酶分解乙酰膽鹼，傳遞方向只能由前到後。"
    ],
    note: "只描述正常突觸怎樣停止訊號。不涉及任何藥物或毒物的製備。",
    lead: "按膽鹼突觸傳遞的次序點選。",
    kind: "sequence",
    success: "突觸傳遞單向，而且訊號會被酶終止。",
    introSvg: flow("膽鹼突觸", ["鈣離子進入", "釋放乙酰膽鹼", "突觸後膜去極化", "酯酶分解"]),
    introCap: "神經遞質只從突觸前膜釋放。",
    steps: [
      { label: "動作電位到達突觸小體，鈣通道開放，鈣離子進入", detail: "鈣離子進入突觸前膜一側，促使囊泡移向膜。", svg: panel("突觸前膜", ["動作電位到達", "Ca2+ 進入突觸小體"]) },
      { label: "囊泡釋放乙酰膽鹼到突觸間隙", detail: "乙酰膽鹼以胞吐離開突觸前細胞。突觸後細胞不釋放這種遞質。", svg: panel("胞吐", ["囊泡與突觸前膜融合", "ACh 進入突觸間隙"]) },
      { label: "乙酰膽鹼結合突觸後膜受體，鈉通道開放，膜去極化", detail: "如果去極化達到閾值，突觸後神經元會產生新的動作電位。", svg: panel("突觸後膜", ["ACh 結合受體", "Na+ 進入", "興奮性突觸後電位"]) },
      { label: "乙酰膽鹼酯酶把乙酰膽鹼分解，避免受體持續被刺激", detail: "分解後訊號結束。產物可以被突觸前細胞再取用。", svg: panel("終止訊號", ["乙酰膽鹼酯酶", "ACh 被分解", "受體不再持續開放"]) }
    ],
    decoys: [
      { label: "乙酰膽鹼由突觸後膜釋放，所以訊號可以反向", why: "不對。囊泡在突觸前膜。遞質只由前膜釋放，所以化學突觸的傳遞是單向的。" }
    ]
  },
  {
    slug: "menstrual",
    form: "中五",
    unit: "人體生理",
    title: "月經週期",
    titleEn: "Menstrual cycle",
    objectives: [
      "說明 FSH 促進卵泡發育，卵泡分泌雌激素使子宮內膜增厚。",
      "說明 LH 高峰觸發排卵，不是孕酮觸發排卵。",
      "說明黃體分泌孕酮維持內膜；沒有受精時黃體退化，內膜脫落。"
    ],
    note: "用正確的器官和激素名稱。這是週期模型，不是醫療建議。",
    lead: "按一個沒有受精的週期次序點選。",
    kind: "sequence",
    success: "激素和排卵的次序正確。",
    introSvg: flow("沒有受精的週期", ["FSH 與卵泡", "雌激素", "LH 與排卵", "黃體與孕酮", "月經"]),
    introCap: "腦垂體前葉分泌 FSH 和 LH，卵巢分泌雌激素和孕酮。",
    steps: [
      { label: "FSH 促進卵泡發育", detail: "FSH 來自腦垂體前葉，作用在卵巢的卵泡。", svg: panel("卵泡期開始", ["FSH", "卵泡發育"]) },
      { label: "發育中的卵泡分泌雌激素，子宮內膜修復並增厚", detail: "雌激素令內膜增生。濃度升得夠高時，會引起 LH 高峰。", svg: panel("雌激素", ["由卵泡分泌", "內膜增厚", "高濃度觸發 LH 高峰"]) },
      { label: "LH 高峰觸發排卵，大約在第 14 天", detail: "排卵是次級卵母細胞從卵泡釋出。觸發它的是 LH，不是孕酮。", svg: panel("排卵", ["LH surge", "大約第 14 天", "卵母細胞進入輸卵管"]) },
      { label: "黃體分泌孕酮，維持子宮內膜", detail: "排卵後剩餘的卵泡細胞形成黃體，分泌孕酮和雌激素。", svg: panel("黃體期", ["黃體 corpus luteum", "孕酮維持內膜", "為可能的着床做準備"]) },
      { label: "沒有受精時黃體退化，孕酮下降，子宮內膜脫落", detail: "孕酮和雌激素下降後，內膜脫落，形成月經，FSH 再次上升。", svg: panel("月經", ["黃體退化", "激素下降", "內膜脫落"]) }
    ],
    decoys: [
      { label: "孕酮高峰觸發排卵", why: "不對。觸發排卵的是 LH 高峰。孕酮在排卵之後由黃體分泌，用來維持內膜。" }
    ]
  },
  {
    slug: "immunity",
    form: "中六",
    unit: "人體生理",
    title: "特異性免疫",
    titleEn: "Specific immunity",
    objectives: [
      "說明只有受體吻合的淋巴細胞被抗原選中。",
      "比較初次反應較慢，二次反應因記憶細胞而更快、更強。",
      "把疫苗理解為建立記憶的概念，而不是培養病原體的步驟。"
    ],
    note: "這裡只談免疫概念。沒有培養、合成或取得病原體的步驟。",
    lead: "按特異性免疫的次序點選。",
    kind: "sequence",
    success: "克隆選擇和記憶細胞的次序正確。",
    introSvg: flow("特異性免疫", ["抗原選擇淋巴細胞", "漿細胞與記憶細胞", "再次接触反應更快"]),
    introCap: "抗體由漿細胞分泌，不是由病原體製造。",
    steps: [
      { label: "抗原進入後，受體吻合的淋巴細胞被選中並增殖", detail: "這是克隆選擇。不是所有淋巴細胞都對同一抗原反應。", svg: panel("克隆選擇", ["抗原與吻合的受體結合", "該淋巴細胞增殖"]) },
      { label: "初次反應較慢；B 細胞分化成漿細胞，並留下記憶細胞", detail: "漿細胞分泌抗體。初次反應需要數天至兩星期才到達高峰。", svg: panel("初次反應", ["較慢", "漿細胞分泌抗體", "記憶細胞留下"]) },
      { label: "再次遇到同一抗原，記憶細胞迅速增殖，抗體更快更多", detail: "二次反應潛伏期短、高峰更高，而且維持較久。", svg: panel("二次反應", ["記憶細胞", "更快", "抗體更多"]) },
      { label: "疫苗的概念是先形成記憶細胞，讓後來的二次反應保護身體", detail: "學習重點是記憶，不是怎樣培養微生物。", svg: panel("疫苗的概念", ["事先建立記憶", "以後同一抗原反應更快", "本課沒有培養步驟"]) }
    ],
    decoys: [
      { label: "二次反應較慢，因為身體要重新尋找受體", why: "不對。記憶細胞已經存在，所以二次反應比初次反應更快、更強。" }
    ]
  }
];

function writeLesson(lesson) {
  const dir = path.join(root, "lessons", lesson.slug);
  fs.mkdirSync(dir, { recursive: true });
  const cfg = {
    back: "../../index.html",
    form: lesson.form,
    unit: lesson.unit,
    title: lesson.title,
    titleEn: lesson.titleEn,
    objectives: lesson.objectives,
    note: lesson.note || "",
    lead: lesson.lead,
    kind: lesson.kind,
    success: lesson.success || "",
    introSvg: lesson.introSvg,
    introCap: lesson.introCap || "",
    steps: lesson.steps || [],
    decoys: lesson.decoys || [],
    action: lesson.action || "",
    fields: lesson.fields || [],
    cases: lesson.cases || [],
    fallback: lesson.fallback || "",
    slider: lesson.slider || null,
    shiftFrom: lesson.shiftFrom || 0,
    shiftTo: lesson.shiftTo || 0,
    highAt: lesson.highAt || 0,
    lowCaption: lesson.lowCaption || "",
    highCaption: lesson.highCaption || "",
    curveLabel: lesson.curveLabel || "",
    question: lesson.question || "",
    needHigh: lesson.needHigh || "",
    choices: lesson.choices || []
  };
  const html = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} · ${lesson.titleEn}</title>
  <link rel="stylesheet" href="../../kit/lesson.css" />
</head>
<body>
  <main id="app"></main>
  <script src="../../kit/tone.js"></script>
  <script src="../../kit/player.js"></script>
  <script src="./lesson.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
  fs.writeFileSync(path.join(dir, "lesson.js"), "BioLesson.mount(" + JSON.stringify(cfg, null, 2) + ");\n", "utf8");
}

const catalog = [
  ["cell", "中四", "s4", "lessons/food-test/index.html", "食物測試", "Food tests", "碘液、本立德、雙縮脲、乙醇乳化"],
  ["cell", "中四", "s4", "lessons/fluid-mosaic/index.html", "流體鑲嵌模型", "Fluid mosaic model", "磷脂雙層、鑲嵌蛋白、外側糖鏈"],
  ["cell", "中四", "s4", "Form 4/01_Cell_Transport/index.html", "物質跨膜運輸", "Membrane transport", "擴散、滲透、促進擴散、主動運輸"],
  ["cell", "中四", "s4", "Form 4/12_Osmosis_Sandbox/index.html", "滲透與水勢", "Osmosis and water potential", "水由高水勢到低水勢"],
  ["cell", "中四", "s4", "Form 4/02_Mitosis_Cell_Cycle/index.html", "有絲分裂", "Mitosis and the cell cycle", "姊妹染色單體在後期分離"],
  ["cell", "中四", "s4", "Form 4/06_Photosynthesis/index.html", "光合作用與限制因素", "Photosynthesis and limiting factors", "光、二氧化碳、溫度"],
  ["cell", "中四", "s4", "lessons/respiration/index.html", "細胞呼吸", "Cellular respiration", "細胞質、基質、內膜"],
  ["cell", "中五", "s5", "Form 5/01_Enzyme_Kinetics/index.html", "酶與反應速率", "Enzyme kinetics", "基質、溫度、pH 與變性"],
  ["env", "中五", "s5", "lessons/transpiration/index.html", "蒸騰", "Transpiration", "濕度、風和蒸騰拉力"],
  ["env", "中五", "s5", "lessons/translocation/index.html", "韌皮部轉運", "Translocation", "壓力流動：由源到庫"],
  ["env", "中五", "s5", "lessons/flowering/index.html", "開花植物生殖", "Flowering-plant reproduction", "傳粉、花粉管、雙受精"],
  ["env", "中五", "s5", "Form 5/10_Energy_Flow/index.html", "能量流動", "Energy flow", "約一成能量傳到下一營養級"],
  ["env", "中五", "s5", "Form 5/13_Ecology_Food_Web/index.html", "食物網", "Food webs", "多條食物關係和移除物種的影響"],
  ["gene", "中五", "s5", "Form 5/04_Genetics_Punnett/index.html", "龐氏方格", "Punnett squares", "基因型、表型與配子"],
  ["gene", "中五", "s5", "lessons/meiosis/index.html", "減數分裂", "Meiosis", "同源染色體與姊妹染色單體"],
  ["gene", "中五", "s5", "apps/dna-translation/index.html", "翻譯作用", "Translation of mRNA", "密碼子、反密碼子、釋放因子"],
  ["gene", "中五", "s5", "lessons/allopatric/index.html", "異域種化", "Allopatric speciation", "地理屏障然後生殖隔離"],
  ["gene", "中五", "s5", "lessons/selection/index.html", "抗生素與自然選擇", "Selection, not a culture guide", "突變在先，藥物負責選擇"],
  ["gene", "中六", "s6", "lessons/recombinant/index.html", "重組 DNA 原理", "Recombinant DNA concept", "限制酶、連接酶、載體"],
  ["gene", "中六", "s6", "lessons/gel/index.html", "凝膠電泳原理", "Gel electrophoresis concept", "DNA 向正極，短片段更遠"],
  ["human", "中四", "s4", "Form 4/10_Cardiac_Cycle/index.html", "心動週期", "Cardiac cycle", "心房、心室和瓣膜"],
  ["human", "中五", "s5", "lessons/movement/index.html", "關節與拮抗肌", "Joints and antagonistic muscles", "屈曲、伸直、肌腱和韌帶"],
  ["human", "中五", "s5", "lessons/sliding-filament/index.html", "肌絲滑動", "Sliding filament", "鈣離子、橫橋、ATP"],
  ["human", "中五", "s5", "lessons/oxygen-curve/index.html", "氧離曲線", "Oxygen dissociation curve", "S 形與波爾效應"],
  ["human", "中五", "s5", "lessons/action-potential/index.html", "動作電位", "Action potential", "鈉入、鉀出"],
  ["human", "中五", "s5", "lessons/synapse/index.html", "膽鹼突觸", "Cholinergic synapse", "鈣離子、乙酰膽鹼、酯酶"],
  ["human", "中五", "s5", "lessons/menstrual/index.html", "月經週期", "Menstrual cycle", "FSH、雌激素、LH、孕酮"],
  ["human", "中六", "s6", "Form 6/01_Glucose_Homeostasis/index.html", "血糖穩態", "Blood glucose homeostasis", "胰島素、胰高血糖素、負回饋"],
  ["human", "中六", "s6", "Form 6/11_Nephron_Osmoregulation/index.html", "腎元與滲透調節", "Nephron and osmoregulation", "超濾、重吸收、ADH"],
  ["human", "中六", "s6", "lessons/immunity/index.html", "特異性免疫", "Specific immunity", "克隆選擇和記憶細胞"]
].map(([unit, form, formKey, href, title, en, blurb]) => ({ unit, form, formKey, href, title, en, blurb }));

const unitMeta = [
  ["cell", "細胞與生命分子", "Cells and Molecules of Life"],
  ["env", "生物與環境", "Organisms and Environment"],
  ["gene", "遺傳與進化", "Genetics and Evolution"],
  ["human", "人體生理", "Human Physiology"]
];

function card(href, item) {
  return `      <a class="cardlink" href="${href}">
        <span class="badge">${item.form}</span>
        <strong>${item.title}</strong>
        <em>${item.en}</em>
        <span>${item.blurb}</span>
      </a>`;
}

function pageShell({ title, back, depth, intro, body }) {
  const common = "../".repeat(depth) + "common/";
  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="${common}ncs-i18n.css" />
  <script src="${common}ncs-i18n.js" defer></script>
  <style>
    body { margin: 0; font-family: "IBM Plex Sans", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif; background: #f0fdf4; color: #0f172a; }
    main { max-width: 980px; margin: 0 auto; padding: 28px 16px 48px; }
    a.back { color: #047857; font-weight: 700; text-decoration: none; }
    h1 { margin: 12px 0 0; }
    .intro { color: #475569; }
    h2 { margin: 28px 0 12px; }
    .en { color: #64748b; font-weight: 600; font-size: 0.9rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
    a.cardlink { display: grid; gap: 4px; background: #fff; border: 1px solid #d1fae5; border-radius: 16px; padding: 14px; text-decoration: none; color: inherit; }
    a.cardlink:hover { border-color: #059669; }
    a.cardlink strong { color: #065f46; }
    a.cardlink em { font-style: normal; color: #64748b; font-size: 13px; }
    a.cardlink span, .badge { color: #64748b; font-size: 13px; }
    .badge { font-weight: 800; color: #047857; }
    .forms { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
    .forms a, .others a { background: #fff; border: 1px solid #d1fae5; border-radius: 12px; padding: 8px 12px; text-decoration: none; color: #065f46; font-weight: 700; }
    footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 28px; }
  </style>
</head>
<body>
  <main>
    <a class="back" href="${back}">← 返回</a>
    <h1>${title}</h1>
    ${intro}
    ${body}
    <footer>@HKSTEAMAI All Copy-Right Reserved.</footer>
  </main>
</body>
</html>
`;
}

function sections(items, hrefFor) {
  return unitMeta
    .map(([id, title, en]) => {
      const group = items.filter((item) => item.unit === id);
      if (!group.length) return "";
      return `    <section>
      <h2>${title}</h2>
      <p class="en">${en}</p>
      <div class="grid">
${group.map((item) => card(hrefFor(item), item)).join("\n")}
      </div>
    </section>`;
    })
    .join("\n");
}

function writeHubs() {
  const main = pageShell({
    title: "生物科 · Biology",
    back: "../index.html",
    depth: 2,
    intro: `<p class="intro">高中生物按 DSE 課題分組。同一單元的課放在一起，每張卡註明年級。每課都有學習目標、一件要做的事、即時回饋和短音。</p>
    <div class="forms">
      <a href="Form%204/index.html">中四</a>
      <a href="Form%205/index.html">中五</a>
      <a href="Form%206/index.html">中六</a>
      <a href="apps/index.html">全部課題</a>
    </div>`,
    body: sections(catalog, (item) => item.href) + `
    <section>
      <h2>其他科學科</h2>
      <div class="forms others">
        <a href="../Physics/index.html">物理 Physics</a>
        <a href="../Chemistry/index.html">化學 Chemistry</a>
        <a href="../Junior%20Science/index.html">初中科學 Junior Science</a>
      </div>
    </section>`
  });
  fs.writeFileSync(path.join(root, "index.html"), main, "utf8");

  const forms = [
    ["s4", "Form 4", "中四生物 · Form 4", "細胞與生命分子為主，並開始學習心臟。"],
    ["s5", "Form 5", "中五生物 · Form 5", "酶、生物與環境、遺傳進化，以及協調和生殖。"],
    ["s6", "Form 6", "中六生物 · Form 6", "血糖、腎元、免疫概念，以及重組 DNA 和電泳的原理。"]
  ];
  for (const [key, folder, title, blurb] of forms) {
    const items = catalog.filter((item) => item.formKey === key);
    const html = pageShell({
      title,
      back: "../index.html",
      depth: 3,
      intro: `<p class="intro">${blurb} 同一單元的課放在一起。</p>`,
      body: sections(items, (item) => (item.href.startsWith(folder + "/") ? item.href.slice(folder.length + 1) : "../" + item.href))
    });
    fs.writeFileSync(path.join(root, folder, "index.html"), html, "utf8");
  }

  const apps = pageShell({
    title: "生物課題 · Biology topics",
    back: "../index.html",
    depth: 3,
    intro: `<p class="intro">全部仍在使用的課，按課題而不是按舊模擬程式排列。空白的 dist 入口已不在這裡。</p>`,
    body: sections(catalog, (item) => "../" + item.href)
  });
  fs.writeFileSync(path.join(root, "apps", "index.html"), apps, "utf8");
}

function patchForms() {
  const files = [];
  for (const folder of ["Form 4", "Form 5", "Form 6"]) {
    const base = path.join(root, folder);
    for (const name of fs.readdirSync(base)) {
      const file = path.join(base, name, "index.html");
      if (fs.existsSync(file)) files.push(file);
    }
  }
  const tag = '  <script src="../../kit/tone.js"></script>\n  <script src="../../kit/form-banner.js"></script>\n';
  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    text = text.replaceAll("核膜解体", "核膜解體");
    text = text.replaceAll("尽量充盈心室", "盡量充盈心室");
    text = text.replaceAll("体循环需更高壓", "體循環需更高壓");
    text = text.replace(
      'title: "The 10% rule", titleZh: "10% 法則"',
      'title: "About 10% is transferred", titleZh: "約一成能量轉移"'
    );
    if (!text.includes("kit/form-banner.js")) {
      text = text.replace(
        '  <script src="../../../../common/interactive-lab-kit.js"></script>',
        '  <script src="../../../../common/interactive-lab-kit.js"></script>\n' + tag
      );
    }
    fs.writeFileSync(file, text, "utf8");
  }
}

for (const lesson of lessons) writeLesson(lesson);
writeHubs();
patchForms();
console.log("lessons", lessons.length, "catalog", catalog.length);
