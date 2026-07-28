# Local auth setup (register ??library ??play)

The app uses **PostgreSQL** (Prisma schema + `@prisma/adapter-pg`). A SQLite `file:./dev.db` URL will **not** work ??`src/lib/db.ts` rejects it.

## Prerequisites

- Node.js 20+
- Docker Desktop (running)

## One-time setup

```powershell
cd hksteamai-platform

# 1. Environment
cp .env.example .env
# .env should include:
# DATABASE_URL="postgresql://hksteamai:hksteamai_local@localhost:5432/hksteamai"
# MODULES_ROOT="../HK Cirriculum"  # required for /play/... (not repo root)

# 2. Dependencies
npm install

# 3. Start Postgres
docker compose up -d

# 4. Schema + seed
npx prisma generate
npx prisma db push
npm run db:seed

# 5. Dev server
npm run dev
```

Open http://localhost:3000

## Seeded accounts

| Email | Password | Notes |
|-------|----------|--------|
| `parent@example.com` | `demo1234` | Pro trial (7 days) |
| `admin@hksteamai.com` | value of `ADMIN_PASSWORD` in `.env` | Admin |

## CEO walkthrough

1. **Register** ??http://localhost:3000/register  
   Create a new account (password min 8 chars). On success you are signed in and redirected to `/library`.

2. **Library** ??browse modules (Pro trial unlocks the full catalog).

3. **Play Space Mission** ??example URL:  
   http://localhost:3000/play/Secondary_School/Junior%20Science/Form%202/30_Space_Mission  
   (or pick *Space Missions* from the library UI)

## Verify API manually

```powershell
# Register
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"demo12345","name":"Test"}'

# Expect: {"ok":true,"userId":"..."}
```

Then sign in at http://localhost:3000/login with the same email/password.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `DATABASE_URL must be a Postgres connection string` | Set `DATABASE_URL` to the Docker URL above (not `file:./dev.db`). |
| `Can't reach database server` | `docker compose up -d` and wait for healthy Postgres. |
| `Email already registered` | Use a new email or sign in at `/login`. |
| Register 500 / migration error | Run `npx prisma db push` again. |
| Module play 404 | Set `MODULES_ROOT="../HK Cirriculum"` in `.env` and restart `npm run dev`. |
| Module play 403 | Sign in; free demos work without auth, paid modules need trial/subscription. |

## Production

Use Neon, Supabase, or Vercel Postgres. Set `DATABASE_URL` with `?sslmode=require` if required. Do **not** use SQLite on Vercel.

## Stop local Postgres

```powershell
docker compose down
```

Data persists in the `hksteamai_pgdata` volume until you run `docker compose down -v`.
