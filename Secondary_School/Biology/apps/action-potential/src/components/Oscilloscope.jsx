import React, { memo } from 'react';
import {
    LineChart,
    Line,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine,
    XAxis
} from 'recharts';

const Oscilloscope = memo(({ data }) => {
    return (
        <div className="w-full h-80 bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-2xl overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 flex flex-col">
                <h2 className="text-emerald-400 text-lg font-bold font-mono tracking-wider shadow-black">OSCILLOSCOPE</h2>
                <span className="text-slate-400 text-xs font-mono">MEMBRANE POTENTIAL (mV)</span>
            </div>

            {/* Grid Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" hide />
                    {/* We hide XAxis ticks but keep it for scaling */}
                    <YAxis
                        domain={[-90, 50]}
                        tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'monospace' }}
                        tickCount={8}
                        stroke="#334155"
                    />

                    <ReferenceLine
                        y={-70}
                        stroke="#94a3b8"
                        strokeDasharray="4 4"
                        strokeOpacity={0.5}
                        label={{ value: "RESTING (-70mV)", position: 'insideRight', fill: "#94a3b8", fontSize: 10, offset: 10 }}
                    />
                    <ReferenceLine
                        y={-55}
                        stroke="#f59e0b"
                        strokeDasharray="4 4"
                        strokeOpacity={0.8}
                        label={{ value: "THRESHOLD (-55mV)", position: 'insideRight', fill: "#f59e0b", fontSize: 10, offset: 10 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="voltage"
                        stroke="#34d399"
                        strokeWidth={3}
                        dot={false}
                        isAnimationActive={false} // Critical for real-time performance
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default Oscilloscope;
