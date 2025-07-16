import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function CapModel({ url, color }) {
  const { scene } = useGLTF(url);

  // Apply color to all meshes in the scene
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.color.set(color);
    }
  });

  return <primitive object={scene} scale={0.5} />;
}

export default function CapViewer({ modelUrl, capColor }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <CapModel url={modelUrl} color={capColor || 'black'} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
