"""Repo-wide ICT DSE path reference fix (Agent 07)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"c:\Users\keith\OneDrive\Github\Profile")

# --- 2025 app folders (old leaf name -> new leaf name) ---
P1A = {
    "P1A_Q1": "DSE_2025_P1A_Q01_Spreadsheet",
    "P1A_Q2": "DSE_2025_P1A_Q02_System_Output",
    "P1A_Q3": "DSE_2025_P1A_Q03_Data_Control",
    "P1A_Q4": "DSE_2025_P1A_Q04_Binary_Adder",
    "P1A_Q5": "DSE_2025_P1A_Q05_Data_Processing_Cycle",
    "P1A_Q6": "DSE_2025_P1A_Q06_Password_Verification",
    "P1A_Q7": "DSE_2025_P1A_Q07_Color_Depth",
    "P1A_Q8": "DSE_2025_P1A_Q08_Web_Upload",
    "P1A_Q9": "DSE_2025_P1A_Q09_PDF_vs_HTML",
    "P1A_Q10": "DSE_2025_P1A_Q10_SQL_Row_Count",
    "P1A_Q11": "DSE_2025_P1A_Q11_DBMS_Form",
    "P1A_Q12": "DSE_2025_P1A_Q12_OS_Functions",
    "P1A_Q13": "DSE_2025_P1A_Q13_Virtualization",
    "P1A_Q14": "DSE_2025_P1A_Q14_Distributed_Systems",
    "P1A_Q15": "DSE_2025_P1A_Q15_Data_Compression",
    "P1A_Q16": "DSE_2025_P1A_Q16_Memory_Hierarchy",
    "P1A_Q17": "DSE_2025_P1A_Q17_Address_Space",
    "P1A_Q18": "DSE_2025_P1A_Q18_IPv4_Validator",
    "P1A_Q19": "DSE_2025_P1A_Q19_Wireless_vs_Wired",
    "P1A_Q20": "DSE_2025_P1A_Q20_Star_Topology",
    "P1A_Q21": "DSE_2025_P1A_Q21_Ecommerce_Workflow",
    "P1A_Q22": "DSE_2025_P1A_Q22_HTML_Facts",
    "P1A_Q23": "DSE_2025_P1A_Q23_Broken_Image",
    "P1A_Q24": "DSE_2025_P1A_Q24_TCP_IP_Packet",
    "P1A_Q25": "DSE_2025_P1A_Q25_URL_Anatomizer",
    "P1A_Q26": "DSE_2025_P1A_Q26_Boolean_Logic",
    "P1A_Q27": "DSE_2025_P1A_Q27_Infinite_Loop",
    "P1A_Q28": "DSE_2025_P1A_Q28_Flowchart_Tracer",
    "P1A_Q29": "DSE_2025_P1A_Q29_Flowchart_M1_M2",
    "P1A_Q30": "DSE_2025_P1A_Q30_Boundary_Value",
    "P1A_Q31": "DSE_2025_P1A_Q31_Data_Validation_Loop",
    "P1A_Q32": "DSE_2025_P1A_Q32_Logic_Equivalence",
    "P1A_Q33": "DSE_2025_P1A_Q33_Logic_Gate_Check",
    "P1A_Q34_35": "DSE_2025_P1A_Q34_Q35_Array_Trace",
    "P1A_Q36": "DSE_2025_P1A_Q36_Loop_Calculation",
    "P1A_Q37": "DSE_2025_P1A_Q37_Swap_Logic",
    "P1A_Q38": "DSE_2025_P1A_Q38_Conditional_Sum",
    "P1A_Q39_40": "DSE_2025_P1A_Q39_Q40_IT_Theory",
    "Paper1A_Number_Systems": "DSE_2025_P1A_Tool_Number_Systems",
    "Paper1A_Twos_Complement": "DSE_2025_P1A_Tool_Twos_Complement",
    "Paper1A_Q37_Swap_Logic": "DSE_2025_P1A_Q37_Swap_Logic",
    "pdf_images": "DSE_2025_Assets_PDF_Images",
}
P1B = {
    "P1B_Q1": "DSE_2025_P1B_Q01_Spreadsheet",
    "P1B_Q2": "DSE_2025_P1B_Q02_Authentication_PKI",
    "P1B_Q3": "DSE_2025_P1B_Q03_Multimedia_Security",
    "P1B_Q4": "DSE_2025_P1B_Q04_Web_AI",
    "P1B_Q5": "DSE_2025_P1B_Q05_Hardware_Drivers",
    "P1B_Q6": "DSE_2025_P1B_Q06_Array_Manipulation",
    "P1B_Q7": "DSE_2025_P1B_Q07_Logic_Gate_Simulator",
    "P1B_Q8": "DSE_2025_P1B_Q08_Scoring_Algorithm",
    "P1B_Q9": "DSE_2025_P1B_Q09_Check_Digit_Flowchart",
    "P1B_Q10": "DSE_2025_P1B_Q10_While_Loop_Tracer",
    "P1B_Q11": "DSE_2025_P1B_Q11_Trace_Table",
}
P2 = {
    "P2_Q1": "DSE_2025_P2_Q01_SQL_Lab",
    "P2_Q2": "DSE_2025_P2_Q02_IP_Network",
    "P2_Q3": "DSE_2025_P2_Q03_Bitmap_vs_Vector",
    "P2_Q4": "DSE_2025_P2_Q04_Algorithm_Race",
}
PAST_2025_LEAVES = {**P1A, **P1B, **P2}

CH2 = {
    "Ex01_SP_Q1_VideoEditing": "DSE_SP_P1B_Q01_Video_Editing",
    "Ex02_PP_Q1_SystemPerformance": "DSE_PP_P1B_Q01_System_Performance",
    "Ex03_2012_Q4": "DSE_2012_P1B_Q04_DB_Spreadsheet",
    "Ex04_2013_Q2_URL_QR": "DSE_2013_P1B_Q02_URL_QR",
    "Ex05_2013_Q3": "DSE_2013_P1B_Q03_Ergonomics_Wireless",
    "Ex06_2013_Q4": "DSE_2013_P1B_Q04_OLE_Office",
    "Ex07_2014_Q1_Menu_System": "DSE_2014_P1B_Q01_Menu_System",
    "Ex08_2014_Q4": "DSE_2014_P1B_Q04_DB_Keys_Login",
    "Ex09_2014_Q5": "DSE_2014_P1B_Q05_Desktop_Mobile",
    "Ex10_2015_Q2_ExcelSQL": "DSE_2015_P1B_Q02_Excel_SQL",
    "Ex11_2015_Q5": "DSE_2015_P1B_Q05_Web_Form",
    "Ex12_2016_Q1_Spreadsheet": "DSE_2016_P1B_Q01_Spreadsheet",
    "Ex13_2016_Q4": "DSE_2016_P1B_Q04_POS_Pivot",
    "Ex14_2016_Q5": "DSE_2016_P1B_Q05_Devices_DB",
    "Ex15_2017_Q1_Encoding": "DSE_2017_P1B_Q01_Encoding",
    "Ex16_2017_Q2_VideoFormat": "DSE_2017_P1B_Q02_Multimedia",
    "Ex17_2017_Q4": "DSE_2017_P1B_Q04_Event_Booking",
    "Ex18_2018_Q1_Workstation": "DSE_2018_P1B_Q01_Workstation",
    "Ex19_2018_Q3_LibraryDB": "DSE_2018_P1B_Q03_Library_DB",
    "Ex20_2018_Q4": "DSE_2018_P1B_Q04_Multimedia_Formats",
    "Ex21_2019_Q2": "DSE_2019_P1B_Q02_Auth_Search",
    "Ex22_2019_Q3": "DSE_2019_P1B_Q03_Senior_Accessibility",
    "Ex23_2020_Q1_StudentDB": "DSE_2020_P1B_Q01_Student_DB",
    "Ex24_2020_Q3_SqlValidation": "DSE_2020_P1B_Q03_SQL_Validation",
    "Ex25_2020_Q4": "DSE_2020_P1B_Q04_Chart_Config",
    "Ex26_2020_Q5": "DSE_2020_P1B_Q05_Bit_Pattern",
    "Ex27_2021_Q1_VideoEditing": "DSE_2021_P1B_Q01_Video_Editing",
    "Ex28_2021_Q3_BinaryArray": "DSE_2021_P1B_Q03_Binary_Array",
    "Ex29_2021_Q4": "DSE_2021_P1B_Q04_SQL_Keys",
    "Ex30_2021_Q5": "DSE_2021_P1B_Q05_Storage_Calc",
    "Ex31_2022_Q2": "DSE_2022_P1B_Q02_Security_DBMS",
    "Ex32_2022_Q3_DataControl": "DSE_2022_P1B_Q03_Data_Control",
    "Ex33_2023_Q1_Upgrade": "DSE_2023_P1B_Q01_Hardware_Upgrade",
    "Ex34_2023_Q2_SQL_Group": "DSE_2023_P1B_Q02_SQL_Group",
    "Ex35_2023_Q3_Sorting": "DSE_2023_P1B_Q03_Insertion_Sort",
    "Ex36_2023_Q5_Auth": "DSE_2023_P1B_Q05_Auth_IoT",
    "Ex37_2024_Q1_DataIntegrity": "DSE_2024_P1B_Q01_Data_Integrity",
    "Ex38_2024_Q4": "DSE_2024_P1B_Q04_Algo_SQL",
    "Ex39_Topic_CharEncoding": "DSE_LQ_Ch02_Topic_Char_Encoding",
    "Ex40_Topic_CheckDigits": "DSE_LQ_Ch02_Topic_Check_Digits",
    "Ex41_Topic_FileSize": "DSE_LQ_Ch02_Topic_File_Size",
    "Ex42_Topic_NumberSystems": "DSE_LQ_Ch02_Topic_Number_Systems",
}
CH3 = {
    "Ex01_Practice_Q2": "DSE_Practice_P1B_Q02",
    "Ex02_Practice_Q3": "DSE_Practice_P1B_Q03",
    "Ex03_2012_Q1_DB_Concepts": "DSE_2012_P1B_Q01_DB_Concepts",
    "Ex04_2012_Q3_Assembly": "DSE_2012_P1B_Q03_Assembly",
    "Ex05_2013_Q1_Office_Setup": "DSE_2013_P1B_Q01_Office_Network",
    "Ex06_2013_Q5": "DSE_2013_P1B_Q05",
    "Ex07_2014_Q2": "DSE_2014_P1B_Q02",
    "Ex08_2014_Q3_DataRep": "DSE_2014_P1B_Q03_Data_Representation",
    "Ex09_2014_Q5": "DSE_2014_P1B_Q05",
    "Ex10_2015_Q1_Drone_Control": "DSE_2015_P1B_Q01_Drone_Control",
    "Ex11_2015_Q3_CheckDigit": "DSE_2015_P1B_Q03_Validation_Email",
    "Ex12_2015_Q4": "DSE_2015_P1B_Q04",
    "Ex13_2016_Q2_LogicGates": "DSE_2016_P1B_Q02_Logic_Gates",
    "Ex14_2016_Q3": "DSE_2016_P1B_Q03",
    "Ex15_2016_Q4": "DSE_2016_P1B_Q04",
    "Ex16_2016_Q5_Storage": "DSE_2016_P1B_Q05_RAID_Storage",
    "Ex17_2017_Q1_Encoding": "DSE_2017_P1B_Q01_Encoding",
    "Ex18_2017_Q2_VideoFormat": "DSE_2017_P1B_Q02_Multimedia",
    "Ex19_2017_Q3_HomeNetwork": "DSE_2017_P1B_Q03_Home_Network",
    "Ex20_2018_Q1_Defrag": "DSE_2018_P1B_Q01_OS_Defrag",
    "Ex21_2018_Q3_LibraryDB": "DSE_2018_P1B_Q03_Library_DB",
    "Ex22_2019_Q1_Booking": "DSE_2019_P1B_Q01_Clinic_Booking",
    "Ex23_2020_Q2": "DSE_2020_P1B_Q02",
    "Ex24_2020_Q4": "DSE_2020_P1B_Q04",
    "Ex25_2020_Q5": "DSE_2020_P1B_Q05",
    "Ex26_2021_Q2_CPU_Trace": "DSE_2021_P1B_Q02_CPU_Trace",
    "Ex27_2021_Q5": "DSE_2021_P1B_Q05",
    "Ex28_2022_Q1_WFH_Setup": "DSE_2022_P1B_Q01_WFH_Setup",
    "Ex29_2022_Q5": "DSE_2022_P1B_Q05",
    "Ex30_2023_Q1_Upgrade": "DSE_2023_P1B_Q01_Hardware_Upgrade",
    "Ex31_2023_Q5_Auth_IoT": "DSE_2023_P1B_Q05_Auth_IoT",
    "Ex32_2024_Q2": "DSE_2024_P1B_Q02",
    "Ex33_Topic_EmailProtocols": "DSE_LQ_Ch03_Topic_Email_Protocols",
    "Ex34_Topic_FloatingPoint": "DSE_LQ_Ch03_Topic_Floating_Point",
    "Q01_CPU_Cycle": "DSE_LQ_Ch03_Topic_CPU_Cycle",
    "Q02_LogicGates": "DSE_LQ_Ch03_Topic_Logic_Gates",
    "Q03_DataTransfer": "DSE_LQ_Ch03_Topic_Data_Transfer",
    "Q04_StorageCapacity": "DSE_LQ_Ch03_Topic_Storage_Capacity",
}
CH5 = {
    "Ex02_Sorting_Trace": "DSE_LQ_Ch05_Topic_Sorting_Trace",
    "Ex03_2019_Q1_ArrayAlgorithm": "DSE_2019_P1B_Q01_Array_Algorithm",
}

def build_replacements() -> list[tuple[str, str]]:
    reps: list[tuple[str, str]] = []
    base_2025 = "HKDSE_Interactive_Lab/2025/"
    new_2025 = "HKDSE_Interactive_Lab/DSE_Past_Paper_2025/"
    for old, new in sorted(PAST_2025_LEAVES.items(), key=lambda x: -len(x[0])):
        reps.append((base_2025 + old, new_2025 + new))
    reps.append((base_2025.rstrip("/"), new_2025.rstrip("/")))

    lq_bases = (
        "HKDSE_Interactive_Lab/Long_Questions/",
        "HKDSE_Interactive_Lab/DSE_Past_Paper_Long_Questions/",
    )
    dlq = "HKDSE_Interactive_Lab/DSE_Long_Questions/"
    for lq in lq_bases:
        for ch_old, ch_new, leaves in (
            ("Ch2_InfoProc/", "DSE_LQ_Ch02_InfoProcessing/", CH2),
            ("Ch3_CompSys/", "DSE_LQ_Ch03_CompSystems/", CH3),
            ("Ch5_Programming/", "DSE_LQ_Ch05_Programming/", CH5),
        ):
            for old, new in sorted(leaves.items(), key=lambda x: -len(x[0])):
                reps.append((lq + ch_old + old, dlq + ch_new + new))
            reps.append((lq + ch_old.rstrip("/"), dlq + ch_new.rstrip("/")))
        reps.append((lq.rstrip("/"), dlq.rstrip("/")))
    # backslash variants (Windows paths in some docs)
    extra = []
    for a, b in reps:
        extra.append((a.replace("/", "\\"), b.replace("/", "\\")))
    reps.extend(extra)
    return reps

REPLACEMENTS = build_replacements()

TARGETS = [
    ROOT / "hksteamai-platform/data/curriculum-map.json",
    ROOT / "HK Cirriculum/QA_FLEET_ALL_APPS.json",
    ROOT / "HK Cirriculum/QA_NCS_TOPRIGHT_COVERAGE.md",
    ROOT / "HK Cirriculum/_tools/scan_broken_links.py",
    ROOT / "audit_script.py",
    ROOT / "audit_script2.py",
]

def patch_text(text: str) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    return text

def main() -> None:
    for path in TARGETS:
        if not path.is_file():
            print("skip missing", path)
            continue
        original = path.read_text(encoding="utf-8")
        updated = patch_text(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            n_old = sum(original.count(o) for o, _ in REPLACEMENTS[: len(PAST_2025_LEAVES) + 10])
            print(f"updated {path.relative_to(ROOT)}")
        else:
            print(f"unchanged {path.relative_to(ROOT)}")

    # scan repo for remaining bad refs in key areas
    patterns = [
        "HKDSE_Interactive_Lab/2025",
        "HKDSE_Interactive_Lab/Long_Questions",
        "Long_Questions/Ch2_InfoProc",
        "Long_Questions/Ch3_CompSys",
    ]
    scan_roots = [
        ROOT / "hksteamai-platform",
        ROOT / "HK Cirriculum/parent-dashboard",
        ROOT / "HK Cirriculum/marketing",
        ROOT / "HK Cirriculum/Secondary_School",
    ]
    remaining = []
    for sr in scan_roots:
        if not sr.exists():
            continue
        for p in sr.rglob("*"):
            if p.suffix.lower() not in {".json", ".md", ".html", ".mjs", ".ts", ".tsx", ".js", ".py"}:
                continue
            if "node_modules" in p.parts or "CEO_DSE_RENAME_PLAN" in p.name:
                continue
            if "HKDSE_Interactive_Lab/Long_Questions" in str(p) and p.is_file():
                continue  # on-disk tree not renamed yet
            try:
                t = p.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            for pat in patterns:
                if pat in t:
                    remaining.append((str(p.relative_to(ROOT)), pat))
                    break
    if remaining:
        print("\nRemaining references (need manual or Agent 02 rename):")
        for fp, pat in remaining[:40]:
            print(f"  {pat} in {fp}")
        if len(remaining) > 40:
            print(f"  ... and {len(remaining)-40} more")
    else:
        print("\nNo remaining old-path refs in scan roots.")

if __name__ == "__main__":
    main()
