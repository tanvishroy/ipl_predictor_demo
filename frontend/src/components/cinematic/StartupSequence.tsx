import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, FastForward } from 'lucide-react';
import { useCompanion } from '../../context/CompanionContext';
import { SoundEngine } from '../../audio/SoundEngine';

export const StartupSequence: React.FC = () => {
  const { startupFinished, completeStartup, greeting } = useCompanion();
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    if (startupFinished) return;

    // Timeline phases (total ~4s)
    const t1 = setTimeout(() => setPhase(1), 800);   // Stars & particles gather
    const t2 = setTimeout(() => setPhase(2), 1800);  // Core ignition & energy rings
    const t3 = setTimeout(() => setPhase(3), 2800);  // Glow expansion & greeting display
    const t4 = setTimeout(() => {
      completeStartup();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [startupFinished, completeStartup]);

  if (startupFinished) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070D] text-slate-100 overflow-hidden select-none"
      >
        {/* Skip button */}
        <button
          onClick={() => {
            SoundEngine.playHoverChirp();
            completeStartup();
          }}
          className="absolute top-6 right-6 z-50 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
        >
          <span>Skip Initialization</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>

        {/* Cinematic Visual Stage */}
        <div className="relative flex items-center justify-center w-72 h-72">
          {/* Phase 1: Particles gather */}
          {phase >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 rounded-full border border-[#00E5FF]/30 blur-sm"
            />
          )}

          {/* Phase 2: Core Ignition & Energy Rings */}
          {phase >= 2 && (
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative flex items-center justify-center w-28 h-28 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] shadow-[0_0_50px_#00E5FF]"
            >
              <Sparkles className="w-12 h-12 text-[#00E5FF] animate-pulse" />
            </motion.div>
          )}

          {/* Phase 3: Glow Expansion */}
          {phase >= 3 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 rounded-full bg-radial-gradient from-[#00E5FF] to-transparent blur-2xl pointer-events-none"
            />
          )}
        </div>

        {/* Greeting Display Text */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2 mt-8 z-10"
          >
            <h1 className="text-3xl font-light tracking-wider font-sans text-slate-100">
              CRISSY
            </h1>
            <p className="text-sm font-mono text-[#00E5FF]">
              {greeting} How can I help you today?
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
