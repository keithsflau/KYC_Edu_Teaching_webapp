import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MOLECULE_TYPES, CANVAS_WIDTH, CANVAS_HEIGHT, MEMBRANE_WIDTH, GATES } from '../utils/constants';
import { updateParticles, generateParticles } from '../utils/physics';

const ParticleSystem = forwardRef(({ mode, type, initialLeft, initialRight, onUpdateStats, pumpTrigger }, ref) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const requestRef = useRef();
    const pumpActiveRef = useRef(0); // number of ions to pump

    // Initialize/Reset particles when mode or type changes (or explicit reset)
    const resetParticles = (left, right) => {
        particlesRef.current = generateParticles(type, left, right);
    };

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
        reset: (left, right) => resetParticles(left, right),
        addParticles: (side, count) => {
            const newParts = generateParticles(type, side === 'left' ? count : 0, side === 'right' ? count : 0);
            particlesRef.current = [...particlesRef.current, ...newParts];
        },
        clear: () => {
            particlesRef.current = [];
        }
    }));

    // Handle Pump Trigger
    useEffect(() => {
        if (pumpTrigger > 0) {
            pumpActiveRef.current += 3; // Pump 5 ions per click
        }
    }, [pumpTrigger]);

    // Initial Setup
    useEffect(() => {
        resetParticles(initialLeft, initialRight);
    }, [mode, type]); // Reset on mode/type change

    // Animation Loop
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Physics Step
        particlesRef.current = updateParticles(particlesRef.current, mode, pumpActiveRef);

        // Count Particles for Stats
        const MEMBRANE_X = CANVAS_WIDTH / 2;
        const leftCount = particlesRef.current.filter(p => p.x < MEMBRANE_X).length;
        const rightCount = particlesRef.current.length - leftCount;
        if (onUpdateStats) onUpdateStats({ left: leftCount, right: rightCount });

        // Render Step
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Backgrounds
        ctx.fillStyle = '#E0F2FE'; // Light Blue (Extracellular)
        ctx.fillRect(0, 0, MEMBRANE_X, CANVAS_HEIGHT);
        ctx.fillStyle = '#FEF3C7'; // Light Yellow (Cytoplasm)
        ctx.fillRect(MEMBRANE_X, 0, CANVAS_WIDTH - MEMBRANE_X, CANVAS_HEIGHT);

        // Draw Particles
        particlesRef.current.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = MOLECULE_TYPES[p.type].color;
            ctx.fill();
        });

        // Draw Membrane
        drawMembrane(ctx, mode);

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [mode]); // Re-bind if mode changes (though animate closes over refs so it interacts fine)

    const drawMembrane = (ctx, mode) => {
        const mx = CANVAS_WIDTH / 2;
        const mw = MEMBRANE_WIDTH;
        const leftX = mx - mw / 2;
        const rightX = mx + mw / 2;

        // Helper to draw Lipid Block
        const drawLipids = (yStart, yEnd) => {
            const headRadius = 6;
            const spacing = 14;

            for (let y = yStart; y < yEnd; y += spacing) {
                // Left Layer
                ctx.beginPath();
                ctx.arc(leftX, y, headRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#9CA3AF'; // Gray Heads
                ctx.fill();
                // Tails
                ctx.strokeStyle = '#D1D5DB';
                ctx.beginPath();
                ctx.moveTo(leftX + headRadius, y);
                ctx.lineTo(mx, y);
                ctx.stroke();

                // Right Layer
                ctx.beginPath();
                ctx.arc(rightX, y, headRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#9CA3AF';
                ctx.fill();
                // Tails
                ctx.beginPath();
                ctx.moveTo(rightX - headRadius, y);
                ctx.lineTo(mx, y);
                ctx.stroke();
            }
        };

        // Draw based on Mode/Structure
        // Lipid covers all EXCEPT existing gates for CURRENT mode?
        // Usually all proteins exist simultaneously in a cell, but for "Mode" focusing, maybe we highlight or only show relevant?
        // Prompt: "Switch between 4 modes ... Observation: ..."
        // Suggests only the relevant mechanism is highlighted or active.
        // However, for realism, maybe show all but only one is "Active" or simply show all.
        // Let's show ALL structures but physics only interacts with relevant ones (handled in updateParticles).
        // Or to avoid confusion: "Observation: Molecules only pass through specific channels".
        // I will render ALL structures.

        let structures = [
            { ...GATES.CHANNEL, color: '#34D399', label: 'Channel' }, // Emerald
            { ...GATES.PUMP, color: '#F87171', label: 'Na+/K+ Pump' }, // Red
            { ...GATES.AQUAPORIN, color: '#60A5FA', label: 'Aquaporin' } // Blue
        ];

        // Sort by Y to draw lipids in between
        structures.sort((a, b) => a.start - b.start);

        let currentY = 0;
        structures.forEach(struct => {
            // Draw Lipids up to struct
            drawLipids(currentY, struct.start);

            // Draw Structure
            ctx.fillStyle = struct.color;
            // Draw a block spanning membrane width
            ctx.fillRect(leftX - 5, struct.start, mw + 10, struct.end - struct.start);

            // Label
            ctx.fillStyle = '#000';
            ctx.font = '10px Arial';
            ctx.fillText(struct.label, leftX - 10, struct.start + 15);

            // Visual State (Open/Closed) animation?
            if (struct.type === 'pump' && pumpActiveRef.current > 0) {
                ctx.fillStyle = '#FCD34D'; // Yellow flash
                ctx.fillRect(mx - 5, struct.start + 10, 10, 10);
            }

            currentY = struct.end;
        });

        // Draw remaining lipids
        drawLipids(currentY, CANVAS_HEIGHT);
    };

    return (
        <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl bg-white">
            <div className="absolute top-2 left-2 text-sm font-bold text-blue-800 bg-white/80 px-2 rounded">
                Extracellular Fluid
            </div>
            <div className="absolute top-2 right-2 text-sm font-bold text-yellow-800 bg-white/80 px-2 rounded">
                Cytoplasm
            </div>
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="block"
            />
        </div>
    );
});

ParticleSystem.displayName = 'ParticleSystem';

export default ParticleSystem;
