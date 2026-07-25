import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Nav({ ticketUrl }) {
  const [menuOpen, setMenuOpen] = useState(false)

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
      <div className="nav-shell">
        <motion.header
          className="nav"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#top" className="brand" aria-label="Canadian Gospel Artistes home" onClick={closeMenu}>
            <img
              className="brand-mark"
              src="/images/cga-logo.png"
              alt="Canadian Gospel Artistes logo"
              width="40"
              height="40"
            />
            <span className="brand-text">
              <strong>Canadian Gospel Artistes</strong>
              <span>Official</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#concert">Concert</a>
            <a href="#artists">Artistes</a>
            <a href="#tickets">Tickets</a>
          </nav>

          <div className="nav-actions">
            <a
              className="nav-cta"
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Free Tickets
            </a>
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
        </motion.header>
      </div>

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
        <a href="#concert" onClick={closeMenu}>Concert</a>
        <a href="#artists" onClick={closeMenu}>Artistes</a>
        <a href="#tickets" onClick={closeMenu}>Tickets</a>
        <a
          className="nav-cta mobile-nav-cta"
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Free Tickets
        </a>
      </nav>
    </>
  )
}

function Hero({ event }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 120])
  const scale = useTransform(scrollY, [0, 500], [1.02, 1.12])

  return (
    <section className="hero" id="top" aria-label="Featured concert">
      <div className="hero-media">
        <motion.img
          src={event.flyerImage}
          alt="All About Jesus annual music concert flyer featuring Canadian Gospel Artistes"
          style={{ y, scale }}
        />
      </div>
      <div className="hero-content">
        <motion.h1
          className="hero-brand"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.05}
        >
          Canadian Gospel Artistes
        </motion.h1>
        <motion.p
          className="hero-headline"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.18}
        >
          {event.title}
        </motion.p>
        <motion.p
          className="hero-support"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
        >
          One night. One city. Gospel voices from across Canada — live in Saskatoon.
        </motion.p>
        <motion.div
          className="hero-actions"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.42}
        >
          <a className="btn btn-primary" href="#concert">
            Concert Details
          </a>
          <a className="btn btn-glass" href="#artists">
            Meet the Artistes
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Concert({ event }) {
  return (
    <section className="section concert" id="concert">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p className="eyebrow">Coming Up</p>
          <h2 className="section-title">{event.subtitle}</h2>
          <p className="section-copy">{event.tagline}</p>
        </motion.div>

        <motion.div
          className="concert-panel"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="concert-visual">
            <img
              src={event.flyerImage}
              alt="All About Jesus concert poster"
            />
          </div>
          <div className="concert-meta">
            <div className="meta-block">
              <h3>Date</h3>
              <p>{event.dateLabel}</p>
            </div>
            <div className="meta-block">
              <h3>Time</h3>
              <span className="time-capsule">{event.timeShort}</span>
            </div>
            <div className="meta-block">
              <h3>Location</h3>
              <p className="address">{event.addressFull}</p>
            </div>
            <a
              className="btn btn-primary"
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Save Your Spot
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Artists({ artists }) {
  return (
    <section className="section" id="artists">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p className="eyebrow">The Roster</p>
          <h2 className="section-title">Gospel Artistes Across Canada</h2>
          <p className="section-copy">
            A nationwide lineup stepping onto one stage for All About Jesus.
          </p>
        </motion.div>

        <div className="artists-grid">
          {artists.map((artist, index) => (
            <motion.article
              className="artist-row"
              key={`${artist.name}-${artist.province}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.03, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="artist-index">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="artist-name">{artist.name}</h3>
              <span className="province-pill">{artist.province}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Tickets({ ticketUrl }) {
  return (
    <section className="section join" id="tickets">
      <div className="container">
        <motion.div
          className="join-shell"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Free Entry</p>
            <h2 className="section-title">Get Your Free Tickets</h2>
            <p className="section-copy">
              Reserve your seat on Eventbrite — free tickets for All About Jesus in Saskatoon.
            </p>
          </div>

          <div className="join-form">
            <a
              className="btn btn-primary"
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Save Your Spot
            </a>
            <p className="form-status">Opens Eventbrite in a new tab. No cost to claim your ticket.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          <strong>Canadian Gospel Artistes</strong> — presenting gospel excellence across Canada.
        </p>
        <p>© 2026 Canadian Gospel Artistes</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [event, setEvent] = useState(null)
  const [artists, setArtists] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const [eventRes, artistsRes] = await Promise.all([
          fetch('/api/event'),
          fetch('/api/artists'),
        ])

        if (!eventRes.ok || !artistsRes.ok) {
          throw new Error('Unable to load concert data.')
        }

        const eventData = await eventRes.json()
        const artistsData = await artistsRes.json()

        if (!active) return
        setEvent(eventData)
        setArtists(artistsData.artists || [])
      } catch (err) {
        if (!active) return
        setError(err.message || 'Failed to load.')
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  if (error) {
    return (
      <div className="error-screen">
        <div>
          <h1>Canadian Gospel Artistes</h1>
          <p>{error}</p>
          <p>Start the Node server, then refresh.</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="loading-screen">
        <div>
          <div className="spinner" aria-hidden="true" />
          <p>Loading Canadian Gospel Artistes…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="site">
      <Nav ticketUrl={event.ticketUrl} />
      <main>
        <Hero event={event} />
        <Concert event={event} />
        <Artists artists={artists} />
        <Tickets ticketUrl={event.ticketUrl} />
      </main>
      <Footer />
    </div>
  )
}
