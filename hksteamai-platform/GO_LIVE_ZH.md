# 上架、Google 登入、收錢（粵語創辦人指南）

面向 **hksteamai.com** V1。對應程式庫：`hksteamai-platform/`（Next.js 15 + Auth.js + Prisma + Stripe）。

相關文件：[README.md](./README.md) · [BOARD_EXECUTION_ZH.md](./BOARD_EXECUTION_ZH.md) · [FOUNDERS_GUIDE_ZH.md](./FOUNDERS_GUIDE_ZH.md) · [STRIPE_FLOWS.md](./STRIPE_FLOWS.md) · [PROTECTION_STATUS_YUE.md](./PROTECTION_STATUS_YUE.md)

---

## 0. 產品決策一覽（V1 已凍結）

| 項目 | 決定 |
|------|------|
| 價錢（HKD） | Free · Basic **$98／月** / **$980／年** · Pro **$148／月** / **$1280／年** |
| 試用 | 註冊即 **7 日 Pro**（唔使卡）；Pro Checkout 亦可帶 Stripe `trial_period_days=7` |
| 免費內容 | `data/free-demo-catalog.json` **15** 課，訪客可玩 |
| Basic | 小學 **或** 中學全庫（checkout 揀 `libraryChoice`） |
| Pro / trial | 全庫 `entitlement=all` |
| 學制對照 | HK / UK KS / US Grade / IB / SG / AU / **International·Other**（啟發式，非官方認證） |
| 閘門 | `/api/modules/...` 驗登入＋權益；付費 HTML 唔應再靠公開 Pages 全庫公開 |

執行隱喻會議記錄：[BOARD_EXECUTION_ZH.md](./BOARD_EXECUTION_ZH.md)。

---

## 跟住做：五個階段（建議順序）

| 階段 | 目標 | 你要手動做咩 |
|------|------|--------------|
| **0 本機可跑** | 免費 demo + 註冊／試用（唔使 Stripe） | 開 `http://localhost:3000`；登入 demo 帳戶 |
| **1 Stripe Test** | `/pricing` Checkout 用測試卡 | Dashboard 抄 `sk_test_` / `pk_test_` → `.env` → `npm run stripe:products` |
| **2 Postgres** | 生產 DB（Vercel 唔可以靠 SQLite 檔） | Neon／Supabase 開庫 → 改 provider → `DATABASE_URL` |
| **3 Deploy + DNS** | `hksteamai.com` 上線 | Vercel import + Squarespace DNS 改 A／CNAME |
| **4 保護** | 停公開 Pages 洩漏付費 HTML | 停發佈 `Primary_School/`／`Secondary_School/` 或搬私人 R2 |

**本機捷徑（Windows PowerShell）：**

