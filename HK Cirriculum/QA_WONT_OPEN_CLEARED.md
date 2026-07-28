# QA Won't-Open — Cleared

**Date:** 2026-07-28  
**Repair run:** `_tools/qa-fleet-all-apps.py`  
**Result:** **19 → 0** won't-open apps (1314 scanned)

## Summary

All 19 apps from `QA_WONT_OPEN.md` were repaired. Primary repair method was **git restore** from commit `9882bca9` (*Pre-transpile all educational React pages for GitHub Pages*), which contained the last known-good transpiled React shells with `createRoot` mounts.

## Repairs by category

### 1. Primary Chinese games (13) — `react_no_mount` / stripped Babel

Restored full transpiled `index.html` from `9882bca9`:

| App | Failure class | Fix |
|-----|---------------|-----|
| `idiom_asteroids` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `idiom_mood_board` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `particle-bridge-game` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `poetry_royale` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `radical_bubble_chemistry` | react_no_mount | Git restore + footer |
| `railshooter` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `rhetoric_factory` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `typo_mole` | react_no_mount | Git restore + footer |
| `typo_surgeon` | tiny_html, react_no_mount, footer_only | Git restore + footer |
| `word_rain` | react_no_mount | Git restore + footer |
| `Rhetoric_Defense` | react_no_mount, css_only_shell | Git restore + footer |
| `millionaire` | react_no_mount, css_only_shell | Git restore + footer |

### 2. `food-test-simulation` — `react_no_mount`, `css_only_shell`

- Restored Vite source `index.html` with `<script type="module" src="/src/main.jsx">` entry (stripped by prior QA sync).
- Ran `npm install && npm run build` (vite-plugin-singlefile).
- Synced `dist/index.html` → root `index.html` (303 KB, inlined `createRoot` bundle).

### 3. Secondary Chinese hub + `couplet_duel` — footer-in-head corruption

- Restored from `9882bca9`; full hub grid and couplet duel game logic recovered.
- Truncated shells (footer injected into `<head>`, empty body) replaced with complete HTML.

### 4. Form 2 Math L2–L5 — truncated shells

| App | Fix |
|-----|-----|
| `L2_Continuous_Data` | Git restore; removed dead `visit-counter.css/js` refs |
| `L3_Linear_Eq_2` | Git restore; removed dead `visit-counter.css/js` refs |
| `L4_Pythagoras_Thm` | Git restore; removed dead `visit-counter.css/js` refs |
| `L5_Rate_Ratio` | Git restore; removed dead `visit-counter.css/js` refs |

## Verification

```
python "HK Cirriculum/_tools/qa-fleet-all-apps.py"
```

| Metric | Before | After |
|--------|-------:|------:|
| Won't-open | 19 | **0** |
| PASS | 1145 | **1166** |
| Scanned | 1314 | 1314 |

## Root cause

A batch maintenance pass stripped React/Babel `<script>` blocks and/or injected the HKSTEAMAI footer into `<head>` instead of `<body>`, leaving empty `#root` shells or CSS-only pages. Vite apps lost their `main.jsx` entry after dist sync overwrote source without the module tag.

## Notes

- Git path prefix at restore time: `Primary_School/...` and `Secondary_School/...` (pre-`HK Cirriculum/` layout); files written to current `HK Cirriculum/` tree.
- `visit-counter.js` / `visit-counter.css` no longer exist repo-wide; removed from Math L2–L5 to clear `broken_ref` QA gate.
- Primary Chinese restored files may still reference `visit-counter.css` at `../../../` — not flagged as won't-open; can be cleaned in a follow-up if desired.

---
*Prior handoff: `QA_WONT_OPEN.md` (2026-07-28T15:49 UTC)*
