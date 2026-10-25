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

  // Use the device pixel ratio, but cap it to avoid asking low-res frames for too much detail
  const ratio = Math.min(deviceRatio, Math.max(1, maxSourceScale))

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
    let loadedCount = 0
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image()
      image.decoding = 'async'
      image.fetchPriority = index < 12 ? 'high' : 'low'
      image.src = framePath(index)
      image.onload = () => {
        if (!mounted) return
        loadedCount += 1
        if (index === frameRef.current.value || loadedCount === FRAME_COUNT) {
          drawCoverFrame(canvas, images[frameRef.current.value] || image, topClearanceRef.current)
        }
      }
      return image
    })
    imagesRef.current = images

    const render = () => {
      if (!mounted) return
      const image = images[frameRef.current.value]
      if (image?.complete && image.naturalWidth) {
        drawCoverFrame(canvas, image, topClearanceRef.current)
      }
      rafRef.current = null
    }
    const requestRender = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(render)
    }
    const setFrame = (value: number) => {
      const nextFrame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(value)))
      if (nextFrame === frameRef.current.value) return
      frameRef.current.value = nextFrame
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
          end: '+=400%',
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
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
      const visual = stage.closest('.hero-visual') || stage
      const tween = gsap.to(progress, {
        value: 1,
        ease: 'none',
        onUpdate: () => setFrame(progress.value * (FRAME_COUNT - 1)),
        scrollTrigger: {
          trigger: visual,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.55,
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
