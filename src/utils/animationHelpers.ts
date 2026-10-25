import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Create a scrollytelling animation tied to scroll position
 * Perfect for cinematic sequences like Apple-style animations
 */
export function createScrollytelling(
  element: HTMLElement,
  options: {
    start?: string
    end?: string
    scrub?: number | boolean
    duration?: number
    animations?: Array<{
      target: string
      fromVars?: gsap.TweenVars
      toVars: gsap.TweenVars
    }>
  }
) {
  const { start = 'top center', end = 'bottom center', scrub = 0.6, animations = [] } = options

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      markers: false,
    },
  })

  animations.forEach(({ target, fromVars = {}, toVars }) => {
    tl.fromTo(target, fromVars, toVars, 0)
  })

  return tl
}

/**
 * Parallax effect - elements move at different speeds based on scroll
 */
export function createParallax(element: HTMLElement, speed: number = 0.5) {
  gsap.to(element, {
    y: () => -innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  })
}

/**
 * Staggered reveal animation
 */
export function createStaggerReveal(
  container: HTMLElement,
  selector: string,
  options: {
    duration?: number
    stagger?: number
    from?: gsap.TweenVars
  } = {}
) {
  const { duration = 0.8, stagger = 0.1, from = { opacity: 0, y: 30 } } = options

  const elements = container.querySelectorAll(selector)

  return gsap.fromTo(
    elements,
    from,
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        markers: false,
      },
    }
  )
}

/**
 * 3D rotation on scroll
 */
export function create3DScrollRotation(
  element: HTMLElement,
  axis: 'x' | 'y' | 'z' = 'y',
  maxRotation: number = 360
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.8,
      markers: false,
    },
  })

  if (axis === 'x') {
    tl.to(element, { rotationX: maxRotation, duration: 1 }, 0)
  } else if (axis === 'y') {
    tl.to(element, { rotationY: maxRotation, duration: 1 }, 0)
  } else {
    tl.to(element, { rotationZ: maxRotation, duration: 1 }, 0)
  }

  return tl
}

/**
 * Text reveal animation (useful for hero section)
 */
export function createTextReveal(element: HTMLElement, stagger: number = 0.05) {
  // Split text into chars
  const text = element.textContent || ''
  element.innerHTML = text
    .split('')
    .map((char) => `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block">${char}</span></span>`)
    .join('')

  const chars = element.querySelectorAll('span span')

  gsap.fromTo(
    chars,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        markers: false,
      },
    }
  )
}

/**
 * Morphing shape animation
 */
export function createMorphAnimation(
  svgElement: SVGElement,
  pathVariations: string[],
  options: {
    duration?: number
    stagger?: number
  } = {}
) {
  const { duration = 1, stagger = 0.5 } = options
  const paths = svgElement.querySelectorAll('path')

  paths.forEach((path, index) => {
    gsap.to(path, {
      attr: { d: pathVariations[index % pathVariations.length] },
      duration,
      stagger,
      scrollTrigger: {
        trigger: svgElement,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        markers: false,
      },
    })
  })
}

/**
 * Cursor tracking effect
 */
export function setupCursorTracking(container: HTMLElement) {
  let mouseX = 0
  let mouseY = 0

  container.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    gsap.to(container, {
      '--cursor-x': mouseX,
      '--cursor-y': mouseY,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}

/**
 * Cleanup all animations for an element
 */
export function killAnimations(element: HTMLElement) {
  gsap.killTweensOf(element)
  const trigger = ScrollTrigger.getAll().find((t) => t.trigger === element)
  if (trigger) trigger.kill()
}
