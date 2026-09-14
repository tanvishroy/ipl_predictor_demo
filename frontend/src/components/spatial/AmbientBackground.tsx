import React from 'react';
import { useCompanion } from '../../context/CompanionContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AmbientBackground: React.FC = () => {
  const { companionState } = useCompanion();
  const { reducedMotion } = useAccessibility();

  // Dynamic ambient light tint based on state
  const getLightingStyle = () => {
    switch (companionState) {
      case 'LISTENING':
        return 'from-[#00E5FF]/15 via-[#05070D] to-[#090F1C]';
      case 'THINKING':
        return 'from-[#6DF6FF]/15 via-[#05070D] to-[#101828]';
      case 'SPEAKING':
        return 'from-[#0099FF]/20 via-[#05070D] to-[#090F1C]';
      case 'RESEARCH':
        return 'from-[#A855F7]/15 via-[#05070D] to-[#090F1C]';
      case 'SLEEP':
        return 'from-[#090F1C] via-[#05070D] to-[#05070D]';
      default: // IDLE
        return 'from-[#0099FF]/10 via-[#05070D] to-[#090F1C]';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070D]">
      {/* Dynamic Ambient Mesh Gradient */}
      <div 
        className={`absolute inset-0 bg-radial-gradient ${getLightingStyle()} transition-all duration-1000 opacity-80`} 
      />

      {/* Volumetric Floating Light Orbs */}
      <div 
        className={`absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[140px] ${
          reducedMotion ? '' : 'animate-pulse-slow'
        }`} 
      />
      <div 
        className={`absolute -bottom-40 right-1/4 w-[700px] h-[700px] bg-[#0099FF]/10 rounded-full blur-[160px] ${
          reducedMotion ? '' : 'animate-float'
        }`} 
      />

      {/* Grid Pattern with subtle opacity */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 229, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
