import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COMPONENT_DATA } from '../data/biologyData';

const COUNT = 25; // 25x25 grid
const SEPARATION = 1.2;
const JITTER = 0.05;

// Shared Geometries and Materials for performance
const headGeo = new THREE.SphereGeometry(0.4, 16, 16);
const tailGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8);
const headMat = new THREE.MeshStandardMaterial({ color: COMPONENT_DATA.phospholipid_head.color, roughness: 0.3, metalness: 0.1 });
const tailMat = new THREE.MeshStandardMaterial({ color: COMPONENT_DATA.phospholipid_tail.color, roughness: 0.8 });

export function LipidBilayer({ onSelect, excludedPositions = [], schematicMode, temperature = 1.0 }) {
    const headsRef = useRef();
    const tailsRef = useRef(); // Tails for both layers

    // Generate instance data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < COUNT; i++) {
            for (let j = 0; j < COUNT; j++) {
                const x = (i - COUNT / 2) * SEPARATION;
                const z = (j - COUNT / 2) * SEPARATION;

                // Exclude if close to a protein
                let skip = false;
                for (let p of excludedPositions) {
                    const dx = x - p.x;
                    const dz = z - p.z;
                    if (Math.sqrt(dx * dx + dz * dz) < p.radius) {
                        skip = true;
                        break;
                    }
                }
                if (skip) continue;

                temp.push({ x, z, initialY: 0, id: i * COUNT + j });
            }
        }
        return temp;
    }, [excludedPositions]);

    const dummy = new THREE.Object3D();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const speed = temperature;
        const amp = 0.15 * temperature;

        particles.forEach((p, i) => {
            // Wave motion
            const yOffset = Math.sin(t * (1.5 * speed) + p.x * 0.3) * amp + Math.cos(t * (1.2 * speed) + p.z * 0.3) * amp;

            // --- TOP LAYER ---
            // Head
            dummy.position.set(p.x, 1.8 + yOffset, p.z);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            headsRef.current.setMatrixAt(i * 2, dummy.matrix);

            // Tails (Together as one V shape or just two parallel lines? Parallel is cheaper)
            // Tail 1
            dummy.position.set(p.x - 0.15, 0.9 + yOffset, p.z);
            dummy.updateMatrix();
            tailsRef.current.setMatrixAt(i * 4, dummy.matrix);
            // Tail 2
            dummy.position.set(p.x + 0.15, 0.9 + yOffset, p.z);
            dummy.updateMatrix();
            tailsRef.current.setMatrixAt(i * 4 + 1, dummy.matrix);

            // --- BOTTOM LAYER ---
            const bottomYOffset = yOffset; // Move together or opposite? Together looks like membrane moving.

            // Head
            dummy.position.set(p.x, -1.8 + bottomYOffset, p.z);
            dummy.rotation.set(0, 0, 0); // Sphere rotation doesn't matter visually
            dummy.updateMatrix();
            headsRef.current.setMatrixAt(i * 2 + 1, dummy.matrix);

            // Tails
            dummy.position.set(p.x - 0.15, -0.9 + bottomYOffset, p.z);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            tailsRef.current.setMatrixAt(i * 4 + 2, dummy.matrix);

            dummy.position.set(p.x + 0.15, -0.9 + bottomYOffset, p.z);
            dummy.updateMatrix();
            tailsRef.current.setMatrixAt(i * 4 + 3, dummy.matrix);
        });

        headsRef.current.instanceMatrix.needsUpdate = true;
        tailsRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <instancedMesh
                ref={headsRef}
                args={[headGeo, headMat, particles.length * 2]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(COMPONENT_DATA.phospholipid_head);
                }}
                onPointerOver={(e) => document.body.style.cursor = 'pointer'}
                onPointerOut={(e) => document.body.style.cursor = 'auto'}
            >
                {schematicMode && <meshBasicMaterial color={COMPONENT_DATA.phospholipid_head.color} />}
            </instancedMesh>

            <instancedMesh
                ref={tailsRef}
                args={[tailGeo, tailMat, particles.length * 4]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(COMPONENT_DATA.phospholipid_tail);
                }}
            >
                {schematicMode && <meshBasicMaterial color={COMPONENT_DATA.phospholipid_tail.color} />}
            </instancedMesh>
        </group>
    );
}
