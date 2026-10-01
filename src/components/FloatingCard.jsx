import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { calculateOrbitPosition, calculateWobble } from '../utils/mathHelpers';
import { useCardPhysics } from '../hooks/useCardPhysics';

const FloatingCard = ({ data, index, isSelected, onSelect }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Create a placeholder texture for when the image is missing
  // In a real app we'd load the texture via useTexture, but since images don't exist yet we use a colored material or handle errors
  let texture;
  try {
    texture = useTexture(data.imageUrl);
  } catch (e) {
    texture = null; // Fallback handled in render
  }

  const isHerCard = index === 3;
  
  useCardPhysics(meshRef, index, isSelected);
  
  useFrame((state) => {
    if (!meshRef.current || isSelected) return; // Ignore if selected (handled by parent or separate animation)
    
    const time = state.clock.elapsedTime;
    
    // Orbital position
    const orbit = calculateOrbitPosition(index, 4, time);
    
    meshRef.current.position.x = orbit.x;
    meshRef.current.position.y = orbit.y;
    meshRef.current.position.z = orbit.z;
    
    // Apply scale
    const targetScale = hovered ? orbit.scale * 1.1 : orbit.scale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    
    // Apply rotation
    const wobble = calculateWobble(index, time);
    meshRef.current.rotation.y = orbit.rotationY + wobble.rotX;
    meshRef.current.rotation.x = wobble.rotX;
    meshRef.current.rotation.z = wobble.rotZ;
    
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        (hovered || isSelected) ? 0.3 : 0.05,
        0.1
      );
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(index);
  };

  const cardWidth = isHerCard ? 1.2 : 1.0;
  const cardHeight = isHerCard ? 1.2 : 1.33;

  return (
    <group ref={meshRef}>
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[cardWidth, cardHeight, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ffffff"
          emissive="#ff69b4"
          emissiveIntensity={0.05}
          roughness={0.2}
          metalness={0.1}
          transparent={true}
          opacity={0.9}
          map={texture}
        />
        
        {/* Glass border frame */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[cardWidth + 0.05, cardHeight + 0.05]} />
          <meshBasicMaterial color="#ffb6c1" transparent opacity={0.3} />
        </mesh>
      </mesh>
    </group>
  );
};

export default FloatingCard;
