import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 240
const FRAME_PATH = '/assets/hero-frames-0918/Frame_'

type HeroFrameSequenceProps = {
  reducedMotion?: boolean
}

function framePath(index: number) {
  return `${FRAME_PATH}${String(index + 1).padStart(4, '0')}.jpg`
}

function drawCoverFrame(canvas: HTMLCanvasElement, image: HTMLImageElement, topClearance: number) {
  const context = canvas.getContext('2d', { alpha: true })
  if (!context || !image.naturalWidth || !image.naturalHeight) return

  const width = canvas.clientWidth
  const height = canvas.clientHeight

  // Better pixel ratio handling - keep it crisp without upscaling beyond source
  const deviceRatio = window.devicePixelRatio || 1

  // Calculate how much we can scale the source before it becomes obviously soft
  const maxScaleX = image.naturalWidth / width
  const maxScaleY = image.naturalHeight / height
  const maxSourceScale = Math.min(maxScaleX, maxScaleY)

  // Use the device pixel ratio, capped at 2x on mobile to save GPU fill rate & memory
  const maxAllowedRatio = window.innerWidth <= 1024 ? 2 : 2.5
  const ratio = Math.min(deviceRatio, maxAllowedRatio, Math.max(1, maxSourceScale))

  const pixelWidth = Math.round(width * ratio)
  const pixelHeight = Math.round(height * ratio)

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth
    canvas.height = pixelHeight
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.clearRect(0, 0, width, height)
  context.globalAlpha = 1
  context.globalCompositeOperation = 'source-over'

  // Use 'low' for downscaling (better crispness), 'high' for upscaling
  context.imageSmoothingEnabled = true
  const scale = maxScaleX < 1 || maxScaleY < 1 ? 'low' : 'high'
  context.imageSmoothingQuality = scale

  // Keep the portrait centered and anchored to the hero bottom, while reserving
  // enough room above the hair for the floating navigation.
  const portraitTopRatio = 0.045
  const portraitScale = (height - topClearance) / (image.naturalHeight * (1 - portraitTopRatio))

  const drawnWidth = image.naturalWidth * portraitScale
  const drawnHeight = image.naturalHeight * portraitScale
  context.drawImage(image, (width - drawnWidth) / 2, height - drawnHeight, drawnWidth, drawnHeight)
}

export function HeroFrameSequence({ reducedMotion = false }: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameRef = useRef({ value: 0 })
  const topClearanceRef = useRef(100)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return

    let mounted = true
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null)
    imagesRef.current = images as HTMLImageElement[]

    const render = () => {
      if (!mounted) return
      const currentIdx = frameRef.current.value
      // Draw requested frame or closest loaded frame for zero-latency, zero-flicker display
      let imgToDraw = images[currentIdx]
      if (!imgToDraw || !imgToDraw.complete || !imgToDraw.naturalWidth) {
        // Find nearest loaded frame
        for (let d = 1; d < FRAME_COUNT; d++) {
          const prev = images[currentIdx - d]
          if (prev?.complete && prev.naturalWidth) { imgToDraw = prev; break; }
          const next = images[currentIdx + d]
          if (next?.complete && next.naturalWidth) { imgToDraw = next; break; }
        }
      }
      if (imgToDraw?.complete && imgToDraw.naturalWidth) {
        drawCoverFrame(canvas, imgToDraw, topClearanceRef.current)
      }
      rafRef.current = null
    }

    const requestRender = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(render)
    }

    const loadSingleFrame = (index: number, priority: 'high' | 'low' = 'low') => {
      if (!mounted || images[index]) return
      const img = new Image()
      img.decoding = 'async'
      img.fetchPriority = priority
      img.src = framePath(index)
      img.onload = () => {
        if (!mounted) return
        if (Math.abs(frameRef.current.value - index) <= 2) {
          requestRender()
        }
      }
      images[index] = img
    }

    // 1. Immediately load frame 0 for instant initial hero display
    loadSingleFrame(0, 'high')

    // 2. Preload next immediate buffer frames
    for (let i = 1; i <= 8; i++) {
      loadSingleFrame(i, 'high')
    }

    // 3. Staggered background progressive queue to prevent choking network bandwidth & GPU
    let backgroundBatch = 9
    const scheduleNextBatch = () => {
      if (!mounted || backgroundBatch >= FRAME_COUNT) return
      const nextBatchEnd = Math.min(FRAME_COUNT, backgroundBatch + 12)
      for (let i = backgroundBatch; i < nextBatchEnd; i++) {
        loadSingleFrame(i, 'low')
      }
      backgroundBatch = nextBatchEnd
      if (backgroundBatch < FRAME_COUNT) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(scheduleNextBatch, { timeout: 150 })
        } else {
          setTimeout(scheduleNextBatch, 80)
        }
      }
    }
    setTimeout(scheduleNextBatch, 120)

    const setFrame = (value: number) => {
      const nextFrame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(value)))
      if (nextFrame === frameRef.current.value) return
      frameRef.current.value = nextFrame

      // Ensure target frame and surrounding buffer are eagerly requested
      for (let offset = -3; offset <= 6; offset++) {
        const idx = nextFrame + offset
        if (idx >= 0 && idx < FRAME_COUNT && !images[idx]) {
          loadSingleFrame(idx, 'high')
        }
      }

      requestRender()
    }

    const updateLayoutMetrics = () => {
      const responsiveClearance = Number.parseFloat(
        getComputedStyle(stage).getPropertyValue('--hero-frame-top-clearance'),
      )
      const navBottom = document.querySelector<HTMLElement>('.site-nav')?.getBoundingClientRect().bottom ?? 84
      topClearanceRef.current = Number.isFinite(responsiveClearance)
        ? responsiveClearance
        : navBottom + 16
      requestRender()
    }
    const resize = () => updateLayoutMetrics()
    updateLayoutMetrics()
    window.addEventListener('resize', resize)

    if (reducedMotion) {
      setFrame(0)
      return () => {
        mounted = false
        window.removeEventListener('resize', resize)
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      }
    }

    const media = gsap.matchMedia()
    media.add('(min-width: 1025px)', () => {
      const progress = { value: 0 }
      const hero = stage.closest('.hero') || stage
      const tween = gsap.to(progress, {
        value: 1,
        ease: 'none',
        onUpdate: () => setFrame(progress.value * (FRAME_COUNT - 1)),
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=380%',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => setFrame(FRAME_COUNT - 1),
          onEnterBack: () => setFrame(FRAME_COUNT - 1),
        },
      })
      return () => tween.kill()
    })

    media.add('(max-width: 1024px)', () => {
      const progress = { value: 0 }
      const hero = stage.closest('.hero') || stage
      const tween = gsap.to(progress, {
        value: 1,
        ease: 'none',
        onUpdate: () => setFrame(progress.value * (FRAME_COUNT - 1)),
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=150%',
          pin: true,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => setFrame(FRAME_COUNT - 1),
          onEnterBack: () => setFrame(FRAME_COUNT - 1),
        },
      })
      return () => tween.kill()
    })

    return () => {
      mounted = false
      media.revert()
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      imagesRef.current = []
    }
  }, [reducedMotion])

  return (
    <div ref={stageRef} className="hero-frame-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-frame-canvas" />
    </div>
  )
}
