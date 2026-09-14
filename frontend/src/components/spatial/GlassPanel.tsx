import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 229, 255, 0.15)',
  onClick,
}) => {
  const { highContrast } = useAccessibility();

  return (
    <div
      onClick={onClick}
      style={{
        boxShadow: highContrast 
          ? '0 0 0 1.5px rgba(0, 229, 255, 0.6), 0 8px 32px rgba(0, 0, 0, 0.8)'
          : `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px ${glowColor}`,
      }}
      className={`
        relative backdrop-blur-xl bg-[#090F1C]/70 
        border border-[#00E5FF]/20 rounded-2xl 
        transition-all duration-300 overflow-hidden
        hover:border-[#00E5FF]/40 hover:bg-[#090F1C]/80
        ${className}
      `}
    >
      {/* Soft inner ambient highlight gradient */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
