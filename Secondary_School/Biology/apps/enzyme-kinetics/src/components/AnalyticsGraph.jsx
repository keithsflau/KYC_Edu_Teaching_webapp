import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function AnalyticsGraph({ data, variableLabel }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Real-Time Reaction Kinetics</h3>
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="x"
                            type="number"
                            domain={['auto', 'auto']}
                            tick={{ fontSize: 12 }}
                            label={{ value: variableLabel, position: 'bottom', offset: 0 }}
                        />
                        <YAxis
                            label={{ value: 'Reaction Rate (v)', angle: -90, position: 'insideLeft' }}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            cursor={{ strokeDasharray: '3 3' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="y"
                            stroke="#2563EB"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6 }}
                            isAnimationActive={false} // Performance
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-slate-500 text-center">
                Enable "Trace Mode" and adjust {variableLabel} to plot the curve.
            </div>
        </div>
    );
}
