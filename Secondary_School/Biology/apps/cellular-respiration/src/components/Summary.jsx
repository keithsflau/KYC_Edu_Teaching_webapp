import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Trophy, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export default function Summary({ onRestart, isAerobic, totalAtp }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-8 shadow-2xl relative overflow-hidden">
        {/* Background Glow */}
        <div className={clsx(
           "absolute top-0 left-0 w-full h-2 bg-gradient-to-r",
           isAerobic ? "from-blue-500 via-purple-500 to-blue-500" : "from-red-500 via-orange-500 to-red-500"
        )} />

        <h2 className="text-4xl font-bold text-center mb-2 text-white">
           Respiration Complete
        </h2>
        <p className="text-center text-slate-400 mb-8">
           You produced <span className="text-yellow-400 font-bold text-2xl mx-1">{totalAtp} ATP</span> 
           via <span className={isAerobic ? "text-blue-400" : "text-red-400"}>{isAerobic ? "Aerobic Respiration" : "Anaerobic Fermentation"}</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           {/* Aerobic Card */}
           <div className={clsx(
              "p-6 rounded-2xl border transition-all duration-500 relative",
              isAerobic 
                 ? "bg-blue-900/30 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-105 z-10" 
                 : "bg-slate-800/50 border-slate-700 opacity-60 grayscale-[0.5] scale-95"
           )}>
              {isAerobic && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Trophy size={14} /> YOUR RESULT
                 </div>
              )}
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                 <Check className="w-6 h-6"/> Aerobic
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                 <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Glycolysis</span> <span className="text-yellow-400 font-mono">2 ATP</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Krebs Cycle</span> <span className="text-yellow-400 font-mono">2 ATP</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Oxidative Phos.</span> <span className="text-yellow-400 font-mono">34 ATP</span>
                 </li>
                 <li className="pt-2 flex justify-between font-bold text-xl">
                    <span>Total</span> <span className="text-yellow-400">38 ATP</span>
                 </li>
              </ul>
              <div className="mt-4 bg-blue-950/50 p-3 rounded-lg text-xs text-blue-200/80 leading-relaxed border border-blue-500/20">
                 <strong>Why so much?</strong> Oxygen accepts electrons at the end of the chain, creating a steep gradient for ATP Synthase.
              </div>
           </div>

           {/* Anaerobic Card */}
           <div className={clsx(
              "p-6 rounded-2xl border transition-all duration-500 relative",
              !isAerobic 
                 ? "bg-red-900/30 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] scale-105 z-10" 
                 : "bg-slate-800/50 border-slate-700 opacity-60 grayscale-[0.5] scale-95"
           )}>
              {!isAerobic && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <AlertTriangle size={14} /> YOUR RESULT
                 </div>
              )}
              <h3 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-2">
                 <X className="w-6 h-6"/> Anaerobic
              </h3>
               <ul className="space-y-3 text-sm text-slate-300">
                 <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Glycolysis</span> <span className="text-yellow-400 font-mono">2 ATP</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2 opacity-50">
                    <span>Krebs Cycle</span> <span className="text-gray-500 font-mono">0 ATP</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2 opacity-50">
                    <span>Oxidative Phos.</span> <span className="text-gray-500 font-mono">0 ATP</span>
                 </li>
                 <li className="pt-2 flex justify-between font-bold text-xl">
                    <span>Total</span> <span className="text-yellow-400">2 ATP</span>
                 </li>
              </ul>
              <div className="mt-4 bg-red-950/50 p-3 rounded-lg text-xs text-red-200/80 leading-relaxed border border-red-500/20">
                 <strong>Why so little?</strong> Without Oxygen, the ETC backs up. The cell must switch to fermentation just to recycle NAD+ and keep Glycolysis running.
              </div>
           </div>
        </div>

        <div className="flex justify-center">
           <button 
             onClick={onRestart}
             className="bg-white hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2"
           >
              <Trophy size={20} className="text-yellow-600" /> Run Another Cycle
           </button>
        </div>
      </div>
    </motion.div>
  );
}
