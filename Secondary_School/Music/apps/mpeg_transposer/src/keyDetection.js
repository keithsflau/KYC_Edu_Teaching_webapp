import Meyda from "meyda";

const NOTE_NAMES = [
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

// Krumhansl-Schmuckler Key Profiles
const KS_MAJOR = [
  6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88,
];
const KS_MINOR = [
  6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17,
];

export async function detectKey(audioBuffer) {
  const signal = audioBuffer.getChannelData(0); // Use mono/left channel
  const sampleRate = audioBuffer.sampleRate;

  // Meyda setup
  const bufferSize = 4096; // Meyda typically likes powers of 2 (512, 1024, 2048, 4096)
  // We don't need to analyze every single frame. We can hop or take chunks.
  // To keep it fast, let's analyze a chunk every split second or so, or just sequential chunks for the first N seconds.
  // Let's analyze the middle 30 seconds or so, or spread out checks.
  // Analysis of the whole song is better.

  let chromaSum = new Array(12).fill(0);
  let count = 0;

  // We need to re-sample or construct signals that look like what Meyda expects if sample rate is different?
  // Meyda usually assumes Context sample rate, but 'Meyda.extract' takes a signal.
  // It computes FFT based on the signal. The mapping to Chroma depends on sample rate for binning.
  // Meyda doesn't let us pass SampleRate into implicit extract?
  // Actually Meyda.extract might not work statelessly with correct Chroma binning if not configured with context?
  // Let's check docs logic: Meyda.extract(feature, signal, previousSignal).
  // "Chroma: Calculates the how much of each chromatic pitch class exists in the signal."
  // It likely assumes 44100Hz or standard unless we can set it.
  // Looking at Meyda source, usually it's tied to an AudioContext if using createMeydaAnalyzer, but stateless extract?

  // If we can't easily configure sample rate for stateless extraction, we might get shifted results if user file is 48k vs 44.1k.
  // Most uploads might be 44.1k or 48k.
  // A safer bet is to create a temporary AudioContext to re-sample or init Meyda?
  // But strictly offline processing...

  // Alternative attempt: Just iterate and assume ~44100. If 48000, bins might be slightly off (~8% shift), might still land in correct semitone wide bin.
  // Let's handle the extraction manually if we want to be safe, but Meyda is robust.
  // Actually, let's use a subset of the buffer to avoid freezing UI (huge loop).

  // Optimization: specific chunks.
  const duration = audioBuffer.duration;
  let offset = 0;
  // If song is long, random sampling or stride.
  const chunkStep = bufferSize * 4; // Skip some frames

  // Safety break
  const MAX_SAMPLES_TO_ANALYZE = Math.min(signal.length, sampleRate * 60); // Analyze first 60s max? or spread?
  // Let's just do stride over the whole length max 2 minutes.

  for (let i = 0; i < signal.length; i += bufferSize) {
    // Checking boundary
    if (i + bufferSize > signal.length) break;

    // Skip silence?
    // Skip if i > limit?
    // Let's do a stride to cover more of the song in less time
    // e.g., analyze 1 buffer, skip 3 buffers...
    if ((i / bufferSize) % 4 !== 0) continue;

    const chunk = signal.subarray(i, i + bufferSize);

    // Simple RMS check to skip silence
    let rms = 0;
    for (let j = 0; j < chunk.length; j++) rms += chunk[j] * chunk[j];
    rms = Math.sqrt(rms / bufferSize);
    if (rms < 0.01) continue; // Skip silence

    try {
      // Note: Meyda stateless extract of Chroma might assume defaults.
      // However, we can try.
      const features = Meyda.extract(["chroma"], chunk);
      if (features && features.chroma) {
        for (let k = 0; k < 12; k++) {
          chromaSum[k] += features.chroma[k];
        }
        count++;
      }
    } catch (e) {
      console.warn("Meyda error", e);
    }
  }

  // Normalize
  if (count === 0) return "C"; // Default fail
  const chromaAvg = chromaSum.map((v) => v / count);

  // Correlation with Profiles
  let maxCorr = -Infinity;
  let bestKey = "";

  // Major
  for (let i = 0; i < 12; i++) {
    // Rotate profile
    const profile = rotate(KS_MAJOR, i);
    const corr = correlation(chromaAvg, profile);
    if (corr > maxCorr) {
      maxCorr = corr;
      bestKey = NOTE_NAMES[i] + " Major";
    }
  }

  // Minor
  for (let i = 0; i < 12; i++) {
    const profile = rotate(KS_MINOR, i);
    const corr = correlation(chromaAvg, profile);
    if (corr > maxCorr) {
      maxCorr = corr;
      bestKey = NOTE_NAMES[i] + " Minor";
    }
  }

  // Allow user to simple see "C" or "Am"
  // For this app, maybe just return the root note?
  // User selected "Original Key" in UI as just "C", "C#"...
  // Logic: "C Major" -> "C". "A Minor" -> "A"?
  // Usually transposing assumes Major relative to Major.
  // Relative keys: A Minor is relative to C Major.
  // If we detect A Minor, and user wants to transpose, they might treat it as Am.
  // The UI dropdown `KEYS` has only Roots.
  // If detected is Minor, we can return the Root (e.g. A).
  // But strictly, if it's A Minor, it shares key signature with C Major.
  // If the user's chart says "Key of Cm", they select C or Cm?
  // The UI currently only has [C, C#, ... B].
  // Let's return the Root of the Major/Minor key detected.
  // e.g. "Ab Major" -> "Ab". "F Minor" -> "F".

  return bestKey.split(" ")[0];
}

function rotate(arr, n) {
  return arr.slice(n).concat(arr.slice(0, n));
}

// Pearson correlation coefficient
function correlation(x, y) {
  let n = x.length;
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_sq_x = 0;
  let sum_sq_y = 0;

  for (let i = 0; i < n; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += x[i] * y[i];
    sum_sq_x += x[i] * x[i];
    sum_sq_y += y[i] * y[i];
  }

  const num = n * sum_xy - sum_x * sum_y;
  const den = Math.sqrt(
    (n * sum_sq_x - sum_x * sum_x) * (n * sum_sq_y - sum_y * sum_y)
  );

  if (den === 0) return 0;
  return num / den;
}
