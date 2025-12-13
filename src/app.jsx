import React, { useEffect } from 'react';
import { useMontyHall } from './usemontyhall';
import Door from './door';
import { SimulationPanel } from './components/SimulationPanel';
import { RotateCcw, Trophy, AlertTriangle } from 'lucide-react';

export default function App() {
  const {
    gameState,
    doors,
    prizeDoor,
    selectedDoor,
    hostOpenedDoor,
    message,
    impactMessage,
    stats,
    startNewGame,
    pickDoor,
    finalizeChoice,
    runSimulation,
    resetStats
  } = useMontyHall();

  // Start game on load
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const getDoorStatus = (doorId) => {
    if (gameState === 'RESULT') return 'open';
    if (doorId === hostOpenedDoor) return 'open';
    return 'closed';
  };

  const getDoorContent = (doorId) => {
    return doorId === prizeDoor ? 'prize' : 'bust';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 uppercase drop-shadow-sm">
              Cash or Bust
            </h1>
            <p className="text-slate-500 text-sm font-mono tracking-wider mt-1">
              MONTY HALL PROBABILITY VISUALIZER
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-2">
              <Trophy size={16} className="text-amber-500" />
              <span className="text-sm font-bold text-slate-300">Prize: <span className="text-amber-400">$10,000</span></span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Main Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Game Status Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 text-center shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              <h2 className="text-2xl font-bold text-slate-100">
                {message}
              </h2>
            </div>

            {/* The Stage (Doors) */}
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8 md:p-12 flex justify-center items-end gap-4 md:gap-12 min-h-[400px] relative">
              {/* Spotlight Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
              
              {doors.map((doorId) => (
                <Door
                  key={doorId}
                  id={doorId}
                  status={getDoorStatus(doorId)}
                  content={getDoorContent(doorId)}
                  isSelected={selectedDoor === doorId}
                  isDisabled={
                    (gameState !== 'PICK' && gameState !== 'REVEAL') || 
                    doorId === hostOpenedDoor
                  }
                  onClick={(id) => {
                    if (gameState === 'PICK') pickDoor(id);
                  }}
                />
              ))}
            </div>

            {/* Impact Analysis Bar (Post-Game) */}
            {impactMessage && (
              <div className={`rounded-xl p-4 border-l-4 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 ${
                impactMessage.type === 'positive' 
                  ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200' 
                  : 'bg-slate-800 border-slate-500 text-slate-300'
              }`}>
                <div className={`p-2 rounded-full ${impactMessage.type === 'positive' ? 'bg-emerald-900/50' : 'bg-slate-700'}`}>
                  {impactMessage.type === 'positive' ? <Trophy size={20} /> : <AlertTriangle size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider opacity-70 mb-1">Impact Analysis</h4>
                  <p className="text-lg font-medium leading-tight">{impactMessage.text}</p>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="h-24 flex items-center justify-center">
              {gameState === 'REVEAL' && (
                <div className="flex gap-6 animate-in fade-in zoom-in duration-300">
                  <button
                    onClick={() => finalizeChoice(false)} // Stay
                    className="group relative px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="text-xl font-bold text-slate-200">STICK</span>
                    <span className="block text-xs text-slate-500 font-mono mt-1">KEEP DOOR {selectedDoor + 1}</span>
                  </button>
                  
                  <button
                    onClick={() => finalizeChoice(true)} // Switch
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="text-xl font-bold text-white">SWITCH</span>
                    <span className="block text-xs text-blue-100 font-mono mt-1">CHANGE TO DOOR {doors.find(d => d !== selectedDoor && d !== hostOpenedDoor) + 1}</span>
                  </button>
                </div>
              )}

              {gameState === 'RESULT' && (
                <button
                  onClick={startNewGame}
                  className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl text-xl font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-3 transition-transform hover:scale-105"
                >
                  <RotateCcw size={24} strokeWidth={3} /> PLAY AGAIN
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Statistical Bay (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <SimulationPanel 
              stats={stats} 
              onRunSimulation={runSimulation} 
              onReset={resetStats} 
            />

            {/* Educational Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-sm text-slate-400 leading-relaxed">
              <h4 className="text-slate-200 font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Why Switch?
              </h4>
              <p>
                When you first pick a door, you have a <span className="text-amber-400 font-bold">1/3</span> chance of finding the cash. That means there is a <span className="text-cyan-400 font-bold">2/3</span> chance the cash is behind one of the <i>other</i> doors.
              </p>
              <p className="mt-3">
                When the host opens an empty door, that <span className="text-cyan-400 font-bold">2/3</span> chance "concentrates" on the remaining closed door. Switching effectively lets you pick <i>two</i> doors instead of one!
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
