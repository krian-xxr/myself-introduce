import { useCallback, useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import {
  HERO_VIDEO_POSTER,
  HERO_VIDEO_SRC,
  about,
  categories,
  hero,
} from '../../data/content'
import { usePointerParallax } from '../../hooks/useSiteEffects'
import HeroReel from './HeroReel'
import HeroVisual from './HeroVisual'
import './Hero.css'

/** 首屏卡片簇的数据源：四个作品板块各出一张 + 个人影像 */
const REEL_ITEMS = [
  ...categories.map((c) => ({
    id: `reel-${c.id}`,
    index: c.index,
    title: c.featured.title,
    category: c.featured.category,
    year: c.featured.year,
    image: c.featured.image,
    href: `#${c.id}`,
  })),
  {
    id: 'reel-about',
    index: '05',
    title: about.name,
    category: '个人影像 / Portrait',
    year: '2026',
    image: about.visual,
    href: '#about',
  },
]

/** 底部整屏计数的分段方块：当前屏点亮前 N 格 */
function Segments({ total, filled }) {
  return (
    <span className="hud-seg" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} data-on={i < filled ? 'true' : 'false'} />
      ))}
    </span>
  )
}

export default function Hero() {
  const p = usePointerParallax(0.6)
  const shiftX = (p.x - 0.5) * -14
  const shiftY = (p.y - 0.5) * -10

  const [scrolled, setScrolled] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1
      setScrolled(Math.min(1, window.scrollY / h))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const focusWork = useCallback((item) => {
    const el = document.querySelector(item?.href || '#aivisual')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // 进度条一共 14 格，随滚动逐格点亮
  const segTotal = 14
  const segFilled = Math.round(scrolled * segTotal)

  return (
    <section className="hero" id="hero">
      <HeroVisual videoSrc={HERO_VIDEO_SRC} poster={HERO_VIDEO_POSTER} />

      {/* 取景框下缘折角；上缘两枚折角在固定的页面头部（Nav）里，两处合成整屏的框 */}
      <span className="hero__corner hero__corner--bl" aria-hidden="true" />
      <span className="hero__corner hero__corner--br" aria-hidden="true" />

      {/* 左缘刻痕：逐格点亮，作为整屏位置指示 */}
      <div className="hero__gauge" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <i key={i} data-on={i / 18 < scrolled + 0.06 ? 'true' : 'false'} />
        ))}
      </div>

      <div
        className="hero__content shell"
        style={{ transform: `translate3d(${shiftX}px, ${shiftY}px, 0)` }}
      >
        {/* ---- 中央：取景器 + 3D 卡片簇 ---- */}
        <div className="hero__stage">
          <p className="hero__stage-label" aria-hidden="true">
            <span>Reel</span>
            <i />
            <span>Selected Work</span>
            <i />
            <span>2026</span>
          </p>

          <HeroReel items={REEL_ITEMS} onOpen={focusWork} />

          <div className="hero__title-wrap">
            <h1 className="hero__title">
              {hero.titleLines.map((line, i) => (
                <span className="hero__line" key={line}>
                  <span className="hero__line-inner" style={{ '--d': `${160 + i * 150}ms` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* ---- 底部：说明 + 索引数据 ---- */}
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

        {/* ---- 底栏：方块进度条 / 滚动提示 ---- */}
        <footer className="hero__bar hero__bar--bottom">
          <p className="hero__track">
            <Segments total={segTotal} filled={segFilled} />
            <span className="hero__track-text">Aspect 16:9 · Reel {REEL_ITEMS.length} Cuts</span>
          </p>

          <a className="hero__cta-scroll" href="#aivisual">
            <span className="hero__cta-scroll-label">Scroll to Index</span>
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </a>
        </footer>
      </div>

      {/* 底部跑马灯 */}
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
    </section>
  )
}
