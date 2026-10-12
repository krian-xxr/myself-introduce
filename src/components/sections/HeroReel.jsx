import { useCallback, useEffect, useRef, useState } from 'react'
import './HeroReel.css'

/**
 * Hero 中央的作品卡片簇：绕竖轴做 3D 旋转的环形卡片组。
 *
 * 交互：
 *  - 自动匀速旋转（悬停 / 拖拽 / 无焦点 / 离开视口 / 减少动效时暂停）
 *  - 鼠标拖拽：跟手旋转，松手带速度惯性并吸附到最近一张
 *  - 滚轮横滑 / 上下滚：只翻一张，页面滚动不受影响
 *  - 左右两侧的圆按钮：前进 / 后退一张
 *  - 悬停某张卡片时，下方读数切换成该卡片的项目信息
 */

const STEP = 60 // 每张卡片占的圆心角
const AUTOPLAY = 2.6 // 自动旋转速度（度 / 秒）
const DEG_PER_PX = 0.34 // 拖拽灵敏度（度 / 像素）
const DAMP = 0.94 // 惯性衰减
const STOP_SPEED = 2.6 // 低于该角速度就吸附对齐
const CARD_MAX = 6 // 最多显示 6 张，避免卡片过多挤成一片

export default function HeroReel({ items = [], onOpen }) {
  const deck = items.slice(0, CARD_MAX)
  const count = deck.length

  const deckRef = useRef(null)
  const cardsRef = useRef([])
  const stageRef = useRef(null)

  const angle = useRef(0)
  const vel = useRef(0)
  const drag = useRef(null)
  const paused = useRef(false)
  const visible = useRef(true)
  const hot = useRef(-1)
  const indexRef = useRef(0)

  const [index, setIndex] = useState(0)
  const [hoverIdx, setHoverIdx] = useState(-1)
  const [grabbing, setGrabbing] = useState(false)

  /* ---------- 渲染：把角度写进 DOM，避免每帧 setState ---------- */
  const render = useCallback(() => {
    const a = angle.current
    const el = deckRef.current
    if (el) {
      el.style.transform = `translateZ(-118px) rotateY(${a.toFixed(2)}deg)`
    }

    const list = cardsRef.current
    const deltas = []
    for (let i = 0; i < list.length; i += 1) {
      // 归一化到 (-180, 180]：0 表示正对镜头
      const delta = ((((i * STEP - a) % 360) + 540) % 360) - 180
      deltas.push(delta)
    }

    // 唯一一张「最正对镜头」的卡片
    let frontIdx = -1
    let best = Infinity
    deltas.forEach((delta, i) => {
      const abs = Math.abs(delta)
      if (abs < best) {
        best = abs
        frontIdx = i
      }
    })

    list.forEach((card, i) => {
      if (!card) return
      const abs = Math.abs(deltas[i])
      const depth = Math.max(0, 1 - abs / 150)
      const focus = Math.max(0, 1 - abs / 48)
      card.style.setProperty('--delta', deltas[i].toFixed(2))
      card.style.setProperty('--depth', depth.toFixed(3))
      card.style.setProperty('--focus', focus.toFixed(3))
      card.style.zIndex = String(Math.round(depth * 100) + 1)
      card.dataset.front = i === frontIdx ? 'true' : 'false'
    })
  }, [])

  const setIndexBoth = useCallback((n) => {
    const next = ((n % count) + count) % count
    if (next === indexRef.current) return
    indexRef.current = next
    setIndex(next)
  }, [count])

  const step = useCallback(
    (dir) => {
      if (!count) return
      const target = Math.round(angle.current / STEP) + dir
      vel.current = dir * 190
      setIndexBoth(target)
      render()
    },
    [count, render, setIndexBoth],
  )

  /* ---------- 主循环：自动旋转 / 惯性 / 吸附 ---------- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const dragging = drag.current && drag.current.active

      if (!dragging) {
        if (Math.abs(vel.current) > STOP_SPEED) {
          // 惯性滑行
          angle.current += vel.current * dt
          vel.current *= Math.pow(DAMP, dt * 60)
        } else {
          vel.current = 0
          angle.current += (reduced ? 0 : AUTOPLAY) * dt * (paused.current ? 0 : 1)
        }
      }

      render()

      // 用真实角度反推当前最正对镜头的那张
      if (!dragging && Math.abs(vel.current) <= STOP_SPEED) {
        setIndexBoth(Math.round(angle.current / STEP))
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [render, setIndexBoth])

  useEffect(() => {
    render()
  }, [render, count])

  /* ---------- 离开视口就停，省电也避免后台跑动画 ---------- */
  useEffect(() => {
    const el = stageRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        paused.current = !entry.isIntersecting || document.hidden
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    const onVis = () => {
      paused.current = document.hidden || !visible.current
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  /* ---------- 拖拽 ---------- */
  const onPointerDown = (e) => {
    if (e.button !== 0) return
    drag.current = {
      active: true,
      x: e.clientX,
      angle: angle.current,
      lastX: e.clientX,
      lastT: performance.now(),
      moved: 0,
    }
    vel.current = 0
    setGrabbing(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d?.active) return
    const now = performance.now()
    const dx = e.clientX - d.x
    d.moved = Math.max(d.moved, Math.abs(dx))
    angle.current = d.angle + dx * DEG_PER_PX

    const dt = Math.max((now - d.lastT) / 1000, 0.001)
    vel.current = ((e.clientX - d.lastX) / dt) * DEG_PER_PX
    d.lastX = e.clientX
    d.lastT = now

    setIndexBoth(Math.round(angle.current / STEP))
  }

  const endDrag = (e) => {
    const d = drag.current
    if (!d?.active) return
    d.active = false
    setGrabbing(false)
    e?.currentTarget?.releasePointerCapture?.(e.pointerId)

    // 位移很小视为点击。
    // 指针捕获会把 click 事件重定向到舞台这一层，卡片的 <a> 收不到，
    // 所以这里直接替它跳转，保证「点一下就去看作品」这条路径不会断。
    if (d.moved < 6) {
      vel.current = 0
      const item = deck[indexRef.current]
      if (item && onOpen) onOpen(item)
      return
    }

    // 惯性之后吸附：把目标角度算好，靠主循环的惯性滑过去
    const target = Math.round((angle.current + vel.current * 0.16) / STEP) * STEP
    vel.current = (target - angle.current) * 3.2
    if (Math.abs(vel.current) < 40) vel.current = 0
  }

  const onWheel = useCallback(
    (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 4) return
      // 只翻一张，并且不让页面跟着滚
      e.preventDefault()
      step(delta > 0 ? 1 : -1)
    },
    [step],
  )

  /**
   * 滚轮必须用非 passive 监听：React 的 onWheel 是 passive 的，
   * 在里面 preventDefault 无效，页面会连同卡片一起滚动。
   */
  const surfaceRef = useRef(null)
  useEffect(() => {
    const el = surfaceRef.current
    if (!el) return
    const handler = (e) => onWheel(e)
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [onWheel])

  /* ---------- 键盘 ---------- */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      step(-1)
    }
  }

  /* ---------- 悬停读数 ---------- */
  const label = hoverIdx >= 0 ? deck[hoverIdx] : deck[index]
  const activeIdx = hoverIdx >= 0 ? hoverIdx : index

  return (
    <div
      className="reel"
      ref={stageRef}
      data-grabbing={grabbing ? 'true' : 'false'}
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
        setHoverIdx(-1)
        hot.current = -1
      }}
    >
      {/* 取景器中心的十字 / 刻度 */}
      <span className="reel__cross reel__cross--l" aria-hidden="true" />
      <span className="reel__cross reel__cross--r" aria-hidden="true" />

      <button
        type="button"
        className="reel__nav reel__nav--prev"
        onClick={() => step(-1)}
        aria-label="上一件作品"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/*
        拖拽 / 滚轮 / 键盘全部挂在这一层。
        这里刻意不再放「盖在卡片之上的透明交互层」：那样卡片既收不到 hover（读数不会跟随），
        也收不到 click（指针捕获会把 click 重定向到交互层），点卡片跳转和悬停读数都会一起失效。
        卡片的事件会冒泡到舞台，所以拖拽照样跟手。
      */}
      <div
        className="reel__stage"
        ref={surfaceRef}
        tabIndex={0}
        role="group"
        aria-label="作品卡片簇：可拖拽旋转，或用左右方向键切换"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <div
          className="reel__deck"
          ref={deckRef}
          role="listbox"
          aria-label="精选作品"
          aria-activedescendant={deck[activeIdx] ? `reel-card-${deck[activeIdx].id}` : undefined}
        >
          {deck.map((item, i) => (
            <a
              className="reel__card"
              key={item.id}
              id={`reel-card-${item.id}`}
              ref={(n) => {
                cardsRef.current[i] = n
              }}
              href={item.href || '#work'}
              role="option"
              aria-selected={i === activeIdx}
              data-front="false"
              draggable="false"
              onMouseEnter={() => {
                hot.current = i
                setHoverIdx(i)
              }}
              onMouseLeave={() => {
                if (hot.current === i) hot.current = -1
              }}
              onClick={(e) => {
                const d = drag.current
                if (d && d.moved >= 6) {
                  e.preventDefault()
                  return
                }
                if (onOpen) onOpen(item)
              }}
            >
              <img src={item.image} alt={item.title} loading={i === 0 ? 'eager' : 'lazy'} />
              <span className="reel__card-meta" aria-hidden="true">
                <em>{item.index}</em>
                <i />
                <em>{item.year}</em>
              </span>
            </a>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="reel__nav reel__nav--next"
        onClick={() => step(1)}
        aria-label="下一件作品"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* 读数：当前 / 悬停项目的元信息 */}
      <div className="reel__readout" aria-live="polite">
        <p className="reel__readout-cat">{label?.category || ''}</p>
        <p className="reel__readout-title">{label?.title || ''}</p>
        <p className="reel__readout-idx">
          <span>{String(activeIdx + 1).padStart(2, '0')}</span>
          <i>/</i>
          <span>{String(count).padStart(2, '0')}</span>
        </p>
      </div>
    </div>
  )
}
