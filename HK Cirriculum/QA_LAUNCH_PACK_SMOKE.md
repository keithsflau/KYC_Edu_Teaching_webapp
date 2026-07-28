# Launch pack smoke QA

**When:** 2026-07-28 (local)  
**Static server:** `http://localhost:5173` — already running (`serve` on `HK Cirriculum`); no restart required.  
**Platform:** `http://localhost:3000/library` — up at time of check.

## HTTP GET (5173)

| Resource | URL | Status |
|----------|-----|--------|
| Subjects hub | `/subjects/index.html` | **200** |
| Junior Science F2 — Space Mission | `/Secondary_School/Junior%20Science/Form%202/30_Space_Mission/index.html` | **200** |
| General Studies P1 — Flag Raising | `/Primary_School/General_Studies/P1/29_Flag_Raising/index.html` | **200** |
| General Studies P1 — Magnet Fun | `/Primary_School/General_Studies/P1/26_Magnet_Fun/index.html` | **200** |
| Physics F4 — Force & Motion | `/Secondary_School/Physics/Form%204/01_Force_Motion/index.html` | **200** |
| Chemistry F5 — Chemical Equilibrium Kc | `/Secondary_School/Chemistry/Form%205/09_Chemical_Equilibrium_Kc/index.html` | **200** |
| Chemistry F5 — Rates & Collision | `/Secondary_School/Chemistry/Form%205/01_Rates_Collision/index.html` | **200** |
| Chemistry F6 — Titration Curve | `/Secondary_School/Chemistry/Form%206/02_Titration_Curve/index.html` | **200** |
| Chemistry F6 — Le Chatelier | `/Secondary_School/Chemistry/Form%206/01_Le_Chatelier/index.html` | **200** |
| Mathematics F1 — Fraction Pizza Share | `/Secondary_School/Mathematics/Form%201/41_Fraction_Pizza_Share/index.html` | **200** |
| Parent dashboard | `/parent-dashboard/index.html` | **200** |
| Marketing landing | `/marketing/site/landing/index.html` | **200** |

## Platform (3000)

| Resource | URL | Status |
|----------|-----|--------|
| Library | `http://localhost:3000/library` | **200** |

## Summary

| Check | Result |
|-------|--------|
| All launch-pack demo URLs (5173) | **PASS** (12/12 → 200) |
| Platform library (3000) | **PASS** (200) |
| Overall smoke | **PASS** |

## Physics `"en": "g1"` stub grep (fleet-wide Secondary)

Searched:

- `Reference/Secondary/**/Physics/**` (`*.md`, `*.json`)
- `HK Cirriculum/Secondary_School/Physics/**` (`*.html`, `*.js`)
- Full-repo pattern: `"en": "g1"`

**Remaining matches:** **0** (none found).

