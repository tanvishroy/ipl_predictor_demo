import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCompanion } from '../../context/CompanionContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const HolographicRings: React.FC = () => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const { companionState } = useCompanion();
  const { reducedMotion } = useAccessibility();

  useFrame((_, delta) => {
    if (reducedMotion) return;

    let speedMultiplier = 1;
    if (companionState === 'THINKING') speedMultiplier = 2.5;
    if (companionState === 'LISTENING') speedMultiplier = 1.8;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3 * speedMultiplier;
      ring1Ref.current.rotation.y += delta * 0.5 * speedMultiplier;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.4 * speedMultiplier;
      ring2Ref.current.rotation.z += delta * 0.3 * speedMultiplier;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= delta * 0.5 * speedMultiplier;
      ring3Ref.current.rotation.x -= delta * 0.2 * speedMultiplier;
    }
  });

  return (
    <group>
      {/* Outer Ring 1 */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
        </mesh>
        {/* Satellites / Energy Petals */}
        <mesh position={[2.2, 0, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#6DF6FF" />
        </mesh>
        <mesh position={[-2.2, 0, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#6DF6FF" />
        </mesh>
      </group>

      {/* Middle Ring 2 */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.7, 0.012, 16, 100]} />
          <meshBasicMaterial color="#0099FF" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      </group>

      {/* Outer Ring 3 */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#6DF6FF" transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  );
};
