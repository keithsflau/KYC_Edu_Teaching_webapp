import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function EducationalOverlay({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-gradient-to-r from-blue-900/95 to-purple-900/95 backdrop-blur-md border-2 border-blue-400/50 rounded-2xl shadow-2xl shadow-blue-500/30 p-6 max-w-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-white text-lg font-medium leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Auto-dismiss indicator */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-4"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 5, ease: "linear" }}
          onAnimationComplete={onClose}
        />
      </div>
    </motion.div>
  )
}
