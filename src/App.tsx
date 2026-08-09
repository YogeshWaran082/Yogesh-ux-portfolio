// cache-bust
import React, { useState, useEffect, useRef } from 'react'
import {
  Mail, Phone, MapPin, Globe,
  ArrowUpRight, Download, ArrowUp, Award, Briefcase,
  Smartphone, Image, Share2, Code2,
  ChevronRight, ExternalLink, Link2, GitBranch,
  Sun, Moon, Users, LayoutGrid,
} from 'lucide-react'
import { useSound } from './useSound'

/* ── Asset imports ─────────────────────────────────────────────────── */
import evChargingImg  from '@/imports/EV-Charging.jpg'
import foodImg        from '@/imports/Food.jpg'
import frame155Img    from '@/imports/Frame_155.jpg'
import heroProjectImg from '@/imports/Hero.jpg'
import hrmImg         from '@/imports/HRM-Dashboard.jpg'
import mindEaseImg    from '@/imports/image__2_.jpg'
import kfcImg         from '@/imports/KFC_TUMNAIL.2.jpg'
import logozhdImg     from '@/imports/LogoZHD.jpg'
import darkLogoImg    from '@/imports/dark-logo.jpg'
import lightLogoImg   from '@/imports/light-logo.jpg'
import miniBankImg      from '@/imports/Mini-Bank.jpg'
import resumePdf        from '@/imports/YogeshWaran-J30T1-1.pdf'
import profileImg       from '@/imports/profile1.jpeg'
import heroPortraitImg  from '@/imports/profile.jpg'
import sigImg             from '@/imports/sig.jpg'
import sigDarkImg         from '@/imports/sig-dark.png'
import flowHub1Img        from '@/imports/WhatsApp_Image_2026-08-07_at_22.25.25.jpeg'
import flowHub2Img        from '@/imports/WhatsApp_Image_2026-08-07_at_22.25.28.jpeg'
import flowHub3Img        from '@/imports/WhatsApp_Image_2026-08-07_at_22.25.28__1_.jpeg'
import flowHub4Img        from '@/imports/WhatsApp_Image_2026-08-07_at_22.25.28__2_.jpeg'
import socialGridImg      from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.40__1_.jpeg'
import yogaAppImg         from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.40.jpeg'
import fashionAppImg      from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__2_.jpeg'
import showcashImg        from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__7_.jpeg'
import globalTechImg      from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__8_.jpeg'
import travelAppImg       from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__4_.jpeg'
import travelCaseImg      from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__3_.jpeg'
import greenMuseImg       from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__9_.jpeg'
import lifeBatteryImg     from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__5_.jpeg'
import surayaPortfolioImg from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__10_.jpeg'
import surayaPortfolio2Img from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41__10_-1.jpeg'
import designingExpImg    from '@/imports/WhatsApp_Image_2026-08-07_at_21.29.41.jpeg'

function GithubIcon({ size = 16, strokeWidth = 1.75 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

function InstagramIcon({ size = 16, strokeWidth = 1.75 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  )
}

/* ── Data ──────────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'NexaHR Dashboard',
    category: 'SaaS · Design Systems',
    year: '2025',
    img: hrmImg,
    desc: 'Responsive SaaS dashboard built with design tokens and auto layout for 1,000+ users. Reduced navigation steps and improved task completion efficiency.',
  },
  {
    title: 'MiniBank Finance',
    category: 'Fintech · Mobile Dashboard',
    year: '2025',
    img: miniBankImg,
    desc: 'Personal digital finance dashboard with investment tracking, expense analytics, and quick-transfer flows optimised for accessibility.',
  },
  {
    title: 'KFC App Redesign',
    category: 'Mobile · Product Redesign',
    year: '2026',
    img: kfcImg,
    desc: '100+ screen mobile redesign — AI-powered food discovery, frictionless checkout, and a loyalty system. Delivered for iOS and Android.',
  },
  {
    title: 'EV ChargeHub',
    category: 'Web App · Clean Energy',
    year: '2024',
    img: evChargingImg,
    desc: 'Real-time EV charging station locator serving 50K+ stations and 200K+ active users with 99.9% uptime and a clean, trust-building UI.',
  },
]

const galleryItems = [
  { img: mindEaseImg,    alt: 'MindEase mental health app' },
  { img: frame155Img,    alt: 'Cyber risk dashboard' },
  { img: heroProjectImg, alt: 'VJ Unique Properties website' },
  { img: logozhdImg,     alt: 'Zanzibar Investment Summit branding' },
  { img: foodImg,        alt: 'Food delivery app design' },
]

const skills = [
  { label: 'UI Design',         value: 90 },
  { label: 'Product Design',    value: 85 },
  { label: 'User Research',     value: 80 },
  { label: 'Wireframing',       value: 88 },
  { label: 'Figma',             value: 95 },
  { label: 'Prototyping',       value: 82 },
  { label: 'Journey Mapping',   value: 78 },
  { label: 'Accessibility',     value: 76 },
  { label: 'Usability Testing', value: 80 },
  { label: 'Design Systems',    value: 84 },
]

const tools = ['Figma', 'Adobe XD', 'Framer', 'Photoshop', 'FigJam', 'Miro', 'ChatGPT', 'Figma AI', 'Claude AI']

const frontendTools = ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Angular', 'React']

const uxMethods = [
  'User Interviews', 'Competitive Analysis', 'Persona Creation', 'Journey Mapping',
  'Information Architecture', 'Wireframing', 'Prototyping', 'Usability Testing',
  'Accessibility Audits', 'Design Systems',
]

const experience = [
  {
    company: 'Dzinemakers',
    subtitle: 'UI/UX Studio · Full-time',
    period: 'Apr 2025 — Jul 2026',
    role: 'Product Designer (UI/UX)',
    location: 'Chennai, India',
    industry: 'Design Studio',
    desc: 'Designed scalable fintech dashboards with auto layout and design tokens, improving task completion speed by 20%. Built high-fidelity prototypes in Figma, reducing developer handoff friction by 30%. Conducted user research, journey mapping, and usability testing across 3+ projects.',
  },
  {
    company: 'RTH INFO TECH PRIVATE LIMITED',
    subtitle: 'IT Company · Onsite',
    period: 'Aug 2026 — Present',
    role: 'UI/UX Trainee',
    location: 'Chennai, India',
    industry: 'IT Services',
    desc: 'Trained in end-to-end UI/UX design workflows — wireframing, prototyping, and usability testing. Worked on internal product interfaces and contributed to improving onboarding flows and component documentation.',
  },
  {
    company: 'MakeMyReach',
    subtitle: 'Fintech Platform · Internship',
    period: 'Jun 2024 — Aug 2024',
    role: 'UI/UX Design Intern',
    location: 'Remote, India',
    industry: 'Fintech',
    desc: 'Redesigned mobile navigation and onboarding flows using information architecture principles, reducing drop-off by 12%. Built reusable UI component libraries, reducing future design iteration time by 25%.',
  },
]

const clients = [
  'NexaHR', 'MiniBank', 'ChargeHub', 'KFC Redesign', 'MindEase',
  'VJ Properties', 'Zanzibar Summit', 'Dzinemakers', 'MakeMyReach',
]

const heroMarqueeItems = [
  'Product Design', 'UI/UX', 'Brand Identity', 'Mobile Apps', 'Web Experiences',
  'Design Systems', 'Research', 'Prototyping', 'Design Strategy', 'Landing Pages',
]

const behanceUrl = 'https://www.behance.net/yogeshwaranUIUX01'
const instagramUrl = 'https://www.instagram.com/yogesh.uiux?igsh=MWppd3Z5enZsYmZ0MQ=='

const independentProjects = [
  {
    img: travelAppImg,
    title: 'Easy Trips — Travel App',
    category: 'Freelance · Mobile App',
    year: '2025',
    tags: ['Travel', 'Mobile UI', 'Figma'],
    desc: 'Full-featured travel app design for a freelance client — covering destination discovery, itinerary builder, booking flows, and a personalised dashboard. 80+ screens delivered for iOS.',
  },
  {
    img: greenMuseImg,
    title: 'Green Muse Plant Shop',
    category: 'Freelance · E-Commerce Web',
    year: '2025',
    tags: ['E-Commerce', 'Web Design', 'Nature'],
    desc: 'End-to-end e-commerce website design for an organic plant boutique. Covers product catalogue, cart and checkout flows, brand identity, and a subscription care-guide feature.',
  },
  {
    img: frame155Img,
    title: 'CyberShield Risk Dashboard',
    category: 'Freelance · SaaS Dashboard',
    year: '2026',
    tags: ['Dashboard', 'Cybersecurity', 'Data Viz'],
    desc: 'B2B SaaS security dashboard for a cybersecurity startup. Designed threat-level indicators, real-time alert feeds, and executive summary views — optimised for analyst workflows.',
  },
  {
    img: surayaPortfolio2Img,
    title: 'Suraya — Videographer Portfolio',
    category: 'Freelance · Web Design · Personal Brand',
    year: '2025',
    tags: ['Web Design', 'Figma', 'Personal Brand'],
    desc: 'Premium dark portfolio for a wedding videographer and brand storyteller. Covers hero, about, process, showreel, social proof, and FAQ — designed for cinematic appeal and lead generation.',
  },
]

/* ── Boot Screen ───────────────────────────────────────────────────── */
const LOADER_STATES = ['INITIALIZING', 'LOADING PROJECTS', 'PREPARING EXPERIENCE', 'ALMOST READY']

function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('INITIALIZING')
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let rafId = 0
    let start = performance.now()

    const animate = (t: number) => {
      const elapsed = t - start
      const next = Math.min(100, Math.round((elapsed / 1800) * 100))
      setProgress(next)

      if (next < 25) setStatus('INITIALIZING')
      else if (next < 55) setStatus('LOADING PROJECTS')
      else if (next < 85) setStatus('PREPARING EXPERIENCE')
      else setStatus('ALMOST READY')

      if (next < 100) {
        rafId = requestAnimationFrame(animate)
      } else {
        setExiting(true)
        window.setTimeout(onDone, 450)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#050505',
      opacity: exiting ? 0 : 1,
      transform: exiting ? 'translateY(-28px)' : 'translateY(0)',
      transition: 'opacity 0.5s ease, transform 0.6s ease',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 22%, rgba(0,0,0,0) 60%)',
      }} />

      <div style={{ position: 'relative', width: 'min(86vw, 540px)', zIndex: 1 }}>
        <div style={{
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: '#f5f5f5',
          textTransform: 'uppercase',
          marginBottom: '24px',
        }}>
          YOGESH.WARAN
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
            {status}
          </div>
          <div style={{ fontSize: '12px', letterSpacing: '0.16em', color: '#f5f5f5', fontWeight: 600 }}>
            {String(progress).padStart(3, '0')}%
          </div>
        </div>

        <div style={{ height: '2px', width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#f5f5f5', transition: 'width 0.18s ease' }} />
        </div>

        <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
          Loading experience
        </div>
      </div>
    </div>
  )
}

/* ── Custom Cursor ─────────────────────────────────────────────────── */
function BrandWordmark({ dark }: { dark: boolean }) {
  return (
    <img
      src={dark ? darkLogoImg : lightLogoImg}
      alt="Yogesh Waran logo"
      style={{
        height: '36px',
        width: 'auto',
        maxWidth: '280px',
        objectFit: 'contain',
        display: 'block',
        filter: 'none',
      }}
    />
  )
}

function LinkCardWrapper({ href, children, style, target = '_blank', onClick }: { href: string; children: React.ReactNode; style?: React.CSSProperties; target?: string; onClick?: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <a href={href} target={target} rel="noreferrer" onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit', display: 'block', ...style }}>
      {children}
    </a>
  )
}

function CyberpunkCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    const onDown = () => { if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0.7)' }
    const onUp   = () => { if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)' }
    const onOver = (e: MouseEvent) => {
      const hovering = !!(e.target as HTMLElement).closest('button,a,[data-hover]')
      if (ringRef.current) {
        ringRef.current.style.width = hovering ? '48px' : '32px'
        ringRef.current.style.height = hovering ? '48px' : '32px'
      }
      ringRef.current?.classList.toggle('cursor-ring--hover', hovering)
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14
      ring.current.y += (pos.current.y - ring.current.y) * 0.14
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top  = pos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('mouseover', onOver)
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" style={{
        position:'fixed', width:'32px', height:'32px', borderRadius:'50%',
        transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:99998,
        transition:'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
      }} />
      <div ref={dotRef} className="cursor-dot" style={{
        position:'fixed', width:'6px', height:'6px', borderRadius:'50%',
        transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:99999,
        transition:'transform 0.1s',
      }} />
    </>
  )
}

