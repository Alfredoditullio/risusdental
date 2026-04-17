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

      {/* Fluid blob layer — desktop only (RAF + canvas = battery drain on mobile) */}
      {!isMobile && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <FluidCanvas />
        </div>
      )}

      {/* 3D Canvas — desktop only (WebGL = GPU drain on mobile) */}
      {!isMobile && (
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
      )}

      {/* Hearts — desktop only */}
      {!isMobile && <HeartParticles active={current === 0} />}

      {/* Real tooth video — slide 1 only, desktop only (WebM alpha = black rect on iOS Safari) */}
      {!isMobile && <ToothVideo active={current === 0} parallax={toothParallax} />}

      {/* Teeth burst — desktop only */}
      {!isMobile && <ToothParticles active={current === 1} />}

      {/* Lips shatter intro — desktop only (30 divs animando = lag en mobile) */}
      {!isMobile && <LipsShatterIntro active={current === 1} />}

      {/* Rodrigo circular photo — disabled: NosotrosSlide handles its own photo */}
      <RodrigoPhoto active={false} parallax={photoParallax} matricula={slides[1].matricula} />

      {/* Floating bubbles/orbs — desktop only */}
      {!isMobile && <Bubbles mouse={mouse} accentColor={slides[current].accentColor} />}

      {/* HTML overlays per slide */}
      {slides.map((slide, i) => (
        slide.label === 'Galería'
          ? <GallerySlide    key={slide.id} active={i === current} />
          : slide.label === 'Servicios'
            ? <ServiciosSlide  key={slide.id} active={i === current} />
            : slide.label === 'Contacto'
              ? <ContactoSlide key={slide.id} active={i === current} />
              : slide.label === 'Nosotros'
                ? <NosotrosSlide key={slide.id} active={i === current} />
                : slide.label === 'Comunidad'
                  ? <ComunidadSlide key={slide.id} active={i === current} />
                  : <SlideContent  key={slide.id} slide={slide} active={i === current} index={i} />
      ))}

      {/* Navigation */}
      <Nav onNavigate={(i) => goTo(i)} />

      {/* Custom bubble cursor — desktop only (useless + battery drain on touch) */}
      {!isMobile && <BubbleCursor />}


      {/* Bottom bar: counter + nav arrows */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12">
        <SlideCounter current={current} total={total} />

        {/* Arrow nav */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="hidden md:flex w-10 h-10 rounded-full border border-white/30 items-center justify-center text-white/60 hover:text-white hover:border-white transition-all"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="hidden md:flex w-10 h-10 rounded-full border border-white/30 items-center justify-center text-white/60 hover:text-white hover:border-white transition-all"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
