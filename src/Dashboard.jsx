import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function Dashboard() {
  const navigate = useNavigate()

  // --- DOMAIN & SUB-DOMAIN DATA ---
  const domainData = {
    "SDG 3: Good Health & Well-being": ["Health Tech", "Telemedicine", "Mental Wellness", "Medical Devices"],
    "SDG 6: Clean Water & Sanitation": ["Water Purification", "Waste Water Treatment", "Smart Irrigation"],
    "SDG 7: Affordable & Clean Energy": ["Solar Tech", "EV Infrastructure", "Bio-Energy", "Smart Grids"],
    "SDG 9: Industry, Innovation & Infrastructure": ["IoT & Automation", "Sustainable Materials", "Smart Manufacturing"],
    "SDG 11: Sustainable Cities & Communities": ["Urban Mobility", "Green Building", "Disaster Management"],
    "SDG 12: Responsible Consumption & Production": ["Circular Economy", "Waste Management", "Eco-Packaging"],
    "SDG 13: Climate Action": ["Carbon Capture", "Renewable Tech", "Climate Analytics"]
  }

  // --- STATE ---
  const [registrationStatus, setRegistrationStatus] = useState({
    ideaPitching: false,      
    inventorsExhibit: false   
  })
  const [expandedCard, setExpandedCard] = useState(null)
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem('userId')

  // ==========================================
  // FORM 1: IDEA PITCHING STATE
  // ==========================================
  const [ideaForm, setIdeaForm] = useState({
    leadName: '', leadGender: '', leadEmail: '', leadMobile: '',
    institutionName: '', exhibitorType: '', department: '', degree: '', yearOfStudy: '', city: '', state: '',
    participationMode: 'Individual',
    teamName: '', teamSize: '', teamMembers: [],
    // New Fields
    domain: '', subDomain: '',
    title: '', category: '', otherCategory: '', abstractFile: null,
    declarationOriginal: false, declarationRules: false, declarationPhoto: false
  })

  // ==========================================
  // FORM 2: INVENTORS EXHIBIT STATE
  // ==========================================
  const [inventorForm, setInventorForm] = useState({
    fullName: '', gender: '', email: '', mobile: '', altMobile: '',
    institutionName: '', exhibitorType: '', department: '', degree: '', yearOfStudy: '', city: '', state: '',
    participationMode: 'Individual',
    teamName: '', teamSize: '', teamMembers: [],
    // New Fields
    domain: '', subDomain: '',
    title: '', category: '', otherCategory: '', abstractFile: null,
    declarationOriginal: false, declarationRules: false, declarationPhoto: false
  })

  // --- CHECKBOX VALIDATION ---
  const ideaAllChecked = ideaForm.declarationOriginal && ideaForm.declarationRules && ideaForm.declarationPhoto
  const inventorAllChecked = inventorForm.declarationOriginal && inventorForm.declarationRules && inventorForm.declarationPhoto

  // --- FETCH STATUS ---
  useEffect(() => {
    if (!userId) {
      navigate('/signin')
      return
    }
    const fetchStatus = async () => {
      try {
        // NOTE: Ensure this URL matches your backend (add /api if needed)
        const response = await fetch(`api/status/${userId}`)
        if (response.ok) {
          const data = await response.json()
          setRegistrationStatus({
            ideaPitching: data.ideaPitching,
            inventorsExhibit: data.inventorsExhibit
          })
        }
      } catch (err) {
        console.error("Error fetching status:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [userId, navigate])

  // --- TIMER ---
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

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    navigate('/signin')
  }
  const toggleCard = (cardName) => setExpandedCard(expandedCard === cardName ? null : cardName)

  // ==========================================
  // HANDLERS: IDEA PITCHING
  // ==========================================
  const handleIdeaChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    
    // Logic: If Domain changes, clear the Sub-Domain
    if (name === 'domain') {
      setIdeaForm({ ...ideaForm, domain: val, subDomain: '' })
    } else {
      setIdeaForm({ ...ideaForm, [name]: val })
    }
  }
  
  const handleIdeaFile = (e) => setIdeaForm({ ...ideaForm, abstractFile: e.target.files[0] })
  
  const handleIdeaTeamSize = (e) => {
    const size = parseInt(e.target.value) || 0
    const membersNeeded = size >= 2 ? size : 0
    const newMembers = Array(membersNeeded).fill().map(() => ({ name: '', email: '', mobile: '', designation: '', institution: '' }))
    setIdeaForm({ ...ideaForm, teamSize: e.target.value, teamMembers: newMembers })
  }
  
  const handleIdeaMemberUpdate = (index, field, value) => {
    const updated = [...ideaForm.teamMembers]
    updated[index][field] = value
    setIdeaForm({ ...ideaForm, teamMembers: updated })
  }

  const handleIdeaSubmit = async (e) => {
    e.preventDefault()
    if (!ideaAllChecked) return

    const formData = new FormData()
    Object.keys(ideaForm).forEach(key => {
      if (key === 'teamMembers') {
        formData.append(key, JSON.stringify(ideaForm[key]))
      } else if (key !== 'abstractFile') {
        formData.append(key, ideaForm[key])
      }
    })
    if (ideaForm.abstractFile) formData.append('abstractFile', ideaForm.abstractFile)
    formData.append('userId', userId)

    try {
      // Ensure URL is correct
      const res = await fetch('api/register/idea', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        alert("Idea Pitching Registered Successfully!")
        setRegistrationStatus(prev => ({ ...prev, ideaPitching: true }))
        setExpandedCard(null)
      } else {
        alert("Registration Failed. Check backend logs.")
      }
    } catch (err) {
      console.error(err)
      alert("Server Error")
    }
  }

  // ==========================================
  // HANDLERS: INVENTORS EXHIBIT
  // ==========================================
  const handleInventorChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value

    // Logic: If Domain changes, clear the Sub-Domain
    if (name === 'domain') {
      setInventorForm({ ...inventorForm, domain: val, subDomain: '' })
    } else {
      setInventorForm({ ...inventorForm, [name]: val })
    }
  }

  const handleInventorFile = (e) => setInventorForm({ ...inventorForm, abstractFile: e.target.files[0] })
  
  const handleInventorTeamSize = (e) => {
    const size = parseInt(e.target.value) || 0
    const membersNeeded = size >= 2 ? size : 0
    const newMembers = Array(membersNeeded).fill().map(() => ({ name: '', email: '', mobile: '', designation: '', institution: '' }))
    setInventorForm({ ...inventorForm, teamSize: e.target.value, teamMembers: newMembers })
  }

  const handleInventorMemberUpdate = (index, field, value) => {
    const updated = [...inventorForm.teamMembers]
    updated[index][field] = value
    setInventorForm({ ...inventorForm, teamMembers: updated })
  }

  const handleInventorSubmit = async (e) => {
    e.preventDefault()
    if (!inventorAllChecked) return 

    const formData = new FormData()
    Object.keys(inventorForm).forEach(key => {
      if (key === 'teamMembers') {
        formData.append(key, JSON.stringify(inventorForm[key]))
      } else if (key !== 'abstractFile') {
        formData.append(key, inventorForm[key])
      }
    })
    if (inventorForm.abstractFile) formData.append('abstractFile', inventorForm.abstractFile)
    formData.append('userId', userId)

    try {
      const res = await fetch('api/register/inventor', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        alert("Inventors Exhibit Registered Successfully!")
        setRegistrationStatus(prev => ({ ...prev, inventorsExhibit: true }))
        setExpandedCard(null)
      } else {
        alert("Registration Failed.")
      }
    } catch (err) {
      console.error(err)
      alert("Server Error")
    }
  }

  if (loading) return <div style={{color:'#fff', textAlign:'center', marginTop:'20%'}}>Loading Dashboard...</div>

  return (
    <div className="page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div className="bubble-container">
        <div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div>
      </div>

      <nav className="site-nav">
        <div className="site-nav__brand">
          <img src={psgTechLogo} alt="Logo" style={{ height: '50px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)' }} />
          <span>PSG College of Technology</span>
        </div>
        <div className="nav-center-block">
          <div className="nav-date">Feb 27 • 2026</div>
          <div className="nav-timer">{timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s</div>
        </div>
        <button onClick={handleLogout} className="btn btn--primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Logout</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#ffffff', letterSpacing: '2px', textTransform: 'uppercase' }}>Event Registration</h1>
        </div>

        <div className="auth-left dashboard-hero" style={{ width: 'auto', padding: 0, justifyContent: 'center', marginBottom: '3rem' }}>
          <div className="hero-container" style={{ marginLeft: 0 }}>
            <h1 className="hero-main-text">THE CONFLUENCE</h1>
            <div className="hero-middle-row">
              <div className="hero-lines-group">
                <span className="decor-line"></span><span className="decor-line"></span><span className="decor-line"></span>
              </div>
              <div className="hero-year-text">2026</div>
            </div>
            <div className="hero-sub-container">
              <p className="hero-sub-text">Research, Innovation & Start-up Summit</p>
            </div>
          </div>
        </div>

        <div className="grid grid--two" style={{ maxWidth: '1000px', width: '100%', gap: '1.5rem' }}>
          
          {/* ========================================================== */}
          {/* CARD 1: IDEA PITCHING                                    */}
          {/* ========================================================== */}
          <div className={`panel panel--outline ${expandedCard === 'idea' ? 'expanded' : ''}`} style={{ 
            position: 'relative', transition: 'all 0.3s ease', padding: expandedCard === 'idea' ? '2rem' : '0.8rem 2rem', 
            minHeight: expandedCard === 'idea' ? 'auto' : '60px',
            backgroundColor: expandedCard === 'idea' ? undefined : (registrationStatus.ideaPitching ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)')
          }}>
            <button className={`expand-btn ${expandedCard === 'idea' ? 'active' : ''}`} onClick={() => toggleCard('idea')} style={{ position: 'absolute', top: expandedCard === 'idea' ? '1.5rem' : '50%', right: '1.5rem', transform: expandedCard === 'idea' ? 'rotate(45deg)' : 'translateY(-50%)', width: '35px', height: '35px', fontSize: '1.2rem' }}>+</button>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0', marginTop: '0', paddingRight: '3rem', paddingTop: '1rem' }}>Idea Pitching</h2>
            <p style={{ color: '#aaa', marginBottom: '1.5rem', marginTop: '1rem'}}>Pitch your innovative ideas to industry experts.</p>
            <div className="card-expanded-content">
              
              {registrationStatus.ideaPitching ? (
                <div style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '8px', color: '#38bdf8', fontWeight: '600', textAlign: 'center' }}>✓ You have successfully registered for Idea Pitching.</div>
              ) : (
                <form onSubmit={handleIdeaSubmit} className="reg-form">
                  
                  {/* 1. Basic Details */}
                  <div className="form-section">
                    <h3 className="section-title">1. Basic Details</h3>
                    <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="leadName" className="form-input" required value={ideaForm.leadName} onChange={handleIdeaChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select name="leadGender" className="form-select" required value={ideaForm.leadGender} onChange={handleIdeaChange}>
                        <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Others</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Email ID</label><input type="email" name="leadEmail" className="form-input" required value={ideaForm.leadEmail} onChange={handleIdeaChange} /></div>
                    <div className="form-grid-2">
                      <div className="form-group"><label className="form-label">Mobile</label><input type="tel" name="leadMobile" className="form-input" required value={ideaForm.leadMobile} onChange={handleIdeaChange} /></div>
                      <div className="form-group"><label className="form-label">Alt Contact</label><input type="tel" name="altMobile" className="form-input" value={ideaForm.altMobile} onChange={handleIdeaChange} /></div>
                    </div>
                  </div>

                  {/* 2. Organisation Details */}
                  <div className="form-section">
                    <h3 className="section-title">2. Organisation Details</h3>
                    <div className="form-group"><label className="form-label">Institution / Startup Name</label><input type="text" name="institutionName" className="form-input" required value={ideaForm.institutionName} onChange={handleIdeaChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Type of Exhibitor</label>
                      <select name="exhibitorType" className="form-select" required value={ideaForm.exhibitorType} onChange={handleIdeaChange}>
                        <option value="">Select Type</option><option value="Student">Student</option><option value="Faculty">Faculty</option><option value="Startup">Startup</option><option value="Industry">Industry</option><option value="Independent Innovator">Independent Innovator</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Department / Sector</label><input type="text" name="department" className="form-input" required value={ideaForm.department} onChange={handleIdeaChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Degree / Program</label>
                      <select name="degree" className="form-select" required value={ideaForm.degree} onChange={handleIdeaChange}>
                        <option value="">Select Degree / Program</option><option value="UG">UG</option><option value="PG">PG</option><option value="PhD">PhD</option><option value="Diploma">Diploma</option><option value="Faculty">Faculty</option><option value="Startup Founder">Startup Founder</option><option value="Others">Others</option>
                      </select>
                    </div>
                    {ideaForm.exhibitorType === 'Student' && (
                      <div className="form-group"><label className="form-label">Year of Study</label><input type="text" name="yearOfStudy" className="form-input" placeholder="e.g. 2nd Year / Final Year" required value={ideaForm.yearOfStudy} onChange={handleIdeaChange} /></div>
                    )}
                    <div className="form-grid-2">
                      <div className="form-group"><label className="form-label">City</label><input type="text" name="city" className="form-input" required value={ideaForm.city} onChange={handleIdeaChange} /></div>
                      <div className="form-group"><label className="form-label">State</label><input type="text" name="state" className="form-input" required value={ideaForm.state} onChange={handleIdeaChange} /></div>
                    </div>
                  </div>

                  {/* 3. Mode */}
                  <div className="form-section">
                    <h3 className="section-title">3. Participation Mode</h3>
                    <div className="form-group" style={{display:'flex', gap:'2rem'}}>
                      <label style={{color:'#fff'}}><input type="radio" name="participationMode" value="Individual" checked={ideaForm.participationMode==='Individual'} onChange={handleIdeaChange} style={{marginRight:'0.5rem'}}/>Individual</label>
                      <label style={{color:'#fff'}}><input type="radio" name="participationMode" value="Team" checked={ideaForm.participationMode==='Team'} onChange={handleIdeaChange} style={{marginRight:'0.5rem'}}/>Team</label>
                    </div>
                  </div>

                  {/* 4. Team Details */}
                  {ideaForm.participationMode === 'Team' && (
                    <div className="form-section">
                      <h3 className="section-title">Team Details</h3>
                      <div className="form-group"><label className="form-label">Team Name</label><input type="text" name="teamName" className="form-input" required value={ideaForm.teamName} onChange={handleIdeaChange} /></div>
                      <div className="form-group"><label className="form-label">Total Members (Including You)</label><input type="number" name="teamSize" className="form-input" min="2" required value={ideaForm.teamSize} onChange={handleIdeaTeamSize} /></div>
                      
                      {ideaForm.teamMembers.map((m, i) => (
                        <div key={i} style={{marginTop:'1rem', padding:'1rem', background:'rgba(255,255,255,0.05)'}}>
                          <h4 style={{color:'#aaa', marginBottom:'0.5rem'}}>Member {i+1}</h4>
                          <div className="form-grid-2"><input className="form-input" placeholder="Name" value={m.name} onChange={(e)=>handleIdeaMemberUpdate(i,'name',e.target.value)} /><input className="form-input" placeholder="Email" value={m.email} onChange={(e)=>handleIdeaMemberUpdate(i,'email',e.target.value)} /></div>
                          <div className="form-grid-2" style={{marginTop:'0.5rem'}}><input className="form-input" placeholder="Mobile" value={m.mobile} onChange={(e)=>handleIdeaMemberUpdate(i,'mobile',e.target.value)} /><input className="form-input" placeholder="Designation" value={m.designation} onChange={(e)=>handleIdeaMemberUpdate(i,'designation',e.target.value)} /></div>
                          <input className="form-input" placeholder="Institution" style={{marginTop:'0.5rem'}} value={m.institution} onChange={(e)=>handleIdeaMemberUpdate(i,'institution',e.target.value)} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* NEW SECTION: DOMAIN SELECTION                     */}
                  {/* ================================================= */}
                  <div className="form-section">
                    <h3 className="section-title">4. Domain & Theme</h3>
                    
                    <div className="form-group">
                      <label className="form-label">Domain (SDG)</label>
                      <select name="domain" className="form-select" required value={ideaForm.domain} onChange={handleIdeaChange}>
                        <option value="">-- Select SDG Domain --</option>
                        {Object.keys(domainData).map((sdg) => (
                          <option key={sdg} value={sdg}>{sdg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Sub-Domain</label>
                      <select name="subDomain" className="form-select" required value={ideaForm.subDomain} onChange={handleIdeaChange} disabled={!ideaForm.domain}>
                        <option value="">-- Select Sub-Domain --</option>
                        {ideaForm.domain && domainData[ideaForm.domain].map((sub, index) => (
                          <option key={index} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* ================================================= */}

                  {/* 5. Innovation Details */}
                  <div className="form-section">
                    <h3 className="section-title">5. Innovation Details</h3>
                    <div className="form-group"><label className="form-label">Title of Idea/Innovation</label><input type="text" name="title" className="form-input" required value={ideaForm.title} onChange={handleIdeaChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select name="category" className="form-select" required value={ideaForm.category} onChange={handleIdeaChange}>
                        <option value="">Select Category</option><option>AI & ML</option><option>Healthcare</option><option>Agriculture</option><option>Smart Cities</option><option>Clean Energy</option><option>Robotics & IoT</option><option>Cyber Security</option><option>Manufacturing</option><option>EdTech</option><option>FinTech</option><option>Biotechnology</option><option>Others</option>
                      </select>
                    </div>
                    {ideaForm.category === 'Others' && (
                      <div className="form-group"><label className="form-label">Specify Category</label><input type="text" name="otherCategory" className="form-input" required value={ideaForm.otherCategory} onChange={handleIdeaChange} /></div>
                    )}
                    <div className="form-group"><label className="form-label">Abstract (Upload File)</label><input type="file" className="form-file-input" required onChange={handleIdeaFile} /></div>
                  </div>

                  {/* 6. Declarations */}
                  <div className="form-section" style={{borderBottom:'none'}}>
                    <h3 className="section-title">6. Declaration & Permission</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                      <label style={{display:'flex', alignItems:'center', gap:'0.8rem', cursor:'pointer', color:'#ccc'}}>
                        <input type="checkbox" name="declarationOriginal" checked={ideaForm.declarationOriginal} onChange={handleIdeaChange} style={{width:'18px', height:'18px', accentColor:'#fcd361'}} />
                        <span>I confirm that the innovation being exhibited is original</span>
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:'0.8rem', cursor:'pointer', color:'#ccc'}}>
                        <input type="checkbox" name="declarationRules" checked={ideaForm.declarationRules} onChange={handleIdeaChange} style={{width:'18px', height:'18px', accentColor:'#fcd361'}} />
                        <span>I agree to follow event rules and safety guidelines</span>
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:'0.8rem', cursor:'pointer', color:'#ccc'}}>
                        <input type="checkbox" name="declarationPhoto" checked={ideaForm.declarationPhoto} onChange={handleIdeaChange} style={{width:'18px', height:'18px', accentColor:'#fcd361'}} />
                        <span>I grant permission for photography & promotional use</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary" disabled={!ideaAllChecked} style={{ width: '100%', marginTop: '1.5rem', opacity: ideaAllChecked ? 1 : 0.5, cursor: ideaAllChecked ? 'pointer' : 'not-allowed' }}>
                    {ideaAllChecked ? 'Submit Registration' : 'Accept Declaration to Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 2: INVENTORS EXHIBIT                                */}
          {/* ========================================================== */}
          <div className={`panel panel--outline ${expandedCard === 'inventor' ? 'expanded' : ''}`} style={{ 
            position: 'relative', transition: 'all 0.3s ease', padding: expandedCard === 'inventor' ? '2rem' : '0.8rem 2rem', 
            minHeight: expandedCard === 'inventor' ? 'auto' : '60px',
            backgroundColor: expandedCard === 'inventor' ? undefined : (registrationStatus.inventorsExhibit ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)')
          }}>
            <button className={`expand-btn ${expandedCard === 'inventor' ? 'active' : ''}`} onClick={() => toggleCard('inventor')} style={{ position: 'absolute', top: expandedCard === 'inventor' ? '1.5rem' : '50%', right: '1.5rem', transform: expandedCard === 'inventor' ? 'rotate(45deg)' : 'translateY(-50%)', width: '35px', height: '35px', fontSize: '1.2rem' }}>+</button>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0', marginTop: '0', paddingRight: '3rem', paddingTop: '1rem' }}>Inventors' Exhibit</h2>
             <p style={{ color: '#aaa', marginBottom: '1.5rem', marginTop: '1rem'}}>Showcase your working prototypes to a global audience.</p>
            <div className="card-expanded-content">
             

              {registrationStatus.inventorsExhibit ? (
                <div style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '8px', color: '#38bdf8', fontWeight: '600', textAlign: 'center' }}>✓ Successfully Registered</div>
              ) : (
                <form onSubmit={handleInventorSubmit} className="reg-form">
                  
                  {/* 1. Basic Details */}
                  <div className="form-section">
                    <h3 className="section-title">1. Basic Details</h3>
                    <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="fullName" className="form-input" required value={inventorForm.fullName} onChange={handleInventorChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select name="gender" className="form-select" required value={inventorForm.gender} onChange={handleInventorChange}>
                        <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Email ID</label><input type="email" name="email" className="form-input" required value={inventorForm.email} onChange={handleInventorChange} /></div>
                    <div className="form-grid-2">
                      <div className="form-group"><label className="form-label">Mobile</label><input type="tel" name="mobile" className="form-input" required value={inventorForm.mobile} onChange={handleInventorChange} /></div>
                      <div className="form-group"><label className="form-label">Alt Contact</label><input type="tel" name="altMobile" className="form-input" value={inventorForm.altMobile} onChange={handleInventorChange} /></div>
                    </div>
                  </div>

                  {/* 2. Organisation Details */}
                  <div className="form-section">
                    <h3 className="section-title">2. Organisation Details</h3>
                    <div className="form-group"><label className="form-label">Institution / Startup Name</label><input type="text" name="institutionName" className="form-input" required value={inventorForm.institutionName} onChange={handleInventorChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Type of Exhibitor</label>
                      <select name="exhibitorType" className="form-select" required value={inventorForm.exhibitorType} onChange={handleInventorChange}>
                        <option value="">Select Type</option><option value="Student">Student</option><option value="Faculty">Faculty</option><option value="Startup">Startup</option><option value="Industry">Industry</option><option value="Independent Innovator">Independent Innovator</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Department / Sector</label><input type="text" name="department" className="form-input" required value={inventorForm.department} onChange={handleInventorChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Degree / Program</label>
                      <select name="degree" className="form-select" required value={inventorForm.degree} onChange={handleInventorChange}>
                        <option value="">Select Degree / Program</option><option value="UG">UG</option><option value="PG">PG</option><option value="PhD">PhD</option><option value="Diploma">Diploma</option><option value="Faculty">Faculty</option><option value="Startup Founder">Startup Founder</option><option value="Others">Others</option>
                      </select>
                    </div>
                    {inventorForm.exhibitorType === 'Student' && (
                      <div className="form-group"><label className="form-label">Year of Study</label><input type="text" name="yearOfStudy" className="form-input" placeholder="e.g. 2nd Year / Final Year" required value={inventorForm.yearOfStudy} onChange={handleInventorChange} /></div>
                    )}
                    <div className="form-grid-2">
                      <div className="form-group"><label className="form-label">City</label><input type="text" name="city" className="form-input" required value={inventorForm.city} onChange={handleInventorChange} /></div>
                      <div className="form-group"><label className="form-label">State</label><input type="text" name="state" className="form-input" required value={inventorForm.state} onChange={handleInventorChange} /></div>
                    </div>
                  </div>

                  {/* 3. Mode */}
                  <div className="form-section">
                    <h3 className="section-title">3. Participation Mode</h3>
                    <div className="form-group" style={{display:'flex', gap:'2rem'}}>
                      <label style={{color:'#fff'}}><input type="radio" name="participationMode" value="Individual" checked={inventorForm.participationMode==='Individual'} onChange={handleInventorChange} style={{marginRight:'0.5rem'}}/>Individual</label>
                      <label style={{color:'#fff'}}><input type="radio" name="participationMode" value="Team" checked={inventorForm.participationMode==='Team'} onChange={handleInventorChange} style={{marginRight:'0.5rem'}}/>Team</label>
                    </div>
                  </div>

                  {/* 4. Team Details */}
                  {inventorForm.participationMode === 'Team' && (
                    <div className="form-section">
                      <h3 className="section-title">Team Details</h3>
                      <div className="form-group"><label className="form-label">Team Name</label><input type="text" name="teamName" className="form-input" required value={inventorForm.teamName} onChange={handleInventorChange} /></div>
                      <div className="form-group"><label className="form-label">Total Members (Including You)</label><input type="number" name="teamSize" className="form-input" min="2" required value={inventorForm.teamSize} onChange={handleInventorTeamSize} /></div>
                      
                      {/* Only renders members if size >= 2 */}
                      {inventorForm.teamMembers.map((m, i) => (
                        <div key={i} style={{marginTop:'1rem', padding:'1rem', background:'rgba(255,255,255,0.05)'}}>
                          <h4 style={{color:'#aaa', marginBottom:'0.5rem'}}>Member {i+1}</h4>
                          <div className="form-grid-2"><input className="form-input" placeholder="Name" value={m.name} onChange={(e)=>handleInventorMemberUpdate(i,'name',e.target.value)} /><input className="form-input" placeholder="Email" value={m.email} onChange={(e)=>handleInventorMemberUpdate(i,'email',e.target.value)} /></div>
                          <div className="form-grid-2" style={{marginTop:'0.5rem'}}><input className="form-input" placeholder="Mobile" value={m.mobile} onChange={(e)=>handleInventorMemberUpdate(i,'mobile',e.target.value)} /><input className="form-input" placeholder="Designation" value={m.designation} onChange={(e)=>handleInventorMemberUpdate(i,'designation',e.target.value)} /></div>
                          <input className="form-input" placeholder="Institution" style={{marginTop:'0.5rem'}} value={m.institution} onChange={(e)=>handleInventorMemberUpdate(i,'institution',e.target.value)} />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* ================================================= */}
                  {/* NEW SECTION: DOMAIN SELECTION                     */}
                  {/* ================================================= */}
                  <div className="form-section">
                    <h3 className="section-title">4. Domain & Theme</h3>
                    
                    <div className="form-group">
                      <label className="form-label">Domain (SDG)</label>
                      <select name="domain" className="form-select" required value={inventorForm.domain} onChange={handleInventorChange}>
                        <option value="">-- Select SDG Domain --</option>
                        {Object.keys(domainData).map((sdg) => (
                          <option key={sdg} value={sdg}>{sdg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Sub-Domain</label>
                      <select name="subDomain" className="form-select" required value={inventorForm.subDomain} onChange={handleInventorChange} disabled={!inventorForm.domain}>
                        <option value="">-- Select Sub-Domain --</option>
                        {inventorForm.domain && domainData[inventorForm.domain].map((sub, index) => (
                          <option key={index} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* ================================================= */}

                  {/* 5. Innovation Details */}
                  <div className="form-section">
                    <h3 className="section-title">5. Innovation Details</h3>
                    <div className="form-group"><label className="form-label">Title of Idea/Innovation</label><input type="text" name="title" className="form-input" required value={inventorForm.title} onChange={handleInventorChange} /></div>
                    <div className="form-group">
                      <label className="form-label">Category / Domain</label>
                      <select name="category" className="form-select" required value={inventorForm.category} onChange={handleInventorChange}>
                        <option value="">Select Category</option><option>AI & ML</option><option>Healthcare</option><option>Agriculture</option><option>Smart Cities</option><option>Clean Energy</option><option>Robotics & IoT</option><option>Cyber Security</option><option>Manufacturing</option><option>EdTech</option><option>FinTech</option><option>Biotechnology</option><option>Others</option>
                      </select>
                    </div>
                    {inventorForm.category === 'Others' && (
                      <div className="form-group"><label className="form-label">Specify Category</label><input type="text" name="otherCategory" className="form-input" required value={inventorForm.otherCategory} onChange={handleInventorChange} /></div>
                    )}
                    <div className="form-group"><label className="form-label">Abstract (Upload File)</label><input type="file" className="form-file-input" required onChange={handleInventorFile} /></div>
                  </div>

                  {/* 6. Declarations */}
                  <div className="form-section" style={{borderBottom:'none'}}>
                    <h3 className="section-title">6. Declaration & Permission</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                      <label style={{display:'flex', alignItems:'center', gap:'0.8rem', cursor:'pointer', color:'#ccc'}}>
                        <input type="checkbox" name="declarationOriginal" checked={inventorForm.declarationOriginal} onChange={handleInventorChange} style={{width:'18px', height:'18px', accentColor:'#fcd361'}} />
                        <span>I confirm that the innovation being exhibited is original</span>
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:'0.8rem', cursor:'pointer', color:'#ccc'}}>
                        <input type="checkbox" name="declarationRules" checked={inventorForm.declarationRules} onChange={handleInventorChange} style={{width:'18px', height:'18px', accentColor:'#fcd361'}} />
                        <span>I agree to follow event rules and safety guidelines</span>
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:'0.8rem', cursor:'pointer', color:'#ccc'}}>
                        <input type="checkbox" name="declarationPhoto" checked={inventorForm.declarationPhoto} onChange={handleInventorChange} style={{width:'18px', height:'18px', accentColor:'#fcd361'}} />
                        <span>I grant permission for photography & promotional use</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary" disabled={!inventorAllChecked} style={{ width: '100%', marginTop: '1.5rem', opacity: inventorAllChecked ? 1 : 0.5, cursor: inventorAllChecked ? 'pointer' : 'not-allowed' }}>
                    {inventorAllChecked ? 'Submit Registration' : 'Accept Declaration to Submit'}
                  </button>
                  
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}