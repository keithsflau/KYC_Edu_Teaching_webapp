import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Syringe, CheckCircle2 } from 'lucide-react';

const Step2Ligation = ({ onComplete }) => {
  const [isInserted, setIsInserted] = useState(false);
  const [ligaseAdded, setLigaseAdded] = useState(false);

  const handleDragEnd = (event, info) => {
    // Simple distance check - if dragged downwards enough
    if (info.offset.y > 50 && !isInserted) {
      setIsInserted(true);
    }
  };

  const handleAddLigase = () => {
    setLigaseAdded(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      <h2 className="text-2xl font-bold text-slate-800">Step 2: Ligation</h2>
      <p className="text-slate-600 max-w-2xl text-center">
        Drag the <strong className="text-rose-600">Insulin Gene</strong> into the open <strong className="text-emerald-600">Plasmid</strong> vector.
        Then add <strong>DNA Ligase</strong> to seal the sugar-phosphate backbone.
      </p>

      <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
        
        {/* Plasmid (Target) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16">
          <svg width="300" height="300" viewBox="0 0 200 200">
             {/* Main Ring */}
             <motion.path
                d="M 60 40 A 80 80 0 1 1 140 40"
                fill="none"
                stroke={ligaseAdded ? "#34d399" : "#34d399"} 
                strokeWidth="12"
                strokeLinecap="butt"
              />
              {/* AmpR Marker */}
              <path
                  d="M 100 180 A 80 80 0 0 1 20 100"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="12"
              />
              <text x="30" y="100" className="text-[10px] fill-amber-700 font-bold">AmpR</text>

              {/* Ligase Bond Highlights */}
              {ligaseAdded && (
                 <>
                   <motion.circle cx="60" cy="40" r="8" fill="#fbbf24" initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.5 }} />
                   <motion.circle cx="140" cy="40" r="8" fill="#fbbf24" initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
                 </>
              )}
          </svg>
        </div>

        {/* Insulin Gene (Draggable) */}
        <motion.div
           drag={!isInserted}
           dragConstraints={{ left: 0, right: 0, top: 0, bottom: 200 }}
           onDragEnd={handleDragEnd}
           animate={
             isInserted 
             ? { x: 0, y: 84, rotate: 0 } // Move nicely into the gap
             : { x: 0, y: -100 }
           }
           className="z-10 cursor-grab active:cursor-grabbing"
        >
          <div className="flex flex-col items-center">
            <div className={`
              w-32 h-8 flex items-center justify-center 
              bg-rose-500 border-2 border-rose-600 text-white font-bold rounded-sm shadow-md
              ${ligaseAdded ? 'ring-2 ring-yellow-400' : ''}
            `}>
              Insulin Gene
            </div>
            {/* Sticky ends visual */}
            {!ligaseAdded && (
              <div className="flex justify-between w-full px-1">
                 <span className="text-[10px] text-blue-600 font-mono">AATT</span>
                 <span className="text-[10px] text-blue-600 font-mono">TTAA</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Text cues */}
        {!isInserted && (
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/4 text-slate-400 font-medium"
          >
            ↓ Drag Gene Here ↓
          </motion.div>
        )}

      </div>

      {isInserted && !ligaseAdded && (
        <motion.button
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={handleAddLigase}
          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700"
        >
          <Syringe size={20} />
          <span>Add DNA Ligase</span>
        </motion.button>
      )}

      {ligaseAdded && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-green-700 bg-green-100 px-4 py-2 rounded-lg"
        >
            <CheckCircle2 size={20} />
            <span>Recombinant Plasmid Created!</span>
        </motion.div>
      )}

    </div>
  );
};

export default Step2Ligation;
