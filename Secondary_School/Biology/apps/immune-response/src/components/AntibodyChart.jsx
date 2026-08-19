import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { motion } from 'framer-motion'

export default function AntibodyChart({ data, currentDay }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334455" />
          <XAxis 
            dataKey="day" 
            stroke="#88aacc"
            label={{ value: 'Time (Days)', position: 'insideBottom', offset: -5, fill: '#88aacc' }}
          />
          <YAxis 
            stroke="#88aacc"
            label={{ value: 'Antibody Concentration', angle: -90, position: 'insideLeft', fill: '#88aacc' }}
            domain={[0, 120]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a2332', 
              border: '1px solid #3b82f6',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#60a5fa' }}
          />
          <Legend 
            wrapperStyle={{ color: '#88aacc' }}
          />
          
          {/* Primary vs Secondary reference line */}
          {currentDay > 14 && (
            <ReferenceLine 
              x={14} 
              stroke="#ffaa44" 
              strokeDasharray="3 3" 
              label={{ value: 'Re-infection', fill: '#ffaa44', position: 'top' }}
            />
          )}
          
          {/* Primary Response */}
          <Line 
            type="monotone" 
            dataKey="level" 
            stroke="#44ddff" 
            strokeWidth={3}
            dot={{ fill: '#44ddff', r: 4 }}
            activeDot={{ r: 6 }}
            name="Antibody Level"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Key Observations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 grid grid-cols-2 gap-3 text-sm"
      >
        <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
          <div className="font-semibold text-blue-300 mb-1">📈 Primary Response</div>
          <p className="text-xs text-blue-100">
            Slow rise (lag phase), moderate peak, gradual decline
          </p>
        </div>
        <div className="bg-cyan-900/30 p-3 rounded-lg border border-cyan-500/20">
          <div className="font-semibold text-cyan-300 mb-1">⚡ Secondary Response</div>
          <p className="text-xs text-cyan-100">
            Rapid rise, higher peak, sustained levels (memory!)
          </p>
        </div>
      </motion.div>
    </div>
  )
}
