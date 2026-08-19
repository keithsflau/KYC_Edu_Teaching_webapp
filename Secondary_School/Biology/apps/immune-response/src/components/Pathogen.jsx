import { motion } from 'framer-motion'

const antigenShapes = {
  triangle: (
    <polygon points="12,4 22,20 2,20" fill="#ff4444" />
  ),
  square: (
    <rect x="4" y="4" width="16" height="16" fill="#ff4444" />
  ),
  circle: (
    <circle cx="12" cy="12" r="8" fill="#ff4444" />
  )
}

export default function Pathogen({ id, initialX, initialY, antigen, targetY = 30 }) {
  return (
    <motion.div
      initial={{ top: -20, scale: 0 }}
      animate={{ 
        top: `${targetY}%`, 
        scale: 1,
        rotate: [0, 360]
      }}
      exit={{ 
        scale: [1, 1.5, 0], 
        opacity: [1, 1, 0],
        filter: ["brightness(1)", "brightness(2) hue-rotate(90deg)", "grayscale(100%)"]
      }}
      transition={{
        duration: 2,
        exit: { duration: 0.8 },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }
      }}
      className="absolute"
      style={{ 
        left: `${initialX}%`,
        width: '60px', 
        height: '60px' 
      }}
    >
      {/* Pathogen body - red spiked ball */}
      <svg viewBox="0 0 60 60" className="w-full h-full filter drop-shadow-lg">
        {/* Spikes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const x1 = 30 + Math.cos(angle) * 20
          const y1 = 30 + Math.sin(angle) * 20
          const x2 = 30 + Math.cos(angle) * 28
          const y2 = 30 + Math.sin(angle) * 28
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#cc0000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )
        })}
        
        {/* Main body */}
        <circle cx="30" cy="30" r="20" fill="#ff3333" opacity="0.9" />
        <circle cx="30" cy="30" r="18" fill="#ff5555" opacity="0.7" />
        
        {/* Antigen shape on surface */}
        <g transform="translate(18, 18) scale(0.6)">
          {antigenShapes[antigen]}
        </g>
      </svg>
      

    </motion.div>
  )
}
