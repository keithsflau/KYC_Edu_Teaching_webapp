<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
    <h3 class="text-lg font-semibold mb-2 text-gray-200">DNA Quantity per Cell</h3>
    <div class="h-64">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useMitosisStore } from '../stores/mitosis'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const store = useMitosisStore()

const chartData = computed(() => {
  const labels = store.stages.map(s => s.name.split(' ')[0]) // Short names
  const dataPoints = store.stages.map(s => s.dnaLevel)
  
  // Create point styles
  const pointBackgroundColors = store.stages.map((_, i) => 
    i === store.currentStageIndex ? '#3b82f6' : '#9ca3af'
  )
  const pointRadii = store.stages.map((_, i) => 
    i === store.currentStageIndex ? 8 : 4
  )

  return {
    labels,
    datasets: [
      {
        label: 'DNA Content (C)',
        data: dataPoints,
        borderColor: '#10b981',
        backgroundColor: '#10b98120',
        pointBackgroundColor: pointBackgroundColors,
        pointBorderColor: '#fff',
        pointRadius: pointRadii,
        tension: 0.2,
        fill: true
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 6,
      grid: {
        color: '#374151'
      },
      ticks: {
        color: '#9ca3af',
        callback: (value) => value + 'C'
      }
    },
    x: {
      grid: {
        color: '#374151'
      },
      ticks: {
        color: '#9ca3af'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => `DNA Level: ${context.raw}C`
      }
    }
  }
}
</script>
