import Meyda from "meyda";

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

// Krumhansl-Schmuckler profiles. Index 0 is the tonic, then each semitone up.
const KS_MAJOR = [
  6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88,
];
const KS_MINOR = [
  6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17,
];

// A real key profile correlates far above chance. Below this, do not invent a key.
const MIN_CORRELATION = 0.45;

function emptyResult() {
  return {
    ok: false,
    major: null,
    minor: null,
    majorCorrelation: null,
    minorCorrelation: null,
  };
}

// Move pitch-class `tonic` to index 0 so it lines up with profile index 0.
// The old code rotated the profile the other way, which mirrors every key
// around C and F♯: G was labelled F, while C (0) and F♯ (6) stayed put.
export function alignChromaToTonic(chroma, tonic) {
  const n = chroma.length;
  const k = ((tonic % n) + n) % n;
  if (k === 0) return chroma.slice();
  return chroma.slice(k).concat(chroma.slice(0, k));
}

export function correlation(x, y) {
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumSqX = 0;
  let sumSqY = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumSqX += x[i] * x[i];
    sumSqY += y[i] * y[i];
  }

  const num = n * sumXY - sumX * sumY;
  const den = Math.sqrt((n * sumSqX - sumX * sumX) * (n * sumSqY - sumY * sumY));
  if (!Number.isFinite(den) || den === 0) return 0;
  return num / den;
}

function bestTonic(chroma, profile) {
  let bestIndex = -1;
  let bestCorr = -Infinity;
  for (let i = 0; i < 12; i++) {
    const corr = correlation(alignChromaToTonic(chroma, i), profile);
    if (corr > bestCorr) {
      bestCorr = corr;
      bestIndex = i;
    }
  }
  return { index: bestIndex, correlation: bestCorr };
}

export function scoreChroma(chroma) {
  if (!chroma || chroma.length !== 12) return emptyResult();
  if (!chroma.some((value) => Number.isFinite(value) && value > 0)) {
    return emptyResult();
  }

  const major = bestTonic(chroma, KS_MAJOR);
  const minor = bestTonic(chroma, KS_MINOR);
  const majorOk = major.correlation >= MIN_CORRELATION;
  const minorOk = minor.correlation >= MIN_CORRELATION;
  if (!majorOk && !minorOk) return emptyResult();

  return {
    ok: true,
    major: majorOk ? NOTE_NAMES[major.index] : null,
    minor: minorOk ? NOTE_NAMES[minor.index] : null,
    majorCorrelation: major.correlation,
    minorCorrelation: minor.correlation,
  };
}

export async function detectKey(audioBuffer) {
  if (!audioBuffer || typeof audioBuffer.getChannelData !== "function") {
    return emptyResult();
  }

  const signal = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const bufferSize = 4096;
  if (!signal || signal.length < bufferSize || !sampleRate) return emptyResult();

  // Meyda's default buffer is 512. The filter bank must match the FFT size,
  // and it is not rebuilt when only the buffer size changes.
  Meyda.bufferSize = bufferSize;
  Meyda.sampleRate = sampleRate;
  Meyda.chromaFilterBank = undefined;

  const chromaSum = new Array(12).fill(0);
  let count = 0;

  for (let i = 0; i + bufferSize <= signal.length; i += bufferSize) {
    if ((i / bufferSize) % 4 !== 0) continue;

    const chunk = signal.subarray(i, i + bufferSize);
    let energy = 0;
    for (let j = 0; j < chunk.length; j++) energy += chunk[j] * chunk[j];
    if (Math.sqrt(energy / bufferSize) < 0.01) continue;

    try {
      const features = Meyda.extract(["chroma"], chunk);
      if (features && features.chroma && features.chroma.length === 12) {
        for (let k = 0; k < 12; k++) chromaSum[k] += features.chroma[k];
        count++;
      }
    } catch (error) {
      console.warn("Meyda error", error);
    }
  }

  if (count === 0) return emptyResult();
  return scoreChroma(chromaSum.map((value) => value / count));
}
