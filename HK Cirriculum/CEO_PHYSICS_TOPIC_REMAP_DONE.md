# CEO Physics Topic Remap — Links & Platform DONE

**Date:** 2026-07-29 (UTC+8)  
**Plan:** `Secondary_School/Physics/CEO_PHYSICS_TOPIC_REMAP.md`  
**Scope:** Phase 1 link inventory + `hksteamai-platform` curriculum map after 10 orphan apps moved under `Physics/Topics/`.

---

## Verdict

**PASS** — All catalogued / platform / NCS config links now point at canonical `Topics/NN_…/` paths. Redirect stubs remain at old root folders for backward compatibility (excluded from `curriculum-map.json`).

---

## Canonical path map (old → new)

| Old path | New path |
|----------|----------|
| `Physics/3D_Solar_System` | `Physics/Topics/06_Astronomy_and_Space_Science/3D_Solar_System` |
| `Physics/Bernoulli-Simulation` | `Physics/Topics/02_Force_and_Motion/Bernoulli_Simulation` |
| `Physics/Dopper's Effect` | `Physics/Topics/03_Wave_Motion/Doppler_Effect` |
| `Physics/Light Ray Diagram with Convex Len and Concave Len` | `Physics/Topics/03_Wave_Motion/Lens_Ray_Diagrams` |
| `Physics/Light Dispersion through a Prism` | `Physics/Topics/03_Wave_Motion/Prism_Dispersion` |
| `Physics/Atomic Emission Spectra` | `Physics/Topics/07_Atomic_World/Atomic_Emission_Spectra` |
| `Physics/Fraunhofer Lines` | `Physics/Topics/07_Atomic_World/Fraunhofer_Lines` |
| `Physics/Photoelectric Effect` | `Physics/Topics/07_Atomic_World/Photoelectric_Effect` |
| `Physics/Quantum Mechanics` | `Physics/Topics/07_Atomic_World/Quantum_Mechanics` |
| `Physics/Parity Non-Conservation` | `Physics/Topics/05_Radioactivity_and_Nuclear_Energy/Parity_Non_Conservation` |

---

## Files updated

| File | Change |
|------|--------|
| `hksteamai-platform/data/free-demo-catalog.json` | Solar System demo → Topics path |
| `hksteamai-platform/scripts/generate-curriculum-map.mjs` | PATH_OVERRIDES key + skip redirect stubs |
| `hksteamai-platform/data/curriculum-map.json` | Regenerated (`npm run curriculum:generate`) — **1391 modules**, 15 free demos |
| `hksteamai-platform/scripts/smoke-play.mjs` | Physics sample + MediaPipe checks → Topics path |
| `hksteamai-platform/QA_PLAY_ALL_SUBJECTS.md` | Play URL examples updated |
| `hksteamai-platform/FREE_DEMO_CATALOG.md` | Demo #15 path updated |
| `HK Cirriculum/_tools/ncs-apply-pass1.json` | 10 `rel` paths updated |
| `HK Cirriculum/Secondary_School/Physics/index.html` | Topic-first hub (sibling agent) |
| `HK Cirriculum/QA_FLEET_ALL_APPS.json` | Regenerated — includes new Topics entries |

---

## Surfaces verified clean (no stale orphan hrefs)

- `Secondary_School/Physics/index.html` — Topics primary
- `parent-dashboard/index.html` — Form flagship demos only (unchanged)
- `pricing/index.html` — Form flagship copy only (unchanged)
- `marketing/site/landing/index.html` — Form flagship demo (unchanged)
- `hksteamai-platform/src/**` — no hardcoded old Physics paths

---

## Redirect stubs (intentional)

Old root folders (`3D_Solar_System/`, `Dopper's Effect/`, etc.) contain `<meta http-equiv="refresh">` stubs → canonical Topics URLs. These:

- Still appear in `QA_FLEET_ALL_APPS.json` / `QA_WONT_OPEN.md` as tiny redirect pages (expected)
- Are **excluded** from `curriculum-map.json` via redirect-stub filter in generator

Remove stubs after 30-day backward-compat window per plan §6.

---

## Regenerate commands

```bash
cd hksteamai-platform && npm run curriculum:generate
python "HK Cirriculum/_tools/qa-fleet-all-apps.py"
```

---

## Phase 2 (not this pass)

Form 4–6 lab folders still under `Form N/` — migrate into same `Topics/` tree per plan §8.

---

*Link + platform pass complete. @HKSTEAMAI*
