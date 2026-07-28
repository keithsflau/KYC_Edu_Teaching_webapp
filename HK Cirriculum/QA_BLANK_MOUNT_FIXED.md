# QA: Blank / React Mount Fixes

**Generated:** 2026-07-28  
**Scope:** `Secondary_School/` + `Primary_School/` (excluding `dist/`, `node_modules/`, `_archive/`)

## Summary

Fleet scan and fix for known blank-page / React-won't-mount patterns. Reference implementations: **Air Composition** (JSLGER Shell) and **Force Motion** (Babel + local TFZ).

| Pattern | Files fixed | Action |
|---------|------------:|--------|
| `learn-from-zero.js` + local `LearnFromZero` collision | **15** | Removed stub script where app defines full local `LearnFromZero` |
| `@babel/standalone` without classic JSX preset | **221** | Added `common/babel-react-classic.js` + `data-presets="react-classic"` on `text/babel` blocks |
| Orphan HTML `<footer>` on JSLGER Shell apps | **17** | Removed static footer (Shell renders `Footer` in React) |
| Body `#f8fafc` washing JSLGER cards | **35** | Form 1 Junior Science apps → `#f0f9ff` (Air Composition pattern) |
| Circuit Builder orphan footer | **1** | Removed post-`</script>` footer outside `#root` |
| `junior-science-lger.js` wrong depth | **0** | All refs already resolve to `../../../../common/` (verified) |

**New shared asset:** [`common/babel-react-classic.js`](common/babel-react-classic.js) — registers `react-classic` preset for CDN React 18.

**Automation:** [`_tools/fix-blank-mount.py`](_tools/fix-blank-mount.py) (apply) · [`_tools/cleanup-blank-mount.py`](_tools/cleanup-blank-mount.py) (dedupe presets)

---

## Pattern details

### 1. LearnFromZero collision (15 apps)

`common/learn-from-zero.js` exports a minimal stub that overwrote local full implementations.

**Fixed apps:**
- `Biology/Form 4/01_Cell_Transport`, `02_Mitosis_Cell_Cycle`, `06_Photosynthesis`
- `Biology/Form 5/01_Enzyme_Kinetics`
- `Biology/Form 6/01_Glucose_Homeostasis`
- `Chemistry/Form 5/05_Hess_Cycle`, `06_Buffer_Systems`, `09_Chemical_Equilibrium_Kc`
- `Chemistry/Form 6/01_Le_Chatelier`, `02_Titration_Curve`
- `Mathematics/Form 1/41_Fraction_Pizza_Share`
- `Physics/Form 4/04_Gas_Laws_Lab`
- `Physics/Form 5/01_EMF_Internal_R`, `02_Wave_Interference`
- `Physics/Form 6/02_Projectile_Motion`

**Unchanged (correct):** `Physics/Form 5/06_Circuit_Builder` — local `LearnFromZero` only, no stub script; uses `text/plain` + `Babel.transform({ presets: ["react-classic"] })`.

### 2. Babel automatic JSX (221 apps)

Modern `@babel/standalone` defaults to automatic JSX runtime, which breaks CDN `React` without `react/jsx-runtime`. Fix matches Force Motion / Circuit Builder:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="../../../../common/babel-react-classic.js"></script>
...
<script type="text/babel" data-presets="react-classic">
```

### 3. JSLGER orphan footer (17 apps)

Hand-crafted / batch F3 apps had a static `<footer>` after `</script>` while `JSLGER.Shell` already renders footer inside React — caused duplicate/orphan footer when mount failed.

**Examples:** `04_Air_Composition`, `22_Reaction_Time`, F3 bridge apps (`01_Climate_Action` … `10_Energy_Systems`).

### 4. Body background wash (35 Form 1 apps)

JSLGER apps with `body { background: #f8fafc }` made white cards invisible on light wash. Switched to `#f0f9ff` per Air Composition.

### 5. Space Mission

`Form 2/30_Space_Mission` is a **vanilla JS** LGER implementation (no React/Babel) with `#f0f9ff` body and inline footer — avoids mount failures entirely.

### 6. junior-science-lger.js paths

All **98** Junior Science app `index.html` files use `../../../../common/junior-science-lger.js` which correctly resolves from `Secondary_School/Junior Science/Form */<app>/`. No depth fixes required.

---

## Verification checklist

- [ ] Open `Junior Science/Form 2/04_Air_Composition` — React mounts, single footer, sky background
- [ ] Open `Physics/Form 4/01_Force_Motion` — TFZ steps render, no console JSX errors
- [ ] Open `Physics/Form 5/06_Circuit_Builder` — circuit lab + Learn From Zero mount
- [ ] Open `Physics/Form 5/02_Wave_Interference` — no stub TFZ, interference canvas live
- [ ] Spot-check Form 1 JS app (e.g. `01_Lab_Safety`) — `#f0f9ff` background
