import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanionState, WorkspaceType } from '../types';
import { SoundEngine } from '../audio/SoundEngine';
import { EventBus } from '../architecture/EventBus';
import { AssistantService } from '../services/ServiceLayer';

interface CompanionContextType {
  companionState: CompanionState;
  setCompanionState: (state: CompanionState) => void;
  activeWorkspace: WorkspaceType;
  setActiveWorkspace: (ws: WorkspaceType) => void;
  isMuted: boolean;
  toggleMute: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  startupFinished: boolean;
  completeStartup: () => void;
  greeting: string;
  triggerWake: () => void;
  triggerListen: () => void;
  triggerThink: (customMessage?: string) => void;
  triggerSpeak: (text?: string) => void;
  thinkingMessage: string;
}

const CompanionContext = createContext<CompanionContextType | undefined>(undefined);

export const CompanionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companionState, setCompanionStateInternal] = useState<CompanionState>('IDLE');
  const [activeWorkspace, setActiveWorkspaceInternal] = useState<WorkspaceType>('conversation');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [startupFinished, setStartupFinished] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>('Good evening.');
  const [thinkingMessage, setThinkingMessage] = useState<string>('Thinking...');

  useEffect(() => {
    setGreeting(AssistantService.getGreeting());
  }, []);

  const setCompanionState = (state: CompanionState) => {
    setCompanionStateInternal(state);
    if (state === 'WAKE') {
      SoundEngine.playWakePulse();
      EventBus.publish('ASSISTANT_WAKE');
    } else if (state === 'THINKING') {
      SoundEngine.startThinkingHum();
      EventBus.publish('ASSISTANT_THINKING');
    } else {
      SoundEngine.stopThinkingHum();
    }
  };

  const setActiveWorkspace = (ws: WorkspaceType) => {
    setActiveWorkspaceInternal(ws);
    SoundEngine.playHoverChirp();
    EventBus.publish('WORKSPACE_CHANGED', { workspace: ws });
    EventBus.publish('TIMELINE_EVENT_ADDED', {
      title: 'Workspace Changed',
      description: `Switched to ${ws.charAt(0).toUpperCase() + ws.slice(1)} Workspace`,
      type: 'workspace',
    });
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    SoundEngine.setMuted(nextMuted);
  };

  const completeStartup = () => {
    setStartupFinished(true);
    SoundEngine.playNotificationPing();
    EventBus.publish('ASSISTANT_STARTED');
  };

  const triggerWake = () => {
    setCompanionState('WAKE');
    setTimeout(() => {
      setCompanionState('LISTENING');
    }, 800);
  };

  const triggerListen = () => {
    setCompanionState('LISTENING');
  };

  const triggerThink = (customMessage?: string) => {
    const messages = [
      'Thinking...',
      'Searching...',
      'Planning...',
      'Analyzing...',
      'Reading...',
      'Preparing response...'
    ];
    setThinkingMessage(customMessage || messages[Math.floor(Math.random() * messages.length)]);
    setCompanionState('THINKING');
  };

  const triggerSpeak = (text?: string) => {
    setCompanionState('SPEAKING');
    SoundEngine.playSpeakingPulse();

    // Rhythmic audio pulse simulation
    let ticks = 0;
    const interval = setInterval(() => {
      SoundEngine.playSpeakingPulse();
      ticks++;
      if (ticks > 12) {
        clearInterval(interval);
        setCompanionState('IDLE');
      }
    }, 180);
  };

  return (
    <CompanionContext.Provider
      value={{
        companionState,
        setCompanionState,
        activeWorkspace,
        setActiveWorkspace,
        isMuted,
        toggleMute,
        commandPaletteOpen,
        setCommandPaletteOpen,
        startupFinished,
        completeStartup,
        greeting,
        triggerWake,
        triggerListen,
        triggerThink,
        triggerSpeak,
        thinkingMessage,
      }}
    >
      {children}
    </CompanionContext.Provider>
  );
};

export const useCompanion = () => {
  const context = useContext(CompanionContext);
  if (!context) {
    throw new Error('useCompanion must be used within CompanionProvider');
  }
  return context;
};
