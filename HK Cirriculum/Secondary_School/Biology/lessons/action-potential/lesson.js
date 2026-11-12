BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "人體生理",
  "title": "動作電位",
  "titleEn": "Action potential",
  "objectives": [
    "描述靜息膜電位約為 −70 mV，細胞內相對為負。",
    "說明去極化是鈉離子經電壓閘通道進入，再極化是鉀離子離開。",
    "區分快速的離子通道和較慢的鈉鉀泵。"
  ],
  "note": "",
  "lead": "按一個動作電位的次序點選。",
  "kind": "sequence",
  "success": "鈉入、鉀出的次序正確。泵沒有被誤當成尖峰的原因。",
  "introSvg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"膜電位\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">膜電位</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">靜息約 −70 mV</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">去極化：Na+ 進入</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">再極化：K+ 離開</text></svg>",
  "introCap": "閾值之後才會產生完整的動作電位。",
  "steps": [
    {
      "label": "靜息：膜內約 −70 mV，鈉鉀泵長期維持鈉和鉀的濃度梯度",
      "detail": "泵每次把 3 個鈉運出、2 個鉀運入，需要 ATP。靜息時膜對鉀的透性較高。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"靜息 resting potential\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">靜息 resting potential</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">膜內約 −70 mV</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">Na+ 外多，K+ 內多</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">泵維持梯度，不是尖峰本身</text></svg>"
    },
    {
      "label": "達到閾值：電壓閘鈉通道開放，鈉離子湧入，膜電位變正",
      "detail": "去極化是鈉離子進入，不是泵把鈉泵進來。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"去極化\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">去極化</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">電壓閘鈉通道開放</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">Na+ 流入</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">膜電位升向約 +30 mV</text></svg>"
    },
    {
      "label": "接近尖峰：鈉通道關閉，電壓閘鉀通道開放，鉀離子流出",
      "detail": "鉀離子離開細胞，膜電位回到負值，這是再極化。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"再極化\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">再極化</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">鈉通道關閉</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">K+ 流出</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">膜電位下降</text></svg>"
    },
    {
      "label": "鉀通道稍慢關閉，出現短暫過極化，然後回到靜息",
      "detail": "過多的鉀流出使膜電位比靜息更負，之後回到約 −70 mV。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"回到靜息\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">回到靜息</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">短暫低於 −70 mV</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">泵繼續維持濃度梯度</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">這段時間內較難再次興奮</text></svg>"
    }
  ],
  "decoys": [
    {
      "label": "尖峰是鈉鉀泵把鈉泵入細胞造成的",
      "why": "不對。尖峰是鈉離子經通道湧入。泵把鈉運出細胞，而且速度不足以造成動作電位的尖峰。"
    }
  ],
  "action": "",
  "fields": [],
  "cases": [],
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
