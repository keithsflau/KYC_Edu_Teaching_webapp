/* BATTLE OF YELLOW SEA · 黃海海戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-yellow-sea",
      "title_zh": "黃海海戰",
      "title_en": "BATTLE OF YELLOW SEA",
      "subtitle": "1894年9月17日",
      "factionOrder": [
          "beiyang",
          "japan"
      ],
      "geo": {
          "minLng": 122.4,
          "maxLng": 123.9,
          "minLat": 37.45,
          "maxLat": 38.75,
          "Z": 9
      },
      "startDate": [
          1894,
          9,
          17
      ],
      "introCam": {
          "lng": 122.5,
          "lat": 38.5,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "黃海海戰",
          "en": "BATTLE OF YELLOW SEA · 1894年9月17日",
          "narr_zh": "北洋艦隊護送運兵船，與日本聯合艦隊激戰黃海。",
          "narr_en": "The Beiyang Fleet clashes with Japan's Combined Fleet in the Yellow Sea."
      },
      "outroCam": {
          "lng": 122.5,
          "lat": 38.5,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "ocean",
      "floodRelief": 0.62,
      "nextBattle": {
          "href": "../weihaiwei/",
          "title_zh": "威海衛淪陷",
          "title_en": "WEIHAIWEI 1895"
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
      css: "#1565c0", label_zh: "日本聯合艦隊", label_en: "Imperial Japanese Navy",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "大東溝",
              "name_en": "Dadonggou",
              "type": "bay",
              "lng": 122.5,
              "lat": 38.5
          },
          {
              "name_zh": "旅順",
              "name_en": "Lüshun",
              "type": "fort",
              "lng": 121.26,
              "lat": 38.85
          },
          {
              "name_zh": "威海",
              "name_en": "Weihai",
              "type": "fort",
              "lng": 122.12,
              "lat": 37.51
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "beiyang_ys",
          "faction": "beiyang",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "北洋水師",
          "name_en": "Beiyang Fleet",
          "track": [
              {
                  "d": 1,
                  "lng": 122,
                  "lat": 38.8,
                  "s": 80000,
                  "st": "march"
              },
              {
                  "d": 50,
                  "lng": 122.5,
                  "lat": 38.5,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 122.12,
                  "lat": 37.51,
                  "s": 35000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "japan_ys",
          "faction": "japan",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "聯合艦隊",
          "name_en": "Combined Fleet",
          "track": [
              {
                  "d": 1,
                  "lng": 123,
                  "lat": 38.2,
                  "s": 70000,
                  "st": "attack"
              },
              {
                  "d": 55,
                  "lng": 122.5,
                  "lat": 38.5,
                  "s": 75000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 122.5,
                  "lat": 38.5,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "japan",
          "from": [
              123,
              38.2
          ],
          "to": [
              122.5,
              38.5
          ],
          "label": "艦隊攔截",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 35,
          "b": 80,
          "lng": 122.5,
          "lat": 38.5,
          "kind": "naval",
          "i": 1.3
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "黃海海戰",
          "en": "BATTLE OF YELLOW SEA"
      }
  ];
  const notes =   {
      "summary": "黃海海戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "甲午战争黄海海战：北洋水师与日本联合舰队在鸭绿江口大东沟遭遇；双方以舰炮对射，致远、经远等舰沉没，北洋损失五舰。",
      "leaders": "甲午戰爭黃海海戰中，清朝北洋水師提督丁汝昌率艦隊迎戰日本聯合艦隊。日軍司令伊東佑亨以速射炮、統一戰術搶佔「T」字橫頭，火力與訓練優勢明顯。北洋艦隊在劉步蟾等管帶率領下英勇作戰，卻因彈藥、戰術及指揮問題損失慘重，制海權落入日軍之手，直接影響後續威海衛陷落。",
      "nationalPower": "日本明治维新后海军现代化；北洋虽购铁甲舰但训练、弹种、指挥不足，后勤与战意亦逊。",
      "impact": "北洋水師主力受創，大清喪失黃海制海權。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 122.5,
              "lat": 38.5,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1894年9月17日",
          "title_zh": "大東溝遭遇",
          "title_en": "Encounter at the Yalu Mouth",
          "narration_zh": "北洋水師護送運兵船返航，與日本聯合艦隊在大東溝遭遇。",
          "narration_en": "Beiyang Fleet meets the Japanese Combined Fleet off the Yalu estuary.",
          "focus": [
              "beiyang_ys",
              "japan_ys"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "丁汝昌",
                  "en": "Ding Ruchang"
              },
              {
                  "zh": "伊東祐亨",
                  "en": "Itō Sukeyuki"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "北洋水師約十二艦",
          "forces_en": "~12 Beiyang warships"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 122.55,
              "lat": 38.48,
              "dist": 660,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1894年9月17日 午",
          "title_zh": "艦隊決戰",
          "title_en": "Fleet Action",
          "narration_zh": "雙方以艦炮對射，定遠、鎮遠居中，日本艦隊以速射炮側擊。",
          "narration_en": "Battleships exchange broadsides — Japanese rapid-fire guns rake the Chinese line.",
          "focus": [
              "beiyang_ys",
              "japan_ys"
          ],
          "side": "both",
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
              "lng": 122.52,
              "lat": 38.45,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1894年9月17日",
          "title_zh": "致遠、經遠沉沒",
          "title_en": "Zhiyuan and Jingyuan Lost",
          "narration_zh": "鄧世昌率致遠艦衝擊吉野，艦中炮彈殉國；經遠等艦亦沉沒。",
          "narration_en": "Deng Shichang rams the enemy in Zhiyuan and dies — Jingyuan is also lost.",
          "focus": [
              "beiyang_ys"
          ],
          "side": "beiyang",
          "commanders": [
              {
                  "zh": "鄧世昌",
                  "en": "Deng Shichang"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 122.5,
              "lat": 38.5,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1894年9月17日 傍晚",
          "title_zh": "北洋撤出",
          "title_en": "Beiyang Withdraws",
          "narration_zh": "北洋水師損失五艦，餘艦退至威海衛，喪失黃海制海權。",
          "narration_en": "Five ships lost — the Beiyang Fleet withdraws to Weihaiwei, losing sea control.",
          "focus": [
              "beiyang_ys"
          ],
          "side": "beiyang",
          "commanders": [],
          "assets": [],
          "forces_zh": "損失五艦",
          "forces_en": "5 ships lost"
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 122.5,
              "lat": 38.5,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1894年後",
          "title_zh": "制海權喪失",
          "title_en": "Sea Control Lost",
          "narration_zh": "黃海海戰使大清喪失黃海制海權，日軍得以登陸遼東。",
          "narration_en": "Defeat at the Yellow Sea allows Japanese landings in Liaodong.",
          "focus": [],
          "side": "japan",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "黃海海戰",
      "title_en": "BATTLE OF YELLOW SEA",
      "narration_zh": "本戰役為 DSE 中史重要考點：北洋水師主力受創，大清喪失黃海制海權",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 122.5,
          "lat": 38.5,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
