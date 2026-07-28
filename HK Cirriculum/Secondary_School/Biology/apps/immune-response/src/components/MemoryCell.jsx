import { motion } from 'framer-motion'

export default function MemoryCell({ x, y, isActive }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: isActive ? 1.5 : 1,
        rotate: 0
      }}
      exit={{ scale: 0 }}
      className="absolute"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        width: '38px',
        height: '38px'
      }}
    >
      <svg viewBox="0 0 38 38" className="w-full h-full filter drop-shadow-lg">
        {/* Memory cell - dormant but ready */}
        <circle cx="19" cy="19" r="16" fill={isActive ? "#ffaa44" : "#6688cc"} opacity="0.9" />
        <circle cx="19" cy="19" r="12" fill={isActive ? "#ffcc66" : "#88aadd"} opacity="0.7" />
        
        {/* Memory marker - brain-like pattern */}
        <path
          d="M 19 10 Q 15 12, 15 16 Q 15 19, 19 19 Q 23 19, 23 16 Q 23 12, 19 10 Z"
          fill="#334477"
          opacity="0.6"
        />
        <path
          d="M 19 19 Q 15 19, 15 22 Q 15 26, 19 28 Q 23 26, 23 22 Q 23 19, 19 19 Z"
          fill="#334477"
          opacity="0.6"
        />
        
        {/* Activation burst */}
        {isActive && (
          <>
            <motion.circle
              cx="19"
              cy="19"
              r="18"
              fill="none"
              stroke="#ffdd44"
              strokeWidth="2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.circle
              cx="19"
              cy="19"
              r="18"
              fill="none"
              stroke="#ff8844"
              strokeWidth="2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </svg>
      
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-cyan-300 whitespace-nowrap text-center font-semibold">
        Memory
      </div>
    </motion.div>
  )
}
