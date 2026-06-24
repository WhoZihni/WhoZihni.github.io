import { Link } from 'react-router-dom'
import ahmedImg from '../assets/ahmed.png'
import skillsImg from '../assets/home-skills.png'
import './Home.css'

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  )
}

function IconDatabase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function IconTerminal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

function IconGit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
  )
}

function IconLightbulb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  )
}

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconRocket() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

const TECH_SKILLS = [
  {
    icon: <IconCode />,
    name: 'JavaScript / React',
    description: 'Building interactive, component-based UIs with modern React patterns, hooks, and React Router.',
  },
  {
    icon: <IconServer />,
    name: 'Java / Spring Boot',
    description: 'Designing RESTful APIs and backend services with strong object-oriented principles.',
  },
  {
    icon: <IconDatabase />,
    name: 'Supabase / PostgreSQL',
    description: 'Database design, row-level security policies, and backend-as-a-service integration.',
  },
  {
    icon: <IconTerminal />,
    name: 'Node.js / Express',
    description: 'Server-side logic, REST API design, and middleware for full-stack JavaScript applications.',
  },
  {
    icon: <IconGit />,
    name: 'Git / GitHub Actions',
    description: 'Version control, feature branching, and CI/CD pipelines for automated production deploys.',
  },
]

const SOFT_SKILLS = [
  {
    icon: <IconLightbulb />,
    name: 'Problem Solver',
    description: 'Builds real solutions for real problems — not just tutorial projects.',
  },
  {
    icon: <IconZap />,
    name: 'Fast Learner',
    description: 'Picks up new technologies quickly and applies them in production environments.',
  },
  {
    icon: <IconGlobe />,
    name: 'Bilingual Communicator',
    description: 'Fluent in English and Arabic — able to work with and present to diverse teams.',
  },
  {
    icon: <IconRocket />,
    name: 'Entrepreneurial Mindset',
    description: 'Has launched SaaS products and worked with freelance clients from the ground up.',
  },
]

export default function Home() {
  return (
    <div className="home">

      {/* ── Section 1: Introduction ─────────────────────── */}
      <section className="home-hero">
        <img
          src={ahmedImg}
          alt="Ahmed Zihni"
          className="home-avatar"
        />
        <p className="home-tagline">Full-Stack Developer</p>
        <h1 className="home-name">Ahmed Zihni</h1>
        <p className="home-bio">
          I&apos;m a full-stack developer based in Tampa, FL — building across
          the stack with React, Java, and Supabase. Completing the Codeboxx
          Full-Stack bootcamp alongside an A.A. in Computer Science at HCC,
          transferring to USF for a B.S. in CS. I work fluently in English
          and Arabic.
        </p>
        <div className="home-cta">
          <Link to="/portfolio" className="btn btn-primary">View Portfolio</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
        </div>
      </section>

      {/* ── Section 2: Technical Skills ─────────────────── */}
      <section className="home-section home-tech">
        <div className="home-section-header">
          <h2 className="home-section-title">Technical Skills</h2>
          <p className="home-section-subtitle">Technologies I build with every day</p>
        </div>

        <div className="home-skills-img-wrap">
          {/* TODO: Replace with AI-generated image */}
          <img
            src={skillsImg}
            alt="Visual overview of Ahmed's technical skill areas"
            className="home-skills-img placeholder-img"
          />
        </div>

        <div className="home-grid">
          {TECH_SKILLS.map(({ icon, name, description }) => (
            <div key={name} className="home-card">
              <div className="home-card-icon">{icon}</div>
              <h3 className="home-card-name">{name}</h3>
              <p className="home-card-desc">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Soft Skills ──────────────────────── */}
      <section className="home-section home-soft">
        <div className="home-section-header">
          <h2 className="home-section-title">What I Bring</h2>
          <p className="home-section-subtitle">Beyond the stack</p>
        </div>

        <div className="home-grid">
          {SOFT_SKILLS.map(({ icon, name, description }) => (
            <div key={name} className="home-card">
              <div className="home-card-icon">{icon}</div>
              <h3 className="home-card-name">{name}</h3>
              <p className="home-card-desc">{description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
