/**
 * Original-language annotations for key verses.
 * Keys: book slug → chapter:verse → note object
 */
export const verseNotes = {
  約書亞記: {
    '1:8': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'חֲזַק וֶאֱמָץ',
      transliteration: 'chazaq ve-emats',
      words: [
        { term: 'חֲזַק', translit: 'chazaq', gloss: '堅強、剛硬', note: '常指軍事或屬靈上的「站穩、不動搖」；神吩咐約書亞在面對迦南征戰時要剛強。' },
        { term: 'וֶאֱמָץ', translit: 've-emats', gloss: '堅固、勇敢', note: '與 חֲזַק 並用，強調心志與行動一致；亦見申 31:6–7 摩西對全民的吩咐。' },
      ],
    },
    '1:9': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'כִּי יְהוָה אֱלֹהֶיךָ עִמָּךְ',
      transliteration: 'ki YHWH Elohekha imakh',
      words: [
        { term: 'עִמָּךְ', translit: 'imakh', gloss: '與你同在', note: '「同在」（עִם）是約書亞記核心應許；剛強的根據不是軍力，而是耶和華同行。' },
      ],
    },
    '24:15': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'וַאֲנִי וּבֵיתִי נַעֲבֹד אֶת־יְהוָה',
      transliteration: 'va-ani u-veiti na\'avod et-YHWH',
      words: [
        { term: 'נַעֲבֹד', translit: 'na\'avod', gloss: '我們必事奉', note: 'עָבַד 可指「服事、敬拜」；約書亞以家庭為單位作出公開的盟約宣告。' },
      ],
    },
  },
  創世記: {
    '1:1': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים',
      transliteration: 'bereshit bara Elohim',
      words: [
        { term: 'בָּרָא', translit: 'bara', gloss: '創造（從無到有）', note: '僅以神為主詞；強調神起初創造天地，非從既有物質重組。' },
        { term: 'בְּרֵאשִׁית', translit: 'bereshit', gloss: '起初', note: '開宗明義，標示救贖史的時間起點。' },
      ],
    },
    '3:15': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'זֶרַע הָאִשָּׁה',
      transliteration: 'zera ha-ishah',
      words: [
        { term: 'זֶרַע', translit: 'zera', gloss: '後裔、種子', note: '「女人的後裔」預告從人類中間興起一位打敗蛇的救主；傳統視為彌賽亞首個福音應許。' },
      ],
    },
    '15:6': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'וְהֶאֱמִן בַּיהוָה וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה',
      transliteration: 'va-he\'emin ba-YHWH vayachsheveha lo tsedaqah',
      words: [
        { term: 'הֶאֱמִין', translit: 'he\'emin', gloss: '信靠', note: '「信」在此是信靠神應許；非僅理智同意。' },
        { term: 'צְדָקָה', translit: 'tsedaqah', gloss: '義', note: '神「算為」亞伯蘭的義；保羅在羅 4:3 以此說明因信稱義。' },
      ],
    },
  },
  出埃及記: {
    '3:14': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'אֶהְיֶה אֲשֶׁר אֶהְיֶה',
      transliteration: 'ehyeh asher ehyeh',
      words: [
        { term: 'אֶהְיֶה', translit: 'ehyeh', gloss: '我是／我必成為', note: '與神名 יהוה（YHWH）語根相關；表明神自存、信實，與以色列同在。' },
      ],
    },
    '20:2': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'אָנֹכִי יְהוָה אֱלֹהֶיךָ',
      transliteration: 'anokhi YHWH Elohekha',
      words: [
        { term: 'אָנֹכִי', translit: 'anokhi', gloss: '我（強調性）', note: '十誡以救贖宣告開場：「我…曾領你出埃及」——恩典在先，誡命在後。' },
      ],
    },
  },
  以賽亞書: {
    '7:14': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'הִנֵּה הָעַלְמָה הָרָה וְיֹלֶדֶת בֵּן',
      transliteration: 'hineh ha-almah harah ve-yoledet ben',
      words: [
        { term: 'עַלְמָה', translit: 'almah', gloss: '童女、年輕女子', note: '馬太引用時譯為 παρθένος（童女）；子名「以馬內利」意「神與我們同在」。' },
        { term: 'עִמָּנוּ אֵל', translit: 'Immanu El', gloss: '神與我們同在', note: '名字本身即神學宣告，指向神親臨的救恩。' },
      ],
    },
    '53:5': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'בְּחַבֻּרָתוֹ נִרְפָּא־לָנוּ',
      transliteration: 'be-chaburato nirpa-lanu',
      words: [
        { term: 'חַבּוּרָה', translit: 'chaburah', gloss: '鞭傷、擊打', note: '僕人因受擊打而帶來醫治；新約見彼前 2:24 應用在基督受刑。' },
        { term: 'נִרְפָּא', translit: 'nirpa', gloss: '得醫治', note: '身體與靈魂的醫治，基於代受刑罰。' },
      ],
    },
  },
  詩篇: {
    '23:1': {
      lang: 'hebrew', langLabel: '希伯來文',
      snippet: 'יְהוָה רֹעִי לֹא אֶחְסָר',
      transliteration: 'YHWH ro\'i lo echsar',
      words: [
        { term: 'רֹעִי', translit: 'ro\'i', gloss: '我的牧者', note: 'רָעָה 指牧養、引導；詩人視神為親自看顧羊群的主。' },
        { term: 'לֹא אֶחְסָר', translit: 'lo echsar', gloss: '我必不致缺乏', note: '缺乏（חָסֵר）指所需供應；因牧者在，羊有安息與供應。' },
      ],
    },
  },
  馬太福音: {
    '1:23': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'Ἰδοὺ ἡ παρθένος… καὶ καλέσουσιν τὸ ὄνομα αὐτοῦ Ἐμμανουήλ',
      transliteration: 'Idou he parthenos… Emmanouel',
      words: [
        { term: 'παρθένος', translit: 'parthenos', gloss: '童女', note: '馬太引用賽 7:14，強調耶穌出生方式應驗先知。' },
        { term: 'Ἐμμανουήλ', translit: 'Emmanouel', gloss: '以馬內利', note: '「神與我們同在」；道成肉身的核心宣告。' },
      ],
    },
    '28:19': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'μαθητεύσατε πάντα τὰ ἔθνη… εἰς τὸ ὄνομα',
      transliteration: 'matheteusate panta ta ethne… eis to onoma',
      words: [
        { term: 'μαθητεύω', translit: 'matheteuo', gloss: '使作門徒', note: '不只是傳福音，而是培育跟隨、學習、實踐的人。' },
        { term: 'εἰς τὸ ὄνομα', translit: 'eis to onoma', gloss: '奉…的名', note: '單數「名」可能指父、子、聖靈合一的權柄與身分。' },
      ],
    },
  },
  約翰福音: {
    '1:1': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'Ἐν ἀρχῇ ἦν ὁ λόγος… καὶ θεὸς ἦν ὁ λόγος',
      transliteration: 'En arche en ho logos… kai theos en ho logos',
      words: [
        { term: 'λόγος', translit: 'logos', gloss: '道、言', note: '太初與神同在；約翰用此字指向創造之言與啟示的位格化。' },
        { term: 'θεὸς ἦν ὁ λόγος', translit: 'theos en ho logos', gloss: '道就是神', note: '無冠詞的 θεός 強調本質上是神，又與「太初與神同在」區分位格。' },
      ],
    },
    '3:16': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον',
      transliteration: 'houtos gar egapesen ho theos ton kosmon',
      words: [
        { term: 'οὕτως', translit: 'houtos', gloss: '如此、這樣', note: '強調方式——神以「賜獨生子」這種極致方式表達愛。' },
        { term: 'κόσμον', translit: 'kosmon', gloss: '世界', note: '指墮落的人類世界；神的愛指向整個需要救恩的群體。' },
      ],
    },
  },
  羅馬書: {
    '3:23': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'πάντες γὰρ ἥμαρτον καὶ ὑστεροῦνται τῆς δόξης τοῦ θεοῦ',
      transliteration: 'pantes gar hemarton kai husterountai tes doxes tou theou',
      words: [
        { term: 'ἥμαρτον', translit: 'hemarton', gloss: '犯了罪', note: '過去式，指全人類已落在罪中。' },
        { term: 'ὑστεροῦνται', translit: 'husterountai', gloss: '亏缺', note: '原意「達不到標準」；人無法靠己力達到神榮耀的要求。' },
      ],
    },
    '8:28': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'πάντα συνεργεῖ εἰς ἀγαθὸν',
      transliteration: 'panta sunergei eis agathon',
      words: [
        { term: 'συνεργεῖ', translit: 'sunergei', gloss: '互相效力、一同作工', note: '神使萬有在愛祂的人身上達成美意；非指一切事件本身都是善。' },
      ],
    },
  },
  加拉太書: {
    '2:20': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'Χριστῷ συνεσταύρωμαι· ζῶ δὲ οὐκέτι ἐγώ',
      transliteration: 'Christo sunestauromai; zo de ouketi ego',
      words: [
        { term: 'συνεσταύρωμαι', translit: 'sunestauromai', gloss: '與基督同釘十字架', note: '完成式：與基督聯合的生命狀態已確立；舊我已終結。' },
        { term: 'ζῶ δὲ οὐκέτι ἐγώ', translit: 'zo de ouketi ego', gloss: '不再是我活著', note: '生命主權轉移；基督在信者裡面活著。' },
      ],
    },
  },
  啟示錄: {
    '1:8': {
      lang: 'greek', langLabel: '希臘文',
      snippet: 'Ἐγώ εἰμι τὸ Ἄλφα καὶ τὸ Ὦ',
      transliteration: 'Ego eimi to Alpha kai to Omega',
      words: [
        { term: 'τὸ Ἄλφα καὶ τὸ Ὦ', translit: 'to Alpha kai to Omega', gloss: '阿拉法與俄梅戛', note: '希臘字母首尾；宣告神是歷史的起點與終點，全權在握。' },
      ],
    },
  },
};

/** Fallback annotations keyed by ref for books without full slug entry */
export const verseNoteFallback = {
  hebrew: {
    '6:24': { snippet: 'יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ', transliteration: 'yevarechekha YHWH ve-yishmereka', gloss: '願耶和華賜福與你、保護你', note: '祭司祝福三句結構：賜福、光照、賜平安（שָׁלוֹם）。' },
    '19:18': { snippet: 'וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ', transliteration: 've-ahavta le-re\'akha kamokha', gloss: '愛人如己', note: 'רֵעַ 可指鄰舍、同伴；耶穌視為律法的總綱之一（太 22:39）。' },
  },
  greek: {
    '4:13': { snippet: 'πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με', transliteration: 'panta ischuo en to endunamounti me', gloss: '我靠著那加力量的', note: 'ἐνδυναμόω 表「使有能力」；能力源於與基督的聯合，非自我自足。' },
    '2:8': { snippet: 'τῇ χάριτί ἐστε σεσῳσμένοι διὰ πίστεως', transliteration: 'te chariti este sesosmenoi dia pisteos', gloss: '本乎恩，也因著信', note: '救恩是神白白的恩賜；信心是領受的路徑，非功勞。' },
  },
};
