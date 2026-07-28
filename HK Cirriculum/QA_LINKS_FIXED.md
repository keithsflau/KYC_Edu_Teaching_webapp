# QA: Hub → App Links Fixed

**Date:** 2026-07-28  
**Scope:** Junior Science launch pack · Chemistry flagships · Primary GS P1 demos · platform `/play/` · marketing/parent featured links

## Summary

| Metric | Count |
|--------|------:|
| **Broken hub→app links fixed** | **1** |
| **Featured/demo hrefs added or corrected** | **12** |
| **Platform library play paths normalized** | **1,376** modules |
| **Launch-pack critical 404s remaining** | **0** |

## Root causes fixed

### 1. Platform `/play/` 404 (library)

- **Cause:** `curriculum-map.json` stored paths as `HK Cirriculum/Secondary_School/...` but the play proxy only accepts `Primary_School/` / `Secondary_School/` prefixes.
- **Fix:** `generate-curriculum-map.mjs` now scans **only** `HK Cirriculum/{Primary,Secondary}_School` and writes paths **without** the `HK Cirriculum/` prefix. Regenerated map: **1,376** modules, **0** `HK Cirriculum/` prefixes.
- **Safety net:** `moduleKey()` strips a leading `HK Cirriculum/` if present.
- **Env:** `MODULES_ROOT=../HK Cirriculum` verified in `.env` and `.env.example`.

### 2. Physics hub broken link

- **Cause:** `href="Dopper's Effect/index.html"` — the apostrophe terminated the HTML attribute early (`href="Dopper"` → 404).
- **Fix:** `href="Dopper&#39;s Effect/index.html"` in `Secondary_School/Physics/index.html`.

### 3. Physics flagship gap

- **Added** Flagship Labs section linking to:
  - `Form 4/01_Force_Motion/`
  - `Form 5/06_Circuit_Builder/`
  - `Form 4/04_Gas_Laws_Lab/`

### 4. Marketing + parent dashboard demos

- **Landing** (`marketing/site/landing/index.html`): 6 one-click demo cards (Space Mission, Fraction Pizza, Magnet Fun, Flag Raising, Force Motion, Rates Collision).
- **Parent dashboard** (`parent-dashboard/index.html`): 5 featured demo links (same launch pack minus Chemistry).

### 5. Curriculum home hub

- **Added** `subjects/index.html` card on `HK Cirriculum/index.html`.

## Verified launch-pack targets (all exist on disk)

| App | Path |
|-----|------|
| Space Mission | `Secondary_School/Junior Science/Form 2/30_Space_Mission/` |
| Fraction Pizza | `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share/` |
| Magnet Fun | `Primary_School/General_Studies/P1/26_Magnet_Fun/` |
| Flag Raising | `Primary_School/General_Studies/P1/29_Flag_Raising/` |
| Force Motion | `Secondary_School/Physics/Form 4/01_Force_Motion/` |
| Chem Rates | `Secondary_School/Chemistry/Form 5/01_Rates_Collision/` |
| Chem Kc | `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/` |
| Chem Electrolysis | `Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox/` |
| Chem Titration | `Secondary_School/Chemistry/Form 6/02_Titration_Curve/` |

## Hub audits (post-fix)

| Hub | Broken links |
|-----|-------------:|
| `subjects/index.html` | 0 |
| `Primary_School/index.html` | 0 |
| `Secondary_School/index.html` | 0 |
| Junior Science F1 / F2 / F3 | 0 |
| `Chemistry/index.html` (flagships) | 0 |
| `Physics/index.html` | 0 |
| `General_Studies/index.html` (P1 demos) | 0 |
| `marketing/site/landing/index.html` | 0 |
| `parent-dashboard/index.html` | 0 |

## How to smoke-test

```powershell
# Static (port 5173)
cd "c:\Users\keith\OneDrive\Github\Profile"
npx serve "HK Cirriculum" -l 5173
# → http://localhost:5173/Secondary_School/Junior%20Science/Form%202/30_Space_Mission/

# Platform (port 3000) — MODULES_ROOT=../HK Cirriculum in hksteamai-platform/.env
cd hksteamai-platform
npm run dev
# → http://localhost:3000/play/Secondary_School/Junior%20Science/Form%202/30_Space_Mission
```

## Files changed

- `hksteamai-platform/scripts/generate-curriculum-map.mjs`
- `hksteamai-platform/src/lib/entitlements.ts`
- `hksteamai-platform/data/curriculum-map.json` (regenerated)
- `HK Cirriculum/Secondary_School/Physics/index.html`
- `HK Cirriculum/marketing/site/landing/index.html`
- `HK Cirriculum/parent-dashboard/index.html`
- `HK Cirriculum/index.html`
