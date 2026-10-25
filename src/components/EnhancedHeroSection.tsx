import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Download, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Enhanced Hero Section with scrollytelling, parallax, and 3D effects
 */
export function EnhancedHeroSection({
  dark,
  reducedMotion,
  resumePdf,
  heroPortraitImg,
  isMobile,
  scrollTo,
  sound,
}: {
  dark: boolean
  reducedMotion: boolean
  resumePdf: string
  heroPortraitImg: string
  isMobile: boolean
  scrollTo: (id: string) => void
  sound: any
}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Scrollytelling animation
  useEffect(() => {
    if (!heroRef.current || reducedMotion) return

    gsap.to(titleRef.current, {
      y: -100,
      opacity: 0.3,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'center center',
        scrub: 0.5,
        markers: false,
      },
    })

    // Portrait parallax
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'center center',
          scrub: 0.6,
          markers: false,
        },
      })
    }
  }, [reducedMotion])

  // Mouse tracking for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !portraitRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePos({ x: x * 30, y: y * 30 })

    gsap.to(portraitRef.current, {
      rotationX: y * 10,
      rotationY: x * 10,
      duration: 0.3,
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
      })
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section enhanced-hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(84px, 12vw, 100px)',
        minHeight: 'calc(100svh - 74px)',
        height: 'auto',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
        background: dark ? '#050505' : '#f3f3f1',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <motion.div
          animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '-12%',
            left: '8%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: dark
              ? 'radial-gradient(circle, rgba(57,255,136,0.12) 0%, transparent 55%)'
              : 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 55%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ x: [-50, 30, 60, -50], y: [30, -20, 50, 30] }}
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '-8%',
            right: '8%',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: dark
              ? 'radial-gradient(circle, rgba(57,255,136,0.08) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1500px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 88px)',
        }}
      >
        <div style={{ display: 'grid', gap: '0px' }}>
          {/* Hero title with scroll animation */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Big Shoulders Display',sans-serif",
              fontWeight: 900,
              margin: 0,
              paddingTop: 'clamp(12px, 2.5vw, 28px)',
              fontSize: 'clamp(42px, 12vw, 185px)',
              lineHeight: '0.92',
              letterSpacing: 'clamp(-1px, -0.02em, -3px)',
              color: dark ? '#f5f5f5' : '#111111',
              textTransform: 'uppercase',
              textAlign: 'center',
              wordBreak: 'break-word',
              width: '100%',
            }}
          >
            YOGESH WARAN
          </motion.div>

          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', marginTop: '60px', alignItems: 'flex-end' }}>
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#9CA3AF', maxWidth: '520px' }}>
                  Premium UI/UX Designer crafting cinematic digital experiences with advanced 3D animations and scroll-driven storytelling.
                </p>
                <div style={{ gap: '18px', alignItems: 'center', display: 'flex', marginTop: '24px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      scrollTo('contact')
                      sound.play('click')
                    }}
                    style={{
                      borderRadius: '9999px',
                      minWidth: '168px',
                      padding: '16px 28px',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '1',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: '#f5f5f5',
                      color: '#050505',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    Schedule Call
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={resumePdf}
                    download="YogeshWaran-Resume.pdf"
                    onClick={() => sound.play('click')}
                    style={{
                      borderRadius: '9999px',
                      minWidth: '168px',
                      padding: '16px 28px',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '1',
                      border: dark ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(17,17,17,0.18)',
                      background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(17,17,17,0.03)',
                      color: dark ? '#f5f5f5' : '#111111',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    <Download size={14} strokeWidth={1.75} /> Resume
                  </motion.a>
                </div>
              </motion.div>

              {/* Center - Portrait with 3D tilt */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  position: 'relative',
                  alignSelf: 'end',
                  marginTop: '-12px',
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-18% -22% -12% -22%',
                    background: 'radial-gradient(ellipse at center, rgba(57,255,136,0.54) 0%, rgba(57,255,136,0.28) 18%, rgba(57,255,136,0.12) 34%, rgba(57,255,136,0.04) 54%, rgba(57,255,136,0) 72%)',
                    filter: 'blur(26px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'linear-gradient(180deg, rgba(83,217,165,0.32) 0%, rgba(83,217,165,0.10) 42%, rgba(83,217,165,0.18) 100%)',
                    boxShadow: '0 0 0 1px rgba(83,217,165,0.14), 0 0 90px rgba(57,255,136,0.22), 0 30px 80px rgba(0,0,0,0.3)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    width: '280px',
                    height: '360px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    ref={portraitRef}
                    src={heroPortraitImg}
                    alt="Yogesh Waran"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transformStyle: 'preserve-3d',
                    }}
                  />
                </div>
              </motion.div>

              {/* Right - Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                  {[
                    { value: '10+', label: 'Projects' },
                    { value: '1.3+', label: 'Years Exp' },
                    { value: '2', label: 'Certifications' },
                  ].map((item) => (
                    <div key={item.label} style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '28px', lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: 700 }}>
                        {item.value}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Mobile layout */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ gap: '16px', marginTop: '12px', width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text3)', maxWidth: '420px', margin: '0 auto' }}>
                Premium UI/UX Designer crafting cinematic digital experiences.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
