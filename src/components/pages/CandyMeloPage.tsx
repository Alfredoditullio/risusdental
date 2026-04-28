import { useNavigate } from 'react-router-dom'
import { useNormalPage } from '../../hooks/useNormalPage'

const EXTERNAL_URL = '#'

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
const BG = 'linear-gradient(135deg, #EC3B79 0%, #FAB0EA 22%, #F39C12 48%, #E6F020 72%, #6DD5FA 100%)'

const PILLARS = [
  { emoji: '🍬', title: 'Dulce sin culpa',       desc: 'Productos pensados para disfrutar de forma consciente, con información real sobre su impacto en la salud bucal.' },
  { emoji: '🦷', title: 'Respaldo profesional',   desc: 'Detrás de cada producto y recomendación está el criterio de un odontólogo especializado.' },
  { emoji: '✨', title: 'Un universo creativo',   desc: 'Candy Melo es también una marca visual y emocional que refleja la personalidad auténtica de Rodrigo.' },
  { emoji: '❤️', title: 'Comunidad con valores', desc: 'Una audiencia que comparte disfrute, autocuidado y una sonrisa que cuenta su historia.' },
]

export function CandyMeloPage() {
  const navigate = useNavigate()
  useNormalPage()

  return (
    <div className="normal-page" style={{ fontFamily: 'inherit', background: BG, minHeight: '100svh', color: 'white', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: NOISE, backgroundSize: '128px 128px' }} />

      <style>{`
        @keyframes cm-float { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
        .cm-card:hover  { background: rgba(255,255,255,0.14) !important; border-color: rgba(255,255,255,0.35) !important; transform: translateY(-6px) !important; }
        .cm-card        { transition: background 0.22s, border-color 0.22s, transform 0.22s; }
        .cm-cta:hover   { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(0,0,0,0.5) !important; }
        .cm-back:hover  { background: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* Back */}
      <button className="cm-back" onClick={() => navigate('/')} style={{
        position: 'fixed', top: 24, left: 24, zIndex: 100,
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.3)', borderRadius: 999,
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
        <img src="/golosinas.avif" alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          filter: 'brightness(0.18) saturate(0.6)', mixBlendMode: 'luminosity',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(236,59,121,0.88) 0%, rgba(236,59,121,0.55) 45%, transparent 100%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: 'clamp(110px,15vh,170px) clamp(24px,5vw,80px) clamp(80px,12vh,130px)' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5em', color: '#fff', textTransform: 'uppercase', margin: '0 0 20px', opacity: 0.7 }}>
            Rodrigo Melo · Proyecto
          </p>
          <h1 style={{
            fontSize: 'clamp(4rem, 10vw, 9.5rem)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 0.82, margin: '0 0 20px',
            background: 'linear-gradient(135deg, #fff 0%, #FAB0EA 45%, #E6F020 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            CANDY<br />MELO
          </h1>
          <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg,#FAB0EA,#E6F020)', borderRadius: 2, margin: '0 0 24px' }} />
          <p style={{ fontSize: 'clamp(1rem,1.6vw,1.25rem)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 500, margin: '0 0 44px' }}>
            Una marca que fusiona el amor por lo dulce con la consciencia de la salud bucal. Porque disfrutar y cuidarse no están peleados — y Rodrigo lo demuestra con cada producto.
          </p>
          <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="cm-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'white', borderRadius: 999, padding: '16px 40px',
            fontSize: '11px', fontWeight: 800, letterSpacing: '0.22em',
            color: '#EC3B79', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            transition: 'transform 0.25s, box-shadow 0.25s',
          }}>
            Conocé Candy Melo
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#EC3B79" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><rect x="1" y="1" width="12" height="18" rx="6" stroke="white" strokeWidth="1.3"/><circle cx="7" cy="6" r="2" fill="white"><animate attributeName="cy" values="6;11;6" dur="1.6s" repeatCount="indefinite"/></circle></svg>
        </div>
      </div>

      {/* ── DULCE CON PROPÓSITO ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px,9vh,100px) clamp(20px,5vw,80px)', background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <style>{`
          .cm-concept-wrap {
            max-width: 1100px; margin: 0 auto;
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 72px; align-items: center;
          }
          .cm-concept-img { order: 2; }
          .cm-concept-text { order: 1; }
          @media (max-width: 640px) {
            .cm-concept-wrap {
              grid-template-columns: 1fr;
              gap: 28px;
              max-width: 100%;
            }
            .cm-concept-img  { order: 2; }
            .cm-concept-text { order: 1; }
          }
        `}</style>

        <div className="cm-concept-wrap">
          {/* Texto (siempre arriba en mobile, izquierda en desktop) */}
          <div className="cm-concept-text">
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#FAB0EA', textTransform: 'uppercase', margin: '0 0 12px' }}>El concepto</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 20px', lineHeight: 1.1 }}>Dulce con<br />propósito</h2>
            <p style={{ fontSize: 'clamp(0.92rem,1.2vw,1.05rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: '0 0 28px' }}>
              Candy Melo nació de la misma vocación que lleva a Rodrigo al consultorio cada día: cuidar, conectar y transformar. Pero esta vez desde un lugar más dulce, más personal y más auténtico.
            </p>
            <div style={{ borderLeft: '3px solid #FAB0EA', paddingLeft: 20 }}>
              <p style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)', fontWeight: 600, color: 'white', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 10px' }}>
                "La salud bucal no está peleada con el disfrute. Candy Melo nació para demostrarlo."
              </p>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#FAB0EA', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>— Dr. Rodrigo Melo</p>
            </div>
          </div>

          {/* Imagen (debajo del texto en mobile, derecha en desktop) */}
          <div className="cm-concept-img" style={{ borderRadius: 22, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)', position: 'relative' }}>
            <img src="/golosinas.avif" alt="Candy Melo" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(236,59,121,0.15) 0%, transparent 60%)' }} />
          </div>
        </div>
      </div>

      {/* ── 4 PILARES ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.32)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.44em', color: '#FAB0EA', textTransform: 'uppercase', margin: '0 0 12px' }}>Pilares</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 48px' }}>La esencia de la marca</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20 }}>
            {PILLARS.map(p => (
              <div key={p.title} className="cm-card" style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 20, padding: '32px 28px',
              }}>
                <span style={{ fontSize: '36px', display: 'block', marginBottom: 20, lineHeight: 1, animation: 'cm-float 4s ease-in-out infinite' }}>{p.emoji}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 12px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vh,100px) clamp(24px,5vw,80px)', background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 18px', lineHeight: 1 }}>¿Querés conocer<br />Candy Melo?</h2>
          <p style={{ fontSize: 'clamp(0.95rem,1.3vw,1.1rem)', color: 'rgba(255,255,255,0.55)', margin: '0 0 40px', lineHeight: 1.7 }}>Seguí a Rodrigo en redes y entrá al mundo de Candy Melo — dulce, consciente y auténtico.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer" className="cm-cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', borderRadius: 999, padding: '16px 40px',
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em',
              color: '#EC3B79', textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)', transition: 'transform 0.25s, box-shadow 0.25s',
            }}>
              Ir a Candy Melo
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#EC3B79" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <button onClick={() => navigate('/')} style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 999, padding: '16px 36px', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.18em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.2)'; el.style.color = 'white' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.75)' }}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.12)', padding: '18px 24px', textAlign: 'center', background: 'rgba(0,0,0,0.4)' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Risus Dental · Rodrigo Melo · Recoleta, Buenos Aires</p>
      </div>
    </div>
  )
}
