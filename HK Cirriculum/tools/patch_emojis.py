# patch emojis + typhoon icons + improved CJK in render_block
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

# typhoon icons
p = ROOT / "Primary_School/General_Studies/P4/30_Typhoon_Prep/index.html"
t = p.read_text(encoding="utf-8")
icons = {
    'id: "tape"': '📦',
    'id: "food"': '🥫',
    'id: "water"': '💧',
    'id: "torch"': '🔦',
    'id: "radio"': '📻',
    'id: "games"': '🎲',
    'id: "kite"': '🪁',
    'id: "bike"': '🚲',
    'id: "swimsuit"': '🩱',
}
lines = t.splitlines()
out = []
current = None
for ln in lines:
    m = re.search(r'id: "(\w+)"', ln)
    if m:
        current = m.group(1)
    if ln.strip().startswith("icon:") and current in {k.split('"')[1] for k in icons}:
        key = f'id: "{current}"'
        emoji = icons[key]
        out.append(f'  icon: "{emoji}"')
        continue
    out.append(ln)
t = "\n".join(out)
p.write_text(t, encoding="utf-8", newline="\n")

# emoji headers
p42 = ROOT / "Primary_School/Mathematics/P5/42_Volume_Builder/index.html"
t42 = p42.read_text(encoding="utf-8")
t42 = re.sub(r'\}, "[^"]*", getText\("tipsTitle", lang\)\)', '}, "💡 ", getText("tipsTitle", lang))', t42, count=1)
p42.write_text(t42, encoding="utf-8", newline="\n")

p44 = ROOT / "Primary_School/Mathematics/P5/44_Fractions_AddSub/index.html"
t44 = p44.read_text(encoding="utf-8")
t44 = re.sub(r'\}, "[^"]*", " ", op === "add"', '}, "➕", " ", op === "add"', t44, count=1)
p44.write_text(t44, encoding="utf-8", newline="\n")

print("patched icons/emojis")
