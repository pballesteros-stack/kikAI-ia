import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const COUNT = 350;

// Two particle layers for depth: orange (foreground) + cream (background)
const LAYERS = [
  { color: '#FF5C00', size: 0.06, opacity: 0.9,  spread: 3.5, forceScale: 0.09 },
  { color: '#FCFBF7', size: 0.03, opacity: 0.35, spread: 5.0, forceScale: 0.05 },
] as const;

interface LayerProps {
  color: string;
  size: number;
  opacity: number;
  spread: number;
  forceScale: number;
}

const ParticleLayer = ({ color, size, opacity, spread, forceScale }: LayerProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  // Positions and velocities stored in refs — no re-renders on update
  const pos = useRef(
    Float32Array.from({ length: COUNT * 3 }, (_, i) =>
      i % 3 === 2 ? 0 : (Math.random() - 0.5) * spread
    )
  );
  const vel = useRef(new Float32Array(COUNT * 3));

  useFrame(() => {
    const p = pos.current;
    const v = vel.current;
    // Mouse in world space (canvas is ~[-3,3] range)
    const mx = pointer.x * (spread * 0.75);
    const my = pointer.y * (spread * 0.75);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // Attraction toward mouse
      const dx = mx - p[i3];
      const dy = my - p[i3 + 1];
      const distSq = dx * dx + dy * dy + 0.3;
      v[i3]     += (dx / distSq) * forceScale;
      v[i3 + 1] += (dy / distSq) * forceScale;

      // Subtle random drift so particles stay alive when mouse is still
      v[i3]     += (Math.random() - 0.5) * 0.003;
      v[i3 + 1] += (Math.random() - 0.5) * 0.003;

      // Damping
      v[i3]     *= 0.93;
      v[i3 + 1] *= 0.93;

      p[i3]     += v[i3];
      p[i3 + 1] += v[i3 + 1];
    }

    if (pointsRef.current) {
      (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={pos.current}
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

// Cursor glow — a soft orange sphere that tracks the mouse in 3D space
const CursorGlow = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointer.x * 2.5, 0.12);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointer.y * 2.5, 0.12);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color="#FF5C00"
        emissive="#FF5C00"
        emissiveIntensity={3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

export const MagneticCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 5], fov: 60 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: false }}
  >
    <pointLight position={[0, 0, 2]} intensity={1} color="#FF5C00" />
    {LAYERS.map((layer, i) => (
      <ParticleLayer key={i} {...layer} />
    ))}
    <CursorGlow />
  </Canvas>
);
