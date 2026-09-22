import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { HERO_VIDEO_POSTER, HERO_VIDEO_SRC, hero, site } from '../../data/content'
import { usePointerParallax } from '../../hooks/useSiteEffects'
import HeroVisual from './HeroVisual'
import './Hero.css'

export default function Hero() {
  const p = usePointerParallax(0.6)
  const shiftX = (p.x - 0.5) * -14
  const shiftY = (p.y - 0.5) * -10

  return (
    <section className="hero" id="hero">
      <HeroVisual videoSrc={HERO_VIDEO_SRC} poster={HERO_VIDEO_POSTER} />

      <div
        className="hero__content shell"
        style={{ transform: `translate3d(${shiftX}px, ${shiftY}px, 0)` }}
      >
        <div className="hero__top">
          <span className="hero__badge">
            <i />
            {hero.status}
          </span>
          <span className="hero__top-right">
            {site.location} — {site.timezone}
          </span>
        </div>

        <div className="hero__title-wrap">
          <p className="hero__watermark" aria-hidden="true">
            {hero.titleLinesEn.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>

          <h1 className="hero__title">
            {hero.titleLines.map((line, i) => (
              <span className="hero__line" key={line}>
                <span className="hero__line-inner" style={{ '--d': `${120 + i * 130}ms` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="hero__bottom">
          <div className="hero__lead">
            <p className="hero__lead-text">{hero.lead}</p>

            <div className="hero__actions">
              <a className="btn btn--solid" href={hero.primaryCta.href}>
                <span>{hero.primaryCta.label}</span>
                <ArrowUpRight size={16} strokeWidth={1.8} />
              </a>
              <a className="btn btn--ghost" href={hero.secondaryCta.href}>
                <span>{hero.secondaryCta.label}</span>
                <ArrowDownRight size={16} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <dl className="hero__facts">
            {hero.facts.map((f) => (
              <div className="hero__fact" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 底部滚动跑马灯 */}
      <div className="hero__tape" aria-hidden="true">
        <div className="hero__tape-track">
          {[0, 1].map((dup) => (
            <div className="hero__tape-group" key={dup}>
              {hero.marquee.map((m) => (
                <span key={`${dup}-${m}`}>
                  {m}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a className="hero__scroll" href="#work" aria-label="向下滚动">
        <span className="hero__scroll-line">
          <i />
        </span>
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  )
}
