# PhET-Grade Pattern Checklist（Builder / QA 必過項）

> 用途：新開或升級任何 Interactive Lab 之前逐項自檢。靈感取自 PhET 嘅 UX 工藝，
> **但永遠唔好抄佢嘅資產、代碼或像素佈局**（© University of Colorado）。全部自寫自繪。
> 我哋嘅差異化：**TFZ 故事板先行，沙盒押後**（Learn → Explore → Guided → Exam → Review）。

## A. 結構（Screen architecture）
- [ ] 一屏一個教學焦點；主控件 ≤ 8 個，進階嘢收摺疊面板（Advanced）
- [ ] 大主題分屏（如「粒子屏 / 圖像屏 / 遊戲屏」），tab label 雙語（繁中 + English）
- [ ] TFZ 順序唔變：沙盒（Explore）排 Learn A1–A8 **之後**；唔准一入嚟就考

## B. 時間控制（Time controls）
- [ ] ▶ 播放 / ⏸ 暫停 常駐
- [ ] ⏭ 步進：暫停時逐格推進（檢查碰撞/滴落一瞬）
- [ ] 慢鏡 checkbox（0.25–0.35×）
- [ ] ↺ 重設 Reset 喺控制列最右，一鍵還原全部預設參數

## C. 參數面板（Inquiry controls）
- [ ] 每個 slider 有**數值 + 單位**（K、dm³、kPa、V、A、Ω、mol dm⁻³、cm³）
- [ ] 改任何參數，**同一幀**見到後果（唔准要㩒「Apply」）
- [ ] 「保持不變 Hold constant」類 radio：只有一個生效，其餘控件即時反映約束

## D. 量度工具（Measurement overlays）
- [ ] 錶、尺、速率棒、計數器全部係 checkbox 開關層，預設開最少
- [ ] 「顯示數值 Show values」toggle：定性先行，數值後補

## E. 連動表徵（Linked representations）
- [ ] 至少兩種表徵同幀更新：粒子 canvas + 棒圖/曲線 + 數值讀數
- [ ] 切換視圖唔重置實驗狀態（Macro ↔ Micro、Lifelike ↔ Schematic）

## F. 迷思友善（Misconception-safe）
- [ ] 容許「錯」操作（開關斷開、加過量反應物、體積壓到最細），後果即時可見、零懲罰
- [ ] 關鍵對比一句講明（例：Q < Kc → 淨正向；開關斷開 → I = 0）

## G. 真實感 + 情境（Feel scientific）
- [ ] 物料/情境用真實例子（咖啡 vs 通渠劑、單車泵、港燈 220 V）
- [ ] 物理量行為啱數量級；單位跟 DSE 習慣
- [ ] 視覺反饋即時：燈泡會著、顏色會變、讀數會跳

## H. 雙語 + 無障礙 + 流動
- [ ] 所有控件 label 繁中 + English；按鈕 ≥ 44px 觸控目標
- [ ] Canvas 出現嘅關鍵讀數，DOM 都有文字版（a11y + 家長報告）
- [ ] iPad / 手機寬度可用（canvas width:100%，touch-action 處理）

## I. 商務 + 測考引擎（PhET 冇嘅，我哋必須有）
- [ ] subscribe-gate 唔擋 TFZ 核心；免費額度提示唔阻探索
- [ ] Exam tab 出 DSE 式题目（Lv3–4，有 hint，wrong-book 記錄）
- [ ] recordSession / recordDrill 接軌 parent-report

## J. 版權紅線（Legal）
- [ ] 零 PhET 檔案入庫（冇 png/mp3/js/iframe hotlink）
- [ ] 冇照抄佈局像素；我哋用自己設計語言（rounded cards、IBM Plex Sans、accent 色）
- [ ] 如引用 PhET 作教法參考，只喺內部文件註明，產品內唔提佢個名
