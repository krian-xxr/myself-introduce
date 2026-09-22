import { ArrowUpRight, Clapperboard, LayoutGrid, Palette, Sparkles } from 'lucide-react'
import { capabilities } from '../../data/content'
import './Capabilities.css'

const ICONS = { Palette, LayoutGrid, Sparkles, Clapperboard }

export default function Capabilities() {
  return (
    <section className="section caps" id="capability">
      <span className="caps__glow" aria-hidden="true" />

      <div className="shell">
        <div className="section-head">
          <div className="section-head__left">
            <span className="eyebrow" data-reveal>
              Capability
            </span>
            <h2 className="section-title" data-reveal style={{ '--reveal-delay': '60ms' }}>
              个人优势
              <br />
              <span className="caps__title-sub">我能在项目里提供的四种确定性</span>
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--reveal-delay': '120ms' }}>
            设计不是单点交付。从判断「该做什么」到保证「做出来一致」，这四块能力互相咬合，
            也是我与团队合作时最常被依赖的部分。
          </p>
        </div>

        <ul className="caps__grid">
          {capabilities.map((c, i) => {
            const Icon = ICONS[c.icon]
            return (
              <li
                className="card caps__card"
                key={c.id}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms`, '--i': i }}
              >
                <div className="caps__card-top">
                  <span className="caps__icon">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <span className="idx">{c.index}</span>
                </div>

                <h3 className="caps__card-title">{c.title}</h3>
                <p className="caps__card-en">{c.en}</p>
                <p className="caps__card-desc">{c.desc}</p>

                <div className="caps__tags">
                  {c.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <span className="caps__card-num" aria-hidden="true">
                  0{i + 1}
                </span>
              </li>
            )
          })}
        </ul>

        <div className="caps__strip" data-reveal>
          <p className="caps__strip-text">
            需要更细的能力清单、软件栈或合作方式说明？
          </p>
          <a className="ulink" href="#contact">
            索取完整能力说明
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  )
}
