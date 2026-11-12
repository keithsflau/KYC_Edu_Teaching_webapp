# Language Team — MathI18n → NCS Six bridge

**Date:** 2026-07-29  
**CEO mandate:** Every MathI18n app shows the fleet **NCS Six** switcher (zh-Hant + en/ne/ur/tl/hi) **top-right**, with legacy 10-lang / EN-ZH toggles hidden.

## Scope

Apps that load `common/i18n.js` and expose `window.MathI18n`:

| Subject | Path | Apps |
|---------|------|-----:|
| Primary Mathematics | `Primary_School/Mathematics/**` | 240 |
| Primary General Studies | `Primary_School/General_Studies/**` | 240 |
| **Total MathI18n fleet** | | **480** |

These 480 were previously **skipped** by the first fleet injector pass to avoid double switchers. They are now included via a **two-layer bridge**.

## Architecture

```
index.html
  └─ <script src="…/common/i18n.js">     ← MathI18n API + LanguageSelector bridge
       └─ loads common/math-i18n-ncs-bridge.js
            └─ loads common/ncs-i18n.js + ncs-i18n.css
            └─ NcsI18n.init({ chromePath: _shared/ncs-chrome.json, target: body })

index.html (lesson apps — bridge-only after 2026-07-29 GS pass)
  └─ no data-ncs-kit block; i18n.js bridge loads NCS kit

index.html (hub / legacy — optional fleet layer)
  └─ data-ncs-kit="fleet" + fleet-init     ← GS hub only; Math hubs may still have fleet HTML
```

### Shared files

| File | Role |
|------|------|
| `Primary_School/Mathematics/common/i18n.js` | MathI18n dict + `LanguageSelector` → `NcsI18n.onChange` sync |
| `Primary_School/General_Studies/common/i18n.js` | Same bridge (title strings differ) |
| `common/math-i18n-ncs-bridge.js` | Loads NCS kit; mounts top-right switcher |
| `common/ncs-i18n.js` / `ncs-i18n.css` | Fleet NCS kit |
| `_shared/ncs-chrome.json` | Switcher chrome strings |

### Language mapping

MathI18n uses 10 codes (`en`, `zh`, `ja`, …). NCS Six uses `zh-Hant` + five NCS codes.

| NCS code | MathI18n code |
|----------|---------------|
| `zh-Hant` | `zh` |
| `en`, `ja`, `ko`, … | same where supported |
| `ne`, `ur`, `tl`, `hi` | fall back to `en` for lesson `t{}` blocks |

`ncsToMathLang()` / `mathToNcsLang()` in each `i18n.js` handle the mapping. `MathI18n.get()` falls through to `NcsI18n.get()` for shared chrome keys.

### Legacy toggle hiding

When NCS mounts, duplicate controls are hidden via CSS:

```css
.math-i18n-lang-hidden,
.math-i18n-toggle { display: none !important; }
```

Fleet inject also adds (for EN/中 header buttons and old fixed selectors):

```css
body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet { display: none !important; }
```

`LanguageSelector` renders a hidden stub with classes `math-i18n-lang-hidden math-i18n-toggle` and subscribes to `NcsI18n.onChange` to call `props.setLang`.

## Fleet counts (2026-07-29)

| Metric | Count |
|--------|------:|
| MathI18n apps scanned | **480** |
| — Primary Mathematics | 240 |
| — Primary General Studies | 240 |
| NCS kit in `index.html` (`data-ncs-kit`) | **480** |
| `i18n.js` with NCS bridge | **2** (one per subject) |
| Apps missing NCS entirely | **0** |
| Previously skipped (v1 fleet inject) | **480** → bridged |

### This pass

| Action | Count |
|--------|------:|
| GS fleet NCS injected (`inject-ncs-i18n.js --filter General_Studies`) | **240** |
| Math fleet NCS (already present) | 240 |
| `General_Studies/common/i18n.js` bridged to `NcsI18n` | 1 file → 240 apps |
| `Mathematics/common/i18n.js` bridge hardened (`.math-i18n-toggle`) | 1 file → 240 apps |
| `math-i18n-ncs-bridge.js` fixed (`_shared/ncs-chrome.json`, `isInitialized`) | 1 file |

Re-verify:

```bash
node "HK Cirriculum/_tools/_census-mathi18n-ncs.js"
node "HK Cirriculum/_tools/inject-math-i18n-bridge.js" --json
```

## How to run

```bash
# Census — MathI18n vs NCS coverage
node "HK Cirriculum/_tools/_census-mathi18n-ncs.js"

# Ensure fleet NCS snippet on any MathI18n app still missing it
node "HK Cirriculum/_tools/inject-math-i18n-bridge.js" --apply

# Full fleet inject (includes MathI18n; idempotent)
node "HK Cirriculum/_tools/inject-ncs-i18n.js" --apply
```

## App author notes

- Keep using `LanguageSelector` + `useState("zh")` — no per-app edits required.
- Lesson strings in `const t = { key: { en, zh, … } }` still drive content; NCS five-lang keys are phase-2.
- Do **not** add a second language `<select>` or EN/中 header toggle.

## Limitations

1. **Lesson content** — selecting Nepali/Urdu/Hindi shows English fallbacks until `t{}` blocks add `ne`/`ur`/`hi` keys.
2. **Double NCS load** — GS lesson apps use bridge-only; Math lessons may still have fleet HTML + bridge (`NcsI18n.isInitialized()` prevents double mount).
3. **Vite `dist/`** — bridge applies to source `index.html` only; rebuild after inject.

## Related docs

- `LANGUAGE_TEAM_FLEET_INJECT.md` — fleet injector CLI
- `CEO_NCS_TOPRIGHT_FLEET.md` — CEO coverage mandate
- `FIX_5_PRIMARY_MATHI18N_NCS.md` — **Fix 5:** NCS switcher → visible React UI (2026-07-29)
- `_tools/inject-ncs-i18n.js` — bulk HTML injector
- `_tools/inject-math-i18n-bridge.js` — MathI18n-specific pass

## Fix 5 follow-up (2026-07-29)

`LanguageSelector` now uses `bindNcsLangSync()` — polls for async `NcsI18n`, subscribes `onChange`, listens `ncs:langchange`. Added `useMathLang()` hook and `resolveText()` helper. All **480** apps inherit via shared `i18n.js`; see `FIX_5_PRIMARY_MATHI18N_NCS.md`.
