import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Play, Pause, RefreshCw, Split, TestTube, ArrowRight, Bird, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Simulation Constants ---
const BEAK_MIN = 0;
const BEAK_MAX = 100;
const STARTING_MEAN = 50;
const STARTING_STD_DEV = 10;
const EVOLUTION_RATE = 0.05; // How fast the population adapts
const SPECIATION_THRESHOLD = 30; // Difference in mean required for speciation

const FOOD_SOURCES = {
  seeds: { name: 'Average Seeds', targetMean: 50, color: '#9CA3AF', icon: '🌱' }, // Gray
  nuts: { name: 'Big Hard Nuts', targetMean: 90, color: '#FCD34D', icon: '🌰' }, // Yellow/Gold
  insects: { name: 'Tiny Insects', targetMean: 20, color: '#F87171', icon: '🐜' } // Red
};

// --- Helper: Generate Bell Curve Data ---
const generateDistributionData = (meanA, meanB, isIsolated) => {
  const data = [];
  const start = 0;
  const end = 100;
  const step = 2;

  for (let x = start; x <= end; x += step) {
    // Gaussian function: f(x) = (1 / (σ * √2π)) * e^(-(x-μ)^2 / (2σ^2))
    // Simplified scaling for visualization
    const valA = Math.exp(-Math.pow(x - meanA, 2) / (2 * Math.pow(STARTING_STD_DEV, 2)));
    // If not isolated, population B is just a mirror or same as A effectively, 
    // but for the visual we usually show one curve before split.
    // After split, we show both.
    const valB = isIsolated ? Math.exp(-Math.pow(x - meanB, 2) / (2 * Math.pow(STARTING_STD_DEV, 2))) : 0;
    
    data.push({
      beakSize: x,
      popA: valA,
      popB: valB,
    });
  }
  return data;
};

const App = () => {
  // --- State ---
  const [isIsolated, setIsIsolated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  
  // Population Stats
  const [popA, setPopA] = useState({ mean: STARTING_MEAN, food: 'seeds' });
  const [popB, setPopB] = useState({ mean: STARTING_MEAN, food: 'seeds' });

  const [speciationTestResult, setSpeciationTestResult] = useState(null);

  // --- Simulation Loop ---
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setGeneration(g => g + 1);

        setPopA(prev => {
          const target = FOOD_SOURCES[prev.food].targetMean;
          const diff = target - prev.mean;
          // Logistic-like approach or simple lerp
          // Add some randomness for "drift" if neutral, but here selection is strong
          const change = diff * EVOLUTION_RATE;
          return { ...prev, mean: prev.mean + change };
        });

        if (isIsolated) {
          setPopB(prev => {
            const target = FOOD_SOURCES[prev.food].targetMean;
            const diff = target - prev.mean;
            const change = diff * EVOLUTION_RATE;
            return { ...prev, mean: prev.mean + change };
          });
        }
      }, 200); // 5 generations per second
    }
    return () => clearInterval(interval);
  }, [isPlaying, isIsolated, popA.food, popB.food]);

  // --- Handlers ---
  const handleSplit = () => {
    setIsIsolated(true);
    // Initialize Pop B to match Pop A at the moment of split
    // Copy Pop A's state to Pop B when splitting
    setPopB({ ...popA });
  };

  const handleReset = () => {
    setIsIsolated(false);
    setIsPlaying(false);
    setGeneration(0);
    setPopA({ mean: STARTING_MEAN, food: 'seeds' });
    setPopB({ mean: STARTING_MEAN, food: 'seeds' });
    setSpeciationTestResult(null);
  };

  const handleTestSpeciation = () => {
    const diff = Math.abs(popA.mean - popB.mean);
    if (!isIsolated) {
      setSpeciationTestResult({ 
        status: "FAIL", 
        message: "Populations are not geographically isolated! Gene flow is still active." 
      });
      return;
    }
    
    if (diff > SPECIATION_THRESHOLD) {
      setSpeciationTestResult({ 
        status: "SUCCESS", 
        message: "SPECIATION OCCURRED! The beak sizes are too different. They no longer recognize each other as mates." 
      });
    } else {
      setSpeciationTestResult({ 
        status: "FAIL", 
        message: "No Speciation yet. The populations are still similar enough to interbreed." 
      });
    }
  };

  // --- Derived Data for Charts ---
  const chartData = useMemo(() => {
    return generateDistributionData(popA.mean, popB.mean, isIsolated);
  }, [popA.mean, popB.mean, isIsolated]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Allopatric Speciation Simulator
            </h1>
            <p className="text-slate-400 text-sm mt-1">HKDSE Biology • Evolution & Taxonomy</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 font-mono text-teal-400">
              Generation: {generation}
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-3 rounded-full transition-all ${
                isPlaying ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-emerald-500 hover:bg-emerald-600 text-slate-900'
              }`}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button 
              onClick={handleReset}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
            >
              <RefreshCw size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">

        {/* --- Educational Guide Panel --- */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <Info className="text-teal-400 shrink-0 mt-1" />
            <div className="text-slate-300 text-sm space-y-2">
              <p><strong className="text-white">Step 1:</strong> A single population exists. Gene flow is active.</p>
              <p><strong className="text-white">Step 2:</strong> Geographic Isolation creates a barrier (e.g., ocean channel).</p>
              <p><strong className="text-white">Step 3:</strong> Different environments (Food Sources) exert different selection pressures.</p>
              <p><strong className="text-white">Step 4:</strong> Natural selection shifts the average traits (Beak Size) over generations.</p>
              <p><strong className="text-white">Step 5:</strong> Eventually, the populations become so different they cannot mate (Speciation).</p>
            </div>
          </div>
        </section>

        {/* --- The Environment (Map) and Controls --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Island A Map & Controls */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-2xl -z-10" />
            <div className={`border-2 rounded-2xl p-6 transition-all duration-500 h-full ${
              isIsolated ? 'border-teal-500/30 bg-slate-800' : 'border-slate-600 bg-slate-800'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2">
                  <Bird size={20} /> Population A
                </h2>
                <div className="text-xs text-slate-400 font-mono">
                  Avg Beak: {popA.mean.toFixed(1)}mm
                </div>
              </div>

              {/* Island Visual Placeholder */}
              <div className="h-32 bg-slate-900/50 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative border border-slate-700/50">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="text-center z-10">
                  <span className="text-4xl block mb-2">{FOOD_SOURCES[popA.food].icon}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Island A</span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Selection Pressure (Food)</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(FOOD_SOURCES).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => setPopA({ ...popA, food: key })}
                      className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                        popA.food === key 
                          ? 'bg-slate-700 border-teal-500 text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.2)]' 
                          : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      {data.name}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 pt-2 px-1 italic">
                  Currently favoring: <span className="text-slate-200">{
                    popA.food === 'nuts' ? 'Large Beaks' : popA.food === 'insects' ? 'Small Beaks' : 'Average Beaks'
                  }</span>
                </p>
              </div>
            </div>
          </div>

          {/* Separation Barrier / Event Trigger */}
          <div className="absolute left-1/2 -ml-6 -mt-3 md:top-1/2 md:mt-24 z-20 flex flex-col items-center">
             {!isIsolated ? (
               <button 
                onClick={handleSplit}
                className="bg-red-500 hover:bg-red-600 text-white font-bold p-4 rounded-full shadow-lg hover:shadow-red-500/50 transition-all scale-110 active:scale-95 animate-pulse"
                title="Create Geographic Isolation"
               >
                 <Split size={32} />
               </button>
             ) : (
                <div className="bg-slate-900 border-2 border-red-500/50 text-red-400 px-4 py-2 rounded-lg font-mono text-sm font-bold shadow-xl flex flex-col items-center gap-1">
                  <div className="h-20 w-1 bg-red-500/20 absolute -top-24 md:block hidden"></div>
                  <span>BARRIER</span>
                  <span className="text-[10px] opacity-70">GENE FLOW BLOCKED</span>
                  <div className="h-20 w-1 bg-red-500/20 absolute -bottom-24 md:block hidden"></div>
                </div>
             )}
          </div>

          {/* Island B Map & Controls */}
          {isIsolated ? (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="relative group"
            >
               <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-indigo-500/10 rounded-2xl -z-10" />
              <div className="border-2 border-purple-500/30 rounded-2xl p-6 bg-slate-800 h-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                    <Bird size={20} /> Population B
                  </h2>
                   <div className="text-xs text-slate-400 font-mono">
                    Avg Beak: {popB.mean.toFixed(1)}mm
                  </div>
                </div>

                <div className="h-32 bg-slate-900/50 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative border border-slate-700/50">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <div className="text-center z-10">
                    <span className="text-4xl block mb-2">{FOOD_SOURCES[popB.food].icon}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Island B</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase text-slate-500 font-bold tracking-wider">Selection Pressure (Food)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(FOOD_SOURCES).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => setPopB({ ...popB, food: key })}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                          popB.food === key 
                            ? 'bg-slate-700 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                            : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'
                        }`}
                      >
                        {data.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 pt-2 px-1 italic">
                    Currently favoring: <span className="text-slate-200">{
                      popB.food === 'nuts' ? 'Large Beaks' : popB.food === 'insects' ? 'Small Beaks' : 'Average Beaks'
                    }</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/20 text-slate-500">
              <div className="text-center p-10">
                <Split size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Population Unified</p>
                <p className="text-sm opacity-60">Create geographic isolation to evolve Population B.</p>
              </div>
            </div>
          )}
        </div>

        {/* --- Data Visualization --- */}
        <section className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-xl">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-200">Beak Size Distribution (Gene Pool)</h2>
              <div className="flex gap-4 text-xs font-mono">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span className="text-teal-400">Pop A (Mean: {popA.mean.toFixed(0)})</span>
                 </div>
                 {isIsolated && (
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-400">Pop B (Mean: {popB.mean.toFixed(0)})</span>
                   </div>
                 )}
              </div>
           </div>
           
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPopA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPopB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="beakSize" 
                    stroke="#64748B" 
                    label={{ value: "Beak Size (Arbitrary Units)", position: 'insideBottom', offset: -5, fill: '#94A3B8' }} 
                  />
                  <YAxis hide />
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
                    itemStyle={{ color: '#F8FAFC' }}
                    labelFormatter={(label) => `Size: ${label}`}
                  />
                  <ReferenceLine x={50} stroke="#475569" strokeDasharray="3 3" label={{ value: 'Original Mean', position: 'top', fill: '#64748B', fontSize: 10 }} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="popA" 
                    stroke="#14B8A6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPopA)" 
                    name="Population A"
                    isAnimationActive={false} 
                  />
                  
                  {isIsolated && (
                    <Area 
                      type="monotone" 
                      dataKey="popB" 
                      stroke="#A855F7"
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorPopB)" 
                      name="Population B"
                      isAnimationActive={false}
                    />
                  )}
               </AreaChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-between text-xs text-slate-500 mt-2 px-8">
              <span>Small Beaks (Insect Eaters)</span>
              <span>Medium Beaks</span>
              <span>Large Beaks (Nut Eaters)</span>
           </div>
        </section>

        {/* --- Finale: Test Analysis --- */}
        <section className="flex flex-col items-center justify-center p-8 bg-slate-900 border-t border-slate-800 mt-8">
           <button
             onClick={handleTestSpeciation}
             disabled={!isIsolated}
             className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
               !isIsolated 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30'
             }`}
           >
             <TestTube size={24} />
             Test for Reproductive Isolation
           </button>

           <AnimatePresence>
             {speciationTestResult && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className={`mt-6 p-6 rounded-xl border-l-4 max-w-2xl w-full text-center shadow-2xl ${
                   speciationTestResult.status === 'SUCCESS' 
                    ? 'bg-emerald-900/30 border-emerald-500 text-emerald-200' 
                    : 'bg-rose-900/30 border-rose-500 text-rose-200'
                 }`}
               >
                 <h3 className={`text-xl font-bold mb-2 ${
                   speciationTestResult.status === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'
                 }`}>
                   {speciationTestResult.status === 'SUCCESS' ? 'Speciation Successful! 🎉' : 'Speciation Failed ❌'}
                 </h3>
                 <p className="text-lg">{speciationTestResult.message}</p>
                 {speciationTestResult.status === 'SUCCESS' && (
                   <p className="mt-4 text-sm opacity-80 bg-emerald-950/50 p-3 rounded inline-block">
                     The two populations have diverged enough genetically that they can no longer interbreed to produce fertile offspring. They are now distinct species.
                   </p>
                 )}
               </motion.div>
             )}
           </AnimatePresence>
        </section>

      </main>
    </div>
  );
};



export default App;
