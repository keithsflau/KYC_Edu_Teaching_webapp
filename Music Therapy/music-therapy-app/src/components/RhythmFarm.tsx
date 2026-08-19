import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Tone from 'tone';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { motion } from 'framer-motion';

const ANIMALS = [
    { name: 'Cow', emoji: '🐮', note: 'C3', color: 'bg-white text-black border-black' },
    { name: 'Pig', emoji: '🐷', note: 'E3', color: 'bg-pink-300 text-pink-900 border-pink-500' },
    { name: 'Chick', emoji: '🐥', note: 'G3', color: 'bg-yellow-300 text-yellow-900 border-yellow-500' },
    { name: 'Sheep', emoji: '🐑', note: 'C4', color: 'bg-slate-200 text-slate-800 border-slate-400' },
];

const RhythmFarm: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [isDebug, setIsDebug] = useState(false); // Developer Mode
    const beatRef = useRef(0); // Ref for precise animation loop access

    const [isMirrored, setIsMirrored] = useState(true); // Toggle for user preference

    // Game State
    // Game State
    const [targetPos, setTargetPos] = useState({ x: 0.5, y: 0.5 });
    // Use Refs to ensure the animation loop always accesses the latest state
    const targetPosRef = useRef({ x: 0.5, y: 0.5 });
    const isMirroredRef = useRef(true);

    // Sync state to refs
    useEffect(() => { isMirroredRef.current = isMirrored; }, [isMirrored]);
    useEffect(() => { targetPosRef.current = targetPos; }, [targetPos]);

    const [activeAnimal, setActiveAnimal] = useState(0);
    const [lastHitTime, setLastHitTime] = useState(0);
    const [currentBeat, setCurrentBeat] = useState(0);

    // Refs
    const handLandmarkerRef = useRef<HandLandmarker | null>(null);
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const backingSynthRef = useRef<Tone.PolySynth | null>(null);
    const drumRef = useRef<Tone.MembraneSynth | null>(null);
    const loopRef = useRef<Tone.Loop | null>(null);
    const animationFrameRef = useRef<number>(0);
    const wasGrabbingRef = useRef<boolean>(false);

    // 1. Load MediaPipe Hand Landmarker
    useEffect(() => {
        const loadHandLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "/models/mediapipe/hand_landmarker.task",
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 2
            });
            setIsModelLoaded(true);
        };
        loadHandLandmarker();
    }, []);

    // 2. Setup Camera
    useEffect(() => {
        if (isModelLoaded && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.addEventListener('loadeddata', predictWebcam);
                    }
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- predictWebcam defined below; adding it would re-bind listener every frame
    }, [isModelLoaded, isPlaying]);

    // 3. Tracking Loop: Palm Grab Detection With DEBUG
    let lastVideoTime = -1;
    const predictWebcam = () => {
        if (!videoRef.current || !handLandmarkerRef.current || !isPlaying) return;

        if (videoRef.current.currentTime !== lastVideoTime) {
            lastVideoTime = videoRef.current.currentTime;
            const startTimeMs = performance.now();
            const results = handLandmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (canvas && ctx && videoRef.current) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Get latest state from Refs
                const currentTargetPos = targetPosRef.current;
                const isMirroredNow = isMirroredRef.current;

                // Draw target highlight for debug
                if (isDebug) {
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    // Draw target at visual coordinates (0-1)
                    ctx.arc(currentTargetPos.x * canvas.width, currentTargetPos.y * canvas.height, 80, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillStyle = "red";
                    // Only show text if on screen
                    if (currentTargetPos.x >= 0) {
                        ctx.fillText(`TARGET`, currentTargetPos.x * canvas.width - 20, currentTargetPos.y * canvas.height - 90);
                    }
                }

                if (results.landmarks) {
                    for (const landmarks of results.landmarks) {
                        const wrist = landmarks[0];
                        const middleMCP = landmarks[9];

                        const handSize = Math.sqrt(
                            Math.pow(middleMCP.x - wrist.x, 2) + Math.pow(middleMCP.y - wrist.y, 2)
                        );

                        const tips = [landmarks[8], landmarks[12], landmarks[16]];
                        const avgTipDist = tips.reduce((acc, tip) => acc + Math.sqrt(
                            Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2)
                        ), 0) / tips.length;

                        const threshold = handSize * 1.8;
                        const isGrabbing = avgTipDist < threshold;

                        const palmX = (wrist.x + landmarks[13].x) / 2;
                        const palmY = (wrist.y + landmarks[13].y) / 2;

                        // COORDINATE MAPPING FIX
                        // If mirrored, we invert X. 
                        // IMPORTANT: Canvas CSS is NO LONGER flipped. We flip logically here.
                        let x = palmX;
                        if (isMirroredNow) {
                            x = 1 - x;
                        }
                        x = x * canvas.width;
                        const y = palmY * canvas.height;

                        // Visual Feedback
                        ctx.beginPath();
                        ctx.arc(x, y, isGrabbing ? 40 : 50, 0, 2 * Math.PI);

                        if (isGrabbing) {
                            ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
                            ctx.fill();
                            ctx.lineWidth = 0;
                        } else {
                            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.lineWidth = 4;
                            ctx.setLineDash([10, 5]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.beginPath();
                            ctx.arc(x, y, 5, 0, 2 * Math.PI);
                            ctx.fillStyle = "white";
                            ctx.fill();
                        }

                        // DEBUG INFO ON CANVAS
                        if (isDebug) {
                            ctx.fillStyle = "yellow";
                            ctx.font = "20px monospace";
                            ctx.fillText(`Hand: ${isGrabbing ? "CLOSED" : "OPEN"}`, x + 60, y);
                            ctx.fillText(`Dist: ${(avgTipDist / handSize).toFixed(2)} / 1.8`, x + 60, y + 25);

                            if (currentTargetPos.x >= 0) {
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(currentTargetPos.x * canvas.width, currentTargetPos.y * canvas.height);
                                ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }

                            const transport = Tone.getTransport();
                            if (transport.state === 'started') {
                                const position = transport.position as string;
                                const beat = position.split(':')[1];
                                ctx.fillText(`Beat: ${beat}`, 20, 60);
                            }
                        }

                        if (isGrabbing && !wasGrabbingRef.current) {
                            checkCollision(x, y, canvas.width, canvas.height);
                        }

                        wasGrabbingRef.current = isGrabbing;
                    }
                } else {
                    wasGrabbingRef.current = false;
                }
            }
        }
        animationFrameRef.current = requestAnimationFrame(predictWebcam);
    };

    // Stop prediction loop when not playing
    useEffect(() => {
        if (!isPlaying && animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }, [isPlaying]);

    // 5. Enhanced Audio & Rhythmic Logic
    const initAudio = async () => {
        await Tone.start();

        // 1. Melody Synth (Rewards)
        if (!synthRef.current) {
            const reverb = new Tone.Reverb(0.5).toDestination();
            synthRef.current = new Tone.PolySynth(Tone.Synth).connect(reverb);
            synthRef.current.volume.value = -2;
        }

        // 2. Backing Track Synths
        if (!backingSynthRef.current) {
            const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
            backingSynthRef.current = new Tone.PolySynth(Tone.Synth).connect(chorus);
            backingSynthRef.current.volume.value = -10;
        }
        if (!drumRef.current) {
            drumRef.current = new Tone.MembraneSynth().toDestination();
            drumRef.current.volume.value = -5;
        }
    };

    // Rhythm Loop - THERAPEUTIC ELEMENT: Musical Scaffolding
    useEffect(() => {
        if (!isPlaying) {
            loopRef.current?.stop();
            return;
        }

        let beatCounter = 0;

        loopRef.current = new Tone.Loop((time) => {
            const beat = beatCounter % 4;
            Tone.Draw.schedule(() => setCurrentBeat(beat), time);

            // A. Backing Rhythm (Metronome/Drum)
            // Kick on 1, Hat on others to keep time
            if (beat === 0) drumRef.current?.triggerAttackRelease("C2", "8n", time);
            else drumRef.current?.triggerAttackRelease("C1", "16n", time, 0.5);

            // B. Harmonic Support (Chords)
            // Change chord every measure (4 beats)
            if (beat === 0) {
                const root = beatCounter % 8 < 4 ? "C3" : "G3"; // I - V progression
                backingSynthRef.current?.triggerAttackRelease([root, Tone.Frequency(root).transpose(4).toNote(), Tone.Frequency(root).transpose(7).toNote()], "1n", time);

                // Spawn new animal target ON THE DOWNBEAT (Rhythmic Cueing)
                Tone.Draw.schedule(() => {
                    const newPos = { x: 0.2 + Math.random() * 0.6, y: 0.2 + Math.random() * 0.6 };
                    setTargetPos(newPos);
                    targetPosRef.current = newPos; // Sync Ref immediately for loop accessibility
                    setActiveAnimal(Math.floor(Math.random() * ANIMALS.length));
                }, time);
            }

            beatCounter++;
        }, "4n").start(0);

        Tone.getTransport().bpm.value = 90; // Steady walking tempo
        Tone.getTransport().start();

        return () => { loopRef.current?.dispose(); }
    }, [isPlaying]);

    // Hit Logic - Musical Reward
    // Hit Logic - Musical Reward
    const hitTarget = () => {
        // Play harmonious note based on current chord context
        const animal = ANIMALS[activeAnimal];

        // Pentatonic Scale ensures no wrong notes
        synthRef.current?.triggerAttackRelease(animal.note, "4n");
        synthRef.current?.triggerAttackRelease(Tone.Frequency(animal.note).transpose(12).toNote(), "8n", Tone.now() + 0.1);

        setScore(s => s + 10);

        // Hide target temporarily until next downbeat
        setTargetPos({ x: -1, y: -1 });
        targetPosRef.current = { x: -1, y: -1 };
    };

    // 4. Game Logic: Collision Check
    // 4. Game Logic: Collision Check
    const checkCollision = (fingerX: number, fingerY: number, width: number, height: number) => {
        // Use Ref for latest position
        const targetX = targetPosRef.current.x * width;
        const targetY = targetPosRef.current.y * height;
        const radius = 80; // Target Hitbox Size

        const dx = fingerX - targetX;
        const dy = fingerY - targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
            const now = Date.now();
            if (now - lastHitTime > 500) { // Debounce hits
                hitTarget();
                setLastHitTime(now);
            }
        }
    };

    const toggleGame = async () => {
        if (!isPlaying) {
            await initAudio();
            setIsPlaying(true);
            setScore(0);
        } else {
            setIsPlaying(false);
            Tone.getTransport().stop();
        }
    };

    // Update beat ref for canvas
    useEffect(() => {
        if (isPlaying) {
            // Sync ref for render loop
            beatRef.current = currentBeat;
        }
    }, [currentBeat, isPlaying]);


    return (
        <div className="min-h-screen bg-sky-100 p-4 relative overflow-hidden font-sans flex flex-col items-center">
            {/* Header with Score & Dev Toggle */}
            <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center max-w-6xl mx-auto w-full pointer-events-none">
                <div className="flex gap-4 pointer-events-auto">
                    <Link to="/" className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full hover:bg-white shadow-lg text-slate-700 font-bold">
                        <ArrowLeft size={20} /> Back
                    </Link>
                    <button onClick={() => setIsMirrored(!isMirrored)} className="bg-white/80 px-4 py-2 rounded-full font-bold text-slate-700 shadow-lg">
                        {isMirrored ? "↔️ Mir: ON" : "➡️ Mir: OFF"}
                    </button>
                    <button onClick={() => setIsDebug(!isDebug)} className={`px-4 py-2 rounded-full font-bold shadow-lg ${isDebug ? 'bg-yellow-400 text-black' : 'bg-white/80 text-slate-700'}`}>
                        {isDebug ? "🛠️ Dev: ON" : "🔧 Dev: OFF"}
                    </button>
                </div>

                {/* Score Board - Always Visible */}
                <div className="bg-white/90 px-8 py-2 rounded-full shadow-xl flex items-center gap-4 border-2 border-purple-500 pointer-events-auto">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</span>
                    <span className="text-3xl font-black text-purple-600 font-mono min-w-[60px] text-right">{score}</span>
                </div>
            </div>

            <div className="flex-1 w-full max-w-6xl relative flex items-center justify-center mt-12">
                <div className="relative aspect-video max-h-[80vh] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    {/* ... Video & Canvas ... */}
                    <video
                        ref={videoRef} className={`w-full h-full ${isMirrored ? 'transform scale-x-[-1]' : ''}`} autoPlay muted playsInline
                        // Removing object-cover to avoid coordinate cropping mismatch
                        style={{ objectFit: 'contain' }}
                        onLoadedMetadata={() => {
                            if (canvasRef.current && videoRef.current) {
                                canvasRef.current.width = videoRef.current.videoWidth;
                                canvasRef.current.height = videoRef.current.videoHeight;
                            }
                        }}
                    />
                    <canvas ref={canvasRef}
                        className={`absolute inset-0 w-full h-full`}
                        style={{ objectFit: 'contain' }}
                    />

                    {/* Rhythmic Guide Overlay */}
                    {isPlaying && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className={`w-4 h-4 rounded-full transition-all ${currentBeat === i ? 'bg-green-500 scale-150' : 'bg-white/50'}`} />
                            ))}
                        </div>
                    )}

                    {/* Floating Target */}
                    {isPlaying && targetPos.x >= 0 && (
                        <motion.div
                            className={`absolute w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-2xl border-4 ${ANIMALS[activeAnimal].color} z-10`}
                            style={{
                                left: targetPos.x * 100 + '%',
                                top: targetPos.y * 100 + '%',
                                x: '-50%', y: '-50%'
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.1, 1] }} // Spawn animation
                            exit={{ scale: 0 }}
                        >
                            {ANIMALS[activeAnimal].emoji}
                        </motion.div>
                    )}

                    {/* ... Start Screen ... */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-30">
                            <h1 className="text-5xl font-black text-white mb-2">Rhythm Farm Therapy</h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-md text-center">Impulse Control Training: <br />Wait for the <span className="text-green-400 font-bold">Animal</span> to appear on the beat!</p>
                            <button onClick={toggleGame} className="bg-green-500 hover:bg-green-400 text-white text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-4">
                                <Play size={32} fill="currentColor" /> Start Rhythm Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <p className="mt-4 text-slate-500 text-sm font-medium opacity-70">Powered by MediaPipe Hand Tracking</p>
        </div>
    );
};

export default RhythmFarm;
