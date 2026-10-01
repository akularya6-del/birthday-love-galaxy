import React from 'react';
import { uiText } from '../utils/constants';

const UIOverlay = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="ui-overlay-container">
      <div className="ui-top-nav glass-nav">
        {uiText.navButtons.map((btn, i) => (
          <button key={i} className="glass-button" style={{ fontSize: '0.875rem', fontWeight: '600' }}>{btn}</button>
        ))}
      </div>
      
      <div style={{
        textAlign: 'center',
        width: '100%',
        position: 'absolute',
        top: '96px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(28px, 9vw, 56px)', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0' 
        }}>
          {uiText.heroTitle}
        </h1>
        <p className="cursive" style={{ 
          fontSize: 'clamp(18px, 5vw, 28px)', 
          opacity: 0.9,
          margin: 0
        }}>
          {uiText.heroSubtitle}
        </p>
      </div>
      
      <div className="ui-bottom-bar glass-nav" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
        <div>{uiText.bottomLeft}</div>
        <div>{uiText.bottomRight}</div>
      </div>
    </div>
  );
};

export default UIOverlay;
