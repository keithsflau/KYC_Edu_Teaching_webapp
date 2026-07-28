import React, { useEffect, useState } from 'react';
import { IonChannel } from './IonChannel';
import { Pump } from './Pump';
import { motion, AnimatePresence } from 'framer-motion';

export const MembraneVisualizer = ({ phase, channels }) => {
    // channels: { na: 'closed'|'open'|'inactivated', k: 'closed'|'open' }

    // Particle Logic
    // We simulate particles "flowing" when channels are open.
    // Na+ flows IN (Top to Bottom) during Depolarization
    // K+ flows OUT (Bottom to Top) during Repolarization

    const isDepolarizing = phase === 'depolarizing'; // Na+ Open
    const isRepolarizing = phase === 'repolarizing'; // K+ Open

    return (
        <div className="relative w-full h-[400px] bg-slate-900 overflow-hidden rounded-xl border border-slate-700 shadow-2xl">

            {/* Background Gradients for ECF/ICF */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-800 to-slate-900 border-b-4 border-slate-600">
                <span className="absolute top-4 left-4 text-xs font-bold text-slate-400">EXTRACELLULAR FLUID [Na+] High</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-800 to-slate-900 border-t-4 border-slate-600">
                <span className="absolute bottom-4 left-4 text-xs font-bold text-slate-400">INTRACELLULAR FLUID (CYTOPLASM) [K+] High</span>
            </div>

            {/* Membrane Structure */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-center items-center gap-2 md:gap-8 px-8">
                {/* Phospholipid Bilayer (Decorative segments between proteins) */}
                <MembraneSegment width="10%" />

                <Pump />

                <MembraneSegment width="10%" />

                <IonChannel type="Na" state={channels.na} />

                <MembraneSegment width="10%" />

                <IonChannel type="K" state={channels.k} />

                <MembraneSegment width="10%" />
            </div>

            {/* Dynamic Ion Particles */}
            <ParticleSystem active={isDepolarizing} type="Na" />
            <ParticleSystem active={isRepolarizing} type="K" />

        </div>
    );
};

const MembraneSegment = ({ width }) => (
    <div className="h-8 md:h-24 flex flex-col justify-between opacity-50" style={{ width }}>
        <div className="w-full flex justify-around">
            {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-slate-400" />)}
        </div>
        <div className="w-full flex justify-around">
            {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-slate-400" />)}
        </div>
    </div>
);

const ParticleSystem = ({ active, type }) => {
    // Generates drifting particles that rush when active
    const isNa = type === 'Na';
    const color = isNa ? 'bg-blue-400' : 'bg-purple-400';

    // Na starts Top (ECF), moves Bottom (ICF). K starts Bottom, moves Top.
    const startY = isNa ? 50 : 350;
    const endY = isNa ? 350 : 50;

    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!active) {
            setParticles([]);
            return;
        }

        const interval = setInterval(() => {
            const id = Math.random();
            const x = 30 + Math.random() * 40; // Approx percentage near center channels
            // Actually, we should target the specific channel?
            // VISUAL TRICK: Just spawn them broadly near center.

            // Refined x range based on channel position? 
            // Na channel is middle-right. K is far-right.
            // Let's randomize.

            setParticles(prev => [...prev, { id, x: isNa ? 55 : 75, leftOffset: Math.random() * 10 - 5 }]);
        }, 100); // Spawn rate

        return () => clearInterval(interval);
    }, [active, isNa]);

    return (
        <div className="absolute inset-0 pointer-events-none z-50">
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        className={`absolute w-3 h-3 rounded-full ${color} shadow-lg`}
                        initial={{ top: isNa ? '10%' : '90%', left: `${p.x + p.leftOffset}%`, opacity: 0 }}
                        animate={{ top: isNa ? '80%' : '20%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "linear" }}
                        onAnimationComplete={() => {
                            setParticles(prev => prev.filter(item => item.id !== p.id));
                        }}
                    >
                        <div className="absolute inset-0 bg-white opacity-50 rounded-full scale-50" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
