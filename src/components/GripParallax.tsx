import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const Scene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const badgeRef  = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const gripTexture  = useTexture('/kikAI_grip.png');
  const badgeTexture = useTexture('/kikAI_badge.png');

  useFrame(() => {
    if (!groupRef.current) return;
    // Whole scene tilts with mouse — parallax layers move different amounts
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.35, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.25, 0.05);

    // Badge floats more aggressively (closer layer = more parallax shift)
    if (badgeRef.current) {
      badgeRef.current.position.x = THREE.MathUtils.lerp(badgeRef.current.position.x, 0.85 + pointer.x * 0.25, 0.06);
      badgeRef.current.position.y = THREE.MathUtils.lerp(badgeRef.current.position.y, -0.85 + pointer.y * 0.15, 0.06);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#FF5C00" />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color="#FCFBF7" />

      <group ref={groupRef}>
        {/* Main grip image — back layer */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshStandardMaterial map={gripTexture} metalness={0.2} roughness={0.7} />
        </mesh>

        {/* Badge — front layer, floats independently */}
        <mesh ref={badgeRef} position={[0.85, -0.85, 0.4]}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshStandardMaterial map={badgeTexture} transparent alphaTest={0.1} metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Glowing edge ring hint */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.4, 3.4]} />
          <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={0.15} transparent opacity={0.08} />
        </mesh>
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.6} mipmapBlur />
      </EffectComposer>
    </>
  );
};

export const GripParallax = () => (
  <Canvas
    camera={{ position: [0, 0, 3], fov: 55 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: true }}
  >
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  </Canvas>
);
