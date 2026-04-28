import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { WHATSAPP_URL } from '../data/slides'
import { useIsMobile } from '../hooks/useIsMobile'


interface ServiciosSlideProps { active: boolean }

const SERVICES = [
  { num:'01', name:'Odontología General', tagline:'Consultas, arreglos y urgencias', color:'#1E8ED0', icon:'⊕', gradient:'linear-gradient(135deg,#1E8ED0 0%,#6DD5FA 100%)', desc:'Atención integral para toda la familia: consultas de rutina, arreglos dentales, urgencias y tratamientos preventivos. El primer paso para una boca sana.' },
  { num:'02', name:'Blanqueamiento',      tagline:'Dientes luminosos',               color:'#9B59B6', icon:'◈', gradient:'linear-gradient(135deg,#9B59B6 0%,#1E8ED0 100%)', desc:'Tratamientos de blanqueamiento profesional en consultorio y para el hogar. Resultados visibles desde la primera sesión sin comprometer el esmalte dental.' },
  { num:'03', name:'Ortodoncia',          tagline:'Alineación perfecta',             color:'#EC3B79', icon:'⬡', gradient:'linear-gradient(135deg,#EC3B79 0%,#9B59B6 100%)', desc:'Brackets tradicionales, estéticos y alineadores invisibles. Tratamos maloclusiones en todas sus formas con resultados precisos y duraderos.' },
  { num:'04', name:'Periodoncia',         tagline:'Salud de encías',                 color:'#00B894', icon:'✿', gradient:'linear-gradient(135deg,#00B894 0%,#1E8ED0 100%)', desc:'Diagnóstico y tratamiento de enfermedades periodontales. Curetaje, cirugía y mantenimiento para una salud gingival óptima.' },
  { num:'05', name:'Endodoncia',          tagline:'Sin dolor, con cuidado',          color:'#E17055', icon:'❋', gradient:'linear-gradient(135deg,#E17055 0%,#FAB0EA 100%)', desc:'Tratamientos de conducto con tecnología rotatoria y anestesia profunda. Salvamos piezas comprometidas con máxima efectividad.' },
  { num:'06', name:'Odontopediatría',     tagline:'Para los más chicos',             color:'#6C5CE7', icon:'★', gradient:'linear-gradient(135deg,#6C5CE7 0%,#EC3B79 100%)', desc:'Atención especializada para niños en un ambiente amigable. Sellantes, fluoruros, prevención y educación en salud bucal desde la primera infancia.' },
]

const CARD_H  = 86
const CARD_GAP = 10
const VISIBLE  = 4
const STEP     = CARD_H + CARD_GAP
const MAX_OFF  = (SERVICES.length - VISIBLE) * STEP

