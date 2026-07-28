# Integration fix log — hksteamai-platform V1

**Date:** 2026-07-21 (UTC+8)  
**Role:** Integrator (post build agents + PM + QA)

## Verified green

| Check | Result |
|-------|--------|
| `npm run build` | Pass |
| `npm run test:smoke` | Pass (15/15) |
| `npm run test:entitlements` | Pass |

## What was fixed

1. **Build / lint**
   - Confirmed ESLint ignores `src/generated/**` (Prisma client).
   - Added `postinstall`: `prisma generate`.
   - Adapter deps (`@prisma/adapter-better-sqlite3`, `better-sqlite3`) already present; `LOCALE_COOKIE` already exported.

2. **One `/play` catch-all**
   - Kept SoftPaywall `play/[...path]`.
   - Removed empty orphan `play/[...slug]` directory.

3. **Catalog / orphan clients**
   - Live `/library` is server-rendered (`loadCurriculumMap` + `canAccessModule`) — correct.
   - Deleted unused conflict clients: `LibraryClient.tsx`, `PricingClient.tsx`, `AccountClient.tsx`, `AdminClient.tsx` (wrong `/api/catalog` shape / dual admin UI).

4. **Module proxy**
   - Play iframe now uses **path-style** `/api/modules/[...path]/…` so relative assets (`../../common/*.js`) resolve.
   - `/api/modules/content` kept for signed/query HTML; both have entitlement + rate limit + watermark.
   - Documented canonical vs query path in README API map.

5. **Admin**
   - `GET|PATCH /api/admin` now requires **`ADMIN_SECRET` only** (cookie / `x-admin-secret`) — same as `/admin` UI.
   - `SiteHeader` admin label is a link to `/admin` (for `role === "admin"` users; still need secret login at `/admin`).

6. **Public Pages risk**
   - Clear CRITICAL note in README + recommended next step (private R2 / stop Pages for paid paths).

## Remaining founder steps (cannot automate)

1. Copy `.env.example` → `.env`
2. Set `AUTH_SECRET`, `ADMIN_SECRET`, `ADMIN_PASSWORD`
3. Stripe **test** keys: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. `npm run stripe:products` → paste real `STRIPE_PRICE_*` (replace placeholders)
5. `stripe listen --forward-to localhost:3000/api/stripe/webhook` → `STRIPE_WEBHOOK_SECRET`
6. Optional: `MODULES_ROOT` if modules are not at repo parent
7. Product decision: privatize paid HTML (R2) before claiming exclusivity

## Manual Stripe smoke (after env)

1. `npm run db:push && npm run db:seed && npm run dev`
2. Register → local 7-day Pro trial
3. Guest free demo `/play/...` → OK; paid → SoftPaywall
4. `/pricing` → Checkout test card `4242…` → webhook → `/account`
5. Customer Portal cancel → soft downgrade to free demos
