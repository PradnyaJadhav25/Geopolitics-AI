import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { topCountries, recentEvents } from '../data/mockData';

const countries = topCountries.map(c => c.country);
const timeRanges = ['7 days', '30 days', '90 days', '1 year'];

// Shared tooltip config generator
const CustomTooltip = ({ active, payload, label }) => {
  const isDark = document.body.getAttribute('data-bs-theme') === 'dark' || 
                 document.body.classList.contains('dark-mode');
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: isDark ? '#1e2140' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(124,111,212,0.4)' : 'rgba(84,73,914,0.2)'}`,
        borderRadius: '8px',
        padding: '10px',
        boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <p style={{color: isDark ? '#ffffff' : '#1a1435', margin: '0 0 4px 0', fontWeight: 'bold'}}>
          {label}
        </p>
        <p style={{color: isDark ? '#a89ef5' : '#5449d6', margin: '0', fontSize: '13px'}}>
          Score: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Geopolitics() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [timeRange, setTimeRange] = useState(timeRanges[0]);

  // Mock stability trend data
  const stabilityTrend = [
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 74 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 82 }
  ];

  // Mock stats for selected country
  const stats = {
    stabilityScore: 78.5,
    eventsThisMonth: 23,
    globalRank: '#4',
    sentiment: 'neutral'
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'negative' || sentiment === 'high') return 'danger';
    if (sentiment === 'medium') return 'warning';
    return 'success';
  };

  return (
    <div>
      <h1 className="h2 fw-bold mb-2 text-body">
        Geopolitical Analysis
      </h1>
      <p className="small mb-4 text-body-secondary">
        Select a country to view detailed intelligence report
      </p>

      <hr className="border my-4" />

      {/* Header Controls - Compact Bootstrap card */}
      <div className="mt-4">
        <div className="d-inline-flex p-3 rounded-3 shadow-sm border mb-4" style={{
          position: 'relative'
        }}>
          <div className="d-flex gap-2 align-items-center">
            <div className="dropdown">
          <button className="btn btn-outline-primary dropdown-toggle py-1 px-3 small" type="button" data-bs-toggle="dropdown">
                {selectedCountry}
              </button>

              <ul className="dropdown-menu">
                {countries.map(country => (
                  <li key={country}>
                    <button className="dropdown-item" onClick={() => setSelectedCountry(country)}>
                      {country}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
          <button className="btn btn-outline-primary dropdown-toggle py-1 px-3 small" type="button" data-bs-toggle="dropdown">
                {timeRange}
              </button>

              <ul className="dropdown-menu">
                {timeRanges.map(range => (
                  <li key={range}>
                    <button className="dropdown-item" onClick={() => setTimeRange(range)}>
                      {range}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn btn-primary py-1 px-3 small">Generate Report</button>
            <button className="btn btn-outline-secondary py-1 px-3 small">
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h2 className="display-6 fw-bold text-primary mb-1">{stats.stabilityScore}%</h2>
              <p className="text-muted mb-1">Stability Score</p>
              <small className="text-success d-flex align-items-center justify-content-center">
                <span style={{marginRight: '4px'}}>↗️</span>+3.2%
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h2 className="display-6 fw-bold text-info mb-1">{stats.eventsThisMonth}</h2>
              <p className="text-muted mb-1">Events This Month</p>
              <small className="text-warning">Monthly</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h2 className="display-6 fw-bold text-warning mb-1">{stats.globalRank}</h2>
              <p className="text-muted mb-1">Global Rank</p>
              <small className="text-success">Rising</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h2 className="display-6 fw-bold text-info mb-1">{stats.sentiment.toUpperCase()}</h2>
              <p className="text-muted mb-1">Sentiment</p>
              <small className="text-success">Overall</small>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Events */}
      <div className="row g-5 mb-5">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Stability Trend</h5>
            </div>
            <div className="card-body p-0" style={{height: '400px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stabilityTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                  <Bar dataKey="score" fill="#6f42c1" radius={[4, 4, 0, 0]} 
                    cursor="pointer"
                    onMouseEnter={(state) => {
                      if (state.isAnimationActive === false) {
                        document.body.style.cursor = 'pointer';
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Recent Events Timeline</h5>
            </div>
            <div className="list-group list-group-flush">
              {recentEvents.map((event) => (
                <div key={event.id} className="list-group-item px-0 border-0 py-3">
                  <div className="d-flex align-items-start">
                    <span className={`badge bg-${getSentimentColor(event.sentiment)} rounded-circle me-3 mt-1 fs-6`} style={{width: '12px', height: '12px'}}>•</span>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{event.title}</h6>
                      <small>{event.country} • {event.time}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Country Rankings Table */}
      <div className="card shadow-lg border-0">
        <div className="card-header bg-transparent pb-0">
          <h5 className="mb-0 fw-bold">Country Risk Rankings</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.slice(0,10).map((country) => (
                <tr key={country.rank}>
                  <td><strong>{country.rank}</strong></td>
                  <td>{country.country}</td>
                  <td><span className="badge bg-info">{country.score}</span></td>
                  <td>
                    <span className={`badge bg-${country.risk === 'high' ? 'danger' : country.risk === 'medium' ? 'warning' : 'success'}`}>
                      {country.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

