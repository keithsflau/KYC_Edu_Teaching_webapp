# HK STEAM AI 工具與競爭力策略劇本 (Tool Strengths Playbook)

> **更新日期**：2026-07-28
> **目標讀者**：董事會、產品經理、開發團隊
> **核心宗旨**：綜合全球及本地競爭對手審計（Sayo.ai, MagicSchool, PhET, Brilliant 等），確立我哋嘅白區（White Space）與技術護城河。

---

## 1. 競爭格局與我哋嘅白區 (The White Space)

目前教育科技市場兩極化：
- **亞洲紅海（Sayo.ai, Snapask 等）**：高度適配本地考試，但產品多停留在「刷題（Drill）」、「影片補習」或「純文字/對話 AI（Chatbot）」。
- **全球虛擬實驗室（PhET, Labster 等）**：擁有頂尖互動模擬技術，但缺乏對香港 DSE 學制適配，且多為 B2B 學校採購，無家長訂閱價值鏈。

👉 **我哋嘅白區**：「**高互動視覺化 ✕ 本地學制適配 ✕ B2C 家長訂閱**」。
我哋唔同 Sayo 拼題庫數量，唔同 MagicSchool 拼「89 個教師文字工具」，而係專注於利用 A1-A8 教學鷹架（TFZ）同動態實驗，壟斷家長對「概念理解（Conceptual Mastery）」嘅付費意願。

---

## 2. 核心 UX 與教學法模式 (The Playbook Patterns)

### 2.1 PhET-grade 探索控制 (Inquiry Controls)
PhET 證明咗「可探索嘅視覺沙盒」係科學理解嘅最佳載體。我哋要吸收其 UX 精華，但加入 DSE 考試引擎：
- **時間控制永遠在場**：播放（Play）、暫停（Pause）、步進（Step）、慢鏡（Slow-mo），以及右下角嘅「重設（Reset）」按鈕。
- **連動表徵（Linked Representations）**：宏觀（燒杯）↔ 微觀（粒子）↔ 圖表（曲線）↔ 數值同步切換。改一樣，全部齊變。
- **定性先行，數值後補**：預設隱藏複雜數據，讓學生先感受物理/化學變化，再透過 Checkbox 開啟量度工具（如壓強計、尺）。
- **迷思友善沙盒**：容許錯誤操作（如斷開電路），後果即時可見，無死路。

### 2.2 Brilliant-style 微型關卡 (Micro-gates)
- **Play Until It Clicks**：避免長篇大論嘅影片。A1-A8 每個 TFZ 步驟都必須要求學生互動（例如：拖動溫度滑桿睇 Le Chatelier 偏移）後先可以進入下一步。
- 概念拆解成 Bite-sized，即時視覺回饋。

### 2.3 Sayo 實戰模擬 + 我哋嘅 TFZ 楔子 (Our TFZ Wedge)
- **Sayo 嘅強項**：佢哋嘅 Chem/Phys 平台擁有真實狀態嘅模擬器（如滴定曲線），唔係簡單 chatbot。
- **我哋嘅反擊（Wedge）**：**TFZ 故事板（A1-A8）先行**。Sayo 只有沙盒，缺乏引導；我哋嘅順序係 Learn → Explore → Guided → Exam。我哋喺沙盒前加入清晰嘅教學鷹架，確保學生真係明。
- **Bio 空殼攻擊**：Sayo 嘅生物科係 Vaporware，我哋要用 3D 酶鎖匙等旗艦 App 迅速佔領。

### 2.4 MagicSchool 表單 UX (僅限未來教師端)
- MagicSchool 係「最強通用 LLM 公文生成器」，但輸出全為文字，無互動模擬，且 DSE 數值答案不可信。
- **可借鑑嘅 UX 工藝**：統一嘅表單語法（年級 + 目標 + 條件）、"Show exemplar"（一鍵填入範例）、Prompt 透明度、以及輸出至 Google Docs/Word 嘅能力。
- **防禦底線**：絕不進入「淺層文字工具」紅海。任何 AI 生成嘅 DSE 數值題目必須經過機器驗證（Deterministic solver），不能單靠 LLM。

