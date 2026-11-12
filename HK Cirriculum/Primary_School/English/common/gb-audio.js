(function (factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.GBAudio = api;
})(function () {
  "use strict";

  var SR = 22050;
  var WORDS = {
    a: ["ax"], an: ["ae", "n"], the: ["dh", "ax"], of: ["oo", "v"], to: ["t", "uw"],
    and: ["ae", "n", "d"], for: ["f", "oh"], is: ["ih", "z"], it: ["ih", "t"], on: ["oo", "n"],
    at: ["ae", "t"], in: ["ih", "n"], my: ["m", "ay"], me: ["m", "iy"], we: ["w", "iy"],
    you: ["y", "uw"], your: ["y", "oo"], with: ["w", "ih", "dh"], i: ["ay"], am: ["ae", "m"],
    are: ["aa"], was: ["w", "oo", "z"], be: ["b", "iy"], not: ["n", "oo", "t"], do: ["d", "uw"],
    this: ["dh", "ih", "s"], that: ["dh", "ae", "t"], our: ["aw", "ax"], us: ["uh", "s"],
    some: ["s", "uh", "m"], because: ["b", "ih", "k", "oo", "z"], please: ["p", "l", "iy", "z"],
    would: ["w", "uh", "d"], like: ["l", "ay", "k"], what: ["w", "oo", "t"], here: ["h", "iy", "ax"],
    good: ["g", "uh", "d"], morning: ["m", "oh", "n", "ih", "ng"], have: ["h", "ae", "v"],
    has: ["h", "ae", "z"], from: ["f", "r", "oo", "m"], or: ["oh"], as: ["ae", "z"],
    sat: ["s", "ae", "t"], pin: ["p", "ih", "n"], tap: ["t", "ae", "p"], nap: ["n", "ae", "p"],
    pan: ["p", "ae", "n"], tin: ["t", "ih", "n"], pat: ["p", "ae", "t"], sit: ["s", "ih", "t"],
    tip: ["t", "ih", "p"], sip: ["s", "ih", "p"], put: ["p", "uh", "t"], blue: ["b", "l", "uw"],
    pen: ["p", "eh", "n"], desk: ["d", "eh", "s", "k"], open: ["ow", "p", "ax", "n"],
    english: ["ih", "ng", "g", "l", "ih", "sh"], book: ["b", "uh", "k"], line: ["l", "ay", "n"],
    up: ["uh", "p"], door: ["d", "oh"], colour: ["k", "uh", "l", "ax"], color: ["k", "uh", "l", "ax"],
    star: ["s", "t", "aa"], yellow: ["y", "eh", "l", "ow"], pass: ["p", "aa", "s"],
    green: ["g", "r", "iy", "n"], ruler: ["r", "uw", "l", "ax"], ben: ["b", "eh", "n"],
    cauliflower: ["k", "oo", "l", "ih", "f", "l", "aw", "ax"], biscuit: ["b", "ih", "s", "k", "ih", "t"],
    biscuits: ["b", "ih", "s", "k", "ih", "t", "s"], packet: ["p", "ae", "k", "ih", "t"],
    twelve: ["t", "w", "eh", "l", "v"], sixteen: ["s", "ih", "k", "s", "t", "iy", "n"],
    dollars: ["d", "oo", "l", "ax", "z"], dollar: ["d", "oo", "l", "ax"], receipt: ["r", "ih", "s", "iy", "t"],
    cashier: ["k", "ae", "sh", "iy", "ax"], favourite: ["f", "ey", "v", "ax", "r", "ih", "t"],
    favorite: ["f", "ey", "v", "ax", "r", "ih", "t"], snack: ["s", "n", "ae", "k"],
    crunchy: ["k", "r", "uh", "n", "ch", "iy"], subject: ["s", "uh", "b", "jh", "ih", "k", "t"],
    reading: ["r", "iy", "d", "ih", "ng"], go: ["g", "ow"], supermarket: ["s", "uw", "p", "ax", "m", "aa", "k", "ih", "t"],
    mum: ["m", "uh", "m"], saturday: ["s", "ae", "t", "ax", "d", "ey"], gave: ["g", "ey", "v"],
    should: ["sh", "uh", "d"], eat: ["iy", "t"], vegetables: ["v", "eh", "jh", "t", "ax", "b", "ax", "l", "z"],
    vegetable: ["v", "eh", "jh", "t", "ax", "b", "ax", "l"], nutrition: ["n", "y", "uw", "t", "r", "ih", "sh", "ax", "n"],
    last: ["l", "aa", "s", "t"], friday: ["f", "r", "ay", "d", "ey"], class: ["k", "l", "aa", "s"],
    visited: ["v", "ih", "z", "ih", "t", "ih", "d"], visit: ["v", "ih", "z", "ih", "t"],
    school: ["s", "k", "uw", "l"], garden: ["g", "aa", "d", "ax", "n"], grew: ["g", "r", "uw"],
    lettuce: ["l", "eh", "t", "ih", "s"], white: ["w", "ay", "t"], head: ["h", "eh", "d"],
    leaves: ["l", "iy", "v", "z"], after: ["aa", "f", "t", "ax"], ms: ["m", "ih", "z"],
    lee: ["l", "iy"], quiz: ["k", "w", "ih", "z"], necessary: ["n", "eh", "s", "ax", "s", "ax", "r", "iy"],
    mixed: ["m", "ih", "k", "s", "t"], talked: ["t", "oh", "k", "t"], about: ["ax", "b", "aw", "t"],
    also: ["oh", "l", "s", "ow"], means: ["m", "iy", "n", "z"], goodness: ["g", "uh", "d", "n", "ih", "s"],
    food: ["f", "uw", "d"], gives: ["g", "ih", "v", "z"], give: ["g", "ih", "v"],
    bodies: ["b", "oo", "d", "iy", "z"], body: ["b", "oo", "d", "iy"], next: ["n", "eh", "k", "s", "t"],
    week: ["w", "iy", "k"], will: ["w", "ih", "l"], write: ["r", "ay", "t"],
    shopping: ["sh", "oo", "p", "ih", "ng"], list: ["l", "ih", "s", "t"], soup: ["s", "uw", "p"],
    yoghurt: ["y", "oo", "g", "ax", "t"], yogurt: ["y", "oo", "g", "ax", "t"], nine: ["n", "ay", "n"],
    costs: ["k", "oo", "s", "t", "s"], chan: ["ch", "ae", "n"], total: ["t", "ow", "t", "ax", "l"],
    thirty: ["th", "er", "t", "iy"], seven: ["s", "eh", "v", "ax", "n"], thirteen: ["th", "er", "t", "iy", "n"],
    change: ["ch", "ey", "n", "jh"], person: ["p", "er", "s", "ax", "n"], who: ["h", "uw"],
    takes: ["t", "ey", "k", "s"], money: ["m", "uh", "n", "iy"], till: ["t", "ih", "l"],
    baked: ["b", "ey", "k", "t"], call: ["k", "oh", "l"], cookie: ["k", "uh", "k", "iy"],
    cookies: ["k", "uh", "k", "iy", "z"], exploring: ["ih", "k", "s", "p", "l", "oh", "r", "ih", "ng"],
    health: ["h", "eh", "l", "th"], apple: ["ae", "p", "ax", "l"], fruit: ["f", "r", "uw", "t"],
    healthy: ["h", "eh", "l", "th", "iy"], red: ["r", "eh", "d"], pay: ["p", "ey"],
    fifty: ["f", "ih", "f", "t", "iy"], note: ["n", "ow", "t"], shop: ["sh", "oo", "p"],
    name: ["n", "ey", "m"], customer: ["k", "uh", "s", "t", "ax", "m", "ax"],
    price: ["p", "r", "ay", "s"], item: ["ay", "t", "ax", "m"], forgot: ["f", "ax", "g", "oo", "t"],
    subtracted: ["s", "ax", "b", "t", "r", "ae", "k", "t", "ih", "d"], market: ["m", "aa", "k", "ih", "t"],
    sunny: ["s", "uh", "n", "iy"], march: ["m", "aa", "ch"], teacher: ["t", "iy", "ch", "ax"],
    pupils: ["p", "y", "uw", "p", "ax", "l", "z"], pupil: ["p", "y", "uw", "p", "ax", "l"],
    short: ["sh", "oh", "t"], today: ["t", "ax", "d", "ey"], read: ["r", "iy", "d"],
    sentence: ["s", "eh", "n", "t", "ax", "n", "s"], capital: ["k", "ae", "p", "ih", "t", "ax", "l"],
    letter: ["l", "eh", "t", "ax"], full: ["f", "uh", "l"], stop: ["s", "t", "oo", "p"],
    british: ["b", "r", "ih", "t", "ih", "sh"], english: ["ih", "ng", "g", "l", "ih", "sh"]
  };

  var FUNCTION = {
    a: 1, an: 1, the: 1, of: 1, to: 1, and: 1, for: 1, is: 1, it: 1, on: 1, at: 1, in: 1,
    my: 1, me: 1, we: 1, you: 1, your: 1, with: 1, was: 1, some: 1, us: 1, our: 1, or: 1, as: 1
  };

  var PH = {
    ae: { k: "v", f: [860, 2050, 2850], d: 0.15 },
    ih: { k: "v", f: [430, 2480, 3070], d: 0.11 },
    eh: { k: "v", f: [610, 2100, 2800], d: 0.12 },
    oo: { k: "v", f: [590, 920, 2500], d: 0.13 },
    uh: { k: "v", f: [640, 1350, 2600], d: 0.11 },
    uu: { k: "v", f: [450, 1050, 2500], d: 0.1 },
    iy: { k: "v", f: [320, 2700, 3200], d: 0.14 },
    uw: { k: "v", f: [370, 900, 2300], d: 0.14 },
    aa: { k: "v", f: [800, 1200, 2700], d: 0.15 },
    er: { k: "v", f: [550, 1600, 2500], d: 0.12 },
    ax: { k: "v", f: [500, 1500, 2500], d: 0.07 },
    oh: { k: "v", f: [520, 850, 2600], d: 0.14 },
    ey: { k: "d", a: "eh", b: "ih", d: 0.18 },
    ay: { k: "d", a: "aa", b: "ih", d: 0.18 },
    ow: { k: "d", a: "ax", b: "uu", d: 0.18 },
    aw: { k: "d", a: "aa", b: "uu", d: 0.18 },
    oy: { k: "d", a: "oh", b: "ih", d: 0.18 },
    s: { k: "f", c: 6800, d: 0.12, a: 0.9 },
    z: { k: "f", c: 5200, d: 0.1, a: 0.55, v: 1 },
    sh: { k: "f", c: 3400, d: 0.13, a: 0.85 },
    zh: { k: "f", c: 2800, d: 0.1, a: 0.5, v: 1 },
    f: { k: "f", c: 2800, d: 0.09, a: 0.35 },
    v: { k: "f", c: 2400, d: 0.08, a: 0.3, v: 1 },
    th: { k: "f", c: 5000, d: 0.09, a: 0.28 },
    dh: { k: "f", c: 3600, d: 0.07, a: 0.22, v: 1 },
    h: { k: "f", c: 1400, d: 0.07, a: 0.28 },
    ch: { k: "a", b: 3800, c: 3200, d: 0.13 },
    jh: { k: "a", b: 2600, c: 2400, d: 0.12, v: 1 },
    p: { k: "s", b: 1500, d: 0.09 },
    b: { k: "s", b: 1100, d: 0.08, v: 1 },
    t: { k: "s", b: 4800, d: 0.08 },
    d: { k: "s", b: 3600, d: 0.08, v: 1 },
    k: { k: "s", b: 2200, d: 0.09 },
    g: { k: "s", b: 1600, d: 0.08, v: 1 },
    m: { k: "n", f: [280, 1000, 2400], d: 0.09 },
    n: { k: "n", f: [280, 1700, 2600], d: 0.09 },
    ng: { k: "n", f: [280, 2300, 2800], d: 0.1 },
    l: { k: "v", f: [400, 1200, 2700], d: 0.08 },
    r: { k: "v", f: [420, 1050, 1600], d: 0.07 },
    w: { k: "v", f: [340, 680, 2300], d: 0.07 },
    y: { k: "v", f: [300, 2300, 3100], d: 0.06 }
  };

  var CHUNKS = [
    ["tion", ["sh", "ax", "n"]], ["sion", ["zh", "ax", "n"]], ["ight", ["ay", "t"]],
    ["ould", ["uh", "d"]], ["eigh", ["ey"]], ["qu", ["k", "w"]], ["ck", ["k"]],
    ["ch", ["ch"]], ["sh", ["sh"]], ["th", ["th"]], ["ph", ["f"]], ["wh", ["w"]],
    ["ng", ["ng"]], ["nk", ["ng", "k"]], ["ee", ["iy"]], ["ea", ["iy"]], ["oo", ["uw"]],
    ["oa", ["ow"]], ["ai", ["ey"]], ["ay", ["ey"]], ["oi", ["oy"]], ["oy", ["oy"]],
    ["ou", ["aw"]], ["ow", ["aw"]], ["au", ["oh"]], ["aw", ["oh"]], ["er", ["ax"]],
    ["ir", ["er"]], ["ur", ["er"]], ["ar", ["aa"]], ["or", ["oh"]], ["ew", ["uw"]]
  ];

  function isBritishVoice(v) {
    if (!v) return false;
    var lang = String(v.lang || "");
    var name = String(v.name || "");
    if (/en-US/i.test(lang) || /United States/i.test(name)) return false;
    return /^en-GB/i.test(lang) || /en_GB/i.test(lang) || /United Kingdom/i.test(name) || /UK English/i.test(name);
  }

  function britishVoice() {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    var list = window.speechSynthesis.getVoices() || [];
    for (var i = 0; i < list.length; i++) {
      if (isBritishVoice(list[i])) return list[i];
    }
    return null;
  }

  function voicedEnd(phones) {
    var last = phones[phones.length - 1];
    return !/^(p|t|k|f|th|s|sh|ch|h)$/.test(last || "");
  }

  function phonesFor(word) {
    var key = String(word || "").toLowerCase().replace(/[^a-z']/g, "");
    if (!key) return [];
    if (WORDS[key]) return WORDS[key].slice();
    if (key.length > 2 && key.endsWith("s") && !key.endsWith("ss") && WORDS[key.slice(0, -1)]) {
      var stem = WORDS[key.slice(0, -1)];
      return stem.concat(voicedEnd(stem) ? ["z"] : ["s"]);
    }
    if (key.length > 4 && key.endsWith("ing") && WORDS[key.slice(0, -3)]) {
      return WORDS[key.slice(0, -3)].concat(["ih", "ng"]);
    }
    if (key.length > 3 && key.endsWith("ed") && WORDS[key.slice(0, -2)]) {
      var base = WORDS[key.slice(0, -2)];
      var tail = base[base.length - 1];
      if (tail === "t" || tail === "d") return base.concat(["ih", "d"]);
      return base.concat(voicedEnd(base) ? ["d"] : ["t"]);
    }
    return g2p(key);
  }

  function g2p(key) {
    var marked = key.replace(/([aeiou])([^aeiou])e$/, function (_a, v, c) {
      return ({ a: "A", e: "E", i: "I", o: "O", u: "U" })[v] + c;
    });
    var out = [];
    var i = 0;
    while (i < marked.length) {
      var rest = marked.slice(i).toLowerCase();
      var hit = null;
      for (var c = 0; c < CHUNKS.length; c++) {
        if (rest.indexOf(CHUNKS[c][0]) === 0) {
          hit = CHUNKS[c];
          break;
        }
      }
      if (hit && marked.slice(i, i + hit[0].length) === marked.slice(i, i + hit[0].length).toLowerCase()) {
        out = out.concat(hit[1]);
        i += hit[0].length;
        continue;
      }
      var ch = marked.charAt(i);
      var low = ch.toLowerCase();
      if (ch === "A") out.push("ey");
      else if (ch === "E") out.push("iy");
      else if (ch === "I") out.push("ay");
      else if (ch === "O") out.push("ow");
      else if (ch === "U") out.push("uw");
      else if (low === "a") out.push("ae");
      else if (low === "e") out.push("eh");
      else if (low === "i") out.push("ih");
      else if (low === "o") out.push("oo");
      else if (low === "u") out.push("uh");
      else if (low === "y") out.push(i === marked.length - 1 ? "iy" : "y");
      else if (low === "c") out.push(/[eiy]/.test(marked.charAt(i + 1).toLowerCase()) ? "s" : "k");
      else if (low === "g") out.push(/[eiy]/.test(marked.charAt(i + 1).toLowerCase()) ? "jh" : "g");
      else if (low === "q") out.push("k", "w");
      else if (low === "x") out.push("k", "s");
      else if (PH[low]) out.push(low);
      i += 1;
    }
    return out.length ? out : ["ax"];
  }

  function clamp(samples) {
    var peak = 0;
    for (var i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]) || 0);
    if (!peak || !isFinite(peak)) return samples;
    var g = 0.82 / peak;
    if (g < 1) {
      for (var j = 0; j < samples.length; j++) samples[j] *= g;
    }
    return samples;
  }

  function vowel(f1, f2, f3, dur, f0) {
    var n = Math.max(8, Math.floor(SR * dur));
    var out = new Float32Array(n);
    var peak = 0;
    for (var i = 0; i < n; i++) {
      var t = i / SR;
      var s = 0;
      for (var h = 1; h <= 14; h++) {
        var freq = f0 * h;
        if (freq > SR * 0.45) break;
        var env = Math.exp(-Math.pow((freq - f1) / 140, 2))
          + 0.7 * Math.exp(-Math.pow((freq - f2) / 180, 2))
          + 0.35 * Math.exp(-Math.pow((freq - f3) / 240, 2));
        s += Math.sin(2 * Math.PI * freq * t) * env / h;
      }
      var edge = Math.min(1, i / (0.012 * SR), (n - i) / (0.018 * SR));
      out[i] = s * edge;
      peak = Math.max(peak, Math.abs(out[i]));
    }
    var gain = peak > 0 ? 0.62 / peak : 0;
    for (var k = 0; k < n; k++) out[k] *= gain;
    return out;
  }

  function bandNoise(n, center, amp) {
    var out = new Float32Array(n);
    var x1 = 0;
    var x2 = 0;
    var y1 = 0;
    var y2 = 0;
    var w0 = 2 * Math.PI * Math.max(200, Math.min(center, SR * 0.45)) / SR;
    var alpha = Math.sin(w0) / 8;
    var a0 = 1 + alpha;
    var b0 = alpha / a0;
    var b2 = -alpha / a0;
    var a1 = (-2 * Math.cos(w0)) / a0;
    var a2 = (1 - alpha) / a0;
    for (var i = 0; i < n; i++) {
      var x = Math.random() * 2 - 1;
      var y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1;
      x1 = x;
      y2 = y1;
      y1 = y;
      var edge = Math.sin(Math.PI * (i + 0.5) / n);
      out[i] = y * edge * amp;
    }
    return out;
  }

  function mix(a, b, gainB) {
    var n = Math.max(a.length, b.length);
    var out = new Float32Array(n);
    for (var i = 0; i < n; i++) out[i] = (a[i] || 0) + (b[i] || 0) * gainB;
    return out;
  }

  function renderPhone(name, f0, isolated) {
    var spec = PH[name] || PH.ax;
    var scale = isolated ? 2.3 : 1;
    if (spec.k === "v" || spec.k === "n") return vowel(spec.f[0], spec.f[1], spec.f[2], spec.d * scale, spec.k === "n" ? f0 : f0);
    if (spec.k === "d") {
      var left = vowel(PH[spec.a].f[0], PH[spec.a].f[1], PH[spec.a].f[2], spec.d * 0.55 * scale, f0);
      var right = vowel(PH[spec.b].f[0], PH[spec.b].f[1], PH[spec.b].f[2], spec.d * 0.45 * scale, f0);
      var both = new Float32Array(left.length + right.length);
      both.set(left, 0);
      both.set(right, left.length);
      return both;
    }
    if (spec.k === "f") {
      var nz = bandNoise(Math.floor(SR * spec.d * scale), spec.c, spec.a || 0.4);
      if (spec.v) return mix(nz, vowel(320, 1400, 2400, spec.d * scale, f0), 0.35);
      return nz;
    }
    if (spec.k === "s") {
      var n = Math.max(8, Math.floor(SR * spec.d * scale));
      var out = new Float32Array(n);
      var burstAt = Math.floor(n * (spec.v ? 0.35 : 0.58));
      var burst = bandNoise(Math.max(6, Math.floor(n * 0.2)), spec.b, 1.1);
      if (spec.v) {
        var bar = vowel(250, 900, 2200, spec.d * 0.45 * scale, f0);
        for (var i = 0; i < bar.length && i < burstAt; i++) out[i] = bar[i] * 0.35;
      }
      for (var j = 0; j < burst.length && burstAt + j < n; j++) out[burstAt + j] += burst[j];
      return out;
    }
    if (spec.k === "a") {
      var stop = renderPhone(spec.v ? "d" : "t", f0, false);
      var fr = bandNoise(Math.floor(SR * 0.08 * scale), spec.c, 0.8);
      var aff = new Float32Array(stop.length + fr.length);
      aff.set(stop, 0);
      aff.set(fr, stop.length);
      return aff;
    }
    return vowel(500, 1500, 2500, 0.08, f0);
  }

  function renderPhones(phones, opts) {
    opts = opts || {};
    var pieces = [];
    var marks = [];
    var cursor = 0;
    var gap = Math.floor(SR * (opts.segmented ? 0.08 : 0.02));
    phones.forEach(function (name, index) {
      var samples = renderPhone(name, 198, !!opts.isolated);
      marks.push({ word: name, start: cursor / SR, end: (cursor + samples.length) / SR });
      pieces.push(samples);
      cursor += samples.length;
      if (index < phones.length - 1) {
        pieces.push(new Float32Array(gap));
        cursor += gap;
      }
    });
    var total = 0;
    pieces.forEach(function (piece) { total += piece.length; });
    var samples = new Float32Array(Math.max(1, total));
    var offset = 0;
    pieces.forEach(function (piece) {
      samples.set(piece, offset);
      offset += piece.length;
    });
    clamp(samples);
    return { samples: samples, sampleRate: SR, marks: marks, duration: samples.length / SR };
  }

  function tokenize(text) {
    var raw = String(text || "").replace(/[“”]/g, '"');
    var re = /[A-Za-z']+|[.,!?;]/g;
    var out = [];
    var m;
    while ((m = re.exec(raw))) {
      if (m[0] === ",") out.push({ gap: 0.12 });
      else if (m[0] === "." || m[0] === "!" || m[0] === "?") out.push({ gap: 0.22 });
      else if (m[0] === ";" || m[0] === ":") out.push({ gap: 0.14 });
      else out.push({ word: m[0] });
    }
    return out;
  }

  function render(text, opts) {
    opts = opts || {};
    var tokens = tokenize(text);
    var pieces = [];
    var marks = [];
    var cursor = 0;
    var phoneGap = Math.floor(SR * (opts.segmented ? 0.05 : 0.012));
    var wordGap = Math.floor(SR * 0.065);
    tokens.forEach(function (tok, ti) {
      if (tok.gap) {
        var g = Math.floor(SR * tok.gap);
        pieces.push(new Float32Array(g));
        cursor += g;
        return;
      }
      var phones = phonesFor(tok.word);
      var stressed = !FUNCTION[tok.word.toLowerCase()];
      var f0 = (stressed ? 208 : 176) * (1 - 0.05 * ti / Math.max(1, tokens.length));
      var mark = { word: tok.word, start: cursor / SR };
      phones.forEach(function (p, pi) {
        var samples = renderPhone(p, f0, !!opts.isolated);
        pieces.push(samples);
        cursor += samples.length;
        if (pi < phones.length - 1) {
          pieces.push(new Float32Array(phoneGap));
          cursor += phoneGap;
        }
      });
      mark.end = cursor / SR;
      marks.push(mark);
      var next = tokens[ti + 1];
      if (next && !next.gap) {
        pieces.push(new Float32Array(wordGap));
        cursor += wordGap;
      }
    });
    var total = 0;
    pieces.forEach(function (p) { total += p.length; });
    var samples = new Float32Array(Math.max(1, total));
    var o = 0;
    pieces.forEach(function (p) {
      samples.set(p, o);
      o += p.length;
    });
    clamp(samples);
    return { samples: samples, sampleRate: SR, marks: marks, duration: samples.length / SR };
  }

  function rms(samples) {
    var e = 0;
    for (var i = 0; i < samples.length; i++) e += samples[i] * samples[i];
    return Math.sqrt(e / Math.max(1, samples.length));
  }

  function edgeEnergy(samples) {
    var e = 0;
    var prev = 0;
    for (var i = 0; i < samples.length; i++) {
      var d = samples[i] - prev;
      prev = samples[i];
      e += d * d;
    }
    return Math.sqrt(e / Math.max(1, samples.length));
  }

  var audioCtx = null;
  var analyser = null;
  var active = null;
  var wordHandler = null;
  var playToken = 0;

  function ensureCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AC();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.connect(audioCtx.destination);
    }
    return audioCtx;
  }

  function emitWords(rendered, getT, token) {
    function tick() {
      if (token !== playToken) return;
      var t = getT();
      var current = null;
      for (var i = 0; i < rendered.marks.length; i++) {
        if (t >= rendered.marks[i].start && t <= rendered.marks[i].end + 0.03) current = rendered.marks[i].word;
      }
      if (wordHandler) wordHandler(current, t < rendered.duration);
      if (t < rendered.duration + 0.05) {
        if (typeof requestAnimationFrame === "function") requestAnimationFrame(tick);
        else setTimeout(tick, 40);
      } else if (wordHandler) wordHandler(null, false);
    }
    tick();
  }

  function playSamples(samples, sampleRate, rendered) {
    var ctx = ensureCtx();
    var buffer = ctx.createBuffer(1, samples.length, sampleRate);
    buffer.getChannelData(0).set(samples);
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    var gain = ctx.createGain();
    gain.gain.value = 0.95;
    src.connect(gain);
    gain.connect(analyser);
    if (active) {
      try { active.stop(); } catch (e) { /* already ended */ }
    }
    active = src;
    var token = playToken;
    return ctx.resume().then(function () {
      var started = ctx.currentTime;
      src.start();
      if (rendered) emitWords(rendered, function () { return ctx.currentTime - started; }, token);
      return new Promise(function (resolve) {
        var done = false;
        function finish() {
          if (done) return;
          done = true;
          resolve({ engine: "synth" });
        }
        src.onended = finish;
        setTimeout(finish, Math.ceil(buffer.duration * 1000) + 800);
      });
    });
  }

  function stop() {
    playToken += 1;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    }
    if (active) {
      try { active.stop(); } catch (e2) { /* ignore */ }
      active = null;
    }
    if (wordHandler) wordHandler(null, false);
  }

  function speakPhones(phones, opts) {
    opts = opts || {};
    var rendered = renderPhones(phones, opts);
    if (typeof window === "undefined") return Promise.resolve(rendered);
    stop();
    return playSamples(rendered.samples, rendered.sampleRate, rendered).then(function () {
      return { engine: "synth", rendered: rendered };
    });
  }

  function speak(text, opts) {
    opts = opts || {};
    if (typeof window === "undefined") return Promise.resolve(render(text, opts));
    stop();
    var token = playToken;
    var rendered = render(text, opts);
    var voice = !opts.synthOnly ? britishVoice() : null;
    if (voice && window.speechSynthesis) {
      return new Promise(function (resolve) {
        var heard = false;
        var finished = false;
        var endCap = setTimeout(function () { finish("en-GB"); }, Math.max(2500, rendered.duration * 1000 + 1600));
        function finish(engine) {
          if (finished || token !== playToken) return;
          finished = true;
          clearTimeout(backup);
          clearTimeout(endCap);
          resolve({ engine: engine, rendered: rendered });
        }
        var backup = setTimeout(function () {
          if (!heard && token === playToken) {
            playSamples(rendered.samples, rendered.sampleRate, rendered).then(function () {
              finish("synth");
            });
          }
        }, 450);
        var utter = new SpeechSynthesisUtterance(String(text));
        utter.lang = "en-GB";
        utter.voice = voice;
        utter.rate = opts.segmented ? 0.78 : 0.9;
        utter.onstart = function () {
          heard = true;
          clearTimeout(backup);
          var t0 = (typeof performance !== "undefined" ? performance.now() : Date.now());
          emitWords(rendered, function () {
            var now = typeof performance !== "undefined" ? performance.now() : Date.now();
            return (now - t0) / 1000;
          }, token);
        };
        utter.onend = function () { clearTimeout(backup); finish("en-GB"); };
        utter.onerror = function () {
          clearTimeout(backup);
          if (!heard) {
            playSamples(rendered.samples, rendered.sampleRate, rendered).then(function () { finish("synth"); });
          } else finish("en-GB");
        };
        try {
          window.speechSynthesis.resume();
          window.speechSynthesis.speak(utter);
        } catch (err) {
          clearTimeout(backup);
          playSamples(rendered.samples, rendered.sampleRate, rendered).then(function () { finish("synth"); });
        }
      });
    }
    return playSamples(rendered.samples, rendered.sampleRate, rendered).then(function () {
      return { engine: "synth", rendered: rendered };
    });
  }

  function selfTestSync() {
    var expect = {
      sat: "s ae t",
      pin: "p ih n",
      biscuit: "b ih s k ih t",
      biscuits: "b ih s k ih t s",
      favourite: "f ey v ax r ih t",
      cauliflower: "k oo l ih f l aw ax",
      cashier: "k ae sh iy ax",
      nutrition: "n y uw t r ih sh ax n",
      yoghurt: "y oo g ax t",
      receipt: "r ih s iy t",
      colour: "k uh l ax",
      because: "b ih k oo z",
      please: "p l iy z"
    };
    Object.keys(expect).forEach(function (word) {
      var got = phonesFor(word).join(" ");
      if (got !== expect[word]) throw new Error(word + " phones " + got);
    });
    if (phonesFor("receipt").indexOf("p") !== -1) throw new Error("receipt should not say p");
    if (phonesFor("colour").indexOf("r") !== -1) throw new Error("colour is non-rhotic");
    if (!isBritishVoice({ lang: "en-GB", name: "Google UK English Female" })) throw new Error("missed en-GB");
    if (isBritishVoice({ lang: "en-US", name: "Microsoft Zira" })) throw new Error("accepted en-US");
    if (isBritishVoice({ lang: "en-US", name: "UK English" })) throw new Error("US lang slipped through");
    var lines = [
      "sat", "pin", "Put the blue pen on the desk.",
      "I would like a cauliflower and a packet of biscuits, please.",
      "My favourite snack is a biscuit. I like it because it is crunchy.",
      "Nutrition means the goodness food gives our bodies."
    ];
    lines.forEach(function (line) {
      var audio = render(line);
      if (!(audio.duration > 0.25)) throw new Error("too short: " + line);
      if (!(rms(audio.samples) > 0.02)) throw new Error("too quiet: " + line);
      for (var i = 0; i < audio.samples.length; i++) {
        if (!isFinite(audio.samples[i])) throw new Error("non-finite audio");
      }
    });
    var sat = render("sat").samples;
    var pin = render("pin").samples;
    var n = Math.min(sat.length, pin.length);
    var diff = 0;
    for (var d = 0; d < n; d++) diff += Math.abs(sat[d] - pin[d]);
    if (diff / n < 0.02) throw new Error("sat and pin are too alike");
    var hiss = edgeEnergy(renderPhone("s", 200, true));
    var vowelE = edgeEnergy(renderPhone("ae", 200, true));
    if (!(hiss > vowelE)) throw new Error("s is not brighter than the a sound");
    return { ok: true, satMs: Math.round(render("sat").duration * 1000), hiss: hiss, vowel: vowelE };
  }

  function selfTest() {
    var sync = selfTestSync();
    if (typeof OfflineAudioContext !== "function") return Promise.resolve(sync);
    var sat = render("sat");
    try {
      var off = new OfflineAudioContext(1, sat.samples.length, SR);
      var buffer = off.createBuffer(1, sat.samples.length, SR);
      buffer.getChannelData(0).set(sat.samples);
      var src = off.createBufferSource();
      src.buffer = buffer;
      src.connect(off.destination);
      src.start(0);
      return off.startRendering().then(function (rendered) {
        var ch = rendered.getChannelData(0);
        if (!(rms(ch) > 0.02)) throw new Error("Web Audio render was silent");
        sync.offlineRms = rms(ch);
        return sync;
      }).catch(function (err) {
        if (String(err && err.message || err).indexOf("silent") !== -1) throw err;
        sync.offlineSkipped = String(err && err.message || err);
        return sync;
      });
    } catch (err) {
      sync.offlineSkipped = String(err && err.message || err);
      return Promise.resolve(sync);
    }
  }

  return {
    speak: speak,
    speakPhones: speakPhones,
    stop: stop,
    render: render,
    phonesFor: phonesFor,
    isBritishVoice: isBritishVoice,
    britishVoice: britishVoice,
    selfTest: selfTest,
    selfTestSync: selfTestSync,
    set onWord(fn) { wordHandler = fn; },
    get onWord() { return wordHandler; },
    get analyser() { return analyser; },
    engineLabel: function () {
      var v = britishVoice();
      return v ? v.name + " · en-GB" : "Built-in British synthesis";
    }
  };
});

if (typeof module !== "undefined" && require.main === module) {
  var result = module.exports.selfTestSync();
  console.log(JSON.stringify(result));
}
