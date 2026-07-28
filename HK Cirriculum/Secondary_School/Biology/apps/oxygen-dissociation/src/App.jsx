import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import { Activity, Droplets, Wind, Settings2, Info, HeartPulse } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility Functions ---

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Hill Equation simplified for educational purposes
// P50_std = 26.6 mmHg at pH 7.4, pCO2 40
const P50_STD = 26.6;
const HILL_COEFF = 2.7;

const calculateP50 = (ph, pco2) => {
  // Bohr Effect approximations
  // pH effect: lower pH -> higher P50 (Right shift)
  // log(P50) changes by approx -0.48 per pH unit
  const phFactor = Math.pow(10, 0.48 * (7.4 - ph));

  // pCO2 effect: higher pCO2 -> higher P50 (Right shift) via Carbamino and H+
  // Simplified linear scaler for the range
  const co2Factor = 1 + (pco2 - 40) * 0.005;

  return P50_STD * phFactor * co2Factor;
};

const hillEquation = (pO2, p50, n = HILL_COEFF) => {
  if (pO2 === 0) return 0;
  const p = Math.pow(pO2, n);
  const p50n = Math.pow(p50, n);
  return (p / (p + p50n)) * 100;
};

// --- Components ---

const HemoglobinVisual = ({ saturation, pO2 }) => {
  // 4 subunits.
  // We fill them based on saturation chunks: 0-25, 25-50, 50-75, 75-100
  // Or just color interp.
  // User asked for "Subunits fill up with O2 molecules sequentially"

  const subunits = [1, 2, 3, 4].map((i) => {
    // Threshold for this subunit to be oxygenated
    // Simple model: linear probabilistic or threshold based
    // Lets use threshold: 25%, 50%, 75%, 90%
    const threshold = (i - 1) * 25 + 10;
    const isBound = saturation > threshold;
    return isBound;
  });

  // Dynamic Color
  // Dark Red (deoxy) to Bright Red (oxy)
  const redIntensity = 100 + (saturation / 100) * 155; // 100 to 255
  const color = `rgb(${redIntensity}, 0, 0)`;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-rose-500" />
        Hemoglobin View
      </h3>

      <div className="relative w-48 h-48 flex items-center justify-center animate-pulse-slow">
        {/* RBC Background */}
        <div
          className="absolute inset-0 rounded-full opacity-30 transition-colors duration-300"
          style={{ backgroundColor: color, boxShadow: `0 0 50px ${color}` }}
        />

        {/* Hb Molecule - Tetramer */}
        <div className="grid grid-cols-2 gap-2 relative z-10">
          {subunits.map((bound, idx) => (
            <div
              key={idx}
              className={cn(
                "w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                bound
                  ? "bg-rose-500 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.6)] scale-105"
                  : "bg-slate-700/80 border-slate-600 scale-95"
              )}
            >
              {bound ? (
                <div className="text-white font-bold text-xs animate-in zoom-in">O₂</div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-500/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center space-y-1">
        <div className="text-3xl font-bold font-mono text-rose-400">
          {saturation.toFixed(1)}%
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Saturation</div>
        <div className="text-sm text-slate-300 mt-2">
          pO₂: <span className="text-blue-300 font-mono">{pO2.toFixed(0)} mmHg</span>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-md text-xs">
        <p className="label font-bold text-slate-200 mb-1">pO₂: {label} mmHg</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color }} className="font-mono">
            {entry.name}: {Number(entry.value).toFixed(1)}%
          </p>
        ))}
        {data.tissueRelease && (
          <div className="mt-2 pt-2 border-t border-slate-700 text-emerald-400">
            Release @ Tissue: +{data.tissueRelease}%
          </div>
        )}
      </div>
    );
  }
  return null;
};

// --- Main App ---

