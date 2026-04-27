/**
 * GallerySlide — Portfolio Gallery estilo "Browse my library"
 * Cards horizontales en la base, escalonadas en arco, hover sube la card.
 * Click → lightbox con foto + testimonio.
 * Mobile → scrollable 2-col grid + lightbox vertical.
 */
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

interface Testimonial {
  quote: string
  name: string
  designation: string
  src: string
  tag: string
}

interface Props { active: boolean }

const ITEMS: Testimonial[] = [
  {
    quote: 'Hacía años que no me animaba a sonreír en fotos. Rodrigo me dio la confianza que necesitaba. El resultado superó todas mis expectativas.',
    name: 'Valentina R.', designation: 'Ortodoncia + Blanqueamiento', tag: 'Antes / Después',
    src: '/gallery/192ED7D2-539B-4541-90E9-4C62CE36508E.JPG',
  },
  {
    quote: 'Vine buscando un espacio donde me sintiera cómodo siendo yo mismo. Risus Dental es un lugar sin juicios, con atención de primera.',
    name: 'Mateo G.', designation: 'Estética Dental', tag: 'Estética',
    src: '/gallery/1E879776-12AE-4C4B-B136-0F683A255FAF.JPG',
  },
  {
    quote: 'Me hice los alineadores Go Smile y cambió mi vida. Rodrigo te explica todo y los resultados son increíbles.',
    name: 'Lucía M.', designation: 'Go Smile Alineadores', tag: 'Alineadores',
    src: '/gallery/209B686B-A1C1-4C10-9165-140E01570343.JPG',
  },
  {
    quote: 'Llegué con miedo al dentista y salí con una sonrisa nueva. La atención es cálida, profesional y el espacio es divino.',
    name: 'Camila T.', designation: 'Control + Limpieza', tag: 'Consultorio',
    src: '/gallery/2DEFFDDF-7F21-4A67-9E31-CC2963BD8FD8.JPG',
  },
  {
    quote: 'Rodrigo tiene una habilidad única para que te sientas tranquilo. Vine por una consulta y me quedé por toda la familia.',
    name: 'Sebastián F.', designation: 'Brackets Autoligado', tag: 'Brackets',
    src: '/gallery/4AFCA468-8FA3-4ED6-93F7-AB891174CD4C.JPG',
  },
  {
    quote: 'Nunca pensé que ir al dentista podía ser tan agradable. Salí con otra cara y con ganas de volver.',
    name: 'Florencia S.', designation: 'Diseño de Sonrisa', tag: 'Diseño',
    src: '/gallery/54338861-6CDD-4B83-B6A0-E2E11F02A630.JPG',
  },
  {
    quote: 'En la primera visita ya me sentí en el lugar correcto. El consultorio es increíble y Rodrigo explica todo con claridad.',
    name: 'Tomás V.', designation: 'Go Smile Alineadores', tag: 'Alineadores',
    src: '/gallery/62A5FEED-E380-45F7-92BE-165719B5FA0A.JPG',
  },
  {
    quote: 'El espacio es divino, la atención es cálida y los resultados son increíbles. No me voy a ningún otro lado.',
    name: 'Agustina P.', designation: 'Ortodoncia', tag: 'Ortodoncia',
    src: '/gallery/66F0762E-958B-4079-985B-3348D16A867E.JPG',
  },
  {
    quote: 'Rodrigo hace que todo sea fácil. Muy profesional, muy humano. Los resultados hablan solos.',
    name: 'Nicolás M.', designation: 'Brackets Autoligado', tag: 'Brackets',
    src: '/gallery/78172AF3-0D85-4276-988F-2AD958FC6846.JPG',
  },
  {
    quote: 'Todo fue impecable desde la primera consulta. El consultorio tiene una energía muy especial.',
    name: 'Julieta R.', designation: 'Estética Facial', tag: 'Facial',
    src: '/gallery/79F2BAB0-6FF2-4615-8624-1BDB4840B6B7.JPG',
  },
]

const TOTAL   = ITEMS.length
const CENTER  = (TOTAL - 1) / 2   // 4.5
const CARD_W  = 185
const CARD_H  = 275
const OVERLAP = 55   // how much cards overlap each other

