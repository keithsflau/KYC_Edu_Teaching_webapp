import React from 'react';
import { Battery, Zap, Wind, User, Droplet, RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

export default function Dashboard({ atp, oxygen, setOxygen, organism, setOrganism, onReset }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur border-b border-slate-700 p-4 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Cellular Respiration Sim
        </h1>

        <div className="flex items-center gap-6">
          {/* Organism Toggle */}
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setOrganism('HUMAN')}
              className={clsx(
                "px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors",
                organism === 'HUMAN' ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <User size={16} /> Human
            </button>
            <button
              onClick={() => setOrganism('YEAST')}
              className={clsx(
                "px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors",
                organism === 'YEAST' ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <Droplet size={16} /> Yeast
            </button>
          </div>

          {/* Oxygen Toggle */}
          <button
            onClick={() => setOxygen(!oxygen)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 transition-all",
              oxygen 
                ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                : "bg-red-500/10 border-red-800 text-red-500 grayscale opacity-80"
            )}
          >
            <Wind size={20} className={oxygen ? "animate-pulse" : ""} />
            O₂ Supply: {oxygen ? "ON" : "OFF"}
          </button>

          {/* ATP Counter */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 px-5 py-2 rounded-xl shadow-inner">
            <Zap className="text-yellow-400 fill-yellow-400" size={24} />
            <div className="flex flex-col leading-none">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total ATP</span>
              <span className="text-2xl font-mono font-bold text-yellow-100">{atp}</span>
            </div>
          </div>
          
          <button onClick={onReset} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white" title="Reset">
            <RefreshCcw size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
