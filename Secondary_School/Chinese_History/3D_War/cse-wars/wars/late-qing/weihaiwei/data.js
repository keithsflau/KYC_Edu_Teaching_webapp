/* FALL OF WEIHAIWEI · 威海衛淪陷 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-weihaiwei",
      "title_zh": "威海衛淪陷",
      "title_en": "FALL OF WEIHAIWEI",
      "subtitle": "1895年2月",
      "factionOrder": [
          "beiyang",
          "japan"
      ],
      "geo": {
          "minLng": 121.12,
          "maxLng": 123.12,
          "minLat": 36.71,
          "maxLat": 38.31,
          "Z": 11
      },
      "startDate": [
          1895,
          2,
          1
      ],
      "introCam": {
          "lng": 122.12,
          "lat": 37.51,
          "dist": 560,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "威海衛淪陷",
          "en": "FALL OF WEIHAIWEI · 1895年2月",
          "narr_zh": "日軍陸海夾擊威海衛，北洋水師全軍覆沒，丁汝昌殉國。",
          "narr_en": "Japan besieges Weihaiwei — the Beiyang Fleet is destroyed."
      },
      "outroCam": {
          "lng": 122.12,
          "lat": 37.51,
          "dist": 672,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "bay",
      "floodRelief": 0.42,
      "nextBattle": {
          "href": "../../anti-japan/songhu/",
          "title_zh": "淞滬會戰",
          "title_en": "SONG-HU 1937"
      }
  };
  const factions = {
    "beiyang": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "北洋水師", label_en: "Beiyang Fleet",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "japan": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "日軍", label_en: "Japanese Forces",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "威海衛",
              "name_en": "Weihaiwei",
              "type": "fort",
              "lng": 122.12,
              "lat": 37.51
          },
          {
              "name_zh": "劉公島",
              "name_en": "Liugong Island",
              "type": "fort",
              "lng": 122.18,
              "lat": 37.5
          },
          {
              "name_zh": "成山角",
              "name_en": "Chengshan",
              "type": "bay",
              "lng": 122.68,
              "lat": 37.39
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "polygon",
              "ring": [
                  [
                      121.88,
                      37.64
                  ],
                  [
                      122.45,
                      37.74
                  ],
                  [
                      122.4,
                      37.36
                  ],
                  [
                      122.05,
                      37.3
                  ],
                  [
                      121.85,
                      37.46
                  ]
              ]
          },
          {
              "kind": "disc",
              "lng": 122.18,
              "lat": 37.5,
              "radius": 0.07
          }
      ]
  };
  const units =   [
      {
          "id": "beiyang_wh",
          "faction": "beiyang",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "威海衛北洋殘部",
          "name_en": "Beiyang Remnants",
          "track": [
              {
                  "d": 1,
                  "lng": 122.18,
                  "lat": 37.5,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 122.12,
                  "lat": 37.51,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "japan_wh",
          "faction": "japan",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "日軍陸海聯合",
          "name_en": "Japanese Combined Force",
          "track": [
              {
                  "d": 1,
                  "lng": 122.5,
                  "lat": 37.7,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 122.12,
                  "lat": 37.51,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 122.12,
                  "lat": 37.51,
                  "s": 75000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "japan",
          "from": [
              122.5,
              37.7
          ],
          "to": [
              122.12,
              37.51
          ],
          "label": "陸海夾擊",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 25,
          "b": 90,
          "lng": 122.12,
          "lat": 37.51,
          "kind": "naval",
          "i": 1.2
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "威海衛淪陷",
          "en": "FALL OF WEIHAIWEI"
      }
  ];
  const notes =   {
      "summary": "威海衛淪陷 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "日军海陆合围威海卫，以鱼雷艇夜袭北洋泊地；刘公岛孤立无援，丁汝昌拒降自尽，北洋水师全军覆没。",
      "leaders": "威海衛陷落前夕，丁汝昌率殘存北洋艦隊困守劉公島，面對日軍海陸夾擊與援兵不至。定遠管帶劉步蟾等將領力戰殉國，水兵士氣在圍困中逐漸瓦解。丁汝昌拒降服毒殉職，北洋水師全軍覆沒，標誌清朝近代海軍建設的失敗，《馬關條約》簽訂，列強瓜分中國加劇。",
      "nationalPower": "北洋经黄海海战已元气大伤；日本陆海军协同，占据威海湾炮台，切断陆上补给。",
      "impact": "北洋艦隊全軍覆沒，標誌著「洋務運動」宣告徹底失敗。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 122.12,
              "lat": 37.51,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1895年1月",
          "title_zh": "威海被圍",
          "title_en": "Weihaiwei Besieged",
          "narration_zh": "日軍占領威海灣南北炮台，海陸合圍北洋水師泊地劉公島。",
          "narration_en": "Japan seizes forts on both sides of Weihai Bay — the Beiyang Fleet is trapped.",
          "focus": [
              "japan_wh"
          ],
          "side": "japan",
          "commanders": [
              {
                  "zh": "伊東祐亨",
                  "en": "Itō Sukeyuki"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 122.15,
              "lat": 37.48,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1895年2月",
          "title_zh": "魚雷夜襲",
          "title_en": "Torpedo Night Attack",
          "narration_zh": "日軍魚雷艇夜襲北洋泊地，來遠、威遠等艦被擊沉或重創。",
          "narration_en": "Japanese torpedo boats strike at night — several Beiyang ships are sunk.",
          "focus": [
              "beiyang_wh"
          ],
          "side": "beiyang",
          "commanders": [],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 122.12,
              "lat": 37.5,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1895年2月",
          "title_zh": "劉公島孤守",
          "title_en": "Isolated on Liugong Island",
          "narration_zh": "北洋困守劉公島，陸路斷絕，士兵譁變，丁汝昌拒絕投降。",
          "narration_en": "Trapped on Liugong Island with mutiny ashore — Ding Ruchang refuses surrender.",
          "focus": [
              "beiyang_wh"
          ],
          "side": "beiyang",
          "commanders": [
              {
                  "zh": "丁汝昌",
                  "en": "Ding Ruchang"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 122.12,
              "lat": 37.51,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1895年2月12日",
          "title_zh": "丁汝昌殉國",
          "title_en": "Ding Ruchang's Death",
          "narration_zh": "丁汝昌服毒自盡，北洋水師向日軍投降，全軍覆沒。",
          "narration_en": "Ding Ruchang takes poison — the Beiyang Fleet surrenders, ending as a force.",
          "focus": [
              "beiyang_wh"
          ],
          "side": "beiyang",
          "commanders": [
              {
                  "zh": "丁汝昌",
                  "en": "Ding Ruchang"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 122.12,
              "lat": 37.51,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1895年",
          "title_zh": "洋務運動失敗",
          "title_en": "Self-Strengthening Fails",
          "narration_zh": "威海衛陷落標誌洋務運動在軍事現代化上的徹底失敗，馬關條約簽訂。",
          "narration_en": "Weihaiwei marks the failure of military modernization — the Treaty of Shimonoseki follows.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "北洋水師覆沒",
          "forces_en": "Beiyang Fleet destroyed"
      }
  ];
  const outro =   {
      "title_zh": "威海衛淪陷",
      "title_en": "FALL OF WEIHAIWEI",
      "narration_zh": "本戰役為 DSE 中史重要考點：北洋艦隊全軍覆沒，標誌著「洋務運動」宣告徹底失敗",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 122.12,
          "lat": 37.51,
          "dist": 672,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
