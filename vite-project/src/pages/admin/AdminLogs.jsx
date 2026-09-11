import { useState } from 'react';

const initialLogs = [
  { level: 'Info', service: 'Simulation Engine', message: 'Scenario run completed successfully.' },
  { level: 'Warning', service: 'Market Data', message: 'Delayed provider response; cached data served.' },
  { level: 'Error', service: 'Knowledge Graph', message: 'Two imported records failed validation.' },
];

export default function AdminLogs() {
  const [logs, setLogs] = useState(initialLogs);
  const [query, setQuery] = useState('');
  const filtered = logs.filter(log => (log.service + log.message).toLowerCase().includes(query.toLowerCase()));
  const colors = { Info: 'primary', Warning: 'warning', Error: 'danger' };
  return <div>
    <div className="d-flex justify-content-between align-items-start mb-4"><div><h2 className="mb-1">System Logs</h2><p className="text-body-secondary mb-0">Monitor application activity and AI service health.</p></div><button className="btn btn-outline-danger" onClick={() => setLogs([])}>Clear view</button></div>
    <div className="card mb-4"><div className="card-body"><input className="form-control" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search service or message" /></div></div>
    <div className="card shadow-sm"><div className="list-group list-group-flush">{filtered.length ? filtered.map(log => <div className="list-group-item p-4" key={log.service + log.message}><span className={'badge me-3 bg-' + colors[log.level]}>{log.level}</span><strong>{log.service}</strong><div className="text-body-secondary mt-2">{log.message}</div></div>) : <div className="text-center text-body-secondary p-5">No matching log entries.</div>}</div></div>
  </div>;
}
