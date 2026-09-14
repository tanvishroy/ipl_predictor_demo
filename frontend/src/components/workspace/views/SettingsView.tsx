import React, { useState } from 'react';
import { Settings, Volume2, Eye, Sun, Plug, Server, CheckCircle2, RefreshCw } from 'lucide-react';
import { GlassPanel } from '../../spatial/GlassPanel';
import { useCompanion } from '../../../context/CompanionContext';
import { useAccessibility } from '../../../context/AccessibilityContext';
import { PluginService } from '../../../services/ServiceLayer';
import { SoundEngine } from '../../../audio/SoundEngine';

export const SettingsView: React.FC = () => {
  const { isMuted, toggleMute } = useCompanion();
  const { reducedMotion, setReducedMotion, highContrast, setHighContrast } = useAccessibility();
  const [plugins, setPlugins] = useState(PluginService.getPlugins());

  const handleTogglePlugin = async (id: string) => {
    SoundEngine.playHoverChirp();
    await PluginService.togglePlugin(id);
    setPlugins([...PluginService.getPlugins()]);
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-6 overflow-y-auto custom-scrollbar">
      <div>
        <h2 className="text-lg font-semibold text-slate-100 font-sans">Companion Preferences & Architecture</h2>
        <p className="text-xs text-slate-400 font-mono">Spatial computing options & module integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spatial & Accessibility Settings */}
        <GlassPanel className="p-5 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-200 border-b border-slate-800 pb-2">
            <Eye className="w-4 h-4 text-[#00E5FF]" />
            <span>Spatial & Accessibility Controls</span>
          </div>

          <div className="space-y-3 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="font-semibold block">Reduced Motion Mode</span>
                <span className="text-[11px] text-slate-500 font-sans">Suppresses R3F 3D camera drift & particle animations</span>
              </div>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`px-3 py-1 rounded-lg border text-xs ${
                  reducedMotion ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]' : 'border-slate-700 text-slate-400'
                }`}
              >
                {reducedMotion ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="font-semibold block">High Contrast Glass</span>
                <span className="text-[11px] text-slate-500 font-sans">Increases border contrast & readability</span>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`px-3 py-1 rounded-lg border text-xs ${
                  highContrast ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]' : 'border-slate-700 text-slate-400'
                }`}
              >
                {highContrast ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="font-semibold block">Procedural Web Audio Engine</span>
                <span className="text-[11px] text-slate-500 font-sans">Zero MP3 synthesis for hover, wake & hum</span>
              </div>
              <button
                onClick={toggleMute}
                className={`px-3 py-1 rounded-lg border text-xs ${
                  !isMuted ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]' : 'border-slate-700 text-slate-400'
                }`}
              >
                {!isMuted ? 'ENABLED' : 'MUTED'}
              </button>
            </div>
          </div>
        </GlassPanel>

        {/* Plugin Installation Manager */}
        <GlassPanel className="p-5 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-200 border-b border-slate-800 pb-2">
            <Settings className="w-4 h-4 text-[#00E5FF]" />
            <span>Plugin & Module Framework</span>
          </div>

          <div className="space-y-2.5 custom-scrollbar max-h-72 overflow-y-auto">
            {plugins.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono">
                <div>
                  <span className="font-semibold text-slate-200 block">{p.name} v{p.version}</span>
                  <span className="text-[11px] text-slate-400 font-sans">{p.description}</span>
                </div>
                <button
                  onClick={() => handleTogglePlugin(p.id)}
                  className={`px-3 py-1 rounded-lg border text-xs transition-all ${
                    p.isInstalled 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {p.isInstalled ? 'Installed' : 'Install'}
                </button>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
