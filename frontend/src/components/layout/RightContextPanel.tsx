import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Brain, 
  Activity, 
  Cpu, 
  Clock, 
  Radio, 
  Layers 
} from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { MemoryService, TelemetryService, TimelineService } from '../../services/ServiceLayer';
import { MemoryItem, ActivityEvent, TelemetryMetric } from '../../types';
import { EventBus } from '../../architecture/EventBus';

export const RightContextPanel: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'memory' | 'telemetry'>('timeline');
  const { companionState } = useCompanion();
  
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [metrics, setMetrics] = useState<TelemetryMetric[]>([]);

  useEffect(() => {
    // Load initial values
    MemoryService.getMemories().then(setMemories);
    setEvents(TimelineService.getEvents());
    setMetrics(TelemetryService.getMetrics());

    // Subscribe to EventBus updates
    const unsubMemory = EventBus.subscribe('MEMORY_UPDATED', () => {
      MemoryService.getMemories().then(setMemories);
    });

    const unsubTimeline = EventBus.subscribe('TIMELINE_EVENT_ADDED', () => {
      setEvents([...TimelineService.getEvents()]);
    });

    return () => {
      unsubMemory();
      unsubTimeline();
    };
  }, []);

  return (
    <aside
      className={`
        relative z-20 flex flex-col border-l border-[#00E5FF]/10 backdrop-blur-xl bg-[#05070D]/70 transition-all duration-300
        ${collapsed ? 'w-12' : 'w-72 md:w-80'}
      `}
    >
      {/* Collapse / Expand Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-3 top-6 z-30 flex items-center justify-center w-6 h-6 rounded-full bg-[#090F1C] border border-[#00E5FF]/30 text-slate-400 hover:text-[#00E5FF] transition-colors"
      >
        {collapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      {collapsed ? (
        <div className="flex flex-col items-center py-6 space-y-6 text-slate-400">
          <Activity className="w-5 h-5 text-[#00E5FF]" />
          <Brain className="w-5 h-5" />
          <Cpu className="w-5 h-5" />
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-hidden p-4 space-y-4">
          {/* Header & Tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-[#00E5FF]/10">
            <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase font-mono">
              Spatial Context
            </span>
            <div className="flex space-x-1 bg-[#090F1C] p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  activeTab === 'timeline' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'text-slate-400'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  activeTab === 'memory' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'text-slate-400'
                }`}
              >
                Memory
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                  activeTab === 'telemetry' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'text-slate-400'
                }`}
              >
                Sensors
              </button>
            </div>
          </div>

          {/* Active Companion Status Card */}
          <div className="p-3 rounded-xl bg-[#090F1C]/80 border border-[#00E5FF]/20 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-mono mb-1">
              <span className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
                <span>Companion State</span>
              </span>
              <span className="text-[#00E5FF] font-semibold">{companionState}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Living plasma core active. Ambient lighting synchronized.
            </p>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {activeTab === 'timeline' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">CHRONOLOGICAL EVENTS</span>
                {events.map((ev) => (
                  <div key={ev.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-300 font-mono">
                      <span className="font-semibold text-slate-200">{ev.title}</span>
                      <span className="text-[10px] text-slate-500">{ev.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{ev.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'memory' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">ACTIVE MEMORY STACK</span>
                {memories.map((mem) => (
                  <div key={mem.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{mem.title}</span>
                      <span className="px-1.5 py-0.2 text-[9px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] rounded">
                        {mem.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{mem.summary}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">SYSTEM TELEMETRY</span>
                {metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-300">{m.name}</span>
                      <span className="text-amber-400 text-[10px]">{m.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">{m.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
