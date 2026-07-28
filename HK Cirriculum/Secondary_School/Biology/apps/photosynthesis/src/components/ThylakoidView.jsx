import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Droplets, Zap, ArrowRight, Wind } from 'lucide-react';
import clsx from 'clsx';

export function ThylakoidView({ 
  onSynthesizeATP, 
  onReduceNADP, 
  canSynthesizeATP, 
  canReduceNADP,
  adpCount,
  nadpCount
}) {
  const [protons, setProtons] = useState(0); // H+ in Lumen
  const [electrons, setElectrons] = useState([]); // e- positions
  const [photons, setPhotons] = useState([]);
  const [isSynthSpinning, setIsSynthSpinning] = useState(false);

  // Constants
  const MAX_PROTONS = 10;

  const handleSunlight = () => {
    // 1. Create Photon
    const newPhotonId = Date.now();
    setPhotons(p => [...p, { id: newPhotonId, target: 'PSII' }]);

    // 2. Trigger reaction after delay (when photon hits)
    setTimeout(() => {
      // Remove photon
      setPhotons(p => p.filter(x => x.id !== newPhotonId));
      
      // Split Water (Photolysis)
      // H2O -> 2H+ + 1/2 O2 + 2e-
      setProtons(prev => Math.min(prev + 2, MAX_PROTONS));
      triggerElectronFlow();
      
    }, 1000);
  };

  const triggerElectronFlow = () => {
    const eId = Date.now();
    setElectrons(prev => [...prev, { id: eId, stage: 0 }]); // Stage 0: PSII
  };

  useEffect(() => {
    // Move electrons periodically
    const interval = setInterval(() => {
      setElectrons(prev => {
        return prev.map(e => {
          if (e.stage < 3) return { ...e, stage: e.stage + 1 };
          return e;
        }).filter(e => {
           // If stage 3 (PSI), try to reduce NADP
           if (e.stage === 3) {
             if (canReduceNADP) {
               onReduceNADP();
               return false; // Consumed
             } else {
               return true; // Wait for NADP+? Or just disappear? 
               // For simplicity, if no NADP+, e- is lost or stays. 
               // We'll let it stay for a bit then disappear to avoid clutter.
             }
           }
           return true; 
        });
      });
    }, 1500); // Speed of ETC

    return () => clearInterval(interval);
  }, [canReduceNADP, onReduceNADP]);

  // Clean up stuck electrons
  useEffect(() => {
    const cleanup = setInterval(() => {
        setElectrons(prev => prev.filter(e => e.stage < 3 || (Date.now() - e.id < 10000)));
    }, 5000);
    return () => clearInterval(cleanup);
  }, []);

  const handleATPSynthaseClick = () => {
    if (protons >= 2 && canSynthesizeATP) {
      setProtons(p => p - 2);
      onSynthesizeATP();
      setIsSynthSpinning(true);
      setTimeout(() => setIsSynthSpinning(false), 1000);
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-sky-100 overflow-hidden rounded-xl border-4 border-slate-800 shadow-2xl flex flex-col">
      {/* Sun Button */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={handleSunlight}
          className="bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all p-4 rounded-full shadow-lg border-4 border-orange-400 group"
        >
          <Sun className="w-12 h-12 text-orange-600 animate-[spin_10s_linear_infinite]" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Strike Sunlight
          </span>
        </button>
      </div>

      {/* Stroma (Top) */}
      <div className="flex-1 bg-sky-200/50 relative p-4">
        <span className="text-slate-500 font-bold tracking-widest uppercase opacity-50 absolute top-2 right-4">Stroma</span>
        
        {/* Floating NADP+ / ADP indicators */}
        <div className="absolute top-10 right-20 flex gap-4 text-xs font-bold text-slate-600 opacity-60">
            <div>Available NADP+: {nadpCount}</div>
            <div>Available ADP: {adpCount}</div>
        </div>
      </div>

      {/* Thylakoid Membrane */}
      <div className="h-40 bg-teal-600 relative flex items-center justify-around px-20 shadow-inner z-10 border-y-4 border-teal-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-multiply"></div>
        <span className="absolute -top-6 left-4 text-teal-800 font-bold bg-white/80 px-2 rounded">Thylakoid Membrane</span>

        {/* PSII */}
        <div className="relative w-24 h-32 bg-green-500 rounded-lg flex items-center justify-center border-b-8 border-green-700 shadow-lg group">
           <span className="text-white font-bold text-xl drop-shadow-md">PSII</span>
           <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center">
             <div className="text-[10px] text-blue-900 font-bold bg-white/50 px-1 rounded">Water-Splitting Complex</div>
           </div>
        </div>

        {/* ETC - Cytochrome Complex */}
        <div className="relative w-20 h-28 bg-blue-500 rounded-lg flex items-center justify-center border-b-8 border-blue-700 shadow-lg mx-4">
            <span className="text-white font-bold">Cytochrome</span>
        </div>

        {/* PSI */}
        <div className="relative w-24 h-32 bg-lime-500 rounded-lg flex items-center justify-center border-b-8 border-lime-700 shadow-lg">
           <span className="text-white font-bold text-xl drop-shadow-md">PSI</span>
           <div className="absolute -top-12 left-1/2 -translate-x-1/2">
             {/* NADP Reductase site */}
             <div className={clsx("w-12 h-12 rounded-full border-4 border-dashed border-slate-400 flex items-center justify-center transition-colors", canReduceNADP ? "bg-slate-200" : "bg-red-100")}>
               <span className="text-[10px] text-center leading-tight">NADP<br/>Reductase</span>
             </div>
           </div>
        </div>

        {/* ATP Synthase */}
        <div className="relative ml-10">
            <button 
                onClick={handleATPSynthaseClick}
                disabled={protons < 2 || !canSynthesizeATP}
                className={clsx(
                    "w-28 h-36 bg-orange-400 rounded-t-full rounded-b-lg flex flex-col items-center justify-center border-b-8 border-orange-600 shadow-lg transition-transform",
                    isSynthSpinning && "animate-[spin_0.5s_linear_infinite]",
                    (protons >= 2 && canSynthesizeATP) ? "hover:scale-105 cursor-pointer ring-4 ring-yellow-300" : "opacity-80 cursor-not-allowed saturate-50"
                )}
            >
                <div className="w-20 h-20 bg-orange-300 rounded-full border-4 border-orange-500 flex items-center justify-center mb-2">
                    <Zap className={clsx("w-10 h-10 text-orange-700", (protons >= 2 && canSynthesizeATP) && "animate-pulse")} />
                </div>
                <span className="text-black/50 font-bold text-xs">ATP Synthase</span>
            </button>
            {/* Proton Channel */}
            <div className="absolute w-8 h-20 bg-black/20 top-10 left-1/2 -translate-x-1/2 -z-10"></div>
        </div>

        {/* Electron Path (Visual Line) */}
        <svg className="absolute top-1/2 left-0 w-full h-full pointer-events-none stroke-yellow-300 stroke-[3px] fill-none opacity-50 z-20">
            {/* Draw curve from PSII to Cyt to PSI */}
            <path d="M 150 10 Q 250 -30 350 10 T 550 10" />
        </svg>

        {/* Electron Animations */}
        <AnimatePresence>
          {electrons.map((e) => {
             // Calculate position based on stage
             // 0: PSII (approx left 20%)
             // 1: Cytochrome (approx left 40%)
             // 2: PSI (approx left 60%)
             // 3: Reduced (top of PSI)
             let left = "20%";
             if (e.stage === 1) left = "40%";
             if (e.stage === 2) left = "60%";
             if (e.stage === 3) left = "60%";

             let top = "50%";
             // if stage 3, move up to stroma
             if (e.stage === 3) top = "-20%";

             return (
                 <motion.div
                    key={e.id}
                    initial={{ left: "20%", top: "50%", scale: 0 }}
                    animate={{ left, top, scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute z-50 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-[0_0_10px_rgba(250,204,21,1)] flex items-center justify-center text-[10px] font-bold text-yellow-900"
                 >
                    e-
                 </motion.div>
             )
          })}
        </AnimatePresence>

      </div>

      {/* Lumen (Bottom) */}
      <div className="flex-1 bg-teal-900/40 relative p-4 flex flex-col justify-end">
        <span className="text-teal-900 font-bold tracking-widest uppercase opacity-50 absolute bottom-2 left-4">Thylakoid Lumen (High H+)</span>
        
        {/* Protons visual */}
        <div className="flex flex-wrap gap-2 content-end w-full max-w-2xl mx-auto h-24 p-2">
            <AnimatePresence>
                {Array.from({length: protons}).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: -20, opacity: 0 }}
                        className="w-8 h-8 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-md border border-pink-300"
                    >
                        H+
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
        
        <div className="absolute bottom-4 right-4 text-white bg-slate-900/50 px-3 py-1 rounded-full text-xs">
            H+ Count: {protons} (Need 2 for ATP)
        </div>
      </div>

       {/* Photons */}
       <AnimatePresence>
           {photons.map(p => (
               <motion.div
                key={p.id}
                initial={{ x: 50, y: -50, opacity: 1 }}
                animate={{ x: 150, y: 200, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 z-50 pointer-events-none"
               >
                 <Zap className="w-12 h-12 text-yellow-200 fill-yellow-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
               </motion.div>
           ))}
       </AnimatePresence>

    </div>
  );
}
