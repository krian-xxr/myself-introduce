import { Menu, Play, X } from 'lucide-react'
import { useState } from 'react'
import { nav, site } from '../../data/content'
import { useActiveSection, useScrollY } from '../../hooks/useSiteEffects'
import './Nav.css'

const NAV_IDS = nav.map((n) => n.id)

/**
 * 页面头部：单行 HUD 通栏。
 * 排版参考「Aspect Test 取景器」：等宽小字、两端细折角、元素之间大留白，
 * 没有底色也没有描边胶囊。上缘的两枚折角与 Hero 下缘的折角合成整屏取景框，
 * 所以 Hero 里不再重复画上缘折角。
 */
export default function Nav() {
  const scrolled = useScrollY(40)
  const active = useActiveSection(NAV_IDS)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <span className="nav__corner nav__corner--l" aria-hidden="true" />
      <span className="nav__corner nav__corner--r" aria-hidden="true" />

      <div className="nav__inner shell">
        {/* 左：品牌 */}
        <a className="nav__brand" href="#hero" aria-label={`${site.name} 首页`} onClick={close}>
          <b>{site.name}</b>
          <i>{site.roleEn}</i>
        </a>

        {/* 中：主导航（单行，中文 + 等宽小字英文） */}
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

        {/* 右：坐标 / 状态 / 联系 */}
        <div className="nav__right">
          <span className="nav__coords">
            {site.location} · {site.timezone}
          </span>
          <span className="nav__status" title={site.available}>
            <span className="nav__dot" />
            {site.available}
          </span>
          <a className="nav__cta" href="#contact">
            <Play className="nav__cta-glyph" size={11} strokeWidth={1.6} aria-hidden="true" />
            <span>Let&apos;s Talk</span>
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
          <a key={item.id} href={item.href} onClick={close}>
            <span>{item.label}</span>
            <em>{item.en}</em>
          </a>
        ))}
      </div>
    </header>
  )
}
