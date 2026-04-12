/**
 * GradientSocials — pill menu estilo 21st.dev/thanh.
 * SVGs inline — sin dependencias externas.
 */
import { useState } from 'react'

interface SocialItem {
  label: string
  href: string
  from: string
  to: string
  icon: React.ReactNode
}

const SOCIALS: SocialItem[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/risus.dental',
    from: '#f09433', to: '#cc2366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@risus.dental',
    from: '#69C9D0', to: '#EE1D52',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.74a8.18 8.18 0 0 0 4.78 1.52V6.8a4.85 4.85 0 0 1-1.01-.11z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5491100000000',
    from: '#25D366', to: '#128C7E',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rodrigomelo',
    from: '#0077B5', to: '#00A0DC',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Go Smile',
    href: 'https://gosmile.com.ar',
    from: '#a855f7', to: '#EC3B79',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3"/>
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3"/>
      </svg>
    ),
  },
]

export function GradientSocials() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <ul style={{
      display: 'flex', flexWrap: 'nowrap', gap: '10px',
      justifyContent: 'center', alignItems: 'center',
      listStyle: 'none', margin: 0, padding: 0,
    }}>
      {SOCIALS.map((item, idx) => {
        const isHov = hovered === idx
        return (
          <li key={idx} style={{ position: 'relative' }}>
            {/* Glow */}
            <span style={{
              position: 'absolute', inset: 0, top: '10px',
              borderRadius: '999px',
              background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
              filter: 'blur(14px)',
              opacity: isHov ? 0.6 : 0,
              transition: 'opacity 0.4s ease',
              zIndex: -1, pointerEvents: 'none',
            }} />

            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                display: 'inline-flex', alignItems: 'center',
                width: isHov ? '148px' : '44px',
                height: '44px',
                borderRadius: '999px',
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'width 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'pointer', flexShrink: 0,
              }}
            >
              {/* Glass base */}
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '999px',
                background: 'rgba(15,10,40,0.55)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                ...(isHov ? {} : {}),
                opacity: isHov ? 0 : 1,
                transition: 'opacity 0.3s ease', pointerEvents: 'none',
              }} />

              {/* Gradient fill */}
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '999px',
                background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
                opacity: isHov ? 1 : 0,
                transition: 'opacity 0.3s ease', pointerEvents: 'none',
              }} />

              {/* Icon — siempre centrado, absoluto */}
              <span style={{
                position: 'absolute',
                left: 0, top: 0,
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2, color: 'white', lineHeight: 0, flexShrink: 0,
                transition: 'opacity 0.2s ease',
              }}>
                {item.icon}
              </span>

              {/* Label — aparece al expandir */}
              <span style={{
                position: 'relative', zIndex: 1,
                marginLeft: '44px',
                color: 'white', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                opacity: isHov ? 1 : 0,
                transform: isHov ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity 0.25s ease 0.1s, transform 0.25s ease 0.1s',
                pointerEvents: 'none',
              }}>
                {item.label}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
