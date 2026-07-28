# HK Cirriculum · Stripe entitlement Worker

Cloudflare Worker that verifies Stripe webhooks and lets the static GitHub Pages site **redeem** a paid checkout session into local entitlement (`source: stripe_webhook`, not TEST MODE).

**Owner deploy steps:** [`../../HK Cirriculum/CEO_WEBHOOK_OWNER.md`](../../HK%20Cirriculum/CEO_WEBHOOK_OWNER.md)

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/webhook/stripe` | Stripe webhook (verify `Stripe-Signature`) |
| `POST` / `GET` | `/api/redeem` | Redeem `cs_…` session → entitlement JSON |
| `GET` | `/api/health` | Smoke test after deploy |

## Local dev

```bash
cd workers/stripe-entitlement
npm install
wrangler kv namespace create HKC_ENTITLEMENTS   # paste id into wrangler.toml
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put STRIPE_SECRET_KEY
npm run dev
npm run deploy:prep   # dry-run bundle validation (no auth required)
```

Forward webhooks with Stripe CLI:

```bash
stripe listen --forward-to http://127.0.0.1:8787/webhook/stripe
```

## Events handled

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

No secrets in this repo. Configure via `wrangler secret put` only.
