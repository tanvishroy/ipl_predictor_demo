import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FolderKanban, 
  Wrench, 
  Target, 
  FileText, 
  CheckSquare, 
  BookOpen, 
  Sliders, 
  MessageSquare, 
  Bookmark,
  Plus
} from 'lucide-react';
import { GlassPanel } from '../../spatial/GlassPanel';
import { MemoryService } from '../../../services/ServiceLayer';
import { MemoryCategory, MemoryItem } from '../../../types';
import { SoundEngine } from '../../../audio/SoundEngine';

export const MemoryView: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<MemoryCategory>('Preferences');
  const [memories, setMemories] = useState<MemoryItem[]>([]);

  const categories: { id: MemoryCategory; label: string; icon: React.ElementType }[] = [
    { id: 'People', label: 'People', icon: Users },
    { id: 'Projects', label: 'Projects', icon: FolderKanban },
    { id: 'Skills', label: 'Skills', icon: Wrench },
    { id: 'Goals', label: 'Goals', icon: Target },
    { id: 'Documents', label: 'Documents', icon: FileText },
    { id: 'Tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'Knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'Preferences', label: 'Preferences', icon: Sliders },
    { id: 'Conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'Bookmarks', label: 'Bookmarks', icon: Bookmark },
  ];

  useEffect(() => {
    MemoryService.getMemories(selectedCat).then(setMemories);
  }, [selectedCat]);

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 font-sans">Neural Memory Matrix</h2>
          <p className="text-xs text-slate-400 font-mono">10 Structured Cognitive Categories</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto py-1 space-x-2 custom-scrollbar">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = selectedCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                SoundEngine.playHoverChirp();
                setSelectedCat(c.id);
              }}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {memories.length === 0 ? (
          <GlassPanel className="col-span-full p-12 text-center text-slate-500 space-y-2">
            <p className="text-xs font-mono">No memory items recorded in {selectedCat} yet.</p>
          </GlassPanel>
        ) : (
          memories.map((m) => (
            <GlassPanel key={m.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-semibold text-xs text-slate-200">{m.title}</span>
                <span className="text-[10px] font-mono text-slate-500">{m.timestamp}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{m.summary}</p>
              <div className="flex flex-wrap gap-1 pt-2">
                {m.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[9px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))
        )}
      </div>
    </div>
  );
};
