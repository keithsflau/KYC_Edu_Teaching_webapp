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
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "彭德怀指挥八路军一二〇、一二九、晋察冀等部，在华北发动百团大战；破袭正太、同蒲等铁路与公路，摧毁日军据点。",
      "leaders": "百團大戰由八路軍總司令彭德懷發動，集中一百餘個團破襲華北日軍交通線、礦廠與據點，以破壞戰削弱敵佔區控制。日軍調集重兵報復掃蕩，根據地承受巨大壓力。此戰展示共軍組織動員能力，亦引發日軍加強對華北「治安戰」，改變敵後戰場態勢。",
      "nationalPower": "日军占领区交通线漫长；八路军得民众支持，熟悉地形，擅长破袭战。",
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
          "title_zh": "破袭令下",
          "title_en": "Offensive Order Issued",
          "narration_zh": "彭德怀下令发动百团大战，破袭华北日占区交通线。",
          "narration_en": "Peng Dehuai orders the Hundred Regiments Offensive against North China rail lines.",
          "focus": [
              "era_hr"
          ],
          "side": "eighth_route",
          "commanders": [
              {
                  "zh": "彭德怀",
                  "en": "Peng Dehuai"
              }
          ],
          "assets": [],
          "forces_zh": "八路军约四十团",
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
          "title_zh": "正太路破袭",
          "title_en": "Zhengding–Taiyuan Line Cut",
          "narration_zh": "八路军同时破袭正太铁路，摧毁桥梁、隧道与车站。",
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
          "title_zh": "据点拔除",
          "title_en": "Strongpoints Destroyed",
          "narration_zh": "八路军攻克日军据点，破坏公路，缴获大批物资。",
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
          "title_zh": "日军反扫荡",
          "title_en": "Japanese Counter-sweep",
          "narration_zh": "日军集中兵力反扫荡，八路军转入反“扫荡”作战。",
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
          "title_zh": "敌后最大攻势",
          "title_en": "Largest Rear-area Offensive",
          "narration_zh": "百团大战为八路军在敌后发动的最大规模破袭攻势，沉重打击日占交通。",
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
      "narration_zh": "本戰役為 DSE 中史重要考點：中共八路軍在敵後戰場發動的最大規模破壞攻勢",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 113.58,
          "lat": 37.87,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
