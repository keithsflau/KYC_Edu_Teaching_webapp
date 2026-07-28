import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { Sun, Leaf, Rabbit, Bird, AlertTriangle, Flame, Wind } from 'lucide-react';

// Energy flow calculation based on 10% rule (≈10% of each trophic level's energy passes to the next)
const calculateEnergyFlow = (solarInput) => {
  const producer = solarInput * 0.01; // 1% fixation
  const producerRespiration = producer * 0.7; // 70% lost to respiration
  const producerAvailable = producer - producerRespiration;

  const primaryConsumer = producer * 0.1; // 10% of producer energy transferred up
  const primaryRespiration = primaryConsumer * 0.7;
  const primaryAvailable = primaryConsumer - primaryRespiration;

  const secondaryConsumer = primaryConsumer * 0.1;
  const secondaryRespiration = secondaryConsumer * 0.7;
  const secondaryAvailable = secondaryConsumer - secondaryRespiration;

  const tertiaryConsumer = secondaryConsumer * 0.1;
  const tertiaryRespiration = tertiaryConsumer * 0.7;
  const tertiaryAvailable = tertiaryConsumer - tertiaryRespiration;
  
  return {
    solar: solarInput,
    levels: [
      {
        name: 'Producers',
        label: 'Grass/Plants',
        total: producer,
        respiration: producerRespiration,
        available: producerAvailable,
        icon: Leaf,
        color: '#22c55e',
        bgColor: 'bg-green-500'
      },
      {
        name: 'Primary Consumers',
        label: 'Herbivores (Rabbit)',
        total: primaryConsumer,
        respiration: primaryRespiration,
        available: primaryAvailable,
        icon: Rabbit,
        color: '#f59e0b',
        bgColor: 'bg-amber-500'
      },
      {
        name: 'Secondary Consumers',
        label: 'Carnivores (Snake)',
        total: secondaryConsumer,
        respiration: secondaryRespiration,
        available: secondaryAvailable,
        icon: Bird,
        color: '#ef4444',
        bgColor: 'bg-red-500'
      },
      {
        name: 'Tertiary Consumers',
        label: 'Top Predator (Hawk)',
        total: tertiaryConsumer,
        respiration: tertiaryRespiration,
        available: tertiaryAvailable,
        icon: Bird,
        color: '#7c3aed',
        bgColor: 'bg-purple-500'
      }
    ]
  };
};

// Particle animation component
const EnergyParticle = ({ from, to, isHeat, delay }) => {
  const startY = from * 120;
  const endY = isHeat ? -100 : to * 120;
  const endX = isHeat ? Math.random() * 200 - 100 : 0;
  
  return (
    <motion.div
      initial={{ y: startY, x: 0, opacity: 1, scale: 1 }}
      animate={{
        y: endY,
        x: endX,
        opacity: isHeat ? 0 : 0.8,
        scale: isHeat ? 0.5 : 1
      }}
      transition={{
        duration: isHeat ? 1.5 : 2,
        delay: delay,
        ease: 'easeOut'
      }}
      className={`absolute left-1/2 w-3 h-3 rounded-full ${
        isHeat ? 'bg-orange-500' : 'bg-yellow-400'
      } shadow-lg`}
    />
  );
};

