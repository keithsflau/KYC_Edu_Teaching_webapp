import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InnerMembrane({ isActive, oxygen, onComplete, onFail }) {
  const [electronsFlowing, setElectronsFlowing] = useState(false);

  useEffect(() => {
    if (isActive) {
      setElectronsFlowing(true);
      if (oxygen) {
        const timer = setTimeout(() => {
          onComplete(); // Triggers the massive ATP payout
        }, 6000); 
        return () => clearTimeout(timer);
      } else {
        // Run for a bit then fail
        const timer = setTimeout(() => {
          setElectronsFlowing(false); // Stop flow
          onFail();
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setElectronsFlowing(false);
    }
  }, [isActive, oxygen, onComplete, onFail]);

  // Electron variants
  const electronVariants = {
    start: { offsetDistance: "0%" },
    end: { offsetDistance: "100%" },
  };

  return (
    <section className="bg-indigo-900/40 rounded-2xl p-6 border border-indigo-700/50 relative overflow-hidden min-h-[300px] shadow-lg">
       <div className="absolute top-4 left-4 flex items-center gap-2 z-10 w-full justify-between pr-8">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <h2 className="text-lg font-bold text-indigo-200">Inner Membrane (ETC & Oxidative Phosphorylation)</h2>
         </div>
         {isActive && !oxygen && (
             <div className="animate-bounce bg-red-600 px-2 py-1 rounded text-xs font-bold text-white">
                MISSING OXYGEN ACCEPTOR
             </div>
         )}
      </div>

      <div className="flex flex-col items-center justify-center mt-12 w-full h-full">
         <AnimatePresence mode="wait">
            {isActive ? (
               <div className="relative w-full max-w-2xl h-48 bg-indigo-950/50 rounded-xl border-b-8 border-indigo-400/30 overflow-hidden">
                  {/* Membrane Visualization */}
                  <div className="absolute bottom-0 w-full h-2 bg-indigo-500/50 z-20"></div>

                  {/* Complexes */}
                  <div className="absolute bottom-2 flex justify-between w-[80%] px-10 items-end h-32 z-10">
                     {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center justify-end h-full">
                           <div className={`w-12 rounded-t-lg bg-indigo-600 border-t border-x border-indigo-400 ${i % 2 === 0 ? 'h-24' : 'h-28'}`}></div>
                           <span className="text-[10px] text-indigo-300 mb-1">C{i}</span>
                        </div>
                     ))}
                  </div>

                  {/* ATP Synthase */}
                   <div className="absolute right-8 bottom-2 flex flex-col items-center z-10">
                      <motion.div 
                        animate={oxygen ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-4 border-dashed border-yellow-400 flex items-center justify-center"
                      >
                         <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
                      </motion.div>
                      <span className="text-xs text-yellow-200 font-bold mt-2">ATP Synthase</span>
                   </div>

                  {/* Electrons Path */}
                  {/* We simulate electrons simply as moving dots across the complexes */}
                  {electronsFlowing && (
                     <div className="absolute inset-0 pointer-events-none z-30">
                        {/* Generates a stream of electrons */}
                        {[...Array(6)].map((_, i) => (
                           <motion.div
                              key={i}
                              className="absolute w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_10px_yellow]"
                              initial={{ x: "10%", y: 100, opacity: 0 }}
                              animate={oxygen 
                                 ? { 
                                     x: ["10%", "30%", "50%", "70%", "90%"], 
                                     y: [100, 80, 100, 80, 110],
                                     opacity: [1, 1, 1, 1, 0] 
                                   } 
                                 : {
                                    x: ["10%", "30%", "50%", "70%"],
                                    y: [100, 80, 100, 80],
                                    opacity: 1 // Stuck
                                 }
                              }
                              transition={{ 
                                 duration: 4, 
                                 repeat: oxygen ? Infinity : 0, 
                                 delay: i * 0.8,
                                 ease: "easeInOut"
                              }}
                           />
                        ))}
                     </div>
                  )}

                  {/* Oxygen Waiting at the end */}
                  <div className="absolute right-[20%] bottom-8 z-30 flex flex-col items-center">
                     {oxygen ? (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="bg-cyan-500/80 text-white text-xs font-bold px-2 py-1 rounded-full shadow-[0_0_15px_cyan]"
                        >
                           O₂
                        </motion.div>
                     ) : (
                        <div className="opacity-30 text-xs font-bold text-red-500">NO O₂</div>
                     )}
                  </div>
                  
                  {/* Water Output */}
                  {oxygen && electronsFlowing && (
                     <motion.div 
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 10, x: 10 }}
                        transition={{ delay: 3, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute right-[18%] bottom-2 text-blue-300 font-bold text-sm"
                     >
                        + H₂O
                     </motion.div>
                  )}

               </div>
            ) : (
               <div className="text-indigo-900/30 font-bold text-4xl select-none tracking-widest uppercase text-center">
                  Electron<br/>Transport<br/>Chain
               </div>
            )}
         </AnimatePresence>

         {/* Stats */}
         <AnimatePresence>
            {isActive && oxygen && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 1 }}
                 className="mt-6 flex gap-4"
               >
                  <div className="bg-yellow-900/40 border border-yellow-500/30 p-3 rounded-lg flex items-center gap-3">
                     <span className="text-2xl">⚡</span>
                     <div className="leading-tight">
                        <div className="text-yellow-400 font-bold text-xl">+34 ATP</div>
                        <div className="text-[10px] text-yellow-200/60 uppercase">Massive Yield</div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </section>
  );
}
