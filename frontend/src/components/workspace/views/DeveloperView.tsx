import React, { useState } from 'react';
import { Code2, Folder, Terminal, Play, CheckCircle2, FileCode, Layers } from 'lucide-react';
import { BackendStateNotice } from '../common/BackendStateNotice';
import { GlassPanel } from '../../spatial/GlassPanel';
import { DeveloperService } from '../../../services/ServiceLayer';
import { SoundEngine } from '../../../audio/SoundEngine';

export const DeveloperView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('App.tsx');
  const files = DeveloperService.getProjectFiles();
  const execStatus = DeveloperService.getExecutionStatus();

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
      {/* Backend Status Banner */}
      <BackendStateNotice 
        moduleName="Developer Workspace" 
        status={execStatus.status} 
        targetService="Java Spring Boot Process Execution Stream" 
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
        {/* Project Explorer */}
        <GlassPanel className="p-3 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-200 border-b border-slate-800 pb-2">
            <Folder className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-semibold">Project Explorer</span>
          </div>
          <div className="space-y-1">
            {files.map((f, idx) => (
              <button
                key={idx}
                onClick={() => {
                  SoundEngine.playHoverChirp();
                  if (f.type === 'file') setSelectedFile(f.name);
                }}
                className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedFile === f.name 
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {f.type === 'folder' ? <Folder className="w-3.5 h-3.5 text-amber-400" /> : <FileCode className="w-3.5 h-3.5 text-sky-400" />}
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </GlassPanel>

        {/* Code Editor Layout */}
        <GlassPanel className="md:col-span-3 p-4 flex flex-col justify-between font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center space-x-2 text-slate-200">
              <Code2 className="w-4 h-4 text-[#00E5FF]" />
              <span className="font-semibold">{selectedFile}</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <Play className="w-3 h-3" />
              <span>Execution Stream Standby</span>
            </div>
          </div>

          {/* Readonly Code Placeholder */}
          <div className="flex-1 bg-[#05070D]/80 p-4 rounded-xl border border-slate-800/80 font-mono text-slate-300 leading-relaxed overflow-x-auto">
            <pre>
{`// CRISSY Developer Workspace Contract
// File: ${selectedFile}

export const CompanionBridge = {
  status: "${execStatus.status}",
  target: "WebSocket Log & Execution Engine",
  
  onConnect() {
    console.log("Awaiting Spring Boot process dispatcher...");
  }
};`}
            </pre>
          </div>

          {/* Console Panel & Build Logs Placeholder */}
          <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center justify-between text-slate-300 border-b border-slate-800/60 pb-1">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Console & Build Stream</span>
              </span>
              <span className="text-slate-500">0 Active Processes</span>
            </div>
            <p className="text-slate-500 pt-1">
              [Info] Awaiting WebSocket execution logs from Java Spring Boot runtime environment.
            </p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
