import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Wind, Droplets, Sun, Gauge } from 'lucide-react';

const PotometerLab = ({
    light, setLight,
    wind, setWind,
    humidity, setHumidity,
    rate,
    isRunning, setIsRunning,
    bubblePos, setBubblePos
}) => {
    const rulerRef = useRef(null);

    // Environmental sliders config
    const controls = [
        { label: "Light Intensity", icon: Sun, value: light, setValue: setLight, min: 0, max: 100, color: "text-amber-500" },
        { label: "Wind Speed", icon: Wind, value: wind, setValue: setWind, min: 0, max: 100, color: "text-slate-500" },
        { label: "Humidity", icon: Droplets, value: humidity, setValue: setHumidity, min: 0, max: 100, color: "text-blue-500" },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-green-900">Macroscopic Experiment</h2>
                    <p className="text-sm text-green-700">Potometer Simulator</p>
                </div>
                <div className="font-mono text-xl bg-slate-100 px-4 py-2 rounded-lg border border-slate-300 min-w-[140px] text-center">
                    Rate: {rate.toFixed(1)} <span className="text-xs text-slate-500">mm/min</span>
                </div>
            </div>

            {/* Main Simulation Area */}
            <div className="bg-green-50 rounded-xl p-8 border border-green-100 relative flex flex-col items-center justify-center min-h-[300px]">

                {/* Plant Graphic (Simplified SVG) */}
                <div className="absolute top-4 left-10 w-32 h-32 z-10">
                    <svg viewBox="0 0 100 100" className="drop-shadow-sm filter">
                        <path d="M50,100 Q50,50 80,20" stroke="#15803d" strokeWidth="4" fill="none" />
                        <path d="M50,80 Q30,60 20,30" stroke="#15803d" strokeWidth="3" fill="none" />
                        {/* Leaves */}
                        <path d="M80,20 Q100,10 90,40 Q60,50 80,20 Z" fill="#22c55e" />
                        <path d="M20,30 Q0,20 10,50 Q40,60 20,30 Z" fill="#22c55e" />
                        <path d="M50,60 Q70,40 60,10 Q30,30 50,60 Z" fill="#4ade80" />
                    </svg>
                    {/* Wind Effect if windy */}
                    {wind > 30 && (
                        <div className="absolute -right-10 top-0 animate-pulse text-slate-400">
                            <Wind size={24} className={wind > 60 ? "animate-bounce" : ""} />
                        </div>
                    )}
                </div>

                {/* Apparatus */}
                <div className="relative w-full max-w-lg mt-20">
                    {/* Tube */}
                    <div className="h-4 bg-blue-100 rounded-full w-full border border-blue-200 relative overflow-hidden">
                        {/* Water */}
                        <div className="absolute inset-0 bg-blue-200/50"></div>
                        {/* Bubble */}
                        <div
                            className="absolute top-0 bottom-0 w-3 h-3 my-auto bg-slate-100 rounded-full border border-slate-400 shadow-inner transition-all duration-75 ease-linear"
                            style={{ left: `${bubblePos}%` }}
                        ></div>
                    </div>

                    {/* Ruler */}
                    <div className="absolute top-5 left-0 w-full flex justify-between px-1" ref={rulerRef}>
                        {[...Array(11)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="h-2 w-px bg-slate-400"></div>
                                <span className="text-[10px] text-slate-500 mt-1">{i * 10}</span>
                            </div>
                        ))}
                    </div>

                    {/* Labels */}
                    <span className="absolute -left-16 -top-2 text-xs text-slate-500">Shoot</span>
                    <span className="absolute -right-12 -top-2 text-xs text-slate-500">Reservoir</span>
                </div>

                {/* Tooltip Overlay */}
                <div className="absolute bottom-4 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Transpiration Pull moves the bubble →
                </div>

            </div>

            {/* Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {controls.map((ctrl) => (
                    <div key={ctrl.label} className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <ctrl.icon size={16} className={ctrl.color} />
                            {ctrl.label}
                        </div>
                        <input
                            type="range"
                            min={ctrl.min}
                            max={ctrl.max}
                            value={ctrl.value}
                            onChange={(e) => ctrl.setValue(Number(e.target.value))}
                            disabled={isRunning} // Disable changing vars during run? Or allow? Prompt implies dynamic. Allow for better UX.
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600 hover:accent-green-500"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simulation Controls */}
            <div className="flex gap-4 border-t pt-4">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold transition-all shadow-md ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isRunning ? 'Stop Timer' : (
                        <>
                            <Play size={20} /> Start Experiment
                        </>
                    )}
                </button>
                <button
                    onClick={() => { setBubblePos(100); setIsRunning(false); }}
                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-colors flex items-center gap-2"
                >
                    <RotateCcw size={20} /> Reset
                </button>
            </div>

        </div>
    );
};

export default PotometerLab;
