import React, { useState } from 'react';
import { Search, Globe, FileText, Bookmark, Layers, AlertCircle } from 'lucide-react';
import { BackendStateNotice } from '../common/BackendStateNotice';
import { GlassPanel } from '../../spatial/GlassPanel';
import { ResearchService } from '../../../services/ServiceLayer';
import { SoundEngine } from '../../../audio/SoundEngine';

export const ResearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const status = ResearchService.getBackendStatus();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    SoundEngine.playHoverChirp();
    ResearchService.initiateResearch(searchQuery.trim());
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      {/* Backend Status Notice */}
      <BackendStateNotice 
        moduleName="Research Workspace" 
        status={status} 
        targetService="Java Spring Boot Research Agent Engine" 
      />

      {/* Query Bar */}
      <GlassPanel className="p-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#00E5FF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter research topic for backend agent extraction..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-mono hover:bg-[#00E5FF]/30 transition-all"
          >
            Initiate Research
          </button>
        </form>
      </GlassPanel>

      {/* Structured Panels Grid (Search Progress, Sources, Citations, Summary Cards, Notes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {/* Sources & Citations Panel */}
        <GlassPanel className="p-4 space-y-3">
          <div className="flex items-center space-x-2 text-slate-200 text-xs font-mono border-b border-slate-800 pb-2">
            <Globe className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-semibold">Sources & Citations</span>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-2">
            <AlertCircle className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-mono">No Sources Loaded</span>
            <p className="text-[11px] text-slate-600 max-w-xs">
              Awaiting Java backend research crawler integration.
            </p>
          </div>
        </GlassPanel>

        {/* Summary Cards Panel */}
        <GlassPanel className="p-4 space-y-3">
          <div className="flex items-center space-x-2 text-slate-200 text-xs font-mono border-b border-slate-800 pb-2">
            <FileText className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-semibold">Synthesized Summaries</span>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-2">
            <Layers className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-mono">Awaiting Backend Stream</span>
            <p className="text-[11px] text-slate-600 max-w-xs">
              Autonomous research summary stream will render here once connected.
            </p>
          </div>
        </GlassPanel>

        {/* Notes & Highlights Panel */}
        <GlassPanel className="p-4 space-y-3">
          <div className="flex items-center space-x-2 text-slate-200 text-xs font-mono border-b border-slate-800 pb-2">
            <Bookmark className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-semibold">Notes & Key Findings</span>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-2">
            <Bookmark className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-mono">Notes Empty</span>
            <p className="text-[11px] text-slate-600 max-w-xs">
              Key findings saved by CRISSY agents will populate here.
            </p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
