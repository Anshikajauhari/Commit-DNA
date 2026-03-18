import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Dashboard.css';
import HeroSummary from "./sections/HeroSummary.jsx";
import GeneticMarkers from "./sections/GeneticMarkers.jsx";
import BurnoutScore from "./sections/BurnoutScore.jsx";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const repoData = location.state?.result || location.state || JSON.parse(localStorage.getItem('lastScan'));

  useEffect(() => {
    if (repoData) {
      localStorage.setItem('lastScan', JSON.stringify(repoData));
    }
  }, [repoData]);

  if (!repoData) {
    return (
      <div className="dashboard-wrapper error-screen">
        <div className="logo-text" style={{fontSize: '2rem'}}>! ERROR: NO_DATA_DETECTED</div>
        <p style={{color: 'rgba(255,255,255,0.5)', margin: '20px 0'}}>Navigate back to Home and analyze a repo.</p>
        <button onClick={() => navigate('/')} className="return-btn">
          RETURN_TO_BASE
        </button>
      </div>
    );
  }

  return (
    <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-active' : ''}`}>
    
      <button className="menu-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? '[ CLOSE ]' : '[ MENU ]'}
      </button>

      <nav className={`dna-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-text">COMMIT_DNA_v1.0</div>
        <div className="nav-links">
          <p onClick={() => navigate('/')} className="back-btn">[ ESC_TO_HOME ]</p>
          <p className="active-link" onClick={() => setSidebarOpen(false)}>OVERVIEW</p>
        </div>
      </nav>

      <main className="main-scroller">
        <HeroSummary data={repoData} />
        <GeneticMarkers data={repoData} />
        <BurnoutScore data={repoData} />
      </main>

      {isSidebarOpen && <div className="menu-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;