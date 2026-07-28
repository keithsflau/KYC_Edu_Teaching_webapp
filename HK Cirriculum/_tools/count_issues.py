import re, pathlib
JS = pathlib.Path("HK Cirriculum/Secondary_School/Junior Science")
CJK = re.compile(r"[\u4e00-\u9fff]")
STEM = re.compile(r"\b(ATP|DNA|LED|kWh|kW|pH|LGER)\b", re.I)
LAT = re.compile(r"[A-Za-z]{3,}")
issues = []
for p in sorted(JS.rglob("index.html")):
    t = p.read_text(encoding="utf-8")
    rel = str(p.relative_to(JS))
    for m in re.finditer(r"titleEn:\s*\"([^\"]+)\"", t):
        if CJK.search(m.group(1)):
            issues.append((rel, "titleEn", m.group(1)))
    for m in re.finditer(r"bodyZh:\s*\"([^\"]+)\"", t):
        s = m.group(1)
        c = STEM.sub("", s)
        if CJK.search(c) and LAT.search(c):
            issues.append((rel, "bodyZh", s))
    for m in re.finditer(r"why(?:En|Zh)?:\s*\"([^\"]+)\"", t):
        s = m.group(1)
        c = STEM.sub("", s)
        if CJK.search(c) and LAT.search(c):
            issues.append((rel, "why", s))
print("ISSUES", len(issues))
for x in issues[:25]:
    print(x)
