import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, PetriDish } from 'lucide-react'; // Note: PetriDish might not exist in all versions, checking... actually Thermometer does. I'll use Circle or similar if PetriDish missing.

// Lucide React might not have PetriDish, I'll allow my code to handle generic icons or SVG.
// I'll stick to SVG for the plate.

const Step3Transformation = ({ onComplete }) => {
  const [heatShocked, setHeatShocked] = useState(false);
  const [plated, setPlated] = useState(false);

  const handleHeatShock = () => {
    setHeatShocked(true);
  };

  const handlePlate = () => {
    setPlated(true);
    setTimeout(() => {
       onComplete(); // Finish wizard
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6 w-full">
      <h2 className="text-2xl font-bold text-slate-800">Step 3: Transformation & Screening</h2>
      <p className="text-slate-600 max-w-2xl text-center">
        Introduce the recombinant plasmid into <i>E. coli</i> bacteria using <strong>Heat Shock</strong>. 
        Then plate them on agar containing <strong>Ampicillin</strong> to screen for successful transformation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Transformation Chamber */}
        <div className={`
          relative flex flex-col items-center p-6 rounded-xl border-2 transition-colors duration-1000
          ${heatShocked ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}
        `}>
          <h3 className="font-bold text-slate-700 mb-4">1. Heat Shock Transformation</h3>
          
          <div className="relative w-48 h-48 bg-white rounded-full border-4 border-slate-200 flex items-center justify-center overflow-hidden">
             {/* Bacteria Cell */}
             <motion.div
               className="relative w-32 h-40 bg-slate-200 rounded-[40px] border-4 border-slate-400 flex items-center justify-center"
               animate={heatShocked ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
               transition={{ duration: 0.5, repeat: heatShocked ? 3 : 0 }}
             >
                {/* Bacterial DNA (Nucleoid) */}
                <svg width="60" height="60" className="absolute opacity-30">
                   <path d="M10,30 Q30,10 50,30 T90,30" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>

                {/* Plasmids Entering */}
                <motion.div
                  className="absolute"
                  initial={{ y: -60, opacity: 0 }}
                  animate={heatShocked ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                   <svg width="40" height="40" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="30" fill="none" stroke="#34d399" strokeWidth="8" />
                      <path d="M 50 20 A 30 30 0 0 1 80 50" fill="none" stroke="#f59e0b" strokeWidth="8" />
                   </svg>
                </motion.div>
             </motion.div>
             
             {/* Temperature Indicator */}
             <div className="absolute top-2 right-2 flex flex-col items-center">
                <Thermometer size={24} className={heatShocked ? "text-red-500" : "text-blue-500"} />
                <span className={`text-xs font-bold ${heatShocked ? "text-red-500" : "text-blue-500"}`}>
                  {heatShocked ? "42°C" : "4°C"}
                </span>
             </div>
          </div>

          <div className="mt-4 h-16 flex items-center">
             {!heatShocked ? (
               <button
                 onClick={handleHeatShock}
                 className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 shadow transition-transform active:scale-95"
               >
                 Apply Heat Shock
               </button>
             ) : (
                <span className="text-green-600 font-bold">Transformation simulated!</span>
             )}
          </div>
        </div>


        {/* Screening Plate */}
        <div className="flex flex-col items-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
           <h3 className="font-bold text-slate-700 mb-4">2. Antibiotic Selection</h3>
           
           <div className="relative w-48 h-48 rounded-full bg-amber-100 border-4 border-slate-300 shadow-inner flex items-center justify-center overflow-hidden">
              <span className="absolute bottom-4 text-amber-800/20 font-bold text-xl pointer-events-none">LB + Amp</span>
              
              {/* Colonies */}
              {plated && (
                <Colonies />
              )}
           </div>

           <div className="mt-4 h-16 flex items-center">
              {heatShocked && !plated && (
                 <button
                   onClick={handlePlate}
                   className="px-6 py-2 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 shadow transition-transform active:scale-95"
                 >
                   Plate Bacteria
                 </button>
              )}
              {plated && (
                 <div className="text-center text-sm text-slate-600">
                    <div>Growth = Has Insulin Plasmid</div>
                 </div>
              )}
           </div>
        </div>

      </div>

      {plated && (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-indigo-900 max-w-2xl"
         >
            <h4 className="font-bold mb-1">Results Explained:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
               <li>The <strong>Ampicillin Resistance Gene</strong> (marker) allows the transformed bacteria to survive on the plate.</li>
               <li>Bacteria without the plasmid died because they lack resistance.</li>
               <li>The whitish colonies contain the clones of your Recombinant DNA!</li>
            </ul>
         </motion.div>
      )}

    </div>
  );
};

// Memoized Colonies component to handle random positions
const Colonies = () => {
  // Generate stable random positions once
  const [positions] = useState(() => 
    [...Array(8)].map(() => ({
      top: Math.random() * 60 + 20,
      left: Math.random() * 60 + 20
    }))
  );

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
          className="absolute w-4 h-4 bg-white rounded-full shadow-sm"
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
          }}
        />
      ))}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2.5 }}
         className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]"
      >
         <div className="bg-white px-3 py-1 rounded shadow text-xs font-bold text-green-700">
            Survivors (AmpR+)
         </div>
      </motion.div>
    </>
  );
};

export default Step3Transformation;
