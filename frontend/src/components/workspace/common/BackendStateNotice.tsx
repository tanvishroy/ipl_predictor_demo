import React from 'react';
import { Server, Wifi, AlertTriangle } from 'lucide-react';
import { BackendConnectionStatus } from '../../../types';

interface BackendStateNoticeProps {
  moduleName: string;
  status?: BackendConnectionStatus;
  targetService?: string;
}

export const BackendStateNotice: React.FC<BackendStateNoticeProps> = ({
  moduleName,
  status = 'Awaiting Backend',
  targetService = 'Java Spring Boot Microservice',
}) => {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/25 backdrop-blur-md mb-4 text-xs font-mono">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Server className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-200">{moduleName}</span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {status}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Frontend contract ready. Connects to {targetService} via REST / WebSockets.
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-2 text-amber-400/80 text-[11px]">
        <Wifi className="w-3.5 h-3.5 animate-pulse" />
        <span>Contract Standby</span>
      </div>
    </div>
  );
};
