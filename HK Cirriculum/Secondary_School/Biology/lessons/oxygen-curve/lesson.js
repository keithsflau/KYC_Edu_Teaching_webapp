BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "人體生理",
  "title": "氧離曲線",
  "titleEn": "Oxygen dissociation curve",
  "objectives": [
    "說明血紅蛋白的氧離曲線呈 S 形，因為亞基之間有協同性。",
    "說明二氧化碳上升使曲線右移，同一氧分壓下飽和度下降。",
    "把右移理解為組織較易得到氧，而不是血紅蛋白抓得更緊。"
  ],
  "note": "",
  "lead": "先拉動組織二氧化碳，看曲線移動，再選擇正確描述。",
  "kind": "curve",
  "success": "",
  "introCap": "",
  "steps": [],
  "decoys": [],
  "action": "",
  "fields": [],
  "cases": [],
  "fallback": "",
  "slider": {
    "id": "co2",
    "label": "組織二氧化碳",
    "min": 0,
    "max": 100,
    "start": 8
  },
  "shiftFrom": 28,
  "shiftTo": 58,
  "highAt": 60,
  "lowCaption": "二氧化碳仍低：曲線偏左，血紅蛋白較易保持結合。",
  "highCaption": "二氧化碳已高：曲線右移。同一氧分壓下飽和度較低，氧較易放出。",
  "curveLabel": "血紅蛋白氧離曲線",
  "question": "把二氧化碳拉高之後，曲線怎樣改變？",
  "needHigh": "右移這個方向是對的概念，但滑桿還沒拉高。先把二氧化碳拉過高位，看曲線是否右移，再選一次。",
  "choices": [
    {
      "label": "曲線右移，同一氧分壓下飽和度下降，組織較易得到氧",
      "ok": true,
      "why": "正確。這是波爾效應。活躍組織的二氧化碳較高、pH 較低，血紅蛋白對氧的親和力下降，所以把氧放給組織。"
    },
    {
      "label": "曲線左移，血紅蛋白把氧抓得更緊",
      "ok": false,
      "why": "左移代表親和力上升，例如胎兒血紅蛋白相對成人血紅蛋白。高二氧化碳不是這個方向。"
    },
    {
      "label": "曲線變成直線，因為協同性消失",
      "ok": false,
      "why": "S 形來自血紅蛋白四個亞基的協同性。二氧化碳改變曲線的位置，不會把它變成肌紅蛋白那樣的雙曲線。"
    }
  ]
});
