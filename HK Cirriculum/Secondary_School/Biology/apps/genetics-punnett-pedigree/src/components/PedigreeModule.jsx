
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function PedigreeModule() {
    const [scenario, setScenario] = useState('challenge1'); // challenge1
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }

    // Data for Challenge 1: Unaffected Parents, Affected Daughter
    // This proves Autosomal Recessive.
    // Why?
    // 1. Unaffected x Unaffected -> Affected means Trait is Recessive (Parents are carriers).
    // 2. Affected Daughter (aa or XrXr). 
    //    If X-linked Recessive: Father (Unaffected) is XRY. Daughter gets XR from father. Must be Carrier (Unaffected).
    //    So cannot be X-linked Recessive.
    //    Therefore Autosomal Recessive.

    const handleGuess = (type) => {
        if (type === 'AR') {
            setFeedback({
                type: 'success',
                message: 'Correct! Parents must be carriers (Aa x Aa) to have an affected child (aa). Since the father is unaffected, he cannot pass an affected X chromosome to a daughter if it were sex-linked recessive (he has only X^R).'
            });
        } else if (type === 'AD') {
            setFeedback({
                type: 'error',
                message: 'Incorrect. If the trait were Dominant, at least one parent must be affected to pass the allele to the child (unless new mutation).'
            });
        } else if (type === 'XR') {
            setFeedback({
                type: 'error',
                message: 'Incorrect. Verify the father! In X-linked Recessive, an affected daughter (X^r X^r) needs an X^r from the father. But the father is unaffected (X^R Y).'
            });
        } else if (type === 'XD') {
            setFeedback({
                type: 'error',
                message: 'Incorrect. If Dominant, one parent must be affected.'
            });
        }
    };

    const ScenarioCanvas = () => (
        <div className="h-64 border rounded-lg bg-white relative flex justify-center items-center">
            <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Parents */}
                <line x1="150" y1="50" x2="250" y2="50" stroke="black" strokeWidth="2" />
                <line x1="200" y1="50" x2="200" y2="150" stroke="black" strokeWidth="2" />

                {/* Father (Unaffected Male) */}
                <g transform="translate(150, 50)">
                    <rect x="-20" y="-20" width="40" height="40" fill="white" stroke="black" strokeWidth="3" />
                    <text y="-30" textAnchor="middle" fontSize="12">Father</text>
                </g>

                {/* Mother (Unaffected Female) */}
                <g transform="translate(250, 50)">
                    <circle r="22" fill="white" stroke="black" strokeWidth="3" />
                    <text y="-30" textAnchor="middle" fontSize="12">Mother</text>
                </g>

                {/* Child (Affected Female) */}
                <g transform="translate(200, 150)">
                    <circle r="22" fill="#ef4444" stroke="black" strokeWidth="3" />
                    <text y="40" textAnchor="middle" fontSize="12">Daughter</text>
                </g>
            </svg>

            <div className="absolute top-4 left-4 bg-yellow-50 text-yellow-800 p-2 rounded-lg text-sm max-w-xs border border-yellow-200">
                <strong>Hint:</strong> Look at the parents. Are they affected? Look at the gender of the child.
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-scientific-600" />
                    Logic Trainer: Pedigree Analysis
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <ScenarioCanvas />
                    <p className="mt-4 text-slate-600 leading-relaxed">
                        Analyze the pedigree above. Two <strong>unaffected</strong> parents have an <strong>affected</strong> daughter.
                        What is the most likely mode of inheritance?
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700">Select the Pattern:</h3>

                    <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => handleGuess('AD')} className="p-3 text-left border rounded-lg hover:bg-slate-50 transition border-slate-200 hover:border-blue-400">
                            Autosomal Dominant
                        </button>
                        <button onClick={() => handleGuess('AR')} className="p-3 text-left border rounded-lg hover:bg-slate-50 transition border-slate-200 hover:border-blue-400">
                            Autosomal Recessive
                        </button>
                        <button onClick={() => handleGuess('XD')} className="p-3 text-left border rounded-lg hover:bg-slate-50 transition border-slate-200 hover:border-blue-400">
                            X-Linked Dominant
                        </button>
                        <button onClick={() => handleGuess('XR')} className="p-3 text-left border rounded-lg hover:bg-slate-50 transition border-slate-200 hover:border-blue-400">
                            X-Linked Recessive
                        </button>
                    </div>

                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={clsx(
                                    "p-4 rounded-lg flex gap-3 items-start",
                                    feedback.type === 'success' ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                                )}
                            >
                                {feedback.type === 'success' ? <CheckCircle className="shrink-0 w-5 h-5" /> : <AlertCircle className="shrink-0 w-5 h-5" />}
                                <p className="text-sm">{feedback.message}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
