import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    let msg = '';
    if (!firstName.trim()) msg = 'First name required';
    else if (!lastName.trim()) msg = 'Last name required';
    else if (!email.trim() || !email.includes('@')) msg = 'Valid email required';
    else if (!password.trim()) msg = 'Password required';
    else if (!confirmPassword.trim()) msg = 'Confirm password required';
    else if (password !== confirmPassword) msg = 'Passwords must match';
    else if (!selectedRole) msg = 'Role required';
    if (msg) {
      setError(msg);
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const newUser = {
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        role: selectedRole,
        password: password
      };
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
        maxWidth: '480px',
        backgroundColor: '#1e2140',
        border: '1px solid rgba(124,111,212,0.3)',
        borderRadius: '20px',
        padding: '40px 36px'
      }}>

        {/* Logo */}
        <div style={{textAlign:'center', marginBottom:'24px'}}>
          <svg width="44" height="44" viewBox="0 0 90 90">
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
            color:'#ffffff', fontSize:'16px',
            fontWeight:700, marginTop:'8px'
          }}>
            GeoPolitics AI
          </div>
        </div>

        <h5 style={{
          color:'#ffffff', fontWeight:600,
          textAlign:'center', marginBottom:'24px',
          fontSize:'16px'
        }}>
          Create your account
        </h5>

        {/* Error */}
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

        {/* First + Last Name row */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'12px', marginBottom:'16px'
        }}>
          <div>
            <label style={{
              color:'#9490c8', fontSize:'13px',
              display:'block', marginBottom:'6px'
            }}>
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{
                width:'100%', padding:'11px 14px',
                backgroundColor:'#151829',
                border:'1px solid rgba(124,111,212,0.3)',
                borderRadius:'10px', color:'#ffffff',
                fontSize:'14px', outline:'none',
                boxSizing:'border-box'
              }}
            />
          </div>
          <div>
            <label style={{
              color:'#9490c8', fontSize:'13px',
              display:'block', marginBottom:'6px'
            }}>
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{
                width:'100%', padding:'11px 14px',
                backgroundColor:'#151829',
                border:'1px solid rgba(124,111,212,0.3)',
                borderRadius:'10px', color:'#ffffff',
                fontSize:'14px', outline:'none',
                boxSizing:'border-box'
              }}
            />
          </div>
        </div>

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
              width:'100%', padding:'11px 14px',
              backgroundColor:'#151829',
              border:'1px solid rgba(124,111,212,0.3)',
              borderRadius:'10px', color:'#ffffff',
              fontSize:'14px', outline:'none',
              boxSizing:'border-box'
            }}
          />
        </div>

        {/* Password + Confirm row */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'12px', marginBottom:'16px'
        }}>
          <div>
            <label style={{
              color:'#9490c8', fontSize:'13px',
              display:'block', marginBottom:'6px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width:'100%', padding:'11px 14px',
                backgroundColor:'#151829',
                border:'1px solid rgba(124,111,212,0.3)',
                borderRadius:'10px', color:'#ffffff',
                fontSize:'14px', outline:'none',
                boxSizing:'border-box'
              }}
            />
          </div>
          <div>
            <label style={{
              color:'#9490c8', fontSize:'13px',
              display:'block', marginBottom:'6px'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{
                width:'100%', padding:'11px 14px',
                backgroundColor:'#151829',
                border:'1px solid rgba(124,111,212,0.3)',
                borderRadius:'10px', color:'#ffffff',
                fontSize:'14px', outline:'none',
                boxSizing:'border-box'
              }}
            />
          </div>
        </div>

        {/* Organisation */}
        <div style={{marginBottom:'20px'}}>
          <label style={{
            color:'#9490c8', fontSize:'13px',
            display:'block', marginBottom:'6px'
          }}>
            Organisation
          </label>
          <input
            type="text"
            value={organisation}
            onChange={e => setOrganisation(e.target.value)}
            style={{
              width:'100%', padding:'11px 14px',
              backgroundColor:'#151829',
              border:'1px solid rgba(124,111,212,0.3)',
              borderRadius:'10px', color:'#ffffff',
              fontSize:'14px', outline:'none',
              boxSizing:'border-box'
            }}
          />
        </div>

        {/* Select Role */}
        <div style={{marginBottom:'24px'}}>
          <label style={{
            color:'#9490c8', fontSize:'13px',
            display:'block', marginBottom:'10px'
          }}>
            Select Role *
          </label>
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr',
            gap:'10px'
          }}>
            {['Policy Analyst','Gov. Official',
              'Student/Researcher','Guest'].map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                style={{
                  padding:'12px',
                  backgroundColor: selectedRole === role
                    ? 'rgba(84,73,214,0.3)'
                    : '#151829',
                  border: selectedRole === role
                    ? '1px solid #5449d6'
                    : '1px solid rgba(124,111,212,0.3)',
                  borderRadius:'10px',
                  color: selectedRole === role
                    ? '#ffffff' : '#9490c8',
                  cursor:'pointer',
                  fontSize:'13px',
                  fontWeight: selectedRole === role ? 600 : 400,
                  transition:'all 0.2s'
                }}>
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width:'100%', padding:'13px',
            backgroundColor:'#5449d6',
            border:'none', borderRadius:'10px',
            color:'#ffffff', fontSize:'15px',
            fontWeight:600, cursor:'pointer',
            marginBottom:'16px'
          }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        {/* Login link */}
        <p style={{
          textAlign:'center', color:'#9490c8',
          fontSize:'13px', margin:'0'
        }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color:'#7C6FD4', cursor:'pointer',
              fontWeight:600
            }}>
            Sign in here
          </span>
        </p>

      </div>
    </div>
  );
}

