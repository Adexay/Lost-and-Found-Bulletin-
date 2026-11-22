import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const onBulletin = location.pathname === '/found-items'
  const query = new URLSearchParams(location.search).get('search') || ''

  const handleSearch = (event) => {
    event.preventDefault()
    const search = query.trim()
    navigate(search ? `/found-items?search=${encodeURIComponent(search)}` : '/found-items')
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    const search = value.trim()
    navigate(search ? `/found-items?search=${encodeURIComponent(search)}` : '/found-items', {
      replace: true,
    })
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-brand" aria-label="FindIT home">
        <span className="site-brand-icon" aria-hidden="true">🧭</span>
        FindIT
      </Link>

      {onBulletin ? (
        <form className="header-search" role="search" onSubmit={handleSearch}>
          <input
            aria-label="Search found items"
            type="search"
            placeholder="Search by item name"
            value={query}
            onChange={handleSearchChange}
          />
          <button type="submit" aria-label="Search">
            <Search size={18} />
          </button>
        </form>
      ) : null}

      <nav className="header-nav" aria-label="Main navigation">
        {!onBulletin ? (
          <NavLink
            to="/found-items"
            className={({ isActive }) => `header-link${isActive ? ' header-link-active' : ''}`}
          >
            Found items
          </NavLink>
        ) : null}
        <Link to="/report" className="report-link">
          <span aria-hidden="true">➕</span>
          Report a found item
        </Link>
      </nav>
    </header>
  )
}
