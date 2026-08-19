import React from 'react';
import { motion } from 'framer-motion';

const SarcomereView = ({ contraction }) => {
  // Config
  const myosinWidth = 400; // A-Band width (Constant)
  const actinWidth = 250; 
  
  // Logic
  // At 0 contraction (Relaxed): Z-lines are far. Gap between actins is large.
  // At 100 contraction: Z-lines close. Gap is 0 or negative (overlap).
  
  const maxGap = 200; // Gap between Actins at relaxed state
  const minGap = 0;   // Overlap at fully contracted
  
  const currentGap = maxGap - (contraction / 100) * (maxGap - minGap);
  
  // Calculated Positions (Center based)
  // Myosin is always at center (0)
  // Actin R Start = center + currentGap/2
  // Actin L End = center - currentGap/2
  
  // Z-Line Distance from Myosin Center
  // Z-Line Pos = Actin Tip Pos + Actin Width
  const zDist = (currentGap / 2) + actinWidth;

  return (
    <div className="flex flex-col items-center w-full h-full p-6 bg-slate-900 text-white rounded-xl shadow-inner relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded border border-slate-700">
        <h3 className="font-bold text-amber-400">Sarcomere View</h3>
        <p className="text-xs text-slate-300">The functional unit of muscle</p>
      </div>

      {/* Main Visualization Area */}
      <div className="relative w-full max-w-3xl h-64 flex items-center justify-center mt-8 border-b border-t border-slate-800/50">
        
        {/* BACKGROUND ZONES LABELS */}
        <div className="absolute top-0 w-full h-8 flex justify-center text-xs text-slate-500 font-mono">
          <div className="border-l border-r border-slate-700/50 h-full flex items-center justify-center" style={{ width: myosinWidth }}>
            A-BAND (Reamins Constant)
          </div>
        </div>

        {/* MYOSIN (Thick Filament) - Center */}
        {/* We use multiple lines to simulate the filament bundle */}
        <div className="absolute flex flex-col gap-1 items-center justify-center z-10" style={{ width: myosinWidth }}>
           {[...Array(5)].map((_, i) => (
             <div key={i} className="w-full h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)] opacity-90 relative">
                {/* Myosin Heads (Little bumps) */}
                <div className="absolute top-0 left-4 w-2 h-3 bg-red-400 rounded-full" />
                <div className="absolute top-0 right-4 w-2 h-3 bg-red-400 rounded-full" />
                <div className="absolute bottom-0 left-12 w-2 h-3 bg-red-400 rounded-full" />
                <div className="absolute bottom-0 right-12 w-2 h-3 bg-red-400 rounded-full" />
             </div>
           ))}
           <div className="absolute -bottom-8 text-red-400 font-bold text-xs uppercase tracking-widest">Myosin (Thick)</div>
        </div>

        {/* ACTIN (Thin Filament) - Left Group */}
        <motion.div 
          className="absolute flex flex-col gap-3 z-0"
          animate={{ x: -zDist + (actinWidth/2) }} // Move in and out
          style={{ left: '50%' }} // Relative to center
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
           {/* Z-LINE LEFT */}
           <div className="absolute right-full top-[-50px] bottom-[-50px] w-4 bg-blue-400 flex flex-col gap-1 justify-center items-center shadow-[0_0_15px_rgba(59,130,246,0.8)]">
              {[...Array(15)].map((_, i) => <div key={i} className="w-full h-1 bg-blue-300 -rotate-45" />)}
              <div className="absolute -top-6 text-blue-300 font-bold">Z-Line</div>
           </div>
           
           {/* Actin Strands */}
           {[...Array(4)].map((_, i) => (
             <div key={i} className="relative">
                <div className="h-1 bg-blue-400 rounded-full" style={{ width: actinWidth }} />
                <div className="absolute right-0 w-2 h-2 bg-yellow-400 rounded-full -top-0.5 opacity-50" /> {/* Binding Site */}
             </div>
           ))}
           <div className="absolute left-0 -bottom-16 text-blue-300 text-xs text-center w-full">Actin (Thin)</div>
        </motion.div>

        {/* ACTIN (Thin Filament) - Right Group */}
        <motion.div 
          className="absolute flex flex-col gap-3 z-0"
          animate={{ x: zDist - (actinWidth/2) }}
          style={{ left: '50%' }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
           {/* Z-LINE RIGHT */}
           <div className="absolute left-0 top-[-50px] bottom-[-50px] w-4 bg-blue-400 flex flex-col gap-1 justify-center items-center shadow-[0_0_15px_rgba(59,130,246,0.8)] transform -translate-x-full">
              {[...Array(15)].map((_, i) => <div key={i} className="w-full h-1 bg-blue-300 rotate-45" />)}
              <div className="absolute -top-6 text-blue-300 font-bold">Z-Line</div>
           </div>

           {/* Actin Strands */}
           {[...Array(4)].map((_, i) => (
             <div key={i} className="relative flex justify-end">
                <div className="h-1 bg-blue-400 rounded-full" style={{ width: actinWidth }} />
             </div>
           ))}
        </motion.div>

        {/* H-ZONE MARKER */}
        <div className="absolute bottom-4 h-4 border-b-2 border-dashed border-white/30 flex items-center justify-center text-[10px] text-white/50"
             style={{ width: currentGap > 0 ? currentGap : 0 }}>
             {currentGap > 20 && "H-ZONE"}
        </div>

      </div>

      {/* Dynamic Explanation Panel */}
      <div className="mt-8 grid grid-cols-4 gap-4 text-center w-full max-w-4xl text-sm">
        <div className="bg-slate-800 p-3 rounded border border-slate-700">
          <div className="text-gray-400 text-xs">A-Band</div>
          <div className="font-bold text-white">Constant</div>
          <p className="text-[10px] text-slate-500 mt-1">Width of Myosin never changes.</p>
        </div>
        <div className={`p-3 rounded border border-slate-700 transition-colors ${contraction > 0 ? 'bg-indigo-900/50' : 'bg-slate-800'}`}>
          <div className="text-gray-400 text-xs">H-Zone</div>
          <div className="font-bold text-white">{contraction > 80 ? "Disappeared" : "Shrinking"}</div>
          <p className="text-[10px] text-slate-500 mt-1">Gap between Actin filaments.</p>
        </div>
        <div className={`p-3 rounded border border-slate-700 transition-colors ${contraction > 0 ? 'bg-indigo-900/50' : 'bg-slate-800'}`}>
          <div className="text-gray-400 text-xs">I-Band</div>
          <div className="font-bold text-white">Shortens</div>
          <p className="text-[10px] text-slate-500 mt-1">Distance between Myosin & Z-line.</p>
        </div>
        <div className={`p-3 rounded border border-slate-700 transition-colors ${contraction > 0 ? 'bg-indigo-900/50' : 'bg-slate-800'}`}>
          <div className="text-gray-400 text-xs">Z-Lines</div>
          <div className="font-bold text-white">Converging</div>
          <p className="text-[10px] text-slate-500 mt-1">Pulled inward by Actin.</p>
        </div>
      </div>
    </div>
  );
};

export default SarcomereView;
