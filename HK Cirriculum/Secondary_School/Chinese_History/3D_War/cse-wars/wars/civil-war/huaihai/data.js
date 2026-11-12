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
      "sources": "《中國人民解放軍戰史》淮海戰役章、國防部史政局與國軍徐州剿總戰鬥詳報的整理、粟裕等關於淮海戰役的電報。孫元良兵團的下落依西撤潰散、本人脫走的通行記載。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "淮海戰役：華東、中原野戰軍以六十萬對八十萬，在黃氾區構築縱深包圍；杜聿明集團自徐州南撤被圍于陳官莊，邱清泉、黃維兵團先後被殲。",
      "leaders": "粟裕建議在徐蚌地區圍殲國軍主力。黃百韜兵團在碾莊被殲，黃維兵團在雙堆集被殲。陳官莊被圍殲的是杜聿明、邱清泉、李彌等部。孫元良兵團在西撤時潰散，孫元良本人脫走。",
      "nationalPower": "解放軍得民眾百萬支前，後勤優于國軍；國軍徐蚌線崩潰，指揮分裂，士氣低落。",
      "impact": "徐蚌地區的國軍主力被分段圍殲。孫元良兵團在西撤時潰散，本人脫走。"
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
          "title_zh": "淮海開戰",
          "title_en": "Huaihai Campaign Opens",
          "narration_zh": "華東、中原野戰軍發起淮海戰役，以徐州為中心展開大規模會戰。",
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
                  "zh": "劉伯承",
                  "en": "Liu Bocheng"
              }
          ],
          "assets": [],
          "forces_zh": "解放軍六十萬",
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
          "title_zh": "黃百韜被圍",
          "title_en": "Huang Baitao Encircled",
          "narration_zh": "黃百韜第七兵團被圍于碾莊圩，徐蚌線切斷。",
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
          "title_zh": "雙堆集殲滅黃維",
          "title_en": "Huang Wei Destroyed",
          "narration_zh": "中原野戰軍圍殲黃維第十二兵團于雙堆集。",
          "narration_en": "Huang Wei's 12th army is annihilated at Shuangduiji.",
          "focus": [
              "pla_huaihai"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "鄧小平",
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
          "title_zh": "杜聿明集團覆滅",
          "title_en": "Du Yuming Group Destroyed",
          "narration_zh": "杜聿明率邱清泉、李彌等部撤到陳官莊被圍。孫元良兵團在西撤時潰散，本人脫走。",
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
          "forces_zh": "國軍五十五萬被殲",
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
          "title_zh": "陳官莊圍困結束",
          "title_en": "Chenguanzhuang Pocket Ends",
          "narration_zh": "1949年1月10日陳官莊圍困結束，杜聿明被俘。",
          "narration_en": "On 10 January 1949 the Chenguanzhuang pocket ends and Du Yuming is captured.",
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
      "narration_zh": "1949年1月10日陳官莊圍困結束，杜聿明被俘。",
      "narration_en": "The Chenguanzhuang pocket ended on 10 January 1949, and Du Yuming was captured.",
      "cam": {
          "lng": 117.2,
          "lat": 34.25,
          "dist": 888,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：分清碾莊、雙堆集、陳官莊是三個不同的包圍圈。",
      "senior": "高中：分清三個包圍圈；孫元良兵團在西撤時潰散，本人脫走。",
      "fact": "1948年11月至1949年1月，華東野戰軍與中原野戰軍在徐蚌地區作戰。黃百韜兵團在碾莊被殲，黃維兵團在雙堆集被殲。杜聿明放棄徐州後，邱清泉、李彌等部被圍在陳官莊，1949年1月10日圍困結束，杜聿明被俘。孫元良兵團在西撤時潰散，孫元良本人脫走。這一役摧毀了國軍在徐蚌地區的主力。西北等地仍有國軍。",
      "sources": "《中國人民解放軍戰史》淮海戰役章、國防部史政局與國軍徐州剿總戰鬥詳報的整理、粟裕等關於淮海戰役的電報。孫元良兵團的下落依西撤潰散、本人脫走的通行記載。不以網絡百科為唯一依據。",
      "evaluation": "解放軍能分段圍殲，是因為國軍兵團被拆開，民眾支前又維持了解放軍的補給。孫元良兵團在西撤時潰散，和陳官莊的覆沒要分開看。",
      "judgment": {
          "ask": "哪一則說法更能解釋淮海戰役國軍主力是怎樣喪失的？",
          "a": "黃百韜、黃維和杜聿明三個兵團同時困在陳官莊，一起被殲。",
          "b": "黃百韜、黃維、陳官莊的杜聿明和邱清泉等部被分段圍殲；孫元良兵團在西撤時潰散。",
          "better": "b",
          "why": "三個包圍圈要分開。陳官莊被圍的是杜聿明、邱清泉、李彌等部。孫元良兵團在西撤時潰散，本人脫走。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
