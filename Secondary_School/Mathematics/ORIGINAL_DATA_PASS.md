# Original Data Pass — Secondary Mathematics

**Date:** 2026-07-20  
**Goal:** Replace hardcoded exercise / quiz / default numbers with original pedagogically sound figures (not from Pearson Math in Action). Recalculate dependents. No commit in this pass.

**Inventory:** 305 lesson `index.html` apps under Form 1–6, M1, M2 (hub indexes excluded from rewrite).

## Pipeline

| Phase | Status | Timestamp |
|-------|--------|-----------|
| **PHASE 1 REWRITE** | **DONE** | 2026-07-20 (full-tree worker + tracking) |
| **PHASE 2 VERIFY** | **DONE** | 2026-07-20 22:40 +08:00 — see `MATHS_VERIFY_PASS.md` |

Phase 2 did **not** start until Phase 1 was marked complete. One maths fix applied in Phase 2 only (Frustum success feedback).

## Counts (aggregate)

| Category | Count | Notes |
|----------|------:|-------|
| Scanned | **305** | All lesson apps with `index.html` |
| Thorough rewrite (quiz / fixed Q&A / datasets) | **~56** | Quiz banks, worked examples, matrix demos, stats datasets |
| Light-touch (default seeds / sliders) | **~186** | Explorers with live recalculation |
| Skipped — verify-only (already original) | **8** | Modelling suite + companions |
| Skipped — no fixed numeric Q&A | **~55** | Random generators, pure converters, blank canvases, conceptual-only quizzes |
| Deferred / second-pass candidates | see below | |

Exact per-folder tallies from parallel streams (may double-count light vs thorough at boundaries):

| Folder | Scanned | Thorough | Light | Verified skip | Deferred/explorer |
|--------|--------:|---------:|------:|--------------:|------------------:|
| Form 1 | 41 | 22 | 11 | 1 | 7 |
| Form 2 L1–L6 | 6 | 6 | 0 | 0 | 0 |
| Form 2 numbered | 41 | 6 | 28 | 1 | 6 |
| Form 3 | 42 | 5 | 17 | 1 | ~19 |
| Form 4 | 39 | 1 | 14 | 1 | ~23 |
| Form 5 | 33 | 5 | 25 | 1 | 2 |
| Form 6 | 26 | 1 | 21 | 3 | 1 |
| M1 | 27 | 2 | 21 | 0 | 4 |
| M2 | 50 | 14 | 22 | 0 | 14 |

## Modelling suite (left consistent — verify-only)

| App | Status |
|-----|--------|
| Form 2/41_Modelling_Cycle | Original MTR rates (53/41/14/18/95) |
| Form 3/42_Reservoir_Security | Original capacity params |
| Form 4/39_Cyber_Risk_Model | Original phishing tree probs |
| Form 5/31_Energy_Grid_Model | Original supply mix |
| Form 6/26_AI_Modelling_Coach | Original scenarios; `selectScenario` same-click param reset preserved |
| Form 1/29_Estimation | Random jar; already original |
| Form 6/07_Linear_Prog_Optim | Already original staffing LP |
| Form 6/24_Stat_Misuse | Already original |

## Major changes by Form

### Form 1
BODMAS presets, HCF/LCM 20&28, prime root 84, profit/loss CP/SP, ratio 84 @ 3:4, pictogram/bar/pie/stat datasets, binary bits, fractions, rates, scale drawing — all new. Random explorers: seed-only nudges.

### Form 2 (L* labs — quiz priority)
- **L1:** measurement/rounding seeds; quiz remains random (answers dynamic)
- **L2:** class intervals 162–171, mark 166.5; data gen params shifted
- **L3:** solver (5,3); quiz line \(y=5x-7\), slope \(-3/4\)
- **L4:** triples (8,15,17)/(9,12,16); ramp √116; keys+feedback aligned
- **L5:** ratio seed **840@3:4:7** / gears; scale & alloy quiz recalculated
- **L6:** opp/adj 7/5; tan quiz ≈0.533  
Numbered 01–40: pie/histogram/freq/cum-freq/central datasets + slider seeds.

### Form 3
Quiz apps: rhombus/rectangle figures, similar-cone volume k=4 → **704**, sphere SA **×4**, frustum volume ratio **1:125**. Interest/coord/mensuration/tree defaults refreshed. Similar triangles use **24-45-51** (8-15-17×3).

### Form 4
Polynomials default \(x^3-9x^2+23x-15\), \(k=3\). Disc **3x²−8x−3**; quadratic formula **3x²−11x+6**. Box/hist/tree/simul/exp/log defaults refreshed.

### Form 5–6
Matrix/box/SD samples refreshed; AS/GS/perm defaults; triangle centers moved. Modelling/LP/stat-misuse/coach skipped.

### M1 / M2
SD + regression points; Bayes/CI seeds. Matrix suite: new det/inverse/Cramer/Gaussian with **recalculated** steps (Gaussian solution **(1,3,2)**). Eigen/vector/line/plane/logistic seeds updated.

## Second-pass recommended

1. Formula explorers that still show only live-computed output (add optional original quiz blocks if needed for integrity optics).
2. Form 3/06_Salary_Calc — IRD tax bands left as real public figures (not textbook exercises).
3. M2 formula demos: induction, Maclaurin UI, Argand, hyperbolics, Euler identity (mostly identity/formula, not fixed Q&A).
4. Any app that still embeds a famous triple **only as a worked exercise** (historical 勾股 mention in L4 Zhoubi section intentionally kept).

## Method notes

- Prefer non-cliché but clean secondary-friendly integers.
- Quiz keys, feedback, SVG labels, and coach tips recalculated with problem statements.
- Do **not** open Pearson PDFs to copy numbers.
- Temp scan helpers (`_scan_*.json`, `_light_touch_*.py`, `_rewrite_originality.mjs`) may be deleted after review.

See also: `MODELLING_AI_NSE_PLAN.md` (suite integrity statement); **`MATHS_VERIFY_PASS.md`** (Phase 2 independent maths QA).
