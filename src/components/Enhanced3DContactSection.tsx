import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import confetti from 'canvas-confetti'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Enhanced3DContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const emailButtonRef = useRef<HTMLAnchorElement>(null)
  const contactInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animated gradient background
      const bgGradient = document.createElement('div')
      bgGradient.className = 'contact-gradient-bg'
      bgGradient.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(82,249,122,0.05), rgba(82,249,122,0.02), rgba(82,249,122,0.05));
        pointer-events: none;
        z-index: 0;
      `
      sectionRef.current?.insertBefore(bgGradient, sectionRef.current.firstChild)

      // Gradient pulse animation
      gsap.to(bgGradient, {
        backgroundPosition: '200% center',
        duration: 8,
        repeat: -1,
        ease: 'sine.inOut',
      })

      // Title character-by-character wave entrance
      if (titleRef.current) {
        const titleText = titleRef.current.innerText || ''
        titleRef.current.innerHTML = titleText
          .split('')
          .map((char) => {
            if (char === '\n' || char === '\r') return '<br />'
            return char === ' '
              ? '<span style="display:inline-block; width: 0.3em;"></span>'
              : `<span style="display:inline-block;transform:translateY(50px);opacity:0">${char}</span>`
          })
          .join('')

        const chars = titleRef.current.querySelectorAll('span:not([style*="width"])')
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.5,
          },
        })
      }

      // Email button 3D hover with glow
      if (emailButtonRef.current) {
        emailButtonRef.current.style.cssText = `
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 18px;
          color: #52f97a;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
          perspective: 1200px;
          transform-style: preserve-3d;
          transition: all 0.3s ease;
        `

        emailButtonRef.current.addEventListener('mouseenter', () => {
          gsap.to(emailButtonRef.current, {
            scale: 1.08,
            textShadow: '0 0 20px rgba(82,249,122,0.5)',
            duration: 0.4,
            overwrite: 'auto',
          })

          // Create glow effect
          const glow = document.createElement('div')
          glow.style.cssText = `
            position: absolute;
            inset: -10px;
            background: radial-gradient(circle, rgba(82,249,122,0.2), transparent 70%);
            border-radius: 8px;
            pointer-events: none;
            animation: emailGlow 1.5s ease-in-out infinite;
          `
          emailButtonRef.current?.insertBefore(glow, emailButtonRef.current?.firstChild)

          const style = document.createElement('style')
          style.textContent = `
            @keyframes emailGlow {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
          `
          document.head.appendChild(style)
        })

        emailButtonRef.current.addEventListener('mouseleave', () => {
          gsap.to(emailButtonRef.current, {
            scale: 1,
            textShadow: 'none',
            duration: 0.4,
          })
          const glow = emailButtonRef.current?.querySelector('div')
          if (glow) glow.remove()
        })

        // Click confetti effect
        emailButtonRef.current.addEventListener('click', (e) => {
          e.preventDefault()
          confetti({
            particleCount: 40,
            spread: 70,
            origin: { x: 0.5, y: 0.8 },
            colors: ['#52f97a', '#39ff88', '#40ff80'],
          })
          setTimeout(() => {
            window.location.href = 'mailto:yogeshwaran.ux@gmail.com'
          }, 500)
        })
      }

      // Container entrance
      if (contactInnerRef.current) {
        gsap.from(contactInnerRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.6,
          },
        })
      }

      // Subtitle fade-in with delay
      const subtitle = sectionRef.current?.querySelector('[data-contact-subtitle]') as HTMLElement
      if (subtitle) {
        gsap.from(subtitle, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.6,
          },
        })
      }

      // Bottom text fade-in
      const bottomText = sectionRef.current?.querySelector('[data-contact-bottom-text]') as HTMLElement
      if (bottomText) {
        gsap.from(bottomText, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.6,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact editorial-section section-pad"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div
        ref={contactInnerRef}
        className="container contact-inner"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>
          16 / LET'S CONNECT
        </span>
        <span
          className="contact-status"
          data-contact-subtitle
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            color: '#52f97a',
            fontSize: '10px',
            fontFamily: "'DM Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '27px',
          }}
        >
          <i
            style={{
              width: '6px',
              height: '6px',
              display: 'inline-block',
              borderRadius: '50%',
              background: '#52f97a',
              boxShadow: '0 0 0 4px rgba(82,249,122,0.1)',
            }}
          />
          AVAILABLE FOR SELECT PROJECTS
        </span>
        <h2
          ref={titleRef}
          style={{
            margin: '27px 0 48px',
            
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 900,
            letterSpacing: '-0.06em',
            textTransform: 'uppercase',
            
            color: '#f4f1ea',
          }}
        >
          LET'S
          <br />
          <em style={{ color: '#52f97a', fontStyle: 'normal' }}>WORK</em>
          <br />
          TOGETHER<span style={{ color: '#52f97a' }}>.</span>
        </h2>

        <div
          className="contact-bottom"
          data-contact-bottom-text
          style={{
            
            gap: '30px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '20px',
          }}
        >
          <p style={{ margin: 0, color: '#a4a8a3', fontSize: '12px', lineHeight: 1.7 }}>
            Have a thoughtful product in mind?
            <br />
            I'd like to hear about it.
          </p>
          <a
            ref={emailButtonRef}
            href="mailto:yogeshwaran.ux@gmail.com"
            className="contact-email"
          >
            yogeshwaran.ux@gmail.com <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
