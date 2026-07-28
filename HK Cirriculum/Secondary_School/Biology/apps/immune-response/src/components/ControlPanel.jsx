import { motion } from 'framer-motion'
import { Syringe, RotateCcw, Play, Zap } from 'lucide-react'

const STATES = {
  IDLE: 'idle',
  PRIMARY_INFECTION: 'primary_infection',
  PRIMARY_RESPONSE: 'primary_response',
  PRIMARY_CLEAR: 'primary_clear',
  SECONDARY_IDLE: 'secondary_idle',
  SECONDARY_INFECTION: 'secondary_infection',
  SECONDARY_RESPONSE: 'secondary_response',
  SECONDARY_CLEAR: 'secondary_clear',
  COMPLETE: 'complete'
}

export default function ControlPanel({ currentState, onInfect, onReinfect, onReset, hasMemoryCells }) {
  const canInfect = currentState === STATES.IDLE
  const canReinfect = currentState === STATES.SECONDARY_IDLE && hasMemoryCells
  const canReset = currentState !== STATES.IDLE

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-slate-900/80 to-blue-900/80 rounded-2xl p-6 border border-blue-500/30 backdrop-blur-sm"
    >
      <h2 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
        <Play className="w-5 h-5" />
        Simulation Controls
      </h2>
      
      <div className="flex flex-wrap gap-4">
        {/* Primary Infection Button */}
        <button
          onClick={onInfect}
          disabled={!canInfect}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
            transition-all duration-300 transform hover:scale-105
            ${canInfect 
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-500/30' 
              : 'bg-gray-700 cursor-not-allowed opacity-50'
            }
          `}
        >
          <Syringe className="w-5 h-5" />
          Primary Infection
        </button>

        {/* Secondary Infection Button */}
        <button
          onClick={onReinfect}
          disabled={!canReinfect}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
            transition-all duration-300 transform hover:scale-105
            ${canReinfect 
              ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-lg shadow-orange-500/30' 
              : 'bg-gray-700 cursor-not-allowed opacity-50'
            }
          `}
        >
          <Zap className="w-5 h-5" />
          Secondary Infection (Re-exposure)
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={!canReset}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
            transition-all duration-300 transform hover:scale-105
            ${canReset 
              ? 'bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 shadow-lg shadow-slate-500/30' 
              : 'bg-gray-700 cursor-not-allowed opacity-50'
            }
          `}
        >
          <RotateCcw className="w-5 h-5" />
          Reset Simulation
        </button>
      </div>

      {/* Status Display */}
      <div className="mt-4 p-4 bg-black/30 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-blue-300 font-semibold">Current State:</span>
            <span className="ml-2 text-cyan-300">{currentState.replace(/_/g, ' ').toUpperCase()}</span>
          </div>
          {hasMemoryCells && (
            <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-300 font-semibold">Memory Cells Active</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
