import { useEffect, useRef } from 'react'
import './HeroVisual.css'

/**
 * Hero 背景的「抽象光流」canvas。
 * 不依赖任何外部视频文件也能跑；video 存在时可叠加在它上面。
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

    const bands = [
      { y: 0.28, amp: 62, speed: 0.00016, width: 240, alpha: 0.5, hue: '210,240,255' },
      { y: 0.46, amp: 96, speed: -0.00011, width: 340, alpha: 0.34, hue: '180,225,255' },
      { y: 0.62, amp: 74, speed: 0.00021, width: 200, alpha: 0.42, hue: '255,255,255' },
      { y: 0.78, amp: 118, speed: -0.00008, width: 280, alpha: 0.22, hue: '200,215,255' },
    ]

    let dust = []

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(150, Math.max(50, (w * h) / 16000)))
      dust = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.25 + 0.25,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.11 + 0.015),
        a: Math.random() * 0.42 + 0.06,
      }))
    }

    const drawGrid = () => {
      ctx.save()
      ctx.strokeStyle = 'rgba(255,255,255,0.028)'
      ctx.lineWidth = 1
      const step = 88
      ctx.beginPath()
      for (let x = (w % step) / 2; x < w; x += step) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let y = (h % step) / 2; y < h; y += step) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()
      ctx.restore()
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
        ctx.moveTo(-40, cy)
        const seg = 14
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
        ctx.filter = 'blur(34px)'
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
        ctx.fillStyle = `rgba(226,238,255,${d.a})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // 深色基底
      const base = ctx.createLinearGradient(0, 0, w * 0.6, h)
      base.addColorStop(0, '#0b0c10')
      base.addColorStop(0.45, '#070709')
      base.addColorStop(1, '#040405')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, w, h)

      drawGrid()
      drawBands()

      // 顶部一束斜向冷光
      const beam = ctx.createLinearGradient(0, 0, w * 0.75, h * 0.9)
      beam.addColorStop(0, 'rgba(180,215,255,0.10)')
      beam.addColorStop(0.35, 'rgba(140,190,235,0.035)')
      beam.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = beam
      ctx.fillRect(0, 0, w, h)

      drawDust()

      // 暗角
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.2, w * 0.5, h * 0.5, h * 1.05)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.82)')
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
 * Hero 视觉层：video（可选，放在 public/video/hero-loop.mp4）+ canvas 光流 + 渐变遮罩
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
      <div className="hero-scrim" />
      <div className="hero-scrim-bottom" />
    </div>
  )
}