/* ── Cyber Background ──────────────────────────────────────────────── */
function CyberBackground({ dark }: { dark: boolean }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      <div className="cyber-grid" style={{ position:'absolute', inset:0 }} />
      <div className="scanlines" style={{ position:'absolute', inset:0 }} />
      <div style={{ position:'absolute', top:'10%', left:'5%', width:'300px', height:'300px', borderRadius:'50%', background:`radial-gradient(circle, ${dark ? 'rgba(57,255,20,0.04)' : 'rgba(5,150,105,0.06)'} 0%, transparent 70%)`, filter:'blur(40px)' }}/>
      <div style={{ position:'absolute', bottom:'20%', right:'8%', width:'400px', height:'400px', borderRadius:'50%', background:`radial-gradient(circle, ${dark ? 'rgba(57,255,20,0.03)' : 'rgba(5,150,105,0.04)'} 0%, transparent 70%)`, filter:'blur(60px)' }}/>
    </div>
  )
}

/* ── Glitch Text ───────────────────────────────────────────────────── */
function GlitchText({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span className="glitch-text" data-text={text} style={style}>{text}</span>
  )
}

/* ── Decrypt Text ──────────────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
function DecryptText({ text, trigger, style }: { text: string; trigger: boolean; style?: React.CSSProperties }) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | null>(null)
  const iterRef = useRef(0)

  useEffect(() => {
    if (!trigger) return
    iterRef.current = 0
    const animate = () => {
      setDisplay(text.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < iterRef.current) return text[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      iterRef.current += 0.4
      if (iterRef.current < text.length) rafRef.current = requestAnimationFrame(animate)
      else setDisplay(text)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [trigger, text])

  return <span style={style}>{display}</span>
}

/* ── Reveal hook ───────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

/* ── App ───────────────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [booting, setBooting] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const workRef = useRef<HTMLElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const ambientGainRef = useRef<GainNode | null>(null)
  const [workVisible, setWorkVisible] = useState(false)
  
  // Sound system
  const sound = useSound()
  const [soundOn, setSoundOn] = useState(sound.isEnabled)

  const magneticPointer = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`
  }

  const resetMagnetic = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = 'translate(0, 0)'
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(media.matches)
    syncMotion()
    media.addEventListener?.('change', syncMotion)
    return () => media.removeEventListener?.('change', syncMotion)
  }, [])

  useEffect(() => {
    const updateViewport = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0
      setScrollProgress(progress)
      setScrollY(window.scrollY)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const workObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWorkVisible(true) }, { threshold: 0.15 })
    if (workRef.current) workObs.observe(workRef.current)

    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'))
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, { threshold: 0.1 })

    revealEls.forEach((el) => revealObs.observe(el))

    return () => {
      workObs.disconnect()
      revealObs.disconnect()
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.body.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = reducedMotion ? 'auto' : 'smooth'
  }, [reducedMotion])

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start', inline: 'nearest' })
    setMenuOpen(false)
  }

  const toggleSound = () => {
    const newState = !soundOn
    setSoundOn(newState)
    sound.setEnabled(newState)
  }

  // Sync sound state with hook
  useEffect(() => {
    setSoundOn(sound.isEnabled)
  }, [sound.isEnabled])

  return (
    <div data-theme={dark ? 'dark' : 'light'} style={{ overflowX: 'hidden', cursor: 'none' }}>
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      {!isMobile && <CyberpunkCursor />}
      <CyberBackground dark={dark} />
      <div style={{ position: 'fixed', inset: '0 auto auto 0', width: '100%', height: '2px', background: 'rgba(255,255,255,0.08)', zIndex: 60, pointerEvents: 'none' }}>
        <div style={{ width: `${scrollProgress}%`, height: '100%', background: dark ? '#39FF88' : '#059669', boxShadow: dark ? '0 0 18px rgba(57,255,136,0.4)' : '0 0 18px rgba(5,150,105,0.25)', transition: 'width 0.12s linear' }} />
      </div>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
        borderBottom: '1px solid var(--divider)',
        transition: 'background 0.4s ease',
      }}>
        {/* Nav container */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(20px, 5vw, 64px)',
          gap: '54px',
        }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', minWidth: 'auto', flexShrink: 0 }}>
            <BrandWordmark dark={dark} />
          </div>

          {/* Desktop links - Centered */}
          <div className="hidden md:flex" style={{ gap: '36px', alignItems: 'center', position:'absolute', left:'50%', transform:'translateX(-50%)', flexShrink: 0 }}>
            {['About', 'Work', 'Skills', 'Experience', 'Contact'].map(item => (
              <button key={item} onClick={() => {
                sound.play('click')
                scrollTo(item.toLowerCase())
              }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 400, color: 'var(--text2)', transition: 'color 0.2s', letterSpacing:'0.01em' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text2)'}
              >{item}</button>
            ))}
          </div>

          {/* Controls - Right aligned */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', flexShrink: 0 }}>
            <button
              type="button"
              onClick={toggleSound}
              onMouseMove={magneticPointer}
              onMouseLeave={resetMagnetic}
              style={{
                borderRadius: '9999px',
                padding: '10px 14px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text2)',
                transition: 'all 0.2s ease',
              }}
            >
              {soundOn ? 'Sound On' : 'Sound Off'}
            </button>

            {/* Toggle */}
            <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              <div className="theme-thumb" style={{ left: dark ? '3px' : '27px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {dark ? <Moon size={12} strokeWidth={2} color="var(--accent-fg)"/> : <Sun size={12} strokeWidth={2} color="var(--accent-fg)"/>}
              </div>
            </button>

            {/* View Resume */}
            <a href={resumePdf as unknown as string} download="YogeshWaran-Resume.pdf"
              className="hidden md:inline-flex"
              style={{
                alignItems: 'center', gap: '6px',
                padding: '10px 24px', borderRadius: '9999px', fontSize: '14px', fontWeight: 500,
                background: 'transparent', color: 'var(--text)', textDecoration: 'none',
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseMove={magneticPointer}
              onMouseLeave={resetMagnetic}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text)'; }}
            >View Resume</a>

            {/* Hamburger */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', height: '1.5px', width: '22px', background: 'var(--text)',
                  transition: 'all 0.3s',
                  transform: menuOpen ? (i===0?'rotate(45deg) translateY(6.5px)': i===2?'rotate(-45deg) translateY(-6.5px)':'scaleX(0)') : 'none',
                }}/>
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:40, background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'32px' }}>
          {['About','Work','Skills','Experience','Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())}
              style={{ background:'none', border:'none', cursor:'pointer', fontSize:'32px', fontWeight:700, color:'var(--text)', fontFamily:"'Big Shoulders Display',sans-serif" }}>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section id="home" className="hero-section hero-reveal" style={{ position: 'relative', overflow: 'hidden', paddingTop: '84px', minHeight: '1045.29px', height: '1045.29px', background: dark ? '#050505' : '#f3f3f1' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <div style={{ position: 'absolute', top: '-12%', left: '8%', width: '420px', height: '420px', borderRadius: '50%', background: dark ? 'radial-gradient(circle, rgba(57,255,136,0.12) 0%, transparent 55%)' : 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: '-8%', right: '8%', width: '320px', height: '320px', borderRadius: '50%', background: dark ? 'radial-gradient(circle, rgba(57,255,136,0.08) 0%, transparent 65%)' : 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 65%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1500px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 88px)' }}>
          <div style={{ display: 'grid', gap: '0px' }}>
            <div style={{
              fontFamily: "'Big Shoulders Display',sans-serif",
              fontWeight: 900,
              margin: 0,
              paddingTop: '32px',
              fontSize: '185px',
              lineHeight: '0.9',
              letterSpacing: '-3px',
              color: '#f5f5f5',
              textTransform: 'uppercase',
              textAlign: 'left',
              textShadow: '0 0 0 rgba(0,0,0,0)',
              whiteSpace: 'nowrap',
              marginLeft: '0',
              width: '100%',
              opacity: 0,
              animation: reducedMotion ? 'none' : 'heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              animationDelay: '0.12s',
            }}>
              YOGESH WARAN
            </div>

            <div className="hero-grid" style={{ alignItems: 'end', marginTop: '0', columnGap: '0px', rowGap: '0px', marginLeft: '0', marginRight: '0' }}>
              <div className="hero-left" style={{ marginTop: 'auto', alignSelf: 'end', paddingBottom: '0', marginLeft: '0', opacity: 0, animation: reducedMotion ? 'none' : 'heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards', animationDelay: '0.2s' }}>
                <span className="hero-label hero-label-left" style={{ letterSpacing: '0.12em', transform: 'skewY(-4deg)' }}>PRODUCT</span>
                <div className="hero-badge" style={{
                  width: 'fit-content',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(17,17,17,0.02)',
                  border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(17,17,17,0.04)',
                  color: dark ? 'rgba(255,255,255,0.9)' : '#111111',
                  fontSize: '13px',
                  lineHeight: '1',
                  fontWeight: 500,
                  letterSpacing: '0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#53D9A5', boxShadow: dark ? '0 0 0 3px rgba(83,217,165,0.15)' : '0 0 0 3px rgba(83,217,165,0.08)' }} />
                  Open for freelance works.
                </div>
                <p className="hero-intro" style={{ fontSize: '16px', lineHeight: '1.5', color: '#9CA3AF', maxWidth: '520px' }}>
                  Hey there! I'm a Brand & UI & UX Designer working in the global marketplace.
                </p>
                <div className="hero-actions" style={{ gap: '18px', alignItems: 'center' }}>
                  <button onClick={() => scrollTo('contact')} className="hero-button-primary" style={{
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
                    justifyContent: 'center'
                  }}>
                    Schedule Call
                  </button>
                  <a href={resumePdf as unknown as string} download="YogeshWaran-Resume.pdf" className="hero-button-secondary" style={{
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
                    justifyContent: 'center'
                  }}>
                    <Download size={14} strokeWidth={1.75} /> Resume
                  </a>
                </div>
              </div>

              <div className="hero-center" style={{ position: 'relative', alignSelf: 'end', marginLeft: '0', marginRight: '0', marginTop: '-12px', opacity: 0, animation: reducedMotion ? 'none' : 'heroReveal 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards', animationDelay: '0.34s' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-18% -22% -12% -22%',
                  background: 'radial-gradient(ellipse at center, rgba(57,255,136,0.54) 0%, rgba(57,255,136,0.28) 18%, rgba(57,255,136,0.12) 34%, rgba(57,255,136,0.04) 54%, rgba(57,255,136,0) 72%)',
                  filter: 'blur(26px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }} />
                <div className="hero-portrait-frame" style={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'linear-gradient(180deg, rgba(83,217,165,0.32) 0%, rgba(83,217,165,0.10) 42%, rgba(83,217,165,0.18) 100%)',
                  boxShadow: '0 0 0 1px rgba(83,217,165,0.14), 0 0 90px rgba(57,255,136,0.22), 0 30px 80px rgba(0,0,0,0.3)',
                  transform: `translate3d(0, ${reducedMotion ? 0 : scrollY * -0.03}px, 0) translateY(-18px) scale(${reducedMotion ? 1 : 0.98})`,
                  opacity: 1,
                }}>
                  <img src={heroPortraitImg} alt="Yogesh Waran portrait" />
                </div>
              </div>

              <div className="hero-right" style={{ marginTop: 'auto', alignSelf: 'end', paddingBottom: '0', marginRight: '0', opacity: 0, animation: reducedMotion ? 'none' : 'heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards', animationDelay: '0.42s' }}>
                <span className="hero-label hero-label-right" style={{ letterSpacing: '0.12em', transform: 'skewY(-4deg)' }}>DESIGNER</span>
                <div className="hero-right-spacer" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', letterSpacing: '0.04em', textTransform: 'none', marginBottom: '8px' }}>
                  <MapPin size={12} strokeWidth={1.8} />
                  <span>Chennai, India</span>
                </div>
                <div className="hero-stats-block" style={{ gap: '20px' }}>
                  {[
                    { value: '10+', label: 'Projects' },
                    { value: '1.3+', label: 'Years Exp' },
                    { value: '2', label: 'Certifications' },
                  ].map(item => (
                    <div key={item.label} className="hero-stat" style={{ gap: '8px' }}>
                      <span className="hero-stat-number" style={{ fontSize: '28px', lineHeight: '0.9', letterSpacing: '-0.04em' }}>{item.value}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: '46px', borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(17,17,17,0.08)', borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(17,17,17,0.08)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(17,17,17,0.01)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: '-20% -10% auto -10%', height: '220%', background: 'radial-gradient(circle at center, rgba(57,255,136,0.30) 0%, rgba(57,255,136,0.14) 18%, rgba(57,255,136,0.08) 32%, rgba(57,255,136,0.0) 62%)', pointerEvents: 'none', zIndex: 0 }} />
            <div className="marquee-track" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '18px', whiteSpace: 'nowrap', padding: '18px 0' }}>
              {[...heroMarqueeItems, ...heroMarqueeItems].map((item, idx) => (
                <div key={`${item}-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(17,17,17,0.82)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  <span>{item}</span>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: dark ? '#39FF88' : '#059669', boxShadow: dark ? '0 0 0 4px rgba(57,255,136,0.12)' : '0 0 0 4px rgba(5,150,105,0.08)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" data-reveal style={{ background:'var(--bg)', padding:'clamp(80px,10vw,140px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'48px', alignItems:'center' }}>
          {/* Left — profile card (reference style) */}
          <ProfileCard scrollTo={scrollTo} />

          {/* Right */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'28px' }}>
              <img src={profileImg}
                alt="YW" style={{ width:'40px', height:'40px', borderRadius:'50%', objectFit:'cover', objectPosition:'top', border:'2px solid var(--accent-border)' }}/>
              <div>
                <p style={{ fontWeight:700, fontSize:'14px', color:'var(--text)', margin:0 }}>Yogesh Waran</p>
                <p style={{ fontSize:'12px', color:'var(--text4)', margin:0 }}>Product Designer (UI/UX)</p>
              </div>
            </div>

            <p style={{ fontSize:'11px', color:'var(--skill-muted)', letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 10px' }}>My Professional</p>
            <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(32px,4.2vw,54px)', lineHeight:1.06, letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 32px' }}>
              Designing products<br/>
              people{' '}
              <span style={{ color:'var(--accent)', padding:'2px 12px', borderRadius:'12px', background:'var(--accent-bg)', border:'1px solid var(--accent-border)', display:'inline-block' }}>actually</span>
              {' '}use
            </h2>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'32px' }}>
              {[
                { num:'1.3+', label:'Years experience' },
                { num:'10+', label:'UI concepts built' },
                { num:'3+', label:'Projects shipped' },
                { num:'2', label:'Certifications' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(40px,5vw,58px)', lineHeight:1, color:'var(--text)', margin:0 }}>{s.num}</p>
                  <p style={{ fontSize:'13px', color:'var(--text4)', marginTop:'4px' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div style={{ padding:'20px 24px', borderRadius:'20px', background:'var(--card)', border:'1px solid var(--border)' }}>
              <p style={{ fontSize:'10px', color:'var(--text4)', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 10px' }}>Education</p>
              <p style={{ fontWeight:700, fontSize:'15px', color:'var(--text)', margin:'0 0 4px' }}>B.Sc Information Technology</p>
              <p style={{ fontSize:'13px', color:'var(--text3)', margin:'0 0 4px' }}>C.P.A College, Madurai Karamar University</p>
              <p style={{ fontSize:'12px', color:'var(--text4)', margin:0 }}>Tamil Nadu, India · 2021 – 2024</p>
            </div>
          </div>
        </div>
      </section>

      <SkillsSection />

      {/* ── Achievements ───────────────────────────────────────── */}
      <section style={{ background:'var(--bg)', padding:'0 clamp(20px,6vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div style={{ borderRadius:'28px', padding:'clamp(28px,4vw,48px)', background:'var(--card)', border:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
              <Award size={18} strokeWidth={1.75} style={{ color:'var(--accent)' }}/>
              <p style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.14em', textTransform:'uppercase', margin:0 }}>Achievements</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {[
                'Designed 10+ mobile and dashboard UI concepts for fintech and SaaS products',
                'Improved workflow efficiency and usability through accessibility-focused design decisions across projects',
                'Built reusable component systems reducing design inconsistencies across product teams',
                'Delivered responsive UI solutions optimized for developer handoff and product scalability',
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                  <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', flexShrink:0, marginTop:'7px' }}/>
                  <p style={{ fontSize:'14px', lineHeight:'1.7', color:'var(--text3)', margin:0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────── */}
      <section id="experience" data-reveal style={{ background:'var(--exp-bg)', color:'var(--exp-text)', padding:'clamp(80px,10vw,120px) clamp(20px,6vw,80px)', transition:'background 0.4s ease' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.02em', fontSize:'clamp(52px,8vw,100px)', lineHeight:1, margin:'0 0 56px', color:'var(--exp-text)' }}>
            Experience
          </h2>
          {experience.map((exp, i) => (
            <ExpItem key={i} exp={exp} last={i === experience.length - 1} />
          ))}

          {/* Certifications */}
          <div style={{ marginTop:'56px', paddingTop:'40px', borderTop:`1px solid var(--exp-div)` }}>
            <p style={{ fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--exp-muted)', marginBottom:'20px' }}>Certifications</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'12px' }}>
              {[
                { name:'Google UX Design Professional Certificate', org:'Coursera', year:'2025' },
                { name:'Figma UI/UX Design Essentials', org:'Udemy', year:'2024' },
              ].map(cert => (
                <div key={cert.name} style={{ padding:'16px 22px', borderRadius:'16px', background:'var(--exp-bg)', border:`1px solid var(--exp-div)` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                    <Award size={14} strokeWidth={1.5} style={{ color:'var(--accent)', flexShrink:0 }} />
                    <p style={{ fontWeight:700, fontSize:'14px', color:'var(--exp-text)', margin:0 }}>{cert.name}</p>
                  </div>
                  <p style={{ fontSize:'12px', color:'var(--exp-muted)', margin:0 }}>{cert.org} · {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FreelanceSection />

      {/* ── Work ───────────────────────────────────────────────── */}
      <section id="work" ref={workRef} data-reveal
        className={`reveal-section${workVisible ? ' visible' : ''}`}
        style={{ background:'var(--bg)', padding:'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'48px', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <p style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 6px' }}>Selected Work</p>
              <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(32px,4.2vw,52px)', letterSpacing:'-0.02em', color:'var(--text)', margin:0 }}>
                <DecryptText text="Featured Projects" trigger={workVisible} />
              </h2>
            </div>
            <button onClick={() => scrollTo('contact')}
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'10px 22px', borderRadius:'9999px', fontSize:'13px', fontWeight:500, border:'1px solid var(--border)', background:'transparent', color:'var(--text3)', transition:'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--accent-border)'; (e.currentTarget as HTMLElement).style.color='var(--accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--text3)' }}
            >Discuss a project <ArrowUpRight size={14} strokeWidth={1.5}/></button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'20px' }}>
            {projects.map((p, i) => <ProjectCard key={i} p={p} sound={sound} />)}
          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section data-reveal style={{ background:'var(--bg)', padding:'0 clamp(20px,6vw,80px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <p style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 8px' }}>More Work</p>
            <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(32px,4.2vw,52px)', letterSpacing:'-0.02em', color:'var(--text)', margin:0 }}>Design Gallery</h2>
          </div>

          {/* 5-slot asymmetric grid */}
          <div className="gallery-grid">
            {galleryItems.map((g,i) => (
              <div key={i} className={`gi-${i}`} style={{ borderRadius:'24px', overflow:'hidden', border:'1px solid var(--border)', background:'var(--card)' }}>
                <img src={g.img} alt={g.alt} loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform='scale(1.05)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform='scale(1)'}
                />
              </div>
            ))}
          </div>

          {/* FlowHub case study feature grid */}
          <div style={{ marginTop:'48px' }}>
            {/* Label row */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'12px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'5px 14px', borderRadius:'9999px', background:'var(--accent-bg)', border:'1px solid var(--accent-border)', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent)' }}>
                  Case Study
                </span>
                <span style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:800, fontSize:'clamp(18px,2.2vw,28px)', color:'var(--text)', letterSpacing:'-0.01em' }}>FinTech Dashboard</span>
              </div>
              <span style={{ fontSize:'12px', color:'var(--text4)' }}>Dashboard · Auth · Analytics · Employee Management</span>
            </div>

            {/* Hero wide image */}
            <LinkCardWrapper href={behanceUrl}>
              <div style={{ borderRadius:'24px', overflow:'hidden', border:'1px solid var(--border)', marginBottom:'14px', height:'clamp(200px,28vw,400px)' }}>
                <img src={flowHub1Img} alt="FinTech Dashboard — case study hero" loading="lazy" decoding="async"
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block', transition:'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform='scale(1.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform='scale(1)'}
                />
              </div>
            </LinkCardWrapper>

            {/* 3-column bottom row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'14px' }}>
              {[
                { img: flowHub2Img, alt: 'FinTech Dashboard — Login & authentication screen' },
                { img: flowHub3Img, alt: 'FinTech Dashboard — Employee management view' },
                { img: flowHub4Img, alt: 'FinTech Dashboard — Reports & analytics dashboard' },
              ].map((item, i) => (
                <LinkCardWrapper key={i} href={behanceUrl}>
                  <div style={{ borderRadius:'20px', overflow:'hidden', border:'1px solid var(--border)', height:'clamp(160px,18vw,260px)' }}>
                    <img src={item.img} alt={item.alt} loading="lazy" decoding="async"
                      style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block', transition:'transform 0.6s ease' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform='scale(1.05)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform='scale(1)'}
                    />
                  </div>
                </LinkCardWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Media Posters ───────────────────────────────── */}
      <SocialPostersSection />

      {/* ── Hybrid Advantage Banner ────────────────────────────── */}
      <HybridAdvantageSection />

      {/* ── Contact ────────────────────────────────────────────── */}
      <section id="contact" data-reveal style={{ background:'var(--contact-bg)', color:'var(--contact-text)', padding:'clamp(80px,10vw,120px) clamp(20px,6vw,80px)', transition:'background 0.4s ease' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'60px', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(48px,6.5vw,84px)', lineHeight:1.02, letterSpacing:'-0.03em', color:'var(--contact-text)', margin:'0 0 24px' }}>
              Let's create<br/>together!
            </h2>
            <p style={{ fontSize:'15px', lineHeight:'1.75', color:'#6B7280', maxWidth:'340px', margin:'0 0 32px' }}>
              Open to UI/UX Designer, Product Design Intern, and Junior Product Designer roles.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {[
                { Icon: Mail as React.ElementType,           label:'yogeshwaran.ux@gmail.com',                href:'mailto:yogeshwaran.ux@gmail.com' },
                { Icon: Phone as React.ElementType,          label:'+91 6382701502',                          href:'https://wa.me/916382701502' },
                { Icon: Globe as React.ElementType,          label:'yogesh-ux-designer-portfolio.vercel.app', href:'https://yogesh-ux-designer-portfolio.vercel.app' },
                { Icon: Link2 as React.ElementType,          label:'linkedin.com/in/m-yogesh-waran',          href:'https://linkedin.com/in/m-yogesh-waran-b303a7282' },
                { Icon: Globe as React.ElementType,          label:'behance.net/yogeshwaranUIUX01',           href:'https://www.behance.net/yogeshwaranUIUX01' },
                { Icon: GithubIcon as React.ElementType,         label:'github.com/YogeshWaran082',               href:'https://github.com/YogeshWaran082' },
                { Icon: InstagramIcon as React.ElementType,  label:'instagram.com/yogesh.uiux',               href:'https://www.instagram.com/yogesh.uiux?igsh=MWppd3Z5enZsYmZ0MQ==' },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:'12px', textDecoration:'none', color:'var(--link)', fontSize:'14px', fontWeight:500, transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='var(--link-h)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='var(--link)'}
                >
                  <span style={{ width:'36px', height:'36px', borderRadius:'10px', background:'var(--tag-bg)', border:'1px solid var(--tag-border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'var(--contact-text)' }}>
                    <item.Icon size={16} strokeWidth={1.5} />
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer data-reveal style={{ background:'var(--footer-bg)', color:'var(--footer-text)', padding:'clamp(32px,5vw,48px) clamp(20px,6vw,80px) clamp(24px,4vw,40px)', transition:'background 0.4s ease' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px', flexWrap:'wrap', gap:'12px' }}>
            <span style={{ fontSize:'12px', color:'var(--footer-sub)' }}>© 2025 Yogesh Waran</span>
            <button onClick={() => {
              sound.play('click')
              window.scrollTo({ top:0, behavior:'smooth' })
            }}
              style={{ display:'flex', alignItems:'center', gap:'8px', background:'none', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600, color:'var(--footer-sub)', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--footer-sub)'}
            >
              BACK TO TOP
              <span style={{ width:'32px', height:'32px', borderRadius:'50%', background:'var(--footer-text)', color:'var(--footer-bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <ArrowUp size={14} strokeWidth={2} />
              </span>
            </button>
          </div>

          <p style={{ fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--footer-sub)', margin:'0 0 4px' }}>Have a project in mind?</p>
          <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(52px,10.5vw,148px)', letterSpacing:'-0.025em', lineHeight:0.9, color:'var(--footer-text)', margin:'0 0 12px' }}>
            Let's Talk
          </h2>

          {/* Signature */}
          <div style={{ marginBottom:'24px' }}>
            <img
              src={dark ? sigDarkImg : sigImg}
              alt="Yogesh Waran signature"
              style={{
                height: 'clamp(60px,8vw,100px)',
                width: 'auto',
                filter: 'none',
                mixBlendMode: 'normal',
                opacity: 0.92,
              }}
            />
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px', paddingTop:'24px', borderTop:`1px solid var(--footer-div)` }}>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              {([
                { label:'Portfolio', Icon: Globe as React.ElementType,         href:'https://yogesh-ux-designer-portfolio.vercel.app' },
                { label:'LinkedIn',  Icon: Link2 as React.ElementType,         href:'https://linkedin.com/in/m-yogesh-waran-b303a7282' },
                { label:'Behance',   Icon: Globe as React.ElementType,         href:'https://www.behance.net/yogeshwaranUIUX01' },
                { label:'GitHub',    Icon: GithubIcon as React.ElementType,        href:'https://github.com/YogeshWaran082' },
                { label:'Instagram', Icon: InstagramIcon as React.ElementType, href:'https://www.instagram.com/yogesh.uiux?igsh=MWppd3Z5enZsYmZ0MQ==' },
                { label:'Email',     Icon: Mail as React.ElementType,          href:'mailto:yogeshwaran.ux@gmail.com' },
              ]).map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'9px 20px', borderRadius:'9999px', fontSize:'13px', fontWeight:500, border:'1px solid var(--footer-div)', color:'var(--link)', textDecoration:'none', transition:'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--link)'; (e.currentTarget as HTMLElement).style.background='var(--link)'; (e.currentTarget as HTMLElement).style.color='var(--footer-bg)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--footer-div)'; (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='var(--link)' }}
                ><s.Icon size={14} strokeWidth={1.75}/>{s.label}</a>
              ))}
            </div>
            <p style={{ fontSize:'12px', color:'var(--footer-sub)', textAlign:'right', lineHeight:'1.7' }}>
              Designed &amp; Built by Yogesh Waran<br/>Chennai, India · 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── ProjectCard ───────────────────────────────────────────────────── */
function ProjectCard({ p, sound }: { p: typeof projects[0]; sound: any }) {
  const [hovered, setHovered] = useState(false)
  return (
    <LinkCardWrapper href={behanceUrl} style={{ borderRadius:'32px', overflow:'hidden', display:'block' }} onClick={() => sound.play('project-open')}>
      <div className="neon-card"
        onMouseEnter={() => {
          setHovered(true)
          sound.play('hover')
        }}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius:'32px', overflow:'hidden', cursor:'pointer',
          background:'var(--card)',
          border:`1px solid ${hovered ? 'var(--border-h)' : 'var(--border)'}`,
          transform: hovered ? 'translateY(-7px) scale(1.015)' : 'none',
          boxShadow: hovered ? `0 28px 80px var(--shadow), 0 0 40px var(--glow2)` : `0 10px 30px var(--shadow)`,
          transition:'all 0.45s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
      <div style={{ overflow:'hidden', height:'248px', position:'relative' }}>
        <img src={p.img} alt={p.title} loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.6) 100%)' }}/>
        <span style={{ position:'absolute', top:'12px', right:'12px', padding:'4px 11px', borderRadius:'9999px', fontSize:'11px', fontWeight:600, background:'rgba(0,0,0,0.5)', color:'#fff', backdropFilter:'blur(8px)' }}>{p.year}</span>
      </div>
        <div style={{ padding:'20px 24px 26px' }}>
          <p style={{ fontSize:'11px', color:'var(--text4)', margin:'0 0 5px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{p.category}</p>
          <h3 style={{ fontSize:'19px', fontWeight:700, color:'var(--text)', margin:'0 0 10px' }}>{p.title}</h3>
          <p style={{ fontSize:'13px', lineHeight:'1.65', color:'var(--text3)', margin:'0 0 18px' }}>{p.desc}</p>
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <div style={{ width:'34px', height:'34px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: hovered ? 'var(--accent)' : 'var(--tag-bg)', color: hovered ? 'var(--accent-fg)' : 'var(--text4)', transition:'all 0.3s' }}><ArrowUpRight size={15} strokeWidth={1.75}/></div>
          </div>
        </div>
      </div>
    </LinkCardWrapper>
  )
}

/* ── Hybrid Advantage ──────────────────────────────────────────────── */
function HybridAdvantageSection() {
  return (
    <section style={{ background:'var(--bg2)', padding:'clamp(80px,10vw,120px) clamp(20px,6vw,80px)' }}>
      <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
        <div style={{
          borderRadius:'32px', overflow:'hidden', position:'relative',
          background:'var(--card)',
          border:'1px solid var(--border)',
          boxShadow:'0 40px 90px rgba(15,23,42,0.08)',
        }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.05fr 0.95fr', minHeight:'380px' }}>
            <div style={{ padding:'clamp(40px,5vw,72px)', display:'grid', gap:'20px', borderRight:'1px solid rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(34px,4.4vw,48px)', lineHeight:1.05, letterSpacing:'-0.03em', color:'var(--text)', margin:0 }}>
                UI/UX Design &<br />
                Development
              </h2>
              <p style={{ margin:0, fontSize:'16px', lineHeight:1.8, color:'var(--text3)', maxWidth:'560px' }}>
                I design and develop modern, responsive web and mobile applications that deliver seamless user experiences and drive results.
              </p>
              <a href="#work" style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginTop:'14px', color:'var(--link)', fontWeight:700, fontSize:'15px', textDecoration:'none' }}>
                Learn more <ArrowUpRight size={16} strokeWidth={2} />
              </a>
            </div>

            <div style={{ padding:'clamp(40px,5vw,72px)', display:'grid', gap:'18px', alignContent:'center' }}>
              {[
                { label:'Service', value:'UI/UX Design & Development' },
                { label:'What I deliver', value:'UI/UX Design, Frontend Development, Responsive Websites, Web Applications' },
                { label:'Technologies', value:'Figma, HTML, CSS, JavaScript, React, Next.js' },
                { label:'Timeline', value:'7 – 21 Days' },
                { label:'Support', value:'Post-launch Support & Maintenance' },
              ].map((item, index) => (
                <div key={index} style={{ display:'grid', gridTemplateColumns:'max-content 1fr', gap:'18px', alignItems:'start', padding:'14px 0', borderBottom: index < 4 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <span style={{ fontSize:'13px', fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>{item.label}</span>
                  <span style={{ fontSize:'14px', lineHeight:1.8, color:'var(--text3)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Independent Projects ──────────────────────────────────────────── */
function IndependentProjectsSection() {
  return (
    <section style={{ background:'var(--bg2)', padding:'clamp(80px,10vw,120px) clamp(20px,6vw,80px)' }}>
      <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'48px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 14px', borderRadius:'9999px', background:'var(--accent-bg)', border:'1px solid var(--accent-border)', marginBottom:'14px' }}>
              <Briefcase size={13} strokeWidth={1.75} style={{ color:'var(--accent)' }}/>
              <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)' }}>Freelance Work</span>
            </div>
            <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(32px,4.2vw,52px)', letterSpacing:'-0.02em', color:'var(--text)', margin:0 }}>
              Independent Projects
            </h2>
          </div>
          <p style={{ fontSize:'14px', color:'var(--text4)', maxWidth:'300px', margin:0, lineHeight:'1.6' }}>
            Side projects and concept work built outside client engagements — exploring new problem spaces and design directions.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'24px' }}>
          {independentProjects.map((p, i) => <IndependentCard key={i} p={p} />)}
        </div>
      </div>
    </section>
  )
}

function IndependentCard({ p }: { p: typeof independentProjects[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <LinkCardWrapper href={behanceUrl} style={{ borderRadius:'28px', overflow:'hidden', display:'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius:'28px', overflow:'hidden', cursor:'pointer',
          background:'var(--card)',
          border:`1px solid ${hovered ? 'var(--border-h)' : 'var(--border)'}`,
          transform: hovered ? 'translateY(-7px)' : 'none',
          boxShadow: hovered ? `0 28px 72px var(--shadow), 0 0 32px var(--glow2)` : `0 8px 28px var(--shadow)`,
          transition:'all 0.42s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
      {/* Image */}
      <div style={{ overflow:'hidden', height:'220px', position:'relative' }}>
        <img src={p.img} alt={p.title} loading="lazy" decoding="async"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <span style={{ position:'absolute', top:'12px', right:'12px', padding:'4px 11px', borderRadius:'9999px', fontSize:'11px', fontWeight:600, background:'rgba(0,0,0,0.55)', color:'#fff', backdropFilter:'blur(8px)' }}>{p.year}</span>
        {hovered && (
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.28)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-fg)' }}>
              <ArrowUpRight size={18} strokeWidth={1.75}/>
            </div>
          </div>
        )}
      </div>

        {/* Info */}
        <div style={{ padding:'20px 22px 24px' }}>
          <p style={{ fontSize:'11px', color:'var(--text4)', margin:'0 0 5px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{p.category}</p>
          <h3 style={{ fontSize:'18px', fontWeight:700, color:'var(--text)', margin:'0 0 10px' }}>{p.title}</h3>
          <p style={{ fontSize:'13px', lineHeight:'1.65', color:'var(--text3)', margin:'0 0 16px' }}>{p.desc}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {p.tags.map(t => (
              <span key={t} style={{ padding:'4px 12px', borderRadius:'9999px', fontSize:'11px', background:'var(--tag-bg)', border:'1px solid var(--tag-border)', color:'var(--text4)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </LinkCardWrapper>
  )
}

/* ── Skills ────────────────────────────────────────────────────────── */
function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} style={{ background:'var(--bg)', padding:'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
      <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
        <div style={{ borderRadius:'32px', padding:'clamp(32px,4vw,56px)', background:'var(--skill-bg)', border:'1px solid var(--skill-border)', boxShadow:'0 24px 80px rgba(0,0,0,0.55)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'48px' }}>
            {/* Left */}
            <div>
              <h2 style={{ fontWeight:700, fontSize:'clamp(24px,3vw,38px)', lineHeight:1.15, color:'var(--skill-text)', margin:'0 0 36px' }}>
                Background Skills<br/>&amp; Accomplishments
              </h2>

              {/* Tool icons */}
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'36px' }}>
                {[
                  { label:'Figma',      icon:'◈' },
                  { label:'XD',         icon:'Xd' },
                  { label:'Framer',     icon:'▲' },
                  { label:'Code',       icon:'</>' },
                  { label:'Photoshop',  icon:'Ps' },
                ].map(t => (
                  <div key={t.label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                    <div style={{ width:'64px', height:'78px', borderRadius:'28px', background:'var(--skill-tool-bg)', border:'1px solid var(--skill-tool-bdr)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', fontWeight:700, color:'var(--skill-text)' }}>{t.icon}</div>
                    <span style={{ fontSize:'10px', color:'var(--skill-muted)' }}>{t.label}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize:'13px', lineHeight:'1.75', color:'var(--skill-label)' }}>
                1.3 years designing fintech &amp; SaaS products end-to-end — from user research and wireframes through high-fidelity Figma prototypes, design systems, and developer handoff. Experienced with AI-assisted workflows using Figma AI, Claude AI, and Cursor AI.
              </p>
            </div>

            {/* Right — bars */}
            <div>
              <div style={{ display:'flex', flexDirection:'column', gap:'18px', marginBottom:'32px' }}>
                {skills.map(s => (
                  <div key={s.label}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'7px' }}>
                      <span style={{ fontSize:'13px', fontWeight:500, color:'var(--skill-label)' }}>{s.label}</span>
                      <span style={{ fontSize:'13px', fontWeight:600, color:'var(--accent)' }}>{s.value}%</span>
                    </div>
                    <div style={{ height:'6px', borderRadius:'9999px', background:'var(--skill-track)', overflow:'hidden' }}>
                      <div className="skill-fill" style={{ width: vis ? `${s.value}%` : '0%' }}/>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop:'24px', borderTop:'1px solid var(--skill-divider)', marginBottom:'20px' }}>
                <p style={{ fontSize:'11px', color:'var(--skill-muted)', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 12px' }}>Design Tools &amp; Stack</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'16px' }}>
                  {tools.map(t => (
                    <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'6px 14px', borderRadius:'9999px', fontSize:'12px', fontWeight:500, border:'1px solid var(--accent-border)', background:'var(--accent-bg)', color:'var(--accent)' }}><ChevronRight size={11} strokeWidth={2}/>{t}</span>
                  ))}
                </div>
                <p style={{ fontSize:'11px', color:'var(--skill-muted)', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 12px' }}>Frontend</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {frontendTools.map(t => (
                    <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'6px 14px', borderRadius:'9999px', fontSize:'12px', fontWeight:500, border:'1px solid var(--skill-fe-bdr)', background:'var(--skill-fe-bg)', color:'var(--skill-label)' }}><Code2 size={11} strokeWidth={1.75}/>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* UX Methods strip */}
          <div style={{ marginTop:'40px', paddingTop:'36px', borderTop:'1px solid var(--skill-border)' }}>
            <p style={{ fontSize:'11px', color:'var(--skill-muted)', letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 18px', textAlign:'center' }}>UX Methods</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center' }}>
              {uxMethods.map(m => (
                <span key={m} style={{ padding:'8px 18px', borderRadius:'9999px', fontSize:'13px', fontWeight:500, border:'1px solid var(--skill-tool-bdr)', background:'var(--skill-tool-bg)', color:'var(--skill-label)' }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── ExperienceItem ────────────────────────────────────────────────── */
function ExpItem({ exp, last }: { exp: typeof experience[0]; last: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid var(--exp-div)', cursor:'pointer' }} onClick={() => setOpen(!open)}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'24px', flexWrap:'wrap', padding:'clamp(24px,3vw,36px) 0' }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap', marginBottom:'6px' }}>
            <h3 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(28px,3.5vw,46px)', letterSpacing:'-0.02em', color:'var(--exp-text)', margin:0, textTransform:'uppercase' }}>{exp.company}</h3>
            <span style={{ padding:'4px 12px', borderRadius:'9999px', fontSize:'11px', fontWeight:600, background:'rgba(0,0,0,0.08)', color:'var(--exp-muted)' }}>{exp.industry}</span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'16px' }}>
            <span style={{ fontSize:'14px', fontWeight:600, color:'var(--exp-text)' }}>{exp.role}</span>
            <span style={{ fontSize:'14px', color:'var(--exp-muted)' }}>·</span>
            <span style={{ fontSize:'14px', color:'var(--exp-muted)' }}>{exp.location}</span>
            <span style={{ fontSize:'14px', color:'var(--exp-muted)' }}>·</span>
            <span style={{ fontSize:'14px', color:'var(--exp-muted)' }}>{exp.subtitle}</span>
          </div>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <p style={{ fontSize:'13px', color:'var(--exp-muted)', margin:'0 0 8px' }}>{exp.period}</p>
          <span style={{ fontSize:'22px', color:'var(--exp-muted)', display:'inline-block', transform: open ? 'rotate(45deg)' : 'none', transition:'transform 0.3s ease' }}>+</span>
        </div>
      </div>
      <div style={{ maxHeight: open ? '400px' : '0', overflow:'hidden', transition:'max-height 0.42s cubic-bezier(0.23,1,0.32,1)' }}>
        <p style={{ fontSize:'14px', lineHeight:'1.8', color:'var(--exp-muted)', maxWidth:'680px', paddingBottom:'32px', margin:0 }}>{exp.desc}</p>
      </div>
    </div>
  )
}

/* ── ContactForm ───────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })

  const base = { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid var(--input-border)', padding:'11px 0', fontSize:'14px', color:'var(--contact-text)', outline:'none', boxSizing:'border-box' as const }

  const buildWhatsApp = () => {
    const text = `Hi Yogesh! I'm ${form.name} (${form.email}).\n\n${form.message}`
    return `https://wa.me/916382701502?text=${encodeURIComponent(text)}`
  }

  const buildEmail = () => {
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
    const body = encodeURIComponent(`Hi Yogesh,\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`)
    return `mailto:yogeshwaran.ux@gmail.com?subject=${subject}&body=${body}`
  }

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(buildWhatsApp(), '_blank')
  }

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    window.location.href = buildEmail()
  }

  return (
    <form onSubmit={handleWhatsApp} style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
      <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
        <label style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.08em' }}>Your name</label>
        <input value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} placeholder="Your name" required style={base}
          onFocus={e => e.currentTarget.style.borderBottomColor='var(--text2)'}
          onBlur={e => e.currentTarget.style.borderBottomColor='var(--input-border)'}
        />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
        <label style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.08em' }}>Your email</label>
        <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} placeholder="you@example.com" required style={base}
          onFocus={e => e.currentTarget.style.borderBottomColor='var(--text2)'}
          onBlur={e => e.currentTarget.style.borderBottomColor='var(--input-border)'}
        />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
        <label style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.08em' }}>Message</label>
        <textarea value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} rows={4} placeholder="Tell me about your project or role..." required style={{ ...base, resize:'none' }}
          onFocus={e => e.currentTarget.style.borderBottomColor='var(--text2)'}
          onBlur={e => e.currentTarget.style.borderBottomColor='var(--input-border)'}
        />
      </div>
      <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
        {/* WhatsApp primary */}
        <button type="submit" style={{ flex:1, minWidth:'140px', height:'54px', borderRadius:'9999px', background:'#25D366', color:'#fff', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'opacity 0.2s, transform 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity='0.88'; (e.currentTarget as HTMLElement).style.transform='scale(1.02)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity='1'; (e.currentTarget as HTMLElement).style.transform='scale(1)' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
        {/* Email secondary */}
        <button type="button" onClick={handleEmail} style={{ flex:1, minWidth:'140px', height:'54px', borderRadius:'9999px', background:'transparent', color:'var(--contact-text)', fontWeight:600, fontSize:'14px', border:'1px solid var(--input-border)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--accent)'; (e.currentTarget as HTMLElement).style.color='var(--accent)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--input-border)'; (e.currentTarget as HTMLElement).style.color='var(--contact-text)' }}
        >
          <Mail size={15} strokeWidth={1.75}/>
          Send Email
        </button>
      </div>
    </form>
  )
}

/* ── Social Media Posters ──────────────────────────────────────────── */
const posterItems = [
  {
    img: socialGridImg,
    title: 'UI/UX Social Content Grid',
    platform: 'Instagram · LinkedIn',
    size: '1080×1080',
    tags: ['Personal Brand', 'Education', 'Social Media'],
  },
  {
    img: yogaAppImg,
    title: 'Yoga App UI Showcase',
    platform: 'Instagram · Behance',
    size: '1080×1080',
    tags: ['Mobile UI', 'Health', 'App Design'],
  },
  {
    img: fashionAppImg,
    title: 'Fashion Shopping App',
    platform: 'Behance · Dribbble',
    size: '1200×900',
    tags: ['Mobile UI', 'E-Commerce', 'Mockup'],
  },
  {
    img: showcashImg,
    title: 'ShowCash Music App UI',
    platform: 'Behance · Instagram',
    size: '1280×720',
    tags: ['Music App', 'Dark UI', 'Mobile'],
  },
  {
    img: globalTechImg,
    title: 'Global Tech LinkedIn Post',
    platform: 'LinkedIn',
    size: '1200×1500',
    tags: ['Corporate', 'Tech', 'LinkedIn Post'],
  },
  {
    img: travelAppImg,
    title: 'Travel App — Easy Trips',
    platform: 'Behance · Dribbble',
    size: '1440×900',
    tags: ['Travel', 'Mobile UI', 'Product Design'],
  },
  {
    img: travelCaseImg,
    title: 'Travel App Case Study',
    platform: 'LinkedIn · Behance',
    size: '1440×900',
    tags: ['Case Study', 'UX Research', 'Travel'],
  },
  {
    img: greenMuseImg,
    title: 'Green Muse — Plant Shop',
    platform: 'Behance · Instagram',
    size: '1080×1350',
    tags: ['E-Commerce', 'Web Design', 'Nature'],
  },
  {
    img: kfcImg,
    title: 'KFC Campaign Poster',
    platform: 'Instagram · Facebook',
    size: '1080×1080',
    tags: ['Branding', 'Social Media', 'Food & Bev'],
  },
  {
    img: logozhdImg,
    title: 'Zanzibar Summit Poster',
    platform: 'LinkedIn · Twitter',
    size: '1200×628',
    tags: ['Event', 'Corporate', 'Branding'],
  },
  {
    img: foodImg,
    title: 'Food Delivery Campaign',
    platform: 'Instagram · Stories',
    size: '1080×1920',
    tags: ['Food', 'Promo', 'App Marketing'],
  },
  {
    img: miniBankImg,
    title: 'MiniBank Finance Ad',
    platform: 'LinkedIn · Google Ads',
    size: '1200×628',
    tags: ['Fintech', 'Banner', 'Digital Ad'],
  },
]

function SocialPostersSection() {
  return (
    <section style={{ background:'var(--bg2)', padding:'clamp(80px,10vw,120px) clamp(20px,6vw,80px)' }}>
      <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'48px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 14px', borderRadius:'9999px', background:'var(--accent-bg)', border:'1px solid var(--accent-border)', marginBottom:'14px' }}>
              <Share2 size={13} strokeWidth={1.75} style={{ color:'var(--accent)' }}/>
              <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)' }}>Social Media Design</span>
            </div>
            <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(32px,4.2vw,52px)', letterSpacing:'-0.02em', color:'var(--text)', margin:0 }}>
              Posters &amp; Campaign Ads
            </h2>
          </div>
          <p style={{ fontSize:'14px', color:'var(--text4)', maxWidth:'280px', margin:0, lineHeight:'1.6' }}>
            Visual content designed for digital platforms — optimised for engagement and brand consistency.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px' }}>
          {posterItems.map((item, i) => (
            <PosterCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PosterCard({ item }: { item: typeof posterItems[0] }) {
  const [hovered, setHovered] = useState(false)
  const link = item.platform.toLowerCase().includes('instagram') || item.platform.toLowerCase().includes('facebook') || item.platform.toLowerCase().includes('linkedin') ? instagramUrl : behanceUrl

  return (
    <LinkCardWrapper href={link} style={{ borderRadius:'24px', overflow:'hidden', display:'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius:'24px', overflow:'hidden', cursor:'pointer',
          background:'var(--card)',
          border:`1px solid ${hovered ? 'var(--border-h)' : 'var(--border)'}`,
          transform: hovered ? 'translateY(-6px)' : 'none',
          boxShadow: hovered ? `0 24px 70px var(--shadow)` : `0 8px 24px var(--shadow)`,
          transition:'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
      {/* Image */}
      <div style={{ overflow:'hidden', height:'220px', position:'relative' }}>
        <img src={item.img} alt={item.title} loading="lazy" decoding="async"
          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Platform badge */}
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', alignItems:'center', gap:'6px', padding:'5px 12px', borderRadius:'9999px', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(10px)' }}>
          <Smartphone size={11} strokeWidth={1.75} style={{ color:'white' }}/>
          <span style={{ fontSize:'11px', fontWeight:500, color:'white' }}>{item.platform}</span>
        </div>
        {/* Size badge */}
        <span style={{ position:'absolute', top:'12px', right:'12px', padding:'4px 10px', borderRadius:'9999px', fontSize:'10px', fontWeight:600, background:'rgba(0,0,0,0.55)', color:'rgba(255,255,255,0.8)', backdropFilter:'blur(8px)' }}>
          {item.size}
        </span>
        {/* Hover overlay */}
        {hovered && (
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', transition:'opacity 0.3s' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-fg)' }}>
              <ExternalLink size={18} strokeWidth={1.75}/>
            </div>
          </div>
        )}
      </div>

        {/* Info */}
        <div style={{ padding:'18px 20px 22px' }}>
          <h3 style={{ fontSize:'16px', fontWeight:700, color:'var(--text)', margin:'0 0 8px' }}>{item.title}</h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {item.tags.map(t => (
              <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'4px 10px', borderRadius:'9999px', fontSize:'11px', background:'var(--tag-bg)', border:'1px solid var(--tag-border)', color:'var(--text4)' }}>
                <Image size={9} strokeWidth={1.75}/>{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </LinkCardWrapper>
  )
}

/* ── Freelance Projects ────────────────────────────────────────────── */
const freelanceItems = [
  {
    img: heroProjectImg,
    title: 'VJ Unique Properties',
    client: 'VJ Properties · Real Estate',
    year: '2024',
    role: 'UI Design · Web Design',
    desc: 'Full website design for a Chennai OMR real estate agent. Property listing pages, search filters, consultation booking flow, and a trust-focused brand aesthetic.',
    link: '#',
    tags: ['Web Design', 'Figma', 'Real Estate'],
  },
  {
    img: mindEaseImg,
    title: 'MindEase Wellness App',
    client: 'Healthcare Startup · Remote',
    year: '2025',
    role: 'Product Design · UX Research',
    desc: 'Patient-facing mental health app featuring therapy booking, mood tracking journals, and curated wellness resources. Full UX research, wireframes, and 60+ screens.',
    link: '#',
    tags: ['Mobile App', 'Accessibility', 'Figma'],
  },
  {
    img: evChargingImg,
    title: 'EV ChargeHub Platform',
    client: 'Clean Energy · Freelance',
    year: '2024',
    role: 'UX Design · Dashboard',
    desc: 'Real-time EV charging station locator with live availability, route planning, and user reviews. Designed for 50K+ stations across India and South East Asia.',
    link: '#',
    tags: ['Web App', 'Dashboard', 'Maps UX'],
  },
]

function FreelanceSection() {
  return (
    <section style={{ background:'var(--bg)', padding:'clamp(80px,10vw,120px) clamp(20px,6vw,80px)' }}>
      <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'48px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 14px', borderRadius:'9999px', background:'var(--accent-bg)', border:'1px solid var(--accent-border)', marginBottom:'14px' }}>
              <Briefcase size={13} strokeWidth={1.75} style={{ color:'var(--accent)' }}/>
              <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)' }}>Freelance Work</span>
            </div>
            <h2 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontWeight:900, fontSize:'clamp(32px,4.2vw,52px)', letterSpacing:'-0.02em', color:'var(--text)', margin:0 }}>
              Independent Projects
            </h2>
          </div>
          <a href="mailto:yogeshwaran.ux@gmail.com"
            style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'10px 22px', borderRadius:'9999px', fontSize:'13px', fontWeight:600, border:'1px solid var(--accent-border)', background:'var(--accent-bg)', color:'var(--link)', textDecoration:'none', transition:'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--accent)'; (e.currentTarget as HTMLElement).style.color='var(--accent-fg)'; (e.currentTarget as HTMLElement).style.borderColor='var(--accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--accent-bg)'; (e.currentTarget as HTMLElement).style.color='var(--link)'; (e.currentTarget as HTMLElement).style.borderColor='var(--accent-border)' }}
          >
            <Mail size={13} strokeWidth={1.75}/> Hire me for freelance
          </a>
        </div>

        {/* List */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {freelanceItems.map((item, i) => (
            <FreelanceRow key={i} item={item} last={i === freelanceItems.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FreelanceRow({ item, last }: { item: typeof freelanceItems[0]; last: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:'grid', gridTemplateColumns:'200px 1fr auto', gap:'32px', alignItems:'center',
        padding:'clamp(24px,3vw,36px) 0',
        borderBottom: last ? 'none' : '1px solid var(--divider)',
        transition:'background 0.2s',
        borderRadius: hovered ? '20px' : '0',
        cursor: 'pointer',
      }}
      className="md:grid"
    >
      {/* Thumb */}
      <div style={{ borderRadius:'16px', overflow:'hidden', height:'110px', flexShrink:0, border:'1px solid var(--border)' }}>
        <img src={item.img} alt={item.title} loading="lazy" decoding="async"
          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      </div>

      {/* Info */}
      <div style={{ minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
          <span style={{ fontSize:'11px', color:'var(--text4)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{item.client}</span>
          <span style={{ fontSize:'11px', padding:'2px 9px', borderRadius:'9999px', background:'var(--tag-bg)', border:'1px solid var(--tag-border)', color:'var(--text4)' }}>{item.year}</span>
        </div>
        <h3 style={{ fontSize:'clamp(18px,2.5vw,26px)', fontWeight:700, color:'var(--text)', margin:'0 0 6px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.title}</h3>
        <p style={{ fontSize:'13px', lineHeight:'1.65', color:'var(--text3)', margin:'0 0 12px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{item.desc}</p>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
          {item.tags.map(t => (
            <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'4px 10px', borderRadius:'9999px', fontSize:'11px', background:'var(--tag-bg)', border:'1px solid var(--tag-border)', color:'var(--text4)' }}>
              <Code2 size={9} strokeWidth={1.75}/>{t}
            </span>
          ))}
        </div>
      </div>

      {/* Role + arrow */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'16px', flexShrink:0 }}>
        <span style={{ fontSize:'12px', color:'var(--text4)', textAlign:'right', lineHeight:'1.5' }}>{item.role}</span>
        <div style={{ width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: hovered ? 'var(--accent)' : 'var(--tag-bg)', border:`1px solid ${hovered ? 'var(--accent)' : 'var(--tag-border)'}`, color: hovered ? 'var(--accent-fg)' : 'var(--text4)', transition:'all 0.3s' }}>
          <ExternalLink size={15} strokeWidth={1.75}/>
        </div>
      </div>
    </div>
  )
}

/* ── ProfileCard ───────────────────────────────────────────────────── */
function ProfileCard({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [following, setFollowing] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
    setOffset({ x: clamp(-dx / 18, -18, 18), y: clamp(-dy / 18, -18, 18) })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
        width: '100%',
        maxWidth: '340px',
        borderRadius: '28px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: '0 24px 60px var(--shadow)',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.22s ease-out',
        willChange: 'transform',
      }}>
        {/* Portrait photo — tall, rounded inside */}
        <div style={{
          margin: '14px 14px 0',
          borderRadius: '18px',
          overflow: 'hidden',
          height: '320px',
          background: 'var(--bg2)',
          position: 'relative',
        }}>
          <img
            src={profileImg}
            alt="Yogesh Waran"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
          {/* Subtle gradient at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
            background: 'linear-gradient(to top, var(--card) 0%, transparent 100%)',
          }} />
        </div>

        {/* Info block */}
        <div style={{ padding: '18px 22px 22px' }}>
          {/* Name + verified badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
            <span style={{
              fontWeight: 800, fontSize: '20px', color: 'var(--text)',
              fontFamily: "'Outfit', sans-serif",
            }}>
              Yogesh Waran
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="#22c55e" style={{ flexShrink: 0 }}>
              <path d="M12 2l2.4 3.2L18 4l.8 3.8 3.8.8-1.2 3.6L23 15l-3.2 2.4L21 21l-3.8-.8-.8 3.8-3.6-1.2L9 25l-2.4-3.2L3 21l-.8-3.8-3.8-.8 1.2-3.6L-2 9l3.2-2.4L0 3l3.8.8.8-3.8 3.6 1.2Z" style={{ display:'none' }}/>
              <path d="M12 1 14.7 5.3 19.7 4.1 20.9 9.1 25.2 11.8 22.5 16.5 24.5 21.3 19.5 22.5 17.8 27.4 12.8 25.7 8.2 27.4 6.5 22.5 1.5 21.3 3.5 16.5.8 11.8 5.1 9.1 6.3 4.1Z" style={{ display:'none' }}/>
              <circle cx="12" cy="12" r="10"/>
              <path d="m9 12 2 2 4-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: '14px', color: 'var(--text3)', lineHeight: '1.55',
            margin: '0 0 18px',
          }}>
            Product Designer focused on<br />simplicity &amp; usability
          </p>

          {/* Stats + Follow row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={14} strokeWidth={1.75} style={{ color: 'var(--text4)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>524</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LayoutGrid size={14} strokeWidth={1.75} style={{ color: 'var(--text4)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>16</span>
              </div>
            </div>

            {/* Follow / Connect button */}
            <button
              onClick={() => { setFollowing(f => !f); scrollTo('contact') }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 20px',
                borderRadius: '9999px',
                background: following ? 'var(--accent)' : 'var(--bg2)',
                color: following ? 'var(--accent-fg)' : 'var(--text)',
                border: `1px solid ${following ? 'var(--accent)' : 'var(--border)'}`,
                fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                transform: following ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {following ? 'Following' : 'Follow'}
              {!following && (
                <span style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: 'var(--text)', color: 'var(--card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, lineHeight: 1,
                }}>+</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
