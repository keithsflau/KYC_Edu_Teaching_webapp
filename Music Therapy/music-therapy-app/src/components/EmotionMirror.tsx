import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Smile, Meh, Angry, Loader2, Play, Square, CloudRain, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import * as Tone from 'tone';

type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised' | 'disgusted' | 'fearful';
type InstrumentKind = 'synth' | 'am' | 'fm' | 'duo';

const EmotionMirror: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [detectedEmotion, setDetectedEmotion] = useState<Emotion | 'scanning'>('scanning');
    const [faceExpressions, setFaceExpressions] = useState<Record<string, number>>({});
    const [isPlaying, setIsPlaying] = useState(false);

    // Audio Refs
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const loopRef = useRef<Tone.Loop | null>(null);

    // Load Models (Switched to SSD Mobilenet V1 for better accuracy)
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), // More accurate than tinyFaceDetector
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]);
            setIsModelLoaded(true);
        };
        loadModels();
    }, []);

    // Start Video
    useEffect(() => {
        if (isModelLoaded && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [isModelLoaded]);

    // Face Detection Loop
    useEffect(() => {
        if (!isVideoReady || !videoRef.current || !canvasRef.current) return;

        const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const interval = setInterval(async () => {
            if (videoRef.current && canvasRef.current) {
                // Use SsdMobilenetv1Options
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.3 })).withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

                if (detections.length > 0) {
                    const rawExpressions = detections[0].expressions;

                    // --- SENSITIVITY BOOST ---
                    // "Fearful" is notoriously hard to detect. We artificially boost it 
                    // if there's even a hint of it, or if it's mixed with Surprise/Sadness.
                    const boostedExpressions = { ...rawExpressions };

                    // Boost Fear
                    boostedExpressions.fearful = (rawExpressions.fearful * 4.0);

                    // Also, Fear often looks like Surprise + Sadness. 
                    // If we have both, add to fear.
                    if (rawExpressions.surprised > 0.3 && rawExpressions.sad > 0.1) {
                        boostedExpressions.fearful += 0.2;
                    }

                    // Re-normalize (rough)
                    // We don't need perfect % summing to 100 for the logic to work, 
                    // just for the bar display.
                    const total = Object.values(boostedExpressions).reduce((a, b) => a + b, 0);
                    const normalized: Record<string, number> = {};
                    for (const [k, v] of Object.entries(boostedExpressions)) {
                        normalized[k] = v / total;
                    }

                    setFaceExpressions(normalized);

                    const maxEmotion = Object.keys(normalized).reduce((a, b) =>
                        normalized[a] > normalized[b] ? a : b
                    ) as Emotion;
                    setDetectedEmotion(maxEmotion);
                } else {
                    setDetectedEmotion('scanning');
                    setFaceExpressions({});
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isVideoReady]);

    const [volume, setVolume] = useState(-10);
    const [instrumentType, setInstrumentType] = useState<InstrumentKind>('synth');

    // Audio Logic
    const initAudio = async () => {
        await Tone.start();

        // Dispose old if exists
        if (synthRef.current) {
            synthRef.current.dispose();
        }

        const reverb = new Tone.Reverb(2).toDestination();
        const vol = new Tone.Volume(volume).connect(reverb);

        if (instrumentType === 'synth') {
            synthRef.current = new Tone.PolySynth(Tone.Synth).connect(vol) as unknown as Tone.PolySynth;
        } else if (instrumentType === 'am') {
            synthRef.current = new Tone.PolySynth(Tone.AMSynth).connect(vol) as unknown as Tone.PolySynth;
        } else if (instrumentType === 'fm') {
            synthRef.current = new Tone.PolySynth(Tone.FMSynth).connect(vol) as unknown as Tone.PolySynth;
        } else if (instrumentType === 'duo') {
            synthRef.current = new Tone.PolySynth(Tone.DuoSynth).connect(vol) as unknown as Tone.PolySynth;
        }
    };

    // Update Volume on change
    useEffect(() => {
        if (synthRef.current) {
            synthRef.current.volume.rampTo(volume, 0.1);
        }
    }, [volume]);

    // Re-init audio when instrument changes (if playing)
    useEffect(() => {
        if (isPlaying) {
            void initAudio();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- timbre-only; toggleSession already inits on play
    }, [instrumentType]);

    const updateMusic = (emotion: Emotion) => {
        if (!synthRef.current) return;

        // Enhanced mappings for all 7 emotions
        const scales: Record<string, string[]> = {
            happy: ['C4', 'E4', 'G4', 'B4', 'C5', 'E5'], // Major Pentatonic - Bright
            sad: ['C3', 'Eb3', 'G3', 'C4', 'Eb4'], // Minor - Somber
            angry: ['C2', 'F#2', 'G2', 'C3', 'F#3'], // Diminished/Tritones - Dissonant
            neutral: ['C4', 'G4', 'C5'], // Open Fifths - Stable
            surprised: ['E4', 'A4', 'B4', 'E5', 'G#5'], // Lydian/Whole Tone feel - Bright & Uplifting
            disgusted: ['C#3', 'G3', 'C#4', 'G4'], // Tritones - Unsettling
            fearful: ['B3', 'C4', 'F4', 'F#4'] // Locrian/Chromatic - Tense
        };

        const notes = scales[emotion] || scales['neutral'];
        const note = notes[Math.floor(Math.random() * notes.length)];
        // Duration varies by emotion
        const duration = (emotion === 'angry' || emotion === 'surprised') ? '8n' : '2n';
        synthRef.current.triggerAttackRelease(note, duration);
    };

    // Auto-play effect
    useEffect(() => {
        if (isPlaying && detectedEmotion !== 'scanning') {
            if (Math.random() > 0.6) {
                updateMusic(detectedEmotion);
            }
        }
    }, [detectedEmotion, isPlaying]);

    // Rhythm Loop
    useEffect(() => {
        if (!isPlaying) {
            loopRef.current?.stop();
            return;
        }

        loopRef.current = new Tone.Loop((time) => {
            if (detectedEmotion !== 'scanning' && synthRef.current) {
                const notes = (detectedEmotion === 'happy' ? ['C4', 'E4', 'G4', 'B4'] :
                    detectedEmotion === 'sad' ? ['A3', 'C4', 'E4'] :
                        detectedEmotion === 'angry' ? ['D2', 'F#2', 'A#2'] :
                            detectedEmotion === 'surprised' ? ['E5', 'G#5'] :
                                detectedEmotion === 'fearful' ? ['B3', 'F4'] :
                                    detectedEmotion === 'disgusted' ? ['C#3', 'G3'] :
                                        ['C4', 'G4']); // neutral

                const density = (detectedEmotion === 'angry' || detectedEmotion === 'fearful' || detectedEmotion === 'surprised') ? 0.8 : 0.4;

                if (Math.random() < density) {
                    const note = notes[Math.floor(Math.random() * notes.length)];
                    const dur = (detectedEmotion === 'angry') ? '16n' : '8n';
                    synthRef.current.triggerAttackRelease(note, dur, time);
                }
            }
        }, "4n").start(0);

        Tone.getTransport().start();

        return () => {
            loopRef.current?.dispose();
        }
    }, [isPlaying, detectedEmotion]);


    const toggleSession = async () => {
        if (!isPlaying) {
            await initAudio();
            setIsPlaying(true);
        } else {
            Tone.getTransport().stop();
            setIsPlaying(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden flex flex-col">
            {/* BG Glow based on Emotion */}
            <div className={`absolute inset-0 transition-colors duration-1000 opacity-20 pointer-events-none ${detectedEmotion === 'happy' ? 'bg-yellow-500' :
                detectedEmotion === 'sad' ? 'bg-blue-600' :
                    detectedEmotion === 'angry' ? 'bg-red-600' :
                        detectedEmotion === 'neutral' ? 'bg-teal-700' :
                            detectedEmotion === 'fearful' ? 'bg-purple-800' : 'bg-slate-900'
                }`} />

            <div className="relative z-50 flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full hover:bg-white/10 transition-colors border border-white/10">
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Emotion Mirror</h1>
                    <p className="text-slate-400 text-sm">Resonance & Bio-Feedback</p>
                </div>
                <div className="w-24" /> {/* Spacer */}
            </div>

            <div className="flex-1 flex flex-col lg:flex-row items-stretch justify-center gap-8 relative z-10 max-w-7xl mx-auto w-full">

                {/* LEFT: Video Container */}
                <div className="flex-1 relative bg-slate-800 rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl min-h-[480px]">
                    {!isModelLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center gap-2 text-slate-400">
                            <Loader2 className="animate-spin" /> Loading High-Accuracy AI Models...
                        </div>
                    )}
                    <div className="w-full h-full relative">
                        <video
                            ref={videoRef} onLoadedMetadata={() => setIsVideoReady(true)} onPlay={() => setIsVideoReady(true)}
                            autoPlay muted className="w-full h-full object-cover transform scale-x-[-1]"
                        />
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transform scale-x-[-1]" />
                    </div>
                </div>

                {/* RIGHT: Dashboard Panel */}
                <div className="w-full lg:w-96 flex flex-col gap-6">

                    {/* Emotion Status Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center gap-2 min-h-[160px]">
                        {detectedEmotion === 'happy' && <Smile size={48} className="text-yellow-400" />}
                        {detectedEmotion === 'sad' && <CloudRain size={48} className="text-blue-400" />}
                        {detectedEmotion === 'angry' && <Angry size={48} className="text-red-500" />}
                        {detectedEmotion === 'neutral' && <Meh size={48} className="text-teal-400" />}
                        {detectedEmotion === 'fearful' && <span className="text-4xl">😱</span>}
                        {detectedEmotion === 'surprised' && <span className="text-4xl">😲</span>}
                        {detectedEmotion === 'disgusted' && <span className="text-4xl">🤢</span>}
                        {detectedEmotion === 'scanning' && <Loader2 size={48} className="animate-spin text-slate-400" />}

                        <h2 className="text-3xl font-bold capitalize mt-2">{detectedEmotion === 'scanning' ? "Scanning..." : detectedEmotion}</h2>
                    </div>

                    {/* Stats Bars */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex-1 flex flex-col gap-3 overflow-y-auto">
                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Detailed Analysis</h3>
                        {Object.entries(faceExpressions).map(([emo, score]) => (
                            <div key={emo} className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs font-bold text-slate-300 uppercase">
                                    <span>{emo}</span>
                                    <span>{Math.round(score * 100)}%</span>
                                </div>
                                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${emo === detectedEmotion ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-600'}`}
                                        style={{ width: `${score * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {Object.keys(faceExpressions).length === 0 && <div className="text-slate-500 text-sm text-center py-4">No face detected</div>}
                    </div>

                    {/* Controls */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-6">
                        {/* Audio Controls */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Volume2 size={20} className="text-slate-400" />
                                <input
                                    type="range" min="-30" max="0" step="1"
                                    value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {(['synth', 'am', 'fm', 'duo'] as const).map((inst) => (
                                    <button
                                        key={inst}
                                        onClick={() => setInstrumentType(inst)}
                                        className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all border border-white/5 ${instrumentType === inst ? 'bg-purple-600 text-white border-purple-400' : 'bg-black/20 text-slate-400 hover:bg-white/10'}`}
                                    >
                                        {inst}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button onClick={toggleSession} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${isPlaying ? 'bg-white text-black hover:bg-slate-200' : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:opacity-90'}`}>
                            {isPlaying ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                            {isPlaying ? "Stop Session" : "Start Stats"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EmotionMirror;
