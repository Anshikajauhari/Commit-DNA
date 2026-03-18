import React from 'react';

const HeroSummary = ({ data }) => (
  <section className="scroll-section">
    <h2 className="neon-text">/ HERO_SUMMARY</h2>
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>PROJECT_ID</p>
      <h1 style={{ fontSize: '4rem', color: '#fff', margin: '10px 0' }}>
        {data?.repoName || "ANALYSIS_PENDING"}
      </h1>
      <p style={{ color: '#adf822', letterSpacing: '2px' }}>
        STATUS: {data ? "DATA_DECODED" : "NULL_POINTER"}
      </p>
    </div>
  </section>
);

export default HeroSummary;