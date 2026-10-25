import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'project' | 'gallery'>('default')

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    if (isTouch) return

    setEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      // Check hovered element cursor data
      const target = e.target as HTMLElement | null
      if (!target) return

      const projectEl = target.closest('[data-cursor]') as HTMLElement | null
      const buttonEl = target.closest('button, a, .project-row, .independent-item, .curtis-gallery-card-wrapper')

      if (projectEl) {
        const text = projectEl.getAttribute('data-cursor') || ''
        setCursorText(text)
        setCursorState('project')
      } else if (buttonEl) {
        setCursorText('')
        setCursorState('hover')
      } else {
        setCursorText('')
        setCursorState('default')
      }
    }

    const render = () => {
      // Lerp ring position for fluid momentum
      const lerp = 0.18
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      }

      rafRef.current = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!enabled) return null

  const isExpanded = cursorState === 'project' || cursorText !== ''
  const isHover = cursorState === 'hover'

  return (
    <div
      className="custom-cursor-layer"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'normal',
      }}
    >
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          margin: '-3px 0 0 -3px',
          borderRadius: '50%',
          backgroundColor: '#52f97a',
          boxShadow: '0 0 10px #52f97a',
          opacity: isExpanded ? 0 : 1,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Outer fluid trailing ring with optional label */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isExpanded ? '72px' : isHover ? '44px' : '32px',
          height: isExpanded ? '72px' : isHover ? '44px' : '32px',
          margin: isExpanded ? '-36px 0 0 -36px' : isHover ? '-22px 0 0 -22px' : '-16px 0 0 -16px',
          borderRadius: '50%',
          border: isExpanded
            ? '1.5px solid #52f97a'
            : isHover
            ? '1px solid rgba(82, 249, 122, 0.7)'
            : '1px solid rgba(82, 249, 122, 0.35)',
          backgroundColor: isExpanded ? 'rgba(8, 11, 9, 0.85)' : 'transparent',
          backdropFilter: isExpanded ? 'blur(4px)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        {isExpanded && (
          <span
            style={{
              color: '#52f97a',
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
