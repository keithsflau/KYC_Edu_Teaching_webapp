# 創辦人點樣用（廣東話）

面向 hksteamai.com V1：**家長訂閱**，全球市場。

---

## 一、試用點樣行

1. 家長去網站撳「開始免費試用」→ 註冊電郵 + 密碼（最少 8 位）。
2. 系統即時開通 **7 日 Pro 試用**（完整 P1–S6／全球標籤課程庫），**唔使先碌卡**。
3. 試用期間頂部有倒數橫額；到期後**軟降級**做 Free：淨係得免費示範，其他課目顯示鎖。
4. 若家長之後訂 Pro，經 Stripe Checkout 亦會有 **7 日 trial**（政策：Pro 有；Basic 無 Stripe trial，建議先用註冊試用再決定）。

Demo 帳戶（`npm run db:seed` 之後）：`parent@example.com` / `demo1234`

---

## 二、訂閱點樣行（Stripe 測試）

1. 入 [Stripe Dashboard](https://dashboard.stripe.com) → 開 **Test mode**。
2. 複製 API keys 入 `hksteamai-platform/.env`（`STRIPE_SECRET_KEY`、`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`）。
3. 跑：`npm run stripe:products` → 將印出嘅 `STRIPE_PRICE_*` 貼入 `.env`。
4. 開 Customer Portal（Dashboard → Settings → Billing → Customer portal）。
5. 另開終端：`stripe listen --forward-to localhost:3000/api/stripe/webhook`，將 `whsec_...` 寫入 `STRIPE_WEBHOOK_SECRET`。
6. `npm run dev` → 登入 → `/pricing` → 揀 Basic／Pro → Checkout。
7. 測試卡：`4242 4242 4242 4242`，任意未來到期日、任意 CVC。
8. 成功後 webhook 會寫入 DB entitlement：`primary` / `secondary` / `all`。帳戶頁可開 **Manage billing**（Portal）。

**Basic：** 小學庫 **或** 中學庫（checkout 時揀）；1 個子女、2 部裝置。  
**Pro：** 全庫；最多 3 個子女、3 部裝置。  
價錢：Basic **$98／月**（$980／年）、Pro **$148／月**（$1280／年），港幣。

---

## 三、邊啲免費、邊啲要訂

- **永久免費示範：** 見 `FREE_DEMO_CATALOG.md` 同 `data/free-demo-catalog.json`（約 14 個，涵蓋幼小至中學數理）。
- **其餘全部：** 要登入 + 有效 entitlement（trial／Basic／Pro）。
- 課程庫可瀏覽標題；未解鎖會顯示鎖同 CTA（soft paywall）。
- 付費 HTML **唔會**用公開靜態路徑直接派；經 `/api/modules/...` 驗權後先送出。

改免費名單：改 JSON → 重啟 app。

---

## 四、全球課程標籤點用

1. 家長喺 `/library` 揀地區：US Grade / UK Key Stage / HK / IB / Singapore / Australia。
2. 同一套 HTML 模組，顯示唔同「年級」標籤方便搵。
3. 資料喺 `data/curriculum-map.json`（`npm run curriculum:generate` 由資料夾結構自動產生）。
4. UI 有免責：呢啲係**對照搜尋**，**唔係**官方認證或等同公開試課程。

---

## 五、後台 Admin

- 種子 admin：`.env` 嘅 `ADMIN_EMAIL` / `ADMIN_PASSWORD`。
- 另有 `ADMIN_SECRET` 保護 `/admin`（視實作）。
- 可睇 users／訂閱、access logs、free catalog feature flag。

---

## 六、正式上線前 TODO

| 項目 | 說明 |
|------|------|
| DNS | hksteamai.com 指去托管（Vercel / Cloudflare） |
| Live Stripe | 換成 `sk_live_`／live Price IDs；正式 webhook endpoint |
| Postgres | 由 SQLite 遷去 Postgres（Turso／Neon／RDS） |
| R2 + Workers | 付費模組搬私人 R2，短時簽名 URL；而家 MVP 係本機／伺服器檔案 + auth gate |
| 電郵驗證 / OAuth | 電郵密碼已有；Google SSO 見 `GO_LIVE_ZH.md` §2（`AUTH_GOOGLE_*`） |
| 裝置指紋強制 | schema 已有 Device；限額 UI 有，執法可再收緊 |
| 唔好當瀏覽器 DRM | 精明用戶仍可截圖／錄影；保護係權限 + 浮水印 + log |

---

有問題先睇 `README.md`、`GO_LIVE_ZH.md`（上架／Google／收錢）、`STRIPE_FLOWS.md`、`CURRICULUM_MAP.md`。