```powershell
cd hksteamai-platform
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

開 [http://localhost:3000](http://localhost:3000) · Demo：`parent@example.com` / `demo1234`

> Stripe／Google／DNS 密鑰我哋**唔可以代你填**；填完之後喺 chat 講「搞掂」就可以繼續下一階段。

---

## 1. 上架路線圖（V1 建議）

### 1.1 托管：用 Vercel（首選）

呢個專案係 **Next.js App Router**，同 **Vercel** 最啱（一鍵 deploy、自動 HTTPS、環境變數 UI）。

> Cloudflare Pages / Workers 亦可以跑 Next，但要額外設定；V1 建議先用 Vercel，少踩坑。

**步驟：**

1. 去 [vercel.com](https://vercel.com) 用 GitHub 登入，**Import** 呢個 repo（或只 import `hksteamai-platform` 做 monorepo root）。
2. **Root Directory** 設做 `hksteamai-platform`（如果成個 Profile repo 一齊）。
3. Framework：Next.js（自動偵測）。Build：`npm run build`；Install：`npm install`。
4. 先填環境變數（見下方 checklist），再 Deploy。
5. Deploy 成功後會有 `*.vercel.app` 預覽網址 — 用嚟 soft launch。

### 1.2 網域 DNS：`hksteamai.com`

1. Vercel 專案 → **Settings → Domains** → 加 `hksteamai.com` 同 `www.hksteamai.com`。
2. 喺你嘅 DNS 供應商（Cloudflare / GoDaddy / Namecheap 等）跟 Vercel 指示加記錄，通常係：

| 類型 | 名稱 | 值 |
|------|------|-----|
| A | `@` | `76.76.21.21`（以 Vercel 畫面為準） |
| CNAME | `www` | `cname.vercel-dns.com` |

3. 如果 DNS 喺 Cloudflare：Proxy 可開橙色雲；SSL 用 Full。
4. 等 DNS 生效後，設環境變數：

```env
AUTH_URL="https://hksteamai.com"
NEXTAUTH_URL="https://hksteamai.com"
NEXT_PUBLIC_SITE_URL="https://hksteamai.com"
```

然後喺 Vercel **Redeploy**。


### 1.2.1 域名係 Google 申請 → 而家 DNS 喺邊

**結論（公開查詢，2026-07）：** `hksteamai.com` 而家嘅 **註冊商（registrar）係 Squarespace Domains II LLC**，唔再係舊嘅 Google Domains 獨立後台。

| 查到嘅公開資料 | 值 |
|----------------|-----|
| Registrar | **Squarespace Domains II LLC** |
| Nameserver（NS） | `ns-cloud-e1`～`e4.googledomains.com`（Google Domains 舊 NS 名稱，而家由 Squarespace 管） |
| `@` A 記錄 | `198.49.23.x` / `198.185.159.x`（Squarespace） |
| `www` | CNAME → `ext-sq.squarespace.com` |

Google Domains 已賣畀 **Squarespace**；多數舊客已遷移去 **Squarespace Domains**。所以你「喺 Google 申請」嘅域名，**改 DNS 要去 Squarespace**，唔係去 Google Cloud / 普通 Gmail 設定頁。

#### 去邊度登入

1. 開 [https://domains.squarespace.com](https://domains.squarespace.com)（或 [https://account.squarespace.com](https://account.squarespace.com)）。
2. 用 **當時登記域名嗰個 Google 帳戶** 登入（Squarespace 多數支援 Continue with Google／遷移後會 redirect）。
3. 若唔記得：去 [https://domains.google.com](https://domains.google.com) — 多數會提示已遷移並帶你去 Squarespace。
4. 登入後應該見到 `hksteamai.com`。

#### 點入 DNS 設定頁（逐步）

1. Squarespace Domains 面板揀 **`hksteamai.com`**。
2. 入 **DNS** / **DNS Settings** / **Manage DNS**（介面用字或會係「網域設定 → DNS」）。
3. 睇 **Custom records**／自訂記錄（唔好亂改 Nameservers，除非你刻意轉去 Cloudflare）。
4. 而家網站仍指去 Squarespace「Coming Soon」——接 Vercel 前要改以下記錄。

#### 接到 Vercel 要改咩（同 §1.2）

先喺 Vercel 專案 **Settings → Domains** 加入 `hksteamai.com` 同 `www.hksteamai.com`，跟住喺 Squarespace DNS：

| 類型 | 主機／名稱 | 值 | 備註 |
|------|------------|-----|------|
| A | `@`（或空白／根域名） | `76.76.21.21` | 以 Vercel Domains 頁顯示為準 |
| CNAME | `www` | `cname.vercel-dns.com` | |

- 刪除或停用而家指去 Squarespace 嘅舊 A（`198.49…` / `198.185…`）同 `www` → `ext-sq.squarespace.com`，避免同 Vercel 衝突。
- 儲存後等 DNS 傳播（幾分鐘至數小時）；Vercel Domains 頁顯示 **Valid** 即可。
- 之後設 `AUTH_URL` / `NEXTAUTH_URL` / `NEXT_PUBLIC_SITE_URL` = `https://hksteamai.com` 再 Redeploy。

> 我哋**冇你嘅 Squarespace／Google 登入**，唔可以代你改 live DNS；要你自己喺上面面板改。

### 1.2.2 Stripe「公开详情／Public details」Website URL

Stripe 開戶要填真實公司網站（唔可以係 Squarespace Coming Soon）。

| 項目 | 建議 |
|------|------|
| Website URL | 優先填 **`https://www.hksteamai.com`**（DNS 生效後）；未指域名前可用暫用網址 **`https://hksteamai.vercel.app`**（靜態公司頁，已 deploy） |
| 頁面要有 | 品牌名、賣咩（訂閱 STEM／教育 SaaS）、價錢或產品說明、聯絡電郵、私隱／條款連結 |

靜態公司頁原始碼：`marketing-site/`（Vercel 專案 `hksteamai`）。完整 Next 平台之後可再替換同一域名。

### 1.3 環境變數 checklist（生產）