### 2.5 JS Stack 視覺包裝 (MediaPipe / Three.js / p5.js)
我哋已經有強大嘅隱形王牌，策略係 **Incremental 加入庫，而非重寫**：
- **Three.js**：用於「空間概念本身係 3D」嘅課題（如太陽系、3D 滴定玻璃儀器、酶 3D docking）。
- **MediaPipe Hands**：用於「手勢/姿勢即係學習對象」嘅場景（如揮手控制太陽系），必須有 Slider Fallback 以應對 iPad 無鏡頭情況。
- **p5.js + p5.sound**：用於聲波示波器等需要即時音訊/視覺化嘅 STEAM 展示。
- **Matter.js**：用於碰撞、拋體等真實物理模擬。

---

## 3. 產品升級實踐 (App Upgrades Executed)

基於以上 Playbook，我哋已經為以下 4 個現有 App 進行咗核心體驗升級（無抄襲任何 PhET/Sayo 資產，並嚴格保護 Kc A1-A8 TFZ 流程）：

1. **3D 太陽系 (3D Solar System)**
   - **升級**：加入 PhET-grade 時間控制（Play, Pause, Step, Reset）。
   - **效果**：家長可隨時暫停行星公轉，逐格觀察軌道位置，或一鍵重設初始狀態，完美配合手勢與滑桿雙模式。
2. **聲波示波器 (Sound Waves Oscilloscope)**
   - **升級**：為模擬模式（Sim Mode）加入 Play, Pause, Reset 控制。
   - **效果**：學生可凍結波形進行觀察，增強定性與定量分析能力。
3. **三角函數圖像 (Trig Graphs)**
   - **升級**：加入自動播放（Auto-animate θ）功能，配備 Play, Pause, Reset。
   - **效果**：學生可睇住單位圓上嘅點自動旋轉，並同步畫出 sin/cos 波浪，完美展現 Linked Representations（連動表徵）。
4. **拋體運動 (Projectile Motion)**
   - **升級**：於沙盒中加入 Play, Pause, Step, Slow-mo (慢鏡), Reset 控制。
   - **效果**：學生可利用慢鏡或步進功能，精確觀察拋體喺最高點時 $v_y = 0$ 但 $v_x \neq 0$ 嘅瞬間，直擊 DSE 常考迷思。

> **總結**：我哋嘅護城河在於「玩得嚟又考得到」。用 PhET 嘅沙盒工藝，裝上我哋嘅 TFZ 故事板、DSE 考試引擎同家長報告，創造出市場上獨一無二嘅價值。

---

## 4. 下一步升級積壓清單 (Next 10 Backlog)

我哋未來 90 日內將按優次為以下 10 個 App 注入 Playbook 嘅成功模式：

1. **滴定曲線 (Titration Curve, F6 Chem)**
   - **加入模式**：Sayo 實戰對撼 + Three.js 玻璃儀器 + 連動表徵 (pH vs Volume)。
2. **化學碰撞理論 (Collision Theory, F5 Chem)**
   - **加入模式**：Matter.js 剛體碰撞引擎 + 慢鏡 / 步進功能 (PhET 模式)。
3. **電路建構器 (Circuit Builder, F5 Phys)**
   - **加入模式**：定性先行 (唔開 Value 先) + 迷思友善 (斷路即熄) + 雙視圖切換 (實物/符號)。
4. **酶動力學 3D (Enzyme Kinetics, F5 Bio)**
   - **加入模式**：Three.js 3D Docking + Brilliant-style predict-reveal (預測變性後果)。攻克 Sayo Bio 弱點。
5. **氣體定律 (Gas Laws, F4 Phys)**
   - **加入模式**：工具圖層 (Checkbox 開關壓強計/溫度計) + 連動表徵 (p-V 圖)。
6. **動量與碰撞 (Momentum Collisions, F5 Phys)**
   - **加入模式**：Matter.js 真實碰撞 + Play/Pause/Step + 預測碰後速度 (Brilliant micro-gates)。
7. **生態食物網 (Ecology Food Web, F5 Bio)**
   - **加入模式**：D3.js 力導向圖 (Force layout) + 沙盒互動 (移除物種睇連動影響)。
8. **微積分第一原理 (First Principles, M2 Math)**
   - **加入模式**：p5.js 割線變切線極限動畫 + Auto-animate 自動播放。
9. **光合作用飽和圖 (Photosynthesis, F4 Bio)**
   - **加入模式**：Chart.js 即時描點 + 滑桿控制光強 (Play Until It Clicks)。
10. **坐標移動闖關 (Coordinates Move, P6 Math)**
    - **加入模式**：Phaser.js 遊戲化關卡 + 拖曳式預測 (Predict where it goes)。