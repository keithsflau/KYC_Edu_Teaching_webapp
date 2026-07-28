# QA Fleet — All Apps

**Generated:** 2026-07-28T18:37:17.434496+00:00
**Script:** `_tools/qa-fleet-all-apps.py`

## Checks (hard QA)

1. UTF-8 + `<meta charset="UTF-8">` in `<head>`
2. No `visit-counter` references
3. Footer `@HKSTEAMAI All Copy-Right Reserved.` (or shared shell)
4. No stub GUIDED/EXAM drills (`"en": "g1"` / missing `opts`)
5. No undefined `LearnFromZero` / corrupt TFZ mid-JSX inject
6. `common/` script paths resolve
7. Local `href`/`src` resolve on disk (incl. `dist/` vite builds)
8. File size stub gate (<3 KB suspicious)
9. **OPEN-FAIL:** tiny HTML, footer-only shell, abs `/assets|/tiles|/src`, missing Vite bundle, React no-mount, LFZ double-declare, css-only shell
10. Smoke: 15 random + all 6 launch-pack apps (HTTP 200 @ localhost:5173)

## Summary

| Metric | Count |
|--------|------:|
| **Total apps scanned** | **1337** |
| PASS | 1271 |
| FAIL (P0) | 11 |
| WARN (P1/P2) | 55 |
| P0 bucket | 11 |
| P1 bucket | 39 |
| P2 bucket | 16 |

## CEO one-line verdict

> **Soft-launch: NO-GO** · 1271/1337 PASS · P0=11 · Launch pack 6/6

## Launch pack

| Path | Status | Smoke | Issues |
|------|--------|-------|--------|
| `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc` | PASS | disk | — |
| `Secondary_School/Chemistry/Form 6/01_Le_Chatelier` | PASS | disk | — |
| `Secondary_School/Chemistry/Form 6/02_Titration_Curve` | PASS | disk | — |
| `Secondary_School/Physics/Form 5/06_Circuit_Builder` | PASS | disk | — |
| `Secondary_School/Physics/Form 4/04_Gas_Laws_Lab` | PASS | disk | — |
| `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share` | PASS | disk | — |

## Platform (`hksteamai-platform`)

- **curriculum-map.json:** OK
- **library/page.tsx:** OK
- **entitlements.ts:** OK

## Smoke sample (21 apps)

- Server: down — disk existence only
- Passed: **21/21**

## Top 20 P0 — repair squad

1. `Secondary_School/Junior Science/Form 2/30_Space_Mission` — tfz_corrupt_inject@L529
2. `Secondary_School/Physics/3D_Solar_System` — truncated; thin_stub; footer_missing; tiny_html_2k
3. `Secondary_School/Physics/Atomic Emission Spectra` — truncated; thin_stub; footer_missing; tiny_html_2k
4. `Secondary_School/Physics/Bernoulli-Simulation` — truncated; thin_stub; footer_missing; tiny_html_2k
5. `Secondary_School/Physics/Dopper's Effect` — truncated; thin_stub; footer_missing; tiny_html_2k
6. `Secondary_School/Physics/Fraunhofer Lines` — truncated; thin_stub; footer_missing; tiny_html_2k
7. `Secondary_School/Physics/Light Dispersion through a Prism` — truncated; thin_stub; footer_missing; tiny_html_2k
8. `Secondary_School/Physics/Light Ray Diagram with Convex Len and Concave Len` — truncated; thin_stub; footer_missing; tiny_html_2k
9. `Secondary_School/Physics/Parity Non-Conservation` — truncated; thin_stub; footer_missing; tiny_html_2k
10. `Secondary_School/Physics/Photoelectric Effect` — truncated; thin_stub; footer_missing; tiny_html_2k
11. `Secondary_School/Physics/Quantum Mechanics` — truncated; thin_stub; footer_missing; tiny_html_2k

## P1 — thin / stub content (39)

