import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';

export default function Scene1_Pollination({ onNext }) {
  const [stage, setStage] = useState(0); // 0: Idle, 1: Landed, 2: Growing, 3: Done

  const startAnimation = () => {
    setStage(1);
    // Sequence the animation states
    setTimeout(() => setStage(2), 1000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 animate-fade-in">
       <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-emerald-800">Scene 1: Pollination & Growth</h2>
        <p className="text-emerald-600">Watch the pollen tube carry male gametes to the ovule.</p>
      </div>

      <div className="relative w-[300px] h-[500px] bg-white rounded-xl shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-emerald-50 opacity-50"></div>

        <svg viewBox="0 0 300 500" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Carpel Structure */}
          {/* Style/Ovary Outline */}
          <path 
            d="M 120 40 Q 110 40 110 60 L 120 250 Q 80 300 80 400 Q 80 480 150 480 Q 220 480 220 400 Q 220 300 180 250 L 190 60 Q 190 40 180 40 Q 150 30 120 40" 
            fill="#dcfce7" 
            stroke="#166534" 
            strokeWidth="3"
          />
          
          {/* Ovule (Anatropous representation - inverted) */}
          <g transform="translate(150, 400)">
             <path 
                d="M -30 -40 Q 0 -60 30 -40 Q 50 0 30 40 Q 0 60 -30 40 Q -50 0 -30 -40" 
                fill="#f0fdf4" 
                stroke="#15803d" 
                strokeWidth="2"
             />
             {/* Embryo Sac placeholder */}
             <ellipse cx="0" cy="0" rx="20" ry="30" fill="#bbf7d0" />
             {/* Micropyle opening indication at top for simplicity in pathing or curve around */}
          </g>

          {/* Labels */}
          <text x="50" y="60" className="text-sm font-semibold fill-emerald-800">Stigma</text>
          <line x1="100" y1="55" x2="115" y2="55" stroke="#065f46" strokeWidth="1" />

          <text x="50" y="200" className="text-sm font-semibold fill-emerald-800">Style</text>
          <line x1="90" y1="195" x2="120" y2="195" stroke="#065f46" strokeWidth="1" />

          <text x="230" y="350" className="text-sm font-semibold fill-emerald-800">Ovary</text>
          <line x1="225" y1="345" x2="200" y2="360" stroke="#065f46" strokeWidth="1" />
          
          <text x="230" y="400" className="text-sm font-semibold fill-emerald-800">Ovule</text>
          <line x1="225" y1="395" x2="180" y2="400" stroke="#065f46" strokeWidth="1" />

          {/* Pollen Tube Path Animation */}
          {stage >= 2 && (
            <motion.path
                d="M 150 50 L 150 250 Q 150 300 150 350 L 150 365" 
                fill="none"
                stroke="#eab308"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, ease: "easeInOut" }}
                onAnimationComplete={() => {
                    setStage(3);
                }}
            />
          )}
        </svg>

        {/* Dynamic Elements using HTML/Framer Motion overlay for easier control */}
        
        {/* Pollen Grain */}
        <motion.div 
            className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 shadow-sm z-20 flex items-center justify-center cursor-pointer"
            style={{ left: 138, top: -20 }}
            animate={stage >= 1 ? { top: 38 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
             <div className="w-1 h-1 bg-yellow-700 rounded-full opacity-50"></div>
        </motion.div>

        {/* Male Gametes */}
        {stage >= 2 && (
            <>
            <motion.div
                className="absolute w-3 h-3 bg-red-500 rounded-full border border-red-700 z-30 shadow-sm"
                initial={{ left: 144, top: 50, opacity: 0 }}
                animate={{ top: 350, opacity: 1 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.div
                className="absolute w-3 h-3 bg-red-500 rounded-full border border-red-700 z-30 shadow-sm"
                initial={{ left: 144, top: 40, opacity: 0 }}
                animate={{ top: 335, opacity: 1 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 0.3 }}
            />
            </>
        )}
        
        {/* Micropyle Highlight when done */}
        {stage === 3 && (
            <motion.div 
                className="absolute w-full text-center bottom-20 z-40 bg-white/90 p-2 rounded shadow-lg mx-4 text-emerald-800 font-bold border border-emerald-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Entered Micropyle!
            </motion.div>
        )}

      </div>

      <div className="mt-8 flex gap-4">
        <button
            onClick={startAnimation}
            disabled={stage !== 0}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
        >
            <Play size={20} />
            Pollinate
        </button>
        {stage === 3 && (
            <button
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all hover:scale-105 animate-bounce"
            >
                Next Step
                <CheckCircle size={20} />
            </button>
        )}
      </div>

      <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100 max-w-lg">
          <h3 className="font-bold text-emerald-900 mb-2">Key Concepts:</h3>
          <ul className="list-disc list-inside text-sm text-emerald-800 space-y-1">
              <li><span className="font-semibold">Chemotropism:</span> The pollen tube grows down the style guided by chemicals towards the ovary.</li>
              <li><span className="font-semibold">Male Gametes:</span> Two nuclei travel down the tube. They are haploid (n).</li>
              <li><span className="font-semibold">Micropyle:</span> The small opening in the ovule where the tube enters.</li>
          </ul>
      </div>
    </div>
  );
}
