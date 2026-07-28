# Launch Pack Gap Fix Report

**Date:** 2026-07-28  
**Workspace:** `HK Cirriculum/`  
**Tool:** `_tools/launch-pack-gap-fix.js`  
**QA:** `_tools/qa-check-all.py` (post-fix)

## Executive summary

Closed the three remaining launch-pack gaps after P0 (fleet BROKEN = 0). **Launch pack now 6/6 PASS** (`launchPass: true`). Soft-launch gate **GO** (`softGo: true`).

## Fixes applied

| Gap | Path | Before | After | Bytes |
|-----|------|--------|-------|------:|
| Fraction Pizza MISSING | `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share` | MISSING | **TFZ_LIKELY** | ~17.5 KB |
| Le Chatelier THIN | `Secondary_School/Chemistry/Form 6/01_Le_Chatelier` | THIN (lab only) | **TFZ_LIKELY** | ~20.3 KB |
| Titration THIN | `Secondary_School/Chemistry/Form 6/02_Titration_Curve` | THIN (lab only) | **TFZ_LIKELY** | ~19.8 KB |

### Fraction Pizza (Math STRONGER)

- Built under **Secondary_School/Mathematics** per math wedge strategy.
- Full **A1–A8** `LEARN_STEPS` + `LearnFromZero` ramp.
- **PizzaLab** dynamic manipulative: denominator slider, numerator shading, equivalent-fraction morph (×2 slices).
- Guided + Exam drill banks (bilingual prompts).
- Legacy Primary path `Primary_School/Mathematics/P3/41_Fraction_Pizza_Share` → redirect stub to Secondary canonical app.
- Launch-pack QA path updated in `_tools/qa-check-all.py` to Secondary location.

### Le Chatelier + Titration (full LGER/TFZ + dynamic lab)

- Upgraded from thin interactive-only shells to **Buffer-Systems / Kc pattern**:
  - `learn-from-zero.js` included
  - `LEARN_STEPS` A1–A8 with interactive checkpoints
  - **A6** embeds live sim: `ChamberLab` (Q vs K, T/P stress) / `TitrationLab` (live pH curve, SA/SB vs WA/SB, indicator)
  - Learn → Guided → Exam mode tabs + subscribe gate
- `_legacy_lger.html` retained for MCQ reference.

## QA after gap fix

| Metric | P0 after | Gap fix after |
|--------|----------|---------------|
| Launch pack | **4/6** FAIL | **6/6 PASS** |
| `Le_Chatelier` | THIN | TFZ_LIKELY |
| `Titration_Curve` | THIN | TFZ_LIKELY |
| `Fraction_Pizza_Share` | MISSING | TFZ_LIKELY |
| Kc A1–A8 | PASS | PASS |
| Soft-launch `softGo` | NO-GO | **GO** |
| Fleet BROKEN | 0 | 1* |

\*One unrelated BROKEN app appeared in full fleet scan (not launch-pack); track in `QA_CHECK_ALL.md`.

## Artifacts

- Generator: `HK Cirriculum/_tools/launch-pack-gap-fix.js`
- Updated QA: `QA_CHECK_ALL.md`, `_tools/_qa_check_all.json`
- Updated launch-pack path: `_tools/qa-check-all.py` (Fraction Pizza → Secondary Math)

## Re-run

```bash
node "HK Cirriculum/_tools/launch-pack-gap-fix.js"
python "HK Cirriculum/_tools/qa-check-all.py"
```
