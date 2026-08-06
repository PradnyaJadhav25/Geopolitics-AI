import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dashboardStats, eventTrends, recentEvents, topCountries } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  const isDark = document.body.getAttribute('data-bs-theme') === 'dark' || 
                 document.body.classList.contains('dark-mode');
  
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: isDark ? '#1e2140' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(124,111,212,0.4)' : 'rgba(84,73,214,0.2)'}`,
          borderRadius: '8px',
          padding: '10px',
          boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <p style={{color: isDark ? '#ffffff' : '#1a1435', margin: '0 0 4px 0', fontWeight: 'bold'}}>
          {label}
        </p>
        <p style={{color: isDark ? '#a89ef5' : '#5449d6', margin: '0', fontSize: '13px'}}>
          Events: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'negative' || sentiment === 'high') return 'danger';
    if (sentiment === 'medium') return 'warning';
    return 'success';
  };

  const getTrendIcon = (trend) => {
    if (trend.includes('+') || trend.includes('↑')) return '↗️';
    if (trend.includes('-') || trend.includes('↓')) return '↘️';
    return '➡️';
  };

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <p className="text-muted mb-5">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

      {/* Stats Grid */}
      <div className="row g-4 mb-5">
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-primary mb-1">{dashboardStats.totalCountries.toLocaleString()}</h2>
              <p className="text-muted mb-1">Countries</p>
              <small className="text-success fw-bold">↗️ All time</small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-info mb-1">{dashboardStats.activeEvents}</h2>
              <p className="text-muted mb-1">Active Events</p>
              <small className="text-warning fw-bold">+18% WoW</small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-warning mb-1">{dashboardStats.avgRiskScore}</h2>
              <p className="text-muted mb-1">Avg Risk Score</p>
              <small className="text-danger fw-bold">↗️ Trending up</small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-success mb-1">{dashboardStats.recommendationsCount}</h2>
              <p className="text-muted mb-1">Recommendations</p>
              <small className="text-info fw-bold">New today</small>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Alerts */}
      <div className="row g-5 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="mb-0 fw-bold">Event Trends (7 days)</h5>
            </div>
            <div className="card-body p-0" style={{height: '400px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eventTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip
  contentStyle={{
    backgroundColor: '#1e2140',
    border: '1px solid rgba(124,111,212,0.4)',
    borderRadius: '10px',
    color: '#ffffff',
    padding: '10px 14px',
    boxShadow: 'none'
  }}
  labelStyle={{ 
    color: '#ffffff', 
    fontWeight: 600,
    marginBottom: '4px',
    fontSize: '13px'
  }}
  itemStyle={{ 
    color: '#a89ef5',
    fontSize: '13px'
  }}
  cursor={{ 
    fill: 'rgba(124,111,212,0.1)' 
  }}
/>
                  <Legend />
                  <Line type="monotone" dataKey="events" stroke="#6f42c1" strokeWidth={3} dot={{fill: '#6f42c1', strokeWidth: 2}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="mb-0 fw-bold">Recent Alerts</h5>
            </div>
            <ul className="list-group list-group-flush">
              {recentEvents.map((event) => (
                <li key={event.id} className="list-group-item px-0 border-0 py-3 hover-bg">
                  <div className="d-flex align-items-center">
                    <span className={`badge bg-${getSentimentColor(event.sentiment)} rounded-pill me-3 fs-6`}>●</span>
                    <div>
                      <h6 className="mb-1 fw-bold">{event.title}</h6>
                      <small className="text-muted">{event.country} • {event.type}</small>
                      <br />
                      <small className="text-muted">{event.time}</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Top Countries Table */}
      <div className="card border-0 shadow-lg">
        <div className="card-header bg-transparent border-0 pb-0">
          <h5 className="mb-0 fw-bold">Top Risk Countries</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Country</th>
                <th>Risk Score</th>
                <th>Active Events</th>
                <th>Trend</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.map((country) => (
                <tr key={country.rank}>
                  <td><strong>{country.rank}</strong></td>
                  <td><img src={`https://flagcdn.com/24x18/${country.country.toLowerCase().slice(0,2)}.png`} alt="" className="me-2 rounded" /> {country.country}</td>
                  <td><span className="badge bg-info">{country.score}</span></td>
                  <td>{country.events}</td>
                  <td><span className="fw-bold">{getTrendIcon(country.trend)} {country.trend}</span></td>
                  <td>
{country.risk === 'high' && <span className="badge bg-danger">High</span>}
{country.risk === 'medium' && <span className="badge bg-warning">Medium</span>}
{country.risk === 'low' && <span className="badge bg-success">Low</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .hover-shadow {
          transition: all 0.2s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
        }
        .hover-bg:hover {
          background-color: rgba(0,0,0,0.04) !important;
        }
      `}</style>
    </div>
  );
}

