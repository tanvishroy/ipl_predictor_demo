import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Command, Eye, Sun, Sliders } from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SoundEngine } from '../../audio/SoundEngine';

export const TopHeader: React.FC = () => {
  const { companionState, isMuted, toggleMute, setCommandPaletteOpen } = useCompanion();
  const { reducedMotion, setReducedMotion, highContrast, setHighContrast } = useAccessibility();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStateBadgeColor = () => {
    switch (companionState) {
      case 'LISTENING': return 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/50';
      case 'THINKING': return 'bg-[#6DF6FF]/20 text-[#6DF6FF] border-[#6DF6FF]/50';
      case 'SPEAKING': return 'bg-[#0099FF]/20 text-[#0099FF] border-[#0099FF]/50';
      case 'RESEARCH': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'SLEEP': return 'bg-slate-800/40 text-slate-400 border-slate-700';
      default: return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    }
  };

  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-3 border-b border-[#00E5FF]/10 backdrop-blur-md bg-[#05070D]/70">
      {/* Brand & Companion Identification */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30">
          <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-wider text-base text-slate-100 font-sans">
            CRISSY
          </span>
          <span className="text-[10px] tracking-widest text-[#00E5FF]/70 uppercase font-mono">
            Living Companion
          </span>
        </div>

        {/* State Badge */}
        <div className={`ml-4 px-2.5 py-0.5 text-[11px] font-mono rounded-full border transition-all duration-300 ${getStateBadgeColor()}`}>
          {companionState}
        </div>
      </div>

      {/* Center Command Palette Trigger Button */}
      <button
        onClick={() => {
          SoundEngine.playHoverChirp();
          setCommandPaletteOpen(true);
        }}
        className="hidden md:flex items-center space-x-3 px-4 py-1.5 rounded-full bg-[#090F1C]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 text-slate-300 text-xs transition-all hover:bg-[#101828] group"
      >
        <span className="text-slate-400 group-hover:text-slate-200">Search spatial actions...</span>
        <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-[#00E5FF]">
          <Command className="w-3 h-3 inline" />
          <span>K</span>
        </div>
      </button>

      {/* Right Telemetry & Spatial Controls */}
      <div className="flex items-center space-x-4">
        {/* Backend Contract Status Badge */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/60 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Awaiting Backend</span>
        </div>

        {/* Time Indicator */}
        <span className="font-mono text-xs text-slate-400 tracking-wider">
          {timeStr}
        </span>

        {/* Accessibility Shortcuts */}
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          title={reducedMotion ? "Enable Motion" : "Reduced Motion Mode"}
          className={`p-1.5 rounded-lg border transition-all ${
            reducedMotion 
              ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' 
              : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={() => setHighContrast(!highContrast)}
          title={highContrast ? "Standard Contrast" : "High Contrast Mode"}
          className={`p-1.5 rounded-lg border transition-all ${
            highContrast 
              ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' 
              : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Audio Mute Toggle */}
        <button
          onClick={toggleMute}
          title={isMuted ? "Unmute Audio Engine" : "Mute Audio Engine"}
          className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#00E5FF]" />}
        </button>
      </div>
    </header>
  );
};
