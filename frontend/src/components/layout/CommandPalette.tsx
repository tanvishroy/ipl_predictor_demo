import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  Code, 
  Globe, 
  FolderKanban, 
  Brain, 
  Workflow, 
  Cpu, 
  Settings,
  Sparkles,
  X,
  Command
} from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { WorkspaceType } from '../../types';
import { SoundEngine } from '../../audio/SoundEngine';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setActiveWorkspace, triggerThink } = useCompanion();
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        SoundEngine.playHoverChirp();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const actions = [
    { id: 'ws-conversation', title: 'Open Conversation Workspace', category: 'Workspace', icon: MessageSquare, action: () => setActiveWorkspace('conversation') },
    { id: 'ws-research', title: 'Open Research Workspace', category: 'Workspace', icon: Search, action: () => setActiveWorkspace('research') },
    { id: 'ws-developer', title: 'Open Developer Workspace', category: 'Workspace', icon: Code, action: () => setActiveWorkspace('developer') },
    { id: 'ws-browser', title: 'Open Spatial Browser', category: 'Workspace', icon: Globe, action: () => setActiveWorkspace('browser') },
    { id: 'ws-projects', title: 'Open Projects Board', category: 'Workspace', icon: FolderKanban, action: () => setActiveWorkspace('projects') },
    { id: 'ws-memory', title: 'Open Memory Matrix', category: 'Workspace', icon: Brain, action: () => setActiveWorkspace('memory') },
    { id: 'ws-automation', title: 'Open Automation Pipeline', category: 'Workspace', icon: Workflow, action: () => setActiveWorkspace('automation') },
    { id: 'ws-agents', title: 'Open Agents Constellation', category: 'Workspace', icon: Cpu, action: () => setActiveWorkspace('agents') },
    { id: 'ws-settings', title: 'Open Companion Settings', category: 'Workspace', icon: Settings, action: () => setActiveWorkspace('settings') },
    { id: 'act-research', title: 'Trigger Deep Research Agent', category: 'Action', icon: Sparkles, action: () => { setActiveWorkspace('research'); triggerThink('Searching background...'); } },
  ];

  const filtered = actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-xl bg-[#090F1C] border border-[#00E5FF]/30 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#00E5FF]/10">
          <Search className="w-5 h-5 text-[#00E5FF] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a spatial command or search..."
            autoFocus
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-sans text-sm"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No matching spatial actions found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    SoundEngine.playHoverChirp();
                    item.action();
                    setCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#00E5FF]/10 text-left transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-[#00E5FF] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-slate-200 group-hover:text-[#00E5FF]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-t border-slate-800 text-[10px] font-mono text-slate-400">
          <span>Use Esc to close</span>
          <div className="flex items-center space-x-1">
            <Command className="w-3 h-3 text-[#00E5FF]" />
            <span>CRISSY Command Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
