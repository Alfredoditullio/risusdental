import { WHATSAPP_URL } from '../data/slides'

interface NavProps {
  onNavigate: (index: number) => void
}

const NAV_LINKS = [
  { label: 'NOSOTROS',  idx: 1 },
  { label: 'SERVICIOS', idx: 2 },
  { label: 'GALERÍA',   idx: 3 },
  { label: 'COMUNIDAD', idx: 4 },
  { label: 'CONTACTO',  idx: 5 },
]

export function Nav({ onNavigate }: NavProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 md:px-12 md:py-6"
      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)' }}
    >
      {/* Logo */}
      <button
        onClick={() => onNavigate(0)}
        className="font-display font-black tracking-tight text-white transition-colors"
        style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', letterSpacing: '-0.03em' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#EC3B79')}
        onMouseLeave={e => (e.currentTarget.style.color = 'white')}
      >
        RISUS DENTAL<span style={{ color: '#EC3B79' }}>.</span>
      </button>

      {/* Links + CTA */}
      <div className="flex items-center gap-8 md:gap-10">
        {NAV_LINKS.map(({ label, idx }) => (
          <button
            key={label}
            onClick={() => onNavigate(idx)}
            className="font-display font-bold hidden md:block"
            style={{
              fontSize: '0.9rem', letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.92)',
              transition: 'color 0.2s',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              textShadow: '0 1px 4px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.textShadow = '0 1px 8px rgba(0,0,0,0.9), 0 0 24px rgba(236,59,121,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.92)'
              e.currentTarget.style.textShadow = '0 1px 4px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
            }}
          >
            {label}
          </button>
        ))}

        {/* CTA pill */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 font-display font-black uppercase"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            background: 'linear-gradient(135deg, #EC3B79, #9B59B6)',
            color: '#fff',
            borderRadius: '999px',
            padding: '11px 24px',
            boxShadow: '0 4px 20px rgba(236,59,121,0.5)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'scale(1.05)'
            el.style.boxShadow = '0 6px 28px rgba(236,59,121,0.7)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = 'scale(1)'
            el.style.boxShadow = '0 4px 20px rgba(236,59,121,0.5)'
          }}
        >
          PEDIR TURNO
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </nav>
  )
}
