import React from 'react';
import { 
  MessageSquare, 
  Search, 
  Code, 
  Globe, 
  FolderKanban, 
  Brain, 
  Workflow, 
  Cpu, 
  Settings,
  Plus
} from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { WorkspaceType } from '../../types';
import { PluginService } from '../../services/ServiceLayer';
import { SoundEngine } from '../../audio/SoundEngine';

interface NavItem {
  id: WorkspaceType;
  label: string;
  icon: React.ElementType;
}

export const LeftNavigation: React.FC = () => {
  const { activeWorkspace, setActiveWorkspace } = useCompanion();
  const plugins = PluginService.getPlugins();

  const coreItems: NavItem[] = [
    { id: 'conversation', label: 'Conversation', icon: MessageSquare },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'developer', label: 'Developer', icon: Code },
    { id: 'browser', label: 'Browser', icon: Globe },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'memory', label: 'Memory', icon: Brain },
    { id: 'automation', label: 'Automation', icon: Workflow },
    { id: 'agents', label: 'Agents', icon: Cpu },
  ];

  return (
    <aside className="relative z-20 flex flex-col items-center justify-between w-16 md:w-20 py-4 border-r border-[#00E5FF]/10 backdrop-blur-xl bg-[#05070D]/60">
      {/* Navigation List */}
      <div className="flex flex-col items-center space-y-3 w-full px-2">
        {coreItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeWorkspace === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                SoundEngine.playHoverChirp();
                setActiveWorkspace(item.id);
              }}
              title={item.label}
              className={`
                relative group flex flex-col items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#090F1C]/80 hover:border hover:border-slate-800'
                }
              `}
            >
              <Icon className="w-5 h-5" />

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute -left-2 w-1.5 h-6 bg-[#00E5FF] rounded-r-full shadow-[0_0_8px_#00E5FF]" />
              )}

              {/* Tooltip */}
              <span className="absolute left-16 z-50 hidden group-hover:block px-2.5 py-1 text-xs font-medium text-slate-100 bg-[#090F1C] border border-[#00E5FF]/30 rounded-lg shadow-xl whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Installed Plugins Section & Settings */}
      <div className="flex flex-col items-center space-y-3 w-full px-2 pt-4 border-t border-[#00E5FF]/10">
        {/* Installed Plugin indicator dot */}
        {plugins.filter(p => p.isInstalled).map((plugin) => (
          <button
            key={plugin.id}
            onClick={() => {
              SoundEngine.playHoverChirp();
              setActiveWorkspace('settings');
            }}
            title={`Plugin: ${plugin.name}`}
            className="group relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]/80 group-hover:scale-125 transition-transform" />
            <span className="absolute left-16 z-50 hidden group-hover:block px-2.5 py-1 text-xs font-medium text-slate-100 bg-[#090F1C] border border-[#00E5FF]/30 rounded-lg shadow-xl whitespace-nowrap">
              {plugin.name} (Plugin)
            </span>
          </button>
        ))}

        {/* Add Plugin Button */}
        <button
          onClick={() => {
            SoundEngine.playHoverChirp();
            setActiveWorkspace('settings');
          }}
          title="Install Plugins"
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-dashed border-slate-700 text-slate-500 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Settings button */}
        <button
          onClick={() => {
            SoundEngine.playHoverChirp();
            setActiveWorkspace('settings');
          }}
          title="Settings"
          className={`
            relative group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300
            ${
              activeWorkspace === 'settings'
                ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#090F1C]/80 hover:border hover:border-slate-800'
            }
          `}
        >
          <Settings className="w-5 h-5" />
          <span className="absolute left-16 z-50 hidden group-hover:block px-2.5 py-1 text-xs font-medium text-slate-100 bg-[#090F1C] border border-[#00E5FF]/30 rounded-lg shadow-xl whitespace-nowrap">
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
};
