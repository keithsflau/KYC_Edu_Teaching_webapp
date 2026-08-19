import { motion } from 'framer-motion'

export default function HelperTCell() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        y: [0, 5, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute"
      style={{ 
        left: '85%',
        top: '40%',
        width: '50px', 
        height: '50px' 
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full filter drop-shadow-lg">
        {/* T-cell body */}
        <circle cx="25" cy="25" r="20" fill="#6699ff" opacity="0.9" />
        <circle cx="25" cy="25" r="16" fill="#88bbff" opacity="0.7" />
        
        {/* T-cell receptor */}
        <rect x="22" y="5" width="6" height="12" fill="#4477dd" rx="2" />
        <circle cx="25" cy="5" r="4" fill="#5588ee" />
        
        {/* Activation signal markers */}
        <motion.circle 
          cx="25" 
          cy="25" 
          r="12" 
          fill="none"
          stroke="#ffdd44"
          strokeWidth="2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
      
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 whitespace-nowrap font-semibold">
        Helper T-Cell
      </div>
    </motion.div>
  )
}
