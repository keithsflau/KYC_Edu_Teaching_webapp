import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Play, Square, Link, Music, Sparkles, Settings as SettingsIcon, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---
type Mood = 'anxious' | 'sad' | 'angry' | 'calm' | 'happy' | 'neutral';
type PlayerMode = 'synth' | 'suno';

interface MusicParams {
    bpm: number;
    scale: string[];
    chordProgression: string[][];
    timbreType: 'pad' | 'pluck' | 'bell' | 'bass';
    effects: { distortion: number; reverb: number; delay: number };
    probability: number;
}

const MOOD_PARAMS: Record<Mood, MusicParams> = {
    anxious: {
        bpm: 110,
        scale: ['C4', 'Eb4', 'G4', 'Ab4', 'B4'],
        chordProgression: [['C3', 'Eb3', 'G3'], ['B2', 'D3', 'G3'], ['Ab2', 'C3', 'Eb3']],
        timbreType: 'pluck',
        effects: { distortion: 0.1, reverb: 0.2, delay: 0.4 },
        probability: 0.8,
    },
    sad: {
        bpm: 50,
        scale: ['A3', 'C4', 'E4', 'G4'],
        chordProgression: [['A2', 'E3', 'C4'], ['F2', 'C3', 'A3'], ['D2', 'A3', 'F3']],
        timbreType: 'pad',
        effects: { distortion: 0, reverb: 0.8, delay: 0.2 },
        probability: 0.3,
    },
    angry: {
        bpm: 120,
        scale: ['D3', 'F3', 'A3', 'Bb3', 'C#4'],
        chordProgression: [['D2', 'A2', 'D3'], ['C#2', 'A2', 'E3'], ['Bb1', 'F2', 'D3']],
        timbreType: 'bass',
        effects: { distortion: 0.4, reverb: 0.1, delay: 0 },
        probability: 0.9,
    },
    calm: {
        bpm: 60,
        scale: ['C4', 'D4', 'E4', 'G4', 'A4'],
        chordProgression: [['C3', 'G3', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']],
        timbreType: 'bell',
        effects: { distortion: 0, reverb: 0.7, delay: 0.5 },
        probability: 0.4,
    },
    happy: {
        bpm: 100,
        scale: ['G4', 'A4', 'B4', 'D5', 'E5'],
        chordProgression: [['G3', 'B3', 'D4'], ['C3', 'E3', 'G3'], ['D3', 'F#3', 'A3']],
        timbreType: 'pluck',
        effects: { distortion: 0, reverb: 0.3, delay: 0.3 },
        probability: 0.6,
    },
    neutral: {
        bpm: 80,
        scale: ['C4', 'E4', 'G4'],
        chordProgression: [['C3', 'G3'], ['F3', 'A3']],
        timbreType: 'pad',
        effects: { distortion: 0, reverb: 0.4, delay: 0.2 },
        probability: 0.5,
    }
};

const SUNO_PROMPTS: Record<Mood, string> = {
    anxious: "Chaotic ambient, dissonant textures, fast irregular rhythms, nervous electronic beats, 120bpm, minor key",
    sad: "Melancholic cello, slow piano, ambient rain, sorrowful, minor key, 60bpm, emotional",
    angry: "Aggressive industrial, distorted bass, heavy drums, chaotic metal, fast tempo, intense",
    calm: "Peaceful ambient drone, nature sounds, spa music, soft flute, major pentatonic, 60bpm, meditation",
    happy: "Upbeat lo-fi hip hop, sunny acoustic guitar, major key, bouncy rhythm, 100bpm, joyful",
    neutral: "Minimalist study beats, steady rhythm, neutral tone, lo-fi, focus music"
};

const DURATION_SECONDS = 60;

const IsoMoodPlayer: React.FC = () => {
    const [mode, setMode] = useState<PlayerMode>('suno');
    const [currentMood, setCurrentMood] = useState<Mood>('anxious');
    const [targetMood, setTargetMood] = useState<Mood>('calm');
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Suno Inputs & Config
    const [startUrl, setStartUrl] = useState('');
    const [endUrl, setEndUrl] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    const [apiKey, setApiKey] = useState('');
    const [apiBaseUrl, setApiBaseUrl] = useState('https://api.sunoapi.org/api/v1');

    const [isGeneratingStart, setIsGeneratingStart] = useState(false);
    const [isGeneratingEnd, setIsGeneratingEnd] = useState(false);

    // Audio Refs (Synth)
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const leadSynthRef = useRef<Tone.PolySynth | null>(null);
    const bassSynthRef = useRef<Tone.MembraneSynth | null>(null);
    type EffectsChain = {
        dist: Tone.Distortion;
        reverb: Tone.Reverb;
        delay: Tone.PingPongDelay;
        chorus: Tone.Chorus;
        vol: Tone.Volume;
    };
    const effectsRef = useRef<EffectsChain | null>(null);
    const loopRef = useRef<Tone.Loop | null>(null);

    // Audio Hooks (Native Audio for Suno to avoid CORS)
    const audioStartRef = useRef<HTMLAudioElement | null>(null);
    const audioEndRef = useRef<HTMLAudioElement | null>(null);

    const progressRef = useRef(0);
    const moodRef = useRef<{ start: Mood; end: Mood }>({ start: currentMood, end: targetMood });

    useEffect(() => { progressRef.current = progress; }, [progress]);
    useEffect(() => { moodRef.current = { start: currentMood, end: targetMood }; }, [currentMood, targetMood]);

    useEffect(() => {
        return () => {
            Tone.getTransport().stop();
            Tone.getTransport().cancel();
            loopRef.current?.dispose();

            // Cleanup Audio
            if (audioStartRef.current) { audioStartRef.current.pause(); audioStartRef.current = null; }
            if (audioEndRef.current) { audioEndRef.current.pause(); audioEndRef.current = null; }
        };
    }, []);

    // --- API LOGIC (Updated for sunoapi.org) ---
    const generateTrack = async (mood: Mood, setUrl: (url: string) => void, setLoading: (l: boolean) => void) => {
        setLoading(true);
        try {
            const prompt = SUNO_PROMPTS[mood];

            // 1. Request Generation
            const genRes = await fetch(`${apiBaseUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                    model: 'V3_5',
                    customMode: false,
                    instrumental: true,
                    callBackUrl: "https://example.com/callback"
                })
            });

            if (!genRes.ok) throw new Error(`API Error: ${genRes.status}`);
            const genData = await genRes.json();

            if (genData.code !== 200) throw new Error(`API Msg: ${genData.msg}`);
            const taskId = genData.data?.taskId;

            if (!taskId) throw new Error(`No Task ID returned: ${JSON.stringify(genData)}`);

            // 2. Poll for Completion
            let audioUrl = null;
            let attempts = 0;
            const maxAttempts = 30; // 2.5 mins

            while (!audioUrl && attempts < maxAttempts) {
                await new Promise(r => setTimeout(r, 5000));

                const pollRes = await fetch(`${apiBaseUrl}/generate/record-info?taskId=${taskId}`, {
                    headers: { 'Authorization': `Bearer ${apiKey}` }
                });

                if (pollRes.ok) {
                    const pollData = await pollRes.json();

                    const status = pollData.data?.status;
                    const sunoData = pollData.data?.response?.sunoData;

                    if (status === 'SUCCESS' || status === 'FIRST_SUCCESS') {
                        if (sunoData && sunoData.length > 0 && sunoData[0].audioUrl) {
                            audioUrl = sunoData[0].audioUrl;
                        }
                    } else if (status === 'FAILED') {
                        throw new Error("Generation Status: FAILED");
                    }
                }
                attempts++;
            }

            if (audioUrl) {
                setUrl(audioUrl);
            } else {
                throw new Error("Generation Timed Out");
            }

        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            alert(`Generation Error: ${msg}\nPlease verify API Key / Base URL.`);
        } finally {
            setLoading(false);
        }
    };


    // --- AUDIO INIT ---
    const initSynthAudio = async () => {
        await Tone.start();
        if (!effectsRef.current) {
            const dist = new Tone.Distortion(0).toDestination();
            const reverb = new Tone.Reverb(0.5).toDestination();
            const delay = new Tone.PingPongDelay("8n", 0.2).toDestination();
            const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
            const vol = new Tone.Volume(-5).connect(dist).connect(reverb).connect(delay).connect(chorus);
            effectsRef.current = { dist, reverb, delay, chorus, vol };
            synthRef.current = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "fatcustom", partials: [0.2, 1, 0, 0.5, 0.1], spread: 40, count: 3 }, envelope: { attack: 2, decay: 1, sustain: 0.5, release: 2 } }).connect(vol);
            leadSynthRef.current = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "triangle" }, envelope: { attack: 0.05, decay: 0.2, sustain: 0.2, release: 1 } }).connect(vol);
            bassSynthRef.current = new Tone.MembraneSynth().connect(vol);
        }
    };

    const initSunoAudio = async () => {
        // Stop any previous
        if (audioStartRef.current) { audioStartRef.current.pause(); }
        if (audioEndRef.current) { audioEndRef.current.pause(); }

        // Create new Audio objects (Native, not Tone) to avoid CORS Web Audio issues
        audioStartRef.current = new Audio(startUrl);
        audioStartRef.current.loop = true;
        audioStartRef.current.volume = 1; // Start full volume

        audioEndRef.current = new Audio(endUrl);
        audioEndRef.current.loop = true;
        audioEndRef.current.volume = 0; // Start silent

        // Play
        try {
            await audioStartRef.current.play();
            await audioEndRef.current.play();
        } catch (e) {
            console.error(e);
            alert("Playback failed. Please check if the URLs are valid audio files.");
        }
    };

    const startSynthLoop = () => {
        let beatCounter = 0;
        loopRef.current = new Tone.Loop((time) => {
            const p = progressRef.current;
            const start = MOOD_PARAMS[moodRef.current.start];
            const end = MOOD_PARAMS[moodRef.current.end];
            const activeConfig = Math.random() < p ? end : start;

            const currentBpm = start.bpm + (end.bpm - start.bpm) * p;
            Tone.getTransport().bpm.rampTo(currentBpm, 0.1);
            if (effectsRef.current) {
                const d = start.effects.distortion + (end.effects.distortion - start.effects.distortion) * p;
                const r = start.effects.reverb + (end.effects.reverb - start.effects.reverb) * p;
                effectsRef.current.dist.distortion = d;
                effectsRef.current.reverb.wet.rampTo(r, 0.1);
            }

            if (beatCounter % 8 === 0) {
                const chord = activeConfig.chordProgression[Math.floor(Math.random() * activeConfig.chordProgression.length)];
                synthRef.current?.triggerAttackRelease(chord, "2n", time, 0.4);
            }
            if (Math.random() < activeConfig.probability) {
                const note = activeConfig.scale[Math.floor(Math.random() * activeConfig.scale.length)];
                leadSynthRef.current?.triggerAttackRelease(note, "8n", time);
            }
            if ((activeConfig.timbreType === 'bass') && beatCounter % 4 === 0) {
                bassSynthRef.current?.triggerAttackRelease("C1", "8n", time, 0.5);
            }
            beatCounter++;
        }, "8n").start(0);
    };

    const togglePlay = async () => {
        if (!isPlaying) {
            if (mode === 'synth') {
                await initSynthAudio();
                Tone.getTransport().start();
                startSynthLoop();
            } else {
                if (!startUrl || !endUrl) return alert("Please set both Start and End tracks first!");
                await initSunoAudio();
            }
            setIsPlaying(true);
        } else {
            // STOP
            if (mode === 'synth') {
                Tone.getTransport().stop();
                Tone.getTransport().cancel();
                if (loopRef.current) loopRef.current.dispose();
            } else {
                if (audioStartRef.current) { audioStartRef.current.pause(); }
                if (audioEndRef.current) { audioEndRef.current.pause(); }
            }
            setIsPlaying(false);
            setProgress(0);
        }
    };

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setProgress(prev => {
                const nextP = Math.min(prev + (0.1 / DURATION_SECONDS), 1);

                // Manual Crossfade for Suno Mode (Native Audio)
                if (mode === 'suno' && audioStartRef.current && audioEndRef.current) {
                    // Linear Crossfade
                    const v1 = Math.max(0, 1 - nextP);
                    const v2 = Math.min(1, nextP);

                    audioStartRef.current.volume = v1;
                    audioEndRef.current.volume = v2;
                }

                if (nextP >= 1) togglePlay();
                return nextP;
            });
        }, 100);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- togglePlay omitted to avoid resetting interval every render
    }, [isPlaying, mode]);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* BG */}
            <div className={clsx("absolute inset-0 transition-colors duration-[3000ms] opacity-20 pointer-events-none",
                currentMood === 'angry' ? 'bg-red-900' : currentMood === 'sad' ? 'bg-blue-900' :
                    currentMood === 'anxious' ? 'bg-purple-900' : currentMood === 'happy' ? 'bg-yellow-600' : 'bg-green-900')} />

            {/* HEADER */}
            <div className="z-10 w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Iso-Mood Player</h1>
                        <p className="text-slate-400 text-sm">Therapeutic Cross-Fader</p>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex bg-black/30 p-1 rounded-full">
                            <button onClick={() => { setIsPlaying(false); setMode('synth'); }}
                                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all gap-2 flex items-center", mode === 'synth' ? "bg-teal-500 text-white" : "text-slate-400 hover:text-white")}>
                                <Music size={16} /> Synth
                            </button>
                            <button onClick={() => { setIsPlaying(false); setMode('suno'); }}
                                className={clsx("px-4 py-2 rounded-full text-sm font-medium transition-all gap-2 flex items-center", mode === 'suno' ? "bg-purple-500 text-white" : "text-slate-400 hover:text-white")}>
                                <Sparkles size={16} /> Suno AI
                            </button>
                        </div>
                        {mode === 'suno' && (
                            <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                                <SettingsIcon size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* API SETTINGS */}
                <AnimatePresence>
                    {showSettings && mode === 'suno' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-3">
                                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">API Configuration</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-400">API Provider URL</label>
                                        <input type="text" value={apiBaseUrl} onChange={e => setApiBaseUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none" placeholder="https://..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-400">API Key</label>
                                        <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TRACK SELECTION */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* START SECTION */}
                    <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <label className="text-xs uppercase tracking-widest text-slate-400">Start Mood (Current)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['anxious', 'sad', 'angry', 'neutral'] as Mood[]).map(m => (
                                <button key={m} onClick={() => !isPlaying && setCurrentMood(m)}
                                    className={clsx("p-2 rounded border text-xs capitalize transition-all", currentMood === m ? "bg-blue-500/30 border-blue-400 text-blue-200" : "border-white/10 text-slate-400 hover:bg-white/5")}
                                >{m}</button>
                            ))}
                        </div>
                        {mode === 'suno' && (
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center gap-2 bg-black/30 rounded px-3 py-2 border border-white/10">
                                    <Link size={14} className="text-slate-500" />
                                    <input type="text" value={startUrl} onChange={(e) => setStartUrl(e.target.value)} placeholder="Wait for generation..." className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-slate-600" />
                                </div>
                                <button
                                    onClick={() => generateTrack(currentMood, setStartUrl, setIsGeneratingStart)}
                                    disabled={isGeneratingStart}
                                    className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed w-28 flex items-center justify-center gap-2 text-xs font-bold"
                                >
                                    {isGeneratingStart ? <Loader2 size={14} className="animate-spin" /> : <><Sparkles size={14} /> Generate</>}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* TARGET SECTION */}
                    <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <label className="text-xs uppercase tracking-widest text-slate-400">Target Mood (Goal)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['calm', 'happy', 'neutral'] as Mood[]).map(m => (
                                <button key={m} onClick={() => !isPlaying && setTargetMood(m)}
                                    className={clsx("p-2 rounded border text-xs capitalize transition-all", targetMood === m ? "bg-green-500/30 border-green-400 text-green-200" : "border-white/10 text-slate-400 hover:bg-white/5")}
                                >{m}</button>
                            ))}
                        </div>
                        {mode === 'suno' && (
                            <div className="flex gap-2">
                                <div className="flex-1 flex items-center gap-2 bg-black/30 rounded px-3 py-2 border border-white/10">
                                    <Link size={14} className="text-slate-500" />
                                    <input type="text" value={endUrl} onChange={(e) => setEndUrl(e.target.value)} placeholder="Wait for generation..." className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-slate-600" />
                                </div>
                                <button
                                    onClick={() => generateTrack(targetMood, setEndUrl, setIsGeneratingEnd)}
                                    disabled={isGeneratingEnd}
                                    className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed w-28 flex items-center justify-center gap-2 text-xs font-bold"
                                >
                                    {isGeneratingEnd ? <Loader2 size={14} className="animate-spin" /> : <><Sparkles size={14} /> Generate</>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Visual */}
                <div className="mb-8 relative h-16 bg-black/40 rounded-full overflow-hidden flex items-center px-4 border border-white/5">
                    <span className="text-xs text-blue-400 font-bold z-10 w-12">{Math.round(progress * 100)}%</span>
                    <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600/50 to-green-600/50" style={{ width: `${progress * 100}%` }} />
                    <div className="ml-auto flex gap-1 h-8 z-10 opacity-50">
                        {[...Array(15)].map((_, i) => (
                            <motion.div key={i} className="w-1 bg-white rounded-full"
                                animate={{ height: isPlaying ? [5, 20 + Math.random() * 15, 5] : 4 }}
                                transition={{ repeat: Infinity, duration: 0.5 + Math.random() }} />
                        ))}
                    </div>
                </div>

                {/* Play Button */}
                <div className="flex justify-center">
                    <button onClick={togglePlay} className={clsx("group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-2xl", mode === 'suno' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-white text-slate-900")}>
                        {isPlaying ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        {isPlaying ? "Stop Session" : `Start ${mode === 'suno' ? 'Suno' : 'Synth'} Session`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IsoMoodPlayer;
