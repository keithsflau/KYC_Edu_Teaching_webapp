# fix_language_bulk.py
import os,re,json,pathlib

ROOT=pathlib.Path(r"c:/Users/keith/OneDrive/Github/Profile/HK Cirriculum")
LGER=ROOT/"common/junior-science-lger.js"
JS_ROOT=ROOT/"Secondary_School/Junior Science"

UNIT_ZH={
    "Intro to Science":"科學入門",
    "Water":"水",
    "Living Things":"生物",
    "Cells":"細胞",
    "Energy":"能量",
    "Matter":"物質",
}

CJK=re.compile(r"[\u4e00-\u9fff]")

def split_en_zh(s):
    m=CJK.search(s)
    if not m:
        return s.strip(), s.strip()
    i=m.start()
    while i>0 and s[i-1] in " ·—-":
        i-=1
    en=s[:i].strip()
    zh=s[i:].strip()
    if not en:
        en=zh
    return en, zh

def patch_lger():
    text=LGER.read_text(encoding="utf-8")
    if "function localeOpts" not in text:
        insert_after="function t(zh, en, isZh) { return isZh ? zh : en; }\n\n"
        helpers="""
  function localeOpts(step, isZh) {
    if (isZh && step.optsZh) return step.optsZh;
    if (!isZh && step.optsEn) return step.optsEn;
    return step.opts || [];
  }
  function localeAns(step, isZh) {
    if (isZh && step.aZh) return step.aZh;
    if (!isZh && step.aEn) return step.aEn;
    return step.a;
  }
  function localeWhy(step, isZh) {
    if (step.whyZh || step.whyEn) return t(step.whyZh || "", step.whyEn || "", isZh);
    return step.why || "";
  }
  function localeHint(item, isZh) {
    if (item.hintZh || item.hintEn) return t(item.hintZh || "", item.hintEn || "", isZh);
    return item.hint || "";
  }
"""
        text=text.replace(insert_after, insert_after+helpers)

    # LearnPanel uses locale helpers
    text=text.replace(
        "(step.opts || []).map(function (o) {",
        "localeOpts(step, isZh).map(function (o) {")
    text=text.replace("else if (o === step.a)", "else if (o === localeAns(step, isZh))")
    text=text.replace("picked === step.a ?", "picked === localeAns(step, isZh) ?")
    text=text.replace("step.why && React.createElement", "localeWhy(step, isZh) && React.createElement")
    text=text.replace("step.why),", "localeWhy(step, isZh)),")

    # GuidedDrill
    text=text.replace("var item = bank[qi];", "var item = bank[qi];\n    var gOpts = localeOpts(item, isZh);\n    var gAns = localeAns(item, isZh);")
    text=text.replace("var ok = opt === item.a;", "var ok = opt === gAns;")
    text=text.replace("item.opts.map(function (o) {", "gOpts.map(function (o) {")
    text=text.replace("item.hint && React.createElement", "(item.hint || item.hintZh || item.hintEn) && React.createElement")
    text=text.replace("item.hint),", "localeHint(item, isZh)),")

    # ReviewPanel
    text=text.replace("if (opt === item.a) setCorrect", "if (opt === localeAns(item, isZh)) setCorrect")
    text=text.replace("else if (o === item.a)", "else if (o === localeAns(item, isZh))")
    text=text.replace("item.opts.map(function (o) {", "localeOpts(item, isZh).map(function (o) {")

    text=text.replace(
        't("LGER：學習 → 引導 → 實驗 → 複習", "LGER: Learn → Guided → Experiment → Review", isZh)',
        't("學習 → 引導 → 實驗 → 複習", "LGER: Learn → Guided → Experiment → Review", isZh)')
    text=text.replace("meta.unit)", "t(meta.unitZh || meta.unit || \"\", meta.unitEn || meta.unit || \"\", isZh))")

    LGER.write_text(text, encoding="utf-8")
    print("patched lger")

