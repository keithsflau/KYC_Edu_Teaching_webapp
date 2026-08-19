/* ===========================================================================
   engine.js — BioCycle：植物幾時放出 CO₂，幾時吸入 CO₂
   Photosynthesis vs respiration, and the compensation point

   中二科學．單元七 生物與空氣 / Form 2 Science, Unit 7 Living Things & Air

   最常見嗰個誤解係：「植物日頭光合作用，夜晚先呼吸。」
   錯。植物二十四小時都喺度呼吸 —— 呼吸從來冇停過。
   日頭見唔到，係因為光合作用嘅速率大過呼吸，兩者相減之後淨係得個「吸入」。

   The usual misconception is that plants photosynthesise by day and respire by
   night. They respire ALL DAY, without pause. What changes is which of the two
   is larger. The moment they are exactly equal is the COMPENSATION POINT, and
   it is a computed quantity here, not a label.

   光合作用對光強：直角雙曲線（飽和曲線），唔係直線 ——
   光加倍唔會令速率加倍，因為葉綠素會飽和。

       P(I) = Pmax · I / (I + Ik)          Ik = 半飽和光強

   呼吸速率 R 當作定值（同溫度有關，同光無關）。
   淨交換 Net = P − R。Net > 0 就係淨吸入 CO₂，Net < 0 就係淨放出。

   補償點：P(I) = R
       Pmax·I/(I + Ik) = R
       I·(Pmax − R) = R·Ik
       I_c = R·Ik / (Pmax − R)              ← 解出嚟，唔係查表

   碳酸氫鹽指示劑（hydrogencarbonate indicator）嘅顏色：
       CO₂ 多 → 黃         CO₂ 同大氣一樣 → 紅        CO₂ 少 → 紫
   顏色係由試管入面積落嚟嘅淨 CO₂ 決定，所以佢係個「積分」，唔係即時速率。

   可喺 Node 直接 require。Requires cleanly in Node.
   =========================================================================== */
