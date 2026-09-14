import React from 'react';
import { IPLTeam } from '../types/ipl';
import { TeamBadge } from './TeamBadge';
import { Trophy, Shield, MapPin, Swords } from 'lucide-react';

interface TeamComparisonProps {
  team1: IPLTeam | undefined;
  team2: IPLTeam | undefined;
}

export const TeamComparison: React.FC<TeamComparisonProps> = ({ team1, team2 }) => {
  if (!team1 || !team2) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 glass-panel rounded-3xl p-6 border border-slate-800/80 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white font-heading uppercase tracking-wider">
            Franchise Head-to-Head Comparison
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">Statistical Snapshot</span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-6 items-center text-center">
        {/* TEAM 1 */}
        <div className="flex flex-col items-center">
          <TeamBadge team={team1} size="lg" showGlow />
          <h4 className="mt-3 text-lg font-extrabold text-white font-heading tracking-wide uppercase">
            {team1.code}
          </h4>
          <p className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-none">{team1.name}</p>
        </div>

        {/* METRICS COMPARISON */}
        <div className="space-y-4 text-xs">
          {/* Titles */}
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> IPL Titles
            </div>
            <div className="flex items-center justify-between px-3 font-mono font-bold text-sm">
              <span className={team1.titles > team2.titles ? 'text-amber-400' : 'text-slate-300'}>{team1.titles}</span>
              <span className="text-slate-600 text-xs">vs</span>
              <span className={team2.titles > team1.titles ? 'text-amber-400' : 'text-slate-300'}>{team2.titles}</span>
            </div>
          </div>

          {/* Captains */}
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-sky-400" /> Captains
            </div>
            <div className="flex items-center justify-between px-2 font-sans text-[11px] text-slate-300">
              <span className="truncate max-w-[65px] font-medium">{team1.captain.split(' ')[0]}</span>
              <span className="text-slate-600 text-[10px]">vs</span>
              <span className="truncate max-w-[65px] font-medium">{team2.captain.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* TEAM 2 */}
        <div className="flex flex-col items-center">
          <TeamBadge team={team2} size="lg" showGlow />
          <h4 className="mt-3 text-lg font-extrabold text-white font-heading tracking-wide uppercase">
            {team2.code}
          </h4>
          <p className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-none">{team2.name}</p>
        </div>
      </div>
    </div>
  );
};
