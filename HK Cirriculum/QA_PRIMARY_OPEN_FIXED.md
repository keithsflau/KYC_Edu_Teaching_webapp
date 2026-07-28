# QA Primary Open — Fixed

**When:** 2026-07-28  
**Server:** `http://localhost:5173` (`npx serve "HK Cirriculum" -l 5173`)  
**Scope:** `Primary_School/General_Studies`, `Primary_School/Mathematics`, `Primary_School/English`

## Executive summary

| Metric | Result |
|--------|--------|
| Apps scanned (disk) | **506** |
| Static-clean apps | **500 / 506** |
| Priority demos HTTP 200 | **8 / 8** |
| Blank/crash fixes applied | **1** (English Vocabulary) |
| Flag Raising / Magnet Fun | **Verified rendering** (no code change required) |

## Priority demos — HTTP + render

| App | URL | HTTP | Render |
|-----|-----|------|--------|
| Magnet Fun | `/Primary_School/General_Studies/P1/26_Magnet_Fun/index.html` | **200** | **PASS** — title, drag items, language selector |
| Flag Raising | `/Primary_School/General_Studies/P1/29_Flag_Raising/index.html` | **200** | **PASS** — ceremony UI, start button, anthem sync |
| General Studies hub | `/Primary_School/General_Studies/index.html` | **200** | **PASS** |
| Mathematics hub | `/Primary_School/Mathematics/index.html` | **200** | **PASS** |
| English hub | `/Primary_School/English/index.html` | **200** | **PASS** |
| English Oral Tutor | `/Primary_School/English/English%20Oral%20Tutor/index.html` | **200** | **PASS** |
| Shopping Quest (Vocabulary) | `/Primary_School/English/English_Vocabulary/dist/index.html` | **200** | **PASS** (after fix) |
| Fraction Pizza (P3 redirect) | `/Primary_School/Mathematics/P3/41_Fraction_Pizza_Share/index.html` | **200** | **PASS** — redirects to Secondary F1 lab |

## Fixes applied

### 1. English Vocabulary — blank page (P0)

**Symptom:** `English_Vocabulary/dist/index.html` was corrupted (footer injected into `<head>`, no JS/CSS bundle tags). Page title showed `english-vocabulary` with empty `#root`.

**Fix:**
- Restored Vite root `index.html` entry for future builds
- Rebuilt: `npm run build` in `Primary_School/English/English_Vocabulary/`
- `dist/index.html` now loads `./assets/index-CdIIAuI7.js` + `./assets/index-dC86Sfw2.css`
- Added **Shopping Quest** card on `Primary_School/English/index.html` → `English_Vocabulary/dist/index.html`

**Static URL to use:** always `…/English_Vocabulary/dist/index.html` (not the Vite dev root).

### 2. Magnet Fun & Flag Raising — verified OK

Both apps already render on port 5173:
- React 18 + `window.Motion` (framer-motion UMD) + `General_Studies/common/i18n.js` load correctly
- Magnet Fun: draggable objects, feedback, reset
- Flag Raising: anthem-synced flag rise, completion modal

No additional code changes were required in this pass.

## Fleet scan notes (non-blocking)

Automated scan (`_tools/qa-primary-open.py`) flagged **6** paths; all are false positives or intentional:

| Path | Scanner flag | Actual status |
|------|--------------|---------------|
| `Mathematics/P3`, `P4`, `P5`, `P6` hubs | `broken_links` for `./${app.path}/index.html` | **OK** — template literals inside JS card renderer, not static `href`s |
| `Mathematics/P3/41_Fraction_Pizza_Share` | tiny redirect stub | **OK** — meta-refresh to Secondary F1 Fraction Pizza Share |
| `English/English_Vocabulary` (root) | Vite dev entry (`/src/main.jsx`) | **OK** — dev-only; production static path is `dist/` |

## How to re-verify

```powershell
# Priority smoke (HTTP)
curl.exe -s -o NUL -w "%{http_code}" "http://localhost:5173/Primary_School/General_Studies/P1/26_Magnet_Fun/index.html"
curl.exe -s -o NUL -w "%{http_code}" "http://localhost:5173/Primary_School/General_Studies/P1/29_Flag_Raising/index.html"
curl.exe -s -o NUL -w "%{http_code}" "http://localhost:5173/Primary_School/English/English_Vocabulary/dist/index.html"

# Full static scan
python "HK Cirriculum/_tools/qa-primary-open.py"
```

## Tools added

- `HK Cirriculum/_tools/qa-primary-open.py` — disk scan for tiny HTML, missing mounts, broken local assets
- `HK Cirriculum/_tools/qa-primary-open-smoke.py` — HTTP smoke helper (priority + random sample)

## Result

**Primary launch demos render on `localhost:5173`.** One real blank-page bug (English Vocabulary dist) was fixed; Magnet Fun and Flag Raising were confirmed working.
