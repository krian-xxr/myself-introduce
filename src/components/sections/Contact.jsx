import { ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact, nav, site } from '../../data/content'
import './Contact.css'

const ICONS = { Mail, Phone, MessageCircle, MapPin }

export default function Contact() {
  const toTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="contact" id="contact">
      <span className="contact__glow" aria-hidden="true" />
      <span className="contact__wordmark" aria-hidden="true">
        {site.name}
      </span>

      <div className="contact__inner shell">
        <header className="contact__head">
          <span className="eyebrow">{contact.eyebrow}</span>
          <span className="contact__kicker">{contact.kicker}</span>
        </header>

        <div className="contact__center">
          <h2 className="contact__big">
            {contact.bigLines.map((l) => (
              <span key={l} data-reveal>
                {l}
              </span>
            ))}
            <span className="contact__big-accent" data-reveal style={{ '--reveal-delay': '120ms' }}>
              {contact.bigLinesAccent}
            </span>
          </h2>

          <p className="contact__desc" data-reveal style={{ '--reveal-delay': '180ms' }}>
            {contact.desc}
          </p>

          <a className="contact__mail" href={`mailto:${site.email}`} data-reveal style={{ '--reveal-delay': '220ms' }}>
            <span className="contact__mail-text">{site.email}</span>
            <span className="contact__mail-icon">
              <ArrowUpRight size={22} strokeWidth={1.6} />
            </span>
          </a>
        </div>

        <ul className="contact__methods">
          {contact.methods.map((m, i) => {
            const Icon = ICONS[m.icon]
            const content = (
              <>
                <span className="contact__method-icon">
                  <Icon size={15} strokeWidth={1.7} />
                </span>
                <span className="contact__method-body">
                  <em>{m.label}</em>
                  <b>{m.value}</b>
                </span>
              </>
            )
            return (
              <li key={m.label} data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                {m.href ? (
                  <a className="contact__method" href={m.href}>
                    {content}
                  </a>
                ) : (
                  <span className="contact__method is-static">{content}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <footer className="contact__footer">
        <div className="shell contact__footer-inner">
          <span className="contact__copy">{contact.footnote}</span>

          <nav className="contact__socials" aria-label="社交账号">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                {s.label}
                <ArrowUpRight size={12} strokeWidth={1.8} />
              </a>
            ))}
          </nav>

          <div className="contact__footer-right">
            <ul className="contact__mini-nav">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
            <button type="button" className="contact__totop" onClick={toTop}>
              回到顶部
              <ArrowUp size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </footer>
    </section>
  )
}
