
import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css"; // Ensure this file exists in src/pages/

 
function Home() {

  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();


   const navigate = useNavigate();

  const handleAnalyze = () => {
    navigate("/result");
  };
  

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mouse-x', `${x}%`);
      document.body.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

const handleAnalyze = async () => {
  if (!repoUrl) return alert("Please enter a GitHub URL");
  setLoading(true);

  try {
    console.log("Sending request to backend...");
    
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error: ${errorText}`);
    }

    const data = await response.json();
    console.log("Data received successfully:", data);

    // Navigate only if data exists
    if (data && Object.keys(data).length > 0) {
      navigate("/dashboard", { state: { result: data } });
    } else {
      alert("Backend returned empty data.");
    }

  } catch (error) {
    console.error("FULL_ERROR_DETAILS:", error);
    alert(`Connection failed: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="hero">
        <div className="hero-text">
          <h1>Understand Your Developer DNA</h1>
          <p>Analyze commit patterns, coding behavior, and burnout risks.</p>
          
          <div className="repo-input">

            <input 
              type="text" 
              placeholder="Enter GitHub Repository URL" 
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)} 
            />
            <button 
              className="analyze-btn" 
              onClick={handleAnalyze} 
              disabled={loading}
            >
              {loading ? "DECODING DNA..." : "Analyze Repository"}
            </button>

            <input type="text" placeholder="Enter GitHub Repository URL" />
            <button className="analyze-btn" onClick={handleAnalyze}>
  Analyze Repository
</button>

          </div>
        </div>
      </section>

      <section className="features">
        <h2>Powerful Insights</h2>
        <div className="feature-grid">
          <div className="card">
            <h3>📊 Commit Activity</h3>
            <p>Track when developers are most active.</p>
          </div>
          <div className="card">
            <h3>🐞 Bug Detection</h3>
            <p>Identify bug fixing patterns.</p>
          </div>
          <div className="card">
            <h3>🧬 Developer DNA</h3>
            <p>Discover coding personality traits.</p>
          </div>
          <div className="card">
            <h3>⚠ Burnout Indicator</h3>
            <p>Detect unhealthy work patterns.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;