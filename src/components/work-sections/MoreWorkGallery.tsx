import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { PremiumCard } from '@/components/PremiumCard'
import { animateMoreWork } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Item {
  img: string
  alt?: string
  title?: string
  category?: string
}

export function MoreWorkGallery({
  items,
  isMobile,
  sectionHeadingMedium,
}: {
  items: Item[]
  isMobile: boolean
  sectionHeadingMedium: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    return animateMoreWork(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !galleryRef.current) return

    const ctx = gsap.context(() => {
      const cards = Array.from(galleryRef.current!.querySelectorAll('[data-more-card]')) as HTMLElement[]
      if (cards.length === 0) return

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: (i % 2) * 20,
          opacity: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        })
      })

      return () => {
        gsap.killTweensOf(cards)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, items.length])

  if (isMobile) {
    return (
      <section style={{ background: 'var(--bg2)', padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              03 MORE
            </p>
            <h2 style={{ ...sectionHeadingMedium, marginBottom: '20px' }}>Work</h2>
            <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, maxWidth: '500px', margin: 0 }}>
              A quick look at more projects, concepts and creative work
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.1)',
                  background: 'var(--card)',
                  aspectRatio: '1',
                }}
              >
                <img
                  src={item.img}
                  alt={item.alt || item.title || `Item ${i}`}
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
        background: 'var(--bg2)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '20% 1fr 18%', gap: '40px', marginBottom: '60px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, margin: '0 0 20px' }}>
              03
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text)', margin: '0', lineHeight: 1.1 }}>
              MORE
              <br />
              WORK
            </h2>
          </div>

          <div>
            <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: '0' }}>
              A quick look at more projects, concepts and creative work across different disciplines and mediums.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              onClick={() => window.scrollBy({ top: 200, behavior: 'smooth' })}
              style={{
                padding: '11px 22px',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,.15)',
                background: 'transparent',
                color: 'var(--text)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
                if (arrow) arrow.style.transform = 'translateX(3px)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.15)'
                const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
                if (arrow) arrow.style.transform = 'translateX(0)'
              }}
            >
              VIEW ALL
              <ArrowUpRight size={12} style={{ transition: 'transform 0.3s' }} />
            </button>
          </div>
        </div>

        {/* Compact Gallery Grid */}
        <div
          ref={galleryRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="uniform-work-card"
              data-more-card
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.1)',
                background: 'var(--card)',
                width: 'clamp(240px, 18vw, 320px)',
                aspectRatio: '4 / 5',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                const img = (e.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement
                if (img) img.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.1)'
                const img = (e.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement
                if (img) img.style.transform = 'scale(1)'
              }}
            >
              <img
                src={item.img}
                alt={item.alt || item.title || `Item ${i}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s',
                }}
              />
              {item.category && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)',
                    color: 'var(--text)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {item.category}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
