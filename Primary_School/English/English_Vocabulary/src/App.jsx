import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBasket,
  DoorOpen,
  List,
  Star,
  Trophy,
  Play,
  Check,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Home,
  Volume2,
  Mic
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- DATA ---
const LEVELS = [
  {
    id: 'entrance',
    title: 'Arrival',
    color: 'bg-blue-500',
    words: [
      { word: 'supermarket', hint: 'A very big shop', icon: <span className="text-6xl">🏪</span> },
      { word: 'entrance', hint: 'The way in', icon: <DoorOpen size={64} className="text-blue-600" /> },
      { word: 'trolley', hint: 'Cart with wheels', icon: <span className="text-6xl">🛒</span> },
      { word: 'customer', hint: 'Person buying things', icon: <span className="text-6xl">👤</span> },
      { word: 'receipt', hint: 'Paper showing what you paid', icon: <List size={64} className="text-white" /> },
      { word: 'wallet', hint: 'Where you keep money', icon: <span className="text-6xl">👛</span> },
    ]
  },
  {
    id: 'produce',
    title: 'Fresh Market',
    color: 'bg-green-600',
    words: [
      { word: 'vegetable', hint: 'Healthy plant food', icon: <span className="text-6xl">🥦</span> },
      { word: 'broccoli', hint: 'Green tree-like veg', icon: <span className="text-6xl">🥦</span> },
      { word: 'cucumber', hint: 'Long green salad veg', icon: <span className="text-6xl">🥒</span> },
      { word: 'cauliflower', hint: 'White tree-like veg', icon: <span className="text-6xl">🥬</span> },
      { word: 'pineapple', hint: 'Spiky tropical fruit', icon: <span className="text-6xl">🍍</span> },
      { word: 'strawberry', hint: 'Red berry with seeds', icon: <span className="text-6xl">🍓</span> },
      { word: 'watermelon', hint: 'Big fruit, red inside', icon: <span className="text-6xl">🍉</span> },
      { word: 'mushroom', hint: 'A fungus we eat', icon: <span className="text-6xl">🍄</span> },
    ]
  },
  {
    id: 'bakery',
    title: 'The Bakery',
    color: 'bg-amber-500',
    words: [
      { word: 'bakery', hint: 'Shop for bread and cakes', icon: <span className="text-6xl">🥐</span> },
      { word: 'croissant', hint: 'French pastry shaped like a moon', icon: <span className="text-6xl">🥐</span> },
      { word: 'sandwich', hint: 'Bread with filling', icon: <span className="text-6xl">🥪</span> },
      { word: 'biscuit', hint: 'Crunchy cookie', icon: <span className="text-6xl">🍪</span> },
      { word: 'doughnut', hint: 'Sweet ring with a hole', icon: <span className="text-6xl">🍩</span> },
      { word: 'baguette', hint: 'Long French bread', icon: <span className="text-6xl">🥖</span> },
      { word: 'delicious', hint: 'Tastes very good', icon: <span className="text-6xl">😋</span> },
      { word: 'pastries', hint: 'Sweet baked goods', icon: <span className="text-6xl">🥧</span> },
    ]
  },
  {
    id: 'fridge',
    title: 'Cold Storage',
    color: 'bg-cyan-600',
    words: [
      { word: 'refrigerator', hint: 'Keeps food cold', icon: <span className="text-6xl">❄️</span> },
      { word: 'yoghurt', hint: 'Thick milk snack', icon: <span className="text-6xl">🥣</span> },
      { word: 'margarine', hint: 'Yellow spread like butter', icon: <span className="text-6xl">🧈</span> },
      { word: 'sausage', hint: 'Meat in a tube shape', icon: <span className="text-6xl">🌭</span> },
      { word: 'cheese', hint: 'Made from milk, often yellow', icon: <span className="text-6xl">🧀</span> },
      { word: 'smoothie', hint: 'Blended fruit drink', icon: <span className="text-6xl">🥤</span> },
      { word: 'frozen', hint: 'Ice cold', icon: <span className="text-6xl">🧊</span> },
    ]
  },
  {
    id: 'pantry',
    title: 'Pantry Shelves',
    color: 'bg-orange-500',
    words: [
      { word: 'spaghetti', hint: 'Long Italian noodles', icon: <span className="text-6xl">🍝</span> },
      { word: 'cereal', hint: 'Breakfast from a box', icon: <span className="text-6xl">🥣</span> },
      { word: 'chocolate', hint: 'Sweet cocoa treat', icon: <span className="text-6xl">🍫</span> },
      { word: 'mayonnaise', hint: 'White creamy sauce', icon: <span className="text-6xl">🏺</span> },
      { word: 'ketchup', hint: 'Red tomato sauce', icon: <span className="text-6xl">🍅</span> },
      { word: 'vinegar', hint: 'Sour liquid for cooking', icon: <span className="text-6xl">🍶</span> },
      { word: 'noodles', hint: 'Stringy food', icon: <span className="text-6xl">🍜</span> },
    ]
  },
  {
    id: 'household',
    title: 'Household',
    color: 'bg-purple-500',
    words: [
      { word: 'detergent', hint: 'Washes clothes', icon: <span className="text-6xl">🧼</span> },
      { word: 'shampoo', hint: 'Washes hair', icon: <span className="text-6xl">🧴</span> },
      { word: 'tissue', hint: 'Wipe your nose', icon: <span className="text-6xl">🤧</span> },
      { word: 'expensive', hint: 'Costs a lot of money', icon: <span className="text-6xl">💰</span> },
      { word: 'cashier', hint: 'Person exploring money', icon: <span className="text-6xl">👩‍💼</span> },
      { word: 'medicine', hint: 'Take when sick', icon: <span className="text-6xl">💊</span> },
    ]
  },
  {
    id: 'expert',
    title: 'Expert Level',
    color: 'bg-rose-600',
    words: [
      { word: 'favourite', hint: 'Best liked', icon: <Star size={64} className="text-yellow-400" /> },
      { word: 'sensible', hint: 'Making smart choices', icon: <Sparkles size={64} className="text-blue-400" /> },
      { word: 'necessary', hint: 'Need to have', icon: <Check size={64} className="text-green-400" /> },
      { word: 'nutrition', hint: 'Health in food', icon: <span className="text-6xl">🥗</span> },
      { word: 'shopper', hint: 'One who shops', icon: <ShoppingBag size={64} className="text-purple-300" /> },
    ]
  }
];

