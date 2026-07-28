import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import lamejs from "lamejs";
import { SoundTouch } from "soundtouchjs";
import {
  Upload,
  Play,
  Pause,
  Download,
  Music,
  RefreshCw,
  Mic2,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { detectKey } from "./keyDetection";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Footer = () => (
  <footer className="mt-12 text-center text-white/40 text-sm z-10 p-4">
    <p className="italic mb-1 font-serif">
      "Sing to him a new song; play skillfully, and shout for joy." - Psalm 33:3
    </p>
    <p className="text-xs mb-1 mt-2">
      「應當向他唱新歌，彈得巧妙，聲音宏亮。」 詩篇 33:3
    </p>
    <p className="text-xs mt-4 pt-4 border-t border-white/10 opacity-50">
      © 2025 MPEG Transposer App
    </p>
  </footer>
);

const KEYS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const MAX_PREVIEW_DURATION = 120; // Limit preview if heavy, but Tone is fast.

export default function App() {
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState(0);
  const [volume, setVolume] = useState(-5);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [originalKey, setOriginalKey] = useState("C");
  const [detectedKeyLabel, setDetectedKeyLabel] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  const playerRef = useRef(null);
  const pitchShiftRef = useRef(null);
  const audioBufferRef = useRef(null);
  const rafRef = useRef(null);

  // Initialize/Cleanup
  useEffect(() => {
    return () => {
      if (playerRef.current) playerRef.current.dispose();
      if (pitchShiftRef.current) pitchShiftRef.current.dispose();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) loadFile(selectedFile);
  };

  const loadFile = async (file) => {
    setIsReady(false);
    setFile(file);
    setIsPlaying(false);
    setCurrentTime(0);
    setDetectedKeyLabel("");
    setOriginalKey("C");

    try {
      const url = URL.createObjectURL(file);
      const buffer = await new Tone.Buffer(url);
      audioBufferRef.current = buffer;
      setDuration(buffer.duration);

      // --- Live Preview Setup (Tone.js) ---
      // Tone.js PitchShift is "fast" but lower quality. Good for preview.
      if (playerRef.current) playerRef.current.dispose();
      if (pitchShiftRef.current) pitchShiftRef.current.dispose();

      playerRef.current = new Tone.Player(buffer);
      // Increased windowSize adds latency but slightly smoother granular engine
      pitchShiftRef.current = new Tone.PitchShift({
        pitch: pitch,
        windowSize: 0.1, // Experiment for smoother preview
        delayTime: 0,
        feedback: 0,
      });

      playerRef.current.connect(pitchShiftRef.current);
      pitchShiftRef.current.toDestination();

      playerRef.current.volume.value = volume;

      await Tone.loaded();
      setIsReady(true);
      performKeyDetection(buffer);
    } catch (err) {
      console.error("Error loading file:", err);
      alert("Could not load audio file. Please try a standard MP3 or WAV.");
      setFile(null);
    }
  };

  const performKeyDetection = async (buffer) => {
    setIsDetecting(true);
    setTimeout(async () => {
      try {
        const key = await detectKey(buffer);
        console.log("Detected Key:", key);
        if (key) {
          setOriginalKey(key);
          setDetectedKeyLabel(key);
        }
      } catch (e) {
        console.error("Key detection failed", e);
      } finally {
        setIsDetecting(false);
      }
    }, 100);
  };

  // Update pitch live
  useEffect(() => {
    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = pitch;
    }
  }, [pitch]);

  // Update volume live
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume.value = volume;
    }
  }, [volume]);

  // Playback Loop
  useEffect(() => {
    const loop = () => {
      if (isPlaying) {
        setCurrentTime((prev) =>
          prev + 0.05 > duration ? duration : prev + 0.05
        );
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, duration]);

  const togglePlay = async () => {
    await Tone.start();
    if (!isReady) return;

    if (isPlaying) {
      playerRef.current.stop();
      setIsPlaying(false);
    } else {
      playerRef.current.start(Tone.now(), currentTime);
      setIsPlaying(true);

      const startTime = Tone.now() - currentTime;
      const updateProgress = () => {
        if (playerRef.current.state === "stopped") {
          // Check if it stopped naturally (end of file)
          if (Tone.now() - startTime >= duration) {
            setIsPlaying(false);
            setCurrentTime(duration);
            return;
          }
        }
        if (!isPlaying) return; // React state lag safety

        // Manual check for "stop" isn't great with Tone.Player alone without Transport,
        // but for now relying on duration logic is ok.
      };
      // We rely on the time-loop effect above for UI update
    }
  };

  const handleSeek = (e) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (isPlaying) {
      playerRef.current.stop();
      playerRef.current.start(Tone.now(), val);
    }
  };

  // --- High Quality Download using SoundTouchJS ---
  const handleDownload = async () => {
    if (!audioBufferRef.current) return;
    setIsProcessing(true);
    setProcessingProgress(5);

    // Run in timeout to unblock UI
    setTimeout(async () => {
      try {
        const originalBuffer = audioBufferRef.current.get(); // Get raw AudioBuffer from Tone.Buffer
        const channels = originalBuffer.numberOfChannels;
        const sampleRate = originalBuffer.sampleRate;
        const length = originalBuffer.length;

        // Prepare SoundTouch
        const st = new SoundTouch(sampleRate);
        st.pitch = Math.pow(2, pitch / 12); // Semitones to scaling factor

        // SoundTouch expects a specific pipeline.
        // We will push chunks of source samples and pull processed samples.

        // Interleave samples if stereo, SoundTouch usually wants a single stream of interleaved data?
        // Actually SoundTouchJS implementation usually wants:
        // st.process(buffer) where buffer is { getChannelData() } or similar?
        // Let's use the low-level API: inputBuffer and extraction.

        // Actually, SoundTouchJS is best driven by feeding it Time-Domain data.
        // It's easiest to treat it as a stream.

        // 1. Interleave Source
        const left = originalBuffer.getChannelData(0);
        const right = channels > 1 ? originalBuffer.getChannelData(1) : null;
        const sourceData = new Float32Array(length * 2); // Allocate max safe (stereo)

        // If mono, easier. If stereo, interleave.
        // SoundTouchJS expects interleaved stereo if channels=2?
        // Actually standard SoundTouch expects separate channels passed?
        // looking at SoundTouchJS docs:
        // It usually wraps a `WebAudio` node. But we want offline.
        // We have to use the `SimpleFilter` logic manually or just feed `st`.

        // Custom simple interleaving for processing
        // SoundTouchJS input format: List of Float32Array (channels)? Or interleaved?
        // The core C++ library uses interleaved. The JS port usually maintains that.

        const blockSize = 16384;
        const outputBuffer = []; // Array of Float32Arrays (interleaved chunks)

        let pos = 0;

        // Pre-interleave chunk by chunk to save memory?
        // Or just feed channel data if API supports it.
        // Let's assume interleaved for robust processing.

        const chunkFloat = new Float32Array(blockSize * 2); // Stereo chunk

        while (pos < length) {
          setProcessingProgress(10 + (pos / length) * 60); // Progress 10-70%

          // Fill chunk
          let framesRead = 0;
          for (let i = 0; i < blockSize && pos < length; i++) {
            chunkFloat[2 * i] = left[pos];
            if (right) chunkFloat[2 * i + 1] = right[pos];
            else chunkFloat[2 * i + 1] = left[pos]; // Mono -> Stereo
            pos++;
            framesRead++;
          }

          if (framesRead === 0) break;

          // Feed to SoundTouch
          // We need a wrapper usually. The raw `SoundTouch` class usage:
          // st.putSamples(samples, framesRead);
          // framesRead is number of stereo frames. samples is interleaved.
          st.putSamples(chunkFloat.subarray(0, framesRead * 2), framesRead);

          // Receive samples
          // st.receiveSamples(buffer, maxFrames)
          // We need a temporary buffer to receive
          const received = new Float32Array(blockSize * 2 * 2); // Allow potential expansion
          const framesReceived = st.receiveSamples(received, blockSize * 2);

          if (framesReceived > 0) {
            outputBuffer.push(received.slice(0, framesReceived * 2));
          }

          // Yield to UI thread
          if (pos % (blockSize * 10) === 0)
            await new Promise((r) => setTimeout(r, 0));
        }

        // Flush
        st.clear(); // Does this flush? Usually passing 0 samples or specific flush needed?
        // SoundTouch doesn't strictly flush latent samples easily without feeding zeros.
        // But usually it's fine.

        setProcessingProgress(75);

        // 2. Flatten Output
        const totalSamples = outputBuffer.reduce((acc, b) => acc + b.length, 0);
        const resultFloat = new Float32Array(totalSamples);
        let offset = 0;
        outputBuffer.forEach((b) => {
          resultFloat.set(b, offset);
          offset += b.length;
        });

        // 3. De-interleave for encoding?
        // LameJS expects separate Left/Right integers.
        // We have interleaved Float32.

        setProcessingProgress(80);
        const resultLeft = new Int16Array(totalSamples / 2);
        const resultRight = new Int16Array(totalSamples / 2);

        for (let i = 0; i < totalSamples / 2; i++) {
          const l = Math.max(-1, Math.min(1, resultFloat[2 * i]));
          const r = Math.max(-1, Math.min(1, resultFloat[2 * i + 1]));
          resultLeft[i] = l < 0 ? l * 0x8000 : l * 0x7fff;
          resultRight[i] = r < 0 ? r * 0x8000 : r * 0x7fff;
        }

        // 4. Encode MP3
        setProcessingProgress(90);
        const mp3encoder = new lamejs.Mp3Encoder(2, sampleRate, 192); // Stereo, 192kbps
        const mp3Data = [];
        const sampleBlockSize = 1152;

        for (let i = 0; i < resultLeft.length; i += sampleBlockSize) {
          const leftChunk = resultLeft.subarray(i, i + sampleBlockSize);
          const rightChunk = resultRight.subarray(i, i + sampleBlockSize);
          const buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
          if (buf.length > 0) mp3Data.push(buf);
        }

        const end = mp3encoder.flush();
        if (end.length > 0) mp3Data.push(end);

        setProcessingProgress(100);
        const blob = new Blob(mp3Data, { type: "audio/mp3" });

        const url_dl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url_dl;
        const targetKey = getTargetKey(originalKey, pitch);
        a.download = `transposed_${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}_${originalKey}_to_${targetKey}.mp3`;
        a.click();
      } catch (e) {
        console.error(e);
        alert(
          "High Quality Processing failed. Memory limit might be reached for large files."
        );
      } finally {
        setIsProcessing(false);
        setProcessingProgress(0);
      }
    }, 100);
  };

  const getTargetKey = (startKey, semitones) => {
    const startIndex = KEYS.indexOf(startKey);
    let targetIndex = (startIndex + semitones) % 12;
    if (targetIndex < 0) targetIndex += 12;
    return KEYS[targetIndex];
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden selection:bg-pink-500/30">
      {/* Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-white/10 shadow-2xl backdrop-blur-md mb-4 ring-1 ring-white/20">
              <Music className="w-8 h-8 text-purple-300" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-white tracking-tight">
              MPEG Transposer
            </h1>
            <p className="text-white/40 text-lg">Studio-quality Key Shifter</p>
          </div>

          {/* Main Card */}
          <div className="glass-card rounded-[2rem] p-8 md:p-10 space-y-8 relative overflow-hidden">
            {!file ? (
              <div className="relative group cursor-pointer py-12">
                <input
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="border-2 border-dashed border-white/10 rounded-3xl h-64 flex flex-col items-center justify-center gap-6 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-white/5">
                  <div className="p-5 rounded-full bg-white/5 text-purple-300 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300 shadow-xl">
                    <Upload size={40} strokeWidth={1.5} />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-medium text-xl text-white/90">
                      Drop your file here
                    </p>
                    <p className="text-sm text-white/40">
                      Support MP3, WAV, M4A, MP4
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* File Header */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-300 shadow-inner">
                      <Mic2 size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium truncate text-lg">
                        {file.name}
                      </h3>
                      <p className="text-xs text-white/40 font-mono">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setIsPlaying(false);
                    }}
                    className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>

                {/* Key Selection with AI Detect */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                  {isDetecting && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 transition-all">
                      <div className="flex items-center gap-2 text-purple-300">
                        <Wand2 className="animate-pulse" size={18} />
                        <span className="text-sm font-medium">
                          Detecting Key...
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    {/* Original Key */}
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                          Original Key
                        </label>
                        {detectedKeyLabel && !isDetecting && (
                          <div className="flex items-center gap-1 text-[10px] text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                            <Wand2 size={10} />
                            <span>AI Detected</span>
                          </div>
                        )}
                      </div>
                      <select
                        value={originalKey}
                        onChange={(e) => setOriginalKey(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 appearance-none font-medium cursor-pointer"
                      >
                        {KEYS.map((k) => (
                          <option key={k} value={k} className="bg-zinc-900">
                            {k}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Arrow Icon */}
                    <div className="pt-5 text-white/20">
                      <ArrowRight size={20} />
                    </div>

                    {/* Target Key Display */}
                    <div className="flex-1 space-y-1">
                      <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                        New Key
                      </label>
                      <div className="w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 text-purple-200 rounded-xl px-3 py-2 font-bold text-center shadow-inner">
                        {getTargetKey(originalKey, pitch)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-8">
                  {/* Pitch */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
                        Key Shift
                      </span>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-lg text-sm font-bold border",
                          pitch > 0
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/20"
                            : pitch < 0
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/20"
                            : "bg-white/5 text-white/40 border-white/5"
                        )}
                      >
                        {pitch > 0 ? "+" : ""}
                        {pitch} Semitones
                      </span>
                    </div>
                    <div className="relative h-12 flex items-center">
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="1"
                        value={pitch}
                        onChange={(e) => setPitch(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 focus:accent-purple-400 transition-all"
                      />
                      <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                        {[-12, -6, 0, 6, 12].map((stop) => (
                          <div
                            key={stop}
                            className="w-0.5 h-2 bg-white/10 mt-1"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-6">
                    <button
                      onClick={togglePlay}
                      disabled={!isReady}
                      className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isPlaying ? (
                        <Pause
                          size={32}
                          fill="currentColor"
                          className="group-hover:text-purple-600 transition-colors"
                        />
                      ) : (
                        <Play
                          size={32}
                          fill="currentColor"
                          className="ml-2 group-hover:text-purple-600 transition-colors"
                        />
                      )}
                    </button>

                    <div className="flex-1 space-y-2">
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{
                            width: `${(currentTime / (duration || 1)) * 100}%`,
                          }}
                        />
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleSeek}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between text-xs font-mono text-white/30">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={isProcessing || !isReady}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <RefreshCw className="animate-spin" />
                      <span>
                        Processing {Math.round(processingProgress)}%...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Download />
                      <span>
                        Download {getTargetKey(originalKey, pitch)} MP3 (HQ)
                      </span>
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
