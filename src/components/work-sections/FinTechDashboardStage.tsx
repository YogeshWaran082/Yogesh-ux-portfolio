import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { animateFinTechDashboard } from '@/utils/sectionAnimations'

gsap.registerPlugin(ScrollTrigger)

interface Item {
  img: string
  title?: string
  category?: string
  desc?: string
}

export function FinTechDashboardStage({
  items,
  isMobile,
  sectionHeadingMedium,
}: {
  items: Item[]
  isMobile: boolean
  sectionHeadingMedium: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dashRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    return animateFinTechDashboard(sectionRef)
  }, [])

  useLayoutEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sectionRef.current || !dashRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(dashRef.current, {
        scale: 0.92,
        rotateX: 3,
        opacity: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'center center',
          scrub: 0.6,
        },
      })

      if (leftPanelRef.current) {
        gsap.from(leftPanelRef.current, {
          translateX: -30,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'center center',
            scrub: 0.6,
          },
        })
      }

      if (rightPanelRef.current) {
        gsap.from(rightPanelRef.current, {
          translateX: 30,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'center center',
            scrub: 0.6,
          },
        })
      }

      return () => {
        gsap.killTweensOf([dashRef.current, leftPanelRef.current, rightPanelRef.current])
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section style={{ background: 'var(--bg2)', padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              05 FINTECH
            </p>
            <h2 style={{ ...sectionHeadingMedium, marginBottom: '16px' }}>Dashboard</h2>
            <p style={{ fontSize: '14px', color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
              Data-driven interfaces for modern financial experiences
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {items.slice(0, 2).map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(57,255,136,.2)',
                  background: 'var(--card)',
                }}
              >
                <img
                  src={item.img}
                  alt={item.title || `Dashboard ${i}`}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase' }}>
                    {item.category}
                  </p>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
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
        background: 'var(--bg2)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle green glow background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(57,255,136,.04) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1500px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            05 FINTECH
          </p>
          <h2 style={{ ...sectionHeadingMedium, textAlign: 'center', margin: '0 0 20px' }}>
            Dashboard
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text3)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
            Data-driven interfaces for modern financial experiences
          </p>
        </div>

        {/* Stage: Left | Center | Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 22%) minmax(0, 1fr) minmax(280px, 22%)', gap: '32px', alignItems: 'center', minHeight: '500px' }}>
          {/* LEFT PANEL */}
          <div
            className="uniform-work-card"
            ref={leftPanelRef}
            style={{
              borderRadius: '14px',
              border: '1px solid rgba(57,255,136,.2)',
              overflow: 'hidden',
              background: 'var(--card)',
              boxShadow: '0 10px 40px rgba(0,0,0,.2)',
            }}
          >
            {items[1] && (
              <>
                <img
                  src={items[1].img}
                  alt={items[1].title || 'Detail'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '18px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase' }}>
                    {items[1].category || 'Detail'}
                  </p>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                    {items[1].title || 'Supporting Panel'}
                  </h3>
                </div>
              </>
            )}
          </div>

          {/* CENTER DASHBOARD */}
          <div
            className="uniform-work-card"
            ref={dashRef}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              maxHeight: '65svh',
              borderRadius: '16px',
              border: '1px solid rgba(57,255,136,.3)',
              overflow: 'hidden',
              background: 'var(--card)',
              boxShadow: '0 0 60px rgba(57,255,136,.15), 0 30px 80px rgba(0,0,0,.4)',
              transformStyle: 'preserve-3d',
            }}
          >
            {items[0] && (
              <>
                <img
                  src={items[0].img}
                  alt={items[0].title || 'Dashboard'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '28px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 10px', textTransform: 'uppercase' }}>
                    {items[0].category || 'Product Design'}
                  </p>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>
                    {items[0].title || 'Dashboard Overview'}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text3)', margin: 0, lineHeight: 1.6 }}>
                    {items[0].desc || 'Premium financial dashboard with real-time analytics and user-focused design.'}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div
            className="uniform-work-card"
            ref={rightPanelRef}
            style={{
              borderRadius: '14px',
              border: '1px solid rgba(57,255,136,.2)',
              overflow: 'hidden',
              background: 'var(--card)',
              boxShadow: '0 10px 40px rgba(0,0,0,.2)',
            }}
          >
            {items[2] && (
              <>
                <img
                  src={items[2].img}
                  alt={items[2].title || 'Mobile'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '18px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase' }}>
                    {items[2].category || 'Mobile'}
                  </p>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                    {items[2].title || 'Mobile View'}
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
              padding: '12px 28px',
              borderRadius: '9999px',
              border: '1px solid rgba(57,255,136,.3)',
              background: 'transparent',
              color: 'var(--accent)',
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
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,136,.3)'
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              const arrow = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement
              if (arrow) arrow.style.transform = 'translateX(0)'
            }}
          >
            VIEW CASE STUDY
            <ArrowUpRight size={12} style={{ transition: 'transform 0.3s' }} />
          </button>
        </div>
      </div>
    </section>
  )
}
