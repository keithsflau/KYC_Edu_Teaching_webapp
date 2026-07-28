/* HUAIHAI CAMPAIGN · 淮海戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-huaihai",
      "title_zh": "淮海戰役",
      "title_en": "HUAIHAI CAMPAIGN",
      "subtitle": "1948年11月–1949年1月",
      "factionOrder": [
          "pla",
          "kmt"
      ],
      "geo": {
          "minLng": 115.45,
          "maxLng": 118.95,
          "minLat": 32.75,
          "maxLat": 35.75,
          "Z": 9
      },
      "startDate": [
          1948,
          11,
          6
      ],
      "introCam": {
          "lng": 117.2,
          "lat": 34.25,
          "dist": 740,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "淮海戰役",
          "en": "HUAIHAI CAMPAIGN · 1948年11月–1949年1月",
          "narr_zh": "以徐州為中心，解放軍殲滅國軍主力五十萬。",
          "narr_en": "The PLA destroys half a million KMT troops around Xuzhou."
      },
      "outroCam": {
          "lng": 117.2,
          "lat": 34.25,
          "dist": 888,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.12,
      "reliefScale": 0.72,
      "nextBattle": {
          "href": "../pingjin/",
          "title_zh": "平津戰役",
          "title_en": "PING-JIN 1948–49"
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
              "name_zh": "徐州",
              "name_en": "Xuzhou",
              "type": "city",
              "lng": 117.2,
              "lat": 34.25
          },
          {
              "name_zh": "雙堆集",
              "name_en": "Shuangduiji",
              "type": "town",
              "lng": 116.98,
              "lat": 33.42
          },
          {
              "name_zh": "陳官莊",
              "name_en": "Chenguanzhuang",
              "type": "town",
              "lng": 117.12,
              "lat": 34.35
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "pla_huaihai",
          "faction": "pla",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "華東中原野戰軍",
          "name_en": "East-Central Field Armies",
          "track": [
              {
                  "d": 1,
                  "lng": 116.5,
                  "lat": 34.5,
                  "s": 600000,
                  "st": "attack"
              },
              {
                  "d": 55,
                  "lng": 117.2,
                  "lat": 34.25,
                  "s": 800000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 117.2,
                  "lat": 34.25,
                  "s": 750000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "kmt_huaihai",
          "faction": "kmt",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "國軍徐蚌集團",
          "name_en": "KMT Xuzhou-Bengbu Group",
          "track": [
              {
                  "d": 1,
                  "lng": 117.2,
                  "lat": 34.25,
                  "s": 800000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 117.12,
                  "lat": 34.35,
                  "s": 300000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 117.2,
                  "lat": 34.25,
                  "s": 50000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 35,
          "f": "pla",
          "from": [
              116.5,
              34.5
          ],
          "to": [
              117.2,
              34.25
          ],
          "label": "合圍徐州",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 25,
          "b": 95,
          "lng": 117.2,
          "lat": 34.25,
          "kind": "firefight",
          "i": 1.2
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "淮海戰役",
          "en": "HUAIHAI CAMPAIGN"
      }
  ];
  const notes =   {
      "summary": "淮海戰役 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "淮海战役：华东、中原野战军以六十万对八十万，在黄泛区构筑纵深包围；杜聿明集团自徐州南撤被围于陈官庄，邱清泉、黄维兵团先后被歼。",
      "leaders": "淮海戰役為解放戰爭規模最大之役，華東野戰軍代司令粟裕建議發動，以圍殲黃淮地區國軍主力。國軍徐州「剿總」副司令杜聿明率邱清泉、孫元良等兵團突圍，在陳官莊等地被合圍殲滅。此戰國軍損失五十餘萬，長江以北國民黨統治體系崩潰，南京政府風雨飄搖。",
      "nationalPower": "解放军得民众百万支前，后勤优于国军；国军徐蚌线崩溃，指挥分裂，士气低落。",
      "impact": "規模最大、最慘烈的一役。國軍主力被殲，長江以北盡歸共產黨。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 117.2,
              "lat": 34.25,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年11月",
          "title_zh": "淮海开战",
          "title_en": "Huaihai Campaign Opens",
          "narration_zh": "华东、中原野战军发起淮海战役，以徐州为中心展开大规模会战。",
          "narration_en": "East China and Central Plains armies open the Huaihai Campaign centred on Xuzhou.",
          "focus": [
              "pla_huaihai"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "粟裕",
                  "en": "Su Yu"
              },
              {
                  "zh": "刘伯承",
                  "en": "Liu Bocheng"
              }
          ],
          "assets": [],
          "forces_zh": "解放军六十万",
          "forces_en": "600,000 PLA"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 117,
              "lat": 34.3,
              "dist": 660,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年11月",
          "title_zh": "黄百韬被围",
          "title_en": "Huang Baitao Encircled",
          "narration_zh": "黄百韬第七兵团被围于碾庄圩，徐蚌线切断。",
          "narration_en": "Huang Baitao's 7th army is trapped at Nianzhuang — the Xuzhou–Bengbu line is cut.",
          "focus": [
              "pla_huaihai",
              "kmt_huaihai"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 116.8,
              "lat": 33.9,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年11–12月",
          "title_zh": "双堆集歼灭黄维",
          "title_en": "Huang Wei Destroyed",
          "narration_zh": "中原野战军围歼黄维第十二兵团于双堆集。",
          "narration_en": "Huang Wei's 12th army is annihilated at Shuangduiji.",
          "focus": [
              "pla_huaihai"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "邓小平",
                  "en": "Deng Xiaoping"
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
              "lng": 117.1,
              "lat": 34,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年1月",
          "title_zh": "杜聿明集团覆灭",
          "title_en": "Du Yuming Group Destroyed",
          "narration_zh": "杜聿明率邱清泉等部自徐州南撤，被围于陈官庄，全军覆没。",
          "narration_en": "Du Yuming's retreating force is encircled at Chenguanzhuang and destroyed.",
          "focus": [
              "kmt_huaihai"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "杜聿明",
                  "en": "Du Yuming"
              }
          ],
          "assets": [],
          "forces_zh": "国军五十五万被歼",
          "forces_en": "550,000 ROC troops lost"
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 117.2,
              "lat": 34.25,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年1月10日",
          "title_zh": "长江以北尽归共军",
          "title_en": "North of Yangtze Lost",
          "narration_zh": "淮海战役结束，国军主力被歼，长江以北战略态势彻底逆转。",
          "narration_en": "Huaihai ends — the ROC loses the north of the Yangtze.",
          "focus": [],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "淮海戰役",
      "title_en": "HUAIHAI CAMPAIGN",
      "narration_zh": "本戰役為 DSE 中史重要考點：規模最大、最慘烈的一役。國軍主力被殲，長江以北盡歸共產黨",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 117.2,
          "lat": 34.25,
          "dist": 888,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
