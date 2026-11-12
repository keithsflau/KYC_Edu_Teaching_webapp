(function (root) {
  var QUESTIONS = [
    {
      id: "object-terminal",
      text: "電鍍時，要鍍的物件應接在哪一極？",
      choices: [
        { id: "cathode", text: "陰極", ok: true, message: "正確。物件接陰極，鍍層金屬離子在物件表面得電子還原。" },
        { id: "anode", text: "陽極", ok: false, message: "錯因：物件若接陽極，表面不是得電子的一極，鍍層不會沉積在物件上。" }
      ]
    },
    {
      id: "object-process",
      text: "鍍層金屬離子在物件表面發生甚麼變化？",
      choices: [
        { id: "red", text: "還原", ok: true, message: "正確。例如 Cu²⁺ + 2e⁻ → Cu。還原發生在接陰極的物件上。" },
        { id: "ox", text: "氧化", ok: false, message: "錯因：物件要得到金屬，離子必須得電子。氧化是失電子，發生在陽極。" }
      ]
    },
    {
      id: "anode-metal",
      text: "為了補充離子，陽極最適合用甚麼？",
      choices: [
        { id: "metal", text: "鍍層金屬", ok: true, message: "正確。鍍層金屬在陽極氧化成離子，補充電解質，例如 Cu → Cu²⁺ + 2e⁻。" },
        { id: "inert", text: "惰性電極，而且離子永遠不用補充", ok: false, message: "錯因：惰性電極不會溶解出鍍層金屬離子。離子用掉後得不到補充。" }
      ]
    },
    {
      id: "ion-to",
      text: "電解質中的鍍層金屬陽離子移向哪裡？",
      choices: [
        { id: "object", text: "接在陰極的物件", ok: true, message: "正確。陽離子受陰極吸引。物件必須接陰極，離子才會在物件上還原。" },
        { id: "anode", text: "接在陽極的物件", ok: false, message: "錯因：陽離子不會為了被鍍而改向陽極。物件接錯成陽極，離子會離開物件。" }
      ]
    },
    {
      id: "bath",
      text: "電解質要含有甚麼，物件上才沉積該金屬？",
      choices: [
        { id: "ions", text: "鍍層金屬的離子", ok: true, message: "正確。沒有該金屬的離子，陰極就沒有對應的離子可以還原成鍍層。" },
        { id: "any", text: "任何離子都可以，接對陰極就一定鍍上銅", ok: false, message: "錯因：接對陰極只保證物件是還原的一極。電解質還要有銅離子，才會析出銅。" }
      ]
    }
  ];

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

  function platingVerdict(state) {
    if (state.object !== "cathode" && state.object !== "anode") {
      return { ok: false, depositOn: "none", message: "先把物件接到陰極或陽極。電鍍時物件應接陰極。" };
    }
    if (state.object !== "cathode") {
      return {
        ok: false,
        depositOn: state.bath === "ions" ? "bar" : "none",
        message: "錯因：物件接了陽極。電鍍時物件必須接陰極，銅離子才會在物件表面得電子還原成銅。"
      };
    }
    if (state.bath !== "ions") {
      return {
        ok: false,
        depositOn: "none",
        message: "錯因：物件已經接在陰極，但電解質沒有銅離子，沒有離子可以在物件上還原成銅。"
      };
    }
    if (state.anode !== "metal") {
      return {
        ok: false,
        depositOn: "object",
        message: "錯因：物件接對了陰極，銅離子也能在物件上還原，但陽極不是銅，用掉的銅離子得不到補充。"
      };
    }
    return {
      ok: true,
      depositOn: "object",
      message: "正確。物件接陰極，Cu²⁺ 在物件表面還原成銅。陽極的銅溶解成 Cu²⁺，補充離子。"
    };
  }

  function halfText(state) {
    var role = state.object === "cathode" ? "物件現接陰極" : (state.object === "anode" ? "物件現接陽極" : "物件尚未接線");
    return role + "。目標半反應：陰極 Cu²⁺ + 2e⁻ → Cu；陽極（銅）Cu → Cu²⁺ + 2e⁻。";
  }

  function allMessages() {
    var out = [halfText({ object: "cathode" })];
    ["cathode", "anode"].forEach(function (object) {
      ["metal", "inert"].forEach(function (anode) {
        ["ions", "none"].forEach(function (bath) {
          out.push(platingVerdict({ object: object, anode: anode, bath: bath }).message);
        });
      });
    });
    QUESTIONS.forEach(function (q) {
      q.choices.forEach(function (c) { out.push(c.message); });
    });
    return out.join("\n");
  }

  function selfCheck() {
    var errors = [];
    function must(id, choiceId, expectOk) {
      var c = findChoice(questionById(id), choiceId);
      if (!c || c.ok !== expectOk) errors.push(id + ":" + choiceId);
      if (c && !expectOk && c.message.indexOf("錯因") !== 0) errors.push("why " + id);
      if (c && expectOk && c.message.indexOf("正確") !== 0) errors.push("ok " + id);
    }
    must("object-terminal", "cathode", true);
    must("object-terminal", "anode", false);
    must("object-process", "red", true);
    must("anode-metal", "metal", true);
    must("ion-to", "object", true);
    must("bath", "any", false);
    var good = platingVerdict({ object: "cathode", anode: "metal", bath: "ions" });
    var bad = platingVerdict({ object: "anode", anode: "metal", bath: "ions" });
    var empty = platingVerdict({ object: "cathode", anode: "metal", bath: "none" });
    var inert = platingVerdict({ object: "cathode", anode: "inert", bath: "ions" });
    if (!good.ok || good.depositOn !== "object") errors.push("good");
    if (bad.ok || bad.message.indexOf("陰極") < 0 || bad.message.indexOf("錯因") !== 0) errors.push("bad object");
    if (empty.ok || empty.depositOn !== "none") errors.push("empty");
    if (inert.ok || inert.depositOn !== "object") errors.push("inert");
    if (/食鹽|毫升|茶匙|安培|伏特|氰|加熱|mol\/|\d+\s*(g|cm|mL|ml|克)/.test(allMessages())) errors.push("forbidden");
    if (errors.length) throw new Error(errors.join(", "));
    return "ok";
  }

  var api = {
    questions: QUESTIONS,
    questionById: questionById,
    findChoice: findChoice,
    platingVerdict: platingVerdict,
    halfText: halfText,
    selfCheck: selfCheck
  };
  root.ElectroplatingLesson = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document === "undefined") return;

  var canvas = document.getElementById("cell");
  var ctx = canvas.getContext("2d");
  var state = { object: "", anode: "metal", bath: "ions" };
  var ions = [];
  var qi = 0;
  var locked = false;
  var tried = 0;
  var score = 0;
  var shown = null;
  var last = 0;

  function makeIons() {
    ions = [];
    var i;
    for (i = 0; i < 8; i++) {
      ions.push({
        x: 240 + Math.random() * 240,
        y: 150 + Math.random() * 100,
        label: state.bath === "ions" ? "Cu²⁺" : "其他"
      });
    }
  }

  function setPressed(id, on) {
    document.getElementById(id).className = on ? "on" : "alt";
  }

  function paintControls() {
    setPressed("obj-cathode", state.object === "cathode");
    setPressed("obj-anode", state.object === "anode");
    setPressed("anode-metal", state.anode === "metal");
    setPressed("anode-inert", state.anode === "inert");
    setPressed("bath-ions", state.bath === "ions");
    setPressed("bath-none", state.bath === "none");
    document.getElementById("half").textContent = halfText(state);
  }

  function choose(patch) {
    if (patch.object) state.object = patch.object;
    if (patch.anode) state.anode = patch.anode;
    if (patch.bath) state.bath = patch.bath;
    shown = null;
    makeIons();
    paintControls();
  }

  function step(dt) {
    var target = state.object === "anode" ? 180 : (state.object === "cathode" ? 540 : 360);
    var i, ion, dir;
    for (i = 0; i < ions.length; i++) {
      ion = ions[i];
      if (state.object) {
        dir = target - ion.x;
        if (Math.abs(dir) < 34) ion.x = 250 + (i * 41) % 220;
        else ion.x += (dir > 0 ? 90 : -90) * dt;
      } else {
        ion.x += Math.sin(i + last / 700) * 8 * dt;
      }
      ion.y += Math.sin(last / 300 + i) * 10 * dt;
      if (ion.y < 140) ion.y = 140;
      if (ion.y > 260) ion.y = 260;
    }
  }

  function drawSpoon(x, y, coat) {
    ctx.lineCap = "round";
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x, y - 70);
    ctx.quadraticCurveTo(x + 16, y - 16, x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x, y + 36, 36, 48, 0, 0, Math.PI * 2);
    ctx.stroke();
    if (coat) {
      ctx.strokeStyle = "#fb923c";
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.ellipse(x, y + 36, 36, 48, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function draw() {
    var w = canvas.width;
    var h = canvas.height;
    var deposit = shown ? shown.depositOn : "none";
    var objectRole = state.object === "cathode" ? "陰極" : (state.object === "anode" ? "陽極" : "未接");
    var barRole = state.object === "cathode" ? "陽極" : (state.object === "anode" ? "陰極" : "未接");
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#164e63";
    ctx.fillRect(120, 120, w - 240, 160);
    ctx.strokeStyle = state.object ? "#fbbf24" : "#475569";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(190, 70);
    ctx.lineTo(190, 40);
    ctx.lineTo(300, 40);
    ctx.moveTo(540, 70);
    ctx.lineTo(540, 40);
    ctx.lineTo(430, 40);
    ctx.stroke();
    if (state.object) {
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText(state.object === "anode" ? "−" : "+", 286, 28);
      ctx.fillText(state.object === "anode" ? "+" : "−", 430, 28);
    }
    ctx.fillStyle = state.anode === "metal" ? "#c2410c" : "#94a3b8";
    ctx.fillRect(172, 110, 36, 130);
    if (deposit === "bar") {
      ctx.fillStyle = "#fdba74";
      ctx.fillRect(166, 110, 48, 130);
    }
    drawSpoon(540, 150, deposit === "object");
    var i;
    for (i = 0; i < ions.length; i++) {
      ctx.fillStyle = state.bath === "ions" ? "#67e8f9" : "#94a3b8";
      ctx.beginPath();
      ctx.arc(ions[i].x, ions[i].y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(ions[i].label, ions[i].x, ions[i].y + 4);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = "#ecfeff";
    ctx.font = "bold 15px sans-serif";
    var barName = state.anode === "metal" ? "銅棒" : "惰性電極";
    ctx.fillText(barName + "（" + barRole + "）", 130, 308);
    ctx.fillText("物件（" + objectRole + "）", 470, 308);
  }

  function renderQ() {
    var q = QUESTIONS[qi];
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

  document.getElementById("obj-cathode").onclick = function () { choose({ object: "cathode" }); };
  document.getElementById("obj-anode").onclick = function () { choose({ object: "anode" }); };
  document.getElementById("anode-metal").onclick = function () { choose({ anode: "metal" }); };
  document.getElementById("anode-inert").onclick = function () { choose({ anode: "inert" }); };
  document.getElementById("bath-ions").onclick = function () { choose({ bath: "ions" }); };
  document.getElementById("bath-none").onclick = function () { choose({ bath: "none" }); };
  document.getElementById("judge").onclick = function () {
    shown = platingVerdict(state);
    ChemLesson.say(shown.message, state.object && shown.ok ? "ok" : (state.object ? "no" : undefined));
  };
  document.getElementById("next-q").onclick = function () {
    locked = false;
    qi = (qi + 1) % QUESTIONS.length;
    renderQ();
    ChemLesson.say("下一題：" + QUESTIONS[qi].text);
  };

  makeIons();
  paintControls();
  renderQ();
  function frame(now) {
    var dt = Math.min(0.032, last ? (now - last) / 1000 : 0.016);
    last = now;
    step(dt);
    draw();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})(typeof window !== "undefined" ? window : global);
