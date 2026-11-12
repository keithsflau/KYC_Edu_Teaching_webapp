/* KING SOLOMON · 所羅門時期 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "solomon",
      "title_zh": "所羅門時期",
      "title_en": "KING SOLOMON",
      "subtitle": "王上1–11",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.09,
          "maxLng": 37.09,
          "minLat": 28.61,
          "maxLat": 34.22,
          "Z": 9
      },
      "startDate": "王上1–11",
      "introCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "所羅門時期",
          "en": "KING SOLOMON · 王上1–11",
          "narr_zh": "所羅門在耶路撒冷作以色列眾人的王；他作王四十年。",
          "narr_en": "Solomon reigned in Jerusalem over all Israel forty years."
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
          "href": "../kingdom-split/",
          "title_zh": "國度分裂",
          "title_en": "KINGDOM DIVIDED"
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
              "name_zh": "基遍",
              "name_en": "Gibeon",
              "type": "town",
              "lng": 35.185,
              "lat": 31.847,
              "ref": "王上 3:4"
          },
          {
              "name_zh": "聖殿山",
              "name_en": "Temple Mount",
              "type": "fort",
              "lng": 35.235,
              "lat": 31.778,
              "ref": "王上 6:1"
          },
          {
              "name_zh": "推羅",
              "name_en": "Tyre",
              "type": "city",
              "lng": 35.194,
              "lat": 33.271,
              "ref": "王上 5:1"
          },
          {
              "name_zh": "以旬迦別",
              "name_en": "Ezion-geber",
              "type": "city",
              "lng": 34.948,
              "lat": 29.556,
              "ref": "王上 9:26"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "solomon",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "所羅門王國",
          "name_en": "Solomon's kingdom",
          "track": [
              {
                  "d": 1,
                  "lng": 35.185,
                  "lat": 31.847,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 35,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 35.194,
                  "lat": 33.271,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 34.948,
                  "lat": 29.556,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 90000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 55,
          "f": "covenant",
          "from": [
              35.235,
              31.778
          ],
          "to": [
              35.194,
              33.271
          ],
          "label": "與推羅合作 王上5:1",
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
          "zh": "所羅門時期",
          "en": "KING SOLOMON"
      }
  ];
  const notes =   {
      "summary": "所羅門時期 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "所羅門在基遍夢中求智慧（王上3）；在耶路撒冷聖殿山建殿（王上6）；與推羅希蘭合作（王上5）；在以旬迦別（埃拉特）建船隊（王上9:26）。",
      "leaders": "所羅門、希蘭、示巴女王。",
      "nationalPower": "聖殿為耶和華名居住之地，預表基督與教會。",
      "impact": "繁榮與晚年離棄成為後世警戒。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.185,
              "lat": 31.847,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前970年",
          "title_zh": "基遍求智慧",
          "title_en": "Gibeon",
          "narration_zh": "王上3:4-5 所羅門在基遍獻祭；夢中神賜他智慧。",
          "narration_en": "1 Kgs 3:4-5 — Solomon asked for wisdom at Gibeon.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "所羅門",
                  "en": "Solomon"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 35,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前966年",
          "title_zh": "建造聖殿",
          "title_en": "Temple Mount",
          "narration_zh": "王上6:1 所羅門作王第四年，在耶路撒冷開始建殿，七年建成。",
          "narration_en": "1 Kgs 6:1 — Solomon built the temple on Mount Moriah.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 60,
          "hold": 8,
          "cam": {
              "lng": 35.194,
              "lat": 33.271,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "所羅門年間",
          "title_zh": "推羅",
          "title_en": "Tyre",
          "narration_zh": "王上5:1 推羅王希蘭與所羅門合作，運香柏木建殿。",
          "narration_en": "1 Kgs 5:1 — Hiram of Tyre supplied cedar for the temple.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 80,
          "hold": 8,
          "cam": {
              "lng": 34.948,
              "lat": 29.556,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "所羅門年間",
          "title_zh": "以旬迦別",
          "title_en": "Ezion-geber",
          "narration_zh": "王上9:26 所羅門在以旬迦別（以東海邊）與以拉他旁邊建船隊。",
          "narration_en": "1 Kgs 9:26 — Solomon built a fleet at Ezion-geber on the Red Sea.",
          "focus": [
              "solomon"
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
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前931年",
          "title_zh": "晚年離棄",
          "title_en": "Turning Away",
          "narration_zh": "王上11:4 所羅門年老，妃嬪誘惑他的心偏離耶和華。",
          "narration_en": "1 Kgs 11:4 — Solomon's heart turned away in his old age.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "所羅門時期",
      "title_en": "KING SOLOMON",
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
