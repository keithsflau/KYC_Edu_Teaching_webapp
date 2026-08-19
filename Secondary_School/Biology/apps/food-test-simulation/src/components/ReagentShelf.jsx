import { motion } from 'framer-motion';
import { Droplet, FlaskConical } from 'lucide-react';

const reagents = [
  { id: 'benedicts', name: "Benedict's Solution", color: '#4169e1', textColor: 'text-blue-400' },
  { id: 'iodine', name: 'Iodine Solution', color: '#8b4513', textColor: 'text-amber-700' },
  { id: 'biuret', name: 'Biuret Solution', color: '#87ceeb', textColor: 'text-sky-300' },
  { id: 'dcpip', name: 'DCPIP Solution', color: '#4169e1', textColor: 'text-blue-500' },
  { id: 'ethanol', name: 'Ethanol', color: '#f0f0f0', textColor: 'text-gray-300' },
  { id: 'hcl', name: 'Dilute HCl (Acid)', color: '#ffcccc', textColor: 'text-red-300' },
  { id: 'nahco3', name: 'Sodium Hydrogen Carbonate (Alkali)', color: '#ccffcc', textColor: 'text-green-300' },
  { id: 'water', name: 'Distilled Water', color: '#e0f7fa', textColor: 'text-cyan-200' },
];

export default function ReagentShelf({ onAddReagent }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-xl p-3 shadow-xl h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-2 flex-none">
        <FlaskConical className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg font-bold text-cyan-400">Reagents Shelf</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {reagents.map((reagent, index) => (
          <motion.button
            key={reagent.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddReagent(reagent.id)}
            className="w-full glass rounded-lg p-2 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-all text-center border border-white/5"
          >
            <Droplet 
              className="w-5 h-5 drop-shadow-md" 
              style={{ color: reagent.color }}
              fill={reagent.color}
            />
            
            <p className={`font-semibold text-[10px] leading-tight ${reagent.textColor}`}>
              {reagent.name}
            </p>
          </motion.button>
        ))}
      </div>

      <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex-none h-fit">
        <p className="text-[10px] text-yellow-300 flex items-center gap-1 leading-tight">
          💡 Select a tube first
        </p>
      </div>
    </motion.div>
  );
}
