import { motion } from 'framer-motion'
import { fadeUp, PageHero } from '../components/shared'
import { useSite } from '../context/SiteContext'

export default function Concert() {
  const { site } = useSite()
  const { event } = site

  return (
    <>
      <PageHero title="Concert" subtitle={event.tagline} />

      <section className="section concert">
        <div className="container">
          <motion.div
            className="concert-layout"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="concert-poster">
              <img src={event.flyerImage} alt="All About Jesus annual music concert poster" />
            </div>
            <div className="concert-details">
              <p className="concert-eyebrow">{event.subtitle}</p>
              <h3>{event.title}</h3>
              <dl className="detail-list">
                <div>
                  <dt>Date</dt>
                  <dd>{event.dateLabel}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{event.time}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{event.addressFull}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
