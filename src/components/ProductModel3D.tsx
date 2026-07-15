import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Disc proportions match real product specs: diameter 100mm, thickness 8mm (ratio ~12.5:1)
const RADIUS   = 1.6;
const THICKNESS = 0.13;
const SEGMENTS  = 128;

const Disc = () => {
  const meshRef  = useRef<THREE.Mesh>(null);
  const ringRef  = useRef<THREE.Mesh>(null);
  const texture  = useTexture('/kikAI_angle_1.png');

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    // Full 360° cursor tracking on both axes — smooth lerp so it feels weighted
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * Math.PI,   // -180° to +180° on X axis of mouse
      0.06
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -pointer.y * Math.PI,  // -180° to +180° on Y axis of mouse
      0.06
    );
    // Ring tilts with the disc, counter-spins slightly for depth
    if (ringRef.current) {
      ringRef.current.rotation.x = meshRef.current.rotation.x * 0.5;
      ringRef.current.rotation.y = -meshRef.current.rotation.y * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      {/* Main disc */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[RADIUS, RADIUS, THICKNESS, SEGMENTS]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>

      {/* Glowing orange halo ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS + 0.12, 0.015, 8, 128]} />
        <meshStandardMaterial
          color="#FF5C00"
          emissive="#FF5C00"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

export const ProductModel3D = () => (
  <Canvas
    camera={{ position: [0, 1.2, 4.5], fov: 45 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: true }}
  >
    <ambientLight intensity={0.15} />
    <pointLight position={[4, 4, 4]}  intensity={2.5} color="#FF5C00" />
    <pointLight position={[-3, 2, 3]} intensity={1}   color="#FCFBF7" />
    <spotLight  position={[0, 6, 2]}  intensity={1.5} angle={0.4} penumbra={0.8} castShadow={false} />
    <Suspense fallback={null}>
      <Environment preset="city" />
      <Disc />
    </Suspense>
  </Canvas>
);
