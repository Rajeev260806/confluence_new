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
import adv9 from './assets/Gandhi.jpeg'
import sdg1 from './assets/sdg3.png'
import sdg2 from './assets/sdg6.png'
import sdg3 from './assets/sdg7.png'
import sdg4 from './assets/sdg9.png'
import sdg5 from './assets/sdg11.png'
import sdg6 from './assets/sdg12.png'
import sdg7 from './assets/sdg13.png'
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
  'Silver Sponsor',
  'Event Sponsor', 
  'Session Sponsor',
]

const participationProfiles = [
  'Entrepreneurs & Startup Founders',
  'Innovators & R&D Professionals',
  'Academicians & Researchers',
  'Students & Young Innovators',
  'Industry Experts & Professionals',
  'Investors & Incubation/Innovation Cell Members',
]
/*
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
]*/

const ideaPitchRules = [
  'Open to students, innovators, researchers, and early-stage entrepreneurs.',
  'Individual or team participation (up to 4 members).',
  ' The problem statement and the solution should be submitted online using only the provided template',
  'Only shortlisted submissions will be invited for the final pitch.',
  'Ideas must be original and should not have been pitched or submitted in any other competition.',
  'Judging Criteria : Problem Solution fit, Innovation, Societal Impact, Product Market fit.',
  'Only ideas at TRL 3 and above are eligible.',
]

const exhibitGuidelines = [
  'Individual inventors, student innovators, and early-stage product developers are invited to exhibit their working model of original inventions',
  'Exhibits must represent an original invention or prototype.',
  'Participants should provide a brief description of their invention during registration.',
  'Working models, demos, or proof-of-concepts are mandatory.',
  'Space and basic display arrangements will be provided.',
  'Participants must be present during exhibit hours to explain their innovation.',
  "Jury's decision will be final",
  'Only ideas at TRL 6  and above are eligible.',
]

const importantDates = [
  'Dec 17, 2025: Submission Opens',
  "Jan 20, 2026:Idea Submission and Inventors' Exhibit Submission ",
  'Jan 31, 2026: Shortlisted idea and Product Announced',
  'Feb 10, 2026: Registration closes',
  'Feb 27, 2026: The Grand Event',
]

