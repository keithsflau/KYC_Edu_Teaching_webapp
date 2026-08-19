import { motion } from 'framer-motion'

export default function Antibody({ x, y, targetX, targetY }) {
  return (
    <motion.div
      initial={{ 
        left: `${x}%`, 
        top: `${y}%`,
        scale: 0 
      }}
      animate={{ 
        left: `${targetX ?? x}%`,
        top: `${targetY ?? 10}%`,
        scale: 1,
        rotate: [0, 360]
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        rotate: {
          duration: 0.5,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      className="absolute"
      style={{ width: '24px', height: '24px' }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full filter drop-shadow-md">
        {/* Y-shaped antibody */}
        {/* Stem */}
        <rect x="10" y="12" width="4" height="10" fill="#44ddff" rx="1" />
        
        {/* Left arm */}
        <rect 
          x="4" 
          y="2" 
          width="4" 
          height="12" 
          fill="#44ddff" 
          rx="1"
          transform="rotate(-30 6 8)"
        />
        
        {/* Right arm */}
        <rect 
          x="16" 
          y="2" 
          width="4" 
          height="12" 
          fill="#44ddff" 
          rx="1"
          transform="rotate(30 18 8)"
        />
        
        {/* Binding sites (antigen recognition) */}
        <circle cx="6" cy="3" r="2.5" fill="#ffaa44" opacity="0.9" />
        <circle cx="18" cy="3" r="2.5" fill="#ffaa44" opacity="0.9" />
        
        {/* Glow effect */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="#44ddff"
          strokeWidth="1"
          opacity="0.3"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  )
}
