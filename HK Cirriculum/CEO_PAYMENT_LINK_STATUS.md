# CEO Payment Link Status

**Updated:** 2026-07-29  
**Board gate:** redeem stays **YELLOW** until one real pay → entitlement test is completed and recorded below.

## Summary

| Area | Status | Notes |
|------|--------|-------|
| Curriculum Payment Links (static site) | **GREEN** | LIVE + TEST URLs in `billing-config.js`; pricing page buttons work |
| Success / redeem page | **GREEN** | `pricing/success.html` redeems `session_id` via Worker |
| App CTAs (39 apps fixed) | **GREEN** | No more `#coming-soon` dead links; subscribe-gate auto-loads billing |
| Entitlement Worker health | **GREEN** | `https://hkc-stripe-entitlement.hksteamai.workers.dev/api/health` |
| Worker webhook + redeem (test sessions) | **YELLOW** | Worker must use **matching** Stripe mode (`sk_test` for test links, `sk_live` for live links) |
| LIVE Payment Link success URLs | **YELLOW** | Owner must set redirect to `pricing/success.html?session_id={CHECKOUT_SESSION_ID}` in Stripe Dashboard |
| End-to-end test payment recorded | **RED** | No CEO test payment logged yet |
| hksteamai-platform Checkout (`/pricing`) | **GREEN** (test) | `hksteamai-platform/.env` has `sk_test_` + price IDs; HK$98/148 plans (platform tier, not HK$68 curriculum) |

---

## Payment URLs

### Curriculum — LIVE (production soft-sell, real card)

| Plan | Price | Payment Link |
|------|-------|--------------|
| Parent monthly (founding 6-pack) | HK$68/mo | https://buy.stripe.com/bJefZga4M4Yg5fpfMvaMU00 |
| Parent annual | HK$588/yr | https://buy.stripe.com/6oUcN4b8Q3Uc7nx1VFaMU01 |
| Family monthly | HK$98/mo | https://buy.stripe.com/bJedR84Ks0I07nx0RBaMU02 |
| Family annual | HK$848/yr | https://buy.stripe.com/6oUeVc90IeyQ5fp0RBaMU03 |

Used on: `HK Cirriculum/pricing/index.html` (non-localhost hosts).

### Curriculum — TEST (Stripe test mode, card `4242 4242 4242 4242`)

| Plan | Price | Payment Link |
|------|-------|--------------|
| Parent monthly | HK$68/mo | https://buy.stripe.com/test_bJefZga4M4Yg5fpfMvaMU00 |
| Parent annual | HK$588/yr | https://buy.stripe.com/test_6oUcN4b8Q3Uc7nx1VFaMU01 |
| Family monthly | HK$98/mo | https://buy.stripe.com/test_bJedR84Ks0I07nx0RBaMU02 |
| Family annual | HK$848/yr | https://buy.stripe.com/test_6oUeVc90IeyQ5fp0RBaMU03 |

Auto-selected on `localhost` / `127.0.0.1` via `billing-config.js`.  
Regenerate: `cd hksteamai-platform && npm run stripe:curriculum-links`

### Platform — TEST Checkout Sessions (hksteamai.com / localhost:3000)

Requires login → `/pricing` → Subscribe (Basic HK$98 / Pro HK$148).  
Success URL: `/account?checkout=success` · Cancel: `/pricing?checkout=cancel`

---

## How customers buy (curriculum soft-sell)

1. Open **pricing:** `http://localhost:5173/pricing/index.html` (local) or deployed static URL + `/pricing/index.html`
2. Under **創始訂閱 · Science + Math 6-pack**, confirm the six labs listed
3. Click **立即訂閱** on **家長 · 月費 HK$68/月**
4. Complete Stripe Checkout (test card on TEST links; real card on LIVE links)
5. Stripe redirects to **`pricing/success.html?session_id=cs_…`**
6. Page calls Worker `/api/redeem` → unlocks **paid** tier in `localStorage` on this device
7. Open any launch-pack lab → unlimited drills / full wrong-book / parent report

**Founding 6-pack labs:** Kc, Le Chatelier, Titration, Circuit Builder, Gas Laws, Fraction Pizza.

