import { useState, useCallback, useEffect, useRef } from 'react'
import { slides } from '../data/slides'

const TOTAL = slides.length
const ANIMATION_DURATION = 1200 // ms

export function useSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartY = useRef(0)
  const wheelAccum = useRef(0)
  const wheelTimeout = useRef<ReturnType<typeof setTimeout>>()

  const goTo = useCallback(
    (index: number, dir?: 1 | -1) => {
      if (isAnimating) return
      const clamped = Math.max(0, Math.min(TOTAL - 1, index))
      if (clamped === current) return
      setDirection(dir ?? (clamped > current ? 1 : -1))
      setIsAnimating(true)
      setCurrent(clamped)
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION)
    },
    [current, isAnimating],
  )

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo])

  // Wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      wheelAccum.current += e.deltaY
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current)
      wheelTimeout.current = setTimeout(() => {
        wheelAccum.current = 0
      }, 200)
      if (Math.abs(wheelAccum.current) > 50) {
        if (wheelAccum.current > 0) next()
        else prev()
        wheelAccum.current = 0
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [next, prev])

  // Touch
  useEffect(() => {
    // Check if an element is inside a scrollable container (to avoid stealing scroll events)
    const isInsideScrollable = (el: EventTarget | null): boolean => {
      let node = el as HTMLElement | null
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node)
        const overflowY = style.overflowY
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
          return true
        }
        node = node.parentElement
      }
      return false
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      // Don't navigate slides when the user is scrolling inside a scrollable container
      if (isInsideScrollable(e.target)) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 50) {
        if (delta > 0) next()
        else prev()
      }
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [next, prev])

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next()
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  return { current, direction, isAnimating, next, prev, goTo, total: TOTAL }
}
