/**
 * Force Explorer — HKDSE 地貌營力（實景相片 + 科學考據 + 剖面模擬）
 */
(function (global) {
  "use strict";

  /** Wikimedia Commons 實景 — 每張已核對檔名，五步不重複 */
  const PHOTO = {
    poPinView: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Po_Pin_Chau_Viewing_Platform_02-05-2025%282%29.jpg/960px-Po_Pin_Chau_Viewing_Platform_02-05-2025%282%29.jpg",
      credit: "Wikimedia · Po Pin Chau viewing platform 破邊洲",
      place: "西貢破邊洲",
    },
    hexTuff1: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hexagonal_volcanic_tuffs_at_East_Dam_of_High_Island_Reservoir_1.jpg/960px-Hexagonal_volcanic_tuffs_at_East_Dam_of_High_Island_Reservoir_1.jpg",
      credit: "Wikimedia · East Dam columnar tuff 萬宜東壩",
      place: "西貢萬宜水庫東壩",
    },
    hexTuff2: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Hexagonal_volcanic_tuffs_at_East_Dam_of_High_Island_Reservoir_2.jpg/960px-Hexagonal_volcanic_tuffs_at_East_Dam_of_High_Island_Reservoir_2.jpg",
      credit: "Wikimedia · Columnar joint close-up",
      place: "西貢萬宜水庫東壩",
    },
    poPinStack: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Po_Pin_Chau_1.jpg/960px-Po_Pin_Chau_1.jpg",
      credit: "Wikimedia · Po Pin Chau sea stack",
      place: "西貢破邊洲",
    },
    eastDamPan: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/East_Dam%2C_High_Island_Reservoir_1.jpg/960px-East_Dam%2C_High_Island_Reservoir_1.jpg",
      credit: "Wikimedia · East Dam panorama",
      place: "萬宜水庫東壩",
    },
    stonePillar: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Sai_Kung_East_Dam_Stone_Pillar.JPG/960px-Sai_Kung_East_Dam_Stone_Pillar.JPG",
      credit: "Wikimedia · Sai Kung columnar tuff pillar",
      place: "萬宜水庫東壩",
    },
    seaCaveEastDam: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sai_Kung_East_Dam_Sea_Cave.JPG/960px-Sai_Kung_East_Dam_Sea_Cave.JPG",
      credit: "Wikimedia · Sea cave at East Dam",
      place: "萬宜水庫東壩海蝕洞",
    },
    needle03: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Needle_Hill_03.jpg/960px-Needle_Hill_03.jpg",
      credit: "Wikimedia · Needle Hill 針山",
      place: "沙田針山",
    },
    needlePeak: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Peak_of_Needle_Hill.jpg/960px-Peak_of_Needle_Hill.jpg",
      credit: "Wikimedia · Peak of Needle Hill",
      place: "沙田針山",
    },
    needle05: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Needle_Hill_05.jpg/960px-Needle_Hill_05.jpg",
      credit: "Wikimedia · Needle Hill ridge",
      place: "沙田針山",
    },
    taiMoShan: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tai_Mo_Shan_3.jpg/960px-Tai_Mo_Shan_3.jpg",
      credit: "Wikimedia · Tai Mo Shan 大帽山",
      place: "大帽山",
    },
    castlePeak: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Castle_Peak%2C_Hong_Kong.jpg/960px-Castle_Peak%2C_Hong_Kong.jpg",
      credit: "Wikimedia · Castle Peak 青山",
      place: "屯門青山",
    },
    choiHeiPark: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Choi_Hei_Road_Park_(Hong_Kong).jpg/960px-Choi_Hei_Road_Park_(Hong_Kong).jpg",
      credit: "Wikimedia · Choi Hei Road Park 彩禧路公園",
      place: "觀塘（前平山採石場）",
    },
    choiHeiView: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Choi_Hei_Road_Park_View_2011.jpg/960px-Choi_Hei_Road_Park_View_2011.jpg",
      credit: "Wikimedia · Granite boulders in park",
      place: "觀塘彩禧路公園",
    },
    amahRock: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HK_Amah_Rock.jpg/960px-HK_Amah_Rock.jpg",
      credit: "Wikimedia · Amah Rock 望夫石",
      place: "沙田",
    },
    lionRock: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Lion_Rock.jpg/960px-Lion_Rock.jpg",
      credit: "Wikimedia · Lion Rock 獅子山",
      place: "獅子山",
    },
    apLeiPai: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ap_Lei_Pai.jpg/960px-Ap_Lei_Pai.jpg",
      credit: "Wikimedia · Ap Lei Pai 鴨脷排",
      place: "鴨脷洲對開",
    },
    pingChauCoast: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ping_Chau5.JPG/960px-Ping_Chau5.JPG",
      credit: "Wikimedia · Tung Ping Chau coast 東平洲",
      place: "東平洲",
    },
    kangArch: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/View_from_Kang_Lau_Shek_Tung_Ping_Chau_20201115.jpg/960px-View_from_Kang_Lau_Shek_Tung_Ping_Chau_20201115.jpg",
      credit: "Wikimedia · Kang Lau Shek 更樓石",
      place: "東平洲更樓石",
    },
    ngTung11: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ng_Tung_Chai_11.jpg/960px-Ng_Tung_Chai_11.jpg",
      credit: "Wikimedia · Ng Tung Chai 梧桐寨",
      place: "大埔梧桐寨（南涌上游）",
    },
    ngTung01: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Ng_Tung_Chai_01.jpg/960px-Ng_Tung_Chai_01.jpg",
      credit: "Wikimedia · Ng Tung Chai stream",
      place: "大埔梧桐寨",
    },
    ngTung03: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ng_Tung_Chai_03.jpg/960px-Ng_Tung_Chai_03.jpg",
      credit: "Wikimedia · Ng Tung Chai gorge",
      place: "大埔梧桐寨",
    },
    lamTsuenMid: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Lam_Tsuen_River_200905.jpg/960px-Lam_Tsuen_River_200905.jpg",
      credit: "Wikimedia · Lam Tsuen River 林村河",
      place: "大埔林村河",
    },
    lamTsuenPlain: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Lam_Tsuen_River_Near_Kwong_Fuk.jpg/960px-Lam_Tsuen_River_Near_Kwong_Fuk.jpg",
      credit: "Wikimedia · Lam Tsuen downstream",
      place: "大埔林村河下游",
    },
    ceddSign: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/A_sign_posted_by_the_Civil_Engineering_and_Development_Department_(Hong_Kong).jpg/960px-A_sign_posted_by_the_Civil_Engineering_and_Development_Department_(Hong_Kong).jpg",
      credit: "Wikimedia · CEDD landslide warning sign",
      place: "香港斜坡",
    },
    bowenRoad: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/HK_Bowen_Road_Stubbs_Road.JPG/960px-HK_Bowen_Road_Stubbs_Road.JPG",
      credit: "Wikimedia · Bowen Road cut slope 寶雲道",
      place: "半山寶雲道",
    },
    shauKeiWanSlide: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Shau_Kei_Wan_Landslide_20230908.png/960px-Shau_Kei_Wan_Landslide_20230908.png",
      credit: "Wikimedia · Shau Kei Wan landslide 2023-09-08",
      place: "筲箕灣",
    },
    pokFuLam: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pok_Fu_Lam.jpg/960px-Pok_Fu_Lam.jpg",
      credit: "Wikimedia · Pok Fu Lam 薄扶林",
      place: "薄扶林",
    },
    reclaim1953: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/HK_Central_Reclamation_1953.jpg/960px-HK_Central_Reclamation_1953.jpg",
      credit: "Wikimedia · Central reclamation 1953",
      place: "中環",
    },
    reclaimBuild: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/HK_City_Hall_Views_Victoria_Harbour_Land_Reclamation_Construction_Site_n_Central_Public_Pier_9_n_Kln.JPG/960px-HK_City_Hall_Views_Victoria_Harbour_Land_Reclamation_Construction_Site_n_Central_Public_Pier_9_n_Kln.JPG",
      credit: "Wikimedia · Reclamation construction site",
      place: "中環填海工地",
    },
    reclaim2008: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Central_Reclamation_Phase_3_-_2008-01-12_4.jpg/960px-Central_Reclamation_Phase_3_-_2008-01-12_4.jpg",
      credit: "Wikimedia · Central Reclamation Phase 3",
      place: "中環填海第三期",
    },
    reclaim2010: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Central_and_Wan_Chai_Reclamation_Overview_201007.jpg/960px-Central_and_Wan_Chai_Reclamation_Overview_201007.jpg",
      credit: "Wikimedia · Central & Wan Chai Reclamation 2010",
      place: "中環及灣仔填海",
    },
    reclaim2015: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Wan_Chai_Reclamation_Work_in_Nov_2015.JPG/960px-Wan_Chai_Reclamation_Work_in_Nov_2015.JPG",
      credit: "Wikimedia · Wan Chai reclamation works 2015",
      place: "灣仔填海工程",
    },
    reclaim2018: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Central_and_Wan_Chai_Reclamation_aerial_view_2018.jpg/960px-Central_and_Wan_Chai_Reclamation_aerial_view_2018.jpg",
      credit: "Wikimedia · Reclamation aerial 2018",
      place: "維港",
    },
  };

  function photoEntry(key, cap) {
    const p = PHOTO[key];
    return { src: p.src, credit: p.credit, place: p.place, cap };
  }

  const CATEGORIES = {
    internal: { id: "internal", zh: "內營力", color: "#f97316", icon: "🌋", desc: "板塊運動、岩漿活動、構造抬升" },
    external: { id: "external", zh: "外營力", color: "#38bdf8", icon: "🌊", desc: "風化、侵蝕、搬運、沉積、重力" },
    human: { id: "human", zh: "人為營力", color: "#fbbf24", icon: "🏗", desc: "填海、削坡、採石改變地貌" },
  };

  const CASES = {
    hex_volcano: {
      id: "hex_volcano", name: "糧船湾超級火山", region: "西貢萬宜水庫東壩",
      category: "internal", viz: "volcano",
      headline: "柱狀節理（Columnar Jointing）— 熔岩冷卻收縮裂縫",
      mechanism: [
        "1.4 億年前（白堊紀末）酸性熔岩大規模噴發",
        "火山灰與熔結凝灰岩堆積成厚層",
        "熔岩由約 800–1000°C 緩慢冷卻",
        "體積收縮產生垂直裂縫 → 六角形柱體",
        "後期抬升、海岸侵蝕，露出東壩岩柱群",
      ],
      stepNotes: [
        "超級火山噴發：火山灰柱、熔岩流覆蓋海域",
        "厚層酸性凝灰岩／流紋岩堆積（High Island Formation）",
        "深埋地下緩慢冷卻 — 收縮應力均勻",
        "形成柱狀節理：剖面多呈六角形",
        "構造抬升 + 海浪侵蝕切開山體，岩柱外露",
      ],
      truth: [
        "年代：約 140 Ma（晚白堊紀）",
        "岩性：流紋岩、凝灰岩（酸性，非玄武岩）",
        "破火山口直徑約 18 km（糧船湾一帶）",
        "岩柱直徑常見 1–2 m，東壩最高柱約 30 m",
        "屬內營力（火山）+ 後期外營力（侵蝕）共同塑造",
      ],
      impacts: ["聯合國地質公園核心景點", "展示火山地貌與海岸交集", "地質考察與生態旅遊"],
      dse: "須寫「冷卻收縮 → 柱狀節理」，唔好只寫「火山噴石」。",
      fact: "香港東部世界級地質遺產",
      intensityLabel: "熔岩厚度",
      photoSteps: [
        photoEntry("eastDamPan", "萬宜東壩全景 — 糧船灣超級火山破火山口遺跡範圍"),
        photoEntry("hexTuff2", "東壩凝灰岩特寫 — 厚層酸性火山灰／熔結凝灰岩"),
        photoEntry("stonePillar", "東壩六角岩柱 — 冷卻收縮形成柱狀節理"),
        photoEntry("seaCaveEastDam", "東壩海蝕洞 — 海浪侵蝕凝灰岩（後期外營力）"),
        photoEntry("poPinStack", "破邊洲海蝕柱 — 岩柱群被海浪切離成海蝕柱"),
      ],
    },
    granite_fold: {
      id: "granite_fold", name: "花崗岩體與構造抬升", region: "大帽山 · 新界高地",
      category: "internal", viz: "fold",
      headline: "侏羅紀侵入岩 + 中生代擠壓褶皺",
      mechanism: [
        "約 1.65–1.4 億年前花崗岩漿侵入地殼",
        "深成慢冷 → 粗粒結晶花崗岩",
        "印支／燕山期板塊擠壓 → 岩層褶曲、斷層",
        "軟硬岩層差異侵蝕 → 谷山相間",
        "大帽山（957 m）為本港最高峰",
      ],
      stepNotes: [
        "岩漿房上升，侵入圍岩（深成岩）",
        "花崗岩體凝固：石英、長石、雲母",
        "後期水平構造擠壓：岩層褶皺、斷裂",
        "抬升後河流侵蝕：硬岩成山、軟岩成谷",
        "新界高地地貌定型",
      ],
      truth: [
        "花崗岩約佔香港露岩 ~50%",
        "大帽山 957 m；新界多峰為花崗岩體",
        "侵入岩常見節理，後續影響風化形態",
        "內營力抬升 + 外營力侵蝕需一併作答",
        "谷山相間：大欖涌、沙田海等為斷層谷",
      ],
      impacts: ["新界高地水源涵養", "影響市區擴展方向", "斜坡穩定與發展限制"],
      dse: "比較題：內營力抬升 vs 外營力削低 — 各舉本港例。",
      fact: "侏羅紀岩漿活動塑造香港骨幹地形",
      intensityLabel: "擠壓強度",
      photoSteps: [
        photoEntry("needle03", "針山花崗岩山體 — 侏羅紀侵入岩抬升"),
        photoEntry("needlePeak", "針山主峰 — 粗粒結晶花崗岩"),
        photoEntry("needle05", "針山山脊 — 構造擠壓後的堅硬岩體"),
        photoEntry("taiMoShan", "大帽山 957 m — 花崗岩體抬升後本港最高峰"),
        photoEntry("castlePeak", "青山 — 谷山相間的差異侵蝕地貌"),
      ],
    },
    spheroidal: {
      id: "spheroidal", name: "球狀風化", region: "屯門青山 · 大嶼山",
      category: "external", viz: "weathering",
      headline: "化學風化沿節理 — 核心石（Corestone）",
      mechanism: [
        "花崗岩具三組互相垂直節理",
        "亞熱帶高溫多雨 → 化學風化旺盛",
        "雨水沿節理滲入，邊角應力集中先風化",
        "外層風化殼（saprolite）剝落",
        "內部殘留圓滑核心石",
      ],
      stepNotes: [
        "完整花崗岩塊：三組節理裂縫",
        "雨水滲入 → 水解、氧化反應",
        "稜角優先風化（表面積大）",
        "風化殼加厚，外層呈土狀",
        "核心石露出：屯門「石蛋」、山坡散佈",
      ],
      truth: [
        "屬化學風化為主（非單純物理）",
        "節理（Joints）≠ 斷層（Faults）",
        "核心石可仍堅硬，外圍已風化",
        "風化殼加厚會增加滑坡潛勢",
        "香港年均溫高、雨量充沛有利此過程",
      ],
      impacts: ["獨特「石蛋」景觀", "風化殼影響斜坡工程", "提供鬆散物質予搬運"],
      dse: "須連繫花崗岩、節理、核心石三詞。",
      fact: "球狀風化是香港花崗岩山坡典型特徵",
      intensityLabel: "風化深度",
      photoSteps: [
        photoEntry("choiHeiPark", "彩禧路公園 — 前採石場，花崗岩節理清晰"),
        photoEntry("choiHeiView", "花崗岩風化殼與散落岩塊 — 化學風化進行中"),
        photoEntry("amahRock", "望夫石 — 典型核心石（Corestone）"),
        photoEntry("castlePeak", "青山花崗岩山坡 — 嚴重風化剝落"),
        photoEntry("lionRock", "獅子山 — 花崗岩節理控制的圓滑山形"),
      ],
    },
    coastal: {
      id: "coastal", name: "海岸侵蝕演化", region: "鴨脷排 · 東平洲 · 破邊洲",
      category: "external", viz: "coast",
      headline: "海岬 → 海蝕洞 → 海蝕門 → 海蝕柱 → 海蝕台",
      mechanism: [
        "海浪水力作用衝擊海岬",
        "磨蝕（浪攜泥沙磨擦）與溶蝕",
        "海蝕洞在岩層弱帶形成",
        "貫穿成海蝕門；頂部崩塌",
        "殘留海蝕柱、前方海蝕平台",
      ],
      stepNotes: [
        "堅硬海岬受波浪集中攻擊（繞射）",
        "潮間帶形成海蝕凹壁（Wave-cut notch）",
        "海蝕洞加深：節理與軟層控制",
        "貫穿成海蝕門（Sea arch）",
        "拱頂崩塌 → 海蝕柱；基岩成海蝕平台",
      ],
      truth: [
        "水力作用 + 磨蝕 + 磨蝕（浪攜物）",
        "侵蝕在高潮位最強（潮間帶）",
        "海蝕平台於低潮時可見",
        "更樓石（東平洲）為海蝕柱例",
        "須按次序作答 — DSE 常考序列",
      ],
      impacts: ["海岸線後退", "威脅沿岸設施", "形成地質旅遊資源"],
      dse: "五步序列圖：洞 → 門 → 柱 → 平台（唔好跳步）。",
      fact: "香港島南岸多海蝕崖與平台",
      intensityLabel: "波浪能量",
      photoSteps: [
        photoEntry("apLeiPai", "鴨脷排 — 海岬受波浪繞射集中侵蝕"),
        photoEntry("pingChauCoast", "東平洲海蝕崖 — 潮間帶凹壁形成"),
        photoEntry("seaCaveEastDam", "萬宜東壩海蝕洞 — 海浪沿弱帶加深洞穴"),
        photoEntry("kangArch", "東平洲更樓石 — 海蝕洞貫穿成海蝕門"),
        photoEntry("poPinView", "破邊洲望遊台 — 拱頂崩塌後的海蝕柱"),
      ],
    },
    river_fan: {
      id: "river_fan", name: "河流侵蝕與沉積", region: "梧桐寨 · 林村河",
      category: "external", viz: "river",
      headline: "上游下切 · 中游搬運 · 山麓沖積扇",
      mechanism: [
        "上游坡度陡 → 湍急下切（V 形谷）",
        "中游搬運泥沙、礫石",
        "出山口流速驟減",
        "扇形沖積扇沉積",
        "人類建水庫（大欖涌）改變沉積",
      ],
      stepNotes: [
        "上游：垂直侵蝕為主（跌水、窄谷）",
        "中游：側向侵蝕 + 搬運",
        "攜帶碎屑至山麓出口",
        "扇形沖積扇：分選沉積（扇頂粗、扇緣細）",
        "谷地平原成為發展與農地",
      ],
      truth: [
        "侵蝕、搬運、沉積同時發生於不同河段",
        "沖積扇常見於山麓出口",
        "大欖涌水庫截斷沉積物下游輸送",
        "香港河谷平原土地珍貴（元朗、大埔）",
        "暴雨時上游侵蝕加劇 → 下游淤積",
      ],
      impacts: ["塑造河谷地貌", "提供沖積土", "影響防洪與水庫設計"],
      dse: "須分「上游／下游」過程，舉本港河谷例。",
      fact: "山多地少 → 河谷平原成聚落核心",
      intensityLabel: "流量／坡度",
      photoSteps: [
        photoEntry("ngTung11", "梧桐寨上游 — 陡坡 V 形谷、跌水"),
        photoEntry("ngTung01", "南涌上游溪流 — 湍急下切侵蝕"),
        photoEntry("ngTung03", "梧桐寨石澗 — 搬運礫石與泥沙"),
        photoEntry("lamTsuenMid", "林村河中游 — 河道拓寬、側向侵蝕"),
        photoEntry("lamTsuenPlain", "林村河下游 — 沖積平原沉積"),
      ],
    },
    landslide: {
      id: "landslide", name: "山泥傾瀉", region: "筲箕灣 2023 · 半山斜坡",
      category: "external", viz: "landslide",
      headline: "暴雨入滲 → 孔隙水壓上升 → 沿滑動面破壞",
      mechanism: [
        "連場暴雨（日雨量可 >400 mm）",
        "雨水沿裂隙、風化層入滲",
        "土體飽和、重量增加、抗剪強度下降",
        "沿弱面（風化殼／節理面）滑動",
        "泥石覆蓋坡腳建築",
      ],
      stepNotes: [
        "乾燥斜坡：毛管水未飽和",
        "暴雨入滲：地下水位上升",
        "孔隙水壓 ↑ → 有效應力 ↓",
        "滑動面形成：土石沿弧狀面下滑",
        "坡腳堆積 debris；1972 深灣道為轉捩點",
      ],
      truth: [
        "屬塊體運動（重力）— 外營力",
        "人為削坡、排水不良會加劇（人災）",
        "1972.6.18 深灣道：促成斜坡規例",
        "全港 ~60,000 註冊斜坡須巡查",
        "紅雨／黑雨期間風險最高",
      ],
      impacts: ["人命與財產損失", "推動岩土工程制度", "限制高危斜坡發展"],
      dse: "自然（暴雨）+ 人為（削坡）須分開討論。",
      fact: "香港雨季是滑坡災害高發期",
      intensityLabel: "降雨量",
      photoSteps: [
        photoEntry("castlePeak", "青山花崗岩風化斜坡 — 暴雨前天然山坡"),
        photoEntry("bowenRoad", "寶雲道削坡路段 — 雨水沿路面與裂隙入滲"),
        photoEntry("ceddSign", "土力署告示 — 山泥傾瀉危險區（孔隙水壓上升）"),
        photoEntry("shauKeiWanSlide", "2023.9.8 筲箕灣 — 土體沿滑動面下滑"),
        photoEntry("pokFuLam", "薄扶林削坡屋苑 — 人為因素加劇風險"),
      ],
    },
    harbour_fill: {
      id: "harbour_fill", name: "維港填海", region: "中環 · 灣仔 · 西九 · 啟德",
      category: "human", viz: "reclaim",
      headline: "築堤圍海 — 香港百年海岸線改寫",
      mechanism: [
        "1890 年代起多輪填海",
        "築海堤／鋼板樁圍海",
        "海域挖泥或公眾填料填築",
        "碾壓、排水固結",
        "興建道路、商廈、基建",
      ],
      stepNotes: [
        "天然維港海岸：港闊水深",
        "築海堤界定填海界線",
        "拋填砂石、挖泥；軟泥需處理",
        "新土地高於平均海平面",
        "維港水域收窄；潮汐、水質改變",
      ],
      truth: [
        "填海為香港主要土地來源之一",
        "填料：海域挖泥、公眾填土區廢料",
        "赤鱲角填海約 2.5 億 m³（最大規模之一）",
        "中環、金鐘、灣仔北、九龍塘以南多為填海地",
        "大型工程須 EIA；影響潮汐、海豚棲息",
      ],
      impacts: ["土地供應、國際金融區", "維港收窄、景觀改變", "生態與漁業影響"],
      dse: "評估題須寫利弊 + 緩解（EIA、監測）。",
      fact: "填海塑造今日中環天際線",
      intensityLabel: "填海規模",
      photoSteps: [
        photoEntry("reclaim1953", "1953 年中環 — 填海前的維港海岸線"),
        photoEntry("reclaimBuild", "中環填海工地 — 築堤圍海、挖泥填料"),
        photoEntry("reclaim2008", "中環填海第三期 — 新土地平整"),
        photoEntry("reclaim2015", "2015 灣仔填海工程 — 填料與施工"),
        photoEntry("reclaim2018", "2018 航拍照 — 填海後維港水域收窄"),
      ],
    },
    cut_slope: {
      id: "cut_slope", name: "削坡與人為斜坡", region: "半山寶雲道 · 薄扶林",
      category: "human", viz: "slope",
      headline: "開發斜坡 — 改變地形、排水與穩定性",
      mechanism: [
        "削去山坡建造平台",
        "改變天然地表排水路徑",
        "築擋土牆、暗渠、護土牆",
        "填土超載或護坡不當",
        "暴雨時人為斜坡易成滑坡源",
      ],
      stepNotes: [
        "天然山坡：植被、表層排水",
        "削坡：移除支撐、產生臨時陡面",
        "平台建屋；排水須重新設計",
        "若排水堵塞／超載 → 穩定性下降",
        "秀茂坪 1976：削坡 + 排水問題案例",
      ],
      truth: [
        "《建築物（斜坡）規例》規管新建斜坡",
        "新建斜坡須岩土報告及排水設計",
        "人為營力可觸發「人災」",
        "與 1972 深灣後監管制度相關",
        "工程成本增加但減少長期風險",
      ],
      impacts: ["土地供應 vs 安全", "推高建造成本", "須持續巡查維修"],
      dse: "人為因素須與自然暴雨因素分開。",
      fact: "屋宇署 + 土力工程處監管斜坡",
      intensityLabel: "削坡幅度",
      photoSteps: [
        photoEntry("castlePeak", "青山天然山坡 — 植被覆蓋、表層排水"),
        photoEntry("bowenRoad", "寶雲道 — 削坡開路，改變排水路徑"),
        photoEntry("pokFuLam", "薄扶林 — 削坡建造住宅平台"),
        photoEntry("choiHeiPark", "觀塘前採石場 — 大規模削坡遺跡"),
        photoEntry("ceddSign", "土力署斜坡警示 — 人為斜坡須持續監管"),
      ],
    },
  };

  const GROUPS = [
    { category: "internal", title: "內營力", cases: ["hex_volcano", "granite_fold"] },
    { category: "external", title: "外營力", cases: ["spheroidal", "coastal", "river_fan", "landslide"] },
    { category: "human", title: "人為營力", cases: ["harbour_fill", "cut_slope"] },
  ];

  const W = 480, H = 400, SEA = 228;

  function lbl(x, y, t, fill, size, anchor) {
    return `<text x="${x}" y="${y}" fill="${fill || "#94a3b8"}" font-size="${size || 10}" font-family="Inter,system-ui,sans-serif" text-anchor="${anchor || "start"}">${t}</text>`;
  }

  function arrow(x1, y1, x2, y2, color) {
    const c = color || "#fbbf24";
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.2" marker-end="url(#arr)"/>`;
  }

  function seaBg() {
    return `
      <rect x="0" y="0" width="${W}" height="${SEA - 28}" fill="url(#sky)"/>
      <rect x="0" y="${SEA}" width="${W}" height="${H - SEA}" fill="url(#sea)"/>
      <line x1="0" y1="${SEA}" x2="${W}" y2="${SEA}" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 5"/>
      ${lbl(8, SEA - 6, "平均海平面 (MSL)", "#38bdf8", 10)}`;
  }

  function svgDefs() {
    return `<defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1628"/><stop offset="100%" stop-color="#1a2840"/></linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a7a9e"/><stop offset="100%" stop-color="#0c3d55"/></linearGradient>
      <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24"/></marker>
    </defs>`;
  }

  function drawHexColumns(count, baseY) {
    let s = "";
    for (let col = 0; col < count; col++) {
      for (let row = 0; row < 3; row++) {
        const cx = 300 + col * 22 + (row % 2) * 11;
        const cy = baseY - row * 26;
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          pts.push(`${cx + 9 * Math.cos(a)},${cy + 11 * Math.sin(a)}`);
        }
        s += `<polygon points="${pts.join(" ")}" fill="#7a6a55" stroke="#5c4a3a" stroke-width="0.8"/>`;
      }
    }
    return s;
  }

  function svgVolcano(step, t) {
    const thick = 40 + t * 80;
    const ashOp = step >= 1 ? 0.35 + t * 0.25 : 0;
    const cols = step >= 3 ? 4 : step >= 2 ? 2 : 0;
    let body = svgDefs() + seaBg();
    body += `<polygon points="140,${SEA} 240,${SEA - thick - 60} 340,${SEA}" fill="#3d3d3d" stroke="#555" stroke-width="1"/>`;
    body += lbl(240, SEA - thick - 72, "火山錐／凝灰岩層", "#cbd5e1", 9, "middle");
    if (step >= 1) {
      body += `<ellipse cx="240" cy="${SEA - thick - 55}" rx="${28 + t * 15}" ry="10" fill="#ff4500" opacity="0.9"/>`;
      body += `<ellipse cx="240" cy="${SEA - thick - 75}" rx="${40 + t * 25}" ry="${18 + t * 10}" fill="#666" opacity="${ashOp}"/>`;
      body += lbl(240, SEA - thick - 90, "火山灰柱 · 熔岩噴出", "#ffaa00", 9, "middle");
    }
    if (step >= 2) {
      body += `<rect x="270" y="${SEA - thick}" width="120" height="${thick}" fill="#6b5a48" opacity="0.7"/>`;
      body += lbl(330, SEA - thick / 2, "厚層熔結凝灰岩\n緩慢冷卻", "#fde68a", 9, "middle");
      body += arrow(330, SEA - thick - 10, 330, SEA - thick + 15, "#fb923c");
      body += lbl(345, SEA - thick + 5, "熱量散失", "#fb923c", 8);
    }
    if (cols) body += drawHexColumns(cols, SEA - 5);
    if (step >= 3) {
      body += lbl(330, SEA + 35, "柱狀節理（六角形）", "#fde68a", 10, "middle");
      body += lbl(330, SEA + 50, "Columnar jointing", "#94a3b8", 8, "middle");
    }
    if (step >= 4) {
      body += `<path d="M 350 ${SEA} L 380 ${SEA - 40} L 400 ${SEA}" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      body += lbl(400, SEA + 20, "海浪侵蝕切開", "#7dd3fc", 9);
    }
    body += lbl(12, 22, "剖面考據 · 糧船湾超級火山（~140 Ma）", "#94a3b8", 11);
    return body;
  }

  function svgFold(step, t) {
    const amp = 6 + t * 22;
    const layers = ["#3d2b1f", "#5c4033", "#7a5c44", "#4a6741", "#5c5040"];
    let body = svgDefs();
    body += `<rect x="0" y="0" width="${W}" height="${H}" fill="#1a1410"/>`;
    body += `<polygon points="0,${H} 0,100 120,${80 - t * 25} 280,${70 - t * 35} 400,95 400,${H}" fill="#2d4a35" opacity="0.4"/>`;
    body += lbl(200, 55, "地表（抬升後）", "#86efac", 9, "middle");
    for (let i = 0; i < 5; i++) {
      const y0 = 120 + i * 28;
      const phase = step * 0.5 + i * 0.4;
      body += `<path d="M 30 ${y0} Q 150 ${y0 - amp * Math.sin(phase)} 270 ${y0} T 450 ${y0}" fill="none" stroke="${layers[i]}" stroke-width="12" opacity="0.9"/>`;
    }
    if (step >= 1) {
      body += arrow(60, 200, 120, 185, "#f97316");
      body += lbl(125, 182, "水平擠壓 σ", "#fb923c", 9);
    }
    if (step >= 2) {
      body += `<ellipse cx="200" cy="250" rx="55" ry="70" fill="#9ca3af" opacity="0.35" stroke="#d1d5db"/>`;
      body += lbl(200, 255, "花崗岩侵入體", "#e2e8f0", 9, "middle");
    }
    if (step >= 3) {
      body += lbl(200, 340, "背斜／向斜褶皺", "#fde68a", 10, "middle");
    }
    if (step >= 4) {
      body += arrow(320, 120, 320, 160, "#38bdf8");
      body += lbl(328, 145, "河流侵蝕\n削低谷地", "#7dd3fc", 8);
    }
    body += lbl(12, 22, "構造剖面 · 侏羅紀花崗岩 + 擠壓褶皺", "#94a3b8", 11);
    return body;
  }

  function svgWeathering(step, t) {
    const peel = step * 14 + t * 20;
    const r = Math.max(28, 58 - step * 6 - t * 8);
    let body = svgDefs();
    body += `<rect x="0" y="0" width="${W}" height="${H}" fill="#1c1917"/>`;
    body += lbl(12, 22, "球狀風化剖面 · 花崗岩 + 節理", "#94a3b8", 11);
    const jx = [130, 155, 180, 205, 230, 255, 280, 305, 330];
    jx.forEach((x) => {
      body += `<line x1="${x}" y1="70" x2="${x}" y2="330" stroke="#57534e" stroke-width="1" stroke-dasharray="4 4"/>`;
    });
    body += lbl(340, 80, "節理面\n(Joints)", "#78716c", 8);
    body += `<rect x="110" y="70" width="230" height="260" fill="#8b5a2b" opacity="${0.12 + step * 0.06}" stroke="#a08060" stroke-width="1"/>`;
    body += lbl(115, 340, "風化殼 Saprolite", "#d97706", 9);
    for (let i = 0; i < step; i++) {
      body += `<rect x="${120 + peel}" y="${90 + i * 55}" width="${210 - peel * 2}" height="45" fill="none" stroke="#92400e" stroke-width="1" opacity="0.5"/>`;
    }
    body += `<circle cx="230" cy="200" r="${r}" fill="#9ca3af" stroke="#e5e7eb" stroke-width="2"/>`;
    body += lbl(230, 204, "核心石", "#1f2937", 11, "middle");
    if (step >= 1) body += arrow(230, 90, 230, 200 - r, "#38bdf8");
    if (step >= 2) body += lbl(230, 115, "雨水滲入 · 化學風化", "#7dd3fc", 9, "middle");
    if (step >= 4) body += lbl(230, 365, "邊角先風化 → 趨近球形", "#fde68a", 10, "middle");
    return body;
  }

  function svgCoast(step, t) {
    const wave = 4 + t * 8;
    const stages = [
      { title: "海岬受浪集中攻擊", cliff: "M 50 250 L 50 100 L 220 100 L 220 250 Z", extra: "", note: "繞射使海岬兩側能量集中" },
      { title: "海蝕凹壁（Wave-cut notch）", cliff: "M 50 250 L 50 100 L 220 100 L 220 250 Z", extra: `<path d="M 90 250 L 90 200 Q 120 ${195 - wave} 150 200 L 150 250" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1"/>`, note: "高潮位侵蝕最強" },
      { title: "海蝕洞貫穿 → 海蝕門", cliff: "M 50 250 L 50 100 L 220 100 L 220 250 Z", extra: `<path d="M 95 250 L 95 155 Q 135 115 175 155 L 175 250" fill="#0c4a6e"/>`, note: "軟弱節理控制侵蝕路徑" },
      { title: "拱頂崩塌 → 海蝕柱", cliff: "M 50 250 L 50 100 L 130 100 L 130 250 Z", extra: `<rect x="168" y="130" width="28" height="85" fill="#57534e" rx="2"/><rect x="155" y="250" width="55" height="6" fill="#57534e" opacity="0.6"/>`, note: "更樓石類型地貌" },
      { title: "海蝕平台（低潮可見）", cliff: "M 50 250 L 50 100 L 100 100 L 100 250 Z", extra: `<rect x="168" y="165" width="18" height="50" fill="#57534e"/><rect x="130" y="${SEA}" width="200" height="12" fill="#64748b" opacity="0.7"/>`, note: "柱體縮小；平台擴展" },
    ];
    const s = stages[Math.min(step, stages.length - 1)];
    let body = svgDefs() + seaBg();
    body += `<path d="${s.cliff}" fill="#57534e" stroke="#44403c" stroke-width="1"/>`;
    body += s.extra;
    body += `<path d="M 220 ${SEA - wave} Q 280 ${SEA - 15 - wave} 340 ${SEA} T 460 ${SEA - wave}" fill="none" stroke="#7dd3fc" stroke-width="2" opacity="0.7"/>`;
    body += lbl(340, SEA + 28, "波浪 · 碎屑磨蝕", "#7dd3fc", 9);
    body += lbl(240, 28, s.title, "#fde68a", 12, "middle");
    body += lbl(240, 48, s.note, "#94a3b8", 9, "middle");
    body += lbl(12, 22, "海岸侵蝕序列（DSE 五步）", "#94a3b8", 11);
    body += lbl(400, SEA + 55, `步驟 ${step + 1}/5`, "#4ade80", 10);
    return body;
  }

  function svgRiver(step, t) {
    const fan = 35 + step * 22 + t * 40;
    const cut = step * 12 + t * 15;
    let body = svgDefs();
    body += `<rect x="0" y="0" width="${W}" height="${H}" fill="#0f172a"/>`;
    body += lbl(12, 22, "河流地貌剖面 · 上游→山麓", "#94a3b8", 11);
    body += `<path d="M 0 280 L 200 ${140 - cut} L 400 280 L 400 ${H} L 0 ${H} Z" fill="#365314" opacity="0.5"/>`;
    body += `<path d="M 200 ${140 - cut} L 200 280" stroke="#38bdf8" stroke-width="${3 + t * 2}" fill="none"/>`;
    body += lbl(205, 200, "V 形谷\n垂直侵蝕", "#7dd3fc", 8);
    if (step >= 1) {
      body += arrow(200, 160, 240, 200, "#fbbf24");
      body += lbl(248, 198, "搬運泥沙", "#fde68a", 8);
    }
    if (step >= 2) {
      const fx = 200 - fan, fy = 340;
      body += `<path d="M 200 ${280} L ${fx} ${fy} L ${200 + fan} ${fy} Q 220 300 200 280" fill="#a16207" opacity="${0.35 + step * 0.12}"/>`;
      body += lbl(200, fy + 18, "沖積扇 Alluvial fan", "#fde68a", 9, "middle");
      body += lbl(200, fy + 32, "扇頂粗粒 → 扇緣細粒", "#94a3b8", 8, "middle");
    }
    if (step >= 3) body += lbl(80, 120, "上游：下切", "#86efac", 9);
    if (step >= 4) body += lbl(350, 300, "下游：沉積", "#86efac", 9);
    return body;
  }

  function svgLandslide(step, t) {
    const rain = step * 0.25 + t * 0.5;
    const slide = step * 40 + t * 25;
    let body = svgDefs() + seaBg();
    body += `<polygon points="60,${SEA} 240,90 420,${SEA}" fill="#57534e"/>`;
    body += `<line x1="60" y1="120" x2="420" y2="200" stroke="#78716c" stroke-width="1" stroke-dasharray="5 4"/>`;
    body += lbl(430, 195, "地下水位", "#38bdf8", 8);
    for (let i = 0; i < 8 + step * 4; i++) {
      const rx = 100 + (i % 5) * 55;
      body += `<line x1="${rx}" y1="40" x2="${rx - 8}" y2="${100 + rain * 30}" stroke="#60a5fa" stroke-width="1" opacity="${0.3 + rain * 0.5}"/>`;
    }
    if (step >= 1) body += lbl(240, 55, "暴雨入滲", "#60a5fa", 10, "middle");
    if (step >= 2) {
      body += `<ellipse cx="280" cy="175" rx="90" ry="35" fill="#0ea5e9" opacity="${0.15 + step * 0.08}"/>`;
      body += lbl(280, 178, "孔隙水壓 ↑", "#7dd3fc", 9, "middle");
    }
    body += `<path d="M ${240 - slide * 0.3} ${120 + slide * 0.2} Q ${280 - slide * 0.1} ${160 + slide * 0.4} ${320} ${SEA}" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4"/>`;
    body += lbl(325, 170, "滑動面", "#f87171", 9);
    if (step >= 3) {
      body += `<polygon points="${200 - slide * 0.2},${140 + slide * 0.3} ${260 + slide * 0.1},${180 + slide * 0.5} ${300},${SEA} ${180},${SEA}" fill="#8b5a2b" opacity="0.85"/>`;
      body += lbl(240, SEA + 35, "坡腳堆積 debris", "#fde68a", 9, "middle");
    }
    body += lbl(12, 22, "山泥傾瀉機制 · 深灣/秀茂坪類型", "#94a3b8", 11);
    return body;
  }

  function svgReclaim(step, t) {
    const w = 60 + t * 200;
    const plat = SEA - 18 - t * 45;
    const coast = 200;
    let body = svgDefs() + seaBg();
    body += `<polygon points="0,${H} 0,${SEA} ${coast},${140} ${coast},${H}" fill="#5c4033"/>`;
    body += lbl(80, 180, "天然海岸\n（1850 前）", "#d6d3d1", 8);
    if (step >= 1) {
      body += `<rect x="${coast}" y="${SEA - 30}" width="8" height="90" fill="#64748b"/>`;
      body += lbl(coast + 20, SEA - 10, "海堤／鋼板樁", "#94a3b8", 8);
    }
    if (step >= 2) {
      body += `<polygon points="${coast},${SEA} ${coast + w},${plat} ${coast + w},${SEA}" fill="#94a3b8" opacity="0.85"/>`;
      for (let i = 0; i < 4; i++) {
        body += `<line x1="${coast + 10}" y1="${SEA - 5 - i * 8}" x2="${coast + w - 10}" y2="${plat + 5 + i * 3}" stroke="#cbd5e1" stroke-width="1" opacity="0.4"/>`;
      }
      body += lbl(coast + w * 0.45, (plat + SEA) / 2, "分層填料\n砂石·淤泥", "#1e293b", 8, "middle");
    }
    if (step >= 3) {
      body += `<rect x="${coast + 15}" y="${plat - 25}" width="${w - 30}" height="20" fill="#475569" opacity="0.8"/>`;
      body += lbl(coast + w * 0.5, plat - 12, "碾壓平整 · 道路", "#e2e8f0", 8, "middle");
    }
    if (step >= 4) {
      body += `<rect x="${coast + w * 0.3}" y="${plat - 55}" width="35" height="30" fill="#334155" stroke="#fbbf24"/>`;
      body += lbl(coast + w * 0.5, plat - 38, "填海土地", "#fde68a", 8, "middle");
    }
    body += `<line x1="${coast + w + 5}" y1="${SEA}" x2="${W}" y2="${SEA}" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>`;
    body += lbl(coast + w + 30, SEA + 25, "剩餘海域收窄", "#7dd3fc", 9);
    body += lbl(12, 22, "維港填海剖面考據", "#94a3b8", 11);
    body += lbl(240, H - 12, `填海幅度約 ${Math.round(t * 100)}%（示意）`, "#fde68a", 9, "middle");
    return body;
  }

  function svgSlope(step, t) {
    const cut = step * 18 + t * 35;
    let body = svgDefs();
    body += `<rect x="0" y="0" width="${W}" height="${H}" fill="#0f172a"/>`;
    body += lbl(12, 22, "削坡發展剖面", "#94a3b8", 11);
    body += `<polygon points="70,340 70,${200 - cut} 350,120 350,340" fill="#4a6741"/>`;
    body += `<polygon points="70,${200 - cut} 200,${110 - cut * 0.4} 350,120 220,${220 + cut * 0.2}" fill="#57534e" opacity="0.45"/>`;
    if (step >= 1) {
      body += `<line x1="70" y1="${200 - cut}" x2="350" y2="120" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 4"/>`;
      body += lbl(360, 125, "削坡面", "#f87171", 8);
    }
    if (step >= 2) {
      body += `<path d="M 100 ${250 - cut * 0.3} Q 150 230 200 ${260}" fill="none" stroke="#38bdf8" stroke-width="2"/>`;
      body += lbl(205, 255, "排水渠", "#7dd3fc", 8);
    }
    if (step >= 3) {
      body += `<rect x="155" y="${155 - cut * 0.5}" width="100" height="35" fill="#64748b" stroke="#fbbf24"/>`;
      body += lbl(205, 177, "住宅平台", "#fde68a", 9, "middle");
    }
    if (step >= 4) {
      body += arrow(200, 100, 230, 280, "#ef4444");
      body += lbl(235, 200, "排水失靈\n→ 滑坡", "#f87171", 8);
    }
    return body;
  }

  function renderViz(c, step, intensity) {
    const fns = {
      volcano: svgVolcano, fold: svgFold, weathering: svgWeathering,
      coast: svgCoast, river: svgRiver, landslide: svgLandslide,
      reclaim: svgReclaim, slope: svgSlope,
    };
    const fn = fns[c.viz];
    return fn ? fn(step, intensity) : lbl(240, 200, "選擇個案", "#94a3b8", 12, "middle");
  }

  function maxSteps(c) {
    return (c.stepNotes || c.mechanism).length - 1;
  }

  function createForceExplorer(container, opts) {
    const onSelect = opts.onSelect || (() => {});
    let selectedId = opts.defaultCase || "hex_volcano";
    let filterCat = "all";
    let step = 0;
    let intensity = 0.5;
    let playTimer = null;

    const root = document.createElement("div");
    root.className = "force-explorer";
    root.innerHTML = `
      <div class="force-explorer__help">
        <strong>香港實景相片</strong> — 每步一張、地點對應地貌機制（Wikimedia Commons）；縮圖列可跳步。可展開剖面示意輔助理解。
      </div>
      <div class="force-explorer__filters" id="fe-filters"></div>
      <div class="force-explorer__stage">
        <div class="force-explorer__viz-wrap">
          <figure class="force-explorer__photo-fig">
            <img class="force-explorer__photo" id="fe-photo" alt="" loading="lazy" decoding="async">
            <figcaption class="force-explorer__photo-cap" id="fe-photo-cap"></figcaption>
            <p class="force-explorer__photo-credit" id="fe-photo-credit"></p>
          </figure>
          <div class="force-explorer__photo-strip" id="fe-photo-strip" role="tablist" aria-label="步驟相片"></div>
          <details class="force-explorer__diagram" id="fe-diagram">
            <summary>📐 剖面機制示意圖（輔助理解）</summary>
            <svg class="force-explorer__svg" id="fe-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"></svg>
          </details>
          <div class="force-explorer__anim-bar">
            <button type="button" class="btn btn--primary" id="fe-play">▶ 播放機制</button>
            <button type="button" class="btn" id="fe-prev">上一步</button>
            <button type="button" class="btn" id="fe-next">下一步</button>
            <label class="force-explorer__intensity" id="fe-int-wrap">
              <span id="fe-int-label">強度</span>
              <input type="range" id="fe-intensity" min="0" max="100" value="50">
            </label>
          </div>
          <p class="force-explorer__step-caption" id="fe-caption"></p>
          <div class="force-explorer__truth" id="fe-truth"></div>
        </div>
        <div class="force-explorer__side">
          <div class="force-explorer__list" id="fe-list"></div>
          <div class="force-explorer__detail" id="fe-detail"></div>
        </div>
      </div>`;
    container.appendChild(root);

    const svgEl = root.querySelector("#fe-svg");
    const photoEl = root.querySelector("#fe-photo");
    const photoCapEl = root.querySelector("#fe-photo-cap");
    const photoCreditEl = root.querySelector("#fe-photo-credit");
    const photoStripEl = root.querySelector("#fe-photo-strip");
    const filtersEl = root.querySelector("#fe-filters");
    const listEl = root.querySelector("#fe-list");
    const detailEl = root.querySelector("#fe-detail");
    const captionEl = root.querySelector("#fe-caption");
    const truthEl = root.querySelector("#fe-truth");
    const intWrap = root.querySelector("#fe-int-wrap");
    const intLabel = root.querySelector("#fe-int-label");
    const intInput = root.querySelector("#fe-intensity");

    filtersEl.innerHTML = `
      <button type="button" class="btn is-active" data-cat="all">全部</button>
      ${Object.values(CATEGORIES).map((c) =>
        `<button type="button" class="btn" data-cat="${c.id}">${c.icon} ${c.zh}</button>`
      ).join("")}`;

    function getPhoto(c, idx) {
      const photos = c.photoSteps;
      if (!photos || !photos.length) return null;
      return photos[Math.min(idx, photos.length - 1)];
    }

    function renderPhotoStrip(c) {
      const photos = c.photoSteps || [];
      if (!photos.length) {
        photoStripEl.innerHTML = "";
        return;
      }
      photoStripEl.innerHTML = photos.map((p, i) => `
        <button type="button" class="force-explorer__thumb${i === step ? " is-active" : ""}"
          data-step="${i}" role="tab" aria-selected="${i === step}"
          title="步驟 ${i + 1}">
          <img src="${p.src}" alt="" loading="lazy" decoding="async">
          <span>${i + 1}</span>
        </button>`).join("");
      photoStripEl.querySelectorAll("[data-step]").forEach((btn) => {
        btn.onclick = () => {
          stopPlay();
          step = +btn.dataset.step;
          updateViz();
        };
      });
    }

    function updateViz() {
      const c = CASES[selectedId];
      if (!c) return;
      const notes = c.stepNotes || c.mechanism;
      const max = maxSteps(c);
      const s = Math.min(step, max);
      const photo = getPhoto(c, s);
      if (photo) {
        photoEl.src = photo.src;
        photoEl.alt = photo.cap || c.name;
        photoCapEl.textContent = photo.cap || "";
        photoCreditEl.textContent = [
          photo.place ? `📍 ${photo.place}` : "",
          photo.credit ? `📷 ${photo.credit}` : "",
        ].filter(Boolean).join(" · ");
        photoEl.style.display = "";
      } else {
        photoEl.removeAttribute("src");
        photoCapEl.textContent = "暫無實景相片";
        photoCreditEl.textContent = "";
      }
      renderPhotoStrip(c);
      svgEl.innerHTML = renderViz(c, s, intensity);
      captionEl.innerHTML = `<strong>步驟 ${s + 1}/${max + 1}</strong>：${notes[Math.min(s, notes.length - 1)]}`;
      truthEl.innerHTML = `
        <h4>📋 真相 · 考據資料</h4>
        <ul>${c.truth.map((t) => `<li>${t}</li>`).join("")}</ul>`;
      intWrap.style.display = "flex";
      intLabel.textContent = c.intensityLabel || "強度";
    }

    function renderDetail() {
      const c = CASES[selectedId];
      const cat = CATEGORIES[c.category];
      const notes = c.stepNotes || c.mechanism;
      detailEl.innerHTML = `
        <span class="force-explorer__tag" style="color:${cat.color}">${cat.icon} ${cat.zh} · ${c.region}</span>
        <h3>${c.name}</h3>
        <p class="force-explorer__headline">${c.headline}</p>
        <p><strong>完整機制</strong></p>
        <ol class="force-explorer__ol">${notes.map((n) => `<li>${n}</li>`).join("")}</ol>
        <p><strong>影響</strong></p>
        <ul class="force-explorer__bullets">${c.impacts.map((i) => `<li>${i}</li>`).join("")}</ul>
        <p class="force-explorer__dse"><strong>DSE：</strong>${c.dse}</p>
        <p class="force-explorer__fact">${c.fact}</p>`;
    }

    function renderList() {
      listEl.innerHTML = GROUPS.filter((g) => filterCat === "all" || g.category === filterCat)
        .map((g) => {
          const cat = CATEGORIES[g.category];
          return `
            <div class="case-group">
              <h3><span style="color:${cat.color}">${cat.icon}</span> ${g.title}</h3>
              <p>${cat.desc}</p>
              <div class="case-group__btns">
                ${g.cases.map((id) => {
                  const c = CASES[id];
                  return `<button type="button" class="case-btn${id === selectedId ? " is-active" : ""}"
                    data-case="${id}" style="--accent:${cat.color}">
                    <span class="case-btn__name">${c.name}</span>
                    <span class="case-btn__region">${c.region}</span>
                  </button>`;
                }).join("")}
              </div>
            </div>`;
        }).join("");
      listEl.querySelectorAll("[data-case]").forEach((btn) => {
        btn.onclick = () => select(btn.dataset.case);
      });
    }

    function select(id) {
      if (!CASES[id]) return;
      selectedId = id;
      step = 0;
      stopPlay();
      renderList();
      renderDetail();
      updateViz();
      onSelect(CASES[id]);
    }

    function stopPlay() {
      if (playTimer) { clearInterval(playTimer); playTimer = null; }
      root.querySelector("#fe-play").textContent = "▶ 播放機制";
    }

    function play() {
      const c = CASES[selectedId];
      const max = maxSteps(c);
      if (playTimer) { stopPlay(); return; }
      root.querySelector("#fe-play").textContent = "⏸ 暫停";
      playTimer = setInterval(() => {
        step = step >= max ? 0 : step + 1;
        updateViz();
      }, 2800);
    }

    filtersEl.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.onclick = () => {
        filterCat = btn.dataset.cat;
        filtersEl.querySelectorAll(".btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderList();
      };
    });

    root.querySelector("#fe-play").onclick = play;
    root.querySelector("#fe-prev").onclick = () => {
      stopPlay();
      step = Math.max(0, step - 1);
      updateViz();
    };
    root.querySelector("#fe-next").onclick = () => {
      stopPlay();
      step = Math.min(maxSteps(CASES[selectedId]), step + 1);
      updateViz();
    };
    intInput.oninput = () => {
      intensity = +intInput.value / 100;
      updateViz();
    };

    select(selectedId);
    return { select, getCases: () => CASES, getCategories: () => CATEGORIES };
  }

  global.ForceExplorer = { createForceExplorer, CASES, CATEGORIES };
})(typeof window !== "undefined" ? window : global);
