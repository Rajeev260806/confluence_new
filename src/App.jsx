import { useEffect, useMemo, useState } from 'react'
import logo75 from './assets/75.jpeg'
import logo100 from './assets/100.jpeg'
import psgTechLogo from './assets/college.jpeg'
import iicLogo from './assets/iic.jpeg'
import myCollegePic from './assets/college.jpg'
import confluenceBg from './assets/confluence_.png'; 
import collLogo from './assets/coll_logo.png'; 
import trusteeImg from './assets/Trustee.jpg'
import principalImg from './assets/Principal.jpg'
import adv1 from './assets/Ramshankar.jpg'
import adv2 from './assets/Sivanambuttu.jpg'
import adv3 from './assets/MidhuUnnithan.jpg'
import adv4 from './assets/Sugantharaja.jpg'
import adv5 from './assets/Suresh.jpg'
import adv6 from './assets/NakulParameswar.jpg'
import adv7 from './assets/Sriram.jpg'
import adv8 from './assets/SureshMuthuswami.jpg'
import './App.css'
import { Link } from 'react-router-dom'

const eventDate = new Date('2026-02-27T09:00:00+05:30')

const highlights = [
  {
    title: 'Keynote/Technical Sessions',
    copy:
      'Deep-dive talks with industry leaders, researchers, and innovators covering breakthrough technologies and entrepreneurship trends.',
  },
  {
    title: 'Panel Discussions',
    copy:
      'Interactive conversations that unpack the future of innovation, incubation, and collaborative problem-solving within academia and industry.',
  },
  {
    title: 'Idea Pitching Competition',
    copy:
      'Students, innovators, researchers, and early-stage founders present original ideas in a high-energy pitch arena with expert feedback.',
  },
  {
    title: 'Inventors’ Exhibit',
    copy:
      'A curated showcase of prototypes, working models, and transformative projects that highlight the creative power of PSG Tech.',
  },
]

const sponsorshipReasons = [
  'Connect with emerging startups and innovators.',
  'Engage with top academicians and R&D experts.',
  'Recruit talent and explore collaborations.',
  'Strengthen brand presence among a large, diverse audience.',
]

const sponsorshipCategories = [
  'Platinum Sponsor',
  'Gold Sponsor',
  'Session Sponsor',
  'Stall',
  'Idea Pitching Competition Sponsor',
]

const participationProfiles = [
  'Entrepreneurs & Startup Founders',
  'Innovators & R&D Professionals',
  'Academicians & Researchers',
  'Students & Young Innovators',
  'Industry Experts & Professionals',
  'Investors & Incubation/Innovation Cell Members',
]

const technicalSessionTopics = [
  'Generative AI: Beyond the Hype – Real world applications.',
  'Sustainable Energy: The future of Green Tech and EV infrastructure.',
  'Blockchain & FinTech: Decentralizing the future of finance.',
  'Robotics & Automation: The next industrial revolution.',
  'Cybersecurity: Protecting digital assets in a hyper-connected world.',
]

const panelDiscussionTopics = [
  'Startups vs MNCs: Choosing the right career path.',
  'Funding Winter: How to bootstrap your way to success.',
  'Women in Tech: Breaking barriers and leading innovation.',
  'Industry 5.0: Bridging the gap between humans and machines.',
  'The role of Incubators in shaping student entrepreneurs.',
]

const ideaPitchRules = [
  'Open to students, innovators, researchers, and early-stage entrepreneurs.',
  'Individual or team participation (up to 3 members).',
  'Submit a 150–200 word abstract during registration.',
  'Only shortlisted submissions will be invited for the final pitch.',
  'Ideas must be original and not submitted elsewhere.',
  'Judging criteria: problem clarity, innovation, feasibility, impact, presentation.',
  '3-minute pitch followed by a 2-minute Q&A.',
]

const exhibitGuidelines = [
  'Individual inventors, student innovators, R&D teams, and early-stage product developers are invited.',
  'Exhibits must represent an original invention or prototype.',
  'Provide a brief description of the invention during registration.',
  'Working models, demos, or proof-of-concepts are mandatory.',
  'Space and basic display arrangements will be provided.',
  'Participants must be present during exhibit hours to explain their innovation.',
]

const importantDates = [
  'Dec 15, 2025: Registration Opens',
  'Jan 10, 2026: Abstract Submission Deadline',
  'Jan 25, 2026: Shortlisted Candidates Announced',
  'Feb 10, 2026: Final Pitch Deck Submission',
  'Feb 27, 2026: The Grand Event',
]

