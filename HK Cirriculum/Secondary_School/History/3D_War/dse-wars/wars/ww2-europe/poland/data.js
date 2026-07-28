/* INVASION OF POLAND · 入侵波蘭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-poland",
      "title_zh": "入侵波蘭",
      "title_en": "INVASION OF POLAND",
      "subtitle": "1939年9月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 19.25,
          "maxLng": 22.75,
          "minLat": 50.95,
          "maxLat": 53.45,
          "Z": 9
      },
      "startDate": [
          1939,
          9,
          1
      ],
      "introCam": {
          "lng": 21.01,
          "lat": 52.23,
          "dist": 680,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "入侵波蘭",
          "en": "INVASION OF POLAND · 1939年9月",
          "narr_zh": "德軍閃擊波蘭，蘇聯亦從東線出兵。",
          "narr_en": "Germany blitzes Poland; the USSR invades from the east."
      },
      "outroCam": {
          "lng": 21.01,
          "lat": 52.23,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../dunkirk/",
          "title_zh": "敦克爾克撤退",
          "title_en": "DUNKIRK 1940"
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
              "name_en": "Warsaw",
              "name_zh": "華沙",
              "type": "city",
              "lng": 21.01,
              "lat": 52.23
          },
          {
              "name_en": "Modlin",
              "name_zh": "莫德林",
              "type": "fort",
              "lng": 20.72,
              "lat": 52.44
          },
          {
              "name_en": "Kraków",
              "name_zh": "克拉科夫",
              "type": "city",
              "lng": 19.94,
              "lat": 50.06
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ax_poland",
          "faction": "axis",
          "kind": "infantry",
          "crest": "tank",
          "cf": true,
          "name_zh": "德軍南方集團軍",
          "name_en": "Army Group South",
          "track": [
              {
                  "d": 1,
                  "lng": 19.5,
                  "lat": 52.5,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 21.01,
                  "lat": 52.23,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 21,
                  "lat": 52.2,
                  "s": 90000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "al_poland",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "波蘭軍",
          "name_en": "Polish Army",
          "track": [
              {
                  "d": 1,
                  "lng": 21.5,
                  "lat": 52.5,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 21.01,
                  "lat": 52.23,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 21,
                  "lat": 52.2,
                  "s": 10000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "axis",
          "from": [
              19.5,
              52.5
          ],
          "to": [
              21.01,
              52.23
          ],
          "label": "閃擊華沙",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 80,
          "lng": 21.01,
          "lat": 52.23,
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
          "zh": "入侵波蘭",
          "en": "INVASION OF POLAND"
      }
  ];
  const notes =   {
      "summary": "入侵波蘭 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "德軍以閃電戰（裝甲縱深、空軍密接支援）迅速分割波蘭；蘇聯依莫洛托夫—里賓特洛甫條約出兵東部。",
      "leaders": "希特勒與里賓特洛甫策劃雙線入侵；德軍倫德施泰特、古德里安實施閃擊。波蘭司令斯米格雷-魯茲元帥力戰不敵。斯大林與莫洛托夫簽訂密約後出兵東波蘭，改寫東歐勢力版圖。",
      "nationalPower": "德國軍事現代化領先；波蘭兩面受敵，盟國來不及增援。",
      "impact": "二戰在歐洲全面爆發；波蘭亡國，戰爭初期軸心國勢如破竹。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 19,
              "lat": 52.2,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1939年9月1日",
          "title_zh": "德軍入侵",
          "title_en": "German Invasion",
          "narration_zh": "德軍從西、北、南三路入侵波蘭，空軍轟炸波茲南等地。",
          "narration_en": "Germany invades from three directions — Luftwaffe bombs Polish cities.",
          "focus": [
              "ax_poland"
          ],
          "side": "axis",
          "commanders": [
              {
                  "zh": "倫德施泰特",
                  "en": "von Rundstedt"
              }
          ],
          "assets": [
              "air",
              "artillery"
          ],
          "forces_zh": "德軍 150 萬",
          "forces_en": "1.5M German troops"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 19.5,
              "lat": 52,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1939年9月上旬",
          "title_zh": "裝甲縱深突破",
          "title_en": "Armoured Breakthrough",
          "narration_zh": "古德里安裝甲集團穿插波軍後方，切斷通訊與撤退。",
          "narration_en": "Guderian's panzers penetrate deep behind Polish lines.",
          "focus": [
              "ax_poland"
          ],
          "side": "axis",
          "commanders": [],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 21,
              "lat": 52.2,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1939年9月中旬",
          "title_zh": "華沙圍困",
          "title_en": "Siege of Warsaw",
          "narration_zh": "波軍退守華沙，遭德軍圍攻與空襲。",
          "narration_en": "Polish forces fall back to Warsaw — besieged and bombed.",
          "focus": [
              "al_poland"
          ],
          "side": "allies",
          "commanders": [],
          "assets": [
              "air",
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 23.5,
              "lat": 52,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1939年9月17日",
          "title_zh": "蘇聯出兵東部",
          "title_en": "Soviet Invasion from East",
          "narration_zh": "蘇軍依密約越過東部邊界，波蘭腹背受敵。",
          "narration_en": "Soviet forces cross the eastern border per secret pact.",
          "focus": [],
          "side": "axis",
          "commanders": [],
          "assets": [],
          "forces_zh": "蘇軍東線",
          "forces_en": "Soviet eastern front"
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 21,
              "lat": 52.2,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1939年9月底",
          "title_zh": "波蘭淪陷",
          "title_en": "Poland Falls",
          "narration_zh": "波蘭抵抗終告失敗，二戰在歐洲全面展開。",
          "narration_en": "Polish resistance collapses — WWII in Europe is fully underway.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "入侵波蘭",
      "title_en": "INVASION OF POLAND",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 21.01,
          "lat": 52.23,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
