import React, { useState } from 'react';
import { Globe, Shield, RefreshCw, ExternalLink, Play, Layers } from 'lucide-react';
import { BackendStateNotice } from '../common/BackendStateNotice';
import { GlassPanel } from '../../spatial/GlassPanel';
import { BrowserService } from '../../../services/ServiceLayer';
import { SoundEngine } from '../../../audio/SoundEngine';

export const BrowserView: React.FC = () => {
  const session = BrowserService.getCurrentSession();
  const [urlInput, setUrlInput] = useState<string>('https://playwright.dev');

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      {/* Backend Status Notice */}
      <BackendStateNotice 
        moduleName="Spatial Browser Workspace" 
        status={session.status} 
        targetService="Java Spring Boot Playwright / Selenium Driver" 
      />

      {/* URL Placeholder Bar */}
      <GlassPanel className="p-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-slate-500">
            <Globe className="w-4 h-4 text-[#00E5FF]" />
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Target URL for automated headless browser session..."
            className="flex-1 bg-[#05070D]/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
          />
          <button
            onClick={() => SoundEngine.playHoverChirp()}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-mono hover:bg-[#00E5FF]/30 transition-all"
          >
            <Play className="w-3 h-3" />
            <span>Launch Driver</span>
          </button>
        </div>
      </GlassPanel>

      {/* Grid displaying Session Cards & Browser Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {/* Active Session Status */}
        <GlassPanel className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-semibold text-slate-200">Active Driver Session</span>
            <span className="text-[10px] font-mono text-amber-400">{session.status}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-mono">
              <span>Driver Target</span>
              <span className="text-[#00E5FF]">Playwright Chromium</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 font-mono">
              <span>Session ID</span>
              <span className="text-slate-500">Unassigned</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 leading-snug">
              Headless browser viewport will render streamed frames when connected to Java Spring Boot.
            </p>
          </div>
        </GlassPanel>

        {/* Recent Sessions */}
        <GlassPanel className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-semibold text-slate-200">Recent Sessions</span>
            <span className="text-[10px] font-mono text-slate-500">0 Cached</span>
          </div>
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 space-y-2">
            <Layers className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-mono">No Saved Sessions</span>
            <p className="text-[11px] text-slate-600 max-w-xs">
              Automated DOM snapshot history will accumulate here.
            </p>
          </div>
        </GlassPanel>

        {/* Browser Capabilities */}
        <GlassPanel className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-semibold text-slate-200">Automation Features</span>
            <span className="text-[10px] font-mono text-emerald-400">Ready</span>
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2 rounded bg-slate-900/40 border border-slate-800 flex items-center justify-between">
              <span>DOM Scraper</span>
              <span className="text-slate-500">Contract Ready</span>
            </div>
            <div className="p-2 rounded bg-slate-900/40 border border-slate-800 flex items-center justify-between">
              <span>Form Filler</span>
              <span className="text-slate-500">Contract Ready</span>
            </div>
            <div className="p-2 rounded bg-slate-900/40 border border-slate-800 flex items-center justify-between">
              <span>Screenshot Stream</span>
              <span className="text-slate-500">Contract Ready</span>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
