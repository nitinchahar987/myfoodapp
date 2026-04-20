import '../styles/theme.css';
import '../styles/form.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://myfoodapp-2.onrender.com/api/auth/login', {
      email,
      password
    },{withCredentials:true});
    
    navigate('/see-all-foods');
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-sidebar">
          <div className="auth-sidebar-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
              <path d="M60 80 Q100 60 140 80 Q140 120 100 140 Q60 120 60 80" fill="white"/>
              <circle cx="85" cy="85" r="8" fill="#ef4f5f"/>
              <circle cx="115" cy="85" r="8" fill="#ef4f5f"/>
              <path d="M80 105 Q100 115 120 105" stroke="#ef4f5f" strokeWidth="3" fill="none"/>
            </svg>
          </div>
          <h2>Welcome Back!</h2>
          <p>Sign in to explore delicious food options and place your orders with ease.</p>
          <ul className="auth-sidebar-benefits">
            <li>Discover new restaurants</li>
            <li>Fast & secure ordering</li>
            <li>Track your orders</li>
            <li>Exclusive deals & offers</li>
          </ul>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <div className="auth-logo">🍔 Zomato</div>
            <h1 className="auth-title">Welcome Back</h1>
            <span className="auth-badge">Customer</span>
            <p className="auth-subtitle">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label required">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label required">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
              <a
                href="#"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>

          <div className="divider">or</div>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              <span>G</span> Google
            </button>
            <button type="button" className="social-btn">
              <span>f</span> Facebook
            </button>
          </div>

          <div className="auth-footer">
            Don't have an account?{' '}
            <a href="/user/register">Create one</a>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Are you a restaurant?{' '}
            <a href="/food-partner/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-semibold)' }}>Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
