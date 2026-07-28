import React from 'react';
import { Play, Pause, RefreshCw, Thermometer, Droplets, Zap, ShieldAlert } from 'lucide-react';

export function ControlDashboard({
    temperature, setTemperature,
    pH, setPH,
    substrateConc, setSubstrateConc,
    inhibitorType, setInhibitorType,
    isPlaying, setIsPlaying,
    onReset
}) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Control Dashboard
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-2 rounded-lg transition-colors ${isPlaying ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-2"><Thermometer size={16} /> Temperature</span>
                    <span className={`${temperature > 55 ? 'text-red-600 font-bold' : 'text-blue-600'}`}>{temperature}°C</span>
                </div>
                <input
                    type="range"
                    min="0" max="70"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400">
                    <span>0°C</span>
                    <span>37°C (Opt)</span>
                    <span>70°C</span>
                </div>
            </div>

            {/* pH */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-2"><Droplets size={16} /> pH Level</span>
                    <span className="text-purple-600">{pH}</span>
                </div>
                <input
                    type="range"
                    min="1" max="14" step="0.5"
                    value={pH}
                    onChange={(e) => setPH(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-slate-400">
                    <span>Acidic (1)</span>
                    <span>Neutral (7)</span>
                    <span>Basic (14)</span>
                </div>
            </div>

            {/* Substrate Concentration */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-2">Substrate Concentration</span>
                    <span className="text-yellow-600">{substrateConc} units</span>
                </div>
                <input
                    type="range"
                    min="5" max="50" step="1"
                    value={substrateConc}
                    onChange={(e) => setSubstrateConc(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
            </div>

            {/* Inhibitor */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <ShieldAlert size={16} /> Inhibitor Type
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {['none', 'competitive', 'non-competitive'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setInhibitorType(type)}
                            className={`px-2 py-2 text-xs font-semibold rounded-md capitalize transition-all border
                        ${inhibitorType === type
                                    ? 'bg-red-500 text-white border-red-600 shadow-md'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {type.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-800 leading-relaxed">
                <strong>Tip:</strong> Adjust temperature to see denaturation effects (&gt;55°C). Use the "Run Trace" feature to plot the curve.
            </div>
        </div>
    );
}
