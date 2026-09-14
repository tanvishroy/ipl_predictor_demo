import React from 'react';
import { IPLTeam, TeamCode } from '../types/ipl';
import { IPL_TEAMS, getTeamByCode } from '../data/teams';
import { TeamBadge } from './TeamBadge';
import { Shield, MapPin, Trophy, ArrowRightLeft, Sparkles } from 'lucide-react';

interface TeamSelectorProps {
  team1Code: string;
  team2Code: string;
  onSelectTeam1: (code: string) => void;
  onSelectTeam2: (code: string) => void;
  onSwapTeams: () => void;
  isLoading: boolean;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  team1Code,
  team2Code,
  onSelectTeam1,
  onSelectTeam2,
  onSwapTeams,
  isLoading
}) => {
  const team1 = getTeamByCode(team1Code);
  const team2 = getTeamByCode(team2Code);

  return (
    <div className="w-full">
      {/* Head to Head Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        
        {/* TEAM 1 CARD */}
        <div className="md:col-span-5 glass-panel rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl relative overflow-hidden group">
          {/* Accent top glow line */}
          {team1 && (
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
              style={{ backgroundColor: team1.primaryColor }}
            />
          )}

          <div className="flex items-center justify-between mb-3">
            <label 
              htmlFor="team1-select" 
              className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" /> Team 1 (Home / Bat First)
            </label>
            {team1 && (
              <span className="text-[11px] font-mono text-slate-400">
                {team1.titles} {team1.titles === 1 ? 'Title' : 'Titles'} 🏆
              </span>
            )}
          </div>

          {/* TEAM 1 DROPDOWN */}
          <div className="relative mb-4">
            <select
              id="team1-select"
              value={team1Code}
              onChange={(e) => onSelectTeam1(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-900/90 text-white font-medium text-base rounded-xl px-4 py-3.5 border border-slate-700/80 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 cursor-pointer appearance-none disabled:opacity-50 transition-all shadow-inner"
            >
              <option value="" disabled>Select Team 1...</option>
              {IPL_TEAMS.map((team: IPLTeam) => {
                const isSelectedAsTeam2 = team.code === team2Code;
                return (
                  <option 
                    key={`t1-${team.code}`} 
                    value={team.code}
                    className="bg-slate-900 text-white py-2"
                  >
                    {team.name} ({team.code}) {isSelectedAsTeam2 ? '— Selected as Team 2' : ''}
                  </option>
                );
              })}
            </select>

            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* VISUAL TEAM 1 PREVIEW */}
          {team1 ? (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <TeamBadge team={team1} size="lg" showGlow />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white tracking-wide truncate font-heading uppercase">
                    {team1.name}
                  </h3>
                </div>
                <p className="text-xs text-amber-400/90 italic font-medium mb-1">
                  "{team1.slogan}"
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" /> {team1.venue}
                  </span>
                  <span>| Capt: <strong className="text-slate-300">{team1.captain}</strong></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
              Choose a team from the dropdown above
            </div>
          )}
        </div>

        {/* SWAP BUTTON & VS DIVIDER */}
        <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
          <button
            type="button"
            onClick={onSwapTeams}
            disabled={isLoading || !team1Code || !team2Code}
            title="Swap Team 1 and Team 2"
            className="p-3 rounded-full bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 disabled:opacity-40 disabled:hover:bg-slate-800 disabled:hover:text-amber-400 shadow-lg group hover:rotate-180"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
          <span className="mt-1 font-heading text-xl font-bold text-amber-500/60 tracking-wider">VS</span>
        </div>

        {/* TEAM 2 CARD */}
        <div className="md:col-span-5 glass-panel rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl relative overflow-hidden group">
          {/* Accent top glow line */}
          {team2 && (
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
              style={{ backgroundColor: team2.primaryColor }}
            />
          )}

          <div className="flex items-center justify-between mb-3">
            <label 
              htmlFor="team2-select" 
              className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" /> Team 2 (Away / Chase)
            </label>
            {team2 && (
              <span className="text-[11px] font-mono text-slate-400">
                {team2.titles} {team2.titles === 1 ? 'Title' : 'Titles'} 🏆
              </span>
            )}
          </div>

          {/* TEAM 2 DROPDOWN */}
          <div className="relative mb-4">
            <select
              id="team2-select"
              value={team2Code}
              onChange={(e) => onSelectTeam2(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-900/90 text-white font-medium text-base rounded-xl px-4 py-3.5 border border-slate-700/80 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 cursor-pointer appearance-none disabled:opacity-50 transition-all shadow-inner"
            >
              <option value="" disabled>Select Team 2...</option>
              {IPL_TEAMS.map((team: IPLTeam) => {
                const isSelectedAsTeam1 = team.code === team1Code;
                return (
                  <option 
                    key={`t2-${team.code}`} 
                    value={team.code}
                    className="bg-slate-900 text-white py-2"
                  >
                    {team.name} ({team.code}) {isSelectedAsTeam1 ? '— Selected as Team 1' : ''}
                  </option>
                );
              })}
            </select>

            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* VISUAL TEAM 2 PREVIEW */}
          {team2 ? (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <TeamBadge team={team2} size="lg" showGlow />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white tracking-wide truncate font-heading uppercase">
                    {team2.name}
                  </h3>
                </div>
                <p className="text-xs text-amber-400/90 italic font-medium mb-1">
                  "{team2.slogan}"
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" /> {team2.venue}
                  </span>
                  <span>| Capt: <strong className="text-slate-300">{team2.captain}</strong></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
              Choose a team from the dropdown above
            </div>
          )}
        </div>

      </div>

      {/* QUICK SELECTION PILLS */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quick Pick Franchises:
        </span>
        {IPL_TEAMS.map((t) => {
          const isSelected = t.code === team1Code || t.code === team2Code;
          return (
            <button
              key={`pill-${t.code}`}
              type="button"
              onClick={() => {
                if (!team1Code || isSelected) {
                  onSelectTeam1(t.code);
                } else if (!team2Code) {
                  onSelectTeam2(t.code);
                } else {
                  onSelectTeam1(t.code);
                }
              }}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                  : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {t.code}
            </button>
          );
        })}
      </div>
    </div>
  );
};
