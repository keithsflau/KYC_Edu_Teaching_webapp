import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors } from 'lucide-react';

const Step1Digest = ({ onComplete }) => {
  const [cut, setCut] = useState(false);
  const [selectedEnzyme, setSelectedEnzyme] = useState(null);

  const handleCut = () => {
    if (selectedEnzyme === 'EcoRI') {
      setCut(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      <h2 className="text-2xl font-bold text-slate-800">Step 1: Restriction Digest</h2>
      <p className="text-slate-600 max-w-2xl text-center">
        Select a Restriction Enzyme to cut both the Plasmid Vector and the Human DNA.
        They must be cut by the <strong>same enzyme</strong> to produce complementary sticky ends.
      </p>

      {/* Control Panel */}
      <div className="flex space-x-4 bg-white p-4 rounded-xl shadow-md">
        <button
          onClick={() => setSelectedEnzyme('EcoRI')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            selectedEnzyme === 'EcoRI'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Scissors size={18} />
          <span>EcoRI (G^AATTC)</span>
        </button>
        <button
          onClick={() => setSelectedEnzyme('BamHI')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            selectedEnzyme === 'BamHI'
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 opacity-50 cursor-not-allowed'
              : 'bg-slate-100 text-slate-700 opacity-50 cursor-not-allowed'
          }`}
          disabled
        >
          <Scissors size={18} />
          <span>BamHI (G^GATCC)</span>
        </button>
      </div>

      <div className="flex justify-center items-center space-x-12 w-full max-w-4xl min-h-[400px]">
        {/* Human DNA - Linear */}
        <div className="flex flex-col items-center">
          <h3 className="mb-2 font-semibold text-rose-600">Human DNA (Insulin Gene)</h3>
          <div className="relative w-64 h-24 flex items-center justify-center">
            {/* Left Segment */}
            <motion.div
              className="h-8 bg-rose-200 border-2 border-rose-400 flex items-center justify-center overflow-hidden"
              initial={{ width: 128, x: 0 }}
              animate={cut ? { x: -20 } : { x: 0 }}
              style={{ borderRight: cut ? 'none' : '2px solid #fb7185' }}
            >
               <span className="text-xs text-rose-800 opacity-40">Human Chr 11</span>
            </motion.div>
            
            {/* Gene Segment (The Target) */}
             <motion.div
              className="absolute z-10 h-8 bg-rose-500 border-2 border-rose-600 flex items-center justify-center text-white font-bold text-xs"
              initial={{ width: 80 }}
              animate={cut ? { scale: 1.1 } : { scale: 1 }}
            >
              Insulin
            </motion.div>

            {/* Right Segment */}
             <motion.div
              className="h-8 bg-rose-200 border-2 border-rose-400 flex items-center justify-center overflow-hidden"
              initial={{ width: 128, x: 0 }}
              animate={cut ? { x: 20 } : { x: 0 }}
              style={{ borderLeft: cut ? 'none' : '2px solid #fb7185' }}
            >
              <span className="text-xs text-rose-800 opacity-40">Human Chr 11</span>
            </motion.div>

            {/* Sticky Ends Visualization (Appears after cut) */}
             <AnimatePresence>
              {cut && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-[10px] font-mono font-bold text-blue-600 top-[-20px]"
                  >
                    T T A A
                  </motion.div>
                   <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-[10px] font-mono font-bold text-blue-600 bottom-[-20px]"
                  >
                     A A T T
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Plasmid - Circular */}
        <div className="flex flex-col items-center">
           <h3 className="mb-2 font-semibold text-emerald-600">Plasmid Vector</h3>
           <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Plasmid Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="12"
                  initial={{ pathLength: 1 }}
                  animate={cut ? { pathLength: 0.85, rotate: -90 } : { pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Ampicillin Resistance Gene */}
                 <motion.path
                  d="M 100 20 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#f59e0b" // Amber for resistance
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                 <text x="130" y="60" className="text-[10px] fill-amber-700 font-bold">AmpR</text>

                {/* Sticky Ends Text */}
                {cut && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <text x="85" y="25" className="text-[10px] fill-blue-600 font-mono font-bold">AATT</text>
                     <text x="85" y="185" className="text-[10px] fill-blue-600 font-mono font-bold">TTAA</text>
                  </motion.g>
                )}
                
                {/* Cut Site Indicator */}
                {!cut && (
                  <line x1="100" y1="10" x2="100" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                )}
              </svg>
           </div>
        </div>
      </div>

       <AnimatePresence>
        {selectedEnzyme === 'EcoRI' && !cut && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={handleCut}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-bold shadow-lg hover:bg-indigo-700 focus:ring-4 ring-indigo-300"
          >
            Apply Enzyme
          </motion.button>
        )}
      </AnimatePresence>

       {cut && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 bg-green-100 text-green-800 rounded-lg border border-green-300"
        >
          Success! Sticky ends created. Proceeding to Ligation...
        </motion.div>
      )}
    </div>
  );
};

export default Step1Digest;
