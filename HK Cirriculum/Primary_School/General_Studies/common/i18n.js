(function () {
  const langs = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "zh", name: "中文 (Chinese)", dir: "ltr" },
    { code: "ja", name: "日本語 (Japanese)", dir: "ltr" },
    { code: "ko", name: "한국어 (Korean)", dir: "ltr" },
    { code: "es", name: "Español (Spanish)", dir: "ltr" },
    { code: "de", name: "Deutsch (German)", dir: "ltr" },
    { code: "fi", name: "Suomi (Finnish)", dir: "ltr" },
    { code: "fr", name: "Français (French)", dir: "ltr" },
    { code: "ar", name: "العربية (Arabic)", dir: "rtl" },
    { code: "it", name: "Italiano (Italian)", dir: "ltr" },
  ];

  const common = {
    start: {
      en: "Start",
      zh: "開始",
      ja: "スタート",
      ko: "시작",
      es: "Empezar",
      de: "Start",
      fi: "Aloita",
      fr: "Démarrer",
      ar: "يبدأ",
      it: "Avvio",
    },
    check: {
      en: "Check",
      zh: "檢查",
      ja: "確認",
      ko: "확인",
      es: "Comprobar",
      de: "Prüfen",
      fi: "Tarkista",
      fr: "Vérifier",
      ar: "تحقق",
      it: "Controlla",
    },
    correct: {
      en: "Correct!",
      zh: "正確！",
      ja: "正解！",
      ko: "정답!",
      es: "¡Correcto!",
      de: "Richtig!",
      fi: "Oikein!",
      fr: "Correct!",
      ar: "صحيح!",
      it: "Corretto!",
    },
    wrong: {
      en: "Try Again",
      zh: "再試一次",
      ja: "もう一度",
      ko: "다시 시도",
      es: "Inténtalo de nuevo",
      de: "Versuch es noch einmal",
      fi: "Yritä uudelleen",
      fr: "Réessayez",
      ar: "حاول مرة أخرى",
      it: "Riprova",
    },
    score: {
      en: "Score",
      zh: "分數",
      ja: "スコア",
      ko: "점수",
      es: "Puntuación",
      de: "Punktzahl",
      fi: "Pisteet",
      fr: "Score",
      ar: "نتيجة",
      it: "Punteggio",
    },
    back: {
      en: "Back to Main Menu",
      zh: "回到主目錄",
      ja: "メインメニューに戻る",
      ko: "메인 메뉴로 돌아가기",
      es: "Volver al menú principal",
      de: "Zurück zum Hauptmenü",
      fi: "Takaisin päävalikkoon",
      fr: "Retour au menu principal",
      ar: "العودة إلى القائمة الرئيسية",
      it: "Torna al menu principale",
    },
    title: {
      en: "General Studies",
      zh: "常識科",
      ja: "一般教養",
      ko: "일반 연구",
      es: "Estudios Generales",
      de: "Sachunterricht",
      fi: "Yleistieto",
      fr: "Études générales",
      ar: "الدراسات العامة",
      it: "Studi generali",
    },
    clear: {
      en: "Clear",
      zh: "清除",
      ja: "クリア",
      ko: "지우기",
      es: "Borrar",
      de: "Löschen",
      fi: "Tyhjennä",
      fr: "Effacer",
      ar: "مسح",
      it: "Cancella",
    },
  };

  const MATH_LANG_CODES = ["en", "zh", "ja", "ko", "es", "de", "fi", "fr", "ar", "it"];

  function ncsToMathLang(ncsCode) {
    if (!ncsCode) return "en";
    const c =
      ncsCode === "zh-Hant" || ncsCode === "zh-HK" || ncsCode === "zh-TW" ? "zh" : ncsCode;
    if (MATH_LANG_CODES.indexOf(c) >= 0) return c;
    return "en";
  }

  function mathToNcsLang(mathCode) {
    if (!mathCode) return "zh-Hant";
    return mathCode === "zh" ? "zh-Hant" : mathCode;
  }

  window.MathI18n = {
    langs: langs,
    _common: common,
    ncsToMathLang: ncsToMathLang,
    mathToNcsLang: mathToNcsLang,
    get: function (key, lang) {
      if (!common[key]) return key;
      const mathLang = ncsToMathLang(lang);
      if (common[key][mathLang]) return common[key][mathLang];
      if (window.NcsI18n && window.NcsI18n.get) {
        const ncs = window.NcsI18n.get(key, window.NcsI18n.getLang());
        if (ncs && ncs !== key) return ncs;
      }
      return common[key].en || key;
    },
    // Hidden bridge — NcsI18n fleet switcher mounts top-right via math-i18n-ncs-bridge.js
    LanguageSelector: function (props) {
      const e = React.createElement;
      const useEffect = React.useEffect;
      useEffect(
        function () {
          if (!window.NcsI18n) return;
          const sync = function (ncsLang) {
            const mathLang = ncsToMathLang(ncsLang);
            if (props.setLang) props.setLang(mathLang);
            if (mathLang === "ar" && document.body) document.body.dir = "rtl";
          };
          sync(window.NcsI18n.getLang());
          return window.NcsI18n.onChange(sync);
        },
        [props.setLang]
      );
      return e("div", {
        className: "math-i18n-lang-hidden math-i18n-toggle",
        "aria-hidden": "true",
        "data-math-i18n-bridge": "true",
      });
    },
  };

  (function loadMathI18nNcsBridge() {
    var script = document.currentScript;
    if (!script || !script.src) return;
    var bridge = document.createElement("script");
    bridge.src = new URL("../../../common/math-i18n-ncs-bridge.js", script.src).href;
    bridge.onload = function () {
      if (window.MathI18nNcsBridge) {
        window.MathI18nNcsBridge.bootKit(script.src);
      }
    };
    document.head.appendChild(bridge);
  })();
})();
