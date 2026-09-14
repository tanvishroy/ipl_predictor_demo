// CRISSY System Type Definitions

export type CompanionState = 'IDLE' | 'WAKE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'RESEARCH' | 'SLEEP';

export type WorkspaceType = 
  | 'conversation'
  | 'research'
  | 'developer'
  | 'browser'
  | 'projects'
  | 'memory'
  | 'automation'
  | 'agents'
  | 'settings';

export type BackendConnectionStatus = 
  | 'Awaiting Backend'
  | 'Connecting'
  | 'Connected'
  | 'Disconnected'
  | 'Error';

export type MemoryCategory = 
  | 'People'
  | 'Projects'
  | 'Skills'
  | 'Goals'
  | 'Documents'
  | 'Tasks'
  | 'Knowledge'
  | 'Preferences'
  | 'Conversations'
  | 'Bookmarks';

export interface MemoryItem {
  id: string;
  category: MemoryCategory;
  title: string;
  summary: string;
  timestamp: string;
  tags: string[];
  metadata?: Record<string, any>;
}

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'system' | 'assistant' | 'workspace' | 'memory' | 'plugin' | 'backend';
  status?: string;
}

export interface PluginItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isInstalled: boolean;
  status: BackendConnectionStatus;
  version: string;
}

export interface TelemetryMetric {
  name: string;
  status: BackendConnectionStatus;
  value?: string | number;
  unit?: string;
  note: string;
}

export type EventType = 
  | 'ASSISTANT_STARTED'
  | 'ASSISTANT_WAKE'
  | 'ASSISTANT_LISTENING'
  | 'ASSISTANT_THINKING'
  | 'ASSISTANT_SPEAKING'
  | 'WORKSPACE_CHANGED'
  | 'RESEARCH_STARTED'
  | 'RESEARCH_FINISHED'
  | 'MEMORY_UPDATED'
  | 'NOTIFICATION_RECEIVED'
  | 'PLUGIN_INSTALLED'
  | 'BACKEND_STATUS_CHANGED'
  | 'TIMELINE_EVENT_ADDED';

export interface AppEventPayload {
  type: EventType;
  data?: any;
  timestamp?: number;
}
