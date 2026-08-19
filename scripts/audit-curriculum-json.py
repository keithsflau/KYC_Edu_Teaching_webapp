import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = {"node_modules", "venv", ".venv", ".git"}
RE = re.compile(
    r'<script id="math-curriculum" type="application/json">(.*?)</script>',
    re.S,
)


def main() -> None:
    missing = []
    checked = 0
    for page in ROOT.rglob("index.html"):
        if any(part in SKIP for part in page.parts):
            continue
        text = page.read_text(encoding="utf-8", errors="replace")
        match = RE.search(text)
        if not match:
            continue
        data = json.loads(match.group(1))
        for unit in data:
            for app in unit.get("apps", []):
                path = app.get("path")
                if not path:
                    continue
                checked += 1
                target = (page.parent / path).resolve()
                if not target.exists():
                    missing.append((str(page.relative_to(ROOT)), path))
    print(f"checked {checked}")
    print(f"missing {len(missing)}")
    for page, path in missing:
        print(f"MISS\t{page}\t{path}")


if __name__ == "__main__":
    main()
