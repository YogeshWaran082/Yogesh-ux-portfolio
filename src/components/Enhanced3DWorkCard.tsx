import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

interface Work3DCardProps {
  img: string
  title: string
  category: string
  desc: string
  year?: string
  tags?: string[]
  index: number
  total: number
}

/**
 * Enhanced 3D work card with scroll-driven animations, parallax, and 3D effects
 */
export function Enhanced3DWorkCard({
  img,
  title,
  category,
  desc,
  year,
  tags,
  index,
  total,
}: Work3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!cardRef.current || !imgRef.current) return

    // Parallax on scroll
    gsap.to(imgRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        markers: false,
      },
    })

    // Staggered reveal animation
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 40,
        rotateX: 10,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          markers: false,
        },
      }
    )
  }, [index])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePos({ x: x * 20, y: y * 20 })

    // 3D tilt effect on image
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        rotationX: y * 5,
        rotationY: x * 5,
        transformOrigin: '50% 50%',
        duration: 0.3,
      })
    }
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
      })
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)`,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 60px rgba(57, 255, 136, 0.2)',
      }}
      className="enhanced-work-card"
      data-h-card
      style={{
        flexShrink: 0,
        width: 'clamp(300px,70vw,1200px)',
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--card)',
        display: 'flex',
        flexDirection: 'column',
        willChange: 'transform, box-shadow',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden' as any,
        transition: 'all 0.5s ease',
        cursor: 'pointer',
      }}
    >
      {/* Image with parallax */}
      <div
        style={{
          height: '50%',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(57,255,136,0.1) 0%, rgba(57,255,136,0.05) 100%)',
        }}
      >
        <img
          ref={imgRef}
          src={img}
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: 'clamp(20px,3vw,40px)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minWidth: 0,
        }}
      >
        <div>
          {/* Counter and year */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--accent)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            {year && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: 'var(--tag-bg)',
                  border: '1px solid var(--tag-border)',
                  color: 'var(--text4)',
                }}
              >
                {year}
              </span>
            )}
          </div>

          {/* Category */}
          <p
            style={{
              fontSize: '11px',
              color: 'var(--text4)',
              margin: '0 0 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {category}
          </p>

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(20px,2.5vw,32px)',
              fontWeight: 700,
              color: 'var(--text)',
              margin: '0 0 12px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--text3)',
              margin: '0 0 16px',
            }}
          >
            {desc}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map((tag, ti) => (
                <span
                  key={ti}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-border)',
                    color: 'var(--text4)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <motion.div
            whileHover={{ x: 5 }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--tag-bg)',
              color: 'var(--accent)',
              border: '1px solid var(--tag-border)',
              cursor: 'pointer',
            }}
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
