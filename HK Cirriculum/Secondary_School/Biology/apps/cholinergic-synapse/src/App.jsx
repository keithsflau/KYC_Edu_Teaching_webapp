import React, { useState } from 'react';
import { SynapseView } from './components/SynapseView';
import { ControlPanel } from './components/ControlPanel';
import { ToxicologyPanel } from './components/ToxicologyPanel';
import { STAGES } from './constants/stages';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [toxicologyMode, setToxicologyMode] = useState(null); // null, 'curare', 'nerve_gas'

  // Reset step when changing toxicology mode to ensure clean state animation
  const handleToxicologyChange = (mode) => {
    setToxicologyMode(mode);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30">
      <header className="p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Cholinergic Synapse Simulation
            </h1>
            <p className="text-slate-400 text-sm mt-1">Transmission across the synaptic cleft</p>
          </div>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-400 border border-slate-700">
              HKDSE Biology
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Visualization Stage */}
        <div className="lg:col-span-2 relative bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl backdrop-blur-sm min-h-[500px] flex flex-col">
          <div className="absolute top-4 right-4 z-10 bg-slate-900/80 p-2 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <div className="w-3 h-3 rounded-full bg-calcium"></div> Ca²⁺
              <div className="w-3 h-3 rounded-full bg-ach"></div> ACh
              <div className="w-3 h-3 rounded-full bg-sodium"></div> Na⁺
            </div>
          </div>

          <SynapseView
            step={currentStep}
            toxicology={toxicologyMode}
          />

          {/* Current Step Description Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-teal-400 mb-2">
                {STAGES[currentStep].title}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {STAGES[currentStep].description}
              </p>
              {toxicologyMode && (
                <div className="mt-2 p-2 bg-red-900/30 border border-red-500/30 rounded text-red-200 text-sm">
                  ⚠️ <strong>Toxicology Mode Active:</strong> {
                    toxicologyMode === 'curare' ? 'Curare inhibits ACh receptors.' :
                      toxicologyMode === 'nerve_gas' ? 'Nerve Gas inhibits Acetylcholinesterase.' : ''
                  }
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls Sidepanel */}
        <div className="space-y-6">
          <ControlPanel
            currentStep={currentStep}
            setStep={setCurrentStep}
            totalSteps={STAGES.length}
            toxicology={toxicologyMode}
          />

          <ToxicologyPanel
            currentMode={toxicologyMode}
            setMode={handleToxicologyChange}
          />

          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
            <h3 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-300 p-1 rounded">💡</span> Study Notes
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-slate-500">•</span>
                <span>
                  <strong>Mitochondria:</strong> Provide ATP for vesicle synthesis and movement. (Essential for re-synthesis).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-500">•</span>
                <span>
                  <strong>Unidirectionality:</strong> Vesicles only in pre-synaptic, receptors only on post-synaptic.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}



export default App;
