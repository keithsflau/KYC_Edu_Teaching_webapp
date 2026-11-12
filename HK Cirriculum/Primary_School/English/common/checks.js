(function (factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.HKChecks = api;
})(function () {
  "use strict";

  var SOUND = {
    s: { zh: "連續的嘶聲 /s/", en: "a long hiss /s/" },
    a: { zh: "短 a /æ/，嘴巴張開，像 sat 中間的音", en: "the short a /æ/ in sat" },
    t: { zh: "短促的 /t/，舌尖輕點一下", en: "a short /t/" },
    p: { zh: "雙唇爆破 /p/", en: "a lip-burst /p/" },
    i: { zh: "短 i /ɪ/，嘴型較小，像 pin 中間的音", en: "the short i /ɪ/ in pin" },
    n: { zh: "鼻音 /n/", en: "the nasal sound /n/" }
  };

  var AMERICAN = [
    { re: /\bcookies\b/i, us: "cookies", gb: "biscuits", zh: "你寫了 cookies。香港小學用 biscuits，不把這款餅乾叫做 cookie。" },
    { re: /\bcookie\b/i, us: "cookie", gb: "biscuit", zh: "你寫了 cookie。英式英文寫 biscuit。" },
    { re: /\bfavorites\b/i, us: "favorites", gb: "favourites", zh: "favorites 少了 u。英式拼寫是 favourites。" },
    { re: /\bfavorite\b/i, us: "favorite", gb: "favourite", zh: "favorite 少了 u。英式拼寫是 favourite。" },
    { re: /\byogurt\b/i, us: "yogurt", gb: "yoghurt", zh: "你寫了 yogurt。英式拼寫是 yoghurt，中間有 h。" },
    { re: /\bcolors\b/i, us: "colors", gb: "colours", zh: "colors 是美式。英式是 colours。" },
    { re: /\bcolor\b/i, us: "color", gb: "colour", zh: "color 是美式。英式是 colour，ou 不是 o。" },
    { re: /\bgray\b/i, us: "gray", gb: "grey", zh: "gray 是美式。英式是 grey。" },
    { re: /\bcenter\b/i, us: "center", gb: "centre", zh: "center 是美式。英式是 centre。" }
  ];

  function msg(zh, en) {
    return { zh: zh, en: en };
  }

  function americanNotes(text) {
    var notes = [];
    AMERICAN.forEach(function (rule) {
      var found = String(text).match(rule.re);
      if (found) {
        notes.push(msg(
          rule.zh + " 你寫的是「" + found[0] + "」。",
          "You wrote " + found[0] + ". British spelling here is " + rule.gb + ", not " + rule.us + "."
        ));
      }
    });
    return notes;
  }

  function diagnoseSound(expected, chosen) {
    if (!SOUND[expected] || !SOUND[chosen]) {
      return { ok: false, messages: [msg("這個字母不在這一組。", "That letter is not in this set.")] };
    }
    if (chosen === expected) {
      return { ok: true, messages: [msg("這個字母對應該音。", "That letter matches the sound.")] };
    }
    return {
      ok: false,
      messages: [msg(
        "你點了 " + chosen + "（" + SOUND[chosen].zh + "）。這個音是 " + expected + "（" + SOUND[expected].zh + "）。",
        "You tapped " + chosen + " (" + SOUND[chosen].en + "). This sound is " + expected + " (" + SOUND[expected].en + ")."
      )]
    };
  }

  function diagnoseSpelling(target, built) {
    var made = String(built || "");
    var want = String(target || "");
    if (!made) {
      return { ok: false, messages: [msg("你還沒有放字母。先聽一次，再按次序點字母。", "You have not chosen any letters. Listen again, then tap the letters in order.")] };
    }
    if (made === want) {
      return { ok: true, messages: [msg(want + " 的字母次序正確。", "The letters in " + want + " are in the right order.")] };
    }
    var messages = [];
    if (made.length !== want.length) {
      messages.push(msg(
        "你放了 " + made.length + " 個字母（" + made + "）。" + want + " 有 " + want.length + " 個字母。",
        "You used " + made.length + " letter(s) (" + made + "). " + want + " has " + want.length + "."
      ));
    }
    var n = Math.max(made.length, want.length);
    for (var i = 0; i < n; i++) {
      if (made.charAt(i) !== want.charAt(i)) {
        var got = made.charAt(i);
        var need = want.charAt(i);
        messages.push(msg(
          "第 " + (i + 1) + " 個位置是「" + (got || "空") + "」，" + want + " 這個位置要「" + (need || "不要多出字母") + "」。",
          "Position " + (i + 1) + " is '" + (got || "empty") + "'. " + want + " needs '" + (need || "no extra letter") + "' there."
        ));
      }
    }
    return { ok: false, messages: messages };
  }

  function diagnoseChoice(item, choiceId) {
    if (!item) return { ok: false, messages: [msg("這一題還沒準備好。", "This question is not ready.")] };
    var choice = null;
    (item.choices || []).forEach(function (c) {
      if (c.id === choiceId) choice = c;
    });
    if (!choice) {
      return { ok: false, messages: [msg("請先選一個答案。", "Choose an answer first.")] };
    }
    if (choice.ok) {
      return { ok: true, messages: [msg(choice.okZh, choice.okEn)] };
    }
    return { ok: false, messages: [msg(choice.zh, choice.en)] };
  }

  function checkShoppingSentence(text) {
    var trimmed = String(text || "").trim().replace(/\s+/g, " ");
    if (!trimmed) {
      return { ok: false, messages: [msg("你還沒有寫句子。", "You have not written a sentence yet.")] };
    }
    var messages = [];
    if (!/^[A-Z]/.test(trimmed)) {
      messages.push(msg(
        "開頭是「" + trimmed.charAt(0) + "」，這是小寫。句子第一個字母要大寫。",
        "You started with '" + trimmed.charAt(0) + "'. A sentence needs a capital letter."
      ));
    }
    if (!/[.!?]$/.test(trimmed)) {
      messages.push(msg(
        "句末沒有句號。請在最後加上 full stop（.）。",
        "There is no full stop at the end. Add a full stop (.)."
      ));
    }
    messages = messages.concat(americanNotes(trimmed));
    var mentionsItem = /\b(biscuits?|cauliflower)\b/i.test(trimmed);
    var mentionsCookie = /\bcookies?\b/i.test(trimmed);
    if (!mentionsItem && !mentionsCookie) {
      messages.push(msg(
        "這句還沒有寫 biscuit、biscuits 或 cauliflower。",
        "The sentence does not mention biscuit, biscuits, or cauliflower."
      ));
    }
    if (!/\bplease\b/i.test(trimmed)) {
      messages.push(msg(
        "這是在向店員提出請求，句子裡還沒有 please。",
        "This is a request to the shop assistant, and the sentence has no please."
      ));
    }
    return { ok: messages.length === 0, messages: messages };
  }

  function splitSentences(text) {
    var parts = String(text || "").trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
    return parts.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function checkSnackWriting(text) {
    var trimmed = String(text || "").trim().replace(/\s+/g, " ");
    if (!trimmed) {
      return { ok: false, messages: [msg("請寫下你的小食。", "Write about your snack.")] };
    }
    var messages = [];
    var sentences = splitSentences(trimmed);
    if (sentences.length < 2) {
      messages.push(msg(
        "現在是 " + sentences.length + " 句。學習目標是兩句：第一句說 favourite snack，另一句用 because 說明原因。",
        "You have " + sentences.length + " sentence. Write two: one about your favourite snack, and another with because."
      ));
    }
    sentences.forEach(function (sentence, index) {
      if (!/^[A-Z]/.test(sentence)) {
        messages.push(msg(
          "第 " + (index + 1) + " 句開頭是「" + sentence.charAt(0) + "」，沒有大寫。",
          "Sentence " + (index + 1) + " starts with '" + sentence.charAt(0) + "'. Use a capital letter."
        ));
      }
      if (!/[.!?]$/.test(sentence)) {
        messages.push(msg(
          "第 " + (index + 1) + " 句末沒有句號。",
          "Sentence " + (index + 1) + " has no full stop."
        ));
      }
    });
    if (!/\bbecause\b/i.test(trimmed)) {
      messages.push(msg(
        "還沒有 because。原因要寫出來，例如 because it is crunchy。",
        "There is no because. Give the reason, for example: because it is crunchy."
      ));
    }
    messages = messages.concat(americanNotes(trimmed));
    if (!/\b(biscuit|biscuits|apple|apples|banana|bananas|yoghurt|yogurt|rice|noodles|bread|sandwich|fruit|grapes|orange|milk|cheese|soup|cookie|cookies|cake|water)\b/i.test(trimmed)) {
      messages.push(msg(
        "句子裡還沒有說出小食的名字，例如 biscuit 或 yoghurt。",
        "Name the snack, for example biscuit or yoghurt."
      ));
    }
    return { ok: messages.length === 0, messages: messages };
  }

  function assertSpecific(result, label) {
    if (!result || !result.messages || !result.messages.length) throw new Error(label + " has no feedback");
    result.messages.forEach(function (m) {
      if (!m.zh || m.zh.length < 8 || !m.en || m.en.length < 8) throw new Error(label + " feedback is too vague");
      if (/^try again[.!]?$/i.test(m.en.trim())) throw new Error(label + " is only Try again");
    });
  }

  function selfTestSync() {
    var sound = diagnoseSound("s", "t");
    if (sound.ok) throw new Error("sound should fail");
    assertSpecific(sound, "sound");
    if (sound.messages[0].zh.indexOf("t") === -1 || sound.messages[0].en.indexOf("s") === -1) {
      throw new Error("sound feedback missed the letters");
    }
    var blend = diagnoseSpelling("pin", "pan");
    if (blend.ok) throw new Error("blend should fail");
    assertSpecific(blend, "blend");
    if (blend.messages[0].en.indexOf("Position 2") === -1) throw new Error("blend position missing");
    if (diagnoseSpelling("pin", "pin").ok !== true) throw new Error("pin should pass");

    var cookie = checkShoppingSentence("I would like a cookie, please.");
    if (cookie.ok) throw new Error("cookie should fail");
    assertSpecific(cookie, "cookie");
    if (cookie.messages[0].en.toLowerCase().indexOf("biscuit") === -1) throw new Error("cookie feedback missed biscuit");

    var lower = checkShoppingSentence("i would like a biscuit, please.");
    if (lower.ok || lower.messages[0].zh.indexOf("i") === -1) throw new Error("capital feedback missing");

    var noStop = checkShoppingSentence("I would like a biscuit please");
    if (noStop.ok) throw new Error("missing stop should fail");
    if (noStop.messages.map(function (m) { return m.en; }).join(" ").indexOf("full stop") === -1) {
      throw new Error("full stop not named");
    }

    var goodShop = checkShoppingSentence("I would like a cauliflower, please.");
    if (!goodShop.ok) throw new Error("good shopping sentence failed: " + goodShop.messages[0].en);

    var fav = checkSnackWriting("My favorite snack is a cookie. I like it because it is sweet.");
    if (fav.ok) throw new Error("american writing should fail");
    var blob = fav.messages.map(function (m) { return m.zh + m.en; }).join(" ");
    if (blob.indexOf("favourite") === -1 || blob.toLowerCase().indexOf("biscuit") === -1) {
      throw new Error("writing feedback missed both spellings");
    }
    var one = checkSnackWriting("My favourite snack is a biscuit because it is crunchy.");
    if (one.ok || one.messages[0].en.indexOf("two") === -1) throw new Error("one sentence should ask for two");
    var goodWrite = checkSnackWriting("My favourite snack is a biscuit. I like it because it is crunchy.");
    if (!goodWrite.ok) throw new Error("good writing failed: " + goodWrite.messages[0].en);

    var choice = diagnoseChoice({
      choices: [{ id: "lettuce", ok: false, zh: "你選了生菜 lettuce。對話說的是白色的 cauliflower。", en: "You chose lettuce. The customer asked for a cauliflower." }]
    }, "lettuce");
    assertSpecific(choice, "choice");
    if (choice.messages[0].en.indexOf("cauliflower") === -1) throw new Error("choice missed cauliflower");
    return { ok: true };
  }

  return {
    SOUND: SOUND,
    diagnoseSound: diagnoseSound,
    diagnoseSpelling: diagnoseSpelling,
    diagnoseChoice: diagnoseChoice,
    checkShoppingSentence: checkShoppingSentence,
    checkSnackWriting: checkSnackWriting,
    americanNotes: americanNotes,
    selfTestSync: selfTestSync
  };
});

if (typeof module !== "undefined" && require.main === module) {
  console.log(JSON.stringify(module.exports.selfTestSync()));
}
