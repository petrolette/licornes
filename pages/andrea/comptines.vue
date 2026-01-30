<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

interface Note {
  freq: number
  duration: number
}

interface Song {
  id: string
  title: string
  emoji: string
  color: string
  tempo: number // BPM
  notes: Note[]
}

// Notes de musique (fréquences en Hz)
const C4 = 262, D4 = 294, E4 = 330, F4 = 349, G4 = 392, A4 = 440, B4 = 494
const C5 = 523, D5 = 587, E5 = 659, F5 = 698, G5 = 784
const REST = 0 // silence

// Durées relatives (seront multipliées par le tempo)
const w = 4   // ronde
const h = 2   // blanche
const q = 1   // noire
const e = 0.5 // croche
const s = 0.25 // double croche

const songs: Song[] = [
  {
    id: 'pirouette',
    title: 'Pirouette Cacahuète',
    emoji: '🏠',
    color: 'bg-amber-100',
    tempo: 140,
    // "Il était une maison..."
    notes: [
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: E4, duration: q },
      { freq: A4, duration: q }, { freq: A4, duration: q }, { freq: A4, duration: h },
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: h }, { freq: D4, duration: h },
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: E4, duration: q },
      { freq: A4, duration: q }, { freq: A4, duration: q }, { freq: A4, duration: h },
      { freq: G4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: q },
      { freq: C4, duration: h }, { freq: REST, duration: h }
    ]
  },
  {
    id: 'elephant',
    title: 'Un éléphant',
    emoji: '🐘',
    color: 'bg-gray-200',
    tempo: 120,
    // "Un éléphant qui se balançait..."
    notes: [
      { freq: C4, duration: q }, { freq: E4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q },
      { freq: G4, duration: q }, { freq: E4, duration: q }, { freq: C5, duration: h },
      { freq: B4, duration: q }, { freq: A4, duration: q }, { freq: G4, duration: q }, { freq: F4, duration: q },
      { freq: E4, duration: q }, { freq: D4, duration: q }, { freq: C4, duration: h },
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: A4, duration: q }, { freq: A4, duration: q },
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: E4, duration: h },
      { freq: F4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: h }, { freq: C4, duration: h }
    ]
  },
  {
    id: 'foret',
    title: 'Dans la forêt',
    emoji: '🦉',
    color: 'bg-green-100',
    tempo: 100,
    // "Dans la forêt lointaine, on entend le coucou..."
    notes: [
      { freq: G4, duration: h }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: F4, duration: q }, { freq: D4, duration: q }, { freq: D4, duration: h },
      { freq: C4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: F4, duration: q },
      { freq: G4, duration: h }, { freq: G4, duration: h },
      // Coucou !
      { freq: E5, duration: q }, { freq: C5, duration: h }, { freq: REST, duration: q },
      { freq: E5, duration: q }, { freq: C5, duration: h }, { freq: REST, duration: q },
      { freq: G4, duration: h }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: h }, { freq: C4, duration: h }
    ]
  },
  {
    id: 'fontfont',
    title: 'Ainsi font font',
    emoji: '🤲',
    color: 'bg-rose-100',
    tempo: 130,
    // "Ainsi font font font les petites marionnettes..."
    notes: [
      { freq: C4, duration: q }, { freq: C4, duration: q }, { freq: C4, duration: q }, { freq: C4, duration: q },
      { freq: D4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: h },
      { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: h }, { freq: C4, duration: h },
      { freq: G4, duration: q }, { freq: G4, duration: e }, { freq: G4, duration: e },
      { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: h },
      { freq: G4, duration: q }, { freq: G4, duration: e }, { freq: G4, duration: e },
      { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: h },
      { freq: C4, duration: q }, { freq: E4, duration: q }, { freq: G4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: q },
      { freq: C4, duration: h }, { freq: REST, duration: h }
    ]
  },
  {
    id: 'tortue',
    title: 'Famille tortue',
    emoji: '🐢',
    color: 'bg-lime-100',
    tempo: 110,
    // "Jamais on n'a vu, jamais on ne verra..."
    notes: [
      { freq: C4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: F4, duration: q },
      { freq: G4, duration: h }, { freq: G4, duration: h },
      { freq: A4, duration: q }, { freq: G4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: h }, { freq: D4, duration: h },
      { freq: E4, duration: q }, { freq: F4, duration: q }, { freq: G4, duration: q }, { freq: A4, duration: q },
      { freq: G4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: h },
      { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: q }, { freq: C4, duration: q },
      { freq: C4, duration: h }, { freq: REST, duration: h }
    ]
  },
  {
    id: 'poissons',
    title: 'Petits poissons',
    emoji: '🐟',
    color: 'bg-cyan-100',
    tempo: 120,
    // "Les petits poissons dans l'eau..."
    notes: [
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q },
      { freq: A4, duration: q }, { freq: A4, duration: q }, { freq: G4, duration: h },
      { freq: F4, duration: q }, { freq: F4, duration: q }, { freq: F4, duration: q }, { freq: F4, duration: q },
      { freq: E4, duration: h }, { freq: E4, duration: h },
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q },
      { freq: A4, duration: q }, { freq: A4, duration: q }, { freq: G4, duration: h },
      { freq: F4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: h }, { freq: C4, duration: h }
    ]
  }
]

