import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// ─── Nebula Shader ────────────────────────────────────────────────────────────

const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;

  float random(vec2 st) {
    return fract(sin(dot(st, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
      mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // FBM: 6 octaves with rotation to avoid axis artifacts
  float fbm(vec2 st) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80); // ~36.87° rotation
    for (int i = 0; i < 6; i++) {
      v  += a * noise(st);
      st  = rot * st * 2.1;
      a  *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv + uMouse * 0.03;
    float t  = uTime * 0.035;

    // Domain-warped FBM for organic cloud shapes
    vec2 q = vec2(fbm(uv * 2.5 + t), fbm(uv * 2.5 - t * 0.8));
    float n = fbm(uv * 3.0 + q + t * 0.4);

    // Color palette: deep space → navy → cyan → ABAP blue hotspots
    vec3 deepSpace = vec3(0.01, 0.0,  0.04);
    vec3 purple    = vec3(0.22, 0.0,  0.42);
    vec3 cyan      = vec3(0.0,  0.22, 0.42);
    vec3 orange    = vec3(0.85, 0.3,  0.0);

    vec3 color = mix(deepSpace, purple, smoothstep(0.0, 0.45, n));
    color = mix(color, cyan,   smoothstep(0.35, 0.7,  n));
    color = mix(color, orange, smoothstep(0.65, 0.9,  n) * 0.35);

    // Vignette — darken edges so footer content stays readable
    float dist = length(uv - 0.5);
    color *= 1.0 - smoothstep(0.3, 0.85, dist) * 0.85;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ─── Nebula Background Plane ─────────────────────────────────────────────────

const NebulaBg = () => {
  const matRef   = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouse.current.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    mouseRef.current.lerp(targetMouse.current, 0.025);
    matRef.current.uniforms.uMouse.value.copy(mouseRef.current);
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:  { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
      />
    </mesh>
  );
};

// ─── Star Field ───────────────────────────────────────────────────────────────

const Stars = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const count = 1800;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * viewport.width  * 1.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return pos;
  }, [viewport]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Subtle twinkle via opacity pulsing on the material
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1800} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#FCFBF7"
        size={0.018}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const NebulaCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 1], fov: 90 }}
    style={{ background: '#020007' }}
    gl={{ antialias: false }}
  >
    <NebulaBg />
    <Stars />
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} intensity={0.8} mipmapBlur />
    </EffectComposer>
  </Canvas>
);
