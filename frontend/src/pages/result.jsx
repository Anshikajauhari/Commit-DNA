import React, { useRef, useEffect } from 'react';
import './result.css';

// ── Sample Data (replace with real API data later) ──
const devData = {
  developerName: "V8V88V8V88",
  totalCommits: 15,
  nightRatio: 0.2,
  weekendRatio: 0.4666666666666667,
  bugRate: 0.13333333333333333,
  refactorRate: 0.13333333333333333,
  commitSpike: 0.6666666666666667,
  // existing fields
  primaryLanguage: "Javascript",
  focusArea: "UI/UX",
  codeVelocity: "High",
};

// ── Speedometer Component ──
const Speedometer = ({ value, max = 1, label }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H - 30;
    const R = Math.min(W, H * 2) / 2 - 20;

    ctx.clearRect(0, 0, W, H);

    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const totalAngle = endAngle - startAngle;

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, R, startAngle, endAngle);
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#d4ead9';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Colored value arc
    const pct = Math.min(value / max, 1);
    const valAngle = startAngle + totalAngle * pct;

    // Gradient: green → yellow → red
    const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
    grad.addColorStop(0, '#3cb96a');
    grad.addColorStop(0.5, '#f0c040');
    grad.addColorStop(1, '#e84040');

    ctx.beginPath();
    ctx.arc(cx, cy, R, startAngle, valAngle);
    ctx.lineWidth = 18;
    ctx.strokeStyle = grad;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Tick marks
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (totalAngle / 10) * i;
      const innerR = R - 26;
      const outerR = R - 14;
      ctx.beginPath();
      ctx.moveTo(cx + innerR * Math.cos(angle), cy + innerR * Math.sin(angle));
      ctx.lineTo(cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle));
      ctx.strokeStyle = '#8cbd9a';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Needle
    const needleAngle = startAngle + totalAngle * pct;
    const needleLen = R - 28;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + needleLen * Math.cos(needleAngle),
      cy + needleLen * Math.sin(needleAngle)
    );
    ctx.strokeStyle = '#1a6b3a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#1a8c45';
    ctx.fill();

    // Value text
    ctx.fillStyle = '#1c4a2a';
    ctx.font = "bold 22px 'DM Sans', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText((value * 100).toFixed(1) + '%', cx, cy - 18);

    // Label
    ctx.fillStyle = '#8cbd9a';
    ctx.font = "11px 'DM Mono', monospace";
    ctx.fillText(label.toUpperCase(), cx, cy + 22);

    // Min / Max labels
    ctx.fillStyle = '#8cbd9a';
    ctx.font = "10px 'DM Mono', monospace";
    ctx.textAlign = 'left';
    ctx.fillText('0%', cx - R - 4, cy + 6);
    ctx.textAlign = 'right';
    ctx.fillText('100%', cx + R + 4, cy + 6);

  }, [value]);

  return <canvas ref={canvasRef} width={260} height={160} style={{ width: '100%' }} />;
};

// ── Mini Activity Chart ──
const MiniChart = () => {
  const canvasRef = useRef(null);
  const daily = [4, 7, 3, 9, 5, 12, 8, 6, 10, 4, 7, 11, 3, 9];
  const weekly = [22, 38, 30, 45, 28, 50, 35];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const pad = 20;

    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = '#c8e6ce';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad + ((H - pad * 2) / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(W - pad, y);
      ctx.stroke();
    }

    const drawLine = (points, color, fillTop, fillBot) => {
      const xStep = (W - pad * 2) / (points.length - 1);
      const maxVal = Math.max(...points);
      const coords = points.map((v, i) => ({
        x: pad + i * xStep,
        y: H - pad - (v / maxVal) * (H - pad * 2),
      }));

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      coords.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
      ctx.stroke();

      const grad = ctx.createLinearGradient(0, pad, 0, H - pad);
      grad.addColorStop(0, fillTop);
      grad.addColorStop(1, fillBot);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(coords[0].x, H - pad);
      coords.forEach((pt) => ctx.lineTo(pt.x, pt.y));
      ctx.lineTo(coords[coords.length - 1].x, H - pad);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = color;
      coords.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const expanded = daily.map((_, i) => {
      const wIdx = Math.floor((i / daily.length) * weekly.length);
      return weekly[Math.min(wIdx, weekly.length - 1)] / 3;
    });

    drawLine(expanded, '#7bbf8e', '#a8d5b555', '#a8d5b500');
    drawLine(daily, '#1a8c45', '#3cb96a44', '#3cb96a00');

    ctx.font = "10px 'DM Mono', monospace";
    ctx.fillStyle = '#1a8c45';
    ctx.fillText('● Daily', W - 115, 14);
    ctx.fillStyle = '#7bbf8e';
    ctx.fillText('● Weekly', W - 65, 14);
  }, []);

  return (
    <canvas ref={canvasRef} width={500} height={130}
      style={{ width: '100%', height: '100%', display: 'block' }} />
  );
};

