import { useEffect } from 'react'
import { ArrowUpRight, Award, CheckCircle2, X } from 'lucide-react'

export interface CertificationData {
  number: string
  title: string
  issuer: string
  year: string
  skills: string[]
  verificationUrl?: string
}

interface CertificationsModalProps {
  cert: CertificationData | null
  onClose: () => void
}

export function CertificationsModal({ cert, onClose }: CertificationsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (cert) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cert, onClose])

  if (!cert) return null

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} details`}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 6, 0.94)',
        backdropFilter: 'blur(16px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#0c0f0d',
          border: '1.5px solid rgba(82, 249, 122, 0.4)',
          borderRadius: '16px',
          padding: '36px 32px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.85), 0 0 50px rgba(82,249,122,0.12)',
          animation: 'slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#f4f1ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(82, 249, 122, 0.15)'
            e.currentTarget.style.borderColor = '#52f97a'
            e.currentTarget.style.color = '#52f97a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.color = '#f4f1ea'
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Badge & Number */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(82, 249, 122, 0.1)',
              border: '1px solid rgba(82, 249, 122, 0.3)',
              color: '#52f97a',
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Award size={12} />
            VERIFIED CREDENTIAL
          </span>
          <span style={{ color: '#737873', fontFamily: "'DM Mono', monospace", fontSize: '11px' }}>
            {cert.number}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            margin: '0 0 10px',
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontSize: 'clamp(28px, 4vw, 38px)',
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: '#f4f1ea',
            letterSpacing: '-0.02em',
          }}
        >
          {cert.title}
        </h3>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '22px' }}>
          <span style={{ color: '#52f97a', fontFamily: "'DM Mono', monospace", fontSize: '11px' }}>
            {cert.issuer}
          </span>
          <span style={{ color: '#737873' }}>•</span>
          <span style={{ color: '#a4a8a3', fontFamily: "'DM Mono', monospace", fontSize: '11px' }}>
            {cert.year}
          </span>
        </div>

        {/* Key Competencies / Skills */}
        <div style={{ marginBottom: '28px' }}>
          <span
            style={{
              display: 'block',
              color: '#737873',
              fontFamily: "'DM Mono', monospace",
              fontSize: '9.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            VERIFIED COMPETENCIES
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cert.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#f4f1ea',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '10px',
                }}
              >
                <CheckCircle2 size={12} color="#52f97a" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <a
          href="https://www.linkedin.com/in/m-yogesh-waran-b303a7282"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '13px 20px',
            borderRadius: '8px',
            backgroundColor: '#52f97a',
            color: '#08110a',
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'box-shadow 0.25s ease, transform 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(82, 249, 122, 0.5)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'none'
          }}
        >
          View Verified LinkedIn Credential <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  )
}
