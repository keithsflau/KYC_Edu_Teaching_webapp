# CEO Language Switcher Board

**Created:** 2026-07-29  
**Owner:** CEO Watchdog  
**Mandate:** 全站既語言 switcher 必須 work！！逐個驗！！

**Verify report:** [`CEO_LANG_SWITCHER_VERIFY.md`](CEO_LANG_SWITCHER_VERIFY.md) (Fix 7, sample 20)  
**False FIXED audit:** [`CEO_FALSE_CLAIMS_AUDIT.md`](CEO_FALSE_CLAIMS_AUDIT.md) (2026-07-29 — Circuit Constructor blank)

---

## Root-cause categories (fleet-wide)

| ID | Pattern | Symptom | Fix |
|----|---------|---------|-----|
| **A** | Hub / kit fallback bug | NCS langs showed 繁中 | Fixed in `_shared/ncs-i18n.js` (`getPageBucket`: en before zh) |
| **B** | Fleet-inject only | Switcher mounts; content stuck zh | Wire `onChange` → app re-render |
| **C** | JSLGER Shell isolation | Junior Science: NCS + hidden EN/中; NCS does nothing | Library has `useLangSync` — **user-visible NOT fixed** while apps blank or VERIFY FAIL |
| **D** | React local lang state | Math legacy apps ignore fleet switcher | `useMathLang` / `useLang` bridge |
| **E** | Hard-coded HTML | `subjects/index.html` etc. | `initHub` + `data-i18n` |
| **F** | Missing game script | Argument Tower script dropped in migration | Restore + `APP_STRINGS` (done) |
| **G** | **Broken inline JS (batch generator)** | NCS switcher visible; `#root` empty forever | **P0 BLANK FAIL** — fix unterminated strings / migrate off broken Babel blobs |

---

## Required fix pattern (every sibling)

1. Embed strings: `zh`, `en`, `ne`, `ur`, `tl`, `hi` (or hub-i18n merge for pages).
2. `NcsI18n.onChange` (or `ncs:langchange`) → **re-render ALL visible chrome**.
3. NCS missing keys → **en**, never zh.
4. Curriculum essay/TFZ body may stay zh if labeled; **chrome MUST switch**.
5. **Page must render** — switcher alone is not a pass.

---

## Priority queue

| # | App | Status | Verify (Fix 7) | Owner / next |
|---|-----|--------|----------------|--------------|
| 1 | `_shared/ncs-i18n.js` + `common/` sync | **FIXED** | PASS (kit) | Fix 1 |
| 2 | `index.html` | **FIXED** | **PASS** | ✓ |
| 3 | `Primary_School/index.html` | **FIXED** | **PASS** | ✓ |
| 4 | `Secondary_School/index.html` | **FIXED** | **PASS** | ✓ |
| 5 | `parent-dashboard/index.html` | **FIXED** | **PASS** | ✓ |
| 6 | `pricing/index.html` | **FIXED** | **PASS** | ✓ |
| 7 | `Chinese/argumentation_builder` | **FIXED** | **PASS** | Fix 5 |
| 8 | `Junior Science/F2/01_Photosynthesis` | **P0 BLANK FAIL** | **FAIL** (Fix 7) | Broken inline JS on HEAD; lang irrelevant until mount works |
| 9 | `Chemistry/F5/09_Chemical_Equilibrium_Kc` | **FIXED** | **PASS** (en-fallback) | Fix 4 |
| 10 | `Chemistry/F6/01_Le_Chatelier` | **FIXED** | **PASS** (en-fallback) | Fix 4 |
| 11 | `Chemistry/F6/02_Titration_Curve` | **FIXED** | **PASS** (en-fallback) | Fix 4 |
| 12 | `Physics/F5/06_Circuit_Builder` | **FIXED** | **PASS** (en-fallback) | Fix 4 |
| 13 | `Physics/F4/04_Gas_Laws_Lab` | **FIXED** | **PASS** (en-fallback) | Fix 4 |
| 14 | `Mathematics/F1/41_Fraction_Pizza_Share` | **FIXED** | **PASS** (en-fallback) | Fix 4 |
| 15 | `subjects/index.html` | **BROKEN** | **FAIL** | Fix 1 follow-up |
| 16 | `Junior Science/**` (batch, F1–F3 LGER) | **P0 BLANK FAIL** | **FAIL** (sample) | Do not mark FIXED/VERIFY — see audit |
| 17 | `Primary Math + GS` (MathI18n) | **VERIFY** | PASS (Magnet Fun sample) | Fix 6 |
| 18 | `Chinese/**` (except Argument Tower) | **BROKEN** | — | Fix 5 |
| 19 | Chem/Bio/Phys fleet-inject labs | **BROKEN** | FAIL (sample) | Fix 8 |
| 20 | `Mathematics/F1/01_Directed_Numbers` | **BROKEN** | **FAIL** | Fix 6 |
| 21 | `Junior Science/F2/07_Circuit_Constructor` | **P0 BLANK FAIL** | **FAIL** | HEAD: `createRoot` on `#root` but Babel block does not parse → blank |
| 22 | `Junior Science/F2/30_Space_Mission` | **P0 BLANK FAIL** | **FAIL** | Corrupt strings + no working app shell on HEAD |

**Legend:** FIXED = verified done · VERIFY = QA in progress · BROKEN / **P0 BLANK FAIL** = not classroom-ready

---

## Sample enrichment apps (CEO_SAMPLE) — not “done”

| App | Board | Notes |
|-----|-------|-------|
| `F2/07_Circuit_Constructor` | **P0 BLANK FAIL** | Claimed enriched; user sees blank on HEAD |
| `F2/01_Photosynthesis` | **P0 BLANK FAIL** | Same broken-batch pattern |
| `F2/03_Gas_Exchange` | **P0 BLANK FAIL** | Same |
| `F2/09_Safety_House` | **P0 BLANK FAIL** | Same |
| `F2/12_pH_Scale` | **P0 BLANK FAIL** | Same |

Uncommitted WIP (vanilla `#app` rebuilds) may fix mount — **not shipped until committed + browser PASS**.

---

## Fix 7 verify summary (2026-07-29)

| Metric | Value |
|--------|------:|
| Sample tested | 20 |
| PASS | 13 |
| FAIL | 7 |
| False pass avoided | All fleet-inject-only apps marked FAIL |

**Escalated for next round:** see FAIL table in [`CEO_LANG_SWITCHER_VERIFY.md`](CEO_LANG_SWITCHER_VERIFY.md).

---

## Next actions

1. **P0:** Repair or replace broken F2 (and fleet) inline JS — **blank before lang**.
2. **Fix 8:** `subjects/index.html` → hub pattern (P0).
3. **Fix 2:** Re-verify Junior Science only after apps **render** in browser; library bridge alone is insufficient.
4. **Fix 6:** Math legacy `useState(lang)` sweep.
5. **Fix 8:** Chem/Bio fleet-inject labs → `useLang` flagships.
6. Re-run Fix 7 verify on each row before marking VERIFY → PASS.

---

*Board updated 2026-07-29 after CEO_FALSE_CLAIMS_AUDIT (Circuit Constructor blank). Do not mark fleet fixed without VERIFY column and browser render.*
