
import React from 'react';
import { BookOpen, HelpCircle, Layers, X, CheckCircle, AlertCircle, Thermometer, Zap } from 'lucide-react';

export function UI({
    selectedItem,
    onCloseSidebar,
    schematicMode,
    setSchematicMode,
    quizMode,
    setQuizMode,
    quizScore,
    quizPrompt,
    temperature,
    setTemperature,
    transportActive,
    setTransportActive
}) {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10">

            {/* Header / Title */}
            <div className="pointer-events-auto flex justify-between items-start">
                <h1 className="text-3xl font-bold bg-slate-900/80 p-3 rounded-lg backdrop-blur-sm border border-slate-700">
                    Fluid Mosaic Model
                    <span className="block text-sm font-normal text-slate-400 mt-1">HKDSE Biology</span>
                </h1>

                {/* Helper Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setSchematicMode(!schematicMode)}
                        className={`p - 3 rounded - full transition - colors ${schematicMode ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'} `}
                        title="Toggle Schematic View"
                    >
                        <Layers size={24} />
                    </button>
                    <button
                        onClick={() => setQuizMode(!quizMode)}
                        className={`p - 3 rounded - full transition - colors ${quizMode ? 'bg-purple-600' : 'bg-slate-800 hover:bg-slate-700'} `}
                        title="Toggle Quiz Mode"
                    >
                        <HelpCircle size={24} />
                    </button>
                </div>
            </div>

            {/* Experiment Controls */}
            {!quizMode && !selectedItem && (
                <div className="pointer-events-auto absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900/90 p-4 rounded-xl border border-slate-700 backdrop-blur flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Thermometer className="text-orange-400" size={24} />
                        <div className="flex flex-col">
                            <label className="text-xs text-slate-400 uppercase font-bold">Temperature (Fluidity)</label>
                            <input
                                type="range"
                                min="0.1"
                                max="3.0"
                                step="0.1"
                                value={temperature}
                                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                className="w-32 accent-orange-500"
                            />
                        </div>
                    </div>

                    <div className="h-8 w-px bg-slate-700"></div>

                    <button
                        onClick={() => setTransportActive(!transportActive)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${transportActive ? 'bg-green-600 text-white shadow-lg shadow-green-900/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        <Zap size={20} />
                        {transportActive ? 'Active Transport...' : 'Simulate Transport'}
                    </button>
                </div>
            )}

            {/* Quiz Prompt */}
            {quizMode && (
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-slate-900/90 p-6 rounded-xl border-2 border-purple-500 text-center pointer-events-auto">
                    <h2 className="text-xl font-bold mb-2 text-purple-300">Quiz Mode</h2>
                    <p className="text-lg mb-4">Find: <span className="font-bold text-white text-2xl">{quizPrompt?.name}</span></p>
                    <div className="text-slate-400 text-sm">Score: {quizScore}</div>
                </div>
            )}

            {/* Sidebar Info Panel */}
            {selectedItem && !quizMode && (
                <div className="absolute right-0 top-0 h-full w-80 bg-slate-900/95 border-l border-slate-700 p-6 shadow-2xl transform transition-transform pointer-events-auto backdrop-blur-md overflow-y-auto">
                    <button onClick={onCloseSidebar} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>

                    <div className="mt-8">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: selectedItem.color, color: '#000' }}>
                            {selectedItem.type}
                        </span>
                        <h2 className="text-3xl font-bold mb-4">{selectedItem.name}</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {selectedItem.description}
                        </p>

                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <h3 className="font-semibold text-slate-400 mb-2 uppercase tracking-wider text-sm">Biology Notes</h3>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                <li>Component of the cell membrane.</li>
                                <li>Contributes to the fluid mosaic nature.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
