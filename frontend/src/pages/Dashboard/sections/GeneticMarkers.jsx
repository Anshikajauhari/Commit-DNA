import React from 'react';

const GeneticMarkers = ({ data }) => {
  // Debugging: This will show in your browser console (F12) 
  // so you can see the EXACT keys your backend is sending.
  console.log("Data received in GeneticMarkers:", data);

  return (
    <section className="scroll-section">
      <h2 className="neon-text">/ GENETIC_MARKERS</h2>
      <div className="grid-layout">
        <div className="neon-card">
          <h4>MIDNIGHT_OIL</h4>
          {/* Check if your backend uses 'nightRatio' or maybe 'night_ratio' */}
          <p className="big-number">{data?.nightRatio ?? data?.night_ratio ?? "0"}%</p>
          <p className="label">Night Ratio</p>
        </div>
        
        <div className="neon-card">
          <h4>WEEKEND_DEBT</h4>
          {/* Check if your backend uses 'weekendWork' or 'weekend_ratio' */}
          <p className="big-number">{data?.weekendWork ?? data?.weekend_ratio ?? "0"}%</p>
          <p className="label">Saturation</p>
        </div>
        
        <div className="neon-card">
          <h4>GARDENING</h4>
          <p className="big-number">{data?.refactorRate ?? data?.refactor_rate ?? "0"}%</p>
          <p className="label">Refactor Rate</p>
        </div>
      </div>
    </section>
  );
};

export default GeneticMarkers;