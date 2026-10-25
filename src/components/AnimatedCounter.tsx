import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  value: string
  label: string
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const elementRef = useRef<HTMLDivElement>(null)

  // Parse numeric part and suffix (e.g., "1.3+" -> number 1.3, suffix "+")
  const match = value.match(/([\d.]+)(.*)/)
  const targetNumber = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const isDecimal = value.includes('.')

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value)
      return
    }

    const obj = { val: 0 }

    const tween = gsap.to(obj, {
      val: targetNumber,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        setDisplayValue(
          isDecimal
            ? obj.val.toFixed(1) + suffix
            : Math.round(obj.val) + suffix
        )
      },
      onComplete: () => {
        setDisplayValue(value)
      },
    })

    return () => {
      tween.kill()
    }
  }, [value, targetNumber, suffix, isDecimal])

  return (
    <div
      ref={elementRef}
      className="metric-counter-item"
      style={{
        position: 'relative',
        transition: 'transform 0.3s ease',
      }}
    >
      <strong
        style={{
          display: 'block',
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(38px, 4.2vw, 56px)',
          lineHeight: 0.9,
          color: '#f4f1ea',
          letterSpacing: '-0.02em',
        }}
      >
        {displayValue}
      </strong>
      <span
        style={{
          display: 'block',
          marginTop: '8px',
          color: '#737873',
          fontFamily: "'DM Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  )
}
