import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useCardPhysics = (meshRef, cardIndex, isSelected) => {
  const timelineRef = useRef(null);
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Create infinite looping timeline for idle floating
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    
    // Only apply physics when NOT selected (selected has different animation)
    if (!isSelected) {
      tl.to(meshRef.current.position, {
        y: `+=${0.05 + Math.random() * 0.05}`,
        duration: 2 + Math.random() * 2,
      }, 0)
      .to(meshRef.current.rotation, {
        x: `+=${0.01 + Math.random() * 0.01}`,
        z: `+=${0.008 + Math.random() * 0.008}`,
        duration: 3 + Math.random() * 2,
      }, 0);
    }
    
    timelineRef.current = tl;
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isSelected, meshRef]);
  
  return timelineRef;
};
