import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ArrowRight, Info, Check, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Constants & Data ---
const DNA_TEMPLATE = "TACGCGCTAACT"; // Code for: Met-Arg-Asp-Stop -> AUG CGC GAU UGA
const MRNA_TARGET = "AUGCGCGAUUGA"; 
const CODONS = ["AUG", "CGC", "GAU", "UGA"];
const AMINO_ACIDS = {
  "AUG": "Met",
  "CGC": "Arg",
  "GAU": "Asp",
  "UGA": "Stop"
};
const CODON_TABLE = [
  { codon: "AUG", aa: "Met (Start)" },
  { codon: "UUU", aa: "Phe" },
  { codon: "UUC", aa: "Phe" },
  { codon: "UUA", aa: "Leu" },
  { codon: "UUG", aa: "Leu" },
  { codon: "CGC", aa: "Arg" },
  { codon: "CGA", aa: "Arg" },
  { codon: "GAU", aa: "Asp" },
  { codon: "GAC", aa: "Asp" },
  { codon: "UAA", aa: "Stop" },
  { codon: "UAG", aa: "Stop" },
  { codon: "UGA", aa: "Stop" },
]; // Simplified list for the sidebar

// --- Components ---

const Nucleotide = ({ base, onClick, className }) => {
  const colors = {
    A: 'bg-red-500',
    T: 'bg-blue-500',
    C: 'bg-green-500',
    G: 'bg-yellow-500',
    U: 'bg-purple-500', // Uracil is distinct
  };

  return (
    <motion.button
      whileHover={onClick ? { scale: 1.1 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white/20",
        colors[base] || 'bg-gray-400',
        onClick ? "cursor-pointer hover:shadow-lg" : "cursor-default",
        className
      )}
    >
      {base}
    </motion.button>
  );
};

const FeedbackToast = ({ message, type }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50",
            type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          )}
        >
          {type === 'success' ? <Check size={20} /> : <X size={20} />}
          <span className="font-medium text-lg">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CodonTableSidebar = () => {
  return (
    <div className="hidden lg:block w-64 bg-slate-800 border-l border-slate-700 p-4 shrink-0 overflow-y-auto">
      <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <Info size={20} /> Codon Dictionary
      </h3>
      <div className="space-y-2">
        {CODON_TABLE.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-slate-700/50 p-2 rounded text-slate-300">
            <span className="font-mono font-bold text-amber-400">{item.codon}</span>
            <span className="text-sm">{item.aa}</span>
          </div>
        ))}
        <div className="pt-4 text-xs text-slate-500 text-center">
          * Simplified for this exercise
        </div>
      </div>
    </div>
  );
};

// --- STAGE 1: TRANSCRIPTION ---

