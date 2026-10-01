import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = ({ count = 40 }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 0.5 + Math.random() * 1.5;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -10 + Math.random() * 20;
      const yFactor = -10 + Math.random() * 20;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  
  const particleGeometry = useMemo(() => {
    // Simple diamond shape for sparkles
    const geom = new THREE.OctahedronGeometry(0.05, 0);
    return geom;
  }, []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      
      // Floating upwards
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      const yPos = (particle.yFactor + t * factor) % 15 - 5;
      
      dummy.position.set(
        (particle.xFactor + a) % 10 - 5,
        yPos,
        (particle.zFactor + b) % 10 - 5
      );
      
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[particleGeometry, null, count]}>
      <meshStandardMaterial 
        color="#ff69b4" 
        emissive="#ff1493"
        emissiveIntensity={1}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
};

export default ParticleSystem;
