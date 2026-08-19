import { motion } from 'framer-motion'

export default function PlasmaCell({ x, y }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="absolute"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        width: '40px',
        height: '40px'
      }}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full filter drop-shadow-lg">
        {/* Plasma cell - factory appearance with rough ER */}
        <ellipse cx="20" cy="20" rx="16" ry="18" fill="#dd88ff" opacity="0.9" />
        <ellipse cx="20" cy="20" rx="12" ry="14" fill="#ee99ff" opacity="0.7" />
        
        {/* Rough ER (ribosomes) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45) * Math.PI / 180
          const cx = 20 + Math.cos(angle) * 10
          const cy = 20 + Math.sin(angle) * 12
          return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#9944cc" />
        })}
        
        {/* Nucleus */}
        <ellipse cx="20" cy="22" rx="6" ry="7" fill="#7733aa" opacity="0.8" />
        
        {/* Production indicator */}
        <motion.circle
          cx="20"
          cy="8"
          r="3"
          fill="#ffdd44"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </svg>
      
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 whitespace-nowrap text-center font-semibold">
        Plasma
      </div>
    </motion.div>
  )
}
