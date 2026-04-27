import { useRef, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { Scene } from './Scene'
import { SlideContent } from './SlideContent'
import { Nav } from './Nav'
import { SlideCounter } from './SlideCounter'
import { Bubbles } from './Bubbles'
import { FluidCanvas } from './FluidCanvas'
import { BubbleCursor } from './BubbleCursor'
import { ToothVideo } from './ToothVideo'
import { HeartParticles } from './HeartParticles'
import { RodrigoPhoto } from './RodrigoPhoto'
import { ToothParticles } from './ToothParticles'
import { GallerySlide } from './GallerySlide'
import { ServiciosSlide } from './ServiciosSlide'
import { ContactoSlide } from './ContactoSlide'
import { ComunidadSlide } from './ComunidadSlide'
import { LipsShatterIntro } from './LipsShatterIntro'
import { NosotrosSlide } from './NosotrosSlide'
import { ProyectosSlide } from './ProyectosSlide'
import { useSlider } from '../hooks/useSlider'
import { useMouse } from '../hooks/useMouse'
import { useIsMobile } from '../hooks/useIsMobile'
import { slides } from '../data/slides'

export function Slider() {
  const { current, direction, total, goTo, next, prev } = useSlider()
  const isMobile = useIsMobile()
  const mouse = useMouse(isMobile ? 0 : 0.06)
  const bgRef = useRef<HTMLDivElement>(null)
  const prevSlide = useRef(0)

  // Crossfade gradient backgrounds on slide change
  useEffect(() => {
    if (!bgRef.current) return
    const children = bgRef.current.children as HTMLCollectionOf<HTMLElement>

    for (let i = 0; i < children.length; i++) {
      if (i === current) {
        gsap.to(children[i], { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
      } else {
        gsap.to(children[i], { opacity: 0, duration: 0.8, ease: 'power2.inOut' })
      }
    }
    prevSlide.current = current
  }, [current])

  // Mouse parallax offset for background (px shift)
  const bgTransform = useMemo(() => {
    const shiftX = mouse.smoothX * 30
    const shiftY = mouse.smoothY * 20
    return `translate(${shiftX}px, ${shiftY}px) scale(1.08)`
  }, [mouse.smoothX, mouse.smoothY])

  // Lighter parallax for the tooth video overlay
  const toothParallax = useMemo(() => {
    return `translate(${mouse.smoothX * 18}px, ${mouse.smoothY * 12}px)`
  }, [mouse.smoothX, mouse.smoothY])

  // Parallax for Rodrigo's photo (gentle, opposite direction for depth)
  const photoParallax = useMemo(() => {
    return `translate(${mouse.smoothX * -14}px, ${mouse.smoothY * 10}px)`
  }, [mouse.smoothX, mouse.smoothY])


  // ── MOBILE: página scrollable, sin slider ────────────────────────────────
  if (isMobile) {
    const scrollToSection = (idx: number) => {
      document.getElementById(`mobile-section-${idx}`)?.scrollIntoView({ behavior: 'smooth' })
    }

    const noiseStyle: React.CSSProperties = {
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: '128px 128px',
    }

    return (
      <div style={{ overflowY: 'scroll', height: '100svh', WebkitOverflowScrolling: 'touch' }}>
        <Nav onNavigate={scrollToSection} />

        {slides.map((slide, i) => (
          <section
            key={slide.id}
            id={`mobile-section-${i}`}
            style={{
              position: 'relative',
              minHeight: '100svh',
              background: slide.bgGradient,
            }}
          >
            <div style={noiseStyle} />

            {slide.label === 'Galería'
              ? <GallerySlide    active={true} />
              : slide.label === 'Servicios'
                ? <ServiciosSlide  active={true} />
                : slide.label === 'Contacto'
                  ? <ContactoSlide active={true} />
                  : slide.label === 'Sobre Mí'
                    ? <NosotrosSlide active={true} />
                    : slide.label === 'Proyectos'
                      ? <ProyectosSlide active={true} />
                      : slide.label === 'Comunidad'
                        ? <ComunidadSlide active={true} />
                        : <SlideContent  slide={slide} active={true} index={i} />
            }
          </section>
        ))}

        {/* Footer mobile */}
        <footer style={{
          padding: '20px 0',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}>
          <a
            href="https://www.alfredoditullio.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'inherit', fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onTouchStart={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            onTouchEnd={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            Powered by Alfredo Di Tullio
          </a>
        </footer>
      </div>
    )
  }

  // ── DESKTOP: slider original ──────────────────────────────────────────────
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ cursor: 'none' }}>
      {/* Gradient backgrounds — stacked, crossfaded */}
      <div
        ref={bgRef}
        className="absolute -inset-10 z-0"
        style={{ transform: bgTransform, willChange: 'transform' }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              background: slide.bgGradient,
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        ))}
      </div>

      {/* Subtle noise/grain overlay for texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      <div className="absolute inset-0 z-[2] pointer-events-none"><FluidCanvas /></div>

      <div className="absolute inset-0 z-[3]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={1}
          gl={{ antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: 'default' }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
        >
          <Scene currentSlide={current} direction={direction} mouse={mouse} />
        </Canvas>
      </div>

      <HeartParticles active={current === 0} />
      <ToothVideo active={current === 0} parallax={toothParallax} />
      <ToothParticles active={current === 1} />
      <LipsShatterIntro active={current === 1} />
      <RodrigoPhoto active={false} parallax={photoParallax} matricula={slides[1].matricula} />
      <Bubbles mouse={mouse} accentColor={slides[current].accentColor} />

      {slides.map((slide, i) => (
        slide.label === 'Galería'
          ? <GallerySlide    key={slide.id} active={i === current} />
          : slide.label === 'Servicios'
            ? <ServiciosSlide  key={slide.id} active={i === current} />
            : slide.label === 'Contacto'
              ? <ContactoSlide key={slide.id} active={i === current} />
              : slide.label === 'Sobre Mí'
                ? <NosotrosSlide key={slide.id} active={i === current} />
                : slide.label === 'Proyectos'
                  ? <ProyectosSlide key={slide.id} active={i === current} />
                  : slide.label === 'Comunidad'
                    ? <ComunidadSlide key={slide.id} active={i === current} />
                    : <SlideContent  key={slide.id} slide={slide} active={i === current} index={i} />
      ))}

      <Nav onNavigate={(i) => goTo(i)} />
      <BubbleCursor />

      {/* Footer desktop — bottom-center, subtle */}
      <a
        href="https://www.alfredoditullio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50"
        style={{
          bottom: 28, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'inherit', fontSize: '9px', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)', textDecoration: 'none',
          transition: 'color 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
      >
        Powered by Alfredo Di Tullio
      </a>

      {/* Bottom bar: counter + nav arrows */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12">
        <SlideCounter current={current} total={total} />
        <div className="flex items-center gap-4">
          <button onClick={prev} className="hidden md:flex w-10 h-10 rounded-full border border-white/30 items-center justify-center text-white/60 hover:text-white hover:border-white transition-all" aria-label="Previous slide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
          <button onClick={next} className="hidden md:flex w-10 h-10 rounded-full border border-white/30 items-center justify-center text-white/60 hover:text-white hover:border-white transition-all" aria-label="Next slide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
