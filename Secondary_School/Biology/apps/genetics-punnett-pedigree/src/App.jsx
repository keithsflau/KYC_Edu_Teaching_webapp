
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PunnettModule from './components/PunnettModule';
import PedigreeModule from './components/PedigreeModule';
import { Dna, Grid3X3, GitFork } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const [activeTab, setActiveTab] = useState('punnett');

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-scientific-600 p-2 rounded-lg text-white">
              <Dna className="w-6 h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-scientific-700 to-scientific-500">
              HKDSE Genetics Master
            </h1>
          </div>
          <div className="text-xs md:text-sm text-slate-500 font-medium hidden md:block">
            Mendelian & Pedigree Analysis
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('punnett')}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border whitespace-nowrap",
              activeTab === 'punnett'
                ? "bg-scientific-600 text-white border-scientific-700 ring-2 ring-scientific-200"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            <Grid3X3 className="w-5 h-5" />
            Punnett Calculator
          </button>
          <button
            onClick={() => setActiveTab('pedigree')}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border whitespace-nowrap",
              activeTab === 'pedigree'
                ? "bg-scientific-600 text-white border-scientific-700 ring-2 ring-scientific-200"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            <GitFork className="w-5 h-5" />
            Pedigree Logic
          </button>
        </div>

        {/* View Container */}
        <div className="transition-all duration-300">
          {activeTab === 'punnett' ? (
            <motion.div
              key="punnett"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PunnettModule />
            </motion.div>
          ) : (
            <motion.div
              key="pedigree"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PedigreeModule />
            </motion.div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>© 2025 HKDSE Biology Tools. Designed for educational use.</p>
        </div>
      </main>
    </div>
  );
}



export default App;
