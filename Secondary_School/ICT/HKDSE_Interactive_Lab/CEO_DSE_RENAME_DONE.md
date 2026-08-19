# CEO DSE Rename - QA Done (Agent 10/10)

**Date:** 2026-07-29  
**Workspace:** Profile / HK Cirriculum/Secondary_School/ICT/HKDSE_Interactive_Lab  
**Authority map:** executed per `CEO_DSE_RENAME_PLAN.md` (same folder).

---

## Executive verdict

| Check | Result |
|-------|--------|
| Tree 1: `2025/` -> `DSE_Past_Paper_2025/` | **PASS** - old root absent; 56 child folders on disk (plan: 57 incl. asset dir) |
| Tree 2: `Long_Questions/` -> `DSE_Long_Questions/` | **PASS** - old root absent; chapter hubs `DSE_LQ_Ch02_InfoProcessing`, `DSE_LQ_Ch03_CompSystems`, `DSE_LQ_Ch05_Programming` |
| Parent lab folder `DSE_Interactive_Lab` -> `HKDSE_Interactive_Lab` | **PASS** — only `HKDSE_Interactive_Lab` under ICT |
| `HKDSE_Interactive_Lab/index.html` relative href targets | **PASS** — 75 relative links, **0 missing** |
| `Secondary_School/ICT/index.html` -> lab hub | **PASS** — `HKDSE_Interactive_Lab/index.html` |
| Sample HTML on disk | **PASS** — see table below |

**Fleet HTML hubs:** green. **Manifest / platform JSON:** still stale (gaps below).

---

## Sample path verification

| Entry | Path | Exists |
|-------|------|--------|
| ICT subject hub | `HK Cirriculum/Secondary_School/ICT/index.html` | yes |
| Lab master hub | `.../HKDSE_Interactive_Lab/index.html` | yes |
| 2025 past paper (sample) | `.../DSE_Past_Paper_2025/DSE_2025_P1A_Q28_Flowchart_Tracer/index.html` | yes |
| Long question (sample) | `.../DSE_Long_Questions/DSE_LQ_Ch02_InfoProcessing/DSE_2012_P1B_Q04_DB_Spreadsheet/index.html` | yes |
| F.4 mock | `.../F.4 Mock Paper/bookA.html` | yes |
| F.4 mock hub | `.../F.4 Mock Paper/ict_dse.html` | yes |
| 2025 tools | `.../DSE_2025_P1A_Tool_Number_Systems`, `.../DSE_2025_P1A_Tool_Twos_Complement` | yes |
| 2025 assets | `.../DSE_2025_Assets_PDF_Images` | yes |

Long-question apps with `index.html` under `DSE_Long_Questions`: **84** (plan: 82 app folders + hubs).

---

## Remaining gaps (non-blocking for local file:// navigation)

| Item | Issue | Action |
|------|--------|--------|
| hksteamai-platform/data/curriculum-map.json | 56 stale Interactive_Lab/2025/ paths; 85 stale Interactive_Lab/Long_Questions/ paths (new DSE_* paths also present) | Regenerate or bulk-replace curriculum map |
| `HK Cirriculum/garbage_report.json` | Historical entries list old `2025/` and `Long_Questions/Ch*` paths | Re-run garbage scan or patch report |
| `all_index_files.txt` (repo root) | Stale index inventory for deleted `2025/` tree | Regenerate index list |
| `HK Cirriculum/_tools/tree-report.json` | Stale path references | Regenerate tree report |
| `CEO_DSE_RENAME_PLAN.md` scope line | Still says `Long_Questions` / `2025` as scope labels | Doc-only; optional update |
| Temp migration scripts | `ICT/_tmp_update_lq_index.py`, `HKDSE_Interactive_Lab/_agent05_long_questions_inside.py` | Delete after sign-off |

No remaining `Interactive_Lab/Long_Questions/` or `Interactive_Lab/2025/` hrefs were found in live `*.html` under the lab (only docs, JSON artifacts, and tools).

---

## Full old -> new map

The tables below are the **complete** rename map from Agent 01/10 inventory. Folder renames only; HTML `<title>` / on-page headings unchanged unless noted.

---

## Naming convention (decisive)

### Prefix and roots

