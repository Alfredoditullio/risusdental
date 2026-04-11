/**
 * Revealer — replicates RevSlider's Revealer addon.
 *
 * On every slide change 5 coloured vertical strips sweep IN from the bottom
 * (covering the outgoing slide), then sweep OUT upward (revealing the
 * incoming slide). Creates the signature "venetian-blind" wipe transition.
 *
 * z-index 200 — above everything during the transition, invisible otherwise.
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface RevealerProps {
  current: number
}

const STRIP_COLORS = [
  '#EC3B79',  // hot pink
  '#9B59B6',  // purple
  '#1E8ED0',  // blue
  '#FAB0EA',  // soft pink
  '#E4FC2D',  // yellow-green
]

export function Revealer({ current }: RevealerProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const firstRun  = useRef(true)
  const tlRef     = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Skip the very first mount — no transition needed on load
    if (firstRun.current) { firstRun.current = false; return }
    if (!wrapRef.current) return

    const strips = Array.from(wrapRef.current.children) as HTMLElement[]

    // Kill any in-progress animation
    tlRef.current?.kill()

    const tl = gsap.timeline()
    tlRef.current = tl

    // ① Strips sweep IN from bottom — cover outgoing slide
    tl.set(strips, { scaleY: 0, transformOrigin: 'bottom center', display: 'block' })
    tl.to(strips, {
      scaleY: 1,
      duration: 0.38,
      ease: 'power3.inOut',
      stagger: { each: 0.055, from: 'start' },
    })

    // ② Brief hold at full coverage
    tl.to({}, { duration: 0.06 })

    // ③ Strips sweep OUT upward — reveal incoming slide
    tl.to(strips, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.36,
      ease: 'power3.inOut',
      stagger: { each: 0.045, from: 'end' },
      onComplete: () => {
        // Hide the wrapper completely when done
        gsap.set(strips, { display: 'none' })
      },
    })
  }, [current])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        pointerEvents: 'none',
      }}
    >
      {STRIP_COLORS.map((color, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: color,
            transform: 'scaleY(0)',
            transformOrigin: 'bottom center',
            display: 'none',
          }}
        />
      ))}
    </div>
  )
}
