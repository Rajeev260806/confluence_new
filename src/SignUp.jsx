import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function SignUp() {
  const navigate = useNavigate()

  // --- STATE ---
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' }) 
  
  // --- MINI TIMER STATE (Event Countdown) ---
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (feedback.message) setFeedback({ type: '', message: '' })
  }

  // --- SUBMIT: DIRECT REGISTRATION (No OTP) ---
  const handleRegister = async (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' })
    
    if (!formData.email || !formData.password) {
      setFeedback({ type: 'error', message: "Please fill in both Email and Password." })
      return
    }

    setLoading(true)

    try {
      // Connect to your Backend (Docker/Nginx path)
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })

      const data = await response.json()

      if (response.ok) {
        setFeedback({ type: 'success', message: "Account Created Successfully! Redirecting..." })
        setTimeout(() => navigate('/signin'), 1500)
      } else {
        setFeedback({ type: 'error', message: data.message || "Registration failed." })
        setLoading(false)
      }
    } catch (err) {
      console.error("Signup Error:", err)
      setFeedback({ type: 'error', message: "Server connection failed." })
      setLoading(false)
    }
  }

  return (
    <div className="page">
      
      {/* 1. BACKGROUND BUBBLES */}
      <div className="bubble-container">
        <div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="auth-wrapper">
        
        {/* Left Side: Hero Text */}
        <div className="auth-left">
          <div className="hero-container">
            <span className="auth-page-label">Sign Up To</span>
            <h1 className="hero-main-text">THE CONFLUENCE</h1>
            <div className="hero-middle-row">
              <div className="hero-lines-group"><span className="decor-line"></span><span className="decor-line"></span><span className="decor-line"></span></div>
              <div className="hero-year-text">2026</div>
            </div>
            <div className="hero-sub-container"><p className="hero-sub-text">Research, Innovation & Start-up Summit</p></div>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="auth-right">
          <div className="form-container">
            <div className="panel panel--outline">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="auth-title">Create Account</h2>
                <p style={{ color: '#ccc' }}>Register with your email to get started.</p>
              </div>

              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="form-label">Email ID</label>
                  <input type="email" name="email" className="form-input" placeholder="student@psgtech.ac.in" required value={formData.email} onChange={handleChange} disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Create Password</label>
                  <input type="password" name="password" className="form-input" placeholder="********" required value={formData.password} onChange={handleChange} disabled={loading} />
                </div>

                {feedback.message && (
                  <div className={`feedback-msg ${feedback.type === 'error' ? 'error' : 'success'}`} style={{ marginBottom: '1.5rem', padding: '0.8rem', borderRadius: '6px', textAlign: 'center', background: feedback.type === 'error' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(56, 189, 248, 0.1)', color: feedback.type === 'error' ? '#ff6b6b' : '#38bdf8' }}>
                    {feedback.message}
                  </div>
                )}

                <div style={{ marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
              </form>
              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
                Already have an account? <Link to="/signin" className="link-text">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVBAR (MOVED TO BOTTOM FOR LAYERING FIX) */}
      <nav className="site-nav" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 9999999 }}>
        <div className="site-nav__brand">
          <img src={psgTechLogo} alt="Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain', marginRight: '1rem', borderRadius: '5px' }}/>
          <span>PSG College of Technology</span>
        </div>
        <div className="nav-center-block" style={{ color: '#fff' }}> {/* Added color fix just in case */}
          <div className="nav-date">Feb 27 • 2026</div>
          <div className="nav-timer">{timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s</div>
        </div>
        <Link to="/" className="btn btn--primary">Home</Link>
      </nav>

    </div>
  )
}