| Rule | Value |
|------|-------|
| Global prefix | `DSE_` ??marks HKDSE **past-paper** origin |
| Year bucket | `2025` ??**`DSE_Past_Paper_2025`** |
| Long-question tree | `Long_Questions` ??**`DSE_Long_Questions`** |

Rejected alternatives: `Past_Papers_2025` (less explicit), `Past_Paper_Long_Questions` (redundant with `DSE_Long_Questions`).

### Folder rules

- **ASCII only** in folder names: `A-Z`, `0-9`, `_`. No spaces, no `&`.
- **Zero-pad** question numbers 1?? as `Q01`?Q09`; use `Q10+` without extra padding.
- **Paper codes:** `P1A` (Paper 1A MC), `P1B` (Paper 1B structured / long), `P2` (Paper 2).
- **Topic suffix** (optional): short English slug after question id, e.g. `_Spreadsheet`, `_Data_Control`.
- **Supplemental tools** (not a single numbered MC item): `DSE_{YEAR}_{PAPER}_Tool_{Topic}`.
- **Chapter topic labs** (no year): `DSE_LQ_Ch{NN}_Topic_{Topic}`.
- **Sample / Practice papers:** `DSE_SP_` / `DSE_PP_` / `DSE_Practice_` before paper code.

### HTML display titles

- **Do not rename** bilingual or descriptive `<title>` / on-page headings unless broken.
- Folder rename only; titles stay human-readable, e.g. `HKDSE 2025 Paper 1A Q28 - 瘚??蕭頩文`.

### Path pattern (full)

```
HKDSE_Interactive_Lab/
  DSE_Past_Paper_2025/
    DSE_2025_P1A_Q01_Spreadsheet/
      index.html
  DSE_Long_Questions/
    DSE_LQ_Ch02_InfoProcessing/
      DSE_2012_P1B_Q04_DB_Spreadsheet/
        index.html
