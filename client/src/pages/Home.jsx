import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../components/shared'
import { useSite } from '../context/SiteContext'

export default function Home() {
  const { site } = useSite()
  const { event, pillars, welcome, about } = site

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <img src={event.flyerImage} alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <motion.p
            className="hero-kicker"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            {event.presenter} Presents
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.08}>
            Uniting Gospel Voices. Inspiring Worship. Celebrating Jesus.
          </motion.h1>
          <motion.p
            className="hero-lead"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.16}
          >
            Based in Canada and gathering in Saskatoon, Canadian Gospel Artistes brings
            gifted worship leaders together for All About Jesus — our annual music concert.
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
          >
            <a className="btn btn-primary" href="#vision">
              Our Vision
            </a>
            <Link className="btn btn-secondary" to="/concert">
              Concert
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section welcome" id="welcome">
        <div className="container welcome-inner">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
          >
            <h2>{welcome.title}</h2>
            <p className="lead">{welcome.body}</p>
          </motion.div>
        </div>
      </section>

      <section className="section vision-home" id="vision">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <h2>Vision</h2>
            <p className="section-lead">{about.vision}</p>
          </motion.div>

          <ul className="vision-list">
            {about.visionPoints.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pillars">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <h2>What We Do</h2>
          </motion.div>
          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <motion.article
                className="pillar-card"
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section concert-preview">
        <div className="container concert-preview-inner">
          <div>
            <p className="concert-eyebrow">{event.subtitle}</p>
            <h2>{event.title}</h2>
            <p className="section-lead">{event.tagline}</p>
            <p className="preview-meta">
              {event.dateLabel} · {event.timeShort} · {event.city}
            </p>
            <Link className="btn btn-primary" to="/concert">
              View Concert Details
            </Link>
          </div>
          <img src={event.flyerImage} alt="All About Jesus concert flyer" />
        </div>
      </section>
    </>
  )
}
