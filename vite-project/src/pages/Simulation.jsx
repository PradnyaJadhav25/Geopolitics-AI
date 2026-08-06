import { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { simulationResult } from '../data/mockData';

export default function Simulation() {
  const [scenarioName, setScenarioName] = useState('');
  const [country, setCountry] = useState('India');
  const [gdpChange, setGdpChange] = useState(0);
  const [conflictIntensity, setConflictIntensity] = useState('Low');
  const [tradeRestriction, setTradeRestriction] = useState('None');
  const [politicalStability, setPoliticalStability] = useState('Stable');
  const [savedScenarios, setSavedScenarios] = useState([
    { name: 'India Crisis 2024', date: '2 days ago', confidence: 87 },
    { name: 'China Trade War', date: '1 week ago', confidence: 92 }
  ]);

  const [gdpImpact, setGdpImpact] = useState(-3.8)
  const [recovery, setRecovery] = useState(12)
  const [chartData, setChartData] = useState([
    { name:'GDP Impact', value:-12, 
      fill:'rgba(239,68,68,0.7)' },
    { name:'Risk Increase', value:32, 
      fill:'rgba(84,73,214,0.7)' },
    { name:'Recovery (mo)', value:8, 
      fill:'rgba(84,73,214,0.7)' },
    { name:'Volatility', value:25, 
      fill:'rgba(84,73,214,0.7)' }
  ])

  const countries = ['India', 'China', 'USA', 'Russia', 'Brazil', 'Germany'];
  const intensities = ['None', 'Low', 'Medium', 'High', 'Critical'];
  const tradeLevels = ['None', 'Mild', 'Moderate', 'Severe', 'Complete'];
  const stabilityLevels = ['Stable', 'Watchlist', 'Declining', 'Unstable', 'Collapse'];

  const runSimulation = () => {

  const gdpVal = parseFloat(gdpChange) || 0

  const conflictMult = 
    conflictIntensity === 'High' ? 2.5 :
    conflictIntensity === 'Medium' ? 1.5 : 1

  const tradeMult =
    tradeRestriction === 'High' ? 2 :
    tradeRestriction === 'Medium' ? 1.5 :
    tradeRestriction === 'Low' ? 1.2 : 1

  const stabilityMult =
    politicalStability === 'Unstable' ? 2 :
    politicalStability === 'Moderate' ? 1.4 : 1

  const newGdp = parseFloat(
    ((gdpVal || -3) * conflictMult * -1).toFixed(1)
  )
  const newRisk = parseFloat(
    (Math.abs(gdpVal || 3) * conflictMult 
     * tradeMult).toFixed(1)
  )
  const newRecovery = Math.round(
    12 * conflictMult * stabilityMult
  )
  const newVolatility = parseFloat(
    (Math.abs(gdpVal || 3) * tradeMult 
     * 1.5).toFixed(1)
  )

  setGdpImpact(newGdp)
  setRecovery(newRecovery)

  setChartData([
    { 
      name: 'GDP Impact', 
      value: newGdp,
      fill: newGdp < 0 
        ? 'rgba(239,68,68,0.7)' 
        : 'rgba(84,73,214,0.7)'
    },
    { 
      name: 'Risk Increase', 
      value: newRisk,
      fill: 'rgba(84,73,214,0.7)'
    },
    { 
      name: 'Recovery (mo)', 
      value: newRecovery,
      fill: 'rgba(84,73,214,0.7)'
    },
    { 
      name: 'Volatility', 
      value: newVolatility,
      fill: 'rgba(84,73,214,0.7)'
    }
  ])
};



  return (
    <div className="row g-5">
      {/* Form Panel */}
      <div className="col-lg-4">
        <div className="card shadow-lg border-0 h-100">
          <div className="mb-4">
  <h4 className="text-body fw-semibold mb-1">
    Scenario Builder
  </h4>
  <p className="text-muted mb-0" 
     style={{fontSize:'13px'}}>
    Simulate geopolitical events and analyse impact
  </p>
</div>
          <div className="card-body p-4">
            <div className="mb-3">
              <label className="form-label fw-bold">Scenario Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="India-China Border Tension"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
            </div>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-bold">Country</label>
                <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                  {countries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">GDP Change %</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={gdpChange} 
                  onChange={(e) => setGdpChange(parseFloat(e.target.value))}
                  step="0.1"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Conflict Intensity</label>
                <select className="form-select" value={conflictIntensity} onChange={(e) => setConflictIntensity(e.target.value)}>
                  {intensities.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Trade Restriction</label>
                <select className="form-select" value={tradeRestriction} onChange={(e) => setTradeRestriction(e.target.value)}>
                  {tradeLevels.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Political Stability</label>
                <select className="form-select" value={politicalStability} onChange={(e) => setPoliticalStability(e.target.value)}>
                  {stabilityLevels.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button 
              className="btn btn-success w-100 mt-4 fw-bold shadow-lg"
              onClick={runSimulation}
            >
              Run Simulation
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="col-lg-8">
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card shadow border-0">
              <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-danger mb-1">{gdpImpact}%</h2>
                <p className="h5 text-muted mb-1">GDP Impact</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow border-0">
              <div className="card-body text-center">
              <h2 className="display-4 fw-bold text-warning mb-1">{recovery} mo</h2>
                <p className="h5 text-muted mb-1">Recovery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Chart */}
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-header bg-transparent pb-0">
            <h5 className="mb-0 fw-bold">Outcome Probabilities</h5>
          </div>
          <div className="card-body p-0" style={{height: '400px'}}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid 
                  strokeDasharray="4 4"
                  stroke="rgba(124,111,212,0.15)"
                  vertical={true}
                  horizontal={true}
                />
              <XAxis 
  dataKey="name"
  tick={{ fill: '#9490c8', fontSize: 11 }}
  axisLine={{ stroke: 'rgba(124,111,212,0.2)' }}
  tickLine={{ stroke: 'rgba(124,111,212,0.2)' }}
  angle={0}
  interval={0}
/>
              <YAxis
  tick={{ fill: '#9490c8', fontSize: 11 }}
  axisLine={{ stroke: 'rgba(124,111,212,0.2)' }}
  tickLine={{ stroke: 'rgba(124,111,212,0.2)' }}
/>
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
                <Bar dataKey="value" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Saved Scenarios */}
        <div className="card shadow-lg border-0">
          <div className="mb-2" style={{borderBottom: '1px solid rgba(124,111,212,0.3)', paddingBottom: '8px', padding: '16px 16px 8px 16px', margin: 0}}>
            <span className="text-body fw-semibold" style={{fontSize: '15px'}}>
              Saved Scenarios ({savedScenarios.length})
            </span>
          </div>
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Confidence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedScenarios.map((scenario, index) => (
                  <tr key={index}>
                    <td>{scenario.name}</td>
                    <td>{scenario.date}</td>
                    <td>{scenario.confidence}%</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm">Load</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

