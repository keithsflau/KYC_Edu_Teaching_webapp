# CEO: 你整既新 app 去哂邊？ — Where Are the New Apps?

**Updated:** 2026-07-28  
**Status:** Apps are **on disk** under `HK Cirriculum/` — not deleted. They were briefly wiped to stubs during an incomplete LGER migration; **82+ Junior Science apps were rebuilt** the same day. See `CEO_JUNIOR_SCIENCE_REBUILD_STATUS.md`.

---

## One-line answer (CEO)

**Apps 喺 `HK Cirriculum/Primary_School/` 同 `HK Cirriculum/Secondary_School/`，用 `HK Cirriculum/subjects/index.html`（靜態）或者 `http://localhost:3000/library`（平台）打開。**

---

## Canonical root (all apps live here)

| What | Path |
|------|------|
| **Primary apps** | `HK Cirriculum/Primary_School/` |
| **Secondary apps** | `HK Cirriculum/Secondary_School/` |
| **Subject directory hub** | `HK Cirriculum/subjects/index.html` |
| **Shared JS/CSS** | `HK Cirriculum/common/` |

### Root-level folders are redirects only

| Path | Reality |
|------|---------|
| `Primary_School/index.html` (repo root) | Redirect → `HK Cirriculum/Primary_School/` |
| `Secondary_School/index.html` (repo root) | Redirect → `HK Cirriculum/Secondary_School/` |

**Do not look for new apps at repo-root `Primary_School/` or `Secondary_School/`** — only redirect stubs exist there.

---

## How to open

### A. Static (fastest for demos)

Serve the curriculum folder, then open hub pages in the browser:

```powershell
cd "c:\Users\keith\OneDrive\Github\Profile"
npx serve "HK Cirriculum" -l 5173
```

| Entry | URL |
|-------|-----|
| Subject directory | http://localhost:5173/subjects/index.html |
| Junior Science portal | http://localhost:5173/Secondary_School/Junior%20Science/index.html |
| Chemistry flagships | http://localhost:5173/Secondary_School/Chemistry/index.html |
| Primary GS hub | http://localhost:5173/Primary_School/General_Studies/index.html |

You can also double-click any `index.html` under `HK Cirriculum/`, but some apps need a local server for `common/*.js` paths.

### B. Platform library (auth + paywall)

```powershell
cd hksteamai-platform
npm run dev
```

| Entry | URL |
|-------|-----|
| Library browse | http://localhost:3000/library |
| Register / trial | http://localhost:3000/register |

**Play URL pattern** (path is relative to `MODULES_ROOT`, **without** `HK Cirriculum/` prefix):

```
http://localhost:3000/play/Secondary_School/Junior%20Science/Form%202/30_Space_Mission
```

**Important:** Set in `hksteamai-platform/.env`:

```
MODULES_ROOT=../HK Cirriculum
```

Without this, `/play/...` returns 404 because apps are not at repo-root `Secondary_School/`.

### C. `curriculum-map.json` (library index)

- **File:** `hksteamai-platform/data/curriculum-map.json`
- **Regenerated today:** 1390 modules (was 1372)
- **Command:** `cd hksteamai-platform && npm run curriculum:generate`

Apps **are listed** in the map. Paths are stored as `HK Cirriculum/Secondary_School/...` — the platform play proxy expects `Secondary_School/...` when `MODULES_ROOT` points at `HK Cirriculum/`. If library “Open” links fail, check `MODULES_ROOT` first.

---

## Workstream inventory

### 1. Junior Science LGER (F1 / F2 / F3)

| Form | Count | Hub | Status |
|------|------:|-----|--------|
| Form 1 | 35 | `Secondary_School/Junior Science/Form 1/index.html` | ✅ LGER rebuilt (PPT-aligned) |
| Form 2 | 28+ | `Secondary_School/Junior Science/Form 2/index.html` | ✅ LGER rebuilt; Space Mission preserved |
| Form 3 | 32 | `Secondary_School/Junior Science/Form 3/index.html` | ✅ Bridge + Books 12–14 PPT lane |

- **98** `index.html` files load `junior-science-lger.js`
- **0** stub/footer-only apps (prior ~60 stubs recovered)
- Linked from `subjects/index.html` → Junior Science (hub only, not per-app)

### 2. Chemistry flagships

| App | Full path | Quality |
|-----|-----------|---------|
| **Kc** | `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/` | ✅ Full interactive |
| **Rates** | `Secondary_School/Chemistry/Form 5/01_Rates_Collision/` | ✅ Full interactive |
| **Titration** | `Secondary_School/Chemistry/Form 6/02_Titration_Curve/` | ✅ Full interactive |
| **Le Chatelier** | `Secondary_School/Chemistry/Form 5/06_Le_Chatelier/` | ⚠️ Placeholder canvas + LearnFromZero |
| **Haber** | `Secondary_School/Chemistry/Form 5/08_Haber_Process/` | ⚠️ Placeholder |
| **Electrolysis** | `Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox/` | ✅ Full interactive |

