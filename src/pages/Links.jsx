import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
// TODO: Replace with AI-generated image
import githubImg from '../assets/link-github.png'
// TODO: Replace with AI-generated image
import linkedinImg from '../assets/link-linkedin.png'
import arvynnaImg from '../assets/link-arvynna.png'
import flipiqImg from '../assets/link-flipiq.png'
import maanImg from '../assets/link-maan.png'
import './Links.css'

const FEATURED_LINKS = [
  {
    id: 'github',
    label: 'GitHub — WhoZihni',
    description:
      'Browse my repositories, open-source work, and project code. All my Codeboxx modules and personal projects live here.',
    url: 'https://github.com/WhoZihni',
    category: 'Social',
    display_order: 1,
    image: githubImg,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn — Ahmed Zihni',
    description:
      'My professional profile with work history, skills, and recommendations. Open to junior developer roles and internships.',
    url: 'https://www.linkedin.com/in/ahmedzihni',
    category: 'Social',
    display_order: 2,
    image: linkedinImg,
  },
  {
    id: 'arvynna',
    label: 'Arvynna AI',
    description:
      'An AI-powered lead follow-up SaaS I built for contractors. Automates outreach and follow-up sequences using GoHighLevel and Stripe.',
    url: 'https://arvynna.com',
    category: 'Projects',
    display_order: 3,
    image: arvynnaImg,
  },
  {
    id: 'flipiq',
    label: 'FlipIQ',
    description:
      'A house-flipping analysis PWA I built using Next.js, Supabase, and the Anthropic API. Helps real estate investors evaluate flip potential.',
    url: 'https://flipiq-five.vercel.app',
    category: 'Projects',
    display_order: 4,
    image: flipiqImg,
  },
  {
    id: 'maan',
    label: 'Maan Arabic Montessori Academy',
    description:
      'A school website I built for a Montessori co-op in Tampa using Next.js and Framer Motion.',
    url: 'https://maanacademy.org',
    category: 'Projects',
    display_order: 5,
    image: maanImg,
  },
]

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function LinkCard({ label, description, url, category, image }) {
  return (
    <a
      href={url}
      className="link-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="link-card-img-wrap">
        <img src={image} alt={label} className="link-card-img" />
      </div>
      <div className="link-card-body">
        {category && <span className="link-card-category">{category}</span>}
        <p className="link-card-label">{label}</p>
        <p className="link-card-desc">{description}</p>
      </div>
      <div className="link-card-arrow">
        <IconArrow />
      </div>
    </a>
  )
}

export default function Links() {
  const [links, setLinks] = useState(FEATURED_LINKS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) return

    setLoading(true)
    supabase
      .from('links')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data, error: fetchError }) => {
        setLoading(false)
        if (fetchError) {
          setError(fetchError.message)
          return
        }
        if (data && data.length > 0) setLinks(data)
      })
  }, [])

  return (
    <div className="links-page">
      <div className="links-header">
        <h1 className="links-title">Links</h1>
        <p className="links-subtitle">Profiles, projects, and everything in between</p>
      </div>

      {loading && <p className="links-status">Loading…</p>}

      {error && (
        <p className="links-status links-error">Failed to load links: {error}</p>
      )}

      {!loading && !error && links.length === 0 && (
        <p className="links-status">No links to display yet.</p>
      )}

      {!loading && links.length > 0 && (
        <div className="links-list">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              label={link.label}
              description={link.description}
              url={link.url}
              category={link.category}
              image={link.image}
            />
          ))}
        </div>
      )}
    </div>
  )
}
