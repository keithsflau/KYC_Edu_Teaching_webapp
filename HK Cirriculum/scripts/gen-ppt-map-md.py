#!/usr/bin/env python3
"""Generate JUNIOR_SCIENCE_PPT_TO_APP_MAP.md."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent
com = json.loads((ROOT / "ppt-extract-com.json").read_text(encoding="utf-8"))
mapping = json.loads((SCRIPTS / "ppt-app-map.json").read_text(encoding="utf-8"))
f1 = {c["folder"]: c for c in json.loads((SCRIPTS / "f1-lger-configs.json").read_text(encoding="utf-8"))}
f2 = {c["folder"]: c for c in json.loads((SCRIPTS / "f2-lger-configs.json").read_text(encoding="utf-8"))}
f3_path = SCRIPTS / "f3-lger-configs.json"
f3 = {c["folder"]: c for c in json.loads(f3_path.read_text(encoding="utf-8"))} if f3_path.exists() else {}

title_map = {(c["book"], str(c["chapter"])): c.get("title", "?") for c in com["chapters"]}

lines = [
    "# Junior Science PPT → LGER App Map",
    "",
    "**Generated:** 2026-07-28",
    "**Pipeline:** `extract-ppt-com.py` → `ppt-app-map.json` → `apply-ppt-to-configs.py` → `generate-f1-lger.py` / `generate-f2-lger.py`",
    "",
    "## Coverage",
    "",
    "| Form | Apps with PPT-aligned LGER | Total apps |",
    "|------|---------------------------:|-----------:|",
    f"| Form 1 | **{len(mapping['form1'])}** | 35 |",
    f"| Form 2 | **{len(mapping['form2'])}** | 28+ |",
    f"| Form 3 | **{len(mapping.get('form3', {}))}** | 18 + bridge |",
    "",
    "PPT-sourced content populates **Learn / Guided / Review** via `keyPoints` + `quizzes` extracted from slide text.",
    "",
]

def section(title, form_key, configs):
    lines.append(f"## {title}")
    lines.append("")
    lines.append("| App folder | PPT source (Book · Ch) | Chapter title(s) | Status |")
    lines.append("|------------|------------------------|------------------|--------|")
    for folder, m in sorted(mapping[form_key].items()):
        src = m["books"]
        titles = "; ".join(title_map.get((b, str(c)), "?")[:50] for b, c in src[:2])
        src_str = ", ".join(f"B{b}·{c}" for b, c in src)
        has = "✅ Rebuilt" if folder in configs and configs[folder].get("pptSource") else "⚠️"
        lines.append(f"| `{folder}` | {src_str} | {titles} | {has} |")
    lines.append("")

section("Form 1 (Resources 1A + 1B)", "form1", f1)
section("Form 2 (Resources 2A + 2B)", "form2", f2)
if mapping.get("form3"):
    section("Form 3 (Resources 3A + 3B + 3C)", "form3", f3)

lines += [
    "## Form 3 bridge apps (hand-crafted, not PPT-rebuilt)",
    "",
    "| App | Notes |",
    "|-----|-------|",
    "| `01_Climate_Action` | Hand-crafted HK climate bridge |",
    "| `02_Genetics_Intro` | Hand-crafted genetics bridge |",
    "| `03`–`10` bridge lane | STEAM/HKDSE prep — separate from Books 12–14 |",
    "",
    "## Hand-crafted apps (skipped by generator)",
    "",
    "| App | Reason |",
    "|-----|--------|",
    "| `04_Air_Composition` | Hand-crafted reference — already PPT-quality |",
    "| `22_Reaction_Time` | Hand-crafted reference |",
    "| `30_Space_Mission` | Hand-crafted reference |",
    "",
    "## Re-run commands",
    "",
    "```bash",
    "python \"HK Cirriculum/scripts/extract-ppt-com.py\"          # all packs",
    "python \"HK Cirriculum/scripts/apply-ppt-to-configs.py\"     # inject + regenerate F1/F2/F3",
    "python \"HK Cirriculum/scripts/gen-ppt-inventory-md.py\"",
    "python \"HK Cirriculum/scripts/gen-ppt-map-md.py\"",
    "```",
    "",
]

(ROOT / "JUNIOR_SCIENCE_PPT_TO_APP_MAP.md").write_text("\n".join(lines), encoding="utf-8")
print("Wrote JUNIOR_SCIENCE_PPT_TO_APP_MAP.md")