```

---

## Inventory summary

| Tree | Chapter / type | Count |
|------|----------------|-------|
| `2025` | Paper 1A apps (Q1?40, incl. combined) | 40 |
| `2025` | Paper 1B apps (Q1?11) | 11 |
| `2025` | Paper 2 apps (Q1?4) | 4 |
| `2025` | Supplemental P1A tools | 2 |
| `2025` | Duplicate (merge then delete) | 1 |
| `2025` | Asset folder (no `index.html`) | 1 |
| `2025` | **Total folders** | **57** |
| `Long_Questions` | Ch02 apps | 42 |
| `Long_Questions` | Ch03 apps | 38 |
| `Long_Questions` | Ch05 apps | 2 |
| `Long_Questions` | Chapter / root hub `index.html` | 4 |
| `Long_Questions` | **Total app folders** | **82** |

Note: Ch02 has no chapter hub `index.html`; navigation lives in `Long_Questions/index.html`.

---

## Tree 1: `2025` ??`DSE_Past_Paper_2025`

Base: `HK Cirriculum/Secondary_School/ICT/HKDSE_Interactive_Lab/2025/`  
New base: `HK Cirriculum/Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Past_Paper_2025/`

### Root

| Old | New | HTML title | Action |
|-----|-----|------------|--------|
| `2025/` | `DSE_Past_Paper_2025/` | ??| RENAME |

### Paper 1A (40 folders)

| Old folder | New folder | HTML `<title>` |
|------------|------------|----------------|
| `P1A_Q1` | `DSE_2025_P1A_Q01_Spreadsheet` | HKDSE 2025 Paper 1A Q1 - Spreadsheet Logic |
| `P1A_Q2` | `DSE_2025_P1A_Q02_System_Output` | HKDSE 2025 Paper 1A Q2 - System Output Factors |
| `P1A_Q3` | `DSE_2025_P1A_Q03_Data_Control` | HKDSE 2025 Paper 1A Q3 - Data Control |
| `P1A_Q4` | `DSE_2025_P1A_Q04_Binary_Adder` | HKDSE 2025 Paper 1A Q4 - Binary Adder |
| `P1A_Q5` | `DSE_2025_P1A_Q05_Data_Processing_Cycle` | HKDSE 2025 Paper 1A Q5 - Data Processing Cycle |
| `P1A_Q6` | `DSE_2025_P1A_Q06_Password_Verification` | HKDSE 2025 Paper 1A Q6 - Password Verification |
| `P1A_Q7` | `DSE_2025_P1A_Q07_Color_Depth` | HKDSE 2025 Paper 1A Q7 - Color Depth |
| `P1A_Q8` | `DSE_2025_P1A_Q08_Web_Upload` | HKDSE 2025 Paper 1A Q8 - Web Upload Logic |
| `P1A_Q9` | `DSE_2025_P1A_Q09_PDF_vs_HTML` | HKDSE 2025 Paper 1A Q9 - PDF vs HTML |
| `P1A_Q10` | `DSE_2025_P1A_Q10_SQL_Row_Count` | HKDSE 2025 Paper 1A Q10 - SQL Row Count |
| `P1A_Q11` | `DSE_2025_P1A_Q11_DBMS_Form` | HKDSE 2025 Paper 1A Q11 - DBMS Form |
| `P1A_Q12` | `DSE_2025_P1A_Q12_OS_Functions` | HKDSE 2025 Paper 1A Q12 - OS Functions |
| `P1A_Q13` | `DSE_2025_P1A_Q13_Virtualization` | HKDSE 2025 Paper 1A Q13 - Virtualization |
| `P1A_Q14` | `DSE_2025_P1A_Q14_Distributed_Systems` | HKDSE 2025 Paper 1A Q14 - Distributed Systems |
| `P1A_Q15` | `DSE_2025_P1A_Q15_Data_Compression` | HKDSE 2025 Paper 1A Q15 - Data Compression |
| `P1A_Q16` | `DSE_2025_P1A_Q16_Memory_Hierarchy` | HKDSE 2025 Paper 1A Q16 - Memory Hierarchy |
| `P1A_Q17` | `DSE_2025_P1A_Q17_Address_Space` | HKDSE 2025 Paper 1A Q17 - Address Space |
| `P1A_Q18` | `DSE_2025_P1A_Q18_IPv4_Validator` | HKDSE 2025 Paper 1A Q18 - IPv4 Validator |
| `P1A_Q19` | `DSE_2025_P1A_Q19_Wireless_vs_Wired` | HKDSE 2025 Paper 1A Q19 - Wireless vs Wired |
| `P1A_Q20` | `DSE_2025_P1A_Q20_Star_Topology` | HKDSE 2025 Paper 1A Q20 - Star Topology |
| `P1A_Q21` | `DSE_2025_P1A_Q21_Ecommerce_Workflow` | HKDSE 2025 Paper 1A Q21 - E-commerce Workflow |
| `P1A_Q22` | `DSE_2025_P1A_Q22_HTML_Facts` | HKDSE 2025 Paper 1A Q22 - HTML Facts |
| `P1A_Q23` | `DSE_2025_P1A_Q23_Broken_Image` | HKDSE 2025 Paper 1A Q23 - Broken Image Detective |
| `P1A_Q24` | `DSE_2025_P1A_Q24_TCP_IP_Packet` | HKDSE 2025 Paper 1A Q24 - TCP/IP Packet Tracer |
| `P1A_Q25` | `DSE_2025_P1A_Q25_URL_Anatomizer` | HKDSE 2025 Paper 1A Q25 - URL Anatomizer |
| `P1A_Q26` | `DSE_2025_P1A_Q26_Boolean_Logic` | HKDSE 2025 Paper 1A Q26 - Boolean Logic Explorer |
| `P1A_Q27` | `DSE_2025_P1A_Q27_Infinite_Loop` | HKDSE 2025 Paper 1A Q27 - Infinite Loop Fixer |
| `P1A_Q28` | `DSE_2025_P1A_Q28_Flowchart_Tracer` | HKDSE 2025 Paper 1A Q28 - 瘚??蕭頩文 |
| `P1A_Q29` | `DSE_2025_P1A_Q29_Flowchart_M1_M2` | HKDSE 2025 Paper 1A Q29 - 瘚???M1 vs M2 |
| `P1A_Q30` | `DSE_2025_P1A_Q30_Boundary_Value` | HKDSE 2025 Paper 1A Q30 - Boundary Value Analysis |
| `P1A_Q31` | `DSE_2025_P1A_Q31_Data_Validation_Loop` | HKDSE 2025 Paper 1A Q31 - Data Validation Loop |
| `P1A_Q32` | `DSE_2025_P1A_Q32_Logic_Equivalence` | HKDSE 2025 Paper 1A Q32 - Logic Equivalence |
| `P1A_Q33` | `DSE_2025_P1A_Q33_Logic_Gate_Check` | HKDSE 2025 Paper 1A Q33 - Logic Gate Check |
| `P1A_Q34_35` | `DSE_2025_P1A_Q34_Q35_Array_Trace` | HKDSE 2025 Paper 1A Q34 & Q35 - Array Trace |
| `P1A_Q36` | `DSE_2025_P1A_Q36_Loop_Calculation` | HKDSE 2025 Paper 1A Q36 - Loop Calculation |
| `P1A_Q37` | `DSE_2025_P1A_Q37_Swap_Logic` | HKDSE 2025 Paper 1A Q37 - Swap Logic |
| `P1A_Q38` | `DSE_2025_P1A_Q38_Conditional_Sum` | HKDSE 2025 Paper 1A Q38 - Conditional Sum |
| `P1A_Q39_40` | `DSE_2025_P1A_Q39_Q40_IT_Theory` | HKDSE 2025 Paper 1A Q39 & Q40 - IT Theory |

### Paper 1A supplemental tools

| Old folder | New folder | HTML `<title>` | Action |
|------------|------------|----------------|--------|
| `Paper1A_Number_Systems` | `DSE_2025_P1A_Tool_Number_Systems` | HKDSE ICT - Number System Converter | RENAME |
| `Paper1A_Twos_Complement` | `DSE_2025_P1A_Tool_Twos_Complement` | HKDSE ICT - Two's Complement Visualizer | RENAME |
| `Paper1A_Q37_Swap_Logic` | ??| HKDSE ICT - Swap Logic | **DELETE** after merge into `DSE_2025_P1A_Q37_Swap_Logic` (`P1A_Q37` is canonical) |

### Paper 1B (11 folders)

| Old folder | New folder | HTML `<title>` |
|------------|------------|----------------|
| `P1B_Q1` | `DSE_2025_P1B_Q01_Spreadsheet` | HKDSE 2025 Paper 1B Q1 - Spreadsheet Logic |
| `P1B_Q2` | `DSE_2025_P1B_Q02_Authentication_PKI` | HKDSE 2025 Paper 1B Q2 - Authentication & PKI |
| `P1B_Q3` | `DSE_2025_P1B_Q03_Multimedia_Security` | HKDSE 2025 Paper 1B Q3 - Multimedia & Security |
| `P1B_Q4` | `DSE_2025_P1B_Q04_Web_AI` | HKDSE 2025 Paper 1B Q4 - Web & AI |
| `P1B_Q5` | `DSE_2025_P1B_Q05_Hardware_Drivers` | HKDSE 2025 Paper 1B Q5 - Hardware & Drivers |
| `P1B_Q6` | `DSE_2025_P1B_Q06_Array_Manipulation` | HKDSE 2025 Paper 1B Q6 - Array Manipulation |
| `P1B_Q7` | `DSE_2025_P1B_Q07_Logic_Gate_Simulator` | HKDSE ICT - Logic Gate Simulator |
| `P1B_Q8` | `DSE_2025_P1B_Q08_Scoring_Algorithm` | HKDSE ICT - Scoring Algorithm |
| `P1B_Q9` | `DSE_2025_P1B_Q09_Check_Digit_Flowchart` | HKDSE 2025 Paper 1B Q9 - Check Digit Flowchart |
| `P1B_Q10` | `DSE_2025_P1B_Q10_While_Loop_Tracer` | HKDSE 2025 Paper 1B Q10 - While Loop Tracer |
| `P1B_Q11` | `DSE_2025_P1B_Q11_Trace_Table` | HKDSE 2025 Paper 1B Q11 - Trace Table Generator |

### Paper 2 (4 folders)

| Old folder | New folder | HTML `<title>` |
|------------|------------|----------------|
| `P2_Q1` | `DSE_2025_P2_Q01_SQL_Lab` | HKDSE ICT - SQL Lab |
| `P2_Q2` | `DSE_2025_P2_Q02_IP_Network` | HKDSE ICT - IP & Network Lab |
| `P2_Q3` | `DSE_2025_P2_Q03_Bitmap_vs_Vector` | HKDSE ICT - Bitmap vs Vector |
| `P2_Q4` | `DSE_2025_P2_Q04_Algorithm_Race` | HKDSE ICT - Algorithm Race |

### Assets

| Old folder | New folder | Action |
|------------|------------|--------|
| `pdf_images` | `DSE_2025_Assets_PDF_Images` | RENAME (empty asset dir; keep for future PDF extracts) |

---

## Tree 2: `Long_Questions` ??`DSE_Long_Questions`

Base: `HK Cirriculum/Secondary_School/ICT/HKDSE_Interactive_Lab/Long_Questions/`  
New base: `HK Cirriculum/Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/`

### Root and chapter hubs

| Old | New | HTML `<title>` |
|-----|-----|----------------|
| `Long_Questions/` | `DSE_Long_Questions/` | HKDSE ICT Interactive Labs - Master Menu |
| `Long_Questions/index.html` | `DSE_Long_Questions/index.html` | (update internal `./Ch*` paths) |
| `Ch2_InfoProc/` | `DSE_LQ_Ch02_InfoProcessing/` | ??(no chapter index) |
| `Ch3_CompSys/` | `DSE_LQ_Ch03_CompSystems/` | Ch3 Computer Systems Long Questions |
| `Ch3_CompSys/index.html` | `DSE_LQ_Ch03_CompSystems/index.html` | (update child paths) |
| `Ch5_Programming/` | `DSE_LQ_Ch05_Programming/` | HKDSE 2023 Q3: Sorting Trace |
| `Ch5_Programming/index.html` | `DSE_LQ_Ch05_Programming/index.html` | (update child paths) |

### Ch02 ??Information Processing (`Ch2_InfoProc` ??`DSE_LQ_Ch02_InfoProcessing`)

| Old folder | New folder | HTML `<title>` |
|------------|------------|----------------|
| `Ex01_SP_Q1_VideoEditing` | `DSE_SP_P1B_Q01_Video_Editing` | HKDSE SP Q1: Video Editing Specs |
| `Ex02_PP_Q1_SystemPerformance` | `DSE_PP_P1B_Q01_System_Performance` | HKDSE PP Q1: System Performance |
| `Ex03_2012_Q4` | `DSE_2012_P1B_Q04_DB_Spreadsheet` | Ex03: 2012 Q4 - DB & Spreadsheet |
| `Ex04_2013_Q2_URL_QR` | `DSE_2013_P1B_Q02_URL_QR` | Ex04: 2013 Q2 - URL vs QR Code |
| `Ex05_2013_Q3` | `DSE_2013_P1B_Q03_Ergonomics_Wireless` | Ex05: 2013 Q3 - Ergonomics & Wireless |
| `Ex06_2013_Q4` | `DSE_2013_P1B_Q04_OLE_Office` | Ex06: 2013 Q4 - OLE / Office Integration |
| `Ex07_2014_Q1_Menu_System` | `DSE_2014_P1B_Q01_Menu_System` | Ex07: 2014 Q1 - Menu Ordering System |
| `Ex08_2014_Q4` | `DSE_2014_P1B_Q04_DB_Keys_Login` | Ex09: 2014 Q4 - Database Keys & Login |
| `Ex09_2014_Q5` | `DSE_2014_P1B_Q05_Desktop_Mobile` | Ex10: 2014 Q5 - Desktop vs Mobile |
| `Ex10_2015_Q2_ExcelSQL` | `DSE_2015_P1B_Q02_Excel_SQL` | HKDSE 2015 Q2: Spreadsheet & SQL |
| `Ex11_2015_Q5` | `DSE_2015_P1B_Q05_Web_Form` | Ex11: 2015 Q5 - Web Form Design |
| `Ex12_2016_Q1_Spreadsheet` | `DSE_2016_P1B_Q01_Spreadsheet` | HKDSE 2016 Paper 1B Q1 - Spreadsheet Formatting |
| `Ex13_2016_Q4` | `DSE_2016_P1B_Q04_POS_Pivot` | Ex13: 2016 Q4 - POS & Pivot Tables |
| `Ex14_2016_Q5` | `DSE_2016_P1B_Q05_Devices_DB` | Ex14: 2016 Q5 - Devices & Database |
| `Ex15_2017_Q1_Encoding` | `DSE_2017_P1B_Q01_Encoding` | HKDSE 2017 Paper 1B Q1 - Encoding & Ergonomics |
| `Ex16_2017_Q2_VideoFormat` | `DSE_2017_P1B_Q02_Multimedia` | HKDSE 2017 Q2: Multimedia |
| `Ex17_2017_Q4` | `DSE_2017_P1B_Q04_Event_Booking` | Ex17: 2017 Q4 - Event Booking System |
| `Ex18_2018_Q1_Workstation` | `DSE_2018_P1B_Q01_Workstation` | HKDSE 2018 Paper 1B Q1 - Workstation Builder |
| `Ex19_2018_Q3_LibraryDB` | `DSE_2018_P1B_Q03_Library_DB` | HKDSE 2018 Q3: Library Database |
| `Ex20_2018_Q4` | `DSE_2018_P1B_Q04_Multimedia_Formats` | Ex20: 2018 Q4 - Multimedia Formats |
| `Ex21_2019_Q2` | `DSE_2019_P1B_Q02_Auth_Search` | Ex21: 2019 Q2 - Auth & Search |
| `Ex22_2019_Q3` | `DSE_2019_P1B_Q03_Senior_Accessibility` | Ex22: 2019 Q3 - Senior Accessibility |
| `Ex23_2020_Q1_StudentDB` | `DSE_2020_P1B_Q01_Student_DB` | HKDSE 2020 Paper 1B Q1 - Student Database |
| `Ex24_2020_Q3_SqlValidation` | `DSE_2020_P1B_Q03_SQL_Validation` | HKDSE 2020 Q3: DB & SQL Validation |
| `Ex25_2020_Q4` | `DSE_2020_P1B_Q04_Chart_Config` | Ex25: 2020 Q4 - Chart Config |
| `Ex26_2020_Q5` | `DSE_2020_P1B_Q05_Bit_Pattern` | Ex26: 2020 Q5 - Bit Pattern |
| `Ex27_2021_Q1_VideoEditing` | `DSE_2021_P1B_Q01_Video_Editing` | HKDSE 2021 Paper 1B Q1 - Video Editing Hardware |
| `Ex28_2021_Q3_BinaryArray` | `DSE_2021_P1B_Q03_Binary_Array` | HKDSE 2021 Q3: Binary Array |
| `Ex29_2021_Q4` | `DSE_2021_P1B_Q04_SQL_Keys` | Ex29: 2021 Q4 - SQL & Keys |
| `Ex30_2021_Q5` | `DSE_2021_P1B_Q05_Storage_Calc` | Ex30: 2021 Q5 - Storage Calc |
| `Ex31_2022_Q2` | `DSE_2022_P1B_Q02_Security_DBMS` | Ex31: 2022 Q2 - Security & DBMS |
| `Ex32_2022_Q3_DataControl` | `DSE_2022_P1B_Q03_Data_Control` | HKDSE 2022 Q3: Data Control |
| `Ex33_2023_Q1_Upgrade` | `DSE_2023_P1B_Q01_Hardware_Upgrade` | HKDSE 2023 Paper 1B Q1 - Hardware Upgrade & Cloud |
| `Ex34_2023_Q2_SQL_Group` | `DSE_2023_P1B_Q02_SQL_Group` | HKDSE 2023 Q2: SQL Group By |
| `Ex35_2023_Q3_Sorting` | `DSE_2023_P1B_Q03_Insertion_Sort` | Ex35: 2023 Q3 - Insertion Sort |
| `Ex36_2023_Q5_Auth` | `DSE_2023_P1B_Q05_Auth_IoT` | HKDSE 2023 Q5: Member Auth & IoT |
| `Ex37_2024_Q1_DataIntegrity` | `DSE_2024_P1B_Q01_Data_Integrity` | HKDSE 2024 Q1: Data Integrity |
| `Ex38_2024_Q4` | `DSE_2024_P1B_Q04_Algo_SQL` | Ex38: 2024 Q4 - Algo & SQL |
| `Ex39_Topic_CharEncoding` | `DSE_LQ_Ch02_Topic_Char_Encoding` | HKDSE ICT Ch2 - Character Encoding & Parity |
| `Ex40_Topic_CheckDigits` | `DSE_LQ_Ch02_Topic_Check_Digits` | HKDSE ICT Ch2 - Check Digit Laboratory |
| `Ex41_Topic_FileSize` | `DSE_LQ_Ch02_Topic_File_Size` | HKDSE ICT Ch2 - Multimedia File Size Calculator |
| `Ex42_Topic_NumberSystems` | `DSE_LQ_Ch02_Topic_Number_Systems` | HKDSE ICT Ch2 - 2's Complement & Number Systems |

### Ch03 ??Computer Systems (`Ch3_CompSys` ??`DSE_LQ_Ch03_CompSystems`)

| Old folder | New folder | HTML `<title>` |
|------------|------------|----------------|
| `Ex01_Practice_Q2` | `DSE_Practice_P1B_Q02` | Ex01 Practice Q2 |
| `Ex02_Practice_Q3` | `DSE_Practice_P1B_Q03` | Ex02 Practice Q3 |
| `Ex03_2012_Q1_DB_Concepts` | `DSE_2012_P1B_Q01_DB_Concepts` | HKDSE 2012 Q1: Database Concepts |
| `Ex04_2012_Q3_Assembly` | `DSE_2012_P1B_Q03_Assembly` | HKDSE 2012 Q3: Assembly Counter |
| `Ex05_2013_Q1_Office_Setup` | `DSE_2013_P1B_Q01_Office_Network` | HKDSE 2013 Q1: Office Network Setup |
| `Ex06_2013_Q5` | `DSE_2013_P1B_Q05` | Ex06 2013 Q5 |
| `Ex07_2014_Q2` | `DSE_2014_P1B_Q02` | Ex07 2014 Q2 |
| `Ex08_2014_Q3_DataRep` | `DSE_2014_P1B_Q03_Data_Representation` | HKDSE 2014 Q3: Data Representation |
| `Ex09_2014_Q5` | `DSE_2014_P1B_Q05` | Ex09 2014 Q5 |
| `Ex10_2015_Q1_Drone_Control` | `DSE_2015_P1B_Q01_Drone_Control` | HKDSE 2015 Paper 1B Q1 - Drone Control |
| `Ex11_2015_Q3_CheckDigit` | `DSE_2015_P1B_Q03_Validation_Email` | HKDSE 2015 Q3: Validation & Email |
| `Ex12_2015_Q4` | `DSE_2015_P1B_Q04` | Ex12 2015 Q4 |
| `Ex13_2016_Q2_LogicGates` | `DSE_2016_P1B_Q02_Logic_Gates` | HKDSE Chapter 3: Logic Gates Past Paper |
| `Ex14_2016_Q3` | `DSE_2016_P1B_Q03` | Ex14 2016 Q3 |
| `Ex15_2016_Q4` | `DSE_2016_P1B_Q04` | Ex15 2016 Q4 |
| `Ex16_2016_Q5_Storage` | `DSE_2016_P1B_Q05_RAID_Storage` | HKDSE Ch3: 2016 Q5 RAID & Storage |
| `Ex17_2017_Q1_Encoding` | `DSE_2017_P1B_Q01_Encoding` | HKDSE 2017 Paper 1B Q1 - Encoding & Ergonomics |
| `Ex18_2017_Q2_VideoFormat` | `DSE_2017_P1B_Q02_Multimedia` | HKDSE 2017 Q2: Multimedia |
| `Ex19_2017_Q3_HomeNetwork` | `DSE_2017_P1B_Q03_Home_Network` | HKDSE Ch3: 2017 Q3 Home Network |
| `Ex20_2018_Q1_Defrag` | `DSE_2018_P1B_Q01_OS_Defrag` | HKDSE Ch3: OS Modules (Defrag & Spooling) |
| `Ex21_2018_Q3_LibraryDB` | `DSE_2018_P1B_Q03_Library_DB` | HKDSE 2018 Q3: Library Database |
| `Ex22_2019_Q1_Booking` | `DSE_2019_P1B_Q01_Clinic_Booking` | HKDSE 2019 Paper 1B Q1 - Clinic Booking |
| `Ex23_2020_Q2` | `DSE_2020_P1B_Q02` | Ex23 2020 Q2 |
| `Ex24_2020_Q4` | `DSE_2020_P1B_Q04` | Ex24 2020 Q4 |
| `Ex25_2020_Q5` | `DSE_2020_P1B_Q05` | Ex25 2020 Q5 |
| `Ex26_2021_Q2_CPU_Trace` | `DSE_2021_P1B_Q02_CPU_Trace` | HKDSE Ch3: CPU Trace Table Challenge |
| `Ex27_2021_Q5` | `DSE_2021_P1B_Q05` | Ex27 2021 Q5 |
| `Ex28_2022_Q1_WFH_Setup` | `DSE_2022_P1B_Q01_WFH_Setup` | HKDSE 2022 Q1: WFH Setup |
| `Ex29_2022_Q5` | `DSE_2022_P1B_Q05` | Ex29 2022 Q5 |
| `Ex30_2023_Q1_Upgrade` | `DSE_2023_P1B_Q01_Hardware_Upgrade` | HKDSE 2023 Paper 1B Q1 - Hardware Upgrade & Cloud |
| `Ex31_2023_Q5_Auth_IoT` | `DSE_2023_P1B_Q05_Auth_IoT` | HKDSE 2023 Q5: Member Auth & IoT |
| `Ex32_2024_Q2` | `DSE_2024_P1B_Q02` | Ex32 2024 Q2 |
| `Ex33_Topic_EmailProtocols` | `DSE_LQ_Ch03_Topic_Email_Protocols` | HKDSE Ch3: Email Protocols |
| `Ex34_Topic_FloatingPoint` | `DSE_LQ_Ch03_Topic_Floating_Point` | HKDSE Ch3: Floating Point Representation |
| `Q01_CPU_Cycle` | `DSE_LQ_Ch03_Topic_CPU_Cycle` | HKDSE ICT Ch3 - CPU Instruction Cycle |
| `Q02_LogicGates` | `DSE_LQ_Ch03_Topic_Logic_Gates` | HKDSE ICT Ch3 - Logic Gates & Truth Tables |
| `Q03_DataTransfer` | `DSE_LQ_Ch03_Topic_Data_Transfer` | HKDSE ICT Ch3 - Data Transfer Calculator |
| `Q04_StorageCapacity` | `DSE_LQ_Ch03_Topic_Storage_Capacity` | HKDSE ICT Ch3 - Storage Capacity & Slack Space |

### Ch05 ??Programming (`Ch5_Programming` ??`DSE_LQ_Ch05_Programming`)

| Old folder | New folder | HTML `<title>` |
|------------|------------|----------------|
| `Ex02_Sorting_Trace` | `DSE_LQ_Ch05_Topic_Sorting_Trace` | HKDSE Ch4: Sorting Algorithms Trace |
| `Ex03_2019_Q1_ArrayAlgorithm` | `DSE_2019_P1B_Q01_Array_Algorithm` | HKDSE Ch4: 2019 Q1 Array Algorithm |

Note: folder is `Ch5_Programming` but some HTML titles say "Ch4" ??keep HTML titles; folder follows curriculum chapter 5.

---

## Sibling agent checklist

1. **Rename folders** per tables above (git `mv` preferred).
2. **Delete** `Paper1A_Q37_Swap_Logic` after confirming `P1A_Q37` content is complete.
3. **Update hub menus:** `DSE_Long_Questions/index.html`, `DSE_LQ_Ch03_CompSystems/index.html`, `DSE_LQ_Ch05_Programming/index.html` ??all `./Ch*` and `./Ex*` hrefs.
4. **Update fleet manifests:** `HK Cirriculum/QA_FLEET_ALL_APPS.json`, `QA_NCS_TOPRIGHT_COVERAGE.md`, any ICT subject index linking to old paths.
5. **Do not change** HTML `<title>` or visible bilingual headings unless a separate content pass is assigned.
6. **Cross-chapter duplicates:** Same year/question may appear in Ch02 and Ch03 (e.g. `DSE_2023_P1B_Q01_Hardware_Upgrade`). Paths differ by chapter; both folders are valid.
7. **Future years:** Add `DSE_Past_Paper_{YEAR}/` siblings under `HKDSE_Interactive_Lab/`, not bare year numbers.

---

## Quick reference ??new path examples

```
HKDSE_Interactive_Lab/DSE_Past_Paper_2025/DSE_2025_P1A_Q28_Flowchart_Tracer/index.html
HKDSE_Interactive_Lab/DSE_Past_Paper_2025/DSE_2025_P1B_Q04_Web_AI/index.html
HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch02_InfoProcessing/DSE_2012_P1B_Q04_DB_Spreadsheet/index.html
HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_CPU_Cycle/index.html
```

**Total renames:** 2 root trees + 3 chapter folders + 138 app/asset folders ??1 duplicate deletion = **142 path operations**.

