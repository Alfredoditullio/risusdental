/**
 * LipsParticles — labios.png disparan desde detrás de la luna al hacer hover.
 * Canvas 2D, misma arquitectura que HeartParticles / ToothParticles.
 */

import { useRef, useEffect } from 'react'

interface Props {
  active: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  rotation: number
  rotSpeed: number
  life: number
  maxLife: number
}

export function LipsParticles({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef    = useRef<HTMLImageElement | null>(null)
  const imgReady  = useRef(false)
  const particles = useRef<Particle[]>([])
  const rafRef    = useRef<number>(0)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const spawnTimer = useRef(0)

  // Pre-load lips image
  useEffect(() => {
    const img = new Image()
    img.src = '/labios.webp'
    img.onload = () => { imgReady.current = true }
    imgRef.current = img
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Moon is centered — detect ellipse around it (luna ~64vw diameter)
    const isOverMoon = (mx: number, my: number) => {
      const cx = window.innerWidth  * 0.5
      const cy = window.innerHeight * 0.5
      const rx = Math.min(window.innerWidth  * 0.32, 420)
      const ry = Math.min(window.innerHeight * 0.48, 420)
      const dx = (mx - cx) / rx
      const dy = (my - cy) / ry
      return dx * dx + dy * dy <= 1
    }

    const spawnBurst = () => {
      const cx = window.innerWidth  * 0.5
      const cy = window.innerHeight * 0.5
      const count = 1 + Math.floor(Math.random() * 2)
      for (let k = 0; k < count; k++) {
        // Spawn from random edge of the moon circle
        const angle = Math.random() * Math.PI * 2
        const rx = Math.min(window.innerWidth  * 0.28, 380)
        const ry = Math.min(window.innerHeight * 0.38, 380)
        const sx = cx + Math.cos(angle) * rx * (0.7 + Math.random() * 0.5)
        const sy = cy + Math.sin(angle) * ry * (0.7 + Math.random() * 0.5)

        // Shoot generally outward + upward
        const speed = 2.5 + Math.random() * 4.5
        const spread = (Math.random() - 0.5) * Math.PI * 0.85
        const outAngle = angle + spread - Math.PI * 0.25  // bias upward
        const maxLife = 55 + Math.floor(Math.random() * 45)
        particles.current.push({
          x: sx,
          y: sy,
          vx: Math.cos(outAngle) * speed,
          vy: Math.sin(outAngle) * speed - 1.5,  // extra upward kick
          size: 28 + Math.random() * 42,
          alpha: 0.85 + Math.random() * 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.12,
          life: 0,
          maxLife,
        })
      }
    }

    if (!active) return   // don't even start the RAF if not active

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn on hover
      spawnTimer.current++
      if (isOverMoon(mouseRef.current.x, mouseRef.current.y) && spawnTimer.current >= 7) {
        spawnBurst()
        spawnTimer.current = 0
      }

      // Update & draw
      particles.current = particles.current.filter(p => p.life < p.maxLife)
      for (const p of particles.current) {
        p.x  += p.vx
        p.y  += p.vy
        p.vy += 0.14          // gravity
        p.vx *= 0.985         // drag
        p.rotation += p.rotSpeed
        p.life++

        const progress = p.life / p.maxLife
        const alpha = p.alpha * (progress < 0.15
          ? progress / 0.15
          : 1 - (progress - 0.15) / 0.85)

        if (!imgReady.current || !imgRef.current) continue

        ctx.save()
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.drawImage(imgRef.current, -p.size * 0.8, -p.size * 0.5, p.size * 1.6, p.size)
        ctx.restore()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 4 }}
    />
  )
}
