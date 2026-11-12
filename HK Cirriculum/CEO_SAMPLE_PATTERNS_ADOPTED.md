# Sample UI Patterns Adopted

**Source:** `Reference/Sample - 複製`  
**Kit:** `HK Cirriculum/common/sample-ui-kit.js` → `window.HkcSampleUI`  
**Date:** 2026-07-29

## Patterns extracted (2)

| Pattern | Sample origin | API |
|---------|---------------|-----|
| **Feedback toast** | `PrimaryChinese/typo_surgeon` (top-center success/error/info) + `P5_擬人法_Copilot/logic.js` (`showToastBadge` achievement card) | `HkcSampleUI.toast({ type, zh, en, isZh, duration, variant, icon })` |
| **Experiment control bar + progress ring** | `Biology/apps/gel-electrophoresis` (Start / Running / Reset dark panel) + SVG run progress | `HkcSampleUI.ControlBar(props)` · `HkcSampleUI.ProgressRing(props)` · `HkcSampleUI.mountControlBar(el, opts)` for vanilla |

Vanilla JS, self-injected CSS, optional React components when React 18 is loaded. No new dependencies.

## Demo apps (3)

| App | Pattern used | Behaviour |
|-----|--------------|-----------|
| `Form 2/01_Photosynthesis` | Control bar + toast | Run sim animates ring; toast on optimal vs low glucose |
| `Form 2/03_Gas_Exchange` | Control bar + toast | Run sim; toast on efficient vs slow diffusion |
| `Form 2/09_Safety_House` | Toast only | Instant feedback on hazard/safe tap; achievement toast when 2/2 risks found |

## Adoption snippet

```html
<script src="../../../../common/sample-ui-kit.js"></script>
```

```javascript
const { ControlBar, toast } = window.HkcSampleUI;
toast({ type: "success", zh: "正確！", en: "Correct!", isZh });
<ControlBar isZh={isZh} accent={accent} light running={running} progress={pct} onStart={…} onReset={…} />
```

## Not adopted (deferred)

- Flowering-plants **step progress bar** — overlaps `HKCLabKit.mountLearnFromZero` dots; adopt only for multi-scene sims without LGER ramp.
- Framer-motion overlays from gel-electrophoresis — requires build step; keep in flagship Biology Vite apps only.

## Related kits

- `common/interactive-lab-kit.js` — TFZ ramp, challenge checklist  
- `common/junior-science-lger.js` — LGER Shell tabs
