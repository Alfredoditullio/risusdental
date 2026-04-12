/**
 * LipsShatterIntro — labioss.png crece desde el centro y luego se fragmenta.
 */
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface Props {
  active: boolean
  onDone?: () => void
}

const COLS   = 6,  ROWS  = 3
const IMG_W  = 882, IMG_H = 390
const CELL_W = IMG_W / COLS
const CELL_H = IMG_H / ROWS
const TOTAL  = COLS * ROWS

export function LipsShatterIntro({ active, onDone }: Props) {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const imgWrapRef   = useRef<HTMLDivElement>(null)   // ← el contenedor completo
  const fragmentRefs = useRef<(HTMLDivElement | null)[]>([])
  const tlRef        = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    tlRef.current?.kill()
    const frags   = fragmentRefs.current.filter(Boolean) as HTMLDivElement[]
    const overlay = overlayRef.current
    const imgWrap = imgWrapRef.current
    if (!overlay || !imgWrap || frags.length === 0) return

    if (active) {
      // Reset fragments a posición natural (sin transforms individuales)
      gsap.set(frags,   { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 })
      // El CONTENEDOR empieza tiny → crece → shatter
      gsap.set(imgWrap, { scale: 0.04, opacity: 1 })
      gsap.set(overlay, { opacity: 1, display: 'flex' })

      const tl = gsap.timeline({ onComplete: () => onDone?.() })
      tlRef.current = tl

      // 1. Contenedor entero crece desde el centro — se ve claramente
      tl.to(imgWrap, {
        scale: 1,
        duration: 0.7,
        ease: 'expo.out',
      }, 0)

      // 2. Pausa — viewer ve la boca entera
      // (hueco entre 0.7 y 1.0)

      // 3. Shatter — ahora sí las piezas individuales explotan
      tl.to(frags, {
        x:        () => gsap.utils.random(-800, 800),
        y:        () => gsap.utils.random(-550, 550),
        rotation: () => gsap.utils.random(-450, 450),
        scale:    () => gsap.utils.random(0, 0.2),
        opacity: 0,
        ease: 'power3.in',
        duration: 0.55,
        stagger: { amount: 0.28, from: 'center' },
      }, 1.0)

      // 4. Fade overlay
      tl.to(overlay, { opacity: 0, duration: 0.15 }, 1.38)
      tl.set(overlay, { display: 'none' })

    } else {
      gsap.set(overlay, { opacity: 0, display: 'none' })
    }

    return () => { tlRef.current?.kill() }
  }, [active])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 20,
        display: 'none', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', opacity: 0,
      }}
    >
      <div
        ref={imgWrapRef}
        style={{ position: 'relative', width: IMG_W, height: IMG_H }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          return (
            <div
              key={i}
              ref={el => { fragmentRefs.current[i] = el }}
              style={{
                position: 'absolute',
                left:   col * CELL_W,
                top:    row * CELL_H,
                width:  CELL_W,
                height: CELL_H,
                backgroundImage:    'url(/boca.png)',
                backgroundSize:     `${IMG_W}px ${IMG_H}px`,
                backgroundPosition: `-${col * CELL_W}px -${row * CELL_H}px`,
                backgroundRepeat:   'no-repeat',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
