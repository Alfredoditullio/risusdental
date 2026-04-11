/**
 * GallerySlide — Swiper carousel inspired by Slider Revolution "Event Booking Tiny Slider".
 *
 * - Centred carousel, 2.4 slides visible, peek on sides
 * - Tall portrait cards with glassmorphism bottom overlay
 * - GSAP exploding-layers entry (whole track implodes from scatter)
 * - Click → GSAP lightbox
 * - Infinite loop, touch/drag enabled
 */

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface GallerySlideProps {
  active: boolean
}

interface Card {
  src: string | null
  alt?: string
  objectPos?: string
  gradient?: string
  label: string
  sublabel?: string
  tag?: string
}

const CARDS: Card[] = [
  {
    src: '/rodrigo.webp',
    alt: 'Dr. Rodrigo Melo',
    objectPos: 'center top',
    label: 'Dr. Rodrigo Melo',
    sublabel: 'Odontólogo General',
    tag: 'Equipo',
  },
  {
    src: '/diente_gay.webp',
    alt: 'Estética dental',
    objectPos: 'center center',
    label: 'Diseño de Sonrisa',
    sublabel: 'Transformá tu sonrisa',
    tag: 'Estética',
  },
  {
    src: '/diente3d.webp',
    alt: 'Implante dental',
    objectPos: 'center center',
    label: 'Implantología',
    sublabel: 'Tecnología de vanguardia',
    tag: 'Servicios',
  },
  {
    src: null,
    gradient: 'linear-gradient(160deg,#EC3B79 0%,#9B59B6 60%,#1E8ED0 100%)',
    label: 'Blanqueamiento',
    sublabel: 'Resultados visibles',
    tag: 'Estética',
  },
  {
    src: null,
    gradient: 'linear-gradient(160deg,#1E8ED0 0%,#E4FC2D 100%)',
    label: 'Ortodoncia',
    sublabel: 'Alineación perfecta',
    tag: 'Tratamientos',
  },
  {
    src: null,
    gradient: 'linear-gradient(160deg,#FAB0EA 0%,#EC3B79 100%)',
    label: 'Periodoncia',
    sublabel: 'Salud encías',
    tag: 'Clínica',
  },
  {
    src: null,
    gradient: 'linear-gradient(160deg,#F39C12 0%,#EC3B79 100%)',
    label: 'Endodoncia',
    sublabel: 'Sin dolor, con cuidado',
    tag: 'Clínica',
  },
  {
    src: null,
    gradient: 'linear-gradient(160deg,#9B59B6 0%,#1E8ED0 100%)',
    label: 'Odontopediatría',
    sublabel: 'Para los más chicos',
    tag: 'Especialidades',
  },
  {
    src: null,
    gradient: 'linear-gradient(160deg,#EC3B79 20%,#F39C12 100%)',
    label: 'Urgencias',
    sublabel: 'Atención inmediata',
    tag: 'Emergencias',
  },
]

