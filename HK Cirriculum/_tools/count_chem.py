import re, pathlib
ROOT = pathlib.Path("HK Cirriculum")
paths = [
 "Secondary_School/Chemistry/index.html",
 "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/index.html",
 "Secondary_School/Chemistry/Form 6/02_Titration_Curve/index.html",
 "Secondary_School/Chemistry/Form 5/01_Rates_Collision/index.html",
 "Secondary_School/Chemistry/Form 6/01_Le_Chatelier/index.html",
 "Secondary_School/Chemistry/Form 6/04_Haber_Yield/index.html",
 "Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox/index.html",
]
CJK = re.compile(r"[\u4e00-\u9fff]")
LAT = re.compile(r"[A-Za-z]{3,}")
STEM = re.compile(r"\b(Kc|pH|TFZ|LGER|HKDSE|DSE|Haber|Le|Chatelier|Chart|Three|Matter|Lab|Form)\b", re.I)
issues=[]
for rel in paths:
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    for m in re.finditer(r"<title>([^<]+)</title>", t):
        s=m.group(1); c=STEM.sub("",s)
        if CJK.search(c) and LAT.search(c):
            issues.append((rel,"title",s))
    for m in re.finditer(r"(titleZh|bodyZh|qZh|whyZh):\s*\"([^\"]+)\"", t):
        s=m.group(2); c=STEM.sub("",s)
        if CJK.search(c) and LAT.search(c):
            issues.append((rel,m.group(1),s))
    for m in re.finditer(r"(titleEn|bodyEn|qEn|whyEn):\s*\"([^\"]+)\"", t):
        if CJK.search(m.group(2)):
            issues.append((rel,m.group(1),m.group(2)))
    # static html text
    for line in t.splitlines():
        if "<" in line and ">" in line:
            txt=re.sub(r"<[^>]+>","",line).strip()
            if len(txt)<4: continue
            c=STEM.sub("",txt)
            if CJK.search(c) and LAT.search(c) and "http" not in txt:
                issues.append((rel,"html",txt[:80]))
print("CHEM_ISSUES",len(issues))
for x in issues[:30]:
    print(x)
