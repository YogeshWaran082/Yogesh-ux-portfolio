import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { animateDesignGallery } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Item {
  img: string
  alt?: string
}

export function DesignExhibitionGallery({
  items,
  isMobile,
  sectionHeadingMedium,
}: {
  items: Item[]
  isMobile: boolean
  sectionHeadingMedium: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    return animateDesignGallery(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !stageRef.current) return

    const ctx = gsap.context(() => {
      const artworks = Array.from(stageRef.current!.querySelectorAll('[data-artwork]')) as HTMLElement[]
      if (artworks.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(items.length - 1) * 380}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const idx = Math.round(progress * (items.length - 1))
            setActiveIndex(Math.min(idx, items.length - 1))

            artworks.forEach((artwork, i) => {
              const dist = i - progress * (items.length - 1)
              const scale = Math.max(0.82, 1 - Math.abs(dist) * 0.18)
              const rotateY = -dist * 6
              const translateZ = -Math.abs(dist) * 160
              const opacity = Math.max(0.15, 1 - Math.abs(dist) * 0.6)
              const rotateZ = dist * 2

              artwork.style.transform = `
                translateZ(${translateZ}px)
                scale(${scale})
                rotateY(${rotateY}deg)
                rotateZ(${rotateZ}deg)
              `
              artwork.style.opacity = String(opacity)
              artwork.style.zIndex = String(artworks.length - Math.ceil(Math.abs(dist)))
            })
          },
        },
      })

      return () => {
        tl.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, items.length])

  if (isMobile) {
    return (
      <section style={{ background: 'var(--bg)', padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              04 DESIGN
            </p>
            <h2 style={{ ...sectionHeadingMedium }}>Gallery</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.12)',
                  background: 'var(--card)',
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src={item.img}
                  alt={item.alt || `Design ${i}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1500px', margin: '0 auto', display: 'grid', gridTemplateColumns: '18% 1fr 18%', gap: '40px', alignItems: 'center', height: '70vh' }}>
        {/* LEFT: Title + CTA */}
        <div>
          <p style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, margin: '0 0 24px' }}>
            04
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text)', margin: '0 0 20px', lineHeight: 1.1 }}>
            DESIGN
            <br />
            GALLERY
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '280px' }}>
            A collection of visual stories, posters, branding and creative artworks
          </p>
          <button
            onClick={() => window.scrollBy({ top: 200, behavior: 'smooth' })}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,.2)',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
              const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
              if (arrow) arrow.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.2)'
              const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
              if (arrow) arrow.style.transform = 'translateX(0)'
            }}
          >
            EXPLORE GALLERY
            <ArrowUpRight size={13} style={{ transition: 'transform 0.3s' }} />
          </button>
        </div>

        {/* CENTER: Exhibition Fan Gallery */}
        <div
          ref={stageRef}
          style={{
            perspective: '1600px',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="uniform-work-card"
              data-artwork
              style={{
                position: 'absolute',
                width: 'clamp(280px, 22vw, 420px)',
                aspectRatio: '2 / 3',
                maxHeight: '620px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,.12)',
                overflow: 'hidden',
                background: 'var(--card)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 20px 50px rgba(0,0,0,.4)',
              }}
            >
              <img
                src={item.img}
                alt={item.alt || `Design ${i}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Gallery Info */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text4)', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              ART
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              BRANDING
              <br />
              POSTERS
              <br />
              CREATIVE
            </p>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,.1)', marginBottom: '32px' }} />
          <p style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>
            Visuals that speak louder than words.
          </p>
        </div>
      </div>
    </section>
  )
}
