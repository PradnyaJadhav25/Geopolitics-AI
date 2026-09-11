import { useState } from 'react';

const initialEvents = [
  { id: 1, title: 'Red Sea shipping disruption', country: 'Yemen', category: 'Conflict', severity: 'High', status: 'Published' },
  { id: 2, title: 'Regional trade agreement talks', country: 'India', category: 'Diplomacy', severity: 'Medium', status: 'Published' },
];

export default function AdminEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [query, setQuery] = useState('');
  const filtered = events.filter(event => (event.title + event.country).toLowerCase().includes(query.toLowerCase()));
  return <div>
    <div className="d-flex justify-content-between align-items-start mb-4"><div><h2 className="mb-1">Event Management</h2><p className="text-body-secondary mb-0">Maintain historical and live event records.</p></div><button className="btn btn-success" onClick={() => setEvents(current => [{ id: Date.now(), title: 'New intelligence event', country: 'Unassigned', category: 'Policy', severity: 'Low', status: 'Draft' }, ...current])}>+ Add event</button></div>
    <div className="card mb-4"><div className="card-body"><input className="form-control" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search events or countries" /></div></div>
    <div className="card shadow-sm table-responsive"><table className="table table-hover mb-0"><thead className="table-dark"><tr><th>Event</th><th>Country</th><th>Category</th><th>Severity</th><th>Status</th><th /></tr></thead><tbody>{filtered.map(event => <tr key={event.id}><td className="fw-semibold">{event.title}</td><td>{event.country}</td><td>{event.category}</td><td><span className={'badge bg-' + (event.severity === 'High' ? 'danger' : 'warning')}>{event.severity}</span></td><td>{event.status}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => setEvents(current => current.filter(item => item.id !== event.id))}>Delete</button></td></tr>)}</tbody></table></div>
  </div>;
}
