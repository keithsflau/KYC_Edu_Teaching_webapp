import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, RefreshCw, Calculator } from 'lucide-react';
import PloidyCalculator from './PloidyCalculator';

const PAIRS = [
  { flower: 'Ovule', fruit: 'Seed' },
  { flower: 'Integuments', fruit: 'Seed Coat (Testa)' },
  { flower: 'Ovary', fruit: 'Fruit' },
  { flower: 'Ovary Wall', fruit: 'Fruit Wall (Pericarp)' },
  { flower: 'Zygote', fruit: 'Embryo' },
];

export default function Scene3_Matching() {
  // State for the matching game
  const [matches, setMatches] = useState({}); // { fruitPart: flowerPart }
  const [draggedItem, setDraggedItem] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetFruit) => {
    e.preventDefault();
    if (draggedItem) {
      setMatches(prev => ({ ...prev, [targetFruit]: draggedItem }));
      setDraggedItem(null);
    }
  };

  const checkAnswers = () => {
    // Check if all correct
    const correctCount = PAIRS.reduce((acc, pair) => {
      return matches[pair.fruit] === pair.flower ? acc + 1 : acc;
    }, 0);
    return correctCount;
  };

  const isComplete = Object.keys(matches).length === PAIRS.length;
  const score = checkAnswers();
  const allCorrect = score === PAIRS.length;

  const reset = () => {
      setMatches({});
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 animate-fade-in pb-20">
       <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-indigo-800">Scene 3: Fate of Floral Parts</h2>
        <p className="text-indigo-600">Drag the floral part on the left to its corresponding fruit part on the right.</p>
      </div>

      <div className="flex w-full justify-between gap-8 max-w-3xl">
        
        {/* Source Items (Floral Parts) */}
        <div className="flex-1 space-y-3">
             <h3 className="text-lg font-bold text-center text-emerald-700 mb-4 border-b pb-2">Before Fertilization (Details)</h3>
             {PAIRS.map((pair) => {
                 const isUsed = Object.values(matches).includes(pair.flower);
                 return (
                     <div
                        key={pair.flower}
                        draggable={!isUsed}
                        onDragStart={(e) => handleDragStart(e, pair.flower)}
                        className={`p-3 rounded-lg text-center font-medium shadow-sm border-2 cursor-grab active:cursor-grabbing transition-all
                            ${isUsed 
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                                : 'bg-white border-emerald-200 text-emerald-800 hover:border-emerald-400 hover:shadow-md'
                            }
                        `}
                     >
                         {pair.flower}
                     </div>
                 )
             })}
        </div>

        {/* Target Items (Fruit Parts) */}
        <div className="flex-1 space-y-3">
             <h3 className="text-lg font-bold text-center text-orange-700 mb-4 border-b pb-2">After Fertilization (Fruit)</h3>
             {PAIRS.map((pair) => (
                 <div
                    key={pair.fruit}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, pair.fruit)}
                    className={`p-3 rounded-lg text-center font-medium shadow-sm border-2 min-h-[52px] flex items-center justify-between px-4 transition-colors relative
                        ${matches[pair.fruit] 
                            ? (matches[pair.fruit] === pair.flower && isComplete ? 'bg-green-50 border-green-400' : 'bg-orange-50 border-orange-200')
                            : 'bg-gray-50 border-gray-300 border-dashed'
                        }
                    `}
                 >
                     <span className="text-sm font-bold text-gray-500 absolute -top-2 left-2 bg-white px-1 text-[10px] uppercase tracking-wider">Becomes</span>
                     <span className="text-gray-800">{pair.fruit}</span>
                     
                     {/* Dropped Item Placeholder */}
                     {matches[pair.fruit] && (
                         <span className={`text-sm px-2 py-1 rounded ${matches[pair.fruit] === pair.flower && isComplete ? 'bg-green-200 text-green-900' : 'bg-blue-100 text-blue-800'}`}>
                             {matches[pair.fruit]}
                         </span>
                     )}
                 </div>
             ))}
        </div>

      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
          {isComplete && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl border-2 ${allCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} text-center`}
            >
                <h4 className="text-xl font-bold mb-2">{allCorrect ? "Perfect Match!" : "Keep Trying!"}</h4>
                <p>{score} / 5 Correct</p>
                {!allCorrect && <button onClick={reset} className="mt-2 text-sm underline flex items-center gap-1 mx-auto"><RefreshCw size={14} /> Reset</button>}
            </motion.div>
          )}
      </div>

      {allCorrect && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 w-full max-w-2xl border-t pt-8"
          >
              <button 
                onClick={() => setShowCalculator(!showCalculator)}
                className="w-full flex items-center justify-center gap-3 p-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
              >
                  <Calculator />
                  {showCalculator ? "Hide Ploidy Calculator" : "Open Ploidy Calculator"}
              </button>
              
              {showCalculator && (
                  <div className="mt-6 p-6 bg-white rounded-xl shadow-xl border border-indigo-100">
                      <PloidyCalculator />
                  </div>
              )}
          </motion.div>
      )}

    </div>
  );
}
