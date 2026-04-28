import { useNavigate } from 'react-router-dom'
import { useNormalPage } from '../../hooks/useNormalPage'

const EXTERNAL_URL = '#'

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
const BG = 'linear-gradient(135deg, #0f2a4a 0%, #1E8ED0 28%, #6DD5FA 52%, #9B59B6 76%, #EC3B79 100%)'

const STEPS = [
  { num: '01', title: 'Consulta inicial',  desc: 'Evaluación personalizada con Rodrigo para analizar tu caso y definir el plan de tratamiento ideal.' },
  { num: '02', title: 'Diseño digital',    desc: 'Escaneamos tu dentadura y simulamos el resultado final antes de empezar — ves tu sonrisa primero.' },
  { num: '03', title: 'Tus alineadores',   desc: 'Recibís tus placas 100% personalizadas y las cambiás según las etapas, sin visitas constantes.' },
  { num: '04', title: 'Sonrisa perfecta',  desc: 'Controles periódicos hasta alcanzar el resultado planificado. Sin sorpresas, con seguimiento real.' },
]

const FEATURES = [
  'Alineadores 100% transparentes — prácticamente invisibles',
  'Removibles: comés y te cepillás con total normalidad',
  'Simulación digital del resultado antes de empezar',
  'Desarrollado y supervisado por el Dr. Rodrigo Melo',
  'Para adolescentes y adultos — todos los casos',
  'Sin el discomfort de los brackets tradicionales',
]

export function GoSmilePage() {
  const navigate = useNavigate()
  useNormalPage()

  return (
    <div className="normal-page" style={{ fontFamily: 'inherit', background: BG, minHeight: '100svh', color: 'white', position: 'relative' }}>
      {/* Noise overlay — igual que la landing */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: NOISE, backgroundSize: '128px 128px' }} />

      <style>{`
        .gs-step:hover  { background: rgba(109,213,250,0.12) !important; border-color: rgba(109,213,250,0.35) !important; }
        .gs-step:hover .gs-num { color: rgba(109,213,250,0.6) !important; }
        .gs-feat:hover  { background: rgba(255,255,255,0.12) !important; border-color: rgba(109,213,250,0.4) !important; transform: translateX(4px); }
        .gs-cta:hover   { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(30,142,208,0.7) !important; }
        .gs-back:hover  { background: rgba(255,255,255,0.2) !important; }
        .gs-feat        { transition: background 0.2s, border-color 0.2s, transform 0.2s; }
        .gs-step        { transition: background 0.2s, border-color 0.2s; }
      `}</style>

      {/* Back */}
      <button className="gs-back" onClick={() => navigate('/')} style={{
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
        {/* Imagen oscurecida detrás */}
        <img src="/ALINEADORES-INVISIBLES.jpg" alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          filter: 'brightness(0.18) saturate(0.8)',
          mixBlendMode: 'luminosity',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(15,42,74,0.92) 0%, rgba(15,42,74,0.6) 50%, transparent 100%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: 'clamp(110px,15vh,170px) clamp(24px,5vw,80px) clamp(80px,12vh,130px)' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5em', color: '#6DD5FA', textTransform: 'uppercase', margin: '0 0 20px' }}>
            Rodrigo Melo · Proyecto
          </p>
          <h1 style={{
            fontSize: 'clamp(4.5rem, 11vw, 10rem)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 0.82, margin: '0 0 20px',
            background: 'linear-gradient(135deg, #fff 0%, #6DD5FA 50%, #FAB0EA 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>GO<br />SMILE</h1>
          <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg,#6DD5FA,#EC3B79)', borderRadius: 2, margin: '0 0 24px' }} />
          <p style={{ fontSize: 'clamp(1rem,1.6vw,1.25rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 500, margin: '0 0 44px' }}>
            La línea de alineadores invisibles creada por Rodrigo Melo. Ortodoncia de alta precisión, sin brackets — para que tu sonrisa sea tuya desde el primer día.
          </p>
          <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="gs-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'white', borderRadius: 999, padding: '16px 40px',
            fontSize: '11px', fontWeight: 800, letterSpacing: '0.22em',
            color: '#1E8ED0', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            transition: 'transform 0.25s, box-shadow 0.25s',
          }}>
            Conocé Go Smile
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#1E8ED0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.45 }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><rect x="1" y="1" width="12" height="18" rx="6" stroke="white" strokeWidth="1.3"/><circle cx="7" cy="6" r="2" fill="white"><animate attributeName="cy" values="6;11;6" dur="1.6s" repeatCount="indefinite"/></circle></svg>
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#6DD5FA', textTransform: 'uppercase', margin: '0 0 12px' }}>Proceso</p>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 52px' }}>¿Cómo funciona?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
            {STEPS.map(s => (
              <div key={s.num} className="gs-step" style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: '30px 26px',
              }}>
                <p className="gs-num" style={{ fontSize: 'clamp(2.8rem,5vw,4rem)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-0.06em', lineHeight: 1, margin: '0 0 18px', transition: 'color 0.2s' }}>{s.num}</p>
                <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 10px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── IMAGEN + FEATURES ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(48px,8vh,100px) clamp(20px,5vw,80px)', background: 'rgba(0,0,0,0.32)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Imagen — solo desktop */}
          <div style={{ display: 'grid', gridTemplateColumns: 'var(--gs-cols, 1fr 1fr)', gap: 64, alignItems: 'center' }}>
            <style>{`
              @media (max-width: 640px) {
                .gs-img-col { display: none !important; }
                :root { --gs-cols: 1fr; }
              }
            `}</style>
            <div className="gs-img-col" style={{ borderRadius: 22, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative' }}>
              <img src="/ALINEADORES-INVISIBLES.jpg" alt="Go Smile" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,142,208,0.2) 0%, transparent 60%)' }} />
            </div>

            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#6DD5FA', textTransform: 'uppercase', margin: '0 0 12px' }}>Ventajas</p>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 28px', lineHeight: 1.1 }}>Por qué elegir<br />Go Smile</h2>

              {/* Grid 2 col en mobile, lista en desktop */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {FEATURES.map((f, i) => (
                  <div key={i} className="gs-feat" style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: '12px 14px',
                  }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#6DD5FA,#EC3B79)', flexShrink: 0, marginTop: 4 }} />
                    <p style={{ fontSize: 'clamp(11px,1.1vw,13px)', color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.45 }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 18px', lineHeight: 1 }}>¿Listo para tu<br />nueva sonrisa?</h2>
          <p style={{ fontSize: 'clamp(0.95rem,1.3vw,1.1rem)', color: 'rgba(255,255,255,0.55)', margin: '0 0 40px', lineHeight: 1.7 }}>Consultá sin cargo. Rodrigo te explica si sos candidato y cómo sería tu tratamiento.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="gs-cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', borderRadius: 999, padding: '16px 40px',
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em',
              color: '#1E8ED0', textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)', transition: 'transform 0.25s, box-shadow 0.25s',
            }}>
              Ir a Go Smile
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#1E8ED0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <button onClick={() => navigate('/')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
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
