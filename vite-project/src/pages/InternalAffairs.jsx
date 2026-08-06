import { useState } from 'react';
import { fundData, recommendations } from '../data/mockData';

const countryData = {
  India: {
    governance: 76, healthcare: 82, 
    education: 68, infrastructure: 71,
    govStatus: 'Excellent', healthStatus: 'Excellent',
    eduStatus: 'Needs Attention', infraStatus: 'Needs Attention',
    insights: [
      { id:'P2', title:'Increase Russian assets hedge', 
        confidence:92, priority:'high', date:'2024-04-14' },
      { id:'P4', title:'Middle East volatility watch', 
        confidence:89, priority:'high', date:'2024-04-12' }
    ]
  },
  China: {
    governance: 71, healthcare: 74,
    education: 88, infrastructure: 92,
    govStatus: 'Good', healthStatus: 'Good',
    eduStatus: 'Excellent', infraStatus: 'Excellent',
    insights: [
      { id:'P1', title:'Trade war escalation risk',
        confidence:94, priority:'high', date:'2024-04-15' },
      { id:'P3', title:'Tech sector investment opportunity',
        confidence:87, priority:'medium', date:'2024-04-13' }
    ]
  },
  USA: {
    governance: 85, healthcare: 78,
    education: 91, infrastructure: 83,
    govStatus: 'Excellent', healthStatus: 'Good',
    eduStatus: 'Excellent', infraStatus: 'Excellent',
    insights: [
      { id:'P1', title:'Federal Reserve policy impact',
        confidence:91, priority:'high', date:'2024-04-15' },
      { id:'P2', title:'Election cycle market volatility',
        confidence:85, priority:'medium', date:'2024-04-14' }
    ]
  },
  Russia: {
    governance: 52, healthcare: 61,
    education: 74, infrastructure: 68,
    govStatus: 'Needs Attention', healthStatus: 'Needs Attention',
    eduStatus: 'Good', infraStatus: 'Good',
    insights: [
      { id:'P1', title:'Sanctions impact on economy',
        confidence:96, priority:'high', date:'2024-04-15' },
      { id:'P2', title:'Energy sector instability',
        confidence:88, priority:'high', date:'2024-04-13' }
    ]
  },
  Germany: {
    governance: 88, healthcare: 91,
    education: 89, infrastructure: 87,
    govStatus: 'Excellent', healthStatus: 'Excellent',
    eduStatus: 'Excellent', infraStatus: 'Excellent',
    insights: [
      { id:'P3', title:'EU energy transition leadership',
        confidence:82, priority:'medium', date:'2024-04-14' },
      { id:'P4', title:'Manufacturing sector growth',
        confidence:79, priority:'low', date:'2024-04-12' }
    ]
  }
};

export default function InternalAffairs() {
  const [selectedCountry, setSelectedCountry] = useState('India')
  const data = countryData[selectedCountry]

  const getColorClass = (score) => {
    if (score < 65) return 'bg-danger';
    if (score < 80) return 'bg-warning';
    return 'bg-success';
  };

  const sectors = [
    { name: 'Governance', score: data.governance, status: data.govStatus },
    { name: 'Healthcare', score: data.healthcare, status: data.healthStatus },
    { name: 'Education', score: data.education, status: data.eduStatus },
    { name: 'Infrastructure', score: data.infrastructure, status: data.infraStatus }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex gap-2">
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="form-select"
                style={{
                  backgroundColor:'#1e2140',
                  border:'1px solid rgba(124,111,212,0.4)',
                  color:'#ffffff', borderRadius:'10px',
                  padding:'10px 16px', maxWidth:'300px'
                }}>
                <option>India</option>
                <option>China</option>
                <option>USA</option>
                <option>Russia</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {sectors.map((sector) => (
          <div key={sector.name} className="col-lg-3 col-md-6">
            <div className="card h-100 shadow-sm border-start border-5 border-primary">
              <div className="card-body text-center">
                <h2 className="display-6 fw-bold text-primary mb-1">{sector.score}%</h2>
                <p className="h5 fw-bold mb-1">{sector.name}</p>
                <small className={`text-${sector.status === 'Excellent' ? 'success' : sector.status === 'Good' ? 'warning' : 'danger'}`}>
                  {sector.status}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-5">
        {/* Progress Bars */}
        <div className="col-lg-7">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Sector Performance</h5>
            </div>
            <div className="card-body py-4">
              {sectors.map((sector) => (
                <div key={sector.name} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="h6 fw-bold">{sector.name}</span>
                    <span className="fw-bold">{sector.score}%</span>
                  </div>
                  <div className="progress" style={{height: '12px'}}>
                    <div 
                      className={`progress-bar ${getColorClass(sector.score)}`} 
                      role="progressbar"
                      style={{width: `${sector.score}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">AI Internal Affairs Insights</h5>
            </div>
            <div className="card-body py-3">
              <div className="list-group list-group-flush">
                {data.insights.map((insight) => (
                  <div key={insight.id} className="list-group-item px-0 border-0 py-3">
                    <div className="d-flex align-items-start">
                      <span className="badge me-3 mt-1 fs-6 bg-danger">
                        {insight.id}
                      </span>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{insight.title}</h6>
                        <div className="mb-1">
                          <small className="text-muted">Confidence: {insight.confidence}%</small>
                          <span className="badge bg-light text-dark ms-2">{insight.priority}</span>
                        </div>
                        <small className="text-muted">{insight.date}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

