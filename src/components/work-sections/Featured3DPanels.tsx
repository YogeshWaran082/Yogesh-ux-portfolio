import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { PremiumCard } from '@/components/PremiumCard'
import { animateFeaturedProjects } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  category: string
  year: string
  img: string
  desc: string
}

export function Featured3DPanels({
  items,
  isMobile,
  sectionHeadingMedium,
}: {
  items: Project[]
  isMobile: boolean
  sectionHeadingMedium: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    return animateFeaturedProjects(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !carouselRef.current) return

    const ctx = gsap.context(() => {
      const panels = Array.from(carouselRef.current!.querySelectorAll('[data-panel]')) as HTMLElement[]
      if (panels.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(items.length - 1) * 400}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const idx = Math.round(progress * (items.length - 1))
            setActiveIndex(Math.min(idx, items.length - 1))

            panels.forEach((panel, i) => {
              const dist = i - progress * (items.length - 1)
              const scale = Math.max(0.8, 1 - Math.abs(dist) * 0.15)
              const rotateY = -dist * 5
              const translateZ = -Math.abs(dist) * 150
              const opacity = Math.max(0.3, 1 - Math.abs(dist) * 0.5)

              panel.style.transform = `
                translateX(${dist * 260}px)
                translateZ(${translateZ}px)
                scale(${scale})
                rotateY(${rotateY}deg)
              `
              panel.style.opacity = String(opacity)
              panel.style.zIndex = String(panels.length - Math.ceil(Math.abs(dist)))
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
              01 FEATURED
            </p>
            <h2 style={{ ...sectionHeadingMedium }}>Projects</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {items.map((item, i) => (
              <div key={i} style={{ height: '340px' }}>
                <PremiumCard
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  number={String(i + 1)}
                  glowColor={['green', 'cyan', 'blue', 'orange', 'purple', 'red'][i % 6] as any}
                  alt={item.title}
                  index={i}
                  sizeClass="featured-main-card"
                  imageFit="cover"
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
          <p data-featured-counter style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, margin: '0 0 24px' }}>
            01
          </p>
          <h2 data-featured-title style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text)', margin: '0 0 20px', lineHeight: 1.1 }}>
            FEATURED
            <br />
            PROJECTS
          </h2>
          <p data-featured-desc style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '280px' }}>
            Selected case studies and product experiences
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
            EXPLORE
            <ArrowUpRight size={13} style={{ transition: 'transform 0.3s' }} />
          </button>
        </div>

        {/* CENTER: 3D Carousel */}
        <div
          ref={carouselRef}
          style={{
            perspective: '1400px',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.slice(0, 3).map((item, i) => (
            <div
              key={i}
              data-panel
              style={{
                position: 'absolute',
                width: 'clamp(620px, 52vw, 1100px)',
                aspectRatio: '16 / 9',
                maxHeight: '68svh',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <div data-featured-card={i === 1 ? 'center' : i === 0 ? 'left' : 'right'}>
                <PremiumCard
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  number={String(i + 1)}
                  glowColor={['green', 'cyan', 'blue'][i % 3] as any}
                  alt={item.title}
                  sizeClass={i === 1 ? 'featured-main-card' : 'featured-side-card'}
                  imageFit="cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Stats */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text4)', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              IDEAS
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              Interfaces &amp; Impact
            </p>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,.1)', marginBottom: '32px' }} />
          <p style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>
            Showcasing 6+ premium projects from design to delivery.
          </p>
        </div>
      </div>
    </section>
  )
}
