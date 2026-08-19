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
      en: "Mathematics",
      zh: "數學",
      ja: "数学",
      ko: "수학",
      es: "Matemáticas",
      de: "Mathematik",
      fi: "Matematiikka",
      fr: "Mathématiques",
      ar: "الرياضيات",
      it: "Matematica",
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

  window.MathI18n = {
    langs: langs,
    get: function (key, lang) {
      if (!common[key]) return key;
      return common[key][lang] || common[key]["en"];
    },
    // React Component for Selector
    // Props: { lang: string, setLang: function }
    LanguageSelector: function (props) {
      const e = React.createElement;
      return e(
        "div",
        { className: "fixed top-4 right-4 z-50 pointer-events-auto" },
        e(
          "select",
          {
            value: props.lang,
            onChange: function (evt) {
              props.setLang(evt.target.value);
              if (evt.target.value === "ar") document.body.dir = "rtl";
              else document.body.dir = "ltr";
            },
            className:
              "bg-white/90 backdrop-blur border-2 border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-full shadow-lg outline-none focus:border-blue-500 cursor-pointer hover:bg-white transition-colors text-sm md:text-base font-sans",
          },
          langs.map(function (l) {
            return e("option", { key: l.code, value: l.code }, l.name);
          })
        )
      );
    },
  };
})();
