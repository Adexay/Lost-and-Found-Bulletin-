import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>🧭 FindIT &middot; Group 8 project</span>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/found-items">Found items</Link>
        <Link to="/report">Report an item</Link>
        <Link to="/admin">Admin dashboard</Link>
      </nav>
    </footer>
  )
}
