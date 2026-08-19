/* DUNKIRK EVACUATION · 敦克爾克撤退 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-dunkirk",
      "title_zh": "敦克爾克撤退",
      "title_en": "DUNKIRK EVACUATION",
      "subtitle": "1940年5–6月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 1.38,
          "maxLng": 3.38,
          "minLat": 50.24,
          "maxLat": 51.84,
          "Z": 10
      },
      "startDate": [
          1940,
          5,
          26
      ],
      "introCam": {
          "lng": 2.38,
          "lat": 51.04,
          "dist": 600,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "敦克爾克撤退",
          "en": "DUNKIRK EVACUATION · 1940年5–6月",
          "narr_zh": "英軍從敦克爾克海灘撤離逾三十萬人。",
          "narr_en": "Over 300,000 troops evacuated from the beaches of Dunkirk."
      },
      "outroCam": {
          "lng": 2.38,
          "lat": 51.04,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../stalingrad/",
          "title_zh": "斯大林格勒戰役",
          "title_en": "STALINGRAD 1942–43"
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
              "name_en": "Dunkirk",
              "name_zh": "敦克爾克",
              "type": "town",
              "lng": 2.38,
              "lat": 51.04
          },
          {
              "name_en": "Calais",
              "name_zh": "加萊",
              "type": "city",
              "lng": 1.85,
              "lat": 50.95
          },
          {
              "name_en": "Dover",
              "name_zh": "多佛（英國）",
              "type": "city",
              "lng": 1.31,
              "lat": 51.13
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_bef",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英軍遠征軍",
          "name_en": "BEF",
          "track": [
              {
                  "d": 1,
                  "lng": 2.8,
                  "lat": 50.8,
                  "s": 300000,
                  "st": "retreat"
              },
              {
                  "d": 50,
                  "lng": 2.38,
                  "lat": 51.04,
                  "s": 250000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 1.31,
                  "lat": 51.13,
                  "s": 200000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ax_panzer",
          "faction": "axis",
          "kind": "infantry",
          "crest": "tank",
          "cf": true,
          "name_zh": "德軍裝甲部隊",
          "name_en": "Panzer Divisions",
          "track": [
              {
                  "d": 1,
                  "lng": 3.2,
                  "lat": 50.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 2.5,
                  "lat": 51,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "allies",
          "from": [
              2.8,
              50.8
          ],
          "to": [
              2.38,
              51.04
          ],
          "label": "撤向海灘",
          "kind": "retreat"
      },
      {
          "d": 50,
          "f": "allies",
          "from": [
              2.38,
              51.04
          ],
          "to": [
              1.31,
              51.13
          ],
          "label": "海峽撤離",
          "kind": "retreat"
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
          "zh": "敦克爾克撤退",
          "en": "DUNKIRK EVACUATION"
      }
  ];
  const notes =   {
      "summary": "敦克爾克撤退 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "德軍裝甲部隊突破阿登森林，切斷英法聯軍；英軍自敦克爾克海灘撤離逾三十萬人。",
      "leaders": "英首相丘吉爾堅持「戰鬥到底」並組織撤退；海軍拉姆齊將軍協調「发电机行動」。德軍倫德施泰特、戈林主張停止進攻（希特勒下令暫停），使英軍主力得以保存，影響日後諾曼第反攻人力。",
      "nationalPower": "德國陸軍強勁但海軍不足；英國保留核心戰力，民船動員展現海權。",
      "impact": "敦克爾克奇蹟保存英軍骨幹，為日後諾曼第反攻奠定基礎。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 3,
              "lat": 50.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年5月",
          "title_zh": "德軍突破",
          "title_en": "German Breakthrough",
          "narration_zh": "德軍裝甲部隊穿越阿登，直插英吉利海峽。",
          "narration_en": "German armour breaks through the Ardennes to the Channel.",
          "focus": [
              "ax_panzer"
          ],
          "side": "axis",
          "commanders": [
              {
                  "zh": "倫德施泰特",
                  "en": "von Rundstedt"
              }
          ],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 2.9,
              "lat": 51,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年5月下旬",
          "title_zh": "聯軍被圍",
          "title_en": "Allies Encircled",
          "narration_zh": "英法比聯軍被困敦克爾克與周邊「口袋」。",
          "narration_en": "Anglo-French-Belgian forces trapped in the Dunkirk pocket.",
          "focus": [
              "al_bef"
          ],
          "side": "allies",
          "commanders": [
              {
                  "zh": "戈特",
                  "en": "Gort"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 2.35,
              "lat": 51.05,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年5月26日",
          "title_zh": "发电机行動",
          "title_en": "Operation Dynamo",
          "narration_zh": "英國啟動敦克爾克撤離，民船與軍艦協力運兵。",
          "narration_en": "Operation Dynamo — civilian boats join naval evacuation.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "navy",
              "landing"
          ],
          "forces_zh": "撤離 33.8 萬人",
          "forces_en": "338,000 evacuated"
      },
      {
          "day": 70,
          "hold": 8,
          "cam": {
              "lng": 2.35,
              "lat": 51.05,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年6月4日",
          "title_zh": "海灘撤離",
          "title_en": "Beach Evacuation",
          "narration_zh": "士兵在空襲下登船撤往英國，裝備大量遺棄。",
          "narration_en": "Troops embark under air attack — much equipment abandoned.",
          "focus": [
              "al_bef"
          ],
          "side": "allies",
          "commanders": [],
          "assets": [
              "navy",
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 2.35,
              "lat": 51.05,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年6月",
          "title_zh": "奇蹟與代價",
          "title_en": "Miracle and Cost",
          "narration_zh": "英軍主力保存，但法國即將投降。",
          "narration_en": "The BEF is saved — but France is about to fall.",
          "focus": [],
          "side": "allies",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "敦克爾克撤退",
      "title_en": "DUNKIRK EVACUATION",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 2.38,
          "lat": 51.04,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
