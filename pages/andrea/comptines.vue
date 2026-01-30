<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

interface Note {
  freq: number
  duration: number // en ms
}

interface Song {
  id: string
  title: string
  emoji: string
  color: string
  notes: Note[]
}

// Notes de musique (fréquences en Hz)
const C4 = 262, D4 = 294, E4 = 330, F4 = 349, G4 = 392, A4 = 440, B4 = 494, C5 = 523, D5 = 587, E5 = 659

// Durées
const q = 300  // noire
const h = 600  // blanche
const e = 150  // croche

const songs: Song[] = [
  {
    id: 'etoiles',
    title: 'Brille étoile',
    emoji: '⭐',
    color: 'bg-yellow-100',
    // "Ah vous dirai-je maman" / "Twinkle Twinkle Little Star"
    notes: [
      { freq: C4, duration: q }, { freq: C4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q },
      { freq: A4, duration: q }, { freq: A4, duration: q }, { freq: G4, duration: h },
      { freq: F4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: D4, duration: q }, { freq: D4, duration: q }, { freq: C4, duration: h }
    ]
  },
  {
    id: 'frere',
    title: 'Frère Jacques',
    emoji: '🔔',
    color: 'bg-orange-100',
    notes: [
      { freq: C4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: C4, duration: q },
      { freq: C4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: C4, duration: q },
      { freq: E4, duration: q }, { freq: F4, duration: q }, { freq: G4, duration: h },
      { freq: E4, duration: q }, { freq: F4, duration: q }, { freq: G4, duration: h },
      { freq: G4, duration: e }, { freq: A4, duration: e }, { freq: G4, duration: e }, { freq: F4, duration: e }, { freq: E4, duration: q }, { freq: C4, duration: q },
      { freq: G4, duration: e }, { freq: A4, duration: e }, { freq: G4, duration: e }, { freq: F4, duration: e }, { freq: E4, duration: q }, { freq: C4, duration: q },
      { freq: C4, duration: q }, { freq: G4, duration: q }, { freq: C4, duration: h },
      { freq: C4, duration: q }, { freq: G4, duration: q }, { freq: C4, duration: h }
    ]
  },
  {
    id: 'souris',
    title: 'Souris verte',
    emoji: '🐭',
    color: 'bg-green-100',
    // "Une souris verte" (simplifié)
    notes: [
      { freq: G4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: F4, duration: q },
      { freq: D4, duration: q }, { freq: D4, duration: h },
      { freq: C4, duration: q }, { freq: E4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q },
      { freq: E4, duration: q }, { freq: C4, duration: h },
      { freq: D4, duration: q }, { freq: D4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q },
      { freq: F4, duration: h },
      { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: F4, duration: q },
      { freq: G4, duration: h }
    ]
  },
  {
    id: 'bateau',
    title: 'Bateau sur l\'eau',
    emoji: '⛵',
    color: 'bg-sky-100',
    // "Bateau sur l'eau"
    notes: [
      { freq: E4, duration: q }, { freq: D4, duration: q }, { freq: C4, duration: h },
      { freq: E4, duration: q }, { freq: D4, duration: q }, { freq: C4, duration: h },
      { freq: C4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: F4, duration: q },
      { freq: G4, duration: h }, { freq: G4, duration: h },
      { freq: G4, duration: q }, { freq: F4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: q },
      { freq: C4, duration: h }, { freq: C4, duration: h }
    ]
  },
  {
    id: 'dodo',
    title: 'Dodo l\'enfant',
    emoji: '🌙',
    color: 'bg-violet-100',
    // Berceuse douce
    notes: [
      { freq: E4, duration: h }, { freq: D4, duration: q }, { freq: C4, duration: h },
      { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: h },
      { freq: D4, duration: q }, { freq: D4, duration: q }, { freq: D4, duration: h },
      { freq: E4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: h },
      { freq: E4, duration: h }, { freq: D4, duration: q }, { freq: C4, duration: h },
      { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: h },
      { freq: D4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: D4, duration: q },
      { freq: C4, duration: h }, { freq: C4, duration: h }
    ]
  },
  {
    id: 'pomme',
    title: 'Pomme de reinette',
    emoji: '🍎',
    color: 'bg-rose-100',
    // "Pomme de reinette et pomme d'api"
    notes: [
      { freq: G4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: F4, duration: q }, { freq: D4, duration: q }, { freq: D4, duration: q },
      { freq: C4, duration: q }, { freq: D4, duration: q }, { freq: E4, duration: q }, { freq: F4, duration: q },
      { freq: G4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: h },
      { freq: G4, duration: q }, { freq: E4, duration: q }, { freq: E4, duration: q },
      { freq: F4, duration: q }, { freq: D4, duration: q }, { freq: D4, duration: q },
      { freq: C4, duration: q }, { freq: E4, duration: q }, { freq: G4, duration: q }, { freq: G4, duration: q },
      { freq: C4, duration: h }, { freq: C4, duration: h }
    ]
  }
]

