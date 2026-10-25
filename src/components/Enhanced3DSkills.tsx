import React from 'react'
import { motion } from 'framer-motion'

interface SkillCardProps {
  label: string
  level: string
  index: number
}

/**
 * Enhanced 3D Skill Card with animated progress bars and 3D effects
 */
function Enhanced3DSkillCard({ label, level, index }: SkillCardProps) {
  const levelPercentages: Record<string, number> = {
    Advanced: 95,
    Strong: 80,
    Intermediate: 65,
  }

  const percentage = levelPercentages[level] || 70

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 10 }}
      style={{
        padding: '24px',
        borderRadius: '16px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
          {label}
        </h4>
        <span
          style={{
            fontSize: '12px',
            color: 'var(--accent)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {level}
        </span>
      </div>

      {/* Animated progress bar */}
      <div style={{ height: '6px', background: 'var(--skill-track)', borderRadius: '999px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 + 0.3 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent), rgba(57,255,136,0.5))',
            borderRadius: '999px',
            boxShadow: '0 0 20px rgba(57,255,136,0.4)',
          }}
        />
      </div>
    </motion.div>
  )
}

/**
 * Enhanced Skills Section with 3D animations
 */
export function Enhanced3DSkills({
  skillsData,
  sectionHeadingMedium,
}: {
  skillsData: Array<{ label: string; level: string }>
  sectionHeadingMedium: React.CSSProperties
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'var(--bg2)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p
            style={{
              fontSize: '11px',
              color: 'var(--text4)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              margin: '0 0 16px',
              fontWeight: 600,
            }}
          >
            EXPERTISE
          </p>
          <h2 style={{ ...sectionHeadingMedium, margin: '0 0 20px' }}>
            Core Competencies
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text3)', maxWidth: '540px', margin: '0 auto' }}>
            Advanced skills in UI/UX design, with strong expertise in modern design tools and methodologies
          </p>
        </motion.div>

        {/* Animated grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {skillsData.map((skill, index) => (
            <Enhanced3DSkillCard
              key={skill.label}
              {...skill}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
