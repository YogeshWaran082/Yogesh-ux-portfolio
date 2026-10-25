import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { PremiumCard } from '@/components/PremiumCard'
import { animateIndependentProjects } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  category: string
  year: string
  img: string
  tags?: string[]
  desc?: string
}

export function IndependentPortraitCards({
  items,
  isMobile,
  sectionHeadingMedium,
}: {
  items: Project[]
  isMobile: boolean
  sectionHeadingMedium: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    return animateIndependentProjects(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      const cards = Array.from(cardsRef.current!.querySelectorAll('[data-ind-card]')) as HTMLElement[]
      if (cards.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(items.length - 1) * 350}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const idx = Math.round(progress * (items.length - 1))
            setActiveIndex(Math.min(idx, items.length - 1))

            cards.forEach((card, i) => {
              const dist = i - progress * (items.length - 1)
              const scale = Math.max(0.82, 1 - Math.abs(dist) * 0.18)
              const rotateZ = dist * 4
              const translateZ = -Math.abs(dist) * 100
              const opacity = Math.max(0.25, 1 - Math.abs(dist) * 0.55)
              const translateY = dist * 40

              card.style.transform = `
                translateY(${translateY}px)
                translateZ(${translateZ}px)
                scale(${scale})
                rotateZ(${rotateZ}deg)
              `
              card.style.opacity = String(opacity)
              card.style.zIndex = String(cards.length - Math.ceil(Math.abs(dist)))
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
              02 INDEPENDENT
            </p>
            <h2 style={{ ...sectionHeadingMedium }}>Projects</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {items.map((item, i) => (
              <div key={i} style={{ height: '400px' }}>
                <PremiumCard
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  number={String(i + 1)}
                  glowColor={['green', 'cyan', 'blue', 'purple'][i % 4] as any}
                  alt={item.title}
                  index={i}
                  sizeClass="independent-main-card"
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
          <p style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, margin: '0 0 24px' }}>
            02
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text)', margin: '0 0 20px', lineHeight: 1.1 }}>
            INDEPENDENT
            <br />
            PROJECTS
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '280px' }}>
            Personal explorations, freelance projects and creative experiments
          </p>
          <button
            onClick={() => window.scrollBy({ top: 200, behavior: 'smooth' })}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              border: '1px solid rgba(57,255,136,.3)',
              background: 'transparent',
              color: 'var(--accent)',
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
              (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,136,.08)'
              const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
              if (arrow) arrow.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,136,.3)'
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
              if (arrow) arrow.style.transform = 'translateX(0)'
            }}
          >
            EXPLORE MORE
            <ArrowUpRight size={13} style={{ transition: 'transform 0.3s' }} />
          </button>
        </div>

        {/* CENTER: Portrait Floating Cards */}
        <div
          ref={cardsRef}
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
              data-ind-card
              style={{
                position: 'absolute',
                width: 'clamp(300px, 24vw, 420px)',
                aspectRatio: '3 / 4',
                maxHeight: '600px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <PremiumCard
                img={item.img}
                title={item.title}
                category={item.category}
                number={String(i + 1)}
                glowColor={['green', 'cyan', 'blue'][i % 3] as any}
                alt={item.title}
                sizeClass={i === 1 ? 'independent-main-card' : 'independent-secondary-card'}
                imageFit="cover"
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Editorial */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text4)', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              EXPLORATION
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              NEVER ENDS
            </p>
          </div>
          <div style={{ height: '1px', background: 'rgba(57,255,136,.2)', marginBottom: '32px' }} />
          <p style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>
            Experimental work from travel apps to wellness platforms and beyond.
          </p>
        </div>
      </div>
    </section>
  )
}
