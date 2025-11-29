import { useEffect, useMemo, useState } from 'react'
import logo75 from './assets/75.jpeg'
import logo100 from './assets/100.jpeg'
import psgTechLogo from './assets/college.jpeg'
import iicLogo from './assets/iic.jpeg'
import myCollegePic from './assets/college.jpg'
import confluenceBg from './assets/confluence_.png'; 
import collLogo from './assets/coll_logo.png'; 
import './App.css'

const eventDate = new Date('2026-02-20T09:00:00+05:30')

const highlights = [
  {
    title: 'Technical Sessions',
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

const committeeMembers = [
  {
    name: 'Dr. J. Siddharth Nandha Roy',
    designation: 'Professor',
    title: 'Patron',
    company: 'Techno',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. R. Gandhinathan',
    designation: 'Professor',
    title: 'Convenor',
    company: 'TEQIP',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. S. Neelakrishnan',
    designation: 'Head of Dept',
    title: 'Co-Convenor',
    company: 'Automobile Engineering',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Ms. Sarah Jenkins',
    designation: 'CTO',
    title: 'Industry Chair',
    company: 'Innovate AI Labs',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mr. David Ross',
    designation: 'Director',
    title: 'Alumni Advisor',
    company: 'TechStarts Inc.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Anita Roy',
    designation: 'Assoc. Professor',
    title: 'Event Coordinator',
    company: 'Robotics Centre',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]

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
]

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

const aboutCollege = `PSG College of Technology (PSG Tech), established in 1951 by PSG & Sons' Charities, is an ISO 9001:2015 certified autonomous institution affiliated with Anna University, Chennai. Celebrating its Platinum Jubilee, PSG Tech offers 21 undergraduate and 24 postgraduate programs spanning Engineering and Technology, Computer Applications, Management Sciences, and Basic and Advanced Sciences. The campus hosts state-of-the-art Centers of Excellence including TIFAC-CORE in Product Design, Machine Tool Research Centre, Engineering Design Centre, Virtual Reality Centre, Tool and Die Centre, Centre for Nanotechnology, Centre for Robotics, Centre of Excellence in Artificial Intelligence and Software, Centre for Non-Linear Dynamics, Danfoss Centre of Excellence in Climate and Energy, and the Centre of Excellence in Welding Engineering and Technology. PSG Tech partners closely with industry, operates on-campus manufacturing units, and consistently ranks among India’s top institutions for innovation and industry linkage.`

const aboutEvent = `The Institution’s Innovation Council (IIC) of PSG College of Technology organizes “The Confluence – PSG Tech Innovation & Entrepreneurship Summit 2026” to foster a culture of innovation and entrepreneurial thinking. The summit provides a platform for students, faculty, startups, and industry experts to collaborate, share ideas, and showcase successful projects, startups, IPR achievements, and research outcomes of PSG Tech. Aligned with the national innovation agenda, it strengthens PSG Tech’s position as a leading contributor to India’s innovation ecosystem.`

const navigationLinks = [
  { href: '#highlights', label: 'Highlights' },     // 1.
  { href: '#about', label: 'About' },               // 2. Moved up
  { href: '#sessions', label: 'Competitions' }, // 3. Moved down
  { href: '#important-dates', label: 'Dates' },     // 4. NEW
  { href: '#committee', label: 'Organisers' },      // 5. NEW
  { href: '#speakers', label: 'Speakers' },         // 6. NEW
  { href: '#sponsorship', label: 'Sponsorship' },   // 7.
  { href: '#contact', label: 'Contact' },           // 8.
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
    <div className="page">
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
          {navigationLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setNavOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-cta"
            href="https://confluence.psgtech.ac.in"
            target="_blank"
            rel="noreferrer"
            onClick={() => setNavOpen(false)}
          >
            Register Now
          </a>
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
                <h1>
                  <span className="hero__title-word">The</span>
                  <span className="hero__title-word hero__title-word--accent">Confluence</span>
                </h1>
                <p className="hero__subtitle">PSG Tech Innovation & Entrepreneurship Summit 2026</p>
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
      <div className="wide-glass-card" style={{ 
           '--bg-full': `linear-gradient(to right, rgba(5, 10, 35, 0.9), rgba(5, 10, 35, 0.6)), url(${myCollegePic})` 
        }}>
        <SectionHeading kicker="The College" title="PSG College of Technology" />
        <p>{aboutCollege}</p>
      </div>

      {/* 2. The Confluence Banner */}
      <div className="wide-glass-card" style={{
          '--bg-full': `linear-gradient(to right, rgba(5, 10, 35, 0.9), rgba(5, 10, 35, 0.6)), url(${confluenceBg})`  
        }}>
        <SectionHeading kicker="The Confluence" title="Innovation Summit 2026" />
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
      
      
      <div className="panel panel--outline">
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

      <div className="panel panel--accent">
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
        <div className="panel panel--accent">
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
        <div className="panel panel--outline">
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
                // Split the string into Date and Event Name
                // Example: "Dec 15, 2025: Registration Opens" -> ["Dec 15, 2025", "Registration Opens"]
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

    {/* NEW SECTION: Organizing Committee (Wrapped in Card) */}
    <section className="section" id="committee">
      
      {/* Added 'panel panel--outline' for the Card look + Golden Hover */}
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Team"
          title="Organizing Committee"
          subtitle="The minds behind The Confluence 2026."
        />
        
        <div className="committee-grid">
          {committeeMembers.map((member, index) => (
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

    {/* NEW SECTION: Speakers (Wrapped in Card) */}
    <section className="section" id="speakers">
      
      {/* Added 'panel panel--outline' here too */}
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Lineup"
          title="Distinguished Speakers"
          subtitle="Visionaries shaping the future of technology."
        />
        
        <div className="committee-grid">
          {speakersList.map((speaker, index) => (
            <div className="member-card" key={index}>
              <img src={speaker.image} alt={speaker.name} className="member-img" />
              <h3 className="member-name">{speaker.name}</h3>
              <p className="member-title" style={{ marginTop: '0.5rem' }}>{speaker.designation}</p>
              <p className="member-desig">{speaker.company}</p>
            </div>
          ))}
        </div>
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
               Registration Link Coming Soon
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
        title="Our Partners"
        subtitle="Powering innovation through collaboration."
      />
      
      <div className="sponsors-container">
        {sponsorsData.map((tier, index) => (
          <div key={index} className="sponsor-group">
            {/* The Category Title (e.g. Platinum Sponsor) */}
            <h3 className="sponsor-category-title">{tier.category}</h3>
            
            {/* The Logos */}
            <div className="sponsor-row">
              {tier.logos.map((logoUrl, i) => (
                <img 
                  key={i} 
                  src={logoUrl} 
                  alt={`${tier.category} logo`} 
                  className={`sponsor-logo logo-${tier.size}`} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

      <section className="section contact" id="contact">
        <SectionHeading kicker="Contact Details" title="Connect with The Confluence Team" />
        <div className="contact__grid">
          <div className="contact__card">
            <strong>Institution’s Innovation Council</strong>
            <p>
              PSG College of Technology
              <br />
              Peelamedu, Coimbatore – 641 004
            </p>
          </div>
          <div className="contact__card">
            <p>
              Website:{' '}
              <a href="https://confluence.psgtech.ac.in" target="_blank" rel="noreferrer">
                https://confluence.psgtech.ac.in
              </a>
            </p>
            <p>Email: <a href="mailto:confluence@psgtech.ac.in">confluence@psgtech.ac.in</a></p>
            <p>Mobile: <a href="tel:+919952418357">+91 99524 18357</a></p>
          </div>
        </div>
      </section>

      <div className="back-to-top">
        <a href="#top" aria-label="Back to top">
          <span>↑</span>
        </a>
      </div>

      
      </div>
      <footer className="footer">
        <div className="footer-content-compact">
          
          {/* LEFT SIDE: Logo + Contact Info */}
          <div className="footer-left">
            
            {/* Logo */}
            <img src={collLogo} alt="College Logo" className="footer-logo" />

            {/* Line 1: Website */}
            <div className="compact-item">
              <svg width="16" height="16" fill="none" stroke="#fcd361" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <strong>Website:</strong>
              <a href="https://psgtech.edu" target="_blank" rel="noreferrer">https://psgtech.edu</a>
            </div>

            {/* Line 2: Email */}
            <div className="compact-item">
              <svg width="16" height="16" fill="none" stroke="#fcd361" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <strong>Email:</strong>
              <a href="mailto:principal@psgtech.ac.in">principal@psgtech.ac.in</a>
            </div>

            {/* Line 3: Mobile */}
            <div className="compact-item">
              <svg width="16" height="16" fill="none" stroke="#fcd361" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <strong>Mobile:</strong>
              <span>0422-2572177, 2572477</span>
            </div>
          </div>

          {/* RIGHT SIDE: Map on Top, Address Below */}
          <div className="footer-right">
            
            {/* 1. Map First */}
            <iframe 
              title="PSG Tech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.155822989784!2d76.99847931480113!3d11.02649599215197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f1da8a671%3A0x6e76554867928c9!2sPSG%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1689254826123!5m2!1sen!2sin" 
              width="80" 
              height="80" 
              style={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* 2. Address Second */}
            <p className="compact-address">
              PSG College of Technology<br/>
              Peelamedu<br/>
              Coimbatore-641004
            </p>

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
