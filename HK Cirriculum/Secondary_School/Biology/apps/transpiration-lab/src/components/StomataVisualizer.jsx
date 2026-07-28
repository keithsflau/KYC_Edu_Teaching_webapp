import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Info } from 'lucide-react';

const StomataVisualizer = ({ lightIntensity }) => {
    const isOpen = lightIntensity > 0;

    // Simulation states for the mechanism animation sequence
    // 0: Closed (Night)
    // 1: K+ Pumping (Active Transport)
    // 2: Water Entering (Osmosis)
    // 3: Swelling/Open (Turgid)
    const [mechanismStep, setMechanismStep] = useState(0);

    useEffect(() => {
        if (isOpen) {
            if (mechanismStep === 0) {
                // Start opening sequence
                const t1 = setTimeout(() => setMechanismStep(1), 500); // K+ enters
                const t2 = setTimeout(() => setMechanismStep(2), 2500); // Water follows
                const t3 = setTimeout(() => setMechanismStep(3), 4500); // Swells
                return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
            }
        } else {
            // Close sequence - fast
            setMechanismStep(0);
        }
    }, [isOpen, mechanismStep]);

    // Visual constants
    const cellColor = "#4ade80"; // green-400
    const cellBorder = "#166534"; // green-800

    return (
        <div className="bg-white/80 p-6 rounded-2xl shadow-xl backdrop-blur-sm h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 z-10">
                <div>
                    <h2 className="text-2xl font-bold text-green-900">Microscopic View</h2>
                    <p className="text-sm text-green-700">Stomata Mechanism</p>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full text-xs font-semibold text-green-800 uppercase">
                    {isOpen ? "Day Mode (Light)" : "Night Mode (Dark)"}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
                {/* Educational Overlay/Labels */}
                <AnimatePresence>
                    {mechanismStep === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="absolute top-10 bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm z-20"
                        >
                            1. K+ Ions pumped into Guard Cells (Active Transport)
                        </motion.div>
                    )}
                    {mechanismStep === 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="absolute top-10 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm z-20"
                        >
                            2. Water enters by Osmosis (Water Potential ↓)
                        </motion.div>
                    )}
                    {mechanismStep === 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="absolute top-10 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm z-20"
                        >
                            3. Cells become Turgid & Pore Opens
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The Stomata SVG */}
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
                        {/* Background Pavement Cells (Simplified) */}
                        <path d="M0,0 H200 V200 H0 Z" fill="#ecfdf5" opacity="0.5" />

                        {/* Left Guard Cell */}
                        <GuardCell
                            side="left"
                            step={mechanismStep}
                            cellColor={cellColor}
                            borderColor={cellBorder}
                        />
                        {/* Right Guard Cell */}
                        <GuardCell
                            side="right"
                            step={mechanismStep}
                            cellColor={cellColor}
                            borderColor={cellBorder}
                        />

                        {/* Particles Layer */}
                        {mechanismStep >= 1 && <Particles type="potassium" count={15} />}
                        {mechanismStep >= 2 && <Particles type="water" count={25} />}

                    </svg>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 space-y-2 text-xs font-medium text-slate-600 bg-white/90 p-2 rounded border border-slate-200">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> K+ Ions
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> H₂O Water
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-green-800 rounded-full"></span> Thick Inner Wall
                    </div>
                </div>
            </div>
        </div>
    );
};

const GuardCell = ({ side, step, cellColor, borderColor }) => {
    // Animation states based on step
    // Closed: straighter inner edge
    // Open: curved inner edge (reniform) (bows out)

    const isLeft = side === 'left';
    const isOpen = step === 3;
    const isSwelling = step >= 2;

    // Path definitions
    // Coordinate system 200x200. Center 100,100.
    // Left cell center approx 70,100. Right 130,100.

    // Left Cell Closed: Outer curve (convex), Inner curve (straight-ish/slightly concave)
    // Left Cell Open: Outer curve (more convex), Inner curve (very concave = pore open)

    // Using path interpolation via Framer Motion is tricky with complex strings, 
    // so we'll use scaling and rotation or pre-calculated path variations.
    // Let's try morphing Scale X/Y and bending.

    // Simplified kidney shape centered at local origin, then translated.
    // But we need the THICK WALL visual. 

    // Let's construct a path.
    // M 100 20 (Top contact)
    // Q <outer_ctrl> 100, 100 180 (Bottom contact) -> Outer wall
    // Q <inner_ctrl> 100, 100 20 (Top contact) -> Inner wall (pore side)

    // Left Cell:
    // Top: 100, 30. Bottom: 100, 170.
    // Closed: Inner Ctrl (95, 100). Outer Ctrl (30, 100).
    // Open: Inner Ctrl (80, 100). Outer Ctrl (20, 100). (More bent)

    const topY = 40;
    const bottomY = 160;
    const midY = 100;
    const centerX = 100;

    // Define Control Points
    // Closed
    const closedInnerX = isLeft ? 98 : 102;
    const closedOuterX = isLeft ? 50 : 150;

    // Open
    const openInnerX = isLeft ? 85 : 115;
    const openOuterX = isLeft ? 40 : 160;

    const currentInnerX = isOpen ? openInnerX : closedInnerX;
    const currentOuterX = isOpen ? openOuterX : closedOuterX;

    // We animate these values if we want smooth morph, 
    // or just use Motion animate on the 'd' attribute? 
    // Framer motion 'd' requires same number of points.

    const pathD = `
    M ${centerX} ${topY}
    Q ${currentOuterX} ${midY} ${centerX} ${bottomY}
    Q ${currentInnerX} ${midY} ${centerX} ${topY}
    Z
  `;

    // Inner Wall Overlay (Thicker)
    // Just the inner curve
    const innerWallD = `
    M ${centerX} ${topY}
    Q ${currentInnerX} ${midY} ${centerX} ${bottomY}
  `;

    return (
        <motion.g
            initial={false}
            animate={{
                // We can just animate the path string if using Framer Motion 
                d: pathD
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <motion.path
                d={pathD}
                fill={cellColor}
                stroke={borderColor}
                strokeWidth="2"
                animate={{ d: pathD }}
                transition={{ duration: 2, ease: "easeInOut" }} // Slow turgidity visual
            />
            {/* Thick Inner Wall */}
            <motion.path
                d={innerWallD}
                fill="none"
                stroke={borderColor}
                strokeWidth="8"
                strokeLinecap="round"
                animate={{ d: innerWallD }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </motion.g>
    );
};

const Particles = ({ type, count }) => {
    const isK = type === 'potassium';
    const color = isK ? "#ef4444" : "#3b82f6"; // red or blue

    // Random positions inside the cells? Or flowing IN?
    // Flowing IN animation: Start outside/edges, move to center of guard cell.

    // Generate random particles
    const particles = Array.from({ length: count }).map((_, i) => ({
        id: i,
        delay: Math.random() * 2,
        startX: Math.random() < 0.5 ? 20 : 180, // From sides
        startY: Math.random() * 200,
        targetX: Math.random() < 0.5 ? 70 : 130, // Into cells
        targetY: 50 + Math.random() * 100
    }));

    return (
        <g>
            {particles.map(p => (
                <motion.circle
                    key={p.id}
                    r={isK ? 2 : 3}
                    fill={color}
                    initial={{ x: p.startX, y: p.startY, opacity: 0 }}
                    animate={{ x: p.targetX, y: p.targetY, opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        delay: p.delay,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            ))}
        </g>
    );
};

export default StomataVisualizer;
