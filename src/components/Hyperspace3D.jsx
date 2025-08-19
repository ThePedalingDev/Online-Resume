import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function generateStreaks(count, spread = 700) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Each line segment is two points: start and end
    // We'll make streaks that are ~16 units long
    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * spread;
    const z = -Math.random() * spread;
    const len = 16 + Math.random() * 20;
    // Start
    positions.push(x, y, z);
    // End (closer to the camera)
    positions.push(x, y, z + len);
  }
  return new Float32Array(positions);
}

function HyperspaceStreaks({ count = 800, speed = 7, spread = 700 }) {
  const ref = useRef();
  // Each line segment is two points, so we need count * 2
  const positions = useRef(generateStreaks(count, spread));

  useFrame(() => {
    const pos = positions.current;
    // Update all lines: move them toward camera, reset when past z=10
    for (let i = 0; i < pos.length; i += 6) {
      // Move both points in z
      pos[i + 2] += speed;
      pos[i + 5] += speed;
      // If streak has reached the camera, reset both ends to far Z
      if (pos[i + 2] > 10) {
        const x = (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * spread;
        const z = -spread;
        const len = 16 + Math.random() * 20;
        pos[i] = x;
        pos[i + 1] = y;
        pos[i + 2] = z;
        pos[i + 3] = x;
        pos[i + 4] = y;
        pos[i + 5] = z + len;
      }
    }
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.current.length / 3}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#fff" transparent opacity={0.75} linewidth={1.2} />
    </lineSegments>
  );
}

export default function Hyperspace3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 90 }}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <HyperspaceStreaks count={1200} />
    </Canvas>
  );
}
