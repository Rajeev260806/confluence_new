import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function SignIn() {
  const navigate = useNavigate()
  // --- STATE ---
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  // --- MINI TIMER STATE ---
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  // --- EFFECT: MINI COUNTDOWN LOGIC ---
  useEffect(() => {
    const eventDate = new Date('2026-02-27T09:00:00+05:30')
    const interval = setInterval(() => {
      const now = new Date()
      const difference = eventDate - now

      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // --- HANDLERS ---
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    if (feedback.message) setFeedback({ type: '', message: '' })
  }

  // --- UPDATED HANDLER: REAL BACKEND LOGIN ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!credentials.email || !credentials.password) {
      setFeedback({ type: 'error', message: 'Please enter both Email and Password.' })
      return
    }

    setLoading(true)
    setFeedback({ type: '', message: '' })

    try {
      // 1. Connect to Backendhtt
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok) {
        // 2. Success: Save User ID for Dashboard
        localStorage.setItem('userId', data.user_id) 
        localStorage.setItem('userEmail', data.email)

        setFeedback({ type: 'success', message: 'Sign In Successful!' })

        // 3. Redirect
        setTimeout(() => {
          navigate('/dashboard') 
        }, 1000)
      } else {
        // Failure (Wrong password/email)
        setFeedback({ type: 'error', message: data.message || 'Invalid credentials' })
      }
    } catch (err) {
      console.error("Login Error:", err)
      setFeedback({ type: 'error', message: 'Server connection failed. Is backend running?' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Background Bubbles */}
      <div className="bubble-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* --- UPDATED NAVBAR --- */}
      <nav className="site-nav">
        <div className="site-nav__brand">
          <img 
            src={psgTechLogo} 
            alt="PSG Tech Logo" 
            style={{ height: '50px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)' }} 
          />
          <span>PSG College of Technology</span>
        </div>

        {/* CENTER: Updated Date */}
        <div className="nav-center-block">
          <div className="nav-date">Feb 27 • 2026</div>
          <div className="nav-timer">
            {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" className="btn btn--primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
            Home
          </Link>
        </div>
      </nav>

      {/* --- SPLIT SCREEN LAYOUT --- */}
      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="hero-container">
            <span className="auth-page-label">Sign In To</span>
            <h1 className="hero-main-text">THE CONFLUENCE</h1>
            <div className="hero-middle-row">
              <div className="hero-lines-group">
                <span className="decor-line"></span>
                <span className="decor-line"></span>
                <span className="decor-line"></span>
              </div>
              <div className="hero-year-text">2026</div>
            </div>
            <div className="hero-sub-container">
              <p className="hero-sub-text">Research, Innovation & Start-up Summit</p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-container" style={{ width: '100%', maxWidth: '500px', margin: '0' }}>
            <div className="panel panel--outline">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#fcd361', marginBottom: '0.5rem', fontSize: '2rem', textTransform: 'uppercase' }}>
                  Welcome Back
                </h2>
                <p style={{ color: '#ccc' }}>
                  Enter your registered Email and Password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="student@psgtech.ac.in" 
                    required 
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-input" 
                    placeholder="********" 
                    required 
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                {feedback.message && (
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    padding: '0.8rem', 
                    borderRadius: '6px', 
                    textAlign: 'center',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    background: feedback.type === 'error' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(56, 189, 248, 0.1)',
                    border: feedback.type === 'error' ? '1px solid #ff6b6b' : '1px solid #38bdf8',
                    color: feedback.type === 'error' ? '#ff6b6b' : '#38bdf8'
                  }}>
                    {feedback.message}
                  </div>
                )}
                <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#fcd361', textDecoration: 'none', fontWeight: 'bold' }}>
                  Sign Up here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}