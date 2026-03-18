import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          🧬 Commit DNA
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
        </div>

        <button className="nav-analyze-btn" onClick={() => navigate('/')}>
          Analyze Repo
        </button>
      </div>
    </nav>
  );
};

export default Navbar;