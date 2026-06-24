import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
// TODO: Replace with AI-generated image
import arvynnaImg from '../assets/project-arvynna.png'
// TODO: Replace with AI-generated image
import flipiqImg from '../assets/project-flipiq.png'
import maanImg from '../assets/project-maan.png'
import './Portfolio.css'

const EDUCATION = [
  {
    id: 'usf',
    degree: 'B.S. Computer Science',
    school: 'University of South Florida',
    period: 'Fall 2026 (upcoming)',
    description: 'Transferring from HCC to pursue a Bachelor of Science in Computer Science at USF Tampa.',
  },
  {
    id: 'hcc',
    degree: 'A.A. Computer Science',
    school: 'Hillsborough Community College',
    period: '2024 – 2026',
    description: 'Completed associate degree coursework in computer science, mathematics, and software fundamentals.',
  },
  {
    id: 'codeboxx',
    degree: 'Full-Stack Development Certificate',
    school: 'Codeboxx Bootcamp',
    period: '2024 – 2025',
    description: 'Intensive full-stack program covering Java, Spring Boot, React Native, MERN, DevOps, and React + Vite across 16 modules.',
  },
]

const EXPERIENCE = [
  {
    id: 'freelance',
    role: 'Full-Stack Developer (Freelance)',
    org: 'Self-Employed',
    period: '2024 – Present',
    description:
      'Built client websites and web apps for local Tampa Bay businesses. Delivered Maan Academy school website using Next.js and Framer Motion.',
  },
  {
    id: 'genesis',
    role: 'Junior Developer Intern',
    org: 'Genesis Solutions',
    period: '2023',
    description:
      'Assisted with frontend development tasks, component building, and code reviews in a professional team environment.',
  },
  {
    id: 'bestbuy',
    role: 'Sales Consultant',
    org: 'Best Buy',
    period: '2022 – 2023',
    description:
      'Customer-facing tech sales and product consultation — developed strong communication and advisory skills.',
  },
]

const FEATURED_PROJECTS = [
  {
    id: 'arvynna',
    name: 'Arvynna AI',
    description:
      'An AI-powered lead follow-up SaaS targeting contractors in Tampa Bay. Automates outreach sequences and follow-up messages using GoHighLevel automation and Stripe billing. Currently offline — codebase coming soon.',
    tags: ['React', 'Node.js', 'GHL', 'Stripe', 'Netlify'],
    github_url: null,
    live_url: null,
    image: arvynnaImg,
  },
  {
    id: 'flipiq',
    name: 'FlipIQ',
    description:
      'A house-flipping analysis PWA for real estate investors. Pulls live property data and uses AI to analyze flip potential, repair estimates, and ROI.',
    tags: ['Next.js 15', 'Supabase', 'Anthropic API', 'RapidAPI', 'Vercel'],
    github_url: null,
    live_url: 'https://flipiq-five.vercel.app',
    image: flipiqImg,
  },
  {
    id: 'maan',
    name: 'Maan Academy',
    description:
      "A school website for Ma'an Arabic Montessori Academy, a co-op in Tampa. Features enrollment info, program details, and contact.",
    tags: ['Next.js', 'Framer Motion'],
    github_url: 'https://github.com/WhoZihni/Maan-website',
    live_url: null,
    image: maanImg,
  },
]

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function IconExternalLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-img-wrap">
        {project.image && (
          <img
            src={project.image}
            alt={`${project.name} project screenshot`}
            className="project-img"
          />
        )}
      </div>
      <div className="project-content">
        <h3 className="project-name">{project.name}</h3>
        <div className="project-tags">
          {(project.tags || []).map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <p className="project-desc">{project.description}</p>
        <div className="project-links">
          {project.github_url && (
            <a
              href={project.github_url}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub />
              GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              className="project-link project-link-live"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink />
              Live Site
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const [projects, setProjects] = useState(FEATURED_PROJECTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) return

    setLoading(true)
    supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data, error: fetchError }) => {
        setLoading(false)
        if (fetchError) {
          setError(fetchError.message)
          return
        }
        if (data && data.length > 0) setProjects(data)
      })
  }, [])

  return (
    <div className="portfolio">

      <div className="portfolio-header">
        <div className="portfolio-header-text">
          <h1 className="portfolio-title">Portfolio</h1>
          <p className="portfolio-subtitle">Education, experience, and shipped projects</p>
        </div>
        {/* TODO: Add actual resume PDF to public/ folder */}
        <a href="/resume.pdf" className="btn-resume" download>
          <IconDownload />
          Download Resume
        </a>
      </div>

      {/* ── Section 1: Education ─────────────────────────── */}
      <section className="portfolio-section">
        <h2 className="section-title">
          <span className="section-title-accent">01</span>
          Education
        </h2>
        <div className="timeline">
          {EDUCATION.map(({ id, degree, school, period, description }) => (
            <div key={id} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">{period}</span>
              </div>
              <div className="timeline-body">
                <p className="timeline-role">{degree}</p>
                <p className="timeline-org">{school}</p>
                <p className="timeline-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Work Experience ───────────────────── */}
      <section className="portfolio-section">
        <h2 className="section-title">
          <span className="section-title-accent">02</span>
          Work Experience
        </h2>
        <div className="timeline">
          {EXPERIENCE.map(({ id, role, org, period, description }) => (
            <div key={id} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">{period}</span>
              </div>
              <div className="timeline-body">
                <p className="timeline-role">{role}</p>
                <p className="timeline-org">{org}</p>
                <p className="timeline-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Projects ──────────────────────────── */}
      <section className="portfolio-section">
        <h2 className="section-title">
          <span className="section-title-accent">03</span>
          Projects
        </h2>

        {loading && <p className="portfolio-status">Loading projects…</p>}

        {error && (
          <p className="portfolio-status portfolio-error">
            Failed to load projects: {error}
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="portfolio-status">No projects to display yet.</p>
        )}

        {!loading && projects.length > 0 && (
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
