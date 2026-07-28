<template>
  <div class="relative w-full h-full min-h-[400px] flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
    <svg ref="svgRef" viewBox="0 0 800 600" class="w-full h-full max-w-4xl max-h-[80vh]">
      <!-- Background / Cytoplasm -->
      <rect x="0" y="0" width="800" height="600" fill="#1f2937" />

      <!-- Cell Membrane (Animatable) -->
      <path
        ref="cellMembrane"
        d="M 200,300 C 200,100 600,100 600,300 C 600,500 200,500 200,300 Z"
        fill="#374151"
        stroke="#9ca3af"
        stroke-width="3"
      />

      <!-- Spindle Fibers (Hidden initially) -->
      <g ref="spindleGroup" class="opacity-0">
        <!-- Left Pole Centriole -->
        <circle cx="220" cy="300" r="5" fill="#fcd34d" />
        <!-- Right Pole Centriole -->
        <circle cx="580" cy="300" r="5" fill="#fcd34d" />
        
        <!-- Fibers -->
        <line x1="220" y1="300" x2="580" y2="300" stroke="#fcd34d" stroke-width="1" opacity="0.5" />
        <line x1="220" y1="300" x2="400" y2="150" stroke="#fcd34d" stroke-width="1" opacity="0.3" />
        <line x1="220" y1="300" x2="400" y2="450" stroke="#fcd34d" stroke-width="1" opacity="0.3" />
        <line x1="580" y1="300" x2="400" y2="150" stroke="#fcd34d" stroke-width="1" opacity="0.3" />
        <line x1="580" y1="300" x2="400" y2="450" stroke="#fcd34d" stroke-width="1" opacity="0.3" />
      </g>

      <!-- Nucleus Area (Visual guide for Interphase) -->
      <circle ref="nuclearMembrane" cx="400" cy="300" r="120" fill="#111827" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,5" class="opacity-100" />

      <!-- Chromatin (Interphase) -->
      <g ref="chromatinGroup" class="opacity-100">
        <!-- Messy threads representing chromatin -->
        <path d="M 350,280 Q 360,250 380,270 T 410,260 T 440,280" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.7" />
        <path d="M 360,320 Q 380,350 400,330 T 430,340 T 450,310" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.7" />
        <path d="M 380,290 Q 400,260 420,290 T 390,320 T 360,300" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.7" />
        <path d="M 420,310 Q 440,340 410,320 T 430,280 T 400,270" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.7" />
        
        <!-- Duplicated chromatin (Hidden/0 opacity initially, shown in S/G2) -->
        <g ref="chromatinExtra" class="opacity-0">
           <path d="M 352,282 Q 362,252 382,272 T 412,262 T 442,282" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.7" />
           <path d="M 362,322 Q 382,352 402,332 T 432,342 T 452,312" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.7" />
           <path d="M 382,292 Q 402,262 422,292 T 392,322 T 362,302" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.7" />
           <path d="M 422,312 Q 442,342 412,322 T 432,282 T 402,272" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.7" />
        </g>
      </g>

      <!-- Chromosomes (Prophase onwards) -->
      <g ref="chromosomeGroup" class="opacity-0">
        <!-- Chromosome 1 (Large Paternal Blue) -->
        <g class="chromosome" data-id="1">
           <!-- Left Chromatid -->
           <path class="chromatid-left" d="M -10,-40 Q -15,-20 -5,0 Q -15,20 -10,40" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" />
           <!-- Right Chromatid -->
           <path class="chromatid-right" d="M 10,-40 Q 15,-20 5,0 Q 15,20 10,40" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" />
           <!-- Centromere -->
           <circle cx="0" cy="0" r="6" fill="#fbbf24" />
        </g>

        <!-- Chromosome 2 (Large Maternal Red) -->
        <g class="chromosome" data-id="2">
           <path class="chromatid-left" d="M -10,-40 Q -15,-20 -5,0 Q -15,20 -10,40" stroke="#ef4444" stroke-width="8" fill="none" stroke-linecap="round" />
           <path class="chromatid-right" d="M 10,-40 Q 15,-20 5,0 Q 15,20 10,40" stroke="#ef4444" stroke-width="8" fill="none" stroke-linecap="round" />
           <circle cx="0" cy="0" r="6" fill="#fbbf24" />
        </g>

        <!-- Chromosome 3 (Small Paternal Blue) -->
        <g class="chromosome" data-id="3">
           <path class="chromatid-left" d="M -8,-25 Q -12,-10 -4,0 Q -12,10 -8,25" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" />
           <path class="chromatid-right" d="M 8,-25 Q 12,-10 4,0 Q 12,10 8,25" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" />
           <circle cx="0" cy="0" r="5" fill="#fbbf24" />
        </g>

        <!-- Chromosome 4 (Small Maternal Red) -->
        <g class="chromosome" data-id="4">
           <path class="chromatid-left" d="M -8,-25 Q -12,-10 -4,0 Q -12,10 -8,25" stroke="#ef4444" stroke-width="8" fill="none" stroke-linecap="round" />
           <path class="chromatid-right" d="M 8,-25 Q 12,-10 4,0 Q 12,10 8,25" stroke="#ef4444" stroke-width="8" fill="none" stroke-linecap="round" />
           <circle cx="0" cy="0" r="5" fill="#fbbf24" />
        </g>
      </g>

      <!-- New Nuclei (Telophase) -->
      <g ref="newNuclei" class="opacity-0">
         <circle cx="280" cy="300" r="80" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,5" />
         <circle cx="520" cy="300" r="80" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,5" />
      </g>

    </svg>
    
    <!-- Stage overlay text if needed -->
    <div class="absolute top-4 left-4 pointer-events-none">
       <span class="text-2xl font-bold text-white drop-shadow-md">{{ stageDisplay }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref, computed } from 'vue'
