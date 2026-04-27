/**
 * useIsMobile — detecta si el dispositivo es móvil/tablet.
 * Usa exclusivamente el ancho de pantalla (breakpoint) para mayor
 * precisión — evita falsos positivos en MacBooks con trackpad táctil.
 * Se actualiza en resize (ej: rotación de pantalla).
 */
import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < breakpoint)
    }
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}
