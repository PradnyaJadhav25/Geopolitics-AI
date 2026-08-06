import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { marketData, recentEvents } from '../data/mockData';

// Custom tooltip for dark mode support
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
          Value: ${payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Market() {
  const [timeFilter, setTimeFilter] = useState('7 days');
  const [showEvents, setShowEvents] = useState(false);

  const timeFilters = ['7 days', '30 days', '3 months'];

  // Extend trends for longer periods
  const getTrends = () => {
    if (timeFilter === '30 days') {
      return marketData.trends.concat(Array(23).fill().map((_, i) => ({day: `D${i}`, value: 5200 + Math.random()*200})));
    }
    return marketData.trends;
  };

  const marketImpact = [
    { event: 'US Fed Rate Cut', impact: '+2.8%', time: '2 days ago' },
    { event: 'China GDP Data', impact: '-1.2%', time: '5 days ago' },
    { event: 'Oil Supply Cut', impact: '+4.5%', time: '1 week ago' }
  ];

  return (
    <div>
      {/* Filters */}
      <div className="mb-5 p-3 rounded-3" style={{backgroundColor: '#1e2140', border: '1px solid rgba(124,111,212,0.3)'}}>
        <div className="d-flex gap-2 flex-wrap">
          {timeFilters.map(filter => (
            <button 
              key={filter}
              className="btn rounded-pill px-3"
              style={timeFilter === filter ? {
                backgroundColor: '#5449d6',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50px',
                padding: '6px 16px'
              } : {
                background: 'transparent',
                border: '1px solid rgba(124,111,212,0.5)',
                color: '#9490c8',
                borderRadius: '50px',
                padding: '6px 16px'
              }}
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
          <button 
            className="btn rounded-pill px-3 ms-auto"
            style={{
              background: 'transparent',
              border: '1px solid rgba(45,212,191,0.5)',
              color: '#2DD4BF',
              borderRadius: '50px',
              padding: '6px 16px'
            }}
            onClick={() => setShowEvents(!showEvents)}
          >
            {showEvents ? 'Hide' : 'Show'} Event Overlay
          </button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="display-6 fw-bold text-success mb-1">24,150</h2>
              <p className="h6 mb-2">Nifty 50</p>
              <span className="badge bg-success fs-6">+1.8%</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="display-6 fw-bold text-primary mb-1">5,287</h2>
              <p className="h6 mb-2">S&P 500</p>
              <span className="badge bg-primary fs-6">+1.2%</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="display-6 fw-bold text-warning mb-1">$2,385</h2>
              <p className="h6 mb-2">Gold (oz)</p>
              <span className="badge bg-warning fs-6">+0.8%</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="display-6 fw-bold text-info mb-1">$82.30</h2>
              <p className="h6 mb-2">Brent Oil</p>
              <span className="badge bg-info fs-6">+1.5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* Main Chart */}
        <div className="col-lg-9">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-transparent pb-0 d-flex justify-content-between">
              <h5 className="mb-0 fw-bold">Market Trends ({timeFilter})</h5>
              <small className="text-muted">{getTrends().length} data points</small>
            </div>
            <div className="card-body p-0" style={{height: '500px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getTrends()}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
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
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6f42c1" 
                    strokeWidth={3} 
                    dot={{fill: '#6f42c1'}} 
                    activeDot={{r: 8, strokeWidth: 3}}
                  />
                  {showEvents && (
                    <Line type="monotone" dataKey="events" stroke="#dc3545" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  )}
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Event Correlation */}
        <div className="col-lg-3">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Event Correlation</h5>
            </div>
            <div className="card-body py-3">
              {marketImpact.map((item, index) => (
                <div key={index} className="mb-3" style={{
                  backgroundColor: '#1e2140',
                  border: '1px solid rgba(124,111,212,0.25)',
                  borderRadius: '10px',
                  padding: '12px'
                }}>
                  <div className="d-flex justify-content-between">
                    <small style={{color: '#ffffff', fontSize: '13px', fontWeight: 500}}>{item.event}</small>
                    <span className={`badge fs-6 ${item.impact.startsWith('+') ? 'bg-success' : 'bg-danger'}`}>
                      {item.impact}
                    </span>
                  </div>
                  <small style={{color: '#9490c8', fontSize: '11px', display: 'block'}}>{item.time}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