喺 Vercel → Settings → Environment Variables 填（**唔好** commit 入 git）：

| 變數 | 用途 |
|------|------|
| `DATABASE_URL` | **Postgres** 連線字串（見 1.4） |
| `AUTH_SECRET` | Auth.js session（`openssl rand -base64 32`） |
| `AUTH_URL` / `NEXTAUTH_URL` | `https://hksteamai.com` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | 可選；Google SSO（見第 2 節） |
| `STRIPE_SECRET_KEY` | Live：`sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Live：`pk_live_...` |
| `STRIPE_PRICE_BASIC_MONTHLY` 等四個 | Live Price ID（`npm run stripe:products` 喺 **live** key 下跑） |
| `STRIPE_WEBHOOK_SECRET` | Dashboard 正式 webhook 嘅 `whsec_...` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | 種子／首個 admin |
| `ADMIN_SECRET` | `/admin` 後台閘 |
| `TRIAL_DAYS` | 預設 `7` |
| `MODULES_ROOT` | 伺服器上課程 HTML 根目錄（見內容保護） |
| `MODULE_SIGNING_SECRET` | 可選；唔填會用 `AUTH_SECRET` |
| `NEXT_PUBLIC_SITE_NAME` | 例如 `HK Steam AI` |
| `NEXT_PUBLIC_SITE_URL` | `https://hksteamai.com` |

模板：`.env.example`。

### 1.4 SQLite → Postgres（生產必須）

**點解：** SQLite（而家 `prisma/schema.prisma` 嘅 `provider = "sqlite"` + `src/lib/db.ts` 用 `better-sqlite3`）適合本機 MVP。Vercel 係無狀態 serverless — **唔適合**寫入本地 `file:./dev.db`。要用 managed Postgres（**Neon** 或 **Supabase** 免費層就夠 V1）。

**步驟（概要）：**

1. 喺 [Neon](https://neon.tech) 或 [Supabase](https://supabase.com) 開一個專案，複製 **connection string**（建議用 pooled / serverless URL）。
2. 改 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"
}
```

3. 改 `src/lib/db.ts`：唔再用 `PrismaBetterSqlite3`；改用 Prisma 官方 Postgres adapter（例如 `@prisma/adapter-pg` + `pg`），或者跟 Prisma 7 文件用對應 adapter。`DATABASE_URL` 指去 Neon/Supabase。
4. 本地：

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. Vercel 設 `DATABASE_URL`，redeploy。首次可用 Vercel build 前 hook 或手動跑一次 `db push`／migration。

> 細節以 Prisma 7 + 你揀嘅 adapter 文件為準；本機繼續用 SQLite 開發、生產用 Postgres 係常見做法。

### 1.5 Stripe 轉 Live mode

1. [Stripe Dashboard](https://dashboard.stripe.com) → 關掉 **Test mode**（切去 Live）。
2. **Developers → API keys** → 複製 `sk_live_` / `pk_live_` 入 Vercel env。
3. 本地臨時用 live key（小心！）跑：

```bash
# .env 暫時用 sk_live_...
npm run stripe:products
```

將印出嘅 `STRIPE_PRICE_*` 貼入 Vercel（**唔好**同 test price 混用）。
4. Dashboard → **Developers → Webhooks** → Add endpoint：

   - URL：`https://hksteamai.com/api/stripe/webhook`
   - 事件最少：`checkout.session.completed`、`customer.subscription.created`、`customer.subscription.updated`、`customer.subscription.deleted`、`invoice.paid`、`invoice.payment_failed`（同 `src/app/api/stripe/webhook/route.ts` 處理嘅一致）
   - 複製 **Signing secret** → `STRIPE_WEBHOOK_SECRET`

5. **Settings → Billing → Customer portal** → 開啟（取消／改卡／發票）。
6. Redeploy 後用真卡（細額）自測一次 Checkout → `/account` 權益更新。

價錢（已寫喺 `scripts/create-stripe-products.mjs`）：Basic **HK$98／月**、**HK$980／年**；Pro **HK$148／月**、**HK$1280／年**。

### 1.6 內容保護（上架前必睇）

平台閘門（`/api/modules/...`）喺 **Next.js 入面**會驗登入＋權益。但父 repo（Profile）若仍然用 **公開 GitHub Pages** 放晒 `Primary_School/`、`Secondary_School/` 嘅 `index.html`，識 URL 嘅人可以**繞過**訂閱直接開。

