# CEO Go-Live Now — 宜家上得線未？

**Date:** 2026-07-29 (Wed)  
**Audience:** CEO / Founder  
**Sources reconciled:** `BOARD_MEETING_2026-07-29.md`, `CEO_PAYMENT_LINK_STATUS.md`, `CEO_AUTH_PORTAL_STATUS.md`, `CEO_NCS_TOPRIGHT_FLEET.md`, `QA_NCS_TOPRIGHT_COVERAGE.md`, `GATE_TO_GREEN_STATUS.md`, `CEO_CONTINUE_STATUS.md`, `CEO_NCS_LANG_SWITCH_FIX.md`, `QA_FLEET_ALL_APPS.md`, `CEO_BILLING_STATUS_NOW.md`, `common/billing-config.js`, Worker `/api/health`, `git log` / `git status`

---

## 繁中 · CEO 一頁答

### 1. **Verdict：有條件 GO（CONDITIONAL GO）**

**唔係全站 GO。** 董事會 5.5/10 黃燈仍然成立；今日進展（LIVE 連結、NCS ~100%、語言切換修復、DSE 改名）令 **「創始 6-pack 軟賣」** 可以開始，但 **未證明 pay → redeem**、**LIVE success URL 未在 Stripe Dashboard 設定**、**`HK Cirriculum/` 仍未 commit/deploy** — 而家開 LIVE 廣告或當「全庫付費」上線 = **NO-GO**。

| 範圍 | 判斷 |
|------|------|
| 全 fleet 1,300+ apps 付費宣傳 | **NO-GO** |
| hksteamai.com 平台正式上線 | **NO-GO**（`PM_STATUS.md`：DNS / Vercel / founder secrets 未齊） |
| 創始 Science + Math **6-pack** 軟賣（手動 onboarding） | **CONDITIONAL GO** |
| 而家即刻用 LIVE link 收真錢（無 E2E 驗證） | **NO-GO** — 會扣卡但 unlock 未證明 |

---

### 2. **已就緒（What IS ready）**

- **Launch pack 6/6 PASS** — Kc、Le Chatelier、Titration、Circuit Builder、Gas Laws、Fraction Pizza（`GATE_TO_GREEN_STATUS.md`, `QA_FLEET_ALL_APPS.md` smoke）
- **LIVE Stripe Payment Links 已貼入** `billing-config.js`（Parent HK$68/588、Family HK$98/848）— 非 localhost 會用 LIVE link
- **Entitlement Worker 在線** — `hkc-stripe-entitlement.hksteamai.workers.dev/api/health` → `ok: true`, `webhookConfigured: true`, `redeemConfigured: true`
- **`pricing/success.html` + `subscribe-gate.js`** — redeem 流程已寫好（本地 / 靜態站）
- **39 個 app CTA** — 已由 `#coming-soon` 改指向 pricing（`CEO_PAYMENT_LINK_STATUS.md`）
- **NCS 語言切換器 ~100% fleet** — 1,317/1,317 `index.html` 有 top-right 繁 + NCS Five（`QA_NCS_TOPRIGHT_COVERAGE.md`）
- **Hub 語言切換 bug 已修** — Hindi/Nepali 等唔再 stuck 繁中（`CEO_NCS_LANG_SWITCH_FIX.md`, `CEO_CONTINUE_STATUS.md`）
- **DSE ICT 改名完成** — `HKDSE_Interactive_Lab` + `DSE_Past_Paper_2025` / `DSE_Long_Questions`（`CEO_DSE_RENAME_DONE.md`）
- **Auth portal 本地可用** — register / login / library @ localhost:3000（`CEO_AUTH_PORTAL_STATUS.md`）
- **定價頁 + 6-pack 文案** — founding subscriber positioning 已對齊董事會

---

### 3. **阻住 full go-live（收真錢前必須搞掂）**

| # | Blocker | Severity | Evidence |
|---|---------|----------|----------|
| 1 | **無 recorded pay → redeem E2E** | **Critical** | `CEO_PAYMENT_LINK_STATUS.md`: test payment table **RED**；`CEO_BILLING_STATUS_NOW.md`: *Owner needs test payment* |
| 2 | **LIVE Payment Link success redirect 未在 Stripe Dashboard 設定** | **Critical** | TEST links 經 API 有 redirect；**LIVE 四條 link 要人手設** `pricing/success.html?session_id={CHECKOUT_SESSION_ID}` |
| 3 | **Worker Stripe key mode 未確認** | **Critical** | LIVE link 要 `sk_live_` + live `whsec_`；test key 會令 LIVE 付款 redeem 失敗 |
| 4 | **`HK Cirriculum/` 未 commit git（0 tracked files）** | **Critical** | `git ls-files "HK Cirriculum"` = 0；`git status` = `?? HK Cirriculum/` — **未 deploy 就無 production 靜態站** |
| 5 | **Fleet P0 = 1**（Space Mission corrupt inject） | **High** | `QA_FLEET_ALL_APPS.md`: 1166/1314 PASS, P0=`Junior Science/Form 2/30_Space_Mission`；董事會 action #2 未關 |
| 6 | **~133 thin stub apps（P1）** | **High** | 家長從科目目錄黐到空殼 = 品牌傷害；不可宣傳「全庫訂閱」 |
| 7 | **hksteamai.com production 未上** | **Medium** | `PM_STATUS.md`: Vercel + DNS + Postgres + founder Stripe keys |
| 8 | **curriculum-map.json stale**（DSE paths） | **Low** | 平台 `/library` 部分 ICT 連結舊；不阻 6-pack 靜態軟賣 |

**Honest score update:** 產品 wedge **8/10**；billing plumbing **6→6.5**（links pasted）；entitlement trust **5**（仍 YELLOW）；deploy readiness **3**（未 commit）；**composite ~5.5–6/10 YELLOW**。