- `Primary_School/English/English_Vocabulary` (2125 B) — thin_stub
- `Primary_School/Mathematics/P3/41_Fraction_Pizza_Share` (1928 B) — thin_stub; tiny_html_2k
- `Primary_School/PrimaryChinese/story_dice` (2176 B) — thin_stub
- `Secondary_School/Biology/Form 6` (1941 B) — thin_stub; tiny_html_2k
- `Secondary_School/Biology/apps/action-potential` (2278 B) — thin_stub
- `Secondary_School/Biology/apps/allopatric-speciation` (2283 B) — thin_stub
- `Secondary_School/Biology/apps/antibiotic-resistance` (2283 B) — thin_stub
- `Secondary_School/Biology/apps/cell-cycle-mitosis` (2279 B) — thin_stub
- `Secondary_School/Biology/apps/cellular-respiration` (2282 B) — thin_stub
- `Secondary_School/Biology/apps/cholinergic-synapse` (2281 B) — thin_stub
- `Secondary_School/Biology/apps/energy-flow` (2273 B) — thin_stub
- `Secondary_School/Biology/apps/enzyme-kinetics` (2277 B) — thin_stub
- `Secondary_School/Biology/apps/flowering-plants-reproduction` (2291 B) — thin_stub
- `Secondary_School/Biology/apps/fluid-mosaic-model` (2280 B) — thin_stub
- `Secondary_School/Biology/apps/gel-electrophoresis` (2281 B) — thin_stub
- `Secondary_School/Biology/apps/genetics-punnett-pedigree` (2287 B) — thin_stub
- `Secondary_School/Biology/apps/glucose-regulation` (2280 B) — thin_stub
- `Secondary_School/Biology/apps/immune-response` (2277 B) — thin_stub
- `Secondary_School/Biology/apps/mechanisms-of-movement` (2284 B) — thin_stub
- `Secondary_School/Biology/apps/meiosis-simulation` (2185 B) — thin_stub
- `Secondary_School/Biology/apps/menstrual-cycle` (2277 B) — thin_stub
- `Secondary_School/Biology/apps/muscle-contraction` (2280 B) — thin_stub
- `Secondary_School/Biology/apps/oxygen-dissociation` (2281 B) — thin_stub
- `Secondary_School/Biology/apps/photosynthesis` (2276 B) — thin_stub
- `Secondary_School/Biology/apps/protein-synthesis` (2279 B) — thin_stub
- `Secondary_School/Biology/apps/recombinant-dna` (2277 B) — thin_stub
- `Secondary_School/Biology/apps/translocation-in-phloem` (2285 B) — thin_stub
- `Secondary_School/Biology/apps/transpiration-lab` (2279 B) — thin_stub
- `Secondary_School/Physics/Form 5/03_Lenses_Optics` (2141 B) — thin_stub
- `Secondary_School/Physics/Topics/01_Heat_and_Gases` (3000 B) — thin_stub
- `Secondary_School/Physics/Topics/03_Wave_Motion/Prism_Dispersion` (2165 B) — thin_stub
- `Secondary_School/Physics/Topics/04_Electricity_and_Magnetism` (3067 B) — thin_stub
- `Secondary_School/Physics/Topics/05_Radioactivity_and_Nuclear_Energy` (2916 B) — thin_stub
- `Secondary_School/Physics/Topics/05_Radioactivity_and_Nuclear_Energy/Parity_Non_Conservation` (2031 B) — thin_stub; tiny_html_2k
- `Secondary_School/Physics/Topics/06_Astronomy_and_Space_Science` (2379 B) — thin_stub
- `Secondary_School/Physics/Topics/07_Atomic_World` (3060 B) — thin_stub
- `Secondary_School/Physics/Topics/07_Atomic_World/Atomic_Emission_Spectra` (2041 B) — thin_stub; tiny_html_2k
- `Secondary_School/Physics/Topics/08_Energy_and_Use_of_Energy` (1674 B) — thin_stub; tiny_html_2k
- `Secondary_School/Physics/Topics/09_Medical_Physics` (1628 B) — thin_stub; tiny_html_2k

## P2 — cosmetic (16)

- `Primary_School` — visit_counter_ref; footer_missing
- `Primary_School/PrimaryChinese/Rhetoric_Defense` — visit_counter_ref
- `Primary_School/PrimaryChinese/idiom_asteroids` — visit_counter_ref
- `Primary_School/PrimaryChinese/idiom_mood_board` — visit_counter_ref
- `Primary_School/PrimaryChinese/millionaire` — visit_counter_ref
- `Primary_School/PrimaryChinese/particle-bridge-game` — visit_counter_ref
- `Primary_School/PrimaryChinese/poetry_royale` — visit_counter_ref
- `Primary_School/PrimaryChinese/radical_bubble_chemistry` — visit_counter_ref
- `Primary_School/PrimaryChinese/railshooter` — visit_counter_ref
- `Primary_School/PrimaryChinese/rhetoric_factory` — visit_counter_ref
- `Primary_School/PrimaryChinese/typo_mole` — visit_counter_ref
- `Primary_School/PrimaryChinese/typo_surgeon` — visit_counter_ref
- `Primary_School/PrimaryChinese/word_rain` — visit_counter_ref
- `Secondary_School` — visit_counter_ref; footer_missing
- `Secondary_School/Chinese` — visit_counter_ref
- `Secondary_School/Chinese/couplet_duel` — visit_counter_ref

---
*Elapsed: 39s*
