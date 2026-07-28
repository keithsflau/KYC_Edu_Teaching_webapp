import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, ChevronRight, RotateCcw } from 'lucide-react';
import Step1Digest from './components/Step1Digest';
import Step2Ligation from './components/Step2Ligation';
import Step3Transformation from './components/Step3Transformation';

function App() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const reset = () => setStep(0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Dna size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-rose-600">
              Recombinant DNA Simulator
            </h1>
          </div>
          
          {/* Progress Steps */}
          <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
             {[
               "Restriction Digest",
               "Ligation",
               "Transformation",
               "Result"
             ].map((label, idx) => (
                <div key={idx} className="flex items-center">
                   <div className={`
                      px-3 py-1 rounded-full transition-colors
                      ${step === idx ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400'}
                      ${step > idx ? 'text-green-600' : ''}
                   `}>
                      {idx + 1}. {label}
                   </div>
                   {idx < 3 && <ChevronRight size={16} className="text-slate-300" />}
                </div>
             ))}
          </div>

          <button 
            onClick={reset}
            className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
            title="Restart"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-100 min-h-[600px] flex justify-center"
          >
             {step === 0 && <Step1Digest onComplete={nextStep} />}
             {step === 1 && <Step2Ligation onComplete={nextStep} />}
             {step === 2 && <Step3Transformation onComplete={nextStep} />}
             {step === 3 && (
               <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                     <Dna size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Cloning Successful!</h2>
                  <p className="text-lg text-slate-600 max-w-2xl">
                    You have successfully created a recombinant plasmid containing the human insulin gene and introduced it into bacteria.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8 text-left">
                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-2">1. Cut</h3>
                        <p className="text-sm text-slate-600">Restriction enzymes create sticky ends.</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-2">2. Paste</h3>
                        <p className="text-sm text-slate-600">DNA Ligase joins the fragments.</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-2">3. Copy</h3>
                        <p className="text-sm text-slate-600">Bacteria multiply the plasmid.</p>
                     </div>
                  </div>

                  <button
                    onClick={reset}
                    className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-lg"
                  >
                    Start Over
                  </button>
               </div>
             )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        Recombinant DNA Technology Simulation • HKDSE Biology
      </footer>
    </div>
  );
}



export default App;
