import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { LivingPlasmaSphere } from './LivingPlasmaSphere';
import { HolographicRings } from './HolographicRings';
import { ParticleHalo } from './ParticleHalo';
import { CameraRig } from './CameraRig';

export const CrissyCoreCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full min-h-[320px] pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0099FF" />

        <Suspense fallback={null}>
          <LivingPlasmaSphere />
          <HolographicRings />
          <ParticleHalo count={250} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
};
