import '../styles/theme.css';
import '../styles/form.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const[contactName,setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address,setAddress] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://myfoodapp-2.onrender.com/api/foodpartner/partner/signup', 
        
        { name, contactName, email, phone, password, address },  {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }});
      
      navigate('/food-partner/login');
    } catch (error) {
      console.error('Error registering food partner:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-sidebar">
          <div className="auth-sidebar-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
              <rect x="60" y="70" width="80" height="50" rx="10" fill="white"/>
              <rect x="70" y="80" width="60" height="8" rx="4" fill="#ef4f5f"/>
              <rect x="70" y="92" width="45" height="8" rx="4" fill="#ef4f5f"/>
              <rect x="70" y="104" width="50" height="8" rx="4" fill="#ef4f5f"/>
              <circle cx="150" cy="85" r="8" fill="#ef4f5f"/>
              <circle cx="150" cy="100" r="8" fill="#ef4f5f"/>
              <circle cx="150" cy="115" r="8" fill="#ef4f5f"/>
              <path d="M40 130 L160 130 L150 150 L50 150 Z" fill="white"/>
              <circle cx="70" cy="140" r="6" fill="#ef4f5f"/>
              <circle cx="130" cy="140" r="6" fill="#ef4f5f"/>
            </svg>
          </div>
          <h2>Grow Your Business</h2>
          <p>Join thousands of restaurants already on Zomato and reach more customers than ever.</p>
          <ul className="auth-sidebar-benefits">
            <li>Expand your customer base</li>
            <li>Easy menu management</li>
            <li>Real-time analytics</li>
            <li>Dedicated support team</li>
          </ul>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <div className="auth-logo">🍔 Zomato</div>
            <h1 className="auth-title">Partner With Us</h1>
            <span className="auth-badge">Restaurant Partner</span>
            <p className="auth-subtitle">Start your restaurant's digital journey today</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="restaurant-name" className="form-label required">
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurant-name"
                className="form-input"
                placeholder="Enter restaurant name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-name" className="form-label required">
                Contact Name
              </label>
              <input
                type="text"
                id="contact-name"
                className="form-input"
                placeholder="Your full name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label required">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="form-input"
                placeholder="Enter restaurant address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Register Restaurant
            </button>
          </form>

          <div className="auth-footer">
            Already a partner?{' '}
            <a href="/food-partner/login">Sign in</a>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Looking to order food?{' '}
            <a href="/user/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-semibold)' }}>Sign up as customer</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
