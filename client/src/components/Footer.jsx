import { Link } from 'react-router-dom'
import { InstagramIcon } from './shared'
import { useSite } from '../context/SiteContext'

export default function Footer() {
  const { site } = useSite()
  const instagram = site?.social?.instagram

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/images/cga-logo.png" alt="" width="40" height="40" />
          <strong>Canadian Gospel Artistes</strong>
        </div>
        <div className="footer-meta">
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
          <p>© 2026 Canadian Gospel Artistes</p>
        </div>
      </div>
      <div className="container footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/concert">Concert</Link>
        <Link to="/artistes">Artistes</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </footer>
  )
}
