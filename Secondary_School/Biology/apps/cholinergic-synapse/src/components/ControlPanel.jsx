import React from 'react';
import { Play, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

export function ControlPanel({ currentStep, setStep, totalSteps, toxicology }) {

    const handleNext = () => {
        if (currentStep < totalSteps - 1) setStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setStep(currentStep - 1);
    };

    const handleReset = () => {
        setStep(0);
    };

    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-slate-200">Simulation Control</h3>
                <span className="text-xs font-mono text-slate-500">Step {currentStep + 1}/{totalSteps}</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous Step"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex-1 space-y-2">
                    <input
                        type="range"
                        min="0"
                        max={totalSteps - 1}
                        value={currentStep}
                        onChange={(e) => setStep(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 px-1 uppercase tracking-wider">
                        <span>Start</span>
                        <span>End</span>
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentStep === totalSteps - 1} // Could loop, but maybe linear is better for education
                    className="p-3 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white shadow-lg shadow-teal-900/20"
                    title="Next Step"
                >
                    {currentStep === totalSteps - 1 ? <RotateCcw size={20} onClick={handleReset} /> : <ChevronRight size={20} />}
                </button>
            </div>
        </div>
    );
}
