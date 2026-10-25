import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    icon: '10+',
    title: 'Mobile & Dashboard Designs',
    desc: 'Designed 10+ mobile and dashboard UI concepts for fintech and SaaS products',
  },
  {
    icon: '20%',
    title: 'Improved Efficiency',
    desc: 'Improved workflow efficiency and usability through accessibility-focused design decisions',
  },
  {
    icon: '∞',
    title: 'Reusable Systems',
    desc: 'Built reusable component systems reducing design inconsistencies across teams',
  },
  {
    icon: '100%',
    title: 'Responsive Solutions',
    desc: 'Delivered responsive UI solutions optimized for developer handoff and scalability',
  },
]

export function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      const cards = Array.from(gridRef.current!.querySelectorAll('[data-achievement]')) as HTMLElement[]

      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 0.4,
          },
          delay: i * 0.1,
        })
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glow background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(57,255,136,.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Award size={18} style={{ color: 'var(--accent)', strokeWidth: 1.5 }} />
            <p
              style={{
                fontSize: '11px',
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Achievements
            </p>
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.2vw, 52px)',
              fontWeight: 900,
              color: 'var(--text)',
              margin: '0 0 20px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Key Milestones
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text3)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Accomplishments and impact across design projects
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              data-achievement
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid rgba(57,255,136,.25)',
                background: 'linear-gradient(135deg, rgba(10,13,11,0.8) 0%, rgba(5,5,5,0.95) 100%)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(57,255,136,.1), 0 16px 48px rgba(0,0,0,.4)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(57,255,136,.6)'
                el.style.boxShadow = '0 0 60px rgba(57,255,136,.2), 0 20px 60px rgba(0,0,0,.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(57,255,136,.25)'
                el.style.boxShadow = '0 0 40px rgba(57,255,136,.1), 0 16px 48px rgba(0,0,0,.4)'
              }}
            >
              {/* Icon background glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '-60px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(57,255,136,.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  filter: 'blur(20px)',
                }}
              />

              {/* Corner accent light */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '120px',
                  height: '120px',
                  background: 'radial-gradient(circle at top-left, rgba(57,255,136,.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Number/Icon */}
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: 'var(--accent)',
                  marginBottom: '16px',
                  lineHeight: 1,
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: '0 0 12px',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text3)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>

              {/* Accent line with glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--accent), transparent)',
                  boxShadow: '0 0 20px rgba(57,255,136,.4)',
                  opacity: 0.6,
                }}
              />

              {/* Right edge accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(180deg, var(--accent), transparent)',
                  opacity: 0.4,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
