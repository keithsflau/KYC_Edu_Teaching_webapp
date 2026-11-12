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
      "sources": "八路軍一一五師平型關戰鬥報告的通行整理、日本第五師團作戰記載的對照研究，以及《抗日戰爭史》軍事科學院本相關章節。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "國共合作下，八路軍一一五師在平型關伏擊日軍第五師團辎重部隊；利用山地伏擊，擊毁車辆，殲敵千餘人。",
      "leaders": "林彪率一一五師在平型關伏擊日軍第五師團的輜重部隊，利用狹路擊毀車輛、斃傷日軍一部。這是一次伏擊戰的結果。",
      "nationalPower": "日軍沿平绥路推進，骄横轻敵；八路軍熟悉地形，林彪指揮伏擊戰術得当。",
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
          "title_zh": "平绥路戰事",
          "title_en": "Fighting on the Peiping–Suiyuan Line",
          "narration_zh": "日軍第五師團沿平绥路西進，威脅山西。",
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
          "title_zh": "八路軍設伏",
          "title_en": "Eighth Route Ambush",
          "narration_zh": "林彪率一一五師在平型關乔沟設伏，待敵辎重部隊進入。",
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
                  "zh": "聶榮臻",
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
          "title_zh": "平型關大捷",
          "title_en": "Victory at Pingxingguan",
          "narration_zh": "八路軍伏擊日軍辎重部隊，擊毁車辆数百，殲敵一千餘人。",
          "narration_en": "Ambush destroys hundreds of vehicles — over 1,000 Japanese killed.",
          "focus": [
              "era_pxg",
              "japan_pxg"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "殲敵千餘人",
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
          "title_zh": "全國振奮",
          "title_en": "Nationwide Morale Boost",
          "narration_zh": "平型關大捷消息传開，打破日軍不可戰勝神話，鼓舞抗戰士氣。",
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
          "title_zh": "國共合作首戰",
          "title_en": "First CCP–GMD Victory",
          "narration_zh": "平型關為國共合作抗日首场大勝，具有重要政治與軍事意義。",
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
      "narration_zh": "1937年9月25日，一一五師在平型關伏擊日軍輜重部隊。",
      "narration_en": "On 25 September 1937 the 115th Division ambushed a Japanese supply column at Pingxingguan.",
      "cam": {
          "lng": 113.95,
          "lat": 39.35,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1937年9月25日平型關伏擊日軍輜重部隊。",
      "senior": "高中：用伏擊對象和地形解釋戰果，口號放在評價。",
      "fact": "1937年9月，日軍第五師團沿平綏路西進。9月25日，八路軍一一五師在平型關喬溝伏擊其輜重和汽車隊，擊毀一批車輛，斃傷日軍一部。這是八路軍出師後的一次伏擊戰。",
      "sources": "八路軍一一五師平型關戰鬥報告的通行整理、日本第五師團作戰記載的對照研究，以及《抗日戰爭史》軍事科學院本相關章節。不以網絡百科為唯一依據。",
      "evaluation": "伏擊能得手，是因為道路狹窄、打的是輜重隊，不是因為一句「不敗神話」本身。全國士氣受震動，是這一仗的政治效果，屬於評價。",
      "judgment": {
          "ask": "哪一則說法更能解釋平型關這次戰鬥的結果？",
          "a": "因為提出了打破不敗神話的口號，所以日軍主力師團當日被全殲。",
          "b": "一一五師利用山地狹路伏擊日軍輜重和汽車隊，所以打的是補給部隊而不是整個師團。",
          "better": "b",
          "why": "戰果來自殺傷和車輛損失的對象是輜重隊。口號說明不了誰在路上、地形如何。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
