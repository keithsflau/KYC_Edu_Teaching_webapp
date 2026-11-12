/* SIX-DAY WAR · 六日戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-sixday",
      "title_zh": "六日戰爭",
      "title_en": "SIX-DAY WAR",
      "subtitle": "1967年6月",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 31.6,
          "maxLng": 36.4,
          "minLat": 29.15,
          "maxLat": 33.45,
          "Z": 8
      },
      "startDate": [
          1967,
          6,
          5
      ],
      "introCam": {
          "lng": 34.5,
          "lat": 31.5,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "六日戰爭",
          "en": "SIX-DAY WAR · 1967年6月",
          "narr_zh": "以色列六日內擊敗埃及、敘利亞、約旦。",
          "narr_en": "Israel defeats Egypt, Syria and Jordan in six days."
      },
      "outroCam": {
          "lng": 34.5,
          "lat": 31.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../yom-kippur/",
          "title_zh": "贖罪日戰爭",
          "title_en": "YOM KIPPUR 1973"
      }
  };
  const factions = {
    "arab": {
      main: 0x2e6b2e, glow: 0x4caf50, dim: 0x1a401a,
      css: "#2e6b2e", label_zh: "阿拉伯聯軍", label_en: "Arab Coalition",
      emblem: "circle", maxStrength: 80000, textLight: "#d4ecd4"
    },
    "isr": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "以色列", label_en: "Israel",
      emblem: "shield", maxStrength: 70000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Jerusalem",
              "name_zh": "耶路撒冷",
              "type": "city",
              "lng": 35.21,
              "lat": 31.77
          },
          {
              "name_en": "Golan Heights",
              "name_zh": "戈蘭高地",
              "type": "fort",
              "lng": 35.75,
              "lat": 33.05
          },
          {
              "name_en": "Sinai",
              "name_zh": "西奈半島",
              "type": "region",
              "lng": 33.5,
              "lat": 29.5
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "isr_67",
          "faction": "isr",
          "kind": "infantry",
          "crest": "trident",
          "cf": true,
          "name_zh": "以色列國防軍",
          "name_en": "IDF",
          "track": [
              {
                  "d": 1,
                  "lng": 34.78,
                  "lat": 32.09,
                  "s": 50000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 35.75,
                  "lat": 33.05,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 33.5,
                  "lat": 29.5,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ar_67",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "埃及敘利亞聯軍",
          "name_en": "Egyptian-Syrian Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 33,
                  "lat": 30,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 32,
                  "lat": 30.5,
                  "s": 30000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "isr",
          "from": [
              34.78,
              32.09
          ],
          "to": [
              35.75,
              33.05
          ],
          "label": "攻占戈蘭",
          "kind": "attack"
      },
      {
          "d": 40,
          "f": "isr",
          "from": [
              34.5,
              31.5
          ],
          "to": [
              33.5,
              29.5
          ],
          "label": "西奈攻勢",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "六日戰爭",
          "en": "SIX-DAY WAR"
      }
  ];
  const notes =   {
      "summary": "六日戰爭 — 課題地圖。兵力與路線為示意。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1967年6月以色列先發制人，空軍摧毀阿拉伯機場；六日內占領西奈、戈蘭、約旦河西岸與東耶路撒冷。",
      "leaders": "以色列戴揚發動先發制人空襲，摧毀埃及等國空軍。納賽爾威信重創；以色列占領西奈、戈蘭、約旦河西岸。阿拉伯民族主義受挫，巴勒斯坦問題與定居點爭議長期化。",
      "nationalPower": "以色列情報與空軍精銳；阿拉伯國家疏於備戰、指揮混亂。",
      "impact": "以色列大幅擴張；巴勒斯坦占領問題、定居點與以阿關係長期惡化。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 34.78,
              "lat": 32.09,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1967年6月5日",
          "title_zh": "聚焦行動",
          "title_en": "Operation Focus",
          "narration_zh": "以軍空軍發動「聚焦行動」（Operation Focus），先發制人摧毀埃及等國機場上的戰機。",
          "narration_en": "Operation Focus: the Israeli Air Force destroys Arab aircraft on the ground.",
          "focus": [
              "isr_67"
          ],
          "side": "isr",
          "commanders": [
              {
                  "zh": "戴揚",
                  "en": "Dayan"
              }
          ],
          "assets": [
              "air"
          ],
          "forces_zh": "以軍空軍 200+ 架",
          "forces_en": "200+ Israeli aircraft"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 33,
              "lat": 30,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1967年6月5–6日",
          "title_zh": "西奈進攻",
          "title_en": "Sinai Offensive",
          "narration_zh": "以軍坦克突破埃及防線，向蘇伊士運河推進。",
          "narration_en": "Israeli armour breaks through toward the Suez Canal.",
          "focus": [
              "isr_67",
              "ar_67"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.21,
              "lat": 31.77,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1967年6月7日",
          "title_zh": "耶路撒冷與西岸",
          "title_en": "Jerusalem & West Bank",
          "narration_zh": "約旦戰線在6月7日見分曉，以軍進入耶路撒冷舊城。",
          "narration_en": "The Jordanian front is decided on 7 June, when Israeli troops enter the Old City.",
          "focus": [
              "isr_67"
          ],
          "side": "isr",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 35.75,
              "lat": 33.05,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1967年6月9–10日",
          "title_zh": "戈蘭高地",
          "title_en": "Golan Heights",
          "narration_zh": "戈蘭攻勢在6月9日開始，6月10日這一線的戰鬥結束。",
          "narration_en": "The Golan offensive begins on 9 June and that front is decided on 10 June.",
          "focus": [
              "isr_67"
          ],
          "side": "isr",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 34.78,
              "lat": 32.09,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1967年6月10日",
          "title_zh": "六日戰爭結束",
          "title_en": "War Ends in Six Days",
          "narration_zh": "以色列大獲全勝，版圖劇變。",
          "narration_en": "Israel wins decisively — borders transformed.",
          "focus": [],
          "side": "isr",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
    const sourceTask = {
    "cite": "以色列參謀本部對1967年6月5日空襲的行動名稱",
    "excerpt": "行動的英文名稱是 Operation Focus，希伯來語意指集中打擊機場上的飛機。",
    "ask": "這個名稱應當怎樣理解？",
    "options": [
      {
        "t": "焦土政策，把西奈的土地燒光。",
        "ok": false,
        "why": "Focus 指集中打擊停在地面的空軍，不是焦土。"
      },
      {
        "t": "先發制人的空中打擊，目標是阿拉伯國家的機場。",
        "ok": true,
        "why": "空襲在6月5日。戈蘭攻勢是6月9日至10日，耶路撒冷舊城是6月7日。"
      },
      {
        "t": "6月7日進攻戈蘭的地面作戰。",
        "ok": false,
        "why": "6月7日以軍進入耶路撒冷舊城。戈蘭是6月9日才開始。"
      }
    ]
  };
const outro =   {
      "title_zh": "六日戰爭",
      "title_en": "SIX-DAY WAR",
      "narration_zh": "聚焦行動在6月5日。耶路撒冷舊城在6月7日。戈蘭攻勢是6月9日至10日。",
      "narration_en": "Operation Focus was 5 June. The Old City fell on 7 June. The Golan offensive was 9–10 June.",
      "cam": {
          "lng": 34.5,
          "lat": 31.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
