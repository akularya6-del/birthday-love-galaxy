import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import DetailView from './components/DetailView';
import LoadingScreen from './components/LoadingScreen';
import { memoriesData } from './utils/constants';
import './styles/global.css';
import './styles/glassmorphism.css';
import './styles/mobile.css';

function App() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading assets
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500); // Keep loading screen up for at least 2.5s for dramatic effect
    return () => clearTimeout(timer);
  }, []);

  const handleCardSelect = (index) => {
    setSelectedCardIndex(index);
  };

  const handleCloseDetail = () => {
    setSelectedCardIndex(null);
  };

  const isDetailOpen = selectedCardIndex !== null;

  return (
    <>
      <LoadingScreen isLoaded={isLoaded} />
      
      {isLoaded && (
        <>
          <Scene 
            onCardSelect={handleCardSelect} 
            selectedIndex={selectedCardIndex}
            isDetailOpen={isDetailOpen}
          />
          
          <UIOverlay isVisible={!isDetailOpen} />
          
          <DetailView 
            memory={selectedCardIndex !== null ? memoriesData[selectedCardIndex] : null} 
            onClose={handleCloseDetail} 
          />
        </>
      )}
    </>
  );
}

export default App;
