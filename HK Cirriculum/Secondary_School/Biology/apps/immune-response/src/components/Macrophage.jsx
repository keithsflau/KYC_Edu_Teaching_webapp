import { motion } from 'framer-motion'

const antigenShapes = {
  triangle: (
    <polygon points="12,4 22,20 2,20" fill="#ffaa00" stroke="#ff8800" strokeWidth="1" />
  ),
  square: (
    <rect x="4" y="4" width="16" height="16" fill="#ffaa00" stroke="#ff8800" strokeWidth="1" />
  ),
  circle: (
    <circle cx="12" cy="12" r="8" fill="#ffaa00" stroke="#ff8800" strokeWidth="1" />
  )
}

export default function Macrophage({ hasAntigen, antigenType }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        x: [0, 10, 0], // Small hover effect using transform is fine relative to pos
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
      className="absolute"
      style={{ 
        left: '10%',
        top: '40%',
        width: '80px', 
        height: '80px' 
      }}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-lg">
        {/* Irregular blob shape for macrophage */}
        <path
          d="M 40 10 Q 60 15, 65 35 Q 68 50, 55 60 Q 40 70, 25 60 Q 12 50, 15 35 Q 20 15, 40 10 Z"
          fill="#88cc88"
          opacity="0.9"
        />
        <path
          d="M 40 15 Q 55 18, 60 35 Q 62 48, 52 57 Q 40 65, 28 57 Q 18 48, 20 35 Q 25 18, 40 15 Z"
          fill="#aaddaa"
          opacity="0.7"
        />
        
        {/* Pseudopods (extensions) */}
        <ellipse cx="70" cy="30" rx="8" ry="5" fill="#88cc88" opacity="0.8" />
        <ellipse cx="15" cy="45" rx="5" ry="8" fill="#88cc88" opacity="0.8" />
        
        {/* Nucleus */}
        <circle cx="40" cy="40" r="8" fill="#336633" opacity="0.6" />
        
        {/* Presented antigen (if has antigen) */}
        {hasAntigen && (
          <g transform="translate(52, 20) scale(0.7)">
            {antigenShapes[antigenType]}
          </g>
        )}
      </svg>
      
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 whitespace-nowrap font-semibold">
        Macrophage
      </div>
    </motion.div>
  )
}