export function GallerySlide({ active }: Props) {
  const isMobile = useIsMobile()
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const handleClose = useCallback(() => setSelected(null), [])

  // For each card: rotateY and translateY based on distance from center
  function getTransform(i: number, isHov: boolean) {
    const dist     = i - CENTER                  // -4.5 … +4.5
    const rotateY  = dist * 7                    // degrees, outer cards tilt more
    const arcY     = (CENTER - Math.abs(dist)) * 32  // px, center cards sit lower
    const liftY    = isHov ? -180 : 0
    return { rotateY, translateY: arcY + liftY }
  }

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%', paddingTop: 80, paddingBottom: 48 }}>

        {/* Intro text */}
        <div style={{ padding: '0 20px 24px' }}>
          <p style={{
            fontFamily: 'inherit', fontSize: '9px', fontWeight: 600,
            letterSpacing: '0.38em', color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', margin: '0 0 8px',
          }}>
            Risus Dental · Galería
          </p>
          <h2 style={{
            fontFamily: 'inherit', fontSize: 'clamp(2rem,9vw,2.6rem)',
            fontWeight: 900, color: '#fff', letterSpacing: '-0.04em',
            lineHeight: 0.9, margin: '0 0 12px',
          }}>
            SONRISAS<br />REALES
          </h2>
          <p style={{
            fontFamily: 'inherit', fontSize: '0.82rem', lineHeight: 1.55,
            color: 'rgba(255,255,255,0.5)', margin: 0,
          }}>
            Casos reales de pacientes. Tocá cualquier foto para ver el testimonio.
          </p>
        </div>

        {/* 2-column photo grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          padding: '0 16px',
        }}>
          {ITEMS.map((item, i) => (
            <div
              key={item.src}
              onClick={() => setSelected(i)}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
              }}
            >
              <img
                src={item.src} alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                <p style={{ fontFamily: 'inherit', fontSize: '11px', fontWeight: 800, color: 'white', margin: '0 0 3px', lineHeight: 1.1 }}>{item.name}</p>
                <p style={{ fontFamily: 'inherit', fontSize: '8px', fontWeight: 700, color: '#EC3B79', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.tag}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Lightbox — position: fixed so it covers full viewport when scrolled */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={handleClose}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 300, padding: '0 16px',
              }}
            >
              {/* Card flotante — NOT full screen, background visible around it */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1,    y: 0 }}
                exit={{    opacity: 0, scale: 0.94,  y: 16 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={e => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxHeight: '82vh',
                  borderRadius: 22,
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.75)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Photo */}
                <div style={{ flex: '0 0 48%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={ITEMS[selected].src} alt={ITEMS[selected].name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                  {/* Close button on photo */}
                  <button
                    onClick={handleClose}
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      width: 34, height: 34, borderRadius: '50%', border: 'none',
                      background: 'rgba(0,0,0,0.52)',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  padding: '16px 20px 20px', gap: 10,
                  background: 'rgba(10,6,30,0.97)',
                  overflowY: 'auto',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'inherit', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#EC3B79', color: 'white', borderRadius: '999px', padding: '3px 10px' }}>
                      {ITEMS[selected].tag}
                    </span>
                    <span style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>
                      {String(selected + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'inherit', fontSize: '1.35rem', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
                    {ITEMS[selected].name}
                  </h3>
                  <p style={{ fontFamily: 'inherit', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                    {ITEMS[selected].designation}
                  </p>
                  <p style={{ fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', margin: 0 }}>
                    "{ITEMS[selected].quote}"
                  </p>
                  {/* Prev / Next */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    {([[-1, 'M10 3L5 8l5 5'], [1, 'M6 3l5 5-5 5']] as const).map(([dir, path]) => (
                      <button
                        key={String(dir)}
                        onClick={() => setSelected((selected + Number(dir) + TOTAL) % TOTAL)}
                        style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <path d={path} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>

      {/* ── Headline ── */}
      <div style={{
        position: 'absolute',
        top: 'clamp(110px,14vh,160px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'inherit', fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.42em', color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase', margin: 0,
        }}>
          Risus Dental · Galería
        </p>
        <h2 style={{
          fontFamily: 'inherit',
          fontSize: 'clamp(2.4rem, 4.5vw, 5rem)',
          fontWeight: 900, color: '#fff',
          letterSpacing: '-0.04em', lineHeight: 0.88,
          textShadow: '0 4px 40px rgba(0,0,0,0.3)',
          margin: 0,
        }}>
          SONRISAS REALES
        </h2>
        <p style={{
          fontFamily: 'inherit', fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
          color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5,
        }}>
          Casos reales de pacientes · hover para ver · click para leer
        </p>
      </div>

      {/* ── Card fan row ── */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(193px,calc(12vh + 113px),253px)',
        left: 0, right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        perspective: '1200px',
        perspectiveOrigin: '50% 100%',
        pointerEvents: 'auto',
        // extra bottom padding so cards are partially cropped at bottom = natural feel
        paddingBottom: 0,
      }}>
        {ITEMS.map((item, i) => {
          const isHov  = hovered === i
          const { rotateY, translateY } = getTransform(i, isHov)

          return (
            <motion.div
              key={item.src}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(i)}
              animate={{
                y: translateY,
                rotateY,
                scale: isHov ? 1.08 : 1,
              }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: CARD_W,
                height: CARD_H,
                flexShrink: 0,
                marginLeft: i === 0 ? 0 : -OVERLAP,
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                transformOrigin: 'bottom center',
                boxShadow: isHov
                  ? '0 -24px 60px rgba(236,59,121,0.4), 0 8px 40px rgba(0,0,0,0.6)'
                  : '0 8px 32px rgba(0,0,0,0.5)',
                zIndex: isHov ? 50 : i < CENTER ? i : TOTAL - i,
                border: isHov ? '2px solid rgba(236,59,121,0.8)' : '2px solid transparent',
                transition: 'box-shadow 0.25s ease, border 0.25s ease',
              }}
            >
              <img
                src={item.src}
                alt={item.name}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  display: 'block',
                  transform: isHov ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}/>

              {/* Name + tag — show on hover */}
              <div style={{
                position: 'absolute', bottom: 10, left: 10, right: 10,
                opacity: isHov ? 1 : 0,
                transform: isHov ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
                pointerEvents: 'none',
              }}>
                <p style={{
                  fontFamily: 'inherit', fontSize: '11px', fontWeight: 800,
                  color: 'white', margin: '0 0 3px', lineHeight: 1.1,
                }}>
                  {item.name}
                </p>
                <p style={{
                  fontFamily: 'inherit', fontSize: '9px', fontWeight: 600,
                  color: 'rgba(236,59,121,0.9)', margin: 0, textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {item.tag}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 100, pointerEvents: 'auto',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{    scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', gap: '20px',
                maxWidth: '820px', width: '90%',
                height: 'clamp(320px, 58vh, 520px)',
                position: 'relative',
              }}
            >
              {/* Photo */}
              <div style={{
                flex: '0 0 44%', borderRadius: '18px', overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              }}>
                <img
                  src={ITEMS[selected].src}
                  alt={ITEMS[selected].name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top', display: 'block',
                  }}
                />
              </div>

              {/* Info card */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                gap: '14px',
                background: 'rgba(10,6,30,0.75)',
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '32px 28px',
              }}>
                <span style={{
                  display: 'inline-block', fontFamily: 'inherit',
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: '#EC3B79', color: 'white',
                  borderRadius: '999px', padding: '4px 12px',
                  alignSelf: 'flex-start',
                }}>
                  {ITEMS[selected].tag}
                </span>

                <h3 style={{
                  fontFamily: 'inherit',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                  fontWeight: 900, color: 'white',
                  letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
                }}>
                  {ITEMS[selected].name}
                </h3>

                <p style={{
                  fontFamily: 'inherit', fontSize: '11px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.38)', letterSpacing: '0.08em',
                  textTransform: 'uppercase', margin: 0,
                }}>
                  {ITEMS[selected].designation}
                </p>

                <svg width="22" height="16" viewBox="0 0 22 16" fill="rgba(236,59,121,0.55)">
                  <path d="M0 16V9.6C0 4.267 2.933 1.067 8.8 0l1.2 2C7.2 2.8 5.467 4.533 5.2 7.2H9V16H0zm13 0V9.6C13 4.267 15.933 1.067 21.8 0L23 2C20.2 2.8 18.467 4.533 18.2 7.2H22V16H13z"/>
                </svg>

                <p style={{
                  fontFamily: 'inherit',
                  fontSize: 'clamp(0.85rem, 1.15vw, 1rem)',
                  lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', margin: 0,
                }}>
                  {ITEMS[selected].quote}
                </p>

                {/* Nav */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px', alignItems: 'center' }}>
                  {[[-1, 'M10 3L5 8l5 5'], [1, 'M6 3l5 5-5 5']].map(([dir, path]) => (
                    <button
                      key={String(dir)}
                      onClick={() => setSelected((selected + Number(dir) + TOTAL) % TOTAL)}
                      style={{
                        width: 36, height: 36, borderRadius: '50%', border: 'none',
                        background: 'rgba(255,255,255,0.1)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d={String(path)} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  ))}
                  <span style={{
                    fontFamily: 'inherit', fontSize: '11px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.28)', marginLeft: '4px',
                  }}>
                    {String(selected + 1).padStart(2,'0')} / {String(TOTAL).padStart(2,'0')}
                  </span>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute', top: -14, right: -14,
                  width: 34, height: 34, borderRadius: '50%', border: 'none',
                  background: 'rgba(255,255,255,0.15)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M1 1l11 11M12 1L1 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