Flagships are linked from `Secondary_School/Chemistry/index.html` (“Flagship Labs” section).

### 3. Fraction Pizza

| Location | Notes |
|----------|-------|
| **Canonical:** `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share/` | ✅ Full app (~336 lines) |
| `Primary_School/Mathematics/P3/41_Fraction_Pizza_Share/` | Redirect stub → Form 1 canonical copy |

**Gap:** Not yet in Form 1 Mathematics hub JSON (`Form 1/index.html` curriculum list). Reachable via direct path or library map.

### 4. Space Mission, Magnet Fun, Flag Raising

| App | Path | Notes |
|-----|------|-------|
| **Space Mission** (F2) | `Secondary_School/Junior Science/Form 2/30_Space_Mission/` | Hand-crafted LGER; also in F2 hub |
| **Space Missions** (P6 GS) | `Primary_School/General_Studies/P6/40_Space_Missions/` | Different primary app |
| **Magnet Fun** | `Primary_School/General_Studies/P1/26_Magnet_Fun/` | Full React app |
| **Flag Raising** | `Primary_School/General_Studies/P1/29_Flag_Raising/` | Full React app |

### 5. Form 3 bridge apps

All under `Secondary_School/Junior Science/Form 3/`, linked from `Form 3/index.html`:

| App | Folder |
|-----|--------|
| Climate Action | `01_Climate_Action/` |
| Genetics Intro | `02_Genetics_Intro/` |
| Ecosystem Balance | `03_Ecosystem_Balance/` |
| Circuit Design | `04_Circuit_Design/` |
| Force & Motion Bridge | `05_Force_Motion_Bridge/` |
| Circuit Design (alt) | `06_Circuit_Design/` |
| Chemistry Bridge | `09_Chemistry_Bridge/` |
| + Books 12–14 lane | `11_Healthy_Lifestyle/` … `28_Light_Technology/` (18 apps) |

*Note: duplicate prefix numbers (03/04/05/06) from parallel builds — dedupe planned.*

---

## Key apps → path → open URL

Paths below are under `HK Cirriculum/`. Prefix with `http://localhost:5173/` (static) or `http://localhost:3000/play/` (platform, requires `MODULES_ROOT=../HK Cirriculum`).

| App | Full path (from repo root) | Static URL (port 5173) | Platform play URL (port 3000) |
|-----|---------------------------|------------------------|-------------------------------|
| Subject directory | `HK Cirriculum/subjects/index.html` | http://localhost:5173/subjects/index.html | — |
| Junior Science F1 Lab Safety | `HK Cirriculum/Secondary_School/Junior Science/Form 1/01_Lab_Safety/` | http://localhost:5173/Secondary_School/Junior%20Science/Form%201/01_Lab_Safety/ | http://localhost:3000/play/Secondary_School/Junior%20Science/Form%201/01_Lab_Safety |
| Space Mission (F2) | `HK Cirriculum/Secondary_School/Junior Science/Form 2/30_Space_Mission/` | http://localhost:5173/Secondary_School/Junior%20Science/Form%202/30_Space_Mission/ | http://localhost:3000/play/Secondary_School/Junior%20Science/Form%202/30_Space_Mission |
| Fraction Pizza | `HK Cirriculum/Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share/` | http://localhost:5173/Secondary_School/Mathematics/Form%201/41_Fraction_Pizza_Share/ | http://localhost:3000/play/Secondary_School/Mathematics/Form%201/41_Fraction_Pizza_Share |
| Chem Rates (flagship) | `HK Cirriculum/Secondary_School/Chemistry/Form 5/01_Rates_Collision/` | http://localhost:5173/Secondary_School/Chemistry/Form%205/01_Rates_Collision/ | http://localhost:3000/play/Secondary_School/Chemistry/Form%205/01_Rates_Collision |
| Chem Kc (flagship) | `HK Cirriculum/Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/` | http://localhost:5173/Secondary_School/Chemistry/Form%205/09_Chemical_Equilibrium_Kc/ | http://localhost:3000/play/Secondary_School/Chemistry/Form%205/09_Chemical_Equilibrium_Kc |
| Chem Electrolysis | `HK Cirriculum/Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox/` | http://localhost:5173/Secondary_School/Chemistry/Form%205/04_Electrolysis_Sandbox/ | http://localhost:3000/play/Secondary_School/Chemistry/Form%205/04_Electrolysis_Sandbox |
| Chem Titration (F6) | `HK Cirriculum/Secondary_School/Chemistry/Form 6/02_Titration_Curve/` | http://localhost:5173/Secondary_School/Chemistry/Form%206/02_Titration_Curve/ | http://localhost:3000/play/Secondary_School/Chemistry/Form%206/02_Titration_Curve |
| Magnet Fun (P1) | `HK Cirriculum/Primary_School/General_Studies/P1/26_Magnet_Fun/` | http://localhost:5173/Primary_School/General_Studies/P1/26_Magnet_Fun/ | http://localhost:3000/play/Primary_School/General_Studies/P1/26_Magnet_Fun |
| Flag Raising (P1) | `HK Cirriculum/Primary_School/General_Studies/P1/29_Flag_Raising/` | http://localhost:5173/Primary_School/General_Studies/P1/29_Flag_Raising/ | http://localhost:3000/play/Primary_School/General_Studies/P1/29_Flag_Raising |
| F3 Force Bridge | `HK Cirriculum/Secondary_School/Junior Science/Form 3/05_Force_Motion_Bridge/` | http://localhost:5173/Secondary_School/Junior%20Science/Form%203/05_Force_Motion_Bridge/ | http://localhost:3000/play/Secondary_School/Junior%20Science/Form%203/05_Force_Motion_Bridge |

