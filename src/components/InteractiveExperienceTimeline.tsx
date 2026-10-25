import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface ExperienceItem {
  year: string
  role: string
  company: string
  copy: string
}

export function InteractiveExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [railProgress, setRailProgress] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 0.9,
        onUpdate: (self) => {
          setRailProgress(self.progress)
          const index = Math.min(items.length - 1, Math.floor(self.progress * items.length))
          setActiveIdx(index)
        },
      })

      // Staggered reveal for rows
      rowsRef.current.forEach((row, i) => {
        if (!row) return
        gsap.fromTo(
          row,
          { opacity: 0.4, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      return () => {
        st.kill()
      }
    })

    return () => mm.revert()
  }, [items.length])

  return (
    <div
      ref={containerRef}
      className="experience-timeline-container"
    >
      {/* Vertical glowing timeline rail */}
      <div className="experience-rail-track">
        <div
          className="experience-rail-fill"
          style={{
            height: `${Math.max(8, railProgress * 100)}%`,
          }}
        />
      </div>

      {items.map((item, idx) => {
        const isActive = idx === activeIdx

        return (
          <div
            key={`${item.year}-${item.role}`}
            ref={(el) => {
              rowsRef.current[idx] = el
            }}
            className={`experience-row ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveIdx(idx)}
            onClick={() => setActiveIdx(idx)}
          >
            {/* Year with indicator dot */}
            <div className="experience-year-col">
              <span className="experience-year-text">
                {item.year}
              </span>
              {isActive && <span className="experience-dot" />}
            </div>

            {/* Content: Role, Company, Description */}
            <div className="experience-content-col">
              <h3 className="experience-role">
                {item.role}
              </h3>
              <span className="experience-company">
                {item.company}
              </span>
              <p className="experience-copy">
                {item.copy}
              </p>
            </div>

            {/* Action Arrow */}
            <div className="experience-arrow-col">
              <ArrowUpRight
                className="experience-arrow-icon"
                size={22}
              />
            </div>
          </div>
        )
      })}

      <style>{`
        .experience-timeline-container {
          position: relative;
          width: 100%;
          border-top: 1px solid var(--line);
        }

        .experience-rail-track {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 160px;
          width: 2px;
          background-color: rgba(255, 255, 255, 0.08);
          z-index: 1;
        }

        .experience-rail-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #52f97a;
          box-shadow: 0 0 14px #52f97a;
          transition: height 0.15s ease-out;
        }

        .experience-row {
          position: relative;
          display: grid;
          grid-template-columns: 180px 1fr 32px;
          grid-template-areas: "year content arrow";
          gap: 32px;
          align-items: start;
          padding: 32px 0;
          border-bottom: 1px solid var(--line);
          transition: all 0.35s ease;
          background-color: transparent;
          cursor: pointer;
          z-index: 2;
        }

        .experience-row.is-active {
          background-color: rgba(82, 249, 122, 0.02);
          padding-left: 12px;
        }

        .experience-year-col {
          grid-area: year;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .experience-year-text {
          color: var(--faint);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: color 0.3s ease;
        }

        .experience-row.is-active .experience-year-text {
          color: #52f97a;
        }

        .experience-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #52f97a;
          box-shadow: 0 0 8px #52f97a;
          display: inline-block;
          flex-shrink: 0;
        }

        .experience-content-col {
          grid-area: content;
          min-width: 0;
        }

        .experience-role {
          margin: 0 0 8px;
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 3.8vw, 54px);
          line-height: 0.88;
          text-transform: uppercase;
          color: var(--text);
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
          overflow-wrap: break-word;
          word-break: normal;
        }

        .experience-row.is-active .experience-role {
          color: #f4f1ea;
        }

        .experience-company {
          display: inline-block;
          color: #52f97a;
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }

        .experience-copy {
          max-width: 540px;
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 12.5px;
          line-height: 1.7;
          font-family: 'Manrope', sans-serif;
          transition: color 0.3s ease;
        }

        .experience-row.is-active .experience-copy {
          color: #f4f1ea;
        }

        .experience-arrow-col {
          grid-area: arrow;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-top: 6px;
        }

        .experience-arrow-icon {
          color: var(--faint);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .experience-row.is-active .experience-arrow-icon {
          color: #52f97a;
          transform: translate(3px, -3px) scale(1.15);
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .experience-row {
            grid-template-columns: 140px 1fr 28px;
            gap: 20px;
            padding: 28px 0;
          }
          .experience-rail-track {
            left: 130px;
          }
        }

        @media (max-width: 767px) {
          .experience-rail-track {
            display: none !important;
          }

          .experience-row {
            display: grid !important;
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto auto !important;
            grid-template-areas:
              "year arrow"
              "content content" !important;
            gap: 12px 16px !important;
            padding: 22px 0 26px !important;
            padding-left: 0 !important;
            border-left: none !important;
          }

          .experience-row.is-active {
            padding-left: 0 !important;
            background-color: rgba(82, 249, 122, 0.03) !important;
          }

          .experience-year-col {
            grid-area: year !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }

          .experience-year-text {
            font-size: 11px !important;
            letter-spacing: 0.04em !important;
          }

          .experience-arrow-col {
            grid-area: arrow !important;
            display: flex !important;
            justify-content: flex-end !important;
            align-items: center !important;
            padding-top: 0 !important;
          }

          .experience-arrow-icon {
            width: 18px !important;
            height: 18px !important;
          }

          .experience-content-col {
            grid-area: content !important;
            grid-column: 1 / -1 !important;
            width: 100% !important;
            margin-top: 2px !important;
          }

          .experience-role {
            font-size: clamp(26px, 7vw, 36px) !important;
            line-height: 0.96 !important;
            margin: 0 0 6px !important;
            letter-spacing: -0.01em !important;
          }

          .experience-company {
            font-size: 11px !important;
            letter-spacing: 0.07em !important;
            margin-bottom: 8px !important;
          }

          .experience-copy {
            max-width: 100% !important;
            font-size: 13px !important;
            line-height: 1.6 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
