"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, MathUtils } from "three";
import { Stars } from "@react-three/drei";

interface PlanetProps {
  texture: any;
  index: number;
  currentIndex: number;
  total: number;
}

function Planet({ texture, index, currentIndex, total }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  // Calculate relative position with wrapping for infinite carousel effect
  let diff = index - currentIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Target configurations based on position
    let targetX = diff * 20; // Default far away
    let targetY = 0;
    let targetZ = -20;
    let targetScale = 0;     // Invisible by default

    if (diff === 0) {
      // Center (Active Planet) - Pushed down and larger
      targetX = 0;
      targetY = -5.8;
      targetZ = 0;
      targetScale = 1.2;
    } else if (diff === 1) {
      // Right (Next Planet) - Far out to the edge
      targetX = 16;
      targetY = -1;
      targetZ = -20;
      targetScale = 0.6;
    } else if (diff === -1) {
      // Left (Previous Planet) - Far out to the edge
      targetX = -16;
      targetY = -1;
      targetZ = -20;
      targetScale = 0.6;
    }

    // Smoothly interpolate position
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
    meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, targetY, 0.04);
    meshRef.current.position.z = MathUtils.lerp(meshRef.current.position.z, targetZ, 0.04);
    
    // Smoothly interpolate scale
    const scale = MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.04);
    meshRef.current.scale.set(scale, scale, scale);

    // Constant slow rotation
    meshRef.current.rotation.y += 0.001;

    // Fade out glow if not active
    if (glowRef.current) {
      const targetOpacity = diff === 0 ? 0.08 : 0;
      const mat = glowRef.current.material as any;
      mat.opacity = MathUtils.lerp(mat.opacity, targetOpacity, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.3, 0, 0]}>
      <sphereGeometry args={[4, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.5} metalness={0.1} />
      
      {/* Atmosphere Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[4.1, 64, 64]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0} depthWrite={false} />
      </mesh>
    </mesh>
  );
}

interface SceneProps {
  textures: string[];
  currentIndex: number;
}

function Scene({ textures, currentIndex }: SceneProps) {
  const loadedTextures = useLoader(TextureLoader, textures);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={2.0} />
      <directionalLight position={[-3, 2, -5]} intensity={0.6} color="#6688ff" />
      <directionalLight position={[0, -3, 2]} intensity={0.3} color="#4466ff" />
      
      {/* Immersive Starry Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {loadedTextures.map((texture, index) => (
        <Planet 
          key={index} 
          texture={texture} 
          index={index} 
          currentIndex={currentIndex} 
          total={textures.length} 
        />
      ))}
    </>
  );
}

export default function EventGlobe({ textures, currentIndex, className = "w-full h-full" }: SceneProps & { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Scene textures={textures} currentIndex={currentIndex} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
