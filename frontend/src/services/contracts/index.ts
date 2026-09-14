import { 
  BackendConnectionStatus, 
  MemoryItem, 
  MemoryCategory, 
  ActivityEvent, 
  PluginItem, 
  TelemetryMetric 
} from '../../types';

export interface IBaseService {
  getBackendStatus(): BackendConnectionStatus;
  connect(): Promise<BackendConnectionStatus>;
  disconnect(): Promise<void>;
}

export interface IAssistantService extends IBaseService {
  sendMessage(prompt: string): Promise<void>;
  getGreeting(): string;
}

export interface IResearchService extends IBaseService {
  initiateResearch(query: string): Promise<void>;
  getResearchProgress(): { status: BackendConnectionStatus; sourcesCount: number; notesCount: number };
}

export interface IBrowserService extends IBaseService {
  getCurrentSession(): { url: string; title: string; status: BackendConnectionStatus };
  getRecentSessions(): Array<{ id: string; url: string; timestamp: string }>;
}

export interface IDeveloperService extends IBaseService {
  getExecutionStatus(): { status: BackendConnectionStatus; currentTask?: string; logsCount: number };
  getProjectFiles(): Array<{ name: string; type: 'file' | 'folder'; path: string }>;
}

export interface IMemoryService extends IBaseService {
  getMemories(category?: MemoryCategory): Promise<MemoryItem[]>;
  addMemory(category: MemoryCategory, title: string, summary: string): Promise<MemoryItem>;
}

export interface ITelemetryService extends IBaseService {
  getMetrics(): TelemetryMetric[];
}

export interface IPluginService extends IBaseService {
  getPlugins(): PluginItem[];
  togglePlugin(pluginId: string): Promise<boolean>;
}

export interface ITimelineService extends IBaseService {
  getEvents(): ActivityEvent[];
  logEvent(title: string, description: string, type: ActivityEvent['type']): void;
}
