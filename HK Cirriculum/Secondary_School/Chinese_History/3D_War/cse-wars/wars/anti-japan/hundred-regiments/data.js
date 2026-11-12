/* HUNDRED REGIMENTS OFFENSIVE · 百團大戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-hundred-regiments",
      "title_zh": "百團大戰",
      "title_en": "HUNDRED REGIMENTS OFFENSIVE",
      "subtitle": "1940年8–12月",
      "factionOrder": [
          "eighth_route",
          "japan"
      ],
      "geo": {
          "minLng": 111.58,
          "maxLng": 115.58,
          "minLat": 36.27,
          "maxLat": 39.47,
          "Z": 9
      },
      "startDate": [
          1940,
          8,
          20
      ],
      "introCam": {
          "lng": 113.58,
          "lat": 37.87,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "百團大戰",
          "en": "HUNDRED REGIMENTS OFFENSIVE · 1940年8–12月",
          "narr_zh": "彭德懷指揮八路軍破壞華北日軍交通線與據點。",
          "narr_en": "Peng Dehuai leads a massive campaign against Japanese infrastructure."
      },
      "outroCam": {
          "lng": 113.58,
          "lat": 37.87,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "reliefScale": 0.78,
      "nextBattle": {
          "href": "../../civil-war/liaoshen/",
          "title_zh": "遼瀋戰役",
          "title_en": "LIAO-SHEN 1948"
      }
  };
  const factions = {
    "eighth_route": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "八路軍", label_en: "Eighth Route Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "japan": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "日軍", label_en: "Japanese Occupation Force",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "正太鐵路",
              "name_en": "Zheng-Tai Railway",
              "type": "town",
              "lng": 113.58,
              "lat": 37.87
          },
          {
              "name_zh": "娘子關",
              "name_en": "Niangzi Pass",
              "type": "fort",
              "lng": 113.88,
              "lat": 37.87
          },
          {
              "name_zh": "陽泉",
              "name_en": "Yangquan",
              "type": "city",
              "lng": 113.58,
              "lat": 37.86
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "era_hr",
          "faction": "eighth_route",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "八路軍105個團",
          "name_en": "105 Eighth Route Regiments",
          "track": [
              {
                  "d": 1,
                  "lng": 113.2,
                  "lat": 38.2,
                  "s": 400000,
                  "st": "march"
              },
              {
                  "d": 50,
                  "lng": 113.58,
                  "lat": 37.87,
                  "s": 450000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 113.58,
                  "lat": 37.87,
                  "s": 400000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "japan_hr",
          "faction": "japan",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日軍華北據點",
          "name_en": "North China Garrisons",
          "track": [
              {
                  "d": 1,
                  "lng": 114,
                  "lat": 37.5,
                  "s": 60000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 113.58,
                  "lat": 37.87,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 114.2,
                  "lat": 37.3,
                  "s": 35000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 25,
          "f": "eighth_route",
          "from": [
              113.2,
              38.2
          ],
          "to": [
              113.58,
              37.87
          ],
          "label": "破壞交通線",
          "kind": "attack"
      },
      {
          "d": 70,
          "f": "japan",
          "from": [
              114.2,
              37.3
          ],
          "to": [
              113.58,
              37.87
          ],
          "label": "報復掃蕩",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 20,
          "b": 90,
          "lng": 113.58,
          "lat": 37.87,
          "kind": "firefight",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "百團大戰",
          "en": "HUNDRED REGIMENTS OFFENSIVE"
      }
  ];
  const notes =   {
      "summary": "百團大戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "八路軍總部百團大戰戰役總結的通行文本、日本華北方面軍反掃蕩記錄的對照，以及軍事科學院《中國抗日戰爭史》。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "彭德懷指揮八路軍一二〇、一二九、晋察冀等部，在華北發動百團大戰；破襲正太、同蒲等铁路與公路，摧毁日軍據點。",
      "leaders": "百團大戰由八路軍總司令彭德懷發動，集中一百餘個團破襲華北日軍交通線、礦廠與據點，以破壞戰削弱敵佔區控制。日軍調集重兵報復掃蕩，根據地承受巨大壓力。此戰展示共軍組織動員能力，亦引發日軍加強對華北「治安戰」，改變敵後戰場態勢。",
      "nationalPower": "日軍佔領區交通線漫長；八路軍得民眾支持，熟悉地形，擅長破襲戰。",
      "impact": "中共八路軍在敵後戰場發動的最大規模破壞攻勢。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 113.58,
              "lat": 37.87,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年8月",
          "title_zh": "破襲令下",
          "title_en": "Offensive Order Issued",
          "narration_zh": "彭德懷下令發動百團大戰，破襲華北日佔區交通線。",
          "narration_en": "Peng Dehuai orders the Hundred Regiments Offensive against North China rail lines.",
          "focus": [
              "era_hr"
          ],
          "side": "eighth_route",
          "commanders": [
              {
                  "zh": "彭德懷",
                  "en": "Peng Dehuai"
              }
          ],
          "assets": [],
          "forces_zh": "八路軍約四十團",
          "forces_en": "~400 regiments"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 113.6,
              "lat": 37.9,
              "dist": 660,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年8月20日",
          "title_zh": "正太路破襲",
          "title_en": "Zhengding–Taiyuan Line Cut",
          "narration_zh": "八路軍同時破襲正太铁路，摧毁桥梁、隧道與車站。",
          "narration_en": "Forces simultaneously strike the Zhengding–Taiyuan railway.",
          "focus": [
              "era_hr"
          ],
          "side": "eighth_route",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 113.55,
              "lat": 37.85,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年8–9月",
          "title_zh": "據點拔除",
          "title_en": "Strongpoints Destroyed",
          "narration_zh": "八路軍攻克日軍據點，破壞公路，繳獲大批物资。",
          "narration_en": "Japanese strongpoints fall — roads are cut, supplies captured.",
          "focus": [
              "era_hr",
              "japan_hr"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 113.58,
              "lat": 37.87,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年10月",
          "title_zh": "日軍反掃蕩",
          "title_en": "Japanese Counter-sweep",
          "narration_zh": "日軍集中兵力反掃蕩，八路軍轉入反“掃蕩”作戰。",
          "narration_en": "Japan launches counter-sweeps — the Eighth Route Army shifts to defence.",
          "focus": [
              "japan_hr"
          ],
          "side": "japan",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 113.58,
              "lat": 37.87,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年12月",
          "title_zh": "敵後最大攻勢",
          "title_en": "Largest Rear-area Offensive",
          "narration_zh": "百團大戰為八路軍在敵後發動的最大規模破襲攻勢，沉重打擊日佔交通。",
          "narration_en": "The largest CCP offensive in the rear — Japanese supply lines are badly hurt.",
          "focus": [],
          "side": "eighth_route",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "百團大戰",
      "title_en": "HUNDRED REGIMENTS OFFENSIVE",
      "narration_zh": "1940年8月至12月，八路軍破襲華北交通線，日軍其後反掃蕩。",
      "narration_en": "From August to December 1940 the Eighth Route Army cut North China railways, and Japan then counterattacked.",
      "cam": {
          "lng": 113.58,
          "lat": 37.87,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1940年8月起八路軍破襲華北交通線。",
      "senior": "高中：把破襲戰果和日軍隨後的反掃蕩分開，不把規模口號當原因。",
      "fact": "1940年8月20日，彭德懷指揮八路軍在華北同時破襲正太路等交通線和據點，戰役持續到當年年底。日軍其後集中兵力反掃蕩，八路軍轉入反掃蕩作戰。",
      "sources": "八路軍總部百團大戰戰役總結的通行文本、日本華北方面軍反掃蕩記錄的對照，以及軍事科學院《中國抗日戰爭史》。不以網絡百科為唯一依據。",
      "evaluation": "交通線長、據點分散，所以破襲能在多處同時動手。日軍接著加強掃蕩，根據地壓力變大。說它是敵後最大攻勢，是規模上的比較，不能代替破襲對象和日軍反應。",
      "judgment": {
          "ask": "哪一則說法更能解釋百團大戰的戰場結果？",
          "a": "因為稱為最大攻勢，所以日軍交通線永久斷絕，沒有反擊。",
          "b": "八路軍同時破壞鐵路和據點，日軍隨後集中兵力掃蕩，八路軍轉入防守。",
          "better": "b",
          "why": "戰役包含破襲和反掃蕩兩段。只重複規模口號，說明不了日軍為什麼能反擊。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
