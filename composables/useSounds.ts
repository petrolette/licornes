import { Howl } from 'howler'

// Cache des sons chargés
const soundCache: Record<string, Howl> = {}

// Configuration des sons
const soundConfig: Record<string, { src: string; volume?: number }> = {
  // Sons d'interface
  magic: { src: '/sounds/magic.mp3', volume: 0.5 },
  click: { src: '/sounds/click.mp3', volume: 0.4 },
  success: { src: '/sounds/success.mp3', volume: 0.6 },
  pop: { src: '/sounds/pop.mp3', volume: 0.5 },

  // Sons de licorne
  unicorn: { src: '/sounds/unicorn.mp3', volume: 0.6 },
  neigh: { src: '/sounds/neigh.mp3', volume: 0.5 },

  // Sons magiques
  sparkle: { src: '/sounds/sparkle.mp3', volume: 0.4 },
  rainbow: { src: '/sounds/rainbow.mp3', volume: 0.5 },
  star: { src: '/sounds/star.mp3', volume: 0.5 },

  // Sons de jeu
  win: { src: '/sounds/win.mp3', volume: 0.7 },
  match: { src: '/sounds/match.mp3', volume: 0.5 },
  flip: { src: '/sounds/flip.mp3', volume: 0.3 },

  // Sons d'animaux/nature
  butterfly: { src: '/sounds/butterfly.mp3', volume: 0.4 },
  heart: { src: '/sounds/heart.mp3', volume: 0.5 }
}

// Créer un son de fallback avec Web Audio API
const createFallbackSound = (type: string): void => {
  if (typeof window === 'undefined') return

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  // Différents sons selon le type
  switch (type) {
    case 'magic':
    case 'sparkle':
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.3)
      break

    case 'click':
    case 'pop':
    case 'flip':
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.05)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.1)
      break

    case 'success':
    case 'win':
    case 'match':
      // Arpège ascendant
      const notes = [523.25, 659.25, 783.99, 1046.50] // Do Mi Sol Do
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.value = freq
        osc.type = 'sine'
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2)
        osc.start(audioContext.currentTime + i * 0.1)
        osc.stop(audioContext.currentTime + i * 0.1 + 0.2)
      })
      break

    case 'unicorn':
    case 'neigh':
      // Son de hennissement simplifié
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
      oscillator.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.1)
      oscillator.frequency.linearRampToValueAtTime(350, audioContext.currentTime + 0.3)
      oscillator.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 0.4)
      oscillator.type = 'sawtooth'
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.5)
      break

    case 'star':
    case 'rainbow':
      // Son scintillant
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.15)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
      break

    default:
      // Son par défaut
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.1)
  }
}

// Charger un son
const loadSound = (name: string): Howl | null => {
  if (typeof window === 'undefined') return null

  if (soundCache[name]) {
    return soundCache[name]
  }

  const config = soundConfig[name]
  if (!config) {
    console.warn(`Son inconnu: ${name}`)
    return null
  }

  const sound = new Howl({
    src: [config.src],
    volume: config.volume || 0.5,
    preload: true,
    onloaderror: () => {
      console.log(`Fichier audio non trouvé pour "${name}", utilisation du son synthétisé`)
    }
  })

  soundCache[name] = sound
  return sound
}

// Composable principal
export const useSounds = () => {
  const isMuted = useState('sounds-muted', () => false)

  // Jouer un son
  const play = (name: string) => {
    if (isMuted.value) return
    if (typeof window === 'undefined') return

    const sound = loadSound(name)

    if (sound && sound.state() === 'loaded') {
      sound.play()
    } else {
      // Utiliser le fallback Web Audio API
      createFallbackSound(name)
    }
  }

  // Activer/désactiver les sons
  const toggleMute = () => {
    isMuted.value = !isMuted.value
    Howler.mute(isMuted.value)
  }

  // Précharger les sons courants
  const preloadCommon = () => {
    if (typeof window === 'undefined') return
    ;['magic', 'click', 'success', 'pop'].forEach(loadSound)
  }

  return {
    play,
    toggleMute,
    isMuted,
    preloadCommon
  }
}
