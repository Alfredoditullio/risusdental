/**
 * ContactoSlide — Mona Lisa + labios animados + mapa radar
 */
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { WHATSAPP_URL } from '../data/slides'
import { GradientSocials } from './GradientSocials'
import { useIsMobile } from '../hooks/useIsMobile'

interface Props { active: boolean }

const MAPS_EMBED = 'https://maps.google.com/maps?q=Paraguay+2475,+Buenos+Aires,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed'
const MAPS_LINK  = 'https://maps.google.com/maps?q=Paraguay+2475,+Buenos+Aires,+Argentina'

export function ContactoSlide({ active }: Props) {
  const isMobile = useIsMobile()
  const monaRef  = useRef<HTMLImageElement>(null)
  const lipsRef  = useRef<HTMLImageElement>(null)
  const textRef  = useRef<HTMLDivElement>(null)
  const mapRef   = useRef<HTMLDivElement>(null)
  const floatTl  = useRef<gsap.core.Timeline | null>(null)
  const entryTl  = useRef<gsap.core.Timeline | null>(null)
  const [ctaHov, setCtaHov] = useState(false)

  useEffect(() => {
    if (isMobile) return   // mobile usa CSS transitions, no GSAP refs disponibles
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
  }, [active, isMobile])

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>
        <style>{`
          @keyframes ring-out-m { 0% { transform: translate(-50%,-50%) scale(0.2); opacity: 0.9; } 100% { transform: translate(-50%,-50%) scale(3.8); opacity: 0; } }
          @keyframes radar-spin-m { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes dot-pulse-m { 0%, 100% { box-shadow: 0 0 0 0 rgba(236,59,121,0.8); } 50% { box-shadow: 0 0 0 8px rgba(236,59,121,0); } }
        `}</style>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          paddingTop: '56px',
          paddingBottom: '88px',
          pointerEvents: 'auto',
          overflowY: 'auto',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.45s ease',
          WebkitOverflowScrolling: 'touch' as any,
        }}>

          {/* ── Top row: texto izquierda + Mona Lisa derecha ── */}
          <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, minHeight: 230 }}>

            {/* Left: eyebrow + headline + horario */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 18px 20px', gap: 12 }}>
              <p style={{ fontFamily: 'inherit', fontSize: '8px', fontWeight: 600, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', margin: 0 }}>
                Risus Dental · Recoleta
              </p>
              <h2 style={{ fontFamily: 'inherit', fontSize: 'clamp(2.4rem,11vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.88, margin: 0 }}>
                TE<br/>ESPERAMOS
              </h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '7px 14px', alignSelf: 'flex-start' }}>
                <span style={{ fontSize: '14px', lineHeight: 1 }}>🕐</span>
                <p style={{ fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: 'white', margin: 0 }}>Lun–Vie · 9–21 hs</p>
              </div>
            </div>

            {/* Right: Mona Lisa */}
            <div style={{ width: '44%', height: 270, position: 'relative', flexShrink: 0, overflow: 'visible' }}>
              <img
                src="/monalisa_nobg.webp"
                alt="Mona Lisa"
                style={{
                  position: 'absolute', bottom: 0, right: 0,
                  height: '125%', width: 'auto',
                  objectFit: 'contain', objectPosition: 'bottom right',
                  filter: 'drop-shadow(-8px 0 24px rgba(0,0,0,0.45))',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* ── Separator ── */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '0 20px 16px', flexShrink: 0 }} />

          {/* ── Map ── */}
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', margin: '0 20px', height: 160, boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(255,255,255,0.14)', flexShrink: 0 }}>
            <iframe src={MAPS_EMBED} title="Ubicación Risus Dental" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', filter: 'saturate(0.7) contrast(1.05) brightness(0.9)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div style={{ position: 'absolute', inset: 0, background: 'conic-gradient(from 0deg, transparent 0deg, rgba(236,59,121,0.18) 40deg, transparent 41deg)', animation: active ? 'radar-spin-m 3.5s linear infinite' : 'none', pointerEvents: 'none', mixBlendMode: 'screen' }} />
            {[0, 0.8, 1.6].map(delay => (
              <div key={delay} style={{ position: 'absolute', left: '50%', top: '47%', width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(236,59,121,0.7)', animation: active ? `ring-out-m 2.4s ease-out ${delay}s infinite` : 'none', pointerEvents: 'none' }} />
            ))}
            <div style={{ position: 'absolute', left: '50%', top: '47%', transform: 'translate(-50%,-50%)', width: 10, height: 10, borderRadius: '50%', background: '#EC3B79', border: '2px solid white', animation: active ? 'dot-pulse-m 1.8s ease-in-out infinite' : 'none', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.72)', padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EC3B79', flexShrink: 0, boxShadow: '0 0 5px #EC3B79' }} />
                <span style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Paraguay 2475, Recoleta · CABA</span>
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EC3B79', textDecoration: 'none', flexShrink: 0 }}>Ver Maps →</a>
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'white', borderRadius: '999px', padding: '14px 30px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.18em', color: '#EC3B79', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.3)' }}>
              PEDIR TURNO
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke="#EC3B79" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* ── Socials ── */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 20px 0', flexShrink: 0 }}>
            <GradientSocials />
          </div>

        </div>
      </div>
    )
  }

  // ── Desktop layout ──────────────────────────────────────────────────────────
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

          {/* Horario */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '999px',
            padding: '10px 20px',
            alignSelf: 'flex-start',
          }}>
            <span style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>🕐</span>
            <p style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              fontWeight: 700,
              color: 'white',
              margin: 0,
              letterSpacing: '0.04em',
            }}>
              Lun–Vie · 9 a 21 hs
            </p>
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
              animation: active ? 'radar-spin 3.5s linear infinite' : 'none',
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
                animation: active ? `ring-out 2.4s ease-out ${delay}s infinite` : 'none',
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
              animation: active ? 'dot-pulse 1.8s ease-in-out infinite' : 'none',
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            {/* Bottom glass bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(0,0,0,0.72)',
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
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px', alignSelf: 'flex-start',
              background: ctaHov ? 'linear-gradient(135deg,#EC3B79,#9B59B6)' : 'white',
              borderRadius: '999px', padding: '16px 36px',
              fontSize: '13px', fontWeight: 800, letterSpacing: '0.18em',
              color: ctaHov ? 'white' : '#EC3B79',
              textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: ctaHov ? '0 12px 40px rgba(236,59,121,0.55)' : '0 8px 32px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            PEDIR TURNO
            <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke={ctaHov ? 'white' : '#EC3B79'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── BOTTOM CENTER: Social pills ─────────────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(64px, 8vh, 88px)',
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'auto',
          zIndex: 60,
        }}>
          <GradientSocials />
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
              transform: 'translate(-50%, calc(-50% + 75px))',
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
