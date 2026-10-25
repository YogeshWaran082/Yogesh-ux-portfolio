import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface MethodItem {
  number: string
  title: string
  detail: string
}

const defaultMethods: MethodItem[] = [
  { number: '01', title: 'DISCOVERY', detail: 'Stakeholder understanding / problem framing / requirements' },
  { number: '02', title: 'RESEARCH', detail: 'User interviews / competitive analysis / secondary research' },
  { number: '03', title: 'DEFINE', detail: 'Personas / pain points / journeys / problem statements' },
  { number: '04', title: 'STRUCTURE', detail: 'Information architecture / user flows' },
  { number: '05', title: 'DESIGN', detail: 'Wireframes / visual design / design systems' },
  { number: '06', title: 'TEST', detail: 'Prototype validation / usability testing / iteration' },
]

export function InteractiveMethodsTimeline({ items = defaultMethods }: { items?: MethodItem[] }) {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Lightly pin or scroll-scrub progress line across methods
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        end: 'bottom 45%',
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
          const step = Math.min(items.length - 1, Math.floor(self.progress * items.length))
          setActiveStep(step)
        },
      })

      return () => {
        st.kill()
      }
    })

    return () => mm.revert()
  }, [items.length])

  return (
    <div
      ref={sectionRef}
      className="methods-timeline-container"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '20px',
      }}
    >
      {/* Relative container with vertical connecting line */}
      <div
        style={{
          position: 'relative',
          borderTop: '1px solid var(--line)',
        }}
      >
        {/* Left vertical glowing progress line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '26px',
            width: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${Math.max(5, scrollProgress * 100)}%`,
              backgroundColor: '#52f97a',
              boxShadow: '0 0 12px #52f97a',
              transition: 'height 0.15s ease-out',
            }}
          />
        </div>

        {items.map((item, idx) => {
          const isActive = idx === activeStep
          const isPassed = idx < activeStep

          return (
            <div
              key={item.number}
              ref={(el) => {
                rowsRef.current[idx] = el
              }}
              className={`methods-timeline-row ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveStep(idx)}
              onMouseEnter={() => setActiveStep(idx)}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '55px 1fr 1.35fr 25px',
                gap: '20px',
                alignItems: 'center',
                padding: '24px 0',
                borderBottom: '1px solid var(--line)',
                cursor: 'pointer',
                transition: 'opacity 0.35s ease, transform 0.35s ease, background 0.35s ease',
                opacity: isActive ? 1 : isPassed ? 0.75 : 0.38,
                backgroundColor: isActive ? 'rgba(82, 249, 122, 0.025)' : 'transparent',
                paddingLeft: isActive ? '12px' : '0',
                zIndex: 2,
              }}
            >
              {/* Step number with active radar node */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    color: isActive ? '#52f97a' : 'var(--faint)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 600,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.number}
                </span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#52f97a',
                      boxShadow: '0 0 8px #52f97a',
                    }}
                  />
                )}
              </div>

              {/* Title with directional text mask */}
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 3.2vw, 48px)',
                  lineHeight: 0.88,
                  textTransform: 'uppercase',
                  color: isActive ? '#f4f1ea' : 'var(--muted)',
                  letterSpacing: '-0.02em',
                  transition: 'color 0.3s ease',
                }}
              >
                {item.title}
              </h3>

              {/* Detail description */}
              <p
                style={{
                  margin: 0,
                  color: isActive ? '#f4f1ea' : 'var(--muted)',
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  fontFamily: "'Manrope', sans-serif",
                  transition: 'color 0.3s ease',
                }}
              >
                {item.detail}
              </p>

              {/* Arrow icon */}
              <ArrowUpRight
                size={18}
                style={{
                  color: isActive ? '#52f97a' : 'var(--faint)',
                  transform: isActive ? 'translate(2px, -2px) scale(1.15)' : 'none',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }}
              />
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .methods-timeline-row {
            grid-template-columns: 35px 1fr 20px !important;
            gap: 10px !important;
            padding-block: 20px !important;
          }
          .methods-timeline-row p {
            grid-column: 2 / 4 !important;
          }
        }
      `}</style>
    </div>
  )
}
