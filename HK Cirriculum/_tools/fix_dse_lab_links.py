"""Fix broken relative links in renamed DSE lab apps (depth-aware)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "Secondary_School" / "ICT" / "HKDSE_Interactive_Lab"
CURRICULUM_ROOT = ROOT.parents[2]  # HK Cirriculum

RENAME_MAP = {
    "P1A_Q1/": "DSE_2025_P1A_Q01_Spreadsheet/",
    "P1A_Q2/": "DSE_2025_P1A_Q02_System_Output/",
    "P1A_Q3/": "DSE_2025_P1A_Q03_Data_Control/",
    "P1B_Q1/": "DSE_2025_P1B_Q01_Spreadsheet/",
    "P2_Q1/": "DSE_2025_P2_Q01_SQL_Lab/",
    "Paper1A_Number_Systems": "DSE_2025_P1A_Tool_Number_Systems",
    "Paper1A_Twos_Complement": "DSE_2025_P1A_Tool_Twos_Complement",
    "Paper1A_Q37_Swap_Logic": "DSE_2025_P1A_Q37_Swap_Logic",
    "pdf_images/": "DSE_2025_Assets_PDF_Images/",
    "2025/": "DSE_Past_Paper_2025/",
    "Long_Questions/": "DSE_Long_Questions/",
    "Ch2_InfoProc/": "DSE_LQ_Ch02_InfoProcessing/",
    "Ch3_CompSys/": "DSE_LQ_Ch03_CompSystems/",
    "Ch4_Programming/": "DSE_LQ_Ch05_Programming/",
    "Ch5_Programming/": "DSE_LQ_Ch05_Programming/",
    "Q01_CPU_Cycle": "DSE_LQ_Ch03_Topic_CPU_Cycle",
    "Q02_LogicGates": "DSE_LQ_Ch03_Topic_Logic_Gates",
    "Q03_DataTransfer": "DSE_LQ_Ch03_Topic_Data_Transfer",
    "Q04_StorageCapacity": "DSE_LQ_Ch03_Topic_Storage_Capacity",
    "Ex02_Sorting_Trace": "DSE_LQ_Ch05_Topic_Sorting_Trace",
    "Ex03_2019_Q1_ArrayAlgorithm": "DSE_2019_P1B_Q01_Array_Algorithm",
}

LINK_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"'#?]+)""", re.I)
RELATIVE_LINK_RE = re.compile(
    r"""((?:href|src)\s*=\s*["'])((?:\.\./)+)((?:common|_shared)/[^"'#?]+)(["'])""",
    re.I,
)
CHROME_PATH_RE = re.compile(
    r"""(chromePath:\s*["'])((?:\.\./)+)((?:common|_shared)/[^"']+)(["'])""",
    re.I,
)


def rel_prefix(html: Path, subpath: str) -> str:
    ups = len(html.parent.relative_to(CURRICULUM_ROOT).parts)
    return "../" * ups + subpath


def patch_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    original = text
    changes: list[str] = []

    for old, new in RENAME_MAP.items():
        if old in text:
            text = text.replace(old, new)
            changes.append(f"rename ref: {old} -> {new}")

    def fix_rel(match: re.Match[str], label: str) -> str:
        prefix, _ups, rest, quote = match.groups()
        fixed = rel_prefix(path, rest)
        if match.group(2) + rest != fixed:
            changes.append(f"{label}: {match.group(2)}{rest} -> {fixed}")
        return f"{prefix}{fixed}{quote}"

    text = RELATIVE_LINK_RE.sub(lambda m: fix_rel(m, "asset"), text)
    text = CHROME_PATH_RE.sub(lambda m: fix_rel(m, "chromePath"), text)

    if text != original:
        path.write_text(text, encoding="utf-8", newline="\n")
    return changes


def scan_broken(tree: Path) -> list[tuple[str, str]]:
    broken = []
    for html in tree.rglob("*.html"):
        for m in LINK_RE.finditer(html.read_text(encoding="utf-8", errors="replace")):
            link = m.group(1)
            if link.startswith(("http://", "https://", "//", "data:", "mailto:", "#")):
                continue
            if not (html.parent / link).resolve().exists():
                broken.append((str(html.relative_to(ROOT)), link))
    return broken


def main() -> None:
    trees = [ROOT / "DSE_Past_Paper_2025", ROOT / "DSE_Long_Questions"]
    patched = 0
    for tree in trees:
        if not tree.exists():
            print(f"SKIP missing: {tree}")
            continue
        for html in tree.rglob("*.html"):
            changes = patch_file(html)
            if changes:
                patched += 1
                print(f"\n{html.relative_to(ROOT)}")
                for c in changes:
                    print(f"  - {c}")

    print(f"\nPatched {patched} files")
    print("\n--- Broken links remaining ---")
    total = 0
    for tree in trees:
        if not tree.exists():
            continue
        broken = scan_broken(tree)
        total += len(broken)
        for file, link in broken:
            print(f"{file}\t{link}")
    print(f"BROKEN REMAINING: {total}")


if __name__ == "__main__":
    main()
