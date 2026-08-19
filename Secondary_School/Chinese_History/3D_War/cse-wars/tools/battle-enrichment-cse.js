/**
 * Rich storyboards, analysis, and asset tags per HKDSE Chinese History sub-battle.
 * Merged by scaffold-battles.js — replaces short default scenes.
 */
module.exports = function ({ cam }) {
  const S = (day, lng, lat, dist, o) => ({
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
  });

  const A = (military, nationalPower, impact) => ({ military, nationalPower, impact });

  return {
    /* ========== 秦漢 QIN-HAN ========== */
    "qin-han/gaixia": {
      END_DAY: 100,
      analysis: A(
        "劉邦聯合韓信、彭越等部，在垓下對項羽楚軍實施十面埋伏；韓信以背水列陣穩住陣腳，楚軍夜聞四面楚歌，士氣崩潰。",
        "劉邦得關中與巴蜀後勤，得項伯、英布等倒戈；項羽雖驍勇，但分封失當、失齊楚民心，兵疲糧盡。",
        "楚漢相爭結束，項羽兵敗自刎，劉邦勝出並建立漢朝。"
      ),
      storyboard: [
        S(1, 117.2, 33.6, 680, { date: "前206年", zh: "楚漢對峙", en: "Chu–Han Standoff", nz: "項羽分封天下後東返彭城，劉邦據關中蓄勢，楚漢戰爭全面爆發。", ne: "After enfeoffing the realm, Xiang Yu returns east while Liu Bang holds Guanzhong — the Chu–Han war begins.", focus: ["han_main", "chu_main"], side: "both", commanders: [{ zh: "劉邦", en: "Liu Bang" }, { zh: "項羽", en: "Xiang Yu" }], fz: "楚漢主力對峙", fe: "Chu and Han main forces" }),
        S(22, 117.25, 33.65, 620, { date: "前202年冬", zh: "十面埋伏", en: "Ten-Sided Ambush", nz: "韓信、彭越、英布等合圍垓下，切斷楚軍退路與補給。", ne: "Han Xin, Peng Yue and Ying Bu encircle Gaixia, cutting Chu supply lines.", focus: ["han_main"], side: "han", commanders: [{ zh: "韓信", en: "Han Xin" }] }),
        S(42, 117.2, 33.58, 580, { date: "前202年", zh: "四面楚歌", en: "Chu Songs on Four Sides", nz: "漢軍夜唱楚歌，楚軍士卒思鄉，軍心動搖。", ne: "Han troops sing Chu songs at night — Chu soldiers lose heart.", focus: ["chu_main"], side: "chu", commanders: [{ zh: "項羽", en: "Xiang Yu" }] }),
        S(62, 117.18, 33.55, 540, { date: "前202年", zh: "項羽突圍", en: "Xiang Yu Breaks Out", nz: "項羽率八百騎突圍，至烏江自刎，楚軍瓦解。", ne: "Xiang Yu breaks out with 800 cavalry, then takes his life at the Wu River.", focus: ["chu_main"], side: "chu", fz: "楚軍潰敗", fe: "Chu army collapses" }),
        S(85, 117.2, 33.6, 700, { date: "前202年", zh: "漢朝建立", en: "Han Dynasty Founded", nz: "劉邦稱帝，定都長安，開創四百年漢業。", ne: "Liu Bang becomes emperor, establishes Chang'an as capital — four centuries of Han rule begin.", focus: ["han_main"], side: "han", commanders: [{ zh: "劉邦", en: "Liu Bang" }] }),
      ],
    },
    "qin-han/mobei": {
      END_DAY: 100,
      analysis: A(
        "漢武帝遣衛青、霍去病率騎兵遠征漠北，分路出擊匈奴王庭；霍去病封狼居胥，大破左贤王，匈奴遠徙漠北。",
        "漢朝經文景積蓄，馬政與財政支撐大規模遠征；匈奴內部分裂，單于勢力削弱。",
        "漢武帝遣衛青、霍去病擊潰匈奴，保障絲綢之路及邊疆穩定。"
      ),
      storyboard: [
        S(1, 110.0, 43.0, 750, { date: "前119年", zh: "漢軍出塞", en: "Han Armies Cross the Desert", nz: "衛青、霍去病各率五萬騎出擊，直搗漠北匈奴腹地。", ne: "Wei Qing and Huo Qubing each lead 50,000 cavalry deep into the northern steppe.", focus: ["han_main"], side: "han", commanders: [{ zh: "衛青", en: "Wei Qing" }, { zh: "霍去病", en: "Huo Qubing" }], fz: "漢騎兵約十萬", fe: "~100,000 Han cavalry" }),
        S(25, 109.5, 43.5, 680, { date: "前119年", zh: "漠北決戰", en: "Battle in the Gobi", nz: "漢軍與匈奴主力在漠北遭遇，以快騎衝鋒與迂回包抄破敵。", ne: "Han and Xiongnu clash in the Gobi — swift cavalry charges decide the day.", focus: ["han_main", "xiongnu_main"], side: "both" }),
        S(45, 110.5, 44.2, 620, { date: "前119年", zh: "封狼居胥", en: "Fenglang Juxu", nz: "霍去病追擊至狼居胥山，祭天告成，匈奴遠遁。", ne: "Huo Qubing reaches Langjuxu Mountain, performs the rite of victory — the Xiongnu flee far north.", focus: ["han_main"], side: "han", commanders: [{ zh: "霍去病", en: "Huo Qubing" }] }),
        S(65, 109.8, 43.2, 600, { date: "前119年", zh: "單于北徙", en: "Chanyu Retreats North", nz: "匈奴單于率部遠徙，漠南無王庭，邊患大減。", ne: "The Chanyu withdraws far north — the southern steppe is cleared of the royal court.", focus: ["xiongnu_main"], side: "xiongnu" }),
        S(90, 110.0, 43.0, 720, { date: "前119年後", zh: "絲路暢通", en: "Silk Road Secured", nz: "漠北勝利保障河西走廊，絲綢之路貿易與邊疆屯田得以發展。", ne: "Victory secures the Hexi Corridor — Silk Road trade and frontier settlement expand.", side: "han" }),
      ],
    },

    /* ========== 魏晉南北朝 WEIJIN ========== */
    "weijin/guandu": {
      END_DAY: 100,
      analysis: A(
        "袁紹率十餘萬大軍南下，曹操以少數精銳在官渡對峙；許攸投曹，曹操奇襲烏巢焚燒袁軍糧草，袁軍潰散。",
        "袁紹據有河北四州，兵多糧足但指揮分裂；曹操挟天子以令诸侯，精兵善戰、謀士雲集。",
        "曹操以少勝多擊敗袁紹，奠定統一北方基礎。"
      ),
      storyboard: [
        S(1, 113.9, 34.7, 680, { date: "200年", zh: "袁紹南下", en: "Yuan Shao Advances South", nz: "袁紹率大軍渡河南下，曹操以官渡為屏障迎戰。", ne: "Yuan Shao crosses the Yellow River south — Cao Cao holds the line at Guandu.", focus: ["yuan_main"], side: "yuan", commanders: [{ zh: "袁紹", en: "Yuan Shao" }], fz: "袁軍十餘萬", fe: "100,000+ Yuan troops" }),
        S(22, 113.85, 34.72, 620, { date: "200年", zh: "官渡對峙", en: "Stalemate at Guandu", nz: "兩軍相持數月，曹操兵少糧絀，形勢危急。", ne: "Months of stalemate — Cao Cao is outnumbered and short of supplies.", focus: ["cao_main", "yuan_main"], side: "both", commanders: [{ zh: "曹操", en: "Cao Cao" }] }),
        S(42, 113.95, 34.68, 580, { date: "200年", zh: "許攸投曹", en: "Xu You Defects", nz: "袁紹謀士許攸投曹操，獻計偷襲烏巢糧屯。", ne: "Yuan Shao's adviser Xu You defects and reveals the Wuchao granary.", focus: ["cao_main"], side: "cao", commanders: [{ zh: "許攸", en: "Xu You" }] }),
        S(62, 114.05, 34.75, 550, { date: "200年", zh: "火燒烏巢", en: "Burning Wuchao", nz: "曹操親率精銳夜襲烏巢，焚燒袁軍糧草，袁軍士氣崩潰。", ne: "Cao Cao raids Wuchao by night and burns Yuan's supplies — Yuan's army collapses.", focus: ["cao_main"], side: "cao", fz: "袁軍糧盡潰散", fe: "Yuan army routs without food" }),
        S(85, 113.9, 34.7, 700, { date: "200年後", zh: "北方統一", en: "North Unification Begins", nz: "官渡之勝使曹操統一河北，奠定曹魏基業。", ne: "Guandu opens the path to unifying the north — the foundation of Cao Wei.", focus: ["cao_main"], side: "cao", commanders: [{ zh: "曹操", en: "Cao Cao" }] }),
      ],
    },
    "weijin/chibi": {
      END_DAY: 100,
      analysis: A(
        "曹操率水陸大軍南下，孫權、劉備聯軍在赤壁以火攻焚燒連環戰船；東風助燃，曹軍潰敗北撤。",
        "曹操雖據北方，但水軍不習江戰、疫疾流行；孫劉聯盟得長江天險與江東水師之長。",
        "孫劉聯軍大敗曹操，阻斷曹操南下，奠定三國鼎立局面。"
      ),
      storyboard: [
        S(1, 113.9, 29.7, 700, { date: "208年", zh: "曹操南下", en: "Cao Cao Moves South", nz: "曹操降劉琮、得荊州，率二十餘萬大軍東進，威脅江東。", ne: "After taking Jing Province, Cao Cao advances east with 200,000+ men.", focus: ["cao_main"], side: "cao", commanders: [{ zh: "曹操", en: "Cao Cao" }], assets: ["navy"], fz: "曹軍水陸二十餘萬", fe: "200,000+ Cao forces" }),
        S(20, 113.88, 29.72, 640, { date: "208年", zh: "孫劉聯盟", en: "Sun–Liu Alliance", nz: "諸葛亮聯絡孫權，魯肅、周瑜主戰，孫劉結盟抗曹。", ne: "Zhuge Liang and Lu Su forge the Sun–Liu alliance against Cao Cao.", focus: ["allied_main"], side: "allied", commanders: [{ zh: "周瑜", en: "Zhou Yu" }, { zh: "諸葛亮", en: "Zhuge Liang" }] }),
        S(40, 113.92, 29.68, 580, { date: "208年冬", zh: "連環計與火攻", en: "Fire Attack on Chained Ships", nz: "黃蓋詐降，以火船趁東風焚燒曹軍連環艦。", ne: "Huang Gai's feigned surrender — fire ships burn Cao's chained fleet in the east wind.", focus: ["allied_main", "cao_main"], side: "both", commanders: [{ zh: "黃蓋", en: "Huang Gai" }], assets: ["navy"] }),
        S(62, 113.9, 29.65, 560, { date: "208年", zh: "曹軍潰敗", en: "Cao Cao Routed", nz: "火攻後曹軍大潰，沿華容道北撤，損失慘重。", ne: "Cao's army routs and retreats north via Huarong Road with heavy losses.", focus: ["cao_main"], side: "cao", assets: ["navy"] }),
        S(85, 113.9, 29.7, 720, { date: "208年後", zh: "三國雛形", en: "Three Kingdoms Emerge", nz: "赤壁之戰阻斷統一，魏蜀吳鼎立格局確立。", ne: "Red Cliffs blocks unification — the tripartite division of China takes shape.", side: "both" }),
      ],
    },
    "weijin/feishui": {
      END_DAY: 100,
      analysis: A(
        "前秦苻堅率大軍南征，東晉謝玄率北府兵在淝水對峙；前秦軍後退失控，晉軍乘勢追擊，前秦全線潰敗。",
        "前秦雖統一北方，但民族融合不足、降卒不穩；東晉據長江天險，北府兵精銳且士氣高昂。",
        "東晉擊敗前秦，維持南北對峙，阻延了北方政權統一天下。"
      ),
      storyboard: [
        S(1, 117.28, 31.86, 680, { date: "383年", zh: "苻堅南征", en: "Fu Jian Invades South", nz: "前秦苻堅自長安率百萬大軍南下，號稱投鞭斷流。", ne: "Former Qin ruler Fu Jian advances south with a vast army from Chang'an.", focus: ["qin_main"], side: "qin", commanders: [{ zh: "苻堅", en: "Fu Jian" }], fz: "前秦號稱百萬", fe: "Former Qin claims 1,000,000 men" }),
        S(22, 117.25, 31.88, 620, { date: "383年11月", zh: "淝水對峙", en: "Standoff at the Fei", nz: "晉軍北府兵在淝水列陣，與前秦隔河對峙。", ne: "Eastern Jin Beifu troops face Former Qin across the Fei River.", focus: ["jin_main", "qin_main"], side: "both", commanders: [{ zh: "謝玄", en: "Xie Xuan" }] }),
        S(42, 117.3, 31.85, 580, { date: "383年11月", zh: "草木皆兵", en: "Every Bush a Soldier", nz: "前秦後退時陣腳大亂，風吹草動皆被視為晉軍追兵，全軍潰散。", ne: "Former Qin retreat turns to rout — every rustle seems an ambush.", focus: ["qin_main"], side: "qin" }),
        S(62, 117.28, 31.9, 560, { date: "383年", zh: "北府兵追擊", en: "Beifu Pursuit", nz: "謝玄、謝石率北府兵追擊，前秦名將張淵陣亡，北方統一夢碎。", ne: "Xie Xuan's Beifu army pursues — Former Qin's dream of unification shatters.", focus: ["jin_main"], side: "jin", commanders: [{ zh: "謝石", en: "Xie Shi" }] }),
        S(88, 117.28, 31.86, 700, { date: "383年後", zh: "南北分立", en: "North–South Division", nz: "前秦迅速瓦解，東晉國祚延續，南北對峙局面再定。", ne: "Former Qin collapses; the Jin survives — north and south remain divided.", side: "jin" }),
      ],
    },

    /* ========== 隋唐 SUI-TANG ========== */
    "sui-tang/anshi": {
      END_DAY: 120,
      analysis: A(
        "安祿山、史思明以范陽、平盧、河東三鎮兵力起兵，攻陷洛陽、長安；唐軍與回紇聯兵反攻，歷時七年方平叛，但藩鎮勢力坐大。",
        "開元盛世後唐朝府兵制瓦解，邊將握重兵；安史之亂耗盡國力，中央對藩鎮控制力大減。",
        "唐朝由盛轉衰的絕對轉捩點，直接引發後期的藩鎮割據。"
      ),
      storyboard: [
        S(1, 108.94, 34.26, 700, { date: "755年", zh: "安祿山起兵", en: "An Lushan Rebellion Begins", nz: "安祿山以討楊貴妃之兄楊國忠為名，率三鎮十五萬兵反唐。", ne: "An Lushan rebels with 150,000 troops from three frontier commands.", focus: ["rebel_main"], side: "rebel", commanders: [{ zh: "安祿山", en: "An Lushan" }], fz: "叛軍約十五萬", fe: "~150,000 rebels" }),
        S(20, 112.45, 34.62, 650, { date: "756年", zh: "攻陷洛陽", en: "Luoyang Falls", nz: "叛軍攻占東都洛陽，安祿山稱大燕皇帝。", ne: "Rebels capture Luoyang — An Lushan declares himself emperor of Yan.", focus: ["rebel_main"], side: "rebel" }),
        S(38, 108.94, 34.26, 600, { date: "756年", zh: "馬嵬驛變", en: "Mawei Incident", nz: "唐玄宗西逃，禁軍譁變，楊國忠、楊貴妃被殺，玄宗入蜀。", ne: "Emperor Xuanzong flees west — troops mutiny, Yang Guozhong and Consort Yang die.", focus: ["tang_main"], side: "tang", commanders: [{ zh: "唐玄宗", en: "Emperor Xuanzong" }] }),
        S(55, 108.94, 34.26, 580, { date: "756年", zh: "長安陷落", en: "Chang'an Lost", nz: "叛軍占領長安，太子李亨即位于靈武，號肅宗，組織平叛。", ne: "Rebels take Chang'an — Crown Prince Li Heng becomes Emperor Suzong at Lingwu.", focus: ["rebel_main", "tang_main"], side: "both", commanders: [{ zh: "唐肅宗", en: "Emperor Suzong" }] }),
        S(75, 109.5, 34.3, 620, { date: "757–763年", zh: "回紇助唐平叛", en: "Uighur Aid and Counter-offensive", nz: "郭子儀、李光弼等率唐軍與回紇聯兵，收復兩京，史思明繼叛後亦被誅。", ne: "Guo Ziyi and Li Guangbi, with Uighur allies, recapture the capitals.", focus: ["tang_main"], side: "tang", commanders: [{ zh: "郭子儀", en: "Guo Ziyi" }, { zh: "李光弼", en: "Li Guangbi" }] }),
        S(105, 108.94, 34.26, 720, { date: "763年", zh: "藩鎮坐大", en: "Warlord Era Begins", nz: "叛亂雖平，但河朔三鎮及各地節度使擁兵自重，唐朝由盛轉衰。", ne: "Rebellion ends but regional warlords hold real power — Tang decline accelerates.", side: "both", fz: "戰亂歷時七年", fe: "Seven years of civil war" }),
      ],
    },

    /* ========== 宋元 SONG-YUAN ========== */
    "song-yuan/yamen": {
      END_DAY: 100,
      analysis: A(
        "元軍以張弘範率水師圍困崖山，南宋張世傑率艦隊護衛少帝趙昺；元軍以小艦火攻，宋军大舰因连锁而难以机动，全军覆没。",
        "南宋只剩东南一隅，兵少粮尽；元朝已统一北方，水军与蒙古骑兵协同，掌握海战主动。",
        "南宋水師全軍覆沒，陸秀夫背帝昺投海，元朝徹底統一天下。"
      ),
      storyboard: [
        S(1, 113.05, 22.28, 680, { date: "1279年", zh: "崖山合圍", en: "Siege of Yamen", nz: "元將張弘範率水師圍困崖山，南宋張世傑率艦隊護衛少帝趙昺。", ne: "Yuan admiral Zhang Hongfan blockades Yamen — Song admiral Zhang Shijie guards Emperor Bing.", focus: ["yuan_main", "song_main"], side: "both", commanders: [{ zh: "張弘範", en: "Zhang Hongfan" }, { zh: "張世傑", en: "Zhang Shijie" }], assets: ["navy"], fz: "宋軍艦千餘", fe: "1,000+ Song ships" }),
        S(22, 113.08, 22.25, 620, { date: "1279年2月", zh: "斷糧與围困", en: "Blockade and Starvation", nz: "元軍切断宋军淡水与补给，宋军以海为家，形势日蹙。", ne: "Yuan forces cut fresh water and supplies — the Song fleet weakens daily.", focus: ["song_main"], side: "song", assets: ["navy"] }),
        S(42, 113.05, 22.22, 580, { date: "1279年3月19日", zh: "海戰決戰", en: "Naval Decisive Battle", nz: "元军以小船火攻，宋大舰相连难以转向，全军溃败。", ne: "Yuan fire-ships attack chained Song vessels — the Song fleet is destroyed.", focus: ["yuan_main", "song_main"], side: "both", assets: ["navy"] }),
        S(65, 113.05, 22.2, 550, { date: "1279年3月19日", zh: "陸秀夫負帝投海", en: "Lu Xiufu's Final Act", nz: "陸秀夫背負八歲帝昺投海殉國，楊太后亦投海，南宋滅亡。", ne: "Lu Xiufu carries the eight-year-old emperor into the sea — the Song dynasty ends.", focus: ["song_main"], side: "song", commanders: [{ zh: "陸秀夫", en: "Lu Xiufu" }, { zh: "趙昺", en: "Emperor Bing" }] }),
        S(90, 113.05, 22.28, 720, { date: "1279年", zh: "元朝一統", en: "Yuan Unification Complete", nz: "崖山海戰後，元朝徹底統一中國，宋亡。", ne: "After Yamen, the Yuan completes unification of China.", side: "yuan" }),
      ],
    },

    /* ========== 明清 MING-QING ========== */
    "ming-qing/tumu": {
      END_DAY: 100,
      analysis: A(
        "明英宗朱祁镇在宦官王振怂恿下亲征瓦剌，于土木堡遭也先伏击；明军溃败，英宗被俘，京师震动。",
        "明朝前期国力强盛但军政被宦官干政；瓦剌也先统一蒙古诸部，骑兵机动灵活。",
        "明英宗親征被瓦剌俘虜，明朝國勢由盛轉衰，轉取守勢。"
      ),
      storyboard: [
        S(1, 115.25, 40.45, 680, { date: "1449年", zh: "英宗親征", en: "Emperor's Personal Campaign", nz: "明英宗在王振慫恿下率五十萬大軍親征瓦剌。", ne: "Emperor Yingzong leads 500,000 troops north against the Oirats.", focus: ["ming_main"], side: "ming", commanders: [{ zh: "明英宗", en: "Emperor Yingzong" }, { zh: "王振", en: "Wang Zhen" }], fz: "明軍約五十萬", fe: "~500,000 Ming troops" }),
        S(22, 115.28, 40.48, 620, { date: "1449年8月", zh: "土木堡進軍", en: "Advance to Tumu", nz: "明軍倉促北進，糧草不繼，士氣低落。", ne: "The Ming army advances hastily — supplies run short, morale falls.", focus: ["ming_main"], side: "ming" }),
        S(42, 115.25, 40.45, 580, { date: "1449年9月8日", zh: "土木堡之變", en: "Disaster at Tumu", nz: "也先率瓦剌騎兵伏擊土木堡，明軍大潰，英宗被俘。", ne: "Esen's Oirat cavalry ambushes Tumu — the Ming routs, the emperor is captured.", focus: ["oirat_main", "ming_main"], side: "both", commanders: [{ zh: "也先", en: "Esen" }] }),
        S(65, 116.4, 39.9, 600, { date: "1449年", zh: "于謙保衛北京", en: "Yu Qian Defends Beijing", nz: "郕王即位為景帝，于謙組織北京保衛戰，擊退也先。", ne: "The Prince of Cheng becomes Emperor Jingtai — Yu Qian repels Esen from Beijing.", focus: ["ming_main"], side: "ming", commanders: [{ zh: "于謙", en: "Yu Qian" }] }),
        S(90, 115.25, 40.45, 720, { date: "1449年後", zh: "由攻轉守", en: "From Offense to Defense", nz: "土木之变后明朝国势转衰，对蒙古由攻转守，加强长城防御。", ne: "After Tumu, Ming turns defensive — the Great Wall is reinforced.", side: "ming" }),
      ],
    },
    "ming-qing/sarhu": {
      END_DAY: 100,
      analysis: A(
        "后金努尔哈赤以“五大臣、十固山”体制，在萨尔浒以“凭几而战”分路反击；明军四路进击互不协同，一日之内三战三败。",
        "明军多路冒进、指挥混乱；后金全民皆兵、以逸待劳，熟悉辽东地形。",
        "後金（清）大敗明軍，掌握遼東戰略主動權，敲響明亡喪鐘。"
      ),
      storyboard: [
        S(1, 124.1, 41.9, 700, { date: "1619年", zh: "明軍四路進攻", en: "Four Ming Columns Advance", nz: "明廷集全國精銳，分四路進擊後金，意圖一舉蕩平遼東。", ne: "The Ming dispatches four columns to crush the Later Jin in Liaodong.", focus: ["ming_main"], side: "ming", commanders: [{ zh: "楊鎬", en: "Yang Hao" }], fz: "明軍約十萬", fe: "~100,000 Ming troops" }),
        S(22, 124.15, 41.92, 640, { date: "1619年3月1日", zh: "薩爾滸初戰", en: "First Clash at Sarhu", nz: "後金努爾哈赤以「憑幾而戰」分路反擊，先破明軍西路。", ne: "Nurhaci counter-attacks in detail — the western Ming column is destroyed.", focus: ["jin_main"], side: "jin", commanders: [{ zh: "努爾哈赤", en: "Nurhaci" }] }),
        S(42, 124.1, 41.88, 600, { date: "1619年3月1–2日", zh: "三戰三敗", en: "Three Defeats in Two Days", nz: "後金連續擊破明軍三路，明軍損失殆盡，僅一路倖免。", ne: "Three Ming columns are annihilated in two days — only one escapes.", focus: ["ming_main", "jin_main"], side: "both" }),
        S(65, 124.1, 41.9, 580, { date: "1619年", zh: "遼東主動權", en: "Liaodong Initiative", nz: "後金完全掌握遼東戰略主動，明朝喪失進攻能力。", ne: "The Later Jin holds the strategic initiative — Ming goes on the defensive.", focus: ["jin_main"], side: "jin", commanders: [{ zh: "努爾哈赤", en: "Nurhaci" }] }),
        S(90, 124.1, 41.9, 720, { date: "1619年後", zh: "明亡前奏", en: "Prelude to Ming Fall", nz: "薩爾滸之戰敲響明亡喪鐘，後金（清）勢力迅速擴張。", ne: "Sarhu sounds the knell of the Ming — the Later Jin expands rapidly.", side: "jin" }),
      ],
    },

    /* ========== 晚清 LATE-QING ========== */
    "late-qing/yellow-sea": {
      END_DAY: 100,
      analysis: A(
        "甲午战争黄海海战：北洋水师与日本联合舰队在鸭绿江口大东沟遭遇；双方以舰炮对射，致远、经远等舰沉没，北洋损失五舰。",
        "日本明治维新后海军现代化；北洋虽购铁甲舰但训练、弹种、指挥不足，后勤与战意亦逊。",
        "北洋水師主力受創，大清喪失黃海制海權。"
      ),
      storyboard: [
        S(1, 122.5, 38.5, 720, { date: "1894年9月17日", zh: "大東溝遭遇", en: "Encounter at the Yalu Mouth", nz: "北洋水師護送運兵船返航，與日本聯合艦隊在大東溝遭遇。", ne: "Beiyang Fleet meets the Japanese Combined Fleet off the Yalu estuary.", focus: ["beiyang_main", "japan_main"], side: "both", commanders: [{ zh: "丁汝昌", en: "Ding Ruchang" }, { zh: "伊東祐亨", en: "Itō Sukeyuki" }], assets: ["navy"], fz: "北洋水師約十二艦", fe: "~12 Beiyang warships" }),
        S(22, 122.55, 38.48, 660, { date: "1894年9月17日 午", zh: "艦隊決戰", en: "Fleet Action", nz: "雙方以艦炮對射，定遠、鎮遠居中，日本艦隊以速射炮側擊。", ne: "Battleships exchange broadsides — Japanese rapid-fire guns rake the Chinese line.", focus: ["beiyang_main", "japan_main"], side: "both", assets: ["navy"] }),
        S(42, 122.52, 38.45, 600, { date: "1894年9月17日", zh: "致遠、經遠沉沒", en: "Zhiyuan and Jingyuan Lost", nz: "鄧世昌率致遠艦衝擊吉野，艦中炮彈殉國；經遠等艦亦沉沒。", ne: "Deng Shichang rams the enemy in Zhiyuan and dies — Jingyuan is also lost.", focus: ["beiyang_main"], side: "beiyang", commanders: [{ zh: "鄧世昌", en: "Deng Shichang" }], assets: ["navy"] }),
        S(65, 122.5, 38.5, 580, { date: "1894年9月17日 傍晚", zh: "北洋撤出", en: "Beiyang Withdraws", nz: "北洋水師損失五艦，餘艦退至威海衛，喪失黃海制海權。", ne: "Five ships lost — the Beiyang Fleet withdraws to Weihaiwei, losing sea control.", focus: ["beiyang_main"], side: "beiyang", fz: "損失五艦", fe: "5 ships lost" }),
        S(90, 122.5, 38.5, 750, { date: "1894年後", zh: "制海權喪失", en: "Sea Control Lost", nz: "黃海海戰使大清喪失黃海制海權，日軍得以登陸遼東。", ne: "Defeat at the Yellow Sea allows Japanese landings in Liaodong.", side: "japan" }),
      ],
    },
    "late-qing/weihaiwei": {
      END_DAY: 100,
      analysis: A(
        "日军海陆合围威海卫，以鱼雷艇夜袭北洋泊地；刘公岛孤立无援，丁汝昌拒降自尽，北洋水师全军覆没。",
        "北洋经黄海海战已元气大伤；日本陆海军协同，占据威海湾炮台，切断陆上补给。",
        "北洋艦隊全軍覆沒，標誌著「洋務運動」宣告徹底失敗。"
      ),
      storyboard: [
        S(1, 122.12, 37.51, 680, { date: "1895年1月", zh: "威海被圍", en: "Weihaiwei Besieged", nz: "日軍占領威海灣南北炮台，海陸合圍北洋水師泊地劉公島。", ne: "Japan seizes forts on both sides of Weihai Bay — the Beiyang Fleet is trapped.", focus: ["japan_main"], side: "japan", commanders: [{ zh: "伊東祐亨", en: "Itō Sukeyuki" }], assets: ["navy"] }),
        S(22, 122.15, 37.48, 620, { date: "1895年2月", zh: "魚雷夜襲", en: "Torpedo Night Attack", nz: "日軍魚雷艇夜襲北洋泊地，來遠、威遠等艦被擊沉或重創。", ne: "Japanese torpedo boats strike at night — several Beiyang ships are sunk.", focus: ["beiyang_main"], side: "beiyang", assets: ["navy"] }),
        S(42, 122.12, 37.5, 580, { date: "1895年2月", zh: "劉公島孤守", en: "Isolated on Liugong Island", nz: "北洋困守劉公島，陸路斷絕，士兵譁變，丁汝昌拒絕投降。", ne: "Trapped on Liugong Island with mutiny ashore — Ding Ruchang refuses surrender.", focus: ["beiyang_main"], side: "beiyang", commanders: [{ zh: "丁汝昌", en: "Ding Ruchang" }] }),
        S(62, 122.12, 37.51, 550, { date: "1895年2月12日", zh: "丁汝昌殉國", en: "Ding Ruchang's Death", nz: "丁汝昌服毒自盡，北洋水師向日軍投降，全軍覆沒。", ne: "Ding Ruchang takes poison — the Beiyang Fleet surrenders, ending as a force.", focus: ["beiyang_main"], side: "beiyang", commanders: [{ zh: "丁汝昌", en: "Ding Ruchang" }] }),
        S(88, 122.12, 37.51, 720, { date: "1895年", zh: "洋務運動失敗", en: "Self-Strengthening Fails", nz: "威海衛陷落標誌洋務運動在軍事現代化上的徹底失敗，馬關條約簽訂。", ne: "Weihaiwei marks the failure of military modernization — the Treaty of Shimonoseki follows.", side: "both", fz: "北洋水師覆沒", fe: "Beiyang Fleet destroyed" }),
      ],
    },

    /* ========== 抗日 ANTI-JAPAN ========== */
    "anti-japan/songhu": {
      END_DAY: 100,
      analysis: A(
        "八一三事变后日军进攻上海，国军以德械师与中央军精锐在闸北、江湾逐屋血战；战斗持续三月，日军增兵至二十余万，国军有序撤退。",
        "日本海军可自长江口投送兵力；国军装备与训练优于其他战场，但海空劣势、伤亡惨重。",
        "戰況慘烈，成功粉碎日軍「三月亡華」的戰略企圖。"
      ),
      storyboard: [
        S(1, 121.47, 31.23, 680, { date: "1937年8月13日", zh: "淞沪开战", en: "Battle of Shanghai Opens", nz: "日军进攻上海，国军第八十七、八十八师在闸北反击，淞沪会战爆发。", ne: "Japan attacks Shanghai — Nationalist divisions counter-attack in Zhabei.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "张治中", en: "Zhang Zhizhong" }, { zh: "蒋介石", en: "Chiang Kai-shek" }], fz: "国军约七十万", fe: "~700,000 ROC troops" }),
        S(22, 121.48, 31.25, 620, { date: "1937年8–9月", zh: "闸北江湾血战", en: "Bloody Fighting in Zhabei", nz: "双方逐屋争夺，国军反复冲锋，伤亡极大。", ne: "House-to-house fighting — both sides suffer enormous casualties.", focus: ["gmd_main", "japan_main"], side: "both", assets: ["air"] }),
        S(42, 121.5, 31.22, 580, { date: "1937年10月", zh: "四行仓库", en: "Sihang Warehouse", nz: "谢晋元率八百壮士坚守四行仓库，振奋全国士气。", ne: "Xie Jinyuan's '800 Heroes' hold Sihang Warehouse — a morale boost nationwide.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "谢晋元", en: "Xie Jinyuan" }] }),
        S(65, 121.47, 31.2, 600, { date: "1937年11月", zh: "日军增兵", en: "Japanese Reinforcements", nz: "日军自杭州湾登陆，国军侧翼受威胁，被迫后撤。", ne: "Japanese land at Hangzhou Bay — the Nationalist flank is turned.", focus: ["japan_main"], side: "japan", assets: ["landing", "navy"] }),
        S(90, 121.47, 31.23, 720, { date: "1937年11月", zh: "粉碎三月亡华", en: "Three-Month Plan Shattered", nz: "淞沪鏖战三月，日军速胜计划破产，战事转入长期相持。", ne: "Three months of fighting shatters Japan's plan for a quick victory.", side: "both", fz: "鏖战三个月", fe: "Three months of battle" }),
      ],
    },
    "anti-japan/pingxingguan": {
      END_DAY: 100,
      analysis: A(
        "国共合作下，八路军一一五师在平型关伏击日军第五师团辎重部队；利用山地伏击，击毁车辆，歼敌千余人。",
        "日军沿平绥路推进，骄横轻敌；八路军熟悉地形，林彪指挥伏击战术得当。",
        "國共合作下首場勝仗，打破日軍不敗神話，提振全國士氣。"
      ),
      storyboard: [
        S(1, 113.95, 39.35, 680, { date: "1937年9月", zh: "平绥路战事", en: "Fighting on the Peiping–Suiyuan Line", nz: "日军第五师团沿平绥路西进，威胁山西。", ne: "Japanese 5th Division advances west on the Peiping–Suiyuan railway.", focus: ["japan_main"], side: "japan", commanders: [{ zh: "板垣征四郎", en: "Seishirō Itagaki" }] }),
        S(22, 113.98, 39.38, 620, { date: "1937年9月24日", zh: "八路军设伏", en: "Eighth Route Ambush", nz: "林彪率一一五师在平型关乔沟设伏，待敌辎重部队进入。", ne: "Lin Biao's 115th Division sets an ambush at Pingxingguan Pass.", focus: ["eighth_main"], side: "eighth", commanders: [{ zh: "林彪", en: "Lin Biao" }, { zh: "聂荣臻", en: "Nie Rongzhen" }] }),
        S(42, 113.95, 39.35, 580, { date: "1937年9月25日", zh: "平型关大捷", en: "Victory at Pingxingguan", nz: "八路军伏击日军辎重部队，击毁车辆数百，歼敌一千余人。", ne: "Ambush destroys hundreds of vehicles — over 1,000 Japanese killed.", focus: ["eighth_main", "japan_main"], side: "both", fz: "歼敌千余人", fe: "1,000+ enemy killed" }),
        S(65, 113.95, 39.35, 600, { date: "1937年9月", zh: "全国振奋", en: "Nationwide Morale Boost", nz: "平型关大捷消息传开，打破日军不可战胜神话，鼓舞抗战士气。", ne: "News of victory shatters the myth of Japanese invincibility.", focus: ["eighth_main"], side: "eighth" }),
        S(90, 113.95, 39.35, 720, { date: "1937年", zh: "国共合作首战", en: "First CCP–GMD Victory", nz: "平型关为国共合作抗日首场大胜，具有重要政治与军事意义。", ne: "Pingxingguan is the first major victory of the United Front against Japan.", side: "eighth" }),
      ],
    },
    "anti-japan/taierzhuang": {
      END_DAY: 100,
      analysis: A(
        "台儿庄战役：李宗仁指挥第五战区，以汤恩伯、孙连仲等部与日军矶谷师团鏖战；利用巷战与台儿庄城寨坚守，后合围反击，歼敌万余。",
        "日军沿津浦路南进，孤军深入；国军以空间换时间，各派系协同，民众支援。",
        "抗戰初期國軍在正面戰場取得的最大規模勝利。"
      ),
      storyboard: [
        S(1, 117.73, 34.56, 680, { date: "1938年3月", zh: "津浦路南进", en: "Japanese Drive South", nz: "日军矶谷师团沿津浦路南进，企图打通南北战线。", ne: "Japanese forces advance south on the Tianjin–Pukou railway.", focus: ["japan_main"], side: "japan", commanders: [{ zh: "矶谷廉介", en: "Isogai Rensuke" }] }),
        S(22, 117.75, 34.58, 620, { date: "1938年3月", zh: "台儿庄防御", en: "Defence of Taierzhuang", nz: "孙连仲第二集团军固守台儿庄，与日军逐屋巷战。", ne: "Sun Lianzhong's army holds Taierzhuang in brutal street fighting.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "李宗仁", en: "Li Zongren" }, { zh: "孙连仲", en: "Sun Lianzhong" }] }),
        S(42, 117.73, 34.55, 580, { date: "1938年3月下旬", zh: "汤恩伯反击", en: "Tang Enbo Counter-attacks", nz: "汤恩伯军团自侧翼出击，日军陷入前后夹击。", ne: "Tang Enbo strikes the Japanese flank — the enemy is caught in a pincer.", focus: ["gmd_main", "japan_main"], side: "both", commanders: [{ zh: "汤恩伯", en: "Tang Enbo" }] }),
        S(65, 117.73, 34.56, 560, { date: "1938年4月", zh: "台儿庄大捷", en: "Taierzhuang Victory", nz: "国军合围歼敌万余，缴获大批装备，日军溃退。", ne: "Nationalist forces encircle and kill 10,000+ — the Japanese retreat.", focus: ["gmd_main"], side: "gmd", fz: "歼敌万余", fe: "10,000+ enemy killed" }),
        S(90, 117.73, 34.56, 720, { date: "1938年", zh: "正面战场大胜", en: "Major Frontal Victory", nz: "台儿庄为抗战初期正面战场最大规模胜利，极大振奋人心。", ne: "Taierzhuang is the largest Nationalist victory on the main front in early war.", side: "gmd" }),
      ],
    },
    "anti-japan/hundred-regiments": {
      END_DAY: 100,
      analysis: A(
        "彭德怀指挥八路军一二〇、一二九、晋察冀等部，在华北发动百团大战；破袭正太、同蒲等铁路与公路，摧毁日军据点。",
        "日军占领区交通线漫长；八路军得民众支持，熟悉地形，擅长破袭战。",
        "中共八路軍在敵後戰場發動的最大規模破壞攻勢。"
      ),
      storyboard: [
        S(1, 113.58, 37.87, 720, { date: "1940年8月", zh: "破袭令下", en: "Offensive Order Issued", nz: "彭德怀下令发动百团大战，破袭华北日占区交通线。", ne: "Peng Dehuai orders the Hundred Regiments Offensive against North China rail lines.", focus: ["eighth_main"], side: "eighth", commanders: [{ zh: "彭德怀", en: "Peng Dehuai" }], fz: "八路军约四十团", fe: "~400 regiments" }),
        S(22, 113.6, 37.9, 660, { date: "1940年8月20日", zh: "正太路破袭", en: "Zhengding–Taiyuan Line Cut", nz: "八路军同时破袭正太铁路，摧毁桥梁、隧道与车站。", ne: "Forces simultaneously strike the Zhengding–Taiyuan railway.", focus: ["eighth_main"], side: "eighth" }),
        S(42, 113.55, 37.85, 600, { date: "1940年8–9月", zh: "据点拔除", en: "Strongpoints Destroyed", nz: "八路军攻克日军据点，破坏公路，缴获大批物资。", ne: "Japanese strongpoints fall — roads are cut, supplies captured.", focus: ["eighth_main", "japan_main"], side: "both" }),
        S(65, 113.58, 37.87, 580, { date: "1940年10月", zh: "日军反扫荡", en: "Japanese Counter-sweep", nz: "日军集中兵力反扫荡，八路军转入反“扫荡”作战。", ne: "Japan launches counter-sweeps — the Eighth Route Army shifts to defence.", focus: ["japan_main"], side: "japan" }),
        S(90, 113.58, 37.87, 720, { date: "1940年12月", zh: "敌后最大攻势", en: "Largest Rear-area Offensive", nz: "百团大战为八路军在敌后发动的最大规模破袭攻势，沉重打击日占交通。", ne: "The largest CCP offensive in the rear — Japanese supply lines are badly hurt.", side: "eighth" }),
      ],
    },

    /* ========== 内战 CIVIL-WAR ========== */
    "civil-war/liaoshen": {
      END_DAY: 100,
      analysis: A(
        "辽沈战役：林彪指挥东北野战军，先攻锦州切断国军退路，围歼廖耀湘兵团于黑山、大虎山；长春曾泽生起义，沈阳解放后东北全境易手。",
        "解放军经整编士气高昂，得民众支援；国军补给依赖海运，各城孤立，战略被动。",
        "解放軍率先控制東北全境，國軍精銳盡失，雙方兵力對比發生逆轉。"
      ),
      storyboard: [
        S(1, 123.4, 41.8, 720, { date: "1948年9月", zh: "攻锦打援", en: "Capture Jinzhou", nz: "东北野战军包围锦州，切断国军关内退路。", ne: "Northeast Field Army besieges Jinzhou — the Nationalist escape route south is severed.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "林彪", en: "Lin Biao" }, { zh: "罗荣桓", en: "Luo Ronghuan" }], fz: "解放军约七十万", fe: "~700,000 PLA troops" }),
        S(22, 121.1, 41.1, 660, { date: "1948年10月", zh: "锦州攻克", en: "Jinzhou Falls", nz: "经31小时激战，锦州陷落，范汉杰被俘。", ne: "After 31 hours of fighting, Jinzhou falls — Fan Hanjie is captured.", focus: ["pla_main"], side: "pla" }),
        S(42, 122.0, 41.5, 620, { date: "1948年10月", zh: "廖兵团覆灭", en: "Liao Yaoxiang Destroyed", nz: "廖耀湘兵团自沈阳西援，在黑山、大虎山被围歼。", ne: "Liao Yaoxiang's army is encircled and destroyed at Heishan.", focus: ["pla_main", "gmd_main"], side: "both", commanders: [{ zh: "廖耀湘", en: "Liao Yaoxiang" }] }),
        S(62, 123.4, 41.8, 580, { date: "1948年11月", zh: "长春起义", en: "Changchun Uprising", nz: "曾泽生率六十军起义，长春和平解放。", ne: "Zeng Zesheng's 60th Army mutinies — Changchun is liberated.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "曾泽生", en: "Zeng Zesheng" }] }),
        S(90, 123.4, 41.8, 750, { date: "1948年11月2日", zh: "东北全境解放", en: "Northeast Liberated", nz: "沈阳解放后，东北全境易手，解放军兵力超越国军。", ne: "Shenyang falls — all of Manchuria is lost; PLA numbers surpass the ROC.", side: "pla", fz: "歼敌四十七万", fe: "470,000 enemy eliminated" }),
      ],
    },
    "civil-war/huaihai": {
      END_DAY: 100,
      analysis: A(
        "淮海战役：华东、中原野战军以六十万对八十万，在黄泛区构筑纵深包围；杜聿明集团自徐州南撤被围于陈官庄，邱清泉、黄维兵团先后被歼。",
        "解放军得民众百万支前，后勤优于国军；国军徐蚌线崩溃，指挥分裂，士气低落。",
        "規模最大、最慘烈的一役。國軍主力被殲，長江以北盡歸共產黨。"
      ),
      storyboard: [
        S(1, 117.2, 34.25, 720, { date: "1948年11月", zh: "淮海开战", en: "Huaihai Campaign Opens", nz: "华东、中原野战军发起淮海战役，以徐州为中心展开大规模会战。", ne: "East China and Central Plains armies open the Huaihai Campaign centred on Xuzhou.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "粟裕", en: "Su Yu" }, { zh: "刘伯承", en: "Liu Bocheng" }], fz: "解放军六十万", fe: "600,000 PLA" }),
        S(22, 117.0, 34.3, 660, { date: "1948年11月", zh: "黄百韬被围", en: "Huang Baitao Encircled", nz: "黄百韬第七兵团被围于碾庄圩，徐蚌线切断。", ne: "Huang Baitao's 7th army is trapped at Nianzhuang — the Xuzhou–Bengbu line is cut.", focus: ["pla_main", "gmd_main"], side: "both" }),
        S(42, 116.8, 33.9, 620, { date: "1948年11–12月", zh: "双堆集歼灭黄维", en: "Huang Wei Destroyed", nz: "中原野战军围歼黄维第十二兵团于双堆集。", ne: "Huang Wei's 12th army is annihilated at Shuangduiji.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "邓小平", en: "Deng Xiaoping" }] }),
        S(62, 117.1, 34.0, 580, { date: "1949年1月", zh: "杜聿明集团覆灭", en: "Du Yuming Group Destroyed", nz: "杜聿明率邱清泉等部自徐州南撤，被围于陈官庄，全军覆没。", ne: "Du Yuming's retreating force is encircled at Chenguanzhuang and destroyed.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "杜聿明", en: "Du Yuming" }], fz: "国军五十五万被歼", fe: "550,000 ROC troops lost" }),
        S(90, 117.2, 34.25, 750, { date: "1949年1月10日", zh: "长江以北尽归共军", en: "North of Yangtze Lost", nz: "淮海战役结束，国军主力被歼，长江以北战略态势彻底逆转。", ne: "Huaihai ends — the ROC loses the north of the Yangtze.", side: "pla" }),
      ],
    },
    "civil-war/pingjin": {
      END_DAY: 100,
      analysis: A(
        "平津战役：东北野战军入关与华北部队合力，先围张家口、新保安，再围天津；傅作义困守北平，经谈判接受改编，北平和平解放。",
        "解放军以围而不攻争取和平；傅作义保全古城与文物，避免战火破坏北平。",
        "傅作義接受改編，和平解放北平，解放軍確立華北絕對優勢。"
      ),
      storyboard: [
        S(1, 116.4, 39.9, 700, { date: "1948年11月", zh: "平津战役开始", en: "Pingjin Campaign Opens", nz: "东北野战军入关，与华北部队合力分割包围平津地区。", ne: "Northeast Field Army enters the pass — Pingjin is encircled.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "林彪", en: "Lin Biao" }, { zh: "聂荣臻", en: "Nie Rongzhen" }] }),
        S(22, 115.0, 40.8, 640, { date: "1948年12月", zh: "新保安、张家口", en: "Xinbao'an and Zhangjiakou", nz: "解放军先攻新保安，歼灭郭景云三十五军，张家口守军突围被歼。", ne: "Guo Jingyun's 35th Army is destroyed at Xinbao'an — Zhangjiakou falls.", focus: ["pla_main"], side: "pla" }),
        S(42, 117.2, 39.1, 600, { date: "1949年1月", zh: "天津攻坚战", en: "Assault on Tianjin", nz: "解放军对天津发动总攻，陈长捷部被歼，傅作义退路断绝。", ne: "PLA storm Tianjin — Chen Changjie's garrison is wiped out.", focus: ["pla_main", "gmd_main"], side: "both", commanders: [{ zh: "傅作义", en: "Fu Zuoyi" }] }),
        S(62, 116.4, 39.9, 580, { date: "1949年1月", zh: "围而不攻北平", en: "Beiping Encircled", nz: "解放军围而不攻北平，与傅作义谈判，保护古城文物。", ne: "Beiping is besieged but not stormed — talks with Fu Zuoyi protect the ancient capital.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "傅作义", en: "Fu Zuoyi" }] }),
        S(90, 116.4, 39.9, 720, { date: "1949年1月31日", zh: "北平和平解放", en: "Peaceful Liberation of Beiping", nz: "傅作义接受改编，北平和平解放，华北局势底定。", ne: "Fu Zuoyi accepts reorganization — Beiping is liberated without a battle.", side: "pla", fz: "改编国军约二十余万", fe: "200,000+ troops reorganized" }),
      ],
    },
    "civil-war/crossing": {
      END_DAY: 100,
      analysis: A(
        "渡江战役：第二、第三野战军与第四野战军一部，在西起湖口、东至江阴的千里战线上强渡长江；四月二十三日占领南京，总统府插旗。",
        "国军长江防线指挥分裂，桂系与中央系矛盾；解放军渡江船队与民众支援充足，士气压倒。",
        "解放軍渡過長江攻佔南京，宣告中華民國政府在大陸的統治終結。"
      ),
      storyboard: [
        S(1, 118.78, 32.06, 720, { date: "1949年4月20日", zh: "千里渡江", en: "Crossing the Yangtze", nz: "第二、第三野战军在西起湖口、东至江阴的战线上强渡长江。", ne: "Second and Third Field Armies cross the Yangtze on a thousand-li front.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "陈毅", en: "Chen Yi" }, { zh: "粟裕", en: "Su Yu" }], assets: ["landing", "navy"], fz: "解放军百万", fe: "1,000,000+ PLA" }),
        S(22, 118.78, 32.06, 660, { date: "1949年4月21日", zh: "突破江防", en: "Breaching the Line", nz: "解放军在中下游多处突破国民党长江防线，向纵深挺进。", ne: "PLA breaches the Nationalist Yangtze line at multiple points.", focus: ["pla_main", "gmd_main"], side: "both", assets: ["landing"] }),
        S(42, 118.78, 32.06, 600, { date: "1949年4月23日", zh: "占领南京", en: "Nanjing Captured", nz: "第三野战军占领南京，总统府升起红旗。", ne: "Third Field Army enters Nanjing — the red flag rises over the presidential palace.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "陈毅", en: "Chen Yi" }] }),
        S(65, 121.47, 31.23, 640, { date: "1949年5月", zh: "解放上海", en: "Shanghai Liberated", nz: "第三野战军发起沪战役，上海宣告解放。", ne: "The Shanghai campaign ends — China's largest city is liberated.", focus: ["pla_main"], side: "pla" }),
        S(90, 118.78, 32.06, 750, { date: "1949年", zh: "大陆统治终结", en: "End of Mainland Rule", nz: "渡江战役宣告中华民国政府在大陆的统治终结，全国解放进入最后阶段。", ne: "The Yangtze crossing ends ROC rule on the mainland.", side: "pla", fz: "四月二十三占南京", fe: "Nanjing taken 23 April" }),
      ],
    },
  };
};
