/**
 * ProyectosSlide — Rodrigo's personal projects:
 * Go Smile · Candy Melo · Odontolatam
 */
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

interface Props { active: boolean }

const PROJECTS = [
  {
    name: 'Go Smile',
    tagline: 'Alineadores transparentes',
    description:
      'Sistema de alineadores invisibles desarrollado por Rodrigo Melo. Tratamiento personalizado, cómodo y sin brackets. Diseño digital de tu sonrisa desde el primer día.',
    accent: '#6DD5FA',
    accentDark: '#1E8ED0',
    emoji: '✦',
    url: '/proyectos/go-smile',
  },
  {
    name: 'Candy Melo',
    tagline: 'Dulce con propósito',
    description:
      'Una marca que fusiona el amor por los dulces con la consciencia de la salud bucal. Productos pensados para disfrutar sin culpa, con el respaldo de un odontólogo de verdad.',
    accent: '#FAB0EA',
    accentDark: '#EC3B79',
    emoji: '✿',
    url: '/proyectos/candy-melo',
  },
  {
    name: 'Odontolatam',
    tagline: 'Comunidad odontológica',
    description:
      'Red latinoamericana de odontólogos. Contenido clínico, casos, formación continua y una comunidad que comparte la pasión por la salud bucal en toda la región.',
    accent: '#9B59B6',
    accentDark: '#6c3483',
    emoji: '◈',
    url: '/proyectos/odontolatam',
  },
]

export function ProyectosSlide({ active }: Props) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  // ── Mobile ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '72px 16px 24px',
        gap: 10,
        boxSizing: 'border-box',
      }}>
        {/* Header compacto */}
        <div style={{ flexShrink: 0, paddingBottom: 8 }}>
          <p style={{
            fontFamily: 'inherit', fontSize: '8px', fontWeight: 600,
            letterSpacing: '0.38em', color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', margin: '0 0 6px',
          }}>
            Rodrigo Melo · Proyectos
          </p>
          <h2 style={{
            fontFamily: 'inherit', fontSize: 'clamp(1.7rem,8vw,2.1rem)',
            fontWeight: 900, color: '#fff', letterSpacing: '-0.04em',
            lineHeight: 0.9, margin: 0,
          }}>
            MIS PROYECTOS
          </h2>
        </div>

        {/* Cards — flex:1 dividido en 3 */}
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            onClick={() => navigate(p.url)}
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
              display: 'flex', flexDirection: 'column',
              minHeight: 0,
              cursor: 'pointer',
            }}
          >
            {/* Colored header */}
            <div style={{
              background: `linear-gradient(135deg, ${p.accentDark}, ${p.accent})`,
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{p.emoji}</span>
              <div>
                <h3 style={{
                  fontFamily: 'inherit', fontSize: '1rem', fontWeight: 900,
                  color: 'white', letterSpacing: '-0.02em', margin: '0 0 1px', lineHeight: 1,
                }}>
                  {p.name}
                </h3>
                <p style={{
                  fontFamily: 'inherit', fontSize: '8px', fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)', letterSpacing: '0.14em',
                  textTransform: 'uppercase', margin: 0,
                }}>
                  {p.tagline}
                </p>
              </div>
            </div>
            {/* Body */}
            <div style={{
              flex: 1, background: 'rgba(10,6,30,0.92)',
              padding: '10px 14px 12px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: 0,
            }}>
              <p style={{
                fontFamily: 'inherit', fontSize: '0.75rem', lineHeight: 1.5,
                color: 'rgba(255,255,255,0.70)', margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              } as React.CSSProperties}>
                {p.description}
              </p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: 'inherit', fontSize: '9px', fontWeight: 800,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: p.accent, marginTop: 8, flexShrink: 0,
              }}>
                CONOCER MÁS
                <svg width="9" height="9" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ── Desktop ─────────────────────────────────────────────────────────────────
  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.45s ease' }}
    >
      {/* Headline */}
      <div style={{
        position: 'absolute',
        top: 'clamp(110px,14vh,165px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <p style={{
          fontFamily: 'inherit', fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.42em', color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase', margin: 0,
        }}>
          Rodrigo Melo · Proyectos
        </p>
        <h2 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2.4rem, 4.5vw, 5rem)',
          fontWeight: 900, color: '#fff',
          letterSpacing: '-0.04em', lineHeight: 0.88,
          textShadow: '0 4px 40px rgba(0,0,0,0.3)',
          margin: 0,
        }}>
          MIS PROYECTOS
        </h2>
        <p style={{
          fontFamily: 'inherit', fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
          color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5,
        }}>
          Marcas y comunidades que nacieron de la misma vocación.
        </p>
      </div>

      {/* Cards row */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(100px,20vh,180px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(16px,2vw,28px)',
        pointerEvents: 'auto',
        width: 'clamp(640px, 80vw, 1040px)',
      }}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.name}
            onClick={() => navigate(p.url)}
            style={{
              flex: 1,
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 16px 60px rgba(0,0,0,0.45)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              animationDelay: `${i * 0.08}s`,
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-8px)'
              el.style.boxShadow = `0 28px 80px rgba(0,0,0,0.55), 0 0 40px ${p.accent}33`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 16px 60px rgba(0,0,0,0.45)'
            }}
          >
            {/* Colored header */}
            <div style={{
              background: `linear-gradient(135deg, ${p.accentDark}, ${p.accent})`,
              padding: 'clamp(20px,2.5vh,32px) clamp(20px,2vw,28px)',
              display: 'flex', alignItems: 'flex-start', gap: 16,
            }}>
              <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>
                {p.emoji}
              </span>
              <div>
                <h3 style={{
                  fontFamily: 'inherit',
                  fontSize: 'clamp(1.4rem, 1.9vw, 2rem)',
                  fontWeight: 900, color: 'white',
                  letterSpacing: '-0.03em', margin: '0 0 4px', lineHeight: 1,
                }}>
                  {p.name}
                </h3>
                <p style={{
                  fontFamily: 'inherit', fontSize: '9px', fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)', letterSpacing: '0.16em',
                  textTransform: 'uppercase', margin: 0,
                }}>
                  {p.tagline}
                </p>
              </div>
            </div>

            {/* Body */}
            <div style={{
              flex: 1, background: 'rgba(8,4,22,0.88)',
              padding: 'clamp(16px,2vh,24px) clamp(20px,2vw,28px) clamp(20px,2.5vh,28px)',
              display: 'flex', flexDirection: 'column', gap: 16,
              backdropFilter: 'blur(8px)',
            }}>
              <p style={{
                fontFamily: 'inherit',
                fontSize: 'clamp(0.8rem, 0.95vw, 0.92rem)',
                lineHeight: 1.7, color: 'rgba(255,255,255,0.72)',
                margin: 0, flex: 1,
              }}>
                {p.description}
              </p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'inherit', fontSize: '10px', fontWeight: 800,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: p.accent,
              }}>
                CONOCER MÁS
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