export function GallerySlide({ active }: GallerySlideProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const titleRef  = useRef<HTMLDivElement>(null)
  const trackRef  = useRef<HTMLDivElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)
  const tlRef     = useRef<gsap.core.Timeline | null>(null)

  const [lightbox, setLightbox] = useState<number | null>(null)
  const lbOverlayRef  = useRef<HTMLDivElement>(null)
  const lbContentRef  = useRef<HTMLDivElement>(null)

  // ── Entry / exit animation ─────────────────────────────────────────────────
  useEffect(() => {
    tlRef.current?.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    if (active) {
      tl.fromTo(titleRef.current,
        { y: -60, opacity: 0, rotation: -5, scale: 0.8 },
        { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }, 0)

      tl.fromTo(trackRef.current,
        { y: 120, opacity: 0, scale: 0.88 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'expo.out' }, 0.12)

      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.75)

    } else {
      tl.to(titleRef.current,  { y: -50, opacity: 0, duration: 0.28, ease: 'power2.in' }, 0)
      tl.to(trackRef.current,  { y: 80, opacity: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' }, 0.04)
      tl.to(ctaRef.current,    { opacity: 0, duration: 0.18 }, 0)
    }
  }, [active])

  // ── Lightbox ───────────────────────────────────────────────────────────────
  const openLightbox = useCallback((i: number) => setLightbox(i), [])

  useEffect(() => {
    if (lightbox === null || !lbOverlayRef.current || !lbContentRef.current) return
    gsap.fromTo(lbOverlayRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(lbContentRef.current,
      { scale: 0.72, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' })
  }, [lightbox])

  const closeLightbox = useCallback(() => {
    if (!lbOverlayRef.current || !lbContentRef.current) return
    gsap.to(lbContentRef.current, { scale: 0.82, opacity: 0, y: 20, duration: 0.25, ease: 'power2.in' })
    gsap.to(lbOverlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => setLightbox(null),
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeLightbox])

  const activeCard = lightbox !== null ? CARDS[lightbox] : null

  return (
    <>
      <div
        ref={wrapRef}
        className={`absolute inset-0 z-10 flex flex-col pointer-events-none
                    pt-20 pb-8 gap-5 ${active ? 'visible' : 'invisible'}`}
      >
        {/* Title */}
        <div ref={titleRef} className="flex items-baseline gap-4 shrink-0 px-10 lg:px-14" style={{ opacity: 0 }}>
          <h2
            className="font-display font-bold text-white text-3xl md:text-5xl tracking-tight leading-none select-none"
            style={{ textShadow: '0 4px 28px rgba(0,0,0,0.25)' }}
          >
            GALERÍA
          </h2>
          <span className="hidden md:block font-display text-white/40 text-xs uppercase tracking-[0.28em]">
            Sonrisas que transforman vidas
          </span>
        </div>

        {/* Swiper track */}
        <div ref={trackRef} className="flex-1 min-h-0 pointer-events-auto" style={{ opacity: 0 }}>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            slidesPerView={1.35}
            spaceBetween={18}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640:  { slidesPerView: 1.8, spaceBetween: 20 },
              900:  { slidesPerView: 2.4, spaceBetween: 24 },
              1280: { slidesPerView: 2.8, spaceBetween: 28 },
            }}
            style={{ height: '100%', paddingBottom: '2.5rem' }}
          >
            {CARDS.map((card, i) => (
              <SwiperSlide key={i} style={{ height: '100%' }}>
                {({ isActive }) => (
                  <button
                    onClick={() => openLightbox(i)}
                    className="relative w-full h-full rounded-2xl overflow-hidden group
                               focus:outline-none cursor-pointer block"
                    style={{
                      background: card.gradient ?? '#111',
                      transition: 'transform 0.4s cubic-bezier(.25,.8,.25,1), box-shadow 0.4s',
                      transform: isActive ? 'scale(1)' : 'scale(0.93)',
                      boxShadow: isActive
                        ? '0 28px 60px rgba(0,0,0,0.55), 0 0 0 2px rgba(236,59,121,0.35)'
                        : '0 12px 30px rgba(0,0,0,0.35)',
                    }}
                  >
                    {/* Photo */}
                    {card.src && (
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="absolute inset-0 w-full h-full object-cover
                                   transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ objectPosition: card.objectPos }}
                      />
                    )}

                    {/* Gradient overlay — always present for text legibility */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
                      }}
                    />

                    {/* Tag pill — top left */}
                    {card.tag && (
                      <div
                        className="absolute top-4 left-4"
                        style={{
                          background: 'rgba(236,59,121,0.85)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '999px',
                          padding: '4px 12px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'inherit',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            color: '#fff',
                            textTransform: 'uppercase',
                          }}
                        >
                          {card.tag}
                        </span>
                      </div>
                    )}

                    {/* Bottom glassmorphism overlay — RevSlider style */}
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        background: 'rgba(0,0,0,0.38)',
                        borderTop: '1px solid rgba(255,255,255,0.12)',
                        padding: '16px 20px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'inherit',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.22em',
                          color: '#EC3B79',
                          textTransform: 'uppercase',
                          margin: 0,
                        }}
                      >
                        {card.sublabel}
                      </p>
                      <h3
                        style={{
                          fontFamily: 'inherit',
                          fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                          fontWeight: 700,
                          color: '#fff',
                          margin: 0,
                          letterSpacing: '-0.01em',
                          lineHeight: 1.15,
                        }}
                      >
                        {card.label}
                      </h3>

                      {/* Book button — only on active slide */}
                      <div
                        style={{
                          marginTop: '10px',
                          overflow: 'hidden',
                          maxHeight: isActive ? '44px' : '0px',
                          opacity: isActive ? 1 : 0,
                          transition: 'max-height 0.35s ease, opacity 0.35s ease',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(90deg,#EC3B79,#9B59B6)',
                            borderRadius: '999px',
                            padding: '8px 20px',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.16em',
                            color: '#fff',
                            textTransform: 'uppercase',
                          }}
                        >
                          VER MÁS
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Hover expand icon */}
                    <div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                  </button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex justify-center shrink-0 pointer-events-auto pb-2" style={{ opacity: 0 }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(90deg,#EC3B79,#9B59B6)',
              borderRadius: '999px', padding: '12px 32px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em',
              color: '#fff', textTransform: 'uppercase',
              boxShadow: '0 8px 28px rgba(236,59,121,0.4)',
              border: 'none', cursor: 'pointer',
            }}
          >
            PEDIR TURNO
          </button>
        </div>
      </div>

      {/* Swiper overrides */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          width: 42px !important;
          height: 42px !important;
          margin-top: -21px;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 14px !important;
          font-weight: 800;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(236,59,121,0.6) !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5) !important;
        }
        .swiper-pagination-bullet-active {
          background: #EC3B79 !important;
        }
      `}</style>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          ref={lbOverlayRef}
          className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)' }}
          onClick={closeLightbox}
        >
          <div
            ref={lbContentRef}
            className="relative max-w-3xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {activeCard?.src ? (
              <img
                src={activeCard.src}
                alt={activeCard.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
              />
            ) : (
              <div
                className="w-full rounded-2xl flex flex-col items-center justify-center gap-4"
                style={{
                  background: activeCard?.gradient,
                  aspectRatio: '4/3',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                }}
              >
                <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-display text-white/40 text-sm uppercase tracking-widest">{activeCard?.label}</p>
              </div>
            )}

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10
                         backdrop-blur-sm border border-white/20 flex items-center justify-center
                         text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
