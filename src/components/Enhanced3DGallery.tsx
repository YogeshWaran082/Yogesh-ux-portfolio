import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  image: string
  title: string
  type: string
  ratio: string
}

export function Enhanced3DGallery({ items }: { items: GalleryItem[] }) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!galleryRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      const figures = galleryRef.current?.querySelectorAll('figure') as NodeListOf<HTMLElement>

      figures.forEach((figure, i) => {
        // SVG scan line animation
        const scanLine = document.createElement('div')
        scanLine.className = 'gallery-scan-line'
        scanLine.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(82,249,122,0.8), transparent);
          z-index: 10;
          pointer-events: none;
        `
        figure.style.position = 'relative'
        figure.style.overflow = 'hidden'
        figure.appendChild(scanLine)

        // Scan line animation on entrance
        gsap.from(scanLine, {
          top: '-100%',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: figure,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        })

        // Figure rotation entrance
        gsap.from(figure, {
          rotationY: -15,
          rotationX: 5,
          opacity: 0.3,
          scale: 0.92,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: figure,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.6,
          },
        })

        // Image zoom effect on scroll
        const img = figure.querySelector('img') as HTMLImageElement
        if (img) {
          gsap.to(img, {
            scale: 1.08,
            duration: 2,
            scrollTrigger: {
              trigger: figure,
              start: 'top 60%',
              end: 'bottom 20%',
              scrub: 1,
            },
          })
        }

        // 3D hover effect
        figure.addEventListener('mousemove', (e) => {
          const rect = figure.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateY = ((x - centerX) / centerX) * 8
          const rotateX = ((y - centerY) / centerY) * -8

          gsap.to(figure, {
            rotationX,
            rotationY,
            duration: 0.6,
            overwrite: 'auto',
          })
        })

        figure.addEventListener('mouseleave', () => {
          gsap.to(figure, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
          })
        })

        // Figcaption staggered reveal
        const caption = figure.querySelector('figcaption') as HTMLElement
        if (caption) {
          gsap.from(caption, {
            opacity: 0,
            y: 15,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: figure,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 0.5,
            },
          })
        }

        // Glow effect on hover
        figure.addEventListener('mouseenter', () => {
          gsap.to(figure, {
            boxShadow: `
              0 0 50px rgba(82,249,122,0.4),
              0 20px 70px rgba(82,249,122,0.2),
              inset 0 0 30px rgba(82,249,122,0.1)
            `,
            borderColor: 'rgba(82,249,122,0.6)',
            duration: 0.4,
          })
        })

        figure.addEventListener('mouseleave', () => {
          gsap.to(figure, {
            boxShadow: `
              0 0 20px rgba(82,249,122,0.15),
              0 10px 30px rgba(0,0,0,0.2),
              inset 0 0 20px rgba(82,249,122,0.05)
            `,
            borderColor: 'rgba(82,249,122,0.25)',
            duration: 0.4,
          })
        })
      })

      // Container entrance animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 75%',
          end: 'top 50%',
          scrub: 0.5,
        },
      })
    }, galleryRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={galleryRef} style={{ perspective: '1200px' }}>
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '150px',
          gap: '13px',
          marginTop: '20px',
        }}
      >
        {items.map((item) => (
          <figure
            key={item.title}
            className={item.ratio}
            style={{
              position: 'relative',
              margin: 0,
              overflow: 'hidden',
              background: '#111',
              borderRadius: '8px',
              border: '1px solid rgba(82,249,122,0.25)',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transformStyle: 'preserve-3d',
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                right: '12px',
                bottom: '12px',
                left: '12px',
                display: 'flex',
                flexDirection: 'column',
                opacity: 0,
                transform: 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <span style={{ color: '#52f97a', fontSize: '9px', fontFamily: "'DM Mono', monospace" }}>
                {item.type}
              </span>
              <strong
                style={{
                  fontSize: '26px',
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#f4f1ea',
                }}
              >
                {item.title}
              </strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
