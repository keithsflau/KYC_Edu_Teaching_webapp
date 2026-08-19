
import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';

// --- Data Generation ---

const generateCycleData = () => {
  const data = [];
  for (let day = 1; day <= 28; day++) {
    let fsh, lh, estrogen, progesterone;

    // Approximated curves based on standard hormonal profiles
    if (day <= 14) {
      // Follicular Phase
      // FSH: Dip then slight rise
      fsh = 30 - 15 * Math.sin((day / 14) * Math.PI) + (day === 14 ? 20 : 0);
      
      // LH: Low then SURGE
      lh = 10;
      if (day >= 12 && day <= 14) lh = 10 + 80 * Math.exp(-0.5 * Math.pow((day - 13.5) / 0.5, 2));

      // Estrogen: Rises to peak at day 12-13
      estrogen = 20 + 70 * Math.exp(-0.5 * Math.pow((day - 12) / 2.5, 2));

      // Progesterone: Low
      progesterone = 5;

    } else {
      // Luteal Phase
      // FSH: Low then rise at end
      fsh = 15 + 15 * Math.pow((day - 20) / 8, 2) * 0.5;

      // LH: Low
      lh = 10;

      // Estrogen: Secondary mound
      estrogen = 30 + 30 * Math.sin(((day - 14) / 14) * Math.PI);

      // Progesterone: RISE and fall
      progesterone = 5 + 85 * Math.sin(((day - 14) / 14) * Math.PI);
    }

    // Smoothing/Clamping
    fsh = Math.max(5, Math.min(100, fsh));
    lh = Math.max(5, Math.min(100, lh));
    estrogen = Math.max(5, Math.min(100, estrogen));
    progesterone = Math.max(5, Math.min(100, progesterone));

    data.push({ day, fsh, lh, estrogen, progesterone });
  }
  return data;
};

const cycleData = generateCycleData();

// --- Components ---

const PhaseIndicator = ({ day }) => {
  let phase = "";
  let subtext = "";
  let color = "bg-gray-100";

  if (day <= 5) {
    phase = "Menstruation";
    subtext = "Shedding of the functional layer of the endometrium.";
    color = "bg-red-100 text-red-800 border-red-200";
  } else if (day <= 13) {
    phase = "Follicular / Proliferative Phase";
    subtext = "Follicle development (Ovary) & Lining repair (Uterus).";
    color = "bg-blue-100 text-blue-800 border-blue-200";
  } else if (day === 14) {
    phase = "Ovulation";
    subtext = "Release of the secondary oocyte from the Graafian follicle.";
    color = "bg-green-100 text-green-800 border-green-200";
  } else {
    phase = "Luteal / Secretory Phase";
    subtext = "Corpus Luteum forms. Uterus prepares for implantation.";
    color = "bg-purple-100 text-purple-800 border-purple-200";
  }

  return (
    <div className={clsx("p-4 rounded-xl border-l-4 shadow-sm transition-all duration-300", color)}>
      <h2 className="text-2xl font-bold">{phase}</h2>
      <p className="text-sm opacity-90 mt-1">{subtext}</p>
    </div>
  );
};

