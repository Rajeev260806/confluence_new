import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import psgTechLogo from './assets/college.jpeg'
import './App.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  // --- DATA LISTS ---
  const domainData = {
    "SDG 3: Good Health & Well-being": ["Health Tech", "Telemedicine", "Mental Wellness", "Medical Devices"],
    "SDG 6: Clean Water & Sanitation": ["Water Purification", "Waste Water Treatment", "Smart Irrigation"],
    "SDG 7: Affordable & Clean Energy": ["Solar Tech", "EV Infrastructure", "Bio-Energy", "Smart Grids"],
    "SDG 9: Industry, Innovation & Infrastructure": ["IoT & Automation", "Sustainable Materials", "Smart Manufacturing"],
    "SDG 11: Sustainable Cities & Communities": ["Urban Mobility", "Green Building", "Disaster Management"],
    "SDG 12: Responsible Consumption & Production": ["Circular Economy", "Waste Management", "Eco-Packaging"],
    "SDG 13: Climate Action": ["Carbon Capture", "Renewable Tech", "Climate Analytics"]
  }

  const memberCategories = ["Student", "Academician", "Industry"]
  const trlLevelsIdea = ["TRL 3", "TRL 4", "TRL 5", "TRL 6", "TRL 7", "TRL 8", "TRL 9"]
  const trlLevelsInventor = ["TRL 6", "TRL 7", "TRL 8", "TRL 9"]

  // --- STATE: UI & AUTH ---
  const [registrationStatus, setRegistrationStatus] = useState({ ideaPitching: false, inventorsExhibit: false })
  const [expandedCard, setExpandedCard] = useState(null)
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [loading, setLoading] = useState(true)

  //Helper for initial member structure
  const initialMember = {
    name: '', category: '', designation: '', department: '', institution: '', city: '', state: '', mobile: '', email: ''
  }

  // --- STATE: IDEA PITCHING FORM ---
  const [ideaForm, setIdeaForm] = useState({
    teamName: '',
    teamSize: 1,
    members: [{ ...initialMember }], // Initialized with 1 member
    domain: '',
    subDomain: '',
    title: '',
    problemStatement: '',
    solution: '',
    trlLevel: '',
    productFile: null,
    mediaFile: null,
    declarationOriginal: false, declarationRules: false, declarationPhoto: false
  })

  // --- STATE: INVENTOR FORM ---
  const [inventorForm, setInventorForm] = useState({
    teamName: '',
    teamSize: 1,
    members: [{ ...initialMember }], // Initialized with 1 member
    domain: '',
    subDomain: '',
    title: '',
    problemStatement: '',
    solution: '',
    trlLevel: '',
    spaceRequirements: '', // Specific to Inventor
    productFile: null,
    mediaFile: null,
    declarationOriginal: false, declarationRules: false, declarationPhoto: false
  })

  // --- VALIDATION ---
  const ideaAllChecked = ideaForm.declarationOriginal && ideaForm.declarationRules && ideaForm.declarationPhoto
  const inventorAllChecked = inventorForm.declarationOriginal && inventorForm.declarationRules && inventorForm.declarationPhoto

  // --- EFFECTS ---
  useEffect(() => {
    if (!userId) {
      navigate('/signin')
      return
    }
    const fetchStatus = async () => {
      try {
        const response = await fetch(`api/status/${userId}`) // Adjust URL as needed
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
  // HANDLERS: GENERIC TEAM & MEMBER LOGIC
  // ==========================================

  // Handle changes for top-level text inputs (Title, Domain, etc.)
  const handleBasicChange = (e, formType) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    const setForm = formType === 'idea' ? setIdeaForm : setInventorForm
    const currentForm = formType === 'idea' ? ideaForm : inventorForm

    if (name === 'domain') {
      setForm({ ...currentForm, domain: val, subDomain: '' })
    } else {
      setForm({ ...currentForm, [name]: val })
    }
  }

  // Handle Team Size Change (Resize members array)
  const handleTeamSizeChange = (e, formType) => {
    const newSize = parseInt(e.target.value)
    const setForm = formType === 'idea' ? setIdeaForm : setInventorForm
    const currentForm = formType === 'idea' ? ideaForm : inventorForm
    
    // Create new array preserving existing data, filling new slots with blanks
    const currentMembers = currentForm.members
    const newMembers = Array(newSize).fill(null).map((_, i) => currentMembers[i] || { ...initialMember })

    setForm({ ...currentForm, teamSize: newSize, members: newMembers })
  }

  // Handle Individual Member Field Updates
  const handleMemberUpdate = (index, e, formType) => {
    const { name, value } = e.target
    const setForm = formType === 'idea' ? setIdeaForm : setInventorForm
    const currentForm = formType === 'idea' ? ideaForm : inventorForm
    
    const updatedMembers = [...currentForm.members]
    updatedMembers[index] = { ...updatedMembers[index], [name]: value }
    setForm({ ...currentForm, members: updatedMembers })
  }

  // Handle File Uploads
  const handleFileChange = (e, fieldName, formType) => {
    const setForm = formType === 'idea' ? setIdeaForm : setInventorForm
    const currentForm = formType === 'idea' ? ideaForm : inventorForm
    setForm({ ...currentForm, [fieldName]: e.target.files[0] })
  }

  // ==========================================
  // HANDLERS: SUBMISSION
  // ==========================================
  const submitForm = async (e, formType) => {
    e.preventDefault()
    const isIdea = formType === 'idea'
    const formState = isIdea ? ideaForm : inventorForm
    const endpoint = isIdea ? 'api/register/idea' : 'api/register/inventor'

    // Basic Validation Check
    if (isIdea && !ideaAllChecked) return
    if (!isIdea && !inventorAllChecked) return

    const formData = new FormData()
    formData.append('userId', userId)
    
    // Append standard fields
    Object.keys(formState).forEach(key => {
      if (key === 'members') {
        formData.append('members', JSON.stringify(formState.members))
      } else if (key !== 'productFile' && key !== 'mediaFile') {
        formData.append(key, formState[key])
      }
    })

    // Append Files
    if (formState.productFile) formData.append('productFile', formState.productFile)
    if (formState.mediaFile) formData.append('mediaFile', formState.mediaFile)

    try {
      const res = await fetch(endpoint, { method: 'POST', body: formData })
      if (res.ok) {
        alert(`${isIdea ? 'Idea Pitching' : 'Inventors Exhibit'} Registered Successfully!`)
        setRegistrationStatus(prev => ({ ...prev, [isIdea ? 'ideaPitching' : 'inventorsExhibit']: true }))
        setExpandedCard(null)
      } else {
        alert("Registration Failed. Please check inputs or try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Server Error")
    }
  }

  if (loading) return <div style={{color:'#fff', textAlign:'center', marginTop:'20%'}}>Loading Dashboard...</div>

  return (
    <div className="page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* BACKGROUND & NAV (UNCHANGED) */}
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
                <form onSubmit={(e) => submitForm(e, 'idea')} className="reg-form">
                  
                  {/* 1. Team Details */}
                  <div className="form-section">
                    <h3 className="section-title">1. Team Details</h3>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="form-label">Team Name</label>
                            <input type="text" name="teamName" className="form-input" required value={ideaForm.teamName} onChange={(e) => handleBasicChange(e, 'idea')} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Total Members</label>
                            <select name="teamSize" className="form-select" value={ideaForm.teamSize} onChange={(e) => handleTeamSizeChange(e, 'idea')}>
                                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>

                    {ideaForm.members.map((member, index) => (
                        <div key={index} style={{marginTop:'1.5rem', padding:'1rem', background:'rgba(255,255,255,0.05)', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)'}}>
                            <h4 style={{color:'#fcd361', marginBottom:'1rem'}}>Member {index + 1}</h4>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">Name</label><input className="form-input" name="name" required value={member.name} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select className="form-select" name="category" required value={member.category} onChange={(e) => handleMemberUpdate(index, e, 'idea')}>
                                        <option value="">Select Category</option>
                                        {memberCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">Designation / Course</label><input className="form-input" name="designation" required value={member.designation} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                                <div className="form-group"><label className="form-label">Department / Section</label><input className="form-input" name="department" required value={member.department} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                            </div>
                            <div className="form-group"><label className="form-label">Institute / Industry</label><input className="form-input" name="institution" required value={member.institution} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">City</label><input className="form-input" name="city" required value={member.city} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                                <div className="form-group"><label className="form-label">State</label><input className="form-input" name="state" required value={member.state} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                            </div>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">Mobile (Whatsapp)</label><input type="tel" className="form-input" name="mobile" required value={member.mobile} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                                <div className="form-group"><label className="form-label">Mail ID</label><input type="email" className="form-input" name="email" required value={member.email} onChange={(e) => handleMemberUpdate(index, e, 'idea')} /></div>
                            </div>
                        </div>
                    ))}
                  </div>

                  {/* 2. Domain & Theme */}
                  <div className="form-section">
                    <h3 className="section-title">2. Domain & Theme Details</h3>
                    <div className="form-group">
                      <label className="form-label">Domain (SDG)</label>
                      <select name="domain" className="form-select" required value={ideaForm.domain} onChange={(e) => handleBasicChange(e, 'idea')}>
                        <option value="">-- Select SDG Domain --</option>
                        {Object.keys(domainData).map((sdg) => <option key={sdg} value={sdg}>{sdg}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sub-Domain</label>
                      <select name="subDomain" className="form-select" required value={ideaForm.subDomain} onChange={(e) => handleBasicChange(e, 'idea')} disabled={!ideaForm.domain}>
                        <option value="">-- Select Sub-Domain --</option>
                        {ideaForm.domain && domainData[ideaForm.domain].map((sub, index) => <option key={index} value={sub}>{sub}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* 3. Innovation Details */}
                  <div className="form-section">
                    <h3 className="section-title">3. Innovation Details</h3>
                    <div className="form-group"><label className="form-label">Title</label><input type="text" name="title" className="form-input" required value={ideaForm.title} onChange={(e) => handleBasicChange(e, 'idea')} /></div>
                    
                    <div className="form-group">
                        <label className="form-label">Problem Statement (Max. 250 words)</label>
                        <textarea name="problemStatement" className="form-input" rows="4" required maxLength={1500} value={ideaForm.problemStatement} onChange={(e) => handleBasicChange(e, 'idea')} />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Solution (Max. 250 words)</label>
                        <textarea name="solution" className="form-input" rows="4" required maxLength={1500} value={ideaForm.solution} onChange={(e) => handleBasicChange(e, 'idea')} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">TRL Level</label>
                      <select name="trlLevel" className="form-select" required value={ideaForm.trlLevel} onChange={(e) => handleBasicChange(e, 'idea')}>
                        <option value="">Select TRL (3 to 9)</option>
                        {trlLevelsIdea.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="form-group"><label className="form-label">Upload Product Details (As per Template)</label><input type="file" className="form-file-input" required onChange={(e) => handleFileChange(e, 'productFile', 'idea')} /></div>
                    <div className="form-group"><label className="form-label">Upload an Image or Video</label><input type="file" className="form-file-input" required onChange={(e) => handleFileChange(e, 'mediaFile', 'idea')} /></div>
                  </div>

                  {/* 4. Declarations */}
                  <div className="form-section" style={{borderBottom:'none'}}>
                    <h3 className="section-title">4. Declaration & Permission</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                      <label className="checkbox-label"><input type="checkbox" name="declarationOriginal" checked={ideaForm.declarationOriginal} onChange={(e) => handleBasicChange(e, 'idea')} /> I confirm that the innovation being submitted is original</label>
                      <label className="checkbox-label"><input type="checkbox" name="declarationRules" checked={ideaForm.declarationRules} onChange={(e) => handleBasicChange(e, 'idea')} /> I agree to follow event rules and safety guidelines</label>
                      <label className="checkbox-label"><input type="checkbox" name="declarationPhoto" checked={ideaForm.declarationPhoto} onChange={(e) => handleBasicChange(e, 'idea')} /> I grant permission for photography & promotional use</label>
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
          {/* CARD 2: INVENTORS EXHIBIT                                  */}
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
                <div style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '8px', color: '#38bdf8', fontWeight: '600', textAlign: 'center' }}>✓ You have successfully registered for Inventors Exhibit.</div>
              ) : (
                <form onSubmit={(e) => submitForm(e, 'inventor')} className="reg-form">
                  
                  {/* 1. Team Details */}
                  <div className="form-section">
                    <h3 className="section-title">1. Team Details</h3>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="form-label">Team Name</label>
                            <input type="text" name="teamName" className="form-input" required value={inventorForm.teamName} onChange={(e) => handleBasicChange(e, 'inventor')} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Total Members</label>
                            <select name="teamSize" className="form-select" value={inventorForm.teamSize} onChange={(e) => handleTeamSizeChange(e, 'inventor')}>
                                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>

                    {inventorForm.members.map((member, index) => (
                        <div key={index} style={{marginTop:'1.5rem', padding:'1rem', background:'rgba(255,255,255,0.05)', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.1)'}}>
                            <h4 style={{color:'#fcd361', marginBottom:'1rem'}}>Member {index + 1}</h4>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">Name</label><input className="form-input" name="name" required value={member.name} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select className="form-select" name="category" required value={member.category} onChange={(e) => handleMemberUpdate(index, e, 'inventor')}>
                                        <option value="">Select Category</option>
                                        {memberCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">Designation / Course</label><input className="form-input" name="designation" required value={member.designation} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                                <div className="form-group"><label className="form-label">Department / Section</label><input className="form-input" name="department" required value={member.department} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                            </div>
                            <div className="form-group"><label className="form-label">Institute / Industry</label><input className="form-input" name="institution" required value={member.institution} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">City</label><input className="form-input" name="city" required value={member.city} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                                <div className="form-group"><label className="form-label">State</label><input className="form-input" name="state" required value={member.state} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                            </div>
                            <div className="form-grid-2">
                                <div className="form-group"><label className="form-label">Mobile (Whatsapp)</label><input type="tel" className="form-input" name="mobile" required value={member.mobile} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                                <div className="form-group"><label className="form-label">Mail ID</label><input type="email" className="form-input" name="email" required value={member.email} onChange={(e) => handleMemberUpdate(index, e, 'inventor')} /></div>
                            </div>
                        </div>
                    ))}
                  </div>

                  {/* 2. Domain & Theme */}
                  <div className="form-section">
                    <h3 className="section-title">2. Domain & Theme Details</h3>
                    <div className="form-group">
                      <label className="form-label">Domain (SDG)</label>
                      <select name="domain" className="form-select" required value={inventorForm.domain} onChange={(e) => handleBasicChange(e, 'inventor')}>
                        <option value="">-- Select SDG Domain --</option>
                        {Object.keys(domainData).map((sdg) => <option key={sdg} value={sdg}>{sdg}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sub-Domain</label>
                      <select name="subDomain" className="form-select" required value={inventorForm.subDomain} onChange={(e) => handleBasicChange(e, 'inventor')} disabled={!inventorForm.domain}>
                        <option value="">-- Select Sub-Domain --</option>
                        {inventorForm.domain && domainData[inventorForm.domain].map((sub, index) => <option key={index} value={sub}>{sub}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* 3. Innovation Details */}
                  <div className="form-section">
                    <h3 className="section-title">3. Innovation Details</h3>
                    <div className="form-group"><label className="form-label">Title</label><input type="text" name="title" className="form-input" required value={inventorForm.title} onChange={(e) => handleBasicChange(e, 'inventor')} /></div>
                    
                    <div className="form-group">
                        <label className="form-label">Problem Statement (Max. 250 words)</label>
                        <textarea name="problemStatement" className="form-input" rows="4" required maxLength={1500} value={inventorForm.problemStatement} onChange={(e) => handleBasicChange(e, 'inventor')} />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Solution (Max. 250 words)</label>
                        <textarea name="solution" className="form-input" rows="4" required maxLength={1500} value={inventorForm.solution} onChange={(e) => handleBasicChange(e, 'inventor')} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">TRL Level</label>
                      <select name="trlLevel" className="form-select" required value={inventorForm.trlLevel} onChange={(e) => handleBasicChange(e, 'inventor')}>
                        <option value="">Select TRL (6 to 9)</option>
                        {trlLevelsInventor.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="form-group"><label className="form-label">Upload Product Details (As per Template)</label><input type="file" className="form-file-input" required onChange={(e) => handleFileChange(e, 'productFile', 'inventor')} /></div>
                    <div className="form-group"><label className="form-label">Upload an Image or Video</label><input type="file" className="form-file-input" required onChange={(e) => handleFileChange(e, 'mediaFile', 'inventor')} /></div>
                  </div>

                  {/* 4. Space Requirements */}
                  <div className="form-section">
                    <h3 className="section-title">4. Space & Other Requirements</h3>
                    <div className="form-group">
                        <label className="form-label">Requirements (Max. 200 words)</label>
                        <textarea name="spaceRequirements" className="form-input" rows="3" required maxLength={1200} value={inventorForm.spaceRequirements} onChange={(e) => handleBasicChange(e, 'inventor')} />
                    </div>
                  </div>

                  {/* 5. Declarations */}
                  <div className="form-section" style={{borderBottom:'none'}}>
                    <h3 className="section-title">5. Declaration & Permission</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                      <label className="checkbox-label"><input type="checkbox" name="declarationOriginal" checked={inventorForm.declarationOriginal} onChange={(e) => handleBasicChange(e, 'inventor')} /> I confirm that the innovation being exhibited is original</label>
                      <label className="checkbox-label"><input type="checkbox" name="declarationRules" checked={inventorForm.declarationRules} onChange={(e) => handleBasicChange(e, 'inventor')} /> I agree to follow event rules and safety guidelines</label>
                      <label className="checkbox-label"><input type="checkbox" name="declarationPhoto" checked={inventorForm.declarationPhoto} onChange={(e) => handleBasicChange(e, 'inventor')} /> I grant permission for photography & promotional use</label>
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