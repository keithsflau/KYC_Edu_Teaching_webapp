import React, { useState, useEffect } from 'react';
import { generateQuiz } from '../services/geminiService';
import { STORY_CONTENT } from '../constants';
import { QuizQuestion } from '../types';

const QuizBoard: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const startNewQuiz = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setCurrentQIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);

    // Combine story text for context
    const fullText = STORY_CONTENT.map(s => s.text).join(" ");
    const quizData = await generateQuiz(fullText);
    
    if (quizData && quizData.length > 0) {
      setQuestions(quizData);
    } else {
      setError("無法生成測驗，請檢查 API Key 或網絡連接。");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (questions.length === 0 && !loading && !error) {
      startNewQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    setSelectedOption(option);
    
    const currentQ = questions[currentQIndex];
    if (option === currentQ.answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium animate-pulse">AI 老師正在出卷中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200 text-red-600">
        <p className="mb-4">{error}</p>
        <button onClick={startNewQuiz} className="px-4 py-2 bg-red-600 text-white rounded-lg">重試</button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">測驗完成！</h2>
        <p className="text-gray-500 mb-6">做得好！繼續努力！</p>
        <div className="text-5xl font-bold text-indigo-600 mb-8">{score} / {questions.length}</div>
        <button 
          onClick={startNewQuiz}
          className="w-full py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          再做一次
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-end">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Question {currentQIndex + 1} of {questions.length}</span>
            <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
        </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl min-h-[400px] flex flex-col justify-between">
        <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {currentQ.question}
            </h3>

            <div className="space-y-4">
            {currentQ.options.map((option, idx) => {
                let btnClass = "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
                
                if (selectedOption) {
                    if (option === currentQ.answer) {
                        btnClass = "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500";
                    } else if (option === selectedOption) {
                        btnClass = "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500";
                    } else {
                        btnClass = "opacity-50 border-gray-100";
                    }
                }

                return (
                <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!selectedOption}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-lg ${btnClass}`}
                >
                    <div className="flex items-center">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 text-sm font-bold ${selectedOption && option === currentQ.answer ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                    </div>
                </button>
                );
            })}
            </div>
        </div>

        {selectedOption && (
            <div className="mt-8 pt-6 border-t border-gray-100 animate-fade-in">
                <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
                    <span className="font-bold block mb-1">💡 解析：</span>
                    {currentQ.explanation}
                </div>
                <button 
                    onClick={nextQuestion}
                    className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-transform active:scale-[0.98]"
                >
                    {currentQIndex < questions.length - 1 ? "下一題" : "查看結果"}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuizBoard;
