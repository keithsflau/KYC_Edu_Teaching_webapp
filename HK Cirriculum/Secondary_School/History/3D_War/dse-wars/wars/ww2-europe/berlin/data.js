/* BATTLE OF BERLIN · 柏林戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-berlin",
      "title_zh": "柏林戰役",
      "title_en": "BATTLE OF BERLIN",
      "subtitle": "1945年4–5月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 12.4,
          "maxLng": 14.4,
          "minLat": 51.72,
          "maxLat": 53.32,
          "Z": 10
      },
      "startDate": [
          1945,
          4,
          16
      ],
      "introCam": {
          "lng": 13.4,
          "lat": 52.52,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "柏林戰役",
          "en": "BATTLE OF BERLIN · 1945年4–5月",
          "narr_zh": "蘇軍圍攻柏林，希特勒自殺，德國無條件投降。",
          "narr_en": "Soviet forces storm Berlin — Germany surrenders unconditionally."
      },
      "outroCam": {
          "lng": 13.4,
          "lat": 52.52,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../../ww2-pacific/philippines/",
          "title_zh": "菲律賓戰役",
          "title_en": "PHILIPPINES 1941–42"
      }
  };
  const factions = {
    "axis": {
      main: 0x4a4a4a, glow: 0x8b0000, dim: 0x2a2a2a,
      css: "#6b2020", label_zh: "軸心國", label_en: "Axis",
      emblem: "circle", maxStrength: 150000, textLight: "#e8d0d0"
    },
    "allies": {
      main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a,
      css: "#1b4f72", label_zh: "同盟國", label_en: "Allies",
      emblem: "shield", maxStrength: 160000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Berlin",
              "name_zh": "柏林",
              "type": "city",
              "lng": 13.4,
              "lat": 52.52
          },
          {
              "name_en": "Reichstag",
              "name_zh": "國會大廈",
              "type": "fort",
              "lng": 13.38,
              "lat": 52.52
          },
          {
              "name_en": "Potsdam",
              "name_zh": "波茨坦",
              "type": "city",
              "lng": 13.06,
              "lat": 52.39
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_soviet",
          "faction": "allies",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "蘇聯第一白俄羅斯方面軍",
          "name_en": "1st Belorussian Front",
          "track": [
              {
                  "d": 1,
                  "lng": 14,
                  "lat": 52.6,
                  "s": 150000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 13.4,
                  "lat": 52.52,
                  "s": 180000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 13.38,
                  "lat": 52.52,
                  "s": 200000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ax_berlin",
          "faction": "axis",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "柏林守軍",
          "name_en": "Berlin Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 13.4,
                  "lat": 52.52,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 13.38,
                  "lat": 52.52,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "allies",
          "from": [
              14,
              52.6
          ],
          "to": [
              13.38,
              52.52
          ],
          "label": "攻入國會大廈",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 100,
          "lng": 13.38,
          "lat": 52.52,
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
          "zh": "柏林戰役",
          "en": "BATTLE OF BERLIN"
      }
  ];
  const notes =   {
      "summary": "柏林戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1945年4月蘇軍包圍柏林；城內巷戰慘烈，希特勒自盡，德國無條件投降。",
      "leaders": "希特勒在總統府地堡自盡；戈培爾宣傳至最後。蘇軍朱可夫、科涅夫競速攻入柏林。羅斯福已逝世，杜魯門繼任；邱吉爾、史達林即將出席波茨坦會議，劃分戰後德國與東歐勢力範圍。",
      "nationalPower": "蘇聯以巨大人力代價推進；德國已是強弩之末，兩線崩潰。",
      "impact": "歐洲戰爭結束；冷戰格局萌芽，德國分裂。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 13.5,
              "lat": 52.4,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年4月16日",
          "title_zh": "柏林戰役開始",
          "title_en": "Battle for Berlin Opens",
          "narration_zh": "蘇軍三大方面軍向柏林進攻，朱可夫與科涅斯率部強渡奧得河。",
          "narration_en": "Soviet fronts advance on Berlin — Zhukov and Konev cross the Oder.",
          "focus": [
              "al_soviet"
          ],
          "side": "allies",
          "commanders": [
              {
                  "zh": "朱可夫",
                  "en": "Zhukov"
              }
          ],
          "assets": [
              "artillery",
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 13.4,
              "lat": 52.52,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年4月21日",
          "title_zh": "兵臨城下",
          "title_en": "Reach the City",
          "narration_zh": "蘇軍先頭部隊抵達柏林郊區，德軍國民衝鋒隊與殘部抵抗。",
          "narration_en": "Soviet vanguards reach Berlin suburbs — desperate German resistance.",
          "focus": [
              "al_soviet",
              "ax_berlin"
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
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 13.4,
              "lat": 52.52,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年4月30日",
          "title_zh": "國會大廈爭奪",
          "title_en": "Fight for the Reichstag",
          "narration_zh": "蘇軍在國會大廈升起紅旗；希特勒在地堡自盡。",
          "narration_en": "Red flag over the Reichstag — Hitler commits suicide in the bunker.",
          "focus": [
              "al_soviet"
          ],
          "side": "allies",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 13.4,
              "lat": 52.52,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年5月2日",
          "title_zh": "柏林陷落",
          "title_en": "Berlin Falls",
          "narration_zh": "城內德軍向蘇軍投降。",
          "narration_en": "German forces in the city surrender to the Soviets.",
          "focus": [],
          "side": "allies",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 13.4,
              "lat": 52.52,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年5月8日",
          "title_zh": "歐戰結束",
          "title_en": "War in Europe Ends",
          "narration_zh": "德國無條件投降，第二次世界大戰在歐洲結束。",
          "narration_en": "Germany surrenders unconditionally — WWII in Europe ends.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "柏林戰役",
      "title_en": "BATTLE OF BERLIN",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 13.4,
          "lat": 52.52,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
