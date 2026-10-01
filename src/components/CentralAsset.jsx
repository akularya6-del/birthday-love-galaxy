import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CentralAsset = () => {
  const meshRef = useRef();

  // Procedural heart geometry fallback
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo( x + 5, y + 5 );
    shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
    
    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.1,
    };
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    // Scale it down so it fits in the center (new shape is ~20 units large)
    geometry.scale(0.04, 0.04, 0.04);
    // Rotate to face camera better initially
    geometry.rotateX(Math.PI);
    return geometry;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Continuous Y-axis rotation
    meshRef.current.rotation.y += 0.003;
    
    // Gentle bobbing motion
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.08;
    
    // Scale breathing
    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
    
    // Emissive pulse
    if (meshRef.current.material) {
      const pulse = 0.1 + (Math.sin(time * 1.2) * 0.05 + 0.05);
      meshRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <mesh ref={meshRef} geometry={heartGeometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#ff8da1"
        metalness={0.3}
        roughness={0.4}
        emissive="#ff69b4"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default CentralAsset;