**V1 soft launch 最低要求：**

- [ ] 唔好對外宣稱「付費內容完全獨佔」，除非已處理下面其中一項
- [ ] **建議：** 停止喺公開 Pages 發佈付費資料夾；免費 demo 可以繼續公開（見 `data/free-demo-catalog.json`）
- [ ] **之後：** 付費 HTML 搬私人 R2，經 Workers／平台簽過名先出（見 `PROTECTION_STATUS_YUE.md`）

誠實限度：唔係瀏覽器 DRM；係權限 + 浮水印 + access log。

### 1.7 Soft launch checklist（一頁）

- [ ] Vercel deploy 成功；`https://hksteamai.com` 開到 `/`
- [ ] `AUTH_URL` / `NEXT_PUBLIC_SITE_URL` 係正式網域
- [ ] Postgres 已接；註冊／登入正常
- [ ] Stripe **Live** keys + 四個 `STRIPE_PRICE_*` + webhook 正常
- [ ] Customer Portal 開咗；`/account` → Manage billing 得
- [ ] 註冊 → 7 日 Pro trial；到期後淨係得 free demos
- [ ] `/pricing` Checkout → webhook → entitlement（Basic `primary`/`secondary` 或 Pro `all`）
- [ ] 訪客可玩 free demo；未付費課目有 soft paywall
- [ ] `/admin` + `ADMIN_SECRET` 得
- [ ] 付費 HTML **唔**再靠公開 Pages 全庫公開（或已標明風險）
- [ ] （可選）Google SSO 按鈕出現喺 `/login`
- [ ] 用 2–3 個真家長試用；睇 Stripe Dashboard 有冇成功付款

---

## 2. Google SSO — 可以，點開

**答案：可以。** 程式已用 Auth.js（`next-auth` v5）；只要喺 Google Cloud 開 OAuth client，再填 env，`/login` 就會出「使用 Google 繼續」。

相關程式：

- `src/lib/auth.ts` — Google provider（有 `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` 先啟用）
- `src/app/login/page.tsx` + `src/components/LoginForm.tsx` — 按鈕
- `prisma/schema.prisma` — `passwordHash` 可空（純 Google 帳戶）

### 2.1 Google Cloud Console

