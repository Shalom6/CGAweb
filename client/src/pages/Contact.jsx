import { motion } from 'framer-motion'
import { fadeUp, InstagramIcon, PageHero } from '../components/shared'
import { useSite } from '../context/SiteContext'

export default function Contact() {
  const { site } = useSite()
  const { contact, social } = site

  return (
    <>
      <PageHero title="Contact Us" subtitle={contact.note} />

      <section className="section contact">
        <div className="container">
          <div className="contact-grid contact-grid-two">
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3>Email</h3>
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </motion.article>
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.1}
            >
              <h3>Social</h3>
              <p>
                <a
                  className="contact-social"
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  @canadiangospelartistes
                </a>
              </p>
            </motion.article>
          </div>
        </div>
      </section>
    </>
  )
}