// ── Ratio Bar ──
const RatioBar = ({ label, value }) => {
  const pct = Math.round(value * 100);
  return (
    <div className="ratio-bar-wrap">
      <div className="ratio-bar-header">
        <span className="ratio-label">{label}</span>
        <span className="ratio-value">{pct}%</span>
      </div>
      <div className="ratio-track">
        <div className="ratio-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

// ── Main Page ──
const ResultPage = () => {
  const d = devData;

  return (
    <div className="dashboard-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Commit DNA</div>
        <div className="nav-links">
          <button>Home</button>
          <button className="active">Dashboard</button>
          <button>About</button>
        </div>
      </nav>

      {/* ── Top Main Card ── */}
      <div className="main-card">
        <p className="card-header">Developer DNA Core: Insights & Activity</p>

        <div className="stats-grid">
          {/* Profile */}
          <div className="profile-info">
            <h1>{d.developerName}</h1>
            <p className="sub-label">Developer Name</p>
            <div className="total-commits">{d.totalCommits}</div>
            <p className="sub-label">Total Commits</p>
          </div>

          {/* Commit Behavior */}
          <div className="commit-behavior">
            <h3>Commit Behavior</h3>
            <div className="behavior-grid">
              <div className="stat-item"><span>Bug Rate:</span><strong>{(d.bugRate * 100).toFixed(1)}%</strong></div>
              <div className="stat-item"><span>Refactor Rate:</span><strong>{(d.refactorRate * 100).toFixed(1)}%</strong></div>
              <div className="stat-item"><span>Night Ratio:</span><strong>{(d.nightRatio * 100).toFixed(1)}%</strong></div>
              <div className="stat-item"><span>Weekend Ratio:</span><strong>{(d.weekendRatio * 100).toFixed(1)}%</strong></div>
              <div className="stat-item"><span>Commit Spike:</span><strong>{(d.commitSpike * 100).toFixed(1)}%</strong></div>
              <div className="stat-item"><span>Total Commits:</span><strong>{d.totalCommits}</strong></div>
            </div>
            <div className="weekend-tag">Weekend Coding ({(d.weekendRatio * 100).toFixed(1)}%)</div>
          </div>
        </div>
      </div>

      {/* ── Middle Row: Speedometer + Ratio Bars ── */}
      <div className="middle-grid">

        {/* Speedometer */}
        <div className="sub-card center-card">
          <h3>Bug Rate Meter</h3>
          <Speedometer value={d.bugRate} max={1} label="Bug Rate" />
          <p className="meter-note">
            {d.bugRate < 0.1 ? '✅ Excellent — very low bug rate' :
             d.bugRate < 0.25 ? '⚠️ Moderate — keep an eye on bugs' :
             '🔴 High — needs attention'}
          </p>
        </div>

        {/* Ratio Bars */}
        <div className="sub-card">
          <h3>Behavioral Ratios</h3>
          <div className="ratios-list">
            <RatioBar label="Night Coding Ratio" value={d.nightRatio} />
            <RatioBar label="Weekend Ratio" value={d.weekendRatio} />
            <RatioBar label="Bug Rate" value={d.bugRate} />
            <RatioBar label="Refactor Rate" value={d.refactorRate} />
            <RatioBar label="Commit Spike" value={d.commitSpike} />
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="bottom-grid">
        <div className="sub-card">
          <h3>Primary Dev Language</h3>
          <span className="highlight-text">{d.primaryLanguage}</span>
          <p>Focus Area: <strong>{d.focusArea}</strong></p>
          <p>Code Velocity: <span className="velocity-badge">{d.codeVelocity}</span></p>
        </div>

        <div className="sub-card">
          <h3>Recent Activity Trend</h3>
          <div style={{ height: '130px', marginTop: '12px' }}>
            <MiniChart />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResultPage;