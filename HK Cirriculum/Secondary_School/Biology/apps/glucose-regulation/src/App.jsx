import React, { useState, useEffect, useRef } from 'react';
import OrganMap from './components/OrganMap';
import GlucoseChart from './components/GlucoseChart';
import { Play, Pause, RefreshCw, Plus, Activity, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

function App() {
  // --- State ---
  const [isPlaying, setIsPlaying] = useState(true);
  const [condition, setCondition] = useState('HEALTHY'); // HEALTHY, TYPE_1, TYPE_2

  // Physiological State
  const [glucose, setGlucose] = useState(90); // mg/dL
  const [insulin, setInsulin] = useState(0); // arbitrary units 0-100
  const [glucagon, setGlucagon] = useState(0); // arbitrary units 0-100
  const [glycogen, setGlycogen] = useState(100); // arbitrary units 0-200

  const [time, setTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);

  // --- Constants ---
  const BASAL_UPTAKE = 0.2; // Glucose consumed by body at rest
  const EXERCISE_UPTAKE = 4.0;
  const MEAL_GLUCOSE_SPIKE = 60;

  // Simulation Loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        tick();
      }, 500); // 2 ticks per second
    }
    return () => clearInterval(interval);
  }, [isPlaying, glucose, insulin, glucagon, glycogen, condition]);

  const tick = () => {
    setTime(t => t + 1);

    // 1. Calculate Deltas
    let newGlucose = glucose;
    let newInsulin = insulin;
    let newGlucagon = glucagon;
    let newGlycogen = glycogen;

    // --- Hormonal Response Logic ---
    // Pancreas Sensing
    if (glucose > 100) {
      // High Glucose -> Produce Insulin
      let production = (glucose - 90) * 0.2;
      if (condition === 'TYPE_1') production = 0; // Beta cells destroyed
      newInsulin = Math.min(newInsulin + production, 100);
      newGlucagon = Math.max(newGlucagon - 2, 0); // Suppress Glucagon
    } else if (glucose < 80) {
      // Low Glucose -> Produce Glucagon
      let production = (80 - glucose) * 0.2;
      newGlucagon = Math.min(newGlucagon + production, 100);
      newInsulin = Math.max(newInsulin - 2, 0); // Suppress Insulin
    } else {
      // Easing back to baseline
      newInsulin = Math.max(newInsulin - 1, 0);
      newGlucagon = Math.max(newGlucagon - 1, 0);
    }

    // --- Effects Logic ---

    // Insulin Effect: Increases Uptake and Glycogenesis
    let insulinSensitivity = 1.0;
    if (condition === 'TYPE_2') insulinSensitivity = 0.2; // Resistance

    const insulinEffect = newInsulin * 0.15 * insulinSensitivity;

    if (insulinEffect > 0.1) {
      // Effect 1: Glycogenesis (Glucose -> Glycogen)
      const storageAmount = insulinEffect * 0.5;
      if (newGlycogen < 200) {
        newGlucose -= storageAmount;
        newGlycogen += storageAmount;
      }

      // Effect 2: Cellular Uptake (Glucose -> Energy/Burn)
      newGlucose -= insulinEffect * 0.5;
    }

    // Glucagon Effect: Glycogenolysis
    const glucagonEffect = newGlucagon * 0.15;
    if (glucagonEffect > 0.1 && newGlycogen > 0) {
      // Glycogen -> Glucose
      newGlucose += glucagonEffect;
      newGlycogen -= glucagonEffect;
    }

    // Basal Metabolic Rate
    newGlucose -= BASAL_UPTAKE;

    // Clamping
    newGlucose = Math.max(newGlucose, 20); // Death threshold?
    newGlycogen = Math.max(0, Math.min(newGlycogen, 200));

    // Update State
    setGlucose(newGlucose);
    setInsulin(newInsulin);
    setGlucagon(newGlucagon);
    setGlycogen(newGlycogen);

    // Update History
    setHistory(prev => {
      const newHistory = [...prev, { time, glucose: newGlucose, insulin: newInsulin, glucagon: newGlucagon }];
      if (newHistory.length > 60) newHistory.shift();
      return newHistory;
    });

    // Annotations
    if (newGlucose > 140 && glucose <= 140) addMessage("Hyperglycemia detected! Beta cells working hard.");
    if (newGlucose < 60 && glucose >= 60) addMessage("Hypoglycemia! Alpha cells releasing Glucagon.");
    if (newInsulin > 20 && insulin <= 20 && condition !== 'TYPE_1') addMessage("Insulin surging: Promoting Glucose Uptake.");
    if (newGlucagon > 20 && glucagon <= 20) addMessage("Glucagon surging: Converting Glycogen to Glucose.");
  };

  const addMessage = (msg) => {
    const id = Date.now();
    setMessages(prev => [...prev.slice(-2), { id, text: msg }]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== id));
    }, 4000);
  };

  // Actions
  const handleEat = () => {
    setGlucose(prev => prev + MEAL_GLUCOSE_SPIKE);
    addMessage("Meal Eaten: Blood Glucose Spiking!");
  };

  const handleExercise = () => {
    // Immediate usage
    setGlucose(prev => Math.max(prev - 20, 40));
    addMessage("Exercising: Muscles burning glucose rapidly.");
  };

  const reset = () => {
    setGlucose(90);
    setInsulin(0);
    setGlucagon(0);
    setGlycogen(100);
    setHistory([]);
    setTime(0);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-inter">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Blood Glucose Regulation
          </h1>
          <p className="text-slate-400 text-sm">Negative Feedback & Homeostasis Simulation</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCondition('HEALTHY')}
            className={clsx("px-4 py-2 rounded-full text-sm font-semibold transition-all", condition === 'HEALTHY' ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-slate-800 text-slate-400")}
          >
            Healthy
          </button>
          <button
            onClick={() => setCondition('TYPE_1')}
            className={clsx("px-4 py-2 rounded-full text-sm font-semibold transition-all", condition === 'TYPE_1' ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-slate-800 text-slate-400")}
          >
            Type 1 Diabetes
          </button>
          <button
            onClick={() => setCondition('TYPE_2')}
            className={clsx("px-4 py-2 rounded-full text-sm font-semibold transition-all", condition === 'TYPE_2' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-slate-800 text-slate-400")}
          >
            Type 2 Diabetes
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Visuals & Graph (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Visual Dashboard */}
          <OrganMap
            glucose={glucose}
            insulin={insulin}
            glucagon={glucagon}
            glycogen={glycogen}
            condition={condition}
          />

          {/* Graph */}
          <div className="h-64">
            <GlucoseChart data={history} />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              label="Blood Glucose"
              value={glucose.toFixed(0)}
              unit="mg/dL"
              color={glucose > 110 ? 'text-red-400' : glucose < 70 ? 'text-orange-400' : 'text-green-400'}
            />
            <StatCard
              label="Active Hormone"
              value={insulin > glucagon ? 'INSULIN' : glucagon > insulin ? 'GLUCAGON' : 'BALANCED'}
              unit=""
              color={insulin > glucagon ? 'text-[#457B9D]' : glucagon > insulin ? 'text-[#F4A261]' : 'text-slate-400'}
            />
            <StatCard
              label="Liver Glycogen"
              value={glycogen.toFixed(0)}
              unit="units"
              color="text-[#8D5524]"
            />
          </div>
        </div>

        {/* Right Column: Controls & Info (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Actions Panel */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity size={20} className="text-blue-400" /> Actions
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={handleEat}
                className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all group border border-slate-600 hover:border-white"
              >
                <span className="font-semibold text-lg">Eat Meal</span>
                <div className="bg-white text-slate-900 px-2 py-1 rounded text-xs font-bold font-mono group-hover:scale-110 transition-transform">
                  + GLUCOSE
                </div>
              </button>

              <button
                onClick={handleExercise}
                className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all group border border-slate-600 hover:border-orange-400"
              >
                <span className="font-semibold text-lg">Exercise</span>
                <div className="bg-orange-400 text-slate-900 px-2 py-1 rounded text-xs font-bold font-mono group-hover:scale-110 transition-transform">
                  - GLUCOSE
                </div>
              </button>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 py-3 bg-slate-900 rounded-lg border border-slate-600 flex justify-center items-center hover:bg-slate-950"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={reset}
                className="flex-1 py-3 bg-slate-900 rounded-lg border border-slate-600 flex justify-center items-center hover:bg-slate-950"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          {/* Explanation / Legend Panel */}
          <div className="flex-1 bg-slate-800 rounded-2xl p-6 border border-slate-700 overflow-y-auto max-h-[400px]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-purple-400" /> Mechanism Info
            </h2>

            <div className="space-y-4 text-sm text-slate-300">
              <InfoBlock title="Hyperglycemia (e.g. fasting &gt;126 mg/dL)" color="border-red-500">
                Beta cells in Pancreas release <span className="text-[#457B9D] font-bold">Insulin</span>. Causes Liver to store glucose as Glycogen and cells to uptake glucose.
              </InfoBlock>

              <InfoBlock title="Hypoglycemia (<70 mg/dL)" color="border-orange-500">
                Alpha cells release <span className="text-[#F4A261] font-bold">Glucagon</span>. Causes Liver to break down Glycogen into Glucose.
              </InfoBlock>

              <InfoBlock title="Type 1 Diabetes" color="border-blue-500">
                Beta cells are destroyed. No Insulin is produced even when glucose is high.
              </InfoBlock>

              <InfoBlock title="Type 2 Diabetes" color="border-yellow-500">
                Insulin is produced, but target cells (Liver/Muscle) have low sensitivity to it.
              </InfoBlock>
            </div>
          </div>

        </div>

      </main>

      {/* Floating Notifications */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2 pointer-events-none z-50">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-xl text-sm max-w-sm text-white"
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

const StatCard = ({ label, value, unit, color }) => (
  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{label}</div>
    <div className={clsx("text-3xl font-black font-mono", color)}>
      {value} <span className="text-xs text-slate-500 ml-1 font-normal">{unit}</span>
    </div>
  </div>
);

const InfoBlock = ({ title, children, color }) => (
  <div className={`p-3 rounded bg-slate-900/50 border-l-2 ${color}`}>
    <div className="font-bold text-slate-200 mb-1">{title}</div>
    <div className="leading-relaxed opacity-80">{children}</div>
    </div>
);



export default App;
