import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DetailView = ({ memory, onClose }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.1");
      
    // Handle body scroll locking
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 50, opacity: 0, duration: 0.3 })
      .to(containerRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  if (!memory) return null;

  return (
    <div className="detail-view-container" ref={containerRef}>
      <button className="detail-close-btn" onClick={handleClose}>×</button>
      
      <div className="detail-content" ref={contentRef}>
        <img src={memory.imageUrl} alt={memory.title} className="detail-image" />
        
        <h1 className="detail-title" style={{ marginTop: '16px' }}>{memory.title}</h1>
        <div className="detail-meta">
          {memory.location} {memory.location && memory.date ? '•' : ''} {memory.date}
        </div>
        
        <p className="detail-desc">{memory.description}</p>
        
        {memory.reasons && (
          <ul style={{ marginTop: '16px', paddingLeft: '16px', listStyleType: 'disc' }}>
            {memory.reasons.map((reason, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{reason}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DetailView;