const sdgData = [
  {
    id: 3,
    title: "SDG 3: Good Health & Well-being",
    img: sdg1, 
    topics: ["AI in Diagnostics & Telemedicine", "Wearable Health Monitoring", "Mental Health Tech Solutions"]
  },
  {
    id: 6,
    title: "SDG 6: Clean Water & Sanitation",
    img: sdg2,
    topics: ["Smart Water Management Systems", "Advanced Filtration Technologies", "Wastewater Treatment & Recycling"]
  },
  {
    id: 7,
    title: "SDG 7: Affordable & Clean Energy",
    img: sdg3,
    topics: ["Solar & Wind Energy Innovations", "Electric Vehicle (EV) Infrastructure", "Smart Grid Technologies"]
  },
  {
    id: 9,
    title: "SDG 9: Industry, Innovation & Infrastructure",
    img: sdg4,
    topics: ["IoT & Smart Manufacturing", "Sustainable Construction Materials", "Robotics & Automation"]
  },
  {
    id: 11,
    title: "SDG 11: Sustainable Cities & Communities",
    img: sdg5,
    topics: ["Urban Mobility & Traffic AI", "Green Building Architecture", "Disaster Resilient Infrastructure"]
  },
  {
    id: 12,
    title: "SDG 12: Responsible Consumption",
    img: sdg6,
    topics: ["Waste-to-Wealth Technologies", "Bio-degradable Packaging", "Supply Chain Transparency"]
  },
  {
    id: 13,
    title: "SDG 13: Climate Action",
    img: sdg7,
    topics: ["Carbon Capture & Storage", "Climate Modeling & AI", "Renewable Ag-Tech"]
  }
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
  {
    name: 'Prof Dr. Gandhi',
    designation: 'Head-ERP, Textile Design',
    company: 'National Institute of Fashion Technology Chennai',
    image: adv9,
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
      {name: 'Dr Prabhu Raja V',desig: 'Professor', dept: 'Department of Mechanical Engineering'},
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
      {name: 'Dr Anand M',desig: 'Assistant Professor (Sl. Gr.)', dept:'Department of EEE'},
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
      {name: 'Dr Sivakumar P',desig: 'Assistant Professor (Sl. Gr.)', dept:'Department of EEE'},
      { name: 'Dr S Udhayakumar', desig: 'Assistant Professor', dept: 'Department of Mechanical' },
    ]
  },
  {
    title: 'Catering & Refreshments Committee',
    members: [
      { name: 'Dr Srivatsun G', desig: 'Associate Professor', dept:'Department of ECE'},
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
const aboutCollege = `PSG College of Technology (PSG Tech), established in 1951 by PSG & Sons’ Charities, is an ISO 9001:2015 certified autonomous institution affiliated with Anna University, Chennai. This year marks a significant milestone as PSG College of Technology celebrates its Platinum Jubilee, coinciding with the Centenary Year of PSG & Sons’ Charities, the founding trust renowned for its contributions to education and industry. PSG Tech offers 21 undergraduate and 24 postgraduate programmes across Engineering and Technology, Computer Applications, Management Sciences, and Basic and Advanced Sciences. The institution is home to several state-of-the-art Centers of Excellence including the TIFAC CORE in Product Design, Machine Tool Research Centre, Engineering Design Centre, Virtual Reality Centre, Tool and Die Centre, Centre for Nanotechnology, Centre forRobotics, Centre of Excellence in Artificial Intelligence and Software, Centre for Non-Linear Dynamics, Danfoss Centre of Excellence in Climate and Energy, and the Centre of Excellence in Welding Engineering and Technology. Under the PSG Industrial Institute, the college also operates in-campus manufacturing units producing machine tools, pumps, and motors, along with off-campus foundry units, enabling practical industry exposure for students. PSG Tech has built a strong network with industries, research organizations, alumni, and entrepreneurs, fostering innovation and collaboration. The institution has received national recognition, ranking second in the ATAL Ranking of Institutions on Innovation Achievements (ARIIA) under the Government and Government Aided Technical Institutions category by the Ministry of Education, Government of India in 2021, and being awarded the Best Industry-Linked Institution by AICTE-CII in 2012. Further, during India’s G20 Presidency in 2022, PSG Tech was chosen as one of 75 leading educational institutions in the country to conduct special lectures, student exchange programmes, and academic and cultural activities to promote awareness of the G20 agenda among students and the academic community.`
const aboutIIC = 'Institution’s Innovation Council (IIC) at PSG College of Technology is a dedicated innovation and entrepreneurship support body established under the directive of the Ministry of Education’s Innovation Cell (MIC), Government of India. Its purpose is to cultivate and strengthen an innovation-driven mindset among students and faculty by organizing activities throughout the year that promote creative thinking, problem-solving, and entrepreneurial skills. The IIC at PSG Tech works to:'
const aboutIICPoints = [
  'Conduct innovation and entrepreneurship programs, workshops, and contests to nurture skills and idea generation',
  'Provide access to resources, mentorship, and supportive environments that help convert ideas into prototypes and potential startups.',
  'Encourage students to participate in hackathons, demo days, and design challenges to build real-world experience.',
  'Offer pre-incubation and hand-holding support for early-stage entrepreneurial ventures.',
]
const aboutEvent1 = "The Institution’s Innovation Council (IIC) of PSG College of Technology proudly presents “The Confluence 2026 – Research, Innovation & Start-up Summit” as part of the Platinum Jubilee celebrations of PSG College of Technology. This one-day national-level flagship event that brings together researchers, innovators, entrepreneurs, investors, industry leaders, and academicians on a single vibrant platform."
const aboutEvent2 = "The summit aims to foster a strong culture of innovation, nurture entrepreneurial thinking among students and faculty, and showcase PSG Tech’s research and start-up ecosystem in alignment with the national innovation and entrepreneurship agenda. The Confluence 2026 serves as a powerful interface between research, technology, industry, and societal needs."
const aboutEvent3 = "In line with global sustainability priorities, The Confluence 2026 is aligned with the United Nations Sustainable Development Goals (UN SDGs). These themes will guide the keynote addresses, technical sessions, panel discussions, idea pitching competition, and the inventors’ exhibit, ensuring that every innovation presented contributes toward a sustainable, inclusive, and technology-driven future. Through this platform, innovators will gain direct exposure to investors, incubators, and industry mentors. Participants with validated PoCs will receive strategic guidance to convert innovations into scalable start-ups. The event also enables high-impact networking and expert interactions, fostering meaningful collaborations. The Confluence 2026 is not just an event—it is a launchpad for impactful ideas, sustainable technologies, and next-generation start-ups."

const navigationLinks = [
  {href: '#page', label: 'Home'},
  { label: 'About',
    dropdown: [ 
      { label: 'The College', href: '#about' },
      { label: 'The IIC', href: '#the-iic' },
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
  { href: '#contacts', label: 'Contact' },
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
    {kicker && <span className="section-heading__kicker"><b>{kicker}</b></span>}
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
  const [navOpen, setNavOpen] = useState(false);
  const eventMeta = useMemo(
    () => ({
      date: 'Friday, Feb 27, 2026',
      venue: 'GRD Centenary Auditorium-PSG Tech',
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
  }, [navOpen])

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
      
        <div id="the-iic" className="wide-glass-card" style={{ 
           '--bg-full': `linear-gradient(to right, rgba(5, 10, 35, 0.9), rgba(5, 10, 35, 0.6)), url(${myCollegePic})` 
        }}>
        <SectionHeading kicker="The Council" title="Institution’s Innovation Council (IIC)" />
        <p>{aboutIIC}</p>
        <ul className="list list--arrow">
            {aboutIICPoints.map((points) => (
              <li key={points}>{points}</li>
            ))}
          </ul>
      </div>

      {/* 2. The Confluence Banner */}
      <div id="the-confluence" className="wide-glass-card" style={{
          '--bg-full': `linear-gradient(to right, rgba(5, 10, 35, 0.9), rgba(5, 10, 35, 0.6)), url(${confluenceBg})`  
        }}>
        <SectionHeading kicker="The Confluence" title="Research, Innovation & Start-up Summit" />
        <p>{aboutEvent1}</p>
        <p>{aboutEvent2}</p>
        <p>{aboutEvent3}</p>
        
        </div>
      </section>

      <section className="section" id="purpose-driven">
  <div className="panel panel--outline" style={{background: '#0a103499', border: '1px solid rgba(255, 255, 255, .12)'}}>
    <SectionHeading
      kicker="Sustainability"
      title="Purpose-Driven Focus"
      subtitle="Aligned with UN SDGs to drive global impact."
    />
    
    {/* Apply the Grid Class */}
    <div className="sdg-grid">
      {sdgData.map((sdg) => (
        /* Apply the Card Class */
        <div className="sdg-card" key={sdg.id}>
          
          <div className="sdg-img-container">
            <img src={sdg.img} alt={sdg.title} className="sdg-img" />
          </div>

          <h3>{sdg.title}</h3>
          
          <ul className="sdg-subtopics">
            {sdg.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>

        </div>
      ))}
    </div>
  </div>
</section>
      <section id="sessions" className="section split-section">
      
      
      <div className="panel panel--outline" id='technical-sessions'>
        <SectionHeading
          kicker="Technical Sessions"
          title="Come and explore the incredible technical sessions"
          subtitle="Deep dives into breakthrough technologies."
        />{/*
        <ul className="list list--arrow">
          {technicalSessionTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>*/}
      </div>

      <div className="panel panel--accent" id='panel-discussion'>
        <SectionHeading
          kicker="Panel Discussion"
          title="Participate in the talks of the Industrial Great Minds"
          subtitle="Unfiltered conversations with industry leaders."
        />{/*
        <ul className="list list--arrow">
          {panelDiscussionTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>*/}
      </div>

    </section>
      <section id="competitions" className="section split-section">
        
        {/* 1. Idea Pitching Card -> Added id="idea-pitch" */}
        <div id="idea-pitch" className="panel panel--accent">
          <SectionHeading
            kicker="Idea Pitching Competition"
            title="Showcase the most creative and impactful ideas"
            subtitle=" Pitch the solution to leading industry and academic experts. Gain valuable visibility, receive constructive feedback, and elevate the work to the next level. Plus, stand a chance to win exciting prizes while making a real impact with the innovation."
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
            subtitle= "The Inventors’ Exhibit provides a platform for creators, innovators, and researchers to showcase their prototypes, working models, and breakthrough ideas.This exhibit highlights novel solutions across domains and offers an opportunity to interact with industry experts, academicians, investors, and fellow innovators"
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
        </div>
        
        <p className="note">
          *Dates are subject to change based on administrative decisions.
        </p>

      </div>
    </section>
    {/* --- INSERT PRIZE MONEY SECTION HERE (Below Important Dates) --- */}
<section className="section" id="important-dates">
      
      <div className="panel panel--outline">
        <SectionHeading
          kicker="Prize Pool"
          title="Prizes and Benefits for the Winners for Idea Pitching and Inventor’ Exhibit"
          subtitle="Get ready to grab the amazing prizes and benefits!"
        />
  <div className="container" style={{ 
    display: 'flex', 
    gap: '30px', 
    alignItems: 'stretch', 
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    padding: '50px',
  }}>

    {/* LEFT SIDE: CASH PRIZES TABLE */}
    <div className="prize-cash-panel" style={{ 
      flex: '1 1 450px', 
      minWidth: '300px',
      paddingBottom: '90px', 
      borderRadius: '12px',
      color: '#fff'
    }}>
      <h3 style={{ 
        color: '#fcd361', 
        fontSize: '1.8rem', 
        marginBottom: '1.5rem', 
        textAlign: 'center',
        borderBottom: '2px solid rgba(252, 211, 97, 0.3)',
        paddingBottom: '10px'
      }}>Cash Prizes</h3>
      <div className="prize-list" style={{ fontSize: '1.2rem' }}>
        <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>🥇 1st Prize:</span> 
          <span style={{ color: '#fcd361', fontWeight: 'bold' }}>Rs 50,000</span>
        </p>
        <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>🥈 2nd Prize:</span> 
          <span style={{ color: '#aaa' }}>Rs 30,000</span>
        </p>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold' }}>🥉 3rd Prize:</span> 
          <span style={{ color: '#aaa' }}>Rs 20,000</span>
        </p>
      </div>
    </div>

    {/* RIGHT SIDE: MENTORSHIP & ACCESS PANEL */}
    <div className="prize-mentorship-panel" style={{ 
      flex: '1 1 450px', 
      minWidth: '300px',
      paddingTop: '0px',
      marginBotton: '30px', 
      borderRadius: '12px',
      color: '#fff',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#38bdf8', 
        fontSize: '1.8rem', 
        marginBottom: '1.5rem', 
        textAlign: 'center',
        borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
        paddingBottom: '10px'
      }}>Beyond Cash</h3>
      <p style={{ 
        fontSize: '1.4rem', 
        lineHeight: '1.8', 
        color: '#ccc',
        whiteSpace: 'pre-line' /* Respects line breaks for easy formatting */
      }}>
        Apart from Cash Prizes,
        Winners Will Also Receive
        <strong style={{ color: '#fcd361', display: 'block', margin: '5px 0' }}>100 hours of lab access</strong>
        and 
        <strong style={{ color: '#38bdf8', display: 'block', margin: '5px 0' }}>one to one mentorship</strong>
      </p>
    </div>
  </div>
  </div>
</section>
{/* --- END PRIZE MONEY SECTION --- */}

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
      <div id="contacts">
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
      </div>
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
          onClick={() => setNavOpen(!navOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        {/* In src/App.jsx, find the div that holds the links and CHANGE it to this: */}
<div className={`site-nav__links ${navOpen ? 'is-open' : ''}`}>
          
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
      </>
  )
}

export default App
