#!/usr/bin/env python3
"""Wire HKDSE Quiz tab into enriched ICT topic modules."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FILES = [
    ROOT / "Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_Floating_Point/index.html",
    ROOT / "Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_Logic_Gates/index.html",
    ROOT / "Secondary_School/ICT/HKDSE_Interactive_Lab/DSE_Long_Questions/DSE_LQ_Ch03_CompSystems/DSE_LQ_Ch03_Topic_Data_Transfer/index.html",
]

ACCENTS = {"Floating_Point": "#ec4899", "Logic_Gates": "#a855f7", "Data_Transfer": "#06b6d4"}

OLD = """  return /*#__PURE__*/React.createElement("div", {

    className: "space-y-6"

  },"""

TAB_HEADER = """  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setTab("sim"),
    className: "px-4 py-2 rounded-lg font-bold min-h-[44px] " + (tab === "sim" ? "bg-purple-600 text-white shadow-lg" : "bg-slate-700 text-slate-300 hover:bg-slate-600")
  }, lang === "en" ? "Simulator" : "模擬器"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setTab("quiz"),
    className: "px-4 py-2 rounded-lg font-bold min-h-[44px] " + (tab === "quiz" ? "bg-purple-600 text-white shadow-lg" : "bg-slate-700 text-slate-300 hover:bg-slate-600")
  }, lang === "en" ? "HKDSE Quiz" : "DSE 測驗")), tab === "quiz" ? /*#__PURE__*/React.createElement(QuizPanel, {
    accent: "ACCENT_COLOR"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  },"""

CLOSE_EXTRA = """
  ));"""

for fp in FILES:
    text = fp.read_text(encoding="utf-8")
    if 'tab === "quiz"' in text:
        print(f"SKIP {fp.name}")
        continue
    if OLD not in text:
        print(f"NO MATCH {fp.name}")
        continue
    accent = "#a855f7"
    for k, v in ACCENTS.items():
        if k in fp.parent.name:
            accent = v
            break
    header = TAB_HEADER.replace("ACCENT_COLOR", accent)
    text = text.replace(OLD, header, 1)
    # Close the conditional sim wrapper: find App's closing `});` before `};` + root.render
    marker = "  }, \"Result = "
    if marker in text:
        # Find last occurrence before `};` that ends App
        idx = text.rfind("  }, \"Result = ")
        if idx > 0:
            # find closing `)));` of App return after finalVal
            close = text.find(")));", idx)
            if close > 0:
                text = text[: close + 4] + "\n  )" + text[close + 4 :]
    else:
        # Logic gates / data transfer - find last `));` before `};` const root
        root_idx = text.find("const root = ReactDOM.createRoot")
        chunk = text[:root_idx]
        last = chunk.rfind("));")
        if last > 0:
            text = text[: last + 3] + "\n  )" + text[last + 3 :]

    fp.write_text(text, encoding="utf-8")
    print(f"FIXED {fp.name}")
