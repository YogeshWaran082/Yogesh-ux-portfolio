import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Play, ChevronDown, Download, MapPin, Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CurvedWallGallery } from '@/components/CurvedWallGallery'
import { PremiumMobileShowcase } from '@/components/PremiumMobileShowcase'
import { SmoothScrollProvider, scrollToTarget } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { InteractiveMethodsTimeline } from '@/components/InteractiveMethodsTimeline'
import { InteractiveExperienceTimeline } from '@/components/InteractiveExperienceTimeline'
import { CertificationsModal, type CertificationData } from '@/components/CertificationsModal'
import { ContactFormModal } from '@/components/ContactFormModal'
import brandLogo from '@/imports/yogesh-ux-logo-transparent.png'
import profilePortrait from '@/imports/yogesh-profile-pic.png'
import hrmImage from '@/imports/webp/hrm-dashboard.webp'
import miniBankImage from '@/imports/webp/mini-bank.webp'
import kfcImage from '@/imports/webp/kfc-thumbnail.2.webp'
import evImage from '@/imports/webp/ev-charging.webp'
import propertiesImage from '@/imports/webp/hero.webp'
import cyberRiskImage from '@/imports/webp/frame-155.webp'
import mindEaseImage from '@/imports/webp/image-2.webp'
import cookHubImage from '@/imports/webp/group-2.webp'
import surayaImage from '@/imports/webp/whatsapp-image-2026-08-07-at-21.29.41-10.webp'
import akashImage from '@/imports/webp/akash-portfolio.webp'
import indhurajImage from '@/imports/webp/indhuraj-portfolio.webp'
import tamizhvananImage from '@/imports/webp/tamizhvanan-portfolio.webp'
import buildersDevelopersImage from '@/imports/webp/builders-developers.webp'
import bakeryImage from '@/imports/webp/bakery-delight.webp'
import novaraGroupImage from '@/imports/webp/novara-group.webp'
import coolingServicesImage from '@/imports/webp/cooling-services.webp'
import kavyaNutrixImage from '@/imports/webp/kavyanutrix.webp'
import lifeBatteryImage from '@/imports/webp/life-battery-casestudy.webp'
import drinketImage from '@/imports/webp/drinket.webp'
import flowOne from '@/imports/webp/whatsapp-image-2026-08-07-at-22.25.25.webp'
import flowTwo from '@/imports/webp/whatsapp-image-2026-08-07-at-22.25.28.webp'
import flowThree from '@/imports/webp/whatsapp-image-2026-08-07-at-22.25.28-1.webp'
import flowFour from '@/imports/webp/whatsapp-image-2026-08-07-at-22.25.28-2.webp'
import socialOne from '@/imports/webp/whatsapp-image-2026-08-07-at-21.29.40-1.webp'
import socialTwo from '@/imports/webp/whatsapp-image-2026-08-07-at-21.29.40.webp'
import socialThree from '@/imports/webp/whatsapp-image-2026-08-07-at-21.29.41-2.webp'
import brandingImage from '@/imports/webp/logozhd.webp'
import resumePdf from '@/imports/YogeshWaran-J30T1-1.pdf'
import { HeroFrameSequence } from '@/components/HeroFrameSequence'

gsap.registerPlugin(ScrollTrigger)

type Project = { number: string; title: string; type: string; year: string; image: string; copy: string; category: string }
const WORK_SCROLL_TRIGGER_ID = "selected-work-horizontal"
const projects: Project[] = [
  { number: "01", title: "Builders & Developers", type: "WEB DESIGN / ARCHITECTURE", year: "2026", image: buildersDevelopersImage, copy: "From vision to reality. A luxury architectural discovery platform showcasing residential and commercial spaces.", category: "WEB" },
  { number: "02", title: "Novara Group", type: "BRAND IDENTITY / VENTURES", year: "2026", image: novaraGroupImage, copy: "One vision, many ventures. A bold corporate digital experience for a global collective of independent businesses.", category: "PRODUCT DESIGN" },
  { number: "03", title: "Bakery Delight", type: "E-COMMERCE / FOOD TECH", year: "2026", image: bakeryImage, copy: "An expressive artisanal dessert ordering flow with interactive cake customization and 3D flavor browsing.", category: "WEB" },
  { number: "04", title: "Cooling Services", type: "WEB PLATFORM / SERVICE TECH", year: "2026", image: coolingServicesImage, copy: "Precision cooling engineered for life. High-trust maintenance booking flow with real-time technician diagnostics.", category: "WEB" },
  { number: "05", title: "KavyaNutrix", type: "WEB DESIGN / HEALTH & WELLNESS", year: "2026", image: kavyaNutrixImage, copy: "Personalized nutrition consultation platform connecting clients with sustainable, practical wellness guidance.", category: "WEB" },
  { number: "06", title: "VJ Unique Properties", type: "WEB DESIGN / REAL ESTATE", year: "2025", image: propertiesImage, copy: "A confident property discovery experience for the OMR corridor in Chennai.", category: "WEB" },
  { number: "07", title: "Cyber Risk Dashboard", type: "PRODUCT DESIGN / SECURITY", year: "2025", image: cyberRiskImage, copy: "A focused security operations interface for understanding risk at a glance.", category: "PRODUCT DESIGN" },
  { number: "08", title: "MindEase", type: "WEB DESIGN / WELLNESS", year: "2025", image: mindEaseImage, copy: "A calmer mental wellness platform connecting people with support and resources.", category: "WEB" },
  { number: "09", title: "CookHub", type: "MOBILE UI / FOOD TECH", year: "2025", image: cookHubImage, copy: "A smart cooking experience bringing recipes, planning, and suggestions together.", category: "MOBILE UI" },
  { number: "10", title: "NexaHR", type: "PRODUCT DESIGN / SAAS", year: "2025", image: hrmImage, copy: "A calmer command centre for teams that need to move quickly.", category: "PRODUCT DESIGN" },
  { number: "11", title: "MiniBank", type: "FINTECH / MOBILE", year: "2025", image: miniBankImage, copy: "Making personal finance feel clear, considered, and human.", category: "FINTECH" },
  { number: "12", title: "KFC Redesign", type: "MOBILE / EXPERIENCE", year: "2026", image: kfcImage, copy: "A more expressive ordering flow built around appetite and ease.", category: "MOBILE UI" },
  { number: "13", title: "EV ChargeHub", type: "WEB APP / CLEAN ENERGY", year: "2024", image: evImage, copy: "Turning an unfamiliar infrastructure journey into a simple next step.", category: "WEB" },
]

