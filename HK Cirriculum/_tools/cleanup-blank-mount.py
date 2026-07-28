#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DUP = re.compile(r'data-presets="react-classic"\s+data-presets="react-classic"')
ORPHAN = re.compile(
    r'\n?<footer style="text-align:center;padding:1rem;font-size:0\.8rem;opacity:0\.7;">@HKSTEAMAI All Copy-Right Reserved\.</footer>'
)

n = 0
for base in ("Secondary_School", "Primary_School"):
    for p in (ROOT / base).rglob("index.html"):
        if any(x in str(p) for x in ("node_modules", "dist", "_archive", "venv")):
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        orig = text
        text = DUP.sub('data-presets="react-classic"', text)
        if "06_Circuit_Builder" in str(p) and ORPHAN.search(text):
            text = ORPHAN.sub("", text)
        if text != orig:
            p.write_text(text, encoding="utf-8", newline="\n")
            n += 1
print(f"cleaned {n}")