// Food Chain Simulator Component
const FoodChainSimulator = ({ solarInput, setSolarInput }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const energyData = calculateEnergyFlow(solarInput);
  
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, [solarInput]);
  
  return (
    <div className="trophic-card">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-earth-900">Energy Flow in Food Chain</h2>
      </div>
      
      {/* Solar Input Control */}
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
        <label className="block text-sm font-semibold text-yellow-900 mb-2">
          Solar Energy Input (kJ)
        </label>
        <input
          type="range"
          min="100000"
          max="2000000"
          step="100000"
          value={solarInput}
          onChange={(e) => setSolarInput(Number(e.target.value))}
          className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-2xl font-bold text-yellow-700">
            {solarInput.toLocaleString()} kJ
          </span>
          <span className="text-sm text-yellow-600">
            Only ~1% will be fixed by producers
          </span>
        </div>
      </div>
      
      {/* Trophic Levels */}
      <div className="relative space-y-6">
        {energyData.levels.map((level, index) => {
          const Icon = level.icon;
          const transferEfficiency = index === 0 
            ? ((level.total / energyData.solar) * 100).toFixed(2)
            : ((level.total / energyData.levels[index - 1].available) * 100).toFixed(1);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex items-center gap-4 bg-gradient-to-r from-earth-50 to-white p-5 rounded-xl border-2 border-l-8"
                   style={{ borderLeftColor: level.color }}>
                {/* Level Badge */}
                <div className={`${level.bgColor} level-badge`}>
                  {index + 1}
                </div>
                
                {/* Icon */}
                <Icon className="w-12 h-12" style={{ color: level.color }} />
                
                {/* Level Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-earth-900">{level.name}</h3>
                  <p className="text-sm text-earth-600">{level.label}</p>
                </div>
                
                {/* Energy Values */}
                <div className="text-right space-y-2">
                  <div className="energy-label">
                    Total: {level.total.toLocaleString(undefined, { maximumFractionDigits: 0 })} kJ
                  </div>
                  <div className="heat-label">
                    <Flame className="w-3 h-3" />
                    Heat Loss: {level.respiration.toLocaleString(undefined, { maximumFractionDigits: 0 })} kJ
                  </div>
                  <div className="text-xs text-earth-600 font-medium">
                    Available: {level.available.toLocaleString(undefined, { maximumFractionDigits: 0 })} kJ
                  </div>
                </div>
                
                {/* Transfer Efficiency Badge */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white border-2 border-earth-400 px-3 py-1 rounded-full text-xs font-bold text-earth-700 shadow-md">
                    {index === 0 ? `${transferEfficiency}% of solar` : `${transferEfficiency}% transfer`}
                  </span>
                </div>
              </div>
              
              {/* Animation Container */}
              {showAnimation && index < energyData.levels.length && (
                <div className="absolute top-0 left-1/2 w-1 h-full pointer-events-none" style={{ zIndex: 10 }}>
                  {/* Energy particles that transfer */}
                  {[...Array(2)].map((_, i) => (
                    <EnergyParticle
                      key={`transfer-${i}`}
                      from={index}
                      to={index + 1}
                      isHeat={false}
                      delay={i * 0.3}
                    />
                  ))}
                  {/* Heat particles that escape */}
                  {[...Array(8)].map((_, i) => (
                    <EnergyParticle
                      key={`heat-${i}`}
                      from={index}
                      to={index + 1}
                      isHeat={true}
                      delay={i * 0.2}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
        
        {/* Warning Message */}
        {energyData.levels[3].total < 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-400 rounded-lg"
          >
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900">Energy Chain Limit Reached!</h4>
              <p className="text-sm text-red-700 mt-1">
                Insufficient energy ({energyData.levels[3].total.toFixed(2)} kJ) to support a 
                Quaternary Consumer. This is why food chains rarely exceed 4-5 trophic levels.
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Educational Note */}
      <div className="mt-6 p-4 bg-earth-100 rounded-lg border-2 border-earth-300">
        <h4 className="font-bold text-earth-900 mb-2 flex items-center gap-2">
          <Wind className="w-5 h-5" />
          The 10% Law of Energy Transfer
        </h4>
        <ul className="text-sm text-earth-700 space-y-1 list-disc list-inside">
          <li><strong>Producers fix ~1%</strong> of solar energy through photosynthesis (Gross Primary Production)</li>
          <li><strong>~60-90% lost as heat</strong> through cellular respiration at each level</li>
          <li><strong>Only ~10% transferred</strong> to the next trophic level as biomass</li>
          <li><strong>Limits food chain length</strong> to typically 4-5 levels maximum</li>
        </ul>
      </div>
    </div>
  );
};

// Pyramid Data for different scenarios
const pyramidScenarios = {
  grassland: {
    name: 'Standard Grassland',
    description: 'Grass → Rabbit → Fox → Eagle (All pyramids upright)',
    energy: [
      { level: 'Producers (Grass)', value: 10000, color: '#22c55e' },
      { level: 'Primary (Rabbits)', value: 1000, color: '#f59e0b' },
      { level: 'Secondary (Foxes)', value: 100, color: '#ef4444' },
      { level: 'Tertiary (Eagles)', value: 10, color: '#7c3aed' }
    ],
    numbers: [
      { level: 'Producers (Grass)', value: 5000, color: '#22c55e' },
      { level: 'Primary (Rabbits)', value: 500, color: '#f59e0b' },
      { level: 'Secondary (Foxes)', value: 50, color: '#ef4444' },
      { level: 'Tertiary (Eagles)', value: 5, color: '#7c3aed' }
    ],
    biomass: [
      { level: 'Producers (Grass)', value: 1000, color: '#22c55e' },
      { level: 'Primary (Rabbits)', value: 100, color: '#f59e0b' },
      { level: 'Secondary (Foxes)', value: 10, color: '#ef4444' },
      { level: 'Tertiary (Eagles)', value: 1, color: '#7c3aed' }
    ]
  },
  parasitic: {
    name: 'Parasitic Tree Ecosystem',
    description: '1 Oak Tree → 500 Caterpillars → 20 Birds (Inverted Number Pyramid)',
    energy: [
      { level: 'Producers (Oak)', value: 10000, color: '#22c55e' },
      { level: 'Primary (Caterpillars)', value: 1000, color: '#f59e0b' },
      { level: 'Secondary (Birds)', value: 100, color: '#ef4444' }
    ],
    numbers: [
      { level: 'Producers (Oak)', value: 1, color: '#22c55e' },
      { level: 'Primary (Caterpillars)', value: 500, color: '#f59e0b' },
      { level: 'Secondary (Birds)', value: 20, color: '#ef4444' }
    ],
    biomass: [
      { level: 'Producers (Oak)', value: 1000, color: '#22c55e' },
      { level: 'Primary (Caterpillars)', value: 100, color: '#f59e0b' },
      { level: 'Secondary (Birds)', value: 10, color: '#ef4444' }
    ]
  },
  aquatic: {
    name: 'Aquatic Ecosystem',
    description: 'Phytoplankton → Zooplankton → Fish (Inverted Biomass Pyramid)',
    energy: [
      { level: 'Producers (Phytoplankton)', value: 10000, color: '#22c55e' },
      { level: 'Primary (Zooplankton)', value: 1000, color: '#f59e0b' },
      { level: 'Secondary (Small Fish)', value: 100, color: '#ef4444' },
      { level: 'Tertiary (Large Fish)', value: 10, color: '#7c3aed' }
    ],
    numbers: [
      { level: 'Producers (Phytoplankton)', value: 10000, color: '#22c55e' },
      { level: 'Primary (Zooplankton)', value: 1000, color: '#f59e0b' },
      { level: 'Secondary (Small Fish)', value: 100, color: '#ef4444' },
      { level: 'Tertiary (Large Fish)', value: 10, color: '#7c3aed' }
    ],
    biomass: [
      { level: 'Producers (Phytoplankton)', value: 100, color: '#22c55e' },
      { level: 'Primary (Zooplankton)', value: 150, color: '#f59e0b' },
      { level: 'Secondary (Small Fish)', value: 50, color: '#ef4444' },
      { level: 'Tertiary (Large Fish)', value: 10, color: '#7c3aed' }
    ]
  }
};

// Pyramid Builder Component
const PyramidBuilder = () => {
  const [pyramidType, setPyramidType] = useState('energy');
  const [scenario, setScenario] = useState('grassland');
  
  const currentData = pyramidScenarios[scenario][pyramidType];
  const scenarioInfo = pyramidScenarios[scenario];
  
  // Check if pyramid is inverted
  const isInverted = currentData.some((item, index) => 
    index > 0 && item.value > currentData[index - 1].value
  );
  
  return (
    <div className="pyramid-container">
      <h2 className="text-2xl font-bold text-earth-900 mb-6">Ecological Pyramids</h2>
      
      {/* Pyramid Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-earth-800 mb-3">
          Pyramid Type:
        </label>
        <div className="flex gap-3 flex-wrap">
          {['energy', 'numbers', 'biomass'].map((type) => (
            <button
              key={type}
              onClick={() => setPyramidType(type)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                pyramidType === type
                  ? 'bg-earth-600 text-white shadow-lg scale-105'
                  : 'bg-white text-earth-700 border-2 border-earth-300 hover:border-earth-500'
              }`}
            >
              {type === 'energy' ? '⚡ Energy' : type === 'numbers' ? '🔢 Numbers' : '⚖️ Biomass'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Scenario Selector */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-earth-800 mb-3">
          Ecosystem Scenario:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.keys(pyramidScenarios).map((key) => (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`p-4 rounded-lg text-left transition-all ${
                scenario === key
                  ? 'bg-earth-600 text-white shadow-lg'
                  : 'bg-white text-earth-700 border-2 border-earth-300 hover:border-earth-500'
              }`}
            >
              <div className="font-bold mb-1">{pyramidScenarios[key].name}</div>
              <div className={`text-xs ${scenario === key ? 'text-earth-100' : 'text-earth-600'}`}>
                {pyramidScenarios[key].description}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Warning for Inverted Pyramids */}
      {isInverted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg flex items-start gap-3"
        >
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900">Inverted Pyramid Detected!</h4>
            <p className="text-sm text-amber-700 mt-1">
              {pyramidType === 'numbers' && scenario === 'parasitic' && 
                "In parasitic relationships, one large producer (tree) can support many small consumers (insects). This creates an inverted pyramid of numbers - a crucial HKDSE concept!"}
              {pyramidType === 'biomass' && scenario === 'aquatic' && 
                "Phytoplankton reproduce rapidly despite low biomass at any moment. High turnover rate allows them to support larger consumer biomass - common in aquatic ecosystems!"}
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Pyramid Visualization */}
      <div className="bg-gradient-to-b from-earth-50 to-white p-8 rounded-xl border-2 border-earth-300">
        <h3 className="text-center font-bold text-lg text-earth-900 mb-6">
          {pyramidType === 'energy' ? 'Pyramid of Energy (kJ/m²/year)' : 
           pyramidType === 'numbers' ? 'Pyramid of Numbers (Individuals)' : 
           'Pyramid of Biomass (kg/m²)'}
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={[...currentData].reverse()}
            layout="vertical"
            margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="level" type="category" width={150} />
            <Tooltip 
              formatter={(value) => value.toLocaleString()}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #22c55e',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Educational Notes */}
      <div className="mt-6 p-5 bg-earth-100 rounded-lg border-2 border-earth-300">
        <h4 className="font-bold text-earth-900 mb-3">📚 Key HKDSE Concepts:</h4>
        <div className="space-y-2 text-sm text-earth-700">
          <div className="flex items-start gap-2">
            <span className="font-bold">⚡ Energy:</span>
            <span>Always forms an upright pyramid (energy cannot be created, only lost as heat)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">🔢 Numbers:</span>
            <span>Can be inverted (e.g., one tree supporting thousands of insects)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">⚖️ Biomass:</span>
            <span>Can be inverted in aquatic ecosystems (high phytoplankton turnover rate)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [solarInput, setSolarInput] = useState(1000000);
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-earth-900 mb-4">
            🌱 Energy Flow in Ecosystems
          </h1>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Interactive Educational Tool for HKDSE Biology: Explore Trophic Levels, 
            Energy Transfer, and Ecological Pyramids
          </p>
        </motion.div>
        
        {/* Food Chain Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <FoodChainSimulator solarInput={solarInput} setSolarInput={setSolarInput} />
        </motion.div>
        
        {/* Pyramid Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PyramidBuilder />
        </motion.div>
        
        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-earth-600 text-sm"
        >
          <p>Built for HKDSE Biology Students | Understanding Energy Flow & Ecological Pyramids</p>
        </motion.footer>
      </div>
    </div>
  );
}



export default App;
