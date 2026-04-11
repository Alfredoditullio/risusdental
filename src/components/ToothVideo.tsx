/**
 * ToothVideo — plays the real AI-generated tooth video (WebM with alpha).
 * Fades in/out with GSAP when the slide activates.
 * Mouse parallax is applied via the `style` prop from the parent.
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ToothVideoProps {
  active: boolean
  /** CSS transform string for mouse parallax — computed by parent */
  parallax: string
}

export function ToothVideo({ active, parallax }: ToothVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return
    if (active) {
      // Make sure the video is playing and restart from beginning
      videoRef.current?.play().catch(() => {})
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, scale: 0.82, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'expo.out' },
      )
    } else {
      gsap.to(wrapRef.current, {
        opacity: 0,
        scale: 0.88,
        y: -20,
        duration: 0.65,
        ease: 'power2.in',
      })
    }
  }, [active])

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 z-[5] flex items-center justify-end pr-[3%] pointer-events-none"
      style={{ opacity: 0, transform: parallax, willChange: 'transform, opacity' }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          height: '82vh',
          width: 'auto',
          maxWidth: '50vw',
          objectFit: 'contain',
          /* Pink glow that matches the brand */
          filter:
            'drop-shadow(0 0 48px rgba(236,59,121,0.45)) drop-shadow(0 0 120px rgba(236,59,121,0.18))',
        }}
      >
        <source src="/diente_transparente.webm" type="video/webm" />
      </video>
    </div>
  )
}
