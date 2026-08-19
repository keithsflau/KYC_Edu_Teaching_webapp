import React from 'react';
import { motion } from 'framer-motion';

export const Pump = () => {
    // Continuous rotation to signify activity
    return (
        <div className="relative w-24 h-32 flex flex-col items-center justify-center mx-4 opacity-80">
            <span className="absolute -top-8 text-xs font-bold font-mono text-emerald-400 tracking-widest uppercase">
                Na+/K+ Pump
            </span>

            <div className="relative w-full h-full">
                {/* Protein Body */}
                <motion.div
                    className="w-16 h-24 mx-auto bg-emerald-700 rounded-2xl border-2 border-emerald-500 shadow-lg relative overflow-hidden"
                    animate={{
                        scaleY: [1, 0.9, 1],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }}
                >
                    {/* Internal mechanism lines */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] bg-[length:200%_200%] animate-pulse" />

                    {/* Direction indicators */}
                    <div className="absolute top-2 w-full flex justify-center space-x-1">
                        <ArrowUp color="text-blue-300" />
                        <ArrowUp color="text-blue-300" />
                        <ArrowUp color="text-blue-300" />
                    </div>
                    <div className="absolute bottom-2 w-full flex justify-center space-x-1">
                        <ArrowDown color="text-purple-300" />
                        <ArrowDown color="text-purple-300" />
                    </div>
                </motion.div>

                {/* ATP Effect */}
                <motion.div
                    className="absolute -bottom-4 -right-4 text-xs font-bold text-yellow-400"
                    animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    ATP
                </motion.div>
            </div>
        </div>
    );
};

const ArrowUp = ({ color }) => (
    <motion.div
        className={`text-xs font-bold ${color}`}
        animate={{ y: [10, -10], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    >
        ↑
    </motion.div>
);

const ArrowDown = ({ color }) => (
    <motion.div
        className={`text-xs font-bold ${color}`}
        animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.75, ease: "linear" }}
    >
        ↓
    </motion.div>
);