function App() {
  // State
  const [ph, setPh] = useState(7.4);
  const [pco2, setPco2] = useState(40);
  const [showFetal, setShowFetal] = useState(false);
  const [showMyoglobin, setShowMyoglobin] = useState(false);
  const [hoverData, setHoverData] = useState({ pO2: 100, sat: 97.5 });

  // Reset function
  const reset = () => {
    setPh(7.4);
    setPco2(40);
  };

  // Derived Values
  const p50 = useMemo(() => calculateP50(ph, pco2), [ph, pco2]);
  const isRightShift = p50 > P50_STD + 0.5;
  const isLeftShift = p50 < P50_STD - 0.5;

  // Generate Graph Data
  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 110; x += 2) {
      const normalSat = hillEquation(x, P50_STD);
      const currentSat = hillEquation(x, p50);

      // Calculate extra release at tissue level (40 mmHg)
      // Normal saturation at 40 is approx 75%.
      // If curve shifts right, sat at 40 drops (e.g. to 60%).
      // Release increases by (NormalSat - CurrentSat).
      // We only care about this difference at x approx 40.
      // But for the tooltip we can compute difference everywhere or just specifically.

      let tissueRelease = null;
      if (Math.abs(x - 40) < 3 && isRightShift) {
        tissueRelease = (normalSat - currentSat).toFixed(1);
      }

      points.push({
        pO2: x,
        Standard: normalSat,
        Current: currentSat,
        Fetal: showFetal ? hillEquation(x, 19) : null, // Fetal P50 approx 19-20
        Myoglobin: showMyoglobin ? (x / (x + 2.8)) * 100 : null, // Hyperbolic, P50 very low ~2.8
        tissueRelease,
      });
    }
    return points;
  }, [p50, showFetal, showMyoglobin, isRightShift]);

  // Handle Graph Hover
  const handleMouseMove = (e) => {
    if (e.activePayload) {
      const pO2 = e.activeLabel;
      const sat = e.activePayload.find(p => p.dataKey === "Current")?.value || 0;
      setHoverData({ pO2, sat });
    }
  };

  // Calculations for Text Feedback
  const satAtLungs = hillEquation(100, p50); // Lungs
  const satAtRest = hillEquation(40, p50);   // Resting Tissue
  const satAtExercise = hillEquation(20, p50); // Active Muscle

  const normalSatAtRest = hillEquation(40, P50_STD);
  const extraRelease = (normalSatAtRest - satAtRest); // Positive if Right Shift

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30">

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 p-2 rounded-lg shadow-lg shadow-rose-900/20">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-200">
              OxyDissociation
            </h1>
            <p className="text-xs text-slate-400">HKDSE Biology • Gas Exchange & Transport</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {isRightShift && (
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full flex items-center gap-2 animate-in fade-in">
              <Info className="w-4 h-4" /> Bohr Effect Active: Right Shift
            </span>
          )}
          <button onClick={reset} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded transition-colors text-slate-300">
            Reset Defaults
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">

        {/* Left Column: Graph (8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-4 md:p-6 h-[500px] flex flex-col relative">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Oxygen Dissociation Curve
            </h2>

            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoverData({ pO2: 100, sat: satAtLungs })}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="pO2"
                    label={{ value: 'Partial Pressure of O₂ (pO₂) / mmHg', position: 'bottom', offset: 0, fill: '#94a3b8' }}
                    stroke="#94a3b8"
                    domain={[0, 110]}
                  />
                  <YAxis
                    label={{ value: '% Saturation', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                    stroke="#94a3b8"
                    domain={[0, 105]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />

                  {/* Reference Lines */}
                  <ReferenceLine x={100} stroke="#475569" strokeDasharray="3 3" label={{ value: 'Lungs', fill: '#64748b', fontSize: 12 }} />
                  <ReferenceLine x={40} stroke="#475569" strokeDasharray="3 3" label={{ value: 'Tissue', fill: '#64748b', fontSize: 12 }} />
                  <ReferenceLine x={20} stroke="#475569" strokeDasharray="3 3" label={{ value: 'Muscle', fill: '#64748b', fontSize: 12 }} />

                  {/* Lines */}
                  <Line
                    type="monotone"
                    dataKey="Standard"
                    stroke="#64748b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Standard (pH 7.4)"
                    activeDot={false}
                  />

                  {showFetal && (
                    <Line
                      type="monotone"
                      dataKey="Fetal"
                      stroke="#fb7185" // Rose 400
                      strokeWidth={2}
                      dot={false}
                      name="Fetal Hemoglobin"
                    />
                  )}

                  {showMyoglobin && (
                    <Line
                      type="monotone"
                      dataKey="Myoglobin"
                      stroke="#818cf8" // Indigo 400
                      strokeWidth={2}
                      dot={false}
                      name="Myoglobin"
                    />
                  )}

                  <Line
                    type="monotone"
                    dataKey="Current"
                    stroke="#f43f5e" // Rose 500
                    strokeWidth={4}
                    dot={false}
                    name="Current Hb"
                    animationDuration={300}
                    activeDot={{ r: 8, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }}
                  />

                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* In-Graph Instructions */}
            <div className="absolute top-6 right-6 text-xs text-slate-500 bg-slate-900/80 p-2 rounded backdrop-blur border border-slate-700 pointer-events-none">
              Hover over graph to visualize saturation
            </div>
          </div>

          {/* Stats Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Saturation at Lungs (100 mmHg)"
              value={`${satAtLungs.toFixed(1)}%`}
              subtext="Full Loading"
              icon={<Wind className="w-4 h-4 text-emerald-400" />}
            />
            <StatCard
              label="Saturation at Tissues (40 mmHg)"
              value={`${satAtRest.toFixed(1)}%`}
              subtext="Unloading Zone"
              icon={<Activity className="w-4 h-4 text-amber-400" />}
            />
            <StatCard
              label="Bohr Effect Boost"
              value={extraRelease > 0.5 ? `+${extraRelease.toFixed(1)}%` : 'Active'}
              subtext="Extra O₂ Released"
              highlight={extraRelease > 0.5}
              icon={<Droplets className="w-4 h-4 text-rose-400" />}
            />
          </div>
        </section>

        {/* Right Column: Controls & Visual (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">

          {/* Molecule Visual */}
          <HemoglobinVisual saturation={hoverData.sat} pO2={hoverData.pO2} />

          {/* Controls */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-amber-400" />
              Physiology Controller
            </h3>

            <div className="space-y-8">
              {/* pH Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300">Blood pH</label>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-mono font-bold",
                    ph < 7.35 ? "bg-red-500/20 text-red-400" : ph > 7.45 ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"
                  )}>
                    {ph}
                  </span>
                </div>
                <input
                  type="range"
                  min="7.2"
                  max="7.6"
                  step="0.05"
                  value={ph}
                  onChange={(e) => setPh(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400 transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  <span>Acidic (7.2)</span>
                  <span>Normal (7.4)</span>
                  <span>Alkaline (7.6)</span>
                </div>
              </div>

              {/* pCO2 Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300">pCO₂ Level</label>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-700 text-slate-300">
                    {pco2} mmHg
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={pco2}
                  onChange={(e) => setPco2(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  <span>Low (Hypo)</span>
                  <span>Normal</span>
                  <span>High (Hyper)</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-slate-700/50 space-y-3">
                <label className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Show Fetal Hemoglobin</span>
                  <input
                    type="checkbox"
                    checked={showFetal}
                    onChange={(e) => setShowFetal(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-rose-500 focus:ring-rose-500/50"
                  />
                </label>
                <label className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Show Myoglobin</span>
                  <input
                    type="checkbox"
                    checked={showMyoglobin}
                    onChange={(e) => setShowMyoglobin(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-rose-500 focus:ring-rose-500/50"
                  />
                </label>
              </div>

            </div>
          </div>

          {/* Educational Note */}
          <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200">
            <h4 className="font-semibold text-blue-100 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Did you know?
            </h4>
            <p className="opacity-80">
              The Bohr effect allows hemoglobin to release more oxygen in metabolically active tissues where CO₂ and H⁺ concentrations are high (lower pH).
            </p>
          </div>

        </aside>

      </main>

      {/* Footer */}

      <Footer />
      <VisitCounter />
    </div>
  );
}

