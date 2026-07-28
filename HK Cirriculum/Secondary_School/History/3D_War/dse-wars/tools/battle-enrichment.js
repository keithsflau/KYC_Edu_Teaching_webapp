/**
 * Rich storyboards, analysis, and asset tags per sub-battle.
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
    /* ========== WW1 ========== */
    "ww1/sarajevo": {
      END_DAY: 100,
      analysis: A(
        "奧匈皇儲斐迪南大公在波斯尼亞巡視，塞族民族主義組織「青年波斯尼亞」策劃暗殺；普林西普於拉丁橋開槍，直接觸發七月危機與大國動員。",
        "奧匈帝國藉此向塞爾維亞施壓；俄國保護斯拉夫同胞，德國支持奧匈，法國與俄國同盟，英國受條約牽制。",
        "一連串同盟條款把地方暗殺升級為世界大戰；民族主義與帝國競爭的結構性矛盾一次爆發。"
      ),
      storyboard: [
        S(1, 18.41, 43.86, 520, { date: "1914年6月28日", zh: "斐迪南抵達薩拉熱窩", en: "Archduke Arrives", nz: "奧匈皇儲斐迪南大公夫婦抵達波斯尼亞首府，當地塞族情緒高漲。", ne: "Archduke Franz Ferdinand arrives in Sarajevo amid Serb nationalist tension.", focus: ["ap_sarajevo"], side: "ap", commanders: [{ zh: "斐迪南大公", en: "Franz Ferdinand" }] }),
        S(20, 18.43, 43.86, 480, { date: "1914年6月28日 上午", zh: "第一次刺殺未遂", en: "First Attempt Fails", nz: "炸彈襲擊車隊失敗，斐迪南改道前往醫院探視傷者。", ne: "A bomb attack fails; the royal party reroutes to visit the wounded.", focus: ["ap_sarajevo"], side: "ap", assets: ["artillery"] }),
        S(40, 18.43, 43.86, 450, { date: "1914年6月28日 下午", zh: "拉丁橋開槍", en: "Shots at Latin Bridge", nz: "普林西普在拉丁橋近距離開槍，皇儲夫婦當場身亡。", ne: "Gavrilo Princip fires at Latin Bridge — the royal couple is killed.", focus: ["ap_sarajevo"], side: "cp", commanders: [{ zh: "普林西普", en: "Gavrilo Princip" }], assets: ["artillery"] }),
        S(60, 18.41, 43.86, 600, { date: "1914年7月", zh: "七月危機", en: "July Crisis", nz: "奧匈向塞爾維亞發出最後通牒，俄、德、法、英相繼動員。", ne: "Austria-Hungary issues an ultimatum to Serbia; the great powers mobilise.", side: "both", fz: "歐洲列強進入戰爭動員", fe: "European powers mobilise for war" }),
        S(85, 18.41, 43.86, 700, { date: "1914年8月", zh: "導火線的後果", en: "Aftermath", nz: "一樁地方暗殺引發連鎖同盟義務，第一次世界大戰全面爆發。", ne: "A local assassination triggers alliance obligations — World War I begins.", side: "both" }),
      ],
    },
    "ww1/marne": {
      END_DAY: 100,
      analysis: A(
        "德軍實施施里芬計劃，經比利時包抄巴黎；英法聯軍在馬恩河反擊，德軍被迫撤退，西線轉入塹壕僵持。",
        "德國需同時應付東西兩線；協約國可動員英帝國資源與法國本土防禦。馬恩河戰役顯示速決戰略失敗。",
        "阻止德軍佔領巴黎，一戰西線形成四年塹壕戰；戰爭規模與傷亡遠超預期。"
      ),
      storyboard: [
        S(1, 4.0, 49.1, 680, { date: "1914年8月底", zh: "施里芬計劃南下", en: "Schlieffen Advance", nz: "德軍第一集團軍突破比利時，直撲巴黎東郊。", ne: "German 1st Army drives through Belgium toward Paris.", focus: ["cp_marne"], side: "cp", commanders: [{ zh: "克盧克", en: "von Kluck" }], fz: "德軍約 80 萬人", fe: "~800,000 German troops" }),
        S(25, 3.4, 48.95, 620, { date: "1914年9月初", zh: "馬恩河對峙", en: "Standoff at the Marne", nz: "德軍前鋒抵達馬恩河，巴黎岌岌可危。", ne: "German spearheads reach the Marne — Paris is threatened.", focus: ["cp_marne", "ap_marne"], side: "both", assets: ["artillery"] }),
        S(40, 3.2, 48.95, 600, { date: "1914年9月6日", zh: "協約國反擊", en: "Allied Counter-attack", nz: "英法聯軍在馬恩河發動反攻，利用德軍右翼空隙。", ne: "Anglo-French forces counter-attack at the Marne.", focus: ["ap_marne"], side: "ap", commanders: [{ zh: "霞飛", en: "Joffre" }, { zh: "弗倫奇", en: "French" }] }),
        S(55, 3.5, 48.95, 650, { date: "1914年9月6–12日", zh: "計程車運兵", en: "Taxis to the Front", nz: "法軍動員巴黎計程車運送援兵，穩住防線。", ne: "Paris taxis rush reinforcements to stabilise the line.", focus: ["ap_marne"], side: "ap" }),
        S(75, 4.2, 49.0, 700, { date: "1914年9月中旬", zh: "德軍撤退", en: "German Retreat", nz: "德軍被迫後撤至埃納河，施里芬計劃破滅。", ne: "Germany retreats to the Aisne — the Schlieffen Plan fails.", focus: ["cp_marne"], side: "cp" }),
        S(95, 3.4, 48.95, 750, { date: "1914年秋", zh: "西線僵持", en: "Western Stalemate", nz: "雙方挖壕固守，西線進入四年塹壕戰。", ne: "Both sides dig in — four years of trench warfare begin.", side: "both" }),
      ],
    },
    "ww1/verdun": {
      END_DAY: 100,
      analysis: A(
        "德軍意圖「流血耗盡」法軍；法軍在貝當指揮下死守，「他們將不會通過」成為象徵。",
        "凡爾登是法國象徵要塞；德法雙方投入大量火炮與人力，成為消耗戰典型。",
        "傷亡逾七十萬，展示一戰殘酷；法德民族記憶深刻，影響戰後和解困難。"
      ),
      storyboard: [
        S(5, 5.5, 49.2, 600, { date: "1916年2月21日", zh: "德軍猛攻開始", en: "German Assault Opens", nz: "德軍第五集團軍以猛烈炮擊轟炸凡爾登防線。", ne: "German 5th Army opens with a massive artillery barrage on Verdun.", focus: ["cp_verdun"], side: "cp", commanders: [{ zh: "法金漢", en: "von Falkenhayn" }], assets: ["artillery"], fz: "德軍 90 萬", fe: "900,000 German" }),
        S(25, 5.44, 49.19, 550, { date: "1916年2–3月", zh: "杜奧蒙堡陷落", en: "Fort Douaumont Falls", nz: "德軍攻占杜奧蒙堡等關鍵據點。", ne: "Germans capture Fort Douaumont and key positions.", focus: ["cp_verdun"], side: "cp", assets: ["artillery"] }),
        S(45, 5.38, 49.16, 520, { date: "1916年4月", zh: "貝當接任", en: "Pétain Takes Command", nz: "貝當組織道路補給，號召「他們將不會通過」。", ne: "Pétain organises supply routes: \"They shall not pass.\"", focus: ["ap_verdun"], side: "ap", commanders: [{ zh: "貝當", en: "Pétain" }] }),
        S(65, 5.42, 49.12, 540, { date: "1916年夏", zh: "弗勒里爭奪", en: "Fight for Fleury", nz: "雙方在弗勒里等地反覆拉鋸，村莊數度易手。", ne: "Fierce back-and-forth at Fleury — villages change hands repeatedly.", focus: ["cp_verdun", "ap_verdun"], side: "both", assets: ["artillery"] }),
        S(85, 5.38, 49.16, 580, { date: "1916年12月", zh: "攻勢停止", en: "Offensive Halted", nz: "德軍攻勢陷入停滯，雙方傷亡慘重。", ne: "The German offensive stalls with catastrophic casualties.", side: "both", fz: "總傷亡逾 70 萬", fe: "700,000+ casualties" }),
      ],
    },
    "ww1/somme": {
      END_DAY: 100,
      analysis: A(
        "協約國發動索姆河攻勢以分散凡爾登壓力；首日英軍傷亡創紀錄，坦克首次投入實戰。",
        "英國動員帝國兵力；德軍防線堅固。工業國家以人力與火力互耗。",
        "成為一戰無謂犧牲的象徵；推動軍事技術革新（坦克）與對戰爭的反思。"
      ),
      storyboard: [
        S(1, 2.65, 50.0, 650, { date: "1916年7月1日", zh: "七一攻勢", en: "First Day on the Somme", nz: "英軍在索姆河發動大攻勢，首日陣亡逾兩萬。", ne: "British offensive opens — over 20,000 dead on day one.", focus: ["ap_somme"], side: "ap", commanders: [{ zh: "黑格", en: "Haig" }], assets: ["artillery"] }),
        S(25, 2.68, 50.05, 600, { date: "1916年7月", zh: "蒂耶普瓦勒血戰", en: "Thiepval Bloodbath", nz: "德軍機槍火力造成協約國重大傷亡。", ne: "German machine-gun fire inflicts heavy Allied losses.", focus: ["ap_somme", "cp_somme"], side: "both", assets: ["artillery"] }),
        S(50, 2.7, 49.9, 580, { date: "1916年9月", zh: "坦克首戰", en: "Tanks Debut", nz: "英軍首次投入坦克，突破部分德軍防線。", ne: "British tanks debut, breaking some German lines.", focus: ["ap_somme"], side: "ap", assets: ["artillery"] }),
        S(75, 2.7, 49.9, 620, { date: "1916年11月", zh: "攻勢收束", en: "Offensive Winds Down", nz: "攻勢在泥濘中停滯，僅推進數英里。", ne: "The offensive stalls in mud — gains measured in miles.", side: "both" }),
        S(95, 2.7, 49.9, 700, { date: "1916年冬", zh: "消耗戰代價", en: "Cost of Attrition", nz: "雙方傷亡合計逾百萬，西線仍僵持。", ne: "Over a million casualties — the Western Front remains deadlocked.", side: "both" }),
      ],
    },
    "ww1/tannenberg": {
      END_DAY: 100,
      analysis: A(
        "俄軍東線兩路進攻；德軍興登堡與魯登道夫在坦能堡包圍俄軍第二集團軍，取得決定性勝利。",
        "德國雖陷西線，東線指揮高效；俄軍通訊與補給混亂。",
        "德國東線信心大增；俄軍慘敗加速國內危機，為1917年革命鋪路。"
      ),
      storyboard: [
        S(10, 20.08, 53.88, 650, { date: "1914年8月", zh: "俄軍東進", en: "Russian Advance", nz: "俄軍第一、第二集團軍分路入侵東普魯士。", ne: "Russian 1st and 2nd Armies invade East Prussia.", focus: ["ap_russia"], side: "ap", commanders: [{ zh: "薩姆索諾夫", en: "Samsonov" }] }),
        S(30, 20.2, 53.7, 600, { date: "1914年8月26日", zh: "德軍調動", en: "German Redeployment", nz: "興登堡與魯登道夫集中兵力，準備反擊。", ne: "Hindenburg and Ludendorff concentrate forces for a counter-strike.", focus: ["cp_east"], side: "cp", commanders: [{ zh: "興登堡", en: "Hindenburg" }, { zh: "魯登道夫", en: "Ludendorff" }] }),
        S(50, 20.08, 53.88, 550, { date: "1914年8月27–30日", zh: "坦能堡包圍", en: "Encirclement", nz: "德軍切斷俄軍退路，第二集團軍被圍。", ne: "Germans cut Russian retreat routes — 2nd Army encircled.", focus: ["cp_east", "ap_russia"], side: "both", assets: ["artillery"] }),
        S(75, 20.08, 53.88, 620, { date: "1914年8月底", zh: "俄軍投降", en: "Russian Surrender", nz: "俄軍傷亡慘重，逾九萬人被俘。", ne: "Catastrophic Russian losses — 90,000 captured.", focus: ["cp_east"], side: "cp", fz: "被俘 9 萬+", fe: "90,000+ POWs" }),
        S(95, 20.08, 53.88, 700, { date: "1914年秋", zh: "東線轉折", en: "Eastern Turning Point", nz: "德國東線勝利暫時穩定局勢，興登堡成為民族英雄。", ne: "German victory stabilises the East — Hindenburg becomes a national hero.", side: "cp" }),
      ],
    },
    "ww1/gallipoli": {
      END_DAY: 100,
      analysis: A(
        "協約國企圖兩棲登陸加里波利，打通達黑海海峽以支援俄國；鄂圖曼軍在凱末爾等指揮下頑抗。",
        "英法等海軍強國，但兩棲作戰與補給困難；鄂圖曼本土防禦有利。",
        "遠征失敗，澳紐軍團（ANZAC）傷亡沉重；推動鄂圖曼民族主義與凱末爾崛起。"
      ),
      storyboard: [
        S(1, 26.5, 40.5, 620, { date: "1915年4月25日", zh: "海軍炮擊", en: "Naval Bombardment", nz: "協約國艦隊炮轟加里波利半島，準備登陸。", ne: "Allied fleet bombards the Gallipoli peninsula before landings.", assets: ["navy", "artillery"], fz: "英法澳紐聯軍", fe: "British, French, ANZAC forces" }),
        S(20, 26.28, 40.24, 580, { date: "1915年4月25日", zh: "安zac 灣登陸", en: "Landings at Anzac Cove", nz: "澳紐軍團在安zac 灣登陸，遭鄂圖曼軍猛烈抵抗。", ne: "ANZAC troops land at Anzac Cove — fierce Ottoman resistance.", focus: ["ap_gallipoli", "cp_ottoman"], side: "both", commanders: [{ zh: "凱末爾", en: "Atatürk" }], assets: ["landing", "navy"] }),
        S(40, 26.22, 40.32, 560, { date: "1915年8月", zh: "蘇弗拉灣攻勢", en: "Suvla Bay Offensive", nz: "協約國增兵蘇弗拉灣，仍無法突破。", ne: "Allied reinforcements at Suvla Bay fail to break through.", focus: ["ap_gallipoli"], side: "ap", assets: ["landing"] }),
        S(65, 26.35, 40.35, 600, { date: "1915年秋冬", zh: "僵持與疾病", en: "Stalemate and Disease", nz: "戰壕僵持，痢疾與傷寒奪走大量士兵生命。", ne: "Trench stalemate — dysentery and typhus take many lives.", side: "both" }),
        S(85, 26.41, 40.41, 700, { date: "1916年1月", zh: "秘密撤離", en: "Secret Evacuation", nz: "協約國在夜間秘密撤離半島，遠征以失敗告終。", ne: "Allied forces evacuate by night — the campaign ends in failure.", focus: ["ap_gallipoli"], side: "ap" }),
      ],
    },

    /* ========== WW2 EUROPE ========== */
    "ww2-europe/poland": {
      END_DAY: 100,
      analysis: A(
        "德軍以閃電戰（裝甲縱深、空軍密接支援）迅速分割波蘭；蘇聯依莫洛托夫—里賓特洛甫條約出兵東部。",
        "德國軍事現代化領先；波蘭兩面受敵，盟國來不及增援。",
        "二戰在歐洲全面爆發；波蘭亡國，戰爭初期軸心國勢如破竹。"
      ),
      storyboard: [
        S(1, 19.0, 52.2, 700, { date: "1939年9月1日", zh: "德軍入侵", en: "German Invasion", nz: "德軍從西、北、南三路入侵波蘭，空軍轟炸波茲南等地。", ne: "Germany invades from three directions — Luftwaffe bombs Polish cities.", focus: ["ax_poland"], side: "axis", commanders: [{ zh: "倫德施泰特", en: "von Rundstedt" }], assets: ["air", "artillery"], fz: "德軍 150 萬", fe: "1.5M German troops" }),
        S(25, 19.5, 52.0, 650, { date: "1939年9月上旬", zh: "裝甲縱深突破", en: "Armoured Breakthrough", nz: "古德里安裝甲集團穿插波軍後方，切斷通訊與撤退。", ne: "Guderian's panzers penetrate deep behind Polish lines.", focus: ["ax_poland"], side: "axis", assets: ["air"] }),
        S(45, 21.0, 52.2, 620, { date: "1939年9月中旬", zh: "華沙圍困", en: "Siege of Warsaw", nz: "波軍退守華沙，遭德軍圍攻與空襲。", ne: "Polish forces fall back to Warsaw — besieged and bombed.", focus: ["al_poland"], side: "allies", assets: ["air", "artillery"] }),
        S(65, 23.5, 52.0, 680, { date: "1939年9月17日", zh: "蘇聯出兵東部", en: "Soviet Invasion from East", nz: "蘇軍依密約越過東部邊界，波蘭腹背受敵。", ne: "Soviet forces cross the eastern border per secret pact.", side: "axis", fz: "蘇軍東線", fe: "Soviet eastern front" }),
        S(90, 21.0, 52.2, 750, { date: "1939年9月底", zh: "波蘭淪陷", en: "Poland Falls", nz: "波蘭抵抗終告失敗，二戰在歐洲全面展開。", ne: "Polish resistance collapses — WWII in Europe is fully underway.", side: "both" }),
      ],
    },
    "ww2-europe/dunkirk": {
      END_DAY: 100,
      analysis: A(
        "德軍裝甲部隊突破阿登森林，切斷英法聯軍；英軍自敦克爾克海灘撤離逾三十萬人。",
        "德國陸軍強勁但海軍不足；英國保留核心戰力，民船動員展現海權。",
        "敦克爾克奇蹟保存英軍骨幹，為日後諾曼第反攻奠定基礎。"
      ),
      storyboard: [
        S(1, 3.0, 50.5, 700, { date: "1940年5月", zh: "德軍突破", en: "German Breakthrough", nz: "德軍裝甲部隊穿越阿登，直插英吉利海峽。", ne: "German armour breaks through the Ardennes to the Channel.", focus: ["ax_panzer"], side: "axis", commanders: [{ zh: "倫德施泰特", en: "von Rundstedt" }], assets: ["air"] }),
        S(25, 2.9, 51.0, 650, { date: "1940年5月下旬", zh: "聯軍被圍", en: "Allies Encircled", nz: "英法比聯軍被困敦克爾克與周邊「口袋」。", ne: "Anglo-French-Belgian forces trapped in the Dunkirk pocket.", focus: ["al_bef"], side: "allies", commanders: [{ zh: "戈特", en: "Gort" }] }),
        S(45, 2.35, 51.05, 580, { date: "1940年5月26日", zh: "发电机行動", en: "Operation Dynamo", nz: "英國啟動敦克爾克撤離，民船與軍艦協力運兵。", ne: "Operation Dynamo — civilian boats join naval evacuation.", assets: ["navy", "landing"], fz: "撤離 33.8 萬人", fe: "338,000 evacuated" }),
        S(70, 2.35, 51.05, 520, { date: "1940年6月4日", zh: "海灘撤離", en: "Beach Evacuation", nz: "士兵在空襲下登船撤往英國，裝備大量遺棄。", ne: "Troops embark under air attack — much equipment abandoned.", focus: ["al_bef"], side: "allies", assets: ["navy", "air"] }),
        S(95, 2.35, 51.05, 700, { date: "1940年6月", zh: "奇蹟與代價", en: "Miracle and Cost", nz: "英軍主力保存，但法國即將投降。", ne: "The BEF is saved — but France is about to fall.", side: "allies" }),
      ],
    },
    "ww2-europe/stalingrad": {
      END_DAY: 100,
      analysis: A(
        "德軍1942年夏攻向伏爾加河與高加索；斯大林格勒巷戰慘烈，蘇軍天王星行動反包圍德軍第六集團軍。",
        "蘇聯全民动员、寒冬與補給線優勢；德軍過度延伸、空運補給失敗。",
        "二戰東線轉折點；德軍從此戰略防守，士氣與同盟信心逆轉。"
      ),
      storyboard: [
        S(1, 44.5, 48.5, 700, { date: "1942年8月", zh: "德軍東進", en: "German Drive East", nz: "德軍第六集團軍向伏爾加河與斯大林格勒推進。", ne: "German 6th Army advances toward the Volga and Stalingrad.", focus: ["ax_6th"], side: "axis", commanders: [{ zh: "保盧斯", en: "Paulus" }], assets: ["air", "artillery"] }),
        S(25, 44.0, 48.7, 600, { date: "1942年9月", zh: "進入城市", en: "Into the City", nz: "德軍攻入斯大林格勒市區，逐屋巷戰。", ne: "Germans enter the city — brutal house-to-house fighting.", focus: ["ax_6th", "al_red"], side: "both", assets: ["artillery"] }),
        S(45, 44.0, 48.7, 550, { date: "1942年10–11月", zh: "崔可夫死守", en: "Chuikov Holds", nz: "蘇軍第62集團軍在廢墟中頑抗，「擁抱敵人」戰術。", ne: "Soviet 62nd Army holds the ruins — \"hugging\" tactics.", focus: ["al_red"], side: "allies", commanders: [{ zh: "崔可夫", en: "Chuikov" }] }),
        S(65, 44.5, 48.5, 620, { date: "1942年11月19日", zh: "天王星行動", en: "Operation Uranus", nz: "蘇軍從南北两翼包圍德軍，切斷第六集團軍退路。", ne: "Soviet pincers encircle the 6th Army.", focus: ["al_red"], side: "allies", assets: ["artillery"] }),
        S(85, 44.0, 48.7, 580, { date: "1943年1月", zh: "德軍投降", en: "German Surrender", nz: "保盧斯率殘部投降，東線戰略逆轉。", ne: "Paulus surrenders — the Eastern Front turns.", focus: ["ax_6th"], side: "axis", fz: "德軍 30 萬被圍", fe: "300,000 Germans trapped" }),
      ],
    },
    "ww2-europe/normandy": {
      END_DAY: 100,
      analysis: A(
        "盟軍諾曼第登陸（D-Day）開闢西線第二戰場；空降、海軍炮擊與五個灘頭兩棲突擊。",
        "美英工業與海空優勢；德軍防線被欺敵計策誤判，反擊遲緩。",
        "西線重開，法國解放，加速第三帝國崩潰。"
      ),
      storyboard: [
        S(1, -1.5, 49.4, 750, { date: "1944年6月6日 凌晨", zh: "空降先行", en: "Airborne First", nz: "盟軍空降兵控制橋樑與要道，配合海軍炮擊。", ne: "Allied paratroopers seize bridges and roads; naval bombardment begins.", assets: ["air", "navy", "artillery"] }),
        S(20, -0.7, 49.37, 650, { date: "1944年6月6日", zh: "奧馬哈灘血戰", en: "Bloody Omaha", nz: "美軍在奧馬哈灘遭遇強烈抵抗，傷亡慘重。", ne: "US forces face fierce resistance at Omaha Beach.", focus: ["al_allied"], side: "allies", commanders: [{ zh: "艾森豪威爾", en: "Eisenhower" }], assets: ["landing", "navy"] }),
        S(40, -0.5, 49.35, 600, { date: "1944年6月6日", zh: "黃金與朱諾灘", en: "Gold & Juno Beaches", nz: "英加軍在黃金、朱諾、劍灘登陸，逐步向內陸推進。", ne: "British and Canadian forces land at Gold, Juno and Sword.", focus: ["al_allied"], side: "allies", assets: ["landing", "navy"] }),
        S(60, -0.8, 49.2, 620, { date: "1944年6月7–12日", zh: "灘頭會師", en: "Beachheads Linked", nz: "五個灘頭連成一片，盟軍向卡昂與內陸推進。", ne: "Five beachheads link up — drive inland toward Caen.", focus: ["al_allied"], side: "allies", assets: ["air"] }),
        S(85, -0.5, 49.2, 700, { date: "1944年夏", zh: "第二戰場", en: "Second Front Open", nz: "諾曼第登陸成功，西線對德作戰全面展開。", ne: "D-Day succeeds — the Western Front against Germany is fully opened.", side: "allies" }),
      ],
    },
    "ww2-europe/el-alamein": {
      END_DAY: 100,
      analysis: A(
        "北非沙漠戰：蒙哥馬利率第八集團軍在第二次阿拉曼擊敗隆美爾，扭轉北非戰局。",
        "英軍補給與情報改善；德意非洲軍補給線遭馬耳他與海軍打擊。",
        "北非軸心國崩潰，盟軍 1943 年登陸意大利；東地中海戰略態勢改變。"
      ),
      storyboard: [
        S(1, 28.5, 30.8, 650, { date: "1942年10月", zh: "隆美爾東進", en: "Rommel Advances", nz: "德意非洲軍此前曾兵臨阿拉曼，威脅埃及與蘇伊士。", ne: "Axis forces had threatened Egypt and the Suez Canal.", focus: ["ax_afrika"], side: "axis", commanders: [{ zh: "隆美爾", en: "Rommel" }] }),
        S(25, 28.95, 30.83, 600, { date: "1942年10月23日", zh: "輕足行動", en: "Operation Lightfoot", nz: "蒙哥馬利發動第二次阿拉曼攻勢，炮火準備猛烈。", ne: "Montgomery opens Second Alamein with a massive barrage.", focus: ["al_8th"], side: "allies", commanders: [{ zh: "蒙哥馬利", en: "Montgomery" }], assets: ["artillery"] }),
        S(50, 28.95, 30.83, 550, { date: "1942年10月下旬", zh: "裝甲決戰", en: "Armoured Battle", nz: "雙方坦克在沙漠激戰，英軍逐步突破雷區。", ne: "Tank battles in the desert — British breach minefields.", focus: ["al_8th", "ax_afrika"], side: "both", assets: ["artillery"] }),
        S(75, 29.2, 30.9, 620, { date: "1942年11月", zh: "軸心國西撤", en: "Axis Retreat", nz: "隆美爾下令撤退，北非戰局逆轉。", ne: "Rommel orders retreat — North Africa turns.", focus: ["ax_afrika"], side: "axis" }),
        S(95, 28.95, 30.83, 700, { date: "1942年11月", zh: "北非轉折", en: "North African Turning Point", nz: "阿拉曼成為二戰北非決定性戰役。", ne: "El Alamein becomes the decisive battle of the North African campaign.", side: "allies" }),
      ],
    },
    "ww2-europe/berlin": {
      END_DAY: 100,
      analysis: A(
        "1945年4月蘇軍包圍柏林；城內巷戰慘烈，希特勒自盡，德國無條件投降。",
        "蘇聯以巨大人力代價推進；德國已是強弩之末，兩線崩潰。",
        "歐洲戰爭結束；冷戰格局萌芽，德國分裂。"
      ),
      storyboard: [
        S(1, 13.5, 52.4, 700, { date: "1945年4月16日", zh: "柏林戰役開始", en: "Battle for Berlin Opens", nz: "蘇軍三大方面軍向柏林進攻，朱可夫與科涅斯率部強渡奧得河。", ne: "Soviet fronts advance on Berlin — Zhukov and Konev cross the Oder.", focus: ["al_soviet"], side: "allies", commanders: [{ zh: "朱可夫", en: "Zhukov" }], assets: ["artillery", "air"] }),
        S(25, 13.4, 52.52, 600, { date: "1945年4月21日", zh: "兵臨城下", en: "Reach the City", nz: "蘇軍先頭部隊抵達柏林郊區，德軍國民衝鋒隊與殘部抵抗。", ne: "Soviet vanguards reach Berlin suburbs — desperate German resistance.", focus: ["al_soviet", "ax_berlin"], side: "both", assets: ["artillery"] }),
        S(50, 13.4, 52.52, 550, { date: "1945年4月30日", zh: "國會大廈爭奪", en: "Fight for the Reichstag", nz: "蘇軍在國會大廈升起紅旗；希特勒在地堡自盡。", ne: "Red flag over the Reichstag — Hitler commits suicide in the bunker.", focus: ["al_soviet"], side: "allies", assets: ["artillery"] }),
        S(75, 13.4, 52.52, 620, { date: "1945年5月2日", zh: "柏林陷落", en: "Berlin Falls", nz: "城內德軍向蘇軍投降。", ne: "German forces in the city surrender to the Soviets.", side: "allies" }),
        S(95, 13.4, 52.52, 750, { date: "1945年5月8日", zh: "歐戰結束", en: "War in Europe Ends", nz: "德國無條件投降，第二次世界大戰在歐洲結束。", ne: "Germany surrenders unconditionally — WWII in Europe ends.", side: "both" }),
      ],
    },

    /* ========== WW2 PACIFIC ========== */
    "ww2-pacific/philippines": {
      END_DAY: 100,
      analysis: A(
        "日軍 1941 年底偷襲珍珠港後進攻菲律賓；美菲聯軍在巴丹半島抵抗後投降，麥克阿瑟「我會回來」。",
        "日本初期海空優勢；美國太平洋艦隊受創但航母保存。",
        "菲律賓淪陷強化日本南進；1944 年美軍反攻成為太平洋戰爭重要一環。"
      ),
      storyboard: [
        S(1, 121.0, 14.6, 700, { date: "1941年12月", zh: "日軍南進", en: "Japanese Southward Drive", nz: "珍珠港事件後，日軍空襲菲律賓克拉克等機場。", ne: "After Pearl Harbor, Japan bombs Philippine airfields.", assets: ["air"], commanders: [{ zh: "本間雅晴", en: "Homma" }] }),
        S(25, 120.98, 14.59, 620, { date: "1941年12月", zh: "馬尼拉陷落", en: "Manila Falls", nz: "日軍登陸呂宋，美菲聯軍退守巴丹。", ne: "Japanese land on Luzon — US-Filipino forces withdraw to Bataan.", focus: ["jp_ph", "us_phil"], side: "both", assets: ["landing", "navy"] }),
        S(50, 120.45, 14.65, 580, { date: "1942年1–4月", zh: "巴丹抵抗", en: "Bataan Resistance", nz: "巴丹半島守軍糧盡彈絕，仍頑強抵抗。", ne: "Bataan defenders fight on despite starvation and shortages.", focus: ["us_phil"], side: "us", commanders: [{ zh: "麥克阿瑟", en: "MacArthur" }, { zh: "溫賴特", en: "Wainwright" }] }),
        S(75, 120.45, 14.65, 600, { date: "1942年4月", zh: "巴丹死亡行軍", en: "Bataan Death March", nz: "美菲軍投降，俘虜遭強迫長途行軍，死傷慘重。", ne: "Surrender — POWs suffer the Bataan Death March.", focus: ["jp_ph"], side: "jp" }),
        S(95, 121.0, 14.6, 750, { date: "1942年5月", zh: "菲律賓淪陷", en: "Philippines Lost", nz: "科雷希多島陷落，日本控制菲律賓，但美國誓言反攻。", ne: "Corregidor falls — Japan holds the Philippines; America vows return.", side: "jp" }),
      ],
    },
    "ww2-pacific/midway": {
      END_DAY: 100,
      analysis: A(
        "美軍破譯日軍密碼，在中途島設伏；航母空戰中擊沉四艘日航母，扭轉太平洋戰局。",
        "日本賭上聯合艦隊主力；美國工業與情報優勢顯現。",
        "太平洋戰爭戰略轉折；日本從此失去海空主動權。"
      ),
      storyboard: [
        S(1, -177.4, 28.2, 800, { date: "1942年6月4日 前", zh: "情報優勢", en: "Intelligence Edge", nz: "美軍破譯日軍密碼，得知偷襲中途島計劃。", ne: "US codebreakers learn of Japan's Midway operation.", focus: ["us_carrier"], side: "us", commanders: [{ zh: "尼米茲", en: "Nimitz" }] }),
        S(20, -177.0, 29.0, 700, { date: "1942年6月4日", zh: "日航母出擊", en: "Japanese Carriers Strike", nz: "南雲機動部隊四艘航母起飛攻擊中途島。", ne: "Nagumo's four carriers launch strikes on Midway.", focus: ["jp_carrier"], side: "jp", commanders: [{ zh: "南雲忠一", en: "Nagumo" }], assets: ["navy", "air"], fz: "日航母 4 艘", fe: "4 Japanese carriers" }),
        S(40, -177.2, 28.5, 620, { date: "1942年6月4日 上午", zh: "美機反擊", en: "US Counter-strike", nz: "美軍艦載機與中途島陸基機反覆攻擊日艦。", ne: "US carrier and Midway-based aircraft attack the Japanese fleet.", focus: ["us_carrier"], side: "us", assets: ["air", "navy"] }),
        S(60, -177.38, 28.21, 550, { date: "1942年6月4日 下午", zh: "航母沉沒", en: "Carriers Sunk", nz: "企業號、大黃蜂號俯衝轟炸機擊沉赤城、加賀、蒼龍、飛龍。", ne: "Dive bombers from Enterprise and Hornet sink four Japanese carriers.", focus: ["us_carrier", "jp_carrier"], side: "both", assets: ["air", "navy"], fz: "日損 4 航母", fe: "Japan loses 4 carriers" }),
        S(85, -177.38, 28.21, 700, { date: "1942年6月", zh: "戰略逆轉", en: "Strategic Reversal", nz: "中途島海戰成為太平洋戰爭轉折點。", ne: "Midway becomes the turning point of the Pacific War.", side: "us" }),
      ],
    },
    "ww2-pacific/guadalcanal": {
      END_DAY: 100,
      analysis: A(
        "盟軍首次兩棲反攻瓜達爾卡納爾，奪取日軍興建機場；海戰與叢林戰持續半年。",
        "美國工業與補給逐步佔優；日軍「餓島」戰略失敗。",
        "日本由攻轉守；盟軍沿所羅門群島西進。"
      ),
      storyboard: [
        S(1, 160.0, -9.5, 700, { date: "1942年8月7日", zh: "盟軍登陸", en: "Allied Landing", nz: "美軍海軍陸戰隊在瓜島登陸，奪取亨德森機場。", ne: "US Marines land on Guadalcanal — seize Henderson Field.", focus: ["us_marines"], side: "us", commanders: [{ zh: "范德格里夫特", en: "Vandegrift" }], assets: ["landing", "navy"] }),
        S(25, 159.95, -9.42, 620, { date: "1942年8–9月", zh: "薩沃島海戰", en: "Battle of Savo Island", nz: "日軍夜間突袭盟軍艦隊，美澳巡洋艦慘重損失。", ne: "Japanese night attack at Savo Island — heavy Allied cruiser losses.", assets: ["navy"] }),
        S(45, 159.95, -9.42, 580, { date: "1942年10月", zh: "亨德森機場爭奪", en: "Fight for Henderson Field", nz: "日軍多次夜間進攻機場，雙方叢林血戰。", ne: "Repeated Japanese night assaults on the airfield.", focus: ["us_marines", "jp_garrison"], side: "both", assets: ["air", "artillery"] }),
        S(65, 159.95, -9.42, 600, { date: "1942年11月", zh: "瓜島海戰", en: "Naval Battles", nz: "聖克魯斯、瓜島海戰消耗雙方艦隊。", ne: "Santa Cruz and Guadalcanal naval battles attrit both fleets.", assets: ["navy", "air"] }),
        S(90, 159.95, -9.42, 700, { date: "1943年2月", zh: "日軍撤退", en: "Japanese Evacuation", nz: "日軍秘密撤出瓜島，盟軍反攻得手。", ne: "Japan secretly evacuates — the Allied counter-offensive succeeds.", focus: ["us_marines"], side: "us" }),
      ],
    },
    "ww2-pacific/iwo-jima": {
      END_DAY: 100,
      analysis: A(
        "美軍為奪取靠近日本本土的轟炸機基地進攻硫磺島；日軍坑道防守，傷亡極其慘烈。",
        "美國海空壓倒優勢；日軍「玉碎」戰術，幾全軍覆沒。",
        "標誌性升旗照片；為轟炸日本本土與最終勝利鋪路。"
      ),
      storyboard: [
        S(1, 141.4, 24.85, 550, { date: "1945年2月19日", zh: "兩棲登陸", en: "Amphibious Landing", nz: "美軍海軍陸戰隊在硫磺島灘頭登陸，遭日軍火力壓制。", ne: "US Marines land on Iwo Jima under heavy Japanese fire.", focus: ["us_iwo"], side: "us", assets: ["landing", "navy"], commanders: [{ zh: "施密特", en: "Smith" }] }),
        S(25, 141.32, 24.78, 500, { date: "1945年2月", zh: "坑道戰", en: "Tunnel Warfare", nz: "日軍利用火山岩坑道頑抗，美軍逐米推進。", ne: "Japanese tunnel defences — US advances meter by meter.", focus: ["us_iwo", "jp_iwo"], side: "both", assets: ["artillery"] }),
        S(50, 141.29, 24.75, 450, { date: "1945年2月23日", zh: "折鉢山升旗", en: "Flag on Suribachi", nz: "美軍攻占折鉢山，升起國旗成為經典影像。", ne: "Marines raise the flag on Mount Suribachi.", focus: ["us_iwo"], side: "us" }),
        S(75, 141.29, 24.75, 520, { date: "1945年3月", zh: "島嶼掃清", en: "Island Secured", nz: "日軍幾乎全數陣亡，美軍傷亡逾兩萬。", ne: "Japanese defenders nearly wiped out — US casualties exceed 20,000.", focus: ["jp_iwo"], side: "jp", fz: "美軍傷亡 2 萬+", fe: "20,000+ US casualties" }),
        S(95, 141.32, 24.78, 650, { date: "1945年3月", zh: "逼近本土", en: "Closer to Japan", nz: "硫磺島成為 B-29 緊急降落基地。", ne: "Iwo Jima becomes an emergency base for B-29 raids on Japan.", assets: ["air"] }),
      ],
    },
    "ww2-pacific/hiroshima": {
      END_DAY: 100,
      hotspotsExtra: [
        { a: 15, b: 35, lng: 132.46, lat: 34.39, kind: "nuclear", i: 0.9 },
        { a: 40, b: 55, lng: 129.87, lat: 32.75, kind: "nuclear", i: 0.9 },
      ],
      analysis: A(
        "美軍以 B-29 投下原子彈「小男孩」「胖子」，廣島、長崎化為廢墟；日本迅速投降。",
        "美國核武壟斷；日本軍國體制已無力持久，本土決戰計劃未實施。",
        "開啟核時代；二戰結束，冷戰與去殖民化浪潮來臨。"
      ),
      storyboard: [
        S(1, 133.0, 34.5, 650, { date: "1945年8月6日 凌晨", zh: "B-29 出擊", en: "B-29 Mission", nz: "恩奧拉·蓋號 B-29 載「小男孩」飛向廣島。", ne: "Enola Gay carries \"Little Boy\" toward Hiroshima.", focus: ["us_b29"], side: "us", commanders: [{ zh: "蒂貝茨", en: "Tibbets" }], assets: ["air"] }),
        S(20, 132.46, 34.39, 500, { date: "1945年8月6日 8:15", zh: "廣島核爆", en: "Hiroshima", nz: "原子彈在廣島上空引爆，約十四萬人喪生。", ne: "\"Little Boy\" detonates — ~140,000 dead.", focus: ["us_b29"], side: "us", assets: ["nuclear", "air"] }),
        S(45, 129.87, 32.75, 550, { date: "1945年8月9日", zh: "長崎核爆", en: "Nagasaki", nz: "第二枚原子彈「胖子」摧毀長崎。", ne: "\"Fat Man\" destroys Nagasaki.", assets: ["nuclear", "air"] }),
        S(70, 139.69, 35.69, 800, { date: "1945年8月14–15日", zh: "天皇詔書", en: "Imperial Rescript", nz: "天皇宣布接受《波茨坦公告》，戰爭結束。", ne: "Emperor announces acceptance of the Potsdam Declaration.", side: "jp", commanders: [{ zh: "裕仁", en: "Hirohito" }] }),
        S(95, 132.46, 34.39, 750, { date: "1945年9月", zh: "核時代來臨", en: "Nuclear Age", nz: "太平洋戰爭結束，人類進入核威懾時代。", ne: "The Pacific War ends — humanity enters the nuclear age.", side: "both" }),
      ],
    },

    /* ========== KOREA ========== */
    "korea/invasion": {
      END_DAY: 100,
      analysis: A(
        "1950年6月北韓大舉越過三八線南侵；韓軍潰敗，聯合國軍介入，戰火延燒至釜山防線。",
        "北韓蘇聯裝備坦克部隊；美國主導聯合國軍，麥克阿瑟任司令。",
        "冷戰第一場熱戰；半島分裂固化，至今影響東北亞。"
      ),
      storyboard: [
        S(1, 127.0, 38.0, 650, { date: "1950年6月25日", zh: "越過三八線", en: "Cross the 38th Parallel", nz: "北韓七個師在坦克支援下突破三八線。", ne: "Seven North Korean divisions break through with tank support.", focus: ["nk_army"], side: "nk", commanders: [{ zh: "金日成", en: "Kim Il-sung" }], assets: ["artillery"], fz: "北韓 9 萬", fe: "90,000 KPA" }),
        S(25, 126.98, 37.57, 600, { date: "1950年6月28日", zh: "漢城陷落", en: "Seoul Falls", nz: "北韓攻占漢城，韓軍南撤。", ne: "North Korea captures Seoul — ROK forces retreat south.", focus: ["nk_army"], side: "nk" }),
        S(45, 128.0, 36.5, 620, { date: "1950年7月", zh: "聯合國介入", en: "UN Intervention", nz: "安理會決議派兵，美軍為主組成聯合國軍。", ne: "UN authorises forces — US-led coalition deploys.", focus: ["un_army"], side: "un", commanders: [{ zh: "麥克阿瑟", en: "MacArthur" }], assets: ["navy"] }),
        S(70, 129.04, 35.18, 580, { date: "1950年8月", zh: "釜山防線", en: "Pusan Perimeter", nz: "聯合國軍被壓縮至半島南端，死守釜山橋頭堡。", ne: "UN forces hold the Pusan perimeter in the southeast.", focus: ["un_army", "nk_army"], side: "both", assets: ["artillery"] }),
        S(95, 129.04, 35.18, 700, { date: "1950年9月初", zh: "戰局懸念", en: "War in the Balance", nz: "北韓占領大半島，聯合國準備反擊。", ne: "North Korea holds most of the peninsula — UN plans counter-offensive.", side: "both" }),
      ],
    },
    "korea/inchon": {
      END_DAY: 100,
      analysis: A(
        "麥克阿瑟策劃仁川兩棲登陸，切斷北韓補給；聯合國軍收復漢城，扭轉戰局。",
        "美國海空優勢；北韓後方空虛，仁川潮汐限制大膽賭注。",
        "韓戰第一次戰略逆轉；但隨後聯軍北進觸發中國參戰。"
      ),
      storyboard: [
        S(1, 126.3, 37.3, 550, { date: "1950年9月15日", zh: "仁川登陸", en: "Inchon Landing", nz: "聯合國軍在仁川港兩棲登陸，月尾島先遭炮擊。", ne: "UN amphibious landing at Inchon — Wolmi-do bombarded first.", focus: ["un_inchon"], side: "un", commanders: [{ zh: "麥克阿瑟", en: "MacArthur" }], assets: ["landing", "navy", "artillery"] }),
        S(30, 126.62, 37.46, 500, { date: "1950年9月15–17日", zh: "奪取港口", en: "Seize the Port", nz: "美軍海軍陸戰隊突破仁川防線，北韓守軍被圍。", ne: "Marines break Inchon defences — KPA garrison encircled.", focus: ["un_inchon", "nk_inchon"], side: "both", assets: ["landing"] }),
        S(55, 126.98, 37.57, 580, { date: "1950年9月下旬", zh: "收復漢城", en: "Recapture Seoul", nz: "聯合國軍收復漢城，切斷北韓補給與退路。", ne: "UN forces recapture Seoul — North Korean supply lines cut.", focus: ["un_inchon"], side: "un" }),
        S(80, 127.0, 38.0, 650, { date: "1950年10月", zh: "越過三八線", en: "Cross Northward", nz: "聯合國軍北上，戰火燒向鴨綠江。", ne: "UN forces advance north — war reaches the Yalu.", side: "un" }),
        S(95, 126.62, 37.46, 700, { date: "1950年秋", zh: "戰局逆轉", en: "Tide Turns", nz: "仁川登陸成為韓戰決定性兩棲作戰。", ne: "Inchon becomes the decisive amphibious operation of the Korean War.", side: "un" }),
      ],
    },
    "korea/chosin": {
      END_DAY: 100,
      analysis: A(
        "志願軍入朝後發動長津湖戰役，重創美陸戰一師等部；美軍「向大海撤退」突圍。",
        "中國志願軍耐寒作戰、夜戰與人海戰術；美軍裝備與空運優勢。",
        "聯合國軍北進計劃破滅；戰爭回到三八線附近僵持。"
      ),
      storyboard: [
        S(1, 127.5, 40.5, 700, { date: "1950年11月", zh: "志願軍入朝", en: "Chinese Enter War", nz: "中國人民志願軍秘密渡過鴨綠江，包圍聯合國軍。", ne: "Chinese People's Volunteers cross the Yalu — encircle UN forces.", side: "nk", commanders: [{ zh: "彭德懷", en: "Peng Dehuai" }], fz: "志願軍 20 萬+", fe: "200,000+ CPV" }),
        S(25, 127.2, 40.2, 620, { date: "1950年11月27日", zh: "長津湖包圍", en: "Chosin Encirclement", nz: "志願軍在嚴寒中分割並包圍美陸戰一師等部隊。", ne: "CPV splits and encircles US 1st Marine Division in extreme cold.", focus: ["un_chosin"], side: "un", commanders: [{ zh: "史密斯", en: "Smith" }] }),
        S(50, 127.0, 40.0, 580, { date: "1950年11–12月", zh: "嚴寒血戰", en: "Battle in the Cold", nz: "氣溫降至攝氏零下三十度，雙方在冰雪中激戰。", ne: "Temperatures plunge to -30°C — brutal fighting in ice and snow.", focus: ["un_chosin"], side: "both", assets: ["artillery"] }),
        S(75, 126.5, 39.5, 600, { date: "1950年12月", zh: "向大海撤退", en: "Advance to the Sea", nz: "美陸戰一師突破重圍，撤向興南港。", ne: "1st Marine Division breaks out toward Hungnam.", focus: ["un_chosin"], side: "un", assets: ["navy"] }),
        S(95, 126.5, 39.5, 700, { date: "1950年12月", zh: "北進夢滅", en: "Northern Drive Ends", nz: "聯合國軍完全撤出北朝鮮，戰線南撤。", ne: "UN forces withdraw from North Korea — front moves south.", side: "both" }),
      ],
    },
    "korea/armistice": {
      END_DAY: 100,
      analysis: A(
        "1951–1953 年三八線附近僵持；停戰談判拖延，1953 年 7 月簽署《朝鮮停戰協定》。",
        "中美蘇介入，雙方均無法完全取勝；韓半島分裂持續。",
        "正式停火但未簽和平條約；南北分治至今，冷戰遺產。"
      ),
      storyboard: [
        S(1, 127.0, 38.0, 700, { date: "1951年", zh: "戰線穩定", en: "Line Stabilises", nz: "戰爭進入三八線附近僵持，陣地戰取代大機動。", ne: "War settles into stalemate near the 38th parallel.", side: "both" }),
        S(25, 126.5, 37.8, 650, { date: "1951–1952年", zh: "談判與炮擊", en: "Talks and Shelling", nz: "板門店停戰談判開始，前線仍激烈炮擊。", ne: "Armistice talks at Panmunjom — front-line shelling continues.", assets: ["artillery"] }),
        S(50, 127.0, 38.0, 620, { date: "1952–1953年", zh: "消耗僵持", en: "War of Attrition", nz: "雙方在坑道中拉鋸，傷亡持續但戰線變化不大。", ne: "Trench warfare and attrition — little territorial change.", side: "both" }),
        S(75, 126.7, 37.9, 580, { date: "1953年7月27日", zh: "簽署停戰", en: "Armistice Signed", nz: "《朝鮮停戰協定》在板門店簽署，軍事行動停止。", ne: "Korean Armistice signed at Panmunjom — fighting stops.", side: "both" }),
        S(95, 127.0, 38.0, 750, { date: "1953年後", zh: "分裂延續", en: "Division Endures", nz: "半島分裂固化，冷戰前沿至今。", ne: "A divided peninsula — a Cold War frontier to this day.", side: "both" }),
      ],
    },

    /* ========== MIDEAST ========== */
    "mideast/war-1948": {
      END_DAY: 100,
      analysis: A(
        "以色列建國次日，阿拉伯聯軍入侵；以軍在特拉維夫、耶路撒冷等地抵抗，最終停火線劃定。",
        "以色列全民动员與海外猶太支持；阿拉伯國家政治分裂、軍事協調不足。",
        "第一次中東戰爭確立以色列生存；巴勒斯坦難民問題與以阿敵對開端。"
      ),
      storyboard: [
        S(1, 34.78, 32.09, 650, { date: "1948年5月14日", zh: "以色列建國", en: "State of Israel", nz: "本-古里安宣布以色列國成立，美蘇相繼承認。", ne: "Ben-Gurion declares independence — US and USSR recognise Israel.", focus: ["isr_48"], side: "isr", commanders: [{ zh: "本-古里安", en: "Ben-Gurion" }] }),
        S(25, 35.21, 31.77, 600, { date: "1948年5月15日", zh: "阿拉伯聯軍入侵", en: "Arab Invasion", nz: "埃及、約旦、敘利亞等國軍隊分路進攻。", ne: "Egypt, Jordan, Syria and others invade from multiple directions.", focus: ["ar_48"], side: "arab", assets: ["artillery"], fz: "阿拉伯聯軍 6 萬", fe: "60,000 Arab troops" }),
        S(50, 35.21, 31.77, 550, { date: "1948年夏", zh: "耶路撒冷圍城", en: "Siege of Jerusalem", nz: "猶太區遭圍困，補給靠空中走廊。", ne: "Jewish districts besieged — supplied by airlift.", focus: ["isr_48", "ar_48"], side: "both" }),
        S(75, 34.78, 32.09, 620, { date: "1948年秋", zh: "以軍反攻", en: "Israeli Counter-offensives", nz: "以軍擴張控制區，扭轉初期劣勢。", ne: "IDF expands territory — reverses early setbacks.", focus: ["isr_48"], side: "isr" }),
        S(95, 35.0, 31.9, 700, { date: "1949年", zh: "停火線", en: "Armistice Lines", nz: "各線停火，綠線劃定，難民問題遺留。", ne: "Armistice lines drawn — refugee crisis endures.", side: "both" }),
      ],
    },
    "mideast/six-day": {
      END_DAY: 100,
      analysis: A(
        "1967年6月以色列先發制人，空軍摧毀阿拉伯機場；六日內占領西奈、戈蘭、約旦河西岸與東耶路撒冷。",
        "以色列情報與空軍精銳；阿拉伯國家疏於備戰、指揮混亂。",
        "以色列大幅擴張；巴勒斯坦占領問題、定居點與以阿關係長期惡化。"
      ),
      storyboard: [
        S(1, 34.78, 32.09, 700, { date: "1967年6月5日", zh: "焦土作戰", en: "Operation Focus", nz: "以軍空軍先發制人，摧毀埃及等國機場上戰機。", ne: "Israeli Air Force destroys Arab aircraft on the ground.", focus: ["isr_67"], side: "isr", commanders: [{ zh: "戴揚", en: "Dayan" }], assets: ["air"], fz: "以軍空軍 200+ 架", fe: "200+ Israeli aircraft" }),
        S(25, 33.0, 30.0, 650, { date: "1967年6月5–6日", zh: "西奈進攻", en: "Sinai Offensive", nz: "以軍坦克突破埃及防線，向蘇伊士運河推進。", ne: "Israeli armour breaks through toward the Suez Canal.", focus: ["isr_67", "ar_67"], side: "both", assets: ["artillery"] }),
        S(50, 35.75, 33.05, 600, { date: "1967年6月7日", zh: "戈蘭高地", en: "Golan Heights", nz: "以軍攻占敘利亞戈蘭高地。", ne: "Israel captures the Syrian Golan Heights.", focus: ["isr_67"], side: "isr" }),
        S(75, 35.21, 31.77, 580, { date: "1967年6月7–10日", zh: "耶路撒冷與西岸", en: "Jerusalem & West Bank", nz: "以軍占領東耶路撒冷及約旦河西岸。", ne: "East Jerusalem and the West Bank fall to Israel.", focus: ["isr_67"], side: "isr" }),
        S(95, 34.78, 32.09, 750, { date: "1967年6月10日", zh: "六日戰爭結束", en: "War Ends in Six Days", nz: "以色列大獲全勝，版圖劇變。", ne: "Israel wins decisively — borders transformed.", side: "isr" }),
      ],
    },
    "mideast/yom-kippur": {
      END_DAY: 100,
      analysis: A(
        "1973年贖罪日埃及敘利亞突襲；以軍初期受挫後反擊，雙方在國際壓力下停火。",
        "阿拉伯石油武器；美蘇冷戰代理人競爭；以色列動員與美國補給。",
        "以阿開始和談（戴維營）；石油危機衝擊西方經濟。"
      ),
      storyboard: [
        S(1, 32.35, 30.45, 650, { date: "1973年10月6日", zh: "贖罪日突襲", en: "Yom Kippur Surprise", nz: "埃及敘利亞在贖罪日同時發動進攻。", ne: "Egypt and Syria attack on Yom Kippur.", focus: ["ar_73"], side: "arab", commanders: [{ zh: "薩達特", en: "Sadat" }], assets: ["artillery"] }),
        S(25, 33.8, 29.5, 600, { date: "1973年10月", zh: "蘇伊士渡河", en: "Cross the Suez", nz: "埃及軍隊強渡運河，突破巴列夫防線。", ne: "Egyptian forces cross the canal — breach the Bar-Lev Line.", focus: ["ar_73"], side: "arab", assets: ["artillery"] }),
        S(50, 34.0, 31.0, 580, { date: "1973年10月中旬", zh: "以軍反擊", en: "Israeli Counter-attack", nz: "以軍動員預備役，在戈蘭與西奈反擊。", ne: "Israel mobilises reserves — counter-attacks on both fronts.", focus: ["isr_73"], side: "isr", commanders: [{ zh: "戴揚", en: "Dayan" }], assets: ["air"] }),
        S(75, 32.35, 30.45, 620, { date: "1973年10月", zh: "西奈對峙", en: "Standoff in Sinai", nz: "以軍渡河包圍埃及第三集團軍，戰局僵持。", ne: "Israeli forces encircle Egyptian 3rd Army — stalemate.", focus: ["isr_73", "ar_73"], side: "both" }),
        S(95, 34.0, 31.0, 700, { date: "1973年10月", zh: "停火與談判", en: "Ceasefire and Talks", nz: "聯合國停火，為戴維營和談鋪路。", ne: "UN ceasefire — path to Camp David talks.", side: "both" }),
      ],
    },
    "mideast/gaza-intifada": {
      END_DAY: 100,
      analysis: A(
        "1987年巴勒斯坦大起義（Intifada）在加沙、西岸爆發；以色列軍警與民間抵抗長期衝突。",
        "以色列軍事優勢；巴勒斯坦民眾石塊、罷工與國際輿論。",
        "推動奧斯陸和談；以巴關係短暫緩和後仍深陷暴力循環。"
      ),
      storyboard: [
        S(1, 34.47, 31.5, 600, { date: "1987年12月", zh: "加沙起義", en: "Uprising in Gaza", nz: "加沙難民營抗議演變為全面起義。", ne: "Gaza refugee camp protests escalate into the Intifada.", focus: ["ar_gaza"], side: "arab" }),
        S(25, 34.47, 31.5, 550, { date: "1988年", zh: "石塊與罷工", en: "Stones and Strikes", nz: "巴勒斯坦青年以石塊對抗以軍，全區罷工。", ne: "Palestinian youths confront troops — general strikes spread.", focus: ["ar_gaza"], side: "arab" }),
        S(50, 34.78, 32.09, 620, { date: "1988–1990年", zh: "以軍鎮壓", en: "Israeli Crackdown", nz: "以色列實施宵禁、拘捕與武力回應。", ne: "Israel imposes curfews, arrests and forceful responses.", focus: ["isr_gaza"], side: "isr", assets: ["artillery"] }),
        S(75, 35.3, 31.95, 580, { date: "1991年前後", zh: "國際關注", en: "International Attention", nz: "馬德里和談與奧斯陸進程啟動。", ne: "Madrid talks and the Oslo process begin.", side: "both" }),
        S(95, 34.47, 31.5, 700, { date: "1993年", zh: "奧斯陸協議", en: "Oslo Accords", nz: "巴解與以色列簽署原則宣言，起義逐步平息。", ne: "PLO and Israel sign principles — Intifada winds down.", side: "both" }),
      ],
    },

    /* ========== BALKANS ========== */
    "balkans/vukovar": {
      END_DAY: 100,
      analysis: A(
        "1991年南斯拉夫人民軍圍攻武科瓦爾；克羅地亞守軍抵抗後陷落，象徵克獨立戰爭殘酷。",
        "南斯拉夫聯邦瓦解；塞族與克族民族主義對立。",
        "克羅地亞獨立戰爭關鍵一役；種族清洗與戰爭罪指控。"
      ),
      storyboard: [
        S(1, 19.3, 45.5, 600, { date: "1991年8月", zh: "南斯拉夫軍圍城", en: "JNA Besieges Vukovar", nz: "南斯拉夫人民軍與塞族民兵包圍武科瓦爾。", ne: "Yugoslav People's Army and Serb militia besiege Vukovar.", focus: ["sr_vuk"], side: "sr", assets: ["artillery"] }),
        S(25, 19.0, 45.35, 520, { date: "1991年9–10月", zh: "城市巷戰", en: "Urban Fighting", nz: "克羅地亞守軍在廢墟中頑抗。", ne: "Croatian defenders fight in the ruins.", focus: ["co_vuk", "sr_vuk"], side: "both", assets: ["artillery"] }),
        S(50, 19.0, 45.35, 480, { date: "1991年11月", zh: "補給斷絕", en: "Supplies Cut", nz: "守軍彈盡糧絕，平民傷亡慘重。", ne: "Defenders run out of supplies — heavy civilian casualties.", focus: ["co_vuk"], side: "co" }),
        S(75, 19.0, 45.35, 550, { date: "1991年11月18日", zh: "武科瓦爾陷落", en: "Vukovar Falls", nz: "城市陷落，成為戰爭殘酷象徵。", ne: "The city falls — a symbol of the war's brutality.", focus: ["sr_vuk"], side: "sr" }),
        S(95, 19.0, 45.35, 650, { date: "1991年後", zh: "克羅地亞獨立", en: "Croatian Independence", nz: "武科瓦爾推動克羅地亞獨立與國際承認。", ne: "Vukovar galvanises Croatian independence.", side: "co" }),
      ],
    },
    "balkans/sarajevo": {
      END_DAY: 100,
      analysis: A(
        "1992–1996年塞族部隊圍困薩拉熱窩；波黑首都遭炮擊與狙擊，國際社會介入維和。",
        "波黑三族分立；塞族軍事優勢與山區火力。",
        "波黑戰爭象徵；代頓協議後波黑成為複合國家。"
      ),
      storyboard: [
        S(1, 18.41, 43.86, 550, { date: "1992年4月", zh: "圍城開始", en: "Siege Begins", nz: "塞族部隊占領高地，炮轟薩拉熱窩。", ne: "Serb forces occupy heights — shell Sarajevo.", focus: ["sr_sar"], side: "sr", assets: ["artillery"] }),
        S(25, 18.41, 43.86, 500, { date: "1992–1994年", zh: "狙擊與炮擊", en: "Snipers and Shelling", nz: "市民在「狙擊手巷子」與炮擊下生活。", ne: "Civilians live under snipers and artillery.", focus: ["co_sar"], side: "co", assets: ["artillery"] }),
        S(50, 18.41, 43.86, 520, { date: "1993年", zh: "國際介入", en: "International Role", nz: "聯合國維和部隊進駐，人道走廊開放。", ne: "UN peacekeepers deploy — humanitarian corridors.", side: "both" }),
        S(75, 18.41, 43.86, 580, { date: "1995年", zh: "北約空襲", en: "NATO Air Strikes", nz: "斯雷布雷尼察後北約加強對塞族目標打擊。", ne: "After Srebrenica, NATO intensifies strikes on Serb targets.", assets: ["air"] }),
        S(95, 18.41, 43.86, 650, { date: "1996年", zh: "圍城結束", en: "Siege Ends", nz: "代頓協議後圍城解除，薩拉熱窩重建。", ne: "Dayton Agreement ends the siege — Sarajevo rebuilds.", side: "both" }),
      ],
    },
    "balkans/srebrenica": {
      END_DAY: 100,
      analysis: A(
        "1995年7月波塞族軍攻占聯合國「安全區」斯雷布雷尼察；逾八千穆斯林男子遭屠殺。",
        "聯合國維和兵力不足；波塞族軍事優勢與報復心態。",
        "二戰後歐洲最嚴重暴行；海牙法庭戰爭罪審判，推動北約介入。"
      ),
      storyboard: [
        S(1, 19.5, 44.2, 600, { date: "1995年7月6日", zh: "塞族進攻", en: "Serb Offensive", nz: "波塞族軍向斯雷布雷尼察安全區推進。", ne: "Bosnian Serb Army advances on the Srebrenica safe area.", focus: ["sr_sreb"], side: "sr", commanders: [{ zh: "姆拉迪奇", en: "Mladić" }], assets: ["artillery"] }),
        S(25, 19.29, 44.1, 520, { date: "1995年7月11日", zh: "安全區陷落", en: "Safe Area Falls", nz: "荷蘭維和部隊未能阻止塞族軍進入。", ne: "Dutch peacekeepers fail to stop Serb entry.", focus: ["co_sreb"], side: "co" }),
        S(50, 19.29, 44.1, 480, { date: "1995年7月12–13日", zh: "大屠殺", en: "Massacre", nz: "逾八千穆斯林男子遭分離並處決。", ne: "Over 8,000 Muslim men and boys separated and executed.", focus: ["sr_sreb"], side: "sr", fz: "遇難 8000+", fe: "8,000+ killed" }),
        S(75, 19.29, 44.1, 550, { date: "1995年7月", zh: "國際譴責", en: "International Outcry", nz: "屠殺曝光，北約決定加強空襲。", ne: "Massacre exposed — NATO decides on intensified air strikes.", assets: ["air"] }),
        S(95, 19.29, 44.1, 650, { date: "1995年後", zh: "海牙審判", en: "Hague Trials", nz: "姆拉迪奇等被控種族滅絕與戰爭罪。", ne: "Mladić and others charged with genocide and war crimes.", side: "both" }),
      ],
    },
    "balkans/kosovo": {
      END_DAY: 100,
      analysis: A(
        "1998–1999年科索沃阿族起義與塞族鎮壓；北約 1999 年空襲南斯拉夫，科索沃由聯合國托管。",
        "北約空軍與塞族地面軍；俄羅斯反對北約行動。",
        "科索沃地位未定；2008 年單方面宣布獨立，區域緊張延續。"
      ),
      storyboard: [
        S(1, 21.0, 42.6, 650, { date: "1998年", zh: "科索沃解放軍", en: "KLA Uprising", nz: "科索沃阿族武裝與塞族安全部隊衝突。", ne: "Kosovo Albanian KLA clashes with Serb security forces.", focus: ["co_kos"], side: "co" }),
        S(25, 21.17, 42.66, 580, { date: "1998–1999年", zh: "塞族鎮壓", en: "Serb Crackdown", nz: "塞爾維亞軍警掃蕩村莊，難民湧入鄰國。", ne: "Serb forces sweep villages — refugees flee.", focus: ["sr_kos"], side: "sr", assets: ["artillery"], commanders: [{ zh: "米洛舍維奇", en: "Milošević" }] }),
        S(50, 20.46, 44.79, 700, { date: "1999年3月", zh: "北約空襲", en: "NATO Air Campaign", nz: "北約對南斯拉夫實施大規模空襲。", ne: "NATO launches a major air campaign against Yugoslavia.", assets: ["air"], fz: "北約 38 國", fe: "NATO 38-nation coalition" }),
        S(75, 21.17, 42.66, 600, { date: "1999年6月", zh: "塞軍撤出", en: "Serb Withdrawal", nz: "塞爾維亞軍隊撤出，聯合國接管科索沃。", ne: "Serb forces withdraw — UN administers Kosovo.", focus: ["co_kos"], side: "co" }),
        S(95, 21.17, 42.66, 750, { date: "1999年後", zh: "科索沃託管", en: "Kosovo Under UN", nz: "科索沃地位爭議延續至今。", ne: "Kosovo's status remains disputed to this day.", side: "both" }),
      ],
    },
  };
};
