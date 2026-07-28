import re
for name in ["junior-science-lger.js","learn-from-zero.js","interactive-lab-kit.js"]:
    p=f"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/common/{name}"
    print("===",name,"===")
    lines=open(p,encoding="utf-8").read().splitlines()
    pat=re.compile(r"t\(\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]")
    CJK=re.compile(r"[\u4e00-\u9fff]")
    EN=re.compile(r"[A-Za-z]{3,}")
    for i,l in enumerate(lines,1):
        for m in pat.finditer(l):
            zh,en=m.group(1),m.group(2)
            bad=[]
            if CJK.search(zh) and EN.search(zh): bad.append("zh_mix")
            if CJK.search(en): bad.append("en_cjk")
            if bad: print(i,bad,zh,"|",en)
