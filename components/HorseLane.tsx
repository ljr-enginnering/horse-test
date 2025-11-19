import React from 'react';
import { Horse } from '../types';

interface HorseLaneProps {
  horse: Horse;
  index: number;
}

export const HorseLane: React.FC<HorseLaneProps> = ({ horse, index }) => {
  // We use a slightly smaller width for the horse container to ensure it doesn't fly off screen at 100%
  const laneStyle = {
    width: '100%',
  };
  
  const horseStyle = {
    left: `${horse.position}%`,
    transition: 'left 0.1s linear', // Smooth interpolation between tick updates
  };

  return (
    <div className="relative w-full h-12 sm:h-14 border-b border-dashed border-white/20 flex items-center bg-green-800/30 overflow-hidden">
      {/* Lane Number */}
      <div className="absolute left-2 text-xs sm:text-sm font-mono text-white/40 z-0">
        {index + 1}
      </div>

      {/* Finish Line Marker */}
      <div className="absolute right-[10%] top-0 bottom-0 w-2 bg-white/10 border-l border-dashed border-white/50 z-0" />

      {/* The Horse */}
      <div 
        className="absolute z-10 flex flex-col items-center -translate-x-1/2"
        style={horseStyle}
      >
        <div className={`relative p-1 rounded-full shadow-sm ${horse.finished ? 'scale-110 z-20' : 'scale-100'}`}>
             <span className="text-2xl sm:text-3xl transform -scale-x-100 inline-block filter drop-shadow-lg">
              🐎
            </span>
            {/* Rank Badge if finished */}
            {horse.rank && (
              <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-yellow-400 text-black text-[10px] font-bold rounded-full border border-white shadow-md">
                {horse.rank}
              </div>
            )}
        </div>
        <span className="text-[10px] px-1 rounded bg-black/50 whitespace-nowrap mt-[-4px]">
          {horse.name}
        </span>
      </div>
    </div>
  );
};