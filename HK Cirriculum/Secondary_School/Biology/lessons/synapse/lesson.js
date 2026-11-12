BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "人體生理",
  "title": "膽鹼突觸",
  "titleEn": "Cholinergic synapse",
  "objectives": [
    "說明動作電位到達突觸前膜後，鈣離子進入，囊泡釋放乙酰膽鹼。",
    "說明乙酰膽鹼與突觸後膜受體結合，引起去極化。",
    "說明乙酰膽鹼酯酶分解乙酰膽鹼，傳遞方向只能由前到後。"
  ],
  "note": "只描述正常突觸怎樣停止訊號。不涉及任何藥物或毒物的製備。",
  "lead": "按膽鹼突觸傳遞的次序點選。",
  "kind": "sequence",
  "success": "突觸傳遞單向，而且訊號會被酶終止。",
  "introSvg": "<svg viewBox=\"0 0 360 188\" role=\"img\" aria-label=\"膽鹼突觸\"><rect width=\"360\" height=\"188\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"16\" y=\"22\" font-size=\"13\" fill=\"#047857\">膽鹼突觸</text><circle cx=\"28\" cy=\"48\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"53\" font-size=\"15\" fill=\"#0f172a\">鈣離子進入</text><line x1=\"28\" y1=\"62\" x2=\"28\" y2=\"76\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"88\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"93\" font-size=\"15\" fill=\"#0f172a\">釋放乙酰膽鹼</text><line x1=\"28\" y1=\"102\" x2=\"28\" y2=\"116\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"128\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"133\" font-size=\"15\" fill=\"#0f172a\">突觸後膜去極化</text><line x1=\"28\" y1=\"142\" x2=\"28\" y2=\"156\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"168\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"173\" font-size=\"15\" fill=\"#0f172a\">酯酶分解</text></svg>",
  "introCap": "神經遞質只從突觸前膜釋放。",
  "steps": [
    {
      "label": "動作電位到達突觸小體，鈣通道開放，鈣離子進入",
      "detail": "鈣離子進入突觸前膜一側，促使囊泡移向膜。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"突觸前膜\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">突觸前膜</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">動作電位到達</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">Ca2+ 進入突觸小體</text></svg>"
    },
    {
      "label": "囊泡釋放乙酰膽鹼到突觸間隙",
      "detail": "乙酰膽鹼以胞吐離開突觸前細胞。突觸後細胞不釋放這種遞質。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"胞吐\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">胞吐</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">囊泡與突觸前膜融合</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">ACh 進入突觸間隙</text></svg>"
    },
    {
      "label": "乙酰膽鹼結合突觸後膜受體，鈉通道開放，膜去極化",
      "detail": "如果去極化達到閾值，突觸後神經元會產生新的動作電位。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"突觸後膜\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">突觸後膜</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">ACh 結合受體</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">Na+ 進入</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">興奮性突觸後電位</text></svg>"
    },
    {
      "label": "乙酰膽鹼酯酶把乙酰膽鹼分解，避免受體持續被刺激",
      "detail": "分解後訊號結束。產物可以被突觸前細胞再取用。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"終止訊號\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">終止訊號</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">乙酰膽鹼酯酶</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">ACh 被分解</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">受體不再持續開放</text></svg>"
    }
  ],
  "decoys": [
    {
      "label": "乙酰膽鹼由突觸後膜釋放，所以訊號可以反向",
      "why": "不對。囊泡在突觸前膜。遞質只由前膜釋放，所以化學突觸的傳遞是單向的。"
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
