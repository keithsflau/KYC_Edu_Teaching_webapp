t=open(r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum/_tools/sample_lab.txt",encoding="utf-8").read()
for key in ["META","meta","appId","titleZh","unit"]:
    if key in t:
        idx=t.find(key)
        print("---",key,"---")
        print(t[idx:idx+400])
