import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const IonChannel = ({ type, state }) => {
    // state: 'closed' | 'open' | 'inactivated'
    const isNa = type === 'Na';
    const isOpen = state === 'open' || state === 'inactivated'; // Physically open but maybe blocked? 
    // Biologically: 
    // Resting: Closed (Activation gate closed, Inactivation gate open)
    // Depolarization: Open (Both open)
    // Repolarization: Inactivated (Activation gate open, Inactivation gate closed)
    // Reset: Closed (Activation closed, Inactivation open)

    // So visually:
    // Closed: Pore allows no passage (Top gate closed?) 
    // Actually, voltage gated Na channels have activation gates (m-gates) and inactivation gates (h-gates).
    // Closed: m-gate closed.
    // Open: m-gate open.
    // Inactivated: h-gate closed (ball plugs pore).

    // Let's simplify:
    // Closed: Walls together.
    // Open: Walls apart.
    // Inactivated: Walls apart, but Ball blocks bottom.

    const wallsOpen = state === 'open' || state === 'inactivated';
    const ballBlocked = state === 'inactivated';

    const color = isNa ? 'bg-blue-600' : 'bg-purple-600';
    const borderColor = isNa ? 'border-blue-300' : 'border-purple-300';
    const glow = isNa ? 'shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'shadow-[0_0_15px_rgba(147,51,234,0.5)]';

    return (
        <div className="relative w-20 h-32 flex flex-col items-center justify-center mx-4">
            {/* Label */}
            <span className={clsx("absolute -top-8 text-xs font-bold font-mono uppercase tracking-widest", isNa ? "text-blue-400" : "text-purple-400")}>
                {isNa ? "Na+ Gate" : "K+ Gate"}
            </span>

            {/* Pore Glow when open */}
            <motion.div
                className={clsx("absolute inset-0 rounded-full opacity-0", glow)}
                animate={{ opacity: state === 'open' ? 1 : 0 }}
            />

            <div className="relative w-full h-full flex justify-center items-stretch perspective-500">
                {/* Left Subunit */}
                <motion.div
                    animate={{ x: wallsOpen ? -12 : -2, rotateY: wallsOpen ? -10 : 0 }}
                    className={clsx("w-8 h-full rounded-l-xl border-t-2 border-l-2 border-b-2 bg-gradient-to-br from-slate-700 to-slate-800", borderColor)}
                >
                    <div className={clsx("w-full h-full opacity-50", color)}></div>
                </motion.div>

                {/* Right Subunit */}
                <motion.div
                    animate={{ x: wallsOpen ? 12 : 2, rotateY: wallsOpen ? 10 : 0 }}
                    className={clsx("w-8 h-full rounded-r-xl border-t-2 border-r-2 border-b-2 bg-gradient-to-bl from-slate-700 to-slate-800", borderColor)}
                >
                    <div className={clsx("w-full h-full opacity-50", color)}></div>
                </motion.div>
            </div>

            {/* Inactivation Gate (Na+ Only) */}
            {isNa && (
                <motion.div
                    className="absolute bottom-[-10px] left-1/2 z-20"
                    initial={{ y: 0 }}
                    animate={{
                        y: ballBlocked ? -35 : 10, // Move into pore if inactivated
                        scale: ballBlocked ? 1.1 : 1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    {/* The Ball */}
                    <div className="w-8 h-8 -ml-4 rounded-full bg-red-600 border-2 border-red-300 shadow-lg relative">
                        {/* Shine */}
                        <div className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full opacity-50" />
                    </div>
                    {/* The Chain */}
                    <div className="w-1 h-8 bg-red-400 -ml-0.5 mx-auto" />
                </motion.div>
            )}
        </div>
    );
};
