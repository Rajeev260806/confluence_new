import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function SignIn() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const eventDate = new Date('2026-02-27T09:00:00+05:30')
    const interval = setInterval(() => {
      const now = new Date()
      const diff = eventDate - now
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        })
      } else clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    if (feedback.message) setFeedback({ type: '', message: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!credentials.email || !credentials.password) {
      setFeedback({ type: 'error', message: 'Please enter both Email and Password.' })
      return
    }
    setLoading(true)
    try {
      // Use your Render URL with /api
      const response = await fetch('https://confluence-backend-cgxl.onrender.com/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('userId', data.user_id) 
        localStorage.setItem('userEmail', data.email)
        setFeedback({ type: 'success', message: 'Sign In Successful!' })
        setTimeout(() => navigate('/dashboard'), 1000)
      } else {
        setFeedback({ type: 'error', message: data.message || 'Invalid credentials' })
      }
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Server connection failed.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="bubble-container">
        <div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div>
      </div>

      <nav className="site-nav">
        <div className="site-nav__brand">
          <img src={psgTechLogo} alt="Logo" />
          <span>PSG College of Technology</span>
        </div>
        <div className="nav-center-block">
          <div className="nav-date">Feb 27 • 2026</div>
          <div className="nav-timer">{timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s</div>
        </div>
        <Link to="/" className="btn btn--primary">Home</Link>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="hero-container">
            <span className="auth-page-label">Sign In To</span>
            <h1 className="hero-main-text">THE CONFLUENCE</h1>
            <div className="hero-middle-row">
              <div className="hero-lines-group"><span className="decor-line"></span><span className="decor-line"></span><span className="decor-line"></span></div>
              <div className="hero-year-text">2026</div>
            </div>
            <div className="hero-sub-container"><p className="hero-sub-text">Research, Innovation & Start-up Summit</p></div>
          </div>
        </div>

        <div className="auth-right">
          {/* REMOVED INLINE STYLES HERE so CSS can control responsiveness */}
          <div className="form-container">
            <div className="panel panel--outline">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="auth-title">Welcome Back</h2>
                <p style={{ color: '#ccc' }}>Enter your registered Email and Password.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" className="form-input" placeholder="student@psgtech.ac.in" required value={credentials.email} onChange={handleChange} disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-input" placeholder="********" required value={credentials.password} onChange={handleChange} disabled={loading} />
                </div>
                {feedback.message && (
                  <div className={`feedback-msg ${feedback.type === 'error' ? 'error' : 'success'}`} style={{ marginBottom: '1.5rem', padding: '0.8rem', borderRadius: '6px', textAlign: 'center', background: feedback.type === 'error' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(56, 189, 248, 0.1)', color: feedback.type === 'error' ? '#ff6b6b' : '#38bdf8' }}>
                    {feedback.message}
                  </div>
                )}
                <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
              </form>
              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
                Don't have an account? <Link to="/signup" className="link-text">Sign Up here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}