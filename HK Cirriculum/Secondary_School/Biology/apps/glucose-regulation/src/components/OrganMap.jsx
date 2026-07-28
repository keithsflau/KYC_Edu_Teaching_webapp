import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Activity, Zap, Droplet } from 'lucide-react';

// Organ Components
const Organ = ({ title, color, children, className, icon: Icon }) => (
    <div className={clsx("relative p-4 rounded-xl border-2 transition-colors duration-300", className)} style={{ borderColor: color, backgroundColor: `${color}10` }}>
        <div className="absolute -top-3 left-4 px-2 bg-slate-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: color }}>
            {Icon && <Icon size={12} />}
            {title}
        </div>
        {children}
    </div>
);

const Particle = ({ color, type, target }) => {
    // Randomize initial position slightly
    const randomDelay = Math.random() * 2;

    return (
        <motion.div
            layoutId={`p-${type}-${Math.random()}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
                x: target.x, // Abstract coordinates
                y: target.y
            }}
            transition={{ duration: 2, repeat: Infinity, delay: randomDelay }}
            className="absolute w-3 h-3 rounded-full shadow-lg z-20 pointer-events-none"
            style={{ backgroundColor: color }}
        />
    );
};

const OrganMap = ({ glucose, insulin, glucagon, glycogen, condition }) => {
    // Determine visual states
    const hasHighGlucose = glucose > 100;
    const hasLowGlucose = glucose < 80;

    // We visualize particles based on concentration levels.
    // Instead of 1-to-1 tracking, we use a probabilistic rendering of dots.

    // Grid Areas
    // LIVER | BLOODSTREAM | PANCREAS
    //       |             | MUSCLE

    return (
        <div className="relative w-full h-[500px] bg-slate-800/50 rounded-2xl border border-slate-700 p-6 overflow-hidden">

            {/* Background Connections (Veins/Arteries) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" stroke="currentColor">
                <path d="M 200 150 C 300 150, 300 150, 400 150" strokeWidth="20" stroke="#E63946" fill="none" /> {/* Liver to Blood */}
                <path d="M 400 150 C 500 150, 500 150, 600 150" strokeWidth="20" stroke="#E63946" fill="none" /> {/* Blood to Pancreas */}
                <path d="M 400 150 L 400 350" strokeWidth="20" stroke="#E63946" fill="none" /> {/* Blood Down */}
                <path d="M 400 350 L 600 350" strokeWidth="20" stroke="#E63946" fill="none" /> {/* To Muscle */}
            </svg>

            {/* Layout Grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full relative z-10">

                {/* LIVER (Top Left) */}
                <div className="col-span-1 row-span-1 flex justify-center items-center">
                    <Organ title="Liver" color="#8D5524" className="w-full h-40" icon={Activity}>
                        <div className="h-full flex flex-col justify-between">
                            <div className="text-xs text-slate-400 text-center mb-1">Glycogen Stores</div>
                            <div className="flex-1 w-full bg-[#5D3514]/30 rounded flex flex-wrap content-start gap-1 p-2 overflow-hidden">
                                {/* Visualize Glycogen Chains */}
                                {Array.from({ length: Math.min(glycogen / 5, 20) }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 rounded-full bg-slate-200 opacity-60"
                                    />
                                ))}
                            </div>
                            <div className="text-xs text-center mt-1 text-[#8D5524] font-mono">
                                {Math.round(glycogen)} units
                            </div>
                        </div>
                    </Organ>
                </div>

                {/* BLOODSTREAM (Center Vertical) */}
                <div className="col-span-1 row-span-2 flex justify-center items-center relative">
                    <div className="w-40 h-full bg-[#E63946]/10 rounded-full border-4 border-[#E63946]/30 relative flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute top-2 text-[#E63946] font-bold tracking-widest text-xs">BLOODSTREAM</div>

                        {/* Glucose Particles (White) */}
                        <div className="absolute inset-0 p-4">
                            {Array.from({ length: Math.min(glucose / 5, 50) }).map((_, i) => (
                                <motion.div
                                    key={`g-${i}`}
                                    animate={{
                                        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                                        y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                                    }}
                                    transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full opacity-80 shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                                />
                            ))}
                        </div>

                        {/* Insulin Particles (Blue) */}
                        <div className="absolute inset-0 pointer-events-none">
                            {insulin > 5 && Array.from({ length: Math.min(insulin / 2, 20) }).map((_, i) => (
                                <motion.div
                                    key={`in-${i}`}
                                    animate={{
                                        x: [Math.random() * 80 - 40, Math.random() * 80 - 40],
                                        y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                                        opacity: [0.4, 0.8, 0.4]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute left-1/2 top-1/2 w-3 h-3 bg-[#457B9D] rounded-lg opacity-80"
                                    style={{ borderRadius: '2px' }} // Square-ish for distinction
                                />
                            ))}
                        </div>

                        {/* Glucagon Particles (Orange) */}
                        <div className="absolute inset-0 pointer-events-none">
                            {glucagon > 5 && Array.from({ length: Math.min(glucagon / 2, 20) }).map((_, i) => (
                                <motion.div
                                    key={`glu-${i}`}
                                    animate={{
                                        x: [Math.random() * 80 - 40, Math.random() * 80 - 40],
                                        y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                                        rotate: [0, 360]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute left-1/2 top-1/2 w-3 h-3 bg-[#F4A261] clip-path-triangle opacity-90"
                                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* PANCREAS (Top Right) */}
                <div className="col-span-1 row-span-1 flex justify-center items-center">
                    <Organ title="Pancreas" color="#F4A261" className="w-full h-40 flex flex-col gap-2" icon={Zap}>
                        {/* Alpha Cells */}
                        <div className={`flex-1 rounded p-2 border ${glucagon > 10 ? 'bg-[#F4A261]/40 border-[#F4A261]' : 'bg-slate-800/50 border-transparent'} transition-all`}>
                            <div className="text-[10px] text-slate-300">Alpha Cells</div>
                            <div className="flex justify-between items-center">
                                <span className={clsx("text-xs font-bold", glucagon > 10 ? "text-white" : "text-slate-500")}>
                                    {glucagon > 10 ? "RELEASING GLUCAGON" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        {/* Beta Cells */}
                        <div className={`flex-1 rounded p-2 border ${insulin > 10 ? 'bg-[#457B9D]/40 border-[#457B9D]' : 'bg-slate-800/50 border-transparent'} transition-all`}>
                            <div className="text-[10px] text-slate-300">Beta Cells</div>
                            <div className="flex justify-between items-center">
                                <span className={clsx("text-xs font-bold", insulin > 10 ? "text-white" : "text-slate-500")}>
                                    {condition === 'TYPE_1' ? "DAMAGED" : (insulin > 10 ? "RELEASING INSULIN" : "Inactive")}
                                </span>
                            </div>
                        </div>
                    </Organ>
                </div>

                {/* MUSCLE (Bottom Right) */}
                <div className="col-span-1 row-span-1 flex justify-center items-center mt-auto">
                    <Organ title="Muscles / Cells" color="#E76F51" className="w-full h-40" icon={Droplet}>
                        <div className="h-full flex flex-col items-center justify-center">
                            <motion.div
                                animate={{ scale: insulin > 10 ? [1, 1.05, 1] : 1 }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="text-center"
                            >
                                <div className="text-sm font-bold text-slate-300">Glucose Uptake</div>
                                <div className="text-2xl font-black text-[#E76F51]">
                                    {insulin > 5 && condition !== 'TYPE_1' ? (condition === 'TYPE_2' ? "LOW" : "HIGH") : "BASAL"}
                                </div>
                            </motion.div>

                            {condition === 'TYPE_2' && (
                                <div className="mt-2 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                                    Resistance Detected
                                </div>
                            )}
                        </div>
                    </Organ>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 p-2 rounded-lg border border-slate-700 backdrop-blur-sm z-20">
                <div className="flex gap-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-white"></div> Glucose
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm bg-[#457B9D]"></div> Insulin
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#F4A261] clip-path-triangle" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div> Glucagon
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrganMap;
