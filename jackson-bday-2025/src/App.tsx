import React, { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import * as THREE from "three";
import "./App.css";

// return cube
function Cube({
  position,
  textureUrl,
  onClick,
  name,
}: {
  position: [number, number, number];
  textureUrl: string;
  onClick: (e: any) => void;
  name: string;
}) {
  const meshRef = useRef<Mesh>(null);

  // Load texture once
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  // Rotate cube every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh position={position} ref={meshRef} onPointerDown={onClick} uuid={name}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function App() {
  const [selectedCube, setSelectedCube] = useState<{
    uuid: string;
    color: string;
  } | null>(null);

  const handleCubeClick = (e: any) => {
    const mesh = e.object as Mesh;
    const material = mesh.material as MeshStandardMaterial | undefined;

    // material can be an array
    const color = material?.color?.getHexString()
      ? `#${material.color.getHexString()}`
      : "#ffffff";

    setSelectedCube({
      uuid: mesh.uuid,
      color,
    });
  };

  return (
    <div className="canvas">
      <div className="left">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          {/* lighting to see the cubes */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} />

          <Cube
            position={[-1, 0, 0]}
            textureUrl="./img/jackson.jpg"
            onClick={handleCubeClick}
            name="leftCube"
          />
        </Canvas>
      </div>
    </div>
  );
}
