/* PINGXINGGUAN VICTORY · 平型關大捷 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-pingxingguan",
      "title_zh": "平型關大捷",
      "title_en": "PINGXINGGUAN VICTORY",
      "subtitle": "1937年9月25日",
      "factionOrder": [
          "eighth_route",
          "japan"
      ],
      "geo": {
          "minLng": 112.85,
          "maxLng": 115.05,
          "minLat": 38.45,
          "maxLat": 40.25,
          "Z": 10
      },
      "startDate": [
          1937,
          9,
          25
      ],
      "introCam": {
          "lng": 113.95,
          "lat": 39.35,
          "dist": 600,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "平型關大捷",
          "en": "PINGXINGGUAN VICTORY · 1937年9月25日",
          "narr_zh": "林彪率八路軍115師在平型關伏擊日軍補給隊。",
          "narr_en": "Lin Biao's 115th Division ambushes Japanese supply columns."
      },
      "outroCam": {
          "lng": 113.95,
          "lat": 39.35,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "land",
      "reliefScale": 0.82,
      "nextBattle": {
          "href": "../taierzhuang/",
          "title_zh": "台兒莊戰役",
          "title_en": "TAI'ERZHUANG 1938"
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
      css: "#1565c0", label_zh: "日軍", label_en: "Japanese Army",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "平型關",
              "name_en": "Pingxingguan",
              "type": "fort",
              "lng": 113.95,
              "lat": 39.35
          },
          {
              "name_zh": "靈丘",
              "name_en": "Lingqiu",
              "type": "town",
              "lng": 114.23,
              "lat": 39.44
          },
          {
              "name_zh": "繁峙",
              "name_en": "Fanshi",
              "type": "town",
              "lng": 113.27,
              "lat": 39.19
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "era_pxg",
          "faction": "eighth_route",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "八路軍115師",
          "name_en": "8th Route 115th Div.",
          "track": [
              {
                  "d": 1,
                  "lng": 113.8,
                  "lat": 39.4,
                  "s": 10000,
                  "st": "hold"
              },
              {
                  "d": 40,
                  "lng": 113.95,
                  "lat": 39.35,
                  "s": 12000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 113.95,
                  "lat": 39.35,
                  "s": 11000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "japan_pxg",
          "faction": "japan",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日軍第5師團補給隊",
          "name_en": "Japanese 5th Div. Supply",
          "track": [
              {
                  "d": 1,
                  "lng": 114.1,
                  "lat": 39.3,
                  "s": 4000,
                  "st": "march"
              },
              {
                  "d": 45,
                  "lng": 113.95,
                  "lat": 39.35,
                  "s": 1000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 35,
          "f": "eighth_route",
          "from": [
              113.8,
              39.4
          ],
          "to": [
              113.95,
              39.35
          ],
          "label": "山地伏擊",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 70,
          "lng": 113.95,
          "lat": 39.35,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "平型關大捷",
          "en": "PINGXINGGUAN VICTORY"
      }
  ];
  const notes =   {
      "summary": "平型關大捷 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "国共合作下，八路军一一五师在平型关伏击日军第五师团辎重部队；利用山地伏击，击毁车辆，歼敌千余人。",
      "leaders": "平型關戰役為八路軍對日作戰首勝，林彪指揮一一五師利用山地伏擊，截擊日軍補給部隊。日軍第五師團一部在狹谷遭突襲，裝備與輜重損失慘重，打破日軍不可戰勝神話。此戰提升全國抗戰信心，亦確立共產黨軍隊在華北的作戰聲望，為日後游擊戰與根據地擴展鋪路。",
      "nationalPower": "日军沿平绥路推进，骄横轻敌；八路军熟悉地形，林彪指挥伏击战术得当。",
      "impact": "國共合作下首場勝仗，打破日軍不敗神話，提振全國士氣。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 113.95,
              "lat": 39.35,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年9月",
          "title_zh": "平绥路战事",
          "title_en": "Fighting on the Peiping–Suiyuan Line",
          "narration_zh": "日军第五师团沿平绥路西进，威胁山西。",
          "narration_en": "Japanese 5th Division advances west on the Peiping–Suiyuan railway.",
          "focus": [
              "japan_pxg"
          ],
          "side": "japan",
          "commanders": [
              {
                  "zh": "板垣征四郎",
                  "en": "Seishirō Itagaki"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 113.98,
              "lat": 39.38,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年9月24日",
          "title_zh": "八路军设伏",
          "title_en": "Eighth Route Ambush",
          "narration_zh": "林彪率一一五师在平型关乔沟设伏，待敌辎重部队进入。",
          "narration_en": "Lin Biao's 115th Division sets an ambush at Pingxingguan Pass.",
          "focus": [
              "era_pxg"
          ],
          "side": "eighth_route",
          "commanders": [
              {
                  "zh": "林彪",
                  "en": "Lin Biao"
              },
              {
                  "zh": "聂荣臻",
                  "en": "Nie Rongzhen"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 113.95,
              "lat": 39.35,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年9月25日",
          "title_zh": "平型关大捷",
          "title_en": "Victory at Pingxingguan",
          "narration_zh": "八路军伏击日军辎重部队，击毁车辆数百，歼敌一千余人。",
          "narration_en": "Ambush destroys hundreds of vehicles — over 1,000 Japanese killed.",
          "focus": [
              "era_pxg",
              "japan_pxg"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "歼敌千余人",
          "forces_en": "1,000+ enemy killed"
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 113.95,
              "lat": 39.35,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年9月",
          "title_zh": "全国振奋",
          "title_en": "Nationwide Morale Boost",
          "narration_zh": "平型关大捷消息传开，打破日军不可战胜神话，鼓舞抗战士气。",
          "narration_en": "News of victory shatters the myth of Japanese invincibility.",
          "focus": [
              "era_pxg"
          ],
          "side": "eighth_route",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 113.95,
              "lat": 39.35,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年",
          "title_zh": "国共合作首战",
          "title_en": "First CCP–GMD Victory",
          "narration_zh": "平型关为国共合作抗日首场大胜，具有重要政治与军事意义。",
          "narration_en": "Pingxingguan is the first major victory of the United Front against Japan.",
          "focus": [],
          "side": "eighth_route",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "平型關大捷",
      "title_en": "PINGXINGGUAN VICTORY",
      "narration_zh": "本戰役為 DSE 中史重要考點：國共合作下首場勝仗，打破日軍不敗神話，提振全國士氣",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 113.95,
          "lat": 39.35,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