import { useMitosisStore } from '../stores/mitosis'
import gsap from 'gsap'

const store = useMitosisStore()
const svgRef = ref(null)
const cellMembrane = ref(null)
const nuclearMembrane = ref(null)
const chromatinGroup = ref(null)
const chromatinExtra = ref(null)
const chromosomeGroup = ref(null)
const spindleGroup = ref(null)
const newNuclei = ref(null)

const stageDisplay = computed(() => store.currentStage.name)

// Initial positions for Random scattering in Prophase
// We will manage state via GSAP timelines
let tl = null

// Helper to get chromosomes
const getChromosomes = () => {
  const el = chromosomeGroup.value
  if(!el) return []
  return Array.from(el.querySelectorAll('.chromosome'))
}

// Stage Animations
const animateToStage = (stageId) => {
  if (tl) tl.kill() // Kill previous animation
  tl = gsap.timeline()

  const chromosomes = getChromosomes()
  if (!chromosomes.length) return

  // Defaults
  // Cell Shape
  const cellNormal = "M 200,300 C 200,100 600,100 600,300 C 600,500 200,500 200,300 Z"
  const cellElongated = "M 150,300 C 150,100 650,100 650,300 C 650,500 150,500 150,300 Z" // Anaphase stretch
  const cellCytokinesis = "M 150,300 C 150,100 380,100 380,250 C 380,300 420,300 420,250 C 420,100 650,100 650,300 C 650,500 420,500 420,350 C 420,300 380,300 380,350 C 380,500 150,500 150,300 Z" // Pinch (Approximation)
  // Actually, allow Cytokinesis to pinch more
  const cellSplit = "M 50,300 C 50,100 350,100 350,300 C 350,500 50,500 50,300 Z M 450,300 C 450,100 750,100 750,300 C 750,500 450,500 450,300 Z" // Two cells

  switch (stageId) {
    case 'g1':
      tl.to(cellMembrane.value, { attr: { d: cellNormal }, duration: 1 })
      tl.to(nuclearMembrane.value, { autoAlpha: 1, duration: 1 }, "<")
      tl.to(chromatinGroup.value, { autoAlpha: 1, duration: 1 }, "<")
      tl.to(chromatinExtra.value, { autoAlpha: 0, duration: 1 }, "<")
      tl.to(chromosomeGroup.value, { autoAlpha: 0, duration: 0.5 }, "<")
      tl.to(spindleGroup.value, { autoAlpha: 0, duration: 0.5 }, "<")
      tl.to(newNuclei.value, { autoAlpha: 0, duration: 0.5 }, "<")
      break

    case 's':
      tl.to(cellMembrane.value, { attr: { d: cellNormal }, duration: 1 })
      tl.to(nuclearMembrane.value, { autoAlpha: 1, duration: 0.5 }, "<")
      tl.to(chromatinGroup.value, { autoAlpha: 1, duration: 0.5 }, "<")
      tl.to(chromatinExtra.value, { autoAlpha: 1, duration: 2 }, "<") // Fade in duplicated threads
      tl.to(chromosomeGroup.value, { autoAlpha: 0 }, "<")
      break

    case 'g2':
      tl.to(chromatinExtra.value, { autoAlpha: 1, duration: 0.5 })
      tl.to(nuclearMembrane.value, { autoAlpha: 1 })
      break

    case 'prophase':
      // Hide chromatin, show chromosomes (scattered)
      tl.to(chromatinGroup.value, { autoAlpha: 0, duration: 1 })
      tl.to(nuclearMembrane.value, { autoAlpha: 0, duration: 1 }, "<")
      
      // Set initial scattered positions for chromosomes if not already there?
      // We'll just animate them from center or random to random
      chromosomes.forEach((chr, i) => {
        // Random positions within nucleus area roughly
        const angle = (i / 4) * Math.PI * 2
        const r = 50
        const x = 400 + Math.cos(angle) * r
        const y = 300 + Math.sin(angle) * r
        // Reset shapes to X
        const left = chr.querySelector('.chromatid-left')
        const right = chr.querySelector('.chromatid-right')
        gsap.set(left, { x: 0, rotation: 0 })
        gsap.set(right, { x: 0, rotation: 0 })

        tl.to(chr, { 
          x: x, 
          y: y, 
          scale: 1, 
          rotation: Math.random() * 360, 
          autoAlpha: 1, 
          duration: 1 
        }, "<")
      })
      
      tl.to(chromosomeGroup.value, { autoAlpha: 1, duration: 0 }, "<")
      tl.to(spindleGroup.value, { autoAlpha: 0.5, duration: 1 }, "<")
      break

    case 'metaphase':
      // Align at equator (x=400)
      tl.to(nuclearMembrane.value, { autoAlpha: 0, duration: 0.5 })
      
      // Clear any individual transforms on chromatids from previous states (like anaphase if reversing)
      chromosomes.forEach(chr => {
        const left = chr.querySelector('.chromatid-left')
        const right = chr.querySelector('.chromatid-right')
        gsap.to(left, { x: 0, rotation: 0, duration: 0.5 })
        gsap.to(right, { x: 0, rotation: 0, duration: 0.5 })
      })

      chromosomes.forEach((chr, i) => {
        // Vertical distribution along x=400
        const yPos = 220 + (i * 60) 
        
        tl.to(chr, { 
          x: 400, 
          y: yPos, 
          rotation: 90, // Rotate 90deg so they lie horizontally across the spindle fibers?
                        // Standard diagram: Spindles L-R. Chromosomes vertically stacked. 
                        // Arms point up/down or loose.
                        // If I rotate 90, the X lies on its side >-<. 
                        // Current paths are upright X. 
                        // If rotation is 0, they are X.
                        // Let's keep them rotation 0 (upright) but strictly aligned.
                        // Or maybe slight random wobble for realism.
                        // Wait, if they are pulled L-R, the centromeres align.
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut"
        }, "<")
      })
      tl.to(spindleGroup.value, { autoAlpha: 0.8, duration: 0.5 }, "<")
      break
    case 'anaphase':
      // Split chromatids
      tl.to(cellMembrane.value, { attr: { d: cellElongated }, duration: 1.5 })
      
      chromosomes.forEach((chr, i) => {
        const left = chr.querySelector('.chromatid-left')
        const right = chr.querySelector('.chromatid-right')

        // V shape logic for Anaphase
        // Left Chromatid moves Left: Vertex (centromere) leads. Arms point back (Right).
        // Current 'chromatid-left' path is roughly vertical with a curve.
        // We need to rotate it so the "top" (if it was an arm) points back?
        // Let's assume the path origin (0,0) is the centromere.
        // If we rotate it 90deg, it lies flat.
        // We want strict V shapes pointing to poles.
        // Left Pole is at x=220 (which is -180 relative to 400).
        // Right Pole is at x=580 (which is +180 relative to 400).
        
        // Left Chromatid: Move to x=-120. Rotate +90 so arms point up/down?
        // Actually, distinct V shape: < 
        // We need to rotate the left chromatid approx 90 degrees?
        // Let's try rotation 90 for left, -90 for right?
        
        tl.to(left, { 
          x: -140, // Move towards left pole
          rotation: 90, // Rotate to point vertex left, arms vertical-ish
          opacity: 1,
          duration: 1.5, 
          ease: "power2.inOut" 
        }, "<")
        
        // Right Chromatid
        tl.to(right, { 
          x: 140, // Move towards right pole
          rotation: -90, // Rotate to point vertex right
          opacity: 1,
          duration: 1.5, 
          ease: "power2.inOut" 
        }, "<")
      })
      break
    case 'telophase':
      // Cell pinch starts
      // Chromatids arrive at poles
      // Nuclear envelopes reform
      
      tl.to(cellMembrane.value, { attr: { d: cellCytokinesis }, duration: 1.5 })
      tl.to(newNuclei.value, { autoAlpha: 1, duration: 1 }, "<+=0.5")
      tl.to(spindleGroup.value, { autoAlpha: 0, duration: 0.5 }, "<")
      
      // Chromosomes fade, chromatin might return (optional, or kept as condensed for now)
      // They are far apart now.
      break

    case 'cytokinesis':
      // Full split
      // This is a bit tricky with one path. We can try to make the bridge very thin or use two circles.
      // For simplified SVG visualization, we can just pinch very hard.
      const pinched = "M 180,300 C 180,100 395,100 395,290 C 395,310 405,310 405,290 C 405,100 620,100 620,300 C 620,500 405,500 405,310 C 405,290 395,290 395,310 C 395,500 180,500 180,300 Z"
      
      tl.to(cellMembrane.value, { attr: { d: pinched }, duration: 1.5 })
      tl.to(chromosomeGroup.value, { autoAlpha: 0, duration: 1 }, "<") // Usually decondense
      tl.to(newNuclei.value, { autoAlpha: 1 }, "<")
      // Maybe show chromatin in new nuclei?
      break
  }
}

watch(() => store.currentStageIndex, (newVal) => {
  const stage = store.stages[newVal]
  animateToStage(stage.id)
})

onMounted(() => {
  // Set initial state
  const stage = store.stages[store.currentStageIndex]
  animateToStage(stage.id)
})
</script>

<style scoped>
.chromosome {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
