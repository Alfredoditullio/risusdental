import { useRef, useEffect } from 'react'

/**
 * Custom bubble cursor — replaces the default OS pointer with two concentric
 * translucent orbs: a small fast dot and a larger slow-following ring.
 */
export function BubbleCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let dotX  = -100, dotY  = -100   // start off-screen
    let ringX = -100, ringY = -100
    let targetX = -100, targetY = -100
    let visible = false

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        dotX = ringX = targetX
        dotY = ringY = targetY
        visible = true
        dotRef.current?.style.setProperty('opacity', '1')
        ringRef.current?.style.setProperty('opacity', '1')
      }
    }

    const onMouseLeave = () => {
      visible = false
      dotRef.current?.style.setProperty('opacity', '0')
      ringRef.current?.style.setProperty('opacity', '0')
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    let animId: number
    let lastDraw = 0
    const TARGET_MS = 1000 / 30   // 30fps — smooth enough for cursor lag

    ;(function loop(now: number) {
      animId = requestAnimationFrame(loop)

      if (document.hidden || now - lastDraw < TARGET_MS) return
      lastDraw = now

      // Dot follows mouse tightly
      dotX  += (targetX - dotX)  * 0.45
      dotY  += (targetY - dotY)  * 0.45

      // Ring lags behind with soft lerp
      ringX += (targetX - ringX) * 0.12
      ringY += (targetY - ringY) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
    })(0)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Small solid dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'white',
          opacity: 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Larger bubble ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.45)',
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
          boxShadow:
            'inset 0 1px 6px rgba(255,255,255,0.15), 0 0 18px rgba(236,59,121,0.18)',
          opacity: 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
