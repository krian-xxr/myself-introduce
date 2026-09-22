import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { nav, site } from '../../data/content'
import { useActiveSection, useScrollY } from '../../hooks/useSiteEffects'
import './Nav.css'

const NAV_IDS = nav.map((n) => n.id)

export default function Nav() {
  const scrolled = useScrollY(40)
  const active = useActiveSection(NAV_IDS)
  const [open, setOpen] = useState(false)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner shell">
        {/* Logo */}
        <a className="nav__logo" href="#hero" aria-label={`${site.name} 首页`} onClick={() => setOpen(false)}>
          <span className="nav__mark">{site.initial}</span>
          <span className="nav__logo-text">
            <b>{site.name}</b>
            <i>{site.roleEn}</i>
          </span>
        </a>

        {/* 桌面导航 */}
        <nav className="nav__links" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav__link${active === item.id ? ' is-active' : ''}`}
              aria-current={active === item.id ? 'page' : undefined}
            >
              <span className="nav__link-cn">{item.label}</span>
              <span className="nav__link-en">{item.en}</span>
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <span className="nav__status" title={site.available}>
            <span className="nav__dot" />
            {site.available}
          </span>
          <a className="nav__cta" href="#contact">
            <span>联系我</span>
            <span className="nav__cta-en">Let&apos;s Talk</span>
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {/* 移动 / 窄屏抽屉 */}
      <div className="nav__drawer" hidden={!open}>
        {nav.map((item) => (
          <a key={item.id} href={item.href} onClick={() => setOpen(false)}>
            <span>{item.label}</span>
            <em>{item.en}</em>
          </a>
        ))}
      </div>
    </header>
  )
}
