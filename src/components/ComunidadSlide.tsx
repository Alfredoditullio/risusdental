/**
 * ComunidadSlide — Prueba social:
 * Top: [headline + stats (izq)] [reels horizontales (der)]
 * Bottom: marquee de reseñas Google (2 filas)
 */
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useIsMobile } from '../hooks/useIsMobile'

interface Props { active: boolean }

const REVIEWS = [
  { name: 'Valentina M.', initials: 'VM', color: '#EC3B79',
    text: 'Vine con miedo y salí con una sonrisa nueva. Rodrigo tiene una paciencia y calidez únicas. El consultorio es hermoso y uno se siente seguro desde el primer momento.',
    ago: 'hace 2 semanas' },
  { name: 'Lucas B.', initials: 'LB', color: '#1E8ED0',
    text: 'Vine de casualidad y ya no me muevo de acá. Atención de primera y un espacio donde uno se siente cómodo siendo como es. 100% recomendado.',
    ago: 'hace 1 mes' },
  { name: 'Sofi R.', initials: 'SR', color: '#9B59B6',
    text: 'Llevo 8 meses con los alineadores Go Smile y el resultado es impresionante. Rodrigo te acompaña en cada paso y siempre está disponible. Vale cada peso.',
    ago: 'hace 3 semanas' },
  { name: 'Camila T.', initials: 'CT', color: '#00B894',
    text: 'La mejor experiencia que tuve en un consultorio. El ambiente es divino, la atención es cálida y los resultados superaron mis expectativas. ¡Ya no voy a ningún otro!',
    ago: 'hace 5 días' },
  { name: 'Mateo G.', initials: 'MG', color: '#F39C12',
    text: 'Llegué recomendado por un amigo y entiendo por qué. Muy profesional, explicó todo con claridad y el tratamiento fue sin dolor. El consultorio tiene una onda increíble.',
    ago: 'hace 2 meses' },
  { name: 'Julieta P.', initials: 'JP', color: '#E17055',
    text: 'Rodrigo es un genio. Me hice el diseño de sonrisa y quedé fascinada. El equipo es súper amable y el lugar tiene una energía muy especial. Lo recomiendo sin dudarlo.',
    ago: 'hace 1 semana' },
]


const ROW1 = [...REVIEWS.slice(0, 3), ...REVIEWS.slice(0, 3)]
const ROW2 = [...REVIEWS.slice(3),    ...REVIEWS.slice(3)]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 13 13" fill="#F39C12">
          <path d="M6.5 1l1.5 3.1L11.5 4.6l-2.5 2.4.6 3.4L6.5 9 3.4 10.4l.6-3.4L1.5 4.6l3.5-.5z"/>
        </svg>
      ))}
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.55 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <div style={{
      width: 'clamp(260px, 26vw, 360px)',
      flexShrink: 0,
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '16px',
      padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: '9px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
            background: r.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 800, color: 'white', fontFamily: 'inherit',
          }}>
            {r.initials}
          </div>
          <div>
            <p style={{ fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1 }}>{r.name}</p>
            <p style={{ fontFamily: 'inherit', fontSize: '10px', color: 'rgba(255,255,255,0.38)', margin: '3px 0 0' }}>{r.ago}</p>
          </div>
        </div>
        <GoogleLogo />
      </div>
      <Stars />
      <p style={{
        fontFamily: 'inherit', fontSize: '13px', lineHeight: 1.6,
        color: 'rgba(255,255,255,0.82)', margin: 0,
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {r.text}
      </p>
    </div>
  )
}

