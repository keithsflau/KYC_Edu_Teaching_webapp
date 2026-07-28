#!/usr/bin/env python3
"""Generate JUNIOR_SCIENCE_PPT_INVENTORY.md from cached inventory."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
cache = json.loads((ROOT / "ppt-extract-cache.json").read_text(encoding="utf-8"))
com = json.loads((ROOT / "ppt-extract-com.json").read_text(encoding="utf-8"))

title_map = {}
for c in com["chapters"]:
    title_map[(c["book"], str(c["chapter"]))] = c.get("title", "?")

lines = [
    "# Junior Science Teaching PowerPoint Inventory",
    "",
    "**Generated:** 2026-07-28",
    "**Source:** `Reference/Secondary/HKDSE/Integrated_Science/materials/Resources_*_r/.../01-Teaching PowerPoint 教學簡報`",
    "",
    "> **Correction:** These folders are **NOT empty**. This repo contains **196** `.ppt` teaching decks (scicent 1A–3C).",
    "",
    "## Summary by textbook pack",
    "",
    "| Pack | Form | Books | PPT files | EN chapter decks extracted |",
    "|------|------|-------|----------:|---------------------------:|",
]

pack_meta = {
    "Resources_1A_r": ("1A", "Form 1 · Semester A", "1–3"),
    "Resources_1B_r": ("1B", "Form 1 · Semester B", "4–6"),
    "Resources_2A_r": ("2A", "Form 2 · Semester A", "7–9"),
    "Resources_2B_r": ("2B", "Form 2 · Semester B", "10–11"),
    "Resources_3A_r": ("3A", "Form 3 · Unit A", "12"),
    "Resources_3B_r": ("3B", "Form 3 · Unit B", "13"),
    "Resources_3C_r": ("3C", "Form 3 · Unit C", "14"),
}

total = 0
for res, data in cache["inventory"].items():
    total += data["count"]
    code, form, books = pack_meta[res]
    en_ch = sum(1 for c in com["chapters"] if c["resource"] == res)
    lines.append(f"| `{res}` | {code} ({form}) | {books} | **{data['count']}** | {en_ch} |")

lines += [
    "",
    f"**Grand total:** **{total}** `.ppt` files across 7 resource packs.",
    "",
    "## Chapter topics (English decks)",
    "",
]

import re
for res in cache["inventory"]:
    code = pack_meta[res][0]
    lines.append(f"### {code} — `{res}`")
    lines.append("")
    seen = set()
    for f in data["files"] if False else cache["inventory"][res]["files"]:
        m = re.search(r"scicent_ppt_(\d+)_(unit_end|\d+)", f["name"], re.I)
        if not m:
            continue
        book, ch = int(m.group(1)), m.group(2)
        if not f["name"].endswith("_e.ppt") and "_r_e" not in f["name"]:
            continue
        key = (book, ch)
        if key in seen:
            continue
        seen.add(key)
        title = title_map.get(key, "(title pending)")
        lines.append(f"- **Book {book} Ch {ch}** — {title} · `{f['name']}` ({f['size_kb']} KB)")
    lines.append("")

lines += [
    "## Full file listing",
    "",
]

for res, data in cache["inventory"].items():
    lines.append(f"### `{res}` ({data['count']} files)")
    lines.append("")
    lines.append("```")
    for f in data["files"]:
        lines.append(f["rel"])
    lines.append("```")
    lines.append("")

(ROOT / "JUNIOR_SCIENCE_PPT_INVENTORY.md").write_text("\n".join(lines), encoding="utf-8")
print("Wrote JUNIOR_SCIENCE_PPT_INVENTORY.md")
