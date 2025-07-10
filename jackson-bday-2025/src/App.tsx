import React, { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, TextureLoader } from "three";
import * as THREE from "three";
import "./App.css";

// === Cube Component ===
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

  const texture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      position={position}
      ref={meshRef}
      onPointerDown={onClick}
      name={name}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// === App Component ===
export default function App() {
  // === Messages in order ===
  const messages = [
    "Hi I'm Jackson! 🎸",
    "I'm 23 🤘",
    "I love Buffalo Wild Wings ❤️‍🔥",
    "Thursdays they have BOGO 🎶",
    "I love Jordyn 🔨",
    "They don't ONLY sell wings 🚀",
    "I love power tools!!! 😜",
    "They actually have burgers and other menu items — super reasonably priced 🤾🏾‍♀️",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  // === Message click handler ===
  const handleCubeClick = () => {
    setMessageIndex((prevIndex) =>
      prevIndex + 1 < messages.length ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="canvas">
      {/* Big birthday title */}
      <div className="title">HAPPY BIRTHDAY JACKSON</div>

      {/* Subtitle */}
      <div className="subtitle">Click on Jackson for a surprise</div>

      {/* Message at bottom */}
      <div className="message">{messages[messageIndex]}</div>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} />

        <Cube
          position={[0, 0, 0]}
          textureUrl="./img/jackson.jpg"
          onClick={handleCubeClick}
          name="jacksonCube"
        />
      </Canvas>
    </div>
  );
}