const eventChecklist = [
  'Bring your College ID card (Mandatory).',
  'Laptops required for workshop participants.',
  'Teams must report to the registration desk by 8:30 AM.',
  'Participation certificates will be provided digitally.',
  'Lunch and refreshments are provided for all registered attendees.',
]

const advisoryBoard = [
  {
    name: 'Shri. Ramshankar C S',
    designation: 'Co-founder and CEO',
    company: 'Maxbyte Technologies',
    image: adv1,
  },
  {
    name: 'Mr. Sivan Ambattu',
    designation: 'Entrepreneurship Development Institute of India (EDII)',
    company: 'Ahmedabad',
    image: adv2,
  },
  {
    name: 'Mr. Midhu Unnithan',
    designation: 'COO, TECHIN',
    company: 'IIT Palakkad',
    image: adv3,
  },
  {
    name: 'Mr. Sugantharaja Radhakrishnan',
    designation: 'Manager - Innovation and Research',
    company: 'Titan Company Limited',
    image: adv4,
  },
  {
    name: 'Dr. Suresh D S',
    designation: 'Director',
    company: 'Channabasaveshwara Institute of Technology, Tumkur',
    image: adv5,
  },
  {
    name: ' Dr. Nakul Parameswar',
    designation: 'Assistant Professor',
    company: 'Department of Entrepreneurship and Management, Indian Institute of Technology Hyderabad (IITH)',
    image: adv6,
  },
  {
    name: 'Mr. Sriram Sankaran',
    designation: ' Chairman and Managing Director',
    company: 'Synchron Group',
    image: adv7,
  },
  {
    name: 'Mr. Suresh Muthuswami',
    designation: 'Former Chairman of North America',
    company: 'Tata Consultancy Services (TCS)',
    image: adv8,
  },
]
const committeeLeaders = [
  {
    name: 'Shri L Gopalakrishnan',
    designation: 'Managing Trustee',
    title: 'Chief Patron',
    image: trusteeImg,
  },
  {
    name: 'Dr K Prakasan',
    designation: 'Principal',
    title: 'Patron',
    image: principalImg,
  },
]
const committeeTeams = [
  {
    title: 'Overall Coordination Committee',
    members: [
      { name: 'Dr G Thilagavathi', desig2: 'Professor and Head', dept: 'Department of Textile Technology',desig: 'IPR Activity Coordinator'},
      { name: 'Dr S Saravanan', desig: 'Dean – Autonomous Functioning', dept: 'Department of Production',desig2: 'Professor' },
      { name: 'Dr L S Jayashree', desig: 'Vice President (IIC)', dept: 'Department of CSE'},
    ]
  },
  {
    title: 'Organizing Secretary',
    members: [
      { name: 'Dr V Senthil Kumaran', desig: 'Associate Professor', dept: 'Department of AMCS' },
    ]
  },
  {
    title: 'Programme Committee',
    members: [
      { name: 'Dr Vaideki K', desig: 'Professor', dept: 'Department of Applied Science' },
      { name: 'Dr A Natarajan ', desig: 'Professor & HoD (i/c)', dept: 'Department of EEE' },
      { name: 'Dr Vasanthamani K', desig: 'Convenor IIC',desig2: 'Assistant Professor (Sl. Gr.)', dept: 'Department of ECE' },
      { name: 'Dr K P Radhika',desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of Humanities' }
    ]
  },
  {
    title: 'Idea Pitching Competition ',
    members: [
      { name: 'Dr Muthuram N', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of Production' },
      { name: 'Mr Sundar C', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of MCA' },
      { name: 'Dr S Vidyalakshmi', desig: 'Associate Professor', dept: 'Department of Biotechnology' },
    ]
  },
  {
    title: "Inventors' Exhibit Committee",
    members: [
      { name: 'Dr Prabukarthi A', desig: 'Assistant Professor', dept: 'Department of Mechanical' },
      { name: 'Dr Vairam T', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of IT' },
      { name: 'Ms Charmini B', desig: 'Assistant Professor', dept: 'Department of Fashion Technology' },
      { name: 'Dr K Krishnakumar', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of Metallurgical Engg.' },
    ]
  },
  {
    title: 'Publicity & Communications Committee',
    members: [
      { name: 'Dr Santhanalakshmi M', desig: 'Associate Professor', dept: 'Department of ECE' },
      { name: 'Dr Mariyam Adnan', desig: 'Associate Professor', dept: 'Department of AFD' },
      { name: 'Dr M Parthiban', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department Fashion Technology' },
      { name: 'Dr P Komakhan Sudar Vendan', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of EEE' },
      { name: 'Dr J Krishnasamy', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of Textile Technology' },
    ]
  },
  {
    title: 'Registration & Reception Committee',
    members: [
      { name: 'Dr Suriya S', desig: 'Associate Professor', dept: 'Department of CSE' },
      { name: 'Dr M R Nivitha', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of Civil' },
      { name: 'Dr Gayathri K', desig: 'Assistant Professor', dept: 'Department of Civil' },
      { name: 'Dr K P Devakaran', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of Automobile Engineering' },
    ]
  },
  {
    title: 'Sponsorship & Finance Committee',
    members: [
      { name: 'Dr R Murugan', desig: 'Professor', dept: 'Department of Textile' },
      { name: 'Dr Prasanth A S', desig: 'Associate Professor', dept: 'Department of Mechanical' },
      { name: 'Dr Elangovan S', desig: 'Associate Professor', dept: 'Department of Production' },
    ]
  },
  {
    title: 'Logistics & Venue Committee',
    members: [
      { name: 'Dr Dhanabal P', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of Mechanical' },
      { name: 'Dr R Priya', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of AMCS' },
      { name: 'Dr M S Sangeetha', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of Biomedical' },
    ]
  },
  {
    title: 'Hospitality & Guest Relations Committee',
    members: [
      { name: 'Dr Syath Abuthakeer S', desig: 'Associate Professor', dept: 'Department of Mechanical' },
      { name: 'Dr S Navaneeethan', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of I&CE' },
      { name: 'Dr S D Gopal Ram', desig: 'Assistant Professor (Sr. Gr.)', dept: 'Department of Physics' },
      { name: 'Dr R Rekha', desig: 'Associate Professor', dept: 'Department of IT' },
    ]
  },
  {
    title: 'Technical & AV Support Committee',
    members: [
      { name: 'Dr Thulasimani L', desig: 'Associate Professor', dept: 'Department of ECE' },
      { name: 'Mr Veerakumar S', desig: 'Assistant Professor', dept: 'Department of CSE' },
      { name: 'Dr S Udhayakumar', desig: 'Assistant Professor', dept: 'Department of Mechanical' },
    ]
  },
  {
    title: 'Catering & Refreshments Committee',
    members: [
      { name: 'Dr Ilayaraja N', desig: 'Assistant Professor', dept: 'Department of MCA' },
      { name: 'Dr S Prabhakaran', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of RAE' },
      { name: 'Dr J Palraj', desig: 'Assistant Professor (Sl. Gr.)', dept: 'Department of Mathematics' },
    ]
  },
]
{/*
const speakersList = [
  {
    name: 'Elon Musk',
    designation: 'CEO',
    company: 'SpaceX & Tesla',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sundar Pichai',
    designation: 'CEO',
    company: 'Google',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mira Murati',
    designation: 'CTO',
    company: 'OpenAI',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Satya Nadella',
    designation: 'Chairman & CEO',
    company: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Jensen Huang',
    designation: 'President',
    company: 'NVIDIA',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Lisa Su',
    designation: 'CEO',
    company: 'AMD',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Tim Cook',
    designation: 'CEO',
    company: 'Apple',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sam Altman',
    designation: 'Co-Founder',
    company: 'OpenAI',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]*/}
{/*
const sponsorsData = [
  {
    category: 'Platinum Sponsor',
    size: 'large', // CSS class trigger
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', 
    ]
  },
  {
    category: 'Gold Sponsors',
    size: 'medium',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    ]
  },
  {
    category: 'Session Sponsors',
    size: 'medium',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    ]
  },
  {
    category: 'Stalls',
    size: 'small',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Y_Combinator_logo.svg',
    ]
  },
  {
    category: 'Idea Pitching Sponsors',
    size: 'medium',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/9/96/Cisco_logo_blue_2016.svg',
    ]
  },
]
*/}
const aboutCollege = `PSG College of Technology (PSG Tech), established in 1951 by PSG & Sons' Charities, is an ISO 9001:2015 certified autonomous institution affiliated with Anna University, Chennai. Celebrating its Platinum Jubilee, PSG Tech offers 21 undergraduate and 24 postgraduate programs spanning Engineering and Technology, Computer Applications, Management Sciences, and Basic and Advanced Sciences. The campus hosts state-of-the-art Centers of Excellence including TIFAC-CORE in Product Design, Machine Tool Research Centre, Engineering Design Centre, Virtual Reality Centre, Tool and Die Centre, Centre for Nanotechnology, Centre for Robotics, Centre of Excellence in Artificial Intelligence and Software, Centre for Non-Linear Dynamics, Danfoss Centre of Excellence in Climate and Energy, and the Centre of Excellence in Welding Engineering and Technology. PSG Tech partners closely with industry, operates on-campus manufacturing units, and consistently ranks among India’s top institutions for innovation and industry linkage.`

const aboutEvent = `The Institution’s Innovation Council (IIC) of PSG College of Technology organizes “The Confluence – PSG Tech Innovation & Entrepreneurship Summit 2026” to foster a culture of innovation and entrepreneurial thinking. The summit provides a platform for students, faculty, startups, and industry experts to collaborate, share ideas, and showcase successful projects, startups, IPR achievements, and research outcomes of PSG Tech. Aligned with the national innovation agenda, it strengthens PSG Tech’s position as a leading contributor to India’s innovation ecosystem.`

const navigationLinks = [
  {href: '#page', label: 'Home'},
  { label: 'About',
    dropdown: [ 
      { label: 'The College', href: '#about' },
      { label: 'The Confluence', href: '#the-confluence' },
      {label: 'Schedule', href: '#important-dates'},
      { label: 'Advisory Committee', href: '#advisory'},
      { label: 'Organizing Committee', href: '#committee' }
    ] },
  { 
    label: 'Events', 
    dropdown: [
      { label: 'Technical Sessions', href: '#technical-sessions' },
      { label: "Panel Discussion", href: '#panel-discussion' },
      { label: 'Idea Pitching', href: '#idea-pitch' },
      { label: "Inventors' Exhibit", href: '#inventors-exhibit' }
    ]
  },
  { href: '#speakers', label: 'Speakers' },
  { href: '#sponsorship', label: 'Sponsorship' },
  { href: '#contact', label: 'Contact' },
]

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date()
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="countdown">
      {['days', 'hours', 'minutes', 'seconds'].map((label) => (
        <div key={label} className="countdown__unit">
          <span className="countdown__value">
            {String(timeLeft[label]).padStart(2, '0')}
          </span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}

const SectionHeading = ({ kicker, title, subtitle }) => (
  <div className="section-heading">
    {kicker && <span className="section-heading__kicker">{kicker}</span>}
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>
)

const GradientCard = ({ title, copy }) => (
  <article className="gradient-card">
    <h3>{title}</h3>
    <p>{copy}</p>
  </article>
)

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const eventMeta = useMemo(
    () => ({
      date: 'Friday, Feb 27, 2026',
      venue: 'GRD Centenary Auditorium',
    }),
    []
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setNavOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
    <div className="bubble-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

    <div className="page" id="page">
      <nav className="site-nav">
        <span className="site-nav__brand">
          <img src={psgTechLogo} alt="PSG Tech logo" className="nav-logo" />
          PSG College of Technology
        </span>
        <button
          type="button"
          className="site-nav__toggle"
          aria-label="Toggle navigation menu"
          aria-controls="site-nav-links"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div id="site-nav-links" className={`site-nav__links${navOpen ? ' is-open' : ''}`}>
          
          {navigationLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="nav-item-dropdown">
                  <span className="nav-label">{link.label} ▾</span>
                  <div className="dropdown-menu">
                    {link.dropdown.map((subLink) => (
                      <a 
                        key={subLink.href} 
                        href={subLink.href} 
                        onClick={() => setNavOpen(false)}
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <a key={link.href} href={link.href} onClick={() => setNavOpen(false)}>
                {link.label}
              </a>
            )
          })}

        <Link to="/signin" className="nav-cta">Register Now</Link>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero__grid">
          <div className="hero__main">
            <div className="hero__badge">
              <img src={iicLogo} alt="Institution’s Innovation Council" className="hero-badge__logo" />
              Institution’s Innovation Council Presents
            </div>
            <div className="hero__title-row">
              <div className="hero__title">
                <div className="hero-container">
                  
                  {/* ROW 1: THE MAIN TITLE (Aligned Left) */}
                  <h1 className="hero-main-text">THE CONFLUENCE</h1>

                  {/* ROW 2: LINES (Fill space) + YEAR (Right) */}
                  <div className="hero-middle-row">
                    <div className="hero-lines-group">
                      <span className="decor-line"></span>
                      <span className="decor-line"></span>
                      <span className="decor-line"></span>
                    </div>
                    <div className="hero-year-text">2026</div>
                  </div>

                  {/* ROW 3: SUBTITLE (Aligned Right) */}
                  <div className="hero-sub-container">
                    <p className="hero-sub-text">Research, Innovation & Start-up Summit</p>
                  </div>

                </div>
              </div>
              <div className="hero__right-column">
                <div className="hero__logos hero__logos--pair">
                  <img src={logo75} alt="PSG Tech 75 Years" className="hero-logo" />
                  <img src={logo100} alt="PSG Centenary" className="hero-logo hero-logo--centenary" />
                </div>
              </div>
            </div>
            <div className="hero__meta-row">
              <div className="hero__meta">
                <div>
                  <span>Date</span>
                  <strong>{eventMeta.date}</strong>
                </div>
                <div>
                  <span>Venue</span>
                  <strong>{eventMeta.venue}</strong>
                </div>
              </div>
              <div className="hero__countdown">
                <Countdown targetDate={eventDate} />
              </div>
            </div>

            <section id="highlights" className="section section--compact">
              <div className="grid grid--four">
                {highlights.map((item) => (
                  <GradientCard key={item.title} {...item} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </header>

      <section className="section section-stack" id="about">
      
      {/* 1. The College Banner */}
      <div id="the-college" className="wide-glass-card" style={{ 
           '--bg-full': `linear-gradient(to right, rgba(5, 10, 35, 0.9), rgba(5, 10, 35, 0.6)), url(${myCollegePic})` 
        }}>
        <SectionHeading kicker="The College" title="PSG College of Technology" />
        <p>{aboutCollege}</p>
      </div>

      {/* 2. The Confluence Banner */}
      <div id="the-confluence" className="wide-glass-card" style={{
          '--bg-full': `linear-gradient(to right, rgba(5, 10, 35, 0.9), rgba(5, 10, 35, 0.6)), url(${confluenceBg})`  
        }}>
        <SectionHeading kicker="The Confluence" title="Research, Innovation & Start-up Summit" />
        <p>{aboutEvent}</p>
          <ul className="list list--dot">
            <li>
              Provide a platform for students, faculty, startups, and industry experts to collaborate and
              exchange innovative ideas.
            </li>
            <li>
              Conduct workshops, keynote sessions, panel discussions, and exhibitions that promote
              innovation and entrepreneurship.
            </li>
            <li>
              Showcase successful projects, startups, IPR achievements, and research outcomes of PSG Tech.
            </li>
            <li>
              Strengthen PSG Tech’s role in India’s innovation ecosystem under the IIC framework.
            </li>
            <li>
              Identify and nurture early-stage student innovations for pre-incubation and incubation support.
            </li>
          </ul>
        </div>
      </section>

      <section id="sessions" className="section split-section">
      
      
      <div className="panel panel--outline" id='technical-sessions'>
        <SectionHeading
          kicker="Technical Sessions"
          title="Come and explore the incredible technical sessions"
          subtitle="Deep dives into breakthrough technologies."
        />
        <ul className="list list--arrow">
          {technicalSessionTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <div className="panel panel--accent" id='panel-discussion'>
        <SectionHeading
          kicker="Panel Discussion"
          title="Participate in the talks of the Industrial Great Minds"
          subtitle="Unfiltered conversations with industry leaders."
        />
        <ul className="list list--arrow">
          {panelDiscussionTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

    </section>
      <section id="competitions" className="section split-section">
        
        {/* 1. Idea Pitching Card -> Added id="idea-pitch" */}
        <div id="idea-pitch" className="panel panel--accent">
          <SectionHeading
            kicker="Idea Pitching Competition"
            title="Showcase your most impactful solutions"
            subtitle="Pitch to industry and academic experts, gain feedback, visibility, and a chance to win exciting prizes."
          />
          <ul className="list list--arrow">
            {ideaPitchRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* 2. Inventors' Exhibit Card -> Added id="inventors-exhibit" */}
        <div id="inventors-exhibit" className="panel panel--outline">
          <SectionHeading
            kicker="Inventors’ Exhibit"
            title="Spotlight for breakthrough prototypes"
            subtitle="Creators, innovators, and researchers exhibit working models and disruptive solutions."
          />
          <ul className="list list--arrow">
            {exhibitGuidelines.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
        
      </section>

    {/* NEW SECTION: Important Dates (With Golden Timeline) */}
    <section className="section" id="important-dates">
      
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Timeline"
          title="Important Dates & Info"
          subtitle="Mark your calendars and get ready for the big day."
        />
        
        {/* Reusing the grid layout */}
        <div className="sponsorship">
          
          {/* Column 1: The Golden Timeline */}
          <div className="Event_cont">
            <h3>Event Schedule</h3>
            
            {/* The Timeline Container */}
            <div className="timeline">
              {importantDates.map((item, index) => {
                const [datePart, eventPart] = item.split(':');
                
                return (
                  <div className="timeline-item" key={index}>
                    <span className="timeline-date">{datePart}</span>
                    <span className="timeline-event">{eventPart}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Checklist (Standard List) */}
          <div>
            <h3>Attendee Checklist</h3>
            <ul className="list list--dot">
              {eventChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
        
        <p className="note">
          *Dates are subject to change based on administrative decisions.
        </p>

      </div>
    </section>

    {/* NEW SECTION: Advisory Committee */}
    <section className="section" id="advisory">
      
      {/* Wrapped in Panel for the Glass Card + Golden Hover look */}
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Mentors"
          title="Advisory Committee"
          subtitle="Guiding us towards excellence."
        />
        
        {/* Uses the new 'advisory-grid' class for centering */}
        <div className="committee-grid">
          {advisoryBoard.map((member, index) => (
            <div className="member-card" key={index}>
              <img src={member.image} alt={member.name} className="member-img" />
              <div className="member-title">{member.title}</div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-desig">{member.designation}</p>
              <p className="member-company">{member.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

   {/* ORGANIZING COMMITTEE */}
    <section className="section" id="committee">
      
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Team"
          title="Organizing Committee"
          subtitle="The minds behind The Confluence 2026."
        />
        
        {/* ROW 1: TOP 2 LEADERS (Old Style: Photos + Center) */}
        <div className="advisory-grid" style={{ marginBottom: '3rem' }}>
          {committeeLeaders.map((member, index) => (
            <div className="member-card" key={`leader-${index}`}>
              <img src={member.image} alt={member.name} className="member-img" />
              <div className="member-title">{member.title}</div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-desig">{member.designation}</p>
              <p className="member-company">{member.company}</p>
            </div>
          ))}
        </div>

        {/* ROWS 2,3,4: THE 12 TEAMS (New Style: Text Lists + 4 Cols) */}
        <div className="committee-grid">
          {committeeTeams.map((team, index) => (
            
            /* Apply member-card for glass effect, team-card for new layout */
            <div className="member-card team-card" key={`team-${index}`}>
              
              {/* Blue Title */}
              <h3 className="team-card-title">{team.title}</h3>
              
              {/* Member List */}
              <div className="team-list">
                {team.members.map((m, i) => (
                  <div className="team-member-item" key={i}>
                    <div className="tm-name">{m.name}</div>
                    <div className="tm-desig">{m.desig}</div>
                    <div className="tm-desig2">{m.desig2}</div>
                    <div className="tm-dept">{m.dept}</div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>

    <section className="section" id="speakers">
      
    
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Lineup"
          title="Distinguished Speakers"
          subtitle="Visionaries shaping the future of technology."
        />
        {/* NEW SECTION: Speakers (Wrapped in Card) 
        <div className="committee-grid">
          {speakersList.map((speaker, index) => (
            <div className="member-card" key={index}>
              <img src={speaker.image} alt={speaker.name} className="member-img" />
              <h3 className="member-name">{speaker.name}</h3>
              <p className="member-title" style={{ marginTop: '0.5rem' }}>{speaker.designation}</p>
              <p className="member-desig">{speaker.company}</p>
            </div>
          ))}
        </div>*/}
      </div>
    </section>

      {/* 1. COMMUNITY SECTION (Wrapped) */}
      <section className="section" id="exhibit">
        {/* Added panel class for Card + Hover */}
        <div className="panel panel--outline">
          <SectionHeading
            kicker="Community"
            title="Who Can Participate?"
            subtitle="The Confluence welcomes a diverse community of forward-thinking changemakers."
          />
          <div className="grid grid--chips">
            {participationProfiles.map((profile) => (
              <span key={profile} className="chip">
                {profile}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. REGISTRATION SECTION (Wrapped) */}
      <section className="section" id="registration">
        <div className="panel panel--outline" style={{minHeight: 'auto'}}>
          <SectionHeading
            kicker="Registration Details"
            title="Secure your spot online"
            subtitle="Participants can register through the event portal. Early submissions are encouraged for curated slots."
          />
          <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
             {/* Added a placeholder button to make this section look complete */}
             <button className="nav-cta" style={{ background: 'transparent' }}>
               Registration Now
             </button>
          </div>
        </div>
      </section>

      {/* 3. SPONSORSHIP TEXT SECTION (Wrapped) */}
      <section className="section" id="sponsorship">
        <div className="panel panel--outline">
          <SectionHeading
            kicker="Partners"
            title="Sponsorship Opportunities"
            subtitle="Gain exceptional visibility among entrepreneurs, innovators, academicians, industry leaders, and students."
          />
          <div className="sponsorship">
            <div>
              <h3>Why Sponsor?</h3>
              <ul className="list list--dot">
                {sponsorshipReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Sponsorship Categories</h3>
              <ul className="list list--dot">
                {sponsorshipCategories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="note">For more details please contact the organizers.</p>
        </div>
      </section>

      {/* NEW SECTION: Sponsors Wall */}
    <section className="section" id="sponsors-wall">
      <SectionHeading
        kicker="Support"
        title="Our Sponsors"
        subtitle="Powering innovation through collaboration."
      />
      {/*
      <div className="sponsors-container">
        {sponsorsData.map((tier, index) => (
          <div key={index} className="sponsor-group">
            <h3 className="sponsor-category-title">{tier.category}</h3>
            
            
          </div>
        ))}
      </div>*/}
    </section>

      <div className="back-to-top">
        <a href="#top" aria-label="Back to top">
          <span>↑</span>
        </a>
      </div>

      
      </div>
      <footer className="footer">
        <div className="footer-content-compact">
          
          {/* COLUMN 1: LEFT (Contact Info) */}
          <div className="footer-left">
            <img src={collLogo} alt="College Logo" className="footer-logo" width="250px" height="65px"/>

            <div className="compact-item">
              <svg width="16" height="16" fill="none" stroke="#fcd361" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <strong>Website: </strong>
              <a href="https://psgtech.edu" target="_blank" rel="noreferrer" style={{ color: '#ccc', textDecoration: 'none' }}>https://psgtech.edu</a>
            </div>

            <div className="compact-item">
              <svg width="16" height="16" fill="none" stroke="#fcd361" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <strong>Email:  </strong>
              <a href="mailto:confluence@psgtech.ac.in" style={{ color: '#ccc', textDecoration: 'none' }}>confluence@psgtech.ac.in</a>
            </div>

            <div className="compact-item">
              <svg width="16" height="16" fill="none" stroke="#fcd361" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <strong>Mobile: </strong>
              <a href="tel:+919952418357" style={{ color: '#ccc', textDecoration: 'none' }}>
    +91 99524 18357
  </a>
            </div>
          </div>

          {/* COLUMN 2: CENTER (The Map) */}
          <div className="footer-center">
            <iframe 
              className="footer-map"
              title="PSG Tech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.155822989784!2d76.99847931480113!3d11.02649599215197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f1da8a671%3A0x6e76554867928c9!2sPSG%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1689254826123!5m2!1sen!2sin" 
              width="160" 
              height="160" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* COLUMN 3: RIGHT (Faculty & Address) */}
          <div className="footer-right">
            
            {/* Faculty Details */}
            <div className="secretary-block">
              <h3 className="sec-name">Dr. Senthil Kumaran V</h3>
              <p className="sec-role">Organizing Secretary</p>
              <p className="sec-event">The Confluence 2026</p>
            </div>

            {/* Address */}
            <div className="footer-address-block">
              <strong>PSG College of Technology</strong><br/>
              Peelamedu, Coimbatore - 641004
            </div>

          </div>

        </div>
        
        <div className="footer-copyright-slim">
          © {new Date().getFullYear()} PSG College of Technology
        </div>
      </footer>
      </>
  )
}

export default App