const currentSong = ref<string | null>(null)
const isPlaying = ref(false)
let audioContext: AudioContext | null = null
let currentTimeouts: NodeJS.Timeout[] = []
let activeOscillators: OscillatorNode[] = []

const stopCurrentSong = () => {
  isPlaying.value = false
  currentSong.value = null

  // Arrêter tous les timeouts
  currentTimeouts.forEach(t => clearTimeout(t))
  currentTimeouts = []

  // Arrêter immédiatement tous les oscillateurs actifs
  activeOscillators.forEach(osc => {
    try {
      osc.stop(0)
      osc.disconnect()
    } catch (e) {
      // Oscillateur déjà arrêté
    }
  })
  activeOscillators = []
}

// Créer un son de type xylophone/carillon plus riche
const playNote = (freq: number, startTime: number, duration: number) => {
  if (!audioContext || freq === 0) return

  const now = audioContext.currentTime + startTime

  // Oscillateur principal (fondamentale)
  const osc1 = audioContext.createOscillator()
  const gain1 = audioContext.createGain()
  osc1.type = 'sine'
  osc1.frequency.value = freq

  // Deuxième harmonique (octave)
  const osc2 = audioContext.createOscillator()
  const gain2 = audioContext.createGain()
  osc2.type = 'sine'
  osc2.frequency.value = freq * 2

  // Troisième harmonique (quinte)
  const osc3 = audioContext.createOscillator()
  const gain3 = audioContext.createGain()
  osc3.type = 'triangle'
  osc3.frequency.value = freq * 3

  // Master gain avec filtre
  const masterGain = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 2000

  // Connexions
  osc1.connect(gain1)
  osc2.connect(gain2)
  osc3.connect(gain3)
  gain1.connect(filter)
  gain2.connect(filter)
  gain3.connect(filter)
  filter.connect(masterGain)
  masterGain.connect(audioContext.destination)

  // Enveloppe ADSR (Attack, Decay, Sustain, Release)
  const attack = 0.01
  const decay = 0.1
  const sustainLevel = 0.4
  const release = 0.15
  const durationSec = duration

  // Niveaux des harmoniques
  gain1.gain.setValueAtTime(0, now)
  gain1.gain.linearRampToValueAtTime(0.35, now + attack)
  gain1.gain.linearRampToValueAtTime(0.35 * sustainLevel, now + attack + decay)
  gain1.gain.setValueAtTime(0.35 * sustainLevel, now + durationSec - release)
  gain1.gain.linearRampToValueAtTime(0.001, now + durationSec)

  gain2.gain.setValueAtTime(0, now)
  gain2.gain.linearRampToValueAtTime(0.15, now + attack)
  gain2.gain.linearRampToValueAtTime(0.15 * sustainLevel, now + attack + decay)
  gain2.gain.setValueAtTime(0.15 * sustainLevel, now + durationSec - release)
  gain2.gain.linearRampToValueAtTime(0.001, now + durationSec)

  gain3.gain.setValueAtTime(0, now)
  gain3.gain.linearRampToValueAtTime(0.08, now + attack)
  gain3.gain.linearRampToValueAtTime(0.08 * sustainLevel * 0.5, now + attack + decay)
  gain3.gain.setValueAtTime(0.08 * sustainLevel * 0.5, now + durationSec - release)
  gain3.gain.linearRampToValueAtTime(0.001, now + durationSec)

  masterGain.gain.setValueAtTime(0.8, now)

  // Ajouter à la liste des oscillateurs actifs
  activeOscillators.push(osc1, osc2, osc3)

  // Démarrage et arrêt
  osc1.start(now)
  osc2.start(now)
  osc3.start(now)
  osc1.stop(now + durationSec + 0.1)
  osc2.stop(now + durationSec + 0.1)
  osc3.stop(now + durationSec + 0.1)

  // Nettoyer les oscillateurs terminés
  const cleanupTime = (now + durationSec + 0.2) * 1000
  setTimeout(() => {
    activeOscillators = activeOscillators.filter(o => o !== osc1 && o !== osc2 && o !== osc3)
  }, cleanupTime - (audioContext?.currentTime || 0) * 1000)
}

