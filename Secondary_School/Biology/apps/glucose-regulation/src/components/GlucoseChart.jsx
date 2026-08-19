import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const GlucoseChart = ({ data, timeRange = 60 }) => {
    // Slice data to show last N seconds
    const visibleData = data.slice(-timeRange);

    return (
        <div className="w-full h-full bg-slate-900 rounded-lg p-2 border border-slate-700 relative">
            <div className="absolute top-2 left-4 text-xs text-slate-400 font-mono">Blood Glucose (mg/dL)</div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={visibleData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fff" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInsulin" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#457B9D" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#457B9D" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorGlucagon" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F4A261" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F4A261" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[40, 160]} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                        itemStyle={{ color: '#cbd5e1' }}
                        labelStyle={{ display: 'none' }}
                    />

                    {/* Normal Range Reference Area - Recharts ReferenceArea doesn't always play nice with dynamic X, using ReferenceLine or custom shape is better. 
              Actually, ReferenceArea needs X coordinates unless we span whole graph. 
              Let's just use ReferenceLines for 70 and 110 */}
                    <ReferenceLine y={110} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: 'High', fill: '#10b981', fontSize: 10 }} />
                    <ReferenceLine y={70} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: 'Low', fill: '#10b981', fontSize: 10 }} />

                    <Area
                        type="monotone"
                        dataKey="glucose"
                        stroke="#ffffff"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorGlucose)"
                        animationDuration={300}
                        isAnimationActive={false} // Performance
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Background tint logic based on hormone dominance? 
          It's hard to do background tint *inside* the chart accurately without complex svg manipulation.
          We can do a simple overlay or border. For now, the graph changes color?
       */}
        </div>
    );
};

export default GlucoseChart;
