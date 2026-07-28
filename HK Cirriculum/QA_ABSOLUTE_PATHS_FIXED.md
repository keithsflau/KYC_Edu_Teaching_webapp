# QA: Absolute Path Failures Fixed

**Date:** 2026-07-28  
**Scope:** 3D war maps (`cse-wars`, `dse-wars`, `ru-ua-war`) · Vite dist favicons · fleet static server (port 5173)

## Summary

| Metric | Count |
|--------|------:|
| **Root cause: `/tiles/` absolute paths on localhost** | **3 apps** |
| **`TILE_SRC` logic unified** | **3 files** |
| **Hub / scaffold docs updated** | **4 files** |
| **`href="/vite.svg"` → relative** | **3 dist builds** |
| **cse-wars battle maps (all share `shared/app.js`)** | **19** |

## Root cause

3D war `app.js` used root-absolute tile URLs on every localhost session:

```js
dem: "/tiles/dem/{z}/{x}/{y}.png"
```

When the fleet static server serves `HK Cirriculum` at `http://localhost:5173/Secondary_School/…/cse-wars/…`, the browser requested `http://localhost:5173/tiles/dem/…` (server root) instead of a path under the war pack. That URL does not exist on a plain static server → terrain failed to load (e.g. 赤壁 Chibi).

Production (GitHub Pages) and dedicated per-pack `serve.js` (ports 5050–5052) were unaffected.

## Fix

### 1. `TILE_SRC` resolution (all three war packs)

| Host | Port | Tile source |
|------|------|-------------|
| Production | any | Upstream AWS Terrarium + EOX Sentinel-2 (unchanged) |
| localhost | **5050** (ru-ua-war) | `/tiles/*` via pack `serve.js` |
| localhost | **5051** (dse-wars) | `/tiles/*` via pack `serve.js` |
| localhost | **5052** (cse-wars) | `/tiles/*` via pack `serve.js` |
| localhost | **5173** (fleet static) | **Upstream direct** (CORS-enabled; no `/tiles/` proxy required) |

Files changed:

- `Secondary_School/Chinese_History/3D_War/cse-wars/shared/app.js`
- `Secondary_School/History/3D_War/dse-wars/shared/app.js`
- `Secondary_School/History/3D_War/ru-ua-war/app.js`

### 2. Hub & scaffold copy

Updated local-dev instructions on:

- `cse-wars/index.html`
- `dse-wars/index.html`
- `cse-wars/tools/scaffold-cse-battles.js`

### 3. Vite dist favicons

`href="/vite.svg"` → `href="./vite.svg"` in committed dist builds:

- `Primary_School/PrimaryChinese/story_dice/dist/index.html`
- `Secondary_School/Biology/apps/allopatric-speciation/dist/index.html`
- `Secondary_School/Biology/apps/energy-flow/dist/index.html`
- `Secondary_School/Biology/apps/immune-response/dist/index.html`

### 4. Optional tile proxy servers (unchanged, still available)

| Server | Command | Port | Tile proxy |
|--------|---------|------|------------|
| Fleet curriculum | `node serve.js` in `HK Cirriculum/` | 5173 | Yes (`*/tiles/dem|img/*`) |
| cse-wars pack | `node serve.js` in `cse-wars/` | 5052 | Yes (`/tiles/*` at root) |
| dse-wars pack | `node serve.js` in `dse-wars/` | 5051 | Yes |
| ru-ua-war pack | `node serve.js` in `ru-ua-war/` | 5050 | Yes |

On port 5173 the war apps now load tiles from upstream, so **`npx serve "HK Cirriculum" -l 5173` works** without the proxy.

## cse-wars — all 19 battle maps (fixed via shared `app.js`)

| Era | Battle | Path |
|-----|--------|------|
| 秦漢 | 垓下 | `wars/qin-han/gaixia/` |
| 秦漢 | 漠北 | `wars/qin-han/mobei/` |
| 魏晉南北朝 | 官渡 | `wars/weijin/guandu/` |
| 魏晉南北朝 | **赤壁** | `wars/weijin/chibi/` |
| 魏晉南北朝 | 淝水 | `wars/weijin/feishui/` |
| 隋唐 | 安史之亂 | `wars/sui-tang/anshi/` |
| 宋元 | 崖山 | `wars/song-yuan/yamen/` |
| 明清 | 土木堡 | `wars/ming-qing/tumu/` |
| 明清 | 薩爾滸 | `wars/ming-qing/sarhu/` |
| 晚清 | 黃海 | `wars/late-qing/yellow-sea/` |
| 晚清 | 威海衛 | `wars/late-qing/weihaiwei/` |
| 抗日 | 淞滬 | `wars/anti-japan/songhu/` |
| 抗日 | 平型關 | `wars/anti-japan/pingxingguan/` |
| 抗日 | 台兒莊 | `wars/anti-japan/taierzhuang/` |
| 抗日 | 百團大戰 | `wars/anti-japan/hundred-regiments/` |
| 內戰 | 遼瀋 | `wars/civil-war/liaoshen/` |
| 內戰 | 淮海 | `wars/civil-war/huaihai/` |
| 內戰 | 平津 | `wars/civil-war/pingjin/` |
| 內戰 | 渡江 | `wars/civil-war/crossing/` |

Prefix: `Secondary_School/Chinese_History/3D_War/cse-wars/`

## Smoke-test URLs (port 5173)

```text
http://localhost:5173/Secondary_School/Chinese_History/3D_War/cse-wars/wars/weijin/chibi/
http://localhost:5173/Secondary_School/Chinese_History/3D_War/cse-wars/wars/anti-japan/songhu/
http://localhost:5173/Secondary_School/History/3D_War/dse-wars/wars/ww2/normandy/
http://localhost:5173/Secondary_School/History/3D_War/ru-ua-war/
```

**Pass criteria:** Page loads; boot screen clears; satellite terrain + DEM visible (no `地形瓦片載入失敗` in `#err`).

## Scan results — not changed (intentional)

| Pattern | Location | Reason |
|---------|----------|--------|
| `href="/vite.svg"` | Biology `restore_all_index.ps1` templates | Dev scaffold only; not served |
| `src="/index.tsx"` | `Junior Science/Form 2/BioCycle/vite.html` | Vite dev entry; not fleet static |
| `text: "/en/hkdse/"` | ICT URL Anatomy lab | Lesson content, not asset path |
| `fetch(… + "/api/redeem")` | `common/entitlement.js` | API base is computed at runtime |
| Commented `/assets/sounds/` | Hong Kong Tycoon Dream | Not active code |

## How to run locally

```powershell
# Fleet static (recommended for QA)
cd "c:\Users\keith\OneDrive\Github\Profile"
npx serve "HK Cirriculum" -l 5173

# Or curriculum server with optional tile proxy
cd "c:\Users\keith\OneDrive\Github\Profile\HK Cirriculum"
node serve.js

# Dedicated war-pack server (same-origin tile proxy)
cd "HK Cirriculum\Secondary_School\Chinese_History\3D_War\cse-wars"
node serve.js   # → http://localhost:5052
```
