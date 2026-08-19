import React, { useState, useEffect } from 'react';
import { STORY_TITLE, STORY_CONTENT } from '../constants';
import { StorySegment } from '../types';

const ReadingBook: React.FC = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text: string, id: number) => {
    window.speechSynthesis.cancel(); // Stop current

    if (playingId === id) {
      setPlayingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a Cantonese voice (zh-HK)
    const cantoneseVoice = voices.find(v => v.lang === 'zh-HK') || voices.find(v => v.lang.includes('zh'));
    
    if (cantoneseVoice) {
      utterance.voice = cantoneseVoice;
    }
    utterance.lang = 'zh-HK';
    utterance.rate = 0.9; // Slightly slower for reading

    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    setPlayingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 shadow-lg rounded-lg min-h-[600px] border-l-4 border-yellow-600 relative overflow-hidden">
      {/* Decorative Book Binding */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-gray-300 to-gray-100"></div>
      
      <h1 className="text-4xl font-serif font-bold text-center text-gray-800 mb-10 tracking-widest border-b-2 border-gray-200 pb-4">
        {STORY_TITLE}
      </h1>

      <div className="space-y-8">
        {STORY_CONTENT.map((segment: StorySegment) => (
          <div 
            key={segment.id}
            onClick={() => speak(segment.text, segment.id)}
            className={`
              p-4 rounded-xl transition-all duration-300 cursor-pointer text-xl md:text-2xl leading-loose font-serif
              ${playingId === segment.id 
                ? 'bg-yellow-50 text-yellow-900 shadow-md transform scale-[1.01] ring-2 ring-yellow-400' 
                : 'hover:bg-gray-50 text-gray-700'}
            `}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1 flex-shrink-0 ${playingId === segment.id ? 'text-yellow-600' : 'text-gray-300'}`}>
                {playingId === segment.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                   <span className="text-sm font-sans font-bold text-gray-400">{segment.id}</span>
                )}
              </span>
              <p>{segment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>點擊段落以聆聽廣東話朗讀</p>
      </div>
    </div>
  );
};

export default ReadingBook;
