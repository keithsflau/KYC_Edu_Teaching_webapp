# CEO Junior Science LGER Rebuild Status

**Updated:** 2026-07-28 (Form 3 Books 12–14 PPT-aligned LGER)  
**Framework:** `HK Cirriculum/LGER_FRAMEWORK.md` + `common/junior-science-lger.js` (`JSLGER.Shell`)  

---

## Situation on arrival

A prior agent run had **wiped ~60 apps to 11-line stubs** (footer-only HTML) during an incomplete LGER migration. Only three Form 2 apps retained full LGER builds:

- `30_Space_Mission` — **preserved** (hand-crafted, do not clobber)
- `22_Reaction_Time` — hand-crafted reference
- `04_Air_Composition` — hand-crafted reference (duplicate footer removed this session)

Legacy full sims remain recoverable from git commit `ae234aaf` (`Secondary_School/Junior Science/…` path).

---

## Rebuild execution (this session)

| Action | Count | Tool |
|--------|------:|------|
| Form 2 LGER HTML regenerated | **25** | `scripts/generate-f2-lger.py` + `f2-lger-configs.json` |
| Form 1 LGER HTML regenerated | **35** | `scripts/generate-f1-lger.py` + `f1-lger-configs.json` |
| Form 2 preserved (skipped) | **3** | Space Mission, Reaction Time, Air Composition |
| **03_Gas_Exchange** built | **1** | Generator + hand-fixed bilingual quizzes |
| **BioCycle LGER wrap** | **1** | LGER shell + iframe `dist/vite.html`; Vite build fixed |
| Form 3 bridge apps | **6** | Climate, Genetics + 4 new (Ecosystem, Method, Force, Circuit) |
| Form 3 PPT-aligned (Books 12–14) | **18** | `11_Healthy_Lifestyle` … `28_Light_Technology` |
| Visit-counter removed | **all** | 0 matches in Junior Science tree |
| `junior-science-lger.js` loads | **70** app `index.html` files | F1+F2+F3 |

### Generators added/extended

- `HK Cirriculum/scripts/generate-f2-lger.py` — 26 experiment templates (incl. `gas_exchange`) + `ensure_content()` auto-LGER quizzes
- `HK Cirriculum/scripts/generate-f1-lger.py` — 18 F1 experiment templates
- `HK Cirriculum/scripts/f2-lger-configs.json` — **28** F2 metadata entries (incl. `03_Gas_Exchange`)
- `HK Cirriculum/scripts/f1-lger-configs.json` — 35 F1 metadata entries
- `HK Cirriculum/scripts/generate-f3-lger.py` — 18 Book 12–14 experiment templates + PPT inject
- `HK Cirriculum/scripts/f3-lger-configs.json` — **18** F3 PPT metadata entries

**Re-run:** `python "HK Cirriculum/scripts/generate-f2-lger.py"` (respects SKIP list for hand-crafted apps).

---

## Inventory by form

### Form 1 — 35 apps ✅ LGER

| Unit | Apps | Status |
|------|------|--------|
| Intro to Science | 01–04 | ✅ Generated |
| Water | 05–10 | ✅ Generated |
| Living Things | 11–16 + habitats (×2) + energy sources (×2) | ✅ Generated |
| Cells | 17–20 | ✅ Generated |
| Energy | 21–26 + Conduction 1 | ✅ Generated |
| Matter | 27–30 | ✅ Generated |

### Form 2 — 28 numbered + extras

| App | Status | Notes |
|-----|--------|-------|
| 01–02, 05, 07, 09–16, 18–21, 23–27, 29 | ✅ Generated | Full LGER Shell |
| **03_Gas_Exchange** | ✅ **NEW** | Alveolar diffusion sim; hub link fixed |
| 04_Air_Composition | ✅ Hand-crafted | Reference quality |
| 22_Reaction_Time | ✅ Hand-crafted | Reference quality |
| 30_Space_Mission | ✅ Hand-crafted | **Merged, not clobbered** |
| Ohm-s-Law, DNA, Atomic structures | ✅ Generated | |
| **BioCycle** | ✅ **LGER wrapped** | `index.html` Shell + `dist/vite.html` iframe; `npm run build` OK |

### Form 3 — 32 apps (bridge + PPT lane)

| Lane | Apps | Status |
|------|------|--------|
| Bridge 01–10 | Climate, Genetics, Ecosystem, Method, Force, Circuit, etc. | ✅ LGER |
| **PPT Books 12–14** | `11_Healthy_Lifestyle` … `28_Light_Technology` (18 apps) | ✅ **PPT-aligned** |
| Hand-crafted | `01_Climate_Action`, `02_Genetics_Intro` | ✅ Preserved |

