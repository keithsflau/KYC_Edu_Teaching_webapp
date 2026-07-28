import os,re,json,collections
root=r"c:\Users\keith\OneDrive\Github\Profile\HK Cirriculum"
out_path=os.path.join(root,"_tools","audit_language_out.json")

js_scope=[
    os.path.join(root,"common","junior-science-lger.js"),
    os.path.join(root,"common","learn-from-zero.js"),
    os.path.join(root,"common","interactive-lab-kit.js"),
    os.path.join(root,"Secondary_School","Chemistry","index.html"),
]
chem_apps=[
 "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/index.html",
 "Secondary_School/Chemistry/Form 6/02_Titration_Curve/index.html",
 "Secondary_School/Chemistry/Form 5/01_Rates_Collision/index.html",
 "Secondary_School/Chemistry/Form 6/01_Le_Chatelier/index.html",
 "Secondary_School/Chemistry/Form 6/04_Haber_Yield/index.html",
 "Secondary_School/Chemistry/Form 5/04_Electrolysis_Sandbox/index.html",
]
js_dir=os.path.join(root,"Secondary_School","Junior Science")
html_files=[]
for dirpath,dirs,files in os.walk(js_dir):
    dirs[:]=[d for d in dirs if d not in ("node_modules","venv")]
    for f in files:
        if f=="index.html":
            html_files.append(os.path.join(dirpath,f))

CJK=re.compile(r"[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]")
LATIN_WORD=re.compile(r"[A-Za-z]{2,}")
EN_UI=re.compile(r"\b(Learn|Guided|Experiment|Review|Correct|Next|Back|Score|Hint|Start|Complete|Self-Check|Interactive|Lab|From|Zero|Try again)\b",re.I)
ALLOW=re.compile(r"\b(LGER|TFZ|DSE|HK|STEM|DNA|pH|Kc|Chart|Three|Matter|JS|HTML|CDN|API|UI|EN|Form|Lab|K|Three\.js|Matter\.js|Chart\.js|Bunsen|Ohm|Sankey|LED|CO2|O2|H2O|NaCl|ATP|RNA)\b",re.I)

issues=[]
t_pat=re.compile(r"t\(\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]")

def is_mixed(s):
    if not (CJK.search(s) and LATIN_WORD.search(s)):
        return False
    cleaned=ALLOW.sub("",s)
    return CJK.search(cleaned) and LATIN_WORD.search(cleaned)

def check_pair(zh,en,path,line):
    if is_mixed(zh):
        issues.append({"path":path,"line":line,"kind":"zh_mixed","zh":zh,"en":en})
    if CJK.search(en) and not re.search(r"[\u2190-\u21ff]", en):  # allow arrows only
        if CJK.search(re.sub(r"[\u2190-\u21ff→←]","",en)):
            issues.append({"path":path,"line":line,"kind":"en_has_cjk","zh":zh,"en":en})
    if EN_UI.search(zh):
        issues.append({"path":path,"line":line,"kind":"zh_has_en_ui","zh":zh,"en":en})

def scan_file(path):
    if not os.path.isfile(path):
        issues.append({"path":path,"line":0,"kind":"missing","zh":"","en":""})
        return
    with open(path,"r",encoding="utf-8",errors="replace") as f:
        for i,line in enumerate(f,1):
            for m in t_pat.finditer(line):
                check_pair(m.group(1),m.group(2),path,i)

for p in js_scope:
    scan_file(p)
for p in chem_apps:
    scan_file(os.path.join(root,p.replace("/",os.sep)))
for p in html_files:
    scan_file(p)

seen=set()
out=[]
for it in issues:
    k=(it["path"],it.get("line"),it["kind"],it.get("zh",""),it.get("en",""))
    if k in seen: continue
    seen.add(k)
    out.append(it)

summary=collections.Counter((it["kind"], os.path.basename(it["path"])) for it in out)
with open(out_path,"w",encoding="utf-8") as f:
    json.dump({"total":len(out),"summary":dict(summary),"issues":out},f,ensure_ascii=False,indent=2)
print("written",len(out))
