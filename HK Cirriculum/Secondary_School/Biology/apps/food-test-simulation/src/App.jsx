import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Flame, Info } from 'lucide-react';
import ReagentShelf from './components/ReagentShelf';
import TestTubeRack from './components/TestTubeRack';
import Equipment from './components/Equipment';
import ResultsTable from './components/ResultsTable';
import InfoPanel from './components/InfoPanel';

const Footer = () => (
  <footer className="mt-8 text-center text-slate-500 text-sm z-10 p-4 border-t border-white/10">
    <p className="italic mb-1">
      But God made the earth by his power; he founded the world by his wisdom and stretched out the heavens by his
      understanding. Jeremiah 10:12
    </p>
    <p className="text-xs mb-1 mt-2">
      「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」 耶利米書 10:12
    </p>
    <p className="text-xs mt-2 pt-2 border-t border-white/10">© 2025 HKDSE Biology | Food test simulation</p>
  </footer>
);

const VisitCounter = () => {
  const [visits, setVisits] = React.useState(0);
  React.useEffect(() => {
    const key = window.location.pathname.replace(/\//g, '_') || 'home';
    fetch(`https://api.countapi.xyz/hit/keithsflau-profile/${key}`)
      .then((res) => res.json())
      .then((data) => setVisits(data.value))
      .catch(() => {});
  }, []);
  return (
    <div className="fixed bottom-2 right-2 text-[10px] text-white/30 pointer-events-none z-50">
      Visits: {visits}
    </div>
  );
};

function App() {
  const [testTubes, setTestTubes] = useState([
    { id: 1, sample: 'Mystery Solution A', contents: ['sample-a'], temperature: 'room', isShaking: false, hasBeenShakenWithEthanol: false, color: '#f0e68c' },
    { id: 2, sample: 'Solution B', contents: ['sample-b'], temperature: 'room', isShaking: false, hasBeenShakenWithEthanol: false, color: '#e6f2ff' },
    { id: 3, sample: 'Solution C', contents: ['sample-c'], temperature: 'room', isShaking: false, hasBeenShakenWithEthanol: false, color: '#ffe6f0' },
  ]);

  const [selectedTube, setSelectedTube] = useState(null);
  const [results, setResults] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(null);

  // Handle adding reagent to test tube
  const handleAddReagent = (reagentId) => {
    if (selectedTube === null) {
      alert('Please select a test tube first!');
      return;
    }

    setTestTubes(prev => prev.map(tube => {
      if (tube.id === selectedTube) {
        const newContents = [...tube.contents, reagentId];
        const newColor = calculateColor(newContents, tube.temperature, tube.isShaking, tube.hasBeenShakenWithEthanol);
        return { ...tube, contents: newContents, color: newColor };
      }
      return tube;
    }));

    // Check for reactions
    checkReaction(selectedTube, reagentId);
  };

  // Handle heating
  const handleHeat = () => {
    if (selectedTube === null) {
      alert('Please select a test tube first!');
      return;
    }

    setTestTubes(prev => prev.map(tube => {
      if (tube.id === selectedTube) {
        const newTemp = tube.temperature === 'room' ? 'hot' : tube.temperature;
        const newColor = calculateColor(tube.contents, newTemp, tube.isShaking, tube.hasBeenShakenWithEthanol);
        return { ...tube, temperature: newTemp, color: newColor };
      }
      return tube;
    }));

    // Check for reactions after heating
    checkReaction(selectedTube);
  };

  // Handle shaking
  const handleShake = () => {
    if (selectedTube === null) {
      alert('Please select a test tube first!');
      return;
    }

    setTestTubes(prev => prev.map(tube => {
      if (tube.id === selectedTube) {
         // Mark as shaken with ethanol if ethanol is present
         const shakenWithEthanol = tube.contents.includes('ethanol') ? true : tube.hasBeenShakenWithEthanol;
         return { ...tube, isShaking: !tube.isShaking, hasBeenShakenWithEthanol: shakenWithEthanol };
      }
      return tube;
    }));

    // Reset shaking after animation but KEEP the state
    setTimeout(() => {
      setTestTubes(prev => prev.map(tube => {
        if (tube.id === selectedTube) {
          // Re-calculate color after shaking completes (crucial for lipid test step 1)
          const newColor = calculateColor(tube.contents, tube.temperature, false, tube.hasBeenShakenWithEthanol);
          return { ...tube, isShaking: false, color: newColor };
        }
        return tube;
      }));
       checkReaction(selectedTube);
    }, 1000);
  };

  // Calculate color based on contents and conditions
  const calculateColor = (contents, temperature, isShaking, hasBeenShakenWithEthanol) => {
    const sample = contents[0];
    
    // Reducing Sugar Test (Benedict's)
    if (contents.includes('benedicts') && temperature === 'hot') {
      // Mystery Solution A contains Glucose (reducing sugar)
      if (sample === 'sample-a') {
        return '#cd5c5c'; // Brick red
      }
      // Solution C contains Sucrose (non-reducing sugar initially)
      if (sample === 'sample-c' && !contents.includes('hcl')) {
        return '#4169e1'; // Stays blue
      }
      // After acid hydrolysis
      if (sample === 'sample-c' && contents.includes('hcl') && contents.includes('nahco3')) {
        return '#cd5c5c'; // Brick red
      }
    }
    
    // Starch Test (Iodine)
    if (contents.includes('iodine')) {
      // Solution B contains Starch
      if (sample === 'sample-b') {
        return '#191970'; // Blue-black
      }
    }
    
    // Protein Test (Biuret)
    if (contents.includes('biuret')) {
      // Solution B contains Protein
      if (sample === 'sample-b') {
        return '#9370db'; // Purple/Lilac
      }
    }
    
    // Vitamin C Test (DCPIP)
    if (contents.includes('dcpip')) {
      // Mystery Solution A contains Vitamin C
      if (sample === 'sample-a') {
        return '#f0e68c'; // Decolorized (back to sample color)
      }
      return '#4169e1'; // Blue if no vitamin C
    }
    
    // Lipid Test (Ethanol Emulsion)
    // Correct Protocol: Add Ethanol -> Shake (Dissolve) -> Add Water -> Milky White
    if (contents.includes('ethanol') && isShaking) {
      // Just shaking with ethanol: Lipids dissolve, solution stays clear.
      if (sample === 'sample-c') {
         return '#f0f0f0'; // Stays clear (ethanol color logic)
      }
    }

    if (contents.includes('ethanol') && contents.includes('water') && hasBeenShakenWithEthanol) {
       // If it has been shaken with ethanol AND now has water:
       if (sample === 'sample-c') {
         return '#f5f5f5'; // NOW it turns Milky white emulsion
       }
    }
    
    // Default colors based on reagent
    if (contents.includes('benedicts')) return '#4169e1'; // Blue
    if (contents.includes('iodine')) return '#8b4513'; // Brown
    if (contents.includes('biuret')) return '#87ceeb'; // Light blue
    if (contents.includes('dcpip')) return '#4169e1'; // Blue
    if (contents.includes('ethanol')) return '#f0f0f0'; // Clear
    if (contents.includes('water')) return '#e6f7ff'; // Clear/Water
    
    // Default sample colors
    if (sample === 'sample-a') return '#f0e68c';
    if (sample === 'sample-b') return '#e6f2ff';
    if (sample === 'sample-c') return '#ffe6f0';
    
    return '#f0e68c';
  };

  // Check for reactions and update results
  const checkReaction = (tubeId, newReagent = null) => {
    const tube = testTubes.find(t => t.id === tubeId);
    if (!tube) return;

    // Use internal ID (sample-a, sample-b) for logic, and Display Name for report
    const sampleId = tube.contents[0]; 
    const sampleName = tube.sample;
    const { temperature, hasBeenShakenWithEthanol } = tube;

    // Construct effective contents to account for the just-added reagent
    // (React state updates are async, so 'tube.contents' might be stale)
    let effectiveContents = [...tube.contents];
    if (newReagent && !effectiveContents.includes(newReagent)) {
      effectiveContents.push(newReagent);
    }
    
    // Benedict's Test (Reducing Sugar)
    if (effectiveContents.includes('benedicts') && temperature === 'hot') {
      if (sampleId === 'sample-a') {
        addResult(sampleName, 'Reducing Sugar (Benedict\'s)', 'Positive', 'Brick Red Precipitate', 
          'Sample A contains reducing sugars (e.g., glucose).');
      } else if (sampleId === 'sample-c' && !effectiveContents.includes('hcl')) {
        addResult(sampleName, 'Reducing Sugar (Benedict\'s)', 'Negative', 'Stays Blue', 
          'Sample C does not contain reducing sugars initially. It may contain non-reducing sugars.');
      }
    }
    
    // Iodine Test (Starch)
    if (effectiveContents.includes('iodine')) {
      if (sampleId === 'sample-b') {
        addResult(sampleName, 'Starch (Iodine)', 'Positive', 'Blue-Black Color', 
          'Sample B contains starch.');
      } else {
        addResult(sampleName, 'Starch (Iodine)', 'Negative', 'Brown Color', 
          'No starch detected.');
      }
    }
    
    // Biuret Test (Protein)
    if (effectiveContents.includes('biuret')) {
      if (sampleId === 'sample-b') {
        addResult(sampleName, 'Protein (Biuret)', 'Positive', 'Purple/Lilac Color', 
          'Sample B contains proteins.');
      } else {
        addResult(sampleName, 'Protein (Biuret)', 'Negative', 'Blue Color', 
          'No protein detected.');
      }
    }
    
    // DCPIP Test (Vitamin C)
    if (effectiveContents.includes('dcpip')) {
      if (sampleId === 'sample-a') {
        addResult(sampleName, 'Vitamin C (DCPIP)', 'Positive', 'Decolorized', 
          'Sample A contains Vitamin C (ascorbic acid).');
      } else {
        addResult(sampleName, 'Vitamin C (DCPIP)', 'Negative', 'Stays Blue', 
          'No Vitamin C detected.');
      }
    }
    
    // Lipid Test (Ethanol Emulsion)
    // Result only effective if shaken with ethanol first, THEN water added
    if (effectiveContents.includes('ethanol') && effectiveContents.includes('water') && hasBeenShakenWithEthanol) {
      if (sampleId === 'sample-c') {
         addResult(sampleName, 'Lipid (Ethanol Emulsion)', 'Positive', 'Milky White Emulsion', 
          'Sample C contains lipids. Lipids dissolve in ethanol but precipitate as an emulsion when water is added.');
      } else {
         addResult(sampleName, 'Lipid (Ethanol Emulsion)', 'Negative', 'Clear', 
          'No emulsion formed.');
      }
    }
    
    // Non-Reducing Sugar Test (Advanced)
    if (effectiveContents.includes('hcl') && effectiveContents.includes('nahco3') && effectiveContents.includes('benedicts') && temperature === 'hot') {
      if (sampleId === 'sample-c') {
        addResult(sampleName, 'Non-Reducing Sugar (Acid Hydrolysis + Benedict\'s)', 'Positive', 'Brick Red Precipitate', 
          'Sample C contains non-reducing sugars (e.g., sucrose). Acid hydrolysis breaks glycosidic bonds, releasing reducing sugars (glucose/fructose).');
        setCurrentInfo('non-reducing');
        setShowInfo(true);
      }
    }
  };

  // Add result to table
  const addResult = (sample, test, result, observation, explanation) => {
    setResults(prev => {
      // Check if result already exists
      const exists = prev.some(r => r.sample === sample && r.test === test);
      if (exists) {
        return prev.map(r => 
          r.sample === sample && r.test === test
            ? { sample, test, result, observation, explanation }
            : r
        );
      }
      return [...prev, { sample, test, result, observation, explanation }];
    });
  };

  // Reset test tube
  const resetTube = (tubeId) => {
    setTestTubes(prev => prev.map(tube => {
      if (tube.id === tubeId) {
        const sample = tube.contents[0];
        const defaultColor = sample === 'sample-a' ? '#f0e68c' : 
                            sample === 'sample-b' ? '#e6f2ff' : '#ffe6f0';
        return {
          ...tube,
          contents: [sample],
          temperature: 'room',
          isShaking: false,
          hasBeenShakenWithEthanol: false,
          color: defaultColor
        };
      }
      return tube;
    }));
  };

  return (
    <div className="h-screen w-screen bg-slate-900 text-white overflow-hidden flex flex-col items-center">
      {/* Compact Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4 flex-none"
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          <Beaker className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Food Test Laboratory
          </h1>
          <Flame className="w-8 h-8 text-orange-400" />
        </div>
        <p className="text-sm text-gray-400">
          HKDSE Biology: Biochemical Tests for Biomolecules
        </p>
      </motion.div>

      {/* Main Content Area - Fills remaining height */}
      <div className="flex-1 w-full max-w-7xl px-4 pb-4 min-h-0">
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Panel: Reagents & Equipment (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar">
            <ReagentShelf onAddReagent={handleAddReagent} />
            <Equipment 
              onHeat={handleHeat} 
              onShake={handleShake}
              selectedTube={selectedTube}
            />
          </div>

          {/* Center Panel: Test Tube Rack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <TestTubeRack 
              testTubes={testTubes}
              selectedTube={selectedTube}
              onSelectTube={setSelectedTube}
              onResetTube={resetTube}
            />
          </div>

          {/* Right Panel: Results & Info (4 cols) */}
          <div className="lg:col-span-4 h-full overflow-y-auto pr-1 custom-scrollbar">
            <ResultsTable results={results} />
          </div>
        </div>
      </div>

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {showInfo && (
          <InfoPanel 
            type={currentInfo} 
            onClose={() => setShowInfo(false)} 
          />
        )}
      </AnimatePresence>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <Footer />
      <VisitCounter />
    </div>
  );
}



export default App;
