import '../styles/theme.css';
import '../styles/form.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      name,
      email,
      phone,
      password
    },{withCredentials:true});
    console.log(response.data);
    navigate('/user/login');
  }
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-sidebar">
          <div className="auth-sidebar-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
              <path d="M50 120 L80 100 L120 100 L150 120 Z" fill="white"/>
              <circle cx="70" cy="90" r="15" fill="#ef4f5f"/>
              <circle cx="130" cy="90" r="15" fill="#ef4f5f"/>
              <path d="M85 110 L100 125 L115 110" stroke="#ef4f5f" strokeWidth="4" fill="none"/>
              <circle cx="100" cy="75" r="20" fill="white"/>
              <path d="M90 70 Q100 65 110 70 Q110 80 100 85 Q90 80 90 70" fill="#ef4f5f"/>
            </svg>
          </div>
          <h2>Join the Food Revolution!</h2>
          <p>Create your account and start exploring thousands of restaurants at your fingertips.</p>
          <ul className="auth-sidebar-benefits">
            <li>Free account setup</li>
            <li>Easy online ordering</li>
            <li>Real-time order tracking</li>
            <li>Exclusive member benefits</li>
          </ul>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <div className="auth-logo">🍔 Zomato</div>
            <h1 className="auth-title">Create Account</h1>
            <span className="auth-badge">Customer</span>
            <p className="auth-subtitle">Join us to discover restaurants & order food</p>
          </div>

          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <label htmlFor="fullname" className="form-label required">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className="form-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label required">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="your.email@example.com"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label required">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                placeholder="+91 98765 43210"
                onChange={(e)=>setPhone(e.target.value)}
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
                placeholder="Min. 8 characters"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="form-helper">
                Use uppercase, numbers & special characters for better security
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                className="form-checkbox"
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <a href="#" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Create Account
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
            Already have an account?{' '}
            <a href="/user/login">Sign in</a>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Are you a restaurant?{' '}
            <a href="/food-partner/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-semibold)' }}>Register here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
