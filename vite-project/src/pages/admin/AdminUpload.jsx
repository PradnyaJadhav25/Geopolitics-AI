import { useState } from 'react';

export default function AdminUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('CSV News');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, name: 'reuters-april.csv', type: 'news', size: '2.4MB', status: 'success', time: '10 min ago' },
    { id: 2, name: 'worldbank-q1.json', type: 'economic', size: '1.8MB', status: 'success', time: '2 hours ago' },
    { id: 3, name: 'twitter-geopolitics.zip', type: 'social', size: '12MB', status: 'failed', time: '1 day ago' }
  ]);

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setRecentUploads(prev => [{
            id: Date.now(),
            name: selectedFile.name,
            type: uploadType.toLowerCase().includes('news') ? 'news' : 'economic',
            size: (selectedFile.size / 1024 / 1024).toFixed(1) + 'MB',
            status: 'success',
            time: 'Just now'
          }, ...prev]);
          setSelectedFile(null);
          setProgress(0);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setProgress(0);
    setUploading(false);
  };

  const handleNewBatch = () => {
    setSelectedFile(null);
    setProgress(0);
    setUploadType('CSV News');
    alert('Form reset. Ready for new batch.');
  };

  const retryUpload = (id) => {
    setRecentUploads(prev => prev.map(u =>
      u.id === id ? {...u, status: 'processing'} : u
    ));
    setTimeout(() => {
      setRecentUploads(prev => prev.map(u =>
        u.id === id ? {...u, status: 'success', time: 'Just now'} : u
      ));
    }, 3000);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manual Data Upload</h2>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary"
            onClick={() => alert('API Configuration coming soon. Backend integration required.')}
          >
            API Config
          </button>
          <button className="btn btn-success" onClick={handleNewBatch}>+ New Batch</button>
        </div>
      </div>

      <div className="row g-5">
        {/* Upload Form */}
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-header bg-transparent pb-0">
              <h5 className="mb-0 fw-bold">Upload New Dataset</h5>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Upload Type</label>
                  <select 
                    className="form-select" 
                    value={uploadType} 
                    onChange={(e) => setUploadType(e.target.value)}
                  >
                    <option>CSV News</option>
                    <option>JSON Economic</option>
                    <option>Excel Data</option>
                    <option>Bulk Archive</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">File</label>
                  
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files[0];
                      if (file) setSelectedFile(file);
                    }}
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{
                      border: dragOver ? '2px solid #5449d6' : '2px dashed rgba(124,111,212,0.4)',
                      borderRadius: '12px',
                      padding: '40px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: dragOver ? 'rgba(84,73,214,0.1)' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      hidden
                      accept=".csv,.json,.xlsx,.zip"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />

                    {selectedFile ? (
                      <div>
                        <p style={{ color: '#a89ef5', fontWeight: 600, margin: 0 }}>
                          {selectedFile.name}
                        </p>
                        <p style={{ color: '#9490c8', fontSize: '12px' }}>
                          {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                        <button
                          className="btn btn-sm rounded-pill mt-1"
                          style={{ border: '1px solid #dc2626', color: '#f87171' }}
                          onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <i className="bi bi-cloud-upload display-4 text-muted mb-3 d-block"></i>
                        <p style={{ color: '#e0dcff', fontWeight: 600, margin: '0.5rem 0' }}>
                          Drop file here or click
                        </p>
                        <p style={{ color: '#9490c8', fontSize: '12px', margin: 0 }}>
                          Supports CSV, JSON, XLSX, ZIP (max 50MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {uploading && (
                    <div className="progress mt-2" style={{ height: '6px' }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: progress + '%',
                          backgroundColor: '#5449d6',
                          transition: 'width 0.08s'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button
                  className="btn btn-outline-secondary me-md-2"
                  onClick={handleCancel}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary px-4"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? `Uploading... ${progress}%` : 'Upload Dataset'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-header">
              <h6 className="mb-0 fw-bold">Recent Uploads</h6>
            </div>
            <div className="list-group list-group-flush list-group-flush">
              {recentUploads.map((item) => (
                <div key={item.id} className={`list-group-item px-3 py-3 border-end ${item.status === 'failed' ? 'border-danger bg-danger-subtle' : ''}`}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div style={{flex: 1}}>
                      <div className="fw-bold mb-1 truncate">{item.name}</div>
                      <div className="small text-muted">
                        <span className={`badge fs-7 me-1 ${item.type === 'news' ? 'bg-info' : item.type === 'economic' ? 'bg-primary' : 'bg-secondary'}`}>
                          {item.type}
                        </span>
                        {item.size} • {item.time}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {item.status === 'failed' && (
                        <button
                          className="btn btn-sm rounded-pill"
                          style={{ border: '1px solid #f59e0b', color: '#f59e0b', fontSize: '11px' }}
                          onClick={() => retryUpload(item.id)}
                          disabled={item.status === 'processing'}
                        >
                          ↻ Retry
                        </button>
                      )}
                      <span className={`badge fs-6 ${item.status === 'success' ? 'bg-success' : item.status === 'processing' ? 'bg-warning' : 'bg-danger'}`}>
                        {item.status === 'processing' ? 'Processing...' : item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer bg-transparent">
              <small className="text-muted">Showing 3 most recent • <a href="#" className="text-decoration-none">View All</a></small>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Stats */}
      <div className="row g-4 mt-5">
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-primary mb-1">47.2k</h3>
              <p className="h6 mb-1">Total Records</p>
              <small className="text-success">↗️ +23%</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-success mb-1">98%</h3>
              <p className="h6 mb-1">Processing Success</p>
              <small className="text-success">✅</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-info mb-1">2.1 GB</h3>
              <p className="h6 mb-1">Storage Used</p>
              <small className="text-info">7% full</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-warning mb-1">3</h3>
              <p className="h6 mb-1">Pending</p>
              <small className="text-warning">⚠️</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

