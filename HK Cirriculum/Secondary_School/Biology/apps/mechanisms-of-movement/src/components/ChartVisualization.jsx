import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const ChartVisualization = ({ data, color, label }) => {
    return (
        <div className="w-full h-64 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Concentration Inside Cell (Cytoplasm)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 25,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={['auto', 'auto']}
                        tickCount={10}
                        label={{ value: 'Time (s)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis
                        label={{ value: 'Particles', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="concentration"
                        stroke={color || "#8884d8"}
                        strokeWidth={3}
                        dot={false}
                        isAnimationActive={false} // Performance
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartVisualization;
