import React, { useState } from 'react';
import { AppMode } from './types';
import ReadingBook from './components/ReadingBook';
import WritingPad from './components/WritingPad';
import QuizBoard from './components/QuizBoard';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.READING);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold font-serif">
              粵
            </div>
            <span className="font-bold text-gray-800 text-lg hidden sm:block">粵語伴讀寶</span>
          </div>
          
          <nav className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setMode(AppMode.READING)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === AppMode.READING ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              📖 課文朗讀
            </button>
            <button 
              onClick={() => setMode(AppMode.WRITING)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === AppMode.WRITING ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ✍️ 寫字練習
            </button>
            <button 
              onClick={() => setMode(AppMode.QUIZ)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === AppMode.QUIZ ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🧠 智能測驗
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-fade-in-up">
            {mode === AppMode.READING && <ReadingBook />}
            {mode === AppMode.WRITING && <WritingPad />}
            {mode === AppMode.QUIZ && <QuizBoard />}
        </div>
      </main>

      {/* API Key Warning (Only visible if not configured, though standard practice assumes env var) */}
      {!process.env.API_KEY && (
         <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white text-center p-2 text-sm z-[100]">
           Warning: API_KEY is missing. Quiz and Writing AI features will not work.
         </div>
      )}
    </div>
  );
};

export default App;
