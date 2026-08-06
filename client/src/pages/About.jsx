import { motion } from 'framer-motion'
import { fadeUp, PageHero } from '../components/shared'
import { useSite } from '../context/SiteContext'

export default function About() {
  const { site } = useSite()
  const { about, event, coreValues } = site

  return (
    <>
      <PageHero title="About Us" subtitle={about.headline} />

      <section className="section about">
        <div className="container about-grid">
          <motion.div
            className="about-copy"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="lead">{about.intro}</p>
            <p>{about.body}</p>
          </motion.div>
          <motion.div
            className="about-media"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img src={event.flyerImage} alt="Canadian Gospel Artistes concert flyer" />
          </motion.div>
        </div>
      </section>

      <section className="section mission">
        <div className="container mission-grid">
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h3>Mission</h3>
            <p>{about.mission}</p>
          </motion.article>
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0.1}
          >
            <h3>Vision</h3>
            <p>{about.vision}</p>
            <ul className="vision-list compact">
              {about.visionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.article>
        </div>
      </section>

      <section className="section core-values">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <h2>Core Values</h2>
            <p className="section-lead">
              These values guide how we serve, create, and worship together as Canadian Gospel Artistes.
            </p>
          </motion.div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <motion.article
                className="value-card"
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
