/**
 * FluidCanvas — mouse-reactive ink-blob sutil.
 * - 'source-over' en lugar de 'lighter' → sin flash blanco
 * - Deshabilitado en móvil/touch para ahorrar GPU
 * - MAX_BLOBS reducido, alpha bajo, sin idle blobs
 */

import { useRef, useEffect } from 'react'

const COLORS = [
  '#EC3B79',
  '#1E8ED0',
  '#9B59B6',
  '#6DD5FA',
  '#FAB0EA',
]

const MAX_BLOBS   = 8
const SPAWN_DIST  = 18   // px entre spawns
const TARGET_FPS  = 24
const TARGET_MS   = 1000 / TARGET_FPS
const MAX_ALPHA   = 0.22  // nunca más del 22% — no tapa el texto

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
    // Deshabilitar en dispositivos touch (móvil/tablet)
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchOnly) return

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

    function spawnBlob(x: number, y: number, speed: number) {
      if (blobs.length >= MAX_BLOBS) return
      const angle = Math.random() * Math.PI * 2
      const maxR  = 50 + Math.random() * 70   // 50–120px (era 70–170px)
      const life  = 1400 + Math.random() * 900
      blobs.push({
        x, y,
        vx: Math.cos(angle) * speed * 0.3,
        vy: Math.sin(angle) * speed * 0.3,
        radius: 0, maxRadius: maxR,
        color: COLORS[colorIdx % COLORS.length],
        alpha: 0,
        born: performance.now(), life,
      })
      colorIdx++
    }

    let lastX = -1, lastY = -1, lastTime = performance.now()

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      const now = performance.now()
      const dt  = Math.max(1, now - lastTime)
      const dx  = x - lastX, dy = y - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const speed = dist / dt * 12

      if (lastX < 0 || dist > SPAWN_DIST) {
        spawnBlob(x, y, Math.max(1, speed))
        lastX = x; lastY = y; lastTime = now
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    let animId: number
    let lastDraw = 0
    let paused = false
    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop)
      if (paused || now - lastDraw < TARGET_MS) return
      lastDraw = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // 'source-over' → los blobs se superponen sin sumarse al blanco
      ctx.globalCompositeOperation = 'source-over'

      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i]
        const t = Math.min(1, (now - b.born) / b.life)
        if (t >= 1) { blobs.splice(i, 1); continue }

        const ease = t < 0.2
          ? t / 0.2
          : 1 - ((t - 0.2) / 0.8) ** 1.2

        b.radius = b.maxRadius * Math.min(1, t / 0.2)
        b.alpha  = ease * MAX_ALPHA
        b.x += b.vx; b.y += b.vy
        b.vx *= 0.982; b.vy *= 0.982

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius)
        grad.addColorStop(0,   hexWithAlpha(b.color, b.alpha))
        grad.addColorStop(0.5, hexWithAlpha(b.color, b.alpha * 0.35))
        grad.addColorStop(1,   hexWithAlpha(b.color, 0))

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', setSize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', opacity: 0.6 }}
    />
  )
}

function hexWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`
}
