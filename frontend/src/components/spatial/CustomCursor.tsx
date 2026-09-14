import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check hover targets
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
         target.tagName === 'A' ||
         target.getAttribute('role') === 'button' ||
         target.classList.contains('interactive-hover'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Glow aura */}
      <motion.div
        className="absolute rounded-full bg-[#00E5FF]/20 blur-md pointer-events-none"
        animate={{
          x: pos.x - (isHovered ? 24 : 12),
          y: pos.y - (isHovered ? 24 : 12),
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          scale: isClicked ? 0.7 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.1 }}
      />

      {/* Core cursor ring */}
      <motion.div
        className="absolute rounded-full border border-[#00E5FF]/80 backdrop-blur-xs pointer-events-none"
        animate={{
          x: pos.x - (isHovered ? 16 : 6),
          y: pos.y - (isHovered ? 16 : 6),
          width: isHovered ? 32 : 12,
          height: isHovered ? 32 : 12,
          borderColor: isHovered ? '#6DF6FF' : 'rgba(0, 229, 255, 0.8)',
          backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.05 }}
      />
    </div>
  );
};
