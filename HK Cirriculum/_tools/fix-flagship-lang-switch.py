#!/usr/bin/env python3
"""Fix launch-pack 6 flagships: tabs/headers re-render on NCS lang change."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

APPS = [
    {
        "path": ROOT / "Secondary_School/Physics/Form 5/06_Circuit_Builder/index.html",
        "strings": {
            "hub": {"zh-Hant": "← 返回主頁", "en": "← Back to hub", "ne": "← हबमा फर्कनुहोस्", "ur": "← مرکز پر واپس", "tl": "← Bumalik sa hub", "hi": "← हब पर वापस"},
            "subtitle": {"zh-Hant": "中五物理 · 電學", "en": "F5 Physics · Electricity", "ne": "F5 Physics · Electricity", "ur": "F5 Physics · Electricity", "tl": "F5 Physics · Electricity", "hi": "F5 Physics · Electricity"},
            "title": {"zh-Hant": "電路建構器", "en": "Circuit Builder", "ne": "Circuit Builder", "ur": "Circuit Builder", "tl": "Circuit Builder", "hi": "Circuit Builder"},
            "modes": {"zh-Hant": "學習 · 實驗 · 引導 · 測驗 · 錯題", "en": "Learn · Lab · Guided · Exam · Review", "ne": "Learn · Lab · Guided · Exam · Review", "ur": "Learn · Lab · Guided · Exam · Review", "tl": "Learn · Lab · Guided · Exam · Review", "hi": "Learn · Lab · Guided · Exam · Review"},
        },
        "add_lang_switcher": True,
        "shell": False,
    },
    {
        "path": ROOT / "Secondary_School/Physics/Form 4/04_Gas_Laws_Lab/index.html",
        "strings": {
            "hub": {"zh-Hant": "← 返回主頁", "en": "← Back to hub", "ne": "← हबमा फर्कनुहोस्", "ur": "← مرکز پر واپس", "tl": "← Bumalik sa hub", "hi": "← हब पर वापस"},
            "subtitle": {"zh-Hant": "中四物理 · 熱與氣體", "en": "F4 Physics · Heat & Gases", "ne": "F4 Physics · Heat & Gases", "ur": "F4 Physics · Heat & Gases", "tl": "F4 Physics · Heat & Gases", "hi": "F4 Physics · Heat & Gases"},
            "title": {"zh-Hant": "氣體定律實驗室", "en": "Gas Laws Lab", "ne": "Gas Laws Lab", "ur": "Gas Laws Lab", "tl": "Gas Laws Lab", "hi": "Gas Laws Lab"},
            "modes": {"zh-Hant": "學習 · 實驗 · 引導 · 測驗 · 錯題", "en": "Learn · Lab · Guided · Exam · Review", "ne": "Learn · Lab · Guided · Exam · Review", "ur": "Learn · Lab · Guided · Exam · Review", "tl": "Learn · Lab · Guided · Exam · Review", "hi": "Learn · Lab · Guided · Exam · Review"},
        },
        "add_lang_switcher": True,
        "shell": False,
    },
    {
        "path": ROOT / "Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share/index.html",
        "strings": {
            "hub": {"zh-Hant": "← 返回單元", "en": "← Back to hub", "ne": "← हबमा फर्कनुहोस्", "ur": "← مرکز پر واپس", "tl": "← Bumalik sa hub", "hi": "← हब पर वापस"},
            "subtitle": {"zh-Hant": "中一數學 · 分數", "en": "S1 Math · Fractions", "ne": "S1 Math · Fractions", "ur": "S1 Math · Fractions", "tl": "S1 Math · Fractions", "hi": "S1 Math · Fractions"},
            "title": {"zh-Hant": "分數薄餅分享實驗室", "en": "Fraction Pizza Share Lab", "ne": "Fraction Pizza Share Lab", "ur": "Fraction Pizza Share Lab", "tl": "Fraction Pizza Share Lab", "hi": "Fraction Pizza Share Lab"},
            "modes": {"zh-Hant": "學習 · 引導 · 測驗", "en": "Learn · Guided · Exam", "ne": "Learn · Guided · Exam", "ur": "Learn · Guided · Exam", "tl": "Learn · Guided · Exam", "hi": "Learn · Guided · Exam"},
        },
        "add_lang_switcher": False,
        "shell": False,
    },
    {
        "path": ROOT / "Secondary_School/Chemistry/Form 6/01_Le_Chatelier/index.html",
        "strings": {
            "hub": {"zh-Hant": "← F6 化學主頁", "en": "← F6 Chemistry Hub", "ne": "← F6 Chemistry Hub", "ur": "← F6 Chemistry Hub", "tl": "← F6 Chemistry Hub", "hi": "← F6 Chemistry Hub"},
            "subtitle": {"zh-Hant": "中六化學 · 勒夏特列", "en": "F6 Chemistry · Le Chatelier", "ne": "F6 Chemistry · Le Chatelier", "ur": "F6 Chemistry · Le Chatelier", "tl": "F6 Chemistry · Le Chatelier", "hi": "F6 Chemistry · Le Chatelier"},
            "title": {"zh-Hant": "勒夏特列平衡室", "en": "Le Chatelier Chamber", "ne": "Le Chatelier Chamber", "ur": "Le Chatelier Chamber", "tl": "Le Chatelier Chamber", "hi": "Le Chatelier Chamber"},
            "modes": {"zh-Hant": "學習 · 引導 · 測驗", "en": "Learn · Guided · Exam", "ne": "Learn · Guided · Exam", "ur": "Learn · Guided · Exam", "tl": "Learn · Guided · Exam", "hi": "Learn · Guided · Exam"},
        },
        "add_lang_switcher": False,
        "shell": True,
    },
    {
        "path": ROOT / "Secondary_School/Chemistry/Form 6/02_Titration_Curve/index.html",
        "strings": {
            "hub": {"zh-Hant": "← F6 化學主頁", "en": "← F6 Chemistry Hub", "ne": "← F6 Chemistry Hub", "ur": "← F6 Chemistry Hub", "tl": "← F6 Chemistry Hub", "hi": "← F6 Chemistry Hub"},
            "subtitle": {"zh-Hant": "中六化學 · 滴定", "en": "F6 Chemistry · Titration", "ne": "F6 Chemistry · Titration", "ur": "F6 Chemistry · Titration", "tl": "F6 Chemistry · Titration", "hi": "F6 Chemistry · Titration"},
            "title": {"zh-Hant": "滴定曲線實驗", "en": "Titration Curve Lab", "ne": "Titration Curve Lab", "ur": "Titration Curve Lab", "tl": "Titration Curve Lab", "hi": "Titration Curve Lab"},
            "modes": {"zh-Hant": "學習 · 引導 · 測驗", "en": "Learn · Guided · Exam", "ne": "Learn · Guided · Exam", "ur": "Learn · Guided · Exam", "tl": "Learn · Guided · Exam", "hi": "Learn · Guided · Exam"},
        },
        "add_lang_switcher": False,
        "shell": True,
    },
    {
        "path": ROOT / "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/index.html",
        "strings": {
            "hub": {"zh-Hant": "← F5 化學主頁", "en": "← F5 Chemistry Hub", "ne": "← F5 Chemistry Hub", "ur": "← F5 Chemistry Hub", "tl": "← F5 Chemistry Hub", "hi": "← F5 Chemistry Hub"},
            "subtitle": {"zh-Hant": "中五化學 · 化學平衡 Kc", "en": "F5 Chemistry · Chemical Equilibrium Kc", "ne": "F5 Chemistry · Chemical Equilibrium Kc", "ur": "F5 Chemistry · Chemical Equilibrium Kc", "tl": "F5 Chemistry · Chemical Equilibrium Kc", "hi": "F5 Chemistry · Chemical Equilibrium Kc"},
            "title": {"zh-Hant": "平衡常數 Kc 實驗室", "en": "Equilibrium Kc Lab", "ne": "Equilibrium Kc Lab", "ur": "Equilibrium Kc Lab", "tl": "Equilibrium Kc Lab", "hi": "Equilibrium Kc Lab"},
            "modes": {"zh-Hant": "學習 · 引導 · 測驗", "en": "Learn · Guided · Exam", "ne": "Learn · Guided · Exam", "ur": "Learn · Guided · Exam", "tl": "Learn · Guided · Exam", "hi": "Learn · Guided · Exam"},
        },
        "add_lang_switcher": False,
        "shell": True,
    },
]

HELPER = '''
    const FLAGSHIP_STRINGS = __STRINGS__;

    function flagshipUi(key) {
      var lang = (window.NcsI18n && window.NcsI18n.getLang()) || "zh-Hant";
      var row = FLAGSHIP_STRINGS[key];
      if (!row) return key;
      return row[lang] || row.en || row["zh-Hant"] || row.zh || key;
    }

    function registerFlagshipStrings() {
      if (!window.NcsI18n || !window.NcsI18n.registerStrings) return;
      var page = { zh: {}, en: {}, ne: {}, ur: {}, tl: {}, hi: {} };
      Object.keys(FLAGSHIP_STRINGS).forEach(function (k) {
        var row = FLAGSHIP_STRINGS[k];
        ["zh", "en", "ne", "ur", "tl", "hi"].forEach(function (code) {
          var val = row[code] || row["zh-Hant"] || row.en;
          if (val) page[code][k] = val;
        });
      });
      window.NcsI18n.registerStrings(page);
    }
    registerFlagshipStrings();
    if (window.NcsI18n && window.NcsI18n.onChange) {
      window.NcsI18n.onChange(registerFlagshipStrings);
    }
'''


def fmt_strings(d):
    import json
    return json.dumps(d, ensure_ascii=False, indent=2)


def patch_file(app):
    path = app["path"]
    text = path.read_text(encoding="utf-8")
    orig = text

    marker = "const { useLang, LangSwitcher, appTabs } = window.NcsI18n;"
    if "FLAGSHIP_STRINGS" not in text and marker in text:
        helper = HELPER.replace("__STRINGS__", fmt_strings(app["strings"]))
        text = text.replace(marker, marker + helper, 1)

    text = re.sub(
        r"const \{ isZh, t \} = useLang\(\);",
        "const { isZh, lang, t } = useLang();",
        text,
    )
    text = re.sub(
        r"appTabs\((\[[^\]]+\]), isZh",
        r"appTabs(\1, lang",
        text,
    )

    if app["shell"]:
        text = text.replace(
            '{t(hubLabel, hubEn)}',
            '{flagshipUi("hub")}',
        )
        text = text.replace(
            '{t(titleZh, titleEn)}',
            '{flagshipUi("title")}',
        )
        text = text.replace(
            '{t("Learn · Guided · Exam", "Learn · Guided · Exam")}',
            '{flagshipUi("modes")}',
        )
        text = text.replace(
            '{subtitle}',
            '{flagshipUi("subtitle")}',
        )

    # Physics/math App header blocks
    text = re.sub(
        r'\{t\("[^"]*", "← Back to hub"\)\}',
        '{flagshipUi("hub")}',
        text,
    )
    text = re.sub(
        r'\{t\("[^"]*", "F5 Physics · Electricity"\)\}',
        '{flagshipUi("subtitle")}',
        text,
    )
    text = re.sub(
        r'\{t\("[^"]*", "F4 Physics · Heat & Gases"\)\}',
        '{flagshipUi("subtitle")}',
        text,
    )
    text = re.sub(
        r'\{t\("[^"]*", "Circuit Builder"\)\}',
        '{flagshipUi("title")}',
        text,
    )
    text = re.sub(
        r'\{t\("[^"]*", "Gas Laws Lab"\)\}',
        '{flagshipUi("title")}',
        text,
    )
    text = re.sub(
        r'\{t\("← 返回單元", "← Back to hub"\)\}',
        '{flagshipUi("hub")}',
        text,
    )
    text = re.sub(
        r'\{t\("中一數學 · 分數", "S1 Math · Fractions"\)\}',
        '{flagshipUi("subtitle")}',
        text,
    )
    text = re.sub(
        r'\{t\("分數薄餅分享實驗室", "Fraction Pizza Share Lab"\)\}',
        '{flagshipUi("title")}',
        text,
    )
    text = re.sub(
        r'\{t\("學習 · 引導 · 測驗", "Learn · Guided · Exam"\)\}',
        '{flagshipUi("modes")}',
        text,
    )
    text = re.sub(
        r'\{t\("[^"]*", "Learn · Lab · Guided · Exam · Review"\)\}',
        '{flagshipUi("modes")}',
        text,
    )

    if app["add_lang_switcher"] and "<LangSwitcher />" not in text:
        text = text.replace(
            '<a href="../../index.html" className="text-sm hover:underline font-semibold" style={{color: ACCENT}}>{flagshipUi("hub")}</a>\n          </div>',
            '<a href="../../index.html" className="text-sm hover:underline font-semibold" style={{color: ACCENT}}>{flagshipUi("hub")}</a>\n            <LangSwitcher />\n          </div>',
            1,
        )

    if text != orig:
        path.write_text(text, encoding="utf-8")
        print("FIXED:", path.relative_to(ROOT))
        return True
    print("SKIP (no changes):", path.relative_to(ROOT))
    return False


if __name__ == "__main__":
    fixed = 0
    for app in APPS:
        if patch_file(app):
            fixed += 1
    print(f"Done: {fixed}/{len(APPS)} files updated")
