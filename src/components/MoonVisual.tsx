/**
 * MoonVisual — rotating luna.png with cycling hue-rotate filter.
 * Centered on screen, entry/exit via GSAP.
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface MoonVisualProps {
  active: boolean
  parallax: string
}

export function MoonVisual({ active, parallax }: MoonVisualProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return
    if (active) {
      gsap.fromTo(wrapRef.current,
        { scale: 0.72, opacity: 0, rotation: -15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.4)' })
    } else {
      gsap.to(wrapRef.current, {
        scale: 0.75, opacity: 0, duration: 0.55, ease: 'power2.in',
      })
    }
  }, [active])

  return (
    <>
      {/* CSS keyframes for spin + hue-rotate */}
      <style>{`
        @keyframes moon-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes moon-hue {
          0%   { filter: drop-shadow(0 0 80px rgba(255,0,120,0.9))   hue-rotate(0deg)   brightness(0.7)  saturate(8); }
          14%  { filter: drop-shadow(0 0 80px rgba(160,0,255,0.9))   hue-rotate(52deg)  brightness(0.65) saturate(9); }
          28%  { filter: drop-shadow(0 0 80px rgba(0,80,255,0.9))    hue-rotate(105deg) brightness(0.65) saturate(9); }
          42%  { filter: drop-shadow(0 0 80px rgba(0,220,200,0.9))   hue-rotate(158deg) brightness(0.7)  saturate(8); }
          57%  { filter: drop-shadow(0 0 80px rgba(0,200,60,0.9))    hue-rotate(210deg) brightness(0.65) saturate(9); }
          71%  { filter: drop-shadow(0 0 80px rgba(220,200,0,0.9))   hue-rotate(263deg) brightness(0.65) saturate(9); }
          85%  { filter: drop-shadow(0 0 80px rgba(255,80,0,0.9))    hue-rotate(316deg) brightness(0.7)  saturate(8); }
          100% { filter: drop-shadow(0 0 80px rgba(255,0,120,0.9))   hue-rotate(360deg) brightness(0.7)  saturate(8); }
        }
      `}</style>

      {/* Outer wrapper: GSAP entry + parallax */}
      <div
        ref={wrapRef}
        className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center"
        style={{ transform: parallax, opacity: 0 }}
      >
        {/* Spinning + color-cycling moon */}
        <div
          style={{
            width:  'clamp(280px, 42vw, 580px)',
            height: 'clamp(280px, 42vw, 580px)',
            animation: 'moon-spin 28s linear infinite, moon-hue 3.5s linear infinite',
            willChange: 'transform, filter',
          }}
        >
          <img
            src="/luna.webp"
            alt="Luna"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </>
  )
}