// ── Mobile services component — no internal scroll ────────────────────────────
function MobileServiciosSlide({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const entryTl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    entryTl.current?.kill()
    const tl = gsap.timeline()
    entryTl.current = tl
    if (active) {
      gsap.set(containerRef.current, { y: 24, opacity: 0 })
      tl.to(containerRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' })
    } else {
      tl.to(containerRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
    }
    return () => { entryTl.current?.kill() }
  }, [active])

  return (
    <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>
      <div
        ref={containerRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          padding: '68px 14px 20px',
          gap: 8,
          pointerEvents: 'auto',
          opacity: 0,
          overflow: 'hidden',
        }}
      >
        {/* Headline */}
        <div style={{ flexShrink: 0, marginBottom: 2 }}>
          <p style={{ fontFamily: 'inherit', fontSize: '9px', fontWeight: 600, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Risus Dental · Buenos Aires
          </p>
          <h2 style={{ fontFamily: 'inherit', fontSize: 'clamp(1.6rem,8vw,2.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.9, margin: '0 0 8px' }}>
            TRATAMIENTOS
          </h2>
          <div style={{ width: 36, height: 3, background: 'linear-gradient(90deg,#EC3B79,#9B59B6)', borderRadius: 2 }} />
        </div>

        {/* Cards — flex:1 so they fill the remaining space equally, no scroll */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden', minHeight: 0 }}>
          {SERVICES.map((svc, i) => (
            <a
              key={i}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex', alignItems: 'stretch',
                borderRadius: 10, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                minHeight: 0,
              }}
            >
              {/* Color strip */}
              <div style={{
                width: 42, flexShrink: 0, background: svc.gradient,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              }}>
                <span style={{ fontSize: '15px', lineHeight: 1 }}>{svc.icon}</span>
                <span style={{ fontFamily: 'inherit', fontSize: '7px', fontWeight: 800, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{svc.num}</span>
              </div>
              {/* Text */}
              <div style={{
                flex: 1, background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'inherit', fontSize: 'clamp(11px,3vw,14px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{svc.name}</p>
                  <p style={{ fontFamily: 'inherit', fontSize: '10px', color: 'rgba(255,255,255,0.38)', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{svc.tagline}</p>
                </div>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: svc.color }}>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ServiciosSlide({ active }: ServiciosSlideProps) {
  const isMobile = useIsMobile()
  // ── refs ──────────────────────────────────────────────────────────────────
  const titleRef    = useRef<HTMLDivElement>(null)
  const leftColRef  = useRef<HTMLDivElement>(null)
  const moonRef     = useRef<HTMLDivElement>(null)
  const listInRef   = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const [ctaHov, setCtaHov] = useState(false)

  // Expanded panel — always in DOM so GSAP refs stay stable
  const panelRef    = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)

  const prevSvcRef   = useRef<number | null>(null)
  const hoverTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const entryTl      = useRef<gsap.core.Timeline | null>(null)
  const isOpenRef    = useRef(false)


  const [activeService, setActiveService] = useState<number | null>(null)
  const [displaySvc,    setDisplaySvc]    = useState(0)   // what's shown inside the panel
  const [scrollOff,     setScrollOff]     = useState(0)

  // ── Scroll list ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!listInRef.current) return
    gsap.to(listInRef.current, { y: -scrollOff, duration: 0.42, ease: 'power2.out' })
  }, [scrollOff])
  const scrollDown = useCallback(() => setScrollOff(o => Math.min(o + STEP, MAX_OFF)), [])
  const scrollUp   = useCallback(() => setScrollOff(o => Math.max(o - STEP, 0)), [])

  // ── Entry / exit ─────────────────────────────────────────────────────────
  useEffect(() => {
    entryTl.current?.kill()
    const tl = gsap.timeline()
    entryTl.current = tl

    if (active) {
      gsap.set(moonRef.current,   { scale: 2.2, opacity: 0 })
      gsap.set(leftColRef.current,{ x: -60, opacity: 0 })
      // Moon: entra grande y se asienta
      tl.to(moonRef.current, { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out' }, 0)
      // Left column slides in
      tl.to(leftColRef.current, { x: 0, opacity: 1, duration: 0.65, ease: 'expo.out' }, 0.15)
      // Cards from right
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        tl.fromTo(card,
          { x: 140, opacity: 0 },
          { x: 0,   opacity: 1, duration: 0.52, ease: 'expo.out' },
          0.14 + i * 0.07)
      })
    } else {
      // Force-close panel immediately when leaving slide
      gsap.killTweensOf(panelRef.current)
      gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' })
      isOpenRef.current = false
      setActiveService(null)
      prevSvcRef.current = null

      tl.to(moonRef.current,    { scale: 0.4, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
      tl.to(leftColRef.current, { x: -50, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        tl.to(card, { x: 110, opacity: 0, duration: 0.22, ease: 'power2.in' }, i * 0.04)
      })
    }
  }, [active])

  // ── Expand / collapse / switch ────────────────────────────────────────────
  useEffect(() => {
    const prev = prevSvcRef.current
    const curr = activeService
    prevSvcRef.current = curr

    const panel   = panelRef.current
    const content = contentRef.current
    if (!panel || !content) return

    gsap.killTweensOf(panel)
    gsap.killTweensOf(content)

    if (curr !== null && prev === null) {
      // ── OPEN ──
      const card = cardRefs.current[curr]
      if (!card) return
      const rect = card.getBoundingClientRect()

      const W = Math.min(window.innerWidth  * 0.50, 800)
      const H = Math.min(window.innerHeight * 0.65, 550)
      // Center panel (x/y are transforms from left:0,top:0)
      const tx = (window.innerWidth  - W) / 2
      const ty = (window.innerHeight - H) / 2

      setDisplaySvc(curr)

      gsap.set(panel, {
        x: rect.left, y: rect.top,
        width: rect.width, height: rect.height,
        borderRadius: '13px',
        opacity: 1,
        pointerEvents: 'auto',
      })
      gsap.set(content, { opacity: 0 })
      isOpenRef.current = true

      gsap.to(panel, {
        x: tx, y: ty, width: W, height: H,
        borderRadius: '26px',
        duration: 0.50, ease: 'power3.out',
        onComplete: () => {
          if (isOpenRef.current)
            gsap.to(content, { opacity: 1, duration: 0.28, ease: 'power2.out' })
        },
      })

    } else if (curr === null && prev !== null) {
      // ── CLOSE ──
      isOpenRef.current = false
      const card = cardRefs.current[prev]
      gsap.to(content, { opacity: 0, duration: 0.14 })

      const doClose = (destX: number, destY: number, destW: number, destH: number) => {
        gsap.to(panel, {
          x: destX, y: destY, width: destW, height: destH,
          borderRadius: '13px', opacity: 0,
          duration: 0.36, ease: 'power2.in',
          onComplete: () => { gsap.set(panel, { pointerEvents: 'none' }) },
        })
      }

      if (card) {
        const rect = card.getBoundingClientRect()
        doClose(rect.left, rect.top, rect.width, rect.height)
      } else {
        doClose(window.innerWidth / 2, window.innerHeight / 2, 0, 0)
      }

    } else if (curr !== null && prev !== null && curr !== prev) {
      // ── SWITCH between services ──
      setDisplaySvc(curr)
      gsap.to(content, {
        opacity: 0, duration: 0.14,
        onComplete: () => {
          // React has already re-rendered with new displaySvc by now
          gsap.to(content, { opacity: 1, duration: 0.22 })
        },
      })
    }
  }, [activeService])

  // ── Close detection via global mousemove ──────────────────────────────────
  const cancelClose = useCallback(() => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null }
  }, [])

  const scheduleClose = useCallback(() => {
    if (hoverTimer.current) return   // already scheduled — don't reset the timer
    hoverTimer.current = setTimeout(() => {
      hoverTimer.current = null
      setActiveService(null)
    }, 220)
  }, [])

  useEffect(() => {
    if (activeService === null) return

    const handleMove = (e: MouseEvent) => {
      const panel = panelRef.current
      const col   = rightColRef.current
      if (!panel) return

      // Check panel bounds (getBoundingClientRect accounts for CSS transforms)
      const pr = panel.getBoundingClientRect()
      const inPanel =
        e.clientX >= pr.left - 16 && e.clientX <= pr.right  + 16 &&
        e.clientY >= pr.top  - 16 && e.clientY <= pr.bottom + 16

      // Check right column bounds
      let inCol = false
      if (col) {
        const cr = col.getBoundingClientRect()
        inCol = e.clientX >= cr.left && e.clientX <= cr.right &&
                e.clientY >= cr.top  && e.clientY <= cr.bottom
      }

      if (inPanel || inCol) cancelClose()
      else                  scheduleClose()
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelClose()
    }
  }, [activeService, scheduleClose, cancelClose])

  // ── Derived display service (always a valid index) ─────────────────────
  const s = SERVICES[displaySvc]
  const winH = VISIBLE * CARD_H + (VISIBLE - 1) * CARD_GAP

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <MobileServiciosSlide active={active} />
    )
  }

  return (
    <>
      <style>{`
        @keyframes svc-moon-hue{
          0%  {filter:drop-shadow(0 0 50px rgba(255,0,120,.9))  hue-rotate(0deg)   brightness(.68) saturate(7)}
          14% {filter:drop-shadow(0 0 50px rgba(160,0,255,.9))  hue-rotate(52deg)  brightness(.63) saturate(8)}
          28% {filter:drop-shadow(0 0 50px rgba(0,80,255,.9))   hue-rotate(105deg) brightness(.63) saturate(8)}
          42% {filter:drop-shadow(0 0 50px rgba(0,200,180,.9))  hue-rotate(158deg) brightness(.68) saturate(7)}
          57% {filter:drop-shadow(0 0 50px rgba(0,200,60,.9))   hue-rotate(210deg) brightness(.63) saturate(8)}
          71% {filter:drop-shadow(0 0 50px rgba(220,200,0,.9))  hue-rotate(263deg) brightness(.63) saturate(8)}
          85% {filter:drop-shadow(0 0 50px rgba(255,80,0,.9))   hue-rotate(316deg) brightness(.68) saturate(7)}
          100%{filter:drop-shadow(0 0 50px rgba(255,0,120,.9))  hue-rotate(360deg) brightness(.68) saturate(7)}
        }
      `}</style>

      {/* ── Slide layer ──────────────────────────────────────────────────── */}
      <div className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>

        {/* Moon — fixed, no rotation, only color cycle. GSAP handles entrance scale */}
        <div ref={moonRef} style={{
          position:'absolute',
          inset:0, margin:'auto',
          width:'clamp(420px,56vw,740px)', height:'clamp(420px,56vw,740px)',
          animation: active ? 'svc-moon-hue 4s linear infinite' : 'none',
          pointerEvents:'none',
          opacity: 0,
        }}>
          <img src="/luna.webp" alt="" style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}}/>
        </div>

        {/* ── Left column — headline + pitch + CTA ── */}
        <div ref={leftColRef} style={{
          position:'absolute', left:0, top:0, bottom:0,
          width:'clamp(280px,38%,480px)',
          display:'flex', flexDirection:'column', justifyContent:'center',
          padding:'clamp(80px,10vh,120px) clamp(24px,4vw,64px) clamp(60px,8vh,100px)',
          gap:'clamp(16px,2.5vh,28px)',
          pointerEvents:'auto',
          opacity: 0,
        }}>
          <p style={{fontFamily:'inherit',fontSize:'10px',fontWeight:600,letterSpacing:'0.42em',color:'rgba(255,255,255,0.38)',textTransform:'uppercase',margin:0}}>
            Risus Dental · Buenos Aires
          </p>

          <h2 style={{
            fontFamily:'inherit',
            fontSize:'clamp(2.8rem,5.5vw,5.5rem)',
            fontWeight:900, color:'#fff',
            letterSpacing:'-0.04em', lineHeight:0.88,
            textShadow:'0 4px 40px rgba(0,0,0,0.3)',
            margin:0,
          }}>
            TRATA&shy;MIENTOS
          </h2>

          <div style={{width:48,height:3,background:'linear-gradient(90deg,#EC3B79,#9B59B6)',borderRadius:2}}/>

          <p style={{
            fontFamily:'inherit',
            fontSize:'clamp(0.88rem,1.1vw,1.05rem)',
            lineHeight:1.75, color:'rgba(255,255,255,0.82)',
            margin:0,
            background:'rgba(0,0,0,0.28)',
            WebkitBoxDecorationBreak:'clone',
            boxDecorationBreak:'clone',
            padding:'2px 10px 3px',
            borderRadius:'3px',
            borderLeft:'3px solid rgba(236,59,121,0.7)',
          }}>
            Tecnología de última generación al servicio de tu salud y tu sonrisa. Cada tratamiento, diseñado a medida.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display:'inline-flex', alignItems:'center', gap:'10px', alignSelf:'flex-start',
              background: ctaHov ? 'linear-gradient(135deg,#EC3B79,#9B59B6)' : 'white',
              borderRadius:'999px', padding:'14px 32px',
              fontSize:'11px', fontWeight:800, letterSpacing:'0.2em',
              color: ctaHov ? 'white' : '#EC3B79',
              textTransform:'uppercase', textDecoration:'none',
              boxShadow: ctaHov ? '0 12px 40px rgba(236,59,121,0.5)' : '0 8px 32px rgba(0,0,0,0.3)',
              transition:'all 0.3s ease',
            }}
          >
            PEDIR TURNO
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l4 3.5L8 10" stroke={ctaHov ? 'white' : '#EC3B79'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right column */}
        <div ref={rightColRef} style={{
          position:'absolute', right:0, top:0, bottom:0,
          width:'clamp(230px,28%,340px)',
          display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'stretch',
          paddingRight:'clamp(18px,2.5vw,40px)', paddingTop:'72px', paddingBottom:'52px', gap:'12px',
          pointerEvents:'auto',
        }}>
          {/* Up arrow */}
          <button onClick={scrollUp} disabled={scrollOff === 0} style={{
            cursor: scrollOff===0 ? 'default':'pointer',
            background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)',
            borderRadius:'10px', padding:'8px', display:'flex', alignItems:'center', justifyContent:'center',
            opacity: scrollOff===0 ? 0.3:0.85, transition:'opacity 0.2s', flexShrink:0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 10l4-4 4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Clipping window */}
          <div style={{ overflow:'hidden', height:winH, flexShrink:0 }}>
            <div ref={listInRef} style={{ display:'flex', flexDirection:'column', gap:CARD_GAP }}>
              {SERVICES.map((svc, i) => {
                const isActive = activeService === i
                return (
                  <div key={i} ref={el => { cardRefs.current[i] = el }}
                    onMouseEnter={() => { cancelClose(); setActiveService(i) }}
                    style={{
                      height: CARD_H, flexShrink:0,
                      display:'flex', alignItems:'stretch',
                      borderRadius:'12px', overflow:'hidden', opacity:0,
                      border:`1px solid ${isActive ? svc.color+'80' : 'rgba(255,255,255,0.09)'}`,
                      boxShadow: isActive ? `0 0 22px ${svc.color}44` : 'none',
                      transition:'border-color 0.22s, box-shadow 0.22s, transform 0.22s',
                      transform: isActive ? 'translateX(-6px)' : 'translateX(0)',
                      cursor:'pointer',
                    }}>
                    {/* Left gradient block */}
                    <div style={{
                      width:'52px', flexShrink:0, background:svc.gradient,
                      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'6px',
                    }}>
                      <span style={{fontSize:'18px',lineHeight:1,filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'}}>{svc.icon}</span>
                      <span style={{fontFamily:'inherit',fontSize:'8px',fontWeight:800,color:'rgba(255,255,255,0.7)',letterSpacing:'0.05em'}}>{svc.num}</span>
                    </div>
                    {/* Content */}
                    <div style={{
                      flex:1, minWidth:0,
                      background: isActive ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.28)',
                      backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)',
                      display:'flex', alignItems:'center', padding:'0 14px', gap:'10px',
                      transition:'background 0.22s',
                    }}>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{fontFamily:'inherit',fontSize:'clamp(11px,1.1vw,14px)',fontWeight:700,color:'#fff',margin:0,letterSpacing:'-0.01em',lineHeight:1.2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{svc.name}</p>
                        <p style={{fontFamily:'inherit',fontSize:'10px',color:'rgba(255,255,255,0.38)',margin:'4px 0 0',letterSpacing:'0.04em'}}>{svc.tagline}</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                        style={{flexShrink:0,color:isActive?svc.color:'rgba(255,255,255,0.2)',transition:'color 0.22s,transform 0.22s',transform:isActive?'translateX(3px)':'none'}}>
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Down arrow */}
          <button onClick={scrollDown} disabled={scrollOff>=MAX_OFF} style={{
            cursor: scrollOff>=MAX_OFF ? 'default':'pointer',
            background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)',
            borderRadius:'10px', padding:'8px', display:'flex', alignItems:'center', justifyContent:'center',
            opacity: scrollOff>=MAX_OFF ? 0.3:0.85, transition:'opacity 0.2s', flexShrink:0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Expanded panel — ALWAYS in DOM, GSAP controls opacity/position ─── */}
      {/* position:fixed + left:0,top:0 → GSAP x/y do the translation           */}
      <div ref={panelRef} style={{
        position:'fixed', left:0, top:0,
        zIndex:200, overflow:'hidden',
        pointerEvents:'none', opacity:0,
        background: s.gradient,
        transition:'background 0.25s',
        boxShadow:'0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)',
        display:'flex',
      }}>
        {/* Content wrapper — stable ref, never conditionally removed */}
        <div ref={contentRef} style={{ display:'flex', width:'100%', height:'100%' }}>

          {/* Left — name */}
          <div style={{
            width:'40%', background:'rgba(0,0,0,0.22)',
            display:'flex', flexDirection:'column', justifyContent:'space-between',
            padding:'clamp(24px,3.5vh,44px) clamp(20px,2.8vw,40px)',
            flexShrink:0,
          }}>
            <span style={{fontFamily:'inherit',fontSize:'10px',fontWeight:700,color:'rgba(255,255,255,0.38)',letterSpacing:'0.35em',textTransform:'uppercase'}}>
              {s.num} · Servicio
            </span>
            <div>
              <div style={{fontSize:'clamp(2.2rem,4.5vw,4rem)',marginBottom:'16px',filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'}}>
                {s.icon}
              </div>
              <h3 style={{fontFamily:'inherit',fontSize:'clamp(1.6rem,3.2vw,3rem)',fontWeight:900,color:'#fff',margin:'0 0 16px',lineHeight:0.95,letterSpacing:'-0.04em',textShadow:'0 4px 32px rgba(0,0,0,0.3)'}}>
                {s.name.toUpperCase()}
              </h3>
              <div style={{width:40,height:3,background:'rgba(255,255,255,0.5)',borderRadius:2}}/>
            </div>
            <span style={{fontFamily:'inherit',fontSize:'clamp(5rem,11vw,9rem)',fontWeight:900,color:'rgba(255,255,255,0.06)',lineHeight:1,letterSpacing:'-0.05em',userSelect:'none',alignSelf:'flex-end'}}>
              {s.num}
            </span>
          </div>

          {/* Right — description */}
          <div style={{
            flex:1, background:'rgba(0,0,0,0.46)',
            backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
            display:'flex', flexDirection:'column', justifyContent:'center',
            padding:'clamp(24px,4vh,50px) clamp(24px,3.5vw,50px)', gap:'clamp(16px,2.5vh,26px)',
            borderLeft:'1px solid rgba(255,255,255,0.1)',
          }}>
            <p style={{fontFamily:'inherit',fontSize:'clamp(12px,1.3vw,16px)',color:'rgba(255,255,255,0.82)',lineHeight:1.72,margin:0}}>
              {s.desc}
            </p>
            <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
              <button style={{
                display:'inline-flex',alignItems:'center',gap:'10px',
                background:'linear-gradient(135deg,#EC3B79,#9B59B6)',
                borderRadius:'999px', padding:'13px 28px',
                fontSize:'11px',fontWeight:800,letterSpacing:'0.2em',
                color:'#fff',textTransform:'uppercase',border:'1.5px solid rgba(255,255,255,0.2)',cursor:'pointer',
                boxShadow:'0 8px 32px rgba(236,59,121,0.5)',
              }}>
                PEDIR TURNO
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{fontFamily:'inherit',fontSize:'10px',color:'rgba(255,255,255,0.32)',letterSpacing:'0.12em',textTransform:'uppercase'}}>
                Consulta sin cargo
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
