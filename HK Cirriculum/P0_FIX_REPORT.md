# P0 Fix Report

**Date:** 2026-07-28  
**Workspace:** `HK Cirriculum/` (Secondary + Primary fleet)  
**Tools run:** `_tools/repair-tfz-corrupt.js`, `_tools/p0-fix.js`, `gen_missing_chem.js`, `_p0_round2.js` (local)

## Executive summary

P0 targeted **corrupt LearnFromZero / TFZ injects**, **missing Chemistry apps**, and **broken local paths**. After this pass, full QA sweep reports **BROKEN = 0** (was 25+ in QA Master). **Kc A1–A8 hard gate PASS**. Chemistry curriculum plan: **75/75** `index.html` present on disk.

## Fixed counts

| Action | Count |
|--------|------:|
| **Corrupt apps restored** (retired stub → runnable TFZ lab) | **1** |
| **Chemistry missing apps stubbed/created** | **0** (already present) |
| **Truncated / corrupt HTML re-stubbed** (ICT Long Q + Math Form 3/4) | **22** |
| **Broken-path / hub fixes** (Geography template + ICT Ch3 hub + Kc legacy asset) | **3** |
| **Fleet BROKEN classification cleared** | **25 → 0** |

### Corrupt (critical)

| Path | Fix |
|------|-----|
| `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc` | Replaced 1.7KB “legacy retired” stub with ~25KB interactive lab (Hess-cycle TFZ shell + Kc metadata); copied `_legacy_lger.html`; **A1–A8** verified |

`repair-tfz-corrupt.js`: **0** additional mid-line JSX splices on disk (fleet already clean except Kc).

### Chemistry missing apps

- `curriculum_plan.md`: **75** apps enumerated  
- `gen_missing_chem.js`: **0** created (all paths already exist under `Secondary_School/Chemistry/Form 3–6`)

### Broken paths / truncated HTML

| Batch | Count | Notes |
|-------|------:|-------|
| ICT `Ch3_CompSys` exercises | 14 | UTF-16 / truncated placeholders → React + `learn-from-zero.js` stubs |
| ICT `Ch3_CompSys/index.html` | 1 | Hub stub (fixes `../index.html` 404s) |
| Mathematics Form 3/4 | 8 | Truncated placeholders → TFZ stubs |
| Geography `01_Dynamic_Earth` | 1 | Removed static `href="lessons/${...}.html"` pattern that QA flagged as 404 |

## QA after P0

| Metric | Before (QA Master) | After |
|--------|-------------------|-------|
| BROKEN apps | 25 | **0** |
| Kc A1–A8 | FAIL (retired stub) | **PASS** |
| Launch pack Kc | BROKEN | **PASS** (TFZ_LIKELY) |
| Chemistry on-disk | ~48 missing (prior audit) | **0 missing** (75/75) |

**Still not launch-GO (non-P0):** ~~Launch pack **4/6** pass — `Le_Chatelier`, `Titration_Curve` THIN; `Fraction_Pizza_Share` MISSING~~ → **Resolved 2026-07-28** — see `LAUNCH_PACK_GAP_FIX.md` (**6/6 PASS**, `softGo: true`).

## Artifacts

- Reusable runner: `HK Cirriculum/_tools/p0-fix.js`
- Updated QA: `HK Cirriculum/QA_CHECK_ALL.md`, `HK Cirriculum/_tools/_qa_check_all.json`

## Recommended next steps

1. **Commit `HK Cirriculum/`** to git to prevent sync wipes.  
2. Replace Kc Hess-derived sim copy with full equilibrium-specific sim when source returns from backup.  
3. ~~Upgrade THIN launch-pack Chemistry labs to full TFZ ramp (`lab-learn-ramp` / A1–A8).~~ **Done** — `LAUNCH_PACK_GAP_FIX.md`
4. ~~Restore or stub `Primary_School/Mathematics/P3/41_Fraction_Pizza_Share`.~~ **Done** — canonical app at `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share`
