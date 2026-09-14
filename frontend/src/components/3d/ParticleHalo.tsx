import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCompanion } from '../../context/CompanionContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ParticleHalo: React.FC<{ count?: number }> = ({ count = 300 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { companionState } = useCompanion();
  const { reducedMotion } = useAccessibility();

  // Create initial random particle positions & velocities
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;
    }
    return [pos, initPos];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ix = initialPositions[idx];
      const iy = initialPositions[idx + 1];
      const iz = initialPositions[idx + 2];

      if (companionState === 'LISTENING') {
        // Tight orbital convergence
        const angle = time * 2 + i;
        const r = 2.4;
        posArr[idx] = Math.cos(angle) * r;
        posArr[idx + 1] = iy * 0.5 + Math.sin(time * 3 + i) * 0.2;
        posArr[idx + 2] = Math.sin(angle) * r;
      } else if (companionState === 'THINKING') {
        // Inward swirl
        const factor = (Math.sin(time * 4 + i) + 1) * 0.5;
        posArr[idx] = ix * (0.4 + factor * 0.6);
        posArr[idx + 1] = iy * (0.4 + factor * 0.6);
        posArr[idx + 2] = iz * (0.4 + factor * 0.6);
      } else if (companionState === 'SPEAKING') {
        // Outward pulses
        const pulse = Math.sin(time * 6 + i * 0.1) * 0.8;
        posArr[idx] = ix * (1 + pulse * 0.2);
        posArr[idx + 1] = iy * (1 + pulse * 0.2);
        posArr[idx + 2] = iz * (1 + pulse * 0.2);
      } else {
        // Idle gentle float
        posArr[idx] = ix + Math.sin(time + i) * 0.15;
        posArr[idx + 1] = iy + Math.cos(time + i * 0.5) * 0.15;
        posArr[idx + 2] = iz + Math.sin(time * 0.5 + i) * 0.15;
      }
    }

    geo.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00E5FF"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
