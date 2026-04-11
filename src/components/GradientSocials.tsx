/**
 * GradientSocials — pill menu estilo 21st.dev/thanh.
 * Al hacer hover cada pill se expande con glow degradado y muestra el nombre.
 */
import { useState } from 'react'
import { FaInstagram, FaTiktok, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import { MdOutlineSentimentSatisfiedAlt } from 'react-icons/md'

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
    from: '#f09433',
    to:   '#cc2366',
    icon: <FaInstagram size={20} />,
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@risus.dental',
    from: '#69C9D0',
    to:   '#EE1D52',
    icon: <FaTiktok size={18} />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5491100000000?text=Hola%20Rodrigo!',
    from: '#25D366',
    to:   '#128C7E',
    icon: <FaWhatsapp size={20} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rodrigomelo',
    from: '#0077B5',
    to:   '#00A0DC',
    icon: <FaLinkedinIn size={19} />,
  },
  {
    label: 'Go Smile',
    href: 'https://gosmile.com.ar',
    from: '#a855f7',
    to:   '#EC3B79',
    icon: <MdOutlineSentimentSatisfiedAlt size={22} />,
  },
]

export function GradientSocials() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <ul style={{
      display: 'flex',
      flexWrap: 'nowrap',
      gap: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    }}>
      {SOCIALS.map((item, idx) => {
        const isHov = hovered === idx
        return (
          <li key={idx} style={{ position: 'relative' }}>

            {/* Glow blur layer */}
            <span style={{
              position: 'absolute',
              inset: 0,
              top: '10px',
              borderRadius: '999px',
              background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
              filter: 'blur(14px)',
              opacity: isHov ? 0.6 : 0,
              transition: 'opacity 0.45s ease',
              zIndex: -1,
              pointerEvents: 'none',
            }} />

            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: isHov ? 'flex-start' : 'center',
                gap: '9px',
                paddingLeft: isHov ? '14px' : '0',
                paddingRight: isHov ? '18px' : '0',
                width: isHov ? '148px' : '44px',
                height: '44px',
                borderRadius: '999px',
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'width 0.45s cubic-bezier(0.34,1.56,0.64,1), padding 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {/* Glassmorphism base */}
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                opacity: isHov ? 0 : 1,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }} />

              {/* Gradient fill */}
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '999px',
                background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
                opacity: isHov ? 1 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <span style={{
                position: 'relative',
                zIndex: 1,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                lineHeight: 0,
                marginLeft: isHov ? '0' : 'auto',
                marginRight: isHov ? '0' : 'auto',
                transition: 'margin 0.3s ease',
              }}>
                {item.icon}
              </span>

              {/* Label */}
              <span style={{
                position: 'relative',
                zIndex: 1,
                color: 'white',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                opacity: isHov ? 1 : 0,
                transform: isHov ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity 0.25s ease 0.12s, transform 0.25s ease 0.12s',
                pointerEvents: 'none',
                fontFamily: 'inherit',
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
