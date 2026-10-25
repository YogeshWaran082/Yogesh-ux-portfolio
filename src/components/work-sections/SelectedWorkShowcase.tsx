import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { animateSelectedWork } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Item {
  img: string
  title?: string
  category?: string
  desc?: string
}

export function SelectedWorkShowcase({
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

  useLayoutEffect(() => {
    return animateSelectedWork(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !stageRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(stageRef.current, {
        scale: 0.94,
        rotateX: 4,
        opacity: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'center center',
          scrub: 0.6,
        },
      })

      return () => {
        gsap.killTweensOf(stageRef.current)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section style={{ background: 'var(--bg)', padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              07 SELECTED
            </p>
            <h2 style={{ ...sectionHeadingMedium, marginBottom: '16px' }}>Work</h2>
            <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              A curated selection of projects that define my design journey
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {items.slice(0, 2).map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.12)',
                  background: 'var(--card)',
                }}
              >
                <img
                  src={item.img}
                  alt={item.title || `Project ${i}`}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '24px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase' }}>
                    {item.category}
                  </p>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                    {item.title}
                  </h3>
                </div>
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
        overflow: 'hidden',
      }}
    >
      {/* Subtle flowing green background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(57,255,136,.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)',
        }}
      />

      <div style={{ maxWidth: '1500px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            07 SELECTED
          </p>
          <h2 style={{ ...sectionHeadingMedium, textAlign: 'center', margin: '0 0 20px' }}>
            Work
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text3)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
            A curated selection of projects that define my design journey
          </p>
        </div>

        {/* Stage: Left | Center Laptop | Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '20% 1fr 20%', gap: '40px', alignItems: 'center', minHeight: '520px' }}>
          {/* LEFT SUPPORTING */}
          <div
            className="uniform-work-card"
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,.12)',
              overflow: 'hidden',
              background: 'var(--card)',
              opacity: 0.8,
              transform: 'scale(0.95)',
            }}
          >
            {items[1] && (
              <>
                <img
                  src={items[1].img}
                  alt={items[1].title || 'Supporting'}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase' }}>
                    {items[1].category || 'Design'}
                  </p>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                    {items[1].title || 'Project'}
                  </h3>
                </div>
              </>
            )}
          </div>

          {/* CENTER HERO LAPTOP */}
          <div
            className="uniform-work-card"
            ref={stageRef}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              maxHeight: '68svh',
              borderRadius: '16px',
              border: '1px solid rgba(57,255,136,.25)',
              overflow: 'hidden',
              background: 'var(--card)',
              boxShadow: '0 0 80px rgba(57,255,136,.2), 0 40px 100px rgba(0,0,0,.5)',
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
          >
            {items[0] && (
              <>
                <img
                  src={items[0].img}
                  alt={items[0].title || 'Selected Work'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '32px', background: 'rgba(0,0,0,.4)' }}>
                  <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase' }}>
                    {items[0].category || 'Design'}
                  </p>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: '0 0 14px' }}>
                    {items[0].title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text3)', margin: 0, lineHeight: 1.6 }}>
                    {items[0].desc || 'Premium design with curated selection of best work and case studies.'}
                  </p>
                </div>
              </>
            )}

            {/* Floating accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: '40px',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, rgba(57,255,136,0), var(--accent))',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* RIGHT SUPPORTING */}
          <div
            className="uniform-work-card"
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,.12)',
              overflow: 'hidden',
              background: 'var(--card)',
              opacity: 0.8,
              transform: 'scale(0.95)',
            }}
          >
            {items[2] && (
              <>
                <img
                  src={items[2].img}
                  alt={items[2].title || 'Supporting'}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase' }}>
                    {items[2].category || 'Design'}
                  </p>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                    {items[2].title || 'Project'}
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button
            onClick={() => window.scrollBy({ top: 200, behavior: 'smooth' })}
            style={{
              padding: '14px 32px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,.2)',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: '12px',
              fontWeight: 700,
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
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.2)'
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
              if (arrow) arrow.style.transform = 'translateX(0)'
            }}
          >
            EXPLORE WORK
            <ArrowUpRight size={12} style={{ transition: 'transform 0.3s' }} />
          </button>
        </div>
      </div>
    </section>
  )
}
