(function (root) {
  var QUESTIONS = [
    {
      id: "anode-sign",
      system: "both",
      text: "電解池的陽極連接電源的哪一極？",
      choices: [
        { id: "pos", text: "正極", ok: true, message: "正確。電解池的陽極接正極，發生氧化；陰極接負極，發生還原。" },
        { id: "neg", text: "負極", ok: false, message: "錯因：不要把化學電池的極性直接套到電解池。電解池的陽極接電源正極。" }
      ]
    },
    {
      id: "cation-to",
      system: "both",
      text: "陽離子主要移向哪一極？",
      choices: [
        { id: "cathode", text: "陰極", ok: true, message: "正確。陽離子帶正電，受負極的陰極吸引，並在陰極得電子還原。" },
        { id: "anode", text: "陽極", ok: false, message: "錯因：陽極是正極，吸引的是陰離子。陽離子應移向陰極。" }
      ]
    },
    {
      id: "anion-to",
      system: "both",
      text: "陰離子主要移向哪一極？",
      choices: [
        { id: "anode", text: "陽極", ok: true, message: "正確。陰離子帶負電，受正極的陽極吸引，並在陽極失電子氧化。" },
        { id: "cathode", text: "陰極", ok: false, message: "錯因：陰極是負極，會排斥陰離子。陰離子應移向陽極。" }
      ]
    },
    {
      id: "reduction-at",
      system: "both",
      text: "還原發生在哪一極？",
      choices: [
        { id: "cathode", text: "陰極", ok: true, message: "正確。陰極供給電子，物種得電子，是還原。陽極是氧化。" },
        { id: "anode", text: "陽極", ok: false, message: "錯因：陽極發生氧化（失電子）。還原在陰極。" }
      ]
    },
    {
      id: "electrons",
      system: "both",
      text: "電解時，電子主要在哪裡移動？",
      choices: [
        { id: "wire", text: "在導線和外電路", ok: true, message: "正確。電子經導線流動。電解質裡定向移動的是離子。" },
        { id: "liquid", text: "在熔體或溶液裡游向電極", ok: false, message: "錯因：熔體或溶液導電靠離子移動，不是靠電子在液體裡游動。" },
        { id: "battery", text: "只留在電源，不會到達電極", ok: false, message: "錯因：電源把電子送到陰極，陽極氧化釋出的電子經導線回到電源。" }
      ]
    },
    {
      id: "molten-cathode",
      system: "molten",
      text: "熔融氯化鉛(II)的陰極產物是？",
      choices: [
        { id: "pb", text: "鉛", ok: true, message: "正確。陰極：Pb²⁺ + 2e⁻ → Pb。熔體沒有水，所以不是氫氣。" },
        { id: "h2", text: "氫氣", ok: false, message: "錯因：熔融氯化鉛(II)沒有水。陰極是鉛離子得電子析出鉛，不是氫氣。" },
        { id: "cl2", text: "氯氣", ok: false, message: "錯因：氯氣在陽極生成。陰極放電的是鉛離子。" }
      ]
    },
    {
      id: "molten-anode",
      system: "molten",
      text: "熔融氯化鉛(II)的陽極產物是？",
      choices: [
        { id: "cl2", text: "氯氣", ok: true, message: "正確。陽極：2Cl⁻ → Cl₂ + 2e⁻。氯離子移向陽極後氧化成氯氣。" },
        { id: "o2", text: "氧氣", ok: false, message: "錯因：熔體裡沒有水。陽極是氯離子放電，氧氣是很稀水溶液的陽極產物。" },
        { id: "pb", text: "鉛", ok: false, message: "錯因：鉛在陰極析出。陽極產物是氯氣。" }
      ]
    },
    {
      id: "molten-water",
      system: "molten",
      text: "熔融氯化鉛(II)電解時，會因為水放電而放出氫氣嗎？",
      choices: [
        { id: "no", text: "不會，體系沒有水", ok: true, message: "正確。熔融鹽沒有水，不能用水的放電來解釋產物。" },
        { id: "yes", text: "會，陰極一定出氫氣", ok: false, message: "錯因：只有有水時，氫離子才可能在陰極放電。熔融氯化鉛(II)的陰極產物是鉛。" }
      ]
    },
    {
      id: "dilute-cathode",
      system: "dilute",
      text: "很稀的氯化鈉溶液，陰極主要產物是？",
      choices: [
        { id: "h2", text: "氫氣", ok: true, message: "正確。很稀時水優先放電。陰極：2H⁺ + 2e⁻ → H₂。這些氫離子來自水。" },
        { id: "na", text: "鈉", ok: false, message: "錯因：鈉離子會移向陰極，但比水難放電。很稀時陰極不是析出鈉。" },
        { id: "cl2", text: "氯氣", ok: false, message: "錯因：氯氣若生成也是在陽極。很稀時陰極主要是氫氣。" }
      ]
    },
    {
      id: "dilute-anode",
      system: "dilute",
      text: "很稀的氯化鈉溶液，陽極主要產物是？",
      choices: [
        { id: "o2", text: "氧氣", ok: true, message: "正確。很稀時氫氧離子優先放電。陽極：4OH⁻ → 2H₂O + O₂ + 4e⁻。這些氫氧離子來自水。" },
        { id: "cl2", text: "氯氣", ok: false, message: "錯因：氯離子仍會移向陽極，但很稀時水優先放電，主要產物是氧氣，不是氯氣。" },
        { id: "h2", text: "氫氣", ok: false, message: "錯因：氫氣在陰極。很稀時陽極主要是氧氣。" }
      ]
    },
    {
      id: "dilute-cl-move",
      system: "dilute",
      text: "很稀時，氯離子會怎樣？",
      choices: [
        { id: "move", text: "仍移向陽極，但不是主要放電離子", ok: true, message: "正確。離子移動看電荷。很稀時移到陽極的氯離子大多不放電，放電的是來自水的氫氧離子。" },
        { id: "stay", text: "完全不移動，因為產物是氧氣", ok: false, message: "錯因：產物是氧氣只說明誰在放電。氯離子仍然受陽極吸引而移動。" },
        { id: "cathode", text: "改為移向陰極", ok: false, message: "錯因：氯離子帶負電，不會改向陰極。它仍移向陽極。" }
      ]
    },
    {
      id: "dilute-na",
      system: "dilute",
      text: "很稀時，鈉離子移到陰極後通常怎樣？",
      choices: [
        { id: "stay", text: "到達陰極附近，但通常不放電", ok: true, message: "正確。鈉離子移向陰極，可是水更容易得電子，所以陰極放出氫氣。" },
        { id: "metal", text: "全部變成鈉金屬", ok: false, message: "錯因：鈉離子比水難放電。移向陰極不等於一定放電。" }
      ]
    }
  ];

  function questionsFor(system) {
    return QUESTIONS.filter(function (q) {
      return q.system === "both" || q.system === system;
    });
  }

  function questionById(id) {
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (QUESTIONS[i].id === id) return QUESTIONS[i];
    }
    return null;
  }

  function findChoice(question, choiceId) {
    if (!question) return null;
    for (var i = 0; i < question.choices.length; i++) {
      if (question.choices[i].id === choiceId) return question.choices[i];
    }
    return null;
  }

  function halfText(system) {
    if (system === "molten") {
      return "陰極（還原）：Pb²⁺ + 2e⁻ → Pb　　陽極（氧化）：2Cl⁻ → Cl₂ + 2e⁻";
    }
    return "陰極（還原）：2H⁺ + 2e⁻ → H₂（H⁺ 來自水）　　陽極（氧化）：4OH⁻ → 2H₂O + O₂ + 4e⁻（OH⁻ 來自水）";
  }

  function describe(system, power) {
    if (!power) return "電源切斷。離子沒有定向移動，電極不會持續放電。";
    if (system === "molten") {
      return "電源接通。Pb²⁺ 移向右方陰極並還原成鉛；Cl⁻ 移向左方陽極並氧化成氯氣。";
    }
    return "電源接通。陽離子移向右方陰極，陰離子移向左方陽極。很稀時水優先放電：陰極是氫氣，陽極是氧氣。鈉離子和氯離子會移動，但不是主要放電的離子。";
  }

  function ionPlan(system) {
    if (system === "molten") {
      return [
        { label: "Pb²⁺", charge: 1, color: "#7dd3fc", discharges: true, n: 7 },
        { label: "Cl⁻", charge: -1, color: "#fcd34d", discharges: true, n: 7 }
      ];
    }
    return [
      { label: "Na⁺", charge: 1, color: "#7dd3fc", discharges: false, n: 6 },
      { label: "Cl⁻", charge: -1, color: "#fcd34d", discharges: false, n: 6 },
      { label: "H⁺", charge: 1, color: "#f8fafc", discharges: true, n: 3 },
      { label: "OH⁻", charge: -1, color: "#f9a8d4", discharges: true, n: 3 }
    ];
  }

  function products(system) {
    if (system === "molten") return { cathode: "鉛", anode: "氯氣" };
    return { cathode: "氫氣", anode: "氧氣" };
  }

  function allMessages() {
    var out = [halfText("molten"), halfText("dilute"), describe("molten", true), describe("dilute", true), describe("molten", false)];
    QUESTIONS.forEach(function (q) {
      out.push(q.text);
      q.choices.forEach(function (c) { out.push(c.text + c.message); });
    });
    return out.join("\n");
  }

  function selfCheck() {
    var errors = [];
    function must(id, choiceId, expectOk) {
      var c = findChoice(questionById(id), choiceId);
      if (!c || c.ok !== expectOk) errors.push(id + ":" + choiceId);
      if (c && expectOk && c.message.indexOf("正確") !== 0) errors.push("ok " + id);
      if (c && !expectOk && c.message.indexOf("錯因") !== 0) errors.push("why " + id);
    }
    must("cation-to", "cathode", true);
    must("cation-to", "anode", false);
    must("anion-to", "anode", true);
    must("reduction-at", "cathode", true);
    must("reduction-at", "anode", false);
    must("anode-sign", "pos", true);
    must("electrons", "wire", true);
    must("electrons", "liquid", false);
    must("molten-cathode", "pb", true);
    must("molten-cathode", "h2", false);
    must("molten-anode", "cl2", true);
    must("molten-anode", "o2", false);
    must("dilute-cathode", "h2", true);
    must("dilute-cathode", "na", false);
    must("dilute-anode", "o2", true);
    must("dilute-anode", "cl2", false);
    must("dilute-cl-move", "move", true);
    must("dilute-na", "stay", true);
    if (questionsFor("molten").length < 7) errors.push("molten count");
    if (questionsFor("dilute").indexOf(questionById("molten-cathode")) >= 0) errors.push("leak");
    if (describe("dilute", true).indexOf("很稀") < 0) errors.push("dilute word");
    if (describe("molten", true).indexOf("鉛") < 0) errors.push("lead word");
    var blob = allMessages();
    if (/食鹽|毫升|茶匙|安培|伏特|氰|加熱|mol\/|\d+\s*(g|cm|mL|ml|克)/.test(blob)) errors.push("forbidden");
    if (errors.length) throw new Error(errors.join(", "));
    return "ok";
  }

  var api = {
    questionsFor: questionsFor,
    questionById: questionById,
    findChoice: findChoice,
    halfText: halfText,
    describe: describe,
    ionPlan: ionPlan,
    products: products,
    selfCheck: selfCheck
  };
  root.ElectrolysisLesson = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document === "undefined") return;

  var canvas = document.getElementById("cell");
  var ctx = canvas.getContext("2d");
  var system = "molten";
  var power = false;
  var ions = [];
  var flashL = "";
  var flashR = "";
  var flashLt = 0;
  var flashRt = 0;
  var qi = 0;
  var locked = false;
  var tried = 0;
  var score = 0;
  var last = 0;

  function makeIons() {
    ions = [];
    var plan = ionPlan(system);
    var k, i, spec;
    for (k = 0; k < plan.length; k++) {
      spec = plan[k];
      for (i = 0; i < spec.n; i++) {
        ions.push({
          label: spec.label,
          charge: spec.charge,
          color: spec.color,
          discharges: spec.discharges,
          x: 220 + Math.random() * 280,
          y: 150 + Math.random() * 120,
          vx: (Math.random() - 0.5) * 0.6,
          phase: Math.random() * 6
        });
      }
    }
  }

  function updateCopy() {
    document.getElementById("half").textContent = halfText(system);
    document.getElementById("readout").textContent = describe(system, power);
    var btn = document.getElementById("power");
    btn.textContent = power ? "切斷電源" : "接通電源";
    btn.className = power ? "on" : "";
  }

  function renderQ() {
    var list = questionsFor(system);
    if (qi >= list.length) qi = 0;
    var q = list[qi];
    document.getElementById("q-text").textContent = q.text;
    var box = document.getElementById("q-opts");
    box.innerHTML = "";
    q.choices.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = c.text;
      b.onclick = function () {
        if (locked) {
          ChemLesson.say("這一題已作答。按下一題。");
          return;
        }
        locked = true;
        tried += 1;
        if (c.ok) score += 1;
        document.getElementById("score").textContent = "分數 " + score + " / " + tried;
        ChemLesson.say(c.message, c.ok ? "ok" : "no");
      };
      box.appendChild(b);
    });
  }

  function step(dt, now) {
    var left = 196;
    var right = canvas.width - 196;
    var top = 146;
    var bottom = 286;
    var mid = (left + right) / 2;
    var made = products(system);
    var i, ion;
    flashLt = Math.max(0, flashLt - dt);
    flashRt = Math.max(0, flashRt - dt);
    for (i = 0; i < ions.length; i++) {
      ion = ions[i];
      if (power && ion.charge !== 0) ion.x += ion.charge * 78 * dt;
      else ion.x += ion.vx * 26 * dt;
      ion.y += Math.sin(now / 280 + ion.phase) * 16 * dt;
      if (ion.y < top) ion.y = top;
      if (ion.y > bottom) ion.y = bottom;
      if (power && ion.charge > 0 && ion.x > right) {
        ion.x = mid;
        flashR = ion.discharges ? "放電 → " + made.cathode : ion.label + " 不放電";
        flashRt = 1.1;
      } else if (ion.x > right) {
        ion.x = right;
        ion.vx = -Math.abs(ion.vx || 0.4);
      }
      if (power && ion.charge < 0 && ion.x < left) {
        ion.x = mid;
        flashL = ion.discharges ? "放電 → " + made.anode : ion.label + " 不放電";
        flashLt = 1.1;
      } else if (ion.x < left) {
        ion.x = left;
        ion.vx = Math.abs(ion.vx || 0.4);
      }
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw() {
    var w = canvas.width;
    var h = canvas.height;
    var made = products(system);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = power ? "#fbbf24" : "#64748b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(168, 78);
    ctx.lineTo(168, 48);
    ctx.lineTo(w * 0.36, 48);
    ctx.moveTo(w - 168, 78);
    ctx.lineTo(w - 168, 48);
    ctx.lineTo(w * 0.64, 48);
    ctx.stroke();
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(w * 0.36, 32, 36, 32);
    ctx.fillStyle = power ? "#fb7185" : "#64748b";
    ctx.fillRect(w * 0.36 + 36, 38, 22, 20);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("+ 陽極", 120, 28);
    ctx.fillText("− 陰極", w - 210, 28);
    ctx.font = "14px sans-serif";
    ctx.fillText(power ? "電源接通" : "電源切斷", w / 2 - 36, 26);
    roundRect(120, 118, w - 240, 188, 18);
    ctx.fillStyle = "#155e75";
    ctx.fill();
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(156, 78, 24, 150);
    ctx.fillRect(w - 180, 78, 24, 150);
    var i;
    for (i = 0; i < ions.length; i++) {
      var ion = ions[i];
      ctx.fillStyle = ion.color;
      ctx.beginPath();
      ctx.arc(ion.x, ion.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f8fafc";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(ion.label, ion.x, ion.y - 10);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = "#ecfeff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("陽極　氧化", 132, 328);
    ctx.fillText("陰極　還原", w - 230, 328);
    if (power) {
      ctx.fillStyle = "#fde68a";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText(made.anode, 132, 108);
      ctx.fillText(made.cathode, w - 210, 108);
    }
    ctx.font = "13px sans-serif";
    if (flashLt > 0) {
      ctx.fillStyle = "#fef3c7";
      ctx.fillText(flashL, 132, 250);
    }
    if (flashRt > 0) {
      ctx.fillStyle = "#fef3c7";
      ctx.fillText(flashR, w - 280, 250);
    }
  }

  document.getElementById("system").onchange = function () {
    system = this.value;
    power = false;
    qi = 0;
    locked = false;
    flashL = "";
    flashR = "";
    makeIons();
    updateCopy();
    renderQ();
    ChemLesson.say(describe(system, false));
  };
  document.getElementById("power").onclick = function () {
    power = !power;
    updateCopy();
    ChemLesson.say(describe(system, power));
  };
  document.getElementById("next-q").onclick = function () {
    locked = false;
    qi = (qi + 1) % questionsFor(system).length;
    renderQ();
    ChemLesson.say("下一題：" + questionsFor(system)[qi].text);
  };

  makeIons();
  updateCopy();
  renderQ();
  function frame(now) {
    var dt = Math.min(0.032, last ? (now - last) / 1000 : 0.016);
    last = now;
    step(dt, now);
    draw();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})(typeof window !== "undefined" ? window : global);
