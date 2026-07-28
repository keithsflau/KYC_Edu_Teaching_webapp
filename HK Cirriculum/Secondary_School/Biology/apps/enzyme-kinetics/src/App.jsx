import React, { useState, useEffect } from 'react';
import { ReactionChamber } from './components/ReactionChamber';
import { ControlDashboard } from './components/ControlDashboard';
import { AnalyticsGraph } from './components/AnalyticsGraph';
import { FlaskConical, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [temperature, setTemperature] = useState(37);
  const [pH, setPH] = useState(7);
  const [substrateConc, setSubstrateConc] = useState(20);
  const [inhibitorType, setInhibitorType] = useState('none');
  const [isPlaying, setIsPlaying] = useState(true);

  const [stats, setStats] = useState({ reactions: 0 });
  const [rate, setRate] = useState(0);
  const [lastReactions, setLastReactions] = useState(0);

  const [traceMode, setTraceMode] = useState(false);
  const [traceData, setTraceData] = useState([]);
  const [traceVariable, setTraceVariable] = useState('Temperature'); // Temperature, pH, Substrate

  const [popupMessage, setPopupMessage] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  // Rate Calculation Loop (1s window approx)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentReactions = stats.reactions;
      const newReactions = currentReactions - lastReactions;
      setRate(newReactions);
      setLastReactions(currentReactions);

      // Add to trace if active
      if (traceMode && isPlaying) {
        let xVal = 0;
        if (traceVariable === 'Temperature') xVal = temperature;
        else if (traceVariable === 'pH') xVal = pH;
        else xVal = substrateConc;

        // Debounce: don't add duplicate x close together?
        // Actually we want to see the curve as we sweep.
        setTraceData(prev => {
          // Avoid clutter: only add if x is sufficiently different from last point
          const last = prev[prev.length - 1];
          if (last && Math.abs(last.x - xVal) < (traceVariable === 'pH' ? 0.1 : 1)) {
            return prev;
          }
          return [...prev, { x: xVal, y: newReactions }];
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [stats.reactions, lastReactions, traceMode, isPlaying, temperature, pH, substrateConc, traceVariable]);

  const handleEvent = (msg) => {
    // Throttle messages
    if (Math.random() < 0.3) {
      setPopupMessage(msg);
      setTimeout(() => setPopupMessage(null), 2000);
    }
  };

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setStats({ reactions: 0 });
    setLastReactions(0);
    setTraceData([]);
    setTemperature(37);
    setPH(7);
    setSubstrateConc(20);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <FlaskConical size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Enzyme Kinetics Simulator</h1>
            <p className="text-xs text-slate-500">HKDSE Biology • Interactive Lab</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex flex-col items-end">
            <span className="text-xs text-blue-500 uppercase font-bold tracking-wider">Reaction Rate</span>
            <span className="text-xl font-mono font-bold text-blue-700">{rate} <span className="text-sm">prod/sec</span></span>
          </div>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Github size={20} />
          </a>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Simulation (8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
            {/* Reaction Chamber */}
            <ReactionChamber
              key={resetKey}
              temperature={temperature}
              pH={pH}
              substrateConcentration={substrateConc}
              inhibitorType={inhibitorType}
              isPlaying={isPlaying}
              onStatsUpdate={(s) => setStats(s)}
              onEvent={handleEvent}
            />

            {/* Overlays / Popups */}
            <AnimatePresence>
              {popupMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-xl pointer-events-none"
                >
                  {popupMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Analytics Section */}
          <div className="h-[350px]">
            <AnalyticsGraph
              data={traceData}
              variableLabel={traceVariable}
            />
          </div>
        </div>

        {/* Right Column: Controls (4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ControlDashboard
            temperature={temperature} setTemperature={setTemperature}
            pH={pH} setPH={setPH}
            substrateConc={substrateConc} setSubstrateConc={setSubstrateConc}
            inhibitorType={inhibitorType} setInhibitorType={setInhibitorType}
            isPlaying={isPlaying} setIsPlaying={setIsPlaying}
            onReset={handleReset}
          />

          {/* Graph Controls */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
              Graph Configuration
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Trace Mode</span>
                <button
                  onClick={() => {
                    setTraceMode(!traceMode);
                    if (!traceMode) setTraceData([]); // Clear on start
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${traceMode ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${traceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {traceMode && (
                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                  <strong>Active:</strong> Plotting Reaction Rate vs {traceVariable}. Slowly adjust the {traceVariable} slider to build the curve.
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-500">X-Axis Variable</span>
                <div className="flex gap-2">
                  {['Temperature', 'pH', 'Concentration'].map(v => (
                    <button
                      key={v}
                      onClick={() => {
                        setTraceVariable(v);
                        setTraceData([]); // Reset Data on switch
                      }}
                      className={`flex-1 py-1.5 text-xs rounded-md border transition-all
                                        ${traceVariable === v
                          ? 'bg-blue-100 text-blue-700 border-blue-200 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }
                                    `}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h4 className="text-sm font-bold text-amber-900 mb-2">Instructions</h4>
            <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
              <li>Set <strong>Trace Mode</strong> to ON.</li>
              <li>Choose a variable (e.g., Temperature).</li>
              <li>Adjust the slider <em>slowly</em> from min to max.</li>
              <li>Observe the pattern (e.g., Bell Curve).</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}



export default App;