---

### 4. **Soft-sell NOW？（只賣 6-pack？）**

**答：Yes — 但只限「創始訂閱 / 手動 onboarding」，唔好開 self-serve 廣告。**

| 可以做 | 唔可以做 |
|--------|----------|
| 向 5–10 個早期家長 **WhatsApp / 面對面** 賣 6-pack，講明 founding subscriber | Facebook / Google ads 開 LIVE checkout |
| 先跑 **一單 TEST HK$68** → redeem GREEN → 再跑 **一單 LIVE HK$68** 自己驗 | 宣傳「1,300+ apps 全部付費解鎖」 |
| 靜態站 deploy 後 share **pricing URL + 六個 lab 直 link** | hksteamai.com 當主入口（未 prod） |
| Finance 要求：第一單 live 後 24h 內確認 unlock + 必要時 refund 流程 | 忽略 success page dead-end（LIVE redirect 未設 = 客付完唔知點 unlock） |

**Why conditional:** LIVE Stripe **會扣真錢**；redeem 邏輯存在但未有一單 documented 證明。董事會 Finance **棄權** 直到 E2E 完成。

---

### 5. **CEO checklist（下一步 5–8 個具體 click）**

| # | Action | Where / How | Done? |
|---|--------|-------------|-------|
| 1 | **Commit + push `HK Cirriculum/`** | `git add "HK Cirriculum/"` → commit → push（防 wipe；令 GitHub Pages / 靜態 host 有最新檔） | ☐ |
| 2 | **Deploy 靜態 curriculum** | GitHub Pages 或現有 static host；確認 `/pricing/index.html` 同六個 launch-pack URL 200 | ☐ |
| 3 | **Stripe Dashboard → 每條 LIVE Payment Link → After payment → Redirect** | `https://<static-host>/pricing/success.html?session_id={CHECKOUT_SESSION_ID}` | ☐ |
| 4 | **Worker secrets 切 LIVE mode** | `cd workers/stripe-entitlement` → `wrangler secret put STRIPE_SECRET_KEY` (`sk_live_…`) → `STRIPE_WEBHOOK_SECRET` (live `whsec_…`) → `wrangler deploy` | ☐ |
| 5 | **跑 TEST payment HK$68** | localhost:5173 + TEST link + card `4242…` → success 綠 tick → Kc 顯示 **paid · unlimited** → 填 `CEO_PAYMENT_LINK_STATUS.md` 表格 | ☐ |
| 6 | **跑 LIVE payment HK$68（自己卡）** | Production static URL + LIVE link → redeem → 確認 → 必要時 Stripe refund test | ☐ |
| 7 | **Hard refresh 語言切換 smoke** | `index.html` → 揀 **हिन्दी** → nav/tagline 唔好仍係繁中；再試 pricing + parent-dashboard | ☐ |
| 8 | **Fix P0 Space Mission** 或從 subjects 入口暫時 hide | `Secondary_School/Junior Science/Form 2/30_Space_Mission` — `tfz_corrupt_inject` | ☐ |

**Bonus (D+7):** Regenerate `hksteamai-platform/data/curriculum-map.json` DSE paths；平台 Vercel deploy 可以 parallel，唔阻 6-pack 靜態軟賣。

---

## English summary (CEO bullets)

1. **Verdict: CONDITIONAL GO** — Founding **6-pack soft-sell only** with manual onboarding. **NOT** full-catalog paid launch. **NOT** hksteamai.com production yet. **NOT** self-serve LIVE ads until redeem is proven.

2. **Ready**
   - Launch pack 6/6 PASS (Chem/Phys/Math wedge)
   - LIVE + TEST Stripe Payment Links in `billing-config.js`
   - Worker health GREEN (`webhookConfigured`, `redeemConfigured`)
   - `pricing/success.html` redeem flow built
   - NCS lang switcher ~100% fleet + hub lang bug fixed
   - DSE ICT rename done on disk
   - Local auth portal (register/login/library) works

3. **Blocks full go-live (must-fix before scaling real charges)**
   - No documented pay → webhook → `/api/redeem` → unlock journey (**redeem YELLOW/RED**)
   - LIVE Payment Link success URLs not set in Stripe Dashboard
   - Worker `sk_live_` / live webhook secret not verified for LIVE links
   - **`HK Cirriculum/` is entirely untracked in git (0 files)** — nothing deployed to production static host from this work
   - Fleet P0=1 (Space Mission); ~133 P1 thin stubs
   - Platform production (Vercel/DNS) still founder-blocked per `PM_STATUS.md`

4. **Soft-sell NOW (6-pack only)?** **Yes, conditionally** — hand-pick founding families, honest scope, no paid ads until checklist items 3–6 are GREEN. **No** to charging strangers at scale today.

5. **CEO next clicks:** commit HK Cirriculum → deploy static → set LIVE Stripe redirects → deploy Worker with live secrets → TEST HK$68 redeem → LIVE HK$68 redeem → lang smoke → fix/hide Space Mission P0.

---

## Board alignment

| Board 2026-07-29 | Today update |
|------------------|--------------|
| 5.5/10 YELLOW, conditional soft-sell | **Unchanged band**; payment links + NCS + lang fixes improve **product/demo** side, not **money trust** |
| 4–0–1 vote: soft-sell NOW, scope-limited | **Still valid** if CEO completes E2E + deploy |
| Finance abstain until one E2E | **Still blocking** — abstention not cleared |
| Action #7: commit HK Cirriculum | **NOT DONE** |

---

*Prepared 2026-07-29. Re-run this verdict after: (1) git commit + deploy, (2) redeem table filled GREEN, (3) fleet P0=0.*
