export const calculateOrbitPosition = (cardIndex, totalCards, time) => {
  const baseAngle = (cardIndex / totalCards) * Math.PI * 2;
  
  const isHerCard = cardIndex === 3;
  const baseOrbitRadius = isHerCard ? 1.4 : 0.95;
  
  const verticalWave = Math.sin(baseAngle * 2 + time * 0.3) * 0.25;
  
  const direction = cardIndex % 2 === 0 ? 1 : -1;
  const rotationSpeed = 0.00025 * direction;
  
  const currentAngle = baseAngle + time * rotationSpeed;
  
  const x = Math.cos(currentAngle) * baseOrbitRadius;
  const z = Math.sin(currentAngle) * baseOrbitRadius;
  
  const y = verticalWave + Math.sin(time * 0.8 + cardIndex) * 0.06;
  
  const scale = isHerCard ? 1.4 : 1.0;
  
  const rotationY = currentAngle + (isHerCard ? 0.3 : 0);
  
  return {
    x,
    y,
    z,
    scale,
    rotationY,
  };
};

export const calculateWobble = (cardIndex, time) => {
  const wobbleX = Math.sin(time * 0.7 + cardIndex * 1.5) * 0.03;
  const wobbleZ = Math.sin(time * 0.5 + cardIndex * 2.1) * 0.05;
  const rotWobbleX = Math.sin(time * 0.4 + cardIndex) * 0.02;
  const rotWobbleZ = Math.cos(time * 0.6 + cardIndex * 1.3) * 0.015;
  
  return {
    offsetX: wobbleX,
    offsetZ: wobbleZ,
    rotX: rotWobbleX,
    rotZ: rotWobbleZ,
  };
};
