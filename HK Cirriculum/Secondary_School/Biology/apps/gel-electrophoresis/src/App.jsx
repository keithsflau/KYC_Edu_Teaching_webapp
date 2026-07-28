import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Zap, Play, RotateCcw, CheckCircle, AlertTriangle, Fingerprint, Dna, ArrowDown, Info } from 'lucide-react';
import { CRIME_SAMPLES, PATERNITY_SAMPLES } from './data/dnaProfiles';
import clsx from 'clsx';

const GAME_MODES = {
  CRIME: 'crime',
  PATERNITY: 'paternity'
};

const TANK_HEIGHT = 400; // px
const RUN_DURATION = 15000; // ms

function App() {
  const [activeMode, setActiveMode] = useState(GAME_MODES.CRIME);
  const [wells, setWells] = useState([null, null, null, null]);
  const [cables, setCables] = useState({ red: null, black: null }); // 'top' or 'bottom'
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null); // For pipetting

  const timerRef = useRef(null);

  const availableSamples = activeMode === GAME_MODES.CRIME ? CRIME_SAMPLES : PATERNITY_SAMPLES;
  const sampleKeys = Object.keys(availableSamples);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetExperiment = () => {
    setIsRunning(false);
    setProgress(0);
    setErrorMessage(null);
    setShowAnalysis(false);
    setFeedback(null);
    setSelectedSuspect(null);
    clearInterval(timerRef.current);
    // Keep wells and cables for convenience, to allow re-run.
  };

  const fullReset = () => {
    resetExperiment();
    setWells([null, null, null, null]);
    setCables({ red: null, black: null });
  };

  const handleWellClick = (index) => {
    if (isRunning || showAnalysis) return;
    if (selectedSample) {
      const newWells = [...wells];
      newWells[index] = selectedSample;
      setWells(newWells);
      setSelectedSample(null);
    } else {
      // Unload
      const newWells = [...wells];
      newWells[index] = null;
      setWells(newWells);
    }
  };

  const toggleCable = (color, position) => {
    if (isRunning) return;
    setCables(prev => ({
      ...prev,
      [color]: prev[color] === position ? null : position
    }));
  };

  const startRun = () => {
    if (!cables.red || !cables.black) {
      setFeedback({ type: 'error', message: "Warning: Power Supply Incomplete. Connect both cables." });
      return;
    }
    
    // Logic: DNA is Negative. It runs to Positive (Red).
    // So Red must be at Bottom, Black at Top.
    const correctConfig = cables.red === 'bottom' && cables.black === 'top';
    const reverseConfig = cables.red === 'top' && cables.black === 'bottom';
    
    // Short circuit or weird config
    if (cables.red === cables.black) {
       setFeedback({ type: 'error', message: "Short Circuit! Check connections." });
       return;
    }

    setIsRunning(true);
    setFeedback(null);

    const startTime = Date.now();
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / RUN_DURATION, 1);
      
      if (reverseConfig && p > 0.1) {
         clearInterval(timerRef.current);
         setErrorMessage("POLARITY REVERSED! DNA ran backwards into the buffer!");
         setIsRunning(false);
         return;
      }

      if (!correctConfig && !reverseConfig && p > 0.1) {
          // Some other weird config, e.g. both top ?? prevented by UI logic but just in case
          clearInterval(timerRef.current);
          setErrorMessage("Circuit Error. DNA did not move.");
          setIsRunning(false);
          return;
      }

      setProgress(p * 100);

      if (p >= 1) {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTimeout(() => setShowAnalysis(true), 1000);
      }
    }, 50);
  };

  const checkAnswer = (suspectId) => {
    setSelectedSuspect(suspectId);
    if (activeMode === GAME_MODES.CRIME) {
      if (suspectId === 'suspect_b') {
        setFeedback({ type: 'success', message: "MATCH CONFIRMED! Suspect B matched the Crime Scene DNA." });
      } else {
        setFeedback({ type: 'error', message: "NO MATCH. The bands do not align perfectly." });
      }
    } else {
       // Paternity
       if (suspectId === 'dad_a') {
         setFeedback({ type: 'success', message: "CORRECT! Dad A shares the required bands with the Child." });
       } else {
         setFeedback({ type: 'error', message: "INCORRECT. Look for bands in the Child that are NOT in the Mother." });
       }
    }
  };

  // Helper to calculate band position
  const getBandPosition = (size, progress) => {
    // Smaller = Faster.
    // Base speed factor.
    // pos = progress * speed
    // speed ~ 1/size
    // Log scale is usually better for visual spread
    const maxLog = Math.log(2000);
    const minLog = Math.log(100);
    const sizeLog = Math.log(size);
    // Invert size: smaller value -> higher position usually, but we want smaller -> further down.
    // factor 0 to 1 where 1 is fastest (smallest).
    const speedFactor = 1 - (sizeLog - minLog) / (maxLog - minLog);
    
    // Adjust mapping for visual clarity
    const visualSpeed = 0.2 + (speedFactor * 0.8); 
    
    return progress * 3.8 * visualSpeed; // Max travel approx 380px
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-10">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Dna className="text-blue-400 w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">BioLab: Gel Electrophoresis</h1>
              <p className="text-xs text-slate-400">Forensic DNA Analysis Simulation</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => { setActiveMode(GAME_MODES.CRIME); fullReset(); }}
              className={clsx("px-4 py-2 rounded-lg text-sm transition-colors", activeMode === GAME_MODES.CRIME ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700")}
            >
              Mode 1: Crime Scene
            </button>
            <button 
              onClick={() => { setActiveMode(GAME_MODES.PATERNITY); fullReset(); }}
              className={clsx("px-4 py-2 rounded-lg text-sm transition-colors", activeMode === GAME_MODES.PATERNITY ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700")}
            >
              Mode 2: Paternity Test
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
        {/* Left Panel: Lab & Controls */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Instructions */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h2 className="font-semibold flex items-center gap-2 mb-3 text-slate-700">
              <Info className="w-5 h-5" /> Protocol
            </h2>
            <ol className="list-decimal list-inside text-sm space-y-2 text-slate-600">
              <li>Select a DNA sample to load pipette.</li>
              <li>Click a <strong>Well</strong> to inject sample.</li>
              <li>Connect Power: <strong>Black (-)</strong> at Top, <strong>Red (+)</strong> at Bottom.</li>
              <li>Press <strong>Start Run</strong> to separate fragments.</li>
            </ol>
          </div>

          {/* Sample Tray */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4">Sample Tray</h3>
            <div className="grid grid-cols-2 gap-3">
              {sampleKeys.map(key => {
                const sample = availableSamples[key];
                const isSelected = selectedSample === key;
                return (
                  <button
                    key={key}
                    onClick={() => !isRunning && setSelectedSample(key)}
                    disabled={isRunning}
                    className={clsx(
                      "flex items-center gap-2 p-3 rounded-lg border transition-all text-left",
                      isSelected ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <FlaskConical className={clsx("w-5 h-5", sample.color.replace('bg-', 'text-'))} />
                    <span className="text-sm font-medium">{sample.name}</span>
                  </button>
                );
              })}
            </div>
            {selectedSample && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-sm rounded animate-pulse">
                Micropipette Loaded: <strong>{availableSamples[selectedSample].name}</strong>. Click a well to load.
              </div>
            )}
          </div>

          {/* Power Supply Control */}
          <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
               <Zap className="w-24 h-24" />
             </div>
             <h3 className="font-bold mb-4 z-10 relative">DC Power Supply</h3>
             
             <div className="flex justify-between items-center z-10 relative">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                    <span className="text-xs font-mono">POSITIVE (+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-black border border-slate-600"></div>
                    <span className="text-xs font-mono">NEGATIVE (-)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={startRun}
                    disabled={isRunning || progress > 0}
                    className={clsx(
                      "px-4 py-2 rounded font-bold transition-all flex items-center gap-2",
                      isRunning ? "bg-green-500 text-white animate-pulse" : "bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-50"
                    )}
                  >
                    {isRunning ? "Running..." : "Start Run"}
                    {!isRunning && <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button 
                    onClick={fullReset}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
                    title="Reset"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
             </div>
          </div>

        </div>

        {/* Center: The Tank */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 relative min-h-[500px] flex flex-col items-center">
            
            {/* Error Overlay */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-white/90 flex flex-col items-center justify-center text-center p-8 rounded-xl"
                >
                  <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Experiment Failed</h2>
                  <p className="text-red-600 font-medium text-lg mb-6">{errorMessage}</p>
                  <button onClick={resetExperiment} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analysis Overlay */}
            <AnimatePresence>
              {showAnalysis && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute inset-0 z-40 bg-slate-900/95 text-white p-6 rounded-xl flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Fingerprint className="w-6 h-6 text-green-400" />
                        Analysis Room
                      </h2>
                      <p className="text-slate-400 text-sm">Compare the band patterns.</p>
                      <p className="text-slate-500 text-xs mt-1">Smaller fragments moved further.</p>
                    </div>
                    <button onClick={() => setShowAnalysis(false)} className="text-slate-400 hover:text-white text-sm underline">
                        View Gel
                    </button>
                  </div>

                  <div className="flex-1 flex gap-4 overflow-hidden relative">
                    {/* Simulated UV Light View */}
                    <div className="flex-1 bg-black border-2 border-slate-700 rounded-lg shadow-[0_0_30px_rgba(139,92,246,0.1)] relative p-4 flex justify-around">
                       <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-purple-900/10 to-transparent"></div>
                       {wells.map((sampleId, idx) => (
                         <div key={idx} className="h-full w-16 relative border-l border-r border-slate-800/50">
                            <div className="text-xs text-center text-slate-500 mb-2">Lane {idx + 1}</div>
                            {sampleId && activeMode === GAME_MODES.CRIME && idx === 0 && (
                                <div className="text-[10px] text-center text-red-400 font-bold mb-1">EVIDENCE</div>
                            )}
                            {sampleId && activeMode === GAME_MODES.PATERNITY && idx === 1 && (
                                <div className="text-[10px] text-center text-purple-400 font-bold mb-1">CHILD</div>
                            )}

                            {sampleId && availableSamples[sampleId].fragments.map((size, fIdx) => (
                              <motion.div
                                key={fIdx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute w-[80%] left-[10%] h-2 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] rounded-sm"
                                style={{ top: `${getBandPosition(size, 100)}%` }}
                              >
                                <span className="absolute -right-8 text-[9px] text-green-400/50 hidden hover:block">{size}bp</span>
                              </motion.div>
                            ))}
                         </div>
                       ))}
                    </div>

                    {/* Decision Panel */}
                    <div className="w-64 space-y-4">
                       <h3 className="font-bold text-slate-300">Who is the match?</h3>
                       <div className="space-y-2">
                         {sampleKeys.filter(k => (activeMode === GAME_MODES.CRIME ? k !== 'crime_scene' : (k === 'dad_a' || k === 'dad_b'))).map(key => (
                           <button
                             key={key}
                             onClick={() => checkAnswer(key)}
                             className={clsx(
                               "w-full text-left p-3 rounded border transition-all",
                               selectedSuspect === key 
                                 ? (feedback?.type === 'success' ? "bg-green-900/50 border-green-500 text-green-300" : "bg-red-900/50 border-red-500 text-red-300")
                                 : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                             )}
                           >
                             {availableSamples[key].name}
                           </button>
                         ))}
                       </div>

                       {feedback && (
                         <div className={clsx("p-3 rounded text-sm font-medium", feedback.type === 'success' ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300")}>
                           {feedback.message}
                           {feedback.type === 'success' && (
                             <button onClick={fullReset} className="block mt-2 text-xs underline opacity-70 hover:opacity-100">Start New Case</button>
                           )}
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Terminals (Black -) */}
            <div className="absolute -top-3 w-full flex justify-between px-10">
              <div 
                 onClick={() => toggleCable('black', 'top')}
                 className={clsx(
                   "w-8 h-8 rounded-full border-4 cursor-pointer transition-all z-20 flex items-center justify-center",
                   cables.black === 'top' ? "bg-black border-slate-400 shadow-[0_0_10px_black]" : "bg-slate-300 border-slate-400 hover:bg-slate-400"
                 )}
                 title="Negative Electrode Input"
              >
                {cables.black === 'top' && <div className="w-full h-1 bg-black absolute -top-10 rotate-90" />} {/* Cable visual stub */}
                <span className="text-white text-xs font-bold">-</span>
              </div>

              <div 
                 onClick={() => toggleCable('red', 'top')}
                 className={clsx(
                   "w-8 h-8 rounded-full border-4 cursor-pointer transition-all z-20 flex items-center justify-center",
                   cables.red === 'top' ? "bg-red-500 border-slate-400 shadow-[0_0_10px_red]" : "bg-slate-300 border-slate-400 hover:bg-slate-400"
                 )}
                 title="Positive Electrode Input"
              >
                 <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>

            {/* The Gel Slab */}
            <div className="w-full max-w-lg bg-teal-900/10 border-4 border-slate-300 rounded-lg relative overflow-hidden flex" style={{ height: TANK_HEIGHT }}>
               {/* Buffer liquid effect */}
               <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>

               {/* Wells Row */}
               <div className="absolute top-4 w-full flex justify-around px-8 z-10">
                  {wells.map((sampleId, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleWellClick(idx)}
                      className={clsx(
                        "w-12 h-6 border-2 border-white/50 rounded-b-lg cursor-pointer transition-colors relative",
                        sampleId ? "bg-blue-500/50" : "bg-slate-200/20 hover:bg-slate-200/40"
                      )}
                    >
                      {/* Well label */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">
                        {idx + 1}
                      </span>
                      {sampleId && <div className="w-full h-full bg-blue-600 opacity-50 rounded-b-md"></div>}
                    </div>
                  ))}
               </div>

               {/* Lanes & Bands */}
               <div className="w-full flex justify-around px-8 pt-10 h-full relative">
                 {wells.map((sampleId, idx) => (
                   <div key={idx} className="w-12 h-full relative border-l border-r border-dashed border-slate-300/20">
                     <AnimatePresence>
                       {sampleId && availableSamples[sampleId].fragments.map((size, fIdx) => {
                          const topPos = getBandPosition(size, progress);
                          return (
                             <motion.div
                               key={`${sampleId}-${fIdx}`}
                               className="absolute w-full h-1 bg-blue-600 rounded opacity-80"
                               initial={{ top: 0, opacity: 0 }}
                               animate={{ 
                                 top: `${Math.min(topPos, 100)}%`, 
                                 opacity: topPos > 100 ? 0 : 0.8 
                               }}
                               transition={{ duration: 0.1, ease: 'linear' }}
                             >
                               {/* Hint tooltip on hover */}
                             </motion.div>
                          );
                       })}
                     </AnimatePresence>
                   </div>
                 ))}
               </div>

               {/* Electric Field Indicator */}
               {isRunning && (
                 <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-10 opacity-20">
                    <ArrowDown className="w-full text-slate-400 animate-bounce" />
                    <ArrowDown className="w-full text-slate-400 animate-bounce delay-100" />
                    <ArrowDown className="w-full text-slate-400 animate-bounce delay-200" />
                 </div>
               )}

            </div>

            {/* Bottom Terminals (Red +) */}
            <div className="absolute -bottom-3 w-full flex justify-between px-10">
              <div 
                 onClick={() => toggleCable('black', 'bottom')}
                 className={clsx(
                   "w-8 h-8 rounded-full border-4 cursor-pointer transition-all z-20 flex items-center justify-center",
                   cables.black === 'bottom' ? "bg-black border-slate-400 shadow-[0_0_10px_black]" : "bg-slate-300 border-slate-400 hover:bg-slate-400"
                 )}
              >
                <span className="text-white text-xs font-bold">-</span>
              </div>

              <div 
                 onClick={() => toggleCable('red', 'bottom')}
                 className={clsx(
                   "w-8 h-8 rounded-full border-4 cursor-pointer transition-all z-20 flex items-center justify-center",
                   cables.red === 'bottom' ? "bg-red-500 border-slate-400 shadow-[0_0_10px_red]" : "bg-slate-300 border-slate-400 hover:bg-slate-400"
                 )}
              >
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>

            {/* Cable Rendering (SVG overlay) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
               {/* Top Left Black */}
               {cables.black === 'top' && (
                 <motion.path 
                   d="M 50,-50 C -50,-50 -50,50 50,20" // Simplified
                   // Since exact pixel matching is hard in responsive, we simulate visuals with CSS mostly, 
                   // but can draw a bezier here connecting the power supply (offscreen left) to terminals.
                   // Actually, let's just draw connection indicators on the terminals themselves as handled above.
                   // Drawing full cables to the side panel is complex due to layout.
                   // We will use the terminal glowing states to indicate connection.
                 />
               )}
            </svg>

          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-900 border border-blue-100">
             <h4 className="font-bold flex items-center gap-2 mb-2">
               <FlaskConical className="w-4 h-4"/> theory: Principle of Electrophoresis
             </h4>
             <p>DNA molecules are negatively charged (phosphate groups). When an electric current is applied, they move towards the positive electrode (anode). Smaller fragments move faster through the porous gel matrix.</p>
          </div>
        </div>

      </main>
    </div>
  );
}



export default App;
