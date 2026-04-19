import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="home-title">
            <span className="title-emoji">🍽️</span> Welcome to Zomato
          </h1>
          <p className="home-subtitle">Delicious food, delivered to your door. Or grow your restaurant with us!</p>
        </div>
        <div className="header-decoration"></div>
      </header>

      <div className="home-cards">
        <div className="home-card customer-card">
          <div className="card-image-container customer-image">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" fill="url(#customerGradient)"/>
              <circle cx="100" cy="70" r="35" fill="#FFD700"/>
              <path d="M 70 120 Q 70 100 100 100 Q 130 100 130 120 L 130 150 Q 130 160 120 160 L 80 160 Q 70 160 70 150 Z" fill="#FF6B7A"/>
              <rect x="60" y="140" width="80" height="25" fill="#4CAF50" rx="5"/>
              <defs>
                <linearGradient id="customerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#FFE5E5', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#FFF0F0', stopOpacity: 1}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="card-icon">🛒</div>
          <h2>Hungry Customer?</h2>
          <p className="card-description">Browse thousands of restaurants and order your favorite meals.</p>
          <div className="button-group">
            <Link to="/user/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/user/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>

        <div className="home-card partner-card">
          <div className="card-image-container partner-image">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" fill="url(#partnerGradient)"/>
              <rect x="40" y="60" width="120" height="80" fill="#8B4513" rx="5"/>
              <rect x="45" y="70" width="110" height="60" fill="#FFA500" rx="3"/>
              <rect x="50" y="75" width="25" height="25" fill="#FF6B7A" rx="2"/>
              <rect x="85" y="75" width="25" height="25" fill="#FFD700" rx="2"/>
              <rect x="120" y="75" width="25" height="25" fill="#4CAF50" rx="2"/>
              <circle cx="100" cy="150" r="12" fill="#2196F3"/>
              <defs>
                <linearGradient id="partnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#E5F5FF', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#F0F8FF', stopOpacity: 1}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="card-icon">🏪</div>
          <h2>Food Partner?</h2>
          <p className="card-description">List your restaurant and reach hungry customers in your area.</p>
          <div className="button-group">
            <Link to="/food-partner/register" className="btn btn-primary">
              Join Now
            </Link>
            <Link to="/food-partner/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="feature">
          <div className="feature-image-container">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#FFE5E5"/>
              <path d="M 30 50 L 45 65 L 70 35" stroke="#FF6B7A" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="50" cy="30" r="8" fill="#FF6B7A"/>
            </svg>
          </div>
          <div className="feature-icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Get your food delivered in 30 minutes or less</p>
        </div>
        <div className="feature">
          <div className="feature-image-container">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#E5F5FF"/>
              <rect x="35" y="35" width="30" height="35" fill="#2196F3" rx="3"/>
              <circle cx="50" cy="42" r="4" fill="#fff"/>
              <path d="M 40 58 L 60 58 M 40 65 L 60 65" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="feature-icon">🔒</div>
          <h3>Safe & Secure</h3>
          <p>Your payments and personal data are always protected</p>
        </div>
        <div className="feature">
          <div className="feature-image-container">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#FFF5E5"/>
              <polygon points="50,20 61,45 88,45 67,62 78,87 50,70 22,87 33,62 12,45 39,45" fill="#FFD700"/>
            </svg>
          </div>
          <div className="feature-icon">⭐</div>
          <h3>Quality Assured</h3>
          <p>Rated restaurants with verified reviews and ratings</p>
        </div>
      </section>
    </div>
  )
}

export default Home