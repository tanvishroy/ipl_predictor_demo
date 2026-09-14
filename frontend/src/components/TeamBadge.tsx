import React from 'react';
import { IPLTeam } from '../types/ipl';

interface TeamBadgeProps {
  team: IPLTeam;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({ 
  team, 
  size = 'md', 
  showGlow = false 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-28 h-28 text-3xl'
  };

  const badgeIcon = getTeamBadgeIcon(team.code);

  return (
    <div 
      className={`relative rounded-full flex items-center justify-center font-bold tracking-wider transition-all duration-300 ${sizeClasses[size]}`}
      style={{
        background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`,
        color: team.textColor,
        boxShadow: showGlow ? `0 0 25px ${team.primaryColor}80` : `0 4px 14px rgba(0,0,0,0.4)`,
        border: `2px solid ${team.primaryColor}80`
      }}
    >
      {/* Inner Ring */}
      <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />
      
      {/* Team Crest Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center drop-shadow-md select-none">
        <span className="font-extrabold uppercase font-heading tracking-widest">{badgeIcon || team.code}</span>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

function getTeamBadgeIcon(code: string): string {
  switch (code) {
    case 'CSK': return 'CSK';
    case 'RCB': return 'RCB';
    case 'MI': return 'MI';
    case 'RR': return 'RR';
    case 'KKR': return 'KKR';
    case 'PBKS': return 'PBKS';
    case 'SRH': return 'SRH';
    case 'DC': return 'DC';
    case 'LSG': return 'LSG';
    case 'GT': return 'GT';
    default: return code;
  }
}
