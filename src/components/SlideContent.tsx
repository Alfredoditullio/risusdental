/**
 * SlideContent — per-slide HTML overlay.
 *
 * Implements RevSlider-inspired EXPLODING LAYERS on every headline:
 *
 * ENTRY  → elements implode from a scattered position (random offset +
 *           rotation + scale 0) into their final place — back.out spring ease.
 *
 * EXIT   → elements explode outward quickly — power3.in.
 *
 * Each layout variant (3-line / photo-right / 2-line split) gets its
 * own scatter origins so the animation feels intentional.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SlideData } from '../data/slides'
import { CTAButton } from './CTAButton'
import { useIsMobile } from '../hooks/useIsMobile'

interface SlideContentProps {
  slide: SlideData
  active: boolean
  index: number
}

export function SlideContent({ slide, active, index }: SlideContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef    = useRef<HTMLDivElement>(null)
  const midRef    = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const bioRef    = useRef<HTMLDivElement>(null)
  const infoRef   = useRef<HTMLDivElement>(null)
  const tlRef     = useRef<gsap.core.Timeline | null>(null)
  const isMobile  = useIsMobile()

  const threeLines = !!slide.headlineMiddle
  const hasPhoto   = !!slide.photo
  const isEven     = index % 2 === 0

  useEffect(() => {
    tlRef.current?.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    const top    = topRef.current
    const mid    = midRef.current
    const bottom = bottomRef.current
    const info   = infoRef.current

    if (active) {

      if (hasPhoto) {
        // ── PHOTO layout: text implodes from the right ───────────────────
        tl.fromTo(top,
          { x: 220, y: -40, rotation: 12, scale: 0.6, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 0.9, ease: 'back.out(1.4)' },
          0.3,
        )
        tl.fromTo(bottom,
          { x: 180, y: 60, rotation: -10, scale: 0.55, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 0.9, ease: 'back.out(1.4)' },
          0.46,
        )
        if (bioRef.current) tl.fromTo(bioRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          0.65,
        )
        tl.fromTo(info,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          0.82,
        )

      } else if (threeLines) {
        // ── 3-LINE layout: each line implodes from left, staggered ───────
        tl.fromTo(top,
          { x: -300, y: -80, rotation: -20, scale: 0.5, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 1.0, ease: 'back.out(1.5)' },
          0.18,
        )
        tl.fromTo(mid,
          { x: -260, y: 20, rotation: 15, scale: 0.55, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 1.0, ease: 'back.out(1.5)' },
          0.32,
        )
        tl.fromTo(bottom,
          { x: -320, y: 80, rotation: -12, scale: 0.5, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 1.0, ease: 'back.out(1.5)' },
          0.46,
        )
        tl.fromTo(info,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
          0.72,
        )

      } else {
        // ── 2-LINE split layout: top from upper-left, bottom from lower-right
        tl.fromTo(top,
          { x: isEven ? -280 : 280, y: -120, rotation: isEven ? -18 : 18,
            scale: 0.45, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 1.0, ease: 'back.out(1.5)' },
          0.22,
        )
        tl.fromTo(bottom,
          { x: isEven ? 280 : -280, y: 120, rotation: isEven ? 15 : -15,
            scale: 0.45, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
            duration: 1.0, ease: 'back.out(1.5)' },
          0.38,
        )
        tl.fromTo(info,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
          0.72,
        )
      }

    } else {
      // ── EXIT: elements explode outward ──────────────────────────────────
      if (top)    tl.to(top,    { x: hasPhoto ? 160 : (isEven ? -160 : 160),
                                   y: -60, rotation: hasPhoto ? 10 : -10,
                                   scale: 0.5, opacity: 0,
                                   duration: 0.35, ease: 'power3.in' }, 0)
      if (mid)    tl.to(mid,    { x: -140, y: 40, rotation: 8,
                                   scale: 0.5, opacity: 0,
                                   duration: 0.3, ease: 'power3.in' }, 0.05)
      if (bottom) tl.to(bottom, { x: hasPhoto ? 160 : (isEven ? 160 : -160),
                                   y: 60, rotation: hasPhoto ? -10 : 10,
                                   scale: 0.5, opacity: 0,
                                   duration: 0.35, ease: 'power3.in' }, 0.08)
      if (info)   tl.to(info,   { y: -20, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0)
    }
  }, [active, threeLines, hasPhoto, isEven, isMobile])

  // ── Photo-left / text-right ─────────────────────────────────────────────
  if (hasPhoto) {
    return (
      <div ref={containerRef}
           className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>

        {/* Right column: name + subtitle + bio + CTA */}
        <div className="absolute right-0 top-0 bottom-0 w-[48%] flex flex-col justify-center
                        pr-6 md:pr-12 lg:pr-16 pl-4 gap-0">

          {/* RODRIGO */}
          <div ref={topRef} style={{ opacity: 0 }}>
            <h2 className="font-display font-bold text-white leading-[0.85] tracking-tight select-none
                           text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[6rem]
                           text-right"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.22)' }}>
              {slide.headlineTop}
            </h2>
          </div>

          {/* MELO */}
          <div ref={bottomRef} style={{ opacity: 0 }}>
            <h2 className="font-display font-bold text-white leading-[0.85] tracking-tight select-none
                           text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[6rem]
                           text-right"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.22)' }}>
              {slide.headlineBottom}
            </h2>
          </div>

          {/* Specialty label + bio */}
          <div style={{ opacity: 0 }} ref={bioRef}>
            <p className="font-display font-semibold text-white/75
                          text-[0.85rem] sm:text-[1rem] md:text-[1.15rem] lg:text-[1.3rem]
                          uppercase tracking-[0.22em] text-right mt-3 mb-4">
              {slide.subtitle}
            </p>

            {/* Bio text — highlighter effect */}
            {slide.bio && (
              <div className="text-right overflow-y-auto max-h-[28vh] md:max-h-[34vh]
                              scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-1"
                   style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {slide.bio.split('\n\n').map((para, i) => (
                  <p key={i}
                     className="font-display leading-[1.85]"
                     style={{ fontSize: 'clamp(0.78rem, 1.05vw, 1rem)', margin: 0 }}>
                    <span style={{
                      background: 'rgba(10, 6, 30, 0.52)',
                      WebkitBoxDecorationBreak: 'clone',
                      boxDecorationBreak: 'clone',
                      padding: '3px 10px',
                      borderRadius: '3px',
                      color: 'rgba(255,255,255,0.95)',
                      borderLeft: '3px solid rgba(236,59,121,0.8)',
                    }}>
                      {para}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div ref={infoRef}
               className="flex justify-end mt-5"
               style={{ opacity: 0 }}>
            <div className="pointer-events-auto"><CTAButton text={slide.ctaText} /></div>
          </div>
        </div>
      </div>
    )
  }

  // ── 3-line stacked ──────────────────────────────────────────────────────
  if (threeLines) {

    // ── Mobile hero layout ─────────────────────────────────────────────────
    // No tooth video on mobile (gated in Slider.tsx), so headline takes full width.
    // Headline sits at top-[16%], CTA sits above the fixed bottom nav bar (~80px).
    if (isMobile) {
      return (
        <div ref={containerRef}
             className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>

          {/* Diente centrado con corazones flotantes */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '190px',
            width: '52vw',
            maxWidth: '210px',
            pointerEvents: 'none',
          }}>
            <style>{`
              @keyframes heroHeart {
                0%   { transform: translateY(0) scale(1);    opacity: 1;   }
                100% { transform: translateY(-54px) scale(0.45); opacity: 0; }
              }
            `}</style>
            {/* Corazones SVG — pure CSS, sin JS */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#EC3B79" style={{ position: 'absolute', top: 6,  left: '8%',  animation: 'heroHeart 2.3s ease-out 0s    infinite', filter: 'drop-shadow(0 1px 4px #EC3B7988)' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#6DD5FA" style={{ position: 'absolute', top: 0,  right: '14%', animation: 'heroHeart 2.5s ease-out 0.8s  infinite', filter: 'drop-shadow(0 1px 4px #6DD5FA88)' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg width="9"  height="9"  viewBox="0 0 24 24" fill="#FAB0EA" style={{ position: 'absolute', top: 18, left: '44%', animation: 'heroHeart 2.1s ease-out 1.6s  infinite', filter: 'drop-shadow(0 1px 4px #FAB0EA88)' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <svg width="8"  height="8"  viewBox="0 0 24 24" fill="#EC3B79" style={{ position: 'absolute', top: 10, left: '68%', animation: 'heroHeart 2.4s ease-out 2.3s  infinite', filter: 'drop-shadow(0 1px 4px #EC3B7988)' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>

            <img
              src="/diente.png"
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                mixBlendMode: 'multiply',
                opacity: 0.93,
                display: 'block',
                filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.15))',
              }}
            />
          </div>

          {/* 3-line headline — left-aligned, upper third */}
          <div className="absolute top-[16%] left-0 right-0 flex flex-col items-start pl-6 gap-0">
            {[
              { ref: topRef,    text: slide.headlineTop    },
              { ref: midRef,    text: slide.headlineMiddle },
              { ref: bottomRef, text: slide.headlineBottom },
            ].map(({ ref, text }, i) => (
              <div key={i} ref={ref} style={{ opacity: 0 }}>
                <h2
                  className="font-display font-bold text-white leading-[0.88] tracking-tight select-none"
                  style={{
                    fontSize: 'clamp(2.2rem, 14vw, 3.4rem)',
                    textShadow: '0 4px 40px rgba(0,0,0,0.22)',
                  }}
                >
                  {text}
                </h2>
              </div>
            ))}
          </div>

          {/* Subtitle + CTA — above the fixed bottom nav bar */}
          <div
            ref={infoRef}
            className="absolute left-6 right-6 flex flex-col gap-4"
            style={{ bottom: '52px', opacity: 0 }}
          >
            <p
              className="font-display font-semibold text-white/90 leading-snug"
              style={{
                fontSize: '1rem',
                whiteSpace: 'pre-line',
                textShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }}
            >
              {slide.subtitle}
            </p>
            <div className="pointer-events-auto"><CTAButton text={slide.ctaText} /></div>
          </div>
        </div>
      )
    }

    // ── Desktop hero layout ────────────────────────────────────────────────
    return (
      <div ref={containerRef}
           className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>
        <div className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-[55%] flex flex-col gap-0">
          {[
            { ref: topRef,    text: slide.headlineTop    },
            { ref: midRef,    text: slide.headlineMiddle },
            { ref: bottomRef, text: slide.headlineBottom },
          ].map(({ ref, text }, i) => (
            <div key={i} ref={ref} style={{ opacity: 0 }}>
              <h2 className="font-display font-bold text-white leading-[0.88] tracking-tight select-none
                             text-[2.6rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6.5rem] xl:text-[8rem]"
                  style={{ textShadow: '0 4px 40px rgba(0,0,0,0.22)' }}>
                {text}
              </h2>
            </div>
          ))}
        </div>
        <div ref={infoRef}
             className="absolute left-6 md:left-12 lg:left-16 bottom-[10%] md:bottom-[12%] flex flex-col gap-5"
             style={{ opacity: 0 }}>
          <p className="font-display font-semibold text-white/90 leading-snug"
             style={{
               fontSize: 'clamp(1.05rem, 1.8vw, 1.55rem)',
               whiteSpace: 'pre-line',
               textShadow: '0 2px 16px rgba(0,0,0,0.5)',
             }}>
            {slide.subtitle}
          </p>
          <div className="pointer-events-auto"><CTAButton text={slide.ctaText} /></div>
        </div>
      </div>
    )
  }

  // ── 2-line split ────────────────────────────────────────────────────────
  return (
    <div ref={containerRef}
         className={`absolute inset-0 z-10 pointer-events-none ${active ? 'visible' : 'invisible'}`}>
      <div ref={topRef}
           className={`absolute ${isEven ? 'left-6 md:left-12 lg:left-16' : 'right-6 md:right-12 lg:right-16'} top-[15%] md:top-[18%]`}
           style={{ opacity: 0 }}>
        <h2 className="font-display font-bold text-white text-[3.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] leading-[0.85] tracking-tight select-none"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}>
          {slide.headlineTop}
        </h2>
      </div>

      <div ref={bottomRef}
           className={`absolute ${isEven ? 'right-6 md:right-12 lg:right-16' : 'left-6 md:left-12 lg:left-16'} bottom-[25%] md:bottom-[26%]`}
           style={{ opacity: 0 }}>
        <h2 className="font-display font-bold text-white text-[3.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] leading-[0.85] tracking-tight select-none"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.2)' }}>
          {slide.headlineBottom}
        </h2>
      </div>

      <div ref={infoRef}
           className="absolute left-6 right-6 md:left-12 md:right-12 lg:left-16 lg:right-16 bottom-[12%] md:bottom-[13%] flex items-end justify-between gap-4"
           style={{ opacity: 0 }}>
        <p className="max-w-xs md:max-w-sm font-display text-white/70 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed">
          {slide.subtitle}
        </p>
        <div className="pointer-events-auto shrink-0"><CTAButton text={slide.ctaText} /></div>
      </div>
    </div>
  )
}
