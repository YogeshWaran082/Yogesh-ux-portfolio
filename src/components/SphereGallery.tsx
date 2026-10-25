import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  image: string
  title: string
  type: string
}

export function SphereGallery({ items }: { items: GalleryItem[] }) {
  const [fullscreenItem, setFullscreenItem] = useState<GalleryItem | null>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

  const count = items.length
  const radius = 300

  // Calculate sphere positions
  const positions = items.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi

    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    }
  })

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenItem(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!sphereRef.current) return

    const ctx = gsap.context(() => {
      // Scroll reveal animation - staggered entrance
      imagesRef.current.forEach((el, i) => {
        if (!el) return

        const angle = (i / count) * Math.PI * 2
        gsap.from(el, {
          opacity: 0,
          scale: 0,
          rotationX: Math.sin(angle) * 180,
          rotationY: Math.cos(angle) * 180,
          z: -500,
          duration: 1.4,
          delay: i * 0.08,
          ease: 'cubic.out',
          scrollTrigger: {
            trigger: sphereRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.8,
          },
        })
      })

      // Continuous smooth rotation
      const tl = gsap.timeline({ repeat: -1 })
      tl.to('.sphere-container', {
        rotationX: 360,
        rotationY: 180,
        duration: 80,
        ease: 'none',
      }, 0).to('.sphere-container', {
        rotationZ: -360,
        duration: 120,
        ease: 'none',
      }, 0)

      // Enhanced hover effects with depth travel
      imagesRef.current.forEach((el, i) => {
        if (!el) return
        const img = el.querySelector('img') as HTMLImageElement

        const handleMouseEnter = () => {
          gsap.killTweensOf(el)

          gsap.to(el, {
            x: 0,
            y: 0,
            z: 600,
            scale: 1.15,
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'cubic.out',
            overwrite: 'auto',
          })

          gsap.to(img, {
            scale: 1,
            duration: 0.8,
          })

          gsap.to(el.querySelector('.sphere-image-wrapper'), {
            boxShadow: '0 40px 100px rgba(82,249,122,0.4)',
            duration: 0.6,
          })
        }

        const handleMouseLeave = () => {
          const pos = positions[i]
          gsap.to(el, {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            scale: 1,
            duration: 1,
            ease: 'cubic.inOut',
            overwrite: 'auto',
          })

          gsap.to(img, {
            scale: 0.95,
            duration: 0.6,
          })

          gsap.to(el.querySelector('.sphere-image-wrapper'), {
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            duration: 0.6,
          })
        }

        const handleClick = () => {
          setFullscreenItem(items[i])
        }

        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('click', handleClick)

        return () => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
          el.removeEventListener('click', handleClick)
        }
      })

      // Mobile swipe support
      let touchStartX = 0
      let touchStartY = 0

      const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (!sphereRef.current) return
        const deltaX = e.touches[0].clientX - touchStartX
        const deltaY = e.touches[0].clientY - touchStartY

        gsap.to('.sphere-container', {
          rotationY: `+=${deltaX * 0.5}`,
          rotationX: `+=${deltaY * 0.5}`,
          duration: 0.1,
          ease: 'none',
          overwrite: 'auto',
        })

        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      }

      sphereRef.current.addEventListener('touchstart', handleTouchStart, false)
      sphereRef.current.addEventListener('touchmove', handleTouchMove, false)

      return () => {
        sphereRef.current?.removeEventListener('touchstart', handleTouchStart)
        sphereRef.current?.removeEventListener('touchmove', handleTouchMove)
      }
    }, sphereRef)

    return () => ctx.revert()
  }, [items, positions, count])

  return (
    <>
      <div ref={sphereRef} className="sphere-gallery-container">
        <div
          className="sphere-container"
          style={{
            perspective: '1200px',
          }}
        >
          {items.map((item, i) => {
            const pos = positions[i]
            return (
              <div
                key={`${item.title}-${i}`}
                ref={(el) => {
                  imagesRef.current[i] = el
                }}
                className="sphere-item"
                style={{
                  transform: `translateX(${pos.x}px) translateY(${pos.y}px) translateZ(${pos.z}px)`,
                  width: '200px',
                  height: '200px',
                }}
              >
                <div className="sphere-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="sphere-overlay">
                    <span className="sphere-type">{item.type}</span>
                    <h3 className="sphere-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {fullscreenItem && (
        <div
          className="fullscreen-viewer"
          onClick={() => setFullscreenItem(null)}
        >
          <button
            className="fullscreen-close"
            onClick={() => setFullscreenItem(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullscreenItem.image}
              alt={fullscreenItem.title}
              className="fullscreen-image"
            />
            <div className="fullscreen-info">
              <span>{fullscreenItem.type}</span>
              <h2>{fullscreenItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
