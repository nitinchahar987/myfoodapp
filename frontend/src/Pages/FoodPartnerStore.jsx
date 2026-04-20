import React, { use, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/foodpartnerstore.css'
import axios from 'axios'
import { useState } from 'react'
const FoodPartnerStore = ({ partnerData = {}, products = [] }) => {
  const [ownerData, setOwnerData] = useState({})
  const [items, setItems] = useState([])
  const [ownerid, setOwnerid] = useState('')
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const navigate = useNavigate()
  const {Id}=useParams()
  
  
  useEffect(() => {
    axios.get(`https://myfoodapp-2.onrender.com/api/fooditems/food-partneritems/${Id}`, { withCredentials: true })
        .then(response => {
          
          setOwnerid( response.data.fooditems[0].foodpartner);
          setItems(response.data.fooditems);
        });

  }, [Id])

  useEffect(() => {
      if (!ownerid) return;
    axios.get(`http://localhost:5000/api/foodpartner/partner/${ownerid}`, { withCredentials: true })
        .then(response => {
          
          setOwnerData(response.data.partnerdata);
          
        });
  }, [ownerid])

  // Auto-swipe carousel effect
  useEffect(() => {
    if (items.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items.length])

  const handlePrevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="foodpartner-store-container">
      {/* Header with Back Button */}
      <div className="store-header">
        <button className="back-btn" onClick={() => navigate('/see-all-foods')}>
          ← Back
        </button>
      </div>

      {/* Partner Info Section */}
      <div className="partner-info-section">
        <div className="partner-banner">
          <div className="partner-avatar">
            {ownerData?.name?.charAt(0).toUpperCase() || 'P'}
          </div>
        </div>

        <div className="partner-details">
          {/* Background Carousel */}
          {items.length > 0 && (
            <div className="partner-details-carousel">
              {items.map((item, index) => (
                <div
                  key={item._id}
                  className={`carousel-bg-slide ${index === currentCarouselIndex ? 'active' : ''}`}
                >
                  <video
                    src={item.video}
                    className="carousel-bg-video"
                    poster={item.thumbnail}
                  />
                </div>
              ))}
            </div>
          )}

          <h1 className="partner-name">{ownerData?.name || 'Partner Name'}</h1>
          
          <div className="partner-stats">
            <div className="stat-card">
              <span className="stat-label">Total Orders Served</span>
              <span className="stat-value">
                {partnerData?.totalOrdersServed || 0}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Remaining Orders</span>
              <span className="stat-value">
                {partnerData?.remainingOrders || 0}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Rating</span>
              <span className="stat-value">
                ⭐ {partnerData?.rating || 4.5}
              </span>
            </div>
          </div>

          <div className="partner-description">
            <p>{partnerData?.description || 'Premium food partner'}</p>
          </div>

          <div className="partner-contact">
            <span className="contact-item">📍 {partnerData?.location || 'Location not specified'}</span>
            <span className="contact-item">⏱️ Delivery: 20-30 mins</span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2 className="products-title">Our Products</h2>
        
        {items.length === 0 ? (
          <div className="no-products">
            <p>No products available from this food partner</p>
          </div>
        ) : (
          <div className="products-grid">
            {items.map((item) => (
              <div key={item._id} className="product-card">
                <div className="product-video-container">
                  <video
                    src={item.video}
                    controls
                    className="product-video"
                    poster={item.thumbnail}
                  />
                </div>

                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-description">{item.description}</p>
                  
                  {item.price && (
                    <div className="product-price">
                      <span className="price">₹{item.price}</span>
                    </div>
                  )}

                  <button className="add-to-cart-btn">
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="store-footer">
        <button className="order-btn">Place Order</button>
      </div>
    </div>
  )
}

export default FoodPartnerStore
