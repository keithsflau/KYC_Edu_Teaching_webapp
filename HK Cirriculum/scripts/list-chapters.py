import json
from pathlib import Path
d = json.loads(Path("HK Cirriculum/ppt-extract-com.json").read_text(encoding="utf-8"))
for c in sorted(d["chapters"], key=lambda x: (x["book"], str(x["chapter"]))):
    if c["book"] <= 11:
        t = c.get("title", "?")[:80]
        print(f"B{c['book']:2} Ch{str(c['chapter']):8} | {t}")