const currentSong = ref<string | null>(null)
const isPlaying = ref(false)
let audioContext: AudioContext | null = null
let currentTimeout: NodeJS.Timeout | null = null

const stopCurrentSong = () => {
  isPlaying.value = false
  currentSong.value = null
  if (currentTimeout) {
    clearTimeout(currentTimeout)
    currentTimeout = null
  }
}

const playSong = (songId: string) => {
  // Si même chanson, toggle pause
  if (currentSong.value === songId && isPlaying.value) {
    stopCurrentSong()
    return
  }

  // Arrêter la chanson en cours
  stopCurrentSong()

  // Démarrer la nouvelle chanson
  currentSong.value = songId
  isPlaying.value = true

  const song = songs.find(s => s.id === songId)
  if (!song) return

  // Créer le contexte audio si nécessaire
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }

  // Jouer les notes avec durées
  let noteIndex = 0
  const playNote = () => {
    if (!isPlaying.value || noteIndex >= song.notes.length) {
      if (noteIndex >= song.notes.length) {
        // Recommencer en boucle après une pause
        noteIndex = 0
        if (isPlaying.value) {
          currentTimeout = setTimeout(playNote, 500)
        }
      }
      return
    }

    const note = song.notes[noteIndex]
    const oscillator = audioContext!.createOscillator()
    const gainNode = audioContext!.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext!.destination)

    oscillator.frequency.value = note.freq
    oscillator.type = 'sine'

    const duration = note.duration / 1000 // en secondes
    gainNode.gain.setValueAtTime(0.25, audioContext!.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext!.currentTime + duration * 0.9)

    oscillator.start()
    oscillator.stop(audioContext!.currentTime + duration)

    noteIndex++
    currentTimeout = setTimeout(playNote, note.duration + 50)
  }

  playNote()
}

onUnmounted(() => {
  stopCurrentSong()
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
    <!-- Bouton retour 3D -->
    <NuxtLink
      to="/andrea"
      class="fixed top-3 left-3 z-[100] w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-4 border-b-[10px] border-pink-500 shadow-2xl active:border-b-4 active:translate-y-1 transition-all"
      style="position: fixed !important; top: 12px !important; left: 12px !important;"
    >
      <span class="text-4xl">⬅️</span>
    </NuxtLink>

    <!-- Contenu centré -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <!-- En-tête compact -->
    <div class="text-center mb-3">
      <div class="text-3xl mb-1" :class="{ 'animate-bounce-soft': isPlaying }">🎵</div>
      <h1 class="text-2xl sm:text-3xl font-magic text-rose">Comptines</h1>
    </div>

    <!-- Liste des chansons - GROS boutons -->
    <div class="w-full max-w-sm space-y-3">
      <button
        v-for="song in songs"
        :key="song.id"
        class="w-full p-4 rounded-[1.5rem] shadow-xl flex items-center gap-3 transition-all hover:scale-102 active:scale-98 border-4 border-white/50"
        :class="[
          song.color,
          currentSong === song.id && isPlaying ? 'ring-4 ring-dore scale-102' : ''
        ]"
        @click="playSong(song.id)"
      >
        <span class="text-5xl" :class="{ 'animate-bounce-soft': currentSong === song.id && isPlaying }">
          {{ song.emoji }}
        </span>
        <span class="text-xl sm:text-2xl font-magic text-gray-700 flex-1 text-left">{{ song.title }}</span>
        <span class="text-3xl">{{ currentSong === song.id && isPlaying ? '⏸️' : '▶️' }}</span>
      </button>
    </div>
    </div>
  </div>
</template>
