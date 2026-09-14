import React from 'react';
import { GlassPanel } from '../../spatial/GlassPanel';
import { useCompanion } from '../../../context/CompanionContext';
import { Sparkles, Mic, Lightbulb, Compass, Code2 } from 'lucide-react';
import { SoundEngine } from '../../../audio/SoundEngine';

export const ConversationView: React.FC = () => {
  const { companionState, greeting, thinkingMessage, triggerWake, triggerThink } = useCompanion();

  const prompts = [
    { title: 'Architect System', desc: 'Design microservice WebSocket streaming pipeline', icon: Code2 },
    { title: 'Explore Ideas', desc: 'Brainstorm spatial user interface design paradigms', icon: Compass },
    { title: 'Knowledge Synthesis', desc: 'Extract key concepts from saved research papers', icon: Lightbulb },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-full p-4 md:p-6 max-w-4xl mx-auto overflow-y-auto custom-scrollbar space-y-6">
      {/* Greeting & Companion State Banner */}
      <div className="text-center space-y-2 mt-4">
        <h1 className="text-2xl md:text-4xl font-light tracking-wide text-slate-100 font-sans">
          {greeting}
        </h1>
        <p className="text-xs md:text-sm text-[#00E5FF]/80 font-mono tracking-wider">
          CRISSY is present. Ready for instruction.
        </p>
      </div>

      {/* Voice / Active State Visual Display */}
      {companionState === 'LISTENING' && (
        <div className="flex flex-col items-center space-y-3 py-6 animate-fade-in">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] shadow-[0_0_30px_#00E5FF]">
            <Mic className="w-8 h-8 text-[#00E5FF] animate-pulse" />
            <span className="absolute inset-0 rounded-full border border-[#00E5FF] animate-ping opacity-50" />
          </div>
          <span className="text-sm font-mono text-[#00E5FF] tracking-widest uppercase">
            Listening...
          </span>
        </div>
      )}

      {companionState === 'THINKING' && (
        <div className="flex flex-col items-center space-y-3 py-6 animate-fade-in">
          <div className="w-10 h-10 border-2 border-t-[#00E5FF] border-slate-700 rounded-full animate-spin" />
          <span className="text-sm font-mono text-[#6DF6FF] tracking-widest">
            {thinkingMessage}
          </span>
        </div>
      )}

      {companionState === 'SPEAKING' && (
        <div className="flex flex-col items-center space-y-3 py-6 animate-fade-in">
          <div className="flex items-center space-x-1 h-8">
            <span className="w-1.5 h-6 bg-[#0099FF] rounded-full animate-pulse" />
            <span className="w-1.5 h-8 bg-[#00E5FF] rounded-full animate-pulse delay-75" />
            <span className="w-1.5 h-4 bg-[#6DF6FF] rounded-full animate-pulse delay-150" />
            <span className="w-1.5 h-7 bg-[#00E5FF] rounded-full animate-pulse delay-100" />
          </div>
          <span className="text-xs font-mono text-[#0099FF]">Synthesizing spatial voice output...</span>
        </div>
      )}

      {/* Spatial Discourse Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {prompts.map((p, idx) => {
          const Icon = p.icon;
          return (
            <GlassPanel
              key={idx}
              onClick={() => {
                SoundEngine.playHoverChirp();
                triggerThink(`Processing ${p.title}...`);
              }}
              className="p-4 cursor-pointer group hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/50">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-200 group-hover:text-[#00E5FF]">
                  {p.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {p.desc}
              </p>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
};
