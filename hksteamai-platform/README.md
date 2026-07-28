# HK Steam AI Platform (Parent Subscription V1)

Parent portal + API for **hksteamai.com**: free demos, 7-day Pro trial, Stripe subscriptions, global curriculum region switcher, gated module serving.

## Stack

- Next.js 15 (App Router) + TypeScript + Auth.js (credentials)
- Prisma 7 + SQLite (`better-sqlite3`) — easy on Windows; swap to Postgres for production
- Stripe Checkout / Customer Portal / webhooks
- Entitlements: `free` | `primary` | `secondary` | `all` + `trialEndsAt`

## Quick start

```bash
cd hksteamai-platform
cp .env.example .env          # then edit secrets
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run curriculum:generate   # optional; map already committed (~1211 modules)
npm run dev
```

Open http://localhost:3000

| Account | Password | Notes |
|---------|----------|--------|
| `parent@example.com` | `demo1234` | Pro trial |
| `admin@hksteamai.com` | from `ADMIN_PASSWORD` | Admin |

## Stripe test mode

1. Dashboard → **Test mode** → copy `sk_test_` / `pk_test_` into `.env`
2. `npm run stripe:products` → paste `STRIPE_PRICE_*` into `.env`
3. Enable **Customer portal** (Settings → Billing)
4. `stripe listen --forward-to localhost:3000/api/stripe/webhook` → set `STRIPE_WEBHOOK_SECRET`
5. Sign in → `/pricing` → Checkout with card `4242 4242 4242 4242`

### Trial policy

| Path | Behaviour |
|------|-----------|
| Register | Local **7-day Pro** (`entitlement=all`, `status=trialing`) — no card |
| Stripe Pro monthly/yearly | Checkout `trial_period_days: 7` |
| Stripe Basic | **No** Stripe trial (use register trial first) |
| After trial / cancel | Soft downgrade to **Free** (demos only) |

Prices (HKD): Basic **$98/mo** · **$980/yr** · Pro **$148/mo** · **$1280/yr**

See also: [GO_LIVE_ZH.md](./GO_LIVE_ZH.md)（上架 · Google SSO · 收錢）、[STRIPE_FLOWS.md](./STRIPE_FLOWS.md)、[FOUNDERS_GUIDE_ZH.md](./FOUNDERS_GUIDE_ZH.md)

## Free vs paid

- Free forever list: [FREE_DEMO_CATALOG.md](./FREE_DEMO_CATALOG.md) + `data/free-demo-catalog.json`
- Everything else: auth + entitlement via `/api/modules/...` (not public static hosting inside this app)

### CRITICAL — public GitHub Pages risk

Paid `index.html` files still live in the parent **Profile** repo (`Primary_School/`, `Secondary_School/`). The platform proxy correctly gates unpaid access **inside** Next.js, but anyone who knows a public GitHub / GitHub Pages URL can open those files **outside** the app.

**Recommended next step (before claiming paid exclusivity):** stop publishing paid folders on public Pages, or move paid assets to **private R2** (or similar) and serve only through signed / entitlement-checked URLs. Free demos may stay public.

## API map (frozen for V1)

| API | Purpose |
|-----|---------|
| `GET /api/catalog` | Marketing payload: free demos + entitlement rules + paywall copy |
| `GET /api/modules/catalog` | Gated curriculum listing (region filters live on `/library` server-side) |
| `GET /api/modules/[...path]` | **Canonical** play iframe + relative assets (entitlement + RL + watermark) |
| `GET /api/modules/content?path=` | Query-style HTML (signed URLs); same controls, HTML only |
| `POST /api/modules/signed` | Mint short-lived signed URL |
| `GET /api/entitlements` | Account subscription mirror |
| `/admin` + `ADMIN_SECRET` | Backoffice (cookie / `x-admin-secret`) — not NextAuth role alone |

## Global curriculum map

- `data/curriculum-map.json` — HK / UK KS / US Grade / IB / SG / AU / **International·Other**
- Regenerate: `npm run curriculum:generate`
- UI: `/library` region switcher + disclaimer (approximate discovery, not accreditation)
- Docs: [CURRICULUM_MAP.md](./CURRICULUM_MAP.md) · Board notes: [BOARD_EXECUTION_ZH.md](./BOARD_EXECUTION_ZH.md)

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Landing (EN + 繁中) |
| `/library` | Catalog + region filters |
| `/play/...` | Player + soft paywall |
| `/pricing` | Plans + Checkout |
| `/login` `/register` | Auth + trial on register |
| `/account` | Status, portal, children |
| `/admin` | Users / logs / flags |

## Production TODO

- **完整粵語上架指南：** [GO_LIVE_ZH.md](./GO_LIVE_ZH.md)
- Point DNS for hksteamai.com
- Live Stripe keys + webhook endpoint
- Postgres instead of SQLite
- **Privatize paid HTML** (R2 + Workers signed URLs; stop public Pages for paid paths)
- Google SSO: set `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` (button appears on `/login`)
- Stronger device limits / email verification
- Honest limit: not browser DRM — auth gate + watermark + access logs

## Founder env checklist (Stripe test)

Copy `.env.example` → `.env`, then fill:

| Var | Why |
|-----|-----|
| `AUTH_SECRET` | Auth.js sessions |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Optional Google SSO (`/login` button) |
| `ADMIN_SECRET` | `/admin` login cookie (separate from `ADMIN_PASSWORD`) |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Test mode `sk_test_` / `pk_test_` |
| `STRIPE_PRICE_*` | Real Price IDs from `npm run stripe:products` (not `*_placeholder`) |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen --forward-to localhost:3000/api/stripe/webhook` |
| `MODULES_ROOT` | Optional; defaults to Profile repo parent |

Never commit `.env`. See [INTEGRATION_FIX.md](./INTEGRATION_FIX.md).

## Notes

- Never commit `.env` or secret keys
- On OneDrive/Windows, prefer `npm run build` (webpack) over `build:turbo` if temp-file ENOENT appears
- `MODULES_ROOT` defaults to the Profile repo parent of this folder
- `postinstall` runs `prisma generate` (output under `src/generated/`, ESLint-ignored)
