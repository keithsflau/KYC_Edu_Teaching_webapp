from pathlib import Path

ict = Path("Secondary_School/ICT")
ppt = next(p for p in ict.iterdir() if p.is_dir() and "powerpoint" in p.name.lower())
files = sorted(
    (f for f in ppt.glob("*.pptx") if f.stat().st_size <= 100 * 1024 * 1024),
    key=lambda f: f.name.lower(),
)
cards = []
for f in files:
    mb = f.stat().st_size / 1024 / 1024
    cards.append(
        f"""        <a href="{f.name}" class="glass-card rounded-2xl p-6 hover:bg-white/90 group block">
          <h3 class="text-lg font-semibold text-slate-900 group-hover:text-amber-600">{f.stem}</h3>
          <p class="text-sm text-slate-500 mt-2">{mb:.1f} MB</p>
        </a>"""
    )
html = f"""<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ICT 簡報 | Teaching Slides</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .glass-card {{ background: rgba(255,255,255,0.8); border: 1px solid rgba(15,23,42,0.08); transition: transform .2s, box-shadow .2s; }}
    .glass-card:hover {{ transform: translateY(-4px); box-shadow: 0 12px 30px rgba(15,23,42,0.08); }}
  </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
  <div class="max-w-6xl mx-auto">
    <a href="../index.html" class="text-sm text-slate-500 hover:text-amber-700">← ICT</a>
    <h1 class="text-3xl font-bold mt-4 mb-2 text-slate-800">ICT 教學簡報</h1>
    <p class="text-sm text-slate-500 mb-8">HE Ch1 and HE Ch3 exceed GitHub's 100MB limit and stay on this computer only.</p>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{chr(10).join(cards)}
    </div>
  </div>
</body>
</html>
"""
(ppt / "index.html").write_text(html, encoding="utf-8")
print("wrote", ppt / "index.html", "cards", len(files))
