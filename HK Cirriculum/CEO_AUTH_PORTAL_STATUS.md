# CEO — Customer auth portal status

**Updated:** 2026-07-29  
**Platform:** `hksteamai-platform` (Next.js + Auth.js credentials + Postgres)

## Portal URLs

| Page | Local | Production (when live) |
|------|-------|------------------------|
| Register | http://localhost:3000/register | https://hksteamai.com/register |
| Sign in | http://localhost:3000/login | https://hksteamai.com/login |
| Library (post-login) | http://localhost:3000/library | https://hksteamai.com/library |
| Account / billing | http://localhost:3000/account | https://hksteamai.com/account |
| Pricing | http://localhost:3000/pricing | https://hksteamai.com/pricing |

**Stripe checkout success** (payment agent): lands on `/account?checkout=success` — user can click **Go to library** from there. Unchanged so payment work is not blocked.

## Demo credentials (after seed)

| Email | Password | Notes |
|-------|----------|--------|
| `parent@example.com` | `demo1234` | Seeded parent with 7-day Pro trial |
| `admin@hksteamai.com` | value of `ADMIN_PASSWORD` in `.env` | Admin user |

## CEO test walkthrough (register → login → library)

### One-time local setup

```powershell
cd hksteamai-platform
cp .env.example .env
# Ensure DATABASE_URL is Postgres (not SQLite)
docker compose up -d
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000

### 1. Register (new parent)

1. Go to http://localhost:3000/register (or click **Start free trial** from homepage / HK Cirriculum links).
2. Enter name (optional), email, password (min 8 chars).
3. Submit → auto sign-in → redirect to **/library**.
4. Expect 7-day Pro trial (full catalog unlocked).

### 2. Sign in (returning user)

1. Sign out from header, or use incognito.
2. Go to http://localhost:3000/login.
3. Use `parent@example.com` / `demo1234` (seeded) or the account you just created.
4. Submit → redirect to **/library** (or `?next=` URL if linked from pricing checkout).

### 3. Library → play

1. On `/library`, pick **Secondary** (or Primary).
2. Open a subject → module.
3. Example play URL:  
   http://localhost:3000/play/Secondary_School/Junior%20Science/Form%202/30_Space_Mission  
   (requires `MODULES_ROOT="../HK Cirriculum"` in `.env`)

### 4. Subscribe flow (optional)

1. Visit http://localhost:3000/pricing while signed out → checkout prompts login with `?next=/pricing`.
2. After Stripe (when configured), success URL → `/account?checkout=success` → **Go to library**.

## Links from marketing surfaces

Static HK Cirriculum pages now point to the portal:

| Surface | Register | Login |
|---------|----------|-------|
| `HK Cirriculum/index.html` | nav + hero CTA | nav + hero CTA |
| `HK Cirriculum/parent-dashboard/index.html` | nav + footer CTA | nav + footer CTA |
| `HK Cirriculum/pricing/index.html` | portal panel | portal panel |
| `HK Cirriculum/marketing/site/landing/index.html` | hero + steps | nav + hero |

Platform header (`SiteHeader`) always shows **Sign in** / **Start free trial** when logged out.

## Bilingual UI

- Locale switcher in platform header (EN ↔ 繁中).
- Auth errors, labels, and hints use `src/lib/i18n.ts` (no hard-coded strings in forms).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Register 500 | `docker compose up -d` + `npx prisma db push` |
| Invalid email/password | Re-seed or use a new email at `/register` |
| Module 404 on play | Set `MODULES_ROOT="../HK Cirriculum"` and restart dev server |
| Google button missing | Set `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` (optional) |

Full setup: `hksteamai-platform/LOCAL_AUTH_SETUP.md`

## Files changed (this task)

**Platform**

- `src/components/LoginForm.tsx` — default redirect `/library`, bilingual errors, register/next links
- `src/components/RegisterForm.tsx` — redirect `/library`, `?next=` support, password hint, error mapping
- `src/app/register/page.tsx` — Suspense for search params
- `src/app/account/page.tsx` — post-checkout library CTA
- `src/app/page.tsx` — hero Sign in CTA
- `src/lib/i18n.ts` — auth copy keys
- `src/app/globals.css` — auth field hint + checkout success banner

**HK Cirriculum (static)**

- `index.html`, `parent-dashboard/index.html`, `pricing/index.html`, `marketing/site/landing/index.html`

**Docs**

- This file (`CEO_AUTH_PORTAL_STATUS.md`)
