# QA: `/play` — All Subjects (not just Physics)

**Date:** 2026-07-28 (UTC+8)  
**Scope:** `hksteamai-platform` module proxy + `/play/[...path]` for all secondary subjects  
**Environment:** `MODULES_ROOT=../HK Cirriculum` · `localhost:3000` · Next.js 15.5  
**Verdict:** **PASS** — path normalization works across subjects; 15 free demos return HTML; paid subjects return **Locked** (not Invalid path) for guests.

---

## Executive summary

| Question | Answer |
|----------|--------|
| Do Chemistry, Biology, Math, Junior Science, Chinese_History, ICT play via `/play/...`? | **Yes** — `/play` shell loads for all; free demos stream HTML; paid modules show SoftPaywall (guest) or **403 Locked** on API (expected). |
| Physics `Invalid path` fixed? | **Yes** — `moduleKey()` strips `HK Cirriculum/` in play iframe URL and `[...path]` API `sanitizeRel`. |
| 15 diverse modules → 200 HTML? | **Yes** — all 15 free-demo catalog entries return `200 text/html` from `/api/modules/...`. |
| MediaPipe camera in iframe? | **Yes** — iframe `allow="camera *; microphone *; fullscreen *"` + `Permissions-Policy: camera=*, microphone=*, fullscreen=*` on HTML responses. |

---

## Root cause (Physics Invalid path)

The play iframe previously requested:

```
/api/modules/HK Cirriculum/Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System
```

`sanitizeRel` only allows prefixes `Primary_School/`, `Secondary_School/`, etc. — **not** `HK Cirriculum/...` — so every Physics (and any subject with a stale prefix) hit:

```json
{"error":"Invalid path"}
```

### Fix (already in tree)

| File | Change |
|------|--------|
| `src/lib/entitlements.ts` | `moduleKey()` strips `^HK Cirriculum/` (case-insensitive) |
| `src/app/play/[...path]/page.tsx` | iframe `src` uses `moduleKey(meta?.path \|\| key)` |
| `src/app/api/modules/[...path]/route.ts` | `sanitizeRel` normalizes via `moduleKey()` before prefix check |
| `data/free-demo-catalog.json` | Chemistry demo path canonicalized (no `HK Cirriculum/` prefix) |

Legacy URLs with `HK Cirriculum/` still work (backward-compatible).

---

## Subject verification matrix

Tested `2026-07-28` against running `npm run dev`.

| Subject | Sample path | `/play` (guest) | `/api/modules` (guest) | Notes |
|---------|-------------|-----------------|------------------------|-------|
| **Mathematics** | `Secondary_School/Mathematics/Form 1/01_Directed_Numbers` | 200 HTML shell + iframe | **200 HTML** | Free demo |
| **Junior Science** | `Secondary_School/Junior Science/Form 1/01_Lab_Safety` | 200 | **200 HTML** | Free demo |
| **Chemistry** | `Secondary_School/Chemistry/Form 3/03_Periodic_Table` | 200 | **200 HTML** | Free demo |
| **Physics** | `Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System` | 200 | **200 HTML** | Free demo; MediaPipe |
| **Biology** | `Secondary_School/Biology/apps/photosynthesis` | 200 (SoftPaywall) | **403 Locked** | Paid — not Invalid path |
| **Chinese_History** | `Secondary_School/Chinese_History/3D_War/cse-wars` | 200 (SoftPaywall) | **403 Locked** | Paid — not Invalid path |
| **ICT** | `Secondary_School/ICT/HKDSE_Interactive_Lab/01_Spreadsheet_Logic` | 200 (SoftPaywall) | **403 Locked** | Paid — not Invalid path |

**Locked vs Invalid path:** `403 {"error":"Locked","reason":"subscribe_required"}` is correct for unpaid guests on paid modules. `400 {"error":"Invalid path"}` would indicate a routing bug — **0 occurrences** in subject sample set.

---

## 15 free-demo smoke (all → 200 HTML)

| # | Module | API status |
|---|--------|------------|
| 1 | Primary Mathematics P1 Counting 1–10 | 200 HTML |
| 2 | Primary Mathematics P1 Comparing Numbers | 200 HTML |
| 3 | Primary Mathematics P3 Multiplication Tables | 200 HTML |
| 4 | Primary Mathematics P3 Time 24-hour | 200 HTML |
| 5 | Primary Mathematics P6 Percentage Calculator | 200 HTML |
| 6 | Primary GS P1 Teeth Brushing | 200 HTML |
| 7 | Primary GS P1 Recycling Bin | 200 HTML |
| 8 | Primary GS P4 Food Pyramid | 200 HTML |
| 9 | Secondary Math F1 Directed Numbers | 200 HTML |
| 10 | Secondary Math F1 Basic Algebra | 200 HTML |
| 11 | Secondary Math F3 Quadrilaterals | 200 HTML |
| 12 | Junior Science F1 Lab Safety | 200 HTML |
| 13 | Junior Science F1 Water Cycle | 200 HTML |
| 14 | Chemistry F3 Periodic Table | 200 HTML |
| 15 | Physics 3D Solar System | 200 HTML |

Automated: `npm run test:smoke:play`

---

## MediaPipe / iframe camera

**App:** `Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System` (HandLandmarker via `@mediapipe/tasks-vision@0.10.14`)

| Layer | Camera support |
|-------|----------------|
| Play page iframe | `allow="camera *; microphone *; fullscreen *"` |
| `/api/modules/[...path]` HTML response | `Permissions-Policy: camera=*, microphone=*, fullscreen=*` |
| `/api/modules/content` HTML response | Same header (added for parity) |
| App JS | `getUserMedia` + live preview before model load; clear error if denied |

**Manual check:** Open `/play/Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System`, allow camera when prompted, confirm corner webcam preview is live (not black).

---

## Automated test commands

```bash
# Static + catalog checks (no server)
npm run test:smoke          # 15/15 pass (includes HK Cirriculum disk paths)

# HTTP play routing (requires npm run dev)
npm run test:smoke:play     # 37 checks — 15 free demos + 7 subjects + legacy prefix + MediaPipe headers
```

Optional override:

```bash
PLAY_SMOKE_BASE=http://localhost:3000 npm run test:smoke:play
```

---

## Changes in this QA pass

1. **`scripts/smoke-qa.mjs`** — free-demo disk check now resolves under `HK Cirriculum/` (was incorrectly checking repo root).
2. **`scripts/smoke-play.mjs`** — new HTTP smoke for `/play` + `/api/modules` across subjects.
3. **`package.json`** — `test:smoke:play` script.
4. **`src/app/api/modules/content/route.ts`** — `Permissions-Policy` on HTML responses (camera parity with path proxy).

---

## Known expected behaviour (not bugs)

| Scenario | Response | Why |
|----------|----------|-----|
| Guest opens paid module API directly | 403 Locked JSON | Entitlement gate |
| Guest opens paid `/play/...` | 200 HTML + SoftPaywall overlay | Shell renders; iframe withheld |
| Guest opens free demo | 200 HTML in iframe | `free_demo` entitlement |
| Signed-in user + Pro trial | 200 HTML for band-matched modules | `canAccessModule` |

---

## Manual follow-up (founder)

1. Sign in with Pro trial → confirm Biology / ICT / Chinese_History iframe loads HTML (not Locked).
2. Hard-refresh Solar System after deploy; test hand gestures (rotate / pause / zoom).
3. Product: paid HTML still on public static hosting is a separate risk (see `INTEGRATION_FIX.md`).

---

*QA verified locally. No secrets committed.*
