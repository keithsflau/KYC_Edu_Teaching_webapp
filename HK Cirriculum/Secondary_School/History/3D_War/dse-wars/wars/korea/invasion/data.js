/* NORTH KOREAN INVASION · 北韓南侵 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-invasion",
      "title_zh": "北韓南侵",
      "title_en": "NORTH KOREAN INVASION",
      "subtitle": "1950年6月",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.35,
          "maxLng": 129.55,
          "minLat": 34.8,
          "maxLat": 38.85,
          "Z": 8
      },
      "startDate": [
          1950,
          6,
          25
      ],
      "introCam": {
          "lng": 127,
          "lat": 37.5,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "北韓南侵",
          "en": "NORTH KOREAN INVASION · 1950年6月",
          "narr_zh": "北韓大軍越過三八線，迅速攻占漢城。",
          "narr_en": "North Korean forces cross the 38th parallel and seize Seoul."
      },
      "outroCam": {
          "lng": 127,
          "lat": 37.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../inchon/",
          "title_zh": "仁川登陸",
          "title_en": "INCHON 1950"
      }
  };
  const factions = {
    "nk": {
      main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000,
      css: "#8b0000", label_zh: "北韓人民軍", label_en: "Korean People's Army",
      emblem: "circle", maxStrength: 100000, textLight: "#ffd9d2"
    },
    "un": {
      main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847,
      css: "#1a3a6e", label_zh: "聯合國軍", label_en: "UN Forces",
      emblem: "shield", maxStrength: 110000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "38th Parallel",
              "name_zh": "三八線",
              "type": "fort",
              "lng": 127,
              "lat": 38
          },
          {
              "name_en": "Seoul",
              "name_zh": "漢城",
              "type": "city",
              "lng": 126.98,
              "lat": 37.57
          },
          {
              "name_en": "Munsan",
              "name_zh": "汶山",
              "type": "town",
              "lng": 126.79,
              "lat": 37.85
          },
          {
              "name_en": "Daegu",
              "name_zh": "大邱",
              "type": "city",
              "lng": 128.6,
              "lat": 35.87
          },
          {
              "name_en": "Pusan",
              "name_zh": "釜山",
              "type": "city",
              "lng": 129.04,
              "lat": 35.18
          }
      ],
      "lines": [
          {
              "name_zh": "三八線",
              "name_en": "38th Parallel",
              "path": [
                  [
                      125.5,
                      38
                  ],
                  [
                      127,
                      38
                  ],
                  [
                      128.5,
                      38
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "nk_army",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "北韓人民軍",
          "name_en": "KPA",
          "track": [
              {
                  "d": 1,
                  "lng": 127,
                  "lat": 38,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 30,
                  "lng": 126.98,
                  "lat": 37.57,
                  "s": 85000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 128.5,
                  "lat": 36,
                  "s": 70000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "un_army",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "韓軍／聯合國軍",
          "name_en": "ROK / UN",
          "track": [
              {
                  "d": 1,
                  "lng": 126.98,
                  "lat": 37.57,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 30,
                  "lng": 129.04,
                  "lat": 35.18,
                  "s": 50000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 129,
                  "lat": 35.2,
                  "s": 55000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "nk",
          "from": [
              127,
              38
          ],
          "to": [
              126.98,
              37.57
          ],
          "label": "越線南侵",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "北韓南侵",
          "en": "NORTH KOREAN INVASION"
      }
  ];
  const notes =   {
      "summary": "北韓南侵 — 課題地圖。兵力與路線為示意。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1950年6月北韓大舉越過三八線南侵；韓軍潰敗，聯合國軍介入，戰火延燒至釜山防線。",
      "leaders": "北韓金日成在蘇聯支持下南侵；李承晚政府南撤。聯合國安理會授權（蘇聯缺席）；麥克阿瑟奉命仁川以後扭轉戰局。中國人民志願軍要到1950年10月才入朝。6月南下的是北韓人民軍。",
      "nationalPower": "北韓蘇聯裝備坦克部隊；美國主導聯合國軍，麥克阿瑟任司令。",
      "impact": "冷戰第一場熱戰；半島分裂固化，至今影響東北亞。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 127,
              "lat": 38,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年6月25日",
          "title_zh": "越過三八線",
          "title_en": "Cross the 38th Parallel",
          "narration_zh": "北韓七個師在坦克支援下突破三八線。",
          "narration_en": "Seven North Korean divisions break through with tank support.",
          "focus": [
              "nk_army"
          ],
          "side": "nk",
          "commanders": [
              {
                  "zh": "金日成",
                  "en": "Kim Il-sung"
              }
          ],
          "assets": [
              "artillery"
          ],
          "forces_zh": "北韓 9 萬",
          "forces_en": "90,000 KPA"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 126.98,
              "lat": 37.57,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年6月28日",
          "title_zh": "漢城陷落",
          "title_en": "Seoul Falls",
          "narration_zh": "北韓攻占漢城，韓軍南撤。",
          "narration_en": "North Korea captures Seoul — ROK forces retreat south.",
          "focus": [
              "nk_army"
          ],
          "side": "nk",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 128,
              "lat": 36.5,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年7月",
          "title_zh": "聯合國介入",
          "title_en": "UN Intervention",
          "narration_zh": "安理會決議派兵，美軍為主組成聯合國軍。",
          "narration_en": "UN authorises forces — US-led coalition deploys.",
          "focus": [
              "un_army"
          ],
          "side": "un",
          "commanders": [
              {
                  "zh": "麥克阿瑟",
                  "en": "MacArthur"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 70,
          "hold": 8,
          "cam": {
              "lng": 129.04,
              "lat": 35.18,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年8月",
          "title_zh": "釜山防線",
          "title_en": "Pusan Perimeter",
          "narration_zh": "聯合國軍被壓縮至半島南端，死守釜山橋頭堡。",
          "narration_en": "UN forces hold the Pusan perimeter in the southeast.",
          "focus": [
              "un_army",
              "nk_army"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 129.04,
              "lat": 35.18,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年9月初",
          "title_zh": "戰局懸念",
          "title_en": "War in the Balance",
          "narration_zh": "北韓占領大半島，聯合國準備反擊。",
          "narration_en": "North Korea holds most of the peninsula — UN plans counter-offensive.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
    const sourceTask = {
    "cite": "聯合國安理會1950年6月25日與27日的決議",
    "excerpt": "決議指稱北韓武裝攻擊大韓民國，並建議會員國協助擊退這次攻擊。",
    "ask": "6月的決議針對誰？",
    "options": [
      {
        "t": "已經入朝的中國人民志願軍。",
        "ok": false,
        "why": "志願軍在1950年10月才渡鴨綠江。6月的圖例不能寫志願軍。"
      },
      {
        "t": "越過三八線的北韓人民軍。",
        "ok": true,
        "why": "6月25日開始的是北韓南侵。汶山在開城方向，釜山是南端的橋頭堡，兩地都應在圖內。"
      },
      {
        "t": "蘇聯紅軍越過三八線。",
        "ok": false,
        "why": "蘇聯沒有在6月派地面部隊越過三八線。蘇聯當時缺席安理會。"
      }
    ]
  };
const outro =   {
      "title_zh": "北韓南侵",
      "title_en": "NORTH KOREAN INVASION",
      "narration_zh": "1950年6月南下的是北韓人民軍。志願軍10月才入朝。汶山與釜山都在這張圖上。",
      "narration_en": "In June 1950 the army moving south was the KPA. Chinese volunteers entered in October. Munsan and Pusan are both on this map.",
      "cam": {
          "lng": 127,
          "lat": 37.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
