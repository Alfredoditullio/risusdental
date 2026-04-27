/**
 * NosotrosSlide — Layout editorial: foto sin fondo sangrando al borde,
 * tipografía gigante de fondo, badges de credenciales, bio limpia.
 */
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { WHATSAPP_URL } from '../data/slides'
import { slides } from '../data/slides'
import { useIsMobile } from '../hooks/useIsMobile'

interface Props { active: boolean }

function BadgePill({ label }: { label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'inherit', fontSize: '11px', fontWeight: 700,
        letterSpacing: '0.1em', whiteSpace: 'nowrap',
        color: hov ? '#EC3B79' : 'white',
        background: hov ? 'white' : 'rgba(255,255,255,0.18)',
        border: `1px solid ${hov ? 'white' : 'rgba(255,255,255,0.5)'}`,
        borderRadius: '999px', padding: '7px 16px',
        cursor: 'default',
        transition: 'all 0.25s ease',
        boxShadow: hov ? '0 4px 20px rgba(236,59,121,0.35)' : 'none',
      }}
    >
      {label}
    </span>
  )
}

const slide     = slides[1]   // Nosotros
const BADGES    = ['UBA', 'Ortodoncia', 'Estética Facial', 'Go Smile™', 'Docente', '🛼 Skater']
const BIO_PARAS = (slide.bio ?? '').split('\n\n')