type IndependentProject = {
  image: string
  title: string
  type: string
  year: string
  copy: string
  tags?: string[]
}

const independentProjects: IndependentProject[] = [
  {
    image: akashImage,
    title: "Akash Ravichandran",
    type: "PORTFOLIO / FULL-STACK DEV",
    year: "2026",
    copy: "I craft robust digital products where thoughtful design meets clean, scalable engineering. Developer portfolio for full-stack engineer in Chennai.",
    tags: ["FULL-STACK", "REACT", "NODE.JS", "SCALABLE DEV"],
  },
  {
    image: coolingServicesImage,
    title: "Cooling Services",
    type: "SERVICE TECH / WEB PLATFORM",
    year: "2026",
    copy: "Precision cooling engineered for life. High-trust maintenance booking flow with real-time technician diagnostics and leak testing.",
    tags: ["SERVICE PLATFORM", "DIAGNOSTICS", "BOOKING FLOW", "HVAC TECH"],
  },
  {
    image: kavyaNutrixImage,
    title: "KavyaNutrix",
    type: "WELLNESS / NUTRITION PLATFORM",
    year: "2026",
    copy: "Personalized nutrition consultation platform for weight goals, PCOS, lifestyle disorders, and sustainable practical wellness.",
    tags: ["NUTRITION", "HEALTH CONSULTATION", "TELEHEALTH", "WELLNESS"],
  },
  {
    image: indhurajImage,
    title: "Indhuraj L",
    type: "PORTFOLIO / DATA ANALYST",
    year: "2026",
    copy: "Turning data into clear analysis, useful dashboards and informed decisions. A modern data analyst portfolio with visual metrics.",
    tags: ["PYTHON", "SQL", "POWER BI", "EXCEL", "STATISTICS"],
  },
  {
    image: tamizhvananImage,
    title: "Tamizhvanan A",
    type: "PORTFOLIO / HR & OPERATIONS",
    year: "2026",
    copy: "MBA graduate portfolio with digital workflow support, HRIS systems, recruitment pipeline tracking, and operational leadership storytelling.",
    tags: ["RECRUITMENT", "OPERATIONS", "HRIS", "MBA 2026"],
  },
  {
    image: surayaImage,
    title: "Suraya",
    type: "PORTFOLIO / CREATIVE DIRECTION",
    year: "2025",
    copy: "A cinematic portfolio direction for a filmmaker, editor, and storyteller.",
    tags: ["CINEMATOGRAPHY", "DIRECTION", "EDITORIAL"],
  },
  {
    image: kfcImage,
    title: "KFC Redesign",
    type: "MOBILE UI / PRODUCT EXPLORATION",
    year: "2026",
    copy: "A next-generation ordering experience built around discovery and ease.",
    tags: ["MOBILE APP", "FOOD TECH", "EXPERIENCE"],
  },
  {
    image: lifeBatteryImage,
    title: "Life Battery",
    type: "WELLNESS / MOBILE",
    year: "2025",
    copy: "A wellness product exploration focused on clear flows and useful everyday moments.",
    tags: ["WELLNESS", "MOBILE UI", "HABIT TRACKING"],
  },
  {
    image: drinketImage,
    title: "Drinket",
    type: "DELIVERY / MOBILE",
    year: "2025",
    copy: "A delivery experience shaped around browsing, checkout, and speed.",
    tags: ["ECOMMERCE", "MOBILE FLOW", "CHECKOUT UX"],
  },
]
const experience = [
  { year: "2026 — NOW", role: "UI/UX Designer Trainee", company: "RTH INFOTECH TECHNOLOGIES / Chennai", copy: "Creating brand identities, responsive web designs, digital marketing creatives, and AI-powered video content." },
  { year: "2026 — NOW", role: "Freelance UI/UX Designer", company: "Independent / Remote", copy: "Creating thoughtful web and mobile experiences from early concepts to responsive, production-ready solutions." },
  { year: "2025 — 2026", role: "UI/UX Designer", company: "Dzinemakers / Chennai", copy: "Crafting user-focused digital products from research and wireframes to high-fidelity interfaces and final handoff." },
]
const methods = [
  ["01", "DISCOVERY", "Stakeholder understanding / problem framing / requirements"],
  ["02", "RESEARCH", "User interviews / competitive analysis / secondary research"],
  ["03", "DEFINE", "Personas / pain points / journeys / problem statements"],
  ["04", "STRUCTURE", "Information architecture / user flows"],
  ["05", "DESIGN", "Wireframes / visual design / design systems"],
  ["06", "TEST", "Prototype validation / usability testing / iteration"],
]
const skills = [
  ["01", "PRODUCT DESIGN", "User research / user flows / wireframing / prototyping"],
  ["02", "INTERFACE DESIGN", "High-fidelity UI / responsive design / design systems"],
  ["03", "INTERACTION", "Micro-interactions / motion thinking / prototype behaviour"],
  ["04", "UX METHODS", "Personas / journeys / competitive analysis / testing"],
  ["05", "TOOLS", "Figma / FigJam / Framer / Adobe tools"],
  ["06", "DELIVERY", "Developer handoff / responsive specs / design QA"],
]
const gallery = [
  {
    image: kavyaNutrixImage,
    title: "KavyaNutrix",
    type: "APP DESIGN",
    tag: "WELLNESS",
    year: "2026",
    copy: "Personalized nutrition consultation platform for lifestyle disorders and sustainable practical wellness.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: novaraGroupImage,
    title: "Novara Group",
    type: "PRODUCT DESIGN",
    tag: "VENTURES",
    year: "2026",
    copy: "Corporate digital experience for a global collective of independent business ventures.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: flowTwo,
    title: "Fintech Command",
    type: "DASHBOARD",
    tag: "FINTECH",
    year: "2026",
    copy: "Real-time institutional liquidity, multi-currency wallets, and portfolio risk telemetry.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: coolingServicesImage,
    title: "Cooling Services",
    type: "WEB PLATFORM",
    tag: "SERVICE TECH",
    year: "2026",
    copy: "Precision cooling engineered for life. High-trust maintenance booking flow with real-time technician diagnostics.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: buildersDevelopersImage,
    title: "Builders & Developers",
    type: "WEB DESIGN",
    tag: "CASE STUDY",
    year: "2026",
    copy: "Luxury architectural discovery platform showcasing residential and commercial spaces across Chennai.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: bakeryImage,
    title: "Bakery Delight",
    type: "WEB DESIGN",
    tag: "E-COMMERCE",
    year: "2026",
    copy: "Artisanal dessert ordering flow with interactive cake customization and 3D flavor browsing.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: flowThree,
    title: "FlowHub Workspace",
    type: "SAAS DASHBOARD",
    tag: "SAAS UI",
    year: "2025",
    copy: "Modern workforce collaboration platform for smarter team operations, role assignments, and seamless SaaS workflows.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: socialOne,
    title: "UI/UX Design Content",
    type: "DESIGN SERIES",
    tag: "SOCIAL DESIGN",
    year: "2025",
    copy: "Visual storytelling and educational carousel series exploring interface principles, Figma workflows, and design systems.",
    link: "https://www.instagram.com/yogesh.uiux",
  },
  {
    image: socialTwo,
    title: "Yoga App UI",
    type: "MOBILE APP",
    tag: "WELLNESS",
    year: "2025",
    copy: "Mindful digital experience designed for personalized yoga routines, guided meditation sessions, and daily wellness tracking.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: socialThree,
    title: "Fashion Shopping App",
    type: "MOBILE UI",
    tag: "E-COMMERCE",
    year: "2025",
    copy: "Modern mobile apparel shopping flow focused on curated seasonal fashion, product discovery, and rapid frictionless checkout.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: brandingImage,
    title: "Zanzibar Summit Identity",
    type: "BRAND IDENTITY",
    tag: "BRANDING",
    year: "2025",
    copy: "Distinctive geometric symbol design, event branding, and comprehensive identity guidelines for Zanzibar Investment Summit 2025.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: akashImage,
    title: "Akash Portfolio",
    type: "WEB DESIGN",
    tag: "DEVELOPER",
    year: "2026",
    copy: "Technical developer showcase blending dark aesthetics with interactive performance and clean engineering.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: indhurajImage,
    title: "Indhuraj Analytics",
    type: "DASHBOARD",
    tag: "DATA ANALYST",
    year: "2026",
    copy: "Turning complex data into clear dashboards, visual metrics, intuitive filters, and executive reporting.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
  {
    image: tamizhvananImage,
    title: "Tamilvanan HR",
    type: "WEB PLATFORM",
    tag: "HRIS & OPS",
    year: "2026",
    copy: "MBA graduate portfolio featuring digital HR workflow support, recruitment pipeline tracking, and operational leadership storytelling.",
    link: "https://www.behance.net/yogeshwaranUIUX01",
  },
]
const duplicateMobileScreenFiles = new Set(["on2.webp", "streaks-26-1.webp", "track-order-1.webp"])
const mobileScreens = Object.entries(import.meta.glob("@/imports/mobil-ui/*.webp", { eager: true, import: "default", query: "?url" }))
  .filter(([path]) => !duplicateMobileScreenFiles.has(path.split("/").pop() || ""))
  .sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))
  .map(([, image]) => image as string)
