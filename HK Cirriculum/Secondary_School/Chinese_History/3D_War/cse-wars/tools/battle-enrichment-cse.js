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
        "前202年，劉邦會合韓信、彭越、英布等部，把項羽圍在垓下。《史記·項羽本紀》記漢軍夜唱楚歌，楚軍士氣動搖。「十面埋伏」不見於《史記》對當日戰法的記載，不能當作垓下當日戰術。",
        "劉邦據關中與巴蜀，糧食和兵員較穩。英布在戰前已歸漢。項伯是項羽的叔父，鴻門宴時曾護過劉邦，不能與英布並列為垓下倒戈。項羽分封失當，彭越、英布不附，楚軍兵少食盡。",
        "楚漢相爭結束，項羽兵敗自刎，劉邦勝出並建立漢朝。"
      ),
      storyboard: [
        S(1, 117.2, 33.6, 680, { date: "前206年", zh: "楚漢對峙", en: "Chu–Han Standoff", nz: "項羽分封天下後東返彭城，劉邦據關中蓄勢，楚漢戰爭全面爆發。", ne: "After enfeoffing the realm, Xiang Yu returns east while Liu Bang holds Guanzhong — the Chu–Han war begins.", focus: ["han_main", "chu_main"], side: "both", commanders: [{ zh: "劉邦", en: "Liu Bang" }, { zh: "項羽", en: "Xiang Yu" }], fz: "楚漢主力對峙", fe: "Chu and Han main forces" }),
        S(22, 117.25, 33.65, 620, { date: "前202年冬", zh: "合圍垓下", en: "Encirclement at Gaixia", nz: "韓信、彭越、英布等合圍垓下，切斷楚軍退路與補給。", ne: "Han Xin, Peng Yue and Ying Bu encircle Gaixia, cutting Chu supply lines.", focus: ["han_main"], side: "han", commanders: [{ zh: "韓信", en: "Han Xin" }] }),
        S(42, 117.2, 33.58, 580, { date: "前202年", zh: "四面楚歌", en: "Chu Songs on Four Sides", nz: "漢軍夜唱楚歌，楚軍士卒思鄉，軍心動搖。", ne: "Han troops sing Chu songs at night — Chu soldiers lose heart.", focus: ["chu_main"], side: "chu", commanders: [{ zh: "項羽", en: "Xiang Yu" }] }),
        S(62, 117.18, 33.55, 540, { date: "前202年", zh: "項羽突圍", en: "Xiang Yu Breaks Out", nz: "《史記》記項羽夜潰圍，騎從者八百餘人，至東城僅餘二十八騎，其後自刎烏江。", ne: "Xiang Yu breaks out with 800 cavalry, then takes his life at the Wu River.", focus: ["chu_main"], side: "chu", fz: "楚軍潰敗", fe: "Chu army collapses" }),
        S(85, 117.2, 33.6, 700, { date: "前202年", zh: "漢朝建立", en: "Han Dynasty Founded", nz: "劉邦於前202年稱帝，國號漢。", ne: "Liu Bang becomes emperor, establishes Chang'an as capital — four centuries of Han rule begin.", focus: ["han_main"], side: "han", commanders: [{ zh: "劉邦", en: "Liu Bang" }] }),
      ],
    },
    "qin-han/mobei": {
      END_DAY: 100,
      analysis: A(
        "漢武帝遣衛青、霍去病率騎兵遠征漠北，分路出擊匈奴王庭；霍去病封狼居胥，大破左賢王，匈奴遠徙漠北。",
        "漢朝經文景積蓄，馬政與財政支撐大規模遠征；匈奴內部分裂，單于勢力削弱。",
        "前119年衛青、霍去病擊破匈奴主力，單于部遠徙。河西走廊與西域都護不是此戰的直接結果。"
      ),
      storyboard: [
        S(1, 110.0, 43.0, 750, { date: "前119年", zh: "漢軍出塞", en: "Han Armies Cross the Desert", nz: "衛青、霍去病各率五萬騎出擊，直搗漠北匈奴腹地。", ne: "Wei Qing and Huo Qubing each lead 50,000 cavalry deep into the northern steppe.", focus: ["han_main"], side: "han", commanders: [{ zh: "衛青", en: "Wei Qing" }, { zh: "霍去病", en: "Huo Qubing" }], fz: "漢騎兵約十萬", fe: "~100,000 Han cavalry" }),
        S(25, 109.5, 43.5, 680, { date: "前119年", zh: "漠北決戰", en: "Battle in the Gobi", nz: "漢軍與匈奴主力在漠北遭遇，以快騎衝鋒與迂回包抄破敵。", ne: "Han and Xiongnu clash in the Gobi — swift cavalry charges decide the day.", focus: ["han_main", "xiongnu_main"], side: "both" }),
        S(45, 110.5, 44.2, 620, { date: "前119年", zh: "封狼居胥", en: "Fenglang Juxu", nz: "霍去病追擊至狼居胥山，祭天告成，匈奴遠遁。", ne: "Huo Qubing reaches Langjuxu Mountain, performs the rite of victory — the Xiongnu flee far north.", focus: ["han_main"], side: "han", commanders: [{ zh: "霍去病", en: "Huo Qubing" }] }),
        S(65, 109.8, 43.2, 600, { date: "前119年", zh: "單于北徙", en: "Chanyu Retreats North", nz: "匈奴單于率部遠徙，漠南無王庭，邊患大減。", ne: "The Chanyu withdraws far north — the southern steppe is cleared of the royal court.", focus: ["xiongnu_main"], side: "xiongnu" }),
        S(90, 110.0, 43.0, 720, { date: "前119年後", zh: "絲路暢通", en: "Silk Road Secured", nz: "前119年這一戰之後，匈奴王庭遠徙，漠南的軍事壓力減輕。河西走廊是前121年霍去病河西之戰打下的，西域都護要到前60年才設置，都不是前119年此戰的直接結果。", ne: "Victory secures the Hexi Corridor — Silk Road trade and frontier settlement expand.", side: "han" }),
      ],
    },

    /* ========== 魏晉南北朝 WEIJIN ========== */
    "weijin/guandu": {
      END_DAY: 100,
      analysis: A(
        "袁紹率十餘萬大軍南下，曹操以少數精銳在官渡對峙；許攸投曹，曹操奇襲烏巢焚燒袁軍糧草，袁軍潰散。",
        "袁紹據有河北四州，兵多糧足但指揮分裂；曹操挾天子以令諸侯，精兵善戰、謀士雲集。",
        "曹操以少勝多擊敗袁紹，奠定統一北方基礎。"
      ),
      storyboard: [
        S(1, 113.9, 34.7, 680, { date: "200年", zh: "袁紹南下", en: "Yuan Shao Advances South", nz: "袁紹率大軍渡河南下，曹操以官渡為屏障迎戰。", ne: "Yuan Shao crosses the Yellow River south — Cao Cao holds the line at Guandu.", focus: ["yuan_main"], side: "yuan", commanders: [{ zh: "袁紹", en: "Yuan Shao" }], fz: "袁軍十餘萬", fe: "100,000+ Yuan troops" }),
        S(22, 113.85, 34.72, 620, { date: "200年", zh: "官渡對峙", en: "Stalemate at Guandu", nz: "兩軍相持數月，曹操兵少糧絀，形勢危急。", ne: "Months of stalemate — Cao Cao is outnumbered and short of supplies.", focus: ["cao_main", "yuan_main"], side: "both", commanders: [{ zh: "曹操", en: "Cao Cao" }] }),
        S(42, 113.95, 34.68, 580, { date: "200年", zh: "許攸投曹", en: "Xu You Defects", nz: "袁紹謀士許攸投曹操，獻計偷襲烏巢糧屯。", ne: "Yuan Shao's adviser Xu You defects and reveals the Wuchao granary.", focus: ["cao_main"], side: "cao", commanders: [{ zh: "許攸", en: "Xu You" }] }),
        S(62, 114.05, 34.75, 550, { date: "200年", zh: "火燒烏巢", en: "Burning Wuchao", nz: "曹操親率精銳夜襲烏巢，焚燒袁軍糧草，袁軍士氣崩潰。", ne: "Cao Cao raids Wuchao by night and burns Yuan's supplies — Yuan's army collapses.", focus: ["cao_main"], side: "cao", fz: "袁軍糧盡潰散", fe: "Yuan army routs without food" }),
        S(85, 113.9, 34.7, 700, { date: "200年後", zh: "北方統一", en: "North Unification Begins", nz: "200年烏巢糧草被焚後袁紹軍潰退。曹操其後用數年取得河北。曹丕稱帝是220年的事。", ne: "Guandu opens the path to unifying the north — the foundation of Cao Wei.", focus: ["cao_main"], side: "cao", commanders: [{ zh: "曹操", en: "Cao Cao" }] }),
      ],
    },
    "weijin/chibi": {
      END_DAY: 100,
      analysis: A(
        "208年曹操沿江東下。火攻由周瑜採黃蓋之議執行，曹軍其後北撤。東風、連環計和諸葛亮定計是《三國演義》的情節，不能寫成史實。",
        "曹操雖據北方，但水軍不習江戰、疫疾流行；孫劉聯盟得長江天險與江東水師之長。",
        "208年孫劉聯軍擊退曹操南下。三國稱帝在220年至229年，不把赤壁寫成當日已確立鼎立。"
      ),
      storyboard: [
        S(1, 113.9, 29.7, 700, { date: "208年", zh: "曹操南下", en: "Cao Cao Moves South", nz: "曹操降劉琮、得荊州，率二十餘萬大軍東進，威脅江東。", ne: "After taking Jing Province, Cao Cao advances east with 200,000+ men.", focus: ["cao_main"], side: "cao", commanders: [{ zh: "曹操", en: "Cao Cao" }], assets: ["navy"], fz: "曹軍水陸二十餘萬", fe: "200,000+ Cao forces" }),
        S(20, 113.88, 29.72, 640, { date: "208年", zh: "孫劉聯盟", en: "Sun–Liu Alliance", nz: "魯肅主張聯劉抗曹，周瑜主持軍務。諸葛亮出使江東見於《三國志》，但火攻之計不是由他制定。", ne: "Zhuge Liang and Lu Su forge the Sun–Liu alliance against Cao Cao.", focus: ["allied_main"], side: "allied", commanders: [{ zh: "周瑜", en: "Zhou Yu" }, { zh: "諸葛亮", en: "Zhuge Liang" }] }),
        S(40, 113.92, 29.68, 580, { date: "208年冬", zh: "黃蓋火攻", en: "Huang Gai's Fire Attack", nz: "史書記黃蓋向周瑜建議火攻，並以火船進攻曹軍。東風、連環計是《三國演義》情節，不能當作赤壁當日史實。", ne: "Huang Gai's feigned surrender — fire ships burn Cao's chained fleet in the east wind.", focus: ["allied_main", "cao_main"], side: "both", commanders: [{ zh: "黃蓋", en: "Huang Gai" }], assets: ["navy"] }),
        S(62, 113.9, 29.65, 560, { date: "208年", zh: "曹軍潰敗", en: "Cao Cao Routed", nz: "火攻後曹軍向北撤退，損失很重。華容道是《三國演義》的情節，不能寫成史實。", ne: "Cao's army routs and retreats north via Huarong Road with heavy losses.", focus: ["cao_main"], side: "cao", assets: ["navy"] }),
        S(85, 113.9, 29.7, 720, { date: "208年後", zh: "三國雛形", en: "Three Kingdoms Emerge", nz: "208年曹軍北撤，未能吞併江東。魏、蜀、吳稱帝在220年至229年，鼎立不是赤壁當日確立。", ne: "Red Cliffs blocks unification — the tripartite division of China takes shape.", side: "both" }),
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
        S(1, 117.28, 31.86, 680, { date: "383年", zh: "苻堅南征", en: "Fu Jian Invades South", nz: "前秦苻堅自長安南下，號稱戎卒百萬、投鞭斷流。百萬是當時的說法，不是點算後的實數。", ne: "Former Qin ruler Fu Jian advances south with a vast army from Chang'an.", focus: ["qin_main"], side: "qin", commanders: [{ zh: "苻堅", en: "Fu Jian" }], fz: "前秦號稱百萬", fe: "Former Qin claims 1,000,000 men" }),
        S(22, 117.25, 31.88, 620, { date: "383年11月", zh: "八公山", en: "Bagong Mountain", nz: "戰前，苻堅在壽陽城頭望八公山，把山上草木看成晉兵。草木皆兵發生在交戰之前，不是潰退的時候。", ne: "Eastern Jin Beifu troops face Former Qin across the Fei River.", focus: ["jin_main", "qin_main"], side: "both", commanders: [{ zh: "謝玄", en: "Xie Xuan" }] }),
        S(42, 117.3, 31.85, 580, { date: "383年11月", zh: "淝水接戰", en: "Fighting at the Fei", nz: "秦軍在淝水應晉軍之請稍退，陣腳大亂，前鋒統帥苻融陣亡。", ne: "The Qin army falls back, the line breaks, and Fu Rong is killed.", focus: ["qin_main"], side: "qin" }),
        S(62, 117.28, 31.9, 560, { date: "383年", zh: "北府兵追擊", en: "Beifu Pursuit", nz: "謝玄、謝石率北府兵追擊。陣亡的是苻融，不是張淵。潰退時士卒風聲鶴唳，以為追兵。", ne: "Xie Xuan's Beifu army pursues — Former Qin's dream of unification shatters.", focus: ["jin_main"], side: "jin", commanders: [{ zh: "謝石", en: "Xie Shi" }] }),
        S(88, 117.28, 31.86, 700, { date: "383年後", zh: "南北分立", en: "North–South Division", nz: "383年淝水戰後，前秦前鋒瓦解，苻堅逃回北方，東晉仍保有江南。", ne: "Former Qin collapses; the Jin survives — north and south remain divided.", side: "jin" }),
      ],
    },

    /* ========== 隋唐 SUI-TANG ========== */
    "sui-tang/anshi": {
      END_DAY: 120,
      analysis: A(
        "安祿山、史思明以范陽、平盧、河東三鎮兵力起兵，攻陷洛陽、長安；唐軍與回紇聯兵反攻，歷時七年方平叛，但藩鎮勢力坐大。",
        "開元盛世後唐朝府兵制瓦解，邊將握重兵；安史之亂耗盡國力，中央對藩鎮控制力大減。",
        "叛亂平定後，河朔等鎮仍由節度使掌兵，朝廷沒有收回這些兵權。"
      ),
      storyboard: [
        S(1, 116.2, 39.7, 700, { date: "755年", zh: "安祿山起兵", en: "An Lushan Rebellion Begins", nz: "安祿山以討楊國忠為名，自范陽起兵南下。楊貴妃後來在馬嵬被殺，是起兵之後的事，不能寫成起兵原因。", ne: "An Lushan rebels with 150,000 troops from three frontier commands.", focus: ["rebel_main"], side: "rebel", commanders: [{ zh: "安祿山", en: "An Lushan" }], fz: "叛軍約十五萬", fe: "~150,000 rebels" }),
        S(20, 112.45, 34.62, 650, { date: "756年", zh: "攻陷洛陽", en: "Luoyang Falls", nz: "叛軍攻佔東都洛陽，安祿山稱大燕皇帝。", ne: "Rebels capture Luoyang — An Lushan declares himself emperor of Yan.", focus: ["rebel_main"], side: "rebel" }),
        S(38, 108.94, 34.26, 600, { date: "756年", zh: "馬嵬驛變", en: "Mawei Incident", nz: "唐玄宗西逃，禁軍譁變，楊國忠、楊貴妃被殺，玄宗入蜀。", ne: "Emperor Xuanzong flees west — troops mutiny, Yang Guozhong and Consort Yang die.", focus: ["tang_main"], side: "tang", commanders: [{ zh: "唐玄宗", en: "Emperor Xuanzong" }] }),
        S(55, 108.94, 34.26, 580, { date: "756年", zh: "長安陷落", en: "Chang'an Lost", nz: "叛軍佔領長安，太子李亨即位于靈武，號肅宗，組織平叛。", ne: "Rebels take Chang'an — Crown Prince Li Heng becomes Emperor Suzong at Lingwu.", focus: ["rebel_main", "tang_main"], side: "both", commanders: [{ zh: "唐肅宗", en: "Emperor Suzong" }] }),
        S(75, 109.5, 34.3, 620, { date: "757–763年", zh: "回紇助唐平叛", en: "Uighur Aid and Counter-offensive", nz: "郭子儀、李光弼等率唐軍與回紇聯兵，收復兩京，史思明繼叛後亦被誅。", ne: "Guo Ziyi and Li Guangbi, with Uighur allies, recapture the capitals.", focus: ["tang_main"], side: "tang", commanders: [{ zh: "郭子儀", en: "Guo Ziyi" }, { zh: "李光弼", en: "Li Guangbi" }] }),
        S(105, 108.94, 34.26, 720, { date: "763年", zh: "藩鎮坐大", en: "Warlord Era Begins", nz: "763年史朝義敗死，兩京在此之前已經收復。河朔等地節度使仍掌兵。", ne: "Rebellion ends but regional warlords hold real power — Tang decline accelerates.", side: "both", fz: "戰亂歷時七年", fe: "Seven years of civil war" }),
      ],
    },

    /* ========== 宋元 SONG-YUAN ========== */
    "song-yuan/yamen": {
      END_DAY: 100,
      analysis: A(
        "1279年張弘範以水師圍崖山，張世傑以船艦結陣護衛趙昺。元軍切斷淡水並南北夾擊，宋軍大潰。這不是赤壁式火攻。張世傑曾率餘艦突圍。",
        "南宋殘餘船隊退到崖山，淡水和糧食都缺。元軍水師已經完成包圍，掌握海戰的主動。",
        "陸秀夫負趙昺投海，南宋朝廷終結。張世傑曾突圍，其後在海上遇風而死。失敗不是赤壁式火攻。"
      ),
      storyboard: [
        S(1, 113.05, 22.28, 680, { date: "1279年", zh: "崖山合圍", en: "Siege of Yamen", nz: "元將張弘範率水師圍困崖山，南宋張世傑率艦隊護衛少帝趙昺。", ne: "Yuan admiral Zhang Hongfan blockades Yamen — Song admiral Zhang Shijie guards Emperor Bing.", focus: ["yuan_main", "song_main"], side: "both", commanders: [{ zh: "張弘範", en: "Zhang Hongfan" }, { zh: "張世傑", en: "Zhang Shijie" }], assets: ["navy"], fz: "宋軍艦千餘", fe: "1,000+ Song ships" }),
        S(22, 113.08, 22.25, 620, { date: "1279年2月", zh: "斷糧與圍困", en: "Blockade and Starvation", nz: "元軍切斷宋軍的淡水和補給，宋軍困在海上，形勢日緊。", ne: "Yuan forces cut fresh water and supplies — the Song fleet weakens daily.", focus: ["song_main"], side: "song", assets: ["navy"] }),
        S(42, 113.05, 22.22, 580, { date: "1279年3月19日", zh: "南北夾擊", en: "Naval Decisive Battle", nz: "元軍從南北夾擊。宋軍大艦以繩索相連，難以散開，陣勢崩潰。這不是赤壁式火攻。張世傑其後曾突圍。", ne: "Yuan fire-ships attack chained Song vessels — the Song fleet is destroyed.", focus: ["yuan_main", "song_main"], side: "both", assets: ["navy"] }),
        S(65, 113.05, 22.2, 550, { date: "1279年3月19日", zh: "陸秀夫負帝投海", en: "Lu Xiufu's Final Act", nz: "陸秀夫背負八歲帝昺投海殉國，楊太後亦投海，南宋滅亡。", ne: "Lu Xiufu carries the eight-year-old emperor into the sea — the Song dynasty ends.", focus: ["song_main"], side: "song", commanders: [{ zh: "陸秀夫", en: "Lu Xiufu" }, { zh: "趙昺", en: "Emperor Bing" }] }),
        S(90, 113.05, 22.28, 720, { date: "1279年", zh: "元朝一統", en: "Yuan Unification Complete", nz: "陸秀夫負帝投海。張世傑曾突圍，其後遇風而死。", ne: "After Yamen, the Yuan completes unification of China.", side: "yuan" }),
      ],
    },

    /* ========== 明清 MING-QING ========== */
    "ming-qing/tumu": {
      END_DAY: 100,
      analysis: A(
        "明英宗在宦官王振慫恿下親征瓦剌。明人記載人數為五十萬，這是記載，不是現代清點。決戰通說在公曆1449年9月1日，也先在土木堡擊潰明軍，英宗被俘。",
        "瓦剌也先已統一蒙古諸部，騎兵機動快。明朝軍政受王振左右。出兵人數的五十萬是記載。",
        "明英宗親征被瓦剌俘虜，明朝國勢由盛轉衰，轉取守勢。"
      ),
      storyboard: [
        S(1, 115.25, 40.45, 680, { date: "1449年", zh: "英宗親征", en: "Emperor's Personal Campaign", nz: "明英宗在王振慫恿下親征瓦剌。明人記載作五十萬，這是記載數字，不是現代清點人數。", ne: "Emperor Yingzong leads 500,000 troops north against the Oirats.", focus: ["ming_main"], side: "ming", commanders: [{ zh: "明英宗", en: "Emperor Yingzong" }, { zh: "王振", en: "Wang Zhen" }], fz: "記載約五十萬", fe: "recorded figure of about 500,000" }),
        S(22, 115.28, 40.48, 620, { date: "1449年8月", zh: "土木堡進軍", en: "Advance to Tumu", nz: "明軍倉促北進，糧草不繼，士氣低落。", ne: "The Ming army advances hastily — supplies run short, morale falls.", focus: ["ming_main"], side: "ming" }),
        S(42, 115.25, 40.45, 580, { date: "公曆1449年9月1日", zh: "土木堡之變", en: "Disaster at Tumu", nz: "公曆1449年9月1日（夏曆正統十四年八月十五日），也先的瓦剌騎兵在土木堡擊潰明軍，英宗被俘。不是公曆9月8日。", ne: "Esen's Oirat cavalry ambushes Tumu — the Ming routs, the emperor is captured.", focus: ["oirat_main", "ming_main"], side: "both", commanders: [{ zh: "也先", en: "Esen" }] }),
        S(65, 116.4, 39.9, 600, { date: "1449年", zh: "于謙保衛北京", en: "Yu Qian Defends Beijing", nz: "郕王即位為景帝，于謙組織北京保衛戰，擊退也先。", ne: "The Prince of Cheng becomes Emperor Jingtai — Yu Qian repels Esen from Beijing.", focus: ["ming_main"], side: "ming", commanders: [{ zh: "于謙", en: "Yu Qian" }] }),
        S(90, 115.25, 40.45, 720, { date: "1449年後", zh: "由攻轉守", en: "From Offense to Defense", nz: "土木堡之後，明朝對蒙古改為守勢，並加強邊牆。五十萬是記載中的人數。", ne: "After Tumu, Ming turns defensive — the Great Wall is reinforced.", side: "ming" }),
      ],
    },
    "ming-qing/sarhu": {
      END_DAY: 100,
      analysis: A(
        "努爾哈赤以八旗集中一路迎擊。明軍四路不能同時到達。夏曆三月初一至初四，三路先後戰敗，不是一日三路皆敗。通行表述是「憑爾幾路來，我只一路去」。",
        "明軍分路冒進，指揮不能協同。後金以八旗集中兵力，熟悉遼東地形。",
        "後金以八旗集中一路，明軍三路先後戰敗，遼東的軍事主動轉到後金。"
      ),
      storyboard: [
        S(1, 124.1, 41.9, 700, { date: "1619年", zh: "明軍四路進攻", en: "Four Ming Columns Advance", nz: "明廷集全國精銳，分四路進擊後金，意圖一舉蕩平遼東。", ne: "The Ming dispatches four columns to crush the Later Jin in Liaodong.", focus: ["ming_main"], side: "ming", commanders: [{ zh: "楊鎬", en: "Yang Hao" }], fz: "明軍約十萬", fe: "~100,000 Ming troops" }),
        S(22, 124.15, 41.92, 640, { date: "夏曆三月初一", zh: "薩爾滸初戰", en: "First Clash at Sarhu", nz: "夏曆萬曆四十七年三月初一（公曆1619年4月14日），後金以八旗集中兵力，先破杜松西路。通行表述是「憑爾幾路來，我只一路去」。", ne: "Nurhaci counter-attacks in detail — the western Ming column is destroyed.", focus: ["jin_main"], side: "jin", commanders: [{ zh: "努爾哈赤", en: "Nurhaci" }] }),
        S(42, 124.1, 41.88, 600, { date: "夏曆三月初二至初四", zh: "三路先後敗", en: "Three Columns, Successive Days", nz: "夏曆三月初二（公曆1619年4月15日）馬林北路敗，三月初四（公曆4月17日）劉綎東路敗。李如柏南路未決戰而退。不是一日三路皆敗。公曆與夏曆分寫。", ne: "Three Ming columns are annihilated in two days — only one escapes.", focus: ["ming_main", "jin_main"], side: "both" }),
        S(65, 124.1, 41.9, 580, { date: "1619年", zh: "遼東主動權", en: "Liaodong Initiative", nz: "後金完全掌握遼東戰略主動，明朝喪失進攻能力。", ne: "The Later Jin holds the strategic initiative — Ming goes on the defensive.", focus: ["jin_main"], side: "jin", commanders: [{ zh: "努爾哈赤", en: "Nurhaci" }] }),
        S(90, 124.1, 41.9, 720, { date: "1619年後", zh: "明亡前奏", en: "Prelude to Ming Fall", nz: "三路先後戰敗後，後金取得遼東的軍事主動。南路沒有決戰。", ne: "Sarhu sounds the knell of the Ming — the Later Jin expands rapidly.", side: "jin" }),
      ],
    },

    /* ========== 晚清 LATE-QING ========== */
    "late-qing/yellow-sea": {
      END_DAY: 100,
      analysis: A(
        "1894年9月17日，北洋水師與日本聯合艦隊在大東溝外遭遇，以艦炮交戰。致遠、經遠等艦沉沒，北洋艦隊損失多艦。日本聯合艦隊司令是伊東祐亨。",
        "日本艦隊速射炮和運動佔優。北洋艦隊在彈種、航速和指揮協調上不及對方。",
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
        "日軍海陸合圍威海衛，以魚雷艇夜襲北洋泊地。劉公島被圍，丁汝昌拒絕投降後自盡，殘餘艦船向日軍交出。",
        "北洋艦隊經黃海一役已損失多艦。日軍佔領威海灣兩岸炮台，切斷陸上補給。",
        "1895年2月，北洋殘餘艦船在威海衛向日軍投降。"
      ),
      storyboard: [
        S(1, 122.12, 37.51, 680, { date: "1895年1月", zh: "威海被圍", en: "Weihaiwei Besieged", nz: "日軍佔領威海灣南北炮台，海陸合圍北洋水師泊地劉公島。", ne: "Japan seizes forts on both sides of Weihai Bay — the Beiyang Fleet is trapped.", focus: ["japan_main"], side: "japan", commanders: [{ zh: "伊東祐亨", en: "Itō Sukeyuki" }], assets: ["navy"] }),
        S(22, 122.15, 37.48, 620, { date: "1895年2月", zh: "魚雷夜襲", en: "Torpedo Night Attack", nz: "日軍魚雷艇夜襲北洋泊地，來遠、威遠等艦被擊沉或重創。", ne: "Japanese torpedo boats strike at night — several Beiyang ships are sunk.", focus: ["beiyang_main"], side: "beiyang", assets: ["navy"] }),
        S(42, 122.12, 37.5, 580, { date: "1895年2月", zh: "劉公島孤守", en: "Isolated on Liugong Island", nz: "北洋困守劉公島，陸路斷絕，士兵譁變，丁汝昌拒絕投降。", ne: "Trapped on Liugong Island with mutiny ashore — Ding Ruchang refuses surrender.", focus: ["beiyang_main"], side: "beiyang", commanders: [{ zh: "丁汝昌", en: "Ding Ruchang" }] }),
        S(62, 122.12, 37.51, 550, { date: "1895年2月12日", zh: "丁汝昌殉國", en: "Ding Ruchang's Death", nz: "丁汝昌服毒自盡，北洋水師向日軍投降，全軍覆沒。", ne: "Ding Ruchang takes poison — the Beiyang Fleet surrenders, ending as a force.", focus: ["beiyang_main"], side: "beiyang", commanders: [{ zh: "丁汝昌", en: "Ding Ruchang" }] }),
        S(88, 122.12, 37.51, 720, { date: "1895年", zh: "洋務運動失敗", en: "Self-Strengthening Fails", nz: "1895年2月，丁汝昌死，北洋殘艦在劉公島向日軍投降。", ne: "Weihaiwei marks the failure of military modernization — the Treaty of Shimonoseki follows.", side: "both", fz: "北洋水師覆沒", fe: "Beiyang Fleet destroyed" }),
      ],
    },

    /* ========== 抗日 ANTI-JAPAN ========== */
    "anti-japan/songhu": {
      END_DAY: 100,
      analysis: A(
        "1937年8月13日日軍進攻上海，國軍在閘北、江灣等地作戰約三個月，其後撤出上海。長期相持的通說在武漢會戰之後。",
        "日軍可從長江口增兵。國軍在上海的裝備較齊，但海空處於劣勢，傷亡很大。",
        "上海作戰約三個月後國軍撤出。日軍仍繼續進攻南京、徐州、武漢。"
      ),
      storyboard: [
        S(1, 121.47, 31.23, 680, { date: "1937年8月13日", zh: "淞滬開戰", en: "Battle of Shanghai Opens", nz: "日軍進攻上海，國軍在閘北反擊，淞滬會戰開始。", ne: "Japan attacks Shanghai — Nationalist divisions counter-attack in Zhabei.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "張治中", en: "Zhang Zhizhong" }, { zh: "蔣介石", en: "Chiang Kai-shek" }], fz: "國軍約七十萬", fe: "~700,000 ROC troops" }),
        S(22, 121.48, 31.25, 620, { date: "1937年8–9月", zh: "閘北江灣血戰", en: "Bloody Fighting in Zhabei", nz: "雙方逐屋爭奪，國軍反覆衝鋒，傷亡極大。", ne: "House-to-house fighting — both sides suffer enormous casualties.", focus: ["gmd_main", "japan_main"], side: "both", assets: ["air"] }),
        S(42, 121.5, 31.22, 580, { date: "1937年10月", zh: "四行倉庫", en: "Sihang Warehouse", nz: "謝晉元率部固守四行倉庫。該部約一個營，研究多記四百餘人；「八百壯士」是紀念數字，要和實際人數分開。", ne: "Xie Jinyuan's '800 Heroes' hold Sihang Warehouse — a morale boost nationwide.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "謝晉元", en: "Xie Jinyuan" }] }),
        S(65, 121.47, 31.2, 600, { date: "1937年11月", zh: "日軍增兵", en: "Japanese Reinforcements", nz: "日軍自杭州灣登陸，國軍側翼受威脅，被迫後撤。", ne: "Japanese land at Hangzhou Bay — the Nationalist flank is turned.", focus: ["japan_main"], side: "japan", assets: ["landing", "navy"] }),
        S(90, 121.47, 31.23, 720, { date: "1937年11月", zh: "撤出上海", en: "Three-Month Plan Shattered", nz: "淞滬作戰約三個月後國軍撤出上海。日軍仍進攻南京、徐州、武漢。長期相持的通說在武漢會戰之後，不能寫成戰後立即相持。", ne: "Three months of fighting shatters Japan's plan for a quick victory.", side: "both", fz: "鏖戰三個月", fe: "Three months of battle" }),
      ],
    },
    "anti-japan/pingxingguan": {
      END_DAY: 100,
      analysis: A(
        "國共合作下，八路軍一一五師在平型關伏擊日軍第五師團辎重部隊；利用山地伏擊，擊毁車辆，殲敵千餘人。",
        "日軍沿平绥路推進，骄横轻敵；八路軍熟悉地形，林彪指揮伏擊戰術得当。",
        "國共合作下首場勝仗，打破日軍不敗神話，提振全國士氣。"
      ),
      storyboard: [
        S(1, 113.95, 39.35, 680, { date: "1937年9月", zh: "平绥路戰事", en: "Fighting on the Peiping–Suiyuan Line", nz: "日軍第五師團沿平绥路西進，威脅山西。", ne: "Japanese 5th Division advances west on the Peiping–Suiyuan railway.", focus: ["japan_main"], side: "japan", commanders: [{ zh: "板垣征四郎", en: "Seishirō Itagaki" }] }),
        S(22, 113.98, 39.38, 620, { date: "1937年9月24日", zh: "八路軍設伏", en: "Eighth Route Ambush", nz: "林彪率一一五師在平型關乔沟設伏，待敵辎重部隊進入。", ne: "Lin Biao's 115th Division sets an ambush at Pingxingguan Pass.", focus: ["eighth_main"], side: "eighth", commanders: [{ zh: "林彪", en: "Lin Biao" }, { zh: "聶榮臻", en: "Nie Rongzhen" }] }),
        S(42, 113.95, 39.35, 580, { date: "1937年9月25日", zh: "平型關大捷", en: "Victory at Pingxingguan", nz: "八路軍伏擊日軍辎重部隊，擊毁車辆数百，殲敵一千餘人。", ne: "Ambush destroys hundreds of vehicles — over 1,000 Japanese killed.", focus: ["eighth_main", "japan_main"], side: "both", fz: "殲敵千餘人", fe: "1,000+ enemy killed" }),
        S(65, 113.95, 39.35, 600, { date: "1937年9月", zh: "全國振奮", en: "Nationwide Morale Boost", nz: "平型關大捷消息传開，打破日軍不可戰勝神話，鼓舞抗戰士氣。", ne: "News of victory shatters the myth of Japanese invincibility.", focus: ["eighth_main"], side: "eighth" }),
        S(90, 113.95, 39.35, 720, { date: "1937年", zh: "國共合作首戰", en: "First CCP–GMD Victory", nz: "平型關為國共合作抗日首场大勝，具有重要政治與軍事意義。", ne: "Pingxingguan is the first major victory of the United Front against Japan.", side: "eighth" }),
      ],
    },
    "anti-japan/taierzhuang": {
      END_DAY: 100,
      analysis: A(
        "臺兒莊戰役：李宗仁指揮第五戰區，以湯恩伯、孫連仲等部與日軍磯谷師團鏖戰；利用巷戰與臺兒莊城寨堅守，後合圍反擊，殲敵萬餘。",
        "日軍沿津浦路南進，孤軍深入；國軍以空間换時間，各派系協同，民眾支援。",
        "抗戰初期國軍在正面戰場取得的最大規模勝利。"
      ),
      storyboard: [
        S(1, 117.73, 34.56, 680, { date: "1938年3月", zh: "津浦路南進", en: "Japanese Drive South", nz: "日軍磯谷師團沿津浦路南進，企圖打通南北戰線。", ne: "Japanese forces advance south on the Tianjin–Pukou railway.", focus: ["japan_main"], side: "japan", commanders: [{ zh: "磯谷廉介", en: "Isogai Rensuke" }] }),
        S(22, 117.75, 34.58, 620, { date: "1938年3月", zh: "臺兒莊防御", en: "Defence of Taierzhuang", nz: "孫連仲第二集團軍固守臺兒莊，與日軍逐屋巷戰。", ne: "Sun Lianzhong's army holds Taierzhuang in brutal street fighting.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "李宗仁", en: "Li Zongren" }, { zh: "孫連仲", en: "Sun Lianzhong" }] }),
        S(42, 117.73, 34.55, 580, { date: "1938年3月下旬", zh: "湯恩伯反擊", en: "Tang Enbo Counter-attacks", nz: "湯恩伯軍團自側翼出擊，日軍陷入前後夾擊。", ne: "Tang Enbo strikes the Japanese flank — the enemy is caught in a pincer.", focus: ["gmd_main", "japan_main"], side: "both", commanders: [{ zh: "湯恩伯", en: "Tang Enbo" }] }),
        S(65, 117.73, 34.56, 560, { date: "1938年4月", zh: "臺兒莊大捷", en: "Taierzhuang Victory", nz: "國軍合圍殲敵萬餘，繳獲大批裝備，日軍潰退。", ne: "Nationalist forces encircle and kill 10,000+ — the Japanese retreat.", focus: ["gmd_main"], side: "gmd", fz: "殲敵萬餘", fe: "10,000+ enemy killed" }),
        S(90, 117.73, 34.56, 720, { date: "1938年", zh: "正面戰场大勝", en: "Major Frontal Victory", nz: "臺兒莊為抗戰初期正面戰场最大規模勝利，極大振奮人心。", ne: "Taierzhuang is the largest Nationalist victory on the main front in early war.", side: "gmd" }),
      ],
    },
    "anti-japan/hundred-regiments": {
      END_DAY: 100,
      analysis: A(
        "彭德懷指揮八路軍一二〇、一二九、晋察冀等部，在華北發動百團大戰；破襲正太、同蒲等铁路與公路，摧毁日軍據點。",
        "日軍佔領區交通線漫長；八路軍得民眾支持，熟悉地形，擅長破襲戰。",
        "中共八路軍在敵後戰場發動的最大規模破壞攻勢。"
      ),
      storyboard: [
        S(1, 113.58, 37.87, 720, { date: "1940年8月", zh: "破襲令下", en: "Offensive Order Issued", nz: "彭德懷下令發動百團大戰，破襲華北日佔區交通線。", ne: "Peng Dehuai orders the Hundred Regiments Offensive against North China rail lines.", focus: ["eighth_main"], side: "eighth", commanders: [{ zh: "彭德懷", en: "Peng Dehuai" }], fz: "八路軍約四十團", fe: "~400 regiments" }),
        S(22, 113.6, 37.9, 660, { date: "1940年8月20日", zh: "正太路破襲", en: "Zhengding–Taiyuan Line Cut", nz: "八路軍同時破襲正太铁路，摧毁桥梁、隧道與車站。", ne: "Forces simultaneously strike the Zhengding–Taiyuan railway.", focus: ["eighth_main"], side: "eighth" }),
        S(42, 113.55, 37.85, 600, { date: "1940年8–9月", zh: "據點拔除", en: "Strongpoints Destroyed", nz: "八路軍攻克日軍據點，破壞公路，繳獲大批物资。", ne: "Japanese strongpoints fall — roads are cut, supplies captured.", focus: ["eighth_main", "japan_main"], side: "both" }),
        S(65, 113.58, 37.87, 580, { date: "1940年10月", zh: "日軍反掃蕩", en: "Japanese Counter-sweep", nz: "日軍集中兵力反掃蕩，八路軍轉入反“掃蕩”作戰。", ne: "Japan launches counter-sweeps — the Eighth Route Army shifts to defence.", focus: ["japan_main"], side: "japan" }),
        S(90, 113.58, 37.87, 720, { date: "1940年12月", zh: "敵後最大攻勢", en: "Largest Rear-area Offensive", nz: "百團大戰為八路軍在敵後發動的最大規模破襲攻勢，沉重打擊日佔交通。", ne: "The largest CCP offensive in the rear — Japanese supply lines are badly hurt.", side: "eighth" }),
      ],
    },

    /* ========== 内戰 CIVIL-WAR ========== */
    "civil-war/liaoshen": {
      END_DAY: 100,
      analysis: A(
        "遼沈戰役：林彪指揮東北野戰軍，先攻錦州切斷國軍退路，圍殲廖耀湘兵團于黑山、大虎山；長春曾澤生起義，瀋陽解放後東北全境易手。",
        "解放軍經整編士氣高昂，得民眾支援；國軍补给依賴海運，各城孤立，戰略被動。",
        "解放軍率先控制東北全境，國軍精銳盡失，雙方兵力對比發生逆轉。"
      ),
      storyboard: [
        S(1, 123.4, 41.8, 720, { date: "1948年9月", zh: "攻錦打援", en: "Capture Jinzhou", nz: "東北野戰軍包圍錦州，切斷國軍關内退路。", ne: "Northeast Field Army besieges Jinzhou — the Nationalist escape route south is severed.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "林彪", en: "Lin Biao" }, { zh: "羅榮桓", en: "Luo Ronghuan" }], fz: "解放軍約七十萬", fe: "~700,000 PLA troops" }),
        S(22, 121.1, 41.1, 660, { date: "1948年10月", zh: "錦州攻克", en: "Jinzhou Falls", nz: "經31小時激戰，錦州陷落，范漢傑被俘。", ne: "After 31 hours of fighting, Jinzhou falls — Fan Hanjie is captured.", focus: ["pla_main"], side: "pla" }),
        S(42, 122.0, 41.5, 620, { date: "1948年10月", zh: "廖兵團覆滅", en: "Liao Yaoxiang Destroyed", nz: "廖耀湘兵團自瀋陽西援，在黑山、大虎山被圍殲。", ne: "Liao Yaoxiang's army is encircled and destroyed at Heishan.", focus: ["pla_main", "gmd_main"], side: "both", commanders: [{ zh: "廖耀湘", en: "Liao Yaoxiang" }] }),
        S(62, 123.4, 41.8, 580, { date: "1948年11月", zh: "長春起義", en: "Changchun Uprising", nz: "曾澤生率六十軍起義，長春和平解放。", ne: "Zeng Zesheng's 60th Army mutinies — Changchun is liberated.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "曾澤生", en: "Zeng Zesheng" }] }),
        S(90, 123.4, 41.8, 750, { date: "1948年11月2日", zh: "東北全境解放", en: "Northeast Liberated", nz: "瀋陽解放後，東北全境易手，解放軍兵力超越國軍。", ne: "Shenyang falls — all of Manchuria is lost; PLA numbers surpass the ROC.", side: "pla", fz: "殲敵四十七萬", fe: "470,000 enemy eliminated" }),
      ],
    },
    "civil-war/huaihai": {
      END_DAY: 100,
      analysis: A(
        "淮海戰役：華東、中原野戰軍以六十萬對八十萬，在黃氾區構築縱深包圍；杜聿明集團自徐州南撤被圍于陳官莊，邱清泉、黃維兵團先後被殲。",
        "解放軍得民眾百萬支前，後勤優于國軍；國軍徐蚌線崩潰，指揮分裂，士氣低落。",
        "徐蚌地區的國軍主力被分段圍殲。孫元良兵團在西撤時潰散，本人脫走。"
      ),
      storyboard: [
        S(1, 117.2, 34.25, 720, { date: "1948年11月", zh: "淮海開戰", en: "Huaihai Campaign Opens", nz: "華東、中原野戰軍發起淮海戰役，以徐州為中心展開大規模會戰。", ne: "East China and Central Plains armies open the Huaihai Campaign centred on Xuzhou.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "粟裕", en: "Su Yu" }, { zh: "劉伯承", en: "Liu Bocheng" }], fz: "解放軍六十萬", fe: "600,000 PLA" }),
        S(22, 117.0, 34.3, 660, { date: "1948年11月", zh: "黃百韜被圍", en: "Huang Baitao Encircled", nz: "黃百韜第七兵團被圍于碾莊圩，徐蚌線切斷。", ne: "Huang Baitao's 7th army is trapped at Nianzhuang — the Xuzhou–Bengbu line is cut.", focus: ["pla_main", "gmd_main"], side: "both" }),
        S(42, 116.8, 33.9, 620, { date: "1948年11–12月", zh: "雙堆集殲滅黃維", en: "Huang Wei Destroyed", nz: "中原野戰軍圍殲黃維第十二兵團于雙堆集。", ne: "Huang Wei's 12th army is annihilated at Shuangduiji.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "鄧小平", en: "Deng Xiaoping" }] }),
        S(62, 117.1, 34.0, 580, { date: "1949年1月", zh: "杜聿明集團覆滅", en: "Du Yuming Group Destroyed", nz: "杜聿明率邱清泉、李彌等部撤到陳官莊被圍。孫元良兵團在西撤時潰散，本人脫走。", ne: "Du Yuming's retreating force is encircled at Chenguanzhuang and destroyed.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "杜聿明", en: "Du Yuming" }], fz: "國軍五十五萬被殲", fe: "550,000 ROC troops lost" }),
        S(90, 117.2, 34.25, 750, { date: "1949年1月10日", zh: "陳官莊圍困結束", en: "Chenguanzhuang Pocket Ends", nz: "1949年1月10日陳官莊圍困結束，杜聿明被俘。", ne: "On 10 January 1949 the Chenguanzhuang pocket ends and Du Yuming is captured.", side: "pla" }),
      ],
    },
    "civil-war/pingjin": {
      END_DAY: 100,
      analysis: A(
        "平津戰役：東北野戰軍入關與華北部隊合力，先圍張家口、新保安，再圍天津；傅作義困守北平，經談判接受改編，北平和平解放。",
        "解放軍以圍而不攻爭取和平；傅作義保全古城與文物，避免戰火破壞北平。",
        "傅作義接受改編，和平解放北平，解放軍確立華北絕對優勢。"
      ),
      storyboard: [
        S(1, 116.4, 39.9, 700, { date: "1948年11月", zh: "平津戰役開始", en: "Pingjin Campaign Opens", nz: "東北野戰軍入關，與華北部隊合力分割包圍平津地區。", ne: "Northeast Field Army enters the pass — Pingjin is encircled.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "林彪", en: "Lin Biao" }, { zh: "聶榮臻", en: "Nie Rongzhen" }] }),
        S(22, 115.0, 40.8, 640, { date: "1948年12月", zh: "新保安、張家口", en: "Xinbao'an and Zhangjiakou", nz: "解放軍先攻新保安，殲滅郭景雲三十五軍，張家口守軍突圍被殲。", ne: "Guo Jingyun's 35th Army is destroyed at Xinbao'an — Zhangjiakou falls.", focus: ["pla_main"], side: "pla" }),
        S(42, 117.2, 39.1, 600, { date: "1949年1月", zh: "天津攻堅戰", en: "Assault on Tianjin", nz: "解放軍對天津發動總攻，陳長捷部被殲，傅作義退路斷絕。", ne: "PLA storm Tianjin — Chen Changjie's garrison is wiped out.", focus: ["pla_main", "gmd_main"], side: "both", commanders: [{ zh: "傅作義", en: "Fu Zuoyi" }] }),
        S(62, 116.4, 39.9, 580, { date: "1949年1月", zh: "圍而不攻北平", en: "Beiping Encircled", nz: "解放軍圍而不攻北平，與傅作義談判，保護古城文物。", ne: "Beiping is besieged but not stormed — talks with Fu Zuoyi protect the ancient capital.", focus: ["gmd_main"], side: "gmd", commanders: [{ zh: "傅作義", en: "Fu Zuoyi" }] }),
        S(90, 116.4, 39.9, 720, { date: "1949年1月31日", zh: "北平和平解放", en: "Peaceful Liberation of Beiping", nz: "傅作義接受改編，北平和平解放，華北局勢底定。", ne: "Fu Zuoyi accepts reorganization — Beiping is liberated without a battle.", side: "pla", fz: "改編國軍約二十餘萬", fe: "200,000+ troops reorganized" }),
      ],
    },
    "civil-war/crossing": {
      END_DAY: 100,
      analysis: A(
        "渡江戰役：第二、第三野戰軍與第四野戰軍一部，在西起湖口、東至江陰的千里戰線上強渡長江；四月二十三日佔領南京，總統府插旗。",
        "國軍長江防線指揮分裂，桂系與中央系矛盾；解放軍渡江船隊與民眾支援充足，士氣壓倒。",
        "1949年4月解放軍渡過長江，4月23日進入南京。"
      ),
      storyboard: [
        S(1, 118.78, 32.06, 720, { date: "1949年4月20日", zh: "千里渡江", en: "Crossing the Yangtze", nz: "第二、第三野戰軍在西起湖口、東至江陰的戰線上強渡長江。", ne: "Second and Third Field Armies cross the Yangtze on a thousand-li front.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "陳毅", en: "Chen Yi" }, { zh: "粟裕", en: "Su Yu" }], assets: ["landing", "navy"], fz: "解放軍百萬", fe: "1,000,000+ PLA" }),
        S(22, 118.78, 32.06, 660, { date: "1949年4月21日", zh: "突破江防", en: "Breaching the Line", nz: "解放軍在中下游多處突破國民党長江防線，向縱深挺進。", ne: "PLA breaches the Nationalist Yangtze line at multiple points.", focus: ["pla_main", "gmd_main"], side: "both", assets: ["landing"] }),
        S(42, 118.78, 32.06, 600, { date: "1949年4月23日", zh: "佔領南京", en: "Nanjing Captured", nz: "第三野戰軍佔領南京，總統府升起紅旗。", ne: "Third Field Army enters Nanjing — the red flag rises over the presidential palace.", focus: ["pla_main"], side: "pla", commanders: [{ zh: "陳毅", en: "Chen Yi" }] }),
        S(65, 121.47, 31.23, 640, { date: "1949年5月", zh: "解放上海", en: "Shanghai Liberated", nz: "第三野戰軍發起滬戰役，上海宣告解放。", ne: "The Shanghai campaign ends — China's largest city is liberated.", focus: ["pla_main"], side: "pla" }),
        S(90, 118.78, 32.06, 750, { date: "1949年", zh: "進入南京", en: "End of Mainland Rule", nz: "1949年4月23日，解放軍進入南京。", ne: "The Yangtze crossing ends ROC rule on the mainland.", side: "pla", fz: "四月二十三佔南京", fe: "Nanjing taken 23 April" }),
      ],
    },
  };
};
