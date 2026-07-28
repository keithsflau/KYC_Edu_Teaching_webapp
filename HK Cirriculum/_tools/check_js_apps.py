import os,re,json
root=r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/Secondary_School/Junior Science"
CJK=re.compile(r"[\u4e00-\u9fff]")
LATIN=re.compile(r"[A-Za-z]{3,}")
ALLOW=re.compile(r"\b(LGER|TFZ|DSE|HK|pH|DNA|CO2|O2|H2O|Bunsen|Ohm|Sankey|LED|Form|Lab|HTML|React|CDN|API|EN|JS|STEM|NaCl|ATP|RNA|URL|PDF|SVG|CSS|GPU|CPU|WiFi|USB|GHz|MHz|kW|kJ|mol|dm|cm|mm|kg|N|J|W|V|A|R|C|K|L|G|M|T|P|E|I|U|X|Y|Z)\b",re.I)

issues=[]
field_pat=re.compile(r"(titleZh|bodyZh|qZh|titleEn|bodyEn|qEn|appNameZh|appNameEn|why)\s*:\s*[\"']([^\"']*)[\"']")

for dirpath,dirs,files in os.walk(root):
    dirs[:]=[d for d in dirs if d not in ("node_modules","venv")]
    for f in files:
        if f!="index.html": continue
        path=os.path.join(dirpath,f)
        rel=path.replace(root+"\\","").replace(root+"/","")
        with open(path,encoding="utf-8",errors="replace") as fh:
            for i,line in enumerate(fh,1):
                m=field_pat.search(line)
                if not m: continue
                field,val=m.group(1),m.group(2)
                if field.endswith("Zh"):
                    cleaned=ALLOW.sub("",val)
                    if CJK.search(cleaned) and LATIN.search(cleaned):
                        issues.append({"app":rel,"line":i,"field":field,"val":val})
                if field.endswith("En") and CJK.search(val):
                    issues.append({"app":rel,"line":i,"field":field,"val":val})

print("JS_FIELD_ISSUES",len(issues))
for it in issues[:60]:
    print(json.dumps(it,ensure_ascii=False))
