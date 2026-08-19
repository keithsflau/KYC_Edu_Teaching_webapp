import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Constants for positioning
const CLEFT_HEIGHT = 100;
const KNOB_BOTTOM = 350;
const POST_TOP = KNOB_BOTTOM + CLEFT_HEIGHT;

export function SynapseView({ step, toxicology }) {

    // -- Particle States --
    const [calciumIons, setCalciumIons] = useState([]);
    const [achParticles, setAchParticles] = useState([]);
    const [sodiumIons, setSodiumIons] = useState([]);
    const [vesicles, setVesicles] = useState([
        { id: 1, x: 300, y: 150 },
        { id: 2, x: 450, y: 180 },
        { id: 3, x: 200, y: 200 },
        { id: 4, x: 550, y: 140 },
    ]);

    // -- Simulation Effects based on Step --
    useEffect(() => {
        // Reset/Init on step 0
        if (step === 0) {
            setCalciumIons([]);
            setAchParticles([]);
            setSodiumIons([]);
            setVesicles([
                { id: 1, x: 300, y: 150 },
                { id: 2, x: 450, y: 180 },
                { id: 3, x: 200, y: 200 },
                { id: 4, x: 550, y: 140 },
            ]);
        }

        // Step 2: Calcium Influx
        if (step === 1) {
            // Spawn Ca ions outside and move them in
            const ions = Array.from({ length: 12 }).map((_, i) => ({
                id: i,
                x: i % 2 === 0 ? 100 : 700, // Left and right sides (tissue fluid)
                y: 200 + Math.random() * 100,
                targetX: 200 + Math.random() * 400, // Inside knob
                targetY: 250 + Math.random() * 80,
            }));
            setCalciumIons(ions);
        }

        // Step 4: Exocytosis (Release ACH)
        if (step === 3) {
            // Vesicles are fusing, generate ACh particles at fusion sites
            const newAch = [];
            vesicles.forEach((v, i) => {
                // Create a cluster of ACh for each vesicle
                for (let j = 0; j < 8; j++) {
                    newAch.push({
                        id: `ach-${i}-${j}`,
                        startX: v.x + (Math.random() - 0.5) * 20,
                        startY: KNOB_BOTTOM,
                        // Scatter into cleft
                        targetX: v.x + (Math.random() - 0.5) * 100,
                        targetY: KNOB_BOTTOM + 20 + Math.random() * 60,
                    });
                }
            });
            setAchParticles(newAch);
        }

        // Step 6: Depolarization (Na Influx)
        if (step === 5) {
            if (toxicology === 'curare') {
                // No Na influx if blocked
            } else {
                const ions = Array.from({ length: 15 }).map((_, i) => ({
                    id: `na-${i}`,
                    x: i * 50 + 50,
                    y: POST_TOP + 10, // Start at channels
                    targetY: POST_TOP + 150 + Math.random() * 50, // Move into post-synaptic
                }));
                setSodiumIons(ions);
            }
        }

        // Step 7: Termination
        if (step === 6) {
            // Clear particles nicely unless inhibited
            if (toxicology !== 'nerve_gas') {
                setAchParticles([]);
                setSodiumIons([]);
            }
            // Calcium always clears as it's pre-synaptic
            setCalciumIons([]);
        }

    }, [step, toxicology]);


    // Helper Logic for Animations
    const isCaChannelOpen = step >= 1 && step < 6;
    const isVesicleMoving = step >= 2;
    const isVesicleFused = step >= 3;
    // Na Channel opens on step 5, and STAYS open if nerve gas prevents breakdown
    const isNaChannelOpen = (step === 5 || (step === 6 && toxicology === 'nerve_gas')) && toxicology !== 'curare';

    // Receptors blocked?
    const isBlocked = toxicology === 'curare';

    return (
        <div className="w-full h-full min-h-[500px] relative bg-[#1a1c23] select-none">
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 800 600">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff10" strokeWidth="0.5" />
                    </pattern>
                </defs>

                {/* Background Grid */}
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* --- PRE-SYNAPTIC KNOB --- */}
                <path
                    d={`M 100,0 L 100,250 Q 100,${KNOB_BOTTOM} 400,${KNOB_BOTTOM} Q 700,${KNOB_BOTTOM} 700,250 L 700,0 Z`}
                    fill="#1e293b"
                    stroke={step === 0 ? "#facc15" : "#475569"} // Highlight on signal arrival
                    strokeWidth="4"
                    className="transition-colors duration-500"
                />

                {/* Action Potential Glow */}
                {step >= 0 && step < 1 && (
                    <motion.path
                        d={`M 100,0 L 100,250 Q 100,${KNOB_BOTTOM} 400,${KNOB_BOTTOM} Q 700,${KNOB_BOTTOM} 700,250 L 700,0 Z`}
                        fill="url(#ap-grad)" // We'll assume a gradient or just animate opacity
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="fill-yellow-500/20"
                    />
                )}

                {/* Mitochondria */}
                <g transform="translate(150, 50) rotate(45)">
                    <Mitochondria />
                </g>
                <g transform="translate(600, 80) rotate(-45)">
                    <Mitochondria />
                </g>

                {/* Ca Channels */}
                <CaChannel x={100} y={200} open={isCaChannelOpen} side="left" />
                <CaChannel x={700} y={200} open={isCaChannelOpen} side="right" />


                {/* --- POST-SYNAPTIC MEMBRANE --- */}
                <path
                    d={`M 0,${POST_TOP} L 800,${POST_TOP} L 800,600 L 0,600 Z`}
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="4"
                />

                {/* Na Channels / Receptors */}
                {[200, 300, 400, 500, 600].map(x => (
                    <NaChannel
                        key={x}
                        x={x}
                        y={POST_TOP}
                        open={isNaChannelOpen}
                        blocked={isBlocked}
                        hasBoundACh={step >= 4 && step < 6}
                    />
                ))}

                {/* --- PARTICLES & VESICLES --- */}

                {/* Vesicles */}
                <AnimatePresence>
                    {!isVesicleFused && vesicles.map((v) => (
                        <motion.g
                            key={v.id}
                            initial={{ x: v.x, y: v.y }}
                            animate={{
                                x: v.x,
                                y: isVesicleMoving ? KNOB_BOTTOM - 25 : v.y  // Move to membrane
                            }}
                            transition={{ duration: 1, type: 'spring' }}
                        >
                            <circle r="20" fill="#fef08a" fillOpacity="0.2" stroke="#facc15" strokeWidth="2" />
                            {/* Dots inside */}
                            <circle r="2" cx="-5" cy="-5" fill="#16a34a" />
                            <circle r="2" cx="5" cy="5" fill="#16a34a" />
                            <circle r="2" cx="5" cy="-5" fill="#16a34a" />
                            <circle r="2" cx="-5" cy="5" fill="#16a34a" />
                        </motion.g>
                    ))}
                </AnimatePresence>

                {/* Fusing Vesicles (Visual changes during fusion) */}
                {isVesicleFused && step < 6 && vesicles.map((v) => (
                    <motion.path
                        key={'fused-' + v.id}
                        d={`M ${v.x - 20},${KNOB_BOTTOM} Q ${v.x},${KNOB_BOTTOM - 20} ${v.x + 20},${KNOB_BOTTOM}`} // Omega shape simplified
                        stroke="#facc15"
                        strokeWidth="2"
                        fill="none"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                ))}

                {/* Calcium Ions */}
                {calciumIons.map(ion => (
                    <motion.circle
                        key={ion.id}
                        r="4"
                        fill="#9333ea"
                        initial={{ cx: ion.x, cy: ion.y, opacity: 0 }}
                        animate={{ cx: ion.targetX, cy: ion.targetY, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                ))}

                {/* ACh Particles */}
                {achParticles.map(p => (
                    <motion.circle
                        key={p.id}
                        r="3"
                        fill="#16a34a"
                        initial={{ cx: p.startX, cy: p.startY, opacity: 1 }}
                        animate={{
                            cx: step >= 4 ? (toxicology === 'curare' ? p.targetX : findNearestReceptor(p.startX).x) : p.targetX,
                            cy: step >= 4 ? POST_TOP - 5 : p.targetY
                        }}
                        // Specific bounce anim for curare could go here
                        transition={{ duration: 1 }}
                    />
                ))}

                {/* Sodium Ions */}
                {sodiumIons.map(ion => (
                    <motion.circle
                        key={ion.id}
                        r="3"
                        fill="#dc2626"
                        initial={{ cx: ion.x, cy: ion.y - 50, opacity: 0 }} // Start coming from cleft
                        animate={{ cx: ion.x, cy: ion.targetY, opacity: 1 }}
                        transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                    />
                ))}

                {/* Enzyme Pacman (Termination) */}
                {step === 6 && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {[250, 350, 450, 550].map(x => (
                            <path
                                key={x}
                                d={`M ${x},${POST_TOP - 30} L ${x + 10},${POST_TOP - 40} A 10 10 0 1 1 ${x - 10},${POST_TOP - 40} Z`} // Crude Pacman
                                fill="#fbbf24"
                            />
                        ))}
                    </motion.g>
                )}

            </svg>

            {/* Labels / Tooltips Overlay if needed */}
        </div>
    );
}

