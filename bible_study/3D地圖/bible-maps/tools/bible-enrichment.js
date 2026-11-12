/**
 * Storyboards aligned to bible-locations.js coordinates and scripture events.
 */
const { coords: c } = require("./bible-locations.js");

module.exports = function ({ cam }) {
  const S = (day, key, dist, o) => {
    const [lng, lat] = c(key);
    return {
      day,
      hold: o.hold || 8,
      cam: cam(lng, lat, dist, o.el || 46),
      dateLabel: o.date,
      title_zh: o.zh,
      title_en: o.en,
      narration_zh: o.nz,
      narration_en: o.ne,
      focus: o.focus || [],
      side: o.side || "both",
      commanders: o.commanders || [],
      assets: o.assets || [],
      forces_zh: o.fz || "",
      forces_en: o.fe || "",
    };
  };

  const A = (military, leaders, theology, impact) => ({ military, leaders, nationalPower: theology, impact });

  return {
    abraham: {
      END_DAY: 100,
      analysis: A(
        "亞伯蘭自吾珥（Tell el-Muqayyar）蒙召，停哈蘭，入迦南經示劍（Tell Balata）、伯特利（Beitin）；因饑荒暫居歌珊；後回希伯崙，在摩利亞（耶路撒冷聖殿山）獻以撒。",
        "亞伯蘭／亞伯拉罕、撒萊、羅得、麥基洗德、以撒。",
        "耶和華立約：「地上萬族因你得福。」應許之地預表基督與信徒產業。",
        "信心之父，因信稱義楷模（羅4；加3）。"
      ),
      storyboard: [
        S(1, "ur", 720, { date: "約前2000年", zh: "吾珥蒙召", en: "Call at Ur", nz: "創12:1 耶和華對亞伯蘭說：你要離開本地、本族、父家。", ne: "Gen 12:1 — Leave your country, your people, your father's household.", focus: ["abram"], commanders: [{ zh: "亞伯蘭", en: "Abram" }] }),
        S(18, "haran", 680, { date: "約前2000年", zh: "哈蘭", en: "Haran", nz: "創12:4-5 亞伯蘭離開哈蘭，帶同撒萊、羅得及所有財物往迦南。", ne: "Gen 12:4-5 — Abram left Haran for Canaan with Sarai and Lot.", focus: ["abram"] }),
        S(38, "shechem", 620, { date: "約前2000年", zh: "示劍應許", en: "Shechem", nz: "創12:6-7 亞伯蘭經過示劍，耶和華顯現說：我要把這地賜給你的後裔。", ne: "Gen 12:6-7 — At Shechem the LORD promised the land to Abram's offspring.", focus: ["abram"] }),
        S(48, "bethel", 600, { date: "約前2000年", zh: "伯特利築壇", en: "Bethel", nz: "創12:8 在伯特利與艾中間築壇，求告耶和華的名。", ne: "Gen 12:8 — He built an altar at Bethel and called on the name of the LORD.", focus: ["abram"] }),
        S(58, "hebron", 580, { date: "約前2000年", zh: "希伯崙", en: "Hebron", nz: "創13:18 亞伯蘭搬帳棚到希伯崙，在幔利橡樹那裡築壇。", ne: "Gen 13:18 — Abram moved his tents to Hebron and built an altar.", focus: ["abram"] }),
        S(72, "goshen", 640, { date: "約前2000年", zh: "下埃及", en: "Sojourn in Egypt", nz: "創12:10 那地遭遇饑荒，亞伯蘭下到埃及寄居。", ne: "Gen 12:10 — Famine drove Abram to sojourn in Egypt.", focus: ["abram"] }),
        S(100, "moriah", 650, { date: "約前2000年", zh: "摩利亞獻以撒", en: "Moriah", nz: "創22:2 耶和華說：你帶著你的兒子以撒，往摩利亞地去，在我所指示你的山上獻他為燔祭。", ne: "Gen 22:2 — Take your son Isaac to the region of Moriah and offer him.", focus: ["abram"], commanders: [{ zh: "亞伯拉罕", en: "Abraham" }] }),
      ],
    },

    "exodus-canaan": {
      END_DAY: 100,
      analysis: A(
        "以色列人自蘭塞（Pi-Ramesses／Qantir）出發，經疏割、比哈洗烈，過紅海（蘇伊士灣傳統路線），至西奈山（Jebel Musa）立約，加低斯巴尼亞漂流，約書亞攻耶利哥（Tell es-Sultan）。",
        "摩西、亞倫、約書亞、迦勒；法老軍追擊紅海。",
        "逾越羔羊預表基督；律法引到基督；進迦南預表屬靈安息。",
        "出埃及為以色列國族認同根基。"
      ),
      storyboard: [
        S(1, "rameses", 680, { date: "約前1446年", zh: "蘭塞為奴", en: "Rameses", nz: "出1:11 在蘭塞地為法老建積貨城；以色列人作苦工。", ne: "Exod 1:11 — Israel labored at Rameses for Pharaoh.", focus: ["israel_ex"], commanders: [{ zh: "摩西", en: "Moses" }] }),
        S(12, "succoth", 640, { date: "約前1446年", zh: "到疏割", en: "Succoth", nz: "出12:37 以色列人從蘭塞起行，到疏割。", ne: "Exod 12:37 — They journeyed from Rameses to Succoth.", focus: ["israel_ex"] }),
        S(30, "red_sea", 620, { date: "約前1446年", zh: "過紅海", en: "Red Sea", nz: "出14:21-22 摩西伸杖過紅海，以色列人走乾地過海，埃及軍被淹沒。", ne: "Exod 14:21-22 — Israel crossed the sea on dry ground.", focus: ["israel_ex"], assets: ["landing"] }),
        S(45, "sinai", 600, { date: "約前1446年", zh: "西奈立約", en: "Sinai", nz: "出19:1-2 以色列人到了西奈山；出20 頒布十誡。", ne: "Exod 19-20 — At Sinai God gave the Law.", focus: ["israel_ex"] }),
        S(55, "rephidim", 580, { date: "曠野", zh: "利非訂", en: "Rephidim", nz: "出17:1-6 在利非訂沒有水，摩西擊石出水；與亞瑪力人爭戰。", ne: "Exod 17 — Water from the rock; battle with Amalek at Rephidim.", focus: ["israel_ex"] }),
        S(70, "kadesh", 560, { date: "曠野四十年", zh: "加低斯", en: "Kadesh-barnea", nz: "民13:26 探子從加低斯巴尼亞回來；因不信，一代人倒在曠野。", ne: "Num 13:26 — The spies returned to Kadesh; unbelief brought forty years in the wilderness.", focus: ["israel_ex"] }),
        S(88, "gilgal", 600, { date: "約前1406年", zh: "吉甲安營", en: "Gilgal", nz: "書4:19 百姓從約旦河上来，在吉甲、耶利哥東邊安營。", ne: "Josh 4:19 — Israel camped at Gilgal east of Jericho.", focus: ["israel_ex"] }),
        S(100, "jericho", 650, { date: "約前1406年", zh: "耶利哥陷落", en: "Jericho", nz: "書6:20 百姓呼喊，城牆塌陷，攻取耶利哥。", ne: "Josh 6:20 — The walls of Jericho fell.", focus: ["israel_ex"], commanders: [{ zh: "約書亞", en: "Joshua" }], assets: ["firefight"] }),
      ],
    },

    judges: {
      END_DAY: 100,
      analysis: A(
        "士師記呈現犯罪—壓制—興起士師循環：底波拉在他泊召巴拉，基順河潰敗西西拉（士4-5）；基甸在俄弗拉率三百人擊米甸（士6-7）；參孫出自瑣拉，對抗非利士（士13-16）。",
        "底波拉、巴拉、基甸、參孫、撒母耳。",
        "「各人任意而行」顯明需要合神心意的君王。",
        "為大衛王朝興起鋪路。"
      ),
      storyboard: [
        S(1, "shiloh", 650, { date: "士師時代", zh: "示羅", en: "Shiloh", nz: "士21:19 以色列人在示羅有耶和華的節期；士師時代宗教中心。", ne: "Judg 21:19 — Shiloh was a central sanctuary in the judges era.", focus: ["judges_is"] }),
        S(30, "tabor", 600, { date: "約前1200年", zh: "他泊山", en: "Mount Tabor", nz: "士4:6 底波拉打發人去基拿他山，從拿弗他利、西布倫支派招巴拉。", ne: "Judg 4:6 — Deborah summoned Barak to Mount Tabor.", focus: ["judges_is"], commanders: [{ zh: "底波拉", en: "Deborah" }] }),
        S(38, "kishon", 580, { date: "約前1200年", zh: "基順河", en: "Kishon", nz: "士4:7 耶和華必使西西拉與全軍敗亡在基順河邊。", ne: "Judg 4:7 — The LORD routed Sisera at the Kishon.", focus: ["judges_is", "judges_en"], assets: ["firefight"] }),
        S(50, "ophrah", 560, { date: "約前1160年", zh: "俄弗拉", en: "Ophrah", nz: "士6:11 耶和華的使者向基甸顯現；士7 三百人擊破米甸營。", ne: "Judg 6-7 — Gideon at Ophrah; three hundred routed Midian.", focus: ["judges_is"], commanders: [{ zh: "基甸", en: "Gideon" }] }),
        S(75, "zorah", 540, { date: "士師末期", zh: "瑣拉", en: "Zorah", nz: "士13:2 參孫生在瑣拉，屬但支派；與非利士人周旋。", ne: "Judg 13:2 — Samson of Zorah judged Israel against the Philistines.", focus: ["judges_en"], commanders: [{ zh: "參孫", en: "Samson" }] }),
        S(100, "shiloh", 680, { date: "約前1050年", zh: "求立王", en: "Demand for a King", nz: "士21:25 那時沒有王，各人任意而行；撒母耳時代人求立王。", ne: "Judg 21:25 — Everyone did as they saw fit; Israel later demanded a king.", focus: ["judges_is"] }),
      ],
    },

    david: {
      END_DAY: 100,
      analysis: A(
        "撒母耳在伯利恆膏大衛（撒上16）；以拉谷擊歌利亞（撒上17）；躲避掃羅時至隱基遍（撒上24）；掃羅死後在希伯崙作猶大王（撒下2），後攻取耶路撒冷建都（撒下5）。",
        "大衛、掃羅、約拿單、撒母耳。",
        "合神心意的人；神與大衛立約，應許彌賽亞出自大衛家。",
        "大衛王朝成為彌賽亞盼望載體。"
      ),
      storyboard: [
        S(1, "bethlehem", 620, { date: "約前1020年", zh: "伯利恆受膏", en: "Bethlehem", nz: "撒上16:1 耶和華打發撒母耳往伯利恆耶西家膏立大衛。", ne: "1 Sam 16:1 — Samuel anointed David at Bethlehem.", focus: ["david_army"], commanders: [{ zh: "大衛", en: "David" }] }),
        S(25, "elah", 580, { date: "約前1010年", zh: "以拉谷", en: "Valley of Elah", nz: "撒上17:2 非利士人聚集在以拉谷；大衛擊殺歌利亞。", ne: "1 Sam 17:2 — David struck down Goliath in the Valley of Elah.", focus: ["david_army", "philistines"], assets: ["firefight"] }),
        S(45, "en_gedi", 560, { date: "約前1010年", zh: "隱基遍", en: "En-gedi", nz: "撒上24:1 掃羅在隱基遍追趕大衛；大衛割下王袍卻不害受膏者。", ne: "1 Sam 24:1 — David spared Saul in the caves of En-gedi.", focus: ["david_army"] }),
        S(65, "hebron", 600, { date: "約前1003年", zh: "希伯崙作王", en: "Hebron", nz: "撒下2:4 猶大人來到希伯崙膏大衛作猶大王。", ne: "2 Sam 2:4 — David was anointed king over Judah at Hebron.", focus: ["david_army"] }),
        S(100, "jerusalem", 680, { date: "約前1000年", zh: "耶路撒冷建都", en: "Jerusalem", nz: "撒下5:7 大衛攻取錫安寨，定名大衛城，作以色列京城。", ne: "2 Sam 5:7 — David captured Jerusalem and made it his capital.", focus: ["david_army"], commanders: [{ zh: "大衛", en: "David" }] }),
      ],
    },

    solomon: {
      END_DAY: 100,
      analysis: A(
        "所羅門在基遍夢中求智慧（王上3）；在耶路撒冷聖殿山建殿（王上6）；與推羅希蘭合作（王上5）；在以旬迦別（埃拉特）建船隊（王上9:26）。",
        "所羅門、希蘭、示巴女王。",
        "聖殿為耶和華名居住之地，預表基督與教會。",
        "繁榮與晚年離棄成為後世警戒。"
      ),
      storyboard: [
        S(1, "gibeon", 650, { date: "約前970年", zh: "基遍求智慧", en: "Gibeon", nz: "王上3:4-5 所羅門在基遍獻祭；夢中神賜他智慧。", ne: "1 Kgs 3:4-5 — Solomon asked for wisdom at Gibeon.", focus: ["solomon"], commanders: [{ zh: "所羅門", en: "Solomon" }] }),
        S(35, "temple_mount", 580, { date: "約前966年", zh: "建造聖殿", en: "Temple Mount", nz: "王上6:1 所羅門作王第四年，在耶路撒冷開始建殿，七年建成。", ne: "1 Kgs 6:1 — Solomon built the temple on Mount Moriah.", focus: ["solomon"] }),
        S(60, "tyre", 620, { date: "所羅門年間", zh: "推羅", en: "Tyre", nz: "王上5:1 推羅王希蘭與所羅門合作，運香柏木建殿。", ne: "1 Kgs 5:1 — Hiram of Tyre supplied cedar for the temple.", focus: ["solomon"] }),
        S(80, "ezion_geber", 600, { date: "所羅門年間", zh: "以旬迦別", en: "Ezion-geber", nz: "王上9:26 所羅門在以旬迦別（以東海邊）與以拉他旁邊建船隊。", ne: "1 Kgs 9:26 — Solomon built a fleet at Ezion-geber on the Red Sea.", focus: ["solomon"] }),
        S(100, "temple_mount", 700, { date: "約前931年", zh: "晚年離棄", en: "Turning Away", nz: "王上11:4 所羅門年老，妃嬪誘惑他的心偏離耶和華。", ne: "1 Kgs 11:4 — Solomon's heart turned away in his old age.", focus: ["solomon"] }),
      ],
    },

    "kingdom-split": {
      END_DAY: 100,
      analysis: A(
        "羅波安在示劍拒減軛（王上12）；北方立耶羅波安；北國早期都城得撒（王上14:17），後暗利建撒瑪利亞（王上16:24）；耶羅波安在但與伯特利設金牛犢（王上12:28-29）。",
        "羅波安、耶羅波安、暗利。",
        "分裂與偶像敬拜扭曲真敬拜。",
        "猶大線保存大衛譜系。"
      ),
      storyboard: [
        S(1, "shechem", 640, { date: "公元前931年", zh: "示劍會議", en: "Shechem", nz: "王上12:1 羅波安往示劍，以色列眾人來立他為王。", ne: "1 Kgs 12:1 — All Israel assembled at Shechem for Rehoboam.", focus: ["judah", "israel_n"], commanders: [{ zh: "羅波安", en: "Rehoboam" }] }),
        S(25, "shechem", 600, { date: "公元前931年", zh: "十支派叛變", en: "Rebellion", nz: "王上12:16 以色列人說：我們與大衛有什麼分兒？就叛變立耶羅波安。", ne: "1 Kgs 12:16 — Israel rebelled and made Jeroboam king.", focus: ["israel_n"], commanders: [{ zh: "耶羅波安", en: "Jeroboam" }] }),
        S(45, "jerusalem", 580, { date: "公元前931年", zh: "猶大留守", en: "Judah", nz: "王上12:20 只有猶大支派歸羅波安，以耶路撒冷為都。", ne: "1 Kgs 12:20 — Only Judah remained loyal to Rehoboam in Jerusalem.", focus: ["judah"] }),
        S(65, "tirzah", 560, { date: "分裂初期", zh: "得撒", en: "Tirzah", nz: "王上14:17 耶羅波安兒子死後，北國早期都城得撒。", ne: "1 Kgs 14:17 — Tirzah served as an early northern capital.", focus: ["israel_n"] }),
        S(80, "samaria", 560, { date: "約前880年", zh: "撒瑪利亞", en: "Samaria", nz: "王上16:24 暗利買撒瑪利亞山建城，作北國都城。", ne: "1 Kgs 16:24 — Omri built Samaria as Israel's capital.", focus: ["israel_n"] }),
        S(95, "bethel", 600, { date: "分裂後", zh: "伯特利金牛犢", en: "Bethel", nz: "王上12:29 耶羅波安在伯特利與但設金牛犢，陷民於罪。", ne: "1 Kgs 12:29 — Jeroboam set up golden calves at Bethel and Dan.", focus: ["israel_n"] }),
      ],
    },

    prophets: {
      END_DAY: 100,
      analysis: A(
        "以利亞在迦密山對抗巴力（王上18）；以賽亞、耶利米在耶路撒冷；以西結在提勒亞畢（迦巴河，結3:15）；被擄期但以理在巴比倫。",
        "以利亞、以賽亞、耶利米、以西結、但以理、哈該、撒迦利亞、瑪拉基。",
        "先知宣告審判與安慰，預告彌賽亞。",
        "預言在基督身上應驗。"
      ),
      storyboard: [
        S(1, "carmel", 650, { date: "約前870年", zh: "迦密山", en: "Mount Carmel", nz: "王上18:19 以利亞在迦密山對抗巴力先知，耶和華降火。", ne: "1 Kgs 18:19 — Elijah on Mount Carmel — fire from the LORD.", focus: ["prophets"], commanders: [{ zh: "以利亞", en: "Elijah" }] }),
        S(25, "samaria", 620, { date: "北國", zh: "撒瑪利亞", en: "Samaria", nz: "王上16 以北國撒瑪利亞為中心，阿摩司、何西亞呼籲悔改。", ne: "Amos and Hosea prophesied against Samaria's idolatry.", focus: ["prophets"] }),
        S(45, "jerusalem", 600, { date: "約前8世紀", zh: "耶路撒冷", en: "Jerusalem", nz: "賽7:14 以賽亞預言童女懷孕生子；彌5:2 彌迦預告伯利恆出生的君王。", ne: "Isaiah and Micah prophesied in Jerusalem of the coming King.", focus: ["prophets"], commanders: [{ zh: "以賽亞", en: "Isaiah" }] }),
        S(60, "anathoth", 580, { date: "約前7世紀", zh: "亞拿突", en: "Anathoth", nz: "耶1:1 耶利米是亞拿突的祭司；預言耶路撒冷將被毀。", ne: "Jer 1:1 — Jeremiah of Anathoth warned of Jerusalem's fall.", focus: ["prophets"], commanders: [{ zh: "耶利米", en: "Jeremiah" }] }),
        S(82, "tel_abib", 680, { date: "被擄期", zh: "提勒亞畢", en: "Tel Abib", nz: "結3:15 以西結在迦巴河邊提勒亞畢，見四活物的異象。", ne: "Ezek 3:15 — Ezekiel's visions by the Chebar canal.", focus: ["prophets"], commanders: [{ zh: "以西結", en: "Ezekiel" }] }),
        S(100, "babylon", 720, { date: "被擄期", zh: "巴比倫", en: "Babylon", nz: "但1:1 但以理與同伴被擄至巴比倫；結束期有哈該、撒迦利亞、瑪拉基。", ne: "Daniel in Babylon; Haggai, Zechariah and Malachi closed the prophetic era.", focus: ["prophets"] }),
      ],
    },

    "israel-fall": {
      END_DAY: 100,
      analysis: A(
        "亞述王撒爾根二世圍攻撒瑪利亞三年（王下17:5-6），城陷於公元前722年；百姓被擄至亞述。",
        "何細亞、亞述諸王；何西亞、阿摩司曾預告。",
        "長期偶像與背約的後果。",
        "北國滅亡，猶大仍存。"
      ),
      storyboard: [
        S(1, "nineveh", 700, { date: "約前724年", zh: "亞述出兵", en: "Nineveh", nz: "王下17:3 何細亞背叛亞述王，亞述大軍自尼尼微南下。", ne: "2 Kgs 17:3 — Assyria marched from Nineveh against Israel.", focus: ["assyria"] }),
        S(30, "samaria", 620, { date: "約前724年", zh: "圍攻撒瑪利亞", en: "Siege", nz: "王下17:5 亞述王上來圍困撒瑪利亞，三年之久。", ne: "2 Kgs 17:5 — Samaria was besieged for three years.", focus: ["samaria", "assyria"], assets: ["artillery"] }),
        S(60, "samaria", 580, { date: "公元前722年", zh: "城陷", en: "Fall", nz: "王下17:6 撒瑪利亞被攻取，以色列王何細亞被囚。", ne: "2 Kgs 17:6 — Samaria fell; King Hoshea was imprisoned.", focus: ["samaria"], assets: ["firefight"] }),
        S(85, "nineveh", 720, { date: "公元前722年", zh: "擄至亞述", en: "Deportation", nz: "王下17:6 以色列人被擄到亞述的哈臘、歌散等地。", ne: "2 Kgs 17:6 — Israel was deported to Assyria.", focus: ["assyria"] }),
        S(100, "samaria", 650, { date: "公元前722年", zh: "北國終結", en: "End of Israel", nz: "王下17:18 耶和華向以色列人發怒，把他們從自己面前趕出。", ne: "2 Kgs 17:18 — The LORD removed Israel from His presence.", focus: ["samaria"] }),
      ],
    },

    "judah-fall": {
      END_DAY: 100,
      analysis: A(
        "尼布甲尼撒自巴比倫南下，先攻拉吉（耶34:7），公元前586年攻陷耶路撒冷，焚燒聖殿（王下25:8-9）。",
        "西底家、尼布甲尼撒、耶利米。",
        "聖殿被毀，被擄七十年；新約應許新約與真殿基督。",
        "以斯拉、尼希米歸回重建。"
      ),
      storyboard: [
        S(1, "babylon", 720, { date: "約前597年", zh: "巴比倫興兵", en: "Babylon", nz: "王下24:10 巴比倫王尼布甲尼撒上來攻耶路撒冷。", ne: "2 Kgs 24:10 — Nebuchadnezzar came against Jerusalem.", focus: ["babylon_army"] }),
        S(25, "jerusalem", 620, { date: "約前597年", zh: "首次被擄", en: "First Deportation", nz: "王下24:12 約雅敬王與臣僕向巴比倫王投降，被擄。", ne: "2 Kgs 24:12 — Jehoiachin surrendered and was taken to Babylon.", focus: ["jerusalem"] }),
        S(45, "lachish", 580, { date: "約前588年", zh: "拉吉", en: "Lachish", nz: "耶34:7 巴比倫軍隊攻擊猶大一切城邑，拉吉、亞西加已經攻取。", ne: "Jer 34:7 — Lachish and Azekah fell to Babylon.", focus: ["babylon_army"], assets: ["artillery"] }),
        S(65, "jerusalem", 560, { date: "公元前586年", zh: "城陷", en: "Jerusalem Falls", nz: "王下25:4 城被攻破；西底家眾子被殺，他被剜眼。", ne: "2 Kgs 25:4 — The city was broken up; Zedekiah was captured.", focus: ["jerusalem"], assets: ["firefight"] }),
        S(82, "temple_mount", 540, { date: "公元前586年", zh: "聖殿被焚", en: "Temple Burned", nz: "王下25:9 巴比倫王焚燒耶和華的殿與王宮，拆毀耶路撒冷城牆。", ne: "2 Kgs 25:9 — They burned the house of the LORD.", focus: ["jerusalem"], assets: ["artillery"] }),
        S(100, "babylon", 700, { date: "公元前586年", zh: "被擄巴比倫", en: "Exile", nz: "王下25:11 巴比倫王將百姓擄到巴比倫；耶25:11 七十年為期。", ne: "2 Kgs 25:11 — The people were carried to Babylon for seventy years.", focus: ["babylon_army"] }),
      ],
    },

    jesus: {
      END_DAY: 100,
      analysis: A(
        "耶穌生於伯利恆（路2），在拿撒勒成長（路2:39），在迦拿行首個神蹟（約2），以迦百農為事工中心（太4:13），在加利利海呼召門徒，最後一周經伯大尼、客西馬尼至耶路撒冷受難復活（路24 以馬忤斯）。",
        "耶穌、門徒、馬利亞、彼拉多。",
        "道成肉身；十字架成就救贖；復活戰勝死亡。",
        "救恩歷史中心；大使命差遣門徒。"
      ),
      storyboard: [
        S(1, "bethlehem", 620, { date: "約公元前4年", zh: "伯利恆降生", en: "Bethlehem", nz: "路2:4-7 馬利亞在伯利恆生下頭胎兒子，用布包起來放在馬槽裡。", ne: "Luke 2:4-7 — Jesus was born in Bethlehem.", focus: ["jesus"] }),
        S(18, "nazareth", 600, { date: "成長", zh: "拿撒勒", en: "Nazareth", nz: "路2:39-40 耶穌在拿撒勒長大，智慧與身量一齊增長。", ne: "Luke 2:39-40 — Jesus grew up in Nazareth.", focus: ["jesus"] }),
        S(35, "cana", 580, { date: "約公元27年", zh: "迦拿婚筵", en: "Cana", nz: "約2:1-11 在迦拿婚筵耶穌以水變酒，顯出榮耀。", ne: "John 2:1-11 — The first sign at Cana in Galilee.", focus: ["jesus"] }),
        S(50, "capernaum", 560, { date: "約公元27–30年", zh: "迦百農", en: "Capernaum", nz: "太4:13 耶穌離開拿撒勒，往迦百農居住，那裡靠海。", ne: "Matt 4:13 — Jesus made Capernaum his base by the sea.", focus: ["jesus"], commanders: [{ zh: "耶穌", en: "Jesus" }] }),
        S(65, "galilee_sea", 540, { date: "事工期", zh: "加利利海", en: "Sea of Galilee", nz: "太4:18 在加利利海邊呼召彼得、安得烈、雅各、約翰。", ne: "Matt 4:18 — Calling the first disciples by the Sea of Galilee.", focus: ["jesus"] }),
        S(78, "jericho", 560, { date: "末後旅程", zh: "耶利哥", en: "Jericho", nz: "路19:1 耶穌進耶利哥，遇撒該；隨後上耶路撒冷。", ne: "Luke 19:1 — Jesus passed through Jericho toward Jerusalem.", focus: ["jesus"] }),
        S(88, "gethsemane", 540, { date: "公元30年", zh: "客西馬尼", en: "Gethsemane", nz: "太26:36 耶穌帶門徒到客西馬尼，禱告說：我父啊，若不能免去，就願你的意旨成全。", ne: "Matt 26:36 — Gethsemane: 'Not my will, but yours be done.'", focus: ["jesus"] }),
        S(100, "emmaus", 620, { date: "公元30年", zh: "以馬忤斯", en: "Emmaus", nz: "路24:13-31 復活主在往以馬忤斯的路上向門徒顯現，開他們的心竅。", ne: "Luke 24:13-31 — The risen Lord appeared on the road to Emmaus.", focus: ["jesus"] }),
      ],
    },

    paul: {
      END_DAY: 100,
      analysis: A(
        "掃羅在大馬士革路上遇主（徒9）；安提阿差遣第一次宣教：撒拉米、彼西底安提阿、路司得（徒13-14）；第二次經特羅亞、腓立比、雅典至哥林多（徒16-18）；第三次以弗所為中心（徒19）；上告該撒至羅馬（徒28）。",
        "保羅、巴拿巴、西拉、提摩太、路加。",
        "因信稱義的福音傳向外邦；保羅書信構成新約神學核心。",
        "開闢歐洲宣教路線。"
      ),
      storyboard: [
        S(1, "damascus", 680, { date: "約公元34年", zh: "大馬士革路上", en: "Damascus Road", nz: "徒9:3-6 掃羅臨近大馬士革，有大光四面照著他，主說：我就是你所逼迫的耶穌。", ne: "Acts 9:3-6 — Saul's conversion on the road to Damascus.", focus: ["paul"], commanders: [{ zh: "保羅", en: "Paul" }] }),
        S(10, "antioch_syria", 640, { date: "約公元46年", zh: "安提阿差遣", en: "Antioch", nz: "徒13:2-3 聖靈說：要為我分派巴拿巴和掃羅；安提阿教會按手差遣他們。", ne: "Acts 13:2-3 — Sent out from Antioch on the first journey.", focus: ["paul"] }),
        S(22, "salamis", 600, { date: "第一次宣教", zh: "撒拉米", en: "Salamis", nz: "徒13:5 到了撒拉米，在猶太人會堂裡傳講神的道。", ne: "Acts 13:5 — They proclaimed the word in the synagogues of Salamis, Cyprus.", focus: ["paul"] }),
        S(30, "pisidian_antioch", 580, { date: "第一次宣教", zh: "彼西底安提阿", en: "Pisidian Antioch", nz: "徒13:14 他們來到彼西底安提阿，在安息日進會堂坐席。", ne: "Acts 13:14 — Paul preached at Pisidian Antioch.", focus: ["paul"] }),
        S(38, "lystra", 560, { date: "第一次宣教", zh: "路司得", en: "Lystra", nz: "徒14:19 路司得人用石頭打保羅，以為他是死了，便拖到城外。", ne: "Acts 14:19 — Paul was stoned at Lystra yet continued.", focus: ["paul"] }),
        S(48, "troas", 620, { date: "第二次宣教", zh: "特羅亞", en: "Troas", nz: "徒16:9 夜間有異象：有一個馬其頓人站著求你說：請你過到馬其頓幫助我們。", ne: "Acts 16:9 — The Macedonian call at Troas.", focus: ["paul"] }),
        S(55, "philippi", 580, { date: "第二次宣教", zh: "腓立比", en: "Philippi", nz: "徒16:12 來到腓立比，這是馬其頓的第一座城；呂底亞信主。", ne: "Acts 16:12 — Lydia believed at Philippi.", focus: ["paul"] }),
        S(62, "athens", 560, { date: "第二次宣教", zh: "雅典", en: "Athens", nz: "徒17:22 保羅在亞略巴古說：所造之物，你們可以按著性質當作神。", ne: "Acts 17:22 — Paul's sermon on the Areopagus in Athens.", focus: ["paul"] }),
        S(70, "corinth", 560, { date: "第二次宣教", zh: "哥林多", en: "Corinth", nz: "徒18:11 保羅住了一年零六個月，教訓他們神的道。", ne: "Acts 18:11 — Paul stayed eighteen months in Corinth.", focus: ["paul"] }),
        S(80, "ephesus", 540, { date: "第三次宣教", zh: "以弗所", en: "Ephesus", nz: "徒19:10 這樣有兩年之久，叫一切住在亞細亞的人都聽見主的道。", ne: "Acts 19:10 — Two years of ministry in Ephesus.", focus: ["paul"] }),
        S(90, "caesarea", 580, { date: "約公元57年", zh: "該撒利亞", en: "Caesarea", nz: "徒21:8 第二天保羅同我們來到該撒利亞，進了傳福音的腓利家裡。", ne: "Acts 21:8 — Paul at Caesarea before going to Jerusalem.", focus: ["paul"] }),
        S(100, "rome", 720, { date: "約公元60年", zh: "羅馬", en: "Rome", nz: "徒28:16 保羅進了羅馬城，放他一人住，另有一個士兵看守；向猶太人證明神的國。", ne: "Acts 28:16 — Paul preached the kingdom of God in Rome.", focus: ["paul"], commanders: [{ zh: "保羅", en: "Paul" }] }),
      ],
    },

    "gospel-europe": {
      END_DAY: 100,
      analysis: A(
        "福音自耶路撒冷傳開（徒1:8），羅馬教會興起；313年米蘭詔；君士坦丁堡為東教中心；863年西里爾美多德在摩拉維亞；988年基輔羅斯受洗。",
        "初期教父、君士坦丁、西里爾與美多德、弗拉基米爾大公。",
        "教會承接大使命；正教在東歐扎根。",
        "福音塑造歐洲文明。"
      ),
      storyboard: [
        S(1, "jerusalem", 650, { date: "1世紀", zh: "耶路撒冷", en: "Jerusalem", nz: "徒1:8 要為我作見證，直到地極；五旬節聖靈降臨。", ne: "Acts 1:8 — Witnesses from Jerusalem to the ends of the earth.", focus: ["church"] }),
        S(25, "rome", 680, { date: "1–3世紀", zh: "羅馬", en: "Rome", nz: "徒28 保羅在羅馬見證；彼得傳統亦與此城有關；教會在逼迫中擴展。", ne: "The church took root in Rome despite persecution.", focus: ["church"] }),
        S(45, "alexandria", 620, { date: "2–4世紀", zh: "亞歷山大", en: "Alexandria", nz: "亞歷山大成為重要教父中心，游斯丁、俄利根等在此事奉。", ne: "Alexandria became a major center of early Christian theology.", focus: ["church"] }),
        S(55, "milan", 640, { date: "313年", zh: "米蘭詔", en: "Milan", nz: "313年《米蘭詔書》使基督教在羅馬帝國獲合法地位。", ne: "The Edict of Milan (313) legalized Christianity.", focus: ["church"] }),
        S(65, "constantinople", 620, { date: "4世紀", zh: "君士坦丁堡", en: "Constantinople", nz: "330年君士坦丁堡成為帝國首都，東方教會神學中心。", ne: "Constantinople became the capital and center of Eastern Christianity.", focus: ["church"] }),
        S(78, "moravia", 600, { date: "863年", zh: "摩拉維亞", en: "Moravia", nz: "西里爾與美多德兄弟在摩拉維亞向斯拉夫民族傳福音，創制斯拉夫文字。", ne: "Cyril and Methodius evangelized the Slavs in Moravia.", focus: ["church"] }),
        S(100, "kiev", 720, { date: "988年", zh: "基輔受洗", en: "Kiev", nz: "988年弗拉基米爾大公在基輔受洗，基輔羅斯皈依正教。", ne: "Prince Vladimir's baptism at Kiev Christianized Rus.", focus: ["church"] }),
      ],
    },

    crusades: {
      END_DAY: 100,
      analysis: A(
        "1095年烏爾班二世在克萊蒙（法國）號召；1097年攻尼西亞；1098年圍安條克；1099年陷耶路撒冷；1187年哈丁戰敗；1291年阿卡陷落。",
        "烏爾班二世、薩拉丁、鮑德溫一世。",
        "混合宗教熱忱與政治利益；加深東西方裂痕。",
        "塑造中世紀聖戰記憶。"
      ),
      storyboard: [
        S(1, "clermont", 700, { date: "1095年11月", zh: "克萊蒙", en: "Clermont", nz: "1095年教皇烏爾班二世在克萊蒙議會號召收復聖地。", ne: "1095 — Urban II's sermon at the Council of Clermont.", focus: ["crusaders"] }),
        S(25, "nicaea", 640, { date: "1097年", zh: "尼西亞", en: "Nicaea", nz: "1097年第一次十字軍圍攻尼西亞（今伊茲尼克）。", ne: "1097 — Siege of Nicaea.", focus: ["crusaders"] }),
        S(45, "antioch", 620, { date: "1098年", zh: "安條克", en: "Antioch", nz: "1098年十字軍經艱苦圍城奪取安條克，後繼續南下。", ne: "1098 — Crusaders captured Antioch after a long siege.", focus: ["crusaders", "ayyubids"], assets: ["firefight"] }),
        S(65, "jerusalem", 600, { date: "1099年7月", zh: "耶路撒冷", en: "Jerusalem", nz: "1099年7月第一次十字軍攻陷耶路撒冷，建立拉丁王國。", ne: "July 1099 — Jerusalem fell to the First Crusade.", focus: ["crusaders"], assets: ["firefight"] }),
        S(80, "hattin", 580, { date: "1187年7月", zh: "哈丁", en: "Hattin", nz: "1187年7月4日薩拉丁在哈丁山丘大敗十字軍。", ne: "4 July 1187 — Saladin's victory at the Horns of Hattin.", focus: ["ayyubids"], commanders: [{ zh: "薩拉丁", en: "Saladin" }], assets: ["firefight"] }),
        S(100, "acre", 650, { date: "1291年5月", zh: "阿卡", en: "Acre", nz: "1291年5月阿卡陷落，十字軍在聖地最後據點失守。", ne: "May 1291 — Fall of Acre ended the Crusader states.", focus: ["ayyubids"] }),
      ],
    },

    "church-schism": {
      END_DAY: 100,
      analysis: A(
        "1054年7月16日羅馬與君士坦丁堡互相開除教籍；此前已有和子句、教宗權柄、禮儀等分歧；五大宗主教座包括羅馬、君士坦丁堡、亞歷山大、安條克。",
        "利奧九世、君士坦丁堡牧首塞魯拉留斯。",
        "反映文化、語言與教會政治差異。",
        "1054年分裂影響至今。"
      ),
      storyboard: [
        S(1, "rome", 650, { date: "4–10世紀", zh: "羅馬", en: "Rome", nz: "羅馬教會強調教宗首席權柄與拉丁禮儀傳統。", ne: "Rome emphasized papal primacy and Latin liturgy.", focus: ["rome_ch"] }),
        S(25, "constantinople", 620, { date: "11世紀", zh: "君士坦丁堡", en: "Constantinople", nz: "東方教會堅持大公會議權威，反對和子句加入信經。", ne: "Constantinople upheld conciliar authority and opposed the Filioque.", focus: ["constantinople"] }),
        S(45, "constantinople", 600, { date: "1054年7月16日", zh: "互相開除教籍", en: "Mutual Excommunication", nz: "1054年7月16日雙方代表互相開除教籍，東西教會正式分裂。", ne: "16 July 1054 — Mutual excommunication formalized the schism.", focus: ["rome_ch", "constantinople"] }),
        S(65, "alexandria", 580, { date: "分裂後", zh: "亞歷山大", en: "Alexandria", nz: "東方正教傳統下，亞歷山大、安條克等古老宗座繼續發展。", ne: "Alexandria remained a historic patriarchal see in the East.", focus: ["constantinople"] }),
        S(88, "antioch", 600, { date: "分裂後", zh: "安條克", en: "Antioch", nz: "安條克宗座代表古老近東教會傳統，與羅馬分道揚鑣。", ne: "Antioch represented ancient Semitic Christianity in the Eastern communion.", focus: ["constantinople"] }),
      ],
    },
  };
};
