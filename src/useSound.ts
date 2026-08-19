import { useEffect, useRef, useCallback, useState } from 'react'

export type SoundType = 'hover' | 'click' | 'project-open'

interface SoundManager {
  play: (soundType: SoundType) => void
  setEnabled: (enabled: boolean) => void
  isEnabled: boolean
}

let globalAudioCtx: AudioContext | null = null
const globalAudioBuffers: Record<string, AudioBuffer> = {}
let globalSoundEnabled = true

try {
  const saved = localStorage.getItem('portfolio-sound-enabled')
  globalSoundEnabled = saved === null ? true : saved === 'true'
} catch {
  globalSoundEnabled = true
}

const AUDIO_PATHS: Record<string, string> = {
  hover: '/audio/hover.wav',
  click: '/audio/click.wav',
  'project-open': '/audio/project-open.wav',
}

const AUDIO_VOLUMES: Record<string, number> = {
  hover: 0.45,
  click: 0.65,
  'project-open': 0.75,
}

function getGlobalContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!globalAudioCtx || globalAudioCtx.state === 'closed') {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioCtx) {
      try {
        globalAudioCtx = new AudioCtx()
      } catch (e) {
        console.warn('[Sound] AudioContext init note:', e)
      }
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {})
  }
  return globalAudioCtx
}

// Digital UI audio synthesis fallback (100% reliable on all devices)
function synthPlay(soundType: SoundType) {
  try {
    const ctx = getGlobalContext()
    if (!ctx) return
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})

    const now = ctx.currentTime

    if (soundType === 'hover') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05)
      gain.gain.setValueAtTime(0.14, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
    } else if (soundType === 'click') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(580, now)
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.07)
      gain.gain.setValueAtTime(0.24, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.07)
    } else if (soundType === 'project-open') {
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(320, now)
      osc1.frequency.exponentialRampToValueAtTime(960, now + 0.16)
      gain1.gain.setValueAtTime(0.25, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(480, now + 0.04)
      osc2.frequency.exponentialRampToValueAtTime(1440, now + 0.2)
      gain2.gain.setValueAtTime(0.18, now + 0.04)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)

      osc1.start(now)
      osc1.stop(now + 0.18)
      osc2.start(now + 0.04)
      osc2.stop(now + 0.22)
    }
  } catch (err) {
    console.warn('[Sound] Synth error:', err)
  }
}

// Global direct sound trigger for any component
export function playSound(soundType: SoundType) {
  if (!globalSoundEnabled) return
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const ctx = getGlobalContext()
  const buffer = globalAudioBuffers[soundType]

  if (ctx && buffer) {
    try {
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const gainNode = ctx.createGain()
      gainNode.gain.value = AUDIO_VOLUMES[soundType] || 0.6
      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      source.start(0)
      return
    } catch {
      synthPlay(soundType)
      return
    }
  }

  synthPlay(soundType)
}

export function useSound(): SoundManager {
  const [isEnabled, setIsEnabled] = useState<boolean>(globalSoundEnabled)

  useEffect(() => {
    // 1. Initial context warmup
    getGlobalContext()

    // 2. Unlock AudioContext on first user interaction
    const unlock = () => {
      getGlobalContext()
      window.removeEventListener('click', unlock)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }

    window.addEventListener('click', unlock, { passive: true })
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('touchstart', unlock, { passive: true })
    window.addEventListener('keydown', unlock, { passive: true })

    // 3. Pre-fetch audio files into Web Audio Buffers
    Object.entries(AUDIO_PATHS).forEach(([key, path]) => {
      fetch(path)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.arrayBuffer()
        })
        .then((arrayBuffer) => {
          const ctx = getGlobalContext()
          if (ctx) return ctx.decodeAudioData(arrayBuffer)
          return null
        })
        .then((decodedBuffer) => {
          if (decodedBuffer) {
            globalAudioBuffers[key] = decodedBuffer
          }
        })
        .catch(() => {})
    })

    return () => {
      window.removeEventListener('click', unlock)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  const play = useCallback((soundType: SoundType) => {
    playSound(soundType)
  }, [])

  const setEnabled = useCallback((enabled: boolean) => {
    globalSoundEnabled = enabled
    setIsEnabled(enabled)
    try {
      localStorage.setItem('portfolio-sound-enabled', enabled ? 'true' : 'false')
      if (enabled) {
        getGlobalContext()
      }
    } catch {}
  }, [])

  return {
    play,
    setEnabled,
    isEnabled,
  }
}
