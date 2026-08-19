# Maths Verify Pass — Secondary Mathematics

**Phase:** PHASE 2 VERIFY (independent of rewrite)  
**Date:** 2026-07-20 22:40 +08:00  
**Prerequisite:** `ORIGINAL_DATA_PASS.md` Phase 1 complete (305 scanned; ~56 thorough / ~186 light)  
**Rule followed:** No further originality rewrites during this pass except fixing wrong maths.

---

## Scope checked

| Priority | Apps / suites | Method |
|----------|---------------|--------|
| Quiz banks | F1 BODMAS / Order Ops / Ratio / Linear seed; F2 L1–L6; F3 Quad×2, Area-Volume, Frustum; F4 Polynomials defaults | Hand recalc + Node cross-check |
| Formulae | F4 disc / quadratic formula; F3 similar 24-45-51; M2 Cramer / Gaussian | Algebraic check |
| Modelling consistency | Reservoir Mm³ **473** lab ↔ coach; LP `Z=5x+3y`; MTR rates; `selectScenario` | Code + numeric check |
| Light explorers | Spot-check only (live recalculation) | Sample |

---

## Results

### PASS (selected keys)

| Check | Result |
|-------|--------|
| F1 Order Ops `5+3×2³−(12÷4)` | **26** |
| F1 Ratio 84 @ 3:4 | **36 : 48** |
| F1 HCF/LCM 20,28 | HCF **4**, LCM **140** |
| F2 L2 class mark (162+171)/2 | **166.5** (answer index 2) |
| F2 L3 line `y=5x−7` through (3,8); slope `6x+8y−24=0` → **−3/4** | Keys match explanations |
| F2 L3 solver 5x+4y=37, 2x+3y=19 | **(5, 3)** |
| F2 L4 triples / √116≈10.8 | Keys + feedback aligned |
| F2 L5 scale / alloy / rate | **160 m**, **40 kg**, **35 /min** |
| F2 L6 tan 8/15 | **≈0.533** keyed true |
| F3/01 rectangle 35×5 | P=**24** |
| F3/02 rectangle 91×7 | P=**40** |
| F3/07 similar cones r 3→12, V=11 | **11×4³ = 704**; SA double → **×4** |
| F3/08 volume ratio h:5h | **(1/5)³ = 1:125** (key C) |
| F3 similar sides 24-45-51 | Pythagorean ✓ |
| F4 poly `x³−9x²+23x−15`, k=3 | **P(3)=0** |
| F4 disc `3x²−8x−3` | Δ=**100** |
| F4 formula `3x²−11x+6` | roots **3**, **2/3** |
| M2 Cramer `2x+5y=9`, `3x−y=5` | **(2, 1)** |
| M2 Gaussian → **(1, 3, 2)** | Matrix steps consistent with system |
| LP defaults x+y≤6, 2x+y≤9; Z=5x+3y | Optimum **(3, 3)**, Z=**24** |
| Reservoir lab + coach capacity | both **473** (10⁶ m³) |
| AI coach `selectScenario` | resets via `defaultParams(id)` |

### FAIL → fixed

| App | Issue | Fix |
|-----|-------|-----|
| **Form 3/08_Frustum_Similarity** | Quiz stem/options correctly used **1:125**, but success feedback still said `(1/4)³ = 1/64` (stale from prior draft) | Feedback → **`Correct! (1/5)^3 = 1/125`** |

No other wrong quiz keys found in the priority set.

---

## Doc nits (not maths errors)

- `ORIGINAL_DATA_PASS.md` Form 2 L5 note mentions ratio **1260**; on-disk seed is **840 @ 3:4:7** (parts still 180:240:420 scaled). Tracking doc only — quiz keys use independent figures and are correct.

---

## Residual risk

1. **~186 light-touch explorers** — answers are computed live; risk is UI label drift, not wrong hardcoded keys. Full UI walkthrough of every slider not done.
2. **Random quiz generators** (e.g. F2 L1 estimation) — keys are dynamic; not exhaustively sampled.
3. **Conceptual MCQs** (properties, definitions) — verified where numeric; wording-only items not re-pedagogically reviewed.
4. **M2 formula demos** without fixed Q&A — skipped as out of quiz-bank scope.

---

## Classroom verdict

**Safe for classroom use** on rewritten quiz-bearing apps after the frustum feedback fix. Modelling suite (reservoir Mm³, LP Z=24 at (3,3), coach scenario reset) is internally consistent. Residual risk is limited to unvisited light explorers, not known wrong answer keys.

**Pipeline order confirmed:** PHASE 1 rewrite completed and documented → PHASE 2 verify only → one maths fix applied → this report.
