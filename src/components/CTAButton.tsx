import { WHATSAPP_URL } from '../data/slides'

interface CTAButtonProps {
  text: string
  className?: string
}

export function CTAButton({ text, className = '' }: CTAButtonProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 font-display font-black uppercase select-none cursor-pointer ${className}`}
      style={{
        fontSize: '0.75rem',
        letterSpacing: '0.22em',
        background: 'white',
        borderRadius: '999px',
        padding: '15px 34px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)',
        border: 'none',
        transition: 'transform 0.22s, box-shadow 0.22s, background 0.22s',
        whiteSpace: 'nowrap',
        color: '#EC3B79',          // rosa por defecto — contrasta sobre todo fondo
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'scale(1.06) translateY(-2px)'
        el.style.boxShadow = '0 16px 44px rgba(0,0,0,0.4)'
        el.style.background = 'linear-gradient(135deg, #EC3B79, #9B59B6)'
        el.style.color = 'white'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'scale(1) translateY(0)'
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)'
        el.style.background = 'white'
        el.style.color = '#EC3B79'
      }}
    >
      {text}
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  )
}
