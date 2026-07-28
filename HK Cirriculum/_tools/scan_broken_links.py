import re
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "Secondary_School" / "ICT" / "HKDSE_Interactive_Lab"
trees = [root / "DSE_Long_Questions", root / "DSE_Past_Paper_2025"]
link_re = re.compile(r"""(?:href|src)\s*=\s*["']([^"'#?]+)""", re.I)

broken = []
for tree in trees:
    if not tree.exists():
        print(f"MISSING TREE: {tree}")
        continue
    for html in tree.rglob("*.html"):
        text = html.read_text(encoding="utf-8", errors="replace")
        for m in link_re.finditer(text):
            link = m.group(1)
            if link.startswith(("http://", "https://", "//", "data:", "mailto:", "#")):
                continue
            target = (html.parent / link).resolve()
            if not target.exists():
                broken.append((str(html.relative_to(root)), link))

print(f"BROKEN: {len(broken)}")
for file, link in broken:
    print(f"{file}\t{link}")
