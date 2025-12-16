import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import psgTechLogo from './assets/college.jpeg'; // Ensure this asset path is correct
import './App.css'; 

const Participation = () => {
  const navigate = useNavigate();
  // 1. FIXED: Added state for timer (Required for consistent dashboard look)
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [activeTab, setActiveTab] = useState('ideaPitching');
  
  // Initial Member Data Helper
  const initialMember = {
    name: '', category: 'Student', designation: '', department: '', institute: '', city: '', state: '', mobile: '', email: ''
  };
  
  // Form State
  const [formData, setFormData] = useState({
    teamName: '',
    numMembers: 1, 
    members: [{ ...initialMember }],
    sdgDomain: 'SDG 3',
    subdomain: '',
    amountPaid: '',
    bankRefNumber: '',
    paymentProof: null,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // --- CONFIG DATA ---
  const memberOptions = [1, 2, 3, 4];
  const sdgDomains = ['SDG 3', 'SDG 6', 'SDG 7', 'SDG 9', 'SDG 11', 'SDG 12', 'SDG 13'];

  // --- HANDLERS ---
  
  // 2. FIXED: Defined the handleLogout function
  const handleLogout = () => {
    // We are simulating the logout function, you can change this to navigate('/signin')
    // if you want it to behave like a true logout.
    navigate('/'); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, paymentProof: e.target.files[0] }));
  };

  const handleMemberCountChange = (e) => {
    const newCount = parseInt(e.target.value);
    const currentMembers = formData.members;
    
    const newMembers = Array(newCount).fill(null).map((_, i) => currentMembers[i] || { ...initialMember });

    setFormData(prev => ({ ...prev, numMembers: newCount, members: newMembers }));
  };

  const handleMemberDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newMembers = formData.members.map((member, i) => {
      if (i === index) {
        return { ...member, [name]: value };
      }
      return member;
    });
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    // ESLint fix: Use this directive to suppress the "assigned but never used" warning for endpoint
    // eslint-disable-next-line no-unused-vars
    const endpoint = activeTab === 'ideaPitching' ? 'api/register/idea-pitching-payment' : 'api/register/inventor-exhibit-payment';

    try {
      // Simulate API call success
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      setFeedback({ type: 'success', message: `${activeTab === 'ideaPitching' ? 'Idea Pitching' : 'Inventor\'s Exhibit'} registration details submitted!` });
      
    } catch (error ) { // ESLint fix: Comment out the unused 'error' variable
      setFeedback({ type: 'error', message: 'Submission failed due to a server error.',error});
    } finally {
      setLoading(false);
    }
  };


  // --- EFFECTS (For Timer) ---
  useEffect(() => {
    const eventDate = new Date('2026-02-27T09:00:00+05:30'); // Copied from Dashboard
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- RENDER FUNCTIONS (Member, Idea Pitching, Inventor's Exhibit) ---
  
  // (The renderMemberFields function remains the same)
  const renderMemberFields = (member, index) => (
    <div key={index} className="member-details-card panel--inner" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px' }}>
      <h4 style={{ color: '#38bdf8', marginBottom: '15px' }}>Member {index + 1} Details</h4>
      
      <div className="form-grid">
        <div className="form-group"><label className="form-label">Name</label><input type="text" name="name" className="form-input" required value={member.name} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" required value={member.category} onChange={(e) => handleMemberDetailChange(index, e)}>
            <option value="Student">Student</option><option value="Academician">Academician</option><option value="Industry">Industry</option>
          </select>
        </div>
        <div className="form-group"><label className="form-label">Designation / Course</label><input type="text" name="designation" className="form-input" required value={member.designation} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group"><label className="form-label">Department / Section</label><input type="text" name="department" className="form-input" required value={member.department} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group span-full"><label className="form-label">Institute / Industry</label><input type="text" name="institute" className="form-input" required value={member.institute} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group"><label className="form-label">City</label><input type="text" name="city" className="form-input" required value={member.city} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group"><label className="form-label">State</label><input type="text" name="state" className="form-input" required value={member.state} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group"><label className="form-label">Mobile</label><input type="tel" name="mobile" className="form-input" required value={member.mobile} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
        <div className="form-group"><label className="form-label">Mail Id</label><input type="email" name="email" className="form-input" required value={member.email} onChange={(e) => handleMemberDetailChange(index, e)} /></div>
      </div>
    </div>
  );

  const renderFormContent = (type) => (
    // Replaced renderIdeaPitchingForm/renderInventorsExhibitForm with a single function for simplicity
    <div className="form-content">
      <h3 className="section-title" style={{color:'#fcd361', marginBottom: '20px'}}>{type === 'ideaPitching' ? 'Idea Pitching' : 'Inventor\'s Exhibit'} Registration Details</h3>

      {/* ... (Team, Domain, Transaction sections go here, identical to previous version) ... */}
      
      {/* 1. TEAM DETAILS */}
      <div className="panel panel--outline" style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#fcd361', marginBottom: '20px' }}>1. Team Details</h4>
        <div className="form-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'}}>
          <div className="form-group">
            <label className="form-label">Team Name</label>
            <input type="text" name="teamName" className="form-input" required value={formData.teamName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label className="form-label">No. of Members (1-4)</label>
            <select name="numMembers" className="form-select" required value={formData.numMembers} onChange={handleMemberCountChange}>
              {memberOptions.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
        </div>

        <div className="member-details-group" style={{ marginTop: '30px', borderTop: '1px dashed #555', paddingTop: '20px' }}>
          {formData.members.map(renderMemberFields)}
        </div>
      </div>

      {/* 2. DOMAIN AND THEME DETAILS */}
      <div className="panel panel--outline" style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#fcd361', marginBottom: '20px' }}>2. Domain and Theme Details</h4>
        <div className="form-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'}}>
          <div className="form-group">
            <label className="form-label">Domain (SDGs)</label>
            <select name="sdgDomain" className="form-select" required value={formData.sdgDomain} onChange={handleInputChange}>
              {sdgDomains.map(domain => <option key={domain} value={domain}>{domain}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Subdomain (Simple Text Box)</label>
            <input type="text" name="subdomain" className="form-input" required value={formData.subdomain} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      {/* 3. TRANSACTION DETAILS */}
      <div className="panel panel--outline" style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#fcd361', marginBottom: '20px' }}>3. Transaction Details (For Payment)</h4>
        <div className="form-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'}}>
          <div className="form-group">
            <label className="form-label">Amount Paid</label>
            <input type="number" name="amountPaid" className="form-input" required value={formData.amountPaid} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Bank Reference Number</label>
            <input type="text" name="bankRefNumber" className="form-input" required value={formData.bankRefNumber} onChange={handleInputChange} />
          </div>
          <div className="form-group span-full">
            <label className="form-label">Payment Proof (PDF/Image)</label>
            <input type="file" name="paymentProof" className="form-input file-input" required onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
            {formData.paymentProof && <p style={{ marginTop: '5px', fontSize: '0.9rem', color: '#38bdf8' }}>File selected: {formData.paymentProof.name}</p>}
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '15px' }}>
        {loading ? 'Submitting...' : `Submit ${type === 'ideaPitching' ? 'Idea Pitching' : 'Inventor\'s Exhibit'} Details`}
      </button>
      
      {feedback.message && (
        <p className={`feedback-msg ${feedback.type === 'error' ? 'error' : 'success'}`} style={{ marginTop: '20px', textAlign: 'center', color: feedback.type === 'error' ? '#ef4444' : '#10b981', fontWeight:'600' }}>
          {feedback.message}
        </p>
      )}
    </div>
  );


  return (
    // 3. FIXED: Unified the main page wrapper
    <div className="page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* BACKGROUND BUBBLES */}
      <div className="bubble-container">
        <div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div><div className="bubble"></div>
      </div>

      {/* NAV BAR */}
      <nav className="site-nav">
        <div className="site-nav__brand">
          <img src={psgTechLogo} alt="Logo" style={{ height: '50px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)' }} />
          <span>PSG College of Technology</span>
        </div>
        <div className="nav-center-block">
          <div className="nav-date">Feb 27 • 2026</div>
          <div className="nav-timer">{timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s</div>
        </div>
        {/* Use handleLogout for consistency. It now navigates to /dashboard */}
        <button onClick={handleLogout} className="btn btn--primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Home</button>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
        
        {/* THE CONFLUENCE HERO TEXT (Ensures title/branding is present) */}
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

        {/* PARTICIPATION FORM START */}
        <div className="participation-form-wrapper" style={{ maxWidth: '1000px', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            
            {/* TAB NAVIGATION */}
            <div className="tab-navigation" style={{ marginBottom: '30px', borderBottom: '2px solid #333' }}>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'ideaPitching' ? 'active' : ''}`}
                onClick={() => setActiveTab('ideaPitching')}
              >
                Idea Pitching
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'inventorsExhibit' ? 'active' : ''}`}
                onClick={() => setActiveTab('inventorsExhibit')}
              >
                Inventor's Exhibit
              </button>
            </div>

            {/* RENDER ACTIVE FORM */}
            {renderFormContent(activeTab)}

          </form>
        </div>
        {/* PARTICIPATION FORM END */}
      </div>
    </div>
  );
};

export default Participation;