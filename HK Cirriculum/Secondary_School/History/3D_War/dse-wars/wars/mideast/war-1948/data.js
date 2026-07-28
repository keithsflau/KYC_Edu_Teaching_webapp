/* 1948 WAR · 第一次中東戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-1948",
      "title_zh": "第一次中東戰爭",
      "title_en": "1948 WAR",
      "subtitle": "1948年",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 33.75,
          "maxLng": 36.25,
          "minLat": 30.8,
          "maxLat": 32.8,
          "Z": 10
      },
      "startDate": [
          1948,
          5,
          14
      ],
      "introCam": {
          "lng": 35.21,
          "lat": 31.77,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "第一次中東戰爭",
          "en": "1948 WAR · 1948年",
          "narr_zh": "以色列宣布建國，阿拉伯五國聯軍進攻。",
          "narr_en": "Israel declares independence — five Arab armies attack."
      },
      "outroCam": {
          "lng": 35.21,
          "lat": 31.77,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../six-day/",
          "title_zh": "六日戰爭",
          "title_en": "SIX-DAY WAR 1967"
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
              "name_en": "Tel Aviv",
              "name_zh": "特拉維夫",
              "type": "city",
              "lng": 34.78,
              "lat": 32.09
          },
          {
              "name_en": "Latrun",
              "name_zh": "拉特倫",
              "type": "fort",
              "lng": 34.98,
              "lat": 31.84
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "isr_48",
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
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.21,
                  "lat": 31.77,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ar_48",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "阿拉伯聯軍",
          "name_en": "Arab Armies",
          "track": [
              {
                  "d": 1,
                  "lng": 35.5,
                  "lat": 31.5,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.3,
                  "lat": 31.6,
                  "s": 40000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "arab",
          "from": [
              35.5,
              31.5
          ],
          "to": [
              34.78,
              32.09
          ],
          "label": "聯軍進攻",
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
          "zh": "第一次中東戰爭",
          "en": "1948 WAR"
      }
  ];
  const notes =   {
      "summary": "第一次中東戰爭 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "以色列建國次日，阿拉伯聯軍入侵；以軍在特拉維夫、耶路撒冷等地抵抗，最終停火線劃定。",
      "leaders": "以色列本-古里安宣布建國；阿拉伯聯軍多國進攻。阿拉伯軍事領導分散，以軍在特拉維夫、耶路撒冷等地反擊。戰後大量巴勒斯坦難民與以阿敵對格局奠定，影響中東數十年。",
      "nationalPower": "以色列全民动员與海外猶太支持；阿拉伯國家政治分裂、軍事協調不足。",
      "impact": "第一次中東戰爭確立以色列生存；巴勒斯坦難民問題與以阿敵對開端。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 34.78,
              "lat": 32.09,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年5月14日",
          "title_zh": "以色列建國",
          "title_en": "State of Israel",
          "narration_zh": "本-古里安宣布以色列國成立，美蘇相繼承認。",
          "narration_en": "Ben-Gurion declares independence — US and USSR recognise Israel.",
          "focus": [
              "isr_48"
          ],
          "side": "isr",
          "commanders": [
              {
                  "zh": "本-古里安",
                  "en": "Ben-Gurion"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 35.21,
              "lat": 31.77,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年5月15日",
          "title_zh": "阿拉伯聯軍入侵",
          "title_en": "Arab Invasion",
          "narration_zh": "埃及、約旦、敘利亞等國軍隊分路進攻。",
          "narration_en": "Egypt, Jordan, Syria and others invade from multiple directions.",
          "focus": [
              "ar_48"
          ],
          "side": "arab",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "阿拉伯聯軍 6 萬",
          "forces_en": "60,000 Arab troops"
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.21,
              "lat": 31.77,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年夏",
          "title_zh": "耶路撒冷圍城",
          "title_en": "Siege of Jerusalem",
          "narration_zh": "猶太區遭圍困，補給靠空中走廊。",
          "narration_en": "Jewish districts besieged — supplied by airlift.",
          "focus": [
              "isr_48",
              "ar_48"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 34.78,
              "lat": 32.09,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年秋",
          "title_zh": "以軍反攻",
          "title_en": "Israeli Counter-offensives",
          "narration_zh": "以軍擴張控制區，扭轉初期劣勢。",
          "narration_en": "IDF expands territory — reverses early setbacks.",
          "focus": [
              "isr_48"
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
              "lng": 35,
              "lat": 31.9,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年",
          "title_zh": "停火線",
          "title_en": "Armistice Lines",
          "narration_zh": "各線停火，綠線劃定，難民問題遺留。",
          "narration_en": "Armistice lines drawn — refugee crisis endures.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "第一次中東戰爭",
      "title_en": "1948 WAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 35.21,
          "lat": 31.77,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
