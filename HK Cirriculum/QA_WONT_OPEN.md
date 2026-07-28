# QA — Apps That Won't Open

**Generated:** 2026-07-28T18:37:17.434496+00:00
**Script:** `_tools/qa-fleet-all-apps.py` (OPEN-FAIL heuristics)

## CEO summary

> **Won't-open fleet: 10 / 1337 apps** · Auto-fixed this run: 0 · Repair squad handoff: top 10

## Count by failure class

| Failure class | Count |
|---------------|------:|
| `truncated` | 10 |
| `tiny_html_2k` | 10 |

## Top 20 paths (ranked P0)

1. `Secondary_School/Physics/3D_Solar_System` — **truncated; tiny_html_2k** (score 65)
2. `Secondary_School/Physics/Atomic Emission Spectra` — **truncated; tiny_html_2k** (score 65)
3. `Secondary_School/Physics/Bernoulli-Simulation` — **truncated; tiny_html_2k** (score 65)
4. `Secondary_School/Physics/Dopper's Effect` — **truncated; tiny_html_2k** (score 65)
5. `Secondary_School/Physics/Fraunhofer Lines` — **truncated; tiny_html_2k** (score 65)
6. `Secondary_School/Physics/Light Dispersion through a Prism` — **truncated; tiny_html_2k** (score 65)
7. `Secondary_School/Physics/Light Ray Diagram with Convex Len and Concave Len` — **truncated; tiny_html_2k** (score 65)
8. `Secondary_School/Physics/Parity Non-Conservation` — **truncated; tiny_html_2k** (score 65)
9. `Secondary_School/Physics/Photoelectric Effect` — **truncated; tiny_html_2k** (score 65)
10. `Secondary_School/Physics/Quantum Mechanics` — **truncated; tiny_html_2k** (score 65)

## Repair squad handoff — top 30

| # | Path | Score | Failure class(es) |
|---|------|------:|-------------------|
| 1 | `Secondary_School/Physics/3D_Solar_System` | 65 | truncated, tiny_html_2k |
| 2 | `Secondary_School/Physics/Atomic Emission Spectra` | 65 | truncated, tiny_html_2k |
| 3 | `Secondary_School/Physics/Bernoulli-Simulation` | 65 | truncated, tiny_html_2k |
| 4 | `Secondary_School/Physics/Dopper's Effect` | 65 | truncated, tiny_html_2k |
| 5 | `Secondary_School/Physics/Fraunhofer Lines` | 65 | truncated, tiny_html_2k |
| 6 | `Secondary_School/Physics/Light Dispersion through a Prism` | 65 | truncated, tiny_html_2k |
| 7 | `Secondary_School/Physics/Light Ray Diagram with Convex Len and Concave Len` | 65 | truncated, tiny_html_2k |
| 8 | `Secondary_School/Physics/Parity Non-Conservation` | 65 | truncated, tiny_html_2k |
| 9 | `Secondary_School/Physics/Photoelectric Effect` | 65 | truncated, tiny_html_2k |
| 10 | `Secondary_School/Physics/Quantum Mechanics` | 65 | truncated, tiny_html_2k |

## Heuristics

1. `index.html` < 2 KB **and** footer-only body (no React mount)
2. Absolute `/tiles/`, `/assets/`, `/src/`, `/vite.svg` (break under Vite dev @5173)
3. `LearnFromZero` double-declare (`learn-from-zero.js` + inline Babel def)
4. Missing `common/` script when `<LearnFromZero>` referenced
5. Stub GUIDED/EXAM (`"en": "g1"`) → Guided tab crash
6. Vite shell missing `./assets/*` or `./vite.svg`
7. `#root` present but no `createRoot` / module bundle

---
*See `QA_FLEET_ALL_APPS.json` for full fleet.*
