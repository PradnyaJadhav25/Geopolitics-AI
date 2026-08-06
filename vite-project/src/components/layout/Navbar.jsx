import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const pathToTitle = {
  '/dashboard': 'Dashboard',
  '/geopolitics': 'Geopolitical analysis',
  '/geopolitics/compare': 'Country compare',
  '/internal-affairs': 'Internal affairs',
  '/market': 'Market analysis',
  '/funds': 'Fund tracking',
  '/recommendations': 'AI recommendations',
  '/simulation': 'Simulation',
  '/chatbot': 'Chatbot',
  '/admin/sources': 'Admin / Data sources',
  '/admin/upload': 'Admin / Upload',
  '/admin/users': 'Admin / Users',
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentTitle = pathToTitle[location.pathname] || 'Dashboard';
  const themeText = dark ? '☀ Light' : '🌙 Dark';

  return (
    <div 
className="navbar navbar-dark bg-dark border-bottom sticky-top py-1 px-4" style={{zIndex: 50}}

    >
      {/* Left side */}
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{fontSize: '0.875rem', fontWeight: '600', color: 'white', marginRight: '8px'}}>
          Geopolitics AI
        </span>
        <span style={{color: '#4b5563', margin: '0 8px', fontSize: '0.875rem'}}>
          /
        </span>
        <span style={{fontSize: '0.875rem', color: '#9ca3af'}}>
          {currentTitle}
        </span>
      </div>

      {/* Right side */}
      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>


        {/* Username */}
        {user && (
          <span style={{fontSize: '0.875rem', color: '#d1d5db'}}>
            {user.name || "User"}
          </span>
        )}

        {/* Logout */}
        <button 
          onClick={handleLogout}
          style={{
            fontSize: '0.875rem',
            color: '#d1d5db',
            border: '1px solid #4b5563',
            padding: '4px 12px',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1f2937'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
