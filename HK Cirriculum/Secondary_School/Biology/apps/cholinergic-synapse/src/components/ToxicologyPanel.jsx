import React from 'react';
import clsx from 'clsx';
import { Skull, FlaskConical, ShieldAlert } from 'lucide-react';

export function ToxicologyPanel({ currentMode, setMode }) {
    const modes = [
        { id: null, label: 'Normal Physiology', icon: FlaskConical, desc: 'Standard synaptic transmission.' },
        { id: 'curare', label: 'Inhibitor (Curare)', icon: ShieldAlert, desc: 'Competitively blocks ACh receptors. Causes paralysis.' },
        { id: 'nerve_gas', label: 'Enzyme Inhibitor', icon: Skull, desc: 'Inhibits Acetylcholinesterase. Causes spasms/tetanus.' },
    ];

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-purple-500/20 rounded text-purple-400">
                    <FlaskConical size={18} />
                </div>
                <h3 className="font-semibold text-lg text-slate-200">Toxicology Lab</h3>
            </div>

            <div className="space-y-3">
                {modes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = currentMode === mode.id;
                    return (
                        <button
                            key={mode.id || 'normal'}
                            onClick={() => setMode(mode.id)}
                            className={clsx(
                                "w-full text-left p-3 rounded-lg border transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-purple-900/20 border-purple-500/50 ring-1 ring-purple-500/50"
                                    : "bg-slate-700/30 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600"
                            )}
                        >
                            <div className="flex items-start gap-3 relative z-10">
                                <Icon size={20} className={clsx("mt-0.5", isActive ? "text-purple-400" : "text-slate-500 group-hover:text-purple-300")} />
                                <div>
                                    <div className={clsx("font-medium text-sm", isActive ? "text-purple-100" : "text-slate-300")}>
                                        {mode.label}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1 pr-4">
                                        {mode.desc}
                                    </div>
                                </div>
                            </div>
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
