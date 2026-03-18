import React from 'react';

const BurnoutScore = ({ data }) => {
  const score = data?.burnoutScore || 0;
  
  return (
    <section className="scroll-section">
      <h2 className="neon-text">/ BURNOUT_SCORE</h2>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ 
          fontSize: '6rem', 
          fontWeight: '900', 
          color: score > 50 ? '#ff4444' : '#adf822',
          textShadow: `0 0 30px ${score > 50 ? 'rgba(255,68,68,0.3)' : 'rgba(173,248,34,0.3)'}`
        }}>
          {score}
        </p>
        <p style={{ letterSpacing: '5px', color: 'rgba(255,255,255,0.4)' }}>RISK_LEVEL</p>
      </div>
    </section>
  );
};

export default BurnoutScore;