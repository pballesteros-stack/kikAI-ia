import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 2500;

// Two layers of particles: orange (foreground) + cream (depth)
const LAYERS = [
  { color: '#FF5C00', size: 0.025, opacity: 0.6, spread: [20, 20, 8] },
  { color: '#FCFBF7', size: 0.015, opacity: 0.25, spread: [30, 30, 12] },
] as const;

interface ParticlesProps {
  color: string;
  size: number;
  opacity: number;
  spread: readonly [number, number, number];
  scrollRef: React.MutableRefObject<number>;
  rotationSign: 1 | -1;
}

const Particles = ({ color, size, opacity, spread, scrollRef, rotationSign }: ParticlesProps) => {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * spread[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
    }
    return arr;
  }, [spread]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t   = clock.elapsedTime;
    const s   = scrollRef.current;
    // Slow drift + scroll-driven tilt
    meshRef.current.rotation.y = t * 0.04 * rotationSign + s * Math.PI * 0.4;
    meshRef.current.rotation.x = s * 0.25;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

interface ParticleFieldProps {
  scrollRef: React.MutableRefObject<number>;
}

export const ParticleField = ({ scrollRef }: ParticleFieldProps) => {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      camera={{ position: [0, 0, 9], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
    >
      {LAYERS.map((layer, i) => (
        <Particles
          key={i}
          {...layer}
          scrollRef={scrollRef}
          rotationSign={i === 0 ? 1 : -1}
        />
      ))}
      <EffectComposer>
        <Bloom luminanceThreshold={0.05} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
};
