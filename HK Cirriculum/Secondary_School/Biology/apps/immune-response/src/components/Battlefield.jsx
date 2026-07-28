import { motion, AnimatePresence } from 'framer-motion'
import Pathogen from './Pathogen'
import Macrophage from './Macrophage'
import HelperTCell from './HelperTCell'
import BCellRow from './BCellRow'
import PlasmaCell from './PlasmaCell'
import MemoryCell from './MemoryCell'
import Antibody from './Antibody'
import { useState, useEffect, useCallback } from 'react'

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

// Fixed positions to prevent overlap
const PATHOGEN_SPOTS = [20, 35, 50, 65, 80] // X % at Y=15%
const PLASMA_SPOTS = [25, 45, 65] // X % at Y=80%
const MEMORY_SPOTS = [55, 65, 75] // X % at Y=80%

export default function Battlefield({ 
  currentState, 
  selectedAntigen, 
  activeBCellType, 
  hasMemoryCells,
  setTooltipMessage 
}) {
  const [pathogens, setPathogens] = useState([])
  const [showMacrophage, setShowMacrophage] = useState(false)
  const [macrophageHasAntigen, setMacrophageHasAntigen] = useState(false)
  const [showHelperT, setShowHelperT] = useState(false)
  const [plasmaCells, setPlasmaCells] = useState([])
  const [antibodies, setAntibodies] = useState([])
  const [memoryCells, setMemoryCells] = useState([])

  // --- 1. SPAWN PATHOGENS ---
  useEffect(() => {
    if (currentState === STATES.PRIMARY_INFECTION || currentState === STATES.SECONDARY_INFECTION) {
      // Spawn pathogens in strict slots - NO OVERLAP
      const newPathogens = PATHOGEN_SPOTS.map((x, i) => ({
        id: `pathogen-${Date.now()}-${i}`,
        x: x,
        y: -10, // Start above screen
        targetY: 15, // Fixed row
        antigen: selectedAntigen
      }))
      setPathogens(newPathogens)
      
      // Reset other actors
      setShowMacrophage(false)
      setMacrophageHasAntigen(false)
      setShowHelperT(false)
      setPlasmaCells([])
      setAntibodies([])
      if (currentState === STATES.PRIMARY_INFECTION) setMemoryCells([])

      // Sequence: Macrophage -> Consume -> Helper T
      setTimeout(() => setShowMacrophage(true), 1000)
      setTimeout(() => {
         // Simulate consumption by removing one specific pathogen safely
         setPathogens(prev => {
            if (prev.length === 0) return prev
            // Remove the first one (leftmost) to feed macrophage
            return prev.slice(1) 
         })
         setMacrophageHasAntigen(true)
      }, 2500)
      setTimeout(() => setShowHelperT(true), 4000)
    }
  }, [currentState, selectedAntigen])

  // --- 2. DEPLOY DEFENSES ---
  useEffect(() => {
    if (currentState === STATES.PRIMARY_RESPONSE || currentState === STATES.SECONDARY_RESPONSE) {
      const isSecondary = currentState === STATES.SECONDARY_RESPONSE
      const delay = isSecondary ? 500 : 1500

      // Spawn Plasma Cells
      setTimeout(() => {
        const slots = isSecondary ? [20, 35, 50, 65, 80] : PLASMA_SPOTS
        const newPlasma = slots.map((x, i) => ({
          id: `plasma-${Date.now()}-${i}`,
          x: x,
          y: 80
        }))
        setPlasmaCells(newPlasma)
        
        // Spawn Memory Cells (only in primary)
        if (!hasMemoryCells && !isSecondary) {
          setTimeout(() => {
            setMemoryCells(MEMORY_SPOTS.map((x, i) => ({
              id: `memory-${i}`,
              x: x,
              y: 80
            })))
          }, 2000)
        }
      }, delay)
    }
  }, [currentState, hasMemoryCells])

  // --- 3. SHOOTING MECHANIC ---
  useEffect(() => {
    if ((currentState === STATES.PRIMARY_RESPONSE || currentState === STATES.SECONDARY_RESPONSE) && plasmaCells.length > 0) {
      
      const fireInterval = setInterval(() => {
        setPathogens(currentPathogens => {
          if (currentPathogens.length === 0) return []

          // Pick a random target
          const targetIndex = Math.floor(Math.random() * currentPathogens.length)
          const target = currentPathogens[targetIndex]
          
          // Pick a random shooter
          const shooterIndex = Math.floor(Math.random() * plasmaCells.length)
          const shooter = plasmaCells[shooterIndex]

          // Create Projectile
          const newAntibody = {
            id: `ammo-${Date.now()}`,
            x: shooter.x,
            y: shooter.y,
            targetX: target.x,
            targetY: target.targetY,
            targetId: target.id
          }

          setAntibodies(prev => [...prev, newAntibody])

          // TRIGGER HIT after flight time
          // Flight time is approx 1.5s based on Antibody.jsx transition
          setTimeout(() => {
             setPathogens(prev => prev.filter(p => p.id !== target.id))
             setAntibodies(prev => prev.filter(a => a.id !== newAntibody.id))
             // Optional: Explosion effect?
          }, 1200) // Slightly earlier than animation end for snappy feel

          return currentPathogens // Return unchanged here, modified in timeout
        })
      }, 800) // Fire rate

      return () => clearInterval(fireInterval)
    }
  }, [currentState, plasmaCells])

  // Clear everything on Idle
  useEffect(() => {
      if (currentState === STATES.IDLE) {
          setPathogens([])
          setAntibodies([])
          setPlasmaCells([])
          setShowMacrophage(false)
          setShowHelperT(false)
      }
  }, [currentState])

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 rounded-xl overflow-hidden border-2 border-blue-500/30">
      
      {/* Grid Lines (Subtle) for Tech Feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(50,100,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(50,100,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* ZONE: Pathogens (Top) */}
      <AnimatePresence>
        {pathogens.map((p) => (
          <Pathogen 
            key={p.id}
            {...p}
            initialX={p.x}
            initialY={p.y}
            targetY={p.targetY}
          />
        ))}
      </AnimatePresence>

      {/* ZONE: Interactions (Middle-Left) */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
            {showMacrophage && <Macrophage hasAntigen={macrophageHasAntigen} antigenType={selectedAntigen} />}
            {showHelperT && <HelperTCell />}
        </AnimatePresence>
      </div>

      {/* ZONE: B-Cells (Middle Layer) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
         <BCellRow activeBCellType={activeBCellType} selectedAntigen={selectedAntigen} />
      </div>

      {/* ZONE: Defenders (Bottom) */}
      <AnimatePresence>
        {plasmaCells.map(p => (
            <PlasmaCell key={p.id} x={p.x} y={p.y} />
        ))}
        {memoryCells.map(m => (
            <MemoryCell key={m.id} x={m.x} y={m.y} isActive={currentState.includes('SECONDARY')} />
        ))}
      </AnimatePresence>

      {/* PROJECTILES */}
      <AnimatePresence>
        {antibodies.map(a => (
            <Antibody 
                key={a.id}
                x={a.x}
                y={a.y}
                targetX={a.targetX}
                targetY={a.targetY}
            />
        ))}
      </AnimatePresence>

      {/* State Label */}
      <div className="absolute bottom-2 right-2 bg-black/80 px-3 py-1 rounded text-xs font-mono text-blue-300 border border-blue-500/30">
        SYSTEM: {currentState.replace(/_/g, ' ')}
      </div>
    </div>
  )
}
