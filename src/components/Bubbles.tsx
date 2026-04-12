import { useMemo } from 'react'
import type { MousePosition } from '../hooks/useMouse'

interface BubblesProps {
  mouse: MousePosition
  accentColor: string
}

interface Bubble {
  id: number
  size: number
  x: number
  y: number
  parallaxFactor: number
  opacity: number
  blur: number
  delay: number
}

export function Bubbles({ mouse, accentColor }: BubblesProps) {
  const bubbles = useMemo<Bubble[]>(
    () => [
      { id: 1, size: 180, x: 75, y: 25, parallaxFactor: 0.8, opacity: 0.12, blur: 18, delay: 0 },
      { id: 2, size: 120, x: 20, y: 65, parallaxFactor: 0.5, opacity: 0.10, blur: 14, delay: 2 },
      { id: 3, size: 90, x: 85, y: 70, parallaxFactor: 1.2, opacity: 0.14, blur: 10, delay: 4 },
      { id: 4, size: 200, x: 40, y: 80, parallaxFactor: 0.6, opacity: 0.06, blur: 22, delay: 3 },
    ],
    [],
  )

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
      {bubbles.map((b) => {
        const offsetX = mouse.smoothX * b.parallaxFactor * 40
        const offsetY = mouse.smoothY * b.parallaxFactor * 30
        return (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `translate(${offsetX}px, ${offsetY}px) translate(-50%, -50%)`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), ${accentColor}44, transparent)`,
              opacity: b.opacity,
              filter: `blur(${b.blur}px)`,
              willChange: 'transform',
              transition: 'background 1s ease',
              animation: `float ${6 + b.delay}s ease-in-out ${b.delay}s infinite alternate`,
            }}
          />
        )
      })}
    </div>
  )
}
