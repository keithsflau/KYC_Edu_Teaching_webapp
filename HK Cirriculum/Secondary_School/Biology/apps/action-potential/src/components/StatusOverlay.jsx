import React from 'react';
import clsx from 'clsx';
import { Activity, Zap, Lock, Unlock, ArrowRightLeft } from 'lucide-react';

export const StatusOverlay = ({ phase, channels, voltage }) => {
    const getPhaseColor = () => {
        switch (phase) {
            case 'resting': return 'text-slate-400';
            case 'depolarizing': return 'text-emerald-400';
            case 'repolarizing': return 'text-blue-400';
            case 'hyperpolarizing': return 'text-purple-400';
            case 'refractory': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    const getPhaseDesc = () => {
        switch (phase) {
            case 'resting': return 'Membrane is at rest. Na+/K+ Pump maintains potential.';
            case 'depolarizing': return 'Threshold reached! Na+ channels OPEN. Na+ rushes IN.';
            case 'repolarizing': return 'Peak reached. Na+ INACTIVATED. K+ OPEN. K+ rushes OUT.';
            case 'hyperpolarizing': return 'K+ slow to close. Potential dips below resting.';
            case 'refractory': return 'Resetting Na+ channels. Pump restores gradient.';
            default: return '';
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl">
            {/* Phase Info */}
            <div className="md:col-span-2 flex flex-col justify-center">
                <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Current Phase</h3>
                <div className="flex items-center gap-2">
                    <Activity className={clsx("w-5 h-5", getPhaseColor())} />
                    <span className={clsx("text-lg font-bold capitalize", getPhaseColor())}>{phase}</span>
                </div>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {getPhaseDesc()}
                </p>
            </div>

            {/* Channel Status */}
            <div className="flex flex-col justify-center gap-2">
                <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider">Ion Channels</h3>

                <div className="flex items-center justify-between bg-slate-700/50 p-2 rounded">
                    <span className="text-blue-300 text-xs font-bold">Na+</span>
                    <ChannelStatus state={channels.na} />
                </div>

                <div className="flex items-center justify-between bg-slate-700/50 p-2 rounded">
                    <span className="text-purple-300 text-xs font-bold">K+</span>
                    <ChannelStatus state={channels.k} />
                </div>
            </div>

            {/* Voltage Readout */}
            <div className="flex flex-col justify-center items-center bg-black/20 rounded p-2">
                <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Potential</h3>
                <div className="text-3xl font-mono text-white font-bold">
                    {voltage.toFixed(1)} <span className="text-sm text-slate-500">mV</span>
                </div>
            </div>
        </div>
    );
};

const ChannelStatus = ({ state }) => {
    // state: 'closed' | 'open' | 'inactivated'
    let icon, text, color;
    if (state === 'open') {
        icon = <Unlock className="w-3 h-3" />;
        text = "OPEN";
        color = "text-emerald-400";
    } else if (state === 'inactivated') {
        icon = <Lock className="w-3 h-3" />;
        text = "LOCKED";
        color = "text-red-400";
    } else {
        icon = <MinusCircle className="w-3 h-3" />;
        text = "CLOSED";
        color = "text-slate-400";
    }

    return (
        <div className={`flex items-center gap-1 text-xs font-bold ${color}`}>
            {icon}
            <span>{text}</span>
        </div>
    );
};

const MinusCircle = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
);