1. 去 [Google Cloud Console](https://console.cloud.google.com/) → 開／揀一個專案。
2. **APIs & Services → OAuth consent screen**：
   - User type：External（個人／細公司）
   - App name：HK Steam AI；支援電郵填你嘅
   - 測試階段可以加 Test users（你自己嘅 Gmail）
3. **Credentials → Create credentials → OAuth client ID**：
   - Application type：**Web application**
   - Name：`hksteamai-web`
4. **Authorized JavaScript origins：**

   - `http://localhost:3000`
   - `https://hksteamai.com`
   - （如有）`https://www.hksteamai.com`、Vercel 預覽網址

5. **Authorized redirect URIs**（Auth.js 固定路徑）：

   - `http://localhost:3000/api/auth/callback/google`
   - `https://hksteamai.com/api/auth/callback/google`
   - （如有 www）`https://www.hksteamai.com/api/auth/callback/google`

6. 複製 **Client ID** → `AUTH_GOOGLE_ID`  
   複製 **Client secret** → `AUTH_GOOGLE_SECRET`

### 2.2 本機／Vercel env

```env
AUTH_GOOGLE_ID="xxxxx.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="GOCSPX-..."
AUTH_URL="http://localhost:3000"   # 生產改 https://hksteamai.com
```

重啟 `npm run dev` 或 Redeploy。唔填呢兩個 → 登入頁**唔顯示** Google 按鈕（電郵密碼照舊）。

### 2.3 帳戶連結行為

- **新 Google 用戶：** 用電郵開 `User`（`passwordHash = null`）+ `grantLocalProTrial`（7 日 Pro）。
- **已有電郵／密碼帳戶：** 同一電郵用 Google 登入會 **link** 去現有 row（`allowDangerousEmailAccountLinking: true`），訂閱／trial 唔會另開新戶。
- **純 Google 帳戶：** 冇密碼；`Credentials` 登入會失敗（正常）。之後若要設密碼，要另做「設定密碼」流程（V1 未做）。

### 2.4 上線後注意

- Consent screen 由 Testing → **Production** 先俾任意 Google 用戶用（可能要 Google 審核，視 scope；我哋只用基本 email/profile）。
- 正式同本機用同一個 OAuth client 即可（加齊 redirect URI）。

---

## 3. 點收錢（Stripe 實務）

### 3.1 Test vs Live

| | Test | Live |
|---|------|------|
| Key 前綴 | `sk_test_` / `pk_test_` | `sk_live_` / `pk_live_` |
| 卡 | `4242 4242 4242 4242` | 真卡 |
| Webhook | `stripe listen --forward-to localhost:3000/api/stripe/webhook` | Dashboard endpoint → 正式網域 |
| Price ID | 測試環境建立 | **要重新**喺 live 建立 |

本機流程詳見 [FOUNDERS_GUIDE_ZH.md](./FOUNDERS_GUIDE_ZH.md) 同 [STRIPE_FLOWS.md](./STRIPE_FLOWS.md)。

### 3.2 建立產品／價錢

```bash
cd hksteamai-platform
# .env 入面 STRIPE_SECRET_KEY = sk_test_... 或 sk_live_...
npm run stripe:products
```

腳本：`scripts/create-stripe-products.mjs`。將輸出貼入：

- `STRIPE_PRICE_BASIC_MONTHLY`
- `STRIPE_PRICE_BASIC_YEARLY`
- `STRIPE_PRICE_PRO_MONTHLY`
- `STRIPE_PRICE_PRO_YEARLY`

### 3.3 家長付款流程（程式已有）

```
家長登入 → /pricing → CheckoutButton
  → POST /api/stripe/checkout
  → Stripe Hosted Checkout
  → 成功跳去 /account?checkout=success
  → Stripe webhook → /api/stripe/webhook
  → syncSubscriptionFromStripe（src/lib/subscription-sync.ts）
  → DB Subscription.entitlement = primary | secondary | all
```

- **Pro：** Checkout 可帶 7 日 `trial_period_days`（若本地 trial 未用完政策見 `src/lib/stripe.ts`）。
- **Basic：** 即扣；checkout 時揀 `libraryChoice`: `primary` 或 `secondary`。
- 已有有效訂閱再撳 Checkout → **409** `use_portal`（改去 Portal）。

### 3.4 取消／升級：Customer Portal

- `/account` → **Manage billing** → `POST /api/stripe/portal`
- 家長可改卡、睇發票、取消（期滿後 webhook → soft downgrade 做 Free demos）
- 升級／轉 plan：Portal 設定入面開「subscription update」；或之後加自訂 UI

### 3.5 香港卡／支付方式

- Stripe **香港帳戶**通常支援主流 **Visa / Mastercard** 等國際卡；實際以你 Dashboard → Settings → Payment methods 為準。
- **PayMe / 轉數快 FPS：** Stripe 未必直接當訂閱預設；V1 用卡訂閱即可。之後若要本地錢包，可另做 one-off 或第二條收款渠道（唔影響而家 Checkout）。
- 訂閱貨幣：**HKD**（產品腳本已用港幣分）。

### 3.6 錢點入你銀行戶口

1. 去 [Stripe](https://dashboard.stripe.com) 註冊／完成 **香港商戶** 開戶（身份、商業資料、銀行帳戶）。
2. **Settings → Payouts**（或 Get started 引導）綁定你嘅 **HK 銀行帳戶**。
3. 客人用卡付成功 → Stripe 收手續費 → 按 payout schedule（例如每日／每週）自動轉去你銀行。
4. 開票／報稅：Dashboard 有報表；正式營運請咨詢會計（本指南唔代替稅務意見）。

> Express vs Standard：多數直營網站用 **Standard** Stripe 帳戶就夠；Connect／Express 多用喺「平台幫多人收款」。你係單一商戶收家長訂閱 → Standard 即可。

---

## 4. 快速對照：三條問題

| 問題 | 答案 |
|------|------|
| 點樣上架俾人用？ | Vercel deploy + DNS 指 `hksteamai.com` + Postgres + Live Stripe + 保護付費 HTML。跟上面 §1 checklist。 |
| 可唔可以用 Google SSO？ | 可以。填 `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` + Console redirect URI。見 §2。 |
| 點收錢？ | Stripe Checkout（HKD 訂閱）→ webhook 開權益 → Portal 管理；開通 Stripe HK 帳戶收 payout。見 §3。 |

有問題先睇 README 嘅 API map，再睇 `INTEGRATION_FIX.md` 確認本機 smoke 已綠。