const HormoneFeedback = ({ day }) => {
  let message = "";
  let statusColor = "bg-white";

  if (day <= 5) {
    message = "Low hormones allow FSH to rise slightly, recruiting new follicles.";
  } else if (day <= 11) {
    message = "Developing follicle secretes Estrogen. Low Estrogen INHIBITS FSH (Negative Feedback) to prevent too many follicles.";
    statusColor = "bg-blue-50";
  } else if (day <= 13) {
    message = "CRITICAL: Estrogen levels get VERY HIGH. Feedback switches to POSITIVE. High Estrogen -> LH Surge.";
    statusColor = "bg-red-50 border-red-200";
  } else if (day === 14) {
    message = "LH Surge triggers Ovulation (bursting of the follicle).";
    statusColor = "bg-green-50 border-green-200";
  } else if (day <= 24) {
    message = "Corpus Luteum secretes Progesterone & Estrogen. High Progesterone INHIBITS FSH & LH (Negative Feedback) to stop new cycles.";
    statusColor = "bg-purple-50";
  } else {
    message = "Corpus Luteum degenerates -> Progesterone & Estrogen drop -> Inhibition lifted (FSH rises) & Menstruation triggered.";
    statusColor = "bg-orange-50";
  }

  return (
    <div className={`p-4 rounded-lg border shadow-sm ${statusColor} text-slate-700`}>
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <Info size={18} />
        Hormonal Logic
      </h3>
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
};

const OvaryView = ({ day }) => {
  // Animation states based on day
  const follicleSize = useMemo(() => {
    if (day <= 14) return 20 + ((day / 14) * 60); // 20 -> 80
    if (day > 14) return 70 - ((day - 14) * 3); // Shrink slowly
  }, [day]);

  return (
    <div className="relative w-full h-64 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center">
      <div className="absolute top-2 left-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Ovary View</div>
      
      {/* Ovary Background */}
      <div className="w-48 h-32 bg-rose-100 rounded-[50%] opacity-50 relative"></div>

      {/* The Changing Follicle/Corpus Luteum */}
      <AnimatePresence mode='wait'>
        {day < 14 && (
          <motion.div
            key="follicle"
            className="absolute rounded-full border-2 border-rose-300 bg-white flex items-center justify-center shadow-inner"
            animate={{ width: follicleSize, height: follicleSize }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* The Oocyte (Egg) */}
            <div className="w-1/3 h-1/3 bg-slate-800 rounded-full opacity-20" />
          </motion.div>
        )}

        {day === 14 && (
          <motion.div key="ovulation" className="absolute">
             <motion.div 
               className="w-20 h-20 rounded-full border-4 border-dashed border-rose-400 absolute -top-10 -left-10"
               animate={{ scale: [1, 1.5], opacity: [1, 0] }} 
               transition={{ duration: 0.5, repeat: Infinity }}
             />
             <motion.div
                className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg z-20"
                initial={{ x: 0, y: 0 }}
                animate={{ x: 60, y: -40, opacity: 0 }} // Ejecting
                transition={{ duration: 1 }}
             />
             {/* Burst Follicle */}
             <div className="w-20 h-20 bg-rose-200 rounded-full opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)' }}></div>
          </motion.div>
        )}

        {day > 14 && (
          <motion.div
            key="corpus-luteum"
            className={clsx(
              "absolute rounded-full flex items-center justify-center shadow-lg transition-colors duration-500",
              day > 24 ? "bg-slate-200" : "bg-yellow-400" // Albicans (white) vs Luteum (yellow)
            )}
            animate={{ width: follicleSize, height: follicleSize }}
          >
             {day <= 24 && <div className="text-[10px] text-yellow-800 font-bold opacity-50">CL</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenstrualParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParticles([...Array(10)].map((_, i) => ({
        id: i,
        x: Math.random() * 100 + "%", // Use percentage for better responsiveness
        duration: 1 + Math.random(),
        delay: Math.random()
      })));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-2 bg-red-400 opacity-60 rounded-full"
          initial={{ top: -10, left: p.x, opacity: 0 }}
          animate={{ top: "100%", opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const UterusView = ({ day }) => {
  // Thickness logic
  const thickness = useMemo(() => {
    if (day <= 5) return 40 - (day * 6); // 40 -> 10 (Shedding)
    if (day <= 14) return 10 + ((day - 5) * 4); // 10 -> 46 (Proliferating)
    return 46 + ((day - 14) * 2); // 46 -> 74 (Secretory, gets thick)
  }, [day]);

  // Color logic (Vascularity) - used for saturation/brightness
  const vascularity = useMemo(() => {
    if (day <= 5) return { saturate: 0.8, brightness: 0.8 }; 
    if (day > 14) return { saturate: 1.5, brightness: 1 }; 
    return { saturate: 1, brightness: 1 };
  }, [day]);

  return (
    <div className="relative w-full h-64 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-end">
      <div className="absolute top-2 left-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Endometrium View</div>
      
      {/* Menstrual Flow Animation */}
      {day <= 5 && (
        <MenstrualParticles />
      )}

      {/* The Lining */}
      <motion.div 
        className="w-full bg-gradient-to-t from-red-900 via-red-300 to-pink-100 rounded-t-lg mx-auto relative shadow-2xl"
        style={{ width: '90%' }}
        animate={{ 
          height: `${thickness}%`,
          filter: `saturate(${vascularity.saturate}) brightness(${vascularity.brightness}) hue-rotate(${day <= 5 ? 0 : -10}deg)`
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Glands/Spiral Arteries visual hint */}
        {day > 14 && (
           <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        )}
      </motion.div>
      <div className="w-full h-4 bg-red-950/20 absolute bottom-0"></div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur shadow-xl border p-3 rounded-lg text-xs">
        <p className="font-bold mb-1">Day {label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 mb-1" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
            <span className="capitalize font-medium">{p.name}:</span>
            <span>{Math.round(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- Main Application ---
function App() {
  const [day, setDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setDay((prev) => (prev >= 28 ? 1 : prev + 1));
      }, 800); // 0.8s per day
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Hormonal Control: The Menstrual Cycle
            </h1>
            <p className="text-xs md:text-sm text-slate-500">HKDSE Biology • Coordination & Response</p>
          </div>
          <div className="flex items-center gap-3">
             <button
               onClick={() => setIsPlaying(!isPlaying)}
               className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-md"
             >
               {isPlaying ? <Pause size={16} /> : <Play size={16} />}
               <span className="hidden sm:inline">{isPlaying ? "Pause" : "Auto-Play"}</span>
             </button>
             <button 
               onClick={() => setDay(1)}
               className="p-2 text-slate-500 hover:text-slate-900 transition"
               title="Reset"
             >
               <RefreshCw size={20} />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* 1. Master Control Area */}
        <section className="space-y-6">
          <PhaseIndicator day={day} />
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="day-slider" className="font-bold text-slate-700">Day {day}</label>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-4">
                <span>Follicular Phase</span>
                <span>Ovulation</span>
                <span>Luteal Phase</span>
              </div>
            </div>
            
            <input
              type="range"
              min="1"
              max="28"
              value={day}
              onChange={(e) => {
                setDay(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:accent-rose-600 transition-all"
              id="day-slider"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400 font-mono">
              {[1, 7, 14, 21, 28].map(d => (
                <span key={d} className="relative">
                  <span className={clsx("absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-slate-300", d === 14 && "bg-rose-400 h-2")}></span>
                  <span className="pt-2 block">Day {d}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Interactive Graph & Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-700">Pituitary & Ovarian Hormones</h3>
                <div className="flex gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500"></span> FSH</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500"></span> LH</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400"></span> Estrogen</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-500"></span> Progesterone</div>
                </div>
             </div>
             
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={cycleData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                   <XAxis dataKey="day" hide />
                   <YAxis hide domain={[0, 110]} />
                   <RechartsTooltip content={<CustomTooltip />} />
                   
                   {/* Vertical Line for Current Day */}
                   <ReferenceLine x={day} stroke="#64748b" strokeDasharray="3 3" />
                   
                   {/* Lines - using monotone for smoothness */}
                   <Line type="monotone" dataKey="fsh" stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                   <Line type="monotone" dataKey="lh" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                   <Line type="monotone" dataKey="estrogen" stroke="#f87171" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                   <Line type="monotone" dataKey="progesterone" stroke="#a855f7" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </section>

          <section className="flex flex-col gap-4">
             <HormoneFeedback day={day} />
             
             {/* Key Legend */}
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <p><strong>FSH:</strong> Follicle Stimulating Hormone (from Pituitary)</p>
                <p><strong>LH:</strong> Luteinizing Hormone (from Pituitary)</p>
                <p><strong>Estrogen:</strong> Repairs lining (from Ovary)</p>
                <p><strong>Progesterone:</strong> Maintains lining (from Ovary)</p>
             </div>
          </section>
        </div>

        {/* 3. Anatomical Views */}
        <section>
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            Anatomical Changes
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Synchronized</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <OvaryView day={day} />
             <UterusView day={day} />
          </div>
        </section>

      </main>
    </div>
  );
}



export default App;
