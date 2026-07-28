# QA — TFZ Science Recheck

**Date:** 2026-07-28

## Scope
Re-sampled 21 apps including previously BROKEN list, Directed_Numbers, BioCycle, and Kc.

**Note:** The sibling agent's repair script (`QA_TFZ_REPAIR.md`) was not completed after reasonable wait time. QA was performed on whatever is currently on disk. **Repair is incomplete.**

## Results

| App | Grade | Reason |
|---|---|---|
| `Chemistry/Form 5/11_Entropy_Spontaneity` | **CORRUPT** | mid-line@58 |
| `Chemistry/Form 3/02_Atomic_Structure` | **CORRUPT** | mid-line@14 |
| `Chemistry/Form 4/10_Mole_Concept` | **CORRUPT** | mid-line@54 |
| `Chemistry/Form 4/05_Reactivity_Series` | **CORRUPT** | mid-line@49 |
| `Chemistry/Form 4/08_Polarity` | **CORRUPT** | mid-line@68 |
| `Chemistry/Form 5/07_Solubility_Product` | **CORRUPT** | mid-line@47 |
| `Biology/Form 6/01_Glucose_Homeostasis` | **CORRUPT** | mid-line@45 |
| `Physics/Form 5/01_EMF_Internal_R` | **CORRUPT** | mid-line@46 |
| `Mathematics/Form 1/01_Directed_Numbers` | **THIN** | Key ideas only |
| `Junior Science/Form 2/06_BioCycle` | **THIN** | Key ideas only |
| `Chemistry/Form 5/09_Chemical_Equilibrium_Kc` | **TFZ_REAL** | Kc A1-A8 PASS |
| `Chemistry/Form 3/01_States_of_Matter` | **CORRUPT** | mid-line@14 |
| `Chemistry/Form 6/01_Le_Chatelier` | **TFZ_REAL** | LearnFromZero + LEARN_STEPS |
| `Chemistry/Form 3/04_Chemical_Bonding` | **TFZ_REAL** | LearnFromZero + LEARN_STEPS |
| `Biology/Form 4/06_Photosynthesis` | **RUNS** | Loads but no TFZ |
| `Biology/Form 4/07_Cellular_Respiration` | **RUNS** | Loads but no TFZ |
| `Biology/Form 5/01_Enzyme_Kinetics` | **RUNS** | Loads but no TFZ |
| `Biology/Form 6/02_Punnett_Pedigree` | **RUNS** | Loads but no TFZ |
| `Physics/Form 6/02_Projectile_Motion` | **RUNS** | Loads but no TFZ |
| `Physics/Form 5/02_Wave_Interference` | **RUNS** | Loads but no TFZ |
| `Physics/Form 6/17_Simple_Harmonic_Motion` | **RUNS** | Loads but no TFZ |

## Summary

- **TFZ_REAL**: 3
- **THIN**: 2
- **RUNS**: 7
- **CORRUPT**: 9

**TFZ Pass Rate:** 14.3% (3/21)

---

## Honest CEO Verdict: Soft-launch Pack vs Fleet

The **soft-launch pack** (led by `09_Chemical_Equilibrium_Kc`) remains a verified **TFZ PASS**. It successfully implements the full `LearnFromZero` storyboard (A1-A8) with guided teach-before-test and correct science manipulatives.

However, the **fleet** is still in a broken state. The automated upgrade script injected corrupt JSX into many apps, breaking them completely (9 out of 21 sampled are CORRUPT). The remaining apps either just run without TFZ (RUNS) or only have basic Key ideas (THIN). Because the repair script was not completed, the fleet cannot be launched in its current state.

**Conclusion:** We can proceed with the soft-launch pack for the panel, but the fleet requires a full repair pass and manual QA before it can be considered TFZ compliant.