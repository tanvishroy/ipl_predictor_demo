import React from 'react';
import { Workflow, Play, CheckCircle2, Clock, Zap, ArrowRight } from 'lucide-react';
import { GlassPanel } from '../../spatial/GlassPanel';
import { SoundEngine } from '../../../audio/SoundEngine';

export const AutomationView: React.FC = () => {
  const workflows = [
    { id: 'wf-1', name: 'Morning Knowledge Digest', trigger: 'Scheduled 08:00 AM', status: 'Active', steps: 4 },
    { id: 'wf-2', name: 'GitHub PR Code Review', trigger: 'Webhook Event', status: 'Standby', steps: 6 },
    { id: 'wf-3', name: 'Docker Log Anomaly Detection', trigger: 'Telemetry Spike', status: 'Awaiting Backend', steps: 3 },
  ];

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 font-sans">Automation & Workflows</h2>
          <p className="text-xs text-slate-400 font-mono">Event-driven autonomous task triggers</p>
        </div>
      </div>

      <div className="space-y-3">
        {workflows.map((w) => (
          <GlassPanel key={w.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-slate-200">{w.name}</h3>
                <span className="text-[11px] text-slate-400 font-mono">Trigger: {w.trigger} • {w.steps} Pipeline Steps</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-2.5 py-1 text-[10px] font-mono rounded-full ${
                w.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {w.status}
              </span>
              <button
                onClick={() => SoundEngine.playHoverChirp()}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-[#00E5FF] text-xs font-mono transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Run Trigger</span>
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};
