import React, { useState } from 'react';
import { storyElements, getRandomElement } from './data/storyElements';

function App() {
  const [currentRoll, setCurrentRoll] = useState({
    character: null,
    setting: null,
    item: null,
    conflict: null,
  });
  const [isRolling, setIsRolling] = useState(false);
  const [storyText, setStoryText] = useState('');

  const rollDice = () => {
    setIsRolling(true);
    
    // Reset current roll for animation effect
    setCurrentRoll({
      character: null,
      setting: null,
      item: null,
      conflict: null,
    });

    // After a short delay, set new values
    setTimeout(() => {
      setCurrentRoll({
        character: getRandomElement(storyElements.character),
        setting: getRandomElement(storyElements.setting),
        item: getRandomElement(storyElements.item),
        conflict: getRandomElement(storyElements.conflict),
      });
      setIsRolling(false);
    }, 600); // Match animation duration
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storyText);
      alert('故事已複製到剪貼簿！');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('複製失敗，請手動複製。');
    }
  };

  const DiceCard = ({ title, emoji, value, isRolling }) => {
    const showBack = value !== null;
    
    return (
      <div className="relative w-full max-w-xs h-64 perspective-1000 mx-auto">
        <div 
          className={`relative w-full h-full preserve-3d transition-transform duration-600 ${showBack ? 'rotate-y-180' : ''}`}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-white">
            <div className={`text-6xl mb-4 transition-transform duration-300 ${isRolling ? 'animate-spin' : ''}`}>{emoji}</div>
            <h3 className="text-2xl font-bold text-white text-center mb-2">{title}</h3>
            <div className="text-white/80 text-sm text-center">點擊擲骰子</div>
          </div>
          
          {/* Back of card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-white">
            <div className="text-6xl mb-4">{emoji}</div>
            <h3 className="text-xl font-bold text-white text-center mb-3">{title}</h3>
            {value ? (
              <div className="text-white text-lg font-semibold text-center leading-relaxed px-2">
                {value}
              </div>
            ) : (
              <div className="text-white/60 text-sm text-center">載入中...</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🎲 故事骰子生成器
          </h1>
          <p className="text-white/90 text-xl">Story Dice Generator</p>
        </div>

        {/* Dice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DiceCard
            title="人物"
            emoji="👤"
            value={currentRoll.character}
            isRolling={isRolling && !currentRoll.character}
          />
          <DiceCard
            title="地點"
            emoji="📍"
            value={currentRoll.setting}
            isRolling={isRolling && !currentRoll.setting}
          />
          <DiceCard
            title="物品"
            emoji="🎁"
            value={currentRoll.item}
            isRolling={isRolling && !currentRoll.item}
          />
          <DiceCard
            title="衝突"
            emoji="⚡"
            value={currentRoll.conflict}
            isRolling={isRolling && !currentRoll.conflict}
          />
        </div>

        {/* Roll Button */}
        <div className="text-center mb-8">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className={`px-12 py-6 text-3xl font-bold text-white rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isRolling
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400'
            }`}
          >
            {isRolling ? '擲骰子中...' : '🎲 擲骰子'}
          </button>
        </div>

        {/* Story Writing Area */}
        <div className="max-w-4xl mx-auto bg-white/95 rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            ✍️ 開始寫你的故事
          </h2>
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="使用上面的骰子結果，開始創作你的故事吧！"
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl text-lg font-chinese resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={copyToClipboard}
              disabled={!storyText.trim()}
              className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                storyText.trim()
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              📋 複製到剪貼簿
            </button>
          </div>
        </div>

        {/* Story Elements Display (for reference) */}
        {currentRoll.character && (
          <div className="max-w-4xl mx-auto mt-6 bg-white/80 rounded-xl p-4 text-sm text-gray-600">
            <p className="text-center">
              <strong>人物：</strong>{currentRoll.character} | 
              <strong> 地點：</strong>{currentRoll.setting} | 
              <strong> 物品：</strong>{currentRoll.item} | 
              <strong> 衝突：</strong>{currentRoll.conflict}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
