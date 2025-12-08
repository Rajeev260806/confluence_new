import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function SignUp() {
  const navigate = useNavigate()

  // --- STATE ---
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [otpInput, setOtpInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' }) 

  // OTP State
  const [generatedOtp, setGeneratedOtp] = useState(null)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [timer, setTimer] = useState(180) 
  const [attempts, setAttempts] = useState(3)
  
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

  // --- HELPER FUNCTIONS ---
  const resetForm = useCallback(() => {
    setIsOtpSent(false)
    setFormData({ email: '', password: '' })
    setOtpInput('')
    setGeneratedOtp(null)
    setTimer(180)
    setAttempts(3)
    setFeedback({ type: '', message: '' }) 
  }, [])

  // --- OTP TIMER LOGIC ---
  useEffect(() => {
    let interval = null
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (isOtpSent && timer === 0) {
      clearInterval(interval)
      setTimeout(() => {
        resetForm()
        setFeedback({ 
          type: 'error', 
          message: 'Time Expired! The session has been reset. Please try again.' 
        })
      }, 0)
    }
    return () => clearInterval(interval)
  }, [isOtpSent, timer, resetForm])

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (feedback.message) setFeedback({ type: '', message: '' })
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' }) 
    
    if (!formData.email || !formData.password) {
      setFeedback({ type: 'error', message: "Please fill in both Email and Password first." })
      return
    }

    setLoading(true)

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(randomOtp)

    const templateParams = {
      to_email: formData.email,
      otp: randomOtp,
      to_name: "Participant"
    }

    emailjs.send(
      'service_0xn147n', 
      'template_r7admia',
      templateParams,
      'Hu-mV4mive9rzziRU' 
    )
    .then(() => {
      setIsOtpSent(true)
      setTimer(180) 
      setAttempts(3)
      setLoading(false)
      setFeedback({ type: 'success', message: `OTP Sent to ${formData.email}. Check your inbox!` })
    })
    .catch((err) => {
      console.error('FAILED...', err)
      setLoading(false)
      setFeedback({ type: 'error', message: "Failed to send OTP. Check internet or email address." })
    })
  }

  // --- UPDATED HANDLER: VERIFY OTP + REGISTER IN BACKEND ---
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' })

    // 1. Verify OTP first (Frontend Check)
    if (otpInput === generatedOtp) {
      
      // 2. If OTP is correct, send data to Backend
      setLoading(true)

      try {
        const response = await fetch('http://127.0.0.1:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: formData.email, 
            password: formData.password 
          }),
        })

        const data = await response.json()

        if (response.ok) {
          // Success: Database entry created
          setFeedback({ type: 'success', message: "Account Created! Redirecting..." })
          setTimeout(() => {
            navigate('/signin')
          }, 1500)
        } else {
          // Failure: Show error from backend (e.g., "User already exists")
          setFeedback({ type: 'error', message: data.message || "Registration failed." })
          setLoading(false)
        }

      } catch (err) {
        console.error("Signup Error:", err)
        setFeedback({ type: 'error', message: "Server connection failed. Is the backend running?" })
        setLoading(false)
      }

    } else {
      // Wrong OTP Logic
      const newAttempts = attempts - 1
      setAttempts(newAttempts)

      if (newAttempts > 0) {
        setFeedback({ 
          type: 'error', 
          message: `Wrong OTP! ${newAttempts} attempts remaining.` 
        })
      } else {
        setFeedback({ type: 'error', message: "Maximum attempts exceeded! Refreshing..." })
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    }
  }

  const formatTime = () => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
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

      {/* --- SPLIT SCREEN --- */}
      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="hero-container">
            <span className="auth-page-label">Sign Up To</span>
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
                <h2 style={{ color: '#fcd361', textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '2rem'}}>Create Account</h2>
                <p style={{ color: '#ccc' }}>Register with your email to get started.</p>
              </div>

              <form onSubmit={isOtpSent ? handleVerifyAndRegister : handleSendOtp}>
                <div className="form-group">
                  <label className="form-label">Email ID</label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="student@psgtech.ac.in" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isOtpSent || loading} 
                    style={isOtpSent ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Create Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-input" 
                    placeholder="********" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isOtpSent || loading}
                    style={isOtpSent ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                  />
                </div>

                {isOtpSent && (
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(252, 211, 97, 0.05)', borderRadius: '8px', border: '1px solid rgba(252, 211, 97, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <label className="form-label" style={{ margin: 0 }}>Enter 6-Digit OTP</label>
                      <span style={{ color: timer < 60 ? '#ff6b6b' : '#fcd361', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        Time Left: {formatTime()}
                      </span>
                    </div>
                    <input 
                      type="text" 
                      maxLength="6"
                      className="form-input" 
                      placeholder="e.g. 123456" 
                      required 
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value)
                        setFeedback({ type: '', message: '' }) 
                      }}
                      style={{ letterSpacing: '0.2rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                    />
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#ccc', textAlign: 'right' }}>
                      Attempts remaining: <span style={{ color: '#fff' }}>{attempts}</span>
                    </div>
                  </div>
                )}

                {feedback.message && (
                  <div style={{ 
                    marginTop: '1.5rem', 
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

                <div style={{ marginTop: '1.5rem' }}>
                  {!isOtpSent ? (
                    <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  ) : (
                    <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>
                      {loading ? 'Creating Account...' : 'Verify & Create Account'}
                    </button>
                  )}
                </div>
              </form>
              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
                Already have an account?{' '}
                <Link to="/signin" style={{ color: '#fcd361', textDecoration: 'none', fontWeight: 'bold' }}>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}