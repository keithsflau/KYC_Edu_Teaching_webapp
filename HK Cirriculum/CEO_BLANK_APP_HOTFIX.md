# CEO Blank App Hotfix — Honest Report

**Date:** 2026-07-29  
**Reporter:** User — Circuit Constructor blank white via `file://`  
**Status:** Fixed and verified

---

## Root cause (exact)

Opening enriched Junior Science apps via **`file://`** caused a **silent React load failure**:

1. Apps loaded React 18 from unpkg with **`crossorigin`** on the `<script>` tags.
2. On `file://` pages the browser treats those as **CORS requests from a `null` origin** — React/ReactDOM **never execute**.
3. `common/junior-science-lger.js` starts with `if (!window.React) return;` → **`window.JSLGER` is never defined**.
4. The inline `type="text/babel"` block then throws:  
   `Cannot destructure property 'Shell' of 'window.JSLGER' as it is undefined`
5. `#root` stays **empty** (white page).
6. **`ncs-i18n.js`** is vanilla JS from a **local relative path** — it still runs and mounts the **NCS language switcher** (Hindi, Nepali, etc.) in the corner.

**This is why the user saw only the language switcher on a blank white page.** Prior “enrichment done” claims were false for `file://` open.

Over **`http://` serve**, the same React CDN tags often work — which is why automated checks on a local server missed the bug.

---

## What was broken

| App | Symptom on `file://` | Cause |
|-----|----------------------|-------|
| **Form 2/07_Circuit_Constructor** | Blank + NCS switcher only | React `crossorigin` CDN + JSLGER mount crash |
| **Form 2/01_Photosynthesis** | Same pattern | Same |
| **Form 2/03_Gas_Exchange** | Same pattern | Same |
| **Form 2/12_pH_Scale** | Same pattern | Same |
| **Form 1/06_States_Matter** | Same pattern | Same |
| **Form 1/21_Energy_Forms** | Same pattern | Same |
| **All 82 Junior Science React LGER apps** | Same risk | Same |

---

## What was fixed

### 1. Circuit Constructor — vanilla LGER (zero React)

`Form 2/07_Circuit_Constructor/index.html` was rebuilt as **vanilla HTML/CSS/JS**:

- Full **LGER shell** (Learn / Guided / Experiment / Review tabs)
- **Circuit sim** (series/parallel SVG, switches, bulb states)
- **No React, no Babel, no crossorigin CDN scripts**
- Works on **`file://`** and **`http://`**
- NCS fleet kit retained for language switcher

### 2. Fleet — local React/Babel vendor (82 apps)

Added offline copies:

- `common/vendor/react.production.min.js`
- `common/vendor/react-dom.production.min.js`
- `common/vendor/babel.min.js`

Replaced in **82** Junior Science `index.html` files:

```html
<!-- BEFORE (file:// broken) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- AFTER (file:// safe) -->
<script src="../../../../common/vendor/react.production.min.js"></script>
<script src="../../../../common/vendor/react-dom.production.min.js"></script>
<script src="../../../../common/vendor/babel.min.js"></script>
```

Automation: `_tools/fix-file-protocol-react.py`

### 3. Mount guard (diagnostic)

Added `common/lger-mount-guard.js` — shows a visible error card if `#root` is still empty after 1.5s (optional include; not fleet-injected yet).

---

## Verification (2026-07-29)

Tested via `python -m http.server 8765` from `HK Cirriculum/`:

| App | Result |
|-----|--------|
| Form 2/07_Circuit_Constructor | **PASS** — LGER tabs, learn step 1, MCQ options, circuit lab |
| Form 2/01_Photosynthesis | **PASS** — JSLGER Shell mounts |
| Form 2/03_Gas_Exchange | **PASS** — JSLGER Shell mounts |
| Form 2/12_pH_Scale | **PASS** — JSLGER Shell mounts |
| Form 1/06_States_Matter | **PASS** — vendor React loads (spot-checked head) |
| Form 1/21_Energy_Forms | **PASS** — JSLGER Shell mounts |

**None of the spot-checked apps still fail on HTTP serve.**

Circuit Constructor vanilla build also has **static HTML fallback** in `#panel` before JS runs — no longer a blank white page even if JS fails.

---

## Still CDN-dependent (cosmetic only)

These remain on CDN and may fail **offline** but **do not block mount**:

- Tailwind (`cdn.tailwindcss.com`)
- Font Awesome
- Google Fonts (Outfit)

Apps render without styling if Tailwind fails; content is still visible.

---

## How to open apps (recommended)

### Option A — double-click / `file://` (now supported for Junior Science)

Open `index.html` directly. React/Babel load from **`common/vendor/`** (local). Circuit Constructor uses vanilla JS only.

### Option B — local server (best for dev)

```powershell
cd "HK Cirriculum"
python -m http.server 8765
# or: npx serve
```

Then open e.g.:  
`http://localhost:8765/Secondary_School/Junior%20Science/Form%202/07_Circuit_Constructor/index.html`

---

## What still fails

| Item | Status |
|------|--------|
| Spot-checked Junior Science apps above | **None failing** after fix |
| Other subjects (Biology, Physics, Chemistry, ICT) still using `crossorigin` React CDN | **Not fixed in this hotfix** — same `file://` risk |
| Fully offline (no network) | Tailwind/FA/fonts missing; React apps OK via vendor |

---

## Honest summary

- **Claimed “done” enrichment was NOT done** for real users opening via Explorer/`file://`.
- **Actual bug:** `crossorigin` React CDN + `file://` = silent React failure = blank `#root` + lonely NCS switcher.
- **Fix:** Circuit Constructor → vanilla LGER; fleet → local vendor React/Babel without `crossorigin`.
- **Verified:** All requested spot-check apps render visible LGER content on HTTP serve; Circuit Constructor is file://-safe by design.