const playSong = (songId: string) => {
  if (currentSong.value === songId && isPlaying.value) {
    stopCurrentSong()
    return
  }

  stopCurrentSong()
  currentSong.value = songId
  isPlaying.value = true

  const song = songs.find(s => s.id === songId)
  if (!song) return

  // Créer le contexte audio si nécessaire
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  // Calculer la durée d'une noire en secondes
  const beatDuration = 60 / song.tempo

  // Jouer toutes les notes de la mélodie
  const playMelody = () => {
    if (!isPlaying.value) return

    let currentTime = 0
    song.notes.forEach(note => {
      const noteDuration = note.duration * beatDuration
      if (note.freq !== REST) {
        playNote(note.freq, currentTime, noteDuration * 0.9)
      }
      currentTime += noteDuration
    })

    // Rejouer en boucle après la fin
    const totalDuration = currentTime * 1000 + 500
    const timeout = setTimeout(() => {
      if (isPlaying.value && currentSong.value === songId) {
        playMelody()
      }
    }, totalDuration)
    currentTimeouts.push(timeout)
  }

  playMelody()
}

onUnmounted(() => {
  stopCurrentSong()
  // Fermer le contexte audio
  if (audioContext) {
    audioContext.close()
    audioContext = null
  }
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-16 h-16 flex items-center justify-center rounded-2xl bg-white border-4 border-b-8 border-pink-500 shadow-2xl"
    >
      <span class="text-3xl">⬅️</span>
    </NuxtLink>

    <div class="h-full flex flex-col items-center pt-20 pb-4 px-3">
      <!-- En-tête -->
      <div class="text-center mb-4">
        <div class="text-4xl mb-1" :class="{ 'animate-bounce': isPlaying }">🎵</div>
        <h1 class="text-2xl font-magic text-rose">Comptines</h1>
      </div>

      <!-- Liste des comptines -->
      <div class="w-full max-w-sm space-y-3 overflow-y-auto flex-1">
        <button
          v-for="song in songs"
          :key="song.id"
          class="w-full p-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all active:scale-95 border-4 border-white/50"
          :class="[
            song.color,
            currentSong === song.id && isPlaying ? 'ring-4 ring-yellow-400 scale-[1.02]' : ''
          ]"
          @click="playSong(song.id)"
        >
          <span class="text-4xl" :class="{ 'animate-bounce': currentSong === song.id && isPlaying }">
            {{ song.emoji }}
          </span>
          <span class="text-lg font-magic text-gray-700 flex-1 text-left">{{ song.title }}</span>
          <span class="text-2xl">{{ currentSong === song.id && isPlaying ? '⏸️' : '▶️' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
