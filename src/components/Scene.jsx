import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import CentralAsset from './CentralAsset';
import FloatingCard from './FloatingCard';
import ParticleSystem from './ParticleSystem';
import { memoriesData } from '../utils/constants';

const CameraController = ({ selectedIndex, isDetailOpen }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (isDetailOpen) {
      gsap.to(camera.position, {
        z: 3.5,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    } else {
      gsap.to(camera.position, {
        z: 5,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isDetailOpen, camera]);

  return null;
};

const Scene = ({ onCardSelect, selectedIndex, isDetailOpen }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      dpr={[1, 2]}
    >
      <CameraController selectedIndex={selectedIndex} isDetailOpen={isDetailOpen} />
      
      <ambientLight intensity={0.4} color="#ffb6c1" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff69b4" distance={20} decay={2} />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#fff0f5" distance={15} decay={2} />
      <pointLight position={[0, 5, -5]} intensity={0.4} color="#ff1493" distance={12} decay={2} />

      <Suspense fallback={null}>
        <CentralAsset />
        
        {memoriesData.map((memory, index) => (
          <FloatingCard
            key={`card-${index}`}
            data={memory}
            index={index}
            isSelected={selectedIndex === index}
            onSelect={onCardSelect}
          />
        ))}
        
        <ParticleSystem count={40} />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
