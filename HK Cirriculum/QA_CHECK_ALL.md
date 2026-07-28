# QA CHECK ALL — Full inventory sweep

**Generated:** 2026-07-28T12:48:44.122421+00:00
**Script:** `_tools/qa-check-all.js` (runs `_tools/qa-check-all.py`)

## Totals by classification

| Class | Count |
|-------|------:|
| **Scanned (index.html folders)** | **1282** |
| Apps (non-hub) | 1135 |
| HUB | 147 |
| BROKEN | 1 |
| THIN | 844 |
| TFZ_LIKELY | 290 |

## CEO one-line verdict

> **Soft-launch: GO** · TFZ_LIKELY **25.6%** of apps (290/1135) · BROKEN **0.1%**

## Launch pack (6/6)

| # | Path | PASS | Class | Panel |
|---|------|:----:|-------|-------|
| 1 | `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc` | PASS | TFZ_LIKELY | — |
| 2 | `Secondary_School/Chemistry/Form 6/01_Le_Chatelier` | PASS | TFZ_LIKELY | — |
| 3 | `Secondary_School/Chemistry/Form 6/02_Titration_Curve` | PASS | TFZ_LIKELY | — |
| 4 | `Secondary_School/Physics/Form 5/06_Circuit_Builder` | PASS | TFZ_LIKELY | — |
| 5 | `Secondary_School/Physics/Form 4/04_Gas_Laws_Lab` | PASS | TFZ_LIKELY | — |
| 6 | `Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share` | PASS | TFZ_LIKELY | — |

**Launch pack gate:** **PASS**

## Kc A1–A8 (hard gate)

- Path: `Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc`
- **PASS** · found: A1, A2, A3, A4, A5, A6, A7, A8

## Subscribe infra

| Check | Status |
|-------|--------|
| parentMonthly | OK |
| parentAnnual | OK |
| familyMonthly | OK |
| familyAnnual | OK |
| ENTITLEMENT_API_BASE | `https://hkc-stripe-entitlement.hksteamai.workers.dev` |
| Worker /api/health | HTTP 200 |

## Hub link check

- Hubs scanned: **18** · hrefs checked: **28** · broken: **9**
- `Secondary_School/Junior Science/index.html`: Form%201/index.html, Form%202/index.html, Form%203/index.html
- `Secondary_School/Mathematics/index.html`: Form%201/index.html, Form%202/index.html, Form%203/index.html, Form%204/index.html, Form%205/index.html, Form%206/index.html

## Top 50 THIN paths

- `Primary_School/General_Studies/P1/02_Pack_My_Bag`
- `Primary_School/General_Studies/P1/03_Classroom_Rules`
- `Primary_School/General_Studies/P1/04_Focus_Class`
- `Primary_School/General_Studies/P1/05_Meeting_Friends`
- `Primary_School/General_Studies/P1/07_Teeth_Brushing`
- `Primary_School/General_Studies/P1/08_Healthy_Plate`
- `Primary_School/General_Studies/P1/09_My_Feelings`
- `Primary_School/General_Studies/P1/10_Good_Posture`
- `Primary_School/General_Studies/P1/11_My_Family_Tree`
- `Primary_School/General_Studies/P1/12_Housework_Hero`
- `Primary_School/General_Studies/P1/13_Home_Safety`
- `Primary_School/General_Studies/P1/14_Save_Water`
- `Primary_School/General_Studies/P1/15_Filial_Piety_Acts`
- `Primary_School/General_Studies/P1/17_Plant_Growth`
- `Primary_School/General_Studies/P1/18_Four_Seasons`
- `Primary_School/General_Studies/P1/19_Weather_Reporter`
- `Primary_School/General_Studies/P1/20_Recycling_Bin`
- `Primary_School/General_Studies/P1/21_Community_Map`
- `Primary_School/General_Studies/P1/22_Transport_Sounds`
- `Primary_School/General_Studies/P1/23_Good_Citizen`
- `Primary_School/General_Studies/P1/24_Helping_Professions`
- `Primary_School/General_Studies/P1/25_Sink_Or_Float`
- `Primary_School/General_Studies/P1/26_Magnet_Fun`
- `Primary_School/General_Studies/P1/27_Chinese_Festivals`
- `Primary_School/General_Studies/P1/28_China_Map_Puzzle`
- `Primary_School/General_Studies/P1/29_Flag_Raising`
- `Primary_School/General_Studies/P1/30_Simple_Machine`
- `Primary_School/General_Studies/P2/01_My_Timetable`
- `Primary_School/General_Studies/P2/02_Recess_Time`
- `Primary_School/General_Studies/P2/05_Light_School_Bag`
- `Primary_School/General_Studies/P2/06_Food_Pyramid`
- `Primary_School/General_Studies/P2/07_Hand_Washing`
- `Primary_School/General_Studies/P2/08_Eye_Care`
- `Primary_School/General_Studies/P2/10_Lets_Exercise`
- `Primary_School/General_Studies/P2/11_Growth_Timeline`
- `Primary_School/General_Studies/P2/12_Safe_Body`
- `Primary_School/General_Studies/P2/13_Privacy_Manager`
- `Primary_School/General_Studies/P2/14_Emotion_Matching`
- `Primary_School/General_Studies/P2/15_Emergency_Call`
- `Primary_School/General_Studies/P2/16_Traffic_Lights`
- `Primary_School/General_Studies/P2/17_MTR_Etiquette`
- `Primary_School/General_Studies/P2/18_Go_Shopping`
- `Primary_School/General_Studies/P2/19_Post_Office`
- `Primary_School/General_Studies/P2/21_Push_And_Pull`
- `Primary_School/General_Studies/P2/22_Light_And_Shadow`
- `Primary_School/General_Studies/P2/23_Save_Energy`
- `Primary_School/General_Studies/P2/24_Compass_Directions`
- `Primary_School/General_Studies/P2/25_Museum_Manners`
- `Primary_School/General_Studies/P2/26_Old_Hong_Kong`
- `Primary_School/General_Studies/P2/27_Chinese_Customs`

## All BROKEN paths (1)

- `Primary_School/Mathematics/P3/41_Fraction_Pizza_Share` — script_404:../../../../Secondary_School/Mathematics/Form%201/41_Fraction_Pizza_Share/index.html

---
*Elapsed: 7s*
