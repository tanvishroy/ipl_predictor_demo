import React from 'react';
import { PredictionHistoryItem } from '../types/ipl';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { getTeamByCode } from '../data/teams';

interface RecentPredictionsProps {
  history: PredictionHistoryItem[];
  onClearHistory: () => void;
  onSelectPair: (t1: string, t2: string) => void;
}

export const RecentPredictions: React.FC<RecentPredictionsProps> = ({
  history,
  onClearHistory,
  onSelectPair
}) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 glass-panel rounded-3xl p-6 border border-slate-800/80 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-300">
          <History className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold font-heading uppercase tracking-wider text-white">
            Recent Predictions Log
          </h3>
        </div>

        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {history.map((item) => {
          const t1 = getTeamByCode(item.team1Code);
          const t2 = getTeamByCode(item.team2Code);
          const winner = getTeamByCode(item.winnerCode);

          return (
            <div
              key={item.id}
              onClick={() => onSelectPair(item.team1Code, item.team2Code)}
              className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono">{item.date}</span>
                <span className="text-[10px] text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Re-predict <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div className="flex items-center justify-between font-bold text-sm text-white">
                <span style={{ color: t1?.primaryColor || '#FFF' }}>{item.team1Code}</span>
                <span className="text-xs text-slate-500 font-mono">VS</span>
                <span style={{ color: t2?.primaryColor || '#FFF' }}>{item.team2Code}</span>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">Winner:</span>
                <span className="font-bold text-amber-400">
                  {winner ? `${winner.name} (${winner.code})` : item.winnerName || item.winnerCode} 🏆
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
