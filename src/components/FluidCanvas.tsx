/**
 * FluidCanvas — mouse-reactive ink-blob / smoke effect.
 * Canvas 2D only. Reduced blob count and size for better performance.
 */

import { useRef, useEffect } from 'react'

const COLORS = [
  '#EC3B79',
  '#1E8ED0',
  '#FAB0EA',
  '#9B59B6',
  '#E4FC2D',
  '#F39C12',
  '#6DD5FA',
]

const MAX_BLOBS = 18

interface Blob {
  x: number; y: number
  vx: number; vy: number
  radius: number; maxRadius: number
  color: string; alpha: number
  born: number; life: number
}

export function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    const blobs: Blob[] = []
    let colorIdx = 0

    function spawnBlob(x: number, y: number, speed: number, sizeMult = 1) {
      if (blobs.length >= MAX_BLOBS) return          // cap blob count
      const angle  = Math.random() * Math.PI * 2
      const maxR   = (70 + Math.random() * 100) * sizeMult   // smaller than before
      const life   = 1600 + Math.random() * 1200
      blobs.push({
        x, y,
        vx: Math.cos(angle) * speed * 0.35,
        vy: Math.sin(angle) * speed * 0.35,
        radius: 0, maxRadius: maxR,
        color: COLORS[colorIdx % COLORS.length],
        alpha: 0,
        born: performance.now(), life,
      })
      colorIdx++
    }

    let lastX = -1, lastY = -1, lastTime = performance.now()
    let idleTimer = 0

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      const now = performance.now()
      const dt  = Math.max(1, now - lastTime)
      const dx  = x - lastX, dy = y - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const speed = dist / dt * 16

      if (lastX < 0 || dist > 10) {      // spawn every 10px (was 5px)
        spawnBlob(x, y, Math.max(1.5, speed))
        lastX = x; lastY = y; lastTime = now
      }
      idleTimer = 0
    }

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      onMouseMove({ clientX: t.clientX, clientY: t.clientY } as MouseEvent)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    let animId: number
    let lastDraw = 0
    const TARGET_MS = 1000 / 30   // 30 fps cap

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop)
      const elapsed = now - lastDraw
      if (elapsed < TARGET_MS) return   // skip frame
      lastDraw = now

      // Idle blob every 3 s when mouse is still
      idleTimer += elapsed
      if (idleTimer > 3000) {
        spawnBlob(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          0.4 + Math.random(), 0.6,
        )
        idleTimer = 0
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i]
        const t = Math.min(1, (now - b.born) / b.life)
        if (t >= 1) { blobs.splice(i, 1); continue }

        const ease = t < 0.25
          ? t / 0.25
          : 1 - ((t - 0.25) / 0.75) ** 1.4

        b.radius = b.maxRadius * Math.min(1, t / 0.25)
        b.alpha  = ease * 0.6       // slightly more transparent (was 0.72)
        b.x += b.vx; b.y += b.vy
        b.vx *= 0.984; b.vy *= 0.984

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius)
        grad.addColorStop(0,    hexWithAlpha(b.color, b.alpha))
        grad.addColorStop(0.5,  hexWithAlpha(b.color, b.alpha * 0.45))
        grad.addColorStop(1,    hexWithAlpha(b.color, 0))

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', opacity: 0.75 }}
    />
  )
}

function hexWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`
}
