/* ===========================================================================
   engine.js — 牛頓擺：點解拉起兩粒，就一定彈出兩粒
   Newton's Cradle: why n balls in gives n balls out, and nothing else

   中二科學．單元十一 力與運動 / Form 2 Science, Unit 11 Force & Motion

   個問題唔係「會唔會彈出兩粒」——個問題係「點解唔可以係一粒用兩倍速飛出去」。
   一粒用兩倍速，動量係啱嘅。好多人就係喺呢度停低，然後以為自己明咗。

   The question is not "do two balls come out" — it is "why can't ONE ball
   come out at twice the speed". That outcome conserves momentum perfectly.
   Momentum alone does not decide this. Kinetic energy does.

   兩條守恆定律一齊擺出嚟：n 粒波以速率 v 撞入去，假設有 k 粒以速率 u 彈出，

       動量 momentum:        k·u  =  n·v
       動能 kinetic energy:  k·u² =  n·v²

   兩式相除即刻得 u = v，回代得 k = n。冇第二個解。
   Dividing the second by the first gives u = v immediately, and then k = n.
   The solution is UNIQUE — that is the whole content of the toy.

   擺嘅部分：由能量守恆，mgh = ½mv²，而 h = L(1 − cos θ)，
       v = sqrt(2 g L (1 − cos θ))
   質量消得去，所以撞擊速率同粒波幾重完全無關。

   可喺 Node 直接 require。Requires cleanly in Node.
   =========================================================================== */
(function (global) {
  "use strict";

  var G = 9.80665;                 /* m s⁻², standard gravity */
  var DEG = Math.PI / 180;

  /* -----------------------------------------------------------------------
     擺 The pendulum
     -------------------------------------------------------------------- */

  /* 拉高咗幾多：h = L(1 − cos θ) */
  function liftHeight(L, thetaDeg) {
    return L * (1 - Math.cos(thetaDeg * DEG));
  }

  /* 撞到底嗰陣嘅速率。mgh = ½mv² → v = sqrt(2gh)。m 消咗，所以同質量無關。 */
  function impactSpeed(L, thetaDeg, g) {
    return Math.sqrt(2 * (g || G) * liftHeight(L, thetaDeg));
  }

  /* 反過嚟：用速率 u 彈出去，可以盪到幾多度？
     u²/2 = g L (1 − cos θ) → cos θ = 1 − u²/(2gL) */
  function swingAngle(L, u, g) {
    var c = 1 - (u * u) / (2 * (g || G) * L);
    if (c <= -1) return 180;
    if (c >= 1) return 0;
    return Math.acos(c) / DEG;
  }

  /* 小角度週期 T = 2π√(L/g)。只喺細角度先準。 */
  function period(L, g) { return 2 * Math.PI * Math.sqrt(L / (g || G)); }

  /* -----------------------------------------------------------------------
     碰撞 The collision
     -------------------------------------------------------------------- */

  /* 兩粒等質量嘅彈性碰撞：速度直接對調。
     由 m u1 + m u2 = m v1 + m v2 同 ½m u1² + ½m u2² = ½m v1² + ½m v2²
     解出 v1 = u2, v2 = u1（另一個解係「冇撞過」，要剔除）。 */
  function swapEqualMass(u1, u2) { return [u2, u1]; }

  /* 成排波逐對碰。每一對都係等質量彈性碰撞，所以每次都係對調速度。
     結果：頭 n 粒停低，尾 n 粒以同一速率 v 飛出——唔使假設，係行出嚟嘅。 */
  function chain(velocities) {
    var v = velocities.slice(), moved = true, guard = 0;
    while (moved && guard++ < 10000) {
      moved = false;
      for (var i = 0; i < v.length - 1; i++) {
        /* 左邊追到右邊先至撞得到 */
        if (v[i] > v[i + 1] + 1e-15) {
          var r = swapEqualMass(v[i], v[i + 1]);
          v[i] = r[0]; v[i + 1] = r[1];
          moved = true;
        }
      }
    }
    return v;
  }

  /* N 粒波，拉起 n 粒、以速率 v 撞入去。回傳每粒最後嘅速度。 */
  function cradle(N, n, v) {
    var arr = [];
    for (var i = 0; i < N; i++) arr.push(i < n ? v : 0);
    return chain(arr);
  }

  /* -----------------------------------------------------------------------
     兩條守恆定律嘅審核 The audit — this is the teaching core
     -------------------------------------------------------------------- */

  /* 假設 k 粒波以速率 u 彈出。同 n 粒以速率 v 入嚟比較。
     回傳兩個比率：1 就係守恆，唔係 1 就係違反。單位用 m=1。 */
  function audit(n, v, k, u) {
    var pIn = n * v, pOut = k * u;                 /* p = Σmv */
    var eIn = 0.5 * n * v * v, eOut = 0.5 * k * u * u;  /* E = Σ½mv² */
    return {
      momentumIn: pIn, momentumOut: pOut, momentumRatio: pOut / pIn,
      energyIn: eIn, energyOut: eOut, energyRatio: eOut / eIn,
      momentumOK: Math.abs(pOut / pIn - 1) < 1e-12,
      energyOK: Math.abs(eOut / eIn - 1) < 1e-12
    };
  }

  /* 幾個「候選答案」，包括課堂上最常見嗰兩個錯答案。
     u 係由動量守恆倒推出嚟嘅（u = n·v/k），即係話：
     每一個候選都已經幫佢夾啱咗動量。跟住淨係睇動能。 */
  function candidates(n, v) {
    var ks = [];
    for (var k = 1; k <= 2 * n; k++) if (k !== 0) ks.push(k);
    return ks.map(function (k) {
      var u = n * v / k;                    /* forced to conserve momentum */
      var a = audit(n, v, k, u);
      a.k = k; a.u = u; a.n = n; a.v = v;
      return a;
    });
  }

  /* 唯一解：k = n, u = v。由兩式相除證出嚟，唔係試出嚟。 */
  function uniqueOutcome(n, v) { return { k: n, u: v }; }

  /* -----------------------------------------------------------------------
     真實世界 The real cradle
     恢復係數 e < 1：每次碰撞速率乘 e，動能乘 e²。所以佢會停。
     -------------------------------------------------------------------- */
  function afterBounces(v, e, bounces) { return v * Math.pow(e, bounces); }

  function energyFraction(e, bounces) { return Math.pow(e, 2 * bounces); }

  /* 盪到低過 minAngle 就當停咗。回傳撞幾多次。 */
  function bouncesUntil(L, thetaDeg, e, minAngleDeg, g) {
    var v = impactSpeed(L, thetaDeg, g), n = 0;
    while (n < 100000) {
      v = v * e; n++;
      if (swingAngle(L, v, g) < minAngleDeg) return n;
    }
    return n;
  }

  var API = {
    G: G,
    liftHeight: liftHeight,
    impactSpeed: impactSpeed,
    swingAngle: swingAngle,
    period: period,
    swapEqualMass: swapEqualMass,
    chain: chain,
    cradle: cradle,
    audit: audit,
    candidates: candidates,
    uniqueOutcome: uniqueOutcome,
    afterBounces: afterBounces,
    energyFraction: energyFraction,
    bouncesUntil: bouncesUntil
  };

  global.JS2_CRADLE = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : this);
