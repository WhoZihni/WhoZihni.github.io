import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/links">Links</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}
