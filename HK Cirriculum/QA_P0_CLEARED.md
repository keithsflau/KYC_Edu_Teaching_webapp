# QA P0 Cleared — CEO Fleet

**Date:** 2026-07-28  
**Before:** P0 = 13 · **Soft-launch: NO-GO**  
**After:** P0 = 0 · **Soft-launch: GO** (1167/1313 PASS)

**Script:** `_tools/qa-fleet-all-apps.py` (re-run after fixes)  
**Fix tool:** `_tools/fix-p0-drills-and-vite.py`

---

## Summary

| Bucket | Before | After |
|--------|-------:|------:|
| P0 (FAIL) | 13 | **0** |
| PASS | 1157 | 1167 |
| WARN (P1) | 143 | 146 |
| Launch pack smoke | 6/6 | 6/6 |
| Random smoke | 21/21 | 21/21 |

**CEO verdict:** **GO** — all hard blockers cleared.

---

## Fixes applied (13 apps)

### 1. Biology F4/F5/F6 — stub GUIDED/EXAM → full bilingual MCQs (6 apps)

Replaced `{ "en": "g1", "zh": 1 }` placeholder banks with 6 Guided + 6 Exam items each (`id`, `level`, `q`, `qZh`, `opts` ≥ 4, `a`, `hint`). Physics / Cell Transport pattern.

| App | Path |
|-----|------|
| Heart & Double Circulation | `Secondary_School/Biology/Form 4/10_Cardiac_Cycle` |
| Osmosis Sandbox | `Secondary_School/Biology/Form 4/12_Osmosis_Sandbox` |
| Genetics Punnett | `Secondary_School/Biology/Form 5/04_Genetics_Punnett` |
| Ecosystem Energy Flow | `Secondary_School/Biology/Form 5/10_Energy_Flow` |
| Food Web Builder | `Secondary_School/Biology/Form 5/13_Ecology_Food_Web` |
| Nephron & Osmoregulation | `Secondary_School/Biology/Form 6/11_Nephron_Osmoregulation` |

### 2. Chemistry F4/F5 — same drill fix (4 apps)

| App | Path |
|-----|------|
| Reactivity Series Lab | `Secondary_School/Chemistry/Form 4/05_Reactivity_Series` |
| Rusting & Protection | `Secondary_School/Chemistry/Form 4/06_Rusting_Protection` |
| Rate & Collision Theory | `Secondary_School/Chemistry/Form 5/01_Rates_Collision` |
| Redox & Electrolysis | `Secondary_School/Chemistry/Form 5/02_Redox_Electrolysis` |

### 3. Biology Vite shells — dist sync + vite.svg + playable index (3 apps)

| App | Path | Actions |
|-----|------|---------|
| Allopatric speciation | `Secondary_School/Biology/apps/allopatric-speciation` | `vite.svg` at root + `dist/`; `dist/assets/` → `assets/`; index refreshed from build |
| Energy flow | `Secondary_School/Biology/apps/energy-flow` | same |
| Immune response | `Secondary_School/Biology/apps/immune-response` | same |

**P0 resolved:** `broken_ref:./vite.svg` (missing icon + unresolved local refs).  
**P1 note:** root `index.html` still &lt; 3 KB (`thin_stub`) for Vite shells — cosmetic only; app loads via synced `./assets/*`.

---

## Verification

```text
python "HK Cirriculum/_tools/qa-fleet-all-apps.py"
→ scanned: 1313, FAIL: 0, p0: 0, verdict: GO
```

- No `"en": "g1"` in any of the 10 repaired `index.html` files.
- Guided / Exam tabs render 4-option MCQs; `item.opts.map` no longer throws.
- Vite trio: `./vite.svg` and `./assets/*` resolve on disk.

---

## Remaining (non-blocking)

- **P1:** 145 apps flagged `thin_stub` or similar (mostly Primary Chinese shells, Biology `apps/*` Vite entry HTML &lt; 3 KB).
- **Legacy archives:** `_legacy_lger.html` / `_legacy_thin_learn.html` still contain old stub pattern — not scanned as fleet apps (hub `index.html` is canonical).

---

## Manual smoke (recommended before demo)

Per repaired LGER app: open → **Learn** (interact) → **Guided** (first MCQ + Hint) → **Exam** (complete set).

Per Vite app: open `index.html` → React app mounts, no 404 on `./assets/*` or `./vite.svg`.
