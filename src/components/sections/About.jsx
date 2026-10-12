import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { about, site } from '../../data/content'
import { useCountUp, useInViewOnce } from '../../hooks/useSiteEffects'
import Capabilities from './Capabilities'
import './About.css'

const CONTACT_ICONS = { Mail, Phone, MessageCircle, MapPin }

const CONTACT_ITEMS = [
  { icon: 'Mail', label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: 'Phone', label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { icon: 'MessageCircle', label: 'WeChat', value: site.wechat, href: null },
  { icon: 'MapPin', label: 'Based in', value: site.location, href: null },
]

function Stat({ item, index }) {
  const [ref, inView] = useInViewOnce()
  const value = useCountUp(item.value, { start: inView, duration: 1500 })

  return (
    <div className="about-stat" ref={ref} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
      <b className="about-stat__value">
        {value}
        <i>{item.suffix}</i>
      </b>
      <span className="about-stat__label">{item.label}</span>
      <span className="about-stat__en">{item.en}</span>
    </div>
  )
}

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="section-head">
          <div className="section-head__left">
            <span className="eyebrow" data-reveal>
              About Me
            </span>
            <h2 className="section-title" data-reveal style={{ '--reveal-delay': '60ms' }}>
              个人经历
              <br />
              <span className="about__title-sub">八年，把审美变成可交付的方法</span>
            </h2>
          </div>
          <span className="about__coords" data-reveal style={{ '--reveal-delay': '120ms' }}>
            31.2304° N / 121.4737° E
          </span>
        </div>

        <div className="about__grid">
          {/* 左：人物图 */}
          <figure className="about__portrait" data-reveal>
            <img src={about.portrait} alt={`${site.nameCn} 个人照`} loading="lazy" decoding="async" />
            <figcaption>
              <span className="about__portrait-name">{about.name}</span>
              <span className="about__portrait-role">{about.title}</span>
            </figcaption>
            <span className="about__portrait-index" aria-hidden="true">
              2017
              <i />
              2026
            </span>
          </figure>

          {/* 右：介绍 + 联系方式 + 数据 */}
          <div className="about__main">
            <div className="about__intro" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <h3 className="about__name">{about.name}</h3>
              <p className="about__role">{about.title}</p>
              {about.paragraphs.map((t, i) => (
                <p className="about__para" key={i}>
                  {t}
                </p>
              ))}
            </div>

            {/* 联系方式 */}
            <div className="about__contact" data-reveal style={{ '--reveal-delay': '120ms' }}>
              <span className="about__block-label">联系方式 / Contact</span>
              <ul className="about__contact-list">
                {CONTACT_ITEMS.map((c) => {
                  const Icon = CONTACT_ICONS[c.icon]
                  const inner = (
                    <>
                      <span className="about__contact-icon">
                        <Icon size={15} strokeWidth={1.7} />
                      </span>
                      <span className="about__contact-body">
                        <em>{c.label}</em>
                        <b>{c.value}</b>
                      </span>
                      {c.href ? (
                        <ArrowUpRight className="about__contact-arrow" size={15} strokeWidth={1.7} />
                      ) : null}
                    </>
                  )
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a className="about__contact-item" href={c.href}>
                          {inner}
                        </a>
                      ) : (
                        <div className="about__contact-item is-static">{inner}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* 项目数据 */}
            <div className="about__stats">
              {about.stats.map((s, i) => (
                <Stat item={s} index={i} key={s.label} />
              ))}
            </div>
          </div>
        </div>

        {/* 经历时间轴 */}
        <div className="about__timeline">
          <span className="about__block-label" data-reveal>
            工作经历 / Experience
          </span>

          <ol className="about__timeline-list">
            {about.timeline.map((t, i) => (
              <li
                className="about__tl-item"
                key={t.period}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <span className="about__tl-period">{t.period}</span>
                <div className="about__tl-body">
                  <h4>{t.role}</h4>
                  <p className="about__tl-org">{t.org}</p>
                  <p className="about__tl-desc">{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 个人优势并进这里，作为经历板块的子块 */}
        <Capabilities />
      </div>

      <img className="about__visual" src={about.visual} alt="" aria-hidden="true" loading="lazy" />
    </section>
  )
}