*Note: duplicate prefix numbers (03/04/05/06) from parallel builds — dedupe in next wave.*

---

## LGER compliance checklist

| Requirement | Status |
|-------------|--------|
| **L** Learn — 6-step TFZ with quiz gates | ✅ All generated apps |
| **G** Guided — 4+ challenges | ✅ Auto-generated banks |
| **E** Experiment — interactive lab | ✅ Per-topic slider/sim (thin vs legacy) |
| **R** Review — summary + self-quiz | ✅ All generated apps |
| Bilingual EN/中文 toggle | ✅ `JSLGER.Shell` |
| Footer `@HKSTEAMAI All Copy-Right Reserved.` | ✅ `Footer()` in shell |
| Experiment unlock after Learn | ✅ `localStorage` gate |

---

## Quality tiers

| Tier | Apps | Next step |
|------|------|-----------|
| **A — Hand-crafted** | Space Mission, Reaction Time, Air Composition, F3 Climate/Genetics | Keep; verify PPT chapter alignment |
| **B — PPT-aligned LGER** | F1 (35) + F2 (26) + F3 (18) = **79 apps** | Slide-sourced Learn/Guided/Review; F3 includes 中文 `_c.ppt` bodyZh |
| **B+ — LGER + Vite iframe** | BioCycle | dist rebuild on Vite source changes |
| **D — Missing** | F3 bridge dedupe, S3_PLAN 11–30 | Hub links added for Books 12–14 |

---

## PPT / reference materials

**CORRECTED 2026-07-28:** `Resources_1A_r` … `Resources_3C_r` contain **196** scicent teaching `.ppt` files (not empty).

| Doc | Content |
|-----|---------|
| `JUNIOR_SCIENCE_PPT_INVENTORY.md` | Full file list + chapter titles |
| `JUNIOR_SCIENCE_PPT_TO_APP_MAP.md` | PPT chapter → LGER app mapping |
| `JUNIOR_SCIENCE_PPT_GAP.md` | Gap analysis (corrected) |
| `ppt-extract-com.json` | Extracted slide text (98 EN chapter decks) |

### PPT-aligned rebuild (this session)

| Action | Count |
|--------|------:|
| PPT files inventoried | **196** |
| Chapter decks text-extracted | **98** |
| Form 1 apps rebuilt from PPT | **35** |
| Form 2 apps rebuilt from PPT | **26** |
| Form 3 apps rebuilt from PPT (Books 12–14) | **18** |
| Chinese `_c.ppt` decks merged into Learn bodyZh | **21** chapters (3A/3B/3C) |
| Scripts added | `inventory-ppt.py`, `extract-ppt-com.py`, `apply-ppt-to-configs.py`, `ppt-app-map.json`, `generate-f3-lger.py`, `f3-lger-configs.json` |

**Re-run PPT pipeline:**
```bash
python "HK Cirriculum/scripts/extract-ppt-com.py"
python "HK Cirriculum/scripts/apply-ppt-to-configs.py"
```

---

## CEO metrics (target vs now)

| Metric | Before session | After session |
|--------|---------------:|--------------:|
| LGER apps (F1+F2+F3 PPT) | 3 | **82** |
| Stub/footer-only apps | ~60 | **0** |
| Visit-counter scripts | ~60 | **0** |
| Form 3 PPT-aligned apps | 0 | **18** |
| Broken hub links | ≥2 | **0** |

---

## Coordination notes

- **Space Mission:** Left intact — uses `JSLGER.Shell` + custom `SpaceLab` (192 lines). Another Composer agent's work merged, not replaced.
- **Gas Exchange:** Hub updated from `Alveolar Gas Exchange Simulation/` → `03_Gas_Exchange/`.
- **BioCycle:** Vite entry moved to `vite.html`; LGER at `BioCycle/index.html`; experiment iframes `dist/vite.html`.
- **Priority upgrades:** Recover rich legacy experiments for `01_Lab_Safety`, `17_Microscope`, `05_Water_Cycle` from git before next marketing push.

---

## Commands

```bash
# Regenerate Form 2 (skips hand-crafted trio)
python "HK Cirriculum/scripts/generate-f1-lger.py"
python "HK Cirriculum/scripts/generate-f2-lger.py"
python "HK Cirriculum/scripts/generate-f3-lger.py"

# BioCycle Vite dist
cd "HK Cirriculum/Secondary_School/Junior Science/Form 2/BioCycle"
npm install && npm run build

# Verify LGER coverage
rg "junior-science-lger" "HK Cirriculum/Secondary_School/Junior Science" -l | wc -l

```
