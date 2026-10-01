import React, { useEffect, useState } from 'react';
import { uiText } from '../utils/constants';

const LoadingScreen = ({ isLoaded }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Wait for transition to finish
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  return (
    <div className="loading-screen" style={{ opacity: isLoaded ? 0 : 1 }}>
      <svg 
        width="64" 
        height="64" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="var(--color-primary)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{
          animation: 'pulse 1s infinite'
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <div className="mt-4 text-sm font-medium opacity-80" style={{ fontFamily: 'var(--font-body)', animation: 'pulse 2s infinite' }}>
        {uiText.loadingText}
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
