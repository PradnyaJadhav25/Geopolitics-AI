import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fundData } from '../data/mockData';

// Custom tooltip for dark mode support
const CustomTooltip = ({ active, payload }) => {
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
          {payload[0].payload.name}
        </p>
        <p style={{color: isDark ? '#a89ef5' : '#5449d6', margin: '0', fontSize: '13px'}}>
          Utilisation: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Funds() {
  const [country, setCountry] = useState('Global');
  const [year, setYear] = useState('2024');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(fundData);

  const countries = ['Global', 'India', 'USA', 'China'];
  const years = ['2023', '2024', '2025'];
  const sectors = ['All', 'Tech', 'Energy', 'Defense', 'Agriculture'];

  const handleApplyFilters = () => {
    let data = fundData;
    if (sectorFilter !== 'All') {
      data = data.filter(f => f.sector === sectorFilter);
    }
    setFilteredData(data);
  };

  // Stats
  const totalAllocated = filteredData.reduce((sum, f) => sum + f.allocated, 0);
  const totalSpent = filteredData.reduce((sum, f) => sum + f.spent, 0);
  const underutilised = filteredData.filter(f => f.utilization < 70).length;
  const onTrack = filteredData.filter(f => f.utilization >= 80).length;

  // Chart data
  const chartData = filteredData.map(f => ({
    name: f.sector,
    utilisation: f.utilization,
    allocated: f.allocated,
    spent: f.spent
  }));

  const getColor = (util) => {
    if (util < 70) return 'bg-danger';
    if (util < 80) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusColor = (util) => {
    if (util < 70) return 'bg-danger';
    if (util < 80) return 'bg-warning text-dark';
    return 'bg-success';
  };

  return (
    <div>
      <div className="mb-3">
        <h4 style={{color: '#ffffff', fontWeight: 600, marginBottom: '4px'}}>
          Fund Tracking
        </h4>
        <p style={{color: '#9490c8', fontSize: '13px', margin: 0}}>
          Monitor fund allocation and utilisation across sectors
        </p>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-5 p-4 rounded-4 shadow" style={{backgroundColor: '#1e2140', border: '1px solid rgba(124,111,212,0.3)', borderRadius: '12px'}}>
        <div className="col-md-3">
          <label className="form-label fw-bold small" style={{color: '#9490c8', fontSize: '12px'}}>Country</label>
          <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label fw-bold small" style={{color: '#9490c8', fontSize: '12px'}}>Year</label>
          <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold small" style={{color: '#9490c8', fontSize: '12px'}}>Sector</label>
          <select className="form-select" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
            {sectors.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card border-start border-5 border-primary h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-primary mb-1">${totalAllocated.toLocaleString()}</h2>
              <p className="h5 mb-1">Total Allocated</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-5 border-info h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-info mb-1">${totalSpent.toLocaleString()}</h2>
              <p className="h5 mb-1">Total Spent</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-5 border-warning h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-warning mb-1">{underutilised}</h2>
              <p className="h5 mb-1">Underutilised</p>
              <small className="text-danger">⚠️</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-5 border-success h-100 shadow-sm">
            <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-success mb-1">{onTrack}</h2>
              <p className="h5 mb-1">On Track</p>
              <small className="text-success">✅</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* Funds Table */}
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Fund Allocation Details ({filteredData.length} sectors)</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Sector</th>
                    <th>Allocated</th>
                    <th>Spent</th>
                    <th>Utilisation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((fund, index) => (
                    <tr key={index} className={fund.utilization < 70 ? 'table-danger' : ''}>
                      <td><strong>{fund.sector}</strong></td>
                      <td>${fund.allocated.toLocaleString()}</td>
                      <td>${fund.spent.toLocaleString()}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress flex-grow-1 me-2" style={{height: '8px'}}>
                            <div className={`progress-bar ${getColor(fund.utilization)}`} style={{width: `${fund.utilization}%`}} />
                          </div>
                          <span className="fw-bold">{fund.utilization}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge fs-6 ${getStatusColor(fund.utilization)}`}>
                          {fund.utilization < 70 ? 'Underutilised' : fund.utilization < 80 ? 'Moderate' : 'On Track'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Utilisation Chart</h5>
            </div>
            <div className="card-body p-0" style={{height: '400px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
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
                  <Bar dataKey="utilisation" fill="#6f42c1" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

