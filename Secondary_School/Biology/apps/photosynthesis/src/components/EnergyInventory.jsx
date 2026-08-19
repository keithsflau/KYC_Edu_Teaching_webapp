import React from 'react';
import { Zap, Battery, BatteryCharging, Circle, CircleDot } from 'lucide-react';

export function EnergyInventory({ atp, adp, nadph, nadp }) {
  return (
    <div className="bg-slate-900 border-b border-slate-700 p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold text-white hidden md:block">Photosynthesis Sim</h1>
        
        <div className="flex gap-8">
          {/* ATP Section */}
          <div className="flex flex-col items-center p-2 bg-slate-800 rounded-lg min-w-[140px]">
            <span className="text-xs text-slate-400 font-mono mb-1">ENERGY CARRIERS</span>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-yellow-400 font-bold text-lg">
                  <Zap className="w-5 h-5 mr-1 fill-yellow-400" />
                  {atp}
                </div>
                <span className="text-[10px] text-yellow-400/80">ATP (Charged)</span>
              </div>
              <div className="h-8 w-px bg-slate-600"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-slate-500 font-bold text-lg">
                  <Battery className="w-5 h-5 mr-1" />
                  {adp}
                </div>
                <span className="text-[10px] text-slate-500">ADP (Empty)</span>
              </div>
            </div>
          </div>

          {/* NADPH Section */}
          <div className="flex flex-col items-center p-2 bg-slate-800 rounded-lg min-w-[140px]">
            <span className="text-xs text-slate-400 font-mono mb-1">ELECTRON CARRIERS</span>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-cyan-400 font-bold text-lg">
                  <CircleDot className="w-5 h-5 mr-1 fill-cyan-400" />
                  {nadph}
                </div>
                <span className="text-[10px] text-cyan-400/80">NADPH (Reduced)</span>
              </div>
              <div className="h-8 w-px bg-slate-600"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-slate-500 font-bold text-lg">
                  <Circle className="w-5 h-5 mr-1" />
                  {nadp}
                </div>
                <span className="text-[10px] text-slate-500">NADP+ (Oxidized)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
