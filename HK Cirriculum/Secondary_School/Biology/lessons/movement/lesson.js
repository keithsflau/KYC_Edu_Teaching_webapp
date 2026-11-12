BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "人體生理",
  "title": "關節與拮抗肌",
  "titleEn": "Joints and antagonistic muscles",
  "objectives": [
    "說明骨骼肌只能收縮拉動骨骼，不能推開骨骼。",
    "配對屈曲前臂時收縮的肱二頭肌，以及伸直時收縮的肱三頭肌。",
    "分辨肌腱連接肌肉與骨，韌帶連接骨與骨。"
  ],
  "note": "模型用來理解槓桿，不是運動損傷的診斷。",
  "lead": "選一個動作和正在收縮的肌肉。任務：正確配對屈曲前臂。",
  "kind": "match",
  "success": "",
  "introSvg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"肘關節\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">肘關節</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">屈曲：肱二頭肌收縮</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">伸直：肱三頭肌收縮</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">肌腱連肌與骨，韌帶連骨與骨</text></svg>",
  "introCap": "拮抗肌成對工作，一方收縮時另一方放鬆。",
  "steps": [],
  "decoys": [],
  "action": "配對",
  "fields": [
    {
      "id": "action",
      "label": "動作",
      "options": [
        {
          "id": "flex",
          "label": "屈曲前臂"
        },
        {
          "id": "extend",
          "label": "伸直前臂"
        }
      ]
    },
    {
      "id": "muscle",
      "label": "正在收縮的肌肉",
      "options": [
        {
          "id": "bi",
          "label": "肱二頭肌 biceps"
        },
        {
          "id": "tri",
          "label": "肱三頭肌 triceps"
        }
      ]
    }
  ],
  "cases": [
    {
      "when": {
        "action": "flex",
        "muscle": "bi"
      },
      "ok": true,
      "caption": "屈曲：肱二頭肌是主動肌",
      "feedback": "正確。屈曲前臂時肱二頭肌收縮，肱三頭肌放鬆。肌肉拉動前臂骨，肘關節是支點。肌腱把肌肉連到骨上。"
    },
    {
      "when": {
        "action": "flex",
        "muscle": "tri"
      },
      "ok": false,
      "caption": "屈曲時肱三頭肌不是主動肌",
      "feedback": "屈曲前臂時收縮的是肱二頭肌。肱三頭肌在伸直時才是主動肌。"
    },
    {
      "when": {
        "action": "extend",
        "muscle": "tri"
      },
      "ok": false,
      "caption": "這對伸直是對的，但任務問屈曲",
      "feedback": "伸直前臂時確實是肱三頭肌收縮。本任務要你配對屈曲：選屈曲前臂和肱二頭肌。"
    },
    {
      "when": {
        "action": "extend",
        "muscle": "bi"
      },
      "ok": false,
      "caption": "伸直時不是肱二頭肌發力",
      "feedback": "伸直時肱三頭肌收縮，肱二頭肌放鬆。肌肉不能推開前臂。"
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
