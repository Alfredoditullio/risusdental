/**
 * useIsMobile — detecta si el dispositivo es móvil/tablet.
 * Combina media query (ancho) + detección de touch para mayor precisión.
 * Se actualiza en resize (ej: rotación de pantalla).
 */
import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint || isTouchDevice()
  })

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < breakpoint || isTouchDevice())
    }
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}

function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  )
}
