import { motion } from 'framer-motion';
import { X, BookOpen, Lightbulb } from 'lucide-react';

export default function InfoPanel({ type, onClose }) {
  const getContent = () => {
    switch (type) {
      case 'non-reducing':
        return {
          title: 'Non-Reducing Sugar Test (Advanced)',
          icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
          sections: [
            {
              heading: '🧪 Why Add Acid (HCl)?',
              content: 'Sucrose is a non-reducing sugar with NO free aldehyde or ketone group. To detect it, we must first HYDROLYSE the glycosidic bond linking glucose and fructose.'
            },
            {
              heading: '⚗️ Acid Hydrolysis',
              content: 'HCl breaks the α-1,2-glycosidic bond in sucrose, releasing glucose and fructose - both are REDUCING sugars.'
            },
            {
              heading: '🧪 Why Add Alkali (NaHCO₃)?',
              content: "Benedict's reagent only works in ALKALINE conditions. We neutralize the acid with sodium hydrogen carbonate before adding Benedict's solution."
            },
            {
              heading: '🔥 Heat + Benedict\'s',
              content: 'Now the released reducing sugars (glucose/fructose) can react with Benedict\'s solution, producing a BRICK RED precipitate of copper(I) oxide.'
            },
            {
              heading: '📊 Complete Protocol',
              content: '1. Sample + HCl → Heat (hydrolyse)\n2. Cool + Add NaHCO₃ (neutralize)\n3. Add Benedict\'s → Heat (test)\n4. Observe: Blue → Brick Red = Positive'
            }
          ]
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {content.icon}
            <h2 className="text-3xl font-bold text-yellow-400">
              {content.title}
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </motion.button>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {section.heading}
              </h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* DSE Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl"
        >
          <p className="text-sm font-bold text-yellow-300 mb-2">
            🎯 HKDSE Exam Tip:
          </p>
          <p className="text-sm text-gray-200">
            Always state that <strong>acid hydrolysis breaks the glycosidic bond</strong> and 
            <strong> alkali neutralizes the acid</strong> before Benedict's test. This is a common exam question!
          </p>
        </motion.div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all"
        >
          Got it! Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
