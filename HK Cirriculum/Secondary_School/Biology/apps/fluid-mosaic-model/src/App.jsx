import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { LipidBilayer } from './components/LipidBilayer';
import { ChannelProtein, CarrierProtein, Glycoprotein, Cholesterol } from './components/Proteins';
import { UI } from './components/UI';
import { COMPONENT_DATA } from './data/biologyData';

const COMPONENT_TYPES = Object.values(COMPONENT_DATA);

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [schematicMode, setSchematicMode] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTarget, setQuizTarget] = useState(null);
  const [temperature, setTemperature] = useState(1.0); // 0.1 to 2.0
  const [transportActive, setTransportActive] = useState(false);

  // Define protein layout
  const proteins = useMemo(() => [
    { id: 'ch1', type: 'Channel', position: [-5, 0, -4], radius: 1.5 },
    { id: 'ch2', type: 'Channel', position: [6, 0, 2], radius: 1.5 },
    { id: 'ca1', type: 'Carrier', position: [2, 0, -6], radius: 1.8 },
    { id: 'gl1', type: 'Glyco', position: [-3, 0, 4], radius: 1.5 },
    { id: 'gl2', type: 'Glyco', position: [8, 0, -3], radius: 1.5 },
    { id: 'cho1', type: 'Cholest', position: [0, 0, 0], radius: 0.5 },
    { id: 'cho2', type: 'Cholest', position: [-7, 0, 7], radius: 0.5 },
    { id: 'cho3', type: 'Cholest', position: [4, 0, 8], radius: 0.5 },
  ], []);

  // Excluded zones for lipids
  const excludedZones = useMemo(() => proteins.map(p => ({ x: p.position[0], z: p.position[2], radius: p.radius })), [proteins]);

  // Quiz Logic
  useEffect(() => {
    if (quizMode && !quizTarget) {
      // Pick a random target
      const targets = [COMPONENT_DATA.channel_protein, COMPONENT_DATA.carrier_protein, COMPONENT_DATA.glycoprotein, COMPONENT_DATA.phospholipid_head];
      setQuizTarget(targets[Math.floor(Math.random() * targets.length)]);
    } else if (!quizMode) {
      setQuizTarget(null);
      setQuizScore(0);
    }
  }, [quizMode, quizTarget]);

  const handleSelect = (data) => {
    if (quizMode) {
      if (data.name === quizTarget.name) {
        // Correct
        setQuizScore(s => s + 10);
        // Next target
        const targets = [COMPONENT_DATA.channel_protein, COMPONENT_DATA.carrier_protein, COMPONENT_DATA.glycoprotein, COMPONENT_DATA.phospholipid_head];
        let next = targets[Math.floor(Math.random() * targets.length)];
        while (next === quizTarget) next = targets[Math.floor(Math.random() * targets.length)];
        setQuizTarget(next);
        alert("Correct!");
      } else {
        alert("Try again! That is " + data.name);
      }
    } else {
      setSelectedItem(data);
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 relative">
      <UI
        selectedItem={selectedItem}
        onCloseSidebar={() => setSelectedItem(null)}
        schematicMode={schematicMode}
        setSchematicMode={setSchematicMode}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        quizScore={quizScore}
        quizPrompt={quizTarget}
        temperature={temperature}
        setTemperature={setTemperature}
        transportActive={transportActive}
        setTransportActive={setTransportActive}
      />

      <Canvas camera={{ position: [8, 8, 12], fov: 45 }}>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} maxDistance={30} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4f46e5" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset={schematicMode ? 'warehouse' : 'city'} />

        {/* Scene Content */}
        <group position={[0, 0, 0]}>
          <LipidBilayer
            onSelect={handleSelect}
            excludedPositions={excludedZones}
            schematicMode={schematicMode}
            temperature={temperature}
          />

          {proteins.map(p => {
            const props = {
              key: p.id,
              position: p.position,
              onSelect: handleSelect,
              schematicMode: schematicMode,
              transportActive: transportActive // Pass transport state
            };

            switch (p.type) {
              case 'Channel': return <ChannelProtein {...props} />;
              case 'Carrier': return <CarrierProtein {...props} />;
              case 'Glyco': return <Glycoprotein {...props} />;
              case 'Cholest': return <Cholesterol {...props} />;
              default: return null;
            }
          })}
        </group>

        {/* Background Particles/Fog for ambience */}
        <fog attach="fog" args={['#0f172a', 10, 50]} />
      </Canvas>
    </div>
  );
}



export default App;
