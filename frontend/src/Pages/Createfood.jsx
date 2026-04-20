import React, { useState } from 'react'
import axios from 'axios'
import '../styles/form.css'
import { useNavigate } from 'react-router-dom'

const Createfood = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null
  })

  const [videoPreview, setVideoPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setErrors(prev => ({
          ...prev,
          video: 'Please select a valid video file'
        }))
        return
      }

      // Validate file size (e.g., max 100MB)
      const maxSize = 100 * 1024 * 1024
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          video: 'Video file size should be less than 100MB'
        }))
        return
      }

      setFormData(prev => ({
        ...prev,
        video: file
      }))

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)

      // Clear error
      if (errors.video) {
        setErrors(prev => ({
          ...prev,
          video: ''
        }))
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Food name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (!formData.video) {
      newErrors.video = 'Video file is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Create FormData for multipart/form-data submission
    const submitData = new FormData()
    submitData.append('name', formData.name)
    submitData.append('description', formData.description)
    submitData.append('video', formData.video)

    try {
      setLoading(true)
      setSuccessMessage('')
      setErrors({})

      const response = await axios.post(
        'http://localhost:5000/api/fooditems',
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }, withCredentials: true 
        }
      )

      
      setSuccessMessage('Food item created successfully!')
      navigate('/')
      // Reset form after successful submission
      setTimeout(() => {
        handleReset()
        setSuccessMessage('')
      }, 2000)
    } catch (error) {
      console.error('Error creating food item:', error)
      const errorMessage = error.response?.data?.message || 'Failed to create food item. Please try again.'
      setErrors({ submit: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      video: null
    })
    setVideoPreview(null)
    setErrors({})
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper" style={{ maxWidth: '500px' }}>
        <div className="auth-header">
          <div className="auth-logo">🍕</div>
          <h2 className="auth-title">Create Food Item</h2>
          <p className="auth-subtitle">Add a new food item to your menu</p>
        </div>

        {successMessage && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: 'var(--spacing-lg)',
            border: '1px solid #c3e6cb'
          }}>
            ✓ {successMessage}
          </div>
        )}

        {errors.submit && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: 'var(--spacing-lg)',
            border: '1px solid #f5c6cb'
          }}>
            ✕ {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label required" htmlFor="name">
              Food Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g., Margherita Pizza"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p style={{ color: 'var(--error-color)', fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label className="form-label required" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-input form-textarea"
              placeholder="Describe your food item in detail..."
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <p style={{ color: 'var(--error-color)', fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
                {errors.description}
              </p>
            )}
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Video Upload Field */}
          <div className="form-group">
            <label className="form-label required" htmlFor="video">
              Upload Video
            </label>
            <div
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--spacing-lg)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: 'var(--bg-tertiary)'
              }}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => document.getElementById('videoInput').click()}
            >
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span style={{ fontSize: '28px' }}>🎥</span>
              </div>
              <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', marginBottom: '4px' }}>
                Click to upload or drag and drop
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                MP4, WebM, or MOV up to 100MB
              </p>
              <input
                id="videoInput"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Video Preview */}
            {videoPreview && (
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: '8px' }}>
                  ✓ {formData.video.name}
                </p>
                <video
                  width="100%"
                  height="200"
                  style={{ borderRadius: 'var(--border-radius-md)', backgroundColor: '#000' }}
                  controls
                >
                  <source src={videoPreview} />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, video: null }))
                    setVideoPreview(null)
                  }}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--error-color)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--border-radius-sm)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  Remove Video
                </button>
              </div>
            )}

            {errors.video && (
              <p style={{ color: 'var(--error-color)', fontSize: 'var(--font-size-sm)', marginTop: '8px' }}>
                {errors.video}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Creating...' : 'Create Food Item'}
            </button>
            <button type="button" onClick={handleReset} className="btn btn-outline" disabled={loading}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Createfood