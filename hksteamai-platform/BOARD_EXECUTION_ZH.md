# Board → 執行（隱喻角色，唔係真有人入嚟）

**產品：** hksteamai.com V1 家長訂閱  
**日期：** 2026-07-22

## 開場（CEO）

目標：全球家長可用；本地 7 日 Pro 試用 + Stripe 訂閱收 HKD；免費 demo vs 付費全庫清晰；課題對照世界主流學制；前後台可跑通 soft launch。

## 分工（隱喻）

| 角色 | 負責 | 落地 |
|------|------|------|
| **CEO** | 價錢／試用政策／上架優先 | Free / Basic $98 / Pro $148（月）+ 年費；註冊即 7 日 Pro；見 `GO_LIVE_ZH.md` |
| **CTO** | Stripe、webhook、權益、閘門 | Checkout + Portal + webhooks；`entitlement` = free\|primary\|secondary\|all；`/api/modules/...` 閘門 |
| **CCO** | 免費課目策展、全球 mapping、家長文案 | 15 個 free forever；`curriculum-map.json`（HK/UK/US/IB/SG/AU/**Intl**）；library region switcher |

## 產品決策（凍結）

1. **試用：** 註冊自動 7 日 Pro（唔使卡）；Pro Checkout 亦可帶 `trial_period_days=7`（若本地試用未用完會接剩餘日數）。
2. **免費：** `data/free-demo-catalog.json` 約 15 課，訪客可玩。
3. **Basic：** 小學 **或** 中學全庫（checkout 揀）。
4. **Pro：** 全庫。
5. **Mapping：** 啟發式對照，**唔係**官方認證；Disclaimer 必須顯示。
6. **保護：** 平台內閘門 + 浮水印 + access log；公開 GitHub Pages 仍可能繞過 — 上架前要處理（見 GO_LIVE §1.6）。

## 執行結果

程式庫 `hksteamai-platform/` 已具備端到端 V1 垂直切片。創辦人仲要：填 Stripe keys / Price IDs / webhook、Vercel + DNS + Postgres（生產）。詳見 `GO_LIVE_ZH.md`。
