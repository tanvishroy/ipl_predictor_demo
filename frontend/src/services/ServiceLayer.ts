import { 
  BackendConnectionStatus, 
  MemoryItem, 
  MemoryCategory, 
  ActivityEvent, 
  PluginItem, 
  TelemetryMetric 
} from '../types';
import { 
  IAssistantService, 
  IResearchService, 
  IBrowserService, 
  IDeveloperService, 
  IMemoryService, 
  ITelemetryService, 
  IPluginService, 
  ITimelineService 
} from './contracts';
import { EventBus } from '../architecture/EventBus';

class AssistantServiceImpl implements IAssistantService {
  private status: BackendConnectionStatus = 'Awaiting Backend';

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    EventBus.publish('BACKEND_STATUS_CHANGED', { service: 'Assistant', status: this.status });
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
    EventBus.publish('BACKEND_STATUS_CHANGED', { service: 'Assistant', status: this.status });
  }

  public async sendMessage(prompt: string): Promise<void> {
    EventBus.publish('TIMELINE_EVENT_ADDED', {
      title: 'Command Received',
      description: prompt,
      type: 'assistant',
    });
  }

  public getGreeting(): string {
    const greetings = [
      'Welcome back.',
      'Good evening.',
      'Ready when you are.',
      'How can I help today?',
      'Nice to see you again.',
      'Standing by for instruction.'
    ];
    // Return greeting based on hour
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning.';
    if (hour >= 12 && hour < 18) return 'Good afternoon.';
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

class ResearchServiceImpl implements IResearchService {
  private status: BackendConnectionStatus = 'Awaiting Backend';

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public async initiateResearch(query: string): Promise<void> {
    EventBus.publish('RESEARCH_STARTED', { query });
    EventBus.publish('TIMELINE_EVENT_ADDED', {
      title: 'Research Requested',
      description: query,
      type: 'system',
    });
  }

  public getResearchProgress() {
    return {
      status: this.status,
      sourcesCount: 0,
      notesCount: 0,
    };
  }
}

class BrowserServiceImpl implements IBrowserService {
  private status: BackendConnectionStatus = 'Awaiting Backend';

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public getCurrentSession() {
    return {
      url: 'about:blank',
      title: 'Awaiting Spring Boot Playwright Driver',
      status: this.status,
    };
  }

  public getRecentSessions() {
    return [];
  }
}

class DeveloperServiceImpl implements IDeveloperService {
  private status: BackendConnectionStatus = 'Awaiting Backend';

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public getExecutionStatus() {
    return {
      status: this.status,
      currentTask: undefined,
      logsCount: 0,
    };
  }

  public getProjectFiles() {
    return [
      { name: 'src', type: 'folder' as const, path: '/src' },
      { name: 'App.tsx', type: 'file' as const, path: '/src/App.tsx' },
      { name: 'main.tsx', type: 'file' as const, path: '/src/main.tsx' },
      { name: 'vite.config.ts', type: 'file' as const, path: '/vite.config.ts' },
    ];
  }
}

class MemoryServiceImpl implements IMemoryService {
  private status: BackendConnectionStatus = 'Awaiting Backend';
  private initialMemories: MemoryItem[] = [
    {
      id: 'mem-1',
      category: 'Preferences',
      title: 'Interface Theme',
      summary: 'Spatial dark theme with HSL cyan accents (#00E5FF) and glassmorphism',
      timestamp: 'Just now',
      tags: ['ui', 'theme', 'spatial'],
    },
    {
      id: 'mem-2',
      category: 'Goals',
      title: 'Java Spring Boot Architecture',
      summary: 'Prepare contract-based frontend ready for WebSocket execution streaming',
      timestamp: '2 hours ago',
      tags: ['backend', 'spring-boot', 'architecture'],
    },
    {
      id: 'mem-3',
      category: 'Skills',
      title: 'Spatial Computing Standards',
      summary: 'Depth layers, dynamic camera rigs, Web Audio synthesis, and responsive R3F canvas',
      timestamp: 'Yesterday',
      tags: ['r3f', 'threejs', 'web-audio'],
    },
    {
      id: 'mem-4',
      category: 'Projects',
      title: 'CRISSY Workspace',
      summary: 'Living AI Companion frontend with 9 adaptive workspaces and EventBus architecture',
      timestamp: '3 days ago',
      tags: ['crissy', 'companion', 'react'],
    },
  ];

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public async getMemories(category?: MemoryCategory): Promise<MemoryItem[]> {
    if (!category) return this.initialMemories;
    return this.initialMemories.filter(m => m.category === category);
  }

  public async addMemory(category: MemoryCategory, title: string, summary: string): Promise<MemoryItem> {
    const item: MemoryItem = {
      id: `mem-${Date.now()}`,
      category,
      title,
      summary,
      timestamp: 'Just now',
      tags: ['user-created'],
    };
    this.initialMemories.unshift(item);
    EventBus.publish('MEMORY_UPDATED', item);
    EventBus.publish('TIMELINE_EVENT_ADDED', {
      title: `Memory Saved (${category})`,
      description: title,
      type: 'memory',
    });
    return item;
  }
}

class TelemetryServiceImpl implements ITelemetryService {
  private status: BackendConnectionStatus = 'Awaiting Backend';

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public getMetrics(): TelemetryMetric[] {
    return [
      { name: 'System CPU', status: this.status, note: 'Requires Java Spring Boot OS Agent' },
      { name: 'GPU Engine', status: this.status, note: 'Awaiting WebGL Context Telemetry Hook' },
      { name: 'RAM Heap', status: this.status, note: 'Native JVM Memory Metrics Pending' },
      { name: 'Network Stream', status: this.status, note: 'WebSocket Connection Awaiting Backend' },
    ];
  }
}

class PluginServiceImpl implements IPluginService {
  private status: BackendConnectionStatus = 'Awaiting Backend';
  private plugins: PluginItem[] = [
    { id: 'p-browser', name: 'Spatial Browser', description: 'Playwright & Selenium automation integration', icon: 'Globe', category: 'Web', isInstalled: true, status: 'Awaiting Backend', version: '1.0.0' },
    { id: 'p-github', name: 'GitHub Integration', description: 'Repository sync, pull requests & code review', icon: 'GitBranch', category: 'Developer', isInstalled: true, status: 'Awaiting Backend', version: '1.0.0' },
    { id: 'p-docker', name: 'Docker Engine', description: 'Container orchestration & build stream logs', icon: 'Box', category: 'DevOps', isInstalled: false, status: 'Awaiting Backend', version: '0.9.0' },
    { id: 'p-aws', name: 'AWS Cloud Core', description: 'Cloud infrastructure management & telemetry', icon: 'Cloud', category: 'Cloud', isInstalled: false, status: 'Awaiting Backend', version: '0.8.5' },
    { id: 'p-vscode', name: 'VS Code Bridge', description: 'Language server protocol sync', icon: 'Code', category: 'IDE', isInstalled: true, status: 'Awaiting Backend', version: '1.2.0' },
    { id: 'p-email', name: 'Email Gateway', description: 'IMAP/SMTP intelligent email triage', icon: 'Mail', category: 'Communication', isInstalled: false, status: 'Awaiting Backend', version: '0.7.0' },
  ];

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public getPlugins(): PluginItem[] {
    return this.plugins;
  }

  public async togglePlugin(pluginId: string): Promise<boolean> {
    const plugin = this.plugins.find(p => p.id === pluginId);
    if (plugin) {
      plugin.isInstalled = !plugin.isInstalled;
      EventBus.publish('PLUGIN_INSTALLED', plugin);
      EventBus.publish('TIMELINE_EVENT_ADDED', {
        title: plugin.isInstalled ? `Plugin Enabled` : `Plugin Disabled`,
        description: plugin.name,
        type: 'plugin',
      });
      return plugin.isInstalled;
    }
    return false;
  }
}

class TimelineServiceImpl implements ITimelineService {
  private status: BackendConnectionStatus = 'Awaiting Backend';
  private events: ActivityEvent[] = [
    { id: 'ev-1', title: 'CRISSY Companion Initialized', description: 'Spatial computing environment online', timestamp: '12:00:00', type: 'system' },
    { id: 'ev-2', title: 'EventBus Pub/Sub Active', description: 'Decoupled component communication online', timestamp: '12:00:01', type: 'system' },
    { id: 'ev-3', title: 'Web Audio Synthesizer Loaded', description: 'Zero MP3 procedural audio engine ready', timestamp: '12:00:02', type: 'assistant' },
    { id: 'ev-4', title: 'Service Layer Contracts Ready', description: 'Awaiting Java Spring Boot Backend', timestamp: '12:00:03', type: 'backend' },
  ];

  constructor() {
    EventBus.subscribe('TIMELINE_EVENT_ADDED', (payload) => {
      if (payload.data) {
        this.logEvent(payload.data.title, payload.data.description, payload.data.type);
      }
    });
  }

  public getBackendStatus(): BackendConnectionStatus {
    return this.status;
  }

  public async connect(): Promise<BackendConnectionStatus> {
    this.status = 'Connecting';
    return this.status;
  }

  public async disconnect(): Promise<void> {
    this.status = 'Disconnected';
  }

  public getEvents(): ActivityEvent[] {
    return this.events;
  }

  public logEvent(title: string, description: string, type: ActivityEvent['type']): void {
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    this.events.unshift({
      id: `ev-${Date.now()}`,
      title,
      description,
      timestamp: timeStr,
      type,
    });
  }
}

// Export Singleton Service Instances
export const AssistantService = new AssistantServiceImpl();
export const ResearchService = new ResearchServiceImpl();
export const BrowserService = new BrowserServiceImpl();
export const DeveloperService = new DeveloperServiceImpl();
export const MemoryService = new MemoryServiceImpl();
export const TelemetryService = new TelemetryServiceImpl();
export const PluginService = new PluginServiceImpl();
export const TimelineService = new TimelineServiceImpl();
