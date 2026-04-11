import { useState, useEffect, useRef } from 'react'

export interface MousePosition {
  /** Normalized -1 to 1 */
  x: number
  y: number
  /** Smoothed/lerped values for fluid motion */
  smoothX: number
  smoothY: number
}

export function useMouse(lerpFactor = 0.08): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, smoothX: 0, smoothY: 0 })
  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const tick = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * lerpFactor
      smooth.current.y += (target.current.y - smooth.current.y) * lerpFactor
      setPos({
        x: target.current.x,
        y: target.current.y,
        smoothX: smooth.current.x,
        smoothY: smooth.current.y,
      })
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [lerpFactor])

  return pos
}
