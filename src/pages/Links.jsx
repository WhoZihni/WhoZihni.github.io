import githubImg from '../assets/link-github.png'
import linkedinImg from '../assets/link-linkedin.png'
import arvynnaImg from '../assets/link-arvynna.png'
import flipiqImg from '../assets/link-flipiq.png'
import maanImg from '../assets/link-maan.png'
import './Links.css'

const LINKS = [
  {
    id: 'github',
    category: 'SOCIAL',
    name: 'GitHub — WhoZihni',
    description:
      'Browse my repositories, open-source work, and project code. All my Codeboxx modules and personal projects live here.',
    image: githubImg,
    url: 'https://github.com/WhoZihni',
  },
  {
    id: 'linkedin',
    category: 'SOCIAL',
    name: 'LinkedIn — Ahmed Zihni',
    description:
      'My professional profile with work history, skills, and recommendations. Open to junior developer roles and internships.',
    image: linkedinImg,
    url: 'https://www.linkedin.com/in/ahmed-zihni-4443b03a5/',
  },
  {
    id: 'arvynna',
    category: 'PROJECT',
    name: 'Arvynna AI',
    description:
      'An AI-powered lead follow-up SaaS I built for contractors. Currently offline — view the concept on GitHub.',
    image: arvynnaImg,
    url: 'https://arvynna.com',
  },
  {
    id: 'flipiq',
    category: 'PROJECT',
    name: 'FlipIQ',
    description:
      'A house-flipping analysis PWA built with Next.js, Supabase, and the Anthropic API. Helps investors evaluate flip potential.',
    image: flipiqImg,
    url: 'https://flipiq-five.vercel.app',
  },
  {
    id: 'maan',
    category: 'PROJECT',
    name: 'Maan Arabic Montessori Academy',
    description:
      'A school website I built for a Montessori co-op in Tampa using Next.js and Framer Motion.',
    image: maanImg,
    url: 'https://github.com/WhoZihni/Maan-website',
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

function LinkCard({ name, description, url, category, image }) {
  return (
    <a
      href={url}
      className="link-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="link-card-img-wrap">
        <img src={image} alt={name} className="link-card-img" />
      </div>
      <div className="link-card-body">
        {category && <span className="link-card-category">{category}</span>}
        <p className="link-card-label">{name}</p>
        <p className="link-card-desc">{description}</p>
      </div>
      <div className="link-card-arrow">
        <IconArrow />
      </div>
    </a>
  )
}

export default function Links() {
  return (
    <div className="links-page">
      <div className="links-header">
        <h1 className="links-title">Links</h1>
        <p className="links-subtitle">Profiles, projects, and everything in between</p>
      </div>
      <div className="links-list">
        {LINKS.map((link) => (
          <LinkCard
            key={link.id}
            name={link.name}
            description={link.description}
            url={link.url}
            category={link.category}
            image={link.image}
          />
        ))}
      </div>
    </div>
  )
}
