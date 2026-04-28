import { useNavigate } from 'react-router-dom'
import { useNormalPage } from '../../hooks/useNormalPage'

const EXTERNAL_URL = '#'

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
const BG = 'linear-gradient(135deg, #1a0533 0%, #2d1b69 22%, #1E8ED0 50%, #6DD5FA 75%, #9B59B6 100%)'

const PILLARS = [
  { icon: '📚', title: 'Formación continua',    desc: 'Cursos, webinars y contenido clínico actualizado para odontólogos de todos los niveles y especialidades de la región.' },
  { icon: '🔬', title: 'Casos clínicos reales', desc: 'Intercambio de casos entre colegas de toda Latinoamérica para aprender de la experiencia colectiva de la comunidad.' },
  { icon: '🤝', title: 'Red profesional',        desc: 'Conectá con odontólogos, especialistas y referentes de Argentina, Chile, Uruguay, Brasil, Colombia, México y más.' },
  { icon: '🌎', title: 'Contenido en español',   desc: 'Todo en castellano, con enfoque latinoamericano y perspectiva regional de la salud bucal. Por y para nuestra región.' },
]

const COUNTRIES = ['Argentina', 'Uruguay', 'Chile', 'Brasil', 'Colombia', 'México', 'Perú', 'Paraguay', 'Bolivia', 'Venezuela']

