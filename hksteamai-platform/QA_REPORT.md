# HK Steam AI Platform — QA Report (V1)

**Date:** 2026-07-21 (UTC+8)  
**Scope:** `hksteamai-platform/` — Stripe, catalog, curriculum, parent FE, module proxy / admin  
**Environment:** Windows · Node/npm · Next.js 15.5 · Prisma 7 · Auth.js · Stripe SDK  
**Verdict:** **Build + smoke + entitlements green after integrator pass.** Stripe test checkout unblocked pending founder test keys / Price IDs / webhook. Public Pages paywall bypass risk remains documented.

> **Integrator update:** see [INTEGRATION_FIX.md](./INTEGRATION_FIX.md). Orphans removed; one `/play`; admin = `ADMIN_SECRET`; play uses path-style module proxy.

---

## Executive summary (founder)

| Question | Answer |
|----------|--------|
| 可唔可以上 test Stripe？ | **Build 已綠**；填 test keys + `stripe:products` Price IDs + webhook 後即可手動試 Checkout。 |
| 最大風險？ | **付費 HTML 仍然喺公開 Profile repo / 靜態 hosting 可直接開**（平台 proxy 擋唔到出面 URL）。見 README CRITICAL note。 |
| 試用前要 fix 邊幾項？ | Founder env only（見 INTEGRATION_FIX + README checklist）。 |

---

## Build / lint / tooling results

| Check | Result | Notes |
|-------|--------|-------|
| `npm run build` | **PASS** | ESLint ignores `src/generated/**`; `postinstall` → prisma generate |
| `npm run test:smoke` | **PASS** | 15 checks; single `/play` catch-all |
| `npm run test:entitlements` | **PASS** | Trial / Basic primary / block secondary |
| Free demo paths | **PASS** | 15/15 on disk |
| Curriculum generate | **PASS** | ~1211 modules |

---

## Stripe

| Item | Status |
|------|--------|
| Checkout / portal / webhook code | **Pass (code)** |
| Pro `trial_period_days: 7` + local trial | **Pass (code)** |
| Placeholder Price IDs documented | **Pass** |
| End-to-end Stripe test mode | **Blocked — founder env** (`STRIPE_*` keys, real Price IDs, webhook secret) |

---

## Catalog / FE / backend (post-integrator)

| Item | Status |
|------|--------|
| Library UI | **Pass** — server curriculum map; orphan `LibraryClient` deleted |
| One `/play` SoftPaywall | **Pass** — `[...path]` only |
| Module proxy | **Pass** — play → `/api/modules/[...path]` (RL + watermark + entitlement); `content` for signed HTML |
| Admin | **Pass** — `ADMIN_SECRET` only; header → `/admin` |
| Public Pages paid HTML | **Fail (platform-external)** — documented; recommend private R2 / stop Pages for paid |

---

## P0 before Stripe trial

1. ~~Fix build / dual play / orphans / admin~~ **Done**  
2. Fill Stripe test keys + Price IDs + webhook  
3. Product decision: privatize paid HTML before claiming exclusivity  

Manual plan: register → local trial → free demo guest → SoftPaywall paid → Checkout `4242…` → webhook → portal.

---

*QA + integrator verification. Secrets not committed.*
