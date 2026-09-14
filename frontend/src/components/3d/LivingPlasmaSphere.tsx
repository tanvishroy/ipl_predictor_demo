import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCompanion } from '../../context/CompanionContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LivingPlasmaSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { companionState } = useCompanion();
  const { reducedMotion } = useAccessibility();

  // Target emissive color based on state
  const getColor = () => {
    switch (companionState) {
      case 'LISTENING':
        return new THREE.Color('#00E5FF'); // Bright Cyan
      case 'THINKING':
        return new THREE.Color('#6DF6FF'); // White Blue
      case 'SPEAKING':
        return new THREE.Color('#0099FF'); // Secondary Blue
      case 'RESEARCH':
        return new THREE.Color('#A855F7'); // Purple
      case 'SLEEP':
        return new THREE.Color('#090F1C'); // Dark Navy
      default:
        return new THREE.Color('#0099FF'); // Soft Blue
    }
  };

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!reducedMotion) {
      // Rotation
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;

      // Pulse size based on time
      const time = state.clock.getElapsedTime();
      let scale = 1 + Math.sin(time * 2) * 0.04;
      if (companionState === 'SPEAKING') {
        scale = 1 + Math.sin(time * 8) * 0.08;
      } else if (companionState === 'LISTENING') {
        scale = 1.1 + Math.sin(time * 4) * 0.05;
      }
      meshRef.current.scale.set(scale, scale, scale);

      if (glowRef.current) {
        const glowScale = scale * 1.25;
        glowRef.current.scale.set(glowScale, glowScale, glowScale);
      }
    }

    // Smooth color interpolation
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      mat.emissive.lerp(getColor(), 0.05);
      mat.color.lerp(getColor(), 0.05);
    }
  });

  return (
    <group>
      {/* Inner Plasma Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 32]} />
        <meshStandardMaterial
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          emissive={getColor()}
          emissiveIntensity={1.8}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Volumetric Glow Layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color={getColor()}
          transparent={true}
          opacity={0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
