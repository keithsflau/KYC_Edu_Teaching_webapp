/**
 * Scholarly biblical / church-history site coordinates (WGS84).
 * Identifications: Tell el-Muqayyar (Ur), Harran, Tell Balata (Shechem),
 * Beitin (Bethel), Tell es-Sultan (Jericho), Qantir (Pi-Ramesses), Jebel Musa (Sinai), etc.
 */
module.exports = {
  // —— Abraham (Gen 11–25) ——
  ur: { lng: 46.103, lat: 30.962, name_zh: "吾珥", name_en: "Ur", type: "city", ref: "創 11:28" },
  haran: { lng: 39.033, lat: 36.867, name_zh: "哈蘭", name_en: "Haran", type: "city", ref: "創 11:31" },
  shechem: { lng: 35.289, lat: 32.213, name_zh: "示劍", name_en: "Shechem", type: "town", ref: "創 12:6" },
  bethel: { lng: 35.222, lat: 31.927, name_zh: "伯特利", name_en: "Bethel", type: "town", ref: "創 12:8" },
  hebron: { lng: 35.099, lat: 31.524, name_zh: "希伯崙", name_en: "Hebron", type: "town", ref: "創 13:18" },
  beersheba: { lng: 34.793, lat: 31.245, name_zh: "別是巴", name_en: "Beersheba", type: "town", ref: "創 21:31" },
  gerar: { lng: 34.617, lat: 31.383, name_zh: "基拉耳", name_en: "Gerar", type: "town", ref: "創 20:1" },
  goshen: { lng: 31.2, lat: 30.55, name_zh: "歌珊", name_en: "Goshen", type: "region", ref: "創 46:34" },
  moriah: { lng: 35.235, lat: 31.778, name_zh: "摩利亞", name_en: "Moriah", type: "peak", ref: "創 22:2" },

  // —— Exodus & Conquest ——
  rameses: { lng: 32.113, lat: 30.794, name_zh: "蘭塞", name_en: "Pi-Ramesses", type: "city", ref: "出 1:11" },
  succoth: { lng: 32.183, lat: 30.558, name_zh: "疏割", name_en: "Succoth", type: "town", ref: "出 12:37" },
  pi_hahiroth: { lng: 32.45, lat: 29.95, name_zh: "比哈洗烈", name_en: "Pi-hahiroth", type: "bay", ref: "出 14:2" },
  red_sea: { lng: 32.35, lat: 29.0, name_zh: "紅海", name_en: "Red Sea", type: "bay", ref: "出 14:21" },
  sinai: { lng: 33.975, lat: 28.539, name_zh: "西奈山", name_en: "Mount Sinai", type: "peak", ref: "出 19:1" },
  rephidim: { lng: 33.98, lat: 28.75, name_zh: "利非訂", name_en: "Rephidim", type: "town", ref: "出 17:1" },
  kadesh: { lng: 34.451, lat: 30.601, name_zh: "加低斯", name_en: "Kadesh-barnea", type: "town", ref: "民 13:26" },
  jericho: { lng: 35.444, lat: 31.872, name_zh: "耶利哥", name_en: "Jericho", type: "fort", ref: "書 6:1" },
  gilgal: { lng: 35.483, lat: 31.867, name_zh: "吉甲", name_en: "Gilgal", type: "town", ref: "書 4:19" },
  ai: { lng: 35.262, lat: 31.916, name_zh: "艾城", name_en: "Ai", type: "fort", ref: "書 7:2" },

  // —— Judges ——
  megiddo: { lng: 35.185, lat: 32.585, name_zh: "米吉多", name_en: "Megiddo", type: "fort", ref: "士 5:19" },
  tabor: { lng: 35.391, lat: 32.687, name_zh: "他泊山", name_en: "Mount Tabor", type: "peak", ref: "士 4:6" },
  kishon: { lng: 35.12, lat: 32.55, name_zh: "基順河", name_en: "Kishon", type: "bay", ref: "士 4:7" },
  ophrah: { lng: 35.203, lat: 32.189, name_zh: "俄弗拉", name_en: "Ophrah", type: "town", ref: "士 6:11" },
  jezreel: { lng: 35.329, lat: 32.557, name_zh: "耶斯列", name_en: "Jezreel", type: "region", ref: "士 6:33" },
  zorah: { lng: 34.978, lat: 31.758, name_zh: "瑣拉", name_en: "Zorah", type: "town", ref: "士 13:2" },
  gibeah: { lng: 35.239, lat: 31.823, name_zh: "基比亞", name_en: "Gibeah", type: "town", ref: "士 19:12" },
  shiloh: { lng: 35.29, lat: 32.057, name_zh: "示羅", name_en: "Shiloh", type: "town", ref: "士 21:19" },

  // —— David ——
  bethlehem: { lng: 35.202, lat: 31.705, name_zh: "伯利恆", name_en: "Bethlehem", type: "town", ref: "撒上 16:1" },
  elah: { lng: 34.948, lat: 31.695, name_zh: "以拉谷", name_en: "Valley of Elah", type: "town", ref: "撒上 17:2" },
  jerusalem: { lng: 35.235, lat: 31.778, name_zh: "耶路撒冷", name_en: "Jerusalem", type: "city", ref: "撒下 5:7" },
  en_gedi: { lng: 35.388, lat: 31.453, name_zh: "隱基遍", name_en: "En-gedi", type: "town", ref: "撒上 24:1" },
  ziklag: { lng: 34.683, lat: 31.383, name_zh: "洗革拉", name_en: "Ziklag", type: "town", ref: "撒上 27:6" },
  keilah: { lng: 34.948, lat: 31.616, name_zh: "基伊拉", name_en: "Keilah", type: "town", ref: "撒上 23:1" },

  // —— Solomon ——
  temple_mount: { lng: 35.235, lat: 31.778, name_zh: "聖殿山", name_en: "Temple Mount", type: "fort", ref: "王上 6:1" },
  gibeon: { lng: 35.185, lat: 31.847, name_zh: "基遍", name_en: "Gibeon", type: "town", ref: "王上 3:4" },
  tyre: { lng: 35.194, lat: 33.271, name_zh: "推羅", name_en: "Tyre", type: "city", ref: "王上 5:1" },
  ezion_geber: { lng: 34.948, lat: 29.556, name_zh: "以旬迦別", name_en: "Ezion-geber", type: "city", ref: "王上 9:26" },

  // —— Kingdom split ——
  tirzah: { lng: 35.289, lat: 32.252, name_zh: "得撒", name_en: "Tirzah", type: "city", ref: "王上 14:17" },
  samaria: { lng: 35.193, lat: 32.276, name_zh: "撒瑪利亞", name_en: "Samaria", type: "city", ref: "王上 16:24" },
  dan: { lng: 35.649, lat: 33.241, name_zh: "但", name_en: "Dan", type: "town", ref: "王上 12:29" },

  // —— Prophets ——
  carmel: { lng: 35.045, lat: 32.741, name_zh: "迦密山", name_en: "Mount Carmel", type: "peak", ref: "王上 18:19" },
  anathoth: { lng: 35.265, lat: 31.807, name_zh: "亞拿突", name_en: "Anathoth", type: "town", ref: "耶 1:1" },
  lachish: { lng: 34.848, lat: 31.565, name_zh: "拉吉", name_en: "Lachish", type: "fort", ref: "耶 34:7" },
  babylon: { lng: 44.42, lat: 32.536, name_zh: "巴比倫", name_en: "Babylon", type: "city", ref: "耶 25:9" },
  nineveh: { lng: 43.152, lat: 36.357, name_zh: "尼尼微", name_en: "Nineveh", type: "city", ref: "拿 1:2" },
  tel_abib: { lng: 44.0, lat: 32.0, name_zh: "提勒亞畢", name_en: "Tel Abib", type: "town", ref: "結 3:15" },

  // —— Jesus ——
  nazareth: { lng: 35.297, lat: 32.702, name_zh: "拿撒勒", name_en: "Nazareth", type: "town", ref: "路 2:39" },
  capernaum: { lng: 35.575, lat: 32.881, name_zh: "迦百農", name_en: "Capernaum", type: "town", ref: "太 4:13" },
  cana: { lng: 35.348, lat: 32.746, name_zh: "迦拿", name_en: "Cana", type: "town", ref: "約 2:1" },
  galilee_sea: { lng: 35.5, lat: 32.833, name_zh: "加利利海", name_en: "Sea of Galilee", type: "bay", ref: "太 4:18" },
  bethany: { lng: 35.263, lat: 31.771, name_zh: "伯大尼", name_en: "Bethany", type: "town", ref: "約 11:1" },
  gethsemane: { lng: 35.24, lat: 31.78, name_zh: "客西馬尼", name_en: "Gethsemane", type: "peak", ref: "太 26:36" },
  emmaus: { lng: 34.99, lat: 31.838, name_zh: "以馬忤斯", name_en: "Emmaus", type: "town", ref: "路 24:13" },

  // —— Paul ——
  damascus: { lng: 36.306, lat: 33.511, name_zh: "大馬士革", name_en: "Damascus", type: "city", ref: "徒 9:3" },
  antioch_syria: { lng: 36.158, lat: 36.202, name_zh: "安提阿", name_en: "Antioch", type: "city", ref: "徒 11:26" },
  salamis: { lng: 33.897, lat: 35.182, name_zh: "撒拉米", name_en: "Salamis", type: "city", ref: "徒 13:5" },
  perga: { lng: 30.853, lat: 36.961, name_zh: "別加", name_en: "Perga", type: "city", ref: "徒 13:13" },
  pisidian_antioch: { lng: 31.274, lat: 38.321, name_zh: "彼西底安提阿", name_en: "Pisidian Antioch", type: "city", ref: "徒 13:14" },
  iconium: { lng: 32.485, lat: 37.871, name_zh: "以哥念", name_en: "Iconium", type: "city", ref: "徒 14:1" },
  lystra: { lng: 32.345, lat: 37.595, name_zh: "路司得", name_en: "Lystra", type: "city", ref: "徒 14:6" },
  troas: { lng: 26.17, lat: 39.755, name_zh: "特羅亞", name_en: "Troas", type: "city", ref: "徒 16:8" },
  philippi: { lng: 24.286, lat: 41.013, name_zh: "腓立比", name_en: "Philippi", type: "city", ref: "徒 16:12" },
  thessalonica: { lng: 22.944, lat: 40.64, name_zh: "帖撒羅尼迦", name_en: "Thessalonica", type: "city", ref: "徒 17:1" },
  athens: { lng: 23.728, lat: 37.984, name_zh: "雅典", name_en: "Athens", type: "city", ref: "徒 17:16" },
  corinth: { lng: 22.878, lat: 37.906, name_zh: "哥林多", name_en: "Corinth", type: "city", ref: "徒 18:1" },
  ephesus: { lng: 27.341, lat: 37.94, name_zh: "以弗所", name_en: "Ephesus", type: "city", ref: "徒 19:1" },
  caesarea: { lng: 34.894, lat: 32.5, name_zh: "該撒利亞", name_en: "Caesarea", type: "city", ref: "徒 21:8" },
  rome: { lng: 12.453, lat: 41.902, name_zh: "羅馬", name_en: "Rome", type: "city", ref: "徒 28:16" },

  // —— Gospel Europe ——
  constantinople: { lng: 28.979, lat: 41.008, name_zh: "君士坦丁堡", name_en: "Constantinople", type: "city", ref: "教會史 330" },
  alexandria: { lng: 29.919, lat: 31.2, name_zh: "亞歷山大", name_en: "Alexandria", type: "city", ref: "教會史" },
  milan: { lng: 9.19, lat: 45.464, name_zh: "米蘭", name_en: "Milan", type: "city", ref: "313 米蘭詔" },
  moravia: { lng: 17.0, lat: 48.75, name_zh: "摩拉維亞", name_en: "Moravia", type: "region", ref: "863 斯拉夫宣教" },
  kiev: { lng: 30.514, lat: 50.453, name_zh: "基輔", name_en: "Kiev", type: "city", ref: "988 羅斯歸主" },

  // —— Crusades ——
  clermont: { lng: 3.083, lat: 45.779, name_zh: "克萊蒙", name_en: "Clermont", type: "city", ref: "1095 教皇號召" },
  nicaea: { lng: 29.721, lat: 40.429, name_zh: "尼西亞", name_en: "Nicaea", type: "city", ref: "1097 圍城" },
  antioch: { lng: 36.158, lat: 36.202, name_zh: "安條克", name_en: "Antioch", type: "city", ref: "1098 圍城" },
  hattin: { lng: 35.505, lat: 32.806, name_zh: "哈丁", name_en: "Hattin", type: "fort", ref: "1187 戰役" },
  acre: { lng: 35.084, lat: 32.926, name_zh: "阿卡", name_en: "Acre", type: "fort", ref: "1291 陷落" },

  // —— Extended OT sites ——
  moab: { lng: 35.705, lat: 31.442, name_zh: "摩押", name_en: "Moab", type: "region", ref: "得 1:1" },
  susa: { lng: 48.259, lat: 32.194, name_zh: "書珊", name_en: "Susa", type: "city", ref: "斯 1:2" },
  uz: { lng: 35.45, lat: 30.55, name_zh: "烏斯地", name_en: "Land of Uz", type: "region", ref: "伯 1:1" },
  gath: { lng: 34.65, lat: 31.6, name_zh: "迦特", name_en: "Gath", type: "city", ref: "撒上 17:4" },
  gaza: { lng: 34.47, lat: 31.5, name_zh: "迦薩", name_en: "Gaza", type: "city", ref: "士 16:1" },
  joppa: { lng: 34.75, lat: 32.05, name_zh: "約帕", name_en: "Joppa", type: "city", ref: "拿 1:3" },
  mount_olives: { lng: 35.244, lat: 31.778, name_zh: "橄欖山", name_en: "Mount of Olives", type: "peak", ref: "亞 14:4" },
  mount_gerizim: { lng: 35.285, lat: 32.198, name_zh: "基利心山", name_en: "Mount Gerizim", type: "peak", ref: "申 11:29" },
  mount_ebal: { lng: 35.273, lat: 32.213, name_zh: "以巴路山", name_en: "Mount Ebal", type: "peak", ref: "申 11:29" },
  moab_plains: { lng: 35.62, lat: 31.75, name_zh: "摩押平原", name_en: "Plains of Moab", type: "region", ref: "申 34:1" },
  ramah: { lng: 35.195, lat: 31.85, name_zh: "拉瑪", name_en: "Ramah", type: "town", ref: "撒上 1:1" },
  ekron: { lng: 34.85, lat: 31.78, name_zh: "以革倫", name_en: "Ekron", type: "city", ref: "撒上 5:10" },
  ashkelon: { lng: 34.55, lat: 31.67, name_zh: "亞實基倫", name_en: "Ashkelon", type: "city", ref: "摩 1:8" },
  tarshish: { lng: -6.0, lat: 37.38, name_zh: "他施", name_en: "Tarshish", type: "city", ref: "拿 1:3" },
  edom: { lng: 35.45, lat: 30.55, name_zh: "以東", name_en: "Edom", type: "region", ref: "俄 1:1" },
  tekoa: { lng: 35.22, lat: 31.65, name_zh: "提哥亞", name_en: "Tekoa", type: "town", ref: "摩 1:1" },
  samaria_region: { lng: 35.193, lat: 32.276, name_zh: "撒瑪利亞山地", name_en: "Samaria", type: "region", ref: "何 1:2" },
  persepolis: { lng: 52.891, lat: 29.935, name_zh: "波斯波利斯", name_en: "Persepolis", type: "city", ref: "斯 1:1" },
  zion: { lng: 35.234, lat: 31.776, name_zh: "錫安", name_en: "Zion", type: "peak", ref: "詩 2:6" },
  babylon_river: { lng: 44.42, lat: 32.536, name_zh: "巴比倫河", name_en: "Rivers of Babylon", type: "bay", ref: "詩 137:1" },
  lebanon: { lng: 35.85, lat: 33.85, name_zh: "黎巴嫩", name_en: "Lebanon", type: "region", ref: "歌 4:15" },
  egypt: { lng: 31.85, lat: 30.95, name_zh: "埃及", name_en: "Egypt", type: "region", ref: "耶 43:7" },
  valley_jehoshaphat: { lng: 35.241, lat: 31.772, name_zh: "約沙法谷", name_en: "Valley of Jehoshaphat", type: "region", ref: "珥 3:2" },
  patmos: { lng: 26.548, lat: 37.321, name_zh: "拔摩", name_en: "Patmos", type: "island", ref: "啟 1:9" },
  colossae: { lng: 29.123, lat: 37.787, name_zh: "歌羅西", name_en: "Colossae", type: "city", ref: "西 1:2" },
  crete: { lng: 24.9, lat: 35.2, name_zh: "克里特", name_en: "Crete", type: "island", ref: "多 1:5" },
};

/** Copy site for geography.points */
module.exports.pt = function pt(key) {
  const s = module.exports[key];
  if (!s) throw new Error("Unknown bible location: " + key);
  return { name_zh: s.name_zh, name_en: s.name_en, type: s.type, lng: s.lng, lat: s.lat, ref: s.ref };
};

module.exports.coords = function coords(key) {
  const s = module.exports[key];
  return [s.lng, s.lat];
};

module.exports.geoFromKeys = function geoFromKeys(keys, padLng = 2, padLat = 2, Z = 8) {
  const pts = keys.map((k) => module.exports[k]);
  const lngs = pts.map((p) => p.lng);
  const lats = pts.map((p) => p.lat);
  const lng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const dLng = Math.max(padLng, (Math.max(...lngs) - Math.min(...lngs)) * 1.35 + 0.8);
  const dLat = Math.max(padLat, (Math.max(...lats) - Math.min(...lats)) * 1.35 + 0.6);
  return {
    minLng: +(lng - dLng / 2).toFixed(2),
    maxLng: +(lng + dLng / 2).toFixed(2),
    minLat: +(lat - dLat / 2).toFixed(2),
    maxLat: +(lat + dLat / 2).toFixed(2),
    Z,
    center: [lng, lat],
  };
};
