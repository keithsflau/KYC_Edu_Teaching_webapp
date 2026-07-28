import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMitosisStore = defineStore('mitosis', () => {
    // Stages configuration
    const stages = [
        {
            id: 'g1',
            name: 'Interphase (G1)',
            description: 'Cell growth. Synthesis of proteins and organelles. DNA is in the form of chromatin.',
            dnaContent: '2C',
            chromosomeCount: 4,
            chromatidCount: 0, // No sister chromatids yet
            timeValue: 0, // For graph
            dnaLevel: 2, // For graph Y-axis
        },
        {
            id: 's',
            name: 'Interphase (S)',
            description: 'DNA Replication. Chromatin threads duplicate.',
            dnaContent: 'Increasing (2C -> 4C)',
            chromosomeCount: 4,
            chromatidCount: 'Increasing',
            timeValue: 1,
            dnaLevel: 3, // Ramp up
        },
        {
            id: 'g2',
            name: 'Interphase (G2)',
            description: 'Preparation for mitosis. DNA replication is complete.',
            dnaContent: '4C',
            chromosomeCount: 4,
            chromatidCount: 8, // 4 chromosomes, 2 chromatids each
            timeValue: 2,
            dnaLevel: 4,
        },
        {
            id: 'prophase',
            name: 'Prophase',
            description: 'Chromatin condenses into visible chromosomes. Nuclear membrane disintegrates.',
            dnaContent: '4C',
            chromosomeCount: 4,
            chromatidCount: 8,
            timeValue: 3,
            dnaLevel: 4,
        },
        {
            id: 'metaphase',
            name: 'Metaphase',
            description: 'Chromosomes align at the equator. Spindle fibers attach to centromeres.',
            dnaContent: '4C',
            chromosomeCount: 4,
            chromatidCount: 8,
            timeValue: 4,
            dnaLevel: 4,
        },
        {
            id: 'anaphase',
            name: 'Anaphase',
            description: 'Centromeres divide. Sister chromatids are pulled apart to opposite poles.',
            dnaContent: '4C',
            chromosomeCount: 8, // Temporarily 8 distinct chromosomes in the single cell
            chromatidCount: 0, // Separated now
            timeValue: 5,
            dnaLevel: 4,
        },
        {
            id: 'telophase',
            name: 'Telophase',
            description: 'Nuclear membranes reform around the two sets of chromosomes. Chromosomes uncoil.',
            dnaContent: '4C',
            chromosomeCount: 8, // Still one cell effectively until cytokinesis mostly done? Usually usually counted per nucleus or per cell. We'll say 8 in the cell.
            chromatidCount: 0,
            timeValue: 6,
            dnaLevel: 4,
        },
        {
            id: 'cytokinesis',
            name: 'Cytokinesis',
            description: 'Cytoplasm divides. Two daughter cells are formed.',
            dnaContent: '2C (per cell)',
            chromosomeCount: 4, // Per cell
            chromatidCount: 0,
            timeValue: 7,
            dnaLevel: 2, // Drops back
        },
    ]

    const currentStageIndex = ref(0)

    const currentStage = computed(() => stages[currentStageIndex.value])
    const progress = computed(() => currentStageIndex.value / (stages.length - 1))

    function nextStage() {
        if (currentStageIndex.value < stages.length - 1) {
            currentStageIndex.value++
        }
    }

    function prevStage() {
        if (currentStageIndex.value > 0) {
            currentStageIndex.value--
        }
    }

    function setStage(index) {
        if (index >= 0 && index < stages.length) {
            currentStageIndex.value = index
        }
    }

    return {
        stages,
        currentStageIndex,
        currentStage,
        progress,
        nextStage,
        prevStage,
        setStage,
    }
})
