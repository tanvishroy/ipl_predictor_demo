import React, { useState, useEffect } from 'react';
import { Mic, Send, Sparkles, Command } from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { AssistantService } from '../../services/ServiceLayer';
import { SoundEngine } from '../../audio/SoundEngine';

export const CommandBar: React.FC = () => {
  const { 
    companionState, 
    triggerWake, 
    triggerThink, 
    triggerSpeak,
    setCommandPaletteOpen 
  } = useCompanion();

  const [inputVal, setInputVal] = useState<string>('');
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);

  const placeholders = [
    'Ask me anything...',
    'Continue yesterday\'s work...',
    'Search the web...',
    'Research this topic...',
    'Analyze project files...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const query = inputVal.trim();
    setInputVal('');

    AssistantService.sendMessage(query);
    triggerThink('Processing prompt...');

    setTimeout(() => {
      triggerSpeak();
    }, 1800);
  };

  return (
    <div className="relative z-30 w-full max-w-2xl mx-auto px-4 pb-6">
      <form
        onSubmit={handleSubmit}
        className={`
          group relative flex items-center p-2 rounded-2xl border transition-all duration-500
          backdrop-blur-2xl bg-[#090F1C]/85 shadow-[0_12px_40px_rgba(0,0,0,0.6)]
          ${
            companionState === 'LISTENING' || companionState === 'WAKE'
              ? 'border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.3)]'
              : 'border-[#00E5FF]/20 hover:border-[#00E5FF]/40'
          }
        `}
      >
        {/* Mic Activation Button */}
        <button
          type="button"
          onClick={() => {
            SoundEngine.playHoverChirp();
            triggerWake();
          }}
          title="Activate Voice (Hey CRISSY)"
          className={`
            p-2.5 rounded-xl transition-all duration-300
            ${
              companionState === 'LISTENING'
                ? 'bg-[#00E5FF] text-slate-950 scale-105 shadow-[0_0_15px_#00E5FF]'
                : 'bg-slate-800/60 text-slate-300 hover:text-[#00E5FF] hover:bg-slate-800'
            }
          `}
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
        />

        {/* Command Palette Trigger & Send */}
        <div className="flex items-center space-x-2 pr-1">
          <button
            type="button"
            onClick={() => {
              SoundEngine.playHoverChirp();
              setCommandPaletteOpen(true);
            }}
            className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700 text-[10px] font-mono text-slate-400 hover:text-[#00E5FF]"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>

          <button
            type="submit"
            disabled={!inputVal.trim()}
            className={`
              p-2 rounded-xl transition-all duration-300
              ${
                inputVal.trim()
                  ? 'bg-[#00E5FF] text-slate-950 shadow-[0_0_12px_#00E5FF]'
                  : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
