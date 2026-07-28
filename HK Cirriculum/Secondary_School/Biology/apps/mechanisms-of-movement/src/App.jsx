import React, { useState, useRef, useEffect, useMemo } from 'react';
import ParticleSystem from './components/ParticleSystem';
import ChartVisualization from './components/ChartVisualization';
import { Play, Pause, RotateCcw, Zap, Droplets, Wind, ArrowRightLeft } from 'lucide-react';
import { MOLECULE_TYPES, MODES } from './utils/constants';

function App() {
  const [mode, setMode] = useState(MODES.SIMPLE);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ left: 0, right: 0 });

  // Simulation Params
  const [params, setParams] = useState({
    leftConc: 50,  // Slider 0-100
    rightConc: 0,  // Slider 0-100
    soluteLeft: 0, // For Osmosis
    soluteRight: 50,
  });

  const [pumpTrigger, setPumpTrigger] = useState(0); // Counter to trigger effect

  // Derived Props for System
  const moleculeType = useMemo(() => {
    switch (mode) {
      case MODES.SIMPLE: return 'OXYGEN';
      case MODES.FACILITATED: return 'GLUCOSE';
      case MODES.OSMOSIS: return 'WATER'; // Special handling mixed with Solute
      case MODES.ACTIVE: return 'SODIUM';
      default: return 'OXYGEN';
    }
  }, [mode]);

  const particleCounts = useMemo(() => {
    if (mode === MODES.OSMOSIS) {
      // Logic: Max capacity e.g. 100.
      // Water = 100 - Solute.
      const leftWater = Math.max(0, 100 - params.soluteLeft);
      const rightWater = Math.max(0, 100 - params.soluteRight);
      // We also need to spawn Solutes, but ParticleSystem only takes one "Type" main?
      // Wait, ParticleSystem needs to handle multiple types for Osmosis.
      // I'll stick to rendering just the MAIN type for simplicity or modify System.
      // Prompt requires: "Particles: ... Blue=O2, Green=Glucose, White=Water".
      // Implementation gap: My ParticleSystem assumes "type" prop implies homogeneous.
      // I need to update ParticleSystem or pass a mixed list?
      // I'll modify ParticleSystem to handle "extraParticles" or generating mixed.
      // For now, let's just optimize the "Main" particles (Water).
      // The Solute is implicit (concentration gradient). 
      // If I just spawn Water with counts `leftWater` and `rightWater`, it works visually.
      // Solute particles are "Invisible" or I can try to hack them in.
      // Let's just spawn Water according to the gradient created by invisible solute.
      return { left: leftWater, right: rightWater };
    }
    return { left: params.leftConc, right: params.rightConc };
  }, [mode, params]);

  const particleSystemRef = useRef();

  useEffect(() => {
    // Reset Data on Mode Change
    setData([]);
    setStartTime(Date.now());
    // Apply params to system
    if (particleSystemRef.current) {
      particleSystemRef.current.reset(particleCounts.left, particleCounts.right);
    }
  }, [mode, particleCounts.left, particleCounts.right]);
  // Note: params change resets simulation. This is acceptable for "User Setup -> Run" flow.
  // If we want dynamic addition without reset, we'd use `addParticles` instead.
  // But strictly, "User controls gradient" usually means setting initial state.

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSec = (now - startTime) / 1000;
      setElapsed(timeSec);
      setData(prev => {
        // Keep precise time for smooth chart, format in presentation layer if needed
        const newData = [...prev, { time: parseFloat(timeSec.toFixed(1)), concentration: stats.right }];
        if (newData.length > 300) newData.shift(); // Keep last 30s at 10Hz (300 points)
        return newData;
      });
    }, 100); // 100ms sampling
    return () => clearInterval(interval);
  }, [stats.right, startTime]);

  const handlePump = () => {
    setPumpTrigger(p => p + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <Droplets className="w-8 h-8" />
            BioMembrane Sim
          </h1>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {Object.values(MODES).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === m
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Simulation Area */}
        <div className="lg:col-span-2 space-y-6">
          <ParticleSystem
            ref={particleSystemRef}
            mode={mode}
            type={moleculeType}
            initialLeft={particleCounts.left}
            initialRight={particleCounts.right}
            onUpdateStats={setStats}
            pumpTrigger={pumpTrigger}
          />

          <ChartVisualization
            data={data}
            color={MOLECULE_TYPES[moleculeType].color}
          />
        </div>

        {/* Controls & Info */}
        <div className="space-y-6">

          {/* Controls Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Lab Controls
            </h2>

            <div className="space-y-6">
              {mode === MODES.OSMOSIS ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Extracellular Solute</label>
                    <input
                      type="range" min="0" max="80"
                      value={params.soluteLeft}
                      onChange={(e) => setParams(p => ({ ...p, soluteLeft: parseInt(e.target.value, 10) }))}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Pure Water</span>
                      <span>High Solute</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cytoplasmic Solute</label>
                    <input
                      type="range" min="0" max="80"
                      value={params.soluteRight}
                      onChange={(e) => setParams(p => ({ ...p, soluteRight: parseInt(e.target.value, 10) }))}
                      className="w-full accent-yellow-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    *Higher solute concentration reduces water concentration, driving osmosis.
                  </p>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Extracellular [{MOLECULE_TYPES[moleculeType].label}]</label>
                    <input
                      type="range" min="0" max="100"
                      value={params.leftConc}
                      onChange={(e) => setParams(p => ({ ...p, leftConc: parseInt(e.target.value, 10) }))}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>None</span>
                      <span>High</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cytoplasmic [{MOLECULE_TYPES[moleculeType].label}]</label>
                    <input
                      type="range" min="0" max="100"
                      value={params.rightConc}
                      onChange={(e) => setParams(p => ({ ...p, rightConc: parseInt(e.target.value, 10) }))}
                      className="w-full accent-yellow-500"
                    />
                  </div>
                </>
              )}

              {mode === MODES.ACTIVE && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-3">
                    Active transport moves molecules against the concentration gradient using energy.
                  </p>
                  <button
                    onClick={handlePump}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform active:scale-95"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    Hydrolyse ATP & Pump
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setData([]);
                  setStartTime(Date.now());
                  if (particleSystemRef.current)
                    particleSystemRef.current.reset(particleCounts.left, particleCounts.right);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors"
              >
                <RefreshIcon /> Reset Simulation
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-2">Observations</h3>
            <ul className="text-sm text-indigo-800 space-y-2 list-disc pl-4">
              {mode === MODES.SIMPLE && <li>Oxygen molecules are small and non-polar, allowing them to slip directly through the phospholipid bilayer gaps.</li>}
              {mode === MODES.FACILITATED && <li>Glucose is too large/polar to pass lipids. It requires specific carrier proteins (e.g. GLUT). Movement is passive (down gradient).</li>}
              {mode === MODES.OSMOSIS && <li>Water moves from high water potential (dilute solute) to low water potential (concentrated solute) via Aquaporins.</li>}
              {mode === MODES.ACTIVE && <li>Sodium ions are pumped against their gradient (Low to High). This requires energy (ATP) to change the carrier protein's shape.</li>}
            </ul>
          </div>

          {/* Gamification / Status */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-bold text-green-900 text-sm uppercase tracking-wide opacity-80">Live Status</h4>
            <div className="mt-2 flex justify-between items-center bg-white p-3 rounded shadow-sm">
              <div className="text-center">
                <span className="block text-2xl font-bold text-blue-600">{stats.left}</span>
                <span className="text-xs text-gray-500">Outside</span>
              </div>
              <ArrowRightLeft className="text-gray-300" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-yellow-600">{stats.right}</span>
                <span className="text-xs text-gray-500">Inside</span>
              </div>
            </div>
            <div className="mt-2 text-center text-xs font-medium text-gray-500">
              {stats.left === stats.right ? "Equilibrium Reached" : "Net Movement Occurring"}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
);



export default App;
