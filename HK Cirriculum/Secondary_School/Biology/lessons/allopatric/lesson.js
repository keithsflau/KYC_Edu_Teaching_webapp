BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "遺傳與進化",
  "title": "異域種化",
  "titleEn": "Allopatric speciation",
  "objectives": [
    "說明異域種化先有地理屏障，令種群之間不能基因交流。",
    "說明兩邊累積不同的遺傳差異後，可以形成生殖隔離。",
    "把地理隔離和同一地點的食物差異分開。"
  ],
  "note": "這是演化模型。屏障和生殖隔離都要用證據描述，不要把未觀察到的結果寫成已經發生。",
  "lead": "選一種情境和後來的交配結果。任務：找出異域種化已經成立的組合。",
  "kind": "match",
  "success": "",
  "introSvg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"異域種化\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">異域種化</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">一個種群被地理屏障分開</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">兩邊各自累積突變和選擇</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">再相遇時不能成功交配</text></svg>",
  "introCap": "關鍵是基因交流先被地理屏障中斷。",
  "steps": [],
  "decoys": [],
  "action": "判斷",
  "fields": [
    {
      "id": "scene",
      "label": "情境",
      "options": [
        {
          "id": "geo",
          "label": "山脈把一個種群分成兩邊，個體不能往來"
        },
        {
          "id": "food",
          "label": "同一山谷裡，有些個體只是偏好不同食物"
        }
      ]
    },
    {
      "id": "mate",
      "label": "後來",
      "options": [
        {
          "id": "no",
          "label": "兩邊再相遇時不能產生可育後代"
        },
        {
          "id": "yes",
          "label": "兩邊仍然可以自由交配並留下可育後代"
        }
      ]
    }
  ],
  "cases": [
    {
      "when": {
        "scene": "geo",
        "mate": "no"
      },
      "ok": true,
      "caption": "地理隔離之後出現生殖隔離",
      "feedback": "正確。異域種化是地理屏障中斷基因交流，兩邊累積差異，最後形成生殖隔離。"
    },
    {
      "when": {
        "scene": "geo",
        "mate": "yes"
      },
      "ok": false,
      "caption": "有屏障，但尚未種化",
      "feedback": "有地理分隔，可是仍能交配並交流基因，種化還沒有完成。"
    },
    {
      "when": {
        "scene": "food",
        "mate": "no"
      },
      "ok": false,
      "caption": "這不是異域種化",
      "feedback": "沒有地理屏障。同一地區出現生殖隔離，不能叫做異域種化。"
    },
    {
      "when": {
        "scene": "food",
        "mate": "yes"
      },
      "ok": false,
      "caption": "尚未分隔成兩個種",
      "feedback": "同一地點、仍可自由交配，只是食物偏好不同，不足以稱為異域種化。"
    }
  ],
  "fallback": "",
  "slider": null,
  "shiftFrom": 0,
  "shiftTo": 0,
  "highAt": 0,
  "lowCaption": "",
  "highCaption": "",
  "curveLabel": "",
  "question": "",
  "needHigh": "",
  "choices": []
});
