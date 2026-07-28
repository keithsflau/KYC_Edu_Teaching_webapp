"""Rebuild corrupted DSE_Long_Questions/index.html SECTIONS from disk."""
from __future__ import annotations

import json
import re
from pathlib import Path

HUB = Path(__file__).resolve().parents[1] / "Secondary_School" / "ICT" / "HKDSE_Interactive_Lab" / "DSE_Long_Questions" / "index.html"
ROOT = HUB.parent

CHAPTER_META = {
    "DSE_LQ_Ch02_InfoProcessing": ("DSE Long Questions — Ch2 資訊處理 | Information Processing", "blue", "Database"),
    "DSE_LQ_Ch03_CompSystems": ("DSE Long Questions — Ch3 電腦系統 | Computer Systems", "purple", "Cpu"),
    "DSE_LQ_Ch05_Programming": ("DSE Long Questions — Ch5 程式設計 | Programming", "green", "Code"),
}


def pretty_name(folder: str) -> str:
    if folder.startswith("DSE_LQ_Ch") and "_Topic_" in folder:
        return "Topic: " + folder.split("_Topic_", 1)[1].replace("_", " ")
    if folder.startswith("DSE_SP_"):
        return "SP " + folder[7:].replace("_", " ")
    if folder.startswith("DSE_PP_"):
        return "PP " + folder[7:].replace("_", " ")
    if folder.startswith("DSE_Practice_"):
        return "Practice " + folder[13:].replace("_", " ")
    m = re.match(r"DSE_(\d{4})_(P1B|P2)_(Q\d+)(?:_(.+))?", folder)
    if m:
        year, paper, q, topic = m.group(1), m.group(2), m.group(3), m.group(4) or ""
        label = f"{year} {paper} {q}"
        if topic:
            label += ": " + topic.replace("_", " ")
        return label
    return folder.replace("_", " ")


def build_sections() -> str:
    sections = []
    for chapter in sorted(ROOT.iterdir()):
        if not chapter.is_dir() or chapter.name not in CHAPTER_META:
            continue
        title, color, default_icon = CHAPTER_META[chapter.name]
        apps = []
        for app in sorted(chapter.iterdir()):
            if not app.is_dir() or not (app / "index.html").exists():
                continue
            apps.append(
                {
                    "name": pretty_name(app.name),
                    "path": f"./{chapter.name}/{app.name}/index.html",
                    "icon": default_icon,
                    "desc": pretty_name(app.name),
                }
            )
        sections.append({"title": title, "color": color, "apps": apps})

    sections.append(
        {
            "title": "DSE Long Questions — 資訊保安（預留）| Information Security",
            "color": "red",
            "apps": [],
        }
    )

    # Emit JS object literal matching existing style (compact entries)
    lines = ["const SECTIONS = ["]
    for section in sections:
        lines.append("  {")
        lines.append(f'    title: {json.dumps(section["title"])},')
        lines.append(f'    color: {json.dumps(section["color"])},')
        lines.append("    apps: [")
        for i, app in enumerate(section["apps"]):
            lines.append("    {")
            lines.append(f'      name: {json.dumps(app["name"])},')
            lines.append(f'      path: {json.dumps(app["path"])},')
            lines.append(f'      icon: {json.dumps(app["icon"])},')
            lines.append(f'      desc: {json.dumps(app["desc"])}')
            lines.append("    }" + ("," if i < len(section["apps"]) - 1 else ""))
        lines.append("    ]")
        lines.append("  },")
    lines.append("];")
    return "\n".join(lines)


def main() -> None:
    text = HUB.read_text(encoding="utf-8")
    new_sections = build_sections()
    match = re.search(r"const SECTIONS = \[[\s\S]*?\];", text)
    if not match:
        raise SystemExit("Failed to find SECTIONS block")
    patched = text[: match.start()] + new_sections + text[match.end() :]
    HUB.write_text(patched, encoding="utf-8", newline="\n")
    print(f"Rebuilt SECTIONS in {HUB}")


if __name__ == "__main__":
    main()
