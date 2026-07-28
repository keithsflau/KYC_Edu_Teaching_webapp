import { motion } from 'framer-motion';
import { Flame, FlaskRound } from 'lucide-react';

export default function Equipment({ onHeat, onShake, selectedTube }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-xl p-3 shadow-xl flex-none"
    >
      <div className="flex items-center gap-2 mb-2">
        <FlaskRound className="w-5 h-5 text-orange-400" />
        <h2 className="text-lg font-bold text-orange-400">Equipment</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Heat Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onHeat}
          disabled={!selectedTube}
          className={`
            p-3 rounded-lg font-semibold transition-all flex flex-col items-center justify-center gap-1
            ${selectedTube
              ? 'bg-gradient-to-br from-orange-500/80 to-red-500/80 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20'
              : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}
          `}
        >
          <Flame className={`w-6 h-6 ${selectedTube ? 'animate-pulse' : ''}`} />
          <span className="text-xs">Heat (80°C)</span>
        </motion.button>

        {/* Shake Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShake}
          disabled={!selectedTube}
          className={`
            p-3 rounded-lg font-semibold transition-all flex flex-col items-center justify-center gap-1
            ${selectedTube
              ? 'bg-gradient-to-br from-cyan-500/80 to-blue-500/80 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}
          `}
        >
          <motion.div
            animate={selectedTube ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1, repeatDelay: 2 }}
          >
            <FlaskRound className="w-6 h-6" />
          </motion.div>
          <span className="text-xs">Shake / Mix</span>
        </motion.button>
      </div>
      
      {/* Mini Instructions */}
      <div className="mt-2 text-[10px] text-gray-400 flex justify-between px-1">
        <span>Use Heat for Benedict's</span>
        <span>Use Shake for Mixing</span>
      </div>
    </motion.div>
  );
}