const fintechSlides = [flowOne, flowTwo, flowThree, flowFour, miniBankImage, hrmImage]
const backgroundRows = [
  ["01", "DESIGN BACKGROUND", "UI/UX Design / Product Thinking / Visual Design / Responsive Systems"],
  ["02", "TOOLS", "Figma / FigJam / Framer / Adobe tools"],
  ["03", "DEVELOPMENT AWARENESS", "HTML / CSS / JavaScript / React"],
  ["04", "ACCOMPLISHMENTS", "Real-world UI/UX projects / responsive web and mobile interfaces / end-to-end case studies"],
]

const certificationsData: CertificationData[] = [
  {
    number: "01",
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera / Google",
    year: "2025",
    skills: ["User Research", "Wireframing & Prototyping", "Usability Studies", "Design Systems in Figma", "Accessible UX Architecture"],
    verificationUrl: "https://www.coursera.org",
  },
  {
    number: "02",
    title: "Figma UI/UX Design Essentials",
    issuer: "Udemy",
    year: "2024",
    skills: ["Auto-Layout & Variants", "Interactive Components", "Micro-interactions", "Design Token Architecture", "High-Fidelity Prototyping"],
    verificationUrl: "https://www.udemy.com",
  },
]

function SectionHeading({ number, title, copy }: { number: string; title: string; copy?: string }) {
  return <div className="section-heading"><span className="eyebrow">{number} / {title}</span><h2>{title}<span>.</span></h2>{copy && <p>{copy}</p>}</div>
}
function RowList({ items, className = "" }: { items: string[][]; className?: string }) {
  return <div className={`editorial-list ${className}`}>{items.map(([number, title, detail]) => <div className="editorial-row" key={number}><span className="row-number">{number}</span><h3>{title}</h3><p>{detail}</p><ArrowUpRight className="row-arrow" size={18} /></div>)}</div>
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [dateInfo, setDateInfo] = useState({ day: "Monday", date: "19 Oct 2026" })
  const [category, setCategory] = useState("ALL")
  const [fintechSlide, setFintechSlide] = useState(0)
  const [previewProject, setPreviewProject] = useState<IndependentProject | null>(null)
  const [selectedCert, setSelectedCert] = useState<CertificationData | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const closeContact = useCallback(() => setContactOpen(false), [])
  const workSectionRef = useRef<HTMLElement>(null)
  const workViewportRef = useRef<HTMLDivElement>(null)
  const workTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const now = new Date()
      const day = now.toLocaleDateString("en-US", { weekday: "long" })
      const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      setDateInfo({ day, date })
    } catch {
      // Keep initial fallback
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewProject) {
        setPreviewProject(null)
      }
    }
    if (previewProject) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [previewProject])

  useEffect(() => {
    const hero = document.getElementById("home")
    if (!hero) return
    const updateNavigation = () => {
      const pastHero = hero.getBoundingClientRect().bottom <= 80
      setScrolled(pastHero)
      if (!pastHero) setMenuOpen(false)
    }
    updateNavigation()
    window.addEventListener("scroll", updateNavigation, { passive: true })
    window.addEventListener("resize", updateNavigation)
    const observer = new ResizeObserver(updateNavigation)
    observer.observe(hero)
    return () => {
      window.removeEventListener("scroll", updateNavigation)
      window.removeEventListener("resize", updateNavigation)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const sections = ["home", "about", "methods", "skills", "experience", "work", "gallery", "contact"]
    const handleScroll = () => {
      const activationLine = Math.min(180, window.innerHeight * 0.3)
      let nextSection = "home"
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const bounds = el.getBoundingClientRect()
          if (bounds.top <= activationLine)
            nextSection = id === "methods" || id === "skills" ? "about" : id
        }
      }
      setActiveSection(nextSection)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setFintechSlide((current) => (current + 1) % fintechSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  const go = (id: string) => {
    if (id === 'gallery') {
      const trigger = ScrollTrigger.getById('design-gallery-horizontal')
      if (trigger) {
        if (window.__lenis) window.__lenis.scrollTo(trigger.start, { duration: 1.2 })
        else window.scrollTo({ top: trigger.start, behavior: 'smooth' })
        setMenuOpen(false)
        return
      }
    }
    scrollToTarget('#' + id, -70)
    setMenuOpen(false)
  }

  const selectProjectCategory = (nextCategory: string) => {
    if (nextCategory === category) return

    workViewportRef.current?.scrollTo({ left: 0, behavior: 'auto' })

    if (window.innerWidth > 1024 && workSectionRef.current) {
      const workTrigger = ScrollTrigger.getAll().find((trigger) => trigger.trigger === workSectionRef.current)
      if (workTrigger) {
        if (window.__lenis) window.__lenis.scrollTo(workTrigger.start, { immediate: true })
        else window.scrollTo({ top: workTrigger.start, behavior: 'auto' })
      }
    }

    setCategory(nextCategory)
  }

  const visibleProjects = category === "ALL" ? projects : projects.filter((project) => project.category === category)

  useLayoutEffect(() => {
    const section = workSectionRef.current
    const viewport = workViewportRef.current
    const track = workTrackRef.current
    if (!section || !viewport || !track) return

    let refreshFrame = 0
    let isActive = true
    let measuredWidth = 0
    let workTween: gsap.core.Tween | undefined
    let workTrigger: ScrollTrigger | undefined

    // HMR and category changes can otherwise leave an old pin spacer behind.
    ScrollTrigger.getById(WORK_SCROLL_TRIGGER_ID)?.kill(true)

    const scheduleRefresh = () => {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => {
        if (isActive) ScrollTrigger.refresh()
      })
    }

    const syncMeasurements = () => {
      const nextWidth = viewport.clientWidth
      if (nextWidth === measuredWidth) return
      measuredWidth = nextWidth
      section.style.setProperty('--work-slide-width', `${nextWidth}px`)
      scheduleRefresh()
    }

    viewport.scrollLeft = 0
    syncMeasurements()

    const resizeObserver = new ResizeObserver(syncMeasurements)
    resizeObserver.observe(viewport)

    const media = gsap.matchMedia()
    media.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
      const slides = Array.from(track.children) as HTMLElement[]
      if (slides.length < 2) return

      // One exact viewport step per project keeps the final frame aligned and
      // prevents stale scrollWidth values from creating an empty pin tail.
      const distance = () => Math.max(0, (slides.length - 1) * viewport.clientWidth)
      gsap.set(track, { x: 0 })

      workTween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          id: WORK_SCROLL_TRIGGER_ID,
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      })
      workTrigger = workTween.scrollTrigger

      return () => {
        workTrigger?.kill(true)
        workTween?.kill()
        workTrigger = undefined
        workTween = undefined
        gsap.set(track, { clearProps: 'transform' })
      }
    })

    window.addEventListener('load', scheduleRefresh)
    document.fonts?.ready.then(() => {
      if (isActive) scheduleRefresh()
    })

    return () => {
      isActive = false
      window.removeEventListener('load', scheduleRefresh)
      resizeObserver.disconnect()
      cancelAnimationFrame(refreshFrame)
      workTrigger?.kill(true)
      workTween?.kill()
      media.revert()
      ScrollTrigger.getById(WORK_SCROLL_TRIGGER_ID)?.kill(true)
      section.style.removeProperty('--work-slide-width')
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [category, visibleProjects.length])

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <main>
    <header className={`site-nav ${scrolled ? "is-scrolled" : "is-hero-nav"}`} aria-label="Main navigation">
      <button className="nav-brand-btn" onClick={() => { go("home"); setMenuOpen(false); }} aria-label="Go to home">
        <span className="brand-yw">YW</span>
        <span className="brand-dot" aria-hidden="true" />
      </button>

      <nav id="primary-navigation" aria-label="Main navigation" className={`nav-capsule-menu ${menuOpen ? "is-open" : ""}`}>
        {[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "work", label: "Works" },
          { id: "gallery", label: "Gallery" },
          { id: "experience", label: "Experience" },
          { id: "contact", label: "Contact" },
        ].map((item) => (
          <button
            key={item.id}
            className={`nav-capsule-item ${activeSection === item.id ? "is-active" : ""}`}
            onClick={() => {
              go(item.id)
              setMenuOpen(false)
            }}
          >
            {activeSection === item.id && <span className="nav-green-dot" aria-hidden="true" />}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="nav-right-actions">
        <div className="nav-date-box" aria-hidden="true">
          <span className="nav-day-text">{dateInfo.day}</span>
          <span className="nav-date-text">{dateInfo.date}</span>
        </div>
        <button className="nav-talk-btn" onClick={() => setContactOpen(true)}>
          <span>Let&apos;s Talk</span>
          <ArrowUpRight size={14} className="nav-talk-arrow" />
        </button>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>

    <section id="home" className="hero modern-hero editorial-section">
      <div className="hero-visual">
        <HeroFrameSequence />
        <div className="hero-portrait-halo" aria-hidden="true" />
      </div>

      <div className="hero-content-container">
        {/* Left Column: Heading, intro, CTAs, metrics */}
        <div className="hero-left-col">
          <div className="hero-cat-tag">
            <span className="hero-cat-dot" aria-hidden="true" />
            <span className="hero-cat-num">(01)</span>
            <span className="hero-cat-text">UI/UX &nbsp;•&nbsp; PRODUCT &nbsp;•&nbsp; BRANDING</span>
          </div>

          <div className="hero-heading-block">
            <h1 className="hero-editorial-title">
              <span className="title-row-white">PRODUCT</span>
              <span className="title-row-green">
                DESIGNER
                <span className="title-year-tag">(&apos;23)</span>
              </span>
            </h1>
          </div>

          <p className="hero-desc-copy">
            I design digital products with clarity, character, and a little room to breathe.
          </p>

          <div className="hero-cta-row">
            <button
              className="hero-primary-pill-btn"
              onClick={() => go("work")}
              data-cursor="EXPLORE"
            >
              <span>Explore Work</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              className="hero-secondary-pill-btn"
              onClick={() => go("gallery")}
              data-cursor="VIEW"
            >
              <span className="play-icon-wrap" aria-hidden="true">
                <Play size={10} fill="currentColor" />
              </span>
              <span>View Projects</span>
            </button>
          </div>

          <div className="hero-stats-card">
            <div className="hero-stat-cell">
              <strong className="stat-number">10+</strong>
              <span className="stat-label">Projects<br />Completed</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat-cell">
              <strong className="stat-number">1.3+</strong>
              <span className="stat-label">Years of<br />Experience</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat-cell">
              <strong className="stat-number">100%</strong>
              <span className="stat-label">Client<br />Commitment</span>
            </div>
          </div>
        </div>

        {/* Center Negative Space for Portrait Canvas */}
        <div className="hero-center-col" aria-hidden="true" />

        {/* Right Column: Status, teaser hairline, featured KFC card */}
        <div className="hero-right-col">
          <div className="hero-avail-pill">
            <div className="avail-indicator-circle">
              <span className="avail-pulse-ring" />
              <span className="avail-core-dot" />
            </div>
            <div className="avail-text-col">
              <span className="avail-line1">Available</span>
              <span className="avail-line2">for new opportunities</span>
            </div>
          </div>

          <div className="hero-hairline-teaser">
            <div className="teaser-vertical-rail">
              <span className="teaser-pulse-node" />
            </div>
            <div className="teaser-body">
              <p className="teaser-headline">Designing for a better tomorrow.</p>
              <div className="teaser-collab-row">
                <div className="teaser-avatar-stack">
                  <span className="avatar-chip">UX</span>
                  <span className="avatar-chip">UI</span>
                  <span className="avatar-chip avatar-plus">+</span>
                </div>
                <span className="teaser-collab-caption">Let&apos;s create something great together.</span>
              </div>
            </div>
          </div>

          <div
            className="hero-project-card"
            onClick={() => go("work")}
            data-cursor="VIEW"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go('work'); } }}
          >
            <div className="card-top-header">
              <span className="card-badge">FEATURED <strong>PROJECT</strong></span>
              <span className="card-counter">01 / 03</span>
            </div>
            <div className="card-main-content">
              <div className="card-text-side">
                <h3 className="card-project-title">Next Gen KFC</h3>
                <p className="card-project-sub">Mobile App Redesign</p>
                <div className="card-round-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </div>
              </div>
              <div className="card-thumb-side">
                <img
                  src={kfcImage}
                  alt="Next Gen KFC Mobile App Redesign"
                  className="card-thumb-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer-bar">
        <div className="hero-trusted-cluster">
          <span className="trusted-eyebrow">TOOLKIT &amp; ECOSYSTEM</span>
          <div className="trusted-brand-row">
            <span className="trusted-logo-text">Figma</span>
            <span className="trusted-sep">•</span>
            <span className="trusted-logo-text">Framer</span>
            <span className="trusted-sep">•</span>
            <span className="trusted-logo-text">React</span>
            <span className="trusted-sep">•</span>
            <span className="trusted-logo-text">Behance</span>
            <span className="trusted-sep">•</span>
            <span className="trusted-logo-text">Dribbble</span>
            <span className="trusted-sep">•</span>
            <span className="trusted-logo-text">WhatsApp</span>
          </div>
        </div>

        <button
          className="hero-dial-scroll"
          onClick={() => go("about")}
          aria-label="Scroll down to explore"
        >
          <div className="dial-compass-ring">
            <span className="dial-glow-node" />
          </div>
          <div className="dial-label-block">
            <span>SCROLL DOWN</span>
            <span>TO EXPLORE →</span>
          </div>
        </button>
      </div>
    </section>

    <section id="about" className="about editorial-section section-pad"><div className="section-marker">ABOUT</div><div className="about-grid container"><div className="profile-panel"><div className="profile-image"><img src={profilePortrait} alt="Yogesh Waran" /></div><div className="profile-meta"><div><strong>Yogesh Waran</strong><span><i /> open for select projects</span></div><span className="profile-place"><MapPin size={13} /> Chennai, India</span></div></div><div className="about-copy"><span className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</span><h2>Designing products<br />people <em>actually</em> use.</h2><p>I am a UI/UX and product designer who turns complex ideas into useful, memorable experiences. My practice sits between thoughtful systems and expressive interfaces.</p><a className="text-link" href="mailto:yogeshwaran.ux@gmail.com">Let us work together <ArrowUpRight size={16} /></a><div className="stats">{[["1.3+", "YEARS EXPERIENCE"], ["10+", "PROJECTS"], ["3+", "LIVE / SHIPPED PRODUCTS"], ["2", "CERTIFICATIONS"]].map(([value, label]) => <AnimatedCounter key={label} value={value} label={label} />)}</div><div className="about-education"><span className="eyebrow">EDUCATION / 2021 — 2024</span><h3>B.Sc Information Technology</h3><p>C.P.A College, Tamil Nadu</p><span>A technical foundation that keeps every design decision grounded.</span></div></div></div></section>

    <section className="methods editorial-section section-pad" id="methods"><div className="section-marker">UX METHODS</div><div className="container"><SectionHeading number="03" title="UX METHODS" copy="A practical process that keeps the interface connected to the problem." /><InteractiveMethodsTimeline /></div></section>

    <section id="skills" className="skills editorial-section section-pad"><div className="section-marker">SKILLS</div><div className="container"><SectionHeading number="04" title="SKILLS" copy="Core competencies across product strategy, interface crafting, and interaction systems." /><RowList items={skills} className="skills-interactive-list" /></div></section>

    <section id="experience" className="experience editorial-section section-pad"><div className="section-marker">EXPERIENCE</div><div className="container"><SectionHeading number="05" title="EXPERIENCE" copy="The journey so far, across independent practice and practical product work." /><InteractiveExperienceTimeline items={experience} /></div></section>

    <section className="achievements editorial-section section-pad"><div className="container"><SectionHeading number="06" title="ACHIEVEMENTS" copy="Validated career milestones across real shipped products and certifications." /><div className="achievement-grid">{[["10+", "PROJECTS COMPLETED"], ["3+", "LIVE PRODUCTS"], ["2", "CERTIFICATIONS"], ["1.3+", "YEARS EXPERIENCE"]].map(([value, label]) => <AnimatedCounter key={label} value={value} label={label} />)}</div></div></section>

    <section className="certifications editorial-section section-pad"><div className="container"><SectionHeading number="07" title="CERTIFICATIONS" copy="Verified professional credentials in design thinking, user research, and advanced Figma prototyping." /><div className="certification-list">{certificationsData.map((cert) => <article key={cert.number} data-cursor="VIEW" onClick={() => setSelectedCert(cert)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedCert(cert) } }} style={{ cursor: 'pointer' }}><span>{cert.number}</span><div><h3>{cert.title}</h3><p>{cert.issuer} / {cert.year}</p></div><ArrowUpRight size={18} /></article>)}</div></div></section>

    <section className="background-section editorial-section section-pad"><div className="container split-heading"><div><SectionHeading number="08" title="BACKGROUND AND ACCOMPLISHMENTS" /></div><div><RowList items={backgroundRows} /></div></div></section>

    <section id="work" className="work editorial-section section-pad horizontal-selected-work" ref={workSectionRef}>
      <div className="section-marker">SELECTED WORK</div>
      <div className="container">
        <SectionHeading number="09" title="SELECTED WORK" copy="A selection of products, interfaces, and visual systems made with intent." />
        <div className="filter-bar">
          {["ALL", "PRODUCT DESIGN", "FINTECH", "MOBILE UI", "WEB"].map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => selectProjectCategory(item)}>{item}</button>)}
        </div>
        <div className="horizontal-work-viewport" ref={workViewportRef}>
          <div className="project-list horizontal-work-track" ref={workTrackRef}>
            {visibleProjects.map((project) => <article className="project-row" key={project.number} data-cursor="VIEW"><div className="project-number">{project.number}</div><div className={`project-image${project.title === "CookHub" ? " project-image-cookhub" : ""}`} style={{ cursor: 'pointer' }} onClick={() => setPreviewProject({ image: project.image, title: project.title, type: project.type, year: project.year, copy: project.copy })} title="Click to expand preview"><img src={project.image} alt={project.title} loading="lazy" decoding="async" /></div><div className="project-info"><div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.copy}</p><div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}><a className="project-link" href="https://www.behance.net/yogeshwaranUIUX01" target="_blank" rel="noreferrer">View project <ArrowUpRight size={17} /></a><button type="button" onClick={() => setPreviewProject({ image: project.image, title: project.title, type: project.type, year: project.year, copy: project.copy })} style={{ background: 'transparent', border: 0, color: 'var(--green)', font: '10px var(--mono)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}>Preview <ArrowUpRight size={13} /></button></div></div></article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="fintech editorial-section section-pad"><div className="container"><div className="featured-label"><span className="eyebrow">10 / FEATURED CASE STUDY</span><h2>FINTECH<br /><em>DASHBOARD</em></h2></div><div className="fintech-gallery"><button className="fintech-preview fintech-preview-prev" onClick={() => setFintechSlide((fintechSlide - 1 + fintechSlides.length) % fintechSlides.length)} aria-label="Previous dashboard"><img src={fintechSlides[(fintechSlide - 1 + fintechSlides.length) % fintechSlides.length]} alt="" /></button><div className="feature-image" data-cursor="EXPAND" style={{ cursor: 'pointer' }} onClick={() => setPreviewProject({ image: fintechSlides[fintechSlide], title: "Fintech Dashboard", type: "FEATURED CASE STUDY", year: "2026", copy: "Real-time institutional liquidity, multi-currency wallets, and portfolio risk telemetry." })}><div className="feature-slider" aria-label="Fintech dashboard image carousel">{fintechSlides.map((image, index) => <img className={index === fintechSlide ? "is-active" : ""} key={image} src={image} alt={`Fintech dashboard screen ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} decoding="async" />)}</div><div className="feature-dots" role="tablist" aria-label="Select fintech dashboard image">{fintechSlides.map((image, index) => <button className={index === fintechSlide ? "is-active" : ""} key={image} onClick={() => setFintechSlide(index)} aria-label={`Show dashboard image ${index + 1}`} aria-selected={index === fintechSlide} role="tab" />)}</div><span className="feature-counter">{String(fintechSlide + 1).padStart(2, "0")} <b>/</b> {String(fintechSlides.length).padStart(2, "0")}</span></div><button className="fintech-preview fintech-preview-next" onClick={() => setFintechSlide((fintechSlide + 1) % fintechSlides.length)} aria-label="Next dashboard"><img src={fintechSlides[(fintechSlide + 1) % fintechSlides.length]} alt="" /></button></div><div className="feature-meta"><div><span>ROLE</span><strong>UI/UX DESIGNER</strong></div><div><span>FOCUS</span><strong>DASHBOARD UX / DATA VISUALIZATION / RESPONSIVE INTERFACE</strong></div><div><span>TOOLS</span><strong>FIGMA / PROTOTYPING / DESIGN SYSTEMS</strong></div><a className="text-link" href="https://www.behance.net/yogeshwaranUIUX01" target="_blank" rel="noreferrer">View full case study <ArrowUpRight size={16} /></a></div></div></section>

    <section className="independent editorial-section section-pad">
      <div className="container">
        <SectionHeading number="11" title="INDEPENDENT PROJECTS" copy="Selected self-initiated concepts, client portfolios and interface studies." />
        <div className="independent-grid">
          {independentProjects.map((item) => (
            <article
              className="independent-item"
              key={item.title}
              data-cursor="EXPLORE"
              onClick={() => setPreviewProject(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setPreviewProject(item)
                }
              }}
              aria-label={`View preview for ${item.title}`}
            >
              <div className="independent-item-image">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                <div className="independent-item-overlay">
                  <span className="independent-preview-badge">
                    PREVIEW <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
              <div className="independent-item-meta">
                <span>{item.type}</span>
                <span className="independent-item-year">{item.year}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.tags && (
                <div className="independent-item-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="independent-tag">{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="gallery" className="gallery editorial-section">
      <CurvedWallGallery items={gallery} />
    </section>

    <section className="mobile-screens editorial-section">
      <PremiumMobileShowcase mobileScreens={mobileScreens} />
    </section>

    <section className="freelance editorial-section section-pad"><div className="container"><SectionHeading number="14" title="FREELANCE WORK" copy="Practical external work across websites, product interfaces, and campaign design." /><RowList items={[["01", "WEBSITE DESIGN", "Landing pages / visual direction / delivered"], ["02", "WEB DEVELOPMENT", "HTML / CSS / JavaScript / React implementation"], ["03", "UI/UX DESIGN", "Mobile and web interfaces / product flows / delivered"], ["04", "CAMPAIGN DESIGN", "Social media design / visual systems / concept"]]} className="freelance-list" /></div></section>

    <footer id="contact" className="site-footer" aria-label="Footer">
      <div className="footer-top">
        <div className="footer-intro">
          <span className="footer-eyebrow">15 / LET’S CONNECT</span>
          <p className="footer-statement">LET’S<br />WORK<br />TOGETHER.</p>
          <span className="footer-availability"><i aria-hidden="true" /> AVAILABLE FOR SELECT PROJECTS</span>
          <p className="footer-note">Have a thoughtful product in mind?<br />I’d like to hear about it.</p>
        </div>
        <div className="footer-column footer-social-column">
          <a href="https://linkedin.com/in/m-yogesh-waran-b303a7282" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={14} /></a>
          <a href="https://www.instagram.com/yogesh.uiux" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={14} /></a>
          <a href="https://www.behance.net/yogeshwaranUIUX01" target="_blank" rel="noreferrer">BEHANCE <ArrowUpRight size={14} /></a>
          <a href="https://github.com/YogeshWaran082" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={14} /></a>
        </div>
        <div className="footer-column footer-location">
          <span>Chennai</span>
          <span>Tamil Nadu, India</span>
        </div>
        <div className="footer-column footer-contact-links">
          <a href="mailto:yogeshwaran.ux@gmail.com">yogeshwaran.ux@gmail.com</a>
          <a href={resumePdf as unknown as string} download="YogeshWaran-Resume.pdf">Download resume</a>
        </div>
        <button className="footer-talk" type="button" onClick={() => setContactOpen(true)} aria-label="Open contact form">
          <ArrowUpRight aria-hidden="true" />
          <span>LET’S<br />TALK</span>
        </button>
      </div>
      <div className="footer-wordmark" aria-hidden="true">YOGESH</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '18px', borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: '12px' }}>
        <small className="footer-copyright" style={{ margin: 0 }}>© YOGESH WARAN 2026 / ALL RIGHTS RESERVED</small>
        <button
          onClick={() => go("home")}
          className="footer-back-to-top"
          style={{
            background: 'transparent',
            border: '1px solid rgba(82, 249, 122, 0.3)',
            color: '#52f97a',
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.12em',
            padding: '8px 16px',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(82, 249, 122, 0.15)'
            e.currentTarget.style.borderColor = '#52f97a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(82, 249, 122, 0.3)'
          }}
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>

    {previewProject && (
      <div
        className="fullscreen-viewer"
        onClick={() => setPreviewProject(null)}
        role="dialog"
        aria-modal="true"
        aria-label={`${previewProject.title} preview`}
      >
        <button
          className="fullscreen-close"
          onClick={() => setPreviewProject(null)}
          aria-label="Close fullscreen view"
        >
          <X size={24} />
        </button>
        <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
          <img
            src={previewProject.image}
            alt={previewProject.title}
            className="fullscreen-image"
          />
          <div className="fullscreen-info">
            <span>{previewProject.type} • {previewProject.year}</span>
            <h2>{previewProject.title}</h2>
            <p style={{ maxWidth: '640px', margin: '10px auto 16px', color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>
              {previewProject.copy}
            </p>
            {previewProject.tags && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                {previewProject.tags.map((tag) => (
                  <span key={tag} style={{ font: '9px var(--mono)', color: 'var(--green)', border: '1px solid rgba(82,249,122,0.3)', padding: '4px 10px', borderRadius: '9999px', background: 'rgba(82,249,122,0.06)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <a
              href="https://www.behance.net/yogeshwaranUIUX01"
              target="_blank"
              rel="noreferrer"
              className="text-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
            >
              View Behance Portfolio <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    )}

    <CertificationsModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    <ContactFormModal open={contactOpen} onClose={closeContact} />
  </main>
</SmoothScrollProvider>
  )
}
export default App