def fix_js_app(path):
    text=path.read_text(encoding="utf-8")
    orig=text
    changed=False

    # meta unit split
    m=re.search(r"unit:\s*\"([^\"]+)\"", text)
    if m and CJK.search(m.group(1)) and "unitZh" not in text:
        unit=m.group(1)
        en,zh=split_en_zh(unit)
        text=text.replace(f'unit: "{unit}"', f'unitEn: "{en}", unitZh: "{zh}"', 1)
        changed=True

    # opts arrays in learn/guided/review
    def transform_opts_block(block):
        out=block
        for om in re.finditer(r"opts:\s*\[(.*?)\]\s*,\s*a:\s*\"([^\"]+)\"", block, re.S):
            opts_raw=om.group(1)
            a_raw=om.group(2)
            opts=[]
            for sm in re.finditer(r"\"([^\"]+)\"", opts_raw):
                opts.append(sm.group(1))
            if not opts:
                continue
            en_opts, zh_opts=[],[]
            mixed=any(CJK.search(o) and re.search(r"[A-Za-z]{2,}", o) for o in opts)
            if not mixed:
                continue
            for o in opts:
                en,zh=split_en_zh(o)
                en_opts.append(en)
                zh_opts.append(zh)
            a_en,a_zh=split_en_zh(a_raw)
            repl=f'optsEn: {json.dumps(en_opts, ensure_ascii=False)}, optsZh: {json.dumps(zh_opts, ensure_ascii=False)}, aEn: "{a_en}", aZh: "{a_zh}"'
            out=out.replace(om.group(0), repl, 1)
        return out

    for const in ["LEARN","GUIDED","REVIEW"]:
        cm=re.search(rf"const {const} = \[(.*?)\];", text, re.S)
        if not cm:
            continue
        new_block=transform_opts_block(cm.group(0))
        if new_block!=cm.group(0):
            text=text.replace(cm.group(0), new_block, 1)
            changed=True

    # why fields
    for wm in re.finditer(r"why:\s*\"([^\"]+)\"", text):
        why=wm.group(1)
        if CJK.search(why) and re.search(r"[A-Za-z]{2,}", why):
            en,zh=split_en_zh(why)
            text=text.replace(f'why: "{why}"', f'whyEn: "{en}", whyZh: "{zh}"', 1)
            changed=True

    # hint fields
    for hm in re.finditer(r"hint:\s*\"([^\"]+)\"", text):
        hint=hm.group(1)
        if CJK.search(hint) and re.search(r"[A-Za-z]{2,}", hint):
            en,zh=split_en_zh(hint)
            text=text.replace(f'hint: "{hint}"', f'hintEn: "{en}", hintZh: "{zh}"', 1)
            changed=True

    # bodyZh unit English
    for unit_en, unit_zh in UNIT_ZH.items():
        text=text.replace(f"觀察並解釋{unit_en}現象。", f"觀察並解釋{unit_zh}的現象。")
        text=text.replace(f"觀察並解釋{unit_en}現象", f"觀察並解釋{unit_zh}的現象")

    # titleEn strip CJK
    for tm in re.finditer(r"titleEn:\s*\"([^\"]+)\"", text):
        t=tm.group(1)
        if CJK.search(t):
            en=re.sub(r"[\u4e00-\u9fff]+","",t)
            en=re.sub(r"\s+"," ",en).strip(" ·—-")
            if en:
                text=text.replace(f'titleEn: "{t}"', f'titleEn: "{en}"', 1)
                changed=True

    # SUMMARY zh lines with English units
    for unit_en, unit_zh in UNIT_ZH.items():
        text=text.replace(f'zh: "觀察並解釋{unit_en}現象。"', f'zh: "觀察並解釋{unit_zh}的現象。"')

    if text!=orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False

count=0
for p in JS_ROOT.rglob("index.html"):
    if fix_js_app(p):
        count+=1
patch_lger()
print("apps_fixed",count)