export function ComunidadSlide({ active }: Props) {
  const isMobile     = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const entryTl      = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    entryTl.current?.kill()
    const tl = gsap.timeline()
    entryTl.current = tl

    if (active) {
      gsap.set(containerRef.current, { y: 28, opacity: 0 })
      tl.to(containerRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'expo.out' })
    } else {
      tl.to(containerRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' })
    }
    return () => { entryTl.current?.kill() }
  }, [active])

  const marqueeState = active ? 'running' : 'paused'

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>
        <style>{`
          @keyframes marquee-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .marquee-track-m { display: flex; gap: 10px; width: max-content; }
        `}</style>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          padding: '68px 0 72px',
          gap: 'clamp(10px,2vh,18px)',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.45s ease',
          pointerEvents: 'auto',
        }}>
          {/* Headline + stats */}
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontFamily: 'inherit', fontSize: '9px', fontWeight: 600, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: 0 }}>
              Risus Dental · Google Reviews
            </p>
            <h2 style={{ fontFamily: 'inherit', fontSize: 'clamp(2.2rem,10vw,3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.88, margin: 0 }}>
              LO DICEN<br/>ELLOS
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {[{ value: '+11K', label: 'seguidores' }, { value: '5.0★', label: 'en Google' }, { value: '100%', label: 'recomiendan' }].map(stat => (
                <div key={stat.label}>
                  <p style={{ fontFamily: 'inherit', fontSize: 'clamp(1rem,4vw,1.2rem)', fontWeight: 900, color: '#EC3B79', margin: 0, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontFamily: 'inherit', fontSize: '9px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Two marquee rows — compact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
            {[{ row: ROW1, dir: 'marquee-left', dur: '28s' }, { row: ROW2, dir: 'marquee-left', dur: '36s' }].map(({ row, dir, dur }, ri) => (
              <div key={ri} style={{
                overflow: 'hidden',
                maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
              }}>
                <div className="marquee-track-m" style={{ animation: `${dir} ${dur} linear infinite ${marqueeState}` }}>
                  {row.map((r, i) => (
                    <div key={i} style={{
                      width: 'clamp(220px,72vw,280px)', flexShrink: 0,
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 14, padding: '12px 14px',
                      display: 'flex', flexDirection: 'column', gap: 7,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: 'white', fontFamily: 'inherit', flexShrink: 0 }}>{r.initials}</div>
                          <div>
                            <p style={{ fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1 }}>{r.name}</p>
                            <p style={{ fontFamily: 'inherit', fontSize: '9px', color: 'rgba(255,255,255,0.38)', margin: '2px 0 0' }}>{r.ago}</p>
                          </div>
                        </div>
                        <GoogleLogo />
                      </div>
                      <Stars />
                      <p style={{ fontFamily: 'inherit', fontSize: '12px', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .marquee-track { display: flex; gap: 12px; width: max-content; }
        .marquee-row:hover .marquee-track { animation-play-state: paused !important; }
      `}</style>

      <div
        ref={containerRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          padding: 'clamp(72px,9vh,108px) clamp(24px,4vw,56px) clamp(20px,3vh,36px)',
          gap: 'clamp(10px,1.2vh,16px)',
          pointerEvents: 'auto',
          opacity: 0,
        }}
      >

        {/* ── Headline + stats ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 600, letterSpacing: '0.42em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: 0 }}>
              Risus Dental · Google Reviews
            </p>
            <h2 style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(2.4rem, 4.5vw, 5rem)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-0.04em', lineHeight: 0.88,
              textShadow: '0 4px 40px rgba(0,0,0,0.3)',
              margin: 0,
            }}>
              LO DICEN<br/>ELLOS
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {[
                { value: '+11K', label: 'seguidores' },
                { value: '5.0★', label: 'en Google' },
                { value: '100%', label: 'recomiendan' },
              ].map(stat => (
                <div key={stat.label}>
                  <p style={{ fontFamily: 'inherit', fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', fontWeight: 900, color: '#EC3B79', margin: 0, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontFamily: 'inherit', fontSize: '9px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rodrigo apuntando a las cards */}
          <img
            src="/rodrigo_comunidad_nobg.png"
            alt="Rodrigo"
            style={{
              position: 'absolute',
              left: '36%',
              transform: 'translateX(-50%)',
              bottom: '-60px',
              height: 'clamp(300px,50vh,540px)',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.4))',
              zIndex: 0,
              maskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 88%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 88%)',
            }}
          />
        </div>

        {/* ── Marquee rows ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0, paddingBottom: 'clamp(8px,1.5vh,18px)', position: 'relative', zIndex: 2 }}>

          <div className="marquee-row" style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}>
            <div className="marquee-track"
              style={{ animation: `marquee-left 34s linear infinite ${marqueeState}` }}>
              {ROW1.map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          </div>

          <div className="marquee-row" style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}>
            <div className="marquee-track"
              style={{ animation: `marquee-right 40s linear infinite ${marqueeState}` }}>
              {ROW2.map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
