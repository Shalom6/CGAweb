import { motion } from 'framer-motion'
import { InstagramIcon, PageHero } from '../components/shared'
import { useSite } from '../context/SiteContext'

export default function Artistes() {
  const { site } = useSite()
  const { artists } = site

  return (
    <>
      <PageHero
        title="Artistes"
        subtitle="Gospel artistes from across Canada stepping onto one stage for All About Jesus."
      />

      <section className="section artists">
        <div className="container">
          <div className="artists-grid">
            {artists.map((artist, index) => (
              <motion.article
                className="artist-card"
                key={`${artist.name}-${artist.province}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.3) }}
              >
                <span className="artist-num">{String(index + 1).padStart(2, '0')}</span>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <p>{artist.province}</p>
                </div>
                {artist.instagram?.length ? (
                  <div className="artist-socials">
                    {artist.instagram.map((url) => (
                      <a
                        key={url}
                        className="social-btn"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${artist.name} on Instagram`}
                      >
                        <InstagramIcon />
                      </a>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
