/* FALL OF JUDAH · 猶大亡國 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "judah-fall",
      "title_zh": "猶大亡國",
      "title_en": "FALL OF JUDAH",
      "subtitle": "王下25",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 32.77,
          "maxLng": 46.5,
          "minLat": 30.05,
          "maxLat": 34.05,
          "Z": 10
      },
      "startDate": "王下25",
      "introCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "猶大亡國",
          "en": "FALL OF JUDAH · 王下25",
          "narr_zh": "巴比倫王尼布甲尼撒攻破耶路撒冷，焚燒聖殿。",
          "narr_en": "Nebuchadnezzar destroyed Jerusalem and burned the temple."
      },
      "outroCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../jesus/",
          "title_zh": "耶穌生平",
          "title_en": "LIFE OF JESUS"
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
              "name_zh": "拉吉",
              "name_en": "Lachish",
              "type": "fort",
              "lng": 34.848,
              "lat": 31.565,
              "ref": "耶 34:7"
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
              "name_zh": "巴比倫",
              "name_en": "Babylon",
              "type": "city",
              "lng": 44.42,
              "lat": 32.536,
              "ref": "耶 25:9"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "jerusalem",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "耶路撒冷",
          "name_en": "Jerusalem",
          "track": [
              {
                  "d": 1,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 25000,
                  "st": "hold"
              },
              {
                  "d": 90,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 0,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "babylon_army",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "巴比倫軍",
          "name_en": "Babylonian army",
          "track": [
              {
                  "d": 1,
                  "lng": 44.42,
                  "lat": 32.536,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 40,
                  "lng": 34.848,
                  "lat": 31.565,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 80000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 50,
          "b": 100,
          "lng": 35.235,
          "lat": 31.778,
          "kind": "artillery",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "猶大亡國",
          "en": "FALL OF JUDAH"
      }
  ];
  const notes =   {
      "summary": "猶大亡國 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "尼布甲尼撒自巴比倫南下，先攻拉吉（耶34:7），公元前586年攻陷耶路撒冷，焚燒聖殿（王下25:8-9）。",
      "leaders": "西底家、尼布甲尼撒、耶利米。",
      "nationalPower": "聖殿被毀，被擄七十年；新約應許新約與真殿基督。",
      "impact": "以斯拉、尼希米歸回重建。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 44.42,
              "lat": 32.536,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前597年",
          "title_zh": "巴比倫興兵",
          "title_en": "Babylon",
          "narration_zh": "王下24:10 巴比倫王尼布甲尼撒上來攻耶路撒冷。",
          "narration_en": "2 Kgs 24:10 — Nebuchadnezzar came against Jerusalem.",
          "focus": [
              "babylon_army"
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
              "lng": 35.235,
              "lat": 31.778,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前597年",
          "title_zh": "首次被擄",
          "title_en": "First Deportation",
          "narration_zh": "王下24:12 約雅敬王與臣僕向巴比倫王投降，被擄。",
          "narration_en": "2 Kgs 24:12 — Jehoiachin surrendered and was taken to Babylon.",
          "focus": [
              "jerusalem"
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
              "lng": 34.848,
              "lat": 31.565,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前588年",
          "title_zh": "拉吉",
          "title_en": "Lachish",
          "narration_zh": "耶34:7 巴比倫軍隊攻擊猶大一切城邑，拉吉、亞西加已經攻取。",
          "narration_en": "Jer 34:7 — Lachish and Azekah fell to Babylon.",
          "focus": [
              "babylon_army"
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
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前586年",
          "title_zh": "城陷",
          "title_en": "Jerusalem Falls",
          "narration_zh": "王下25:4 城被攻破；西底家眾子被殺，他被剜眼。",
          "narration_en": "2 Kgs 25:4 — The city was broken up; Zedekiah was captured.",
          "focus": [
              "jerusalem"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 82,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前586年",
          "title_zh": "聖殿被焚",
          "title_en": "Temple Burned",
          "narration_zh": "王下25:9 巴比倫王焚燒耶和華的殿與王宮，拆毀耶路撒冷城牆。",
          "narration_en": "2 Kgs 25:9 — They burned the house of the LORD.",
          "focus": [
              "jerusalem"
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
          "day": 100,
          "hold": 8,
          "cam": {
              "lng": 44.42,
              "lat": 32.536,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前586年",
          "title_zh": "被擄巴比倫",
          "title_en": "Exile",
          "narration_zh": "王下25:11 巴比倫王將百姓擄到巴比倫；耶25:11 七十年為期。",
          "narration_en": "2 Kgs 25:11 — The people were carried to Babylon for seventy years.",
          "focus": [
              "babylon_army"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "猶大亡國",
      "title_en": "FALL OF JUDAH",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
