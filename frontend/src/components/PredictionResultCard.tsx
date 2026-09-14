import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, ShieldAlert, Award, ChevronRight, Zap } from 'lucide-react';
import { IPLTeam, TeamCode } from '../types/ipl';
import { getTeamByCode } from '../data/teams';
import { TeamBadge } from './TeamBadge';

interface PredictionResultCardProps {
  winnerCodeOrName: string;
  team1: IPLTeam | undefined;
  team2: IPLTeam | undefined;
  onReset: () => void;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  winnerCodeOrName,
  team1,
  team2,
  onReset
}) => {
  // Find matching team data by code or name
  const winningTeam = getTeamByCode(winnerCodeOrName);
  
  // Display name formatted: "Mumbai Indians (MI)" or fallback to raw string if unknown
  const winnerDisplayName = winningTeam 
    ? `${winningTeam.name} (${winningTeam.code})`
    : winnerCodeOrName;

  const winnerPrimaryColor = winningTeam?.primaryColor || '#F59E0B';
  const winnerSecondaryColor = winningTeam?.secondaryColor || '#1E293B';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto mt-8"
    >
      <div 
        className="relative rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl border transition-all"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))`,
          borderColor: `${winnerPrimaryColor}60`,
          boxShadow: `0 20px 50px -10px ${winnerPrimaryColor}30, 0 0 30px ${winnerPrimaryColor}20`
        }}
      >
        {/* Glow ambient background sphere */}
        <div 
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: winnerPrimaryColor }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: winnerSecondaryColor }}
        />

        {/* TOP BADGE */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
            Predicted Winner
          </div>

          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Flask ML Engine Result
          </span>
        </div>

        {/* WINNER HERO SECTION */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 my-4 text-center sm:text-left">
          {winningTeam && (
            <div className="relative group">
              <TeamBadge team={winningTeam} size="xl" showGlow />
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-lg">
                <Trophy className="w-5 h-5 fill-slate-950" />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">
              Match Winner Analysis Complete
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-wide uppercase text-white drop-shadow-md">
              {winningTeam ? winningTeam.name : winnerCodeOrName}
            </h2>

            {winningTeam && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <span 
                  className="px-3 py-1 rounded-lg text-xs font-bold font-mono uppercase tracking-wider"
                  style={{
                    backgroundColor: `${winningTeam.primaryColor}30`,
                    color: winningTeam.primaryColor,
                    border: `1px solid ${winningTeam.primaryColor}60`
                  }}
                >
                  Code: {winningTeam.code}
                </span>

                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> {winningTeam.titles} IPL Titles
                </span>

                <span className="text-slate-400 text-xs">
                  • "{winningTeam.slogan}"
                </span>
              </div>
            )}
          </div>
        </div>

        {/* MATCHUP SUMMARY CARD */}
        {team1 && team2 && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TeamBadge team={team1} size="sm" />
                <div>
                  <div className="text-xs text-slate-400">Team 1</div>
                  <div className="text-sm font-bold text-white">{team1.name}</div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                winningTeam?.code === team1.code 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {winningTeam?.code === team1.code ? 'Predicted Winner 🏆' : 'Opponent'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TeamBadge team={team2} size="sm" />
                <div>
                  <div className="text-xs text-slate-400">Team 2</div>
                  <div className="text-sm font-bold text-white">{team2.name}</div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                winningTeam?.code === team2.code 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {winningTeam?.code === team2.code ? 'Predicted Winner 🏆' : 'Opponent'}
              </span>
            </div>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/40">
          <p className="text-xs text-slate-400 italic">
            * Real-time prediction generated by Flask backend ML model.
          </p>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            Predict Another Match <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
