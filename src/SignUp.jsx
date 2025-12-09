import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [otpInput, setOtpInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' }) 
  const [generatedOtp, setGeneratedOtp] = useState(null)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [timer, setTimer] = useState(180) 
  const [attempts, setAttempts] = useState(3)
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

  const resetForm = useCallback(() => {
    setIsOtpSent(false)
    setFormData({ email: '', password: '' })
    setOtpInput('')
    setGeneratedOtp(null)
    setTimer(180)
    setAttempts(3)
    setFeedback({ type: '', message: '' }) 
  }, [])

  useEffect(() => {
    let interval = null
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    } else if (isOtpSent && timer === 0) {
      clearInterval(interval)
      setTimeout(() => { resetForm(); setFeedback({ type: 'error', message: 'Time Expired!' }) }, 0)
    }
    return () => clearInterval(interval)
  }, [isOtpSent, timer, resetForm])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

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
    const templateParams = { to_email: formData.email, otp: randomOtp, to_name: "Participant" }

    // Use your Service/Template IDs
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
    .then(() => {
      setIsOtpSent(true); setTimer(180); setAttempts(3); setLoading(false)
      setFeedback({ type: 'success', message: `OTP Sent to ${formData.email}` })
    })
    .catch((err) => {
      console.error(err); setLoading(false)
      setFeedback({ type: 'error', message: "Failed to send OTP." })
    })
  }

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault()
    if (otpInput === generatedOtp) {
      setLoading(true)
      try {
        const response = await fetch('https://confluence-backend-cgxl.onrender.com/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        })
        const data = await response.json()
        if (response.ok) {
          setFeedback({ type: 'success', message: "Account Created! Redirecting..." })
          setTimeout(() => navigate('/signin'), 1500)
        } else {
          setFeedback({ type: 'error', message: data.message || "Registration failed." })
          setLoading(false)
        }
      } catch (err) {
        console.error(err); setLoading(false); setFeedback({ type: 'error', message: "Server error." })
      }
    } else {
      const newAttempts = attempts - 1
      setAttempts(newAttempts)
      if (newAttempts > 0) setFeedback({ type: 'error', message: `Wrong OTP! ${newAttempts} remaining.` })
      else { setFeedback({ type: 'error', message: "Max attempts exceeded!" }); setTimeout(() => window.location.reload(), 1500) }
    }
  }

  const formatTime = () => `${Math.floor(timer / 60)}:${(timer % 60) < 10 ? '0' : ''}${timer % 60}`

  return (
    <div className="page">
      <div className="bubble-container"><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div></div>

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
            <span className="auth-page-label">Sign Up To</span>
            <h1 className="hero-main-text">THE CONFLUENCE</h1>
            <div className="hero-middle-row">
              <div className="hero-lines-group"><span className="decor-line"></span><span className="decor-line"></span><span className="decor-line"></span></div>
              <div className="hero-year-text">2026</div>
            </div>
            <div className="hero-sub-container"><p className="hero-sub-text">Research, Innovation & Start-up Summit</p></div>
          </div>
        </div>

        <div className="auth-right">
          {/* REMOVED INLINE STYLES HERE for responsiveness */}
          <div className="form-container">
            <div className="panel panel--outline">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="auth-title">Create Account</h2>
                <p style={{ color: '#ccc' }}>Register with your email to get started.</p>
              </div>

              <form onSubmit={isOtpSent ? handleVerifyAndRegister : handleSendOtp}>
                <div className="form-group">
                  <label className="form-label">Email ID</label>
                  <input type="email" name="email" className="form-input" placeholder="student@psgtech.ac.in" required value={formData.email} onChange={handleChange} disabled={isOtpSent || loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Create Password</label>
                  <input type="password" name="password" className="form-input" placeholder="********" required value={formData.password} onChange={handleChange} disabled={isOtpSent || loading} />
                </div>

                {isOtpSent && (
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(252, 211, 97, 0.05)', borderRadius: '8px', border: '1px solid rgba(252, 211, 97, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <label className="form-label" style={{ margin: 0 }}>Enter 6-Digit OTP</label>
                      <span style={{ color: timer < 60 ? '#ff6b6b' : '#fcd361', fontWeight: 'bold', fontSize: '0.9rem' }}>Time Left: {formatTime()}</span>
                    </div>
                    <input type="text" maxLength="6" className="form-input" placeholder="e.g. 123456" required value={otpInput} onChange={(e) => { setOtpInput(e.target.value); setFeedback({ type: '', message: '' }) }} style={{ letterSpacing: '0.2rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }} />
                  </div>
                )}
                {feedback.message && <div style={{ margin: '1rem 0', color: feedback.type === 'error' ? 'red' : 'cyan', textAlign: 'center' }}>{feedback.message}</div>}
                <div style={{ marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={loading}>{isOtpSent ? (loading ? 'Creating...' : 'Verify & Register') : (loading ? 'Sending...' : 'Send OTP')}</button>
                </div>
              </form>
              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
                Already have an account? <Link to="/signin" className="link-text">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}