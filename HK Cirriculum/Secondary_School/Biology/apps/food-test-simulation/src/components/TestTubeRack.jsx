import { motion, AnimatePresence } from 'framer-motion';
import { TestTube, RotateCcw, Check } from 'lucide-react';

export default function TestTubeRack({ testTubes, selectedTube, onSelectTube, onResetTube }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TestTube className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-purple-400">Test Tube Rack</h2>
        </div>
        <p className="text-xs text-gray-400">Click to select</p>
      </div>

      <div className="flex justify-around items-end gap-6 mb-6">
        {testTubes.map((tube, index) => (
          <motion.div
            key={tube.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Sample Label */}
            <motion.p 
              className="text-xs text-gray-300 mb-2 text-center h-8"
              animate={{ 
                color: selectedTube === tube.id ? '#a78bfa' : '#d1d5db' 
              }}
            >
              {tube.sample}
            </motion.p>

            {/* Test Tube */}
            <motion.button
              onClick={() => onSelectTube(tube.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: tube.isShaking ? [0, -5, 5, -5, 5, 0] : 0,
                rotate: tube.isShaking ? [0, -2, 2, -2, 2, 0] : 0
              }}
              transition={{ 
                y: { duration: 0.5 },
                rotate: { duration: 0.5 }
              }}
              className="relative cursor-pointer"
            >
              {/* Selection Ring */}
              <AnimatePresence>
                {selectedTube === tube.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -inset-2 border-4 border-purple-400 rounded-full"
                  />
                )}
              </AnimatePresence>

              {/* SVG Test Tube */}
              <svg width="80" height="180" viewBox="0 0 80 180" className="drop-shadow-lg">
                {/* Test Tube Glass */}
                <defs>
                  <linearGradient id={`glass-${tube.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                  </linearGradient>
                  <filter id={`glow-${tube.id}`}>
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Tube body */}
                <rect 
                  x="15" 
                  y="10" 
                  width="50" 
                  height="140" 
                  rx="5" 
                  fill={`url(#glass-${tube.id})`}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />

                {/* Bottom curve */}
                <ellipse 
                  cx="40" 
                  cy="150" 
                  rx="25" 
                  ry="15" 
                  fill={`url(#glass-${tube.id})`}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />

                {/* Liquid */}
                <motion.rect
                  x="17"
                  y="100"
                  width="46"
                  height="48"
                  fill={tube.color}
                  initial={{ height: 0, y: 148 }}
                  animate={{ 
                    height: 48, 
                    y: 100,
                    fill: tube.color 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  filter={`url(#glow-${tube.id})`}
                />

                {/* Liquid bottom curve */}
                <motion.ellipse
                  cx="40"
                  cy="148"
                  rx="23"
                  ry="12"
                  fill={tube.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  filter={`url(#glow-${tube.id})`}
                />

                {/* Precipitate (for Benedict's test) */}
                {tube.contents.includes('benedicts') && tube.temperature === 'hot' && tube.color === '#cd5c5c' && (
                  <g>
                    {[...Array(15)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={25 + Math.random() * 30}
                        cy={135 + Math.random() * 8}
                        r={1.5 + Math.random() * 1}
                        fill="#8b0000"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          delay: i * 0.1, 
                          duration: 1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </g>
                )}

                {/* Temperature indicator */}
                {tube.temperature === 'hot' && (
                  <motion.circle
                    cx="70"
                    cy="20"
                    r="5"
                    fill="#ff4500"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </svg>

              {/* Selected Check */}
              <AnimatePresence>
                {selectedTube === tube.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Contents Info */}
            <div className="mt-2 text-xs text-gray-400 text-center h-12 overflow-auto w-24">
              {tube.contents.slice(1).map((content, i) => (
                <div key={i} className="text-cyan-300">
                  +{content}
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onResetTube(tube.id);
              }}
              className="mt-2 p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-red-400" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <p className="text-sm text-purple-300 mb-2">
          <strong>Mystery Samples:</strong>
        </p>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• <strong>Solution A:</strong> Contains Glucose & Vitamin C</li>
          <li>• <strong>Solution B:</strong> Contains Starch & Protein</li>
          <li>• <strong>Solution C:</strong> Contains Sucrose (Non-reducing sugar) & Lipids</li>
        </ul>
      </div>
    </motion.div>
  );
}
