import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Cytoplasm from "./components/Cytoplasm";
import MitochondrialMatrix from "./components/MitochondrialMatrix";
import InnerMembrane from "./components/InnerMembrane";
import AnaerobicPathways from "./components/AnaerobicPathways";
import Summary from "./components/Summary";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const [atp, setAtp] = useState(0);
  const [oxygen, setOxygen] = useState(true);
  const [organism, setOrganism] = useState("HUMAN"); // 'HUMAN' or 'YEAST'
  const [stage, setStage] = useState("IDLE"); // IDLE, SCROLL_START, GLYCOLYSIS, MATRIX, ETC, ANAEROBIC, FINISHED

  const startSimulation = () => {
    setAtp(0);
    setStage("GLYCOLYSIS");
  };

  const reset = () => {
    setAtp(0);
    setStage("IDLE");
  };

  // Helper to add ATP with visual feedback
  const addAtp = (amount) => {
    setAtp((prev) => prev + amount);
  };

  // State Transitions
  const handleGlycolysisComplete = () => {
    addAtp(2);
    // Decision point based on Oxygen
    if (oxygen) {
      setStage("MATRIX");
    } else {
      setStage("ANAEROBIC");
    }
  };

  const handleMatrixComplete = () => {
    addAtp(2);
    setStage("ETC");
  };

  const handleMatrixFail = () => {
    // If Matrix fails due to no oxygen, we eventually fall back to anaerobic
    // But typically we show it stopping first.
    setStage("ANAEROBIC");
  };

  const handleEtcComplete = () => {
    addAtp(34); // Big payout
    setStage("FINISHED");
  };

  const handleEtcFail = () => {
    // If ETC fails (oxygen cut), chain backs up.
    // In a simple sim, we can direct to Anaerobic to show that pathway taking over for survival
    setStage("ANAEROBIC");
  };

  const handleAnaerobicComplete = () => {
    // No ATP added, but cycle done
    setStage("FINISHED");
  };

  // Watch for Oxygen toggles during critical stages to redirect flow dynamically
  useEffect(() => {
    if (stage === "MATRIX" && !oxygen) {
      // Immediate feedback handled in component, but if it stays off, valid to switch?
      // Rely on component's onFail timer.
    }
    if (stage === "ANAEROBIC" && oxygen) {
      // If oxygen comes back while fermenting, usually we finish fermentation then next glucose goes aerobic.
      // For this sim, we just finish the current anaerobic step.
    }
  }, [oxygen, stage]);

  return (
    <div className="min-h-screen bg-slate-900 pb-20 font-sans selection:bg-blue-500/30">
      <Dashboard
        atp={atp}
        oxygen={oxygen}
        setOxygen={setOxygen}
        organism={organism}
        setOrganism={setOrganism}
        onReset={reset}
      />

      <main className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
        {stage === "IDLE" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700/50 max-w-lg"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                Welcome to the Cell
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Observe how cells convert Glucose into ATP energy. Toggle{" "}
                <strong>Oxygen</strong> to see the massive difference between
                Aerobic Respiration and Fermentation.
              </p>
              <button
                onClick={startSimulation}
                className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20"
              >
                <Play className="fill-white" /> Start Simulation
              </button>
            </motion.div>
          </div>
        )}

        {/* Stage 1: Cytoplasm */}
        {stage !== "IDLE" && (
          <Cytoplasm
            isActive={stage === "GLYCOLYSIS"}
            onComplete={handleGlycolysisComplete}
          />
        )}

        {/* Connector Arrow */}
        {stage !== "IDLE" && stage !== "GLYCOLYSIS" && (
          <div className="flex justify-center -my-2 relative z-10">
            <ArrowRight className="text-slate-600 rotate-90" size={32} />
          </div>
        )}

        {/* Aerobic Container */}
        {(stage === "MATRIX" ||
          stage === "ETC" ||
          (stage === "FINISHED" && atp > 20)) && (
          <div className="space-y-6">
            <MitochondrialMatrix
              isActive={stage === "MATRIX"}
              oxygen={oxygen}
              onComplete={handleMatrixComplete}
              onFail={handleMatrixFail}
            />

            {(stage === "ETC" || stage === "FINISHED") && (
              <div className="flex justify-center -my-2 relative z-10">
                <ArrowRight className="text-slate-600 rotate-90" size={32} />
              </div>
            )}

            <InnerMembrane
              isActive={stage === "ETC"}
              oxygen={oxygen}
              onComplete={handleEtcComplete}
              onFail={handleEtcFail}
            />
          </div>
        )}

        {/* Anaerobic Container */}
        {(stage === "ANAEROBIC" || (stage === "FINISHED" && atp <= 4)) && (
          <AnaerobicPathways
            isActive={stage === "ANAEROBIC" || stage === "FINISHED"}
            organism={organism}
            onComplete={handleAnaerobicComplete}
          />
        )}
      </main>

      {stage === "FINISHED" && (
        <Summary
          onRestart={startSimulation}
          isAerobic={atp > 10}
          totalAtp={atp}
        />
      )}
    </div>
  );
}

export default App;
