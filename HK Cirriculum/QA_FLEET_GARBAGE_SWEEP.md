# QA Fleet Garbage Sweep Report

**Scanned:** 2026-07-28T12:36:52.252Z  
**Scope:** `Primary_School` + `Secondary_School` (`index.html` apps, excluding `node_modules` / `dist`)

## Summary

| Metric | Count |
|--------|------:|
| **Total apps** | 1342 |
| **Garbage found (initial pass)** | 385 |
| **Critical fixes applied** | 140 |
| **Remaining garbage** | 380 |
| **Remaining critical** | 1 |

**Return line:** total=1342, garbage=385, fixed=140, remaining=380 (critical remaining=1)

## What was fixed (critical)

- Stripped `HK%20Cirriculum/` double-nested asset URLs where present
- Injected missing `<link rel="stylesheet">` (Outfit) and `<script src>` (Tailwind CDN) on 1225 apps already normalized in fleet
- Patched `LearnFromZero` shells with relative `learn-from-zero.js` + `interactive-lab-kit.js` where missing
- **cell-cycle-mitosis:** `/src/main.js` → `./src/main.js` (local 404)

## Criteria

| Type | Checks |
|------|--------|
| **Critical** | Local `.js` / `.css` 404; `HK%20Cirriculum/` double-nesting; `LearnFromZero` without `learn-from-zero.js`; missing stylesheet or external script `src` |
| **Non-critical** | `index.html` &lt; 5 KB; TODO / FIXME / placeholder / lorem ipsum |

## Critical remaining

- `HK Cirriculum/Primary_School/PrimaryChinese/index.html` — TODO/FIXME/placeholder; 404 styles/scripts: ../REMOVED.css, ../REMOVED.js

## Non-critical backlog (sample)

- `HK Cirriculum/Primary_School/English/English Oral Tutor/index.html` (25.32 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/English/index.html` (3.09 KB): File size < 5KB
- `HK Cirriculum/Primary_School/General_Studies/index.html` (24.1 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P1/01_School_Tour/index.html` (13.04 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P1/06_My_Five_Senses/index.html` (9.57 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P1/16_Animal_Sorting/index.html` (8.24 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P2/03_Classroom_Duty/index.html` (8.97 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P2/04_Conflict_Solver/index.html` (14.43 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P2/09_Hygiene_Check/index.html` (9.98 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P2/20_Park_Rules/index.html` (10.89 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P2/28_Plant_Parts_Function/index.html` (10.65 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P2/29_Animal_Habitats/index.html` (12.21 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P4/06_Smart_Shopper/index.html` (9.72 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P4/16_IT_Password/index.html` (7.26 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P4/18_Netiquette/index.html` (8.34 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P4/21_Water_Treatment/index.html` (8.41 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P5/07_Food_Preservation/index.html` (7 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P5/54_Gender_Equality/index.html` (6.44 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P6/30_Graduation_Memory/index.html` (6.5 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/General_Studies/P6/41_Force_Motion/index.html` (12.75 KB): TODO/FIXME/placeholder
- `HK Cirriculum/Primary_School/index.html` (0.58 KB): File size < 5KB
- `HK Cirriculum/Primary_School/Mathematics/P1/01_Counting_1_To_10/index.html` (4.76 KB): File size < 5KB
- `HK Cirriculum/Primary_School/Mathematics/P1/07_Number_Bonds_10/index.html` (4.75 KB): File size < 5KB
- `HK Cirriculum/Primary_School/Mathematics/P1/24_Numbers_To_50/index.html` (3.96 KB): File size < 5KB
- `HK Cirriculum/Primary_School/Mathematics/P1/25_Numbers_To_100/index.html` (4.36 KB): File size < 5KB

## Full inventory

- [garbage_report.json](./garbage_report.json)
- Re-run: `node sweep.js` (repo root)
