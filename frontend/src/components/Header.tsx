import React from 'react';
import { Trophy, Activity, Info, Zap } from 'lucide-react';

interface HeaderProps {
  isBackendConnected: boolean | null;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isBackendConnected, onOpenGuide }) => {
  return (
    <header className="relative z-10 w-full pt-8 pb-6 px-4 text-center max-w-5xl mx-auto">
      {/* Top Bar with Live Server Status Pill */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-amber-400" /> IPL 2026 Season
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 hidden sm:inline">Machine Learning Engine</span>
        </div>

        {/* Backend Status Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-800 text-xs font-medium transition-all"
            title="Flask Backend Setup Instructions"
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Backend Guide</span>
          </button>

          <div 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
              isBackendConnected === true
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : isBackendConnected === false
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                : 'bg-slate-900/60 border-slate-700/40 text-slate-400'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span 
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isBackendConnected === true ? 'bg-emerald-400' : isBackendConnected === false ? 'bg-rose-400' : 'bg-slate-400'
                }`}
              />
              <span 
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isBackendConnected === true ? 'bg-emerald-500' : isBackendConnected === false ? 'bg-rose-500' : 'bg-slate-500'
                }`}
              />
            </span>
            <span className="font-mono text-[11px]">
              {isBackendConnected === true
                ? 'Flask API Live'
                : isBackendConnected === false
                ? 'Flask API Offline'
                : 'Checking Server...'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Title Badge & Heading */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-4 shadow-lg shadow-amber-500/5">
        <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />
        AI-Powered Cricket Match Intelligence
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading text-white uppercase drop-shadow-md">
        IPL Match Winner <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Predictor</span>
      </h1>

      <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
        Select two IPL franchises to calculate head-to-head win probability and predict the likely match winner powered by our machine learning model.
      </p>
    </header>
  );
};
