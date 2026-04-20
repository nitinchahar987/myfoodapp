import '../styles/theme.css';
import '../styles/form.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/foodpartner/partner/login', {
      email,
      password
    },{withCredentials:true});
    
    navigate('/create-food');
  }
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-sidebar">
          <div className="auth-sidebar-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
              <rect x="70" y="70" width="60" height="40" rx="8" fill="white"/>
              <rect x="75" y="75" width="50" height="6" rx="3" fill="#ef4f5f"/>
              <rect x="75" y="85" width="35" height="6" rx="3" fill="#ef4f5f"/>
              <rect x="75" y="95" width="40" height="6" rx="3" fill="#ef4f5f"/>
              <circle cx="140" cy="85" r="12" fill="#ef4f5f"/>
              <circle cx="140" cy="95" r="12" fill="#ef4f5f"/>
              <circle cx="140" cy="105" r="12" fill="#ef4f5f"/>
            </svg>
          </div>
          <h2>Partner Dashboard</h2>
          <p>Access your restaurant management tools and grow your business on Zomato.</p>
          <ul className="auth-sidebar-benefits">
            <li>Manage your menu</li>
            <li>Track orders & analytics</li>
            <li>Customer reviews</li>
            <li>Increase visibility</li>
          </ul>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <div className="auth-logo">🍔 Zomato</div>
            <h1 className="auth-title">Partner Login</h1>
            <span className="auth-badge">Restaurant Partner</span>
            <p className="auth-subtitle">Manage your restaurant on Zomato</p>
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
            New to Zomato?{' '}
            <a href="/food-partner/register">Register your restaurant</a>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Looking to order food?{' '}
            <a href="/user/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-semibold)' }}>Sign in as customer</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
