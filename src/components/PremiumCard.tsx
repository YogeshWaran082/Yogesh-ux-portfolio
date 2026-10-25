import React from 'react'
import { motion } from 'framer-motion'

interface PremiumCardProps {
  img: string
  title?: string
  category?: string
  number?: string
  glowColor?: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'cyan' | 'white'
  alt?: string
  index?: number
  onClick?: () => void
  sizeClass?: string
  imageFit?: 'cover' | 'contain'
}

const glowMap = {
  green: { border: 'rgba(57,255,136,0.6)', glow: 'rgba(57,255,136,0.3)', light: '#39ff88' },
  blue: { border: 'rgba(100,150,255,0.6)', glow: 'rgba(100,150,255,0.3)', light: '#6496ff' },
  cyan: { border: 'rgba(100,200,255,0.6)', glow: 'rgba(100,200,255,0.3)', light: '#64c8ff' },
  orange: { border: 'rgba(255,150,100,0.6)', glow: 'rgba(255,150,100,0.3)', light: '#ff9664' },
  red: { border: 'rgba(255,100,100,0.6)', glow: 'rgba(255,100,100,0.3)', light: '#ff6464' },
  purple: { border: 'rgba(180,100,255,0.6)', glow: 'rgba(180,100,255,0.3)', light: '#b464ff' },
  white: { border: 'rgba(255,255,255,0.4)', glow: 'rgba(255,255,255,0.2)', light: '#ffffff' },
}

export function PremiumCard({
  img,
  title,
  category,
  number,
  glowColor = 'green',
  alt = 'Card',
  index = 0,
  onClick,
  sizeClass = '',
  imageFit = 'cover',
}: PremiumCardProps) {
  const colors = glowMap[glowColor]

  return (
    <motion.div
      className={`${sizeClass} uniform-work-card`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index ?? 0) * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '14px',
        border: `1.5px solid ${colors.border}`,
        overflow: 'hidden',
        background: 'rgba(10,13,11,0.5)',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: `
          0 0 30px ${colors.glow},
          0 20px 50px rgba(0,0,0,0.4),
          inset 0 0 30px ${colors.glow}
        `,
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = colors.border.replace('0.6', '0.8')
        el.style.boxShadow = `
          0 0 50px ${colors.glow.replace('0.3', '0.5')},
          0 30px 70px rgba(0,0,0,0.5),
          inset 0 0 40px ${colors.glow.replace('0.3', '0.4')}
        `
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = colors.border
        el.style.boxShadow = `
          0 0 30px ${colors.glow},
          0 20px 50px rgba(0,0,0,0.4),
          inset 0 0 30px ${colors.glow}
        `
      }}
    >
      {/* Background glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colors.glow}, transparent 70%)`,
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      />

      {/* Image container */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <img
          src={img}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: imageFit,
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${colors.glow.replace('0.3', '0.15')} 0%, transparent 50%, ${colors.glow.replace('0.3', '0.1')} 100%)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Number badge */}
      {number && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(0,0,0,0.6)',
            border: `1px solid ${colors.light}`,
            fontSize: '11px',
            fontWeight: 700,
            color: colors.light,
            letterSpacing: '0.08em',
            zIndex: 10,
          }}
        >
          {number}
        </div>
      )}

      {/* Info section */}
      {(title || category) && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 12px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          }}
        >
          {title && (
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
                margin: '0 0 4px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
          )}
          {category && (
            <div
              style={{
                fontSize: '11px',
                color: colors.light,
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </div>
          )}
        </div>
      )}

      {/* Corner accent light */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle at top-right, ${colors.glow}, transparent 70%)`,
          pointerEvents: 'none',
          opacity: 0.2,
        }}
      />
    </motion.div>
  )
}