const TranscriptionStage = ({ onComplete }) => {
  const [rnaSequence, setRnaSequence] = useState("");
  const [feedback, setFeedback] = useState(null);
  
  const currentIndex = rnaSequence.length;
  const isComplete = currentIndex >= DNA_TEMPLATE.length;

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        onComplete(rnaSequence);
      }, 2000);
    }
  }, [isComplete, onComplete, rnaSequence]);

  const handleBaseClick = (base) => {
    if (isComplete) return;

    const targetDnaBase = DNA_TEMPLATE[currentIndex];
    let correctRnaBase = '';
    
    // Pairing Rules
    if (targetDnaBase === 'A') correctRnaBase = 'U';
    else if (targetDnaBase === 'T') correctRnaBase = 'A';
    else if (targetDnaBase === 'C') correctRnaBase = 'G';
    else if (targetDnaBase === 'G') correctRnaBase = 'C';

    if (base === correctRnaBase) {
      setRnaSequence(prev => prev + base);
      setFeedback({ msg: "Correct pair!", type: "success" });
      setTimeout(() => setFeedback(null), 1000);
    } else {
      let msg = "";
      if (targetDnaBase === 'A') msg = "Remember: DNA 'A' pairs with RNA 'U'!";
      else if (targetDnaBase === 'T') msg = "DNA 'T' pairs with RNA 'A'!";
      else msg = "G pairs with C!";
      setFeedback({ msg, type: "error" });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-indigo-900 to-slate-900">
      <h2 className="text-3xl font-bold text-white mb-8 absolute top-8">Stage 1: Transcription (Nucleus)</h2>
      
      {/* DNA Strand (Template) */}
      <div className="relative w-full max-w-4xl h-48 flex items-center justify-center mb-12">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl mr-4">3'</div>
        <div className="flex gap-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 items-center overflow-hidden w-full justify-start">
           {DNA_TEMPLATE.split('').map((base, idx) => (
             <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 min-w-[3rem]"
             >
                <div className="text-slate-500 text-xs font-mono mb-1">DNA</div>
                <Nucleotide base={base} type="dna" className={cn(idx === currentIndex ? "ring-4 ring-yellow-400" : "opacity-50")} />
                {/* Connecting Line */}
                <div className="w-1 h-8 bg-slate-600 rounded-full my-1"></div>
                {/* RNA Slot */}
                <div className="w-10 h-10 border-2 border-dashed border-slate-600 rounded-full flex items-center justify-center">
                  {rnaSequence[idx] ? (
                    <Nucleotide base={rnaSequence[idx]} type="rna" />
                  ) : (
                    idx === currentIndex && <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </div>
             </motion.div>
           ))}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl ml-4">5'</div>
      </div>

      {/* Control Panel (RNA Polymerase Interface) */}
      {!isComplete && (
        <div className="bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-700">
          <h3 className="text-slate-300 mb-6 text-center font-semibold">Select the matching free RNA Nucleotide:</h3>
          <div className="flex gap-6 justify-center">
            {['A', 'U', 'C', 'G'].map(base => (
              <div key={base} className="flex flex-col items-center gap-2">
                 <Nucleotide 
                    base={base} 
                    type="rna" 
                    onClick={() => handleBaseClick(base)} 
                    className="w-16 h-16 text-2xl" 
                 />
                 <span className="text-slate-400 text-sm font-bold">{base}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isComplete && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-600 text-white p-8 rounded-2xl shadow-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Transcription Complete!</h3>
          <p>The mRNA strand has been synthesized.</p>
          <p className="mt-4 text-green-200 animate-bounce">Exiting Nucleus...</p>
        </motion.div>
      )}

      <FeedbackToast message={feedback?.msg} type={feedback?.type} />
    </div>
  );
};

// --- STAGE 2: TRANSLATION ---

const TranslationStage = ({ mrna, onRestart }) => {
  const [codonIndex, setCodonIndex] = useState(0);
  const [peptideChain, setPeptideChain] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [floatingTrnas, setFloatingTrnas] = useState([]);

  // Generate tRNAs for the current codon
  useEffect(() => {
    if (codonIndex >= CODONS.length) return;

    // Generate tRNAs for the current codon
    const currentCodon = CODONS[codonIndex];
    const correctAA = AMINO_ACIDS[currentCodon];
    
    // Anticodon is complementary to Codon (A-U, G-C)
    // Actually tRNA displays Anticodon, but matches via base pairing.
    const getAnticodon = (c) => c.split('').map(b => {
       if (b === 'A') return 'U';
       if (b === 'U') return 'A';
       if (b === 'C') return 'G';
       if (b === 'G') return 'C';
       return '';
    }).join('');

    const correctAnticodon = getAnticodon(currentCodon); 

    // Override distractors with more random looking ones if needed
    // Ideally we pick random ones. Let's just hardcode 3 choices per step for simplicity or randomize.
    // For this educational purpose, correct + 2 wrong is standard.
    
    const correctTrna = { 
        id: 'correct', 
        aa: correctAA, 
        anticodon: correctAnticodon, 
        isCorrect: true 
    };

    const wrong1 = { id: 'w1', aa: 'Val', anticodon: 'CAA', isCorrect: false };
    const wrong2 = { id: 'w2', aa: 'Pro', anticodon: 'GGG', isCorrect: false };
    
    // Shuffle
    const options = [correctTrna, wrong1, wrong2].sort(() => Math.random() - 0.5);
    setFloatingTrnas(options);

  }, [codonIndex]);

  const handleTrnaClick = (trna) => {
    if (codonIndex >= CODONS.length) return;

    if (trna.isCorrect) {
      setFeedback({ msg: "Correct! Anticodon matches Codon.", type: "success" });
      setTimeout(() => {
        setFeedback(null);
        if (trna.aa !== "Stop") {
             setPeptideChain(prev => [...prev, trna.aa]);
        }
        setCodonIndex(prev => prev + 1);
      }, 1500);
    } else {
      setFeedback({ msg: "Incorrect Anticodon match. Try again.", type: "error" });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center relative bg-gradient-to-b from-rose-900 to-slate-900 overflow-hidden">
       <h2 className="text-3xl font-bold text-white mb-4 absolute top-8">Stage 2: Translation (Cytoplasm)</h2>
       
       {/* Ribosome & mRNA Area */}
       <div className="mt-24 relative w-full max-w-5xl h-64 flex items-center justify-center">
          
          {/* Ribosome SVG Visualization (Simplified) */}
          <motion.div 
            className="absolute z-10 w-[600px] h-[300px] pointer-events-none opacity-80"
            // Simple animation to "wobble" or breathe
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
             {/* Large Subunit */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-600 rounded-t-[10rem] shadow-2xl skew-x-6 opacity-90 blur-sm mix-blend-screen" />
             {/* Small Subunit */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-32 bg-amber-700 rounded-b-[6rem] shadow-xl" />
          </motion.div>

          {/* mRNA Strand sliding through */}
          <div className="absolute z-20 flex items-center gap-1 transition-all duration-700 ease-in-out"
               style={{ transform: `translateX(-${codonIndex * 160}px)` }} // Slide effect
          >
             {/* Padding to start in center */}
             <div className="w-[200px]" /> 
             {CODONS.map((codon, cIdx) => (
                <div key={cIdx} className={cn(
                    "flex gap-1 p-2 rounded-lg border-2 transition-all duration-500",
                    cIdx === codonIndex ? "bg-yellow-500/20 border-yellow-400 scale-110 shadow-[0_0_20px_rgba(250,204,21,0.3)]" : "bg-slate-800/50 border-slate-700 opacity-50"
                )}>
                   {codon.split('').map((base, bIdx) => (
                      <Nucleotide key={bIdx} base={base} type="rna" className="w-12 h-12 text-lg" />
                   ))}
                   <div className="absolute -bottom-6 left-0 w-full text-center text-xs font-mono text-slate-400 uppercase tracking-widest">Codon</div>
                </div>
             ))}
             <div className="w-[400px]" />
          </div>

          {/* Growing Peptide Chain */}
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1 z-0">
             {peptideChain.map((aa, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ scale: 0, y: 50 }}
                   animate={{ scale: 1, y: 0 }}
                   className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg flex items-center justify-center font-bold text-white border-2 border-white/30 z-10"
                >
                   {aa}
                </motion.div>
             ))}
             {peptideChain.length > 0 && <div className="h-full w-1 bg-white/30 absolute left-1/2 -translate-x-1/2 top-4 -z-10" />}
          </div>
       </div>

       {/* tRNA Selection Area */}
       {codonIndex < CODONS.length ? (
         <div className="mt-32 w-full max-w-4xl">
            <h3 className="text-center text-slate-300 mb-8 text-xl">
               Current Codon: <span className="text-yellow-400 font-mono font-bold text-2xl">{CODONS[codonIndex]}</span>
               <br/>
               <span className="text-sm text-slate-400">Select the tRNA with the matching Anticodon:</span>
            </h3>
            <div className="flex justify-center gap-12">
               {floatingTrnas.map((trna) => (
                  <motion.button
                     key={trna.id}
                     whileHover={{ y: -10, scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => handleTrnaClick(trna)}
                     className="relative group cursor-pointer"
                  >
                     {/* tRNA Visual Representation */}
                     <div className="w-24 h-32 bg-emerald-600 rounded-lg relative flex flex-col items-center shadow-lg group-hover:bg-emerald-500 transition-colors">
                        {/* Amino Acid */}
                        <div className="absolute -top-6 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
                           {trna.aa}
                        </div>
                        
                        {/* tRNA Body shape (SVGish) */}
                        <div className="w-full h-full flex items-end justify-center pb-2 gap-1 px-2">
                           {trna.anticodon.split('').map((base, i) => (
                              <div key={i} className="w-6 h-6 bg-slate-900 rounded-sm flex items-center justify-center text-white text-xs font-mono font-bold border border-slate-600">
                                 {base}
                              </div>
                           ))}
                        </div>
                        <div className="absolute bottom-10 text-[10px] text-emerald-200 uppercase tracking-wider">tRNA</div>
                        <div className="absolute -bottom-6 text-sm font-mono text-emerald-300 group-hover:text-emerald-200">Anti: {trna.anticodon}</div>
                     </div>
                  </motion.button>
               ))}
            </div>
         </div>
       ) : (
         <div className="mt-20 text-center animate-fade-in">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 mb-6">Polypeptide Complete!</h1>
            <div className="flex gap-2 justify-center mb-8">
               {peptideChain.map((aa, i) => (
                  <div key={i} className="flex items-center gap-1">
                     <span className="px-4 py-2 bg-pink-600 rounded-full text-white font-bold shadow-lg">{aa}</span>
                     {i < peptideChain.length - 1 && <div className="w-4 h-1 bg-white/30"></div>}
                  </div>
               ))}
            </div>
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={onRestart}
               className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-slate-200 flex items-center gap-2 mx-auto"
            >
               <RotateCcw size={20} /> Restart Simulation
            </motion.button>
         </div>
       )}

       <FeedbackToast message={feedback?.msg} type={feedback?.type} />
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [stage, setStage] = useState('transcription'); // transcription, translation
  const [mrnaProduct, setMrnaProduct] = useState(null);

  const handleTranscriptionComplete = (rna) => {
    setMrnaProduct(rna);
    setTimeout(() => setStage('translation'), 1500); // Auto transition
  };

  const handleRestart = () => {
    setStage('transcription');
    setMrnaProduct(null);
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex overflow-hidden font-sans select-none">
      {/* Sidebar Reference */}
      <CodonTableSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50 pointer-events-none">
           <div className="flex items-center gap-3 pointer-events-auto">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg">P</div>
              <h1 className="text-white/80 font-bold text-lg tracking-wide">Protein Synthesis <span className="font-normal text-white/50">Simulator</span></h1>
           </div>
           
           {/* Progress Indicator */}
           <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 pointer-events-auto">
              <div className={cn("flex items-center gap-2", stage === 'transcription' ? "text-yellow-400 font-bold" : "text-slate-500")}>
                 <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">1</span>
                 <span>Transcription</span>
              </div>
              <ArrowRight size={16} className="text-slate-600" />
              <div className={cn("flex items-center gap-2", stage === 'translation' ? "text-rose-400 font-bold" : "text-slate-500")}>
                 <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">2</span>
                 <span>Translation</span>
              </div>
           </div>
        </header>

        {/* Dynamic Stage Rendering */}
        <AnimatePresence mode='wait'>
          {stage === 'transcription' ? (
             <motion.div 
               key="transcription"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, x: -100 }}
               className="flex-1 flex"
             >
                <TranscriptionStage onComplete={handleTranscriptionComplete} />
             </motion.div>
          ) : (
             <motion.div 
               key="translation"
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0 }}
               className="flex-1 flex"
             >
                <TranslationStage mrna={mrnaProduct} onRestart={handleRestart} />
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}



export default App;
