/* GALLIPOLI · 加里波利戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-gallipoli",
      "title_zh": "加里波利戰役",
      "title_en": "GALLIPOLI",
      "subtitle": "1915–1916",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 25.51,
          "maxLng": 27.31,
          "minLat": 39.71,
          "maxLat": 41.11,
          "Z": 11
      },
      "startDate": [
          1915,
          3,
          18
      ],
      "introCam": {
          "lng": 26.41,
          "lat": 40.41,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "加里波利戰役",
          "en": "GALLIPOLI · 1915–1916",
          "narr_zh": "協約國企圖打通達黑海海峽，遭鄂圖曼軍擊退。",
          "narr_en": "Allied landings fail against Ottoman defences on the Gallipoli peninsula."
      },
      "outroCam": {
          "lng": 26.41,
          "lat": 40.41,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../verdun/",
          "title_zh": "凡爾登戰役",
          "title_en": "VERDUN 1916"
      }
  };
  const factions = {
    "cp": {
      main: 0x5c4033, glow: 0x8b6914, dim: 0x3a2820,
      css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers",
      emblem: "circle", maxStrength: 120000, textLight: "#e8dcc8"
    },
    "ap": {
      main: 0x1e5a8a, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers",
      emblem: "shield", maxStrength: 130000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Gallipoli",
              "name_zh": "加里波利",
              "type": "fort",
              "lng": 26.41,
              "lat": 40.41
          },
          {
              "name_en": "Anzac Cove",
              "name_zh": "安扎克灣",
              "type": "bay",
              "lng": 26.28,
              "lat": 40.24
          },
          {
              "name_en": "Suvla Bay",
              "name_zh": "蘇弗拉灣",
              "type": "bay",
              "lng": 26.22,
              "lat": 40.32
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ap_gallipoli",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "澳紐軍團",
          "name_en": "ANZAC Corps",
          "track": [
              {
                  "d": 1,
                  "lng": 26.5,
                  "lat": 40.5,
                  "s": 40000,
                  "st": "landing"
              },
              {
                  "d": 60,
                  "lng": 26.28,
                  "lat": 40.24,
                  "s": 35000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 26.5,
                  "lat": 40.5,
                  "s": 15000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "cp_ottoman",
          "faction": "cp",
          "kind": "infantry",
          "crest": "crescent",
          "cf": true,
          "name_zh": "鄂圖曼第五集團軍",
          "name_en": "Ottoman 5th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 26.35,
                  "lat": 40.35,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 26.38,
                  "lat": 40.38,
                  "s": 45000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "ap",
          "from": [
              26.5,
              40.5
          ],
          "to": [
              26.28,
              40.24
          ],
          "label": "安扎克灣登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 90,
          "lng": 26.28,
          "lat": 40.24,
          "kind": "firefight",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "加里波利戰役",
          "en": "GALLIPOLI"
      }
  ];
  const notes =   {
      "summary": "加里波利戰役 — 課題地圖。兵力與路線為示意。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "協約國企圖兩棲登陸加里波利，打通達黑海海峽以支援俄國；鄂圖曼軍在凱末爾等指揮下頑抗。",
      "leaders": "英海軍部丘吉爾推動海峽遠征。海軍於1915年3月18日失敗，登陸是4月25日。凱末爾（後稱阿塔圖爾克）在安扎克灣組織反擊。協約國漢密爾頓將軍指揮登陸；鄂圖曼恩維爾帕夏總體決策。凱末爾勝利奠定土耳其共和國領袖地位。",
      "nationalPower": "英法等海軍強國，但兩棲作戰與補給困難；鄂圖曼本土防禦有利。",
      "impact": "遠征失敗，澳紐軍團（ANZAC）傷亡沉重；推動鄂圖曼民族主義與凱末爾崛起。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 26.5,
              "lat": 40.5,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1915年3月18日",
          "title_zh": "海峽強航失敗",
          "title_en": "Naval Attack Fails",
          "narration_zh": "協約國艦隊試圖強行通過達達尼爾海峽，觸雷並遭岸炮擊退。海軍失敗是3月18日，不是4月25日。",
          "narration_en": "The Allied fleet tries to force the Dardanelles and is stopped by mines and shore guns. The naval failure is 18 March, not 25 April.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "navy",
              "artillery"
          ],
          "forces_zh": "英法澳紐聯軍",
          "forces_en": "British, French, ANZAC forces"
      },
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": 26.28,
              "lat": 40.24,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1915年4月25日",
          "title_zh": "安扎克灣登陸",
          "title_en": "Landings at Anzac Cove",
          "narration_zh": "澳紐軍團在安扎克灣登陸，遭鄂圖曼軍猛烈抵抗。",
          "narration_en": "ANZAC troops land at Anzac Cove — fierce Ottoman resistance.",
          "focus": [
              "ap_gallipoli",
              "cp_ottoman"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "凱末爾",
                  "en": "Atatürk"
              }
          ],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": 26.22,
              "lat": 40.32,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1915年8月",
          "title_zh": "蘇弗拉灣攻勢",
          "title_en": "Suvla Bay Offensive",
          "narration_zh": "協約國增兵蘇弗拉灣，仍無法突破。",
          "narration_en": "Allied reinforcements at Suvla Bay fail to break through.",
          "focus": [
              "ap_gallipoli"
          ],
          "side": "ap",
          "commanders": [],
          "assets": [
              "landing"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 26.35,
              "lat": 40.35,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1915年秋冬",
          "title_zh": "僵持與疾病",
          "title_en": "Stalemate and Disease",
          "narration_zh": "戰壕僵持，痢疾與傷寒奪走大量士兵生命。",
          "narration_en": "Trench stalemate — dysentery and typhus take many lives.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 26.41,
              "lat": 40.41,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年1月",
          "title_zh": "秘密撤離",
          "title_en": "Secret Evacuation",
          "narration_zh": "協約國在夜間秘密撤離半島，遠征以失敗告終。",
          "narration_en": "Allied forces evacuate by night — the campaign ends in failure.",
          "focus": [
              "ap_gallipoli"
          ],
          "side": "ap",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
    const sourceTask = {
    "cite": "協約國海軍在達達尼爾海峽失利後的報告，1915年3月",
    "excerpt": "報告寫明艦隊在海峽觸雷，岸炮仍在，強航被停止。",
    "ask": "這份報告把海軍失敗放在哪一天的行動？",
    "options": [
      {
        "t": "4月25日澳紐軍團登陸的同一天。",
        "ok": false,
        "why": "4月25日是登陸。海軍強航失敗是3月18日。"
      },
      {
        "t": "3月18日的海峽強航。",
        "ok": true,
        "why": "報告說的是艦隊無法通過海峽。登陸是五週之後的另一件事。"
      },
      {
        "t": "1916年1月撤出半島的決定。",
        "ok": false,
        "why": "撤退是遠征失敗之後的結束，不是海軍報告所記的那一天。"
      }
    ]
  };
const outro =   {
      "title_zh": "加里波利戰役",
      "title_en": "GALLIPOLI",
      "narration_zh": "海軍強航在1915年3月18日失敗，登陸是4月25日，撤出在1916年1月。",
      "narration_en": "The naval attack failed on 18 March 1915. Landings were 25 April. Evacuation was January 1916.",
      "cam": {
          "lng": 26.41,
          "lat": 40.41,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
