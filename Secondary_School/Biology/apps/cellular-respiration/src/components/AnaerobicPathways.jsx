import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnaerobicPathways({ isActive, organism, onComplete }) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <section className="bg-emerald-900/20 rounded-2xl p-6 border border-emerald-700/50 relative overflow-hidden min-h-[200px] shadow-lg mt-4">
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
         <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
         <h2 className="text-lg font-bold text-emerald-200">Anaerobic Fermentation</h2>
      </div>

      <div className="flex items-center justify-center mt-12 gap-12">
         {/* Input: Pyruvate */}
         <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center opacity-50"
         >
            <div className="flex gap-1">
               {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-emerald-600 border border-emerald-400" />
               ))}
            </div>
            <span className="text-xs text-emerald-400 mt-1">Pyruvate</span>
         </motion.div>

         {/* Reaction Arrow */}
         <div className="flex flex-col items-center">
             <motion.div 
               animate={{ scaleX: [1, 1.2, 1] }} 
               transition={{ duration: 1, repeat: Infinity }}
               className="h-1 w-24 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
             />
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }} 
               className="text-[10px] text-emerald-200 mt-1 bg-emerald-900/80 px-2 py-0.5 rounded"
             >
                NADH oxidized to NAD+
             </motion.div>
         </div>

         {/* Output based on Organism */}
         <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center"
         >
            {organism === 'HUMAN' ? (
                <>
                   {/* Lactate (3C) */}
                   <div className="flex gap-1">
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-yellow-200 border-2 border-yellow-500" />
                     ))}
                   </div>
                   <span className="text-sm font-bold text-yellow-200 mt-2">Lactic Acid</span>
                   <span className="text-[10px] text-gray-400">(Muscle Fatigue)</span>
                </>
            ) : (
                <>
                   {/* Ethanol (2C) + CO2 */}
                   <div className="flex gap-4 items-end">
                      <div className="flex flex-col items-center">
                         <div className="flex gap-1">
                           {[...Array(2)].map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full bg-orange-200 border-2 border-orange-500" />
                           ))}
                         </div>
                         <span className="text-sm font-bold text-orange-200 mt-2">Ethanol</span>
                      </div>
                      <div className="flex flex-col items-center animate-bounce">
                         <div className="w-5 h-5 rounded-full bg-gray-400 border border-gray-200 flex items-center justify-center text-[8px] text-black font-bold">C</div>
                         <span className="text-xs text-gray-400 mt-1">CO₂</span>
                      </div>
                   </div>
                </>
            )}
         </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-6 mx-auto max-w-md bg-emerald-950/50 p-3 rounded text-center border border-emerald-500/30"
      >
         <p className="text-sm text-emerald-200">
            <span className="font-bold">Crucial Step:</span> Regenerates <span className="text-blue-300 font-bold">NAD+</span> so Glycolysis can produce another +2 ATP.
         </p>
      </motion.div>
    </section>
  );
}