---

## CEO: complete one HK$68 TEST payment (recommended before live)

### Prerequisites

1. **Static server** serving `HK Cirriculum/` at port 5173 (e.g. `npx serve "HK Cirriculum" -l 5173`)
2. **Worker Stripe key matches test mode** (for TEST payment links):
   ```bash
   cd workers/stripe-entitlement
   wrangler secret put STRIPE_SECRET_KEY   # paste sk_test_... from hksteamai-platform/.env
   wrangler deploy
   ```
3. **CORS** already includes `localhost:5173` in `wrangler.toml` (deploy after pull)

### Steps

1. Open http://localhost:5173/pricing/index.html — confirm TEST link shown (URL contains `/test_`)
2. Click **家長 · 月費** → Stripe Checkout opens
3. Card: `4242 4242 4242 4242` · any future expiry · any CVC · any billing details
4. After pay, browser lands on **success** page with green checkmark
5. Open http://localhost:5173/Secondary_School/Chemistry/Form%205/09_Chemical_Equilibrium_Kc/index.html
6. Confirm chip shows **paid · unlimited** (not “今日免費 N 次”)
7. Open http://localhost:5173/parent.html — plan shows **無限版**

### Record result (turn redeem GREEN)

| Field | Value |
|-------|-------|
| Date | _fill after test_ |
| Mode | test / live |
| session_id | cs_… |
| Redeem OK? | yes / no |
| Lab unlocked? | yes / no |

---

## LIVE soft-sell checklist (before ads)

1. In Stripe Dashboard → each LIVE Payment Link → **After payment** → **Redirect** to:
   `https://<your-static-host>/pricing/success.html?session_id={CHECKOUT_SESSION_ID}`
2. Stripe Dashboard → Webhooks → endpoint `https://hkc-stripe-entitlement.hksteamai.workers.dev/webhook/stripe` (live mode)
3. `wrangler secret put STRIPE_SECRET_KEY` with **sk_live_…** on Worker
4. `wrangler secret put STRIPE_WEBHOOK_SECRET` with live `whsec_…`
5. One live HK$68 payment + redeem verification on production host

---

## Files changed (this pass)

| File | Change |
|------|--------|
| `HK Cirriculum/pricing/success.html` | **NEW** — redeem + next-step CTAs |
| `HK Cirriculum/common/billing-config.js` | TEST/LIVE link split + success path |
| `HK Cirriculum/common/subscribe-gate.js` | Auto-load billing + entitlement + redeem |
| `HK Cirriculum/pricing/index.html` | 6-pack copy + entitlement on load |
| `HK Cirriculum/parent.html` | entitlement.js |
| `HK Cirriculum/_tools/fix-payment-ctas.js` | **NEW** — bulk CTA fix |
| `HK Cirriculum/data/payment-links-test.generated.json` | **NEW** — generated test URLs |
| `hksteamai-platform/scripts/create-curriculum-payment-links.mjs` | **NEW** |
| `hksteamai-platform/package.json` | `stripe:curriculum-links` script |
| `workers/stripe-entitlement/src/index.js` | Test price IDs for tier inference |
| `workers/stripe-entitlement/wrangler.toml` | `localhost:5173` CORS |
| 39× `Secondary_School/**/index.html` | `#coming-soon` → pricing links |

---

## Remaining blockers

1. **CEO test payment not done** — redeem gate stays YELLOW until logged above
2. **Worker Stripe mode** — must match payment link mode (test vs live)
3. **LIVE success URLs** — not set in Stripe Dashboard for LIVE links (only TEST links created via API have redirect)
4. **Dual pricing** — curriculum HK$68 vs platform HK$98/148; soft-sell uses curriculum Payment Links only
5. **Worker redeploy** — push `index.js` + `wrangler.toml` changes and verify secrets

---

## Quick smoke commands

```bash
# Worker health
curl https://hkc-stripe-entitlement.hksteamai.workers.dev/api/health

# Regenerate TEST payment links
cd hksteamai-platform && npm run stripe:curriculum-links

# Fix CTAs if new apps added with #coming-soon
node "HK Cirriculum/_tools/fix-payment-ctas.js"
```
