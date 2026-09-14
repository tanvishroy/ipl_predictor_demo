import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompanion } from '../../context/CompanionContext';
import { CrissyCoreCanvas } from '../3d/CrissyCoreCanvas';

import { ConversationView } from './views/ConversationView';
import { ResearchView } from './views/ResearchView';
import { DeveloperView } from './views/DeveloperView';
import { BrowserView } from './views/BrowserView';
import { ProjectsView } from './views/ProjectsView';
import { MemoryView } from './views/MemoryView';
import { AutomationView } from './views/AutomationView';
import { AgentsView } from './views/AgentsView';
import { SettingsView } from './views/SettingsView';

export const WorkspaceContainer: React.FC = () => {
  const { activeWorkspace } = useCompanion();

  const renderView = () => {
    switch (activeWorkspace) {
      case 'conversation': return <ConversationView />;
      case 'research': return <ResearchView />;
      case 'developer': return <DeveloperView />;
      case 'browser': return <BrowserView />;
      case 'projects': return <ProjectsView />;
      case 'memory': return <MemoryView />;
      case 'automation': return <AutomationView />;
      case 'agents': return <AgentsView />;
      case 'settings': return <SettingsView />;
      default: return <ConversationView />;
    }
  };

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Floating 3D CRISSY Core background canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-90">
        <CrissyCoreCanvas className="w-full h-full max-w-2xl max-h-[500px]" />
      </div>

      {/* Adaptive Workspace View Container */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorkspace}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
