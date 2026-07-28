export const STAGES = [
    {
        id: 'arrival',
        title: '1. Arrival of Action Potential',
        description: 'An action potential arrives at the synaptic knob, depolarizing the pre-synaptic membrane.',
        action: 'Signal arrives',
    },
    {
        id: 'influx',
        title: '2. Calcium Influx',
        description: 'Voltage-gated Calcium channels open. Ca²⁺ ions diffuse into the synaptic knob from the tissue fluid.',
        action: 'Ca²⁺ enters',
    },
    {
        id: 'translocation',
        title: '3. Vesicle Translocation',
        description: 'The influx of Ca²⁺ causes synaptic vesicles containing Acetylcholine (ACh) to move toward the pre-synaptic membrane.',
        action: 'Vesicles move',
    },
    {
        id: 'exocytosis',
        title: '4. Exocytosis',
        description: 'Vesicles fuse with the pre-synaptic membrane, releasing ACh into the synaptic cleft.',
        action: 'ACh released',
    },
    {
        id: 'binding',
        title: '5. Diffusion & Binding',
        description: 'ACh diffuses across the synaptic cleft and binds to specific receptor sites on Na⁺ channels of the post-synaptic membrane.',
        action: 'ACh binds',
    },
    {
        id: 'depolarization',
        title: '6. Depolarization (EPSP)',
        description: 'Na⁺ channels open. Na⁺ ions rush into the post-synaptic neuron, causing depolarization (Excitatory Post-Synaptic Potential).',
        action: 'Na⁺ enters',
    },
    {
        id: 'termination',
        title: '7. Termination',
        description: 'Acetylcholinesterase hydrolyzes ACh into acetate and choline. Channels close. Choline is reabsorbed for recycling.',
        action: 'Breakdown',
    },
];
