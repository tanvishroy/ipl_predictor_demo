import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCompanion } from '../../context/CompanionContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const { companionState } = useCompanion();
  const { reducedMotion } = useAccessibility();
  const mousePos = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 0.5,
        y: (e.clientY / window.innerHeight - 0.5) * 0.5,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useFrame((state, delta) => {
    if (reducedMotion) {
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      return;
    }

    const time = state.clock.getElapsedTime();
    let targetZ = 7;
    let targetX = mousePos.current.x;
    let targetY = -mousePos.current.y;

    if (companionState === 'LISTENING') {
      targetZ = 5.2; // Zoom in
    } else if (companionState === 'THINKING') {
      targetZ = 6.2;
      targetX += Math.sin(time * 1.5) * 0.8;
      targetY += Math.cos(time * 1.5) * 0.4;
    } else if (companionState === 'SPEAKING') {
      targetZ = 6.5 + Math.sin(time * 4) * 0.15; // Gentle pulse breathing
    } else {
      // Idle slow drift
      targetX += Math.sin(time * 0.5) * 0.2;
      targetY += Math.cos(time * 0.4) * 0.15;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3);

    camera.lookAt(0, 0, 0);
  });

  return null;
};
