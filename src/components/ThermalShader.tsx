import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────

const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform float uTemperature; // 0 = cold/deterministic | 1 = hot/creative

  varying vec2 vUv;

  // Value noise — organic heat patterns
  float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
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

  // Thermal camera color palette: black → blue → cyan → green → yellow → orange → red → white
  vec3 thermalColor(float t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.125) return mix(vec3(0.0),            vec3(0.29, 0.0, 0.51),  t * 8.0);
    if (t < 0.25)  return mix(vec3(0.29, 0.0, 0.51), vec3(0.0, 0.0, 1.0),   (t - 0.125) * 8.0);
    if (t < 0.375) return mix(vec3(0.0, 0.0, 1.0),   vec3(0.0, 1.0, 1.0),   (t - 0.25)  * 8.0);
    if (t < 0.5)   return mix(vec3(0.0, 1.0, 1.0),   vec3(0.0, 1.0, 0.0),   (t - 0.375) * 8.0);
    if (t < 0.625) return mix(vec3(0.0, 1.0, 0.0),   vec3(1.0, 1.0, 0.0),   (t - 0.5)   * 8.0);
    if (t < 0.75)  return mix(vec3(1.0, 1.0, 0.0),   vec3(1.0, 0.36, 0.0),  (t - 0.625) * 8.0);
    if (t < 0.875) return mix(vec3(1.0, 0.36, 0.0),  vec3(1.0, 0.0, 0.0),   (t - 0.75)  * 8.0);
    return           mix(vec3(1.0, 0.0, 0.0),         vec3(1.0),             (t - 0.875) * 8.0);
  }

  void main() {
    vec2 uv = vUv;

    // Speed and scale driven by temperature
    float speed = mix(0.08, 0.5,  uTemperature);
    float scale = mix(2.5,  6.0,  uTemperature);

    // Three octaves of noise for organic heat turbulence
    float t = uTime * speed;
    float n  = noise(uv * scale        + vec2(t * 0.7, t * 0.5));
    n       += 0.5  * noise(uv * scale * 2.1 + vec2(t * 1.1, t * 0.8));
    n       += 0.25 * noise(uv * scale * 4.3 + vec2(t * 1.7, t * 1.3));
    n       /= 1.75;

    // Central hotspot — stronger when cold (deterministic = stable heat core)
    float dist    = distance(uv, vec2(0.5));
    float hotspot = 1.0 - smoothstep(0.0, 0.55, dist);
    n = mix(n + hotspot * 0.45, n, uTemperature);

    // Shift heat range based on temperature slider
    n = clamp(n + uTemperature * 0.25 - 0.1, 0.0, 1.0);

    vec3 color = thermalColor(n);
    gl_FragColor = vec4(color, 0.9);
  }
`;

// ─── Scene ────────────────────────────────────────────────────────────────────

interface ThermalPlaneProps {
  tempRef: React.MutableRefObject<number>;
}

const ThermalPlane = ({ tempRef }: ThermalPlaneProps) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    // Smooth interpolation so slider changes feel fluid
    matRef.current.uniforms.uTemperature.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uTemperature.value,
      tempRef.current,
      0.04
    );
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:        { value: 0 },
          uTemperature: { value: 0.5 },
        }}
        transparent
      />
    </mesh>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────

interface ThermalShaderProps {
  tempRef: React.MutableRefObject<number>;
}

export const ThermalShader = ({ tempRef }: ThermalShaderProps) => (
  <Canvas
    camera={{ position: [0, 0, 1], fov: 90 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: false }}
  >
    <ThermalPlane tempRef={tempRef} />
  </Canvas>
);
