/**
 * NosotrosSlide — Layout editorial: foto sin fondo sangrando al borde,
 * tipografía gigante de fondo, badges de credenciales, bio limpia.
 */
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { WHATSAPP_URL } from '../data/slides'
import { slides } from '../data/slides'
import { GradientSocials } from './GradientSocials'

interface Props { active: boolean }

const slide     = slides[1]   // Nosotros
const BADGES    = ['UBA', 'Ortodoncia', 'Estética Facial', 'Go Smile™', 'Docente', '🛼 Skater']
const BIO_PARAS = (slide.bio ?? '').split('\n\n')

export function NosotrosSlide({ active }: Props) {
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
  }, [active])

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

      {/* ── Foto editorial — sangra abajo, sin marco ───────────────── */}
      <div style={{ position: 'absolute', left: 0, bottom: 0, height: '96%', width: 'clamp(280px, 38vw, 520px)', pointerEvents: 'none' }}>
        <img
          ref={photoRef}
          src="/rodrigo_editorial.webp"
          alt="Rodrigo Melo"
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'bottom left',
            display: 'block',
            filter: 'drop-shadow(20px 0 60px rgba(0,0,0,0.45))',
          }}
        />
        {/* Matrícula badge — sobre la foto abajo */}
        <div ref={matricRef} style={{
          position: 'absolute', bottom: '4%', left: '18%',
          background: 'rgba(10,6,30,0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '999px',
          padding: '8px 20px',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EC3B79', display: 'block', boxShadow: '0 0 8px #EC3B79' }}/>
          <span style={{ fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, color: 'white', letterSpacing: '0.08em' }}>
            {slide.matricula}
          </span>
        </div>
      </div>

      {/* ── Contenido derecho ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        right: 'clamp(24px, 4vw, 72px)',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(300px, 48vw, 680px)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(10px, 1.8vh, 22px)',
        pointerEvents: 'auto',
      }}>

        {/* Eyebrow */}
        <p style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 600, letterSpacing: '0.42em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: 0, textAlign: 'right' }}>
          Risus Dental · Buenos Aires
        </p>

        {/* Nombre */}
        <div ref={nameRef} style={{ textAlign: 'right' }}>
          <h2 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
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
          <p style={{
            fontFamily: 'inherit', fontSize: 'clamp(0.7rem, 1.1vw, 1rem)',
            fontWeight: 600, letterSpacing: '0.32em',
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase', margin: 0,
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Separador */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', borderRadius: 1, alignSelf: 'stretch' }} />

        {/* Badges de credenciales */}
        <div ref={badgesRef} style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end',
        }}>
          {BADGES.map(badge => (
            <span key={badge} style={{
              fontFamily: 'inherit',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.9)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px',
              padding: '6px 14px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div ref={bioRef} style={{
          display: 'flex', flexDirection: 'column', gap: '10px',
          maxHeight: 'clamp(100px, 22vh, 200px)',
          overflowY: 'auto',
        }}>
          {BIO_PARAS.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75, margin: 0,
              textAlign: 'right',
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'white', borderRadius: '999px', padding: '14px 32px',
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
      </div>

      {/* ── Social pills — centradas abajo ────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(18px, 3.5vh, 36px)',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'auto',
      }}>
        <GradientSocials />
      </div>
    </div>
  )
}
