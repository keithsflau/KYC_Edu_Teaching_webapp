import re, pathlib, json
ROOT = pathlib.Path(r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum")
JS = ROOT / "Secondary_School/Junior Science"
CJK = re.compile(r"[\u4e00-\u9fff]")
LATIN = re.compile(r"[A-Za-z]{2,}")
STEM = re.compile(r"\b(ATP|DNA|RNA|LED|kWh|kW|pH|CO2|O2|H2O|NaCl|LGER|Form|Lab|USB|WiFi)\b", re.I)

def split_en_zh(s):
    m = CJK.search(s)
    if not m:
        return s.strip(), s.strip()
    i = m.start()
    while i > 0 and s[i-1] in " ·—-":
        i -= 1
    return s[:i].strip(), s[i:].strip()

def ui_mixed(s):
    c = STEM.sub("", s)
    return CJK.search(c) and LATIN.search(c)

def fix_title_en(text):
    def repl(m):
        t = m.group(1)
        if not CJK.search(t):
            return m.group(0)
        en = CJK.sub("", t)
        en = re.sub(r"\s+", " ", en).strip(" ·—-")
        return f'titleEn: "{en}"'
    return re.sub(r'titleEn:\s*"([^"]+)"', repl, text)

def fix_why_lger(text):
    text = text.replace(
        "why: \"LGER flow: Learn → Guided → Experiment → Review.\"",
        "whyEn: \"LGER flow: Learn → Guided → Experiment → Review.\", whyZh: \"LGER 流程：學習 → 引導 → 實驗 → 複習。\"")
    text = text.replace(
        "why: \"LGER 流程：學習 → 引導 → 實驗 → 複習。\"",
        "whyEn: \"LGER flow: Learn → Guided → Experiment → Review.\", whyZh: \"LGER 流程：學習 → 引導 → 實驗 → 複習。\"")
    return text

def convert_string_opts(text):
    # opts: ["a b", ...], a: "..."
    pat = re.compile(r'opts:\s*\[(.*?)\]\s*,\s*a:\s*"([^"]+)"', re.S)
    while True:
        m = pat.search(text)
        if not m:
            break
        inner, a_raw = m.group(1), m.group(2)
        opts = [x.group(1) for x in re.finditer(r'"([^"]+)"', inner)]
        if not opts or any(o.startswith("{") for o in opts):
            break
        objs = []
        for o in opts:
            en, zh = split_en_zh(o)
            objs.append({"en": en, "zh": zh})
        try:
            ai = opts.index(a_raw)
        except ValueError:
            a_en, a_zh = split_en_zh(a_raw)
            ai = next((i for i,o in enumerate(opts) if o == a_raw or split_en_zh(o)[0]==a_en), 0)
        obj_str = ", ".join([f'{{ en: "{o["en"]}", zh: "{o["zh"]}" }}' for o in objs])
        repl = f'opts: [{obj_str}], a: {ai}'
        text = text[:m.start()] + repl + text[m.end():]
    return text

fixed_apps = 0
remaining = []
for p in sorted(JS.rglob("index.html")):
    t = p.read_text(encoding="utf-8")
    orig = t
    t = fix_title_en(t)
    t = fix_why_lger(t)
    t = convert_string_opts(t)
    if t != orig:
        p.write_text(t, encoding="utf-8")
        fixed_apps += 1
    for wm in re.finditer(r'why(?:En|Zh)?:\s*"([^"]+)"', t):
        if ui_mixed(wm.group(1)):
            remaining.append((str(p.relative_to(JS)), "why", wm.group(1)))
    for bm in re.finditer(r'bodyZh:\s*"([^"]+)"', t):
        if ui_mixed(bm.group(1)):
            remaining.append((str(p.relative_to(JS)), "bodyZh", bm.group(1)))
    for tm in re.finditer(r'titleEn:\s*"([^"]+)"', t):
        if CJK.search(tm.group(1)):
            remaining.append((str(p.relative_to(JS)), "titleEn", tm.group(1)))

# Chemistry hub
chem_idx = ROOT / "Secondary_School/Chemistry/index.html"
ct = chem_idx.read_text(encoding="utf-8")
ct = ct.replace("<h1 class=\"text-3xl font-bold text-slate-900\">Chemistry 化學</h1>",
                "<h1 class=\"text-3xl font-bold text-slate-900\">Chemistry</h1>\n      <p class=\"text-lg text-slate-600 mt-1\">化學</p>")
ct = ct.replace("← Back to Directory", "Back to Directory")
chem_idx.write_text(ct, encoding="utf-8")

print("fixed_apps", fixed_apps)
print("remaining_ui_mixed", len(remaining))
for r in remaining[:20]:
    print(r)
