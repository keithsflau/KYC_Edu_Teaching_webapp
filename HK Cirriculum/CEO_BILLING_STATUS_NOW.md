# Billing Status Now

## What was missing
- The `HK Cirriculum/common/billing-config.js` file had empty strings for `ENTITLEMENT_API_BASE` and all `PAYMENT_LINKS`.
- The `pricing/index.html` was displaying "Coming soon" because the payment links were empty.

## Fixed now
- Restored the real Stripe Payment Links in `HK Cirriculum/common/billing-config.js`:
  - Parent monthly: `https://buy.stripe.com/bJefZga4M4Yg5fpfMvaMU00`
  - Parent annual: `https://buy.stripe.com/6oUcN4b8Q3Uc7nx1VFaMU01`
  - Family monthly: `https://buy.stripe.com/bJedR84Ks0I07nx0RBaMU02`
  - Family annual: `https://buy.stripe.com/6oUeVc90IeyQ5fp0RBaMU03`
- Restored the Cloudflare Worker base URL in `HK Cirriculum/common/billing-config.js`:
  - `ENTITLEMENT_API_BASE`: `https://hkc-stripe-entitlement.hksteamai.workers.dev`
- Verified that `pricing/index.html` and launch pack apps correctly reference `../common/billing-config.js`.
- Smoke tested the Worker `/api/health` endpoint and it is responding successfully (`{"ok":true,"service":"hkc-stripe-entitlement","version":"1.0.0","webhookConfigured":true,"redeemConfigured":true}`).

## Remaining
- Owner needs to perform a test payment to ensure the end-to-end flow works correctly.

## What pricing apps will read
The pricing apps will now read the actual payment links from `HkcBilling.paymentLinks` and the API base from `HkcBilling.apiBase()`, allowing the "Subscribe" buttons to work and the entitlement redemption to hit the Cloudflare Worker.