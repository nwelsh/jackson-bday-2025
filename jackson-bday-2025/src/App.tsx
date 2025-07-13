import React, { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, TextureLoader } from "three";
import * as THREE from "three";
import "./App.css";

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
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function App() {
  const messages = [
    "Hi I'm Jackson! 🎸",
    "I'm 23 🤘",
    "I love power tools!!! 🏄🏿‍♀️",
    "I grill all the chicken at the BBQ 🐓",
    "I love Buffalo Wild Wings ❤️‍🔥",
    "Thursdays they have BOGO 🎶",
    "I work in film 🎥",
    "I love Jordyn 🦐",
    "I smoke cigarettes 🧚🏼‍♂️",
    "They don't ONLY sell wings 🚀",
    "Buffalo Wild Wings I mean, they sell a bunch of other things too",
    "They actually have sauces and other menu items — super reasonably priced 🤾🏾‍♀️",
    "I am a vegetarian 🩰",
    "https://www.buffalowildwings.com/ ✅",
    "(773) 868-9453 (thats the bdubs phone number) 🎻",
    "Let them know you know me there TRUST ME they'll hook you up 🐲",
    "My full name is jackson 🤸🏾",
    "🧛🏼",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  // === Message click handler ===
  const handleCubeClick = () => {
    if(messageIndex === messages.length - 1) {
      const confirmCall = window.confirm("Now calling buffalo wild wings!!! 😀");
    if (confirmCall) {
      window.location.href = "tel:+17738689453";
    }
    }

    setMessageIndex((prevIndex) =>
      prevIndex + 1 < messages.length ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="canvas">
      <div className="title">HAPPY BIRTHDAY JACKSON 🎉🥳</div>

      <div className="subtitle">Click on jacksoncube for a surprise!!!! 😳</div>
      <div className="sign">💚 Mike and Nicole</div>

      <div className="message">{messages[messageIndex]}</div>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="cube">
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} />

        <Cube
          position={[0, 0, 0.25]}
          textureUrl="./img/jackson.jpg"
          onClick={handleCubeClick}
          name="jacksonCube"
          
        />
      </Canvas>
    </div>
  );
}
