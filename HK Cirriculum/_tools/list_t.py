import re
p=r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/common/junior-science-lger.js"
lines=open(p,encoding="utf-8").read().splitlines()
pat=re.compile(r"t\(\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]")
for i,l in enumerate(lines,1):
    m=pat.search(l)
    if m:
        print(i, m.group(1), "|", m.group(2))
