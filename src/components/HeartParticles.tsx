/**
 * HeartParticles — canvas 2D hearts that burst from behind the tooth
 * whenever the mouse hovers over it (slide 1 only).
 *
 * z-index sits BELOW the tooth video so the hearts appear to shoot
 * out from behind the tooth and fly upward, fading as they go.
 */

import { useRef, useEffect } from 'react'

// ─── Brand palette ────────────────────────────────────────────────────────────
const COLORS = [
  '#EC3B79',  // hot pink
  '#ff2d6b',  // vivid red-pink
  '#FAB0EA',  // soft pink
  '#ff90c0',  // blush
  '#ffffff',  // white
  '#ff5fa3',  // medium pink
]

interface Heart {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  rotation: number
  rotSpeed: number
  born: number
  life: number
}

interface HeartParticlesProps {
  active: boolean
}

/** Draw a heart shape centered at (cx, cy) with half-size r */
function drawHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(r, r)
  ctx.beginPath()
  // top-center dip
  ctx.moveTo(0, -0.5)
  // left bump
  ctx.bezierCurveTo(0, -1, -1, -1, -1, -0.15)
  // left sweep down to bottom tip
  ctx.bezierCurveTo(-1, 0.55, 0, 1.05, 0, 1.5)
  // right sweep up
  ctx.bezierCurveTo(0, 1.05, 1, 0.55, 1, -0.15)
  // right bump back to top
  ctx.bezierCurveTo(1, -1, 0, -1, 0, -0.5)
  ctx.closePath()
  ctx.restore()
}

export function HeartParticles({ active }: HeartParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Resize ────────────────────────────────────────────────────────────
    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // ── Particle pool ──────────────────────────────────────────────────────
    const hearts: Heart[] = []

    function spawn(x: number, y: number) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9
      const speed = 3 + Math.random() * 7
      hearts.push({
        x: x + (Math.random() - 0.5) * 50,
        y: y + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 7 + Math.random() * 18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        rotation: (Math.random() - 0.5) * 1.0,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        born: performance.now(),
        life: 900 + Math.random() * 700,
      })
    }

    // ── Mouse — only spawn when over the tooth ellipse ────────────────────
    let lastSpawn = 0
    const onMouseMove = (e: MouseEvent) => {
      // Tooth is now right-aligned: center sits ~75% across the screen
      const cx = window.innerWidth  * 0.74
      const cy = window.innerHeight * 0.50
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // Ellipse that approximates the tooth's bounding box in the video
      const rx = window.innerWidth  * 0.22
      const ry = window.innerHeight * 0.38
      const inside = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) < 1

      if (!inside) return

      const now = performance.now()
      if (now - lastSpawn < 90) return   // ≈ one heart per 90 ms
      lastSpawn = now

      // Burst 1-3 hearts per tick for energy
      const burst = Math.random() < 0.35 ? 2 : 1
      for (let i = 0; i < burst; i++) spawn(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)

    // ── Render loop ────────────────────────────────────────────────────────
    let animId: number

    ;(function loop() {
      animId = requestAnimationFrame(loop)
      const now = performance.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i]
        const t = Math.min(1, (now - h.born) / h.life)
        if (t >= 1) { hearts.splice(i, 1); continue }

        // Ease: pop in fast, fade out with slight acceleration at the end
        h.alpha = t < 0.15 ? t / 0.15 : 1 - ((t - 0.15) / 0.85) ** 1.3

        // Physics
        h.vy  += 0.06          // gentle gravity
        h.vx  *= 0.985
        h.vy  *= 0.985
        h.x   += h.vx
        h.y   += h.vy
        h.rotation += h.rotSpeed

        // Draw
        ctx.save()
        ctx.globalAlpha = Math.max(0, h.alpha)
        ctx.translate(h.x, h.y)
        ctx.rotate(h.rotation)

        // Glow for depth
        ctx.shadowColor = h.color
        ctx.shadowBlur  = h.size * 1.5

        drawHeart(ctx, 0, 0, h.size)
        ctx.fillStyle = h.color
        ctx.fill()

        ctx.restore()
      }
    })()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', setSize)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', zIndex: 4 }}
    />
  )
}
