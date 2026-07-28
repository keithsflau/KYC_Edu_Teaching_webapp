import { motion } from 'framer-motion'

const receptorShapes = {
  triangle: (
    <polygon points="12,4 22,20 2,20" fill="none" stroke="#9966ff" strokeWidth="2" />
  ),
  square: (
    <rect x="4" y="4" width="16" height="16" fill="none" stroke="#9966ff" strokeWidth="2" />
  ),
  circle: (
    <circle cx="12" cy="12" r="8" fill="none" stroke="#9966ff" strokeWidth="2" />
  )
}

function BCell({ type, isActive, position }) {
  return (
    <motion.div
      initial={{ scale: 0, y: -20 }}
      animate={{ 
        scale: isActive ? 1.3 : 1,
        y: 0
      }}
      transition={{ duration: 0.5 }}
      className={`absolute ${isActive ? 'z-10' : 'z-0'}`}
      style={{ 
        left: `${position}%`, 
        top: '50%',
        width: '45px',
        height: '45px'
      }}
    >
      <svg viewBox="0 0 45 45" className="w-full h-full filter drop-shadow-lg">
        {/* B-cell body */}
        <circle 
          cx="22.5" 
          cy="22.5" 
          r="18" 
          fill={isActive ? "#aa66ff" : "#7744cc"} 
          opacity="0.9" 
        />
        <circle 
          cx="22.5" 
          cy="22.5" 
          r="14" 
          fill={isActive ? "#cc88ff" : "#9966dd"} 
          opacity="0.7" 
        />
        
        {/* Receptor on surface */}
        <g transform="translate(10, 2) scale(0.7)">
          {receptorShapes[type]}
        </g>
        
        {/* Activation glow */}
        {isActive && (
          <motion.circle
            cx="22.5"
            cy="22.5"
            r="20"
            fill="none"
            stroke="#ffdd44"
            strokeWidth="3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </svg>
    </motion.div>
  )
}

export default function BCellRow({ activeBCellType, selectedAntigen }) {
  const bCellTypes = ['triangle', 'square', 'circle']
  const positions = [35, 55, 75]

  return (
    <div className="absolute w-full h-full" style={{ top: '10%' }}> {/* Shift row down slightly */}
      {bCellTypes.map((type, index) => (
        <BCell 
          key={type}
          type={type}
          isActive={activeBCellType === type}
          position={positions[index]}
        />
      ))}
      
      {/* Label */}
      {activeBCellType && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 transform -translate-x-1/2 bg-purple-900/80 px-3 py-1 rounded-lg text-xs font-semibold text-purple-200"
          style={{ top: '40%' }}
        >
          ✨ Clonal Selection: Matching B-cell activated!
        </motion.div>
      )}
    </div>
  )
}
