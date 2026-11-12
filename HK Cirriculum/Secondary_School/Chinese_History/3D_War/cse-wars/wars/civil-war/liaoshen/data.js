/* LIAO-SHEN CAMPAIGN · 遼瀋戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-liaoshen",
      "title_zh": "遼瀋戰役",
      "title_en": "LIAO-SHEN CAMPAIGN",
      "subtitle": "1948年9–11月",
      "factionOrder": [
          "pla",
          "kmt"
      ],
      "geo": {
          "minLng": 121.65,
          "maxLng": 125.15,
          "minLat": 40.3,
          "maxLat": 43.3,
          "Z": 9
      },
      "startDate": [
          1948,
          9,
          12
      ],
      "introCam": {
          "lng": 123.4,
          "lat": 41.8,
          "dist": 720,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "遼瀋戰役",
          "en": "LIAO-SHEN CAMPAIGN · 1948年9–11月",
          "narr_zh": "林彪指揮東北野戰軍攻取錦州，圍困長春、瀋陽。",
          "narr_en": "Lin Biao's Northeast Field Army captures Jinzhou and the Northeast."
      },
      "outroCam": {
          "lng": 123.4,
          "lat": 41.8,
          "dist": 864,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.1,
      "reliefScale": 0.78,
      "nextBattle": {
          "href": "../huaihai/",
          "title_zh": "淮海戰役",
          "title_en": "HUAIHAI 1948–49"
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
              "name_zh": "錦州",
              "name_en": "Jinzhou",
              "type": "city",
              "lng": 121.13,
              "lat": 41.1
          },
          {
              "name_zh": "瀋陽",
              "name_en": "Shenyang",
              "type": "city",
              "lng": 123.43,
              "lat": 41.8
          },
          {
              "name_zh": "長春",
              "name_en": "Changchun",
              "type": "city",
              "lng": 125.32,
              "lat": 43.9
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "pla_liaoshen",
          "faction": "pla",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "東北野戰軍",
          "name_en": "Northeast Field Army",
          "track": [
              {
                  "d": 1,
                  "lng": 122.5,
                  "lat": 42.5,
                  "s": 700000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 121.13,
                  "lat": 41.1,
                  "s": 800000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 123.43,
                  "lat": 41.8,
                  "s": 850000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "kmt_liaoshen",
          "faction": "kmt",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "國軍東北集團軍",
          "name_en": "KMT Northeast Group",
          "track": [
              {
                  "d": 1,
                  "lng": 123.43,
                  "lat": 41.8,
                  "s": 550000,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 121.13,
                  "lat": 41.1,
                  "s": 200000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 123.43,
                  "lat": 41.8,
                  "s": 50000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "pla",
          "from": [
              122.5,
              42.5
          ],
          "to": [
              121.13,
              41.1
          ],
          "label": "攻取錦州",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 90,
          "lng": 121.13,
          "lat": 41.1,
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
          "zh": "遼瀋戰役",
          "en": "LIAO-SHEN CAMPAIGN"
      }
  ];
  const notes =   {
      "summary": "遼瀋戰役 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "《中國人民解放軍戰史》遼瀋戰役章、國軍東北剿總相關電報的整理、林彪與東北野戰軍作戰總結。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "遼沈戰役：林彪指揮東北野戰軍，先攻錦州切斷國軍退路，圍殲廖耀湘兵團于黑山、大虎山；長春曾澤生起義，瀋陽解放後東北全境易手。",
      "leaders": "遼瀋戰役由東北野戰軍發動，林彪、羅榮桓指揮圍攻錦州，切斷東北國軍退路。國軍東北「剿總」司令廖耀湘率精銳突圍，在黑山、大虎山一帶被阻擊殲滅。長春、瀋陽先後解放，國軍五十萬主力喪失，東北全境易手，為解放軍主力南下華北創造條件。",
      "nationalPower": "解放軍經整編士氣高昂，得民眾支援；國軍补给依賴海運，各城孤立，戰略被動。",
      "impact": "解放軍率先控制東北全境，國軍精銳盡失，雙方兵力對比發生逆轉。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 123.4,
              "lat": 41.8,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年9月",
          "title_zh": "攻錦打援",
          "title_en": "Capture Jinzhou",
          "narration_zh": "東北野戰軍包圍錦州，切斷國軍關内退路。",
          "narration_en": "Northeast Field Army besieges Jinzhou — the Nationalist escape route south is severed.",
          "focus": [
              "pla_liaoshen"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "林彪",
                  "en": "Lin Biao"
              },
              {
                  "zh": "羅榮桓",
                  "en": "Luo Ronghuan"
              }
          ],
          "assets": [],
          "forces_zh": "解放軍約七十萬",
          "forces_en": "~700,000 PLA troops"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 121.1,
              "lat": 41.1,
              "dist": 660,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年10月",
          "title_zh": "錦州攻克",
          "title_en": "Jinzhou Falls",
          "narration_zh": "經31小時激戰，錦州陷落，范漢傑被俘。",
          "narration_en": "After 31 hours of fighting, Jinzhou falls — Fan Hanjie is captured.",
          "focus": [
              "pla_liaoshen"
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
              "lng": 122,
              "lat": 41.5,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年10月",
          "title_zh": "廖兵團覆滅",
          "title_en": "Liao Yaoxiang Destroyed",
          "narration_zh": "廖耀湘兵團自瀋陽西援，在黑山、大虎山被圍殲。",
          "narration_en": "Liao Yaoxiang's army is encircled and destroyed at Heishan.",
          "focus": [
              "pla_liaoshen",
              "kmt_liaoshen"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "廖耀湘",
                  "en": "Liao Yaoxiang"
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
              "lng": 123.4,
              "lat": 41.8,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年11月",
          "title_zh": "長春起義",
          "title_en": "Changchun Uprising",
          "narration_zh": "曾澤生率六十軍起義，長春和平解放。",
          "narration_en": "Zeng Zesheng's 60th Army mutinies — Changchun is liberated.",
          "focus": [
              "kmt_liaoshen"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "曾澤生",
                  "en": "Zeng Zesheng"
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
              "lng": 123.4,
              "lat": 41.8,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年11月2日",
          "title_zh": "東北全境解放",
          "title_en": "Northeast Liberated",
          "narration_zh": "瀋陽解放後，東北全境易手，解放軍兵力超越國軍。",
          "narration_en": "Shenyang falls — all of Manchuria is lost; PLA numbers surpass the ROC.",
          "focus": [],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "殲敵四十七萬",
          "forces_en": "470,000 enemy eliminated"
      }
  ];
  const outro =   {
      "title_zh": "遼瀋戰役",
      "title_en": "LIAO-SHEN CAMPAIGN",
      "narration_zh": "1948年11月2日瀋陽被攻佔，東北國軍主力在遼瀋戰役中喪失。",
      "narration_en": "Shenyang was taken on 2 November 1948, and the Nationalist main force in the Northeast was lost in the Liaoshen campaign.",
      "cam": {
          "lng": 123.4,
          "lat": 41.8,
          "dist": 864,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1948年錦州、廖耀湘兵團和瀋陽的順序。",
      "senior": "高中：用切斷北寧路解釋東北國軍為什麼不能南撤。",
      "fact": "1948年9月至11月，東北野戰軍先打錦州，切斷國軍經北寧路出關的通路。錦州攻克後，廖耀湘兵團在黑山、大虎山一帶被圍殲。長春守軍一部起義。11月2日瀋陽被攻佔。東北國軍主力在這一役中喪失。",
      "sources": "《中國人民解放軍戰史》遼瀋戰役章、國軍東北剿總相關電報的整理、林彪與東北野戰軍作戰總結。不以網絡百科為唯一依據。",
      "evaluation": "解放軍先佔錦州，國軍各城不能互相靠攏，援兵又被堵住。這比「兵力口號已經逆轉」更能說明錦州到瀋陽的順序。",
      "judgment": {
          "ask": "哪一則說法更能解釋遼瀋戰役國軍為什麼失掉東北？",
          "a": "因為口號說兵力已經逆轉，所以各城同時自動投降。",
          "b": "錦州失守後北寧路被切斷，廖耀湘兵團被圍殲，瀋陽接著失守。",
          "better": "b",
          "why": "關鍵是錦州和退路。沒有這一步，說明不了長春、瀋陽為什麼接著易手。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
