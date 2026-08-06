import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countryCompareData, topCountries } from '../data/mockData';

const indicators = [
  'Stability Score',
  'GDP Growth',
  'Event Frequency',
  'Risk Level',
  'Diplomatic Relations'
];

export default function Compare() {
  const [selectedCountries, setSelectedCountries] = useState(['India', 'China', 'USA']);
  const [availableCountries] = useState(topCountries.map(c => c.country).slice(0, 12));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const mockData = countryCompareData.map((data, index) => ({
    ...data,
    stability: data.stability + (index * 2),
    gdp: data.gdp - (index * 0.2)
  })).slice(0, selectedCountries.length);

  const addCountry = () => {
    const newCountry = availableCountries.find(c => !selectedCountries.includes(c));
    if (newCountry) {
      setSelectedCountries([...selectedCountries, newCountry]);
    }
  };

  const removeCountry = (country) => {
    setSelectedCountries(selectedCountries.filter(c => c !== country));
  };

  const exportCSV = () => {
    alert('Export CSV - ' + selectedCountries.join(', '));
  };

  return (
    <div>
      {/* Country Chips */}
      <div className="mb-5">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {selectedCountries.map((country) => (
            <span key={country} className="badge bg-primary p-3 fs-6 shadow-sm position-relative">
              {country}
              <button 
                className="btn-close btn-close-white ms-2 position-absolute top-50 translate-middle-y" 
                style={{right: 0}}
                onClick={() => removeCountry(country)}
              />
            </span>
          ))}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success" onClick={addCountry}>
            + Add Country
          </button>
          <button className="btn btn-outline-secondary" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-header bg-transparent pb-0">
          <h3 className="mb-0 fw-bold">Country Comparison</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Indicator</th>
                {selectedCountries.map(country => (
                  <th key={country} className="text-center">
                    <img src={`https://flagcdn.com/24x18/${country.toLowerCase().slice(0,2)}.png`} alt="" className="me-1 rounded" />
                    {country}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {indicators.map((indicator, index) => (
                <tr key={indicator}>
                  <td className="fw-bold">{indicator}</td>
                  {selectedCountries.map((country, cIndex) => {
                    const score = Math.floor(Math.random() * 30 + 70);
                    return (
                      <td key={country} className="text-center">
                        <div className="mb-2">
                          <small className="text-muted">{score}%</small>
                        </div>
                        <div className="progress" style={{height: '8px'}}>
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{width: `${score}%`, backgroundColor: score > 85 ? '#28a745' : score > 70 ? '#ffc107' : '#dc3545'}}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="row g-3 align-items-stretch">
        <div className="col-md-6 d-flex">
          <div className="card shadow border-0 w-100">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0 fw-bold">Recommendation</h6>
            </div>
            <div className="card-body">
              <h5 className="fw-bold text-primary">India outperforms in stability</h5>
              <p className="text-muted">Consider increasing allocation by 15% while monitoring China risk exposure.</p>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>View Details</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card shadow border-0 w-100">
            <div className="card-header bg-danger text-white">
              <h6 className="mb-0 fw-bold">Alert</h6>
            </div>
            <div className="card-body">
              <h5 className="fw-bold text-danger">China-US tensions rising</h5>
              <p className="text-muted">Risk score increased 2.3 points this week.</p>
              <button className="btn btn-outline-danger" onClick={() => navigate('/geopolitics')}>Risk Assessment</button>
            </div>
          </div>
        </div>
        {showModal && (
          <div style={{
            position:'fixed', top:0, left:0,
            width:'100%', height:'100%',
            backgroundColor:'rgba(0,0,0,0.6)',
            display:'flex', alignItems:'center',
            justifyContent:'center', zIndex:1000
          }}>
            <div style={{
              backgroundColor:'#1e2140',
              border:'1px solid rgba(124,111,212,0.3)',
              borderRadius:'16px', padding:'28px',
              width:'460px', maxWidth:'90%'
            }}>
              <h5 style={{color:'#ffffff', marginBottom:'16px'}}>
                Recommendation Details
              </h5>

              <div style={{
                backgroundColor:'rgba(84,73,214,0.1)',
                border:'1px solid rgba(124,111,212,0.2)',
                borderRadius:'10px', padding:'16px',
                marginBottom:'16px'
              }}>
                <p style={{color:'#a89ef5', fontWeight:600, margin:0}}>
                  India outperforms in stability
                </p>
              </div>

              <table style={{width:'100%', marginBottom:'20px'}}>
                <tbody>
                  <tr>
                    <td style={{color:'#9490c8', fontSize:'13px', 
                                paddingBottom:'10px'}}>
                      Suggested Action
                    </td>
                    <td style={{color:'#ffffff', fontSize:'13px',
                                textAlign:'right', paddingBottom:'10px'}}>
                      Increase allocation by 15%
                    </td>
                  </tr>
                  <tr>
                    <td style={{color:'#9490c8', fontSize:'13px',
                                paddingBottom:'10px'}}>
                      Confidence Score
                    </td>
                    <td style={{color:'#22c55e', fontSize:'13px',
                                textAlign:'right', paddingBottom:'10px',
                                fontWeight:600}}>
                      92%
                    </td>
                  </tr>
                  <tr>
                    <td style={{color:'#9490c8', fontSize:'13px',
                                paddingBottom:'10px'}}>
                      Monitor
                    </td>
                    <td style={{color:'#ffffff', fontSize:'13px',
                                textAlign:'right', paddingBottom:'10px'}}>
                      China risk exposure
                    </td>
                  </tr>
                  <tr>
                    <td style={{color:'#9490c8', fontSize:'13px'}}>
                      Source
                    </td>
                    <td style={{color:'#ffffff', fontSize:'13px',
                                textAlign:'right'}}>
                      Geopolitical Analysis Engine
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  className="btn btn-sm rounded-pill px-3"
                  style={{border:'1px solid rgba(124,111,212,0.3)',
                          color:'#9490c8'}}
                  onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button
                  className="btn btn-sm btn-primary rounded-pill px-3"
                  onClick={() => {
                    setShowModal(false)
                    navigate('/geopolitics')
                  }}>
                  View Full Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
