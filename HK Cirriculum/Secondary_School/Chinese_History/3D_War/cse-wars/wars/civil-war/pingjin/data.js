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
      "sources": "《中國人民解放軍戰史》平津戰役章、傅作義與解放軍代表談判的通行記載、天津攻城戰鬥總結。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "平津戰役：東北野戰軍入關與華北部隊合力，先圍張家口、新保安，再圍天津；傅作義困守北平，經談判接受改編，北平和平解放。",
      "leaders": "平津戰役中，東北野戰軍入關與華北軍區合力圍困北平、天津。林彪指揮先攻天津，全殲守軍，形成對北平合圍之勢。華北剿總司令傅作義在軍事壓力與政治爭取下接受和平改編，北平和平解放，保全古城與數十萬市民，國軍華北主力不戰而降。",
      "nationalPower": "解放軍以圍而不攻爭取和平；傅作義保全古城與文物，避免戰火破壞北平。",
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
          "title_zh": "平津戰役開始",
          "title_en": "Pingjin Campaign Opens",
          "narration_zh": "東北野戰軍入關，與華北部隊合力分割包圍平津地區。",
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
                  "zh": "聶榮臻",
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
          "title_zh": "新保安、張家口",
          "title_en": "Xinbao'an and Zhangjiakou",
          "narration_zh": "解放軍先攻新保安，殲滅郭景雲三十五軍，張家口守軍突圍被殲。",
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
          "title_zh": "天津攻堅戰",
          "title_en": "Assault on Tianjin",
          "narration_zh": "解放軍對天津發動總攻，陳長捷部被殲，傅作義退路斷絕。",
          "narration_en": "PLA storm Tianjin — Chen Changjie's garrison is wiped out.",
          "focus": [
              "pla_pingjin",
              "kmt_pingjin"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "傅作義",
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
          "title_zh": "圍而不攻北平",
          "title_en": "Beiping Encircled",
          "narration_zh": "解放軍圍而不攻北平，與傅作義談判，保護古城文物。",
          "narration_en": "Beiping is besieged but not stormed — talks with Fu Zuoyi protect the ancient capital.",
          "focus": [
              "kmt_pingjin"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "傅作義",
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
          "narration_zh": "傅作義接受改編，北平和平解放，華北局勢底定。",
          "narration_en": "Fu Zuoyi accepts reorganization — Beiping is liberated without a battle.",
          "focus": [],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "改編國軍約二十餘萬",
          "forces_en": "200,000+ troops reorganized"
      }
  ];
  const outro =   {
      "title_zh": "平津戰役",
      "title_en": "PING-JIN CAMPAIGN",
      "narration_zh": "1949年1月31日，傅作義部接受改編，北平未經巷戰易手。",
      "narration_en": "On 31 January 1949 Fu Zuoyi's forces were reorganized and Beiping changed hands without street fighting.",
      "cam": {
          "lng": 116.4,
          "lat": 39.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1948年底至1949年1月平津被分割、北平接受改編。",
      "senior": "高中：用先打新保安、天津，再談北平，說明傅作義為什麼接受改編。",
      "fact": "1948年11月起，東北野戰軍入關，與華北部隊把北平、天津、張家口分割。新保安、張家口的國軍被殲後，1949年1月天津被攻克。傅作義部在北平接受改編，1月31日北平易手，城內沒有進行巷戰。",
      "sources": "《中國人民解放軍戰史》平津戰役章、傅作義與解放軍代表談判的通行記載、天津攻城戰鬥總結。不以網絡百科為唯一依據。",
      "evaluation": "北平能不巷戰易手，是因為退路已斷、天津已失，談判才有結果。只說「和平」兩字，說明不了軍事包圍怎樣造成這個結局。",
      "judgment": {
          "ask": "哪一則說法更能解釋北平為什麼未經巷戰易手？",
          "a": "因為雙方一開始就只想保護古蹟，所以沒有軍事包圍。",
          "b": "張家口、新保安和天津先後失利，北平被圍，傅作義才接受改編。",
          "better": "b",
          "why": "改編發生在退路被切斷之後。古蹟得以保存是結果，包圍和天津失守更能解釋他為什麼接受改編。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
