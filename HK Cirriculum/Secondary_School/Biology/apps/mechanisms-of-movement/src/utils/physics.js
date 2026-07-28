import { MOLECULE_TYPES, CANVAS_WIDTH, CANVAS_HEIGHT, MEMBRANE_WIDTH, GATES } from './constants';

const MEMBRANE_X = CANVAS_WIDTH / 2;
const MEMBRANE_LEFT = MEMBRANE_X - MEMBRANE_WIDTH / 2;
const MEMBRANE_RIGHT = MEMBRANE_X + MEMBRANE_WIDTH / 2;

export const createParticle = (type, x, y) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5 + 0.5; // Random speed
    return {
        id: Math.random().toString(36).substr(2, 9),
        type: type, // 'OXYGEN', etc. (keys of MOLECULE_TYPES)
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: MOLECULE_TYPES[type].radius,
        mass: MOLECULE_TYPES[type].mass,
    };
};

export const updateParticles = (particles, mode, pumpActiveRef) => {
    // pumpActiveRef is { active: boolean, count: number } - decremented when a particle is pumped

    return particles.map(p => {
        let { x, y, vx, vy, type } = p;

        // Apply Brownian-like jitter
        vx += (Math.random() - 0.5) * 0.1;
        vy += (Math.random() - 0.5) * 0.1;

        // Damping/Speed limit
        const speed = Math.sqrt(vx * vx + vy * vy);
        const maxSpeed = 2 / Math.sqrt(MOLECULE_TYPES[type].mass); // Heavier = slower
        if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed;
            vy = (vy / speed) * maxSpeed;
        }

        let nextX = x + vx;
        let nextY = y + vy;

        // Canvas Boundaries (Bounce)
        if (nextX < p.radius || nextX > CANVAS_WIDTH - p.radius) vx = -vx;
        if (nextY < p.radius || nextY > CANVAS_HEIGHT - p.radius) vy = -vy;

        // Membrane Collision Logic
        // Check if crossing the membrane zone
        const isCrossingLeft = x <= MEMBRANE_LEFT && nextX > MEMBRANE_LEFT;
        const isCrossingRight = x >= MEMBRANE_RIGHT && nextX < MEMBRANE_RIGHT;

        if (isCrossingLeft || isCrossingRight) {
            let canPass = false;

            // 1. Simple Diffusion (O2) - Passes through lipids (everywhere except maybe proteins, but simplifying: distinct gaps or just everywhere)
            // Prompt: "Gaps for Simple Diffusion". "Observation: Molecules pass directly through lipids".
            // We'll let O2 pass everywhere for simplicity unless it hits a protein region? 
            // Actually, let's say O2 passes everywhere.
            if (type === 'OXYGEN') {
                canPass = true;
            }

            // 2. Facilitated Diffusion (Glucose) - Channel Protein
            if (type === 'GLUCOSE') {
                // Check if within Channel Y range
                if (y > GATES.CHANNEL.start && y < GATES.CHANNEL.end) {
                    canPass = true;
                }
            }

            // 3. Osmosis (Water) - Aquaporin
            if (type === 'WATER') {
                if (y > GATES.AQUAPORIN.start && y < GATES.AQUAPORIN.end) {
                    canPass = true;
                }
            }

            // 4. Active Transport (Na+) - Pump
            // Only passes if pump is active. 
            // Pump logic is tricky. Usually pumps are one-way.
            // Task: "Low outside (Left), High inside (Right)". user clicks button -> pumps items.
            // So movement is Left -> Right only?
            // If Na+ tries to cross Right -> Left, it should bounce (against gradient? or just pump is one way?).
            // Usually pumps prevent backflow.
            // If Pump is Active (User clicked), allow Left -> Right passage for a specific number of particles.
            if (type === 'SODIUM') {
                if (y > GATES.PUMP.start && y < GATES.PUMP.end) {
                    if (isCrossingLeft && pumpActiveRef.current > 0) {
                        // Crossing Left -> Right (entering from left)
                        canPass = true;
                        pumpActiveRef.current -= 1; // Consume a "pump charge"
                    }
                    // Right -> Left is blocked (maintain gradient)
                }
            }

            if (!canPass) {
                vx = -vx; // Bounce
                nextX = x + vx; // Recalculate nextX based on bounce
            }
        }

        return { ...p, x: nextX, y: nextY, vx, vy };
    });
};

export const generateParticles = (type, countLeft, countRight) => {
    const particles = [];
    const MEMBRANE_X = CANVAS_WIDTH / 2;
    const GAP = MEMBRANE_WIDTH / 2 + 5; // Buffer from membrane

    // Left Side (Extracellular)
    for (let i = 0; i < countLeft; i++) {
        const x = Math.random() * (MEMBRANE_X - GAP - 10) + 5;
        const y = Math.random() * (CANVAS_HEIGHT - 10) + 5;
        particles.push(createParticle(type, x, y));
    }

    // Right Side (Cytoplasm)
    for (let i = 0; i < countRight; i++) {
        const x = Math.random() * (CANVAS_WIDTH - (MEMBRANE_X + GAP) - 10) + (MEMBRANE_X + GAP);
        const y = Math.random() * (CANVAS_HEIGHT - 10) + 5;
        particles.push(createParticle(type, x, y));
    }

    return particles;
};
