import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');

    setLoading(true);

    try {
      if (email === 'admin@geopolitics.com' && password === 'admin123') {
        login('jwt_admin_token_456', { name: 'Admin User', role: 'admin' });
        setTimeout(() => navigate('/dashboard'), 500);
        return;
      }

      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = users.find(u => u.email === email);

      if (user) {
        login(`jwt_token_${user.email}`, { name: user.name, role: user.role });
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        setError('No account found. Please register first.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0d0f1a',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#1e2140',
        border: '1px solid rgba(124,111,212,0.3)',
        borderRadius: '20px',
        padding: '40px 36px'
      }}>

        {/* Logo */}
        <div style={{textAlign:'center', marginBottom:'28px'}}>
          <svg width="52" height="52" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="38" fill="#2a2060"/>
            <ellipse cx="45" cy="45" rx="38" ry="12" 
              fill="none" stroke="#7C6FD4" 
              strokeWidth="0.8" opacity="0.5"/>
            <ellipse cx="45" cy="45" rx="38" ry="24" 
              fill="none" stroke="#7C6FD4" 
              strokeWidth="0.8" opacity="0.5"/>
            <ellipse cx="45" cy="45" rx="14" ry="38" 
              fill="none" stroke="#7C6FD4" 
              strokeWidth="0.8" opacity="0.5"/>
            <circle cx="45" cy="45" r="38" fill="none" 
              stroke="#7C6FD4" strokeWidth="1.5"/>
            <circle cx="34" cy="33" r="3" fill="#FF6B6B"/>
            <circle cx="58" cy="52" r="3" fill="#2DD4BF"/>
          </svg>
          <div style={{
            color:'#ffffff', fontSize:'18px', 
            fontWeight:700, marginTop:'10px'
          }}>
            GeoPolitics AI
          </div>
          <div style={{
            color:'#9490c8', fontSize:'10px',
            letterSpacing:'2px', marginTop:'2px'
          }}>
            INTELLIGENCE PLATFORM
          </div>
        </div>

        {/* Title */}
        <h5 style={{
          color:'#ffffff', fontWeight:600,
          textAlign:'center', marginBottom:'28px',
          fontSize:'16px'
        }}>
          Sign in to your account
        </h5>

        {/* Error message */}
        {error && (
          <div style={{
            backgroundColor:'rgba(220,38,38,0.15)',
            border:'1px solid rgba(220,38,38,0.3)',
            borderRadius:'8px', padding:'10px 14px',
            color:'#f87171', fontSize:'13px',
            marginBottom:'16px'
          }}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{marginBottom:'16px'}}>
          <label style={{
            color:'#9490c8', fontSize:'13px',
            display:'block', marginBottom:'6px'
          }}>
            Email
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width:'100%', padding:'12px 16px',
              backgroundColor:'#151829',
              border:'1px solid rgba(124,111,212,0.3)',
              borderRadius:'10px', color:'#ffffff',
              fontSize:'14px', outline:'none',
              boxSizing:'border-box'
            }}
          />
        </div>

        {/* Forgot password */}
        <div style={{textAlign:'right', marginBottom:'6px'}}>
          <span style={{
            color:'#7C6FD4', fontSize:'12px',
            cursor:'pointer'
          }}>
            Forgot password?
          </span>
        </div>

        {/* Password */}
        <div style={{marginBottom:'24px'}}>
          <label style={{
            color:'#9490c8', fontSize:'13px',
            display:'block', marginBottom:'6px'
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width:'100%', padding:'12px 16px',
              backgroundColor:'#151829',
              border:'1px solid rgba(124,111,212,0.3)',
              borderRadius:'10px', color:'#ffffff',
              fontSize:'14px', outline:'none',
              boxSizing:'border-box'
            }}
          />
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width:'100%', padding:'13px',
            backgroundColor:'#5449d6',
            border:'none', borderRadius:'10px',
            color:'#ffffff', fontSize:'15px',
            fontWeight:600, cursor:'pointer',
            marginBottom:'20px'
          }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Register link */}
        <p style={{
          textAlign:'center', color:'#9490c8',
          fontSize:'13px', margin:'0'
        }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color:'#7C6FD4', cursor:'pointer',
              fontWeight:600
            }}>
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}
