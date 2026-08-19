import json
import re
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parents[1]
BASE = "http://127.0.0.1:4173"
HREF_RE = re.compile(r'''href\s*=\s*(?:"([^"]+)"|'([^']+)')''', re.I)
JSON_RE = re.compile(
    r'<script id="math-curriculum" type="application/json">(.*?)</script>',
    re.S,
)


def collect(file: Path) -> list[Path]:
    html = file.read_text(encoding="utf-8", errors="replace")
    out = []
    for a, b in HREF_RE.findall(html):
        raw = a or b
        if not raw or raw.startswith("#") or "${" in raw:
            continue
        if re.match(r"^(https?:|mailto:|javascript:|data:)", raw, re.I):
            continue
        clean = raw.split("#", 1)[0].split("?", 1)[0]
        out.append((file.parent / clean).resolve())
    match = JSON_RE.search(html)
    if match:
        data = json.loads(match.group(1))
        for unit in data:
            for app in unit.get("apps", []):
                if app.get("path"):
                    out.append((file.parent / app["path"]).resolve())
    return out


def walk() -> list[Path]:
    queue = [ROOT / "index.html"]
    seen = set()
    pages = []
    while queue:
        file = queue.pop()
        try:
            file = file.resolve()
        except OSError:
            continue
        if file in seen or not file.is_file() or file.suffix.lower() != ".html":
            continue
        seen.add(file)
        pages.append(file)
        for nxt in collect(file):
            if str(nxt).startswith(str(ROOT)) and nxt.suffix.lower() == ".html":
                queue.append(nxt)
    return pages


def to_url(file: Path) -> str:
    rel = file.relative_to(ROOT).as_posix()
    return BASE + "/" + "/".join(quote(part, safe="") for part in rel.split("/"))


def main() -> None:
    pages = walk()
    print(f"pages {len(pages)}")
    bad = []
    for file in pages:
        url = to_url(file)
        try:
            with urlopen(Request(url, method="GET"), timeout=15) as res:
                status = res.status
                body = res.read(2000)
        except HTTPError as e:
            status = e.code
            body = b""
        except URLError as e:
            bad.append((str(file.relative_to(ROOT)), 0, str(e.reason)))
            print("FAIL", file.relative_to(ROOT), e.reason)
            continue
        if status >= 400:
            bad.append((str(file.relative_to(ROOT)), status, ""))
            print("HTTP", status, file.relative_to(ROOT))
    print(f"bad {len(bad)}")


if __name__ == "__main__":
    main()
