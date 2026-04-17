import { useState, useEffect } from 'react'
import { WHATSAPP_URL } from '../data/slides'
import { useIsMobile } from '../hooks/useIsMobile'

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
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  // Cierra el menú si rotamos a desktop
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  // Bloquea scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavigate = (idx: number) => {
    setOpen(false)
    onNavigate(idx)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-6"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)' }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavigate(0)}
          className="font-display font-black tracking-tight text-white transition-colors"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)', letterSpacing: '-0.03em' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#EC3B79')}
          onMouseLeave={e => (e.currentTarget.style.color = 'white')}
        >
          RISUS DENTAL<span style={{ color: '#EC3B79' }}>.</span>
        </button>

        {/* Desktop links + CTA */}
        <div className="hidden md:flex items-center gap-8 md:gap-10">
          {NAV_LINKS.map(({ label, idx }) => (
            <button
              key={label}
              onClick={() => handleNavigate(idx)}
              className="font-display font-bold"
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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display font-black uppercase"
            style={{
              fontSize: '0.75rem', letterSpacing: '0.2em',
              background: 'linear-gradient(135deg, #EC3B79, #9B59B6)',
              color: '#fff', borderRadius: '999px', padding: '11px 24px',
              boxShadow: '0 4px 20px rgba(236,59,121,0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.05)'; el.style.boxShadow = '0 6px 28px rgba(236,59,121,0.7)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1)'; el.style.boxShadow = '0 4px 20px rgba(236,59,121,0.5)' }}
          >
            PEDIR TURNO
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Mobile: botón hamburguesa / X */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[6px]"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: 210 }}
        >
          <span style={{
            display: 'block', width: 24, height: 2, background: 'white', borderRadius: 2,
            transition: 'transform 0.25s ease, opacity 0.2s ease',
            transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 24, height: 2, background: 'white', borderRadius: 2,
            transition: 'opacity 0.2s ease',
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 24, height: 2, background: 'white', borderRadius: 2,
            transition: 'transform 0.25s ease, opacity 0.2s ease',
            transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'linear-gradient(160deg, rgba(10,4,28,0.97) 0%, rgba(30,8,50,0.97) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column',
          padding: '100px 32px 48px',
          gap: 0,
          // Animación slide-down
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          opacity: open ? 1 : 0,
          transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Links */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
          {NAV_LINKS.map(({ label, idx }, i) => (
            <button
              key={label}
              onClick={() => handleNavigate(idx)}
              style={{
                fontFamily: 'inherit',
                fontSize: 'clamp(2.4rem, 10vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'white',
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', padding: '10px 0',
                lineHeight: 1,
                borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                transition: 'color 0.2s',
                // Entrada escalonada
                transform: open ? 'translateX(0)' : 'translateX(-32px)',
                opacity: open ? 1 : 0,
                transitionDelay: open ? `${0.12 + i * 0.06}s` : '0s',
              }}
              onTouchStart={e => (e.currentTarget.style.color = '#EC3B79')}
              onTouchEnd={e => (e.currentTarget.style.color = 'white')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA pill */}
        <div
          style={{
            transform: open ? 'translateY(0)' : 'translateY(16px)',
            opacity: open ? 1 : 0,
            transition: 'transform 0.35s ease, opacity 0.3s ease',
            transitionDelay: open ? '0.44s' : '0s',
          }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(135deg, #EC3B79, #9B59B6)',
              color: 'white', borderRadius: '999px',
              padding: '16px 36px',
              fontFamily: 'inherit', fontSize: '13px', fontWeight: 800,
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(236,59,121,0.5)',
              width: '100%', justifyContent: 'center',
            }}
          >
            PEDIR TURNO
            <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
