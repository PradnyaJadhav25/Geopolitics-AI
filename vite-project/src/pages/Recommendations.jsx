import { useState } from 'react';
import { recommendations } from '../data/mockData';

export default function Recommendations() {
  const [filter, setFilter] = useState('All');
  const [filteredRecs, setFilteredRecs] = useState(recommendations);
  const [applied, setApplied] = useState({});
  const [showSources, setShowSources] = useState({});

  const filters = ['All', 'High Risk', 'Medium', 'Low'];

  const handleFilter = (riskLevel) => {
    if (riskLevel === 'All') {
      setFilteredRecs(recommendations);
    } else {
      setFilteredRecs(recommendations.filter(rec => {
        if (riskLevel === 'High Risk') return rec.priority === 'high'
        if (riskLevel === 'Medium') return rec.priority === 'medium'
        if (riskLevel === 'Low') return rec.priority === 'low'
        return true
      }));
    }
    setFilter(riskLevel);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning text-dark';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  // Sort high risk first
  const sortedRecs = filteredRecs.sort((a, b) => {
    const priority = { high: 3, medium: 2, low: 1 };
    return priority[b.risk] - priority[a.risk];
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-5">
        <div className="d-flex flex-wrap gap-2">
          {filters.map(f => (
            <button 
              key={f} 
              className={`rounded-pill px-4 py-2 ${filter === f ? 'btn btn-primary' : 'btn btn-outline-primary'}`}
              onClick={() => handleFilter(f)}
            >
              {f === 'All' ? `${f} (${recommendations.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="row g-4">
        {sortedRecs.map((rec) => (
          <div key={rec.id} className="col-xl-4 col-lg-6">
            <div className="card h-100 shadow-lg border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title mb-0 fw-bold flex-grow-1">{rec.title}</h5>
                  <span className={`badge fs-6 px-3 py-2 ms-2 ${getRiskColor(rec.risk)}`}>
                    {rec.risk}
                  </span>
                </div>
                <p className="card-text text-muted">{rec.description}</p>
                <div className="row g-2 mb-3">
                  <div className="col">
                    <small className="text-success fw-bold">Confidence: {rec.confidence}%</small>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">{rec.country}</small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <small className="text-muted">{rec.time}</small>
                  <span
  onClick={() => setShowSources(prev => ({
    ...prev, [rec.id]: !prev[rec.id]
  }))}
  style={{cursor:'pointer', 
          backgroundColor:'rgba(84,73,214,0.2)',
          color:'#a89ef5',
          border:'1px solid rgba(124,111,212,0.4)',
          borderRadius:'20px',
          fontSize:'11px',
          padding:'2px 10px'}}>
  3 sources
</span>

{showSources[rec.id] && (
  <div style={{
    backgroundColor:'#1e2140',
    border:'1px solid rgba(124,111,212,0.3)',
    borderRadius:'8px',
    padding:'10px',
    marginTop:'6px',
    fontSize:'12px',
    color:'#9490c8'
  }}>
    <div>• Reuters News API</div>
    <div>• World Bank Data</div>
    <div>• UN Economic Reports</div>
  </div>
)}
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 pt-0">
                <button
  onClick={() => setApplied(prev => ({
    ...prev, [rec.id]: true
  }))}
  disabled={applied[rec.id]}
  className="btn w-100 rounded-3"
  style={{
    border: applied[rec.id] 
      ? '1px solid #22c55e' 
      : '1px solid #5449d6',
    color: applied[rec.id] 
      ? '#22c55e' 
      : '#a89ef5',
    backgroundColor: applied[rec.id]
      ? 'rgba(34,197,94,0.1)'
      : 'transparent',
    transition: 'all 0.3s'
  }}>
  {applied[rec.id] 
    ? '✓ Recommendation Applied' 
    : 'Apply Recommendation'}
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecs.length === 0 && (
        <div className="text-center py-5">
          <div className="display-4 text-muted mb-3">📭</div>
          <h4 className="text-muted mb-3">No recommendations match this filter</h4>
          <button className="btn btn-outline-primary" onClick={() => setFilter('All')}>Show All</button>
        </div>
      )}
    </div>
  );
}

