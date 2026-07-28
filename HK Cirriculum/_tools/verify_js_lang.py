import re,pathlib
ROOT=pathlib.Path(r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum")
JS_ROOT=ROOT/"Secondary_School/Junior Science"
CJK=re.compile(r"[\u4e00-\u9fff]")
LATIN=re.compile(r"[A-Za-z]{3,}")
ALLOW=re.compile(r"\b(kWh|kW|h|Form|Lab|DNA|pH)\b",re.I)

def mixed(s):
    c=ALLOW.sub("",s)
    return CJK.search(c) and LATIN.search(c)

count=0
for p in sorted(JS_ROOT.rglob("index.html")):
    t=p.read_text(encoding="utf-8")
    rel=str(p.relative_to(JS_ROOT))
    for m in re.finditer(r"bodyZh:\s*\"([^\"]+)\"",t):
        if mixed(m.group(1)): print("bodyZh",rel,m.group(1)); count+=1
    for m in re.finditer(r"titleEn:\s*\"([^\"]+)\"",t):
        if CJK.search(m.group(1)): print("titleEn",rel,m.group(1)); count+=1
    for m in re.finditer(r"why(?:En|Zh)?:\s*\"([^\"]+)\"",t):
        if mixed(m.group(1)): print("why",rel,m.group(1)); count+=1
    if re.search(r"opts:\s*\[",t) and "optsZh" not in t:
        print("legacy opts",rel); count+=1
print("REMAINING",count)
