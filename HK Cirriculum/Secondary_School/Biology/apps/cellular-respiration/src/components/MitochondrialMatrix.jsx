import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MitochondrialMatrix({ isActive, oxygen, onComplete, onFail }) {
  useEffect(() => {
    if (isActive) {
      if (oxygen) {
        const timer = setTimeout(() => {
          onComplete();
        }, 5000); // 5 seconds for full cycle animation
        return () => clearTimeout(timer);
      } else {
         // If active but no oxygen, this stage shouldn't technically run fully in a simulation, 
         // but usually Link reaction stops if ETC backs up. 
         // For simplicity here, if Oxygen is OFF, we fail immediately or show "Backlog"
         const timer = setTimeout(() => {
            onFail();
         }, 1500); 
         return () => clearTimeout(timer);
      }
    }
  }, [isActive, oxygen, onComplete, onFail]);

  return (
    <section className="bg-orange-900/40 rounded-2xl p-6 border border-orange-700/50 relative overflow-hidden min-h-[300px] shadow-lg">
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 w-full pr-8 justify-between">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <h2 className="text-lg font-bold text-orange-200">Mitochondrial Matrix (Link & Krebs)</h2>
         </div>
         {!oxygen && isActive && (
             <motion.span 
               initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
               className="text-red-400 text-sm font-bold bg-red-900/50 px-3 py-1 rounded-full border border-red-500/50"
             >
                ⚠️ DEACTIVATED (Requires O₂)
             </motion.span>
         )}
      </div>

      <div className="flex flex-col items-center justify-center mt-12 gap-8 h-full relative z-0">
        <AnimatePresence mode='wait'>
          {isActive && oxygen ? (
             <motion.div 
               key="active-aerobic"
               className="flex flex-wrap items-center justify-center gap-10 w-full"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             >
                {/* Link Reaction */}
                <div className="flex flex-col items-center gap-2 bg-black/20 p-4 rounded-xl">
                   <h3 className="text-xs text-orange-300/70 uppercase font-bold tracking-widest">Link Reaction</h3>
                   <div className="flex items-center gap-2">
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                      >
                         <div className="flex gap-0.5">
                            {[...Array(3)].map((_, i) => (
                               <div key={i} className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-300" />
                            ))}
                         </div>
                         <span className="text-[10px] text-emerald-300">Pyruvate</span>
                      </motion.div>
                      
                      <motion.div 
                         animate={{ x: [0, 5, 0] }}
                         transition={{ repeat: Infinity, duration: 1 }}
                         className="text-white text-xl"
                      >→</motion.div>

                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col items-center"
                      >
                         <div className="flex gap-0.5 relative">
                            {/* CO2 leaves */}
                            <motion.div 
                               className="absolute -top-6 -right-4 text-xs text-stone-400"
                               initial={{ opacity: 0, y: 0 }}
                               animate={{ opacity: 1, y: -20 }}
                               transition={{ delay: 1, duration: 1 }}
                            >
                               CO₂
                            </motion.div>
                            {[...Array(2)].map((_, i) => (
                               <div key={i} className="w-6 h-6 rounded-full bg-orange-400 border border-orange-200 shadow-[0_0_10px_rgba(251,146,60,0.6)]" />
                            ))}
                         </div>
                         <span className="text-[10px] text-orange-200">Acetyl-CoA</span>
                      </motion.div>
                   </div>
                </div>

                {/* Krebs Cycle Animation */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                   <svg className="absolute w-full h-full animate-[spin_8s_linear_infinite] opacity-30">
                      <circle cx="50%" cy="50%" r="40%" stroke="orange" strokeWidth="2" fill="none" strokeDasharray="10 10" />
                   </svg>
                   
                   <motion.div 
                      className="absolute inset-0 flex items-center justify-center p-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                   >
                     <div className="flex flex-col gap-1 items-center">
                        <span className="text-orange-400 font-bold text-shadow">KREBS CYCLE</span>
                        <div className="flex gap-2 text-xs text-orange-200/80">
                           <span>CO₂ released</span>
                           <span>NAD+ reduced</span>
                        </div>
                     </div>
                   </motion.div>

                   {/* Yield Popup */}
                   <motion.div 
                     className="absolute -bottom-8 flex gap-4 w-64 justify-center"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 3.5 }}
                   >
                      <div className="bg-orange-950/80 px-3 py-1 rounded border border-orange-600/50 flex flex-col items-center">
                         <span className="text-yellow-400 font-bold">+2 ATP</span>
                      </div>
                      <div className="bg-purple-950/80 px-3 py-1 rounded border border-purple-600/50 flex flex-col items-center">
                         <span className="text-purple-300 font-bold text-xs whitespace-nowrap">LOTS OF NADH / FADH₂</span>
                      </div>
                   </motion.div>
                </div>

             </motion.div>
          ) : isActive && !oxygen ? (
             <motion.div 
               key="active-anaerobic-blocked"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center justify-center h-full text-center p-6 bg-black/40 rounded-xl border border-red-900/50"
             >
                <div className="text-4xl mb-4">⛔</div>
                <h3 className="text-red-400 font-bold text-xl mb-2">Pathway Blocked</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                   Without Oxygen as the final acceptor in the ETC, reducing equivalents (NADH) cannot be recycled. The Krebs cycle halts to prevent accumulation.
                </p>
             </motion.div>
          ) : (
            <div className="text-orange-900/30 font-bold text-4xl select-none tracking-widest uppercase text-center mt-8">
               Mitochondrial<br/>Matrix
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
