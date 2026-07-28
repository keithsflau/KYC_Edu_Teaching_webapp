import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cytoplasm({ isActive, onComplete }) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000); // 3 seconds animation to match splitting logic
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden min-h-[250px] shadow-lg">
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
         <div className="w-3 h-3 rounded-full bg-blue-400"></div>
         <h2 className="text-lg font-bold text-slate-300">Cytoplasm (Glycolysis)</h2>
      </div>

      <div className="flex flex-col items-center justify-center mt-8 gap-8 relative z-0">
        {/* Background Grid Pattern or Cytosol texture could go here */}
        
        <AnimatePresence mode='wait'>
          {isActive ? (
             <motion.div 
               key="active"
               className="flex flex-col items-center gap-6 w-full"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             >
                {/* Glucose Splitting Animation */}
                <div className="relative h-24 flex items-center justify-center w-full">
                   {/* Glucose Molecule (6C) */}
                   <motion.div 
                     className="absolute flex gap-1 items-center justify-center"
                     initial={{ opacity: 1, scale: 1 }}
                     animate={{ opacity: 0, scale: 1.5 }}
                     transition={{ duration: 0.5, delay: 1 }}
                   >
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      ))}
                      <div className="absolute -top-8 text-blue-300 text-xs font-mono">Glucose (6C)</div>
                   </motion.div>

                   {/* Splits into 2 Pyruvates (3C) */}
                   <motion.div
                     className="absolute w-full flex justify-center gap-32"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5, delay: 1.2 }}
                   >
                      {[1, 2].map((p) => (
                        <motion.div 
                          key={p} 
                          className="flex gap-1 flex-col items-center"
                          initial={{ y: 0 }}
                          animate={{ y: 20 }}
                          transition={{ duration: 1, type: "spring" }}
                        >
                           <div className="flex gap-1">
                             {[...Array(3)].map((_, i) => (
                               <div key={i} className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             ))}
                           </div>
                           <span className="text-emerald-300 text-xs font-mono mt-1">Pyruvate (3C)</span>
                        </motion.div>
                      ))}
                   </motion.div>
                </div>
                
                {/* Yield Indicators */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="flex gap-16 text-center bg-slate-900/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700"
                >
                   <div className="flex flex-col items-center">
                      <span className="text-yellow-400 font-bold mb-1 text-xl">+2 ATP</span>
                      <span className="text-xs text-slate-400">Net Yield</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className="text-purple-400 font-bold mb-1 text-xl">2 NADH</span>
                      <span className="text-xs text-slate-400">e- Carrier Loaded</span>
                   </div>
                </motion.div>
             </motion.div>
          ) : (
             <motion.div 
               key="idle"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="text-slate-500 italic flex flex-col items-center gap-4"
             >
                <div className="flex gap-1 opacity-50 grayscale">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-300" />
                    ))}
                </div>
                <span>Ready for Glucose...</span>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
