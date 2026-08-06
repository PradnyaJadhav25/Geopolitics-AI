import { useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@geopolitics.ai', role: 'admin', status: 'active', lastLogin: '2 hours ago', created: '23/3/2026' },
    { id: 2, name: 'Jane Analyst', email: 'jane@geopolitics.ai', role: 'user', status: 'active', lastLogin: '2 hours ago', created: '23/3/2026' },
    { id: 3, name: 'Bob User', email: 'bob@geopolitics.ai', role: 'user', status: 'inactive', lastLogin: '2 hours ago', created: '23/3/2026' },
    { id: 4, name: 'Alice Trader', email: 'alice@geopolitics.ai', role: 'user', status: 'active', lastLogin: '2 hours ago', created: '23/3/2026' }
  ]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const filteredUsers = users.filter(u => {
    const matchSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = 
      filter === 'all' ? true :
      filter === 'admin' ? u.role === 'admin' :
      filter === 'user' ? u.role === 'user' : true;
    return matchSearch && matchFilter;
  });

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id
        ? {...u, status: u.status === 'active' ? 'inactive' : 'active'}
        : u
    ));
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const openEdit = (user) => {
    setEditUser({...user});
    setShowEditModal(true);
  };

  const exportUsers = () => {
    const csv = [
      'Name,Email,Role,Status,Last Login,Created',
      ...users.map(u =>
        `${u.name},${u.email},${u.role},${u.status},${u.lastLogin},${u.created}`
      )
    ].join('\n');

    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">User Management</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={exportUsers}>Export Users</button>
          <button className="btn btn-success" onClick={() => setShowInviteModal(true)}>+ Invite User</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="btn-group w-100" role="group">
                {['all', 'admin', 'user'].map(role => (
                  <button
                    key={role}
                    className={`btn ${filter === role ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter(role)}
                  >
                    {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}s
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-secondary w-100" onClick={handleRefresh} disabled={refreshing}>
                <i className="bi bi-arrow-clockwise"></i> {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: user.role === 'admin' ? '#5449d6' : '#0891b2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#ffffff',
                          flexShrink: 0,
                          marginRight: '8px'
                        }}>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge fs-6 ${user.role === 'admin' ? 'bg-danger' : 'bg-success'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge fs-6 ${user.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>{user.created}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => openEdit(user)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className={`btn btn-outline-${user.status === 'active' ? 'danger' : 'success'}`}
                          onClick={() => toggleStatus(user.id)}
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          <i className="bi bi-power"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)} title="Delete">
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
        {filteredUsers.length === 0 && (
          <div className="card-body text-center py-5">
            <i className="bi bi-people display-1 text-muted mb-3"></i>
            <h5 className="text-muted">No users found</h5>
            <p className="text-muted mb-4">Try adjusting your search or role filter</p>
            <button className="btn btn-primary" onClick={() => setShowInviteModal(true)}>Invite First User</button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="row g-4 mt-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-primary">{users.length}</h3>
              <p className="h6 mb-1">Total Users</p>
              <small className="text-success">↗️ +3 today</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-info">{users.filter(u => u.role === 'admin').length}</h3>
              <p className="h6 mb-1">Admins</p>
              <small className="text-muted">Full access</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-success">{users.filter(u => u.status === 'active').length}</h3>
              <p className="h6 mb-1">Active</p>
              <small className="text-success">✅</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="display-4 fw-bold text-warning">{users.filter(u => u.status === 'inactive').length}</h3>
              <p className="h6 mb-1">Inactive</p>
              <small className="text-warning">⚠️</small>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && editUser && (
        <div style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e2140',
            border: '1px solid rgba(124,111,212,0.3)',
            borderRadius: '16px', padding: '24px',
            width: '400px'
          }}>
            <h5 style={{color: '#ffffff', marginBottom: '16px'}}>Edit User</h5>

            <label style={{color: '#9490c8', fontSize: '13px'}}>
              Name
            </label>
            <input
              className="form-control mb-3"
              value={editUser.name}
              onChange={e => setEditUser({...editUser, name: e.target.value})}
              style={{backgroundColor: '#151829', color: '#fff', border: '1px solid rgba(124,111,212,0.3)'}}
            />

            <label style={{color: '#9490c8', fontSize: '13px'}}>
              Email
            </label>
            <input
              className="form-control mb-3"
              value={editUser.email}
              onChange={e => setEditUser({...editUser, email: e.target.value})}
              style={{backgroundColor: '#151829', color: '#fff', border: '1px solid rgba(124,111,212,0.3)'}}
            />

            <label style={{color: '#9490c8', fontSize: '13px'}}>
              Role
            </label>
            <select
              className="form-select mb-4"
              value={editUser.role}
              onChange={e => setEditUser({...editUser, role: e.target.value})}
              style={{backgroundColor: '#151829', color: '#fff', border: '1px solid rgba(124,111,212,0.3)'}}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="d-flex gap-2 justify-content-end">
              <button
                className="btn btn-sm rounded-pill px-3"
                style={{border: '1px solid rgba(124,111,212,0.3)', color: '#9490c8'}}
                onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary rounded-pill px-3"
                onClick={() => {
                  setUsers(prev => prev.map(u =>
                    u.id === editUser.id ? editUser : u
                  ));
                  setShowEditModal(false);
                }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e2140',
            border: '1px solid rgba(124,111,212,0.3)',
            borderRadius: '16px', padding: '24px',
            width: '400px'
          }}>
            <h5 style={{color: '#ffffff', marginBottom: '16px'}}>
              Invite New User
            </h5>

            <label style={{color: '#9490c8', fontSize: '13px'}}>
              Email Address
            </label>
            <input
              className="form-control mb-3"
              placeholder="user@example.com"
              style={{backgroundColor: '#151829', color: '#fff', border: '1px solid rgba(124,111,212,0.3)'}}
            />

            <label style={{color: '#9490c8', fontSize: '13px'}}>
              Role
            </label>
            <select
              className="form-select mb-4"
              style={{backgroundColor: '#151829', color: '#fff', border: '1px solid rgba(124,111,212,0.3)'}}>
              <option>User</option>
              <option>Admin</option>
            </select>

            <div className="d-flex gap-2 justify-content-end">
              <button
                className="btn btn-sm rounded-pill px-3"
                style={{border: '1px solid rgba(124,111,212,0.3)', color: '#9490c8'}}
                onClick={() => setShowInviteModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary rounded-pill px-3"
                onClick={() => {
                  alert('Invitation sent! (Backend required for real emails)');
                  setShowInviteModal(false);
                }}>
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

