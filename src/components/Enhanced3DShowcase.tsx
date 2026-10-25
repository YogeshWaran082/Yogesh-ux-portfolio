import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { Enhanced3DWorkCard } from './Enhanced3DWorkCard'

gsap.registerPlugin(ScrollTrigger)

/**
 * Enhanced 3D Project Showcase with scroll-driven horizontal animation
 * Features: 3D card effects, parallax, cinematic scroll animations
 */
export function Enhanced3DShowcase({
  title,
  subtitle,
  items,
  isMobile,
  sectionLabel = 'WORK',
  containerStyle = {},
  sectionHeadingMedium = {},
}: {
  title: string
  subtitle?: string
  items: Array<{
    img: string
    title?: string
    category?: string
    desc?: string
    year?: string
    tags?: string[]
    alt?: string
    [key: string]: any
  }>
  isMobile: boolean
  sectionLabel?: string
  containerStyle?: React.CSSProperties
  sectionHeadingMedium?: React.CSSProperties
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    if (isMobile || !sectionRef.current || !stageRef.current || !trackRef.current || items.length === 0)
      return

    const ctx = gsap.context(() => {
      const cards = Array.from(trackRef.current!.querySelectorAll('[data-h-card]')) as HTMLElement[]
      if (cards.length === 0) return

      const cardWidth = cards[0].offsetWidth
      const gap = 24
      const totalDistance = (cardWidth + gap) * (cards.length - 1)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance * 1.8}`,
          scrub: 0.8,
          pin: stageRef.current,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress
            const activeIdx = Math.round(progress * (cards.length - 1))
            setActiveIndex(Math.min(activeIdx, cards.length - 1))

            cards.forEach((card, i) => {
              const dist = i - progress * (cards.length - 1)
              const absDistance = Math.abs(dist)

              // Enhanced 3D effects
              const scale = Math.max(0.75, 1 - absDistance * 0.2)
              const rotateY = -dist * 8
              const translateZ = -absDistance * 200
              const opacity = Math.max(0.2, 1 - absDistance * 0.6)

              card.style.transform = `
                translateX(${dist * (cardWidth + gap)}px)
                translateZ(${translateZ}px)
                scale(${scale})
                rotateY(${rotateY}deg)
              `
              card.style.opacity = String(opacity)
              card.style.zIndex = String(cards.length - Math.ceil(absDistance))
            })
          },
        },
      })

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, items.length])

  if (isMobile) {
    return (
      <section
        style={{
          background: 'var(--bg)',
          padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)',
          ...containerStyle,
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--text4)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                margin: '0 0 8px',
              }}
            >
              {sectionLabel}
            </p>
            <h2 style={{ ...sectionHeadingMedium }}>{title}</h2>
            {subtitle && (
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text3)',
                  marginTop: '16px',
                  maxWidth: '540px',
                  lineHeight: '1.6',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {items.map((item, i) => (
              <Enhanced3DWorkCard
                key={i}
                {...item}
                index={i}
                total={items.length}
              />
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        paddingBottom: 'clamp(60px,8vw,100px)',
        ...containerStyle,
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px,6vw,80px)',
          paddingRight: 'clamp(20px,6vw,80px)',
          paddingTop: 'clamp(60px,8vw,100px)',
        }}
      >
        <div style={{ marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '11px',
              color: 'var(--text4)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              margin: '0 0 8px',
            }}
          >
            {sectionLabel}
          </p>
          <h2 style={{ ...sectionHeadingMedium }}>{title}</h2>
          {subtitle && (
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text3)',
                marginTop: '16px',
                maxWidth: '540px',
                lineHeight: '1.6',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div
        ref={stageRef}
        style={{
          perspective: '1200px',
          height: '70vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={trackRef}
          style={{
            position: 'absolute',
            left: 'clamp(20px,6vw,80px)',
            top: 0,
            height: '100%',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {items.map((item, i) => (
            <Enhanced3DWorkCard
              key={i}
              {...item}
              index={i}
              total={items.length}
            />
          ))}
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  )
}