// --- COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, className = "", variant = "primary", disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200",
    secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-50",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileHover={!disabled ? { y: -2, scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

// --- GAME LOGIC ---

export default function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, level_complete, victory
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
  const [score, setScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const currentLevel = LEVELS[currentLevelIdx];
  const currentWord = currentLevel?.words?.[currentWordIdx] || currentLevel?.words?.[0];

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Please use Chrome, Edge or Safari for Voice Input!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error("Speech error", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const cleanTranscript = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
      setUserInput(cleanTranscript);
      // Auto submit if comfortable
      setTimeout(() => checkAnswer(cleanTranscript), 500);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && !isTransitioning) {
      setTimeout(() => {
        if (!isListening) inputRef.current?.focus();
        speak(currentWord.word);
      }, 500);
    }
  }, [currentWordIdx, gameState, isTransitioning]);

  const playSuccess = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#3B82F6']
      });
      speak("Excellent!");
    } catch (e) {
      console.error("Confetti error", e);
    }
  };

  const checkAnswer = (overrideInput = null) => {
    if (isTransitioning) return;
    if (!currentWord) return;

    const target = currentWord.word.toLowerCase();
    const inputToCheck = (overrideInput || userInput).toLowerCase().trim();

    if (inputToCheck === target) {
      setFeedback('correct');
      setScore(s => s + 10);
      playSuccess();
      setIsTransitioning(true);

      setTimeout(() => {
        nextWord();
      }, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1000);
      if (!overrideInput) inputRef.current?.select();
      speak("Try again");
    }
  };

  const nextWord = () => {
    setFeedback(null);
    setUserInput('');
    setIsTransitioning(false);

    if (currentWordIdx + 1 < currentLevel.words.length) {
      setCurrentWordIdx(c => c + 1);
    } else {
      if (currentLevelIdx + 1 < LEVELS.length) {
        setGameState('level_complete');
        speak(`Level Complete! Next is ${LEVELS[currentLevelIdx + 1].title}`);
      } else {
        setGameState('victory');
        speak("You are a super shopper!");
      }
    }
  };

  const nextLevel = () => {
    setCurrentLevelIdx(c => c + 1);
    setCurrentWordIdx(0);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentLevelIdx(0);
    setCurrentWordIdx(0);
    setScore(0);
    setUserInput('');
    setFeedback(null);
    setIsTransitioning(false);
  };

  // --- RENDERS ---

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-100 to-slate-200">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-4 shadow-inner">
            <ShoppingBasket size={48} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Shopping Quest</h1>
            <p className="text-slate-500 text-lg">Help Fiona become a <span className="font-bold text-indigo-600">Sensible Shopper</span>!</p>
          </div>

          <Button onClick={() => setGameState('playing')} className="w-full text-xl py-4 shadow-xl shadow-indigo-200">
            <Play size={24} fill="currentColor" /> Start Adventure
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="min-h-screen bg-indigo-600 flex flex-col items-center justify-center p-4 text-white">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="text-center space-y-8 max-w-lg w-full"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white/20 blur-3xl rounded-full -z-10"
            />
            <Trophy size={120} className="mx-auto text-yellow-300 drop-shadow-lg" />
          </div>

          <div>
            <h1 className="text-5xl font-black mb-2">Amazing Job!</h1>
            <p className="text-2xl text-indigo-100">You are a Master Shopper!</p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
            <p className="text-sm uppercase tracking-widest font-bold opacity-75 mb-2">Total Score</p>
            <p className="text-7xl font-black text-white">{score}</p>
          </div>

          <Button onClick={resetGame} variant="secondary" className="w-full py-4 text-xl font-bold">
            <RefreshCw size={24} /> Play Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'level_complete') {
    return (
      <div className={`min-h-screen ${currentLevel.color} flex flex-col items-center justify-center p-4 text-white transition-colors duration-500`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm"
        >
          <Card className="p-8 text-center space-y-8 bg-white/95 backdrop-blur shadow-2xl">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
              <Check size={48} strokeWidth={4} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentLevel.title} Clear!</h2>
              <p className="text-slate-500">Keep going!</p>
            </div>
            <Button onClick={nextLevel} variant="success" className="w-full py-4 text-xl">
              Next Section <ArrowRight size={24} />
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // PLAYING STATE
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={resetGame} className="!p-2 aspect-square !rounded-lg">
            <Home size={20} />
          </Button>
          <div>
            <h2 className="font-bold text-slate-800 leading-tight text-sm sm:text-base">{currentLevel.title}</h2>
            <div className="flex gap-1 mt-1">
              {currentLevel.words.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-4 sm:w-6 rounded-full transition-all duration-300 
                    ${idx < currentWordIdx ? 'bg-indigo-600' : idx === currentWordIdx ? 'bg-indigo-400 animate-pulse' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
          <Star size={18} fill="currentColor" className="text-amber-400" />
          <span className="text-lg">{score}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 max-w-xl w-full mx-auto p-4 flex flex-col items-center justify-center gap-6 sm:gap-10">

        {/* Helper/Status Text */}
        <div className="text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Current Item</p>
        </div>

        {/* Card */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentWord.word}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full relative"
          >
            <Card className="p-6 sm:p-10 flex flex-col items-center gap-6 sm:gap-8 border-b-8 border-slate-200 shadow-xl relative">
              {/* Sound Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => speak(currentWord.word)}
                className="absolute top-4 right-4 p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors shadow-sm"
                title="Listen to pronunciation"
              >
                <Volume2 size={24} />
              </motion.button>

              <div className="w-32 h-32 sm:w-48 sm:h-48 bg-slate-50 rounded-full flex items-center justify-center shadow-inner border-2 border-slate-100 overflow-hidden relative" onClick={() => speak(currentWord.word)}>
                <div className="absolute inset-0 bg-blue-500/5 rounded-full" />
                {currentWord.icon}
              </div>

              <div className="space-y-2 text-center w-full">
                <p className="text-slate-500 text-lg sm:text-2xl font-medium leading-relaxed">"{currentWord.hint}"</p>
              </div>

              {/* Word Placeholder */}
              <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 text-3xl sm:text-5xl font-mono font-bold uppercase`}>
                {feedback === 'correct' ? (
                  <motion.div
                    initial={{ scale: 0.8 }} animate={{ scale: 1.1 }}
                    className="text-green-500 tracking-wide"
                  >
                    {currentWord.word}
                  </motion.div>
                ) : (
                  currentWord.word.split('').map((char, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className={`w-8 sm:w-10 h-12 sm:h-14 flex items-center justify-center rounded-lg border-2 
                          ${userInput[i] ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-300'}
                          transition-all duration-200
                        `}>
                        {userInput[i] || ''}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Input Area */}
        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => {
                if (isTransitioning) return;
                setUserInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') checkAnswer();
              }}
              disabled={isTransitioning}
              placeholder="Type or Say the word..."
              className={`w-full text-center text-2xl p-4 pr-14 rounded-2xl border-4 focus:outline-none transition-all shadow-sm
                ${feedback === 'incorrect'
                  ? 'border-red-300 bg-red-50 text-red-600 animate-shake placeholder-red-300'
                  : feedback === 'correct'
                    ? 'border-green-300 bg-green-50 text-green-600'
                    : isListening
                      ? 'border-red-400 ring-4 ring-red-100'
                      : 'border-indigo-100 focus:border-indigo-400 focus:shadow-indigo-100'
                }
              `}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {/* Mic Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={startListening}
              className={`absolute right-2 top-2 bottom-2 aspect-square rounded-xl transition-all flex items-center justify-center
                ${isListening ? 'bg-red-500 text-white animate-pulse shadow-red-200 shadow-lg' : 'bg-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}
              `}
              title="Click to Speak"
            >
              <Mic size={24} />
            </motion.button>

            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-0 right-0 text-center text-red-500 font-bold flex items-center justify-center gap-2"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Listening...
              </motion.div>
            )}

            {feedback === 'incorrect' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-0 right-0 text-center text-red-500 font-bold"
              >
                Try again!
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button variant="secondary" onClick={() => setUserInput(currentWord.word.slice(0, 1))} disabled={isTransitioning} className="py-4">
              Hint 💡
            </Button>
            <Button onClick={() => checkAnswer()} disabled={isTransitioning || !userInput} className="py-4">
              Check It! ✨
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
