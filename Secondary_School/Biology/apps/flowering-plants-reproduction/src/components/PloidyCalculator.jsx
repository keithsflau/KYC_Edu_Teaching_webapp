import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function PloidyCalculator() {
  const [diploidNumber, setDiploidNumber] = useState(24);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null); // 'correct' | 'incorrect'

  const checkAnswer = () => {
    const n = diploidNumber / 2;
    const correctAns = n * 3;
    if (parseInt(userAnswer, 10) === correctAns) {
      setResult('correct');
    } else {
      setResult('incorrect');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-indigo-900 border-b pb-2">Ploidy Calculator Challenge</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-indigo-800 mb-2">Set Diploid Number (2n) of the Plant:</label>
              <input 
                type="number" 
                value={diploidNumber} 
                onChange={(e) => {
                    setDiploidNumber(Number(e.target.value));
                    setResult(null);
                    setUserAnswer('');
                }}
                className="w-full text-2xl font-bold p-2 rounded border border-indigo-200 text-center"
              />
              <p className="text-xs text-indigo-600 mt-2">Example: Rice (24), Maize (20), Lily (24)</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-indigo-100 flex flex-col justify-between">
              <div>
                <p className="font-semibold text-gray-800 mb-2">Question:</p>
                <p className="text-lg text-gray-700">How many chromosomes are in the <span className="font-bold text-orange-600">Endosperm</span>?</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                  <input 
                    type="number" 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="?"
                    className="flex-1 p-2 border rounded font-bold text-center"
                  />
                  <button 
                    onClick={checkAnswer}
                    className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 transition-colors"
                  >
                      Check
                  </button>
              </div>
          </div>
      </div>

      {result && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 animate-fade-in ${result === 'correct' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              {result === 'correct' ? <Check className="text-green-600 mt-1" /> : <X className="text-red-600 mt-1" />}
              <div>
                  <h4 className={`font-bold ${result === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                      {result === 'correct' ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <div className="text-sm mt-1 text-gray-700">
                      <p><strong>Logic:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Diploid Number (2n) = {diploidNumber}</li>
                          <li>Haploid Number (n) = {diploidNumber} ÷ 2 = <strong>{diploidNumber / 2}</strong></li>
                          <li>Endosperm is Triploid (3n) because it is formed by 1 male gamete (n) + 2 polar nuclei (n + n).</li>
                          <li>Calculation: {diploidNumber / 2} × 3 = <strong>{(diploidNumber / 2) * 3}</strong></li>
                      </ul>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
