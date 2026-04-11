/**
 * RodrigoPhoto — Rodrigo's circular portrait for slide 2.
 *
 * Features:
 * - Circular frame with animated rainbow-pride border (rotating conic-gradient)
 * - Pink outer glow pulse
 * - Inner vignette to blend photo edges
 * - Sparkle dots orbiting the frame
 * - GSAP scale/opacity in-out on slide change
 * - Mouse parallax via prop
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface RodrigoPhotoProps {
  active: boolean
  /** CSS transform string for mouse parallax — computed by parent */
  parallax: string
  matricula?: string
}

export function RodrigoPhoto({ active, parallax, matricula }: RodrigoPhotoProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return
    if (active) {
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, scale: 0.75, x: -60 },
        { opacity: 1, scale: 1, x: 0, duration: 1.3, ease: 'expo.out' },
      )
    } else {
      gsap.to(wrapRef.current, {
        opacity: 0,
        scale: 0.82,
        x: -40,
        duration: 0.6,
        ease: 'power2.in',
      })
    }
  }, [active])

  return (
    <>
      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.06); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
        }
      `}</style>

      <div
        ref={wrapRef}
        className="absolute inset-0 z-[5] flex items-center justify-start pointer-events-none"
        style={{
          opacity: 0,
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          transform: parallax,
          willChange: 'transform, opacity',
        }}
      >
        {/* Outer ambient glow */}
        <div
          style={{
            position: 'absolute',
            left: 'clamp(24px, 5vw, 80px)',
            width: 'clamp(260px, 38vw, 520px)',
            height: 'clamp(260px, 38vw, 520px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,59,121,0.45) 0%, rgba(155,89,182,0.3) 40%, transparent 70%)',
            animation: 'glow-pulse 3s ease-in-out infinite',
            filter: 'blur(28px)',
            pointerEvents: 'none',
          }}
        />

        {/* Static wrapper — badge lives here so it never rotates */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(240px, 36vw, 500px)',
            height: 'clamp(240px, 36vw, 500px)',
            flexShrink: 0,
          }}
        >
          {/* Rotating rainbow border — fills the static wrapper */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              padding: '4px',
              background:
                'conic-gradient(#EC3B79, #F39C12, #E4FC2D, #1E8ED0, #9B59B6, #FAB0EA, #EC3B79)',
              animation: 'spin-border 4s linear infinite',
            }}
          >
            {/* Static white ring inside border for separation */}
            <div
              style={{
                position: 'absolute',
                inset: '4px',
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.25)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />

            {/* Photo circle — counter-rotates to stay upright */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                animation: 'spin-border 4s linear infinite reverse',
                position: 'relative',
              }}
            >
              <img
                src="/rodrigo.webp"
                alt="Dr. Rodrigo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'contrast(1.05) saturate(1.15) brightness(1.04)',
                }}
              />

              {/* Inner vignette to soften circular edge */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.35) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Matricula badge — sibling of the spinner, never rotates, overflows below */}
          {matricula && (
            <div
              style={{
                position: 'absolute',
                bottom: '-22px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.72)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid rgba(236,59,121,0.75)',
                borderRadius: '999px',
                padding: '10px 24px',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 0 28px rgba(236,59,121,0.45), 0 8px 32px rgba(0,0,0,0.55)',
                zIndex: 10,
              }}
            >
              {/* Pink dot */}
              <span style={{
                width: 10, height: 10,
                borderRadius: '50%',
                background: '#EC3B79',
                boxShadow: '0 0 10px #EC3B79, 0 0 20px rgba(236,59,121,0.6)',
                flexShrink: 0,
                display: 'inline-block',
              }} />
              <span style={{
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.95)',
                textTransform: 'uppercase',
              }}>
                {matricula}
              </span>
            </div>
          )}
        </div>

        {/* Orbiting sparkle dots */}
        {[
          { size: 10, r: '52%', dur: '5s',  color: '#EC3B79', delay: '0s'    },
          { size: 7,  r: '54%', dur: '7s',  color: '#E4FC2D', delay: '-2s'   },
          { size: 8,  r: '51%', dur: '6s',  color: '#1E8ED0', delay: '-3.5s' },
          { size: 6,  r: '53%', dur: '8s',  color: '#FAB0EA', delay: '-1s'   },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: dot.size,
              height: dot.size,
              marginLeft: -dot.size / 2,
              marginTop: -dot.size / 2,
              borderRadius: '50%',
              background: dot.color,
              boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
              ['--orbit-r' as string]: dot.r,
              animation: `orbit ${dot.dur} linear ${dot.delay} infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}
