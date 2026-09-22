import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 滚动进场：给所有 [data-reveal] 元素在进入视口时加 .is-in
 * 只观察一次（unobserve），避免来回闪。
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!nodes.length) return

    if (prefersReduced()) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

/** 页面是否已滚过阈值（用于导航栏状态） */
export function useScrollY(threshold = 24) {
  // 初值直接从当前滚动位置推导，避免挂载后再同步 setState
  const [passed, setPassed] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold,
  )

  useEffect(() => {
    const onScroll = () => setPassed(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return passed
}

/** 当前处于视口中的分节 id */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5] },
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** 数字滚动：进入视口后从 0 递增到 target */
export function useCountUp(target, { duration = 1400, start = false } = {}) {
  // 减少动效时直接给终值，避免挂载后再 setState
  const [value, setValue] = useState(() => (start || prefersReduced() ? target : 0))
  const rafRef = useRef(0)

  useEffect(() => {
    if (!start) return
    if (prefersReduced()) {
      return
    }

    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setValue(Math.round(target * eased))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, start])

  return value
}

/** 元素是否已进入过视口（用于触发计数动画） */
export function useInViewOnce(options = {}) {
  const ref = useRef(null)
  // 环境不支持 IntersectionObserver 时直接视为可见
  const [inView, setInView] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined',
  )
  // 把 options 固化，避免每次渲染改引用导致 effect 反复重建
  const optionsRef = useRef(options)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3, ...optionsRef.current },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, inView]
}

/** 鼠标跟随的轻微视差（返回 0~1 归一化坐标） */
export function usePointerParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (prefersReduced()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setPos({
          x: 0.5 + ((e.clientX / window.innerWidth - 0.5) * strength) / 1,
          y: 0.5 + ((e.clientY / window.innerHeight - 0.5) * strength) / 1,
        })
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return pos
}
