/* PING-JIN CAMPAIGN · 平津戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-pingjin",
      "title_zh": "平津戰役",
      "title_en": "PING-JIN CAMPAIGN",
      "subtitle": "1948年11月–1949年1月",
      "factionOrder": [
          "pla",
          "kmt"
      ],
      "geo": {
          "minLng": 115.15,
          "maxLng": 117.65,
          "minLat": 38.9,
          "maxLat": 40.9,
          "Z": 10
      },
      "startDate": [
          1948,
          11,
          29
      ],
      "introCam": {
          "lng": 116.4,
          "lat": 39.9,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "平津戰役",
          "en": "PING-JIN CAMPAIGN · 1948年11月–1949年1月",
          "narr_zh": "林彪、聶榮臻指揮華北野戰軍圍困平津，傅作義接受改編。",
          "narr_en": "North China Field Army besieges Beiping — Fu Zuoyi surrenders."
      },
      "outroCam": {
          "lng": 116.4,
          "lat": 39.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.1,
      "reliefScale": 0.75,
      "nextBattle": {
          "href": "../crossing/",
          "title_zh": "渡江戰役",
          "title_en": "YANGTZE CROSSING 1949"
      }
  };
  const factions = {
    "pla": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "解放軍", label_en: "PLA",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "kmt": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "國民黨軍", label_en: "KMT Forces",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "北平",
              "name_en": "Beiping",
              "type": "city",
              "lng": 116.4,
              "lat": 39.9
          },
          {
              "name_zh": "天津",
              "name_en": "Tianjin",
              "type": "city",
              "lng": 117.2,
              "lat": 39.08
          },
          {
              "name_zh": "張家口",
              "name_en": "Zhangjiakou",
              "type": "fort",
              "lng": 114.88,
              "lat": 40.82
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "pla_pingjin",
          "faction": "pla",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "華北野戰軍",
          "name_en": "North China Field Army",
          "track": [
              {
                  "d": 1,
                  "lng": 115.5,
                  "lat": 40.2,
                  "s": 500000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 117.2,
                  "lat": 39.08,
                  "s": 600000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 116.4,
                  "lat": 39.9,
                  "s": 650000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "kmt_pingjin",
          "faction": "kmt",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "傅作義集團",
          "name_en": "Fu Zuoyi Group",
          "track": [
              {
                  "d": 1,
                  "lng": 116.4,
                  "lat": 39.9,
                  "s": 400000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 117.2,
                  "lat": 39.08,
                  "s": 150000,
                  "st": "dead"
              },
              {
                  "d": 100,
                  "lng": 116.4,
                  "lat": 39.9,
                  "s": 200000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "pla",
          "from": [
              115.5,
              40.2
          ],
          "to": [
              117.2,
              39.08
          ],
          "label": "攻克天津",
          "kind": "attack"
      },
      {
          "d": 90,
          "f": "kmt",
          "from": [
              116.4,
              39.9
          ],
          "to": [
              116.4,
              39.9
          ],
          "label": "接受改編",
          "kind": "march"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 85,
          "lng": 117.2,
          "lat": 39.08,
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
          "zh": "平津戰役",
          "en": "PING-JIN CAMPAIGN"
      }
  ];
  const notes =   {
      "summary": "平津戰役 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "平津战役：东北野战军入关与华北部队合力，先围张家口、新保安，再围天津；傅作义困守北平，经谈判接受改编，北平和平解放。",
      "leaders": "平津戰役中，東北野戰軍入關與華北軍區合力圍困北平、天津。林彪指揮先攻天津，全殲守軍，形成對北平合圍之勢。華北剿總司令傅作義在軍事壓力與政治爭取下接受和平改編，北平和平解放，保全古城與數十萬市民，國軍華北主力不戰而降。",
      "nationalPower": "解放军以围而不攻争取和平；傅作义保全古城与文物，避免战火破坏北平。",
      "impact": "傅作義接受改編，和平解放北平，解放軍確立華北絕對優勢。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 116.4,
              "lat": 39.9,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年11月",
          "title_zh": "平津战役开始",
          "title_en": "Pingjin Campaign Opens",
          "narration_zh": "东北野战军入关，与华北部队合力分割包围平津地区。",
          "narration_en": "Northeast Field Army enters the pass — Pingjin is encircled.",
          "focus": [
              "pla_pingjin"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "林彪",
                  "en": "Lin Biao"
              },
              {
                  "zh": "聂荣臻",
                  "en": "Nie Rongzhen"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 115,
              "lat": 40.8,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年12月",
          "title_zh": "新保安、张家口",
          "title_en": "Xinbao'an and Zhangjiakou",
          "narration_zh": "解放军先攻新保安，歼灭郭景云三十五军，张家口守军突围被歼。",
          "narration_en": "Guo Jingyun's 35th Army is destroyed at Xinbao'an — Zhangjiakou falls.",
          "focus": [
              "pla_pingjin"
          ],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 117.2,
              "lat": 39.1,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年1月",
          "title_zh": "天津攻坚战",
          "title_en": "Assault on Tianjin",
          "narration_zh": "解放军对天津发动总攻，陈长捷部被歼，傅作义退路断绝。",
          "narration_en": "PLA storm Tianjin — Chen Changjie's garrison is wiped out.",
          "focus": [
              "pla_pingjin",
              "kmt_pingjin"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "傅作义",
                  "en": "Fu Zuoyi"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 116.4,
              "lat": 39.9,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年1月",
          "title_zh": "围而不攻北平",
          "title_en": "Beiping Encircled",
          "narration_zh": "解放军围而不攻北平，与傅作义谈判，保护古城文物。",
          "narration_en": "Beiping is besieged but not stormed — talks with Fu Zuoyi protect the ancient capital.",
          "focus": [
              "kmt_pingjin"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "傅作义",
                  "en": "Fu Zuoyi"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 116.4,
              "lat": 39.9,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年1月31日",
          "title_zh": "北平和平解放",
          "title_en": "Peaceful Liberation of Beiping",
          "narration_zh": "傅作义接受改编，北平和平解放，华北局势底定。",
          "narration_en": "Fu Zuoyi accepts reorganization — Beiping is liberated without a battle.",
          "focus": [],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "改编国军约二十余万",
          "forces_en": "200,000+ troops reorganized"
      }
  ];
  const outro =   {
      "title_zh": "平津戰役",
      "title_en": "PING-JIN CAMPAIGN",
      "narration_zh": "本戰役為 DSE 中史重要考點：傅作義接受改編，和平解放北平，解放軍確立華北絕對優勢",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 116.4,
          "lat": 39.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
