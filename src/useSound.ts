import { useEffect, useRef, useCallback, useState } from 'react'

interface SoundManager {
  play: (soundType: 'hover' | 'click' | 'project-open') => void
  setEnabled: (enabled: boolean) => void
  isEnabled: boolean
}

const AUDIO_PATHS = {
  hover: '/audio/hover.wav',
  click: '/audio/click.wav',
  'project-open': '/audio/project-open.wav',
}

const AUDIO_VOLUMES = {
  hover: 0.3,
  click: 0.4,
  'project-open': 0.4,
}

export function useSound(): SoundManager {
  const audioRefsRef = useRef<Record<string, HTMLAudioElement>>({})
  const [isEnabled, setIsEnabled] = useState(false)

  // Initialize audio elements and check localStorage on mount
  useEffect(() => {
    console.log('[Sound] Initializing sound system')
    const savedPreference = localStorage.getItem('portfolio-sound-enabled')
    if (savedPreference === 'true') {
      setIsEnabled(true)
      console.log('[Sound] Sound enabled from localStorage')
    }

    // Create audio elements for each sound
    Object.entries(AUDIO_PATHS).forEach(([key, path]) => {
      if (!audioRefsRef.current[key]) {
        const audio = new Audio(path)
        audio.preload = 'auto'
        audio.volume = AUDIO_VOLUMES[key as keyof typeof AUDIO_VOLUMES] || 0.08
        audioRefsRef.current[key] = audio
        console.log(`[Sound] Loaded ${key} from ${path} at volume ${audio.volume}`)
        
        // Log when audio loads
        audio.addEventListener('canplay', () => {
          console.log(`[Sound] ${key} ready to play`)
        })
        audio.addEventListener('error', (e) => {
          console.error(`[Sound] Error loading ${key}:`, e)
        })
      }
    })

    return () => {
      // Cleanup
      Object.values(audioRefsRef.current).forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }, [])

  const play = useCallback((soundType: 'hover' | 'click' | 'project-open') => {
    console.log(`[Sound] Attempting to play: ${soundType}, enabled: ${isEnabled}`)
    
    if (!isEnabled) {
      console.log(`[Sound] Sound disabled, skipping ${soundType}`)
      return
    }

    const audio = audioRefsRef.current[soundType]
    if (!audio) {
      console.error(`[Sound] Audio not found for ${soundType}`)
      return
    }

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log(`[Sound] Reduced motion enabled, skipping ${soundType}`)
      return
    }

    // Prevent overlapping sounds
    if (audio.currentTime > 0 && !audio.paused) {
      console.log(`[Sound] ${soundType} already playing, skipping`)
      return
    }

    try {
      console.log(`[Sound] Playing ${soundType} at volume ${audio.volume}`)
      audio.currentTime = 0
      audio.play().catch((e) => {
        console.error(`[Sound] Failed to play ${soundType}:`, e.message)
      })
    } catch (e) {
      console.error(`[Sound] Exception playing ${soundType}:`, e)
    }
  }, [isEnabled])

  return {
    play,
    setEnabled: (enabled: boolean) => {
      setIsEnabled(enabled)
      localStorage.setItem('portfolio-sound-enabled', enabled.toString())
    },
    isEnabled,
  }
}
