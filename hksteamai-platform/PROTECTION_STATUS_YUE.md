# 保護層狀態（粵語）| Protection layers status

Agent 5（後端閘門）本地 MVP 交貨摘要。

## 已上線（本地 MVP）

| 層 | 狀態 | 說明 |
|----|------|------|
| 權益檢查 entitlement | ✅ | Prisma `Subscription`（Stripe mirror）：`free` / `primary` / `secondary` / `all` + trial |
| 免費 demo 白名單 | ✅ | `data/free-demo-catalog.json` + Admin `free_catalog_override` |
| 付費目錄唔公開 | ✅ | 訪客只見 free demos；`/api/modules/catalog`、`/api/catalog?system=` 要權益／登入先睇付費 stub |
| HTML 代理閘門 | ✅ | `/api/modules/[...path]`（play iframe）+ `/api/modules/content` |
| 路徑沙箱 | ✅ | 禁止 `..`／絕對路徑；只准 Primary/Secondary 等 prefix |
| 浮水印 watermark | ✅ | HTML comment + `<meta name="hksteamai-wm">` 寫入 user id |
| 速率限制 | ✅ | 記憶體 60 次／分鐘／身份（單機；多實例要換） |
| 短效簽名 URL | ✅ | `POST /api/modules/signed` → HMAC ~2 分鐘（query + pathUrl） |
| 存取日誌 | ✅ | `AccessLog`；`/admin` 可睇 |
| Admin 後台 | ✅ | `/admin` + `ADMIN_SECRET`；用戶／訂閱／free override／logs |

## 未做／稍後（Cloudflare）

| 層 | 狀態 | 說明 |
|----|------|------|
| R2 私有物件倉 | ⏳ | 生產環境模組放 R2，唔公開成個庫 |
| Workers 閘門 | ⏳ | Worker 驗 JWT／簽名 → 查權益 → 串流 R2 |
| 分散式 rate limit | ⏳ | Durable Object / KV |
| CDN 直出付費 HTML | ❌ | **唔會**做 |

## 畀 Agent 4 用嘅 API

- `GET /api/me` · `GET /api/entitlements` — 而家權益
- `GET /api/modules/demos` — 免費 demo（公開）
- `GET /api/modules/catalog` · `GET /api/catalog?system=` — 有閘目錄
- `GET /api/modules/access?path=` — 單一課鎖／唔鎖
- `GET /api/modules/{...path}` — play iframe 過閘拎 HTML／assets
- `GET /api/modules/content?path=` — query 式代理
- `POST /api/modules/signed` — 短效連結

**一句總結：** 付費模組唔會公開列目錄；要登入＋權益先至經 API 攞 HTML；本機已有浮水印、限速、簽名 URL；上線後搬去 Workers + R2。
