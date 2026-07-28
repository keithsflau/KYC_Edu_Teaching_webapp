# Language Team — General Studies MathI18n → NcsI18n bridge

**Date:** 2026-07-29  
**Agent:** 14/20 (CEO fleet — bridge second half of 480 skipped MathI18n apps)  
**Goal:** Every Primary General Studies lesson app shows the fleet **繁 + NCS Five** switcher top-right, without double language controls or HTML fleet injector.

## Problem

Fleet injector (`_tools/inject-ncs-i18n.js`) previously injected `data-ncs-kit="fleet-init"` into GS HTML as a workaround. That stacked on the legacy 10-language `<select>` and risked double `NcsI18n.init()` once a shared bridge existed.

| Cohort | MathI18n apps | NcsI18n delivery |
|--------|---------------|------------------|
| Primary Mathematics | **240** (+ hub) | **Bridged** via `Mathematics/common/i18n.js` |
| Primary General Studies | **240** (+ hub) | **Bridged** via `General_Studies/common/i18n.js` (this work) |
| Fleet total MathI18n | **480** | Both halves bridged |

## Strategy (mirrors Primary Math)

**Extend shared `MathI18n` in `General_Studies/common/i18n.js`** — one module update covers all 240 P1–P6 lesson apps. Reuses `common/math-i18n-ncs-bridge.js` (same loader as Math).

| Approach | Pros | Cons |
|----------|------|------|
| Fleet inject + CSS-hide old toggle | Per-file kit tags | 240 HTML edits; double-init risk |
| **Bridge in `i18n.js`** (chosen) | Single source file; sync `LanguageSelector` | Lesson `t{}` still EN/ZH until extended |
| Delete MathI18n entirely | Clean long-term | Breaks 10-lang lesson keys (ja, ko, …) |

### What users see

1. **Top-right:** `NcsI18n` fleet switcher — 繁體中文 + English + नेपाली + اردو + Filipino + हिन्दी  
2. **Hidden:** legacy 10-language `<select>` (replaced by hidden bridge `LanguageSelector`)  
3. **React apps:** `useState("zh")` syncs from `NcsI18n.onChange` via bridge `LanguageSelector`

## Files changed

| File | Role |
|------|------|
| `Primary_School/General_Studies/common/i18n.js` | Defines `MathI18n` with bridge `LanguageSelector`, `ncsToMathLang` / `mathToNcsLang`, enhanced `get()` |
| `common/math-i18n-ncs-bridge.js` | Shared async loader for `ncs-i18n.css`, `ncs-i18n.js`, `NcsI18n.init()` (reused from Math) |
| `Primary_School/General_Studies/P*/**/index.html` (×240) | Removed prior HTML fleet-inject blocks to avoid double-load |
| `_tools/_strip-gs-fleet-inject.js` | One-shot stripper for legacy fleet HTML on bridged GS apps |

All lesson apps reference the **same** `General_Studies/common/i18n.js` via `../../common/i18n.js`.

**Hub exception:** `Primary_School/General_Studies/index.html` does **not** load `common/i18n.js`; it keeps HTML fleet-init (1 app, not in bridge count).

## App counts

| Scope | Count | Notes |
|-------|------:|-------|
| **GS apps inheriting bridge** | **240** | P1–P6 lesson `index.html` with `../../common/i18n.js` |
| GS hub (fleet HTML only) | 1 | `General_Studies/index.html` — no `MathI18n` |
| GS total `index.html` | 241 | |
| Fleet HTML stripped from lessons | 240 | Prior `data-ncs-kit="fleet-init"` removed |

```bash
node "HK Cirriculum/_tools/_census-mathi18n-ncs.js"
# expect bySubject.General_Studies.mathI18n: 240
# expect i18nJs.generalStudies.hasBridge: true
```

## Language mapping

| NcsI18n code | MathI18n / `t{}` key | Lesson content |
|--------------|----------------------|----------------|
| `zh-Hant` | `zh` | Chinese strings in `t.title.zh`, etc. |
| `en` | `en` | English strings |
| `ne`, `ur`, `tl`, `hi` | `en` (fallback) | English until `NcsI18n.extendLegacyDict(t)` adds NCS keys |
| `ja`, `ko`, … (legacy Math codes) | unchanged if set manually | Still in `t{}` objects; not in NCS switcher |

`MathI18n.get("check", lang)` falls through to `NcsI18n.get()` for shared chrome when Math common strings lack the active code.

## Integration flow

```
index.html
  ├── react + react-dom
  ├── General_Studies/common/i18n.js     ← sync bridge LanguageSelector
  │     └── loads math-i18n-ncs-bridge.js
  │           └── loads common/ncs-i18n.css + ncs-i18n.js
  │                 └── NcsI18n.init({ mount: true, position: "top" })
  └── inline React app
        const { LanguageSelector, get } = window.MathI18n;
        const [lang, setLang] = useState("zh");
        … LanguageSelector syncs setLang from NcsI18n …
        … t.title[lang] …
```

## Fleet injector status after bridge

| Status | Count | Notes |
|--------|------:|-------|
| Bridged — Primary GS lessons | 240 | **No** fleet HTML inject on these apps |
| Bridged — Primary Math lessons | 240 | See `LANGUAGE_TEAM_MATHI18N_BRIDGE.md` |
| Fleet total MathI18n bridged | **480** | Complete |
| GS hub (HTML fleet only) | 1 | Not bridged; injector OK |

Do **not** run fleet inject on Primary GS lesson apps — bridge already loads kit. Re-injecting would double-load `NcsI18n`.

## Verification

**Smoke URLs (relative to repo):**

- Sample: `HK Cirriculum/Primary_School/General_Studies/P1/01_School_Tour/index.html`
- Sample: `HK Cirriculum/Primary_School/General_Studies/P6/60_Memories_Book/index.html`

Open locally — top-right NCS switcher, no 10-lang dropdown, no duplicate switchers.

## Related docs

- `LANGUAGE_TEAM_MATHI18N_BRIDGE.md` — Primary Math bridge (first half of 480)
- `LANGUAGE_TEAM_FLEET_INJECT.md` — fleet injector CLI
- `LANGUAGE_TEAM_NCS_PLAN.md` — canonical NCS kit
- `_shared/NCS_I18N_README.md` — `NcsI18n` API
