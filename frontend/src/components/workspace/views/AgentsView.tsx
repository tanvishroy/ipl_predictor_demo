import React from 'react';
import { Cpu, ShieldCheck, Activity, Radio, Sparkles } from 'lucide-react';
import { GlassPanel } from '../../spatial/GlassPanel';

export const AgentsView: React.FC = () => {
  const agents = [
    { id: 'ag-1', name: 'CRISSY Core Orchestrator', role: 'Primary Living Presence', status: 'Active', load: 'Idle (Low)' },
    { id: 'ag-2', name: 'Research Crawler Agent', role: 'Web Search & Synthesis', status: 'Standby', load: 'Awaiting Contract' },
    { id: 'ag-3', name: 'Developer Task Runner', role: 'Process & Build Manager', status: 'Standby', load: 'Awaiting WebSocket' },
    { id: 'ag-4', name: 'Memory Consolidation Agent', role: 'Neural Knowledge Indexer', status: 'Active', load: 'Background Sync' },
  ];

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      <div>
        <h2 className="text-lg font-semibold text-slate-100 font-sans">Autonomous Subagent Constellation</h2>
        <p className="text-xs text-slate-400 font-mono">Multi-agent worker matrix & execution states</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((a) => (
          <GlassPanel key={a.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-[#00E5FF]" />
                <span className="font-semibold text-xs text-slate-200">{a.name}</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                a.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {a.status}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div>Role: <span className="text-slate-200">{a.role}</span></div>
              <div>State: <span className="text-[#00E5FF]">{a.load}</span></div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};