---

## Top 10 URLs (copy-paste)

**Static** (`npx serve "HK Cirriculum" -l 5173`):

1. http://localhost:5173/subjects/index.html
2. http://localhost:5173/Secondary_School/Junior%20Science/index.html
3. http://localhost:5173/Secondary_School/Junior%20Science/Form%201/01_Lab_Safety/
4. http://localhost:5173/Secondary_School/Junior%20Science/Form%202/30_Space_Mission/
5. http://localhost:5173/Secondary_School/Mathematics/Form%201/41_Fraction_Pizza_Share/
6. http://localhost:5173/Secondary_School/Chemistry/index.html
7. http://localhost:5173/Secondary_School/Chemistry/Form%205/01_Rates_Collision/
8. http://localhost:5173/Primary_School/General_Studies/P1/26_Magnet_Fun/
9. http://localhost:5173/Primary_School/General_Studies/P1/29_Flag_Raising/
10. http://localhost:5173/Secondary_School/Junior%20Science/Form%203/index.html

**Platform** (`MODULES_ROOT=../HK Cirriculum`, `npm run dev` in `hksteamai-platform`):

1. http://localhost:3000/library
2. http://localhost:3000/play/Secondary_School/Junior%20Science/Form%202/30_Space_Mission
3. http://localhost:3000/play/Secondary_School/Junior%20Science/Form%201/01_Lab_Safety
4. http://localhost:3000/play/Secondary_School/Mathematics/Form%201/41_Fraction_Pizza_Share
5. http://localhost:3000/play/Secondary_School/Chemistry/Form%205/01_Rates_Collision
6. http://localhost:3000/play/Secondary_School/Chemistry/Form%205/09_Chemical_Equilibrium_Kc
7. http://localhost:3000/play/Secondary_School/Chemistry/Form%205/04_Electrolysis_Sandbox
8. http://localhost:3000/play/Secondary_School/Chemistry/Form%206/02_Titration_Curve
9. http://localhost:3000/play/Primary_School/General_Studies/P1/26_Magnet_Fun
10. http://localhost:3000/play/Secondary_School/Junior%20Science/Form%203/05_Force_Motion_Bridge

---

## Why it looked like apps “disappeared”

| Symptom | Cause |
|---------|-------|
| Opened repo-root `Secondary_School/` | Only a redirect stub — real apps are under `HK Cirriculum/` |
| Looked in `subjects/index.html` for individual new apps | Hub links subjects only; new apps are in subject Form hubs |
| Library play 404 | `MODULES_ROOT` not set to `../HK Cirriculum` |
| Junior Science looked empty | ~60 apps were briefly stubbed during LGER migration; **rebuilt same session** |
| Fraction Pizza “missing” at P3 path | P3 folder is a redirect; canonical copy is **Form 1 Mathematics** |
| Le Chatelier / Haber / Kc_Kp look thin | `06_Le_Chatelier`, `07_Kc_Kp`, `08_Haber` are placeholders; flagship Kc is `09_Chemical_Equilibrium_Kc` |

---

## Gaps to fix next (optional)

1. Add Fraction Pizza to `Form 1/index.html` hub JSON
2. Set `MODULES_ROOT=../HK Cirriculum` in platform `.env` (document in README)
3. Normalize `curriculum-map.json` paths (strip `HK Cirriculum/` prefix) so library play links match proxy
4. Upgrade Chemistry placeholder flagships (`06`, `07`, `08`) or redirect to full siblings
5. Dedupe Form 3 duplicate prefix folders (`03_*`, `04_*`, etc.)

---

## Related docs

- `CEO_JUNIOR_SCIENCE_REBUILD_STATUS.md` — LGER rebuild log
- `JUNIOR_SCIENCE_PPT_TO_APP_MAP.md` — PPT → app mapping
- `hksteamai-platform/LOCAL_AUTH_SETUP.md` — register → library → play walkthrough
