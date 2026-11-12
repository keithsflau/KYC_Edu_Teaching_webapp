/* ABRAHAM'S JOURNEY · 亞伯拉罕生平 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "abraham",
      "title_zh": "亞伯拉罕生平",
      "title_en": "ABRAHAM'S JOURNEY",
      "subtitle": "創12–25章",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 28.19,
          "maxLng": 49.11,
          "minLat": 29.14,
          "maxLat": 38.27,
          "Z": 6
      },
      "startDate": "創12–25章",
      "introCam": {
          "lng": 38.6515,
          "lat": 33.7085,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "亞伯拉罕生平",
          "en": "ABRAHAM'S JOURNEY · 創12–25章",
          "narr_zh": "耶和華對亞伯蘭說：你要離開本地本族，往我所要指示你的地去。",
          "narr_en": "The LORD said to Abram: Go from your country to the land I will show you."
      },
      "outroCam": {
          "lng": 38.6515,
          "lat": 33.7085,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../exodus-canaan/",
          "title_zh": "出埃及與進迦南",
          "title_en": "EXODUS & CONQUEST"
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
              "name_zh": "吾珥",
              "name_en": "Ur",
              "type": "city",
              "lng": 46.103,
              "lat": 30.962,
              "ref": "創 11:28"
          },
          {
              "name_zh": "哈蘭",
              "name_en": "Haran",
              "type": "city",
              "lng": 39.033,
              "lat": 36.867,
              "ref": "創 11:31"
          },
          {
              "name_zh": "示劍",
              "name_en": "Shechem",
              "type": "town",
              "lng": 35.289,
              "lat": 32.213,
              "ref": "創 12:6"
          },
          {
              "name_zh": "伯特利",
              "name_en": "Bethel",
              "type": "town",
              "lng": 35.222,
              "lat": 31.927,
              "ref": "創 12:8"
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
              "name_zh": "別是巴",
              "name_en": "Beersheba",
              "type": "town",
              "lng": 34.793,
              "lat": 31.245,
              "ref": "創 21:31"
          },
          {
              "name_zh": "基拉耳",
              "name_en": "Gerar",
              "type": "town",
              "lng": 34.617,
              "lat": 31.383,
              "ref": "創 20:1"
          },
          {
              "name_zh": "歌珊",
              "name_en": "Goshen",
              "type": "region",
              "lng": 31.2,
              "lat": 30.55,
              "ref": "創 46:34"
          },
          {
              "name_zh": "摩利亞",
              "name_en": "Moriah",
              "type": "peak",
              "lng": 35.235,
              "lat": 31.778,
              "ref": "創 22:2"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "abram",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "亞伯蘭一家",
          "name_en": "Abram's household",
          "track": [
              {
                  "d": 1,
                  "lng": 46.103,
                  "lat": 30.962,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 18,
                  "lng": 39.033,
                  "lat": 36.867,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 38,
                  "lng": 35.289,
                  "lat": 32.213,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 48,
                  "lng": 35.222,
                  "lat": 31.927,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 58,
                  "lng": 35.099,
                  "lat": 31.524,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 72,
                  "lng": 31.2,
                  "lat": 30.55,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 82,
                  "lng": 35.099,
                  "lat": 31.524,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 10,
          "f": "covenant",
          "from": [
              46.103,
              30.962
          ],
          "to": [
              39.033,
              36.867
          ],
          "label": "離開吾珥 創12:4",
          "kind": "retreat"
      },
      {
          "d": 32,
          "f": "covenant",
          "from": [
              39.033,
              36.867
          ],
          "to": [
              35.289,
              32.213
          ],
          "label": "進入迦南 創12:5",
          "kind": "attack"
      },
      {
          "d": 68,
          "f": "covenant",
          "from": [
              35.099,
              31.524
          ],
          "to": [
              31.2,
              30.55
          ],
          "label": "饑荒下埃及 創12:10",
          "kind": "retreat"
      },
      {
          "d": 92,
          "f": "covenant",
          "from": [
              35.099,
              31.524
          ],
          "to": [
              35.235,
              31.778
          ],
          "label": "獻以撒 創22:2",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "亞伯拉罕生平",
          "en": "ABRAHAM'S JOURNEY"
      }
  ];
  const notes =   {
      "summary": "亞伯拉罕生平 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "亞伯蘭自吾珥（Tell el-Muqayyar）蒙召，停哈蘭，入迦南經示劍（Tell Balata）、伯特利（Beitin）；因饑荒暫居歌珊；後回希伯崙，在摩利亞（耶路撒冷聖殿山）獻以撒。",
      "leaders": "亞伯蘭／亞伯拉罕、撒萊、羅得、麥基洗德、以撒。",
      "nationalPower": "耶和華立約：「地上萬族因你得福。」應許之地預表基督與信徒產業。",
      "impact": "信心之父，因信稱義楷模（羅4；加3）。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 46.103,
              "lat": 30.962,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "吾珥蒙召",
          "title_en": "Call at Ur",
          "narration_zh": "創12:1 耶和華對亞伯蘭說：你要離開本地、本族、父家。",
          "narration_en": "Gen 12:1 — Leave your country, your people, your father's household.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "亞伯蘭",
                  "en": "Abram"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 18,
          "hold": 8,
          "cam": {
              "lng": 39.033,
              "lat": 36.867,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "哈蘭",
          "title_en": "Haran",
          "narration_zh": "創12:4-5 亞伯蘭離開哈蘭，帶同撒萊、羅得及所有財物往迦南。",
          "narration_en": "Gen 12:4-5 — Abram left Haran for Canaan with Sarai and Lot.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 38,
          "hold": 8,
          "cam": {
              "lng": 35.289,
              "lat": 32.213,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "示劍應許",
          "title_en": "Shechem",
          "narration_zh": "創12:6-7 亞伯蘭經過示劍，耶和華顯現說：我要把這地賜給你的後裔。",
          "narration_en": "Gen 12:6-7 — At Shechem the LORD promised the land to Abram's offspring.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 48,
          "hold": 8,
          "cam": {
              "lng": 35.222,
              "lat": 31.927,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "伯特利築壇",
          "title_en": "Bethel",
          "narration_zh": "創12:8 在伯特利與艾中間築壇，求告耶和華的名。",
          "narration_en": "Gen 12:8 — He built an altar at Bethel and called on the name of the LORD.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 58,
          "hold": 8,
          "cam": {
              "lng": 35.099,
              "lat": 31.524,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "希伯崙",
          "title_en": "Hebron",
          "narration_zh": "創13:18 亞伯蘭搬帳棚到希伯崙，在幔利橡樹那裡築壇。",
          "narration_en": "Gen 13:18 — Abram moved his tents to Hebron and built an altar.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 72,
          "hold": 8,
          "cam": {
              "lng": 31.2,
              "lat": 30.55,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "下埃及",
          "title_en": "Sojourn in Egypt",
          "narration_zh": "創12:10 那地遭遇饑荒，亞伯蘭下到埃及寄居。",
          "narration_en": "Gen 12:10 — Famine drove Abram to sojourn in Egypt.",
          "focus": [
              "abram"
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
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "摩利亞獻以撒",
          "title_en": "Moriah",
          "narration_zh": "創22:2 耶和華說：你帶著你的兒子以撒，往摩利亞地去，在我所指示你的山上獻他為燔祭。",
          "narration_en": "Gen 22:2 — Take your son Isaac to the region of Moriah and offer him.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "亞伯拉罕",
                  "en": "Abraham"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "亞伯拉罕生平",
      "title_en": "ABRAHAM'S JOURNEY",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 38.6515,
          "lat": 33.7085,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
