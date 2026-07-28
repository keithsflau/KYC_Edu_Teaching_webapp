import React, { useRef, useEffect, useState } from 'react';
import { CONSTANTS, TYPES } from '../lib/simulation-types';

export function ReactionChamber({
    temperature,
    pH,
    substrateConcentration,
    inhibitorType,
    isPlaying,
    onStatsUpdate,
    onEvent
}) {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const stateRef = useRef({
        particles: [],
        enzymes: [],
        lastFrameTime: 0,
        stats: { reactions: 0, time: 0 }
    });

    // Initialize Enzymes
    useEffect(() => {
        const initEnzymes = [];
        for (let i = 0; i < 4; i++) {
            initEnzymes.push({
                id: `enz-${i}`,
                type: TYPES.ENZYME,
                x: Math.random() * (CONSTANTS.CHAMBER_WIDTH - 100) + 50,
                y: Math.random() * (CONSTANTS.CHAMBER_HEIGHT - 100) + 50,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                angle: Math.random() * Math.PI * 2,
                state: 'empty',
                timer: 0,
                denatured: false
            });
        }
        stateRef.current.enzymes = initEnzymes;
        stateRef.current.particles = [];
    }, []);

    // Sync Particles
    useEffect(() => {
        const currentSubstrates = stateRef.current.particles.filter(p => p.type === TYPES.SUBSTRATE);
        const targetCount = Math.floor(substrateConcentration / 1.5);

        if (currentSubstrates.length < targetCount) {
            const needed = targetCount - currentSubstrates.length;
            for (let i = 0; i < needed; i++) {
                stateRef.current.particles.push({
                    id: `sub-${Math.random()}`,
                    type: TYPES.SUBSTRATE,
                    x: Math.random() * CONSTANTS.CHAMBER_WIDTH,
                    y: Math.random() * CONSTANTS.CHAMBER_HEIGHT,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                });
            }
        } else if (currentSubstrates.length > targetCount) {
            let removed = 0;
            const diff = currentSubstrates.length - targetCount;
            stateRef.current.particles = stateRef.current.particles.filter(p => {
                if (p.type === TYPES.SUBSTRATE && removed < diff) {
                    removed++;
                    return false;
                }
                return true;
            });
        }

        stateRef.current.particles = stateRef.current.particles.filter(p => !p.type.includes('inhibitor'));

        if (inhibitorType !== 'none') {
            const inhibitorCount = 15;
            const type = inhibitorType === 'competitive' ? TYPES.INHIBITOR_COMP : TYPES.INHIBITOR_NON;
            for (let i = 0; i < inhibitorCount; i++) {
                stateRef.current.particles.push({
                    id: `inh-${Math.random()}`,
                    type: type,
                    x: Math.random() * CONSTANTS.CHAMBER_WIDTH,
                    y: Math.random() * CONSTANTS.CHAMBER_HEIGHT,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                });
            }
        }

    }, [substrateConcentration, inhibitorType]);

    // Denaturation Logic
    useEffect(() => {
        stateRef.current.enzymes.forEach(enz => {
            if (temperature > 55) {
                if (!enz.denatured) {
                    enz.denatured = true;
                    enz.state = 'denatured';
                    onEvent && onEvent("Denaturation! Active site destroyed.");
                }
            }
        });
    }, [temperature]);

    const animate = (time) => {
        if (!isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
            return;
        }
        const deltaTime = time - stateRef.current.lastFrameTime;
        stateRef.current.lastFrameTime = time;

        updatePhysics(deltaTime);
        draw();

        requestRef.current = requestAnimationFrame(animate);

        // Stats update
        if (Math.random() < 0.1) {
            onStatsUpdate && onStatsUpdate(stateRef.current.stats);
        }
    };

    const updatePhysics = (dt) => {
        const { enzymes, particles } = stateRef.current;
        if (temperature > 55) {
            enzymes.forEach(e => {
                if (!e.denatured) { e.denatured = true; e.state = 'denatured'; }
            });
        }

        const speedFactor = Math.max(0.1, temperature / 30);

        // Gaussian pH Efficiency
        const phEfficiency = Math.exp(-Math.pow(pH - 7, 2) / (2 * Math.pow(1.5, 2)));

        particles.forEach(p => {
            p.x += p.vx * speedFactor;
            p.y += p.vy * speedFactor;
            if (p.x < 0 || p.x > CONSTANTS.CHAMBER_WIDTH) p.vx *= -1;
            if (p.y < 0 || p.y > CONSTANTS.CHAMBER_HEIGHT) p.vy *= -1;
            p.x = Math.max(0, Math.min(CONSTANTS.CHAMBER_WIDTH, p.x));
            p.y = Math.max(0, Math.min(CONSTANTS.CHAMBER_HEIGHT, p.y));
        });

        enzymes.forEach(e => {
            e.x += e.vx * speedFactor * 0.2;
            e.y += e.vy * speedFactor * 0.2;
            if (e.x < 0 || e.x > CONSTANTS.CHAMBER_WIDTH) e.vx *= -1;
            if (e.y < 0 || e.y > CONSTANTS.CHAMBER_HEIGHT) e.vy *= -1;
            e.angle += 0.005 * speedFactor;
        });

        enzymes.forEach(e => {
            if (e.denatured) return;

            if (e.state === 'bound') {
                e.timer -= 1 * speedFactor;
                if (e.timer <= 0) {
                    e.state = 'empty';
                    particles.push({
                        id: `prod-${Math.random()}`,
                        type: TYPES.PRODUCT,
                        x: e.x, y: e.y,
                        vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3
                    });
                    stateRef.current.stats.reactions++;
                    onEvent && onEvent("Reaction Complete!");
                }
                return;
            }

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                if (p.type === TYPES.PRODUCT) continue;

                const dx = p.x - e.x;
                const dy = p.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONSTANTS.ENZYME_RADIUS + CONSTANTS.SUBSTRATE_RADIUS) {
                    if (Math.random() > phEfficiency) continue;

                    if (p.type === TYPES.SUBSTRATE) {
                        e.state = 'bound';
                        e.timer = 60;
                        particles.splice(i, 1);
                        i--;
                        break;
                    }

                    if (p.type === TYPES.INHIBITOR_COMP) {
                        e.state = 'bound_inhibitor';
                        e.timer = 120;
                        particles.splice(i, 1);
                        i--;
                        break;
                    }
                }
                if (p.type === TYPES.INHIBITOR_NON && dist < CONSTANTS.ENZYME_RADIUS + 5) {
                    if (Math.random() < 0.01) { // Chance to distort
                        // Maybe visual effect?
                    }
                }
            }

            if (e.state === 'bound_inhibitor') {
                e.timer -= 1 * speedFactor;
                if (e.timer <= 0) {
                    e.state = 'empty';
                    particles.push({
                        id: `inh-${Math.random()}`,
                        type: TYPES.INHIBITOR_COMP,
                        x: e.x, y: e.y,
                        vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2
                    });
                }
            }
        });
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Enzymes (Pacman)
        stateRef.current.enzymes.forEach(e => {
            ctx.save();
            ctx.translate(e.x, e.y);
            ctx.rotate(e.angle);

            // Body
            ctx.fillStyle = e.denatured ? '#94A3B8' : '#3B82F6';
            if (e.state === 'bound' || e.state === 'bound_inhibitor') {
                // Closed mouth
                ctx.beginPath();
                ctx.arc(0, 0, CONSTANTS.ENZYME_RADIUS, 0, Math.PI * 2);
                ctx.fill();

                // Draw content
                if (e.state === 'bound') {
                    ctx.fillStyle = '#EAB308'; // Substrate
                    ctx.beginPath();
                    ctx.arc(0, 0, 10, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 8px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('S', 0, 0);

                } else {
                    ctx.fillStyle = '#EF4444'; // Inhibitor
                    ctx.beginPath();
                    ctx.arc(0, 0, 10, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 8px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('I', 0, 0);
                }

            } else {
                // Open mouth
                if (e.denatured) {
                    ctx.beginPath();
                    ctx.moveTo(CONSTANTS.ENZYME_RADIUS, 0);
                    for (let i = 1; i < 8; i++) {
                        ctx.lineTo(
                            CONSTANTS.ENZYME_RADIUS * Math.cos(i * Math.PI / 4) + (Math.random() * 5),
                            CONSTANTS.ENZYME_RADIUS * Math.sin(i * Math.PI / 4) + (Math.random() * 5)
                        );
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, CONSTANTS.ENZYME_RADIUS, 0.2 * Math.PI, 1.8 * Math.PI);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                }
            }
            ctx.restore();

            // Label for Enzyme (Above object to avoid rotation issues)
            ctx.fillStyle = '#1e293b'; // Slate-800
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Enzyme', e.x, e.y - CONSTANTS.ENZYME_RADIUS - 5);
        });

        // Draw Particles with Layers
        stateRef.current.particles.forEach(p => {
            ctx.beginPath();
            let label = '';
            let textColor = '#ffffff';

            if (p.type === TYPES.SUBSTRATE) {
                ctx.fillStyle = '#EAB308'; // Yellow
                ctx.arc(p.x, p.y, CONSTANTS.SUBSTRATE_RADIUS, 0, Math.PI * 2);
                label = 'S';
                textColor = '#000000';
            } else if (p.type === TYPES.PRODUCT) {
                ctx.fillStyle = '#22C55E'; // Green
                ctx.arc(p.x, p.y, CONSTANTS.PRODUCT_RADIUS, 0, Math.PI * 2);
                label = 'P';
            } else if (p.type === TYPES.INHIBITOR_COMP) {
                ctx.fillStyle = '#EF4444'; // Red
                ctx.rect(p.x - 5, p.y - 5, 10, 10);
                ctx.fill();
                label = 'I';
                // Custom text pos for rect
                ctx.fillStyle = textColor;
                ctx.font = 'bold 8px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, p.x, p.y);
                return;
            } else if (p.type === TYPES.INHIBITOR_NON) {
                ctx.fillStyle = '#A855F7'; // Purple
                ctx.rect(p.x - 5, p.y - 5, 10, 10);
                ctx.fill();
                label = 'I';
                ctx.fillStyle = textColor;
                ctx.font = 'bold 8px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, p.x, p.y);
                return;
            }
            ctx.fill();

            // Draw Label for circles
            if (label) {
                ctx.fillStyle = textColor;
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, p.x, p.y);
            }
        });
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying, temperature, pH, substrateConcentration, inhibitorType]);

    return (
        <div className="relative w-full h-[600px] bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden shadow-inner">
            <canvas
                ref={canvasRef}
                width={CONSTANTS.CHAMBER_WIDTH}
                height={CONSTANTS.CHAMBER_HEIGHT}
                className="w-full h-full block cursor-crosshair"
            />

            {/* Legend Box */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 shadow-sm text-xs select-none">
                <h4 className="font-bold text-slate-700 mb-2 border-b border-slate-100 pb-1">Legend</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Enzyme</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Substrate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Product</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-[1px]"></div>
                        <span>Comp. Inhibitor</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-[1px]"></div>
                        <span>Non-Comp. Inhibitor</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
