/* TANNENBERG · 坦能堡戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-tannenberg",
      "title_zh": "坦能堡戰役",
      "title_en": "TANNENBERG",
      "subtitle": "1914年8月",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 18.83,
          "maxLng": 21.33,
          "minLat": 52.88,
          "maxLat": 54.88,
          "Z": 10
      },
      "startDate": [
          1914,
          8,
          26
      ],
      "introCam": {
          "lng": 20.08,
          "lat": 53.88,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "坦能堡戰役",
          "en": "TANNENBERG · 1914年8月",
          "narr_zh": "興登堡與魯登道夫在東線包圍俄軍第一集團軍。",
          "narr_en": "Hindenburg and Ludendorff encircle the Russian 1st Army."
      },
      "outroCam": {
          "lng": 20.08,
          "lat": 53.88,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../marne/",
          "title_zh": "馬恩河戰役",
          "title_en": "MARNE 1914"
      }
  };
  const factions = {
    "cp": {
      main: 0x5c4033, glow: 0x8b6914, dim: 0x3a2820,
      css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers",
      emblem: "circle", maxStrength: 120000, textLight: "#e8dcc8"
    },
    "ap": {
      main: 0x1e5a8a, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers",
      emblem: "shield", maxStrength: 130000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Tannenberg",
              "name_zh": "坦能堡",
              "type": "town",
              "lng": 20.08,
              "lat": 53.88
          },
          {
              "name_en": "Allenstein",
              "name_zh": "阿倫施泰因",
              "type": "city",
              "lng": 20.45,
              "lat": 53.78
          },
          {
              "name_en": "Olsztynek",
              "name_zh": "奧爾什丁內克",
              "type": "town",
              "lng": 20.28,
              "lat": 53.58
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "cp_east",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第八集團軍",
          "name_en": "German 8th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 20.5,
                  "lat": 54,
                  "s": 70000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 20.08,
                  "lat": 53.88,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 20.2,
                  "lat": 53.7,
                  "s": 75000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ap_russia",
          "faction": "ap",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "俄軍第一集團軍",
          "name_en": "Russian 1st Army",
          "track": [
              {
                  "d": 1,
                  "lng": 21.2,
                  "lat": 54.2,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 20.3,
                  "lat": 53.9,
                  "s": 50000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 20.5,
                  "lat": 53.5,
                  "s": 20000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "cp",
          "from": [
              20.5,
              54
          ],
          "to": [
              20.08,
              53.88
          ],
          "label": "雙重包圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 25,
          "b": 80,
          "lng": 20.08,
          "lat": 53.88,
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
          "zh": "坦能堡戰役",
          "en": "TANNENBERG"
      }
  ];
  const notes =   {
      "summary": "坦能堡戰役 — 課題地圖。兵力與路線為示意。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "俄軍東線兩路進攻；德軍興登堡與魯登道夫在坦能堡包圍俄軍第二集團軍，取得決定性勝利。",
      "leaders": "俄軍薩姆索諾夫指揮第二集團軍東進；德軍興登堡與參謀魯登道夫抓住包圍時機。興登堡成為德國民族英雄，魯登道夫日後影響德國政治；俄軍慘敗削弱沙皇威信。",
      "nationalPower": "德國雖陷西線，東線指揮高效；俄軍通訊與補給混亂。",
      "impact": "德國東線信心大增；俄軍慘敗加速國內危機，為1917年革命鋪路。"
  };
  const storyboard =   [
      {
          "day": 10,
          "hold": 8,
          "cam": {
              "lng": 20.08,
              "lat": 53.88,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月",
          "title_zh": "俄軍東進",
          "title_en": "Russian Advance",
          "narration_zh": "俄軍第一、第二集團軍分路入侵東普魯士。",
          "narration_en": "Russian 1st and 2nd Armies invade East Prussia.",
          "focus": [
              "ap_russia"
          ],
          "side": "ap",
          "commanders": [
              {
                  "zh": "薩姆索諾夫",
                  "en": "Samsonov"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 30,
          "hold": 8,
          "cam": {
              "lng": 20.2,
              "lat": 53.7,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月26日",
          "title_zh": "德軍調動",
          "title_en": "German Redeployment",
          "narration_zh": "興登堡與魯登道夫集中兵力，準備反擊。",
          "narration_en": "Hindenburg and Ludendorff concentrate forces for a counter-strike.",
          "focus": [
              "cp_east"
          ],
          "side": "cp",
          "commanders": [
              {
                  "zh": "興登堡",
                  "en": "Hindenburg"
              },
              {
                  "zh": "魯登道夫",
                  "en": "Ludendorff"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 20.08,
              "lat": 53.88,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月27–30日",
          "title_zh": "坦能堡包圍",
          "title_en": "Encirclement",
          "narration_zh": "德軍切斷俄軍退路，第二集團軍被圍。",
          "narration_en": "Germans cut Russian retreat routes — 2nd Army encircled.",
          "focus": [
              "cp_east",
              "ap_russia"
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
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 20.08,
              "lat": 53.88,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月底",
          "title_zh": "俄軍投降",
          "title_en": "Russian Surrender",
          "narration_zh": "俄軍傷亡慘重，逾九萬人被俘。",
          "narration_en": "Catastrophic Russian losses — 90,000 captured.",
          "focus": [
              "cp_east"
          ],
          "side": "cp",
          "commanders": [],
          "assets": [],
          "forces_zh": "被俘 9 萬+",
          "forces_en": "90,000+ POWs"
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 20.08,
              "lat": 53.88,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年秋",
          "title_zh": "東線轉折",
          "title_en": "Eastern Turning Point",
          "narration_zh": "德國東線勝利暫時穩定局勢，興登堡成為民族英雄。",
          "narration_en": "German victory stabilises the East — Hindenburg becomes a national hero.",
          "focus": [],
          "side": "cp",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
    const sourceTask = {
    "cite": "東線德軍在坦能堡之後的戰報，1914年8月",
    "excerpt": "德軍戰報強調：俄軍兩路沒有協同，而且無線電令被截收。",
    "ask": "若用這份戰報解釋德軍得勝的原因，哪一項是它實際指出的？",
    "options": [
      {
        "t": "德軍兵力從一開始就遠多於兩路俄軍的總和。",
        "ok": false,
        "why": "坦能堡的重點是薩姆索諾夫與連年坎普夫兩路被分割，不是德軍人數占絕對優勢。"
      },
      {
        "t": "俄軍兩路脫節，德軍又掌握了他們的調動。",
        "ok": true,
        "why": "戰報把原因放在協同失敗與通訊被截，而不是單一句「德軍較強」。"
      },
      {
        "t": "西線已經在8月結束，所以東線可以隨意用兵。",
        "ok": false,
        "why": "馬恩河戰役在9月。8月的德國仍要同時應付西線。"
      }
    ]
  };
const outro =   {
      "title_zh": "坦能堡戰役",
      "title_en": "TANNENBERG",
      "narration_zh": "1914年8月，俄軍兩個集團軍在東普魯士被分割。",
      "narration_en": "In August 1914 two Russian armies were divided in East Prussia.",
      "cam": {
          "lng": 20.08,
          "lat": 53.88,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
