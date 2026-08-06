import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { InstagramIcon } from './shared'
import { useSite } from '../context/SiteContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/concert', label: 'Concert' },
  { to: '/artistes', label: 'Artistes' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Nav() {
  const { site } = useSite()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const instagram = site?.social?.instagram

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Canadian Gospel Artistes home" onClick={closeMenu}>
            <img
              className="brand-mark"
              src="/images/cga-logo.png"
              alt="Canadian Gospel Artistes logo"
              width="56"
              height="56"
            />
            <span className="brand-name">Canadian Gospel Artistes</span>
          </Link>

          <nav className="header-nav" aria-label="Primary">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            ))}
            {instagram ? (
              <a
                className="social-btn"
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canadian Gospel Artistes on Instagram"
              >
                <InstagramIcon />
              </a>
            ) : null}
          </nav>

          <div className="header-mobile-actions">
            {instagram ? (
              <a
                className="social-btn"
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canadian Gospel Artistes on Instagram"
              >
                <InstagramIcon />
              </a>
            ) : null}
            <button
              type="button"
              className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMenu}>
            {link.label}
          </NavLink>
        ))}
        {instagram ? (
          <a
            className="mobile-social"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <InstagramIcon />
            Instagram
          </a>
        ) : null}
      </nav>
    </>
  )
}
