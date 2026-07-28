# HK Steam AI Platform — PM Status Board

**Repo:** `hksteamai-platform/`  
**Product:** hksteamai.com V1 (parent subscribe + trial + free demos + gating + region switcher)  
**Snapshot:** 2026-07-22 — **V1 vertical slice Done** (founder env + DNS + privatize paid HTML still required for go-live)

See [BOARD_EXECUTION_ZH.md](./BOARD_EXECUTION_ZH.md) · [GO_LIVE_ZH.md](./GO_LIVE_ZH.md) · [QA_REPORT.md](./QA_REPORT.md)

---

## 1. Workstream status

| # | Workstream | Status | Evidence |
|---|------------|--------|----------|
| 1 | Stripe / trial / entitlements / webhooks | **Done (code)** — needs Stripe secrets | `src/lib/stripe.ts`, `subscription-sync.ts`, `trial.ts`, `api/stripe/*`, `scripts/create-stripe-products.mjs` |
| 2 | Free vs paid catalog + paywall | **Done** | `data/free-demo-catalog.json` (15), SoftPaywall + `getPaywallCopy`, module proxy |
| 3 | Global curriculum mapping | **Done** | `curriculum-map.json` (~1211) + **intl** International/Other · `/library` filters |
| 4 | Parent frontend portal | **Done** | landing, library, pricing, account, login, register, play, TrialBanner |
| 5 | Backend gating + admin | **Done** | `/api/modules/...`, `/admin` (users, free demos, override, curriculum read, logs) |

---

## 2. Definition of Done — V1 MVP

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Subscribe via Checkout → webhook entitlement | Code ready; founder Stripe keys |
| 2 | 7-day Pro trial on register | Done |
| 3 | 15 free demos guest-playable | Done |
| 4 | Gating SoftPaywall + Basic library choice | Done |
| 5 | Region switcher incl. intl | Done |
| 6 | Account + Portal + children | Done |
| 7 | Admin entitlements / free / curriculum read | Done |
| 8 | No secrets in git | Done (`.env.example` placeholders) |

---

## 3. Founder blockers (cannot automate)

1. Stripe TEST/LIVE keys + `npm run stripe:products` Price IDs + webhook secret  
2. Vercel deploy + DNS `hksteamai.com` + Postgres  
3. Privatize paid HTML (stop public Pages / move to R2) before claiming exclusivity  
4. Optional: Google SSO env  

---

## 4. Verification

```bash
npm run test:smoke        # 15/15
npm run test:entitlements # pass
npm run build             # pass
```
