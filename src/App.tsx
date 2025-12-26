// src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
// import profile image from src so Vite/bundler resolves the path
import profileImage from './Reebaik_Hamilton.jpg';
import useCountUp from './hooks/useCountUp';

// --- ICONS ---
const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const StackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
    <path d="m9 14 5-5" />
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    <path d="M8 10h6" />
  </svg>
);

const CloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="section-icon">
    <path d="M17.5 19c0-1.7-1.3-3-3-3h-11a3 3 0 0 1-3-3c0-1.3.8-2.4 2-2.8C2.9 6.2 6.2 3 10.5 3c3.9 0 7.2 2.7 8.1 6.5 2.5.5 4.4 2.7 4.4 5.5 0 3.3-2.7 6-6 6h-1.5" />
  </svg>
);

// --- TYPES ---
type NavLink = { href: string; label: string };
type SkillItem = { name: string; detail: string };
type SkillGroup = { title: string; icon: React.ReactNode; items: SkillItem[] };
type Project = {
  title: string;
  tech: string;
  shortDescription: string;
  objective: string;
  highlights: string[];
  achievements: string[];
  link?: string;
  demo?: string;
};
type Education = { school: string; degree: string; years: string };
type Contact = { phone: string; email: string; github?: string; linkedin?: string };

// --- CONSTANTS & DATA ---
const NAV_LINKS: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
];

const ROLE = 'ML & Full-Stack Engineer (MERN • NLP • LLM Ops)';
const LOCATION = 'Kerala, Kollam, India';

