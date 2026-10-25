import React from 'react'
import { motion } from 'framer-motion'
import { Check, Grid2X2, Plus, UsersRound } from 'lucide-react'

interface ProfileCardProps {
  scrollTo: (id: string) => void
}

export function EnhancedAboutSection({ sectionHeadingMedium, profileImg }: ProfileCardProps & { sectionHeadingMedium: React.CSSProperties; profileImg: string }) {
  const stats = [
    { value: '1.3+', label: 'Years experience' },
    { value: '10+', label: 'UI concepts built' },
    { value: '3+', label: 'Projects shipped' },
    { value: '2', label: 'Certifications' },
  ]

  return (
    <section id="about" style={{ background: 'var(--bg)', padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)' }}>
      <div className="about-reference-grid" style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) minmax(0, 1fr)', gap: 'clamp(48px, 8vw, 120px)', alignItems: 'start' }}>
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderRadius: '28px', padding: '14px', background: 'var(--card)', border: '1px solid var(--border)', boxShadow: '0 28px 70px rgba(0,0,0,.28)' }}
        >
          <div style={{ height: '320px', borderRadius: '18px', overflow: 'hidden', background: 'var(--bg2)', position: 'relative' }}>
            <img src={profileImg} alt="Yogesh Waran" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: '45% 0 0', background: 'linear-gradient(to bottom, transparent, rgba(8,8,8,.88))' }} />
          </div>
          <div style={{ padding: '18px 8px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', margin: 0 }}>Yogesh Waran</h3>
              <span aria-label="Verified" style={{ width: '17px', height: '17px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: 'var(--accent-fg)' }}><Check size={11} strokeWidth={3} /></span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--text3)', margin: '8px 0 20px' }}>Product Designer focused on simplicity &amp; usability</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text3)', fontSize: '13px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><UsersRound size={15} strokeWidth={1.6} /> 524</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Grid2X2 size={14} strokeWidth={1.6} /> 16</span>
              </div>
              <button type="button" aria-label="Follow Yogesh Waran" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '9999px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Follow <span style={{ width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--text)', color: 'var(--bg)' }}><Plus size={12} strokeWidth={2.5} /></span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: 'clamp(0px, 1vw, 16px)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <img src={profileImg} alt="" aria-hidden="true" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center', border: '2px solid var(--accent)', padding: '2px' }} />
            <div><p style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 700, margin: 0 }}>Yogesh Waran</p><p style={{ color: 'var(--text4)', fontSize: '12px', margin: '3px 0 0' }}>Product Designer (UI/UX)</p></div>
          </div>
          <p style={{ color: 'var(--text4)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 14px' }}>My Professional</p>
          <h2 style={{ ...sectionHeadingMedium, fontSize: 'clamp(42px, 5.2vw, 68px)', lineHeight: .92, margin: '0 0 42px', maxWidth: '650px' }}>Designing products<br />people <span style={{ color: 'var(--accent)', padding: '0 10px', border: '1px solid var(--accent-border)', borderRadius: '10px' }}>actually</span> use</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(120px, 1fr))', gap: '26px 48px', maxWidth: '520px', marginBottom: '36px' }}>
            {stats.map((stat) => <div key={stat.label}><p style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontSize: 'clamp(42px, 5vw, 62px)', fontWeight: 900, lineHeight: .9, color: 'var(--text)', margin: 0 }}>{stat.value}</p><p style={{ fontSize: '13px', color: 'var(--text4)', margin: '8px 0 0' }}>{stat.label}</p></div>)}
          </div>
          <div style={{ padding: '22px 24px', borderRadius: '20px', background: 'var(--card)', border: '1px solid var(--border)', maxWidth: '640px' }}>
            <p style={{ fontSize: '10px', color: 'var(--text4)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 12px' }}>Education</p>
            <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text)', margin: '0 0 5px' }}>B.Sc Information Technology</p>
            <p style={{ fontSize: '13px', color: 'var(--text3)', margin: '0 0 4px' }}>C.P.A College, Madurai Kamaraj University</p>
            <p style={{ fontSize: '12px', color: 'var(--text4)', margin: 0 }}>Tamil Nadu, India · 2021 – 2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