export function OdontolatamPage() {
  const navigate = useNavigate()
  useNormalPage()

  return (
    <div className="normal-page" style={{ fontFamily: 'inherit', background: BG, minHeight: '100svh', color: 'white', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: NOISE, backgroundSize: '128px 128px' }} />

      <style>{`
        .ol-card:hover    { background: rgba(255,255,255,0.14) !important; border-color: rgba(255,255,255,0.3) !important; transform: translateY(-6px) !important; }
        .ol-card          { transition: background 0.22s, border-color 0.22s, transform 0.22s; }
        .ol-country:hover { background: rgba(255,255,255,0.2) !important; border-color: rgba(255,255,255,0.4) !important; color: white !important; }
        .ol-country       { transition: background 0.2s, border-color 0.2s, color 0.2s; }
        .ol-cta:hover     { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(0,0,0,0.5) !important; }
        .ol-back:hover    { background: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* Back */}
      <button className="ol-back" onClick={() => navigate('/')} style={{
        position: 'fixed', top: 24, left: 24, zIndex: 100,
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999,
        padding: '10px 20px', color: 'white', fontSize: '11px',
        fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
        cursor: 'pointer', transition: 'background 0.2s',
      }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M10 7H4M6 4L3 7l3 3" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Volver
      </button>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Grid decorativo */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(26,5,51,0.9) 0%, rgba(26,5,51,0.55) 50%, transparent 100%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: 'clamp(110px,15vh,170px) clamp(24px,5vw,80px) clamp(80px,12vh,130px)' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5em', color: '#c39bd3', textTransform: 'uppercase', margin: '0 0 20px' }}>
            Rodrigo Melo · Cofundador
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 9vw, 8.5rem)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 0.82, margin: '0 0 20px',
            background: 'linear-gradient(135deg, #fff 0%, #c39bd3 40%, #6DD5FA 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            ODONTO<br />LATAM
          </h1>
          <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg,#9B59B6,#6DD5FA)', borderRadius: 2, margin: '0 0 24px' }} />

          {/* Badge cofundador */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(155,89,182,0.25)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(155,89,182,0.5)', borderRadius: 999,
            padding: '10px 22px', marginBottom: 28,
          }}>
            <span style={{ fontSize: '15px' }}>🏆</span>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#c39bd3', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
              Rodrigo Melo — Cofundador
            </p>
          </div>

          <p style={{ fontSize: 'clamp(1rem,1.6vw,1.25rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 520, margin: '0 0 44px', display: 'block' }}>
            La red latinoamericana de odontólogos que Rodrigo cofundó para unir profesionales de toda la región. Formación, casos clínicos y comunidad genuina — en español, para nuestra gente.
          </p>
          <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="ol-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'white', borderRadius: 999, padding: '16px 40px',
            fontSize: '11px', fontWeight: 800, letterSpacing: '0.22em',
            color: '#9B59B6', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            transition: 'transform 0.25s, box-shadow 0.25s',
          }}>
            Sumate a Odontolatam
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#9B59B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.45 }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><rect x="1" y="1" width="12" height="18" rx="6" stroke="white" strokeWidth="1.3"/><circle cx="7" cy="6" r="2" fill="white"><animate attributeName="cy" values="6;11;6" dur="1.6s" repeatCount="indefinite"/></circle></svg>
        </div>
      </div>

      {/* ── QUÉ ES + COFUNDADOR ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px,9vh,100px) clamp(20px,5vw,80px)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <style>{`
          .ol-project-wrap {
            max-width: 1100px; margin: 0 auto;
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 72px; align-items: center;
          }
          @media (max-width: 640px) {
            .ol-project-wrap { grid-template-columns: 1fr; gap: 28px; max-width: 100%; }
          }
        `}</style>
        <div className="ol-project-wrap">
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#c39bd3', textTransform: 'uppercase', margin: '0 0 12px' }}>Sobre el proyecto</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 22px', lineHeight: 1.1 }}>Una red para<br />toda la región</h2>
            <p style={{ fontSize: 'clamp(0.92rem,1.2vw,1.05rem)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, margin: '0 0 20px' }}>
              Odontolatam nació de la convicción de que los odontólogos latinoamericanos merecen un espacio propio: en su idioma, con sus realidades y con la calidez que caracteriza a nuestra región.
            </p>
            <p style={{ fontSize: 'clamp(0.92rem,1.2vw,1.05rem)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, margin: 0 }}>
              Rodrigo Melo, como cofundador, puso en este proyecto la misma energía que define su trabajo clínico: creer que el conocimiento se multiplica cuando se comparte.
            </p>
          </div>

          {/* Card cofundador */}
          <div style={{
            background: 'rgba(155,89,182,0.18)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(155,89,182,0.4)', borderRadius: 24, padding: '40px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,213,250,0.25) 0%, transparent 70%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '52px', marginBottom: 20 }}>🏆</div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.4em', color: '#c39bd3', textTransform: 'uppercase', margin: '0 0 10px' }}>Rol en el proyecto</p>
              <h3 style={{ fontSize: 'clamp(1.6rem,2.8vw,2.2rem)', fontWeight: 900, margin: '0 0 14px', letterSpacing: '-0.03em' }}>Cofundador</h3>
              <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg,#9B59B6,#6DD5FA)', borderRadius: 2, marginBottom: 20 }} />
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Su visión, su red de contactos y su pasión por la educación son parte del ADN de la comunidad desde el día uno.
              </p>
            </div>
          </div>
        </div>{/* ol-project-wrap */}
      </div>

      {/* ── 4 PILARES ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.32)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#c39bd3', textTransform: 'uppercase', margin: '0 0 12px' }}>Pilares</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 48px' }}>¿Qué ofrece<br />la comunidad?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20 }}>
            {PILLARS.map(p => (
              <div key={p.title} className="ol-card" style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '32px 28px',
              }}>
                <span style={{ fontSize: '36px', display: 'block', marginBottom: 20, lineHeight: 1 }}>{p.icon}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 12px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAÍSES ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#c39bd3', textTransform: 'uppercase', margin: '0 0 12px' }}>Alcance</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 44px' }}>Toda Latinoamérica,<br />un solo idioma</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 700, margin: '0 auto' }}>
            {COUNTRIES.map(c => (
              <div key={c} className="ol-country" style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 999, padding: '10px 22px',
                fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.65)',
                cursor: 'default',
              }}>{c}</div>
            ))}
            <div style={{ background: 'rgba(155,89,182,0.2)', border: '1px dashed rgba(155,89,182,0.5)', borderRadius: 999, padding: '10px 22px', fontSize: '13px', fontWeight: 600, color: 'rgba(195,155,211,0.8)' }}>
              + toda la región
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 18px', lineHeight: 1 }}>¿Sos odontólogo?<br />Sumate a la red.</h2>
          <p style={{ fontSize: 'clamp(0.95rem,1.3vw,1.1rem)', color: 'rgba(255,255,255,0.55)', margin: '0 0 40px', lineHeight: 1.7 }}>Una comunidad latinoamericana que crece con cada colega que se suma. Pensada por y para odontólogos.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="ol-cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', borderRadius: 999, padding: '16px 40px',
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em',
              color: '#9B59B6', textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)', transition: 'transform 0.25s, box-shadow 0.25s',
            }}>
              Ir a Odontolatam
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#9B59B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <button onClick={() => navigate('/')} style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 999, padding: '16px 36px', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.18)'; el.style.color = 'white' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.7)' }}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.1)', padding: '18px 24px', textAlign: 'center', background: 'rgba(0,0,0,0.4)' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Risus Dental · Rodrigo Melo · Recoleta, Buenos Aires</p>
      </div>
    </div>
  )
}
