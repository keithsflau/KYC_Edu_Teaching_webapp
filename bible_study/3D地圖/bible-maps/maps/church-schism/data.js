/* CHURCH SCHISM · 教會分裂 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "schism",
      "title_zh": "教會分裂",
      "title_en": "CHURCH SCHISM",
      "subtitle": "1054 AD",
      "factionOrder": [
          "church",
          "empire"
      ],
      "geo": {
          "minLng": 7.9,
          "maxLng": 40.71,
          "minLat": 29.03,
          "maxLat": 44.07,
          "Z": 5
      },
      "startDate": "1054 AD",
      "introCam": {
          "lng": 24.305500000000002,
          "lat": 36.551,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "教會分裂",
          "en": "CHURCH SCHISM · 1054 AD",
          "narr_zh": "1054年羅馬與君士坦丁堡互相開除教籍，東西教會正式分裂。",
          "narr_en": "In 1054 Rome and Constantinople excommunicated each other."
      },
      "outroCam": {
          "lng": 24.305500000000002,
          "lat": 36.551,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
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
              "name_zh": "羅馬",
              "name_en": "Rome",
              "type": "city",
              "lng": 12.453,
              "lat": 41.902,
              "ref": "徒 28:16"
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
              "name_zh": "亞歷山大",
              "name_en": "Alexandria",
              "type": "city",
              "lng": 29.919,
              "lat": 31.2,
              "ref": "教會史"
          },
          {
              "name_zh": "安條克",
              "name_en": "Antioch",
              "type": "city",
              "lng": 36.158,
              "lat": 36.202,
              "ref": "1098 圍城"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "rome_ch",
          "faction": "church",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "羅馬教會",
          "name_en": "Roman Church",
          "track": [
              {
                  "d": 1,
                  "lng": 12.453,
                  "lat": 41.902,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 12.453,
                  "lat": 41.902,
                  "s": 0,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "constantinople",
          "faction": "empire",
          "kind": "command",
          "crest": "circle",
          "cf": true,
          "name_zh": "君士坦丁堡教會",
          "name_en": "Constantinople Church",
          "track": [
              {
                  "d": 1,
                  "lng": 28.979,
                  "lat": 41.008,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 28.979,
                  "lat": 41.008,
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
          "zh": "教會分裂",
          "en": "CHURCH SCHISM"
      }
  ];
  const notes =   {
      "summary": "教會分裂 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "1054年7月16日羅馬與君士坦丁堡互相開除教籍；此前已有和子句、教宗權柄、禮儀等分歧；五大宗主教座包括羅馬、君士坦丁堡、亞歷山大、安條克。",
      "leaders": "利奧九世、君士坦丁堡牧首塞魯拉留斯。",
      "nationalPower": "反映文化、語言與教會政治差異。",
      "impact": "1054年分裂影響至今。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 12.453,
              "lat": 41.902,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "4–10世紀",
          "title_zh": "羅馬",
          "title_en": "Rome",
          "narration_zh": "羅馬教會強調教宗首席權柄與拉丁禮儀傳統。",
          "narration_en": "Rome emphasized papal primacy and Latin liturgy.",
          "focus": [
              "rome_ch"
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
              "lng": 28.979,
              "lat": 41.008,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "11世紀",
          "title_zh": "君士坦丁堡",
          "title_en": "Constantinople",
          "narration_zh": "東方教會堅持大公會議權威，反對和子句加入信經。",
          "narration_en": "Constantinople upheld conciliar authority and opposed the Filioque.",
          "focus": [
              "constantinople"
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
              "lng": 28.979,
              "lat": 41.008,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1054年7月16日",
          "title_zh": "互相開除教籍",
          "title_en": "Mutual Excommunication",
          "narration_zh": "1054年7月16日雙方代表互相開除教籍，東西教會正式分裂。",
          "narration_en": "16 July 1054 — Mutual excommunication formalized the schism.",
          "focus": [
              "rome_ch",
              "constantinople"
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
              "lng": 29.919,
              "lat": 31.2,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "分裂後",
          "title_zh": "亞歷山大",
          "title_en": "Alexandria",
          "narration_zh": "東方正教傳統下，亞歷山大、安條克等古老宗座繼續發展。",
          "narration_en": "Alexandria remained a historic patriarchal see in the East.",
          "focus": [
              "constantinople"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 36.158,
              "lat": 36.202,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "分裂後",
          "title_zh": "安條克",
          "title_en": "Antioch",
          "narration_zh": "安條克宗座代表古老近東教會傳統，與羅馬分道揚鑣。",
          "narration_en": "Antioch represented ancient Semitic Christianity in the Eastern communion.",
          "focus": [
              "constantinople"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "教會分裂",
      "title_en": "CHURCH SCHISM",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 24.305500000000002,
          "lat": 36.551,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
