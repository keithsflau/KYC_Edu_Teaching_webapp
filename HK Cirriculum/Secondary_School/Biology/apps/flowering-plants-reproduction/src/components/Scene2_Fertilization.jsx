import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ArrowRight } from 'lucide-react';

export default function Scene2_Fertilization({ onNext }) {
  const [stage, setStage] = useState(0); // 0: Ready, 1: Burst, 2: Traveling, 3: Fusion, 4: Done

  const startFertilization = () => {
    setStage(1);
    setTimeout(() => setStage(2), 1000); // Traveling
    setTimeout(() => setStage(3), 3000); // Fusion
    setTimeout(() => setStage(4), 5000); // Done
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 animate-fade-in">
        <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-pink-700">Scene 2: Double Fertilization</h2>
            <p className="text-pink-600">Zooming into the Embryo Sac. Watch the nucleus fusion events.</p>
        </div>

        <div className="relative w-[600px] h-[500px] bg-pink-50 rounded-3xl shadow-2xl border-4 border-pink-200 overflow-hidden flex items-center justify-center">
            
            {/* The Embryo Sac */}
            <div className="relative w-[400px] h-[400px] bg-white rounded-[100px] border-2 border-pink-300 shadow-inner p-8">
                
                {/* 1. Egg Apparatus (Top near Micropyle) */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                    {/* Synergid */}
                    <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-400 flex items-center justify-center text-xs text-slate-500">Syn</div>
                    
                    {/* EGG CELL */}
                    <motion.div 
                        className="w-16 h-16 rounded-full bg-pink-100 border-2 border-pink-400 flex items-center justify-center relative z-10"
                        animate={stage >= 3 ? { backgroundColor: "#fcd34d", scale: 1.1 } : {}}
                    >
                         <span className="text-xs font-bold text-pink-700">{stage >= 3 ? "Zygote (2n)" : "Egg (n)"}</span>
                    </motion.div>
                    
                    {/* Synergid */}
                     <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-400 flex items-center justify-center text-xs text-slate-500">Syn</div>
                </div>

                {/* 2. Polar Nuclei (Center) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-blue-50/50 p-4 rounded-full border border-dashed border-blue-200">
                    <motion.div 
                        className="w-24 h-24 rounded-full border-2 border-blue-300 flex items-center justify-center relative bg-white/80"
                        animate={stage >= 3 ? { backgroundColor: "#fb923c", scale: 1.15 } : {}}
                    >
                        {stage < 3 ? (
                            <div className="flex gap-1 justify-center">
                                <div className="w-6 h-6 rounded-full bg-blue-300/50 border border-blue-400"></div>
                                <div className="w-6 h-6 rounded-full bg-blue-300/50 border border-blue-400"></div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <span className="block font-bold text-orange-800 text-sm">Endosperm Nucleus</span>
                                <span className="block font-bold text-orange-600 text-xs">(3n)</span>
                            </div>
                        )}
                         {stage < 3 && <span className="absolute -bottom-6 text-xs text-blue-600 font-semibold whitespace-nowrap">Polar Nuclei (n+n)</span>}
                    </motion.div>
                </div>

                {/* 3. Antipodals (Bottom) */}
                 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">Anti</div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">Anti</div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">Anti</div>
                </div>
            </div>

            {/* Pollen Tube Tip (Top Overlay) */}
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-8 h-20 bg-yellow-400 rounded-b-full opacity-90 z-20 flex items-end justify-center pb-2">
                {stage === 0 && <span className="text-[10px] text-yellow-900 font-bold">Tube</span>}
            </div>

            {/* Male Gametes Animation */}
            {stage >= 1 && (
                <>
                    {/* Gamete 1 -> Egg */}
                    <motion.div
                        className="absolute w-4 h-4 bg-red-600 rounded-full z-30 shadow-lg border-white border"
                        initial={{ top: 40, left: '50%' }}
                        animate={stage >= 3 ? { top: 110, left: '50%', opacity: 0 } : { top: 110, left: '50%' }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    >
                         <span className="absolute -right-6 -top-2 text-xs font-bold text-red-600 bg-white px-1 rounded shadow">n</span>
                    </motion.div>

                    {/* Gamete 2 -> Polar Nuclei */}
                    <motion.div
                        className="absolute w-4 h-4 bg-red-600 rounded-full z-30 shadow-lg border-white border"
                        initial={{ top: 20, left: '50%' }}
                        animate={stage >= 3 ? { top: 250, left: '50%', opacity: 0 } : { top: 250, left: '50%' }}
                        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }} // Slight delay
                    >
                        <span className="absolute -right-6 -top-2 text-xs font-bold text-red-600 bg-white px-1 rounded shadow">n</span>
                    </motion.div>
                </>
            )}

            {/* Explanatory Labels appearing at stage 4 */}
            <AnimatePresence>
                {stage >= 4 && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                            className="absolute bg-white p-3 rounded-xl shadow-lg border-l-4 border-yellow-400 left-4 top-20 max-w-[150px]"
                        >
                            <p className="font-bold text-yellow-800 text-sm">Zygote (2n)</p>
                            <p className="text-xs text-slate-600">Develops into the <span className="font-bold">Embryo</span> (the baby plant).</p>
                        </motion.div>

                         <motion.div 
                            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                            className="absolute bg-white p-3 rounded-xl shadow-lg border-l-4 border-orange-400 right-4 top-1/2 max-w-[150px]"
                        >
                            <p className="font-bold text-orange-800 text-sm">Endosperm (3n)</p>
                            <p className="text-xs text-slate-600">Develops into the <span className="font-bold">Food Store</span>.</p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>

        <div className="mt-8 flex gap-4">
             <button
                onClick={startFertilization}
                disabled={stage !== 0}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-full font-bold shadow-lg hover:bg-pink-700 disabled:opacity-50 transition-transform hover:scale-105"
            >
                <Zap size={20} />
                Trigger Double Fertilization
            </button>
             {stage === 4 && (
                <button
                    onClick={onNext}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 animate-bounce"
                >
                    Next Step
                    <ArrowRight size={20} />
                </button>
            )}
        </div>
        
        <div className="mt-4 text-center max-w-lg text-slate-600">
             {stage === 4 ? "Double fertilization is unique to flowering plants. It ensures resources/food (endosperm) are only allocated if fertilization occurs." : "Click to observe the fusion of male gametes."}
        </div>
    </div>
  );
}