const SKILLS: SkillGroup[] = [
  {
    title: 'ML & AI',
    icon: <BrainIcon />,
    items: [
      { name: 'Python (pandas, scikit-learn)', detail: 'Standard ML/Data Science stack for data preprocessing and classic ML model implementation.' },
      {
        name: 'PyTorch',
        detail: `
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super(SimpleNet, self).__init__()
        # Demonstrating a simple feedforward architecture
        self.fc1 = nn.Linear(784, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = x.view(-1, 784) # Flatten
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x
`.trim(),
      },
      { name: 'TensorFlow', detail: 'Experience building Keras models for image and sequence data, and using TensorFlow Serving for deployment.' },
      { name: 'NLP pipelines', detail: 'Competent in tokenization, embedding generation, sequence modeling (LSTMs/Transformers), and model finetuning.' },
      { name: 'Matplotlib', detail: 'Data visualization and exploration for model training diagnostics and result presentation.' },
    ],
  },
  {
    title: 'Full Stack (MERN)',
    icon: <StackIcon />,
    items: [
      { name: 'React.js', detail: 'State management with Hooks (useState, useEffect, useContext) and building component-based, reusable UIs.' },
      { name: 'Node.js', detail: 'Building scalable server-side applications, handling asynchronous operations, and managing npm dependencies.' },
      {
        name: 'Express.js',
        detail: `
const express = require('express');
const app = express();
// Middleware for securing the API endpoint
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send('Access Denied');
    next();
};

app.get('/api/secure-data', authMiddleware, (req, res) => {
    res.json({ message: 'Confidential Data' });
});
`.trim(),
      },
      {
        name: 'MongoDB',
        detail: `
// Sample Mongoose Schema Definition
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
`.trim(),
      },
      { name: 'TypeScript', detail: 'Strong grasp of static typing for improved maintainability and reduced runtime errors in large-scale applications.' },
      { name: 'REST APIs', detail: 'Designing clear, predictable, and secure RESTful endpoints for seamless client-server communication.' },
    ],
  },
  {
    title: 'Cloud & Tools',
    icon: <CloudIcon />,
    items: [
      { name: 'Git', detail: 'Advanced knowledge of branching strategies (Gitflow), conflict resolution, and PR workflows.' },
      { name: 'Firebase', detail: 'Authentication (Auth), real-time database (Firestore), and cloud function integration (ATHENA project).' },
      { name: 'Cloudinary', detail: 'Efficient media asset management and optimization (AURA AI project).' },
      { name: 'Hugging Face API', detail: 'Model deployment, faster inference, and leveraging pre-trained LLM models.' },
      { name: 'Postman', detail: 'API testing, documentation, and creating collection-based integration tests.' },
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: 'AURA AI — AI Image Generation Website (MERN)',
    tech: 'React, Node, Express, MongoDB, Cloudinary, Hugging Face API',
    shortDescription: 'A full-stack platform for generating, storing, and sharing AI-generated images with seamless user workflows.',
    objective: 'To build a complete, functional platform for generating AI images with secure payment and storage capabilities.',
    highlights: [
      'Full-stack AI image generation with paid user flows and JWT auth.',
      'Hugging Face integration for model inference; Cloudinary for storage.',
      'Responsive UI and secure routing.',
    ],
    achievements: [
      'Built a full-stack platform (MERN Stack).',
      'Integrated the Hugging Face API, resulting in a 40% faster generation time.',
      'Processed over 50 images successfully.',
      'Enabled paid users to save/share outputs using Cloudinary for storage.',
      'Custom image gallery for each authenticated user.',
    ],
    link: 'https://github.com/Reebaik/AI-image-generation-website',
    demo: 'ai-image-generation-website-brown.vercel.app', // Update with real link
  },
  {
    title: 'ATHENA — IoT-Based Smart Security System',
    tech: 'Arduino, Python (OpenCV), Flutter, Firebase',
    shortDescription: 'A real-time smart security system with face recognition, hardware integration, and mobile control.',
    objective: 'To develop a smart, real-time security and access system with computer vision and IoT hardware.',
    highlights: [
      'Real-time face recognition access control and alerts.',
      'Firebase-backed auth to reduce manual verification time by 85%.',
      'Fast servo-based locking with feedback on LCD/buzzer.',
    ],
    achievements: [
      'Developed an OpenCV-based face recognition system achieving 92% accuracy.',
      'Used real-time authentication via Firebase to reduce manual identity verification time by 85%.',
      'Integrated hardware components to add a servo-controlled door, buzzer alerts, and an LCD status display, achieving a 70% faster response.',
    ],
    link: 'https://github.com/Reebaik/IOT-Facial-Recoginition-Security-System',
  },
  {
    title: 'AI-Scorer — AI-Based Spoken Transcript Scoring',
    tech: 'Python, spaCy/TextBlob, rule-based scoring',
    shortDescription: 'An NLP-powered evaluation engine that scores spoken transcripts using rule-based metrics and sentiment analysis.',
    objective: 'To design an NLP scoring engine for transcript evaluation with consistent, reproducible results.',
    highlights: [
      'Weighted scoring pipeline for grammar, WPM, sentiment, keywords.',
      'Improved evaluation consistency by 30% and cut assessment time by 80%.',
    ],
    achievements: [
      'Improved transcript evaluation consistency by 30%.',
      'Reduced assessment time by 80%, scoring transcripts in under 1 second.',
      'Used rule-based grammar, Words Per Minute (WPM), sentiment, and keyword density metrics.',
      'Achieved 95% reproducibility in results through a weighted scoring pipeline with modular NLP evaluators.',
    ],
    link: 'https://github.com/Reebaik/AI-Spoken-Communication-Scorer',
  },
  {
    title: 'Blogging Platform(MERN)',
    tech: 'React, Node, Express, MongoDB',
    shortDescription: 'A foundational MERN stack blogging application with user authentication and content management.',
    objective: 'To demonstrate core CRUD operations and full-stack MERN integration with user authentication.',
    highlights: ['CRUD blogging with JWT auth, comments, and role-based access.'],
    achievements: [
      'Demonstrates foundational competence in the MERN stack.',
      'Core CRUD (Create, Read, Update, Delete) operations for blog posts.',
      'User authentication with JWT tokens.',
      'Role-based access control for user actions.',
      'Complete integration of MongoDB, Express.js, React.js, and Node.js.',
    ],
    link: 'https://github.com/Reebaik/MERN-project',
  },
];

const EDUCATION: Education[] = [
  { school: 'Marian College Kuttikkanam (Autonomous)', degree: 'Master of Computer Applications', years: '2024 - 2026' },
  { school: 'Fathima Mata National College (Autonomous)', degree: 'Bachelor of Commercial Applications', years: '2020 - 2023' },
];

const CONTACT: Contact = {
  phone: '9072340688',
  email: 'hamiltonreebaik@gmail.com',
  github: 'https://github.com/Reebaik?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/reebaik-hamilton-26a80994/',
};

// Ensure profile image is handled correctly (Vite)
const profileImageUrl = profileImage;

// --- COMPONENT: SkillCard (Handles Interactive Popup via Portal) ---
interface SkillCardProps {
  groupTitle: string;
  item: SkillItem;
}

const SkillCard: React.FC<SkillCardProps> = ({ groupTitle, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const chipRef = useRef<HTMLSpanElement>(null);
  const isCode = groupTitle === 'ML & AI' || groupTitle === 'Full Stack (MERN)';

  const handleMouseEnter = () => {
    if (chipRef.current) {
      const rect = chipRef.current.getBoundingClientRect();
      setCoords({
        // Position at the TOP edge of the chip minus a small gap
        top: rect.top - 12,
        // Center horizontally based on the chip's width
        left: rect.left + rect.width / 2,
      });
    }
    setIsHovered(true);
  };

  return (
    <>
      <span
        ref={chipRef}
        className="skill-chip"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.name}
      </span>

      {isHovered &&
        createPortal(
          <div
            className={`skill-popup-portal ${isCode ? 'skill-popup-portal--wide' : ''}`}
            style={{
              top: coords.top,
              left: coords.left,
              // Shifts the popup UP by 100% of its own height so it sits above the cursor
              transform: 'translateX(-50%) translateY(-100%)',
            }}
          >
            <div className="skill-popup-header">{item.name}</div>
            {isCode ? (
              <pre className="skill-popup-code">
                <code>{item.detail}</code>
              </pre>
            ) : (
              <p className="skill-popup-text">{item.detail}</p>
            )}
            {/* Arrow pointing down because popup is above */}
            <div className="skill-popup-arrow-down" />
          </div>,
          document.body // Render directly to body to avoid clipping
        )}
    </>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  // Refs for project articles to support smooth auto-scroll when opened
  const projectRefs = useRef<Record<string, HTMLElement | null>>({});

  // Mobile Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // About section ref + visibility state (used to trigger counters)
  const aboutRef = useRef<HTMLElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  // Scroll Spy State
  const [activeSection, setActiveSection] = useState('');

  // useCountUp hooks — only start when aboutVisible becomes true
  const inference = useCountUp(40, 1200, aboutVisible);
  const reproducibility = useCountUp(95, 1200, aboutVisible);
  const verification = useCountUp(85, 1200, aboutVisible);

  // Close menu when resizing to desktop (prevents layout bugs)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Auto-scroll opened project into view (with animation delay)
  useEffect(() => {
    if (!expandedProject) return;
    const timer = setTimeout(() => {
      const el = projectRefs.current[expandedProject];
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 350); 
    return () => clearTimeout(timer);
  }, [expandedProject]);

  // --- SCROLL SPY (FIXED: CLOSEST TO CENTER) ---
  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.scrollY + (window.innerHeight / 2);
      
      let closestSectionId = '';
      let minDistance = Infinity;

      for (const link of NAV_LINKS) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element) {
          // Calculate the center of the section itself
          const sectionMiddle = element.offsetTop + (element.offsetHeight / 2);
          
          // Calculate distance from screen center to section center
          const distance = Math.abs(viewportMiddle - sectionMiddle);
          
          // Update if this section is closer than the previous best
          if (distance < minDistance) {
            minDistance = distance;
            closestSectionId = sectionId;
          }
        }
      }

      // Special case: If we are at the very bottom, force Contact to be active
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
         closestSectionId = 'contact';
      }

      if (closestSectionId) {
        setActiveSection(closestSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observe About section and start counters when it's visible (single-fire)
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutVisible(true);
            obs.disconnect(); // we only want to start once
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // --- HANDLE NAV CLICK (CENTER + INSTANT HIGHLIGHT) ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // 1. Manually calculate scroll position to center the element
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      const offsetPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // 2. Force update active state immediately
      setActiveSection(targetId);

      // 3. Update URL without jumping
      window.history.pushState(null, '', href);
    }
  };

  // --- HANDLE BRAND CLICK (SCROLL TO TOP) ---
  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection(''); // Clear active state
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <div className="page" role="document">
      {/* Background element */}
      <div className="bg-gradient" aria-hidden />

      {/* Navigation */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        {/* UPDATED BRAND: Clickable + Animated Gradient */}
        <a 
          href="#" 
          className="brand" 
          onClick={handleBrandClick}
          aria-label="Scroll to top"
        >
          <span className="text-grad">Reebaik Hamilton</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <div className={`hamburger-lines ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Nav Content (Links + CTA) - Becomes Drawer on Mobile */}
        <div className={`nav-content-wrapper ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="nav-links">
            {NAV_LINKS.map((l) => {
                const isActive = activeSection === l.href.substring(1);
                return (
                    <a 
                        key={l.href} 
                        href={l.href} 
                        className={`nav-link ${isActive ? 'active' : ''}`}
                        onClick={(e) => handleNavClick(e, l.href)}
                    >
                        {l.label}
                    </a>
                );
            })}
          </div>

          <a className="nav-cta" href="#contact" onClick={() => setIsMenuOpen(false)}>
            Let&apos;s talk
          </a>
        </div>

        {/* Backdrop for mobile menu */}
        <div className={`nav-backdrop ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)} />
      </nav>

      {/* Hero Section */}
      <header className="hero" id="hero">
        <div className="hero__intro">
          <h1 className="hero-title">
            Hi, I am <span className="text-grad">Reebaik Hamilton</span>
          </h1>
          <p className="role-location">
            <strong>{ROLE}</strong> • {LOCATION}
          </p>
          <p className="lede concise">
            I build production-ready ML features and full-stack MERN products — NLP & LLM pipelines, model-to-API
            integrations, and clean React frontends.
          </p>

          <div className="hero__actions">
            <a className="btn primary" href="#projects">
              View projects
            </a>
            <a className="btn ghost" href="#contact">
              Contact
            </a>
          </div>

          <div className="quick-bullets">
            <span>✅ ML engineering (NLP, LLM ops)</span>
            <span>✅ MERN + TypeScript</span>
            <span>✅ Cloud-ready deployments</span>
          </div>
        </div>

        <aside className="hero__aside" aria-hidden={false}>
          <div
            className="hero__photo"
            style={profileImageUrl ? { backgroundImage: `url(${profileImageUrl})` } : undefined}
            role="img"
            aria-label="Profile photo of Reebaik Hamilton"
          >
            {!profileImageUrl && <span className="hero__photo__label">Add your photo (public/profile.jpg)</span>}
          </div>
        </aside>
      </header>

      {/* Intro Card */}
      <section className="section section--accent">
        <div className="hero__card hero__card--wide">
          <p className="pill pill-gradient">Open to ML Engineering & Full-Stack Roles</p>
          <ul className="card-list">
            <li>End-to-end ML systems (NLP, LLM ops, scoring pipelines)</li>
            <li>Full-stack MERN apps with secure auth and clean UX</li>
            <li>Cloud-native deployments and API integrations</li>
          </ul>
        </div>
      </section>

      <main>
        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="section__header">
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-content" ref={(el) => { aboutRef.current = el; }}>
            <p className="about-body">
              As an MCA student specializing in NLP, LLM pipelines, and Applied AI, I adopt a results-focused engineering mindset. My focus is on measurable wins achieved through building end-to-end systems — such as{' '}
              <span className="about-highlight">
                <span className="metric-number">{aboutVisible ? inference : 0}%</span> faster inference
              </span>{' '}
              with Hugging Face,{' '}
              <span className="about-highlight">
                <span className="metric-number">{aboutVisible ? reproducibility : 0}%</span> reproducibility
              </span>{' '}
              in NLP scoring, and{' '}
              <span className="about-highlight">
                <span className="metric-number">{aboutVisible ? verification : 0}%</span> reduction
              </span>{' '}
              in verification time via Firebase.
            </p>
            <p className="about-body">
              For junior roles, I bring solid engineering practices, quick iteration, and a hunger to apply my skills across the stack — from model design and deployment to creating usable user experiences. I'm passionate about building systems that deliver real impact.
            </p>
          </div>
        </section>

        {/* Skills Section (Interactive with Icons) */}
        <section id="skills" className="section">
          <div className="section__header">
            <h2 className="section-title">Skills</h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((group) => (
              <article key={group.title} className="card">
                {/* Header with Icon */}
                <div className="card-header-flex">
                  <div className="icon-box">
                    {group.icon}
                  </div>
                  <h3 className="card-title">{group.title}</h3>
                </div>
                
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <SkillCard key={item.name} groupTitle={group.title} item={item} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="section__header">
            <h2 className="section-title">Projects</h2>
          </div>
          <div className="projects">
            {PROJECTS.map((p, index) => (
              <article
                ref={(el) => {
                  projectRefs.current[p.title] = el;
                }}
                key={p.title}
                className={`card project-card project-card-${index}`}
              >
                <header
                  className="project-header"
                  onClick={() => setExpandedProject(expandedProject === p.title ? null : p.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpandedProject(expandedProject === p.title ? null : p.title);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-short-desc">{p.shortDescription}</p>
                    <p className="meta">{p.tech}</p>
                  </div>
                  
                  {/* Action Buttons in Header */}
                  <div className="project-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    {p.demo && (
                       <a 
                         href={p.demo} 
                         target="_blank" 
                         rel="noreferrer" 
                         className="btn primary small"
                         onClick={(e) => e.stopPropagation()}
                       >
                         Live Demo
                       </a>
                    )}
                    {p.link && (
                      <a 
                        href={p.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn ghost small"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                    {/* caret indicator */}
                    <svg
                      className={`caret ${expandedProject === p.title ? 'open' : ''}`}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </header>

                <div className={`project-details ${expandedProject === p.title ? 'is-open' : 'is-closed'}`} aria-hidden={expandedProject === p.title ? 'false' : 'true'}>
                  <div className="project-section">
                    <h4 className="project-section-title">Objective</h4>
                    <p>{p.objective}</p>
                  </div>

                  <div className="project-section">
                    <h4 className="project-section-title">Key Highlights</h4>
                    <ul className="project-list">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-section">
                    <h4 className="project-section-title">Key Achievements</h4>
                    <ul className="project-list">
                      {p.achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <div className="section__header">
            <h2 className="section-title">Education</h2>
          </div>
          <div className="timeline">
            {EDUCATION.map((e) => (
              <div key={e.degree} className="card timeline__item">
                <div className="timeline__meta">{e.years}</div>
                <div>
                  <h3 className="heading-grad">{e.degree}</h3>
                  <p className="meta">{e.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section section--accent">
          <div className="cta">
            <div>
              <h2 className="section-title">Contact</h2>
              <p className="body">Interested in ML engineering, NLP, or full-stack roles. I&apos;m excited to contribute to teams shipping AI-powered experiences.</p>
              <div className="contact-form">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setFormStatus('loading');

                    try {
                      const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          access_key: '3a853d5e-988a-4001-b88a-53a55d7c553e',
                          name: formData.name,
                          email: formData.email,
                          message: formData.message,
                        }),
                      });

                      if (response.ok) {
                        setFormStatus('success');
                        setFormMessage("Thanks for reaching out! I'll get back to you soon.");
                        setFormData({ name: '', email: '', message: '' });
                        setTimeout(() => setFormStatus('idle'), 5000);
                      } else {
                        setFormStatus('error');
                        setFormMessage('Failed to send message. Please try again.');
                        setTimeout(() => setFormStatus('idle'), 5000);
                      }
                    } catch (error) {
                      setFormStatus('error');
                      setFormMessage('Error sending message. Please try emailing me directly.');
                      setTimeout(() => setFormStatus('idle'), 5000);
                    }
                  }}
                >
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} required />
                  </div>
                  <button type="submit" className="btn primary" disabled={formStatus === 'loading'}>
                    {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus !== 'idle' && <p className={`form-status form-status--${formStatus}`}>{formMessage}</p>}
                </form>
              </div>
            </div>

            <div className="cta__details">
              <p>
                <span className="icon-phone">📞</span>
                {CONTACT.phone}
              </p>
              <p>
                <span className="icon-email">✉️</span>
                {CONTACT.email}
              </p>
              {CONTACT.github && (
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {CONTACT.github.replace('https://github.com/', '@')}
                </a>
              )}
              {CONTACT.linkedin && (
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.668-2.237-.909 0-1.449.613-1.686 1.205-.087.211-.109.505-.109.799v5.802h-3.554s.048-9.411 0-10.386h3.554v1.471c.459-.71 1.281-1.719 3.113-1.719 2.271 0 3.974 1.481 3.974 4.66v5.974zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.951.765-1.708 1.959-1.708 1.188 0 1.914.757 1.938 1.708 0 .949-.75 1.707-1.982 1.707zm1.582 10.019H3.771V9.066h3.148v10.386zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Reebaik Hamilton. Built with React + TypeScript + Vite.</p>
      </footer>
    </div>
  );
}