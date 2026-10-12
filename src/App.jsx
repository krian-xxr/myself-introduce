import { useEffect } from 'react'
import Nav from './components/layout/Nav'
import About from './components/sections/About'
import Category from './components/sections/Category'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import { categories } from './data/content'
import { useReveal } from './hooks/useSiteEffects'

export default function App() {
  useReveal()

  // 开发便利：?y=2200 可直接定位到某一屏，方便截图 / 走查
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const y = Number(new URLSearchParams(window.location.search).get('y') || 0)
    if (!y) return

    const jump = () => {
      if (Math.abs(window.scrollY - y) > 2) window.scrollTo({ top: y, behavior: 'instant' })
    }
    jump()
    const timer = setInterval(jump, 120)
    const stop = setTimeout(() => clearInterval(timer), 2500)
    return () => {
      clearInterval(timer)
      clearTimeout(stop)
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        {categories.map((c) => (
          <Category key={c.id} data={c} />
        ))}
        <Contact />
      </main>
    </>
  )
}

