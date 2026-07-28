t=open(r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/common/junior-science-lger.js",encoding="utf-8").read()
import re
for pat in ["localeOpts","optText","isCorrectOpt","whyText"]:
    print(pat, t.count(pat))
idx=t.find("(step.opts")
print("step.opts snippet", t[idx:idx+400])
