import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { animateSocialCampaign } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Item {
  img: string
  title?: string
  platform?: string
  size?: string
  tags?: string[]
}

export function SocialCampaignWall({
  items,
  isMobile,
  sectionHeadingMedium,
}: {
  items: Item[]
  isMobile: boolean
  sectionHeadingMedium: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wallRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(2)

  useLayoutEffect(() => {
    return animateSocialCampaign(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !wallRef.current) return

    const ctx = gsap.context(() => {
      const posts = Array.from(wallRef.current!.querySelectorAll('[data-post]')) as HTMLElement[]
      if (posts.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(items.length - 1) * 320}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const idx = Math.round(progress * (items.length - 1))
            setActiveIndex(Math.min(idx, items.length - 1))

            posts.forEach((post, i) => {
              const dist = i - progress * (items.length - 1)
              const scale = Math.max(0.8, 1 - Math.abs(dist) * 0.15)
              const translateX = dist * 180
              const translateZ = -Math.abs(dist) * 120
              const opacity = Math.max(0.3, 1 - Math.abs(dist) * 0.5)
              const rotateZ = dist * 2

              post.style.transform = `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                scale(${scale})
                rotateZ(${rotateZ}deg)
              `
              post.style.opacity = String(opacity)
              post.style.zIndex = String(posts.length - Math.ceil(Math.abs(dist)))
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
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              06 SOCIAL MEDIA
            </p>
            <h2 style={{ ...sectionHeadingMedium, marginBottom: '16px' }}>Design</h2>
            <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              Creative social media content that connects brands with people
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {items.slice(0, 4).map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.1)',
                  background: 'var(--card)',
                  aspectRatio: '9/12',
                }}
              >
                <img
                  src={item.img}
                  alt={item.title || `Post ${i}`}
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
            06
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text)', margin: '0 0 20px', lineHeight: 1.1 }}>
            SOCIAL MEDIA
            <br />
            DESIGN
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: '0 0 32px', maxWidth: '280px' }}>
            Creative social content that connects brands with people
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
            VIEW ALL POSTS
            <ArrowUpRight size={13} style={{ transition: 'transform 0.3s' }} />
          </button>
        </div>

        {/* CENTER: Campaign Wall */}
        <div
          ref={wallRef}
          style={{
            perspective: '1400px',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.slice(0, 5).map((item, i) => (
            <div
              key={i}
              className="uniform-work-card"
              data-post
              style={{
                position: 'absolute',
                width: 'clamp(260px, 20vw, 360px)',
                aspectRatio: '4 / 5',
                maxHeight: '600px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,.12)',
                overflow: 'hidden',
                background: 'var(--card)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 16px 48px rgba(0,0,0,.3)',
              }}
            >
              <img
                src={item.img}
                alt={item.title || `Post ${i}`}
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

        {/* RIGHT: Campaign Info */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text4)', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>
              POSTS
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              CAMPAIGNS
              <br />
              BRAND STORIES
            </p>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,.1)', marginBottom: '32px' }} />
          <p style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>
            Scroll through creative campaigns crafted for engagement and brand impact.
          </p>
        </div>
      </div>
    </section>
  )
}
