import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Enhanced3DMobileScreens({ mobileScreens }: { mobileScreens: string[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [velocity, setVelocity] = useState(1)

  useEffect(() => {
    if (!marqueeRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const figures = trackRef.current?.querySelectorAll('figure') as NodeListOf<HTMLElement>
      const containerWidth = marqueeRef.current?.offsetWidth || 0

      // Scroll velocity tracking
      let scrollVelocity = 0
      const proxy = { value: 0 }
      let lastProgress = 0

      ScrollTrigger.create({
        onUpdate: (self) => {
          scrollVelocity = self.getVelocity()
          setVelocity(Math.min(Math.abs(scrollVelocity) / 300, 2))
        },
      })

      // 3D carousel animation
      figures.forEach((figure, i) => {
        gsap.set(figure, {
          transformStyle: 'preserve-3d',
          perspective: 1200,
        })

        // Entrance animation
        gsap.from(figure, {
          opacity: 0,
          scale: 0.8,
          rotationY: 15,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.6,
          },
        })

        // 3D hover flip effect
        figure.addEventListener('mouseenter', () => {
          gsap.to(figure, {
            rotationX: -5,
            rotationY: 8,
            scale: 1.08,
            boxShadow: `
              0 0 40px rgba(82,249,122,0.3),
              0 20px 60px rgba(0,0,0,0.4),
              inset 0 0 30px rgba(82,249,122,0.1)
            `,
            duration: 0.5,
            overwrite: 'auto',
          })
        })

        figure.addEventListener('mouseleave', () => {
          gsap.to(figure, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            boxShadow: `
              0 0 20px rgba(82,249,122,0.15),
              0 10px 30px rgba(0,0,0,0.2)
            `,
            duration: 0.5,
          })
        })

        // Glow effect on hover
        figure.addEventListener('mouseenter', () => {
          const img = figure.querySelector('img')
          if (img) {
            gsap.to(img, {
              filter: 'brightness(1.1) drop-shadow(0 0 20px rgba(82,249,122,0.3))',
              duration: 0.3,
            })
          }
        })

        figure.addEventListener('mouseleave', () => {
          const img = figure.querySelector('img')
          if (img) {
            gsap.to(img, {
              filter: 'brightness(1) drop-shadow(0 0 0px transparent)',
              duration: 0.3,
            })
          }
        })

        // Staggered vertical bob animation
        gsap.to(figure, {
          y: Math.sin((i % 4) * Math.PI / 2) * 8,
          duration: 3 + (i % 2) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        // Figure caption stagger
        const figcaption = figure.querySelector('figcaption') as HTMLElement
        if (figcaption) {
          gsap.from(figcaption, {
            opacity: 0,
            y: 10,
            duration: 0.6,
            delay: i * 0.1 + 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 0.6,
            },
          })
        }
      })

      // Container entrance
      gsap.from(marqueeRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 75%',
          end: 'top 50%',
          scrub: 0.5,
        },
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={marqueeRef}
      className="mobile-screen-marquee"
      style={{
        width: '100%',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      <div
        ref={trackRef}
        className="mobile-screen-track"
        style={{
          display: 'flex',
          width: 'max-content',
          gap: '18px',
          padding: '4px max(4vw, 20px) 8px',
          animation: 'mobileScreensDrift 72s linear infinite',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Duplicate screens for seamless loop */}
        {[...mobileScreens, ...mobileScreens].map((image, index) => (
          <figure
            key={`${image}-${index}`}
            style={{
              position: 'relative',
              width: 'clamp(150px, 16vw, 230px)',
              height: 'clamp(300px, 38vw, 470px)',
              flex: '0 0 auto',
              margin: 0,
              overflow: 'hidden',
              border: '1px solid rgba(82,249,122,0.3)',
              borderRadius: '16px',
              background: '#111',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 20px rgba(82,249,122,0.15), 0 10px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Corner glow highlights */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(82,249,122,0.1), transparent 50%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            <img
              src={image}
              alt={`Mobile UI screen ${(index % mobileScreens.length) + 1}`}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: '16px',
                display: 'block',
                transformStyle: 'preserve-3d',
              }}
            />

            <figcaption
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                color: '#52f97a',
                fontSize: '11px',
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                zIndex: 3,
              }}
            >
              {String((index % mobileScreens.length) + 1).padStart(2, '0')}
            </figcaption>

            {/* Scan line effect on hover */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent 0%, rgba(82,249,122,0.1) 50%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              className="screen-scan"
            />
          </figure>
        ))}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes mobileScreensDrift {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 9px)); }
        }

        .mobile-screen-marquee:hover .mobile-screen-track {
          animation-play-state: paused;
        }

        figure:nth-child(4n+2),
        figure:nth-child(4n+4) {
          transform: translateY(28px);
        }

        figure:hover .screen-scan {
          opacity: 1;
        }

        @media (max-width: 767px) {
          figure:nth-child(4n+2),
          figure:nth-child(4n+4) {
            transform: translateY(18px);
          }
        }
      `}</style>
    </div>
  )
}
