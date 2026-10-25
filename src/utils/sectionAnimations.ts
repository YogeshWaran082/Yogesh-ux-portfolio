import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* FEATURED PROJECTS ANIMATION */
export function animateFeaturedProjects(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-featured-card]') as NodeListOf<HTMLElement>
    const title = sectionRef.current?.querySelector('[data-featured-title]') as HTMLElement
    const description = sectionRef.current?.querySelector('[data-featured-desc]') as HTMLElement
    const counter = sectionRef.current?.querySelector('[data-featured-counter]') as HTMLElement

    /* Title entrance */
    if (title) {
      gsap.from(title, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 0.5,
        },
      })
    }

    /* Description entrance */
    if (description) {
      gsap.from(description, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 0.5,
        },
      })
    }

    /* Card progression with scroll */
    cards.forEach((card, i) => {
      const isCenter = card.getAttribute('data-featured-card') === 'center'
      const isLeft = card.getAttribute('data-featured-card') === 'left'
      const isRight = card.getAttribute('data-featured-card') === 'right'

      gsap.set(card, {
        transformOrigin: '50% 50% 0',
        perspective: 1200,
      })

      if (isCenter) {
        gsap.from(card, {
          scale: 0.88,
          opacity: 0.6,
          y: 40,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 30%',
            scrub: 0.6,
          },
        })
      }

      if (isLeft || isRight) {
        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -60 : 60,
          scale: 0.75,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 30%',
            scrub: 0.6,
          },
        })
      }
    })

    /* Counter animation */
    if (counter) {
      gsap.from(counter, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 45%',
          scrub: 0.4,
        },
      })
    }
  }, sectionRef)

  return () => ctx.revert()
}

/* INDEPENDENT PROJECTS ANIMATION */
export function animateIndependentProjects(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-ind-card]') as NodeListOf<HTMLElement>

    cards.forEach((card, i) => {
      const isCenter = i === 1
      const offset = isCenter ? 0 : i === 0 ? -80 : 80

      /* Floating entrance with stagger */
      gsap.from(card, {
        opacity: 0,
        y: 40,
        x: offset,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 35%',
          scrub: 0.6,
        },
      })

    })
  }, sectionRef)

  return () => ctx.revert()
}

/* MORE WORK ANIMATION */
export function animateMoreWork(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-more-card]') as NodeListOf<HTMLElement>

    /* Staggered entrance fade-up */
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.6,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 50%',
          scrub: 0.4,
        },
      })
    })

    /* Horizontal parallax strip */
    cards.forEach((card, i) => {
      const parallaxAmount = -20 - i * 15
      gsap.to(card, {
        x: parallaxAmount,
        y: (i % 2) * 8 - 4,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })
    })
  }, sectionRef)

  return () => ctx.revert()
}

/* DESIGN GALLERY ANIMATION */
export function animateDesignGallery(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const artworks = sectionRef.current?.querySelectorAll('[data-artwork]') as NodeListOf<HTMLElement>

    artworks.forEach((artwork, i) => {
      const isCenter = artwork.getAttribute('data-artwork') === 'center'

      /* Gallery depth entrance */
      if (isCenter) {
        gsap.from(artwork, {
          scale: 0.9,
          opacity: 0.5,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 25%',
            scrub: 0.7,
          },
        })
      } else {
        gsap.from(artwork, {
          opacity: 0,
          scale: 0.8,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 25%',
            scrub: 0.7,
          },
        })
      }
    })
  }, sectionRef)

  return () => ctx.revert()
}

/* FINTECH DASHBOARD ANIMATION */
export function animateFinTechDashboard(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const dashboard = sectionRef.current?.querySelector('[data-fintech-main]') as HTMLElement
    const leftPanel = sectionRef.current?.querySelector('[data-fintech-left]') as HTMLElement
    const rightPanel = sectionRef.current?.querySelector('[data-fintech-right]') as HTMLElement

    /* Dashboard scale + rotate entrance */
    if (dashboard) {
      gsap.from(dashboard, {
        scale: 0.88,
        rotateX: 4,
        opacity: 0.4,
        y: 50,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 0.8,
        },
      })
    }

    /* Side panels entrance + spread */
    if (leftPanel) {
      gsap.from(leftPanel, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 0.8,
        },
      })
    }

    if (rightPanel) {
      gsap.from(rightPanel, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 20%',
          scrub: 0.8,
        },
      })
    }
  }, sectionRef)

  return () => ctx.revert()
}

/* SOCIAL CAMPAIGN ANIMATION */
export function animateSocialCampaign(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const posts = sectionRef.current?.querySelectorAll('[data-post]') as NodeListOf<HTMLElement>

    posts.forEach((post, i) => {
      const isCenter = post.getAttribute('data-post') === 'center'
      const offset = i < 2 ? -60 - i * 30 : i > 2 ? 60 + (i - 2) * 30 : 0

      /* Campaign post entrance */
      gsap.from(post, {
        opacity: 0,
        y: 50,
        x: offset,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 35%',
          scrub: 0.6,
        },
      })

      /* Active post highlight */
      if (isCenter) {
        const glow = post.querySelector('[data-post-glow]') as HTMLElement
        if (glow) {
          gsap.to(glow, {
            opacity: 0.3,
            scale: 1.05,
            duration: 1.8,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          })
        }
      }
    })
  }, sectionRef)

  return () => ctx.revert()
}

/* SELECTED WORK FINALE ANIMATION */
export function animateSelectedWork(sectionRef: React.RefObject<HTMLDivElement>) {
  if (!sectionRef.current) return

  const ctx = gsap.context(() => {
    const centerVisual = sectionRef.current?.querySelector('[data-selected-center]') as HTMLElement
    const leftVisual = sectionRef.current?.querySelector('[data-selected-left]') as HTMLElement
    const rightVisual = sectionRef.current?.querySelector('[data-selected-right]') as HTMLElement
    const backgroundGlow = sectionRef.current?.querySelector('[data-selected-glow]') as HTMLElement

    /* Center visual scale entrance */
    if (centerVisual) {
      gsap.from(centerVisual, {
        scale: 0.92,
        opacity: 0.5,
        y: 40,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 15%',
          scrub: 0.8,
        },
      })
    }

    /* Side visuals entrance with perspective */
    if (leftVisual) {
      gsap.from(leftVisual, {
        x: -100,
        opacity: 0,
        rotateY: 8,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 15%',
          scrub: 0.8,
        },
      })
    }

    if (rightVisual) {
      gsap.from(rightVisual, {
        x: 100,
        opacity: 0,
        rotateY: -8,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top 15%',
          scrub: 0.8,
        },
      })
    }

    /* Background glow slow parallax */
    if (backgroundGlow) {
      gsap.to(backgroundGlow, {
        x: 30,
        opacity: 0.4,
        duration: 3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 2,
        },
      })
    }
  }, sectionRef)

  return () => ctx.revert()
}
