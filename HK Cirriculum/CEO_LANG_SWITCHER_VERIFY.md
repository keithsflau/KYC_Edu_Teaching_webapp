# CEO Language Switcher — QA Verify (Fix 7)

**Date:** 2026-07-29  
**Agent:** QA Verify (Fix 7)  
**Mandate:** 逐個做 — honesty over speed. **Do NOT** count `has ncs-i18n.js` as pass.

## Pass criteria

| Check | Required |
|-------|----------|
| Code path | Switcher `onChange` / `ncs:langchange` → `applyUI` / `applyDom` / `setState` / `data-i18n` refresh |
| Chrome on NCS lang | Selecting **ne / ur / tl / hi** must **not** leave UI stuck in 繁中 |
| Acceptable fallback | NCS → **en** (not zh) when app lacks MT strings |
| Full NCS MT | Hub pages + Argument Tower + pricing pack block via `hub-i18n.json` |

## Kit sanity (shared)

| Check | Result |
|-------|--------|
| `_shared/ncs-i18n.js` ≡ `common/ncs-i18n.js` | **PASS** (SHA256 match) |
| `getPageBucket()` NCS fallback | **PASS** — `lang → en → zh` (not zh before en) |
| `preparePageStrings()` | **PASS** — merges `hub-i18n.json`; does not wipe `en` |
| `initHub()` onChange | **PASS** — `applyDataI18n` + `applyHubTitle` on every change |

---

## Sample 20 — results

| # | App | Board status | Verify | Code path | Notes |
|---|-----|--------------|--------|-----------|-------|
| 1 | `index.html` (home) | FIXED | **PASS** | `initHub` → `onChange` → `applyDom` on `[data-i18n]` | `hub-i18n.json` supplies ne/hi/ur/tl MT for nav, tagline, cards |
| 2 | `Primary_School/index.html` | FIXED | **PASS** | same hub pattern | NCS MT via hub merge |
| 3 | `Secondary_School/index.html` | FIXED | **PASS** | same hub pattern | NCS MT via hub merge |
| 4 | `parent-dashboard/index.html` | FIXED | **PASS** | same hub pattern | NCS MT via hub merge |
| 5 | `pricing/index.html` | FIXED | **PASS** | `ensureHub` → `registerStrings` → `ncs:langchange` → `refresh()` → `applyDataI18n` + `renderPlans` | Pack strings get NCS MT from `hub-i18n.json` (`packTitle`, `packBody`, …) |
| 6 | `Secondary_School/Chinese/argumentation_builder` | FIXED | **PASS** | `registerStrings(APP_STRINGS)` + `NcsI18n.onChange` + `applyUI()` + DOM events | Full 6-lang chrome; essay blocks stay zh (curriculum — OK) |
| 7 | `Chemistry/F5/09_Chemical_Equilibrium_Kc` | FIXED | **PASS** | `useLang()` → `NcsI18n.onChange` → `setLangZh(isZh())` → React re-render | NCS Five → **en** via `t(zh, en)`; chrome leaves 繁中 |
| 8 | `Chemistry/F6/01_Le_Chatelier` | FIXED | **PASS** | same `useLang` hook | en-fallback |
| 9 | `Chemistry/F6/02_Titration_Curve` | FIXED | **PASS** | same `useLang` hook | en-fallback |
| 10 | `Physics/F5/06_Circuit_Builder` | FIXED | **PASS** | same `useLang` hook | en-fallback |
| 11 | `Physics/F4/04_Gas_Laws_Lab` | FIXED | **PASS** | same `useLang` hook | en-fallback |
| 12 | `Mathematics/F1/41_Fraction_Pizza_Share` | FIXED | **PASS** | same `useLang` hook | en-fallback |
| 13 | `Primary_School/General_Studies/P1/26_Magnet_Fun` | VERIFY | **PASS** | `useMathLang()` → `bindNcsLangSync` → `NcsI18n.onChange` → `ncsToMathLang` → `setLang` | NCS → en (MathI18n has no ne/hi buckets); chrome updates |
| 14 | `Junior Science/F2/01_Photosynthesis` | BROKEN | **FAIL** | fleet-init mounts switcher only | `JSLGER.Shell` uses internal `isZh`; **no** `NcsI18n.onChange` bridge → chrome stays 繁中 |
| 15 | `Junior Science/F1/01_Lab_Safety` | BROKEN | **FAIL** | same JSLGER pattern | same root cause |
| 16 | `Junior Science/F2/30_Space_Mission` | BROKEN | **FAIL** | fleet-init only | P0 corrupt app + no refresh path |
| 17 | `Chemistry/F5/01_Rates_Collision` | BROKEN | **FAIL** | fleet-init only | Switcher present; React UI not wired |
| 18 | `Biology/F4/06_Photosynthesis` | BROKEN | **FAIL** | fleet-init only | Switcher present; no content refresh |
| 19 | `subjects/index.html` | BROKEN | **FAIL** | `mountSwitcher` only | All body copy hard-coded 繁中; no `initHub` / `data-i18n` |
| 20 | `Mathematics/F1/01_Directed_Numbers` | BROKEN | **FAIL** | fleet-init + local `useState("zh")` | NCS switcher does not update React `lang` state |

### Score

| Result | Count |
|--------|------:|
| **PASS** | 13 |
| **FAIL** | 7 |

---

## Escalate — next round (FAIL list)

Priority order for Fix 8+ agents:

| P | App / batch | Root cause | Required fix |
|---|-------------|--------------|--------------|
| **P0** | `subjects/index.html` | Hard-coded zh; switcher cosmetic | Convert to `initHub` + `data-i18n` + hub strings (same as home) |
| **P0** | `Junior Science/**` (~90 LGER apps) | `JSLGER.Shell` isolated from `NcsI18n` | Bridge in `common/junior-science-lger.js`: `NcsI18n.onChange` → Shell locale state; map NCS → en |
| **P1** | `Junior Science/F2/30_Space_Mission` | P0 corrupt + no i18n | Repair inject + add JSLGER bridge |
| **P1** | Fleet-inject Chem/Bio labs (e.g. Rates, Bio Photosynthesis) | React/static UI not wired | Adopt `useLang` + `LangSwitcher` pattern from 6-pack |
| **P1** | Math apps with local `useState(lang)` (e.g. Directed Numbers) | Dual lang state | Wire `NcsI18n.onChange` or migrate to `MathI18n.useMathLang` bridge |
| **P2** | 6-pack flagships | en-fallback only for NCS Five | Optional: embed ne/hi/ur/tl `APP_STRINGS` for chrome (Phase 2 MT) |

---

## What we did NOT count as pass

- Presence of `ncs-i18n.js` / `data-ncs-kit="fleet"` alone  
- Switcher dropdown changing while page text stays 繁中  
- `ncs-chrome.json` back-button only (lesson body unchanged)

## Tooling

Re-run audit:

```bash
python "HK Cirriculum/_tools/verify_lang_switcher.py"
```

---

*Verified by static code-path analysis. Manual browser spot-check recommended for hub hi/ne before classroom use.*