(function (global) {
  "use strict";

  /* 預設參數。單位係真嘢：
     光強 PPFD  µmol photons m⁻² s⁻¹
     速率       µmol CO₂    m⁻² s⁻¹   */
  var DEFAULTS = {
    Pmax: 12.0,      /* 光飽和之後嘅總光合速率 gross photosynthesis at saturation */
    Ik: 150.0,       /* 半飽和光強 half-saturation irradiance */
    R: 2.0,          /* 呼吸速率，全日不變 respiration, constant all day */
    Imax: 1500.0,    /* 正午晴天嘅光強 full midday sun */
    sunrise: 6.0,    /* 日出 h */
    sunset: 18.0     /* 日落 h */
  };

  function opts(o) {
    var r = {}, k;
    for (k in DEFAULTS) if (Object.prototype.hasOwnProperty.call(DEFAULTS, k)) r[k] = DEFAULTS[k];
    if (o) for (k in o) if (Object.prototype.hasOwnProperty.call(o, k)) r[k] = o[k];
    return r;
  }

  /* 一日之內嘅光強。日出到日落之間半個正弦，夜晚係 0（唔係負數）。 */
  function irradiance(t, o) {
    o = opts(o);
    if (t <= o.sunrise || t >= o.sunset) return 0;
    var x = Math.PI * (t - o.sunrise) / (o.sunset - o.sunrise);
    return o.Imax * Math.sin(x);
  }

  /* 總光合速率：直角雙曲線，會飽和。 */
  function grossPhotosynthesis(I, o) {
    o = opts(o);
    return o.Pmax * I / (I + o.Ik);
  }

  /* 呼吸：同光無關，日夜都一樣。呢個就係成個 app 嘅重點。 */
  function respiration(o) { return opts(o).R; }

  /* 淨交換。正數 = 淨吸入 CO₂；負數 = 淨放出 CO₂。 */
  function netExchange(I, o) {
    return grossPhotosynthesis(I, o) - respiration(o);
  }

  /* 補償點光強：解 P(I) = R 得 I_c = R·Ik/(Pmax − R)。
     如果 R >= Pmax，即係無論幾光都追唔到，回傳 Infinity。 */
  function compensationIrradiance(o) {
    o = opts(o);
    if (o.R >= o.Pmax) return Infinity;
    return o.R * o.Ik / (o.Pmax - o.R);
  }

  /* 一日之內幾時到達補償點。解 I(t) = I_c。
     半正弦一日之內會經過同一個光強兩次（朝早一次、黃昏一次）。 */
  function compensationTimes(o) {
    o = opts(o);
    var Ic = compensationIrradiance(o);
    if (!isFinite(Ic) || Ic > o.Imax) return [];
    var day = o.sunset - o.sunrise;
    var phi = Math.asin(Ic / o.Imax);          /* 0..π/2 */
    var t1 = o.sunrise + day * phi / Math.PI;
    var t2 = o.sunset - day * phi / Math.PI;
    return [t1, t2];
  }

  /* 一日嘅淨 CO₂ 收支，用梯形法積分，單位 µmol CO₂ m⁻²。
     正數 = 全日計淨吸入（植物有得生長）。 */
  function dailyNet(o, steps) {
    o = opts(o);
    var n = steps || 2880, sum = 0, dt = 24 / n;
    for (var i = 0; i < n; i++) {
      var a = netExchange(irradiance(i * dt, o), o);
      var b = netExchange(irradiance((i + 1) * dt, o), o);
      sum += 0.5 * (a + b) * dt;
    }
    return sum * 3600;                          /* 每小時 3600 秒 */
  }

  /* 由試管入面積落嚟嘅淨 CO₂，決定指示劑顏色。
     balance > 0 代表 CO₂ 俾植物用咗（變少）→ 偏紫
     balance < 0 代表 CO₂ 積咗落嚟（變多）→ 偏黃 */
  function indicatorColour(balance, scale) {
    var s = scale || 6000;
    var x = Math.max(-1, Math.min(1, balance / s));
    /* 黃 #f2d024 ← 紅 #d63b3b → 紫 #7b3fb5 */
    var stops = x >= 0
      ? [[214, 59, 59], [123, 63, 181], x]
      : [[214, 59, 59], [242, 208, 36], -x];
    var a = stops[0], b = stops[1], f = stops[2];
    function mix(i) { return Math.round(a[i] + (b[i] - a[i]) * f); }
    return "rgb(" + mix(0) + "," + mix(1) + "," + mix(2) + ")";
  }

  function indicatorLabel(balance, dead) {
    var d = dead === undefined ? 600 : dead;
    if (balance > d) return "purple";
    if (balance < -d) return "yellow";
    return "red";
  }

  var API = {
    DEFAULTS: DEFAULTS,
    opts: opts,
    irradiance: irradiance,
    grossPhotosynthesis: grossPhotosynthesis,
    respiration: respiration,
    netExchange: netExchange,
    compensationIrradiance: compensationIrradiance,
    compensationTimes: compensationTimes,
    dailyNet: dailyNet,
    indicatorColour: indicatorColour,
    indicatorLabel: indicatorLabel
  };

  global.JS2_BIOCYCLE = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof globalThis !== "undefined" ? globalThis
   : typeof window !== "undefined" ? window : this);

/* 注意：呢個資料夾仲留住 Vite source 嘅 package.json，入面有 "type": "module"，
   所以 Node 會當呢個檔案係 ESM —— 頂層 this 係 undefined，module 亦唔存在。
   用 globalThis 就兩邊都行得：喺 Node `await import()` 或 require 之後，
   由 globalThis.JS2_BIOCYCLE 攞得到同一個 API；喺瀏覽器 <script> 就係 window。

   NOTE: this folder still carries the Vite source's package.json with
   "type": "module", so Node treats this file as ESM — top-level `this` is
   undefined and `module` does not exist. Anchoring on globalThis makes it work
   both ways: read globalThis.JS2_BIOCYCLE after importing it in Node. */
