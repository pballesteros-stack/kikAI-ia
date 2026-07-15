import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const RADIUS    = 2.2;
const THICKNESS = 0.18;

const Disc = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/kikAI_hero.png');

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    // Cinematic auto-spin with organic tilt — no mouse tracking here
    meshRef.current.rotation.y = t * 0.25;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.4 - 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.05;
    if (ringRef.current) {
      ringRef.current.rotation.x = meshRef.current.rotation.x;
      ringRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <>
      {/* Main disc using the hero image as texture */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[RADIUS, RADIUS, THICKNESS, 128]} />
        <meshStandardMaterial map={texture} metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Glowing orange halo ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS + 0.15, 0.02, 8, 128]} />
        <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
    </>
  );
};

export const HeroDisc = () => (
  <Canvas
    camera={{ position: [0, 1.5, 6], fov: 50 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: true }}
  >
    <ambientLight intensity={0.1} />
    <pointLight position={[5, 5, 5]}  intensity={3}   color="#FF5C00" />
    <pointLight position={[-4, 2, 2]} intensity={0.8} color="#FCFBF7" />
    <Suspense fallback={null}>
      <Environment preset="night" />
      <Disc />
    </Suspense>
    <EffectComposer>
      <Bloom luminanceThreshold={0.1} intensity={1.2} mipmapBlur />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.002, 0.002)}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  </Canvas>
);
