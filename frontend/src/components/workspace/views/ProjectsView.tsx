import React from 'react';
import { FolderKanban, CheckCircle2, Clock, Plus, GitBranch, Layers } from 'lucide-react';
import { GlassPanel } from '../../spatial/GlassPanel';
import { SoundEngine } from '../../../audio/SoundEngine';

export const ProjectsView: React.FC = () => {
  const projects = [
    {
      id: 'p-1',
      title: 'CRISSY Companion Frontend',
      status: 'Active',
      progress: 95,
      tasks: '9 / 9 Workspaces Built',
      tags: ['React', 'R3F', 'TypeScript'],
    },
    {
      id: 'p-2',
      title: 'Java Spring Boot Core Services',
      status: 'Pending Contract',
      progress: 0,
      tasks: 'Awaiting REST / WebSocket Integration',
      tags: ['Java 21', 'Spring Boot', 'WebSockets'],
    },
    {
      id: 'p-3',
      title: 'Autonomous Research Pipeline',
      status: 'Target',
      progress: 10,
      tasks: 'Playwright & Vector Search Engine',
      tags: ['Playwright', 'Embeddings', 'AI'],
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 font-sans">Project Architecture Board</h2>
          <p className="text-xs text-slate-400 font-mono">Spatial initiative tracking & milestone matrix</p>
        </div>
        <button
          onClick={() => SoundEngine.playHoverChirp()}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-mono hover:bg-[#00E5FF]/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Initiative</span>
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <GlassPanel key={p.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <FolderKanban className="w-4 h-4 text-[#00E5FF]" />
                <span className="font-semibold text-xs text-slate-200">{p.title}</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {p.status}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">{p.tasks}</p>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Completion</span>
                <span>{p.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-[#00E5FF] rounded-full transition-all duration-500" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {p.tags.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-300 rounded">
                  {t}
                </span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};
