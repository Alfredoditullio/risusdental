/**
 * ToothParticles — rainbow 🦷 images burst from behind Rodrigo's photo
 * whenever the mouse hovers over the circular frame (slide 2 only).
 *
 * Uses ctx.drawImage() with the pre-processed transparent PNG.
 * Sits at z-[4], below the photo at z-[5].
 */

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number   // draw size in px
  alpha: number
  rotation: number
  rotSpeed: number
  born: number
  life: number
}

interface ToothParticlesProps {
  active: boolean
}

export function ToothParticles({ active }: ToothParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Size ──────────────────────────────────────────────────────────────
    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // ── Load the rainbow tooth image once ─────────────────────────────────
    const img = new Image()
    img.src = '/diente_gay.webp'

    // ── Particle pool ──────────────────────────────────────────────────────
    const particles: Particle[] = []

    function spawn(x: number, y: number) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1
      const speed = 3 + Math.random() * 7
      particles.push({
        x: x + (Math.random() - 0.5) * 55,
        y: y + (Math.random() - 0.5) * 45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 28 + Math.random() * 38,   // miniature: 28-66 px
        alpha: 1,
        rotation: (Math.random() - 0.5) * 0.6,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        born: performance.now(),
        life: 1100 + Math.random() * 900,
      })
    }

    // ── Mouse detection — ellipse over Rodrigo's photo (left side) ────────
    let lastSpawn = 0
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth  * 0.26
      const cy = window.innerHeight * 0.50
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const rx = window.innerWidth  * 0.20
      const ry = window.innerHeight * 0.36
      if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) >= 1) return

      const now = performance.now()
      if (now - lastSpawn < 95) return
      lastSpawn = now

      const burst = Math.random() < 0.3 ? 2 : 1
      for (let i = 0; i < burst; i++) spawn(e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Render loop ────────────────────────────────────────────────────────
    let animId: number

    ;(function loop() {
      animId = requestAnimationFrame(loop)
      const now = performance.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!img.complete) return   // wait for image to load

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const t = Math.min(1, (now - p.born) / p.life)
        if (t >= 1) { particles.splice(i, 1); continue }

        // Pop in fast, fade out smoothly
        p.alpha = t < 0.1 ? t / 0.1 : 1 - ((t - 0.1) / 0.9) ** 1.3

        // Physics
        p.vy += 0.06    // soft gravity
        p.vx *= 0.990
        p.vy *= 0.990
        p.x  += p.vx
        p.y  += p.vy
        p.rotation += p.rotSpeed

        // Draw the rainbow tooth image
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        // Draw centered on the particle position
        ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size)
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
