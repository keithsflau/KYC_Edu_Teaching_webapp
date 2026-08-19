import React, { useState } from "react";
import MacroView from "./components/MacroView";
import SarcomereView from "./components/SarcomereView";
import MolecularView from "./components/MolecularView";
import { Layers, ZoomIn, Microscope, Activity } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("macro");
  const [contraction, setContraction] = useState(0); // 0 to 100%

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-lg text-white shadow-md">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                Muscle Contraction Sim
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                HKDSE Biology • Support & Movement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <span>v1.0.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Navigation & Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* View Selector */}
          <nav className="flex flex-col gap-2 p-1 bg-white rounded-xl shadow border border-gray-100">
            <ViewButton
              id="macro"
              label="Macro: Antagonistic"
              icon={<Layers size={18} />}
              active={activeTab}
              onClick={setActiveTab}
            />
            <ViewButton
              id="sarcomere"
              label="Micro: Sarcomere"
              icon={<ZoomIn size={18} />}
              active={activeTab}
              onClick={setActiveTab}
            />
            <ViewButton
              id="molecular"
              label="Molecular: Cross-Bridge"
              icon={<Microscope size={18} />}
              active={activeTab}
              onClick={setActiveTab}
            />
          </nav>

          {/* Global Controls (If applicable) */}
          {activeTab !== "molecular" && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">Contraction Level</h3>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">
                  {contraction}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={contraction}
                onChange={(e) => setContraction(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>Relaxed</span>
                <span>Contracted</span>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs leading-relaxed text-blue-800 border-l-4 border-blue-400">
                <strong>Tip:</strong> Move the slider to observe how muscle
                shortening at the macro level corresponds to filament sliding at
                the micro level.
              </div>
            </div>
          )}

          {activeTab === "molecular" && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <h3 className="font-bold text-slate-800 mb-2">
                Molecular Mechanism
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Muscle contraction is driven by cyclic interactions between
                Myosin heads and Actin filaments. This requires{" "}
                <strong>ATP</strong> and <strong>Calcium</strong>.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div> Myosin
                  (Thick)
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div> Actin
                  (Thin)
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <div className="w-3 h-3 bg-lime-400 rounded-full"></div>{" "}
                  Calcium
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>{" "}
                  ATP/Energy
                </div>
              </div>
            </div>
          )}

          {/* Educational Note / Footer */}
          <div className="text-xs text-center text-gray-400 mt-8">
            HKDSE Biology Simulation Series
          </div>
        </div>

        {/* Right Column: Visualization Window */}
        <div className="lg:col-span-9 h-[600px] flex flex-col">
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
            {/* View Content */}
            <div className="absolute inset-0 p-1">
              {activeTab === "macro" && <MacroView contraction={contraction} />}
              {activeTab === "sarcomere" && (
                <SarcomereView contraction={contraction} />
              )}
              {activeTab === "molecular" && <MolecularView />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component for Menu Buttons
function ViewButton({ id, label, icon, active, onClick }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100 translate-x-1"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
        }
      `}
    >
      <div className={`${isActive ? "text-indigo-600" : "text-slate-400"}`}>
        {icon}
      </div>
      {label}
    </button>
  );
}

export default App;
