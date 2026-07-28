import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { COMPONENT_DATA } from '../data/biologyData';
import * as THREE from 'three';

// Helpers
const BaseShape = ({ children, onSelect, data, position, rotation, scale }) => {
    return (
        <group
            position={position}
            rotation={rotation}
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(data);
            }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            {children}
        </group>
    );
};

export function ChannelProtein({ position, onSelect, schematicMode, transportActive }) {
    const particleRef = useRef();

    useFrame((state) => {
        if (transportActive && particleRef.current) {
            const t = state.clock.getElapsedTime();
            // Cycle position from top (3) to bottom (-3)
            const y = 3 - (t * 2 % 6);
            particleRef.current.position.y = y;
            particleRef.current.visible = true;
        } else if (particleRef.current) {
            particleRef.current.visible = false;
        }
    });

    // Pore-like structure: A tube or stacked toruses
    return (
        <BaseShape position={position} onSelect={onSelect} data={COMPONENT_DATA.channel_protein}>
            {/* Simulation Particle */}
            <mesh ref={particleRef} position={[0, 3, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
            </mesh>

            {/* Outer Shell */}
            <mesh>
                <cylinderGeometry args={[1.0, 1.0, 4, 32, 1, true]} />
                {schematicMode
                    ? <meshBasicMaterial color={COMPONENT_DATA.channel_protein.color} side={THREE.DoubleSide} />
                    : <meshStandardMaterial color={COMPONENT_DATA.channel_protein.color} side={THREE.DoubleSide} roughness={0.5} />
                }
            </mesh>
            {/* Inner visual for clarity */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2, 0]}>
                <torusGeometry args={[1.0, 0.1, 16, 32]} />
                {schematicMode
                    ? <meshBasicMaterial color="#fff" />
                    : <meshStandardMaterial color="#fff" />
                }
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <torusGeometry args={[1.0, 0.1, 16, 32]} />
                {schematicMode
                    ? <meshBasicMaterial color="#fff" />
                    : <meshStandardMaterial color="#fff" />
                }
            </mesh>
        </BaseShape>
    );
}

export function CarrierProtein({ position, onSelect, schematicMode }) {
    // A shape that looks like it opens up
    return (
        <BaseShape position={position} onSelect={onSelect} data={COMPONENT_DATA.carrier_protein}>
            <group>
                <mesh position={[-0.6, 0, 0]} rotation={[0, 0, -0.2]}>
                    <capsuleGeometry args={[0.6, 3.5, 8, 16]} />
                    {schematicMode
                        ? <meshBasicMaterial color={COMPONENT_DATA.carrier_protein.color} />
                        : <meshStandardMaterial color={COMPONENT_DATA.carrier_protein.color} roughness={0.4} />
                    }
                </mesh>
                <mesh position={[0.6, 0, 0]} rotation={[0, 0, 0.2]}>
                    <capsuleGeometry args={[0.6, 3.5, 8, 16]} />
                    {schematicMode
                        ? <meshBasicMaterial color={COMPONENT_DATA.carrier_protein.color} />
                        : <meshStandardMaterial color={COMPONENT_DATA.carrier_protein.color} roughness={0.4} />
                    }
                </mesh>
            </group>
        </BaseShape>
    )
}

export function Glycoprotein({ position, onSelect, schematicMode }) {
    // Large globular protein + sugar chain
    return (
        <BaseShape position={position} onSelect={onSelect} data={COMPONENT_DATA.glycoprotein}>
            {/* Base Protein embedded in membrane */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                {schematicMode
                    ? <meshBasicMaterial color={COMPONENT_DATA.glycoprotein.color} />
                    : <meshStandardMaterial color={COMPONENT_DATA.glycoprotein.color} />
                }
            </mesh>
            {/* Sugar Chain */}
            <group position={[0, 1.2, 0]}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <mesh key={i} position={[Math.sin(i) * 0.4, i * 0.5, Math.cos(i) * 0.4]}>
                        <dodecahedronGeometry args={[0.25, 0]} />
                        <meshStandardMaterial color="#emerald" />
                    </mesh>
                ))}
            </group>
        </BaseShape>
    )
}

export function Cholesterol({ position, onSelect, schematicMode }) {
    // Small rigid yellow structure
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
        }
    })
    return (
        <BaseShape position={position} onSelect={onSelect} data={COMPONENT_DATA.cholesterol}>
            <mesh ref={ref} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.2, 0.8, 0.4]} />
                {schematicMode
                    ? <meshBasicMaterial color={COMPONENT_DATA.cholesterol.color} />
                    : <meshStandardMaterial color={COMPONENT_DATA.cholesterol.color} />
                }
            </mesh>
        </BaseShape>
    )
}
