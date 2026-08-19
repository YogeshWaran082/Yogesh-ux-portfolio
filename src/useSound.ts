import { useEffect, useRef, useCallback, useState } from 'react'

interface SoundManager {
  play: (soundType: 'hover' | 'click' | 'project-open') => void
  setEnabled: (enabled: boolean) => void
  isEnabled: boolean
}

const AUDIO_PATHS: Record<string, string> = {
  hover: '/audio/hover.wav',
  click: '/audio/click.wav',
  'project-open': '/audio/project-open.wav',
}

const AUDIO_VOLUMES: Record<string, number> = {
  hover: 0.25,
  click: 0.35,
  'project-open': 0.45,
}

export function useSound(): SoundManager {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfolio-sound-enabled')
      // Enable sound by default unless explicitly disabled by user
      return saved === null ? true : saved === 'true'
    } catch {
      return true
    }
  })

  const ctxRef = useRef<AudioContext | null>(null)
  const audioBuffersRef = useRef<Record<string, AudioBuffer>>({})
  const audioElementsRef = useRef<Record<string, HTMLAudioElement>>({})
  const unlockedRef = useRef<boolean>(false)

  // Initialize Web Audio Context & prefetch audio files
  useEffect(() => {
    // 1. Create Web Audio Context (lazy or on mount)
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioCtx && !ctxRef.current) {
      try {
        ctxRef.current = new AudioCtx()
      } catch (err) {
        console.warn('[Sound] Web Audio Context creation failed, fallback to HTML5 Audio', err)
      }
    }

    // 2. Unlock Audio Context on first interaction
    const unlockAudio = () => {
      if (ctxRef.current && ctxRef.current.state === 'suspended') {
        ctxRef.current.resume().catch(() => {})
      }
      unlockedRef.current = true
      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    }

    window.addEventListener('click', unlockAudio, { passive: true })
    window.addEventListener('touchstart', unlockAudio, { passive: true })
    window.addEventListener('keydown', unlockAudio, { passive: true })

    // 3. Preload audio buffers & fallback HTML5 elements
    Object.entries(AUDIO_PATHS).forEach(([key, path]) => {
      // Pre-create HTML5 audio elements
      try {
        const audio = new Audio(path)
        audio.preload = 'auto'
        audio.volume = AUDIO_VOLUMES[key] || 0.3
        audioElementsRef.current[key] = audio
      } catch (err) {
        console.warn(`[Sound] HTML Audio preload failed for ${key}`, err)
      }

      // Fetch & decode into Web Audio buffers for instant zero-latency playback
      if (ctxRef.current) {
        fetch(path)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return res.arrayBuffer()
          })
          .then((arrayBuffer) => ctxRef.current?.decodeAudioData(arrayBuffer))
          .then((decodedBuffer) => {
            if (decodedBuffer) {
              audioBuffersRef.current[key] = decodedBuffer
            }
          })
          .catch((err) => {
            console.log(`[Sound] Web Audio decode note for ${key}:`, err.message)
          })
      }
    })

    return () => {
      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Synthesizer fallback for pure digital UI clicks if files aren't ready
  const playSynthesizedFallback = useCallback((soundType: 'hover' | 'click' | 'project-open') => {
    try {
      const ctx = ctxRef.current
      if (!ctx) return
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      if (soundType === 'hover') {
        // High soft blip
        osc.type = 'sine'
        osc.frequency.setValueAtTime(820, now)
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04)
        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.05)
      } else if (soundType === 'click') {
        // Cyber tick
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(540, now)
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.06)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.06)
      } else if (soundType === 'project-open') {
        // Futuristic double chime
        osc.type = 'sine'
        osc.frequency.setValueAtTime(320, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12)
        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.15)
      }
    } catch {
      // Ignore synth errors
    }
  }, [])

  const play = useCallback(
    (soundType: 'hover' | 'click' | 'project-open') => {
      if (!isEnabled) return

      // Reduced motion check
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const ctx = ctxRef.current
      const buffer = audioBuffersRef.current[soundType]

      // Method 1: Instant Web Audio Buffer playback (Zero Latency + Multiple simultaneous sounds)
      if (ctx && buffer) {
        try {
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {})
          }
          const source = ctx.createBufferSource()
          source.buffer = buffer
          const gainNode = ctx.createGain()
          gainNode.gain.value = AUDIO_VOLUMES[soundType] || 0.3
          source.connect(gainNode)
          gainNode.connect(ctx.destination)
          source.start(0)
          return
        } catch {
          // Fall through to HTML5 or synth
        }
      }

      // Method 2: HTML5 Audio Element playback
      const audio = audioElementsRef.current[soundType]
      if (audio) {
        try {
          const clone = audio.cloneNode() as HTMLAudioElement
          clone.volume = AUDIO_VOLUMES[soundType] || 0.3
          clone.play().catch(() => {
            // If HTML5 Audio fails, trigger fallback synth
            playSynthesizedFallback(soundType)
          })
          return
        } catch {
          playSynthesizedFallback(soundType)
          return
        }
      }

      // Method 3: Direct Synthesizer fallback
      playSynthesizedFallback(soundType)
    },
    [isEnabled, playSynthesizedFallback]
  )

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled)
    try {
      localStorage.setItem('portfolio-sound-enabled', enabled ? 'true' : 'false')
      if (enabled && ctxRef.current && ctxRef.current.state === 'suspended') {
        ctxRef.current.resume().catch(() => {})
      }
    } catch {
      // LocalStorage error ignored
    }
  }, [])

  return {
    play,
    setEnabled,
    isEnabled,
  }
}
