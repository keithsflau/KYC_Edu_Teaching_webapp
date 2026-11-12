/* GOSPEL IN EUROPE · 福音傳遍歐洲 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "gospel-eu",
      "title_zh": "福音傳遍歐洲",
      "title_en": "GOSPEL IN EUROPE",
      "subtitle": "教會史",
      "factionOrder": [
          "church",
          "empire"
      ],
      "geo": {
          "minLng": 4.23,
          "maxLng": 40.19,
          "minLat": 27.53,
          "maxLat": 54.12,
          "Z": 5
      },
      "startDate": "教會史",
      "introCam": {
          "lng": 22.2125,
          "lat": 40.8265,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "福音傳遍歐洲",
          "en": "GOSPEL IN EUROPE · 教會史",
          "narr_zh": "福音從耶路撒冷傳至羅馬，再擴展至東歐與斯拉夫地區。",
          "narr_en": "The gospel spread from Jerusalem to Rome and into Eastern Europe."
      },
      "outroCam": {
          "lng": 22.2125,
          "lat": 40.8265,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../crusades/",
          "title_zh": "十字軍東征",
          "title_en": "CRUSADES"
      }
  };
  const factions = {
    "church": {
      main: 0x9b7ec8, glow: 0xc4a8e8, dim: 0x6b4c9a,
      css: "#9b7ec8", label_zh: "教會", label_en: "Church",
      emblem: "shield", maxStrength: 50000, textLight: "#f0e8ff"
    },
    "empire": {
      main: 0x8b6914, glow: 0xc9a227, dim: 0x5c4810,
      css: "#8b6914", label_zh: "帝國／異教", label_en: "Empire / Other",
      emblem: "circle", maxStrength: 120000, textLight: "#fff8e0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.235,
              "lat": 31.778,
              "ref": "撒下 5:7"
          },
          {
              "name_zh": "羅馬",
              "name_en": "Rome",
              "type": "city",
              "lng": 12.453,
              "lat": 41.902,
              "ref": "徒 28:16"
          },
          {
              "name_zh": "亞歷山大",
              "name_en": "Alexandria",
              "type": "city",
              "lng": 29.919,
              "lat": 31.2,
              "ref": "教會史"
          },
          {
              "name_zh": "米蘭",
              "name_en": "Milan",
              "type": "city",
              "lng": 9.19,
              "lat": 45.464,
              "ref": "313 米蘭詔"
          },
          {
              "name_zh": "君士坦丁堡",
              "name_en": "Constantinople",
              "type": "city",
              "lng": 28.979,
              "lat": 41.008,
              "ref": "教會史 330"
          },
          {
              "name_zh": "摩拉維亞",
              "name_en": "Moravia",
              "type": "region",
              "lng": 17,
              "lat": 48.75,
              "ref": "863 斯拉夫宣教"
          },
          {
              "name_zh": "基輔",
              "name_en": "Kiev",
              "type": "city",
              "lng": 30.514,
              "lat": 50.453,
              "ref": "988 羅斯歸主"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "church",
          "faction": "church",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "教會擴展",
          "name_en": "Church expansion",
          "track": [
              {
                  "d": 1,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 25,
                  "lng": 12.453,
                  "lat": 41.902,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 45,
                  "lng": 29.919,
                  "lat": 31.2,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 28.979,
                  "lat": 41.008,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 78,
                  "lng": 17,
                  "lat": 48.75,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 30.514,
                  "lat": 50.453,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "福音傳遍歐洲",
          "en": "GOSPEL IN EUROPE"
      }
  ];
  const notes =   {
      "summary": "福音傳遍歐洲 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "福音自耶路撒冷傳開（徒1:8），羅馬教會興起；313年米蘭詔；君士坦丁堡為東教中心；863年西里爾美多德在摩拉維亞；988年基輔羅斯受洗。",
      "leaders": "初期教父、君士坦丁、西里爾與美多德、弗拉基米爾大公。",
      "nationalPower": "教會承接大使命；正教在東歐扎根。",
      "impact": "福音塑造歐洲文明。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1世紀",
          "title_zh": "耶路撒冷",
          "title_en": "Jerusalem",
          "narration_zh": "徒1:8 要為我作見證，直到地極；五旬節聖靈降臨。",
          "narration_en": "Acts 1:8 — Witnesses from Jerusalem to the ends of the earth.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 12.453,
              "lat": 41.902,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1–3世紀",
          "title_zh": "羅馬",
          "title_en": "Rome",
          "narration_zh": "徒28 保羅在羅馬見證；彼得傳統亦與此城有關；教會在逼迫中擴展。",
          "narration_en": "The church took root in Rome despite persecution.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 29.919,
              "lat": 31.2,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "2–4世紀",
          "title_zh": "亞歷山大",
          "title_en": "Alexandria",
          "narration_zh": "亞歷山大成為重要教父中心，游斯丁、俄利根等在此事奉。",
          "narration_en": "Alexandria became a major center of early Christian theology.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 55,
          "hold": 8,
          "cam": {
              "lng": 9.19,
              "lat": 45.464,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "313年",
          "title_zh": "米蘭詔",
          "title_en": "Milan",
          "narration_zh": "313年《米蘭詔書》使基督教在羅馬帝國獲合法地位。",
          "narration_en": "The Edict of Milan (313) legalized Christianity.",
          "focus": [
              "church"
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
              "lng": 28.979,
              "lat": 41.008,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "4世紀",
          "title_zh": "君士坦丁堡",
          "title_en": "Constantinople",
          "narration_zh": "330年君士坦丁堡成為帝國首都，東方教會神學中心。",
          "narration_en": "Constantinople became the capital and center of Eastern Christianity.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 78,
          "hold": 8,
          "cam": {
              "lng": 17,
              "lat": 48.75,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "863年",
          "title_zh": "摩拉維亞",
          "title_en": "Moravia",
          "narration_zh": "西里爾與美多德兄弟在摩拉維亞向斯拉夫民族傳福音，創制斯拉夫文字。",
          "narration_en": "Cyril and Methodius evangelized the Slavs in Moravia.",
          "focus": [
              "church"
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
              "lng": 30.514,
              "lat": 50.453,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "988年",
          "title_zh": "基輔受洗",
          "title_en": "Kiev",
          "narration_zh": "988年弗拉基米爾大公在基輔受洗，基輔羅斯皈依正教。",
          "narration_en": "Prince Vladimir's baptism at Kiev Christianized Rus.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "福音傳遍歐洲",
      "title_en": "GOSPEL IN EUROPE",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 22.2125,
          "lat": 40.8265,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
