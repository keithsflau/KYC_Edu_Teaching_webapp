/* KING DAVID · 大衛時期 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "david",
      "title_zh": "大衛時期",
      "title_en": "KING DAVID",
      "subtitle": "撒上–撒下",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.79,
          "maxLng": 36.29,
          "minLat": 30.58,
          "maxLat": 32.58,
          "Z": 10
      },
      "startDate": "撒上–撒下",
      "introCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "大衛時期",
          "en": "KING DAVID · 撒上–撒下",
          "narr_zh": "大衛作以色列眾人的王，又作猶大人的王七年零六個月。",
          "narr_en": "David reigned over all Israel and Judah."
      },
      "outroCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../solomon/",
          "title_zh": "所羅門時期",
          "title_en": "KING SOLOMON"
      }
  };
  const factions = {
    "covenant": {
      main: 0xc9a227, glow: 0xffd54f, dim: 0x8b6914,
      css: "#c9a227", label_zh: "選民／教會", label_en: "Covenant People",
      emblem: "shield", maxStrength: 80000, textLight: "#fff8e0"
    },
    "nations": {
      main: 0x5c4a72, glow: 0x8b7aa8, dim: 0x3a2f48,
      css: "#5c4a72", label_zh: "列國／仇敵", label_en: "Nations",
      emblem: "circle", maxStrength: 100000, textLight: "#e8e0f0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "伯利恆",
              "name_en": "Bethlehem",
              "type": "town",
              "lng": 35.202,
              "lat": 31.705,
              "ref": "撒上 16:1"
          },
          {
              "name_zh": "以拉谷",
              "name_en": "Valley of Elah",
              "type": "town",
              "lng": 34.948,
              "lat": 31.695,
              "ref": "撒上 17:2"
          },
          {
              "name_zh": "基伊拉",
              "name_en": "Keilah",
              "type": "town",
              "lng": 34.948,
              "lat": 31.616,
              "ref": "撒上 23:1"
          },
          {
              "name_zh": "隱基遍",
              "name_en": "En-gedi",
              "type": "town",
              "lng": 35.388,
              "lat": 31.453,
              "ref": "撒上 24:1"
          },
          {
              "name_zh": "洗革拉",
              "name_en": "Ziklag",
              "type": "town",
              "lng": 34.683,
              "lat": 31.383,
              "ref": "撒上 27:6"
          },
          {
              "name_zh": "希伯崙",
              "name_en": "Hebron",
              "type": "town",
              "lng": 35.099,
              "lat": 31.524,
              "ref": "創 13:18"
          },
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.235,
              "lat": 31.778,
              "ref": "撒下 5:7"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "david_army",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "大衛",
          "name_en": "David",
          "track": [
              {
                  "d": 1,
                  "lng": 35.202,
                  "lat": 31.705,
                  "s": 1000,
                  "st": "hold"
              },
              {
                  "d": 25,
                  "lng": 34.948,
                  "lat": 31.695,
                  "s": 3000,
                  "st": "attack"
              },
              {
                  "d": 45,
                  "lng": 35.388,
                  "lat": 31.453,
                  "s": 600,
                  "st": "hold"
              },
              {
                  "d": 65,
                  "lng": 35.099,
                  "lat": 31.524,
                  "s": 20000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "philistines",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "非利士人",
          "name_en": "Philistines",
          "track": [
              {
                  "d": 20,
                  "lng": 34.948,
                  "lat": 31.695,
                  "s": 20000,
                  "st": "attack"
              },
              {
                  "d": 32,
                  "lng": 34.948,
                  "lat": 31.655,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 22,
          "b": 35,
          "lng": 34.948,
          "lat": 31.695,
          "kind": "firefight",
          "i": 0.85
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "大衛時期",
          "en": "KING DAVID"
      }
  ];
  const notes =   {
      "summary": "大衛時期 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "撒母耳在伯利恆膏大衛（撒上16）；以拉谷擊歌利亞（撒上17）；躲避掃羅時至隱基遍（撒上24）；掃羅死後在希伯崙作猶大王（撒下2），後攻取耶路撒冷建都（撒下5）。",
      "leaders": "大衛、掃羅、約拿單、撒母耳。",
      "nationalPower": "合神心意的人；神與大衛立約，應許彌賽亞出自大衛家。",
      "impact": "大衛王朝成為彌賽亞盼望載體。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.202,
              "lat": 31.705,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1020年",
          "title_zh": "伯利恆受膏",
          "title_en": "Bethlehem",
          "narration_zh": "撒上16:1 耶和華打發撒母耳往伯利恆耶西家膏立大衛。",
          "narration_en": "1 Sam 16:1 — Samuel anointed David at Bethlehem.",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "大衛",
                  "en": "David"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 34.948,
              "lat": 31.695,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1010年",
          "title_zh": "以拉谷",
          "title_en": "Valley of Elah",
          "narration_zh": "撒上17:2 非利士人聚集在以拉谷；大衛擊殺歌利亞。",
          "narration_en": "1 Sam 17:2 — David struck down Goliath in the Valley of Elah.",
          "focus": [
              "david_army",
              "philistines"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 35.388,
              "lat": 31.453,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1010年",
          "title_zh": "隱基遍",
          "title_en": "En-gedi",
          "narration_zh": "撒上24:1 掃羅在隱基遍追趕大衛；大衛割下王袍卻不害受膏者。",
          "narration_en": "1 Sam 24:1 — David spared Saul in the caves of En-gedi.",
          "focus": [
              "david_army"
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
              "lng": 35.099,
              "lat": 31.524,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1003年",
          "title_zh": "希伯崙作王",
          "title_en": "Hebron",
          "narration_zh": "撒下2:4 猶大人來到希伯崙膏大衛作猶大王。",
          "narration_en": "2 Sam 2:4 — David was anointed king over Judah at Hebron.",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 100,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1000年",
          "title_zh": "耶路撒冷建都",
          "title_en": "Jerusalem",
          "narration_zh": "撒下5:7 大衛攻取錫安寨，定名大衛城，作以色列京城。",
          "narration_en": "2 Sam 5:7 — David captured Jerusalem and made it his capital.",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "大衛",
                  "en": "David"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "大衛時期",
      "title_en": "KING DAVID",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
