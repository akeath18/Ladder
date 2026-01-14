
import React, { useState } from 'react';
import { DispositionCard } from '../types';

interface CardProps {
  card: DispositionCard;
  isSelected?: boolean;
  isDragging?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}

const Card: React.FC<CardProps> = ({ card, isSelected, isDragging, onClick, onDragStart }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(!flipped);
  };

  return (
    <div 
      className={`relative w-48 h-64 perspective-1000 cursor-grab active:cursor-grabbing transition-all duration-300 
        ${isSelected ? 'scale-105 ring-4 ring-blue-500 rounded-xl shadow-2xl z-10' : 'hover:scale-102'} 
        ${isDragging ? 'opacity-40 scale-95' : 'opacity-100'}`}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden bg-white border-2 rounded-xl shadow-lg p-4 flex flex-col ${card.isVowel ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-slate-200'} ${isSelected ? 'border-blue-500' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-slate-800 leading-tight pr-4">{card.title}</h3>
            <span className={`text-xl font-black ${card.isVowel ? 'text-yellow-500' : 'text-slate-400'}`}>{card.letter}</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Skilled:</p>
            <ul className="text-[9px] text-slate-600 space-y-1 leading-tight list-disc pl-3">
              {card.skilled.slice(0, 5).map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
              {card.skilled.length > 5 && <li className="list-none text-blue-500 font-medium">+ {card.skilled.length - 5} more...</li>}
            </ul>
          </div>
          <button 
            onClick={handleFlip}
            className="mt-2 text-[10px] font-semibold text-blue-600 bg-blue-50 py-1.5 rounded-md text-center hover:bg-blue-100 transition-colors"
          >
            QUICK VIEW: BACK
          </button>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 border-2 rounded-xl shadow-lg p-4 flex flex-col ${card.isVowel ? 'border-yellow-400' : 'border-slate-600'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-white leading-tight pr-4">{card.title}</h3>
            <span className={`text-xl font-black ${card.isVowel ? 'text-yellow-400' : 'text-slate-500'}`}>{card.letter}</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Overused:</p>
              <ul className="text-[9px] text-slate-300 space-y-1 leading-tight list-disc pl-3">
                {card.overused.slice(0, 3).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Unskilled:</p>
              <ul className="text-[9px] text-slate-300 space-y-1 leading-tight list-disc pl-3">
                {card.unskilled.slice(0, 3).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <button 
            onClick={handleFlip}
            className="mt-2 text-[10px] font-semibold text-slate-200 bg-slate-700 py-1.5 rounded-md text-center hover:bg-slate-600 transition-colors"
          >
            QUICK VIEW: FRONT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
