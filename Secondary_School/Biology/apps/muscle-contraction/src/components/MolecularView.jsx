import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap, Lock, Unplug } from 'lucide-react';

const STEPS = {
  IDLE: 'idle',
  CALCIUM: 'calcium',
  BIND: 'bind',
  POWER_STROKE: 'power_stroke',
  DETACH: 'detach',
  RESET: 'reset',
};

const MolecularView = () => {
  const [step, setStep] = useState(STEPS.IDLE);
  
  // Handlers for next step
  const nextStep = () => {
    switch(step) {
      case STEPS.IDLE: setStep(STEPS.CALCIUM); break;
      case STEPS.CALCIUM: setStep(STEPS.BIND); break;
      case STEPS.BIND: setStep(STEPS.POWER_STROKE); break;
      case STEPS.POWER_STROKE: setStep(STEPS.DETACH); break;
      case STEPS.DETACH: setStep(STEPS.RESET); break;
      case STEPS.RESET: setStep(STEPS.IDLE); break; // Or Bind directly? Usually cycle loops.
      // Actually Reset goes back to ready state. If Calcium is still there, it can Bind again.
      // For simplicity, let's loop back to CALCIUM if we assume continuous contraction, 
      // or IDLE if we want to show single twitch.
      default: setStep(STEPS.IDLE);
    }
  };

  // Variants for animations
  
  // Myosin Head Rotation & Position
  const myosinVariants = {
    idle: { rotate: -45, x: 0, y: 0 },
    calcium: { rotate: -45, x: 0, y: 0 }, // Ready
    bind: { rotate: -45, x: 0, y: -40 }, // Moves up to touch actin
    power_stroke: { rotate: 45, x: -60, y: -40 }, // Pivots and pulls left
    detach: { rotate: 45, x: -60, y: 0 }, // Moves down
    reset: { rotate: -45, x: 0, y: 0 }, // Returns to start (simplify visual reset)
  };

  // Actin Movement (Simulated sliding)
  const actinVariants = {
    idle: { x: 0 },
    calcium: { x: 0 },
    bind: { x: 0 },
    power_stroke: { x: -60 }, // Pulled by myosin
    detach: { x: -60 }, // Stays there
    reset: { x: 0 }, // Reset for loop simulation visually
  };

  // Tropomyosin (The blocker) moves away when Calcium comes
  const tropomyosinVariants = {
    idle: { y: 15 }, // Blocking binding site
    calcium: { y: -20, opacity: 0.5 }, // Moved away
    bind: { y: -20, opacity: 0.5 },
    power_stroke: { y: -20, opacity: 0.5 },
    detach: { y: -20, opacity: 0.5 },
    reset: { y: -20, opacity: 0.5 },
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow overflow-hidden">
      
      {/* Simulation Stage */}
      <div className="flex-1 relative bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-200">
        
        {/* ACTIN STRAND (Top) */}
        <motion.div 
          className="absolute top-20 flex gap-1"
          variants={actinVariants}
          animate={step}
          transition={{ duration: 0.5 }}
        >
          {/* Actin Monomers */}
          {[...Array(10)].map((_, i) => (
             <div key={i} className="w-12 h-12 rounded-full bg-blue-400 border-2 border-blue-500 relative flex items-center justify-center shadow-lg">
                {/* Binding Site (Hidden by default) */}
                <div className="w-4 h-4 rounded-full bg-yellow-300 shadow-inner" />
             </div>
          ))}
          
          {/* Tropomyosin Filament */}
          <motion.div 
            className="absolute left-0 w-full h-2 bg-orange-400 rounded-full top-5 shadow-sm"
            variants={tropomyosinVariants}
            animate={step}
          />
          
          {/* Troponin Complex */}
          <div className="absolute left-10 top-2 w-6 h-6 bg-purple-500 rounded-full shadow-md z-10 flex items-center justify-center text-[8px] text-white">
             Tn
             {/* Calcium binding visualization */}
             {(step !== STEPS.IDLE) && (
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="absolute -top-2 -right-2 w-4 h-4 bg-lime-400 rounded-full border border-white shadow-sm" 
               />
             )}
          </div>
        </motion.div>

        {/* MYOSIN HEAD (Bottom) */}
        <div className="absolute bottom-20">
           {/* Neck/Tail */}
           <div className="w-4 h-32 bg-red-600 mx-auto rounded-full absolute -bottom-20 left-12" />
           
           <motion.div
             className="w-24 h-16 bg-red-500 rounded-full border-4 border-red-700 relative origin-bottom-right shadow-xl"
             variants={myosinVariants}
             animate={step}
             transition={{ type: "spring", stiffness: 120, damping: 15 }}
           >
              {/* Face/Details */}
              <div className="absolute right-4 top-4 w-3 h-3 bg-red-800 rounded-full opacity-50" />
              
              {/* ATP Binding Site */}
              <div className="absolute left-4 bottom-4 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                 {step === STEPS.DETACH && <Zap className="text-yellow-400 w-5 h-5 animate-pulse" />}
                 {step === STEPS.IDLE && <span className="text-[8px] text-white font-bold">ADP+P</span>}
                 {step === STEPS.BIND && <span className="text-[8px] text-white font-bold">ADP+P</span>}
                 {step === STEPS.POWER_STROKE && <span className="text-[8px] text-white font-bold opacity-0">Released</span>}
              </div>
           </motion.div>
        </div>

        {/* Floating Labels / Effects */}
        <AnimatePresence>
          {step === STEPS.CALCIUM && (
            <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute top-4 text-lime-600 font-bold bg-white/80 px-4 py-2 rounded-full shadow-lg border border-lime-200">
               Calcium (Ca²⁺) Released!
            </motion.div>
          )}
           {step === STEPS.POWER_STROKE && (
            <motion.div initial={{scale:0}} animate={{scale:1.5, opacity:0}} transition={{duration:0.5}} className="absolute text-4xl font-black text-orange-500">
               POWER STROKE!
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>

      {/* Controls & Narration */}
      <div className="p-6 bg-white z-10">
        <div className="flex items-center justify-between mb-4">
           <div>
             <h2 className="text-xl font-bold flex items-center gap-2">
                Step: {step.replace('_', ' ').toUpperCase()}
             </h2>
             <p className="text-sm text-gray-500">
               {step === STEPS.IDLE && "Muscle is relaxed. Tropomyosin blocks binding sites."}
               {step === STEPS.CALCIUM && "Calcium binds to Troponin. Tropomyosin moves away."}
               {step === STEPS.BIND && "Binding sites exposed! Myosin head attaches to Actin."}
               {step === STEPS.POWER_STROKE && "ADP released. Head pivots, sliding the actin filament."}
               {step === STEPS.DETACH && "ATP binds to Myosin. Cross-bridge breaks."}
               {step === STEPS.RESET && "ATP Hydrolysis (ATP -> ADP + P). Head recocks."}
             </p>
           </div>
           
           <button 
             onClick={nextStep}
             className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-transform active:scale-95"
           >
             {step === STEPS.RESET ? <RotateCcw size={20}/> : <Play size={20}/>}
             {step === STEPS.RESET ? "Restart Cycle" : "Next Step"}
           </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
           {Object.values(STEPS).map((s, i) => (
             <div key={s} className={`flex-1 transition-colors ${Object.values(STEPS).indexOf(step) >= i ? 'bg-indigo-500' : 'bg-gray-200'}`} />
           ))}
        </div>

        {/* Educational Note */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex gap-2 items-start">
           <Lock size={16} className="mt-0.5 shrink-0" />
           <div>
              <strong>Clinical Application: Rigor Mortis</strong>
              <p>Without new ATP, the Myosin head cannot detach from Actin (Step 4). This causes the muscles to remain stiffly contracted after death.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MolecularView;
