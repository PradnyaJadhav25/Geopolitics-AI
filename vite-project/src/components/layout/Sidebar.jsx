import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navbar navbar-dark bg-dark position-fixed top-0 start-0 h-100 overflow-auto px-3 border-end" style={{width: '250px', zIndex: 1030}}>
      
      <div className="px-3 pt-4 pb-3">
        <div className="d-flex align-items-center gap-2">
          <svg width="44" height="44" viewBox="0 0 90 90"
               xmlns="http://www.w3.org/2000/svg" style={{flexShrink: 0}}>
            <circle cx="45" cy="45" r="38" fill="#2a2060"/>
            <ellipse cx="45" cy="45" rx="38" ry="12" fill="none"
                     stroke="#7C6FD4" strokeWidth="0.8" opacity="0.5"/>
            <ellipse cx="45" cy="45" rx="38" ry="24" fill="none"
                     stroke="#7C6FD4" strokeWidth="0.8" opacity="0.5"/>
            <ellipse cx="45" cy="45" rx="14" ry="38" fill="none"
                     stroke="#7C6FD4" strokeWidth="0.8" opacity="0.5"/>
            <ellipse cx="45" cy="45" rx="28" ry="38" fill="none"
                     stroke="#7C6FD4" strokeWidth="0.8" opacity="0.5"/>
            <path d="M28,25 Q22,32 21,41 Q20,50 26,57 Q28,62
                     24,68 Q29,71 33,63 Q37,55 42,50 Q46,45
                     42,35 Q38,26 28,25Z" fill="#5449d6"/>
            <path d="M50,22 Q60,20 65,28 Q69,35 64,42 Q69,46
                     65,53 Q59,56 52,52 Q46,48 47,40 Q48,31
                     50,22Z" fill="#5449d6"/>
            <circle cx="45" cy="45" r="38" fill="none"
                    stroke="#7C6FD4" strokeWidth="1.5"/>
            <circle cx="34" cy="33" r="3" fill="#FF6B6B"/>
            <circle cx="58" cy="28" r="3" fill="#FF6B6B"/>
            <circle cx="62" cy="50" r="2.5" fill="#2DD4BF"/>
            <circle cx="38" cy="60" r="2.5" fill="#2DD4BF"/>
          </svg>

          <div className="d-flex flex-column justify-content-center">
            <span style={{fontSize: '16px', fontWeight: 700,
                         color: '#ffffff', lineHeight: 1.2}}>
              GeoPolitics
            </span>
            <span style={{fontSize: '11px', fontWeight: 500,
                         color: '#7C6FD4', lineHeight: 1.4,
                         letterSpacing: '1.5px'}}>
              AI PLATFORM
            </span>
          </div>
        </div>
      </div>

      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-md-4 mb-1 text-light text-uppercase fs-6">
        <span>Dashboard</span>
      </h6>
      <ul className="nav flex-column mb-4">
        <li className="nav-item">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="bi bi-house-door me-2"></i>Dashboard
          </NavLink>
        </li>
      </ul>
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-md-4 mb-1 text-light text-uppercase fs-6">
        <span>Analysis</span>
      </h6>
      <ul className="nav flex-column mb-4">
        <li className="nav-item">
<NavLink to="/geopolitics" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-globe me-2"></i>Geopolitical Analysis
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/geopolitics/compare" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-arrow-left-right me-2"></i>Country Compare
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/internal-affairs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-people me-2"></i>Internal Affairs
          </NavLink>
        </li>
      </ul>
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-md-4 mb-1 text-light text-uppercase fs-6">
        <span>Finance</span>
      </h6>
      <ul className="nav flex-column mb-4">
        <li className="nav-item">
          <NavLink to="/funds" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-currency-exchange me-2"></i>Fund Tracking
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/market" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-graph-up me-2"></i>Market Analysis
          </NavLink>
        </li>
      </ul>
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-md-4 mb-1 text-light text-uppercase fs-6">
        <span>AI Tools</span>
      </h6>
      <ul className="nav flex-column mb-4">
        <li className="nav-item">
          <NavLink to="/recommendations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-lightbulb me-2"></i>AI Recommendations
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/simulation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-play-circle me-2"></i>Simulation
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/chatbot" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-chat-dots me-2"></i>Chatbot
          </NavLink>
        </li>
      </ul>
      {isAdmin && (
        <>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-md-4 mb-1 text-light text-uppercase fs-6">
            <span>Admin</span>
          </h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to="/admin/sources" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-database me-2"></i>Data Sources
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/upload" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-upload me-2"></i>Manual Upload
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-people me-2"></i>User Management
              </NavLink>
            </li>
          </ul>
        </>
      )}
      <style>{`
        .nav-link {
          color: #dee2e6 !important;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }
        .nav-link.active {
          color: #6f42c1 !important;
          background-color: rgba(111, 66, 193, 0.1) !important;
          font-weight: 500;
        }
        .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
          border-radius: 0.375rem;
        }
      `}</style>
    </nav>
  );
}

