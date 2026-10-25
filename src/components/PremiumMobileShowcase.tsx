import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export function PremiumMobileShowcase({ mobileScreens }: { mobileScreens: string[] }) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewportRef = useRef<HTMLDivElement>(null)
  const firstLoopRef = useRef<HTMLDivElement>(null)
  const interactionPausedRef = useRef(false)

  // Close modal on Escape, arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return
      if (e.key === 'Escape') {
        setFullscreenIndex(null)
      } else if (e.key === 'ArrowRight') {
        setFullscreenIndex((prev) => (prev !== null ? (prev + 1) % mobileScreens.length : 0))
      } else if (e.key === 'ArrowLeft') {
        setFullscreenIndex((prev) =>
          prev !== null ? (prev - 1 + mobileScreens.length) % mobileScreens.length : 0
        )
      }
    }

    if (fullscreenIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fullscreenIndex, mobileScreens.length])

  useEffect(() => {
    const viewport = viewportRef.current
    const firstLoop = firstLoopRef.current
    if (
      !viewport ||
      !firstLoop ||
      mobileScreens.length < 2 ||
      fullscreenIndex !== null ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    let animationFrame = 0
    let previousTime = performance.now()
    let isVisible = false
    const pixelsPerSecond = 34

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.08 },
    )
    visibilityObserver.observe(viewport)

    const getLoopDistance = () => {
      const track = firstLoop.parentElement
      const gap = track ? Number.parseFloat(getComputedStyle(track).gap) || 0 : 0
      return firstLoop.offsetWidth + gap
    }

    const animate = (time: number) => {
      const elapsed = Math.min(48, time - previousTime)
      previousTime = time

      if (isVisible && !interactionPausedRef.current && !document.hidden) {
        viewport.scrollLeft += (elapsed / 1000) * pixelsPerSecond
        const loopDistance = getLoopDistance()
        if (loopDistance > 0 && viewport.scrollLeft >= loopDistance)
          viewport.scrollLeft -= loopDistance
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => {
      visibilityObserver.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [fullscreenIndex, mobileScreens.length])

  const updateCurrentIndex = () => {
    const viewport = viewportRef.current
    const firstLoop = firstLoopRef.current
    if (!viewport || !firstLoop || mobileScreens.length < 2) return
    const track = firstLoop.parentElement
    const gap = track ? Number.parseFloat(getComputedStyle(track).gap) || 0 : 0
    const distance = firstLoop.offsetWidth + gap
    const progress = distance > 0 ? (viewport.scrollLeft % distance) / distance : 0
    const nextIndex = Math.min(mobileScreens.length - 1, Math.floor(progress * mobileScreens.length))
    setCurrentIndex((current) => current === nextIndex ? current : nextIndex)
  }

  const handleStripKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const card = viewportRef.current?.querySelector<HTMLElement>('.mobile-screen-card')
    viewportRef.current?.scrollBy({
      left: direction * ((card?.offsetWidth || 220) + 28),
      behavior: 'smooth',
    })
  }

  const pauseAutomaticScroll = () => {
    interactionPausedRef.current = true
  }

  const resumeAutomaticScroll = () => {
    interactionPausedRef.current = false
  }

  return (
    <div
      className="mobile-screens-showcase-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#080a09',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Section Header */}
      <div
        style={{
          position: 'relative',
          padding: '40px clamp(20px, 4vw, 64px) 16px',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <span
            style={{
              color: '#52f97a',
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            13 / INTERFACE EXPLORATIONS
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontSize: 'clamp(42px, 5.5vw, 76px)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#f4f1ea',
            }}
          >
            MOBILE UI <span style={{ color: '#52f97a' }}>SCREENS</span>
          </h2>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: '380px',
            color: '#a4a8a3',
            fontSize: '12px',
            lineHeight: 1.6,
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Selected screens from native mobile product journeys, interaction micro-states, and design system components.
        </p>
      </div>

      {/* Native horizontal strip — deliberately not pinned so later sections stay reachable. */}
      <div
        ref={viewportRef}
        className="mobile-screens-viewport"
        onScroll={updateCurrentIndex}
        onKeyDown={handleStripKeyDown}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') pauseAutomaticScroll()
        }}
        onPointerLeave={resumeAutomaticScroll}
        onPointerDown={pauseAutomaticScroll}
        onPointerUp={resumeAutomaticScroll}
        onPointerCancel={resumeAutomaticScroll}
        onFocus={pauseAutomaticScroll}
        onBlur={resumeAutomaticScroll}
        tabIndex={0}
        role="region"
        aria-label="Automatically scrolling mobile interface gallery. Hover or focus to pause."
      >
      <div
        className="mobile-screens-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          padding: '20px clamp(20px, 6vw, 100px)',
          width: 'max-content',
          willChange: 'transform',
          zIndex: 2,
        }}
      >
        {[0, 1].map((copyIndex) => (
          <div
            key={`mobile-loop-${copyIndex}`}
            ref={copyIndex === 0 ? firstLoopRef : undefined}
            className="mobile-screens-loop-set"
            aria-hidden={copyIndex === 1 ? true : undefined}
          >
            {mobileScreens.map((screen, idx) => (
              <div
                key={`${copyIndex}-${screen}`}
                className="mobile-screen-card"
                data-cursor="PREVIEW"
                onClick={() => setFullscreenIndex(idx)}
                style={{
                  flexShrink: 0,
                  width: 'clamp(200px, 17vw, 245px)',
                  cursor: 'pointer',
                  transition: 'transform 0.32s cubic-bezier(.2,.8,.2,1), opacity 0.25s ease',
                  scrollSnapAlign: 'center',
                }}
              >
                <div
                  className="mobile-device-frame"
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 19.5',
                    borderRadius: '34px',
                    border: '1.5px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: '#0c0f0d',
                    overflow: 'hidden',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    padding: '6px',
                  }}
                >
                  {/* Device Dynamic Island / Speaker Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '54px',
                      height: '14px',
                      backgroundColor: '#000',
                      borderRadius: '12px',
                      zIndex: 4,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  />

                  {/* Inner Screen Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '28px',
                      overflow: 'hidden',
                      backgroundColor: '#000',
                    }}
                  >
                    <img
                      src={screen}
                      alt={copyIndex === 0 ? `Mobile UI screen ${idx + 1}` : ''}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>

                {/* Screen Number Label */}
                <div
                  style={{
                    marginTop: '12px',
                    textAlign: 'center',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px',
                    color: '#737873',
                    letterSpacing: '0.1em',
                  }}
                >
                  SCREEN {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>

      {/* Progress Line Indicator at Bottom */}
      <div
        style={{
          position: 'relative',
          padding: '16px clamp(20px, 4vw, 64px) 36px',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              color: '#52f97a',
              letterSpacing: '0.1em',
            }}
          >
            ACTIVE EXPLORATION
          </span>
          <div
            style={{
              width: '140px',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${Math.max(5, ((currentIndex + 1) / mobileScreens.length) * 100)}%`,
                backgroundColor: '#52f97a',
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>
        </div>

        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            color: '#737873',
            letterSpacing: '0.1em',
          }}
        >
          {String(currentIndex + 1).padStart(2, '0')} <span style={{ color: '#52f97a' }}>/</span>{' '}
          {String(mobileScreens.length).padStart(2, '0')}
        </span>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenIndex !== null && (
        <div
          onClick={() => setFullscreenIndex(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 7, 6, 0.96)',
            backdropFilter: 'blur(16px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {/* Top Controls */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: 'clamp(20px, 4vw, 48px)',
              right: 'clamp(20px, 4vw, 48px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                color: '#52f97a',
                letterSpacing: '0.12em',
              }}
            >
              SCREEN {String(fullscreenIndex + 1).padStart(2, '0')} / {String(mobileScreens.length).padStart(2, '0')}
            </span>

            <button
              onClick={() => setFullscreenIndex(null)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
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
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.color = '#f4f1ea'
              }}
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>

          {/* Device Showcase Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxHeight: '82vh',
              aspectRatio: '9 / 19.5',
              borderRadius: '38px',
              border: '2px solid rgba(82, 249, 122, 0.4)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 50px rgba(82,249,122,0.15)',
              backgroundColor: '#0c0f0d',
              padding: '8px',
              overflow: 'hidden',
            }}
          >
            {/* Dynamic Island in Modal */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '64px',
                height: '16px',
                backgroundColor: '#000',
                borderRadius: '12px',
                zIndex: 4,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />

            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '30px',
                overflow: 'hidden',
                backgroundColor: '#000',
              }}
            >
              <img
                src={mobileScreens[fullscreenIndex]}
                alt={`Screen ${fullscreenIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setFullscreenIndex((prev) => (prev !== null ? (prev - 1 + mobileScreens.length) % mobileScreens.length : 0))
            }}
            style={{
              position: 'absolute',
              left: 'clamp(16px, 3vw, 36px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f4f1ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10002,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#52f97a'
              e.currentTarget.style.color = '#52f97a'
              e.currentTarget.style.backgroundColor = 'rgba(82, 249, 122, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.color = '#f4f1ea'
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
            }}
            aria-label="Previous screen"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setFullscreenIndex((prev) => (prev !== null ? (prev + 1) % mobileScreens.length : 0))
            }}
            style={{
              position: 'absolute',
              right: 'clamp(16px, 3vw, 36px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f4f1ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10002,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#52f97a'
              e.currentTarget.style.color = '#52f97a'
              e.currentTarget.style.backgroundColor = 'rgba(82, 249, 122, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.color = '#f4f1ea'
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
            }}
            aria-label="Next screen"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      {/* Native horizontal scrolling keeps the following sections immediately reachable. */}
      <style>{`
        .mobile-screens-showcase-wrapper {
          min-height: auto !important;
          padding-block: clamp(54px, 7vw, 86px);
        }

        .mobile-screens-viewport {
          position: relative;
          z-index: 2;
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          overscroll-behavior-inline: contain;
          scroll-snap-type: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-screens-viewport::-webkit-scrollbar {
          display: none;
        }

        .mobile-screens-viewport:focus-visible {
          outline: 1px solid #52f97a;
          outline-offset: -3px;
        }

        .mobile-screens-track {
          padding-block: clamp(34px, 4vw, 52px) !important;
        }

        .mobile-screens-loop-set {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .mobile-screen-card {
          position: relative;
          transform-origin: center;
        }

        @media (hover: hover) and (pointer: fine) {
          .mobile-screen-card:hover {
            z-index: 5;
            transform: scale(1.09);
          }

          .mobile-screen-card:hover .mobile-device-frame {
            border-color: rgba(82, 249, 122, 0.62) !important;
            box-shadow: 0 24px 62px rgba(0,0,0,0.72), 0 0 30px rgba(82,249,122,0.16) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-screens-viewport {
            scroll-snap-type: x mandatory;
          }

          .mobile-screen-card {
            scroll-snap-align: center;
          }
        }

        @media (max-width: 1023px) {
          .mobile-screens-track {
            padding-inline: 20px !important;
          }
        }
      `}</style>
    </div>
  )
}
