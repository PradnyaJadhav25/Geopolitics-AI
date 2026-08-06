import { useState } from 'react';
import { adminSources } from '../../data/mockData';

export default function AdminSources() {
  const [activeTab, setActiveTab] = useState('active');
  const [search, setSearch] = useState('');
  const [sources, setSources] = useState(adminSources);
  const [testing, setTesting] = useState(null);
  const [testResult, setTestResult] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSourceForm, setNewSourceForm] = useState({
    name: '', type: 'news', frequency: 'hourly', url: ''
  });

  const filteredSources = sources
    .filter(source => activeTab === 'all' || source.status === activeTab)
    .filter(source => 
      source.name.toLowerCase().includes(search.toLowerCase()) ||
      source.type.toLowerCase().includes(search.toLowerCase())
    );

  const togglePause = (id) => {
    setSources(prev => prev.map(source => 
      source.id === id 
        ? {...source, status: source.status === 'active' ? 'paused' : 'active'} 
        : source
    ));
  };

  const deleteSource = (id) => {
    if (window.confirm('Delete this source?')) {
      setSources(prev => prev.filter(s => s.id !== id));
    }
  };

  const testSource = (id) => {
    setTesting(id);
    setTimeout(() => {
      setTesting(null);
      setTestResult(prev => ({...prev, [id]: 'success'}));
      setTimeout(() => {
        setTestResult(prev => ({...prev, [id]: null}));
      }, 3000);
    }, 2000);
  };

  const addNewSource = () => {
    if (!newSourceForm.name || !newSourceForm.url) {
      alert('Please fill in all fields');
      return;
    }
    const newSource = {
      id: Date.now(),
      name: newSourceForm.name,
      type: newSourceForm.type,
      frequency: newSourceForm.frequency,
      url: newSourceForm.url,
      status: 'active',
      lastFetched: 'Just now'
    };
    setSources(prev => [newSource, ...prev]);
    setNewSourceForm({name: '', type: 'news', frequency: 'hourly', url: ''});
    setShowAddModal(false);
  };

  const handleToggleStatus = (id) => {
    togglePause(id);
  };

  const handleTestConnection = (id) => {
    testSource(id);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Data Sources Management</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => setShowAddModal(true)}>+ Add New Source</button>
          <button className="btn btn-outline-secondary">Import Config</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search sources or types..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="btn-group" role="group">
                <button 
                  className={`btn ${activeTab === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('active')}
                >
                  Active ({sources.filter(s => s.status === 'active').length})
                </button>
                <button 
                  className={`btn ${activeTab === 'paused' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setActiveTab('paused')}
                >
                  Paused ({sources.filter(s => s.status === 'paused').length})
                </button>
                <button 
                  className={`btn ${activeTab === 'error' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setActiveTab('error')}
                >
                  Errors (0)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sources Table */}
      <div className="card shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Source</th>
                  <th>Type</th>
                  <th>Last Fetched</th>
                  <th>Frequency</th>
                  <th>Status</th>
                  <th>Records Today</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSources.map((source) => (
                  <tr key={source.id}>
                    <td className="fw-bold">{source.name}</td>
                    <td>
                      <span className="badge bg-info">{source.type}</span>
                    </td>
                    <td>{source.lastFetched}</td>
                    <td>
                      <span className={`badge ${source.frequency === 'realtime' ? 'bg-success' : source.frequency === 'hourly' ? 'bg-primary' : 'bg-secondary'}`}>
                        {source.frequency}
                      </span>
                    </td>
                    <td>
                      <span className={`badge fs-6 ${source.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                        {source.status}
                      </span>
                    </td>
                    <td>{Math.floor(Math.random()*500 + 100)}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button 
                          className={`btn ${testing === source.id ? 'btn-warning' : testResult[source.id] === 'success' ? 'btn-success' : 'btn-outline-primary'}`} 
                          onClick={() => handleTestConnection(source.id)}
                          disabled={testing === source.id}
                        >
                          {testing === source.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" role="status" />
                              Testing...
                            </>
                          ) : testResult[source.id] === 'success' ? (
                            <>✓ OK</>
                          ) : (
                            <><i className="bi bi-play-circle"></i> Test</>
                          )}
                        </button>
                        <button 
                          className="btn btn-outline-secondary" 
                          onClick={() => handleToggleStatus(source.id)}
                        >
                          <i className="bi bi-power"></i> {source.status === 'active' ? 'Pause' : 'Resume'}
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => deleteSource(source.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredSources.length === 0 && (
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h5 className="text-muted">No sources found</h5>
            <button className="btn btn-primary mt-3" onClick={() => setShowAddModal(true)}>Add First Source</button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mt-4">
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h2 className="display-4 fw-bold text-primary">2.4k</h2>
              <p className="mb-1">Daily Records</p>
              <small className="text-success">↗️ +12%</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h2 className="display-4 fw-bold text-info">98%</h2>
              <p className="mb-1">Uptime</p>
              <small className="text-success">Perfect</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h2 className="display-4 fw-bold text-warning">{sources.filter(s => s.status === 'active').length}</h2>
              <p className="mb-1">Active Sources</p>
              <small className="text-info">Real-time</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h2 className="display-4 fw-bold text-success">0</h2>
              <p className="mb-1">Errors Today</p>
              <small className="text-success">Clean</small>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Source Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Data Source</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Source Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g., Reuters API"
                    value={newSourceForm.name}
                    onChange={(e) => setNewSourceForm({...newSourceForm, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Type</label>
                  <select 
                    className="form-select"
                    value={newSourceForm.type}
                    onChange={(e) => setNewSourceForm({...newSourceForm, type: e.target.value})}
                  >
                    <option value="news">News</option>
                    <option value="economic">Economic</option>
                    <option value="social">Social Media</option>
                    <option value="financial">Financial</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Frequency</label>
                  <select 
                    className="form-select"
                    value={newSourceForm.frequency}
                    onChange={(e) => setNewSourceForm({...newSourceForm, frequency: e.target.value})}
                  >
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">API URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="https://api.example.com/data"
                    value={newSourceForm.url}
                    onChange={(e) => setNewSourceForm({...newSourceForm, url: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={addNewSource}>Add Source</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

