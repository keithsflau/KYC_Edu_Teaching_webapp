import React, { useRef, useState, useEffect } from 'react';
import { VOCAB_LIST } from '../constants';
import { gradeHandwriting } from '../services/geminiService';
import { VocabWord, WritingFeedback } from '../types';

const WritingPad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedChar, setSelectedChar] = useState<VocabWord>(VOCAB_LIST[0]);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1f2937'; // gray-800
    ctx.lineWidth = 8;
    
    // Draw grid background
    drawGrid(ctx, rect.width, rect.height);
  }, [selectedChar]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.lineWidth = 2;
    // Cross
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    // Diagonals
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    
    // Reset for drawing
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 12;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    drawGrid(ctx, rect.width, rect.height);
    setFeedback(null);
  };

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSubmit = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const result = await gradeHandwriting(dataUrl, selectedChar.char);
    setFeedback(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
      {/* Sidebar: Char Selection */}
      <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
        <h3 className="font-bold text-gray-700 mb-4 text-lg">選擇生字</h3>
        <div className="grid grid-cols-3 gap-3">
          {VOCAB_LIST.map((vocab) => (
            <button
              key={vocab.char}
              onClick={() => {
                setSelectedChar(vocab);
                clearCanvas();
              }}
              className={`
                aspect-square rounded-lg text-2xl font-serif border-2 transition-all
                ${selectedChar.char === vocab.char 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              {vocab.char}
            </button>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <p className="text-sm text-yellow-800 font-bold mb-1">生字卡</p>
          <div className="text-4xl font-serif text-center mb-2 text-gray-800">{selectedChar.char}</div>
          <div className="text-center text-gray-500 font-mono text-sm mb-2">Jyutping: {selectedChar.jyutping}</div>
          <p className="text-center text-gray-600 text-sm">{selectedChar.definition}</p>
        </div>
      </div>

      {/* Main: Canvas */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">請在田字格內寫出「{selectedChar.char}」字</h2>
            
            <div className="relative border-4 border-indigo-100 rounded-lg overflow-hidden cursor-crosshair touch-none shadow-inner">
                <canvas
                    ref={canvasRef}
                    className="block bg-white w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>

            <div className="flex gap-4 mt-6 w-full max-w-[400px]">
                <button 
                    onClick={clearCanvas}
                    className="flex-1 py-3 px-6 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                >
                    清除
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 px-6 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        "交卷評分"
                    )}
                </button>
            </div>
        </div>

        {/* Feedback Area */}
        {feedback && (
            <div className={`p-6 rounded-xl shadow-lg border-l-8 animate-fade-in ${feedback.score >= 8 ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-2xl font-bold ${feedback.score >= 8 ? 'text-green-700' : 'text-orange-700'}`}>
                        {feedback.score}/10 分
                    </h3>
                    <span className="text-sm uppercase tracking-wide font-bold text-gray-400">AI 老師點評</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                    {feedback.comment}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default WritingPad;
