import React, { useState, useRef, useEffect } from 'react'
import '../styles/seeallfoods_modern.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Seeallfoods = () => {
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const videoRefs = useRef([])
  const touchStartY = useRef(0)

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/fooditems', { withCredentials: true })
        setFoodItems(response.data.fooditems)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchFoodItems()
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const height = container.clientHeight
      const newIndex = Math.round(container.scrollTop / height)

      if (newIndex !== currentIndex && newIndex < foodItems.length) {
        setCurrentIndex(newIndex)

        if (videoRefs.current[currentIndex]) {
          videoRefs.current[currentIndex].pause()
        }

        if (videoRefs.current[newIndex]) {
          videoRefs.current[newIndex].play().catch(() => {})
        }
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentIndex, foodItems.length])

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY
    const container = scrollContainerRef.current

    if (!container) return

    const height = container.clientHeight

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < foodItems.length - 1) {
        container.scrollTo({ top: (currentIndex + 1) * height, behavior: 'smooth' })
      } else if (diff < 0 && currentIndex > 0) {
        container.scrollTo({ top: (currentIndex - 1) * height, behavior: 'smooth' })
      }
    }
  }

  const handleVisitStore = (id) => {
    if (id) navigate(`/food-partner/${id}`)
  }

  const handleLike = async (id, index) => {
    try {
      await axios.post(
        "https://myfoodapp-2.onrender.com/api/fooditems/like",
        { fooditemid: id },
        { withCredentials: true }
      )

      setFoodItems(prev =>
        prev.map(item =>
          item._id === id
            ? { ...item, likecount: item.likecount + 1, isLiked: true }
            : item
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleVideoClick = () => {
    const video = videoRefs.current[currentIndex]
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
  }

  if (loading) return <div className="loader">Loading...</div>

  return (
    <div className="container">
      <div
        className="scroll"
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {foodItems.map((food, index) => (
          <div className="reel" key={food._id}>

            <video
              ref={el => videoRefs.current[index] = el}
              src={food.video}
              autoPlay={index === 0}
              loop
              muted
              playsInline
              className="video"
              onClick={handleVideoClick}
            />

            <div className="top">
              <button onClick={() => navigate(-1)}>←</button>
              <button onClick={() => handleVisitStore(food.foodpartner)}>Visit Store</button>
            </div>

            <div className="right">
              <button onClick={() => handleLike(food._id, index)}>
                {food.isLiked ? '❤️' : '🤍'}
                <span>{food.likecount}</span>
              </button>

              <button>💬<span>0</span></button>
              <button>↗️</button>
            </div>

            <div className="bottom">
              <h3>{food.name}</h3>
              <p>{food.description}</p>

              <div className="info">
                ⭐ {food.rating || '4.2'}
                ⏱ {food.deliveryTime || '20-30'}m
                📍 {food.location || 'Near you'}
              </div>

              <button
                className="order"
                onClick={() => handleVisitStore(food.foodpartner)}
              >
                Place Order
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Seeallfoods