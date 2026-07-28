# QA: Physics Stub GUIDED/EXAM Drill Banks Fixed

**Date:** 2026-07-28  
**Scope:** Form 4, Form 5 & Form 6 Physics `index.html` apps with Learn → Guided → Exam → Review flow

## Problem

Several apps shipped with placeholder drill banks:

```javascript
const GUIDED = [{ "en": "g1", "zh": 1 }, ...];
const EXAM   = [{ "en": "e1", "zh": 3 }, ...];
```

The `Drill` component calls `item.opts.map(...)`. Stub items have no `opts`, `q`, `a`, or `hint` — opening **Guided** or **Exam** throws and the demo appears dead (死咗).

## Scan results (F4 + F5 Physics)

| App | Path | Status |
|-----|------|--------|
| Force & Motion | `Form 4/01_Force_Motion` | ✅ Already fixed (reference) |
| Heat Transfer | `Form 4/02_Heat_Transfer` | 🔧 **Fixed** — 6 Guided + 6 Exam |
| Gas Laws Lab | `Form 4/04_Gas_Laws_Lab` | ✅ Already had real drills |
| SHC Mixer | `Form 4/05_SHC_Mixer` | 🔧 **Fixed** — 6 Guided + 6 Exam |
| Motion Graph Studio | `Form 4/06_Motion_Graph_Studio` | 🔧 **Fixed** — 6 Guided + 6 Exam |
| EMF & Internal R | `Form 5/01_EMF_Internal_R` | ✅ Already had real drills |
| Wave Interference | `Form 5/02_Wave_Interference` | ✅ Already had real drills |
| Lenses Optics | `Form 5/03_Lenses_Optics` | ⏭ Different UI (no GUIDED/EXAM banks) |
| Circuit Builder | `Form 5/06_Circuit_Builder` | ✅ Already had real drills |
| Momentum Collisions | `Form 5/07_Momentum_Collisions` | 🔧 **Fixed** — 6 Guided + 6 Exam |
| Induction Explorer | `Form 5/08_Induction_Explorer` | 🔧 **Fixed** — 6 Guided + 6 Exam |

**Fixed this pass (F4/F5):** 5 apps  
**Fixed this pass (F6):** 2 apps  
**Stub pattern `"en": "g1"` remaining in all Physics:** 0

## Drill bank schema (required fields)

Each item must include:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | e.g. `"g1"`, `"e3"` |
| `level` | number | 1–2 Guided, 3–4 Exam |
| `q` | string | English stem |
| `qZh` | string | Chinese stem |
| `opts` | string[] | **≥ 4** MCQ options (bilingual labels) |
| `a` | string | Must match one `opts` entry exactly |
| `hint` | string | Bilingual method hint (no answer reveal) |

## Topic coverage (fixed apps)

### F4 Heat Transfer
Conduction, convection, radiation; black/silver surfaces; vacuum flask; real-world examples.

### F4 SHC Mixer
`Q = mcΔT`, mixing problems, heat vs temperature, equal-mass averaging, energy conservation.

### F4 Motion Graph Studio
s–t and v–t interpretation, gradient = v / a, area under v–t = displacement, SUVAT.

### F5 Momentum Collisions
`p = mv`, impulse = Δp, conservation, elastic vs inelastic, airbags, rocket propulsion.

### F5 Induction Explorer
Changing flux, Faraday, Lenz, transformers, eddy-current braking, everyday induction.

## Verification

1. **Grep:** no `"en": "g1"` in any `Form 4/**/index.html`, `Form 5/**/index.html`, or `Form 6/**/index.html`.
2. **Structure:** all 12 apps with `const GUIDED` now open with `opts` arrays on every item.
3. **Learn tab:** unchanged — `LearnExtra` sliders/buttons do not depend on drill banks.

### Manual smoke test (per app)

1. Open `index.html` in browser.
2. **Learn** — interact with experiment; no console errors.
3. **Guided** — first question renders 4 options; answer → Hint → Next works.
4. **Exam** — same; complete all items → score screen.
5. **Review** — empty or shows wrong-book entries after a deliberate mistake.

## Scan results (F6 Physics)

| App | Path | Status |
|-----|------|--------|
| Half-Life Lab | `Form 6/01_Half_Life_Lab` | 🔧 **Fixed** — 6 Guided + 6 Exam |
| Projectile Motion | `Form 6/02_Projectile_Motion` | ✅ Already had real drills |
| Work Energy Power | `Form 6/09_Work_Energy_Power` | 🔧 **Fixed** — 6 Guided + 6 Exam |

**Stub pattern `"en": "g1"` remaining in F6:** 0

### Topic coverage (F6 fixed apps)

#### F6 Half-Life Lab
Half-life definition, random decay, N → N/2 model, α/β/γ penetration & ionisation, activity (Bq), multi-half-life calculations.

#### F6 Work Energy Power
W = Fs cosθ, KE = ½mv², GPE = mgh, energy conservation, P = W/t and P = Fv, friction & net work.

## Prevention

Before shipping any Physics drill app:

- [ ] `GUIDED` and `EXAM` arrays use full MCQ objects (not `{en, zh}` stubs).
- [ ] Every item has `opts` with length ≥ 4.
- [ ] `a` exactly equals one option string.
- [ ] Smoke-test Guided tab in browser before demo.
