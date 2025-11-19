import React from 'react';
import { Horse } from '../types';

interface LeaderboardProps {
  horses: Horse[];
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ horses, onClose }) => {
  // Filter only finished horses and sort by rank
  const rankedHorses = horses
    .filter(h => h.rank !== null)
    .sort((a, b) => (a.rank || 99) - (b.rank || 99));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-600 w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600">
          <h2 className="text-2xl font-bold text-white text-center uppercase tracking-wider">
            🏆 Race Results
          </h2>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <ul className="space-y-3">
            {rankedHorses.map((horse) => (
              <li 
                key={horse.id} 
                className={`
                  flex items-center justify-between p-3 rounded-xl border
                  ${horse.rank === 1 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : ''}
                  ${horse.rank === 2 ? 'bg-slate-400/20 border-slate-400 text-slate-300' : ''}
                  ${horse.rank === 3 ? 'bg-amber-700/20 border-amber-700 text-amber-500' : ''}
                  ${(horse.rank || 0) > 3 ? 'bg-slate-700/50 border-transparent text-slate-400' : ''}
                `}
              >
                <div className="flex items-center space-x-4">
                  <span className="font-mono font-bold text-lg w-6 text-center">
                    #{horse.rank}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{horse.name}</span>
                    <span className="text-xs opacity-70">ID: {horse.id}</span>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${horse.color}`}></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};