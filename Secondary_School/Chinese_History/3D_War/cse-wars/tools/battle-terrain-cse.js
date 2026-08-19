/**
 * Per-battle terrain profile for HKDSE 中史 war maps.
 * Merged by scaffold-cse-battles.js.
 */
module.exports = {
  /* 秦漢 */
  "qin-han/gaixia": {
    terrainMode: "plain",
    reliefScale: 0.68,
    floodRelief: 0.14,
    water: [
      {
        kind: "corridor",
        halfWidth: 0.14,
        path: [
          [116.5, 33.9],
          [117.0, 33.75],
          [117.35, 33.55],
          [117.8, 33.45],
        ],
      },
    ],
  },
  "qin-han/mobei": { terrainMode: "steppe", reliefScale: 0.4 },

  /* 魏晉南北朝 */
  "weijin/guandu": {
    terrainMode: "plain",
    reliefScale: 0.72,
    floodRelief: 0.1,
    water: [
      {
        kind: "corridor",
        halfWidth: 0.12,
        path: [
          [113.2, 35.2],
          [113.5, 34.95],
          [113.85, 34.7],
          [114.2, 34.5],
        ],
      },
    ],
  },
  "weijin/chibi": {
    terrainMode: "river",
    water: [
      {
        kind: "corridor",
        halfWidth: 0.24,
        path: [
          [114.65, 30.08],
          [114.15, 29.9],
          [113.9, 29.72],
          [113.5, 29.58],
          [113.1, 29.48],
          [112.7, 29.4],
        ],
      },
    ],
  },
  "weijin/feishui": {
    terrainMode: "river",
    water: [
      {
        kind: "corridor",
        halfWidth: 0.11,
        path: [
          [116.75, 32.02],
          [117.05, 31.92],
          [117.28, 31.86],
          [117.55, 31.8],
          [117.85, 31.74],
        ],
      },
    ],
  },

  /* 隋唐 */
  "sui-tang/anshi": { terrainMode: "plain", reliefScale: 0.75, floodRelief: 0.1 },

  /* 宋元 */
  "song-yuan/yamen": {
    terrainMode: "ocean",
    floodRelief: 0.58,
    geoShift: { lng: 113.05, lat: 22.15, dLng: 1.4, dLat: 1.1 },
    water: [
      {
        kind: "polygon",
        ring: [
          [112.55, 22.48],
          [113.55, 22.55],
          [113.65, 22.05],
          [113.4, 21.82],
          [112.75, 21.88],
          [112.5, 22.18],
        ],
      },
    ],
  },

  /* 明清 */
  "ming-qing/tumu": { terrainMode: "plain", reliefScale: 0.7 },
  "ming-qing/sarhu": { terrainMode: "plain", reliefScale: 0.78 },

  /* 晚清 */
  "late-qing/yellow-sea": {
    terrainMode: "ocean",
    floodRelief: 0.62,
    geoShift: { lng: 123.15, lat: 38.1, dLng: 1.5, dLat: 1.3 },
  },
  "late-qing/weihaiwei": {
    terrainMode: "bay",
    floodRelief: 0.42,
    water: [
      {
        kind: "polygon",
        ring: [
          [121.88, 37.64],
          [122.45, 37.74],
          [122.4, 37.36],
          [122.05, 37.3],
          [121.85, 37.46],
        ],
      },
      { kind: "disc", lng: 122.18, lat: 37.5, radius: 0.07 },
    ],
  },

  /* 抗日 */
  "anti-japan/songhu": {
    terrainMode: "bay",
    floodRelief: 0.22,
    reliefScale: 0.82,
    geoShift: { lng: 121.5, lat: 31.2, dLng: 1.2, dLat: 0.9 },
    water: [
      {
        kind: "corridor",
        halfWidth: 0.08,
        path: [
          [121.35, 31.45],
          [121.45, 31.32],
          [121.52, 31.22],
          [121.58, 31.12],
        ],
      },
      {
        kind: "polygon",
        ring: [
          [121.65, 31.42],
          [121.95, 31.38],
          [121.92, 31.05],
          [121.62, 31.08],
        ],
      },
    ],
  },
  "anti-japan/pingxingguan": { terrainMode: "land", reliefScale: 0.82 },
  "anti-japan/taierzhuang": { terrainMode: "plain", reliefScale: 0.75, floodRelief: 0.1 },
  "anti-japan/hundred-regiments": { terrainMode: "plain", reliefScale: 0.78 },

  /* 內戰 */
  "civil-war/liaoshen": { terrainMode: "plain", reliefScale: 0.78, floodRelief: 0.1 },
  "civil-war/huaihai": { terrainMode: "plain", reliefScale: 0.72, floodRelief: 0.12 },
  "civil-war/pingjin": { terrainMode: "plain", reliefScale: 0.75, floodRelief: 0.1 },
  "civil-war/crossing": {
    terrainMode: "river",
    water: [
      {
        kind: "corridor",
        halfWidth: 0.3,
        path: [
          [117.85, 32.42],
          [118.25, 32.22],
          [118.78, 32.06],
          [119.25, 31.92],
          [119.75, 31.82],
          [120.2, 31.75],
        ],
      },
    ],
  },
};
