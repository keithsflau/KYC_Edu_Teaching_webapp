#!/usr/bin/env python3
"""Replace crossorigin React/Babel CDN tags with local vendor copies (file:// safe)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "Secondary_School" / "Junior Science"
OLD = re.compile(
    r'<script crossorigin src="https://unpkg\.com/react@18/umd/react\.production\.min\.js"></script>\s*'
    r'<script crossorigin src="https://unpkg\.com/react-dom@18/umd/react-dom\.production\.min\.js"></script>\s*'
    r'<script src="https://unpkg\.com/@babel/standalone/babel\.min\.js"></script>',
    re.I,
)
NEW = """<script src="../../../../common/vendor/react.production.min.js"></script>
  <script src="../../../../common/vendor/react-dom.production.min.js"></script>
  <script src="../../../../common/vendor/babel.min.js"></script>"""

# Fix broken fleet-init boot blocks (wireLgerI18n trapped inside boot)
BROKEN_BOOT = re.compile(
    r"function boot\(\) \{\s*function wireLgerI18n\(\)",
    re.M,
)
FIXED_BOOT = "function wireLgerI18n() {\n      if (window.JSLGER && window.JSLGER.registerShellStrings) window.JSLGER.registerShellStrings();\n    }\n    if (window.NcsI18n && window.NcsI18n.onChange) window.NcsI18n.onChange(wireLgerI18n);\n    function boot() {\n      function wireLgerI18nInner()"

fixed_cdn: list[str] = []
fixed_boot: list[str] = []

for html in sorted(ROOT.rglob("index.html")):
    text = html.read_text(encoding="utf-8")
    orig = text
    if OLD.search(text):
        text = OLD.sub(NEW, text, count=1)
        fixed_cdn.append(str(html.relative_to(ROOT.parent)))
    if BROKEN_BOOT.search(text):
        # Only fix apps with nested wireLgerI18n inside boot (enrichment regression)
        text = text.replace(
            "    function boot() {\n    function wireLgerI18n() {\n      if (window.JSLGER && window.JSLGER.registerShellStrings) window.JSLGER.registerShellStrings();\n    }\n    if (window.NcsI18n && window.NcsI18n.onChange) window.NcsI18n.onChange(wireLgerI18n);\n      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;\n      window.NcsI18n.init({\n        chromePath: \"../../../../_shared/ncs-chrome.json\",\n        target: document.body\n      }).then(hideLegacyToggles);\n      wireLgerI18n();\n    }",
            "    function wireLgerI18n() {\n      if (window.JSLGER && window.JSLGER.registerShellStrings) window.JSLGER.registerShellStrings();\n    }\n    if (window.NcsI18n && window.NcsI18n.onChange) window.NcsI18n.onChange(wireLgerI18n);\n    function boot() {\n      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;\n      window.NcsI18n.init({\n        chromePath: \"../../../../_shared/ncs-chrome.json\",\n        target: document.body\n      }).then(function () {\n        hideLegacyToggles();\n        wireLgerI18n();\n      });\n    }",
        )
        if text != orig:
            fixed_boot.append(str(html.relative_to(ROOT.parent)))
    if text != orig:
        html.write_text(text, encoding="utf-8")

print(f"CDN→vendor: {len(fixed_cdn)} apps")
print(f"fleet-init boot: {len(fixed_boot)} apps")
