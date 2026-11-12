/* PAUL'S JOURNEYS · 保羅傳福音 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "paul",
      "title_zh": "保羅傳福音",
      "title_en": "PAUL'S JOURNEYS",
      "subtitle": "使徒行傳",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 7.88,
          "maxLng": 40.88,
          "minLat": 29.71,
          "maxLat": 43.97,
          "Z": 5
      },
      "startDate": "使徒行傳",
      "introCam": {
          "lng": 36.158,
          "lat": 36.202,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "保羅傳福音",
          "en": "PAUL'S JOURNEYS · 使徒行傳",
          "narr_zh": "保羅行程滿了耶穌的見證，在外邦建立教會。",
          "narr_en": "Paul bore witness to Jesus and planted churches among the nations."
      },
      "outroCam": {
          "lng": 36.158,
          "lat": 36.202,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../gospel-europe/",
          "title_zh": "福音傳遍歐洲",
          "title_en": "GOSPEL TO EUROPE"
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
              "name_zh": "大馬士革",
              "name_en": "Damascus",
              "type": "city",
              "lng": 36.306,
              "lat": 33.511,
              "ref": "徒 9:3"
          },
          {
              "name_zh": "安提阿",
              "name_en": "Antioch",
              "type": "city",
              "lng": 36.158,
              "lat": 36.202,
              "ref": "徒 11:26"
          },
          {
              "name_zh": "撒拉米",
              "name_en": "Salamis",
              "type": "city",
              "lng": 33.897,
              "lat": 35.182,
              "ref": "徒 13:5"
          },
          {
              "name_zh": "彼西底安提阿",
              "name_en": "Pisidian Antioch",
              "type": "city",
              "lng": 31.274,
              "lat": 38.321,
              "ref": "徒 13:14"
          },
          {
              "name_zh": "以哥念",
              "name_en": "Iconium",
              "type": "city",
              "lng": 32.485,
              "lat": 37.871,
              "ref": "徒 14:1"
          },
          {
              "name_zh": "路司得",
              "name_en": "Lystra",
              "type": "city",
              "lng": 32.345,
              "lat": 37.595,
              "ref": "徒 14:6"
          },
          {
              "name_zh": "特羅亞",
              "name_en": "Troas",
              "type": "city",
              "lng": 26.17,
              "lat": 39.755,
              "ref": "徒 16:8"
          },
          {
              "name_zh": "腓立比",
              "name_en": "Philippi",
              "type": "city",
              "lng": 24.286,
              "lat": 41.013,
              "ref": "徒 16:12"
          },
          {
              "name_zh": "帖撒羅尼迦",
              "name_en": "Thessalonica",
              "type": "city",
              "lng": 22.944,
              "lat": 40.64,
              "ref": "徒 17:1"
          },
          {
              "name_zh": "雅典",
              "name_en": "Athens",
              "type": "city",
              "lng": 23.728,
              "lat": 37.984,
              "ref": "徒 17:16"
          },
          {
              "name_zh": "哥林多",
              "name_en": "Corinth",
              "type": "city",
              "lng": 22.878,
              "lat": 37.906,
              "ref": "徒 18:1"
          },
          {
              "name_zh": "以弗所",
              "name_en": "Ephesus",
              "type": "city",
              "lng": 27.341,
              "lat": 37.94,
              "ref": "徒 19:1"
          },
          {
              "name_zh": "該撒利亞",
              "name_en": "Caesarea",
              "type": "city",
              "lng": 34.894,
              "lat": 32.5,
              "ref": "徒 21:8"
          },
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
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "paul",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "保羅一行",
          "name_en": "Paul's party",
          "track": [
              {
                  "d": 1,
                  "lng": 36.306,
                  "lat": 33.511,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 10,
                  "lng": 36.158,
                  "lat": 36.202,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 22,
                  "lng": 33.897,
                  "lat": 35.182,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 30,
                  "lng": 31.274,
                  "lat": 38.321,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 38,
                  "lng": 32.345,
                  "lat": 37.595,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 48,
                  "lng": 26.17,
                  "lat": 39.755,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 55,
                  "lng": 24.286,
                  "lat": 41.013,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 62,
                  "lng": 23.728,
                  "lat": 37.984,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 22.878,
                  "lat": 37.906,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 27.341,
                  "lat": 37.94,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 90,
                  "lng": 34.894,
                  "lat": 32.5,
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
      }
  ];
  const arrows =   [
      {
          "d": 5,
          "f": "covenant",
          "from": [
              36.306,
              33.511
          ],
          "to": [
              36.158,
              36.202
          ],
          "label": "歸主後 徒9:26",
          "kind": "attack"
      },
      {
          "d": 18,
          "f": "covenant",
          "from": [
              36.158,
              36.202
          ],
          "to": [
              33.897,
              35.182
          ],
          "label": "第一次宣教 徒13:4",
          "kind": "attack"
      },
      {
          "d": 95,
          "f": "covenant",
          "from": [
              34.894,
              32.5
          ],
          "to": [
              12.453,
              41.902
          ],
          "label": "上告該撒 徒25:11",
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
          "zh": "保羅傳福音",
          "en": "PAUL'S JOURNEYS"
      }
  ];
  const notes =   {
      "summary": "保羅傳福音 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "掃羅在大馬士革路上遇主（徒9）；安提阿差遣第一次宣教：撒拉米、彼西底安提阿、路司得（徒13-14）；第二次經特羅亞、腓立比、雅典至哥林多（徒16-18）；第三次以弗所為中心（徒19）；上告該撒至羅馬（徒28）。",
      "leaders": "保羅、巴拿巴、西拉、提摩太、路加。",
      "nationalPower": "因信稱義的福音傳向外邦；保羅書信構成新約神學核心。",
      "impact": "開闢歐洲宣教路線。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 36.306,
              "lat": 33.511,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元34年",
          "title_zh": "大馬士革路上",
          "title_en": "Damascus Road",
          "narration_zh": "徒9:3-6 掃羅臨近大馬士革，有大光四面照著他，主說：我就是你所逼迫的耶穌。",
          "narration_en": "Acts 9:3-6 — Saul's conversion on the road to Damascus.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "保羅",
                  "en": "Paul"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 10,
          "hold": 8,
          "cam": {
              "lng": 36.158,
              "lat": 36.202,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元46年",
          "title_zh": "安提阿差遣",
          "title_en": "Antioch",
          "narration_zh": "徒13:2-3 聖靈說：要為我分派巴拿巴和掃羅；安提阿教會按手差遣他們。",
          "narration_en": "Acts 13:2-3 — Sent out from Antioch on the first journey.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 33.897,
              "lat": 35.182,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第一次宣教",
          "title_zh": "撒拉米",
          "title_en": "Salamis",
          "narration_zh": "徒13:5 到了撒拉米，在猶太人會堂裡傳講神的道。",
          "narration_en": "Acts 13:5 — They proclaimed the word in the synagogues of Salamis, Cyprus.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 30,
          "hold": 8,
          "cam": {
              "lng": 31.274,
              "lat": 38.321,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第一次宣教",
          "title_zh": "彼西底安提阿",
          "title_en": "Pisidian Antioch",
          "narration_zh": "徒13:14 他們來到彼西底安提阿，在安息日進會堂坐席。",
          "narration_en": "Acts 13:14 — Paul preached at Pisidian Antioch.",
          "focus": [
              "paul"
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
              "lng": 32.345,
              "lat": 37.595,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第一次宣教",
          "title_zh": "路司得",
          "title_en": "Lystra",
          "narration_zh": "徒14:19 路司得人用石頭打保羅，以為他是死了，便拖到城外。",
          "narration_en": "Acts 14:19 — Paul was stoned at Lystra yet continued.",
          "focus": [
              "paul"
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
              "lng": 26.17,
              "lat": 39.755,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第二次宣教",
          "title_zh": "特羅亞",
          "title_en": "Troas",
          "narration_zh": "徒16:9 夜間有異象：有一個馬其頓人站著求你說：請你過到馬其頓幫助我們。",
          "narration_en": "Acts 16:9 — The Macedonian call at Troas.",
          "focus": [
              "paul"
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
              "lng": 24.286,
              "lat": 41.013,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第二次宣教",
          "title_zh": "腓立比",
          "title_en": "Philippi",
          "narration_zh": "徒16:12 來到腓立比，這是馬其頓的第一座城；呂底亞信主。",
          "narration_en": "Acts 16:12 — Lydia believed at Philippi.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 23.728,
              "lat": 37.984,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第二次宣教",
          "title_zh": "雅典",
          "title_en": "Athens",
          "narration_zh": "徒17:22 保羅在亞略巴古說：所造之物，你們可以按著性質當作神。",
          "narration_en": "Acts 17:22 — Paul's sermon on the Areopagus in Athens.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 70,
          "hold": 8,
          "cam": {
              "lng": 22.878,
              "lat": 37.906,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第二次宣教",
          "title_zh": "哥林多",
          "title_en": "Corinth",
          "narration_zh": "徒18:11 保羅住了一年零六個月，教訓他們神的道。",
          "narration_en": "Acts 18:11 — Paul stayed eighteen months in Corinth.",
          "focus": [
              "paul"
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
              "lng": 27.341,
              "lat": 37.94,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第三次宣教",
          "title_zh": "以弗所",
          "title_en": "Ephesus",
          "narration_zh": "徒19:10 這樣有兩年之久，叫一切住在亞細亞的人都聽見主的道。",
          "narration_en": "Acts 19:10 — Two years of ministry in Ephesus.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 34.894,
              "lat": 32.5,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元57年",
          "title_zh": "該撒利亞",
          "title_en": "Caesarea",
          "narration_zh": "徒21:8 第二天保羅同我們來到該撒利亞，進了傳福音的腓利家裡。",
          "narration_en": "Acts 21:8 — Paul at Caesarea before going to Jerusalem.",
          "focus": [
              "paul"
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
              "lng": 12.453,
              "lat": 41.902,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元60年",
          "title_zh": "羅馬",
          "title_en": "Rome",
          "narration_zh": "徒28:16 保羅進了羅馬城，放他一人住，另有一個士兵看守；向猶太人證明神的國。",
          "narration_en": "Acts 28:16 — Paul preached the kingdom of God in Rome.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "保羅",
                  "en": "Paul"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "保羅傳福音",
      "title_en": "PAUL'S JOURNEYS",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 36.158,
          "lat": 36.202,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