// Subcomponent for Stats
const StatCard = ({ label, value, subtext, icon, highlight }) => (
  <div className={cn(
    "p-4 rounded-xl border transition-all duration-300",
    highlight
      ? "bg-rose-500/10 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
      : "bg-slate-800/40 border-slate-700/50"
  )}>
    <div className="flex items-start justify-between">
      <div>
        <div className="text-xs text-slate-400 mb-1">{label}</div>
        <div className="text-2xl font-bold text-slate-100 tracking-tight">{value}</div>
        <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{subtext}</div>
      </div>
      <div className={cn("p-2 rounded-lg", highlight ? "bg-rose-500/20" : "bg-slate-700/30")}>
        {icon}
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="mt-12 text-center text-white/40 text-sm z-10 p-4">
      <p className="italic mb-1">But God made the earth by his power; he founded the world by his wisdom and stretched out the heavens by his understanding. Jeremiah 10:12</p>
      <p className="text-xs mb-1 mt-2">「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」 耶利米書 10:12</p>
      <p className="text-xs mt-2 pt-2 border-t border-white/10">@ 2025 Generated by Gemini 3.0 Prepared by SF Lau</p>
  </footer>
);

const VisitCounter = () => {
  const [visits, setVisits] = React.useState(0);
  React.useEffect(() => {
    const key = window.location.pathname.replace(/\//g, '_') || 'home';
    fetch(`https://api.countapi.xyz/hit/keithsflau-profile/${key}`)
      .then(res => res.json())
      .then(data => setVisits(data.value))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="fixed bottom-2 right-2 text-[10px] text-white/20 pointer-events-none z-50">
      Visits: {visits}
    </div>
  );
};

export default App;
