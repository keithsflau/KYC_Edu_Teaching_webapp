import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, XCircle } from 'lucide-react';

export default function ResultsTable({ results }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-6 h-6 text-green-400" />
        <h2 className="text-2xl font-bold text-green-400">Lab Report</h2>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ClipboardList className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          </motion.div>
          <p className="text-gray-400">No tests performed yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Start adding reagents to see results
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {results.map((result, index) => (
              <motion.div
                key={`${result.sample}-${result.test}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-cyan-300 text-sm">
                      {result.sample}
                    </h3>
                    <p className="text-xs text-gray-400">{result.test}</p>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {result.result === 'Positive' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </motion.div>
                </div>

                {/* Result Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                  result.result === 'Positive'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {result.result}
                </div>

                {/* Observation */}
                <div className="mb-2">
                  <p className="text-xs font-semibold text-yellow-300">Observation:</p>
                  <p className="text-sm text-gray-200">{result.observation}</p>
                </div>

                {/* Explanation */}
                {result.explanation && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-xs font-semibold text-blue-300 mb-1">💡 Explanation:</p>
                    <p className="text-xs text-gray-300">{result.explanation}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Summary */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg"
        >
          <p className="text-sm font-semibold text-green-300">
            Tests Completed: {results.length}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {results.filter(r => r.result === 'Positive').length} Positive | {' '}
            {results.filter(r => r.result === 'Negative').length} Negative
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
