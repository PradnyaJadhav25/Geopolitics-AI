import { useState } from 'react';

const nodes = [
  { id: 'India', x: 49, y: 47, color: '#6f42c1' },
  { id: 'United States', x: 21, y: 28, color: '#0dcaf0' },
  { id: 'Japan', x: 77, y: 27, color: '#0dcaf0' },
  { id: 'Russia', x: 62, y: 74, color: '#dc3545' },
  { id: 'Quad', x: 44, y: 12, color: '#198754' },
  { id: 'BRICS', x: 34, y: 73, color: '#fd7e14' },
];
const links = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [0, 5], [3, 5]];

export default function KnowledgeGraph() {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState('');
  const visible = nodes.map((node, index) => ({ ...node, index })).filter(node => node.id.toLowerCase().includes(query.toLowerCase()));
  const connected = links.filter(link => link.includes(selected)).map(link => nodes[link[0] === selected ? link[1] : link[0]]);
  return <div>
    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"><div><h1 className="h2 fw-bold mb-2">Knowledge Graph</h1><p className="text-body-secondary mb-0">Explore geopolitical relationships, alliances, and trade networks.</p></div><button className="btn btn-outline-primary" onClick={() => setSelected(0)}>Reset view</button></div>
    <div className="card mb-4"><div className="card-body"><input className="form-control" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search country, alliance, or organisation" /></div></div>
    <div className="row g-4"><div className="col-lg-8"><div className="card shadow-sm"><div className="card-header bg-transparent"><h5 className="mb-0">Relationship map</h5></div><div className="card-body p-2"><div className="position-relative rounded border overflow-hidden" style={{ height: 480, background: 'linear-gradient(135deg, rgba(111,66,193,.06), rgba(13,202,240,.08))' }}><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="position-absolute w-100 h-100">{links.map(([from, to]) => <line key={from + '-' + to} x1={nodes[from].x} y1={nodes[from].y} x2={nodes[to].x} y2={nodes[to].y} stroke="rgba(108,117,125,.6)" strokeWidth=".35" />)} </svg>{visible.map(node => <button key={node.id} onClick={() => setSelected(node.index)} className={'position-absolute translate-middle border-0 shadow-sm rounded-pill px-3 py-2 small ' + (selected === node.index ? 'text-white' : 'bg-white')} style={{ left: node.x + '%', top: node.y + '%', backgroundColor: selected === node.index ? node.color : undefined, whiteSpace: 'nowrap' }}>{node.id}</button>)}</div></div></div></div>
    <div className="col-lg-4"><div className="card shadow-sm h-100"><div className="card-body"><span className="badge mb-2" style={{ backgroundColor: nodes[selected].color }}>Entity</span><h3 className="h4">{nodes[selected].id}</h3><p className="text-body-secondary">Relationship intelligence ready for simulation and decision engines.</p><h6>Connected entities</h6>{connected.map(node => <div className="border-bottom py-2" key={node.id}>{node.id}</div>)}</div></div></div></div>
  </div>;
}