// --- Sub-components (SVG parts) ---

function Mitochondria() {
    return (
        <g className="group cursor-help">
            <path
                d="M 0,0 Q 20,-10 40,0 Q 20,10 0,0 Z"
                fill="#ef4444"
                fillOpacity="0.3"
                stroke="#ef4444"
                strokeWidth="2"
            />
            {/* Cristae */}
            <path d="M 10,-3 L 10,3 M 20,-5 L 20,5 M 30,-3 L 30,3" stroke="#ef4444" strokeWidth="1" />
            <title>Mitochondria: Provides ATP.</title>
        </g>
    );
}

function CaChannel({ x, y, open, side }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect x="-10" y="-20" width="20" height="40" rx="4" fill="#64748b" />
            {/* Gate */}
            <motion.rect
                x={side === 'left' ? "10" : "-30"}
                y="-20"
                width="10"
                height="40"
                fill="#cbd5e1"
                animate={{
                    rotate: open ? (side === 'left' ? 45 : -45) : 0,
                    originY: 0.5 // pivot center
                }}
                style={{ originX: side === 'left' ? 0 : 1 }}
            />
        </g>
    );
}

function NaChannel({ x, y, open, blocked, hasBoundACh }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Channel Body */}
            <path d="M -15,0 L -15,40 L 15,40 L 15,0" fill="#64748b" />

            {/* Pore */}
            <motion.rect
                x="-5"
                y="0"
                width="10"
                height="40"
                fill={open ? "#0f172a" : "#64748b"} // Dark hole when open
            />

            {/* Receptor Sites */}
            <path d="M -15,-5 L -10,0 L -15,5" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 15,-5 L 10,0 L 15,5" fill="none" stroke="#94a3b8" strokeWidth="2" />

            {/* Bound ACh? */}
            {hasBoundACh && !blocked && (
                <>
                    <circle cx="-13" cy="0" r="3" fill="#16a34a" />
                    <circle cx="13" cy="0" r="3" fill="#16a34a" />
                </>
            )}

            {/* Blocked (Curare)? */}
            {blocked && (
                <g>
                    <circle cx="-13" cy="0" r="4" fill="#dc2626" opacity="0.8" />
                    <circle cx="13" cy="0" r="4" fill="#dc2626" opacity="0.8" />
                </g>
            )}

            {/* Gate Animation */}
            <motion.path
                d="M -15,0 L 0,0 L 15,0"
                stroke="#cbd5e1"
                strokeWidth="4"
                animate={{ opacity: open ? 0 : 1 }}
            />
        </g>
    );
}


function findNearestReceptor(x) {
    // Simplified logic to snap to predefined channels
    const channels = [200, 300, 400, 500, 600];
    const nearest = channels.reduce((prev, curr) =>
        Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev
    );
    return { x: nearest };
}
