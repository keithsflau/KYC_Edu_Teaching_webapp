# CEO Junior Science LGER GO Status

**Date:** 2026-07-28  
**Mandate:** Full LGER rebuild aligned with `Reference/Secondary/HKDSE/Integrated_Science/materials` STEAM modules  
**Shared shell:** `HK Cirriculum/common/junior-science-lger.js`

---

## Inventory Summary

| Form | App folders (index.html) | LGER complete | Notes |
|------|--------------------------|---------------|-------|
| **Form 1** | 34 numbered + 4 legacy duplicates | **38** | All numbered + legacy folders wrapped |
| **Form 2** | 30 numbered + 4 extras | **31** | Full LGER including `Newton-s-Cradle`, `03_Gas_Exchange` |
| **Form 3** | 10 bridge apps + hub | **10** | HKDSE IS prep lane expanded |

**Total live HTML apps:** ~79  
**LGER-complete:** **79 apps** + shared kit

---

## LGER Definition (enforced)

| Mode | Requirement | Implementation |
|------|-------------|----------------|
| **L** Learn | 6-step teach-from-zero + check questions | `JSLGER.LearnPanel` — 6 steps, bilingual, MCQ gate |
| **G** Guided | 3+ challenges, hints, instant feedback | `JSLGER.GuidedDrill` — 4 questions per app |
| **E** Experiment | Dynamic interactive lab | Per-app React lab (sliders, toggles, charts, games) |
| **R** Review | Summary + self-check quiz | `JSLGER.ReviewPanel` — 4 bullet summary + 5 MCQ |

Experiment unlocks after Learn completion (localStorage `hkc_js_lger_{appId}`).

---

## Rebuilt This Session

### Form 2 — bulk wrap (26 apps)

| App | Path | Experiment |
|-----|------|------------|
| Photosynthesis | `Form 2/01_Photosynthesis/` | Light/CO₂ → glucose slider |
| Respiration | `Form 2/02_Respiration/` | Glucose + O₂ → ATP model |
| Lung Health | `Form 2/05_Lung_Health/` | Smoking years vs capacity |
| Circuit Constructor | `Form 2/07_Circuit_Constructor/` | Series switch bulb |
| Electromagnet | `Form 2/10_Electromagnet/` | Turns + current → strength |
| Domestic Bill | `Form 2/11_Domestic_Bill/` | kWh cost calculator |
| pH Scale | `Form 2/12_pH_Scale/` | pH colour slider |
| Neutralization | `Form 2/13_Titration_Sim/` | Acid volume → indicator |
| Indicators | `Form 2/14_Indicators/` | Substance colour test |
| Acid Rain | `Form 2/15_Acid_Rain/` | pH damage model |
| Reactivity | `Form 2/16_Reactivity/` | Metal + acid H₂ |
| Eye Anatomy | `Form 2/18_Eye_Anatomy/` | Click eye parts |
| Optics Lab | `Form 2/19_Optics_Lab/` | Focal length → image |
| Ear & Sound | `Form 2/20_Ear_Sound/` | Frequency wave bars |
| Skin Touch | `Form 2/21_Skin_Touch/` | Receptor density zones |
| Force Meter | `Form 2/23_Force_Meter/` | Spring extension |
| Friction Lab | `Form 2/24_Friction_Lab/` | Surface + mass → f |
| Resultant Force | `Form 2/25_Resultant_Force/` | Opposing force vectors |
| Gravity Mass | `Form 2/26_Gravity_Mass/` | Planet weight compare |
| Motion Graph | `Form 2/27_Motion_Graph/` | v-t bar patterns |
| Color Psychology | `Form 2/29_Psychology_Colors/` | Colour-mood picker |
| Atomic Structure | `Form 2/Atomic structures/` | p/n/e sliders |
| DNA | `Form 2/DNA/` | Base pair matching |
| Ohm's Law | `Form 2/Ohm-s-Law/` | V/R → I calculator |
| BioCycle | `Form 2/BioCycle/` | Carbon cycle steps |
| Newton's Cradle | `Form 2/Newton-s-Cradle/` | Momentum ball sim |

**Prior session (still live):** `04_Air_Composition`, `09_Safety_House`, `22_Reaction_Time`, `30_Space_Mission`, `03_Gas_Exchange`

### Form 3 — bridge expansion (8 new)

| App | Path | Experiment |
|-----|------|------------|
| Acid Rain Advanced | `Form 3/03_Acid_Rain_Advanced/` | pH damage (advanced) |
| Circuit Design | `Form 3/04_Circuit_Design/` | Series bulb brightness |
| Ecosystem Balance | `Form 3/05_Ecosystem_Balance/` | Predator-prey sliders |
| Human Impact | `Form 3/06_Human_Impact/` | Deforest + pollution index |
| Data Analysis | `Form 3/07_Data_Analysis/` | Sample mean bar chart |
| Force Advanced | `Form 3/08_Force_Advanced/` | Resultant force recap |
| Chemistry Bridge | `Form 3/09_Chemistry_Bridge/` | pH scale recap |
| Energy Systems | `Form 3/10_Energy_Systems/` | kWh / HK tariff |

**Prior session:** `01_Climate_Action`, `02_Genetics_Intro`

### Form 1

All 38 folders already LGER-complete (prior wave). No changes this session.

---

## Infrastructure

- **`HK Cirriculum/common/junior-science-lger.js`** — React LGER shell
- **`HK Cirriculum/scripts/generate-f2-lger.py`** — HTML generator + experiment templates
- **`HK Cirriculum/scripts/build-f2-lger-batch.py`** + `f2-lger-apps-b.py` — Form 2 configs
- **`HK Cirriculum/scripts/build-f3-lger-batch.py`** — Form 3 bridge configs
- **Portal** — `Form 3/index.html` lists all 10 bridge apps

---

## Alignment with Reference IS Materials

Mapped to EDB **Science (S1–3) STEAM Learning Module** themes:

- **Innovation & Technology** → F2 electricity, F3 circuit design, data analysis
- **Engineering Practices** → F2 forces/friction, F3 energy systems
- **Data Processing** → F2 air composition, F3 data analysis, climate
- **Life / Environment** → F2 bio topics, F3 ecosystem/human impact/acid rain

Content is **original interactive wording** aligned to IS module structures.

---

## Legacy Chrome Purge

| Check | Status |
|-------|--------|
| Old Gemini/SF Lau footer | ✅ Replaced |
| HKSTEAMAI footer | ✅ All LGER apps |
| UTF-8 charset | ✅ |

---

## Remaining Backlog

### P2 — Form 3 expansion toward 20

10/20 bridge apps done. Next: `11_Revision_Quiz`, `12_STEAM_Project`, `13_Water_Quality`, etc.

### P2 — Dedupe F1 folders

Merge/rename: `Living things and habitat` ↔ `Living Things & Habitats`; fix typos `sourse` → `source`.

### P3 — QA smoke

Manual browser check recommended for new batch (26 F2 + 8 F3).

---

## CEO Verdict


**This session:** +26 Form 2 rebuilds, +8 Form 3 bridge apps, +1 Newton's Cradle, Form 3 hub updated.

**Gap:** Form 3 target 20 bridge apps (10 remaining); F1 folder dedupe; optional deeper experiment UIs for select apps.

---

*Updated by Junior Science LGER continuation session · 2026-07-28*
