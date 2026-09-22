import { useEffect, useRef } from 'react'
import './HeroVisual.css'

/**
 * Hero 背景：单色（黑 / 白 / 极淡冷灰）的活体材质。
 * 只做三件事——缓慢漂移的体积雾、几乎不可见的浮尘、暗角。
 * 不用彩色，交给 CSS 层的网格 / 扫描线 / 中心辉光去叠加。
 */
function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let t = 0

    // 只留一条极淡的冷白雾带 + 一条更淡的暖灰，保证大黑场的呼吸感
    const bands = [
      { y: 0.36, amp: 78, speed: 0.00013, width: 320, alpha: 0.055, hue: '226,238,255' },
      { y: 0.68, amp: 104, speed: -0.00009, width: 380, alpha: 0.032, hue: '210,218,230' },
    ]

    let dust = []

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(130, Math.max(40, (w * h) / 19000)))
      dust = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + 0.22,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(Math.random() * 0.09 + 0.012),
        a: Math.random() * 0.3 + 0.04,
      }))
    }

    const drawBands = () => {
      bands.forEach((b, i) => {
        const cy = h * b.y
        const grad = ctx.createLinearGradient(0, cy - b.width / 2, 0, cy + b.width / 2)
        grad.addColorStop(0, `rgba(${b.hue},0)`)
        grad.addColorStop(0.5, `rgba(${b.hue},${b.alpha})`)
        grad.addColorStop(1, `rgba(${b.hue},0)`)

        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = grad
        ctx.beginPath()
        const shift = t * b.speed * 1000
        const seg = 14
        ctx.moveTo(-40, cy)
        for (let s = 0; s <= seg; s++) {
          const p = s / seg
          const x = -40 + (w + 80) * p
          const y =
            cy +
            Math.sin(p * Math.PI * 2 + shift + i * 1.7) * b.amp +
            Math.sin(p * Math.PI * 5.1 - shift * 0.6) * (b.amp * 0.22)
          ctx.lineTo(x, y)
        }
        for (let s = seg; s >= 0; s--) {
          const p = s / seg
          const x = -40 + (w + 80) * p
          const y =
            cy +
            Math.sin(p * Math.PI * 2 + shift + i * 1.7) * b.amp +
            Math.sin(p * Math.PI * 5.1 - shift * 0.6) * (b.amp * 0.22)
          ctx.lineTo(x, y + b.width * (0.35 + 0.25 * Math.sin(p * 3 + shift)))
        }
        ctx.closePath()
        ctx.filter = 'blur(40px)'
        ctx.fill()
        ctx.filter = 'none'
        ctx.restore()
      })
    }

    const drawDust = () => {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      dust.forEach((d) => {
        d.x += d.vx
        d.y += d.vy
        if (d.y < -6) {
          d.y = h + 6
          d.x = Math.random() * w
        }
        if (d.x < -6) d.x = w + 6
        if (d.x > w + 6) d.x = -6
        ctx.fillStyle = `rgba(232,240,255,${d.a})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)

      drawBands()
      drawDust()

      // 暗角：把四周压回纯黑
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.18, w * 0.5, h * 0.5, h * 1.02)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.9)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)
    }

    const loop = () => {
      t += 16
      draw()
      raf = requestAnimationFrame(loop)
    }

    build()
    if (reduced) {
      draw()
    } else {
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      build()
      if (reduced) draw()
    }
    const onVisibility = () => {
      if (reduced) return
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        raf = requestAnimationFrame(loop)
      }
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}

/**
 * Hero 视觉层（由下至上）：
 * canvas 体积雾 → video（可选，public/video/hero-loop.mp4）→ 细网格 → 扫描线 → 中心辉光 → 暗角
 */
export default function HeroVisual({ videoSrc, poster }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // 视频缺失或解码失败时静默降级到 canvas，不出现破图 / 控制台噪声
    v.play?.().catch(() => {})
  }, [])

  return (
    <div className="hero-visual" aria-hidden="true">
      <HeroCanvas />
      {videoSrc ? (
        <video
          ref={videoRef}
          className="hero-video"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : null}
      <div className="hero-grid" />
      <div className="hero-scan" />
      <div className="hero-glow" />
      <div className="hero-scrim" />
      <div className="hero-scrim-bottom" />
    </div>
  )
}