export function NosotrosSlide({ active }: Props) {
  const isMobile = useIsMobile()
  const [ctaHov, setCtaHov] = useState(false)
  const photoRef   = useRef<HTMLImageElement>(null)
  const meloRef    = useRef<HTMLDivElement>(null)    // texto decorativo gigante
  const nameRef    = useRef<HTMLDivElement>(null)
  const subtitleRef= useRef<HTMLDivElement>(null)
  const badgesRef  = useRef<HTMLDivElement>(null)
  const bioRef     = useRef<HTMLDivElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const matricRef  = useRef<HTMLDivElement>(null)
  const entryTl    = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (isMobile) return   // mobile usa CSS transitions, no GSAP refs disponibles
    entryTl.current?.kill()
    const tl = gsap.timeline()
    entryTl.current = tl

    const badgeEls = badgesRef.current
      ? Array.from(badgesRef.current.children) as HTMLElement[]
      : []

    if (active) {
      // ── Reset ─────────────────────────────────────────────────────
      gsap.set(meloRef.current,    { opacity: 0, y: 40 })
      gsap.set(photoRef.current,   { opacity: 0, x: -60, scale: 0.97 })
      gsap.set(nameRef.current,    { opacity: 0, x: 50 })
      gsap.set(subtitleRef.current,{ opacity: 0, x: 50 })
      gsap.set(badgeEls,           { opacity: 0, y: 18, scale: 0.85 })
      gsap.set(bioRef.current,     { opacity: 0, y: 22 })
      gsap.set(ctaRef.current,     { opacity: 0, y: 16 })
      gsap.set(matricRef.current,  { opacity: 0, y: 12 })

      // ── Sequence ──────────────────────────────────────────────────
      // 1. Fondo decorativo MELO
      tl.to(meloRef.current,    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
      // 2. Foto entra desde la izquierda
      tl.to(photoRef.current,   { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'expo.out' }, 0.1)
      // 3. Matrícula badge
      tl.to(matricRef.current,  { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, 0.55)
      // 4. Nombre + subtítulo desde la derecha
      tl.to(nameRef.current,    { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' }, 0.35)
      tl.to(subtitleRef.current,{ opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' }, 0.48)
      // 5. Badges escalonados
      tl.to(badgeEls, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.45, ease: 'back.out(2)',
        stagger: 0.07,
      }, 0.6)
      // 6. Bio
      tl.to(bioRef.current,  { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.85)
      // 7. CTA
      tl.to(ctaRef.current,  { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 1.0)

    } else {
      tl.to([photoRef.current, meloRef.current, nameRef.current,
              subtitleRef.current, bioRef.current, ctaRef.current, matricRef.current],
        { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      tl.to(badgesRef.current ? Array.from(badgesRef.current.children) : [],
        { opacity: 0, duration: 0.2 }, 0)
    }

    return () => { entryTl.current?.kill() }
  }, [active, isMobile])

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden', paddingBottom: 52 }}>

        {/* ── Top row: nombre izquierda + foto derecha ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0, minHeight: 240, paddingTop: 68 }}>

          {/* Left: eyebrow + nombre + subtítulo + matrícula */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 16px 20px', gap: 8 }}>
            <p style={{ fontFamily: 'inherit', fontSize: '8px', fontWeight: 600, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: 0 }}>
              Risus Dental · Bs As
            </p>
            <h2 style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(2.2rem, 11vw, 3rem)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-0.04em', lineHeight: 0.88,
              margin: 0,
            }}>
              {slide.headlineTop}<br />{slide.headlineBottom}
            </h2>
            <div>
              <span style={{
                display: 'inline-block', fontFamily: 'inherit',
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', background: '#EC3B79',
                color: 'white', padding: '3px 10px 4px', borderRadius: 3,
              }}>
                {slide.subtitle}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EC3B79', flexShrink: 0, boxShadow: '0 0 6px #EC3B79' }} />
              <span style={{ fontFamily: 'inherit', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>
                {slide.matricula}
              </span>
            </div>
          </div>

          {/* Right: foto — overflow hidden para no causar scroll horizontal */}
          <div style={{ width: '46%', height: 260, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
            <img
              src="/rodrigo_editorial.webp"
              alt="Rodrigo Melo"
              style={{
                position: 'absolute', bottom: 0, right: 0,
                height: '130%', width: 'auto',
                objectFit: 'contain', objectPosition: 'bottom right',
                filter: 'drop-shadow(-8px 0 24px rgba(0,0,0,0.45))',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* ── Separator ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '6px 20px 16px' }} />

        {/* ── Badges ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 20px 18px' }}>
          {BADGES.map(badge => (
            <span key={badge} style={{
              fontFamily: 'inherit', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.08em', whiteSpace: 'nowrap',
              color: 'white', background: 'rgba(255,255,255,0.16)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '999px', padding: '5px 12px',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* ── Bio — primer párrafo ── */}
        {BIO_PARAS[0] && (
          <div style={{ padding: '0 20px 4px' }}>
            <p style={{ fontFamily: 'inherit', fontSize: 'clamp(0.78rem,3.5vw,0.9rem)', lineHeight: 1.7, margin: 0 }}>
              <span style={{
                background: 'rgba(8,4,24,0.65)',
                WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone',
                padding: '2px 8px 3px', borderRadius: 3,
                color: 'rgba(255,255,255,0.96)',
                borderLeft: '3px solid rgba(236,59,121,0.85)',
              }}>
                {BIO_PARAS[0]}
              </span>
            </p>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ padding: '22px 20px 0' }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', borderRadius: '999px', padding: '14px 32px',
              fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em',
              color: '#EC3B79', textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
            }}
          >
            PEDIR TURNO
            <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke="#EC3B79" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    )
  }

  // ── Desktop layout ──────────────────────────────────────────────────────────
  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>

      {/* ── Texto decorativo MELO — fondo gigante ─────────────────── */}
      <div ref={meloRef} style={{
        position: 'absolute',
        right: '-2vw', bottom: '-4vh',
        fontSize: 'clamp(14rem, 28vw, 26rem)',
        fontWeight: 900,
        color: 'rgba(255,255,255,0.05)',
        letterSpacing: '-0.06em',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
      }}>
        MELO
      </div>

      {/* ── Grid 30/70 ────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '30% 70%',
      }}>

        {/* Col izquierda — foto */}
        <div style={{ position: 'relative', height: '100%' }}>
          <img
            ref={photoRef}
            src="/rodrigo_editorial.webp"
            alt="Rodrigo Melo"
            style={{
              position: 'absolute',
              bottom: 0, left: 0,
              width: '100%', height: '95%',
              objectFit: 'contain', objectPosition: 'bottom left',
              display: 'block',
              filter: 'drop-shadow(20px 0 60px rgba(0,0,0,0.45))',
              pointerEvents: 'none',
            }}
          />
          {/* Matrícula badge */}
          <div ref={matricRef} style={{
            position: 'absolute', bottom: '6%', left: '16%',
            background: 'rgba(10,6,30,0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '999px',
            padding: '8px 20px',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EC3B79', display: 'block', boxShadow: '0 0 8px #EC3B79' }}/>
            <span style={{ fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, color: 'white', letterSpacing: '0.08em' }}>
              {slide.matricula}
            </span>
          </div>
        </div>

        {/* Col derecha — contenido */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '5vh 4vw 5vh 2vw',
          gap: 'clamp(8px, 1.4vh, 18px)',
          pointerEvents: 'auto',
          minHeight: 0,
        }}>

          {/* Eyebrow */}
          <p style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 600, letterSpacing: '0.42em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: 0, textAlign: 'right' }}>
            Risus Dental · Buenos Aires
          </p>

          {/* Nombre */}
          <div ref={nameRef} style={{ textAlign: 'right' }}>
            <h2 style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-0.04em', lineHeight: 0.88,
              textShadow: '0 4px 40px rgba(0,0,0,0.3)',
              margin: 0,
            }}>
              {slide.headlineTop}<br/>{slide.headlineBottom}
            </h2>
          </div>

          {/* Subtítulo */}
          <div ref={subtitleRef} style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'inherit', margin: 0 }}>
              <span style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.9rem)',
                fontWeight: 700, letterSpacing: '0.32em',
                textTransform: 'uppercase',
                background: '#EC3B79',
                color: 'white',
                padding: '3px 12px 4px',
                borderRadius: '3px',
                WebkitBoxDecorationBreak: 'clone',
                boxDecorationBreak: 'clone',
              }}>
                {slide.subtitle}
              </span>
            </p>
          </div>

          {/* Separador */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', borderRadius: 1 }} />

          {/* Badges */}
          <div ref={badgesRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end' }}>
            {BADGES.map(badge => (
              <BadgePill key={badge} label={badge} />
            ))}
          </div>

          {/* Bio */}
          <div ref={bioRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '65%', alignSelf: 'flex-end' }}>
            {BIO_PARAS.map((para, i) => (
              <p key={i} style={{
                fontFamily: 'inherit',
                fontSize: 'clamp(0.82rem, 1.05vw, 1rem)',
                lineHeight: 1.75, margin: 0,
                textAlign: 'right',
              }}>
                <span style={{
                  background: 'rgba(8,4,24,0.65)',
                  WebkitBoxDecorationBreak: 'clone',
                  boxDecorationBreak: 'clone',
                  padding: '2px 10px 3px',
                  borderRadius: '3px',
                  color: 'rgba(255,255,255,0.96)',
                  borderRight: '3px solid rgba(236,59,121,0.85)',
                }}>{para}</span>
              </p>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                background: ctaHov ? 'linear-gradient(135deg,#EC3B79,#9B59B6)' : 'white',
                borderRadius: '999px', padding: '18px 48px',
                fontSize: '15px', fontWeight: 800, letterSpacing: '0.2em',
                color: ctaHov ? 'white' : '#EC3B79',
                textTransform: 'uppercase', textDecoration: 'none',
                boxShadow: ctaHov ? '0 12px 40px rgba(236,59,121,0.5)' : '0 8px 32px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              PEDIR TURNO
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke={ctaHov ? 'white' : '#EC3B79'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
