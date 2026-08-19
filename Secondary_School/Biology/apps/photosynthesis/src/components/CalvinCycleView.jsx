import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ArrowDown, ArrowRight, Zap, CircleDot, Leaf, Check } from 'lucide-react';
import clsx from 'clsx';

export function CalvinCycleView({ atp, nadph, onConsume }) {
  const [stage, setStage] = useState('RUBP_READY'); // 'RUBP_READY', 'GP_PHASE', 'TP_PHASE'
  const [cycleCount, setCycleCount] = useState(0);
  const [glucoseCount, setGlucoseCount] = useState(0);
  const [message, setMessage] = useState("Start by fixing Carbon Dioxide.");

  // Costs (per turn - per CO2 fixed)
  // Reduction: 2 GP → 2 TP requires 2 ATP + 2 NADPH
  // Regeneration: 5 TP → 3 RuBP requires 3 ATP (but simplified to 1 ATP per cycle for teaching)
  // Total per CO2: 3 ATP + 2 NADPH (standard: 3 ATP for regeneration, but we use 1 for simplicity)
  const REDUCTION_COST_ATP = 2;
  const REDUCTION_COST_NADPH = 2;
  const REGEN_COST_ATP = 1; // Simplified: actual regeneration needs 3 ATP per 5 TP, but we use 1 per cycle

  const handleFixCarbon = () => {
    setMessage("Carbon Fixed! Unstable intermediate splits into 2x GP.");
    setStage('GP_PHASE');
  };

  const handleReduce = () => {
    if (atp >= REDUCTION_COST_ATP && nadph >= REDUCTION_COST_NADPH) {
      onConsume(REDUCTION_COST_ATP, REDUCTION_COST_NADPH); // Consume for reduction
      setMessage("GP reduced to TP using Energy! Stored energy in bonds.");
      setStage('TP_PHASE');
    } else {
        setMessage("Not enough ATP/NADPH for reduction! Check the Light Reaction.");
    }
  };

  const handleRegenerate = () => {
     if (atp >= REGEN_COST_ATP) {
       onConsume(REGEN_COST_ATP, 0); // Consume for regeneration
       setCycleCount(c => {
         const newCount = c + 1;
         if (newCount % 6 === 0) {
            setGlucoseCount(g => g + 1);
            setMessage("Cycle Complete. 6th Turn: GLUCOSE PRODUCED!");
         } else {
            setMessage(`Cycle Complete. Turn ${newCount % 6}/6 towards Glucose.`);
         }
         return newCount;
       });
       setStage('RUBP_READY');
     } else {
        setMessage("Not enough ATP to regenerate RuBP!");
     }
  };

  return (
    <div className="w-full h-[600px] bg-amber-50 rounded-xl border-4 border-amber-200 shadow-xl p-6 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-yellow-400"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 z-10">
            <h2 className="text-2xl font-bold text-amber-800 flex items-center gap-2">
                <RotateCw className="w-8 h-8" />
                The Calvin Cycle (Stroma)
            </h2>
            <div className="flex gap-4">
                <div className="bg-white px-4 py-2 rounded-lg shadow border border-amber-100 flex flex-col items-center">
                    <span className="text-xs text-amber-500 font-bold uppercase">Cycle Progress</span>
                    <span className="text-xl font-mono text-amber-900 font-bold">{cycleCount % 6}/6</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow border border-green-100 flex flex-col items-center">
                    <span className="text-xs text-green-500 font-bold uppercase">Glucose Made</span>
                    <span className="text-xl font-mono text-green-700 font-bold flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        {glucoseCount}
                    </span>
                </div>
            </div>
        </div>

        {/* Status Message */}
        <div className="bg-white/80 backdrop-blur p-3 rounded-lg border border-amber-200 mb-8 text-center min-h-[50px] flex items-center justify-center font-medium text-amber-900 shadow-sm z-10">
            {message}
        </div>

        {/* Diagram Area */}
        <div className="flex-1 relative flex items-center justify-center">
            {/* Background Cycle Circle */}
            <div className="absolute w-[400px] h-[400px] border-[20px] border-amber-100 rounded-full z-0"></div>

            {/* Stage 1: Fixation (Top) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex flex-col items-center gap-2 z-20">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-400 font-bold text-xs text-center shadow-sm">
                        CO2<br/>(1C)
                    </div>
                    <ArrowDown className="text-slate-400 animate-bounce" />
                </div>
                <button
                    onClick={handleFixCarbon}
                    disabled={stage !== 'RUBP_READY'}
                    className={clsx(
                        "w-40 py-2 rounded-lg font-bold shadow-lg transition-all border-2",
                        stage === 'RUBP_READY' 
                            ? "bg-green-500 text-white border-green-600 hover:scale-105 active:scale-95 animate-pulse" 
                            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    )}
                >
                    1. Fix Carbon
                </button>
            </div>

            {/* Stage 2: Reduction (Right/Bottom) */}
            <div className="absolute top-1/2 right-10 translate-y-12 flex flex-col items-center gap-2 z-20 max-w-[180px]">
                <div className="text-center mb-2">
                    <div className="text-xs font-bold text-amber-800 mb-1">Needs:</div>
                    <div className="flex gap-1 justify-center">
                         <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold", atp >= 2 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>2 ATP</span>
                         <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold", nadph >= 2 ? "bg-cyan-100 text-cyan-700" : "bg-red-100 text-red-700")}>2 NADPH</span>
                    </div>
                </div>
                <button
                    onClick={handleReduce}
                    disabled={stage !== 'GP_PHASE'}
                    className={clsx(
                        "w-40 py-2 rounded-lg font-bold shadow-lg transition-all border-2",
                        stage === 'GP_PHASE' 
                            ? "bg-blue-500 text-white border-blue-600 hover:scale-105 active:scale-95 animate-pulse" 
                            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    )}
                >
                    2. Reduce GP → TP
                </button>
                {stage === 'GP_PHASE' && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-xs text-center bg-white p-1 rounded shadow mt-2">
                        Requires Energy from Light Reaction!
                    </motion.div>
                )}
            </div>

            {/* Stage 3: Regeneration (Left/Bottom) */}
            <div className="absolute top-1/2 left-10 translate-y-12 flex flex-col items-center gap-2 z-20 max-w-[180px]">
                <div className="text-center mb-2">
                     <div className="text-xs font-bold text-amber-800 mb-1">Needs:</div>
                     <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold", atp >= 1 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>1 ATP</span>
                </div>
                <button
                    onClick={handleRegenerate}
                    disabled={stage !== 'TP_PHASE'}
                    className={clsx(
                        "w-40 py-2 rounded-lg font-bold shadow-lg transition-all border-2",
                        stage === 'TP_PHASE' 
                            ? "bg-purple-500 text-white border-purple-600 hover:scale-105 active:scale-95 animate-pulse" 
                            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    )}
                >
                    3. Regenerate RuBP
                </button>
            </div>

            {/* Molecules Visuals */}
            <AnimatePresence mode="wait">
                {stage === 'RUBP_READY' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="absolute top-1/3 left-1/4 -translate-y-8 bg-purple-100 border-2 border-purple-300 p-2 rounded-lg flex flex-col items-center"
                    >
                        <div className="flex gap-1 mb-1">
                            {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-purple-500 rounded-full"></div>)}
                        </div>
                        <span className="text-xs font-bold text-purple-800">RuBP (5C)</span>
                    </motion.div>
                )}

                {stage === 'GP_PHASE' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: -50 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-1/2 right-1/4 translate-x-4 bg-blue-100 border-2 border-blue-300 p-2 rounded-lg flex flex-col items-center"
                    >
                         <div className="flex gap-4">
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-4 h-4 bg-blue-500 rounded-full"></div>)}
                            </div>
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-4 h-4 bg-blue-500 rounded-full"></div>)}
                            </div>
                         </div>
                        <span className="text-xs font-bold text-blue-800">2x GP (3C)</span>
                    </motion.div>
                )}

                {stage === 'TP_PHASE' && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-green-100 border-2 border-green-300 p-2 rounded-lg flex flex-col items-center"
                     >
                         <div className="flex gap-4">
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>)}
                            </div>
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>)}
                            </div>
                         </div>
                        <span className="text-xs font-bold text-green-800">2x TP (3C)</span>
                        <div className="absolute -right-20 top-2 text-[10px] text-green-700 w-16 text-center">Sugar / Starch</div>
                        <ArrowRight className="absolute -right-8 top-4 text-green-500" />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    </div>
  );
}
