import { Link, NavLink } from 'react-router-dom'
// TODO: Replace logo.png with AI-generated logo before launch
import logo from '../assets/logo.png'
import './Header.css'

const NAV_LINKS = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12L12 3l9 9" />
        <path d="M9 21V12h6v9" />
        <path d="M3 12v9h4v-6h10v6h4V12" />
      </svg>
    ),
  },
  {
    to: '/portfolio',
    label: 'Portfolio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: '/links',
    label: 'Links',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

function navClass({ isActive }) {
  return isActive ? 'active' : undefined
}

function mobileNavClass({ isActive }) {
  return `mobile-nav-link${isActive ? ' active' : ''}`
}

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <img src={logo} alt="Ahmed Zihni" className="header-logo-img" />
            <span className="header-logo-name">Ahmed Zihni</span>
          </Link>
          <nav aria-label="Main navigation">
            <ul className="desktop-nav">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={navClass} end={to === '/'}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {NAV_LINKS.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} className={mobileNavClass} end={to === '/'}>
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
