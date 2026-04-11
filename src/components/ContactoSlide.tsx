/**
 * ContactoSlide — Mona Lisa + labios animados + mapa radar
 */
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { WHATSAPP_URL } from '../data/slides'

interface Props { active: boolean }

const MAPS_EMBED = 'https://maps.google.com/maps?q=Paraguay+2475,+Buenos+Aires,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed'
const MAPS_LINK  = 'https://maps.google.com/maps?q=Paraguay+2475,+Buenos+Aires,+Argentina'

export function ContactoSlide({ active }: Props) {
  const monaRef  = useRef<HTMLImageElement>(null)
  const lipsRef  = useRef<HTMLImageElement>(null)
  const textRef  = useRef<HTMLDivElement>(null)
  const mapRef   = useRef<HTMLDivElement>(null)
  const floatTl  = useRef<gsap.core.Timeline | null>(null)
  const entryTl  = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    entryTl.current?.kill()
    floatTl.current?.kill()

    const mona = monaRef.current
    const lips = lipsRef.current
    const text = textRef.current
    const map  = mapRef.current

    if (active) {
      const tl = gsap.timeline()
      entryTl.current = tl

      gsap.set(mona, { opacity: 0, x: 80, scale: 0.96 })
      gsap.set(lips, { opacity: 0, scale: 0.2, rotation: -18, y: 30 })
      gsap.set(text, { opacity: 0, x: -60 })
      gsap.set(map,  { opacity: 0, scale: 0.7, rotation: -8 })

      tl.to(mona, { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'expo.out' }, 0.1)
      tl.to(text, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }, 0.2)
      // Map powers on like a radar
      tl.to(map, { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.45)
      // Lips burst in
      tl.to(lips, { opacity: 1, scale: 1.12, rotation: 8, y: 0, duration: 0.45, ease: 'back.out(2.8)' }, 0.95)
      tl.to(lips, { scale: 1, rotation: -4, duration: 0.22, ease: 'power2.out' })
      tl.to(lips, { rotation: 0, duration: 0.18, ease: 'power1.inOut' })

      tl.call(() => {
        floatTl.current = gsap.timeline({ repeat: -1, yoyo: true })
        floatTl.current
          .to(lips, { y: -6, rotation: 3,  scale: 1.03, duration: 1.6, ease: 'sine.inOut' })
          .to(lips, { y:  4, rotation: -2, scale: 0.98, duration: 1.8, ease: 'sine.inOut' })
          .to(lips, { y: -3, rotation: 1,  scale: 1.01, duration: 1.4, ease: 'sine.inOut' })
      })
    } else {
      floatTl.current?.kill()
      // Reset y/rotation acumulados por el float antes de ocultar
      gsap.set(lips, { y: 0, rotation: 0, scale: 1 })
      gsap.to(mona, { opacity: 0, x: 60,  duration: 0.28, ease: 'power2.in' })
      gsap.to(lips, { opacity: 0, scale: 0.4, rotation: 20, duration: 0.22, ease: 'power2.in' })
      gsap.to(text, { opacity: 0, x: -40, duration: 0.22, ease: 'power2.in' })
      gsap.to(map,  { opacity: 0, scale: 0.85, duration: 0.22, ease: 'power2.in' })
    }

    return () => { entryTl.current?.kill(); floatTl.current?.kill() }
  }, [active])

  return (
    <>
      {/* ── CSS keyframes para el radar ─────────────────────────── */}
      <style>{`
        @keyframes ring-out {
          0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(3.8); opacity: 0; }
        }
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236,59,121,0.8); }
          50%       { box-shadow: 0 0 0 8px rgba(236,59,121,0); }
        }
      `}</style>

      <div
        className={`absolute inset-0 z-10 flex items-center justify-between pointer-events-none ${active ? 'visible' : 'invisible'}`}
        style={{ padding: '0 clamp(24px,4vw,72px)' }}
      >
        {/* ── LEFT ────────────────────────────────────────────────── */}
        <div ref={textRef} style={{ maxWidth: '400px', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.5vh,28px)' }}>

          <p style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 600, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', margin: 0 }}>
            Risus Dental · Recoleta, Buenos Aires
          </p>

          {/* 2 líneas */}
          <h2 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(2.6rem,5.5vw,5rem)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 0.88,
            textShadow: '0 4px 40px rgba(0,0,0,0.35)',
            margin: 0,
          }}>
            TE<br/>ESPERAMOS
          </h2>

          {/* Info compacta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '🕐', value: 'Lun–Vie 9–20 hs · Sáb 9–14 hs' },
              { icon: '💳', value: 'Obras sociales y prepagas' },
            ].map(item => (
              <div key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
                <p style={{ fontFamily: 'inherit', fontSize: 'clamp(11px,1.1vw,14px)', color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.4 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* ── Fancy map card ─────────────────────────────────────── */}
          <div
            ref={mapRef}
            style={{
              position: 'relative',
              borderRadius: '18px',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '420px',
              height: '240px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.14)',
            }}
          >
            {/* Google Maps iframe */}
            <iframe
              src={MAPS_EMBED}
              title="Ubicación Risus Dental"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                border: 'none',
                filter: 'saturate(0.7) contrast(1.05) brightness(0.9)',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Radar sweep — conic gradient que gira */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(236,59,121,0.18) 40deg, transparent 41deg)',
              animation: 'radar-spin 3.5s linear infinite',
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }} />

            {/* Pulsing rings at center */}
            {[0, 0.8, 1.6].map(delay => (
              <div key={delay} style={{
                position: 'absolute',
                left: '50%', top: '47%',
                width: 24, height: 24,
                borderRadius: '50%',
                border: '2px solid rgba(236,59,121,0.7)',
                animation: `ring-out 2.4s ease-out ${delay}s infinite`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* GPS dot */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '47%',
              transform: 'translate(-50%,-50%)',
              width: 12, height: 12,
              borderRadius: '50%',
              background: '#EC3B79',
              border: '2.5px solid white',
              boxShadow: '0 0 0 0 rgba(236,59,121,0.8)',
              animation: 'dot-pulse 1.8s ease-in-out infinite',
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            {/* Bottom glass bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(0,0,0,0.58)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '9px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              zIndex: 3,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#EC3B79', flexShrink: 0, boxShadow: '0 0 6px #EC3B79' }} />
                <span style={{ fontFamily: 'inherit', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
                  Paraguay 2475, Recoleta · CABA
                </span>
              </div>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'inherit', fontSize: '10px', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#EC3B79', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  flexShrink: 0,
                }}
              >
                Ver en Maps
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1 4.5h7M5 2l3 2.5L5 7" stroke="#EC3B79" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-start',
              background: 'white',
              borderRadius: '999px', padding: '14px 32px',
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em',
              color: '#EC3B79', textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            PEDIR TURNO
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke="#EC3B79" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── RIGHT: Mona Lisa + lips ──────────────────────────────── */}
        <div style={{
          position: 'relative',
          height: 'clamp(480px,88vh,920px)',
          width: 'clamp(280px,38vw,560px)',
          flexShrink: 0,
          pointerEvents: 'none',
        }}>
          <img
            ref={monaRef}
            src="/monalisa_nobg.webp"
            alt="Mona Lisa"
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'bottom center',
              display: 'block',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.55))',
            }}
          />
          <img
            ref={lipsRef}
            src="/lips_nobck.webp"
            alt=""
            style={{
              position: 'absolute',
              left: '45%',
              top: '27.9%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(70px,14%,130px)',
              height: 'auto',
              filter: 'drop-shadow(0 4px 14px rgba(236,59,121,0.7))',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </>
  )
}
