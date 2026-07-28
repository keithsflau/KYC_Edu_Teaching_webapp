# Form 3 Junior Science — S3 Bridge Plan

> **⚠️ SUPERSEDED for Form 3 canonical apps.** Use `CEO_F3_REBUILD_PLAN.md` instead.  
> This document describes an obsolete HKDSE bridge lane (30 apps). Bridge content may move to `Bridge/` in Wave 2.

**Theme:** HKDSE Integrated Science bridge — consolidate S1–S2 and preview senior themes.  
**Stack:** HTML5, Tailwind CSS, React CDN, `common/junior-science-lger.js` (`JSLGER.Shell`)  

Aligned to EDB **Science (S1–3) 2025 framework** units 3, 4, 5, 6, 13 and HKDSE IS enrichment themes.

---

## Unit map (30-app target)

| # | Folder | Title | Framework unit | Status |
|---|--------|-------|----------------|--------|
| 01 | `01_Climate_Action` | Climate Action Simulator | 5 Earth & Space / 13 Planet Earth | ✅ LGER |
| 02 | `02_Genetics_Intro` | Genetics Introduction | 3 Reproduction & Heredity | ✅ LGER |
| 03 | `03_Ecosystem_Balance` | Ecosystem Balance | 6 Living Things & Environment | ✅ LGER |
| 04 | `04_Scientific_Method` | Scientific Method Lab | 4 Scientific Practices II | ✅ LGER |
| 05 | `05_Force_Motion_Bridge` | Force & Motion Bridge | 9 Force & Motion (HKDSE prep) | ✅ LGER |
| 06 | `06_Circuit_Design` | Circuit Design Challenge | 10 Electricity (HKDSE prep) | ✅ LGER |
| 07 | `07_Acid_Base_Review` | Acids & Bases Review | 7 Matter & Energy | ✅ LGER |
| 08 | `08_Data_Graphs` | Data & Graphs Workshop | 4 Scientific Practices II | ✅ LGER |
| 09 | `09_Human_Body_Systems` | Body Systems Integration | 11 Healthy Body | ✅ LGER |
| 10 | `10_Space_Earth` | Earth in Space | 5 Earth & Space | ✅ LGER |
| 11–20 | TBD | Chemistry bridge, energy, waves | 7–8, 12 | 🔲 Planned |
| 21–30 | TBD | IS exam-style integrative labs | Cross-unit | 🔲 Planned |

---

## LGER requirements (all apps)

- **L** — 6 learn steps with bilingual MCQ gates  
- **G** — 4 guided challenges with hints  
- **E** — Interactive experiment (sliders, canvas, or iframe for Vite sims)  
- **R** — 4-point summary + 5-question self-quiz  
- Experiment unlock after Learn (`localStorage` `hkc_js_lger_{appId}`)

---

## Content sources (no commercial PPT)

- EDB official PDFs (`Reference/Secondary/HKDSE/Integrated_Science/materials/official/`)  
- Existing F1/F2 LGER apps for vocabulary alignment  
- `topic_map.json` unit tags (`framework-2025`)

---

## Build commands

```bash
# Form 2 gas exchange + bulk F2
python "HK Cirriculum/scripts/generate-f2-lger.py"

# BioCycle Vite sim (iframe in LGER shell)
cd "HK Cirriculum/Secondary_School/Junior Science/Form 2/BioCycle"
npm install && npm run build
```

---

## Next wave (P1)

1. Complete apps 11–20 (chemistry bridge, energy, waves)  
2. Add `framework-2025` tags to Form 3 hub metadata  
3. Cross-link F3 apps from F2 unit review cards
