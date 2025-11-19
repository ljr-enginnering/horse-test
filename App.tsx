import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Horse, RaceStatus } from './types';
import { HORSE_DATA } from './constants';
import { HorseLane } from './components/HorseLane';
import { Button } from './components/Button';
import { Leaderboard } from './components/Leaderboard';

const FINISH_DISTANCE = 90; // Matches the visual marker in HorseLane (90%)

const App: React.FC = () => {
  const [status, setStatus] = useState<RaceStatus>(RaceStatus.IDLE);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const raceIntervalRef = useRef<number | null>(null);
  const finishedCountRef = useRef<number>(0);

  // Initialize horses
  const resetRace = useCallback(() => {
    const initialHorses: Horse[] = HORSE_DATA.map((data, index) => ({
      id: index + 1,
      ...data,
      position: 0,
      speedFactor: Math.random() * 0.5 + 0.8, // Mild base speed variance
      rank: null,
      finished: false,
    }));
    setHorses(initialHorses);
    setStatus(RaceStatus.IDLE);
    setShowLeaderboard(false);
    finishedCountRef.current = 0;
    if (raceIntervalRef.current) {
      window.clearInterval(raceIntervalRef.current);
      raceIntervalRef.current = null;
    }
  }, []);

  // Initial load
  useEffect(() => {
    resetRace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRace = () => {
    if (status === RaceStatus.RUNNING) return;
    setStatus(RaceStatus.RUNNING);
    finishedCountRef.current = 0;

    // The Race Loop
    raceIntervalRef.current = window.setInterval(() => {
      setHorses((prevHorses) => {
        let activeFinishers = 0;
        const updatedHorses = prevHorses.map((horse) => {
          if (horse.finished) return horse;

          // Random burst logic
          const burst = Math.random() > 0.8 ? 1.5 : 1.0;
          const stumble = Math.random() > 0.95 ? 0.5 : 1.0;
          
          // Base movement calculation
          const movement = (Math.random() * 0.8 + 0.2) * horse.speedFactor * burst * stumble;
          
          let newPosition = horse.position + movement;

          // Check Finish
          if (newPosition >= FINISH_DISTANCE) {
            newPosition = FINISH_DISTANCE;
            finishedCountRef.current += 1;
            
            // Return finished horse state
            return {
              ...horse,
              position: newPosition,
              finished: true,
              rank: finishedCountRef.current,
            };
          }

          return { ...horse, position: newPosition };
        });

        // Check if all horses finished
        const allFinished = updatedHorses.every((h) => h.finished);
        if (allFinished) {
          endRace();
        }

        return updatedHorses;
      });
    }, 50); // Update every 50ms
  };

  const endRace = () => {
    if (raceIntervalRef.current) {
      window.clearInterval(raceIntervalRef.current);
      raceIntervalRef.current = null;
    }
    setStatus(RaceStatus.FINISHED);
    setTimeout(() => setShowLeaderboard(true), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="p-4 sm:p-6 bg-slate-800 border-b border-slate-700 shadow-md z-20 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
            🐎
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Derby Dash</h1>
            <p className="text-slate-400 text-xs">Real-time Betting Simulation</p>
          </div>
        </div>

        <div className="flex gap-3">
          {status === RaceStatus.RUNNING ? (
            <div className="px-6 py-3 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 font-bold animate-pulse">
              RACE IN PROGRESS...
            </div>
          ) : (
            <>
              <Button onClick={startRace} disabled={status === RaceStatus.FINISHED}>
                {status === RaceStatus.FINISHED ? 'Race Finished' : 'Start Race'}
              </Button>
              {status === RaceStatus.FINISHED && (
                <Button variant="secondary" onClick={resetRace}>
                  Reset Board
                </Button>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Track Area */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-[#2d5a27]">
        {/* Grass Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/grass.png")' }}>
        </div>

        <div className="max-w-5xl mx-auto py-6 px-2 sm:px-6 relative z-10">
          {/* Finish Line Graphic */}
          <div className="absolute top-0 bottom-0 right-[10%] w-4 checkered-flag z-0 opacity-50 h-full"></div>

          <div className="bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-white/10">
              {horses.map((horse, index) => (
                <HorseLane key={horse.id} horse={horse} index={index} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Results Modal */}
      {showLeaderboard && (
        <Leaderboard horses={horses} onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
};

export default App;