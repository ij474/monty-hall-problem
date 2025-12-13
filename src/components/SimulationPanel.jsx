import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart2, RefreshCw, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

export const SimulationPanel = ({ stats, onRunSimulation, onReset }) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRun = () => {
    setIsSimulating(true);
    // Simulate a processing delay for effect
    setTimeout(() => {
      onRunSimulation(1000);
      setIsSimulating(false);
    }, 800);
  };

  const getPercentage = (wins, total) => {
    if (total === 0) return 0;
    return ((wins / total) * 100).toFixed(1);
  };

  const stayWinRate = getPercentage(stats.stay.wins, stats.stay.wins + stats.stay.losses);
  const switchWinRate = getPercentage(stats.switch.wins, stats.switch.wins + stats.switch.losses);
  const totalStay = stats.stay.wins + stats.stay.losses;
  const totalSwitch = stats.switch.wins + stats.switch.losses;

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Zap className="text-amber-400" size={20} />
          Statistical Bay <span className="text-xs font-normal text-slate-500 uppercase tracking-wider ml-2">Turbo Mode</span>
        </h3>
        <button 
          onClick={onReset}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-red-400 transition-colors"
          title="Reset Statistics"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Controls */}
      <div className="mb-8">
        <button
          onClick={handleRun}
          disabled={isSimulating}
          className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            isSimulating 
              ? 'bg-slate-800 text-slate-500 cursor-wait' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {isSimulating ? (
            <>Running Simulation...</>
          ) : (
            <><Zap size={20} /> Run 1,000 Games</>
          )}
        </button>
        <p className="text-center text-xs text-slate-500 mt-2">
          Runs counterfactual analysis on 1,000 seeds instantly.
        </p>
      </div>

      {/* Live Stats */}
      <div className="space-y-6">
        {/* Always Stay */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-amber-400">Always Stay</span>
            <span className="font-mono text-slate-300">{stayWinRate}%</span>
          </div>
          <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            {/* Target Line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white/20 left-[33.3%] z-10" title="Expected: 33.3%"></div>
            
            <motion.div 
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${stayWinRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-slate-500 font-mono">
            <span>{stats.stay.wins}W / {stats.stay.losses}L</span>
            <span>Target: 33.3%</span>
          </div>
        </div>

        {/* Always Switch */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-cyan-400">Always Switch</span>
            <span className="font-mono text-slate-300">{switchWinRate}%</span>
          </div>
          <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            {/* Target Line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white/20 left-[66.6%] z-10" title="Expected: 66.7%"></div>
            
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${switchWinRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-slate-500 font-mono">
            <span>{stats.switch.wins}W / {stats.switch.losses}L</span>
            <span>Target: 66.7%</span>
          </div>
        </div>
      </div>

      {/* Visual Breakdown (Pie Charts) */}
      {stats.total > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h4 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
            <PieChartIcon size={16} /> Visual Breakdown
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {/* Stay Chart */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-amber-500 mb-2">Stay Outcomes</span>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Win', value: stats.stay.wins },
                        { name: 'Loss', value: stats.stay.losses }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#f59e0b" /> {/* Amber-500 */}
                      <Cell fill="#334155" /> {/* Slate-700 */}
                      <Label 
                        value={`${stayWinRate}%`} 
                        position="center" 
                        fill="#f59e0b" 
                        style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }} 
                      />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                      itemStyle={{ color: '#cbd5e1' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Switch Chart */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-cyan-400 mb-2">Switch Outcomes</span>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Win', value: stats.switch.wins },
                        { name: 'Loss', value: stats.switch.losses }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#06b6d4" /> {/* Cyan-500 */}
                      <Cell fill="#334155" /> {/* Slate-700 */}
                      <Label 
                        value={`${switchWinRate}%`} 
                        position="center" 
                        fill="#06b6d4" 
                        style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }} 
                      />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                      itemStyle={{ color: '#cbd5e1' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Total Games Badge */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
          <BarChart2 size={14} className="text-slate-400" />
          <span className="text-sm font-mono text-slate-300">
            Total Games Analyzed: <span className="text-white font-bold">{stats.total}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
