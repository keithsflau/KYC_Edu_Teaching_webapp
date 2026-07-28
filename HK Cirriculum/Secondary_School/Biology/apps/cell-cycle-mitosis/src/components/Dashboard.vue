<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col">
    <h2 class="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-600 pb-2">Status Dashboard</h2>
    
    <div class="space-y-6 flex-grow">
      <div class="bg-gray-900 p-4 rounded-md border border-gray-700">
        <span class="block text-gray-400 text-sm uppercase tracking-wider mb-1">Current Stage</span>
        <span class="text-3xl font-bold text-white">{{ currentStage.name }}</span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-700 p-3 rounded-md">
           <span class="block text-gray-400 text-xs uppercase mb-1">DNA Content</span>
           <span class="text-xl font-mono text-green-400">{{ currentStage.dnaContent }}</span>
        </div>
        <div class="bg-gray-700 p-3 rounded-md">
           <span class="block text-gray-400 text-xs uppercase mb-1">Chromosomes</span>
           <span class="text-xl font-mono text-yellow-400">{{ currentStage.chromosomeCount }}</span>
        </div>
      </div>
      
      <div class="bg-gray-700 p-3 rounded-md">
         <span class="block text-gray-400 text-xs uppercase mb-1">Chromatid Count</span>
         <span class="text-xl font-mono text-purple-400">{{ currentStage.chromatidCount }}</span>
      </div>

      <div class="bg-gray-700 p-4 rounded-md border-l-4 border-blue-500">
        <span class="block text-gray-400 text-xs uppercase mb-2">Description</span>
        <p class="text-gray-200 leading-relaxed">{{ currentStage.description }}</p>
      </div>
    </div>

    <div class="mt-8 pt-6 border-t border-gray-600">
       <div class="flex items-center justify-between gap-4">
         <button 
           @click="store.prevStage()" 
           :disabled="store.currentStageIndex === 0"
           class="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white font-semibold transition"
         >
           Previous
         </button>
         
         <div class="text-center font-mono text-gray-400">
            {{ store.currentStageIndex + 1 }} / {{ store.stages.length }}
         </div>

         <button 
           @click="store.nextStage()" 
           :disabled="store.currentStageIndex === store.stages.length - 1"
           class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white font-semibold transition shadow-lg shadow-blue-900/50"
         >
           Next
         </button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMitosisStore } from '../stores/mitosis'

const store = useMitosisStore()
const currentStage = computed(() => store.currentStage)
</script>
