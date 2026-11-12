/** Per-book geography: location keys from bible-locations.js + book-specific refs/notes */
export const bookGeo = {
  // —— 摩西五經 ——
  創世記: {
    period: '約公元前2000–1800年',
    fullMap: 'abraham',
    fullMapLabel: '亞伯拉罕生平',
    intro: '從吾珥、哈蘭到迦南與埃及，創世記 12–50 章的舞台橫跨古代近東與應許之地。',
    places: [
      { key: 'ur', note: '亞伯蘭出身地；吾珥（Tell el-Muqayyar）' },
      { key: 'haran', note: '家族中途停留；哈蘭' },
      { key: 'shechem', ref: '創 12:6', note: '進迦南首站；示劍（Tell Balata）' },
      { key: 'bethel', ref: '創 12:8', note: '築壇求告耶和華' },
      { key: 'hebron', ref: '創 13:18', note: '亞伯蘭與以撒寄居' },
      { key: 'beersheba', ref: '創 21:31', note: '與亞比米勒立約' },
      { key: 'goshen', ref: '創 46:34', note: '約瑟接家族下埃及' },
      { key: 'moriah', ref: '創 22:2', note: '獻以撒之山' },
    ],
  },
  出埃及記: {
    period: '約公元前1446年',
    fullMap: 'exodus-canaan',
    fullMapLabel: '出埃及與進迦南',
    intro: '出埃及記地理從尼羅河三角洲到西奈山，記載救贖、立約與會幕。',
    places: [
      { key: 'rameses', ref: '出 1:11', note: '蘭塞（Qantir）積貨城' },
      { key: 'succoth', ref: '出 12:37', note: '出埃及首站' },
      { key: 'pi_hahiroth', ref: '出 14:2', note: '紅海前安營' },
      { key: 'red_sea', ref: '出 14:21', note: '過紅海' },
      { key: 'sinai', ref: '出 19:1', note: '西奈山立約（Jebel Musa 傳統）' },
      { key: 'rephidim', ref: '出 17:1', note: '擊石出水、與亞瑪力戰' },
    ],
  },
  利未記: {
    period: '出埃及後第二年',
    fullMap: 'exodus-canaan',
    fullMapLabel: '西奈會幕',
    intro: '全卷場景在西奈山會幕前，教導獻祭、聖潔與節期。',
    places: [
      { key: 'sinai', ref: '利 1:1', note: '會幕前頒布五祭條例' },
      { key: 'rephidim', ref: '利 24:10', note: '曠野律法背景' },
      { key: 'kadesh', ref: '民 1:1', note: '後續世代預備（民數記銜接）' },
    ],
  },
  民數記: {
    period: '約公元前1446–1406年',
    fullMap: 'exodus-canaan',
    fullMapLabel: '曠野行程',
    intro: '從西奈經加低斯至摩押平原，記錄普查、叛逆與新一代。',
    places: [
      { key: 'sinai', ref: '民 1:1', note: '西奈曠野第一次普查' },
      { key: 'kadesh', ref: '民 13:26', note: '打發探子、不信而倒斃' },
      { key: 'rephidim', ref: '民 20:1', note: '米利暗死；曠野行程' },
      { key: 'moab_plains', ref: '民 22:1', note: '摩押平原安營' },
      { key: 'jericho', ref: '民 33:50', note: '過約旦前的眺望' },
    ],
  },
  申命記: {
    period: '約公元前1406年',
    fullMap: 'exodus-canaan',
    fullMapLabel: '進迦南前夕',
    intro: '摩西在摩押平原對新一代重申律法，遙望迦南。',
    places: [
      { key: 'moab_plains', ref: '申 1:5', note: '摩押平原講道' },
      { key: 'mount_gerizim', ref: '申 11:29', note: '祝福與咒詛山' },
      { key: 'mount_ebal', ref: '申 11:29', note: '立約儀式之地' },
      { key: 'bethlehem', ref: '申 34:4', note: '遙望迦南全地' },
      { key: 'jericho', ref: '申 34:3', note: '平原直至遠海' },
    ],
  },

  // —— 歷史書 ——
  約書亞記: {
    period: '約公元前1400年',
    fullMap: 'exodus-canaan',
    fullMapLabel: '征服迦南',
    intro: '約書亞帶領以色列過約旦、攻取迦南中部與南北。',
    places: [
      { key: 'jericho', ref: '書 6:1', note: '首城陷落；Tell es-Sultan' },
      { key: 'gilgal', ref: '書 4:19', note: '過約旦後立石、行割禮' },
      { key: 'ai', ref: '書 7:2', note: '艾城戰役' },
      { key: 'shechem', ref: '書 8:30', note: '以巴路、基利心立約' },
      { key: 'gibeon', ref: '書 10:1', note: '基遍人詭計與日頭停住' },
      { key: 'shiloh', ref: '書 18:1', note: '會幕設於示羅' },
    ],
  },
  士師記: {
    period: '約公元前1400–1050年',
    fullMap: 'judges',
    fullMapLabel: '士師時代',
    intro: '士師循環發生在全迦南與以色列各支派地區。',
    places: [
      { key: 'shiloh', ref: '士 21:19', note: '會幕中心' },
      { key: 'tabor', ref: '士 4:6', note: '底波拉召巴拉' },
      { key: 'kishon', ref: '士 4:7', note: '基甸、底波拉戰場' },
      { key: 'ophrah', ref: '士 6:11', note: '基甸蒙召' },
      { key: 'zorah', ref: '士 13:2', note: '參孫出生地' },
      { key: 'gibeah', ref: '士 19:12', note: '便雅憫危機' },
      { key: 'megiddo', ref: '士 5:19', note: '他泊之戰' },
    ],
  },
  路得記: {
    period: '約公元前1100年',
    fullMap: 'judges',
    fullMapLabel: '士師時代背景',
    intro: '饑荒驅使以利米勒一家下摩押，歸回伯利恆。',
    places: [
      { key: 'bethlehem', ref: '得 1:1', note: '伯利恆（糧食充足）' },
      { key: 'moab', ref: '得 1:1', note: '摩押地寄居' },
      { key: 'jerusalem', ref: '得 4:18', note: '大衛家譜連結' },
    ],
  },
  撒母耳記上: {
    period: '約公元前1100–1010年',
    fullMap: 'david',
    fullMapLabel: '大衛興起',
    intro: '從示羅、拉瑪到基比亞王宮，撒母耳、掃羅與大衛登場。',
    places: [
      { key: 'shiloh', ref: '撒上 1:3', note: '哈拿在示羅禱告' },
      { key: 'ramah', ref: '撒上 1:1', note: '撒母耳故鄉' },
      { key: 'gibeah', ref: '撒上 10:26', note: '掃羅京城' },
      { key: 'bethlehem', ref: '撒上 16:1', note: '大衛受膏' },
      { key: 'elah', ref: '撒上 17:2', note: '大衛與歌利亞' },
      { key: 'keilah', ref: '撒上 23:1', note: '大衛救基伊拉' },
    ],
  },
  撒母耳記下: {
    period: '約公元前1010–970年',
    fullMap: 'david',
    fullMapLabel: '大衛王朝',
    intro: '大衛從希伯崙到耶路撒冷，統一全以色列。',
    places: [
      { key: 'hebron', ref: '撒下 2:1', note: '猶大王七年半' },
      { key: 'jerusalem', ref: '撒下 5:7', note: '攻取錫安、建都' },
      { key: 'en_gedi', ref: '撒下 1:1', note: '大衛躲掃羅' },
      { key: 'ziklag', ref: '撒下 1:1', note: '非利士境內洗革拉' },
      { key: 'bethlehem', ref: '撒下 23:14', note: '大衛渴想家鄉井水' },
    ],
  },
  列王紀上: {
    period: '約公元前970–850年',
    fullMap: 'solomon',
    fullMapLabel: '所羅門時期',
    intro: '聯合王國鼎盛：建殿、智慧、貿易，後分裂。',
    places: [
      { key: 'gibeon', ref: '王上 3:4', note: '所羅門夢中求智慧' },
      { key: 'temple_mount', ref: '王上 6:1', note: '建殿七年' },
      { key: 'tyre', ref: '王上 5:1', note: '推羅王希蘭' },
      { key: 'ezion_geber', ref: '王上 9:26', note: '紅海港口' },
      { key: 'shechem', ref: '王上 12:1', note: '羅波安、國度分裂' },
      { key: 'dan', ref: '王上 12:29', note: '耶羅波安立金牛' },
    ],
  },
  列王紀下: {
    period: '約公元前850–586年',
    fullMap: 'kingdom-split',
    fullMapLabel: '國度分裂與滅亡',
    intro: '南北國興衰，終至亞述滅北國、巴比倫滅南國。',
    places: [
      { key: 'samaria', ref: '王下 17:6', note: '北國首都；主前722陷落' },
      { key: 'jerusalem', ref: '王下 25:9', note: '南國首都' },
      { key: 'lachish', ref: '王下 18:14', note: '西拿基立圍攻' },
      { key: 'babylon', ref: '王下 25:11', note: '被擄之地' },
      { key: 'carmel', ref: '王上 18:19', note: '以利亞對巴力' },
    ],
  },
  歷代志上: {
    period: '被擄後編纂',
    fullMap: 'david',
    fullMapLabel: '大衛與敬拜',
    intro: '從亞當譜系到大衛、聖殿預備，聚焦敬拜與約。',
    places: [
      { key: 'jerusalem', ref: '代上 11:4', note: '大衛立都' },
      { key: 'hebron', ref: '代上 11:3', note: '受膏作以色列王' },
      { key: 'shiloh', ref: '代上 16:39', note: '會幕與敬拜傳統' },
      { key: 'gibeon', ref: '代上 16:39', note: '會幕仍在基遍' },
    ],
  },
  歷代志下: {
    period: '所羅門至被擄',
    fullMap: 'kingdom-split',
    fullMapLabel: '猶大王國',
    intro: '所羅門建殿至約西亞改革，以南國敬拜為主軸。',
    places: [
      { key: 'temple_mount', ref: '代下 3:1', note: '所羅門建殿' },
      { key: 'jerusalem', ref: '代下 36:19', note: '聖殿被焚' },
      { key: 'lachish', ref: '代下 32:9', note: '希西家、西拿基立' },
      { key: 'babylon', ref: '代下 36:20', note: '被擄七十年' },
    ],
  },
  以斯拉記: {
    period: '約公元前538–450年',
    fullMap: 'judah-fall',
    fullMapLabel: '被擄與歸回',
    intro: '波斯詔令下歸回耶路撒冷，重建祭壇與聖殿。',
    places: [
      { key: 'babylon', ref: '拉 1:1', note: '被擄之地' },
      { key: 'jerusalem', ref: '拉 3:1', note: '重建祭壇' },
      { key: 'temple_mount', ref: '拉 3:10', note: '立殿基' },
    ],
  },
  尼希米記: {
    period: '約公元前445年',
    intro: '尼希米重建耶路撒冷城牆，恢復城防與約民身分。',
    places: [
      { key: 'susa', ref: '尼 1:1', note: '尼希米在書珊作酒政' },
      { key: 'jerusalem', ref: '尼 2:11', note: '夜間察看城牆' },
      { key: 'temple_mount', ref: '尼 8:1', note: '水門前讀律法' },
    ],
  },
  以斯帖記: {
    period: '約公元前483–473年',
    intro: '波斯帝國書珊城，猶太人在散居中蒙保守。',
    places: [
      { key: 'susa', ref: '斯 1:2', note: '亞哈隨魯王宮' },
      { key: 'persepolis', ref: '斯 1:3', note: '波斯帝國中心' },
      { key: 'jerusalem', ref: '斯 9:19', note: '普珥日記念' },
    ],
  },

  // —— 詩歌智慧書 ——
  約伯記: {
    period: '族長／士師時代背景',
    intro: '烏斯地富戶約伯；「東方人」智慧傳統地理。',
    places: [
      { key: 'uz', ref: '伯 1:1', note: '烏斯地（傳統指以東以北）' },
      { key: 'edom', ref: '伯 1:3', note: '與以東地關聯' },
    ],
  },
  詩篇: {
    period: '大衛至被擄後',
    fullMap: 'david',
    fullMapLabel: '大衛與耶路撒冷',
    intro: '詩篇地理以耶路撒冷聖殿、錫安與被擄巴比倫為核心。',
    places: [
      { key: 'zion', ref: '詩 2:6', note: '神立的聖山' },
      { key: 'jerusalem', ref: '詩 122:3', note: '眾門、眾民聚集' },
      { key: 'temple_mount', ref: '詩 24:3', note: '誰能登耶和華的山' },
      { key: 'mount_olives', ref: '詩 125:2', note: '耶路撒冷四圍山嶺' },
      { key: 'babylon_river', ref: '詩 137:1', note: '被擄時掛琴於柳樹' },
      { key: 'hebron', ref: '詩 60:7', note: '猶大帶印綬' },
    ],
  },
  箴言: {
    period: '所羅門時代為主',
    fullMap: 'solomon',
    fullMapLabel: '所羅門智慧',
    intro: '箴言多設於耶路撒冷王宮與城門智慧教導。',
    places: [
      { key: 'jerusalem', ref: '箴 1:20', note: '智慧在城門呼喚' },
      { key: 'gibeon', ref: '王上 3:12', note: '所羅門得智慧' },
      { key: 'temple_mount', ref: '箴 8:34', note: '智慧與敬拜' },
    ],
  },
  傳道書: {
    period: '傳統歸於所羅門',
    fullMap: 'solomon',
    fullMapLabel: '耶路撒冷',
    intro: '「傳道者」在耶路撒冷觀察人生虛空。',
    places: [
      { key: 'jerusalem', ref: '傳 1:1', note: '大衛城中的傳道者' },
      { key: 'temple_mount', ref: '傳 5:1', note: '神的殿當謹慎' },
    ],
  },
  雅歌: {
    period: '所羅門時代',
    intro: '愛歌場景或設於耶路撒冷與黎巴嫩、隐基底。',
    places: [
      { key: 'jerusalem', ref: '歌 3:11', note: '所羅門大婚之日' },
      { key: 'en_gedi', ref: '歌 1:14', note: '隐基底葡萄園' },
      { key: 'lebanon', ref: '歌 4:15', note: '黎巴嫩山泉水（傳統北境）' },
    ],
  },

  // —— 大先知 ——
  以賽亞書: {
    period: '約公元前740–680年',
    fullMap: 'prophets',
    fullMapLabel: '先知時代',
    intro: '以賽亞事奉於南國猶大，預言亞述、巴比倫與彌賽亞。',
    places: [
      { key: 'jerusalem', ref: '賽 1:1', note: '烏西雅、約坦、亞哈斯、希西家年間' },
      { key: 'lachish', ref: '賽 36:2', note: '亞述圍攻（平行王下18）' },
      { key: 'babylon', ref: '賽 39:6', note: '被擄預告' },
      { key: 'carmel', ref: '賽 33:9', note: '迦密榮枯' },
    ],
  },
  耶利米書: {
    period: '約公元前627–586年',
    fullMap: 'judah-fall',
    fullMapLabel: '猶大滅亡',
    intro: '耶利米在耶路撒冷、亞拿突事奉，見證南國最後年代。',
    places: [
      { key: 'anathoth', ref: '耶 1:1', note: '先知故鄉' },
      { key: 'jerusalem', ref: '耶 7:1', note: '聖殿門前宣講' },
      { key: 'lachish', ref: '耶 34:7', note: '圍城時僅存城邑' },
      { key: 'babylon', ref: '耶 29:1', note: '被擄者書信' },
      { key: 'egypt', ref: '耶 43:7', note: '逃往埃及（答比匿）' },
    ],
  },
  耶利米哀歌: {
    period: '主前586年後',
    fullMap: 'judah-fall',
    fullMapLabel: '耶路撒冷陷落',
    intro: '五首哀歌為耶路撒冷毀滅而作。',
    places: [
      { key: 'jerusalem', ref: '哀 1:1', note: '孤獨城邑' },
      { key: 'zion', ref: '哀 1:4', note: '錫安路徑悲哀' },
      { key: 'temple_mount', ref: '哀 2:6', note: '聖殿被毀' },
    ],
  },
  以西結書: {
    period: '約公元前593–571年',
    fullMap: 'prophets',
    fullMapLabel: '被擄先知',
    intro: '以西結在巴比倫提勒亞畢向流亡者說預言。',
    places: [
      { key: 'tel_abib', ref: '結 3:15', note: '迦巴魯河旁' },
      { key: 'babylon', ref: '結 1:1', note: '被擄第五年' },
      { key: 'jerusalem', ref: '結 8:3', note: '異象中見聖殿' },
    ],
  },
  但以理書: {
    period: '約公元前605–536年',
    intro: '但以理在巴比倫與波斯朝廷事奉。',
    places: [
      { key: 'babylon', ref: '但 1:1', note: '尼布甲尼撒宮廷' },
      { key: 'susa', ref: '但 8:2', note: '異象在書珊' },
    ],
  },

  // —— 小先知 ——
  何西亞書: {
    period: '約公元前750–725年',
    intro: '北國以色列末期，以婚姻比喻盟約。',
    places: [
      { key: 'samaria', ref: '何 1:2', note: '北國首都' },
      { key: 'bethel', ref: '何 10:15', note: '金牛敬拜中心' },
      { key: 'gilgal', ref: '何 4:15', note: '偶像敬拜地' },
    ],
  },
  約珥書: {
    period: '年代不詳（或主前9–5世紀）',
    intro: '約珥描述蝗災與「耶和華的日子」。',
    places: [
      { key: 'jerusalem', ref: '珥 2:1', note: '錫安吹角' },
      { key: 'zion', ref: '珥 2:32', note: '求告耶和華名' },
      { key: 'valley_jehoshaphat', ref: '珥 3:2', note: '約沙法谷審判列國' },
    ],
  },
  阿摩司書: {
    period: '約公元前760年',
    fullMap: 'prophets',
    fullMapLabel: '先知時代',
    intro: '提哥亞牧人阿摩司往北方宣講公義。',
    places: [
      { key: 'tekoa', ref: '摩 1:1', note: '阿摩司故鄉' },
      { key: 'samaria', ref: '摩 3:9', note: '責備北國' },
      { key: 'bethel', ref: '摩 7:13', note: '祭壇與亞瑪謝衝突' },
      { key: 'jerusalem', ref: '摩 1:5', note: '亦論南國' },
    ],
  },
  俄巴底亞書: {
    period: '約公元前586年',
    intro: '一頁預言論以東在耶路撒冷遭難時的行為。',
    places: [
      { key: 'edom', ref: '俄 1:1', note: '以東地' },
      { key: 'jerusalem', ref: '俄 1:11', note: '耶路撒冷遭攻' },
      { key: 'mount_olives', ref: '俄 1:21', note: '救贖者上到錫安' },
    ],
  },
  約拿書: {
    period: '約公元前8世紀',
    intro: '約拿從以色列往尼尼微，途中经约帕。',
    places: [
      { key: 'joppa', ref: '拿 1:3', note: '約拿逃往他施' },
      { key: 'tarshish', ref: '拿 1:3', note: '遠方海港（傳統西班牙）' },
      { key: 'nineveh', ref: '拿 3:3', note: '尼尼微大城' },
    ],
  },
  彌迦書: {
    period: '約公元前735–700年',
    intro: '彌迦與以賽亞同期，論撒瑪利亞與耶路撒冷。',
    places: [
      { key: 'jerusalem', ref: '彌 1:1', note: '南國猶大' },
      { key: 'samaria', ref: '彌 1:6', note: '北國亦受審' },
      { key: 'bethlehem', ref: '彌 5:2', note: '彌賽亞降生預言' },
    ],
  },
  那鴻書: {
    period: '約公元前663–612年',
    intro: '預言尼尼微傾覆。',
    places: [
      { key: 'nineveh', ref: '鴻 1:1', note: '亞述首都' },
      { key: 'kishon', ref: '鴻 2:3', note: '比喻尼尼微防線' },
    ],
  },
  哈巴谷書: {
    period: '約公元前609–598年',
    intro: '哈巴谷在猶大見巴比倫興起而困惑。',
    places: [
      { key: 'jerusalem', ref: '哈 1:1', note: '先知在猶大' },
      { key: 'babylon', ref: '哈 1:6', note: '殘忍迅猛之國' },
    ],
  },
  西番雅書: {
    period: '約公元前640–622年',
    intro: '約西亞改革前夕，論耶路撒冷與列國。',
    places: [
      { key: 'jerusalem', ref: '番 1:4', note: '除滅高處敬拜' },
      { key: 'nineveh', ref: '番 2:13', note: '亞述亦受審' },
    ],
  },
  哈該書: {
    period: '約公元前520年',
    intro: '被擄歸回後勸勉建殿。',
    places: [
      { key: 'jerusalem', ref: '該 1:1', note: '大利烏第二年' },
      { key: 'temple_mount', ref: '該 2:3', note: '這殿後來榮耀更大' },
    ],
  },
  撒迦利亞書: {
    period: '約公元前520–480年',
    intro: '與哈該同期，異象與彌賽亞預言。',
    places: [
      { key: 'jerusalem', ref: '亞 1:12', note: '安慰錫安' },
      { key: 'mount_olives', ref: '亞 14:4', note: '耶和華降臨橄欖山' },
      { key: 'bethlehem', ref: '亞 9:9', note: '王騎驢進城' },
    ],
  },
  瑪拉基書: {
    period: '約公元前450年',
    intro: '歸回後聖殿已建，責備祭司與百姓。',
    places: [
      { key: 'jerusalem', ref: '瑪 2:11', note: '耶和華的殿' },
      { key: 'temple_mount', ref: '瑪 3:1', note: '主所尋的殿' },
    ],
  },

  // —— 專題 ——
  十誡: {
    period: '出埃及後第三個月',
    fullMap: 'exodus-canaan',
    fullMapLabel: '西奈立約',
    intro: '十誡在西奈山頒布，百姓在曠野安營。',
    places: [
      { key: 'sinai', ref: '出 20:1', note: '神親自宣告十誡' },
      { key: 'rephidim', ref: '出 19:2', note: '從利非訂到西奈' },
    ],
  },
  垂絲柳樹: {
    period: '主前586年後',
    fullMap: 'judah-fall',
    fullMapLabel: '被擄巴比倫',
    intro: '詩 137 場景在巴比倫河邊，寄居者不能唱錫安之歌。',
    places: [
      { key: 'babylon_river', ref: '詩 137:1', note: '巴比倫河邊坐著' },
      { key: 'babylon', ref: '詩 137:1', note: '被擄之地' },
      { key: 'jerusalem', ref: '詩 137:5', note: '若忘記耶路撒冷' },
    ],
  },
  以弗得: {
    period: '會幕與士師時代',
    fullMap: 'exodus-canaan',
    fullMapLabel: '會幕制度',
    intro: '大祭司以弗得出於西奈條例，士師時代有私設以弗得。',
    places: [
      { key: 'sinai', ref: '出 28:4', note: '大祭司以弗得條例' },
      { key: 'shiloh', ref: '撒上 2:18', note: '示羅會幕' },
      { key: 'ophrah', ref: '士 8:27', note: '基甸造以弗得' },
    ],
  },
  祭禮: {
    period: '西奈會幕',
    fullMap: 'exodus-canaan',
    fullMapLabel: '會幕與五祭',
    intro: '利未記五祭在會幕前獻上。',
    places: [
      { key: 'sinai', ref: '利 1:1', note: '會幕前曉諭' },
      { key: 'shiloh', ref: '書 18:1', note: '後來會幕在示羅' },
      { key: 'temple_mount', ref: '王上 8:62', note: '所羅門獻祭' },
    ],
  },
  基督於舊約的預表: {
    period: '全舊約',
    fullMap: 'abraham',
    fullMapLabel: '救贖史地圖',
    intro: '預表散佈全舊約地理：從摩利亞到耶路撒冷。',
    places: [
      { key: 'moriah', ref: '創 22:2', note: '以撒預表' },
      { key: 'jerusalem', ref: '詩 110:4', note: '麥基洗德等預表' },
      { key: 'red_sea', ref: '出 14:21', note: '過紅海預表' },
      { key: 'bethlehem', ref: '彌 5:2', note: '降生預言' },
    ],
  },
  十二支派: {
    period: '族長至分地',
    fullMap: 'exodus-canaan',
    fullMapLabel: '迦南分地',
    intro: '十二支派從雅各兒子到約書亞分地、營位排列。',
    places: [
      { key: 'hebron', ref: '創 49:31', note: '族長葬於希伯崙' },
      { key: 'shechem', ref: '書 24:1', note: '約書亞立約' },
      { key: 'shiloh', ref: '書 18:1', note: '會眾聚集分地' },
      { key: 'dan', ref: '士 18:29', note: '但支派北遷' },
      { key: 'beersheba', ref: '創 21:31', note: '南境別是巴' },
    ],
  },
  外族特色: {
    period: '全舊約',
    fullMap: 'prophets',
    fullMapLabel: '列國與先知',
    intro: '聖經中的外族：鄰邦、帝國與宣教對象。',
    places: [
      { key: 'moab', ref: '民 22:1', note: '摩押王巴勒' },
      { key: 'edom', ref: '俄 1:1', note: '以掃後裔' },
      { key: 'gaza', ref: '士 16:1', note: '非利士五城' },
      { key: 'gath', ref: '撒上 17:4', note: '歌利亞之城' },
      { key: 'nineveh', ref: '拿 1:2', note: '亞述首都' },
      { key: 'babylon', ref: '耶 25:9', note: '巴比倫帝國' },
      { key: 'tyre', ref: '賽 23:1', note: '腓尼基城邦' },
    ],
  },
  以賽亞53章: {
    period: '約公元前700年預言',
    fullMap: 'prophets',
    fullMapLabel: '先知時代',
    intro: '受苦僕人預言發於猶大，應驗於耶路撒冷十字架。',
    places: [
      { key: 'jerusalem', ref: '賽 52:13', note: '僕人之歌背景' },
      { key: 'zion', ref: '賽 53:8', note: '為本民受罰' },
      { key: 'gethsemane', ref: '太 26:36', note: '新約受難起點' },
    ],
  },
  詩篇體裁分類: {
    period: '大衛至被擄後',
    fullMap: 'david',
    fullMapLabel: '敬拜地理',
    intro: '詩篇體裁與耶路撒冷敬拜、朝聖、被擄經驗密切相關。',
    places: [
      { key: 'jerusalem', ref: '詩 122:1', note: '朝聖詩' },
      { key: 'zion', ref: '詩 48:2', note: '讚美詩' },
      { key: 'babylon_river', ref: '詩 137:1', note: '被擄哀歌' },
      { key: 'mount_olives', ref: '詩 125:2', note: '圍繞錫安' },
    ],
  },

  // —— 四福音與啟示錄 ——
  馬太福音: {
    period: '約主後 27–30 年',
    fullMap: 'jesus',
    fullMapLabel: '耶穌生平',
    intro: '馬太記載加利利事奉、耶路撒冷受難與復活。',
    places: [
      { key: 'bethlehem', ref: '太 2:1', note: '東方博士見嬰孩' },
      { key: 'nazareth', ref: '太 2:23', note: '童年成長' },
      { key: 'capernaum', ref: '太 4:13', note: '加利利事工中心' },
      { key: 'galilee_sea', ref: '太 4:18', note: '呼召門徒' },
      { key: 'jerusalem', ref: '太 21:1', note: '榮入聖城' },
      { key: 'gethsemane', ref: '太 26:36', note: '客西馬尼禱告' },
    ],
  },
  馬可福音: {
    period: '約主後 27–30 年',
    fullMap: 'jesus',
    fullMapLabel: '耶穌生平',
    intro: '馬可以「立即」快節奏記載加利利與耶路撒冷行程。',
    places: [
      { key: 'capernaum', ref: '可 1:21', note: '會堂趕鬼' },
      { key: 'galilee_sea', ref: '可 4:1', note: '海邊講道' },
      { key: 'caesarea', ref: '可 8:27', note: '該撒利亞腓立比' },
      { key: 'jerusalem', ref: '可 11:11', note: '最後一周' },
    ],
  },
  路加福音: {
    period: '約主後 27–30 年',
    fullMap: 'jesus',
    fullMapLabel: '耶穌生平',
    intro: '路加強調從加利利到耶路撒冷的旅程，關心邊緣群體。',
    places: [
      { key: 'nazareth', ref: '路 4:16', note: '會堂宣讀以賽亞' },
      { key: 'capernaum', ref: '路 4:31', note: '醫治鬼附的人' },
      { key: 'jericho', ref: '路 19:1', note: '撒該' },
      { key: 'bethany', ref: '路 19:29', note: '近耶路撒冷' },
      { key: 'emmaus', ref: '路 24:13', note: '復活後顯現' },
    ],
  },
  約翰福音: {
    period: '約主後 27–30 年',
    fullMap: 'jesus',
    fullMapLabel: '耶穌生平',
    intro: '約翰選記七個神蹟與「我是」宣告，地理橫跨猶太與加利利。',
    places: [
      { key: 'cana', ref: '約 2:1', note: '迦拿婚筵變水為酒' },
      { key: 'capernaum', ref: '約 6:59', note: '我是生命的糧' },
      { key: 'jerusalem', ref: '約 2:13', note: '潔淨聖殿' },
      { key: 'bethany', ref: '約 11:1', note: '拉撒路復活' },
      { key: 'galilee_sea', ref: '約 21:1', note: '復活後海邊顯現' },
    ],
  },
  啟示錄: {
    period: '約主後 95 年',
    intro: '約翰在拔摩島得啟示，書信寄給小亞細亞七教會。',
    places: [
      { key: 'patmos', ref: '啟 1:9', note: '因神的道被囚' },
      { key: 'ephesus', ref: '啟 2:1', note: '以弗所教會' },
      { key: 'rome', ref: '啟 17:18', note: '巴比倫大城意象' },
      { key: 'jerusalem', ref: '啟 21:2', note: '新耶路撒冷降臨' },
    ],
  },

  // —— 保羅書信（主要城市）——
  羅馬書: { period: '約主後 57 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅在哥林多寫給羅馬教會。', places: [{ key: 'corinth', ref: '羅 16:23', note: '寫作地' }, { key: 'rome', ref: '羅 1:7', note: '收信教會' }] },
  哥林多前書: { period: '約主後 55 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '哥林多教會的問題與勸勉。', places: [{ key: 'corinth', ref: '林前 1:2', note: '收信教會' }, { key: 'ephesus', ref: '林前 16:8', note: '保羅寫信時所在地' }] },
  哥林多後書: { period: '約主後 56 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅與哥林多教會關係修復。', places: [{ key: 'corinth', ref: '林後 1:1', note: '收信教會' }, { key: 'philippi', ref: '林後 11:9', note: '馬其頓供給' }] },
  加拉太書: { period: '約主後 49 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '加拉太（南加拉太）各教會。', places: [{ key: 'iconium', ref: '加 1:2', note: '加拉太教會' }, { key: 'lystra', ref: '徒 14:6', note: '保羅曾傳道' }, { key: 'antioch_syria', ref: '加 2:11', note: '安提阿事件' }] },
  以弗所書: { period: '約主後 62 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅在羅馬監禁時寫給以弗所。', places: [{ key: 'ephesus', ref: '弗 1:1', note: '收信教會' }, { key: 'rome', ref: '弗 6:20', note: '鎖鏈中使者' }] },
  腓立比書: { period: '約主後 62 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅寫給腓立比教會的感謝與勸勉。', places: [{ key: 'philippi', ref: '腓 1:1', note: '馬其頓首個歐洲教會' }, { key: 'rome', ref: '腓 1:13', note: '御營全知道' }] },
  歌羅西書: { period: '約主後 62 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '歌羅西位於小亞細亞，以弗所教區。', places: [{ key: 'colossae', ref: '西 1:2', note: '歌羅西教會' }, { key: 'ephesus', ref: '徒 19:10', note: '保羅曾長駐' }] },
  帖撒羅尼迦前書: { period: '約主後 51 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '帖撒羅尼迦為馬其頓重要城邑。', places: [{ key: 'thessalonica', ref: '帖前 1:1', note: '收信教會' }, { key: 'athens', ref: '徒 17:15', note: '保羅曾傳道' }] },
  帖撒羅尼迦後書: { period: '約主後 51 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '糾正主再來的誤解。', places: [{ key: 'thessalonica', ref: '帖後 1:1', note: '收信教會' }] },
  提摩太前書: { period: '約主後 64 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅囑咐提摩太在以弗所牧會。', places: [{ key: 'ephesus', ref: '提前 1:3', note: '留提摩太在以弗所' }] },
  提摩太後書: { period: '約主後 67 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅在羅馬監牢最後書信。', places: [{ key: 'rome', ref: '提後 1:17', note: '羅馬監禁' }, { key: 'ephesus', ref: '提後 4:12', note: '提摩太在以弗所' }] },
  提多書: { period: '約主後 64 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '保羅託付提多治理克里特教會。', places: [{ key: 'crete', ref: '多 1:5', note: '克里特各城' }] },
  腓利門書: { period: '約主後 60 年', fullMap: 'paul', fullMapLabel: '保羅宣教', intro: '為逃奴阿尼西謀寫給腓利門。', places: [{ key: 'colossae', ref: '門 1:2', note: '腓利門在歌羅西' }, { key: 'rome', ref: '門 1:1', note: '保羅在監禁中' }] },

  // —— 使徒行傳 ——
  使徒行傳: {
    period: '約主後 30–62 年',
    fullMap: 'paul',
    fullMapLabel: '保羅宣教旅程',
    intro: '從耶路撒冷五旬節至保羅在羅馬傳道，福音擴展至地極。',
    places: [
      { key: 'jerusalem', ref: '徒 2:1', note: '五旬節聖靈降臨' },
      { key: 'damascus', ref: '徒 9:3', note: '保羅在大馬士革路上遇主' },
      { key: 'antioch_syria', ref: '徒 11:26', note: '門徒稱為基督徒' },
      { key: 'ephesus', ref: '徒 19:1', note: '保羅在以弗所三年' },
      { key: 'athens', ref: '徒 17:22', note: '亞略巴古講道' },
      { key: 'rome', ref: '徒 28:30', note: '在羅馬傳道兩年' },
    ],
  },

  // —— 一般書信 ——
  希伯來書: {
    period: '約主後 60–70 年',
    intro: '寫給受逼迫的猶太裔信徒，論基督為大祭司。',
    places: [
      { key: 'jerusalem', ref: '來 13:12', note: '耶穌在城門外受苦' },
      { key: 'rome', ref: '來 13:24', note: '意大利的人問安' },
    ],
  },
  雅各書: {
    period: '約主後 45–50 年',
    intro: '寫給分散的十二支派，耶路撒冷教會領袖雅各。',
    places: [{ key: 'jerusalem', ref: '雅 1:1', note: '耶路撒冷教會' }],
  },
  彼得前書: {
    period: '約主後 62–64 年',
    intro: '小亞細亞五省分散的寄居信徒。',
    places: [
      { key: 'rome', ref: '彼前 5:13', note: '巴比倫問安（或指羅馬）' },
      { key: 'ephesus', ref: '彼前 1:1', note: '亞細亞省之一' },
    ],
  },
  彼得後書: {
    period: '約主後 64–68 年',
    intro: '彼得晚年提醒主再來與假教師。',
    places: [{ key: 'rome', ref: '彼後 1:14', note: '傳統於羅馬殉道前夕' }],
  },
  約翰一書: {
    period: '約主後 85–95 年',
    intro: '小亞細亞教會，對抗否認道成肉身者。',
    places: [{ key: 'ephesus', ref: '約一 傳統', note: '傳統以弗所教會' }],
  },
  約翰二書: { period: '約主後 85–95 年', intro: '家庭教會與旅行傳道者。', places: [] },
  約翰三書: { period: '約主後 85–95 年', intro: '該猶、丢特腓與底米丟。', places: [] },
  猶大書: {
    period: '約主後 65–80 年',
    intro: '為真道爭辯，警戒假教師。',
    places: [{ key: 'jerusalem', ref: '猶 1:1', note: '雅各兄弟，耶路撒冷背景' }],
  },
};